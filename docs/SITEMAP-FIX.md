# Production sitemap fix — 20 October 2026

## Root cause and live evidence

Read-only requests to the official production site confirmed HTTP 200 with this sitemap:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
```

The previous `config/site.ts` set `site.siteUrl` to undefined when `NEXT_PUBLIC_SITE_URL` was missing or blank. `app/sitemap.ts` then explicitly returned `[]`. Next.js serialized that empty array as a `urlset` without any required `url` children, producing the Search Console error. This was the earlier protection used before the owner supplied a canonical domain; it remained active in the deployed build. A variable set only after the build, or in the wrong Vercel environment, cannot repair already-generated static output. We did not access the Vercel dashboard, so the precise dashboard setting (missing versus blank or wrong environment scope) was not independently inspected.

The route inventory was not empty: all 42 intended marketing URLs returned HTTP 200 without redirects on the live domain. All 42 also returned `noindex, follow` and lacked canonical links. Production robots.txt allowed crawling but omitted the sitemap directive. These related indexing failures share the same origin configuration; they are corrected through that existing shared configuration, without changing page designs or content.

## Small implementation change

- Production uses the owner's confirmed `https://www.pentaforge.co.in` origin even when `NEXT_PUBLIC_SITE_URL` is missing or blank. Conflicting configured origins fail validation instead of creating alternate-domain entries. An optional trailing slash and surrounding whitespace normalize safely.
- Vercel's environment takes priority over Node's production mode: Preview and Development remain noindex even if they inherit the official URL. Local development also remains noindex. An identified Vercel deployment without an environment remains protected.
- The existing `MetadataRoute.Sitemap` implementation uses the existing published route inventory and removes duplicate paths. No new website routes were added.
- Production robots.txt references the official sitemap. Protected environments disallow crawling and omit the sitemap directive. Existing page metadata automatically receives the same production-origin correction.
- All 28 fictional school demo routes remain explicitly noindex and outside the sitemap. The three unpublished articles, APIs, private/admin paths and error URLs are excluded. Every included route was checked as a genuine HTTP 200 page, not a redirect.
- No `lastModified` values are fabricated. The repository has article publication dates, but no maintained content modification dates; a publication date is not asserted as the last modification date. Build time and filesystem timestamps are not used.

## Files changed by this sitemap task

| File | Change |
| --- | --- |
| `config/site.ts` | Confirmed production origin, environment-aware indexing, URL validation. |
| `app/sitemap.ts` | Preserve Next metadata convention; deduplicate published routes and document date policy. |
| `app/robots.ts` | Production sitemap directive; protected-environment crawl policy. |
| `.env.example` | Official value and Vercel setup comments. |
| `tests/production.test.ts` | Existing SEO test uses the official origin and production environment. |
| `tests/sitemap.test.ts` | New environment, nonempty XML, canonical-origin and exclusion regression tests. |
| `scripts/verify-seo.ts` | Verify built sitemap entries and all 28 noindex demo exclusions. |
| `README.md` | Replace obsolete empty-domain deployment guidance. |
| `docs/SCHOOL-DEMO-COLLECTION.md` | Update its origin/indexing guidance to match the confirmed domain. |
| `docs/SITEMAP-FIX.md` | This diagnosis, verification, configuration and complete URL report. |

Existing uncommitted team/school work was preserved. No page source, layout, stylesheet, navigation, content inventory, API implementation or deployment configuration was changed by this task.

## Verification

| Check | Result |
| --- | --- |
| `npm run lint` | Passed. |
| `npm run typecheck` | Passed. |
| `npm test` | 28 passed, including four new sitemap/environment tests. |
| Production build | Passed with `VERCEL_ENV=production` and an intentionally blank effective `NEXT_PUBLIC_SITE_URL`, proving the fallback. |
| Preview build | Passed with `VERCEL_ENV=preview` and the official URL inherited. All 70 rendered pages were noindex, canonicals absent, robots disallowed `/`, and sitemap entries remained empty. |
| Built production SEO audit | All 42 pages indexable with matching canonicals, metadata, schema and share images; sitemap and robots consistent. All 28 school demo pages remain noindex and excluded. |
| XML parser | PowerShell/.NET XML parser accepted the generated document and found 42 namespaced `url` elements. |
| Live read-only route audit | All 42 included URLs already exist and returned HTTP 200 without redirects. |

Local evidence: `test-results/sitemap-live-before.json`, `test-results/sitemap-preview.json`, `test-results/seo-configured.json`, and `.next/server/app/sitemap.xml.body`. These generated artifacts are ignored by Git. Full preview and production builds were separate; the final `.next` output is the production build.

## Required Vercel configuration and rollout

