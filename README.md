# PentaForge

A complete Next.js marketing website for a software engineering company. The site explains real business workflows before technical detail, with an editorial warm-white design, cobalt accent, connected system diagrams and responsive layouts.

## Stack

Next.js 16.3.6 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide and Zod. Next.js Server Components render the page content; client components are limited to navigation, interactive diagrams, filters, planners, forms and optional analytics. No GSAP dependency is needed for the restrained animation system. Manrope and IBM Plex Mono are self-hosted at build time with `next/font`. Verified screenshots use `next/image` when supplied; the initial previews are clearly labeled HTML interface concepts.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Node.js 22 or 24 LTS is recommended. Copy `.env.example` to `.env.local` and fill in only verified values. No secrets are committed.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

With a running server and no lead webhook configured, `npm run verify:routes` crawls internal links, checks headings, unique metadata, JSON-LD syntax, anchors, robots, sitemap, unknown-route 404s and form responses. Set `TEST_BASE_URL` to check another local server. Reports are saved in ignored `test-results/`.

## Structure

```
app/                 Routes, metadata, error pages, API and global styles
components/          Shared page, card, navigation and layout components
  diagrams/          Hero system and interactive industry workflows
  forms/             Contact, project wizard, local planner and verification
  sections/          Composable homepage sections
config/site.ts       Company identity and verified public configuration
data/                Services, industries, products, case studies, articles
lib/                 SEO, route inventory, validation, delivery adapter
public/              Favicon and future verified screenshots
tests/               Meaningful lead validation and local planner tests
scripts/             Route and API verification
```

## Routes and content

The homepage includes the full brief’s story and interactions. Service and industry detail routes are generated from typed data. Products, project outlines and article pages have dedicated route families. Unknown slugs return 404. Company, process, technology, contact, privacy and terms pages complete the site.

Add a product in `data/products.ts`. Its navigation, listing and detail page are generated automatically. Product concepts are not advertised as released software. Update the product status model and verified availability copy when a real release is ready.

Add case studies in `data/caseStudies.ts`. Supply verified problem, workflow, solution and challenge text. Put a screenshot in `public/images/` and set `image` and `imageAlt`. The card and detail page use `next/image`. Replace the explicit verification-pending/result placeholders only with approved project facts. Current illustrative interfaces contain sample data and are not customer screenshots.

Articles use a typed, section-based content architecture in `data/articles.ts`. Each section has an anchor, title and paragraphs; this generates the table of contents and reading time. No arbitrary HTML is injected. Set `status: 'published'`, a verified author and a real ISO publication date after editorial approval. Draft pages remain available for review, are intentionally `noindex`, and are excluded from the sitemap. Published articles are included automatically and emit Article JSON-LD when author/date are present. Add an image model later if editorial photography becomes available.

## Company configuration and SEO

`config/site.ts` centralizes the company name, description, contact channels, socials and canonical origin. Empty social/contact values are hidden. There are no invented addresses, client logos, results, reviews or contact details.

Set `NEXT_PUBLIC_SITE_URL` to the final public HTTPS origin, for example your verified custom domain. It must not be a Vercel preview URL. When unset, the app deliberately omits canonicals and sitemap entries instead of inventing a production domain. Once configured, every page gets a canonical and Open Graph URL, and `/sitemap.xml` and `/robots.txt` reference the correct origin. Titles/descriptions and Open Graph/Twitter text are route-specific. Organization, WebSite, Service and BreadcrumbList structured data are centralized. No ratings or fake business facts are emitted.

`GOOGLE_SITE_VERIFICATION` adds Search Console verification. After public deployment, verify the real domain and submit its sitemap in Search Console. Review draft publication settings before indexing. A social preview image is not fabricated; add an approved image and metadata when available.

## Forms and delivery

Contact and project-wizard requests POST to `/api/leads`. Shared Zod validation runs in the browser and server. The route checks origin/content type, bounds the body size, validates consent and scope, and uses a honeypot and bounded instance-local request limit. Inputs are rendered as escaped text. The delivery adapter posts JSON to `LEAD_WEBHOOK_URL` over HTTPS, with optional bearer `LEAD_WEBHOOK_TOKEN`. Keep both server-only. Configure the receiving endpoint to return 2xx only after durable acceptance; email/CRM delivery can then be connected there.

Without a webhook, valid submissions return **503**, never a fake success. The form retains the entered details and offers a copyable summary. A success state appears only after an adapter acceptance. Timeouts are reported as unconfirmed delivery. No form payload is logged by the application.

For Turnstile, configure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` together, and register the deployment’s hostname. The server verifies the challenge. Add platform/WAF rate limiting before public launch: the included limiter is per process and is not a distributed abuse control. Trusted proxy handling must match your hosting environment. Protect the receiver against duplicate deliveries if you add retry behavior.

The guided problem explainer uses deterministic keyword rules in `lib/planner.ts`, with a visible local-demo label. It performs no AI request. Its contact link carries the brief as a URL parameter, so users are told to avoid confidential data. Replace this handoff with an agreed storage/session approach if sensitive inputs become a requirement. The project wizard retains scope only in component memory; it does not claim to save unfinished projects.

## Analytics

Leave all IDs empty to keep analytics disabled. Set a real `NEXT_PUBLIC_GA_ID` and/or `NEXT_PUBLIC_VERCEL_ANALYTICS=true` to enable the optional consent control. Scripts load only after opt-in; the visitor can revoke consent. Query strings are stripped from Vercel events and the initial GA page location to avoid collecting planner text. Disable automatic history/page-view measurement in GA before enabling it, or implement a reviewed route tracking policy that always strips query strings. Confirm provider disclosures and retention choices before public launch.

## Vercel deployment and custom domain

Import this repository in Vercel, choose the Next.js framework preset and use the repository root. Install with `npm ci`, build with `npm run build`. Configure the production domain and required environment variables before the public build. Preview deployments should remain access-protected and retain the production canonical origin. Use a separate test delivery endpoint for staging.

Add the verified custom domain under the project’s domain settings and follow the exact DNS records Vercel provides. Confirm HTTPS, canonical metadata, sitemap, robots, form delivery and error states on the final origin. Do not replace the App Router with a client-only SPA or a static export: the lead API requires the Next.js runtime.

No remote deployment is configured in this checkout. The requested native Next.js server and lead endpoint are prepared for Vercel; the Sites Vinext starter was not substituted for the explicitly requested stack.

## Before going public

Supply the domain, contact details and configured delivery service. Review the legal notices with the verified business details, providers and retention requirements. Replace project/product placeholders only with approved information. Publish reviewed articles with real authors/dates. Configure production spam controls and verify delivery end to end. No actual email/CRM credentials, real customer screenshots or final domain were provided for this initial build.

The CSS includes reduced-motion support, touch layouts, visible focus, keyboard menus, semantic headings and responsive diagrams. Keep the development server alive while reviewing locally; use a production server for performance measurements. This build makes no unmeasured Lighthouse or Core Web Vitals claims.
