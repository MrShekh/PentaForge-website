import type { Lead } from './lead-schema';
export class DeliveryError extends Error { constructor(public status: number, message: string) { super(message); } }
export async function deliverLead(lead: Lead): Promise<void> {
 const url = process.env.LEAD_WEBHOOK_URL;
 if (!url) throw new DeliveryError(503, 'Online requests are not connected yet. Your request has not been sent. You can copy your project summary below and keep it for later.');
 if (!url.startsWith('https://')) throw new DeliveryError(503, 'The request service is not configured correctly. Your request has not been sent.');
 const { website: _website, turnstileToken: _token, ...payload } = lead;
 void _website; void _token;
 let response: Response;
 try { response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(process.env.LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify(payload), signal: AbortSignal.timeout(10000), redirect: 'error' }); }
 catch { throw new DeliveryError(502, 'We could not confirm delivery. Please keep your summary and try again later.'); }
 if (!response.ok) throw new DeliveryError(502, 'The request service did not accept your message. Please keep your summary and try again later.');
}
