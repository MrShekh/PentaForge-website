import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { GET, POST } from '../app/api/leads/route';
const valid = { name: 'Route Test Owner', business: 'Route Test Workshop', phone: '+91 9000000000', email: 'route@example.test', message: 'We need to track stock and orders in one place.', need: 'Custom Software', industry: 'Jewellery', consent: true, website: '', source: 'contact' };
const request = (body: unknown, origin = 'http://localhost:3000') => new Request('http://localhost:3000/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json', origin, 'x-forwarded-for': randomUUID() }, body: JSON.stringify(body) });
test('website API issues server UUIDs and rejects bad origins/internal fields/oversized requests', async () => {
 const ticket = await GET(); assert.equal(ticket.headers.get('cache-control'), 'no-store'); const { submissionId } = await ticket.json(); assert.match(submissionId, /^[0-9a-f-]{36}$/);
 assert.equal((await POST(request(valid, 'https://other.example.test'))).status, 403);
 assert.equal((await POST(request({ ...valid, priority: 'URGENT' }))).status, 400);
 assert.equal((await POST(request({ ...valid, message: 'x'.repeat(17000) }))).status, 413);
});
test('website API returns success only after a valid Control Center receipt', async () => {
 const original = { fetch: globalThis.fetch, url: process.env.LEAD_WEBHOOK_URL, token: process.env.LEAD_WEBHOOK_TOKEN, turnstile: process.env.TURNSTILE_SECRET_KEY };
 process.env.LEAD_WEBHOOK_URL = 'https://control.example.test/api/integrations/website/leads'; process.env.LEAD_WEBHOOK_TOKEN = 'test-only-machine-token-with-32-characters'; delete process.env.TURNSTILE_SECRET_KEY;
 try {
  const submissionId = randomUUID();
  globalThis.fetch = async (_url, init) => { assert.equal(JSON.parse(String(init?.body)).submissionId, submissionId); return Response.json({ ok: true, id: 'lead', leadNumber: 'PFL-000001', submissionId }, { status: 201 }); };
  assert.equal((await POST(request({ ...valid, submissionId }))).status, 200);
  for (const status of [400, 503]) { globalThis.fetch = async () => Response.json({}, { status }); const response = await POST(request({ ...valid, submissionId })); assert.equal(response.status, 502); assert.ok(!(await response.json()).ok); }
  globalThis.fetch = async () => Response.json({ ok: true }); assert.equal((await POST(request({ ...valid, submissionId }))).status, 502);
  globalThis.fetch = async () => { throw new DOMException('Timed out', 'TimeoutError'); }; assert.equal((await POST(request({ ...valid, submissionId }))).status, 502);
 } finally { globalThis.fetch = original.fetch; for (const [key, value] of [['LEAD_WEBHOOK_URL', original.url], ['LEAD_WEBHOOK_TOKEN', original.token], ['TURNSTILE_SECRET_KEY', original.turnstile]]) { if (value === undefined) delete process.env[key!]; else process.env[key!] = value; } }
});
