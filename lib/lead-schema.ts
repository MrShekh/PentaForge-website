import { z } from 'zod';
import { needOptions, platformOptions, featureOptions, stageOptions } from './planner';
const clean = (max: number) => z.string().trim().max(max).refine(s => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(s), 'Please remove unsupported control characters.');
export const contactNeeds = ['Custom Software', 'Existing Software', 'Mobile App', 'Web Platform', 'AI & Automation', 'Not Sure'] as const;
export const leadSchema = z.object({
 name: clean(100).refine(s => s.length >= 2, 'Please enter your name.'),
 business: clean(150).refine(s => s.length >= 2, 'Please enter your business name, or “Personal project”.'),
 phone: clean(30).refine(s => /^[+()\d\s.-]{7,30}$/.test(s) && s.replace(/\D/g, '').length >= 7, 'Please enter a valid phone number.'),
 email: z.string().trim().max(254).email('Please enter a valid email address.'),
 message: clean(3000).refine(s => s.length >= 20, 'Please describe your project in at least 20 characters.'),
 need: z.enum([...contactNeeds, ...needOptions]),
 industry: z.enum(['Jewellery', 'Manufacturing', 'Retail', 'Startup', 'Other']),
 consent: z.literal(true, { error: 'Please agree to being contacted about this request.' }),
 website: z.string().max(0, 'Submission could not be accepted.'),
 source: z.enum(['contact', 'planner']),
 scope: z.object({ need: z.enum(needOptions), platforms: z.array(z.enum(platformOptions)).min(1).max(5), features: z.array(z.enum(featureOptions)).min(1).max(11), stage: z.enum(stageOptions) }).optional(),
 turnstileToken: z.string().max(2048).optional(),
}).superRefine((data, ctx) => { if (data.source === 'planner' && !data.scope) ctx.addIssue({ code: 'custom', path: ['scope'], message: 'Please complete the project scope.' }); });
export type Lead = z.infer<typeof leadSchema>;
