import { createHash, randomUUID } from 'node:crypto';
import { leadSchema } from '@/lib/lead-schema';
import { deliverLead, DeliveryError } from '@/lib/lead-adapter';
export const runtime = 'nodejs';
const attempts = new Map<string, { count: number; expires: number }>();
function result(body: unknown, status: number) { return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } }); }
export async function GET() { return result({ submissionId: randomUUID() }, 200); }
export async function POST(request: Request) {
 const origin = request.headers.get('origin');
 const allowed = new Set([new URL(request.url).origin, process.env.NEXT_PUBLIC_SITE_URL].filter(Boolean));
 if (origin && !allowed.has(origin)) return result({ error: 'This request origin is not allowed.' }, 403);
 if (!request.headers.get('content-type')?.includes('application/json')) return result({ error: 'Please send a JSON request.' }, 415);
 const now = Date.now(); for (const [k, v] of attempts) if (v.expires < now) attempts.delete(k);
 // This instance-local limiter is defense in depth. Use edge/WAF rate limits in production.
 const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
 const key = createHash('sha256').update(ip).digest('hex'); const entry = attempts.get(key) || { count: 0, expires: now + 600000 };
 if (entry.count >= 8) return result({ error: 'Too many requests. Please try again in ten minutes.' }, 429);
 if (attempts.size >= 5000 && !attempts.has(key)) return result({ error: 'The request service is busy. Please try again shortly.' }, 429);
 attempts.set(key, { ...entry, count: entry.count + 1 });
 try {
  const reader = request.body?.getReader(); if (!reader) return result({ error: 'Please complete the form.' }, 400);
  const chunks: Uint8Array[] = []; let length = 0;
  while (true) { const { done, value } = await reader.read(); if (done) break; length += value.byteLength; if (length > 16000) { await reader.cancel(); return result({ error: 'The request is too large.' }, 413); } chunks.push(value); }
  const parsed = leadSchema.safeParse(JSON.parse(Buffer.concat(chunks).toString('utf8')));
  if (!parsed.success) return result({ error: 'Please check the form fields.', fields: parsed.error.flatten().fieldErrors }, 400);
  if (process.env.TURNSTILE_SECRET_KEY) {
   if (!parsed.data.turnstileToken) return result({ error: 'Please complete the verification and try again.' }, 400);
   const verified = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: parsed.data.turnstileToken }), signal: AbortSignal.timeout(10000) });
   const verdict = await verified.json() as { success?: boolean };
   if (!verdict.success) return result({ error: 'Verification expired. Please verify again.' }, 400);
  }
  await deliverLead(parsed.data); return result({ ok: true, message: 'Your request has been delivered to PentaForge. We’ll review the workflow and get in touch.' }, 200);
 } catch (error) { if (error instanceof DeliveryError) return result({ error: error.message }, error.status); if (error instanceof SyntaxError) return result({ error: 'The request could not be read.' }, 400); return result({ error: 'We could not confirm delivery. Please try again later.' }, 502); }
}
