import fs from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
const initial = ['/', '/solutions', '/industries', '/products', '/work', '/company', '/company/how-we-work', '/company/technology', '/contact', '/insights', '/privacy', '/terms'];
const queue = [...initial], seen = new Set(), errors = [], titles = new Map(), anchors = [], htmlByRoute = new Map();
while (queue.length) {
 const path = queue.shift(); if (seen.has(path)) continue; seen.add(path);
 const response = await fetch(new URL(path, base), { headers: { 'User-Agent': 'Googlebot' } }); const html = await response.text(); htmlByRoute.set(path, html);
 if (response.status !== 200) { errors.push(`${path}: HTTP ${response.status}`); continue; }
 const title = html.match(/<title>(.*?)<\/title>/s)?.[1]; if (!title) errors.push(`${path}: missing title`); else if (titles.has(title)) errors.push(`${path}: duplicate title with ${titles.get(title)}`); else titles.set(title, path);
 if ((html.match(/<h1[ >]/g) || []).length !== 1) errors.push(`${path}: expected one H1`);
 for (const name of ['description', 'og:title', 'og:description', 'twitter:title']) if (!html.includes(`"${name}"`)) errors.push(`${path}: missing ${name}`);
 for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) { try { JSON.parse(match[1]); } catch { errors.push(`${path}: invalid JSON-LD`); } }
 for (const match of html.matchAll(/href="(\/[^" ]*|#[^" ]+)"/g)) { const href = match[1].replaceAll('&amp;', '&'); const url = new URL(href, new URL(path, base)); if (url.pathname.startsWith('/_next/') || /\.(svg|png|ico|woff2)$/.test(url.pathname)) continue; if (!seen.has(url.pathname)) queue.push(url.pathname); if (url.hash) anchors.push({ from: path, path: url.pathname, id: decodeURIComponent(url.hash.slice(1)) }); }
}
for (const anchor of anchors) if (!htmlByRoute.get(anchor.path)?.includes(`id="${anchor.id}"`)) errors.push(`${anchor.from}: missing anchor ${anchor.path}#${anchor.id}`);
for (const path of ['/not-a-real-route', '/solutions/not-a-real-solution', '/products/not-a-real-product', '/insights/not-a-real-article']) { const r = await fetch(new URL(path, base)); if (r.status !== 404) errors.push(`${path}: expected 404, got ${r.status}`); }
const robots = await (await fetch(new URL('/robots.txt', base))).text(); if (!robots.includes('Allow: /') || !robots.includes('Disallow: /api/')) errors.push('robots.txt: missing crawl rules');
const sitemapResponse = await fetch(new URL('/sitemap.xml', base)); if (!sitemapResponse.ok || !(await sitemapResponse.text()).includes('urlset')) errors.push('sitemap.xml: invalid response');
const invalid = await fetch(new URL('/api/leads', base), { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({}) }); if (invalid.status !== 400) errors.push(`API invalid form: expected 400, got ${invalid.status}`);
const valid = await fetch(new URL('/api/leads', base), { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({ name: 'QA Example', business: 'Example Workshop', phone: '+91 9000000000', email: 'qa@example.com', message: 'This is a local validation test for business order software.', need: 'Custom Software', industry: 'Other', consent: true, website: '', source: 'contact' }) }); if (valid.status !== 503) errors.push(`API unconfigured delivery: expected 503, got ${valid.status}`);
const report = { routesChecked: seen.size, internalLinks: 'checked', anchorsChecked: anchors.length, errors, checkedAt: new Date().toISOString(), note: 'No production canonical is emitted until NEXT_PUBLIC_SITE_URL is configured. Draft articles are intentionally noindex.' };
await fs.mkdir('test-results', { recursive: true }); await fs.writeFile('test-results/routes.json', JSON.stringify(report, null, 2)); console.log(JSON.stringify(report, null, 2)); if (errors.length) process.exitCode = 1;
