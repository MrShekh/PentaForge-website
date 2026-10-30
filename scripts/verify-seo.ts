import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { publicRoutes } from '../lib/routes';
import { articles } from '../data/articles';
import { demoRoutes } from '../data/school-demos';
import { site } from '../config/site';
type Entity = {
 '@type': string; '@id'?: string; name?: string; url?: string; sameAs?: string[];
 provider?: Entity; creator?: Entity; author?: Entity; publisher?: Entity;
};
async function main() {
const domain = process.env.TEST_SITE_URL;
if (!domain) throw new Error('Set TEST_SITE_URL to the NEXT_PUBLIC_SITE_URL used for this production build.');
const pages = [];
for (const route of publicRoutes) {
 const html = await fs.readFile(`.next/server/app${route === '/' ? '/index' : route}.html`, 'utf8');
 const title=html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
 const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1];
 const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
 const image=html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
 const entities: Entity[]=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>JSON.parse(m[1]));
 const schemas=entities.map(s=>s['@type']);
 const organizationId='https://www.pentaforge.co.in/#organization';
 const organizations=entities.filter(s=>s['@type']==='Organization');
 assert.equal(organizations.length,1,`${route}: one top-level Organization`);
 assert.equal(organizations[0]['@id'],organizationId,`${route}: stable Organization ID`);
 assert.deepEqual(organizations[0].sameAs,site.socials.map(s=>s.url),`${route}: shared social identity`);
 const footer=html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] || '';
 for(const social of site.socials) {
  const escaped=social.url.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll("'",'&#x27;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  assert.ok(footer.includes(`href="${escaped}"`),`${route}: visible ${social.label} footer link`);
 }
 assert.equal(entities.filter(s=>s['@type']==='WebSite').length,1,`${route}: one WebSite`);
 const identities=entities.map(s=>s['@id']).filter(Boolean);
 assert.equal(new Set(identities).size,identities.length,`${route}: no duplicate top-level IDs`);
 for(const entity of entities) {
  const references=entity['@type']==='Article' ? [entity.author,entity.publisher] : entity['@type']==='Service' ? [entity.provider] : entity['@type']==='CreativeWork' ? [entity.creator] : entity['@type']==='WebSite' ? [entity.publisher] : [];
  for(const reference of references) {
   assert.equal(reference?.['@id'],organizationId,`${route}: ${entity['@type']} references Organization`);
   if(entity['@type']!=='WebSite') {
    assert.equal(reference?.name,'PentaForge',`${route}: reference name`);
    assert.equal(reference?.url,`${domain}/`,`${route}: reference URL`);
   }
  }
 }
 assert.equal(canonical ? new URL(canonical).toString() : undefined, new URL(route,domain).toString(), `${route}: canonical`);
 assert.ok(title && description && image?.startsWith(`${domain}/og/`), `${route}: metadata`);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${route}: H1`);
 assert.ok(html.includes('content="index, follow"'),`${route}: indexability`);
 assert.ok(schemas.includes('Organization') && schemas.includes('WebSite'),`${route}: organization`);
 if(route!=='/') assert.ok(schemas.includes('BreadcrumbList'),`${route}: breadcrumbs`);
 if(/^\/insights\//.test(route)) assert.ok(schemas.includes('Article'),`${route}: article schema`);
 if(/^\/(solutions|industries)\//.test(route)) assert.ok(schemas.includes('Service'),`${route}: service schema`);
 pages.push({route,title,description,canonical,image,schemas});
}
assert.equal(new Set(pages.map(p=>p.title)).size,pages.length,'Unique titles');
assert.equal(new Set(pages.map(p=>p.description)).size,pages.length,'Unique descriptions');
const sitemap=await fs.readFile('.next/server/app/sitemap.xml.body','utf8');
assert.ok(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
assert.ok(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
const sitemapUrls=[...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<\/url>/g)].map(match=>match[1]);
assert.ok(sitemapUrls.length>0,'Production sitemap must never be empty');
assert.deepEqual(sitemapUrls,publicRoutes.map(path=>new URL(path,domain).href));
assert.equal(new Set(sitemapUrls).size,sitemapUrls.length);
for(const url of sitemapUrls) assert.equal(new URL(url).origin,'https://www.pentaforge.co.in');
for(const article of articles.filter(a=>a.status==='draft')) assert.ok(!sitemapUrls.includes(`${domain}/insights/${article.slug}`));
for(const route of demoRoutes){
 const html=await fs.readFile(`.next/server/app${route}.html`,'utf8');
 assert.ok(html.includes('content="noindex, follow"'),`${route}: demo must stay noindex`);
 assert.ok(!sitemapUrls.includes(domain+route),`${route}: noindex pages must not enter sitemap`);
}
const robots=await fs.readFile('.next/server/app/robots.txt.body','utf8');
assert.ok(robots.includes(`Sitemap: ${domain}/sitemap.xml`));
await fs.mkdir('test-results',{recursive:true});
await fs.writeFile('test-results/seo-configured.json',JSON.stringify({domain,passed:true,pages,sitemapEntries:publicRoutes.length},null,2));
console.log(`Verified rendered metadata, canonicals, share images, schema, H1s and indexability for ${pages.length} pages; sitemap and robots passed.`);
}
main().catch(error => { console.error(error); process.exitCode=1; });
