import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { deliverLead, DeliveryError, integrationPayload } from '../lib/lead-adapter';
import { leadSchema } from '../lib/lead-schema';
const lead = leadSchema.parse({ submissionId: randomUUID(), name: 'Test Owner', business: 'Test Business', email: 'test@example.com', phone: '+91 9000000000', message: 'We need to connect our orders and stock records.', industry: 'Other', need: 'Custom Software', consent: true, website: '', source: 'contact' });
test('delivery requires valid acceptance and keeps the same submission ID across retries', async () => {
 const saved = { fetch: globalThis.fetch, url: process.env.LEAD_WEBHOOK_URL, token: process.env.LEAD_WEBHOOK_TOKEN };
 process.env.LEAD_WEBHOOK_URL = 'https://control.example.test/api/integrations/website/leads'; process.env.LEAD_WEBHOOK_TOKEN = 'test-only-secret-longer-than-32-characters';
 try {
  const ids: string[] = [];
  globalThis.fetch = async (_url, init) => { const body = JSON.parse(String(init?.body)); ids.push(body.submissionId); assert.equal(body.source, 'WEBSITE_CONTACT'); assert.ok(!('consent' in body)); assert.ok(!('priority' in body)); return Response.json({ ok: true, id: 'lead', submissionId: body.submissionId, leadNumber: 'PFL-000001' }); };
  await deliverLead(lead); await deliverLead(lead); assert.deepEqual(ids, [lead.submissionId, lead.submissionId]);
  for (const status of [400, 401, 409, 429, 500, 503]) { globalThis.fetch = async () => Response.json({ ok: true }, { status }); await assert.rejects(() => deliverLead(lead), DeliveryError); }
  for (const body of ['<html>Login</html>', '{}', JSON.stringify({ ok: true, id: 'x', leadNumber: 'PFL-000001', submissionId: randomUUID() }), 'x'.repeat(5000)]) { globalThis.fetch = async () => new Response(body); await assert.rejects(() => deliverLead(lead), DeliveryError); }
  for (const name of ['TimeoutError', 'TypeError']) { globalThis.fetch = async () => { throw Object.assign(new Error('private error'), { name }); }; await assert.rejects(() => deliverLead(lead), (e: unknown) => e instanceof DeliveryError && !e.message.includes('private')); }
 } finally { globalThis.fetch = saved.fetch; for (const [key, value] of [['LEAD_WEBHOOK_URL', saved.url], ['LEAD_WEBHOOK_TOKEN', saved.token]]) { if (value === undefined) delete process.env[key!]; else process.env[key!] = value; } }
});
test('strict website schema rejects internal fields and mapping contains only supplied project data', () => {
 assert.equal(leadSchema.safeParse({ ...lead, status: 'WON' }).success, false);
 const payload = integrationPayload(lead, lead.submissionId!); assert.ok(!('platforms' in payload.project)); assert.equal(payload.version, 1);
});

test('protected Vercel delivery uses only the configured destination bypass header', async () => {
 const keys = ['LEAD_WEBHOOK_URL', 'LEAD_WEBHOOK_TOKEN', 'LEAD_WEBHOOK_VERCEL_BYPASS_SECRET', 'VERCEL_AUTOMATION_BYPASS_SECRET'];
 const saved = Object.fromEntries(keys.map(key => [key, process.env[key]])); const originalFetch = globalThis.fetch;
 process.env.LEAD_WEBHOOK_URL = 'https://control.example.test/api/integrations/website/leads';
 process.env.LEAD_WEBHOOK_TOKEN = 'test-only-secret-longer-than-32-characters';
 process.env.VERCEL_AUTOMATION_BYPASS_SECRET = 'wrong-website-project-secret';
 delete process.env.LEAD_WEBHOOK_VERCEL_BYPASS_SECRET;
 let expectedBypass: string | null = null;
 let calls = 0;
 try {
  globalThis.fetch = async (_url, init) => {
   calls++; const headers = new Headers(init?.headers);
   assert.equal(headers.get('x-vercel-protection-bypass'), expectedBypass);
   assert.equal(headers.get('authorization'), `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}`);
   assert.equal(init?.redirect, 'error');
   assert.ok(!String(init?.body).includes('project-secret'));
   return Response.json({ ok: true, id: 'lead', submissionId: lead.submissionId, leadNumber: 'PFL-000001' });
  };
  await deliverLead(lead);
  expectedBypass = 'destination-control-project-secret'; process.env.LEAD_WEBHOOK_VERCEL_BYPASS_SECRET = expectedBypass;
  await deliverLead(lead);
  for (const token of ['x'.repeat(513), 'x'.repeat(32) + ' invalid']) {
   process.env.LEAD_WEBHOOK_TOKEN = token;
   await assert.rejects(() => deliverLead(lead), (error: unknown) => error instanceof DeliveryError && error.status === 503);
  }
  assert.equal(calls, 2);
 } finally {
  globalThis.fetch = originalFetch;
  for (const key of keys) { if (saved[key] === undefined) delete process.env[key]; else process.env[key] = saved[key]; }
 }
});
