import fs from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
const initial = ['/', '/solutions', '/industries', '/products', '/work', '/company', '/company/how-we-work', '/company/technology', '/contact', '/insights', '/privacy', '/terms'];
const queue = [...initial], seen = new Set(), errors = [], titles = new Map(), anchors = [], htmlByRoute = new Map();
while (queue.length) {
 const path = queue.shift(); if (seen.has(path)) continue; seen.add(path);
 const response = await fetch(new URL(path, base), { headers: { 'User-Agent': 'Googlebot' } }); const html = await response.text(); htmlByRoute.set(path, html);
 if (response.status !== 200) { errors.push(`${path}: HTTP ${response.status}`); continue; }
 const title = html.match(/<title>(.*?)<\/title>/s)?.[1]; if (!title) errors.push(`${path}: missing title`); else if (titles.has(title)) errors.push(`${path}: duplicate title with ${titles.get(title)}`); else titles.set(title, path);
 if ((html.match(/<h1[ >]/g) || []).length !== 1) errors.push(`${path}: expected one H1`);
 for (const name of ['description', 'og:title', 'og:description', 'twitter:title']) if (!html.includes(`"${name}"`)) errors.push(`${path}: missing ${name}`);
 for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) { try { JSON.parse(match[1]); } catch { errors.push(`${path}: invalid JSON-LD`); } }
 for (const match of html.matchAll(/href="(\/[^" ]*|#[^" ]+)"/g)) { const href = match[1].replaceAll('&amp;', '&'); const url = new URL(href, new URL(path, base)); if (url.pathname.startsWith('/_next/') || /\.(svg|png|ico|woff2)$/.test(url.pathname)) continue; if (!seen.has(url.pathname)) queue.push(url.pathname); if (url.hash) anchors.push({ from: path, path: url.pathname, id: decodeURIComponent(url.hash.slice(1)) }); }
}
for (const anchor of anchors) if (!htmlByRoute.get(anchor.path)?.includes(`id="${anchor.id}"`)) errors.push(`${anchor.from}: missing anchor ${anchor.path}#${anchor.id}`);
for (const path of ['/not-a-real-route', '/solutions/not-a-real-solution', '/industries/not-a-real-industry', '/products/not-a-real-product', '/insights/not-a-real-article']) { const r = await fetch(new URL(path, base)); if (r.status !== 404) errors.push(`${path}: expected 404, got ${r.status}`); }
const robots = await (await fetch(new URL('/robots.txt', base))).text(); if (!robots.includes('Allow: /') || !robots.includes('Disallow: /api/')) errors.push('robots.txt: missing crawl rules');
const sitemapResponse = await fetch(new URL('/sitemap.xml', base)); if (!sitemapResponse.ok || !(await sitemapResponse.text()).includes('urlset')) errors.push('sitemap.xml: invalid response');
const invalid = await fetch(new URL('/api/leads', base), { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({}) }); if (invalid.status !== 400) errors.push(`API invalid form: expected 400, got ${invalid.status}`);
// Sending a valid inquiry writes a lead when configured. Opt in only against test data.
const deliveryMode = process.env.TEST_LEAD_DELIVERY || 'skip';
if (!['skip', 'accepted', 'unconfigured'].includes(deliveryMode)) throw new Error('TEST_LEAD_DELIVERY must be skip, accepted or unconfigured.');
if (deliveryMode !== 'skip') {
 const { submissionId } = await (await fetch(new URL('/api/leads', base))).json();
 const valid = await fetch(new URL('/api/leads', base), { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({ submissionId, name: 'QA Example', business: 'Example Workshop', phone: '+91 9000000000', email: 'qa@example.test', message: 'This is a local validation test for business order software.', need: 'Custom Software', industry: 'Other', consent: true, website: '', source: 'contact' }) });
 const expected = deliveryMode === 'accepted' ? 200 : 503;
 if (valid.status !== expected) errors.push(`API ${deliveryMode} delivery: expected ${expected}, got ${valid.status}`);
}
const hidden = ['/insights/custom-business-software-cost', '/insights/digitize-manufacturing-business', '/insights/mongodb-vs-postgresql-business-applications', '/Manufacturing%20ERP/dashboard.png', '/Jewellery%20ERP/customers.png', '/Billing%20Software/customer.png', '/polishing%20software/settings.png', '/.private/screenshots/Manufacturing%20ERP/dashboard.png'];
for (const path of hidden) { const r = await fetch(new URL(path, base)); if (r.status !== 404) errors.push(`${path}: unpublished/private content is accessible (${r.status})`); }
const assets = JSON.parse(await fs.readFile('data/screenshot-manifest.json', 'utf8'));
for (const asset of assets) { const response = await fetch(new URL(asset.src, base)); if (!response.ok || !response.headers.get('content-type')?.includes('image/')) errors.push(`${asset.src}: invalid image`); }
const imagePaths = ['/og/default', ...[...seen].filter(p => /^\/(work|products|insights)\/[^/]+$/.test(p)).map(p => '/og/' + p.split('/').at(-1))];
for (const path of imagePaths) { const response = await fetch(new URL(path, base)); if (!response.ok || !response.headers.get('content-type')?.includes('image/png')) errors.push(`${path}: invalid share image`); }
for (const [path, html] of htmlByRoute) { const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' '); if (/project outline|illustrative interface|editorial review|product concept|verified screenshots will be added|LOCAL DEMO/i.test(body)) errors.push(`${path}: development copy remains`); }
const report = { routesChecked: seen.size, working: [...seen], redirected: [], hidden, broken: errors, screenshotsChecked: assets.length, shareImagesChecked: imagePaths.length, internalLinks: 'checked', anchorsChecked: anchors.length, deliveryMode, errors, checkedAt: new Date().toISOString(), note: 'Without NEXT_PUBLIC_SITE_URL, canonical/share URLs and sitemap entries are omitted and pages are noindex. Domain-configured metadata is verified separately in tests. Unpublished articles return 404.' };
await fs.mkdir('test-results', { recursive: true }); await fs.writeFile('test-results/routes.json', JSON.stringify(report, null, 2)); console.log(JSON.stringify(report, null, 2)); if (errors.length) process.exitCode = 1;
