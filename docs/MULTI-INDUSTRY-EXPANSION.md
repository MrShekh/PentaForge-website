# Multi-industry expansion

Implemented in `E:\Kaam\PentaForge\pf\new pentaforge website`. Validation completed October 10, 2026 (Asia/Kolkata).

## 1. Files changed in this expansion

The repository already contained uncommitted production and Control Center integration work. The list below identifies this expansion, rather than attributing the entire working-tree diff to it.

| Files | Change |
| --- | --- |
| `data/industry-types.ts` (new) | Typed industry content, module groups, problems, benefits, services, proof and FAQs. |
| `data/industry-expansion.ts` (new) | Six substantive industry offerings with unique workflows and scoped capabilities. |
| `data/industry-options.ts` (new) | Shared inquiry labels, route slugs, v1 category mapping and description-length budget. |
| `data/industries.ts` | Retains five existing industries; combines eleven; selects eight homepage cards and compact workflow/navigation data. |
| `app/industries/page.tsx` | Grouped directory containing all eleven industries. |
| `app/industries/[slug]/page.tsx` | One reusable industry template with problems, workflow, modules, benefits, appropriate real work, FAQs, related services and inquiry CTAs. |
| `components/industry-cards.tsx` (new) | Eight server-rendered homepage cards. |
| `components/sections/home-content.tsx`, `components/sections/hero.tsx` | Industry section and broader supporting copy; original hero headline retained. |
| `components/diagrams/workflow.tsx` | Compact, labeled eleven-option workflow selector. |
| `data/navigation.ts`, `components/navigation/navbar.tsx`, `app/layout.tsx` | All industry links; server-provided navigation data; new stylesheet. |
| `app/industry-expansion.css` (new) | Responsive card/module layouts, selector and bounded dropdown height using existing design tokens. |
| `components/forms/contact-form.tsx`, `lib/lead-schema.ts`, `lib/lead-adapter.ts` | New selections and receiver-compatible mapping; validates combined description length. |
| `lib/analytics-events.ts` | Extends the consent-gated industry slug allowlist. |
| `tests/industries.test.ts` (new) | Route/content integrity, payload preservation, description boundaries and mocked delivery receipt tests. |
| `scripts/verify-routes.mjs` | Adds an unknown-industry 404 check. |
| `README.md`, this report | Architecture, mapping and validation notes. |

## 2. Routes

Added:

- `/industries/restaurants`
- `/industries/hotels`
- `/industries/education`
- `/industries/healthcare`
- `/industries/supermarkets`
- `/industries/logistics`

Retained `/industries` and all five original detail routes: `/industries/jewellery`, `/industries/manufacturing`, `/industries/retail`, `/industries/startups`, `/industries/other-businesses`.

Each new page describes possible custom development, with industry-specific business problems and modules. No new product releases, client projects, screenshots, metrics or integrations are asserted. Existing jewellery/manufacturing proof and product records are preserved.

## 3. Homepage

The headline remains “Your business is unique. Your software should be too.” Supporting copy now addresses multiple business types. The existing industry section contains eight cards: jewellery, manufacturing, restaurants, hotels, education, healthcare, supermarkets/retail and logistics. Each includes a practical problem, four capabilities and a detail-page link.

The workflow explorer includes all eleven industries in a native select, avoiding a long row of mobile tabs. Its workflows are explicitly described as examples to build around. The existing real-work section and animation implementation are retained.

## 4. Navigation and accessibility

The Industries dropdown and mobile navigation use all eleven links. The existing dropdown style, mobile details controls, Escape behavior and focus handling remain. Desktop dropdown height is bounded and scrollable. The directory groups offerings by business activity. The selector has an associated label, controlled region and polite update announcement; card links and workflow buttons retain native keyboard semantics. Layout CSS includes responsive breakpoints and reduced-motion handling.

These details were reviewed in source and rendered HTML. Interactive keyboard, screen-reader, animation and mobile visual checks remain unverified in this session because no browser automation tool was available.

## 5. Contact and Project Planner

Both flows share eleven industry options. Existing request fields, server-issued submission IDs, unchanged-payload retries, authentication, validation and acceptance receipt checks remain.

The unchanged Control Center v1 receiver accepts only Jewellery, Manufacturing, Retail, Startup and Other. To preserve compatibility:

| Website selection | Receiver category |
| --- | --- |
| Restaurants & Cafés, Hotels, Schools & Colleges, Healthcare, Logistics | Other |
| Supermarkets | Retail |
| Existing five selections | Unchanged |

For new selections, the project description begins with `Industry: <exact selection>` followed by the visitor's description. Validation reserves the prefix length within the receiver's 3,000-character limit; no text is silently truncated. Existing Control Center files, schema and database were not changed. New industries will use the receiver categories above in its industry filter.

## 6. SEO

All new pages have unique titles and descriptions, breadcrumbs, Service structured data and internal links. Static routes and the sitemap derive from the existing shared inventory. No invented review, rating, pricing or customer evidence was added.

The current build has no canonical production origin configured. All 42 pages correctly render `noindex, follow`, omit canonical and absolute share-image URLs, and produce no sitemap URL entries. The existing domain-configured behavior is retained; configure the real origin and rebuild when ready, then run the configured-domain SEO audit. No production environment variables were changed.

## 7. Verification

| Check | Result |
| --- | --- |
| TypeScript | Passed. |
| ESLint | Passed. |
| Unit/API tests | 18 passed, including four new industry tests; delivery mocked. |
| Actual Control Center schema compatibility | All 22 combinations (11 industries × contact/planner) accepted by the existing schema in a read-only local check. No receiver/API/database writes. |
| Production build | Passed; all eleven industry pages statically generated. |
| Local production HTTP crawl | All 42 public pages passed; no broken internal links or anchors; 107 anchor references checked. |
| Original assets | All 16 approved screenshots and 13 generated share-image routes responded successfully. |
| Invalid/unpublished/private routes | Expected 404s, including unknown industry slugs. |
| Invalid contact request | Expected 400; valid lead delivery explicitly skipped. |
| Rendered HTML audit | 42 unique titles and descriptions; noindex/canonical/sitemap behavior passed; eight homepage cards, eleven workflow choices and eleven contact choices. |
| Whitespace | `git diff --check` passed. |

Ignored local evidence: `test-results/routes.json` and `test-results/industry-rendered.json`. Preview: `http://localhost:3010/industries` while the local production server is running. The preview is not a deployment.

## 8. Owner verification and limits

- Review the new business-facing copy and the actual mobile/desktop experience, including menus, animations and workflow selection. Interactive browser QA was unavailable here.
- Verify a real inquiry end to end against an intended test receiver before launch. This pass did not create leads in the configured Control Center.
- Confirm the final domain, contact/social details and commercial availability separately; no dummy values were promoted to verified facts.
- Any specific hardware, payment, delivery-platform, OTA, carrier, tax, healthcare privacy or regulatory requirements must be scoped and verified for the commissioned implementation, as the pages explain.
- Distinct new industry filters in Control Center require a future coordinated receiver change; exact selections are retained in descriptions today.

No deployment, DNS changes, production environment edits or Control Center changes were performed.
