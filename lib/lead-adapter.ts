import { industryDescriptionPrefix, integrationIndustry } from '../data/industry-options';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import type { Lead } from './lead-schema';
export class DeliveryError extends Error { constructor(public status: number, message: string) { super(message); } }
const failure = "We couldn't send your request right now. Please try again in a moment. You can keep a copy of your project summary below.";
export function integrationPayload(lead: Lead, submissionId: string) {
 return {
  version: 1, submissionId,
  source: lead.source === 'planner' ? 'WEBSITE_PROJECT_PLANNER' : 'WEBSITE_CONTACT',
  submissionType: lead.source === 'planner' ? 'PROJECT_PLANNER' : 'CONTACT',
  contact: { name: lead.name, businessName: lead.business, email: lead.email, phone: lead.phone },
  project: { industry: integrationIndustry(lead.industry), projectType: lead.scope?.need || lead.need, description: industryDescriptionPrefix(lead.industry) + lead.message, ...(lead.scope ? { currentStage: lead.scope.stage, platforms: lead.scope.platforms, features: lead.scope.features } : {}) },
 };
}
const receiptSchema = z.object({ ok: z.literal(true), id: z.string().min(1).max(100), leadNumber: z.string().regex(/^PFL-\d{6,}$/), submissionId: z.uuid() });
export async function deliverLead(lead: Lead): Promise<void> {
 const submissionId = lead.submissionId || randomUUID();
 const token = process.env.LEAD_WEBHOOK_TOKEN;
 let url: URL;
 try {
  url = new URL(process.env.LEAD_WEBHOOK_URL || '');
  const local = process.env.NODE_ENV !== 'production' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) && url.protocol === 'http:';
  if ((url.protocol !== 'https:' && !local) || url.username || url.password || !token || !/^[\x21-\x7e]{32,512}$/.test(token)) throw new Error();
 } catch { throw new DeliveryError(503, failure); }
 let status: number | undefined;
 try {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
  // Use the destination Control Center project's bypass secret, never the
  // website project's automatically injected VERCEL_AUTOMATION_BYPASS_SECRET.
  if (process.env.LEAD_WEBHOOK_VERCEL_BYPASS_SECRET) headers['x-vercel-protection-bypass'] = process.env.LEAD_WEBHOOK_VERCEL_BYPASS_SECRET;
  const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(integrationPayload(lead, submissionId)), signal: AbortSignal.timeout(10000), redirect: 'error' });
  status = response.status;
  if (!response.ok) throw new Error('rejected');
  const reader = response.body?.getReader(); if (!reader) throw new Error('invalid_receipt');
  const chunks: Uint8Array[] = []; let bytes = 0;
  while (true) { const { value, done } = await reader.read(); if (done) break; bytes += value.byteLength; if (bytes > 4096) { await reader.cancel(); throw new Error('invalid_receipt'); } chunks.push(value); }
  const receipt = receiptSchema.safeParse(JSON.parse(Buffer.concat(chunks).toString('utf8')));
  if (!receipt.success || receipt.data.submissionId !== submissionId) throw new Error('invalid_receipt');
 } catch (error) {
  const category = error instanceof Error && ['rejected', 'invalid_receipt'].includes(error.message) ? error.message : error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name) ? 'timeout' : 'unavailable_or_invalid_response';
  console.warn(JSON.stringify({ event: 'lead_delivery_failed', submissionId, destinationStatus: status ?? null, category, timestamp: new Date().toISOString() }));
  throw new DeliveryError(502, failure);
 }
}
