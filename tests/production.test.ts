import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { articles } from '../data/articles';
import { caseStudies } from '../data/caseStudies';
import { publicRoutes } from '../lib/routes';
import { products } from '../data/products';
import { deliverLead, DeliveryError } from '../lib/lead-adapter';
import { leadSchema } from '../lib/lead-schema';
import { setBrief, takeBrief } from '../lib/brief';

test('only completed articles have routes; product availability is not invented', () => {
 assert.equal(articles.filter(a => a.status === 'published').length, 3);
 for (const a of articles) assert.equal(publicRoutes.includes(`/insights/${a.slug}`), a.status === 'published');
 assert.ok(products.every(p => p.status === null));
 assert.equal(new Set(publicRoutes).size, publicRoutes.length);
});
test('all four projects have real, dimensioned, local screenshots; raw folders are not public', () => {
 assert.equal(caseStudies.length, 4);
 for (const study of caseStudies) { assert.ok(study.screenshots.length >= 3); for (const shot of study.screenshots) { assert.ok(shot.src.startsWith('/projects/')); assert.ok(fs.existsSync('public' + shot.src)); assert.ok(shot.width > 1800 && shot.height > 900); assert.ok(shot.alt.length > 30); } }
 for (const folder of ['Manufacturing ERP', 'Jewellery ERP', 'Billing Software', 'polishing software']) assert.equal(fs.existsSync(`public/${folder}`), false);
});
test('problem text handoff is bounded and consumed once', () => { setBrief('x'.repeat(3000)); assert.equal(takeBrief().length, 2000); assert.equal(takeBrief(), ''); });
test('configured canonical, sitemap and share image use one explicit domain', async () => {
 process.env.NEXT_PUBLIC_SITE_URL = 'https://production-test.invalid';
 const { pageMetadata } = await import('../lib/seo');
 const { default: sitemap } = await import('../app/sitemap');
 const { default: robots } = await import('../app/robots');
 for (const path of publicRoutes) { const metadata = pageMetadata('Route test', 'Description', path); assert.equal(metadata.alternates?.canonical, `https://production-test.invalid${path}`); assert.ok(JSON.stringify(metadata.openGraph).includes('https://production-test.invalid/og/')); }
 assert.equal(sitemap().length, publicRoutes.length);
 assert.equal(robots().sitemap, 'https://production-test.invalid/sitemap.xml');
});
test('webhook delivers the complete planner payload and rejects provider failures', async () => {
 const originalFetch = globalThis.fetch, originalUrl = process.env.LEAD_WEBHOOK_URL, originalToken = process.env.LEAD_WEBHOOK_TOKEN;
 const lead = leadSchema.parse({ name: 'QA Owner', business: 'QA Workshop', phone: '+91 9000000000', email: 'qa@example.com', message: 'We need to connect orders and stock records.', need: 'Business Software', industry: 'Jewellery', consent: true, source: 'planner', website: '', turnstileToken: 'test-token', scope: { need: 'Business Software', platforms: ['Web'], features: ['Inventory'], stage: 'Using Excel' } });
 process.env.LEAD_WEBHOOK_URL = 'https://webhook-test.invalid/leads'; process.env.LEAD_WEBHOOK_TOKEN = 'test-only-secret-with-at-least-32-characters';
 try {
  globalThis.fetch = async (_input, init) => { const body=JSON.parse(String(init?.body)); assert.deepEqual(body.project.platforms, lead.scope?.platforms); assert.deepEqual(body.project.features, lead.scope?.features); assert.equal(body.project.currentStage, lead.scope?.stage); assert.equal(body.project.industry, 'Jewellery'); assert.equal(body.source, 'WEBSITE_PROJECT_PLANNER'); assert.ok(!('website' in body)); assert.ok(!('turnstileToken' in body)); return Response.json({ ok: true, id: 'test', leadNumber: 'PFL-000001', submissionId: body.submissionId }, { status: 201 }); };
  await deliverLead(lead);
  globalThis.fetch = async () => new Response('', { status: 500 });
  await assert.rejects(() => deliverLead(lead), (e: unknown) => e instanceof DeliveryError && e.status === 502);
  globalThis.fetch = async () => { throw new Error('Network unavailable'); };
  await assert.rejects(() => deliverLead(lead), (e: unknown) => e instanceof DeliveryError && e.status === 502);
 } finally { globalThis.fetch = originalFetch; if (originalToken === undefined) delete process.env.LEAD_WEBHOOK_TOKEN; else process.env.LEAD_WEBHOOK_TOKEN = originalToken; if (originalUrl === undefined) delete process.env.LEAD_WEBHOOK_URL; else process.env.LEAD_WEBHOOK_URL = originalUrl; }
});
