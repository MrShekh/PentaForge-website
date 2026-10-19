import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { schools, schoolIds, demoRoutes, demoEnquiryHref, getSchool } from '../data/school-demos';
import manifest from '../data/school-demos/photo-manifest.json';
import { educationServices, educationFieldsSchema, schoolEnquiryContext } from '../lib/school-demos/enquiry';
import { leadSchema } from '../lib/lead-schema';
import { integrationPayload } from '../lib/lead-adapter';
import { publicRoutes } from '../lib/routes';
test('all 28 school routes are unique, complete and excluded from the marketing sitemap',()=>{
 assert.equal(demoRoutes.length,28);assert.equal(new Set(demoRoutes).size,28);
 for(const route of demoRoutes)assert.ok(!publicRoutes.includes(route));
 for(const id of schoolIds){assert.ok(demoEnquiryHref(id).includes(`demo=${id}`));for(const kind of ['about','programs','admissions','contact','gallery'])assert.ok(schools[id].pages.some(p=>p.kind===kind));}
 assert.ok(demoRoutes.includes('/demos/nextgen/student-portal'));assert.ok(demoRoutes.includes('/demos/nextgen/parent-portal'));for(const id of ['https://bad.example','constructor','toString','__proto__'])assert.equal(getSchool(id),undefined);
});
test('school project context fits the unchanged strict lead envelope for every service and design',()=>{
 for(const service of educationServices)for(const demo of schoolIds){
  const input=educationFieldsSchema.parse({city:'Rajkot',educationService:service,message:'x'.repeat(2400)});const context=schoolEnquiryContext(input,demo);
  const lead=leadSchema.parse({name:'QA Owner',business:'QA School',phone:'9000000000',email:'qa@example.test',...context,industry:'Schools & Colleges',source:'contact',consent:true,website:''});const payload=integrationPayload(lead,'08fbfba0-152b-4340-b575-8c73f1e0d953');
  assert.equal(payload.project.industry,'Other');assert.ok(payload.project.description.includes(schools[demo].name));assert.ok(payload.project.description.includes('City: Rajkot'));assert.ok(payload.project.description.includes(service));assert.ok(payload.project.description.length<=3000);
 }
 assert.equal(educationFieldsSchema.safeParse({city:'',educationService:'School Website',message:'a'.repeat(30)}).success,false);
 assert.equal(educationFieldsSchema.safeParse({city:'Rajkot\nForged context',educationService:'School Website',message:'a'.repeat(30)}).success,false);
 assert.equal(educationFieldsSchema.safeParse({city:'Rajkot',educationService:'Forged service',message:'a'.repeat(30)}).success,false);
});
test('every licensed demo photo has a local optimized asset and provenance',()=>{assert.equal(manifest.photos.length,10);for(const photo of manifest.photos){assert.ok(fs.existsSync(`public${photo.src}`));assert.ok(photo.sourcePage.startsWith('https://www.pexels.com/photo/'));assert.ok(photo.licenseUrl.startsWith('https://'));assert.ok(photo.alt.length>20);}});