1. In the **Production** environment, set `NEXT_PUBLIC_SITE_URL=https://www.pentaforge.co.in`. The production fallback now prevents an empty sitemap if it is omitted, but the explicit value is the documented configuration.
2. Enable access to **System Environment Variables**. Vercel supplies `VERCEL=1` and `VERCEL_ENV=production` or `preview` automatically. Do not manually set Preview's `VERCEL_ENV` to production. No `VERCEL_URL` or deployment hostname is used as the canonical origin. [Vercel system environment variable documentation](https://vercel.com/docs/environment-variables/system-environment-variables).
3. No new secrets or contact/form variables are needed for this fix; leave existing integrations unchanged. Preview may leave `NEXT_PUBLIC_SITE_URL` unset or inherit the official value—the environment guard still protects it.
4. **A fresh Vercel Production rebuild/redeployment is required.** Sitemap, robots and page metadata are statically generated. Do not reuse a prebuilt Preview artifact as Production. Changing a variable without rebuilding does not update the existing deployment.
5. After the owner deploys, confirm `/sitemap.xml` contains 42 entries, `/robots.txt` advertises it, and a public marketing page has `index, follow` plus its www canonical. Then resubmit the same sitemap URL in Google Search Console and request validation. Google recrawling/indexing is separate from successful deployment.

No deployment, push, Vercel setting change, DNS change or Search Console submission was performed.

## Representative generated XML

These are real entries from the production build (the full document has 42):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.pentaforge.co.in/</loc></url>
  <url><loc>https://www.pentaforge.co.in/solutions/custom-software</loc></url>
  <url><loc>https://www.pentaforge.co.in/industries/education</loc></url>
  <url><loc>https://www.pentaforge.co.in/work/jewellery-manufacturing-system</loc></url>
  <url><loc>https://www.pentaforge.co.in/insights/how-jewellery-manufacturing-software-works</loc></url>
</urlset>
```

## Complete included URL list

1. [/](https://www.pentaforge.co.in/)
2. [/solutions](https://www.pentaforge.co.in/solutions)
3. [/industries](https://www.pentaforge.co.in/industries)
4. [/products](https://www.pentaforge.co.in/products)
5. [/work](https://www.pentaforge.co.in/work)
6. [/company](https://www.pentaforge.co.in/company)
7. [/company/how-we-work](https://www.pentaforge.co.in/company/how-we-work)
8. [/company/technology](https://www.pentaforge.co.in/company/technology)
9. [/contact](https://www.pentaforge.co.in/contact)
10. [/insights](https://www.pentaforge.co.in/insights)
11. [/privacy](https://www.pentaforge.co.in/privacy)
12. [/terms](https://www.pentaforge.co.in/terms)
13. [/solutions/custom-software](https://www.pentaforge.co.in/solutions/custom-software)
14. [/solutions/business-digitization](https://www.pentaforge.co.in/solutions/business-digitization)
15. [/solutions/web-applications](https://www.pentaforge.co.in/solutions/web-applications)
16. [/solutions/mobile-applications](https://www.pentaforge.co.in/solutions/mobile-applications)
17. [/solutions/desktop-software](https://www.pentaforge.co.in/solutions/desktop-software)
18. [/solutions/ai-automation](https://www.pentaforge.co.in/solutions/ai-automation)
19. [/solutions/cloud-backend](https://www.pentaforge.co.in/solutions/cloud-backend)
20. [/industries/jewellery](https://www.pentaforge.co.in/industries/jewellery)
21. [/industries/manufacturing](https://www.pentaforge.co.in/industries/manufacturing)
22. [/industries/retail](https://www.pentaforge.co.in/industries/retail)
23. [/industries/restaurants](https://www.pentaforge.co.in/industries/restaurants)
24. [/industries/hotels](https://www.pentaforge.co.in/industries/hotels)
25. [/industries/education](https://www.pentaforge.co.in/industries/education)
26. [/industries/healthcare](https://www.pentaforge.co.in/industries/healthcare)
27. [/industries/supermarkets](https://www.pentaforge.co.in/industries/supermarkets)
28. [/industries/logistics](https://www.pentaforge.co.in/industries/logistics)
29. [/industries/startups](https://www.pentaforge.co.in/industries/startups)
30. [/industries/other-businesses](https://www.pentaforge.co.in/industries/other-businesses)
31. [/products/jewellery-billing](https://www.pentaforge.co.in/products/jewellery-billing)
32. [/products/jewellery-manufacturing](https://www.pentaforge.co.in/products/jewellery-manufacturing)
33. [/products/polishing-management](https://www.pentaforge.co.in/products/polishing-management)
34. [/products/inventory-management](https://www.pentaforge.co.in/products/inventory-management)
35. [/products/business-billing](https://www.pentaforge.co.in/products/business-billing)
36. [/work/jewellery-manufacturing-system](https://www.pentaforge.co.in/work/jewellery-manufacturing-system)
37. [/work/jewellery-polishing-management](https://www.pentaforge.co.in/work/jewellery-polishing-management)
38. [/work/custom-billing-system](https://www.pentaforge.co.in/work/custom-billing-system)
39. [/work/jewellery-operations-system](https://www.pentaforge.co.in/work/jewellery-operations-system)
40. [/insights/how-jewellery-manufacturing-software-works](https://www.pentaforge.co.in/insights/how-jewellery-manufacturing-software-works)
41. [/insights/track-gold-loss-jewellery-manufacturing](https://www.pentaforge.co.in/insights/track-gold-loss-jewellery-manufacturing)
42. [/insights/custom-software-vs-ready-made](https://www.pentaforge.co.in/insights/custom-software-vs-ready-made)
