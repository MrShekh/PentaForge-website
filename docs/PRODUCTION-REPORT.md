# PentaForge production pass

## A. What changed

Preserved the existing design, layout system, typography, animations, navbar and interactive workflows. Replaced fabricated interface cards with real project screenshots, added an accessible native screenshot viewer and feature-led case studies, removed public preview language, and added Ahmedabad, Gujarat, India to company/contact/footer and Organization schema.

Three complete guides are now published: jewellery manufacturing software; gold loss and recovery; custom versus ready-made software. Three unfinished articles are excluded from navigation, static generation, related articles and sitemap, and return 404. No client names, testimonials, statistics, technology stacks or release availability were invented.

## B. Real projects added

| Project | Public route | Images |
| --- | --- | --- |
| Jewellery Manufacturing Management System | `/work/jewellery-manufacturing-system` | 5 |
| Jewellery Polishing Management System | `/work/jewellery-polishing-management` | 3 |
| Custom Jewellery Billing System | `/work/custom-billing-system` | 4 |
| Jewellery Operations & Stock System | `/work/jewellery-operations-system` | 4 |

The homepage features the first three. Work includes all four. Custom Software, Business Digitization, Jewellery and Manufacturing pages link to relevant real work. Project technology/platform claims are deliberately limited to the supplied evidence.

## C. Screenshots used

All 16 published images live under `public/projects/jewellery-manufacturing/`, `jewellery-polishing/`, `jewellery-billing/` and `jewellery-operations/`. `data/screenshots.ts` holds central metadata; `data/screenshot-manifest.json` holds source mapping and dimensions. [The screenshot review](SCREENSHOT-REVIEW.md) maps every original file and explains all six unused captures.

## D. Screenshots requiring owner review

Private identities and populated financial/weight/transaction values were masked in the actual image pixels. Raw originals are kept locally in `.private/screenshots/`, outside the served/deployed assets. Public routes to raw files return 404. Confirm public-use permission and that remaining purity settings/generic labels are acceptable. Fresh anonymised images would improve heavily masked views. The polishing registry capture does not contain its off-screen right-hand columns.

## E. Content needed from the owner

- Final production domain; public email, phone and social links.
- Confirmed commercial status for all five catalogue entries: Jewellery Billing, Manufacturing Management, Polishing Management, Inventory Management and Business Billing. The type system supports Available / Customizable / In Development / Coming Soon; all currently remain unknown (`null`) and say “Discuss availability.”
- Verified product scope, supported platforms, pricing and any product-specific approved screenshots. Custom project screenshots have not been reassigned as reusable products.
- Optional verified project stacks, client identities with permission, platform details and documented outcomes.
- Responsible legal business/contact identity, actual hosting/delivery providers and inquiry retention/deletion policy for final privacy/terms review.

## F. SEO status

Unique titles and descriptions, one H1, relevant internal links and Metadata API implementation cover all public pages. Branded 1200×630 OG images include the default card and distinct project, product and published-article cards. Favicon/Apple icons are included. Organization, WebSite, BreadcrumbList, Service, Article and CreativeWork schema are implemented without fake ratings or offers.

All absolute URLs derive from `NEXT_PUBLIC_SITE_URL`. No final domain is configured. The current local build therefore emits `noindex, follow`, omits canonical/absolute share URLs and produces an empty sitemap. The domain-configured build is checked with an isolated `.invalid` test origin; no domain or external DNS setting is changed. Supply the final domain **and rebuild** to enable complete indexable production metadata. Robots allows public pages and Next assets and references the sitemap when configured.

Validation outputs are in ignored `test-results/routes.json` and `test-results/seo-configured.json`. The route report records working paths, hidden paths, redirects, assets and broken links; the SEO report records the rendered metadata/schema per page.

Final validation: lint **passed**; TypeScript **passed**; production build **passed**; **9/9 tests passed**. The HTTP crawl checked **36 working public pages, 95 anchors, 16 screenshots and 13 share images**, with **zero broken links or routes** and no redirects. The three unpublished articles and raw/private image paths returned 404. Domain-configured rendered SEO checks passed for all 36 pages, with 36 sitemap entries. The temporary test origin was never saved to application configuration and the final local build has no configured domain.

## G. Forms status — exact destination

**Contact and Project Planner currently have no email, CRM or database destination.** Both POST to this website’s `/api/leads`; validation succeeds only for a valid payload, then the unconfigured delivery adapter returns **503**, with an explicit “not sent” error and copyable summary. There is no false success and no local inquiry database.

Set server-side `LEAD_WEBHOOK_URL` to a real HTTPS receiver and optionally `LEAD_WEBHOOK_TOKEN`. Only a provider 2xx acceptance triggers success. The full structured planner scope, industry, description and contact fields are delivered; verification tokens/honeypot are stripped. Unit tests cover accepted payloads, upstream errors, network failures and missing configuration. A real end-to-end provider test remains necessary after configuration. Optional Turnstile requires both keys.

The problem explainer is deterministic and browser-local. The contact handoff uses ephemeral memory, not URLs or persistent storage. Analytics is off because no provider is configured; when enabled it requires consent and uses only approved event names/industry values, never freeform inquiry data.

## H. Performance and accessibility

Sixteen lossless redacted WebP images total 800,338 bytes. `next/image` supplies responsive dimensions/lazy loading; full-resolution images are available in the native viewer without a gallery library. Public content is statically generated. Fonts remain self-hosted through `next/font`; existing reduced-motion styles are retained. Analytics loads only after consent.

Desktop and mobile viewer tests cover open, arrow navigation, zoom, Escape and focus return. Homepage and case-study layouts were checked at 320, 360, 375, 390, 430, 768, 1024 and 1440 pixels; mobile menu, guided handoff, form validation/error recovery and complete planner selection were exercised. No browser console warnings/errors occurred during those interactions. These are local functional/layout checks, not a claimed Lighthouse score or field Core Web Vitals measurement.

## I. Remaining before public launch

1. Set the final domain, real contact channels and desired social links; rebuild and deploy. The owner will connect DNS/Vercel domains separately.
2. Configure a real inquiry receiver and verify a contact + planner submission reaches it. Add shared hosting/WAF rate limits if needed; the built-in limiter is per instance.
3. Confirm product release statuses and publication rights for the screenshot collection.
4. Complete the actual business/provider/retention details in legal notices and review them for the intended launch.
5. If enabling analytics, configure the selected provider, disable unwanted automatic form tracking in GA, and verify the consent/event setup. Verify Search Console and submit the domain-generated sitemap after deployment.

The repository changes are complete; live domain/provider/account configuration remains with the owner. No external deployment, DNS modification or live message delivery was performed.
