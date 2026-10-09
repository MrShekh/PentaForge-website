import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { publicRoutes } from '../lib/routes';
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
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>JSON.parse(m[1])).map(s=>s['@type']);
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
assert.equal((sitemap.match(/<loc>/g)||[]).length,publicRoutes.length);
assert.ok(!sitemap.includes('custom-business-software-cost'));
const robots=await fs.readFile('.next/server/app/robots.txt.body','utf8');
assert.ok(robots.includes(`Sitemap: ${domain}/sitemap.xml`));
await fs.writeFile('test-results/seo-configured.json',JSON.stringify({domain,passed:true,pages,sitemapEntries:publicRoutes.length},null,2));
console.log(`Verified rendered metadata, canonicals, share images, schema, H1s and indexability for ${pages.length} pages; sitemap and robots passed.`);
}
main().catch(error => { console.error(error); process.exitCode=1; });
