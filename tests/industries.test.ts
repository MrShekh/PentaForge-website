import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { industries, featuredIndustries } from '../data/industries';
import { industryOptions, industrySlugs, industryMessageLimit } from '../data/industry-options';
import { publicRoutes } from '../lib/routes';
import { services } from '../data/services';
import { caseStudies } from '../data/caseStudies';
import { leadSchema } from '../lib/lead-schema';
import { integrationPayload } from '../lib/lead-adapter';
import { GET, POST } from '../app/api/leads/route';
const base = { name: 'QA Owner', business: 'QA Business', phone: '+91 9000000000', email: 'qa@example.test', need: 'Custom Software', consent: true, website: '', source: 'contact', message: 'Please connect our daily records and work assignments.' };
const legacy = ['Jewellery', 'Manufacturing', 'Retail', 'Startup', 'Other'];

test('eleven industries retain old routes and add only supported service/work references', () => {
 assert.equal(industries.length, 11); assert.equal(featuredIndustries.length, 8);
 assert.deepEqual(industries.map(i => i.slug), [...industrySlugs]);
 for (const i of industries) { assert.ok(publicRoutes.includes(`/industries/${i.slug}`)); assert.ok(i.problems.length >= 2); assert.ok(i.benefits.length >= 3); assert.ok(i.highlights.length >= 3 && i.highlights.length <= 4); assert.ok(i.relatedServices.every(slug => services.some(s => s.slug === slug))); assert.ok(i.caseStudySlugs.every(slug => caseStudies.some(s => s.slug === slug))); }
 for (const slug of ['restaurants', 'hotels', 'education', 'healthcare', 'supermarkets', 'logistics']) { const i=industries.find(i=>i.slug===slug)!; assert.equal(i.caseStudySlugs.length,0); assert.ok(i.moduleGroups!.length >= 3); }
 assert.equal(new Set(industries.map(i=>i.seoTitle)).size,11);
});
test('all contact/planner industry selections preserve the existing v1 envelope without losing detail', () => {
 for (const industry of industryOptions) for (const source of ['contact', 'planner']) {
  const scope=source==='planner'?{need:'Business Software',platforms:['Web'],features:['Orders','Billing'],stage:'Using Excel'}:undefined;
  const lead=leadSchema.parse({...base,industry,source,scope}); const id=randomUUID(); const payload=integrationPayload(lead,id);
  assert.equal(payload.version,1); assert.equal(payload.submissionId,id); assert.ok(legacy.includes(payload.project.industry));
  assert.ok(payload.project.description.endsWith(base.message)); assert.equal(payload.project.description, legacy.includes(industry)?base.message:`Industry: ${industry}\n\n${base.message}`);
  assert.equal(payload.project.industry,legacy.includes(industry)?industry:industry==='Supermarkets'?'Retail':'Other');
  if(scope){assert.deepEqual(payload.project.platforms,scope.platforms);assert.deepEqual(payload.project.features,scope.features);assert.equal(payload.project.currentStage,scope.stage);}
 }
 assert.equal(leadSchema.safeParse({...base,industry:'Unrecognised'}).success,false);
});
test('industry context cannot overflow the Control Center 3000-character description limit', () => {
 for (const industry of industryOptions) { const limit=industryMessageLimit(industry); const lead=leadSchema.parse({...base,industry,message:'x'.repeat(limit)}); assert.equal(integrationPayload(lead,randomUUID()).project.description.length,3000); assert.equal(leadSchema.safeParse({...base,industry,message:'x'.repeat(limit+1)}).success,false); }
});
test('API accepts every new industry and confirms the existing receipt contract with a mocked receiver', async () => {
 const saved={fetch:globalThis.fetch,url:process.env.LEAD_WEBHOOK_URL,token:process.env.LEAD_WEBHOOK_TOKEN,turnstile:process.env.TURNSTILE_SECRET_KEY};
 process.env.LEAD_WEBHOOK_URL='https://control-test.invalid/api/integrations/website/leads';process.env.LEAD_WEBHOOK_TOKEN='test-only-machine-token-with-32-characters';delete process.env.TURNSTILE_SECRET_KEY;
 try {
  globalThis.fetch=async(_url,init)=>{const payload=JSON.parse(String(init?.body));assert.ok(legacy.includes(payload.project.industry));assert.match(payload.project.description,/^Industry: /);return Response.json({ok:true,id:'qa-lead',leadNumber:'PFL-000001',submissionId:payload.submissionId},{status:201});};
  for(const industry of industryOptions.filter(i=>!legacy.includes(i))) {const {submissionId}=await(await GET()).json();const request=new Request('http://localhost:3000/api/leads',{method:'POST',headers:{'content-type':'application/json',origin:'http://localhost:3000','x-forwarded-for':randomUUID()},body:JSON.stringify({...base,industry,submissionId})});assert.equal((await POST(request)).status,200,industry);}
 } finally {globalThis.fetch=saved.fetch;for(const[key,value]of Object.entries({LEAD_WEBHOOK_URL:saved.url,LEAD_WEBHOOK_TOKEN:saved.token,TURNSTILE_SECRET_KEY:saved.turnstile})){if(value===undefined)delete process.env[key];else process.env[key]=value;}}
});
