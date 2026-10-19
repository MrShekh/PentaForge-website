# PentaForge

PentaForge’s business software website, built with Next.js 16.3.6 App Router, React 19, TypeScript and Tailwind CSS 4. The existing light design, Manrope / IBM Plex Mono typography, animation system and interactive planners are retained. Four real custom systems and 16 privacy-redacted screenshots provide the project evidence.

## Develop and validate

For the two-project production setup, follow [the Vercel deployment guide](docs/VERCEL-DEPLOYMENT.md). It covers the database, private file storage, administrator setup and matching webhook configuration.

Use Node.js 24 and the committed lockfile. On Windows use `npm.cmd` if PowerShell blocks `npm.ps1`.

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm start
npm run verify:routes
```

The route audit expects a local server on port 3000 and skips valid lead submission by default. Set `TEST_BASE_URL` to test another local port. `TEST_LEAD_DELIVERY=accepted` or `unconfigured` opts into synthetic delivery checks; use these only with isolated test services. Results are written to ignored `test-results/`.

After a build with the real `NEXT_PUBLIC_SITE_URL`, set `TEST_SITE_URL` to that same origin and run `node --import tsx scripts/verify-seo.ts`. This checks rendered HTML, metadata, schema, sitemap and robots. No request is sent to that domain.

## Architecture

- `app/(marketing)/`: the existing PentaForge website and its root layout, with unchanged public URLs.
- `app/(school-demos)/`: an isolated root layout and all 28 fictional school demo routes; no PentaForge navigation/style leakage.
- `app/api/`, `app/og/`, `app/sitemap.ts`, `app/robots.ts`: existing API and metadata endpoints.
- `data/`: services, industries, products, case studies, articles and screenshot metadata.
- `components/`: navigation, reusable sections, cards, workflows, accessible screenshot dialog and forms.
- `config/site.ts`: canonical origin, public contact channels and social links.
- `lib/`: SEO helpers, inquiry validation, delivery adapter, deterministic planner and consent-gated conversion events.
- `public/projects/`: approved, opaque-redacted WebP screenshots. Original files are never served.

## Configuration

Copy `.env.example` to `.env.local` for development. Configure environment variables in the hosting dashboard for deployment, then rebuild.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Set to `https://www.pentaforge.co.in` in Vercel Production. Production also uses this confirmed origin when blank. |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE` | Visible email/phone links. They do not configure form delivery. |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_GITHUB_URL` | Optional real HTTPS social links; blank values remain hidden. |
| `LEAD_WEBHOOK_URL` | Server-only HTTPS endpoint accepting validated inquiry JSON. |
| `LEAD_WEBHOOK_TOKEN` | Optional server-only bearer credential for that endpoint. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Optional Cloudflare spam protection; configure both keys together. |
| `NEXT_PUBLIC_GA_ID` | Optional Google Analytics `G-…` ID. |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | Set `true` to enable consent-gated Vercel Analytics. |
| `GOOGLE_SITE_VERIFICATION` | Search Console verification token. |

The official canonical origin is `https://www.pentaforge.co.in`. Production builds use it even when `NEXT_PUBLIC_SITE_URL` is missing or blank; a different configured origin fails validation. Vercel Preview/Development builds stay `noindex, follow`, omit canonical/share URLs and sitemap entries, and disallow crawling even if they inherit the production URL. Keep Vercel's System Environment Variables enabled: `VERCEL_ENV` controls this distinction, since both preview and production builds have `NODE_ENV=production`. Do not override `VERCEL_ENV`. Local development stays noindex; a standalone production build uses the official origin. Rebuild after configuration changes. Do not put secrets in `NEXT_PUBLIC_*` variables. See [the sitemap diagnosis and verification report](docs/SITEMAP-FIX.md).

## Vercel and the custom domain

Import this repository as a Next.js project, install with `npm ci`, and build with `npm run build`. Set the intended production environment values before that build. Connect the custom domain and DNS separately in Vercel when ready; this task did not modify either. After deployment verify the canonical origin, `/sitemap.xml`, `/robots.txt`, social cards and a real inquiry end to end. A displayed email address alone does not connect the forms.

## Content and screenshots

`data/caseStudies.ts` contains typed projects, workflows, supported features, platforms, technologies, cover images and related routes. Unknown technologies are left empty. `data/screenshots.ts` centralises titles, alt text and feature descriptions, using source dimensions from `data/screenshot-manifest.json`.

To add screenshots, put originals in ignored `.private/screenshots/`, inspect them at full resolution, and add exact opaque masks to `scripts/prepare-screenshots.mjs` where needed. Run `node scripts/prepare-screenshots.mjs`, inspect **every** output, then register approved images in `data/screenshots.ts`. The script needs the local private originals; ordinary builds do not. Keep private originals backed up securely outside Git. `.vercelignore` also excludes `.private/`. Do not copy unredacted customer images back into `public/`.

Screenshots retain their full aspect ratios. Cards and gallery images use `next/image`; below-fold assets lazy-load. The native dialog supports Escape, arrows, close, focus return and original-resolution zoom. The screenshot report maps all 22 originals to their disposition.

