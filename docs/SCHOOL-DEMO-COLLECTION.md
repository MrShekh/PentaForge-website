# School website demo collection

Three fictional school websites extend PentaForge's education offering. They are working frontend demonstrations, not real institutions, client deployments or operational school ERP systems.

## Entry points and route inventory

PentaForge showcase and real project enquiry: `/industries/education`.

| School | Routes beneath its base path |
| --- | --- |
| `/demos/littlebloom` | Home, `/about`, `/programs`, `/teachers`, `/campus-life`, `/gallery`, `/admissions`, `/contact` |
| `/demos/horizon` | Home, `/about`, `/academics`, `/admissions`, `/facilities`, `/student-life`, `/achievements`, `/news`, `/gallery`, `/contact` |
| `/demos/nextgen` | Home, `/about`, `/academics`, `/admissions`, `/facilities`, `/events`, `/gallery`, `/contact`, `/student-portal`, `/parent-portal` |

There are 28 school routes and 70 linked public pages across the combined website.

## Design and functionality

- **LittleBloom Academy:** cream, orange, yellow and green; Playfair Display and DM Sans; asymmetrical photography, playful educational marks, programme cards, illustrative educator profiles, creative-learning content and a homepage enquiry simulation.
- **Horizon International School:** navy, ivory and gold; full-width architectural photography, serif editorial hierarchy, academic pathways, campus-tour images, a journal/calendar, admission steps and student-project stories without invented awards or rankings.
- **NextGen Public School:** emerald and white; Manrope, modular layouts, a sample dashboard overlay, methodology cards, announcements and separate student/family portal previews.

Each has its own homepage composition, identity, responsive navigation and content direction. Interior pages share accessible building blocks while retaining school-specific copy, typography and styling. All listed interior pages are implemented.

Mobile navigation uses a native dialog with Escape dismissal and focus return. Programme tabs support arrows/Home/End. Gallery filters update visible results, and a native lightbox supports previous/next, arrow keys, Escape and focus return. Native FAQ accordions and calendar list/calendar switches work. Local forms validate inputs and explicitly report simulated completion.

The portals include all requested areas: student dashboard, attendance, timetable, homework, notices and results; parent child switching, attendance, fee summary, performance, notices and message preview. Homework completion and communication previews affect only the mounted page. No accounts, authentication, database, payment processing or real student records are implemented.

## Architecture and existing-site preservation

The existing marketing routes were moved, without changing their URLs, into `app/(marketing)/`. Its root layout retains the existing fonts, CSS, navigation, footer, consent/analytics behavior and SEO. The previously built team section is retained.

`app/(school-demos)/layout.tsx` is a separate root layout. It loads only school fonts and the demo reset; the three school designs use CSS Modules. Next.js performs a full navigation when crossing root layouts, preventing stylesheet and navigation leakage between the agency and school sites. Ordinary navigation within a demo uses Next links.

`app/(school-demos)/demos/[school]/[[...page]]/page.tsx` statically generates the complete typed route inventory. Unknown school IDs, inherited-object keys and unknown page segments are rejected. `app/(marketing)/industries/education/page.tsx` takes precedence as a dedicated education landing page; the general industry template no longer generates this one slug. Existing school/college operational problems, workflows, modules, benefits and FAQs remain on the new education page.

Unchanged integration endpoints and infrastructure: `app/api/leads`, Control Center, server credentials, rate limits, origin checks, spam protection, receipt validation and submission idempotency. Existing product data, real project screenshots, case studies and published guides remain.

### Content and customization

| Location | Edit here |
| --- | --- |
| `data/school-demos/index.ts` | School identities, page labels/headings, programmes, example educators, event data, gallery categories and demo IDs. |
| `components/demos/littlebloom/` | Playful homepage composition and school-specific styling. |
| `components/demos/horizon/` | Institutional homepage and editorial styling. |
| `components/demos/nextgen/` | Modern homepage, portal interface, sample records and portal styles. |
| `components/demos/school-interior.tsx` | Interior page templates: about, academics, staff, campus, life, achievements, admissions, news, gallery and contact. |
| `components/demos/school.module.css` | Shared school components and distinct theme tokens. |
| `components/demos/widgets.tsx` | Programme tabs, gallery/lightbox, simulated form and calendar. |
| `components/education/` | Agency showcase styles and real enquiry context wrapper. |
| `lib/school-demos/enquiry.ts` | Service options, city validation and description mapping. |
| `public/school-demos/` | Licensed photos and actual website screenshots. |

No new production dependencies were installed. Existing Next.js, React, Framer Motion, Lucide and Zod are reused. Fonts are self-hosted through `next/font`; portraits/photography use `next/image`, declared sizes, eager hero loading and lazy secondary images. Reduced-motion preferences disable decorative CSS animation and motion reveals.

## Photos, screenshots and claims

