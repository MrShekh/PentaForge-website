import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { productionOrigin, resolveSiteUrl } from '../config/site';
import { publicRoutes } from '../lib/routes';
import { articles } from '../data/articles';
import { demoRoutes } from '../data/school-demos';

function metadataSnapshot(environment: Record<string, string>) {
  // Fresh processes exercise the real build-time module configuration without import-cache leakage.
  const source = `
    const sitemap = require('./app/sitemap.ts').default;
    const robots = require('./app/robots.ts').default;
    const { resolveSitemap } = require('next/dist/build/webpack/loaders/metadata/resolve-route-data');
    const { site } = require('./config/site.ts');
    const { pageMetadata } = require('./lib/seo.ts');
    console.log(JSON.stringify({ entries: sitemap(), xml: resolveSitemap(sitemap()), robots: robots(), siteUrl: site.siteUrl, metadata: pageMetadata('Test', 'Test', '/') }));
  `;
  return JSON.parse(execFileSync(process.execPath, ['--import', 'tsx', '-e', source], {
    cwd: process.cwd(), encoding: 'utf8',
    env: { ...process.env, NODE_ENV: 'production', VERCEL: '1', VERCEL_ENV: 'production', NEXT_PUBLIC_SITE_URL: '', ...environment },
  }));
}

test('production origin survives missing/blank variables and rejects noncanonical configuration', () => {
  for (const value of [undefined, '', '  ', productionOrigin, `${productionOrigin}/`, ` ${productionOrigin}/ `]) {
    assert.equal(resolveSiteUrl({ VERCEL_ENV: 'production', NEXT_PUBLIC_SITE_URL: value }), productionOrigin);
    assert.equal(resolveSiteUrl({ NODE_ENV: 'production', NEXT_PUBLIC_SITE_URL: value }), productionOrigin);
  }
  for (const value of ['https://pentaforge.co.in', 'http://www.pentaforge.co.in', 'https://preview.vercel.app', `${productionOrigin}/path`, `${productionOrigin}?x=1`, 'invalid']) {
    assert.throws(() => resolveSiteUrl({ VERCEL_ENV: 'production', NEXT_PUBLIC_SITE_URL: value }));
  }
});

test('Vercel preview/development and local development cannot enable indexing with a production URL', () => {
  for (const environment of ['preview', 'development', 'staging']) {
    assert.equal(resolveSiteUrl({ NODE_ENV: 'production', VERCEL_ENV: environment, NEXT_PUBLIC_SITE_URL: productionOrigin }), undefined);
  }
  assert.equal(resolveSiteUrl({ NODE_ENV: 'development', NEXT_PUBLIC_SITE_URL: productionOrigin }), undefined);
  assert.equal(resolveSiteUrl({ NODE_ENV: 'production', VERCEL: '1', NEXT_PUBLIC_SITE_URL: productionOrigin }), undefined);
});

test('production emits nonempty Next sitemap XML with every genuine route and no drafts/demos', () => {
  const result = metadataSnapshot({});
  const urls: string[] = result.entries.map((entry: { url: string }) => entry.url);
  assert.ok(urls.length > 0);
  assert.deepEqual(urls, publicRoutes.map(path => new URL(path, productionOrigin).href));
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(result.xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
  const locations = [...result.xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<\/url>/g)].map(match => match[1]);
  assert.deepEqual(locations, urls);
  for (const url of urls) assert.equal(new URL(url).origin, productionOrigin);
  for (const route of [...demoRoutes, ...articles.filter(a => a.status === 'draft').map(a => `/insights/${a.slug}`), '/api/leads', '/admin', '/private', '/404', '/not-a-real-route']) {
    assert.ok(!urls.includes(new URL(route, productionOrigin).href), route);
  }
  assert.ok(!result.xml.includes('<lastmod>'), 'Publication/build dates must not be invented modification dates');
  assert.equal(result.robots.sitemap, `${productionOrigin}/sitemap.xml`);
  assert.equal(result.metadata.alternates.canonical, `${productionOrigin}/`);
});

test('actual preview metadata routes stay protected even with the canonical variable set', () => {
  const result = metadataSnapshot({ VERCEL_ENV: 'preview', NEXT_PUBLIC_SITE_URL: productionOrigin });
  assert.deepEqual(result.entries, []);
  assert.ok(!result.xml.includes('<url>'));
  assert.equal(result.siteUrl, undefined);
  assert.equal(result.metadata.alternates.canonical, undefined);
  assert.deepEqual(result.robots, { rules: { userAgent: '*', disallow: '/' } });
});