Products are separate from custom projects. `ProductStatus` supports Available, Customizable, In Development and Coming Soon. The five existing entries use `null` because commercial status is unknown; public pages say “Discuss availability.” Confirm release status, features, platforms, pricing and reusable-product rights before changing that. Do not repurpose a custom client screenshot as a product screenshot without confirmation.

Articles are controlled by `status` in `data/articles.ts`. Only published articles appear in listings, static params, related links, OG routes and sitemap. Three substantive guides are published; the other three return 404. New articles need unique useful content, a genuine author/publication date and related internal links.

## SEO

`lib/seo.ts` generates per-page metadata. `/og/default` and `/og/[slug]` provide 1200×630 branded PNG cards for projects, product inquiries and published articles. Favicon SVG, 32px PNG, 180px Apple icon and 192/512px brand assets are included. JSON-LD covers Organization (Ahmedabad, Gujarat, India), WebSite, BreadcrumbList, Service, Article and project CreativeWork. No invented reviews, prices, client identities or Product offers are emitted. `lib/routes.ts` is the canonical route inventory.

## Contact and project planner

Both forms POST JSON to `/api/leads`, validate with Zod on client and server, then use `lib/lead-adapter.ts`. Contact payload: name, business, phone, email, need, industry, message, consent and source. Planner payload additionally includes `scope.need`, `scope.platforms`, `scope.features` and `scope.stage`.

The delivery adapter sends that JSON to `LEAD_WEBHOOK_URL` with optional bearer authentication. Honeypot and verification tokens are removed before delivery. Only a 2xx provider acceptance returns success. Missing configuration returns 503; network/provider failure returns 502. The browser keeps entered data and offers a copyable summary on error. There is no database or email delivery configured today, and the API does not persist inquiries locally.

The API also limits request size, checks origins, validates optional Turnstile verification and applies a bounded per-instance request limiter. Use hosting/WAF rate limits for shared protection across instances. The deterministic problem explainer makes no AI call. Its optional contact handoff uses one-time memory with a ten-minute expiry, not URLs or persistent storage.

## Analytics

Analytics are off unless configured **and** accepted by the visitor. Supported conversion events: `start_project_clicked`, `contact_started`, `contact_submitted`, `planner_started`, `planner_completed`, `case_study_viewed`, `product_viewed`, `industry_selected`. Planner completion means provider-accepted delivery. Event parameters are restricted to an optional known industry; no freeform data, names, email, phone, message or planner answers are passed.

Google automatic pageviews are disabled; explicit events use a clean root URL. Disable Enhanced Measurement/form interaction collection in the GA property when configuring it. Vercel pageview URLs have query strings and fragments removed. Rejecting/revoking consent prevents analytics loading after reload. Neither provider is configured in this repository.

See `docs/PRODUCTION-REPORT.md` and `docs/SCREENSHOT-REVIEW.md` for validation evidence, asset decisions and the remaining launch inputs.

## Control Center leads integration

See [setup, API contract, tests and production configuration](docs/CONTROL-CENTER-INTEGRATION.md). The website and Control Center remain independently built and deployed.

## Multi-industry content and inquiries

See [the expansion report](docs/MULTI-INDUSTRY-EXPANSION.md) for routes, changed files, validation and remaining owner checks. Eleven industries share one page template. `data/industry-types.ts` defines the content shape; `data/industries.ts` preserves the existing industries and combines the six additions from `data/industry-expansion.ts`. New offerings describe custom capabilities, not released products or completed client projects.

`data/industry-options.ts` supplies the contact and Project Planner options and the mapping to the existing Control Center v1 contract. Restaurants, hotels, education, healthcare and logistics submit as `Other`; supermarkets submit as `Retail`. The exact selected label is retained at the start of the project description. Client and server validation reserve space for that label within the receiver's 3,000-character limit. Existing categories and the authenticated receipt/idempotency contract remain unchanged. Distinct new industry filters in Control Center would require a separate coordinated change.

## School website collection

Start at `/industries/education`. The three complete fictional demonstrations are `/demos/littlebloom`, `/demos/horizon` and `/demos/nextgen`. NextGen includes student and parent portal previews with sample data only. Read [the school collection guide](docs/SCHOOL-DEMO-COLLECTION.md) for all routes, customization, photography licenses, screenshots, browser checks and deployment notes.

School demo admission forms simulate submissions without sending or saving personal information. The separate PentaForge education enquiry uses the existing secured lead workflow, retaining the allowlisted selected demo, city and required service in the validated description. Demo routes are always noindex and excluded from the marketing sitemap. The education service page uses the existing production-origin indexing and canonical configuration.

No new runtime dependencies are required. `scripts/verify-school-demos.cjs` runs with Playwright supplied by a local testing environment; set `PLAYWRIGHT_MODULE` to its installed module path if it is not on Node's module search path. Run with `node --import tsx scripts/verify-school-demos.cjs` and `TEST_BASE_URL` set to your local production server. It launches headless Edge, tests interfaces, captures six real preview screenshots and mocks the real lead endpoint so no test lead is delivered.