Ten local, optimized WebP images come from Pexels. `data/school-demos/photo-manifest.json` records each source page, photographer, original image URL, license, alt text, dimensions and verification date. [Pexels license](https://www.pexels.com/license/). Source attribution is available on the education page and linked from every school footer. Photos are illustrative; neither the people nor places are represented as belonging to these fictional schools or endorsing PentaForge.

Six actual browser screenshots—desktop and mobile for each school—are stored in `public/school-demos/previews/`. They are generated from rendered pages by the browser verification script, not invented interface mockups. Update them after changing homepage designs. Full-page QA screenshots are kept in ignored `test-results/school-demos/`.

Faculty identities, parent perspectives, events, dates, programmes and portal records are explicitly fictional/sample content. Faculty initials are used rather than assigning stock faces to invented people. No board affiliation, accreditation, real award, exam statistic, operating address or school phone number is asserted. The supplied brief's visual directions informed the designs; an Ed ukids reference image was not attached to this request.

## Honest enquiries and attribution

All school-site forms are local simulations. They perform client-side validation, clear entered values on completion, and explain that nothing was sent or saved. There are no network submissions or browser storage for these demo forms.

The agency form at `/industries/education#school-enquiry` is a real PentaForge enquiry using the existing contact component. It collects name, school name, phone, email, city, service and project message. Accepted service labels: School Website, School ERP, Admission System, Website + ERP, Other Custom Software.

“Build a website like this” and “Request Similar Website” link to `/industries/education?demo=<allowlisted-id>#school-enquiry`. Only the three known IDs are accepted. No personal information is placed in the query string.

City, service and design name/ID are retained in the lead description. Need maps to the existing Web Platform or Custom Software enum; industry remains Schools & Colleges on the website, mapped to Other with the original industry prefix for the unchanged Control Center v1 receiver. A 2,400-character school-message limit reserves space for context within the receiver's 3,000-character description maximum. Invalid city control characters or unsupported service labels are rejected before submission. Authentication, Turnstile, rate limits, server validation, receipts and idempotent retries are reused, not replaced.

Browser verification intercepts the lead endpoint with an explicit mock. It does not create a real lead in the configured receiver. Test a real delivery against an intended test service before launch.

## SEO and indexing

The agency education page has a unique title/description, Breadcrumbs, Service structured data, internal service links and its existing sitemap entry. Local search terms for Rajkot, Ahmedabad, Gujarat and India are used naturally. Open Graph follows the site's existing branded image and canonical-origin configuration.

The 28 school demo routes always render `noindex, follow` and are excluded from `lib/routes.ts`/the marketing sitemap. Their school identities must not become indexed real institutions.

The confirmed production origin is `https://www.pentaforge.co.in`. Production builds default to it when the variable is blank; set `NEXT_PUBLIC_SITE_URL` to that origin in Vercel Production. Preview/development deployments remain noindex regardless of that value. School demo noindex remains explicit in every environment. See `docs/SITEMAP-FIX.md` for the indexing policy and verification.

## Run, verify and deploy

Use Node 24 and the existing package lock:

```sh
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm start -- --port 3013
```

For the existing route crawl set `TEST_BASE_URL=http://localhost:3013` and `TEST_LEAD_DELIVERY=skip`, then run `node scripts/verify-routes.mjs`.

For browser verification run `node --import tsx scripts/verify-school-demos.cjs` with `TEST_BASE_URL` set to the preview origin. Playwright must be available in the testing environment and Microsoft Edge installed; optionally set `PLAYWRIGHT_MODULE` to the module's absolute location. This is a test-only tool, not a production dependency. The script captures preview assets and checks 320/390/768/1280/1440 viewport behavior, navigation, page headings, noindex, galleries, tabs, simulated forms, portal interactions and a mocked real enquiry. Reports go to ignored `test-results/`.

Deploy the same Next.js project using the existing hosting setup. Keep existing machine secrets server-only. Commit both moved marketing routes and new group directories together; route groups are filesystem organization and do not alter URLs. Keep approved photos, preview screenshots and license metadata in the deployment source. Build normally; no separate school backend is required. Review all external integrations separately before converting a demo into an operational school system.

No deployment, DNS changes, production environment changes or Control Center modifications were performed for this collection.

## Final verification — 10 October 2026

| Check | Result |
| --- | --- |
| TypeScript, ESLint, whitespace checks | Passed. |
| Unit/API tests | 24 passed; receiver responses mocked. |
| Production build | Passed; 88 generated pages including all 28 school routes. |
| Combined website crawl | 70 pages, 198 anchors, 16 existing project screenshots and 13 share images checked; no broken links or errors. |
| Edge browser verification | All 28 school routes passed; zero runtime/console errors. |
| Responsive layouts | School routes checked for overflow at 320px and 768px; homepages captured at 1440px and 390px. Interactions also exercised at 1280px. |
| Interactive behavior | Mobile dialogs and focus return, gallery filters/lightbox/arrows, keyboard programme tabs, FAQs, simulated admissions, calendar toggle, student homework/results, parent child/fee/message views and attributed PentaForge enquiries passed. |
| Indexing and invalid routes | All demo pages carry noindex. Unknown schools, inherited object names, unknown pages and nested invalid segments return HTTP 404. |
| Visual review | Desktop/mobile homepages, education showcase and parent portal inspected using actual browser screenshots. Six WebP preview screenshots generated from the finished homepages. |
| Reduced motion | Browser suite ran with reduced motion enabled; CSS disables decorative transitions/animations and the reveal component respects the preference. |

Reports: `test-results/routes.json` and `test-results/school-demos/browser.json` (ignored local artifacts). Full-page screenshots are in `test-results/school-demos/`. The browser test also checks the calendar and invalid URL responses before recording success.

No real lead was submitted. Live delivery still needs an intentional test against the intended test receiver. Lighthouse scores and real-device Core Web Vitals were not measured; no numerical performance or full accessibility-conformance claim is made. Before public launch, configure the approved production origin and confirm business contact details. Fictional school content and frontend-only portal behavior are intentional parts of the delivered collection.
