# PentaForge — Complete On-Page SEO Audit

**Audit date:** 20 October 2026, Asia/Calcutta. **Official origin:** https://www.pentaforge.co.in. **Scope:** 42 published, indexable marketing pages; 28 intentionally noindex school demo pages checked for exclusion. **Mode:** audit only. This document is the only repository file created or changed during this task. No website implementation, environment change, deployment or Search Console submission was performed.

## A. Executive summary

The production site's previous empty-sitemap/noindex problem is resolved in the live responses observed during this audit. All 42 marketing pages return HTTP 200, carry `index, follow`, have self-referencing www canonical URLs, and appear in the live sitemap. Each has one H1, a unique title, a unique meta description and Open Graph/Twitter metadata. **No active P0 indexing blocker was found in the checks performed.** This is evidence of crawl/index eligibility, not confirmation that Google has indexed or ranked the pages.

The highest-value work is now commercial specificity and credible local relevance. Rajkot is the primary acquisition market in the owner's brief, but only `/industries/education` mentions Rajkot in the audited main-page text. The homepage explains the proposition through a slogan and broad service language; it does not establish the geographic service area. Several product pages omit “software” from both the title and H1 and share substantial generic enquiry copy. The strongest proof—four real jewellery software case studies—is not fully connected to the corresponding product pages and article explanations.

Five highest-impact improvements, subject to approval:

1. **P1: Clarify the homepage and custom-software service proposition.** Preserve the minimalist design; make the service category, intended business buyer and truthful Gujarat/Rajkot service coverage explicit in a few existing text positions.
2. **P1: Strengthen the jewellery commercial cluster.** Distinguish the industry hub, manufacturing/billing/polishing product-enquiry pages and proof-oriented case studies, with one primary query family per page.
3. **P1: Prepare one useful Rajkot service-area page.** Publish `/locations/rajkot` only after approving genuinely useful content and delivery details; do not imply an office, Rajkot clients or local staff. Ahmedabad is a second, conditional page rather than an automatic clone.
4. **P1: Improve first-party trust and contact clarity.** Confirm the existing Ahmedabad claim, provide approved real contact channels and clarify product availability/delivery scope. Keep verified project screenshots prominent; add no invented outcomes or testimonials.
5. **P2: Add precise contextual links.** Connect each jewellery product to its matching case study, both jewellery articles to the exact screens/workflows they describe, and the jewellery industry page to the omitted stock/operations case study.

There is also a **P1 technical consolidation recommendation**: the non-www origin serves duplicate content with HTTP 200. Its www canonicals are correct, so this is not a critical indexing block, but a permanent apex-to-www redirect would make the preferred origin unambiguous.

### Evidence and method

- **[LIVE]** Direct HTTP GETs to all 42 public routes; server-rendered HTML parsed in Edge with JavaScript disabled. Collected titles, descriptions, canonicals, robot directives, H1–H3 structure, OG/Twitter fields, JSON-LD, main-content/global links and image alt attributes. Checked all 13 unique advertised social-image endpoints, sitemap, robots, draft routes, demo exclusions, location candidates, error examples and origin variants. No forms were submitted.
- **[CODE]** Reviewed `lib/routes.ts`, `config/site.ts`, `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, marketing root/layout/page templates, homepage components, `components/screenshot-gallery.tsx`, `data/services.ts`, `data/industries.ts`, `data/products.ts`, `data/articles.ts`, `data/caseStudies.ts`, project screenshot documentation and team data. Repository HEAD at audit start: `a898f13` (`sitemap fixing`).
- **[OWNER]** The supplied business brief establishes the service offering, verified jewellery experience and priority order Rajkot → Ahmedabad → Gujarat → India. It does not establish a Rajkot office or named local customers.
- **[RESEARCH]** Public search discovery and selected competitors' own pages/documents were consulted. They establish comparable offerings, not verified rankings or customer results.
- **[RECOMMENDATION]** Keyword ownership, proposed copy, local-page outlines and sequencing are editorial recommendations. Search volumes, difficulty, click-through rates, ranking positions and revenue forecasts were not measured or invented.
- No Search Console account, analytics, backlink dataset, Google-selected canonical inspection, field Core Web Vitals, Lighthouse run, mobile visual audit, full accessibility audit or live enquiry-delivery test was available/performed as part of this audit. These are explicit limits, not inferred failures. No code was changed, so implementation tests/builds were not rerun.

## B. Current SEO strengths

| Verified strength | Evidence and implication |
| --- | --- |
| Complete production indexable inventory | [LIVE] 42/42 intended marketing routes are HTTP 200 and included once in the sitemap. No draft or demo URL appears there. |
| Correct metadata basics | [LIVE] 42 unique titles, 42 unique descriptions, 42 single H1s, correct www canonicals and no conflicting X-Robots-Tag on these responses. |
| Search-readable HTML | [LIVE] Important headings, copy, internal links and JSON-LD exist without running client JavaScript. Interactive presentation does not replace the principal content. |
| Social metadata coverage | [LIVE] OG and Twitter fields are present on all 42 pages; all 13 distinct advertised image endpoints return HTTP 200 image/png. |
| Real project evidence | [CODE/LIVE] Four jewellery case studies with 16 documented application screenshots, workflow narratives and specific engineering considerations. Production documentation distinguishes actual interfaces from product availability. |
| Accurate restraint in new industries | [LIVE/CODE] Restaurant, hotel, healthcare, logistics and other expansion pages describe what can be built; they do not present invented completed projects. Manufacturing's example is explicitly jewellery manufacturing. Education demos are clearly fictional. |
| Useful structured data | [LIVE] Organization and WebSite across marketing pages; BreadcrumbList on all 41 non-home pages; Service on seven service pages and eleven industry pages; Article on three published guides; CreativeWork on four case studies. No fabricated review/rating markup found. |
| Existing internal-link foundation | [LIVE] Homepage links to services, industries, products, case studies, articles and contact. Commercial detail pages generally link to contact and relevant hubs. Audited same-site links resolve within the known inventory; no unresolved marketing-page fragment targets were found. |
| Honest content publication control | [LIVE/CODE] Three draft article URLs return 404/noindex. All 28 school demo pages are HTTP 200 with noindex and correctly excluded from the sitemap. |

### Architecture inventory

| Group | Count | Role |
| --- | ---: | --- |
| Homepage | 1 | Brand, offering overview, proof and enquiry entry point |
| Solutions hub + service details | 8 | Seven distinct service intentions |
| Industries hub + industry details | 12 | Eleven business/workflow audiences |
| Products hub + product enquiries | 6 | Five scoped product discussions, not confirmed off-the-shelf purchase offers |
| Work hub + case studies | 5 | Four completed jewellery software examples |
| Company + process + technology | 3 | Identity, delivery process and engineering approach |
| Contact | 1 | Project enquiry |
| Insights hub + published articles | 4 | Three useful supporting guides |
| Privacy + terms | 2 | Trust/legal utility; no commercial keyword stuffing recommended |
| **Total audited public pages** | **42** | All are presently indexable in their live directives |
| Location pages | **0** | `/locations/rajkot` and `/locations/ahmedabad` return 404; no location routes exist in the route inventory |

## C. Critical problems and priority findings

### P0 — Critical technical SEO

**No active P0 blocker confirmed.** The old sitemap failure must not be carried forward as a current finding: [the live sitemap](https://www.pentaforge.co.in/sitemap.xml) contains 42 entries and [robots.txt](https://www.pentaforge.co.in/robots.txt) advertises it. All public pages are indexable in their HTML. The homepage canonical omits the trailing slash while the sitemap includes it; URL normalization produces the same root URL, so this is not a mismatch or a reason to change routing.

Search Console may still show historical reports. The owner should verify its current processing/coverage state and inspect representative URLs; this audit cannot infer Google's index from an HTTP response. Retain the existing preview guard and demo noindex rules.

### P1 — High-value commercial and technical improvements

| Finding | Evidence | Recommended action |
| --- | --- | --- |
| Rajkot relevance is underdeveloped | [LIVE] Only education main content mentions Rajkot. Homepage/custom-software/jewellery pages have no explicit Rajkot coverage. | Add a natural service-area statement and assign geographic search intent deliberately; create a useful Rajkot page only after content approval. |
| Product naming is underspecified | [LIVE] Titles/H1s include “Manufacturing Management,” “Polishing Management,” “Inventory Management” and “Jewellery Billing,” without the service/product category word “software.” | Clarify jewellery/software scope in titles, H1s and opening text. Do not replace precise user benefit copy with keyword lists. |
| Product pages do not establish enough differentiated buyer information | [LIVE/CODE] Five pages use the same introduction, scope disclaimer and broadly repeated structure; only names, summaries and module lists vary. | Add specific use cases, data inputs/outputs, deployment options only when confirmed, implementation questions and direct proof links. Their approximately 240–246 raw main-text tokens are a clue to shared templates, not a word-count ranking threshold. |
| Business identity needs owner confirmation | [LIVE/CODE] Company/contact/footer and Organization address assert Ahmedabad; this is a current website claim, not independently verified office evidence. The contact page has no mailto/tel links and Organization has empty sameAs. | Confirm the location wording and approved public email/phone/social profiles. A working enquiry form remains a valid channel; absence of phone alone is not an indexing defect. Never invent an address or a Google Business Profile location. |
| Non-www content remains publicly duplicated | [LIVE] `https://pentaforge.co.in/` and its custom-software page return 200 with correct www canonicals. HTTP redirects to HTTPS, but apex HTTPS does not redirect to www. | When separately approved, configure a permanent redirect preserving path/query to the official www origin; test both homepage and deep URLs. Canonical hints already mitigate this, so classify P1, not P0. |

### P2 — Content, headings, snippets and links

- **Long/weak snippets:** seven titles exceed 60 characters and four descriptions exceed 160. These are review flags, not hard Google limits or proof of truncation. The two long article titles (78 and 83 characters) are the clearest shortening candidates. Four expansion-industry descriptions run 164–182 characters. Several short product descriptions (65–84 characters) omit scope/differentiators; do not pad them merely to reach a length.
- **Awkward service naming:** “Business Digitization Development,” “Web Applications Development” and “Mobile Applications Development” read like automatically joined labels. Prefer natural category names.
- **Heading hierarchy:** `/products`, `/work`, `/company`, `/company/technology` and `/insights` jump from H1 into H3 without an intervening main-content H2. Correct the semantic structure without enlarging or redesigning headings. This is not a critical indexing failure.
- **Repeated heading language:** service/industry templates repeatedly use “Practical software. Everyday value.”, “Every step. Connected.” and “Before we begin.” Preserve brand tone where useful, but make a few headings identify the actual workflow. Repetition across pages alone is not a duplicate-content penalty.
- **Case-study heading extraction:** each case-study HTML includes the first screenshot title twice, once in the gallery and once in a closed lightbox dialog. This is a hidden UI heading, not a second visible content section or H1. A visible-content audit should not overstate it as duplication.
- **Evidence links:** jewellery industry links three case studies but not `/work/jewellery-operations-system`; jewellery products and guides often link `/work` rather than the specific relevant proof page.

## D. Complete page-by-page SEO audit

The next tables cover **all 42 live public pages**, not just high-priority pages. Title/description lengths include the rendered brand suffix and count characters, not pixels. Suggested changes are recommendations, not edits. H1 line breaks are normalized for readability. Empty decorative image alt values are not automatically errors; no missing alt attribute was found in the extracted main-content images.

### D1. Exact live metadata, H1 and page-specific assessment

| Page | Live SEO title (characters) | Live meta description (characters) | Live H1 | Assessment / recommendation |
| --- | --- | --- | --- | --- |
| [/](https://www.pentaforge.co.in/) | PentaForge &#124; Custom Software & Digital Product Engineering (58) | PentaForge designs and develops custom business software, web applications, mobile apps and intelligent digital systems built around real business workflows. (157) | Your business is unique. Your software should be too. | P1: Strong brand proposition but H1 is a slogan; no main-content Rajkot/Gujarat coverage. Clarify category/service area in existing copy and retain original proof. |
| [/solutions](https://www.pentaforge.co.in/solutions) | Software Solutions &#124; PentaForge (31) | Custom software, business digitization, web, mobile, desktop, AI and backend engineering built around real workflows. (117) | Start with the business problem. | P2: Clear category title; H1 generic. Add a short service-selection explanation; keep hub concise rather than impose a word quota. |
| [/industries](https://www.pentaforge.co.in/industries) | Custom Software for Different Industries &#124; PentaForge (53) | Software built around real workflows in jewellery, manufacturing, retail, restaurants, hotels, education, healthcare, logistics and startups. (141) | Different businesses. The same care for detail. | P2: Clear topic and unique metadata. Distinguish verified jewellery experience from expansion capabilities; link service-area context naturally. |
| [/products](https://www.pentaforge.co.in/products) | Business Software Products &#124; PentaForge (39) | Discuss PentaForge software for jewellery billing, manufacturing, polishing, inventory and everyday business workflows. (119) | Purpose-built for the work you do every day. | P2: Product enquiry intent is honest; H1 generic and cards begin at H3. Clarify software/availability and heading hierarchy. |
| [/work](https://www.pentaforge.co.in/work) | Built by PentaForge — Our Work &#124; PentaForge (43) | Explore real PentaForge systems for jewellery manufacturing, polishing, stock management and customer billing. (110) | Real workflows. Thoughtfully engineered. | P2: Real proof; title repeats brand and H1 is abstract. Use a software case-study label and correct H1-to-H3 jump. |
| [/company](https://www.pentaforge.co.in/company) | About PentaForge &#124; PentaForge (29) | PentaForge is a software engineering company in Ahmedabad, Gujarat, India, building custom business software, digital products and automation systems. (150) | Business understanding. Engineering precision. | P1: Confirm Ahmedabad assertion; clarify company identity in H1. Correct H1-to-H3 jump; owner-approved contact/identity evidence needed. |
| [/company/how-we-work](https://www.pentaforge.co.in/company/how-we-work) | How We Work &#124; PentaForge (24) | From understanding your business to design, engineering, launch and long-term support: the PentaForge development process. (122) | We listen. We map. We build. We stay. | P2: Strong process explanation but title/H1 broad. Add software-project context and one relevant proof link; no invented delivery guarantees. |
| [/company/technology](https://www.pentaforge.co.in/company/technology) | Technology & Engineering &#124; PentaForge (37) | Thoughtful architecture, maintainable software and technology chosen around your product’s requirements. (104) | The right tools for the right system. | P2: Generic title/H1 and early H3s. Tie engineering claims to actual project decisions; do not infer technologies from screenshot appearance. |
| [/contact](https://www.pentaforge.co.in/contact) | Contact PentaForge &#124; PentaForge (31) | Contact PentaForge in Ahmedabad, India. Tell us how your business works and start a conversation about custom software, products and automation. (144) | Tell us what’s not working. | P1: Clear enquiry form but no public email/phone links. Confirm identity/location and approved channels; improve topic clarity of H1. |
| [/insights](https://www.pentaforge.co.in/insights) | Insights & Practical Software Guides &#124; PentaForge (49) | Plain-language guides to jewellery software, manufacturing digitization, custom software planning and product engineering. (122) | Better questions. Better software. | P2: Helpful published-only collection; slogan H1 and H3 cards skip H2. Clarify guides/resources identity without expanding thin filler. |
| [/privacy](https://www.pentaforge.co.in/privacy) | Privacy Notice &#124; PentaForge (27) | How this PentaForge website handles project inquiries, local planners and optional analytics. (93) | Your information, handled with purpose. | P3: Fit for legal utility. Short description is not an error; no commercial keywords or unnecessary rewrite recommended. |
| [/terms](https://www.pentaforge.co.in/terms) | Website Terms &#124; PentaForge (26) | Information about PentaForge website content, custom software projects and project discussions. (95) | Clear expectations from the start. | P3: Fit for legal utility. Footer link prevents orphaning; leave outside commercial keyword campaigns. |
| [/solutions/custom-software](https://www.pentaforge.co.in/solutions/custom-software) | Custom Software Development Company &#124; PentaForge (48) | Your customers. Your calculations. Your way of working. One system built to bring them together. (96) | Custom software built around how your business actually works. | P1: Good explicit H1; 96-character description is generic. Add scoped ERP/custom-system context, truthful coverage and direct jewellery hub link. |
| [/solutions/business-digitization](https://www.pentaforge.co.in/solutions/business-digitization) | Business Digitization Development &#124; PentaForge (46) | Turn registers, spreadsheets and disconnected tools into a workflow your whole team can follow. (95) | Less paperwork. A clearer picture of your business. | P2: Awkward title “Business Digitization Development.” Clarify migration/process-change scope and keep distinct from general development. |
| [/solutions/web-applications](https://www.pentaforge.co.in/solutions/web-applications) | Web Applications Development &#124; PentaForge (41) | Business platforms, customer portals and digital products that make complex work feel straightforward. (102) | Your business, accessible from any browser. | P2: Use natural “Web Application Development”; H1 is benefit-led but category-light. Add useful procurement details and relevant proof only. |
| [/solutions/mobile-applications](https://www.pentaforge.co.in/solutions/mobile-applications) | Mobile Applications Development &#124; PentaForge (44) | Android and iOS applications for customers, field teams and people who do not work at a desk. (93) | Useful software. Wherever work happens. | P2: Use natural “Mobile App Development”; expand specific scope/constraints without claiming completed apps or platforms beyond evidence. |
| [/solutions/desktop-software](https://www.pentaforge.co.in/solutions/desktop-software) | Desktop Software Development &#124; PentaForge (41) | Windows and macOS software for workflows that need local devices, dependable offline use or a dedicated workspace. (114) | Built for the workstation. Connected to the business. | P2: Title clear; H1/description communicate workstation benefit. Explain supported deployment/offline/device scope only when confirmed. |
| [/solutions/ai-automation](https://www.pentaforge.co.in/solutions/ai-automation) | AI & Automation Development &#124; PentaForge (40) | Automate the predictable. Use AI where it meaningfully improves the workflow. Keep people in control. (101) | Give repetitive work a better system. | P2: Unique but broad description. Name specific scoped workflow outcomes with human oversight; no invented AI project results. |
| [/solutions/cloud-backend](https://www.pentaforge.co.in/solutions/cloud-backend) | Cloud & Backend Development &#124; PentaForge (40) | Connect applications, protect business records and give your product room to grow. (82) | The reliable foundation behind every interaction. | P2: Short generic description/H1; explain API, permissions and operations scope using existing capabilities. |
| [/industries/jewellery](https://www.pentaforge.co.in/industries/jewellery) | Jewellery Software & Business Systems &#124; PentaForge (50) | Connect jewellery manufacturing, polishing, billing, gold stock and customer orders with software built around your workshop and karigar workflows. (147) | Software for modern jewellery businesses. | P1: Strong specific workflow evidence; no Rajkot main-text relevance. Add direct operations-stock case study and article links; distinguish hub from products. |
| [/industries/manufacturing](https://www.pentaforge.co.in/industries/manufacturing) | Custom Manufacturing Software & Production Systems &#124; PentaForge (63) | Connect customer orders, raw materials, production work, quality checks and dispatch in one shared system. (106) | A clear view of every stage of production. | P2: Review 63-character title. Strong scoped example; keep jewellery evidence labelled and avoid generic-factory deployment claims. |
| [/industries/retail](https://www.pentaforge.co.in/industries/retail) | Custom Retail Software & Business Systems &#124; PentaForge (54) | Bring products, stock, customers, sales and payments together so the whole business works from the same information. (116) | Less stock guessing. More clarity at the counter. | P2: Relevant unique copy; differentiate general retail from supermarket POS. Use specific stock/returns examples without fake retail case studies. |
| [/industries/restaurants](https://www.pentaforge.co.in/industries/restaurants) | Restaurant POS & Management Software Development &#124; PentaForge (61) | We can build custom restaurant management software that connects dine-in and takeaway orders, kitchen preparation, billing and ingredient stock around the way your team serves. (176) | Keep the counter, kitchen and tables in step. | P2: Review 61-character title and 176-character description. H1 omits restaurant/software context; retain custom-build/integration disclaimers. |
| [/industries/hotels](https://www.pentaforge.co.in/industries/hotels) | Custom Hotel Management Software Development &#124; PentaForge (57) | We can build hotel management software that brings reservations, room availability, front-desk work, housekeeping and guest billing into a connected daily workflow. (164) | A clearer handover. From reservation to checkout. | P2: Review 164-character description. H1 benefit-led but category-light; describe reservations/housekeeping/billing as scoped capabilities. |
| [/industries/education](https://www.pentaforge.co.in/industries/education) | School Website & ERP Development in Gujarat &#124; PentaForge (56) | School website development in Rajkot, Ahmedabad and across Gujarat. Explore three school website demos and discuss custom admissions, ERP and parent portal workflows with PentaForge. (182) | Modern Digital Experiences for Modern Schools. | P2: Only current Rajkot main-content mention. Review 182-character description; clarify website + ERP category in H1, keep demos fictional/noindex and enquiry flow intact. |
| [/industries/healthcare](https://www.pentaforge.co.in/industries/healthcare) | Hospital & Clinic Management Software Development &#124; PentaForge (62) | We can build administrative software for hospitals and clinics, connecting patient registration, appointments, outpatient workflows, billing, pharmacy and lab coordination. (172) | Make the administrative journey easier to follow. | P2: Review 62-character title and 172-character description. Explicitly frame administration, not clinical capabilities or unsupported compliance. |
| [/industries/supermarkets](https://www.pentaforge.co.in/industries/supermarkets) | Supermarket POS & Custom Retail Billing Software &#124; PentaForge (61) | We can build supermarket POS and grocery-store software for barcode billing, purchases, batch and expiry records, cashier shifts and branch stock management. (157) | Keep checkout moving. Keep stock explainable. | P2: Clear POS title; review length if needed. Put supermarket/grocery category in H1 while retaining checkout benefit and scoped hardware claims. |
| [/industries/logistics](https://www.pentaforge.co.in/industries/logistics) | Custom Logistics & Distribution Software Development &#124; PentaForge (65) | We can build logistics and distribution software connecting orders, warehouse stock, dispatch, delivery assignments, proof of delivery and customer reporting. (158) | Know what is ready, dispatched and delivered. | P2: Review 65-character title; H1 lacks category. Keep dispatch/delivery scope specific and avoid unverified carrier integrations. |
| [/industries/startups](https://www.pentaforge.co.in/industries/startups) | Startup Product & Custom Software Development &#124; PentaForge (58) | A focused product, a thoughtful user experience and an engineering foundation that can evolve with what you learn. (114) | From idea to working product. | P2: Clear intent; strengthen MVP/discovery distinction from web/mobile service pages. Do not invent startup success metrics. |
| [/industries/other-businesses](https://www.pentaforge.co.in/industries/other-businesses) | Custom Software for Your Business Workflow &#124; PentaForge (55) | Tell us how yours works. We’ll study the workflow and design the system around it. (82) | Every business works differently. | P2: Generic fallback overlaps custom-software page. Keep as discovery route, not a second primary generic-development target; no immediate deletion/noindex recommended. |
| [/products/jewellery-billing](https://www.pentaforge.co.in/products/jewellery-billing) | Jewellery Billing &#124; PentaForge (30) | Weights, making charges and customer balances. Together in a clear billing workflow. (84) | Jewellery Billing | P1: Title/H1 omit software; 84-character description lacks key money-versus-metal differentiator. Add exact billing case-study link and scope guidance. |
| [/products/jewellery-manufacturing](https://www.pentaforge.co.in/products/jewellery-manufacturing) | Manufacturing Management &#124; PentaForge (37) | Follow gold, orders and work through every stage of the workshop. (65) | Manufacturing Management | P1: Title/H1 omit both jewellery and software; 65-character description. Highest-priority product identity improvement; link manufacturing proof. |
| [/products/polishing-management](https://www.pentaforge.co.in/products/polishing-management) | Polishing Management &#124; PentaForge (33) | A connected record of orders, weights, polishing work and charges. (66) | Polishing Management | P1: Title/H1 omit jewellery/software; 66-character description. Explain issue/return/loss/charges and link exact polishing proof. |
| [/products/inventory-management](https://www.pentaforge.co.in/products/inventory-management) | Inventory Management &#124; PentaForge (33) | Know what came in, what went out and what is available for the next order. (74) | Inventory Management | P2: Generic title/H1 and 74-character description. Explain target workflow/availability, avoiding an implied off-the-shelf SaaS product. |
| [/products/business-billing](https://www.pentaforge.co.in/products/business-billing) | Business Billing &#124; PentaForge (29) | Simple billing, customer records and payments around your everyday work. (72) | Business Billing | P2: Generic title/H1 and 72-character description. Distinguish general billing from jewellery balances; clarify supported scope only. |
| [/work/jewellery-manufacturing-system](https://www.pentaforge.co.in/work/jewellery-manufacturing-system) | Jewellery Manufacturing Management System &#124; PentaForge (54) | A custom business system that brings gold stock, casting, workshop work, recovery and reporting into one environment. (117) | Jewellery Manufacturing Management System | P1/P2: Strong proof. Add case-study intent to title/opening if approved; retain actual feature captions; link product/guides contextually. Closed-dialog H2 repeat is UI-only. |
| [/work/jewellery-polishing-management](https://www.pentaforge.co.in/work/jewellery-polishing-management) | Jewellery Polishing Management System &#124; PentaForge (50) | A focused system for polishing orders, pieces, weights, making charges, loss and customer settlement history. (109) | Jewellery Polishing Management System | P2: Strong specific proof. Clarify case-study identity and add corresponding product enquiry; no unsupported improvement percentages. Closed-dialog H2 repeat is UI-only. |
| [/work/custom-billing-system](https://www.pentaforge.co.in/work/custom-billing-system) | Custom Jewellery Billing System &#124; PentaForge (44) | Jewellery billing with issue and receive entries, customer histories, printable bills and separate cash and fine-gold balances. (127) | Custom Jewellery Billing System | P1/P2: Distinct cash/fine-gold evidence. Strengthen proof-to-product link and explain balance directions with approved examples. Closed-dialog H2 repeat is UI-only. |
| [/work/jewellery-operations-system](https://www.pentaforge.co.in/work/jewellery-operations-system) | Jewellery Operations & Stock System &#124; PentaForge (48) | A jewellery operations workspace connecting stock by karat, production registers, finished weights and production analytics. (124) | Jewellery Operations & Stock System | P2: Valuable stock/purity evidence underlinked from jewellery hub. Add contextual inbound links; retain distinction between karat and fine weight. Closed-dialog H2 repeat is UI-only. |
| [/insights/how-jewellery-manufacturing-software-works](https://www.pentaforge.co.in/insights/how-jewellery-manufacturing-software-works) | How Jewellery Manufacturing Software Works &#124; PentaForge (55) | A practical walkthrough of the records that connect an order, its gold, the workshop and the final bill. (104) | How Jewellery Manufacturing Software Works | P2: Good explicit informational identity and Article schema. Link exact manufacturing/operations proof where discussed; add reviewed examples if useful. |
| [/insights/track-gold-loss-jewellery-manufacturing](https://www.pentaforge.co.in/insights/track-gold-loss-jewellery-manufacturing) | How Gold Loss and Recovery Are Tracked in Jewellery Manufacturing &#124; PentaForge (78) | A workflow-first approach to issue weights, returns, recovery and accountable adjustments. (90) | How Gold Loss and Recovery Are Tracked in Jewellery Manufacturing | P2: Title 78 characters; description 90. Shorten title, clarify issue/return/recovery coverage and link exact project evidence. Numeric examples require owner approval. |
| [/insights/custom-software-vs-ready-made](https://www.pentaforge.co.in/insights/custom-software-vs-ready-made) | Custom Software vs Ready-Made Software: Which Does Your Business Need? &#124; PentaForge (83) | How to compare workflow fit, implementation effort and ownership before choosing a system. (90) | Custom Software vs Ready-Made Software: Which Does Your Business Need? | P2: Title 83 characters; description 90. Shorten while preserving comparison intent; keep balanced decision guidance and clear service next step. |


### D2. Canonicals, indexing, hierarchy, social metadata and schema

Every canonical in this table is the full live value. `O/T ✓` means the page has OG title, description, URL, image and type plus Twitter title, description, image and summary_large_image card, with the expected official origin. Images were fetched separately. Descriptions agree with the page description and social title text follows the shared title helper; the homepage deliberately uses a different brand ordering in its HTML title. No error is inferred from that ordering.

`O` = Organization; `W` = WebSite; `B` = BreadcrumbList; `S` = Service; `A` = Article; `C` = CreativeWork. H2/H3 counts are raw main-HTML counts, including the closed screenshot-dialog heading on case studies. The per-page outline inventory at the end records the observed heading text.

| Page | Live canonical | HTTP / robots | H2 / H3 and hierarchy | OG / Twitter | JSON-LD |
| --- | --- | --- | --- | --- | --- |
| / | [canonical](https://www.pentaforge.co.in) | 200; index, follow | 13 / 36; no skipped level | O/T ✓; website | O, W |
| /solutions | [canonical](https://www.pentaforge.co.in/solutions) | 200; index, follow | 8 / 0; no skipped level | O/T ✓; website | B, O, W |
| /industries | [canonical](https://www.pentaforge.co.in/industries) | 200; index, follow | 4 / 11; no skipped level | O/T ✓; website | B, O, W |
| /products | [canonical](https://www.pentaforge.co.in/products) | 200; index, follow | 1 / 5; H1 → H3 jump | O/T ✓; website | B, O, W |
| /work | [canonical](https://www.pentaforge.co.in/work) | 200; index, follow | 1 / 4; H1 → H3 jump | O/T ✓; website | B, O, W |
| /company | [canonical](https://www.pentaforge.co.in/company) | 200; index, follow | 3 / 6; H1 → H3 jump | O/T ✓; website | B, O, W |
| /company/how-we-work | [canonical](https://www.pentaforge.co.in/company/how-we-work) | 200; index, follow | 2 / 8; no skipped level | O/T ✓; website | B, O, W |
| /company/technology | [canonical](https://www.pentaforge.co.in/company/technology) | 200; index, follow | 2 / 8; H1 → H3 jump | O/T ✓; website | B, O, W |
| /contact | [canonical](https://www.pentaforge.co.in/contact) | 200; index, follow | 1 / 0; no skipped level | O/T ✓; website | B, O, W |
| /insights | [canonical](https://www.pentaforge.co.in/insights) | 200; index, follow | 1 / 3; H1 → H3 jump | O/T ✓; website | B, O, W |
| /privacy | [canonical](https://www.pentaforge.co.in/privacy) | 200; index, follow | 5 / 0; no skipped level | O/T ✓; website | B, O, W |
| /terms | [canonical](https://www.pentaforge.co.in/terms) | 200; index, follow | 5 / 0; no skipped level | O/T ✓; website | B, O, W |
| /solutions/custom-software | [canonical](https://www.pentaforge.co.in/solutions/custom-software) | 200; index, follow | 5 / 7; no skipped level | O/T ✓; website | B, S, O, W |
| /solutions/business-digitization | [canonical](https://www.pentaforge.co.in/solutions/business-digitization) | 200; index, follow | 6 / 7; no skipped level | O/T ✓; website | B, S, O, W |
| /solutions/web-applications | [canonical](https://www.pentaforge.co.in/solutions/web-applications) | 200; index, follow | 4 / 6; no skipped level | O/T ✓; website | B, S, O, W |
| /solutions/mobile-applications | [canonical](https://www.pentaforge.co.in/solutions/mobile-applications) | 200; index, follow | 4 / 6; no skipped level | O/T ✓; website | B, S, O, W |
| /solutions/desktop-software | [canonical](https://www.pentaforge.co.in/solutions/desktop-software) | 200; index, follow | 4 / 6; no skipped level | O/T ✓; website | B, S, O, W |
| /solutions/ai-automation | [canonical](https://www.pentaforge.co.in/solutions/ai-automation) | 200; index, follow | 4 / 6; no skipped level | O/T ✓; website | B, S, O, W |
| /solutions/cloud-backend | [canonical](https://www.pentaforge.co.in/solutions/cloud-backend) | 200; index, follow | 4 / 6; no skipped level | O/T ✓; website | B, S, O, W |
| /industries/jewellery | [canonical](https://www.pentaforge.co.in/industries/jewellery) | 200; index, follow | 8 / 18; no skipped level | O/T ✓; website | B, S, O, W |
| /industries/manufacturing | [canonical](https://www.pentaforge.co.in/industries/manufacturing) | 200; index, follow | 7 / 12; no skipped level | O/T ✓; website | B, S, O, W |
| /industries/retail | [canonical](https://www.pentaforge.co.in/industries/retail) | 200; index, follow | 7 / 12; no skipped level | O/T ✓; website | B, S, O, W |
| /industries/restaurants | [canonical](https://www.pentaforge.co.in/industries/restaurants) | 200; index, follow | 6 / 6; no skipped level | O/T ✓; website | B, S, O, W |
| /industries/hotels | [canonical](https://www.pentaforge.co.in/industries/hotels) | 200; index, follow | 6 / 6; no skipped level | O/T ✓; website | B, S, O, W |
| /industries/education | [canonical](https://www.pentaforge.co.in/industries/education) | 200; index, follow | 6 / 18; no skipped level | O/T ✓; website | B, S, O, W |
| /industries/healthcare | [canonical](https://www.pentaforge.co.in/industries/healthcare) | 200; index, follow | 6 / 6; no skipped level | O/T ✓; website | B, S, O, W |
| /industries/supermarkets | [canonical](https://www.pentaforge.co.in/industries/supermarkets) | 200; index, follow | 6 / 6; no skipped level | O/T ✓; website | B, S, O, W |
| /industries/logistics | [canonical](https://www.pentaforge.co.in/industries/logistics) | 200; index, follow | 6 / 6; no skipped level | O/T ✓; website | B, S, O, W |
| /industries/startups | [canonical](https://www.pentaforge.co.in/industries/startups) | 200; index, follow | 6 / 10; no skipped level | O/T ✓; website | B, S, O, W |
| /industries/other-businesses | [canonical](https://www.pentaforge.co.in/industries/other-businesses) | 200; index, follow | 6 / 10; no skipped level | O/T ✓; website | B, S, O, W |
| /products/jewellery-billing | [canonical](https://www.pentaforge.co.in/products/jewellery-billing) | 200; index, follow | 4 / 5; no skipped level | O/T ✓; website | B, O, W |
| /products/jewellery-manufacturing | [canonical](https://www.pentaforge.co.in/products/jewellery-manufacturing) | 200; index, follow | 4 / 5; no skipped level | O/T ✓; website | B, O, W |
| /products/polishing-management | [canonical](https://www.pentaforge.co.in/products/polishing-management) | 200; index, follow | 4 / 5; no skipped level | O/T ✓; website | B, O, W |
| /products/inventory-management | [canonical](https://www.pentaforge.co.in/products/inventory-management) | 200; index, follow | 4 / 5; no skipped level | O/T ✓; website | B, O, W |
| /products/business-billing | [canonical](https://www.pentaforge.co.in/products/business-billing) | 200; index, follow | 4 / 5; no skipped level | O/T ✓; website | B, O, W |
| /work/jewellery-manufacturing-system | [canonical](https://www.pentaforge.co.in/work/jewellery-manufacturing-system) | 200; index, follow | 12 / 0; no skipped level | O/T ✓; website | B, C, O, W |
| /work/jewellery-polishing-management | [canonical](https://www.pentaforge.co.in/work/jewellery-polishing-management) | 200; index, follow | 10 / 0; no skipped level | O/T ✓; website | B, C, O, W |
| /work/custom-billing-system | [canonical](https://www.pentaforge.co.in/work/custom-billing-system) | 200; index, follow | 11 / 0; no skipped level | O/T ✓; website | B, C, O, W |
| /work/jewellery-operations-system | [canonical](https://www.pentaforge.co.in/work/jewellery-operations-system) | 200; index, follow | 11 / 0; no skipped level | O/T ✓; website | B, C, O, W |
| /insights/how-jewellery-manufacturing-software-works | [canonical](https://www.pentaforge.co.in/insights/how-jewellery-manufacturing-software-works) | 200; index, follow | 8 / 3; no skipped level | O/T ✓; article | B, A, O, W |
| /insights/track-gold-loss-jewellery-manufacturing | [canonical](https://www.pentaforge.co.in/insights/track-gold-loss-jewellery-manufacturing) | 200; index, follow | 9 / 3; no skipped level | O/T ✓; article | B, A, O, W |
| /insights/custom-software-vs-ready-made | [canonical](https://www.pentaforge.co.in/insights/custom-software-vs-ready-made) | 200; index, follow | 9 / 3; no skipped level | O/T ✓; article | B, A, O, W |


### D3. Homepage assessment

| Dimension | Finding | Proposal, subject to approval |
| --- | --- | --- |
| Company identity and H1 | [LIVE] “Your business is unique. Your software should be too.” is a distinctive slogan. The eyebrow identifies custom software/digital products/AI, but the H1 and opening copy do not identify geography. | Keep the slogan as supporting brand copy or use the explicit H1 proposed in K. One concise subheading can identify a custom software company serving Rajkot, Ahmedabad and wider Gujarat without implying offices. |
| Services | [LIVE] Seven service categories are reachable; web/mobile/desktop/AI/cloud capabilities are present. | Keep the current cards; make the main custom-software and ERP capability clearer in text, based on the owner's service scope. |
| Industry specialization | [LIVE] Broad industry possibilities appear before jewellery proof. | Add one short evidence-led sentence explaining that real work includes jewellery manufacturing, polishing, stock and billing; keep expansion sectors labelled as capabilities. |
| Trust | [LIVE/CODE] Three featured case studies, original software screenshots and a three-person team preview. | Link the stock/operations case study contextually where appropriate. Add only owner-approved delivery/contact details; no invented testimonials, project counts or percentage improvements. |
| Linking | [LIVE] Rich crawlable links to relevant hubs/detail pages; contact links exist lower in the page. | Avoid adding another large SEO section. Use existing text to link the Rajkot service-area page after publication and the exact supporting jewellery workflows. |
| CTAs | [LIVE] Hero “Build My Software” goes to the planner, and the final CTA links contact. | Preserve the planner. Consider a simple contact option near the hero for visitors ready to enquire; do not claim the existing CTA is broken. |
| Minimalist design | [RECOMMENDATION] Large type and concise copy can support SEO. | Replace vague words in current slots, clarify heading semantics and add a compact coverage statement. No visual redesign or city keyword wall is needed. |

## E. Keyword-to-page mapping

All phrases below are **seed keywords / intent hypotheses**, not measured volume or ranking data. One page should own each main intent. A secondary keyword is supporting vocabulary, not an instruction to repeat it mechanically.

| Primary keyword / cluster | Primary target | Intent | Secondary terms | Existing vs new / priority | Cannibalization control |
| --- | --- | --- | --- | --- | --- |
| custom software development company Rajkot | `/locations/rajkot` (proposed) | Local commercial provider selection | software company Rajkot; bespoke business software Rajkot | New, conditional P1; until approved, describe coverage on homepage/custom-software | Rajkot page owns broad city intent; homepage stays brand/regional and service page owns delivery details. |
| software development company Rajkot | Same proposed Rajkot page | Local provider selection | custom software Rajkot; web and business systems Rajkot | Same page, P1 | Do not create a second city page for the shorter phrase. |
| jewellery software Rajkot | `/industries/jewellery` | Industry solution selection | jewellery software company; karigar software Rajkot | Optimize existing, P1 | This hub owns broad jewellery intent; Rajkot page links here, not another jewellery city clone. |
| jewellery manufacturing software Rajkot | `/products/jewellery-manufacturing` | Manufacturing software enquiry | gold manufacturing software; casting/karigar tracking | Optimize existing, P1 | Product page owns solution-fit intent; manufacturing case study owns proof of completed work. |
| custom ERP software Rajkot | `/solutions/custom-software` initially | Custom system commissioning | custom ERP development; inventory/billing integration | Optimize existing, P1; no dedicated ERP page yet | Future Rajkot page introduces ERP and links here; consider an ERP service page only with a distinct detailed offering and query evidence. |
| jewellery billing software Rajkot | `/products/jewellery-billing` | Billing solution enquiry | fine-gold balances; jewellery bill software | Optimize existing, P1 | Billing case study is evidence, not another sales landing page. |
| custom software development Ahmedabad | `/locations/ahmedabad` (conditional) | Local provider selection | custom applications Ahmedabad; business software Ahmedabad | Proposed P2 after differentiation/owner confirmation; meanwhile service page and company identity | Keep Ahmedabad page distinct from Rajkot and avoid turning About into a competing service landing page. |
| software development company Ahmedabad | Same proposed Ahmedabad page | Local provider selection | software company Ahmedabad | Same page, P2 | Do not create another near-identical keyword URL. |
| custom business software Gujarat | `/` | Regional company/service discovery | business software company Gujarat; workflow software | Optimize existing, P1 | Homepage owns broad regional/brand positioning; service detail owns requirements and implementation. |
| jewellery manufacturing ERP software | `/products/jewellery-manufacturing` | Specialist software evaluation | gold stock; production register; karigar issue/return | Optimize existing, P1 | Use ERP only to describe the scoped connected workflow; do not imply every enterprise module exists. |
| custom software development India | `/solutions/custom-software` | National service procurement | bespoke software development; custom ERP development | Optimize existing, P1/P2 | No thin `/locations/india` page; broad service page can explain coverage naturally. |
| custom software development services | `/solutions/custom-software` | Service procurement | business management systems; workflow automation | Optimize existing, P1 | Same service intent as national ERP/custom software; don't split near-identical pages. |
| business digitization services | `/solutions/business-digitization` | Replace manual processes | Excel migration; paper-to-digital workflows | Optimize existing, P2 | Focus on migration/change management, not a duplicate generic development offer. |
| web application development | `/solutions/web-applications` | Web platform procurement | customer portals; business dashboards; SaaS development | Optimize existing, P2 | Keep distinction from marketing websites and mobile applications. |
| mobile application development | `/solutions/mobile-applications` | App development procurement | Android/iOS apps; field-team applications | Optimize existing, P2 | Discuss platforms as capabilities, not unsupported published app examples. |
| desktop software development | `/solutions/desktop-software` | Workstation software procurement | offline workflows; device integration | Optimize existing, P2 | Screenshot appearance does not verify a native Windows/macOS deployment. |
| AI workflow automation | `/solutions/ai-automation` | Process improvement | document processing; internal assistants | Optimize existing, P2 | Avoid unsupported “AI case study” claims; distinguish proposed scope from real jewellery examples. |
| backend and cloud development | `/solutions/cloud-backend` | Technical service procurement | APIs; permissions; database integrations | Optimize existing, P2 | Keep technical operations intent distinct from complete web-app projects. |
| custom manufacturing software | `/industries/manufacturing` | Production workflow solution | production planning; order/stock/dispatch systems | Optimize existing, P2 | Link jewellery example with explicit industry scope; do not claim other factory deployments. |
| custom retail software | `/industries/retail` | Retail operations solution | sales/returns; customer balances; stock | Optimize existing, P2 | General retail here; grocery barcode/batch/cashier specifics belong to supermarket page. |
| restaurant management software development | `/industries/restaurants` | Custom restaurant software | order/KOT workflow; kitchen/billing handoff | Optimize existing, P2 | Distinguish a custom development service from an already-shipped restaurant POS. |
| hotel management software development | `/industries/hotels` | Custom hospitality software | reservations; housekeeping; guest billing | Optimize existing, P2 | No invented PMS integrations or hotel client projects. |
| school website development Rajkot | `/industries/education` | School website commissioning | school websites Gujarat; admissions website | Optimize existing, P2 | Keep school demos noindex; location page links to this service. |
| custom school ERP software | `/industries/education` | School system commissioning | admission portal; parent portal; attendance workflows | Optimize existing, P2 | Separate live-school implementation scope from fictional frontend demo capabilities. |
| hospital and clinic management software development | `/industries/healthcare` | Administrative software commissioning | appointments; patient registration; billing coordination | Optimize existing, P2 | No clinical decision support, compliance certification or hospital-deployment claims without evidence. |
| supermarket POS software development | `/industries/supermarkets` | Custom grocery/POS commissioning | barcode billing; batch/expiry; cashier closing | Optimize existing, P2 | Retain explicit scoping for hardware/tax/integrations and distinguish from retail page. |
| logistics software development | `/industries/logistics` | Logistics workflow commissioning | dispatch; proof of delivery; distribution tracking | Optimize existing, P2 | Mobile service page explains engineering; logistics page explains use case. |
| startup MVP development | `/industries/startups` | Initial product build | startup software; product discovery; SaaS MVP | Optimize existing, P2 | Link web/mobile services; no need for another generic startup landing page now. |
| jewellery polishing management software | `/products/polishing-management` | Specialist software enquiry | polishing issue/return; loss; making charges | Optimize existing, P1 | Matching polishing case study provides proof rather than competing sales copy. |
| inventory management software | `/products/inventory-management` | Inventory solution enquiry | stock movements; opening balances; adjustments | Optimize existing, P2 | Avoid ranking promises against established SaaS; clarify custom-fit/availability first. |
| business billing software | `/products/business-billing` | Billing solution enquiry | customer ledger; payment tracking | Optimize existing, P2 | Keep general billing separate from money-and-metal jewellery billing. |
| jewellery manufacturing software case study | `/work/jewellery-manufacturing-system` | Proof/vendor evaluation | casting controls; gold recovery; purity settings | Optimize existing, P1/P2 | Use case-study framing to distinguish from product page. |
| jewellery polishing software case study | `/work/jewellery-polishing-management` | Proof/vendor evaluation | polishing registry; settlement history | Optimize existing, P2 | Product owns commercial offer; case study explains actual build. |
| jewellery billing software case study | `/work/custom-billing-system` | Proof/vendor evaluation | cash and fine-gold ledger; bill history | Optimize existing, P1/P2 | Do not make it a second generic billing sales page. |
| gold stock tracking software | `/work/jewellery-operations-system` initially | Feature proof / commercial investigation | karat stock; fine-weight views; production analytics | Optimize existing, P2 | Industry hub covers the wider offer; no new stock landing page until scope/query evidence supports one. |
| how jewellery manufacturing software works | `/insights/how-jewellery-manufacturing-software-works` | Informational research | manufacturing workflow; karigar records | Optimize existing, P2 | Keep how-to intent distinct from commercial product pages. |
| gold loss tracking in jewellery manufacturing | `/insights/track-gold-loss-jewellery-manufacturing` | Informational problem solving | recovery; gross vs fine weight; issue/return reconciliation | Optimize existing, P2 | Explain with approved examples and link proof; don't repurpose as a product page. |
| custom software vs ready-made software | `/insights/custom-software-vs-ready-made` | Comparison / decision support | bespoke vs off-the-shelf; total ownership considerations | Optimize existing, P2 | Link the service for next steps; preserve a balanced comparison. |
| jewellery wholesale management software | No standalone target yet; discovery questions on jewellery hub | Wholesale workflow evaluation | order/customer ledger; stock/settlement requirements | P3, conditional only | Current evidence supports component workflows, not a complete wholesale ERP. Do not create a wholesale-product claim from those fragments. |

## F. Rajkot and Ahmedabad recommendations

### Rajkot — recommend a useful new service-area page, conditional on approval

`/locations/rajkot` currently returns 404. A page is justified by the owner's explicit primary-market strategy, not verified search volume. It should answer how a Rajkot business can evaluate and commission PentaForge's work. Suggested distinct outline:

1. Service-area introduction: software for Rajkot businesses; do not say “our Rajkot office/team.”
2. Jewellery workflow problem examples drawn from real evidence: issued gold versus available stock, casting/purity records, karigar returns, polishing loss and separate cash/fine-gold balances. Label examples as PentaForge's work, not Rajkot client work unless the owner can verify that.
3. A practical discovery checklist: current registers/spreadsheets, approved calculation samples, users/permissions, exception handling and migration checks. Ask for sanitized samples, never sensitive customer records publicly.
4. Links to the manufacturing, polishing, billing and stock case studies, with short explanations of what each demonstrates.
5. Engagement logistics approved by the owner: consultation method, review process, language support if actually available, who signs off calculations, rollout/training/support responsibilities. Do not invent response times, prices, onsite availability or Gujarati-language support.
6. Original FAQs about preserving registers, reconciling opening balances, piloting a workflow and confirming deployment needs.
7. An enquiry CTA naming the Rajkot service area and linking the existing contact form.

Link from a compact homepage service-area statement, relevant company/contact copy and the custom-software page after publication. It should link back to service/industry/proof pages, not become an isolated SEO doorway.

### Ahmedabad — conditional second page, not a city-name substitution

`/locations/ahmedabad` also returns 404. Existing Company, Contact, footer and Organization markup already say Ahmedabad, but a physical office was not independently verified. First confirm this identity claim. A second page is worthwhile only if the owner can supply a distinct and useful customer journey; otherwise optimize existing service/company/contact pages and postpone it.

Potential focus: cross-department software discovery, migration from disconnected spreadsheets, integration responsibilities, permissions, reporting and staged rollout for businesses considering custom systems. Use the actual jewellery builds as labelled examples rather than claiming textile, pharmaceutical, restaurant or other Ahmedabad customers. An owner-approved delivery/process explanation can differentiate it from Rajkot's workshop-led evaluation content.

**Guardrails:** no cloned city pages, directory-like lists of neighbourhoods, fake street addresses, fabricated local staff or LocalBusiness markup for an unverified office. Use service-area language. Do not create separate Gujarat/India city-style pages; the homepage and main service page can own those broader intents. Google's [doorway-abuse policy](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse) supports avoiding substantially similar pages created primarily to capture near-identical location searches. [RESEARCH]

## G. Jewellery software SEO opportunities

| Topic | Supported evidence | Recommendation and limits |
| --- | --- | --- |
| Manufacturing | [CODE/LIVE] Manufacturing case study: fine gold, casting batches, karigar/customer registers, recovery, configurable touch/purity and gold ledger reports. | Product page should explain fit; case study should explain the specific implementation. Add a concise ERP scope definition without implying accounting/payroll/every module exists. |
| Billing | Billing case study: gross/deduction/net weights, touch/rate/fine gold, previous/received/closing balances, bill print/history and customer advance gold/cash. | Add plain-language money-versus-metal explanations to the commercial page and direct links to real bill screenshots. Do not invent GST/e-invoice/tax certification or payment integrations. |
| Polishing | Polishing case study: orders, pieces, weights, making charges, loss and settlement history. | Use “jewellery polishing software” in the page identity and show a real issue-to-settlement example with approved, non-sensitive sample values. |
| Gold stock | Operations case study: stock by karat, admin/karigar/finished categories, add/remove gold, fine-to-karat controls and production analytics. | Add this fourth case study to the industry page's proof links; distinguish available stock from material in production/recovery. |
| Fine gold calculations | Manufacturing/operations screenshots and existing gold-loss article discuss purity settings and gross/fine bases. | Expand the existing article with a clearly labelled worked example only after the owner approves units, touch conventions, rounding and assumptions. A generic purity formula is not proof of the business's accounting rule. |
| Wholesale | Stock, orders and customer ledger components exist, but no documented complete wholesale implementation is established. | Discovery-led discussion only. Verify wholesale pricing, order allocation, returns and settlement requirements before adding a dedicated offer/page. |
| Custom jewellery ERP | Owner confirms ERP/custom software offering; existing projects demonstrate connected jewellery operations. | Explain what a scoped custom ERP engagement could include and explicitly separate delivered features from future scope. Avoid a blanket ready-to-buy suite claim. |

A useful editorial sequence is: strengthen existing commercial pages → connect proof → deepen the existing gold-loss/manufacturing guides → consider one new focused guide only if it answers a missing question. Do not publish the three current drafts automatically. Do not add broad “best jewellery software” comparisons without a fair, researched methodology.

## H. Internal linking recommendations

| Relationship | Observed state | Specific recommendation |
| --- | --- | --- |
| Homepage → Solutions | Main copy/cards already link custom, web, mobile, desktop, AI and cloud; digitization is available through site navigation/service hub. | Add a contextual digitization link in the paper/Excel-to-system section if useful; keep the existing links. |
| Homepage → Industries | Industry cards and an all-industries link are present. | Give jewellery proven-experience context and link the future Rajkot page from a short coverage statement. |
| Jewellery → Case studies | Three matching case studies linked. | Add `/work/jewellery-operations-system` near gold stock/purity content with a descriptive anchor such as “See the karat-wise stock workflow.” |
| Jewellery → Guides | No direct main-content links to the two relevant jewellery articles. | Link the manufacturing guide beside workflow explanation and gold-loss guide beside issue/return/recovery discussion. |
| Product → Proof | All five products link `/work`; jewellery products lack their exact matching case-study links. | Billing → `/work/custom-billing-system`; manufacturing → `/work/jewellery-manufacturing-system`; polishing → `/work/jewellery-polishing-management`. |
| Case studies → Services | All four already link custom software and business digitization, plus jewellery industry. | Preserve these. Add the matching product-enquiry page only where it represents an appropriate next step and does not imply that the built project is an available SKU. |
| Articles → Industries | Both jewellery articles already link `/industries/jewellery`; all three link the custom-software service and `/work`. | Keep these links and add inline links to the exact manufacturing/operations/polishing case study where its interface is discussed. |
| Location → Services | No location pages yet. | After approval, link Rajkot to custom software/jewellery/product/proof pages and Ahmedabad to relevant service/process pages. Add inbound links at the same time. |
| Commercial → Contact | All ordinary commercial pages have main-content contact links. Education uses its own on-page real enquiry form and has global contact navigation. | Education is not a broken CTA exception; optionally offer `/contact` as an alternative. Preserve enquiry attribution and security. |
| Company/process → Proof | Company/process primarily explain beliefs and workflow; case evidence is reachable globally. | Add one appropriate case-study link where the process claim is illustrated, not a second portfolio grid. |
| Utility pages | Terms has global/footer links even though it has no incoming main-content link in this extraction. | It is not orphaned; do not add irrelevant commercial anchors to legal content. |

Use readable anchors that explain the target. Avoid linking every mention, exact-match anchors repeated across the footer, and city keyword chains. The current cross-links between retail and supermarkets are helpful and should remain.

## I. AI-search discoverability and entity clarity

### Structured data assessment

| Element | Current state | Recommendation |
| --- | --- | --- |
| Organization | Present on every marketing page with consistent PentaForge name, www URL, logo, Ahmedabad/Gujarat/India address and empty sameAs. No stable `@id`. | Confirm real location/contact facts first. Then consider a stable `https://www.pentaforge.co.in/#organization` identifier and reference it consistently from provider/publisher/creator entities. Add only verified profiles. |
| WebSite | Present, correct origin and description; no stable `@id`. | Optional stable `/#website` reference to the Organization. No invented SearchAction for a site search that does not exist. |
| Service | Present on all seven detail services and eleven industries. Provider names/origins are consistent. | Use exact service wording and truthful `areaServed` only when the owner confirms coverage. Do not use service-area schema to imply a physical branch or completed industry project. |
| BreadcrumbList | Present on all 41 non-home marketing pages. | Preserve visible/structured breadcrumb agreement. Validate any future location hierarchy when it is implemented. |
| Article | All three published guides have Organization author/publisher, real configured publication date, official image and mainEntityOfPage. | An organization can author an article; do not invent a person. Add a real reviewer only if accountable review happens. Add dateModified only when editorial records establish a substantive update. |
| CreativeWork | Four case studies describe actual software and use official URLs/images. | Preserve current honest type. Do not label every custom build as a purchasable SoftwareApplication with fictional offers/ratings. |
| FAQ / Q&A | Useful visible FAQ content exists on services/industries/products; no speculative rich-result claim is needed. | Improve direct answers to genuine buyer questions; structured-data additions should follow eligibility and visible content, not promises of rich snippets. |

### Content recommendations

Provide short, concrete answer passages: what PentaForge builds; who a service is for; what a specific case study demonstrates; what still needs scoping; how money and fine gold are tracked separately. Introduce the organization consistently in Company, Contact, homepage and service descriptions. Give screenshots explanatory captions and describe calculations in readable HTML, not only in images. Keep each new-industry capability clearly distinct from verified jewellery evidence.

Google says ordinary SEO foundations apply to its AI search features and does not require special AI files or special schema. Prioritize accessible pages, useful original content and coherent entity information; **do not add speculative `llms.txt`, mass question pages or fabricated machine-readable claims** as a substitute. No promise of AI citations or rankings is made. [Google Search Central: AI features](https://developers.google.com/search/docs/appearance/ai-features). [RESEARCH]

## J. Prioritized implementation roadmap — approval required

| Priority | Proposed work | Acceptance criterion / dependency |
| --- | --- | --- |
| P0 monitoring | Verify latest Search Console sitemap/URL-inspection state; retain production/preview tests. | Owner sees current processing status. Do not diagnose a live failure solely from an older report. No active P0 found by this audit. |
| P1 technical | Approve apex-to-www permanent redirect. | HTTP/HTTPS apex and deep paths resolve to official www with path/query preserved; no loops; canonical/sitemap unchanged. |
| P1 commercial | Homepage, custom-software, jewellery hub and the three jewellery product pages. | Unique intended query ownership; clear software category, truthful geographic coverage, meaningful differentiated copy, correct availability language. |
| P1 trust | Confirm identity/location, public contact details and service delivery scope; improve contact/company clarity. | Only owner-approved facts published; no invented address, client relationship, review or timeline. |
| P1 local | Draft/approve Rajkot page with original workflow and engagement guidance. | Meets outline in F; links in/out; distinct value; no office/client fiction; single canonical and sitemap entry only after publication. |
| P2 links/proof | Exact product/case/article links; expose stock/operations evidence; improve case-study headings. | All links relevant and resolve; captions/claims match screenshot documentation. |
| P2 snippets/semantics | Natural service names, shorter long titles/descriptions, meaningful H2s and correction of five H1→H3 jumps. | Unique titles/descriptions; one H1; coherent headings; no typography/layout redesign. |
| P2 Ahmedabad | Approve distinct page only if unique useful content and delivery/location facts are available. | Not a Rajkot clone; otherwise continue optimizing company/contact/service pages. |
| P3 depth/measurement | Expand approved technical examples, research query demand with Search Console, assess CWV/accessibility, evaluate ERP/wholesale gaps. | Decisions use real query/conversion evidence; new pages earn a distinct intent and evidence base. |

Recommended first editing batch, after approval: `/`, `/solutions/custom-software`, `/industries/jewellery`, `/products/jewellery-manufacturing`, `/products/jewellery-billing`, `/products/polishing-management`, then `/contact` and `/company`. Proof/link improvements follow on `/work/jewellery-manufacturing-system`, `/work/custom-billing-system`, `/work/jewellery-operations-system` and the two jewellery guides.

After an approved implementation, run the existing lint/TypeScript/tests/build and sitemap/SEO checks; inspect metadata and rendered headings; verify preview exclusions; deploy only with explicit authorization. Track real enquiries and Search Console query/page trends after recrawling. No traffic, ranking or timing guarantee is implied.

## K. Suggested title, description and H1 improvements

**Draft copy only.** These are complete rendered title suggestions including the brand suffix—avoid appending PentaForge twice when applying the existing title template. Geographic descriptions are proposed service-area language based on the brief, not a claim of local offices. Homepage copy should support, rather than duplicate, the proposed city pages. No suggested text has been implemented.

| Page (not implemented) | Suggested complete title | Suggested meta description | Suggested H1 |
| --- | --- | --- | --- |
| / | Custom Software Development in Gujarat &#124; PentaForge | PentaForge builds custom business software, web and mobile applications around real workflows for businesses in Rajkot, Ahmedabad and across Gujarat. | We build custom software around how your business works. |
| /solutions/custom-software | Custom Software & ERP Development &#124; PentaForge | Plan custom software around your orders, stock, billing and business rules. Explore real jewellery systems and discuss a scoped solution with PentaForge. | Custom software and ERP built around your business. |
| /industries/jewellery | Jewellery Software for Rajkot Businesses &#124; PentaForge | Explore custom jewellery software for manufacturing, polishing, billing and gold stock. See real PentaForge systems and discuss your workshop requirements. | Jewellery software built around your workshop. |
| /products/jewellery-manufacturing | Jewellery Manufacturing Software &#124; PentaForge | Discuss jewellery manufacturing software for orders, gold stock, casting, karigar work and recovery. Explore real workflows and confirm scope with PentaForge. | Jewellery manufacturing software for connected workshop records. |
| /products/jewellery-billing | Jewellery Billing Software &#124; PentaForge | Explore jewellery billing workflows for weights, making charges, customer records and cash or fine-gold balances. Discuss scope and availability with PentaForge. | Jewellery billing software for money and metal workflows. |
| /products/polishing-management | Jewellery Polishing Management Software &#124; PentaForge | Discuss polishing software for orders, issue and return weights, loss, making charges and customer settlement. See a real system built by PentaForge. | Jewellery polishing software from issue to settlement. |
| /products/inventory-management | Inventory Management Software &#124; PentaForge | Discuss inventory software for item records, stock movements, opening balances and adjustments. Define your workflow and confirm scope with PentaForge. | Inventory software built around your stock movements. |
| /products/business-billing | Business Billing Software &#124; PentaForge | Discuss business billing software for bills, customer records, payments and outstanding balances. Confirm the workflow, availability and scope with PentaForge. | Business billing software for connected customer records. |
| /work/jewellery-manufacturing-system | Jewellery Manufacturing Software Case Study &#124; PentaForge | See how PentaForge built jewellery manufacturing software connecting gold stock, casting, karigar records, recovery and purity settings, with real interfaces. | Jewellery manufacturing software: the system we built. |
| /work/custom-billing-system | Jewellery Billing Software Case Study &#124; PentaForge | Explore a PentaForge jewellery billing system with issue and receive entries, printable bills, customer history and separate cash and fine-gold balances. | A jewellery billing system for cash and fine gold. |
| /work/jewellery-operations-system | Gold Stock & Jewellery Operations Case Study &#124; PentaForge | See PentaForge stock and production interfaces for karat-wise gold, issued and finished weights, recovery and production analytics, with real screenshots. | Jewellery stock and production, shown in real software. |
| /company | About PentaForge — Custom Software Development | Meet the team behind PentaForge and learn how we study business workflows, design software, engineer systems and plan support with the people who use them. | The team building software around your business. |
| /contact | Discuss Your Software Project &#124; PentaForge | Tell PentaForge about your business, current workflow and software needs. Start a conversation about a custom system, website, application or automation. | Let’s discuss software for your business. |
| /solutions/business-digitization | Business Digitization Services &#124; PentaForge | Connect registers, spreadsheets and everyday processes with a planned software rollout. Discuss data migration, team training and workflow checks with PentaForge. | Turn manual business workflows into connected software. |
| /industries/education | School Website & ERP Development in Gujarat &#124; PentaForge | Explore school website demos and discuss custom websites, admissions and ERP workflows for schools in Rajkot, Ahmedabad and Gujarat with PentaForge. | School websites and software built around your institution. |
| /insights/track-gold-loss-jewellery-manufacturing | Gold Loss & Recovery in Jewellery Manufacturing &#124; PentaForge | Learn how issue weights, returns, purity and recovery records support jewellery manufacturing reconciliation, with workflow examples from PentaForge systems. | How to track gold loss and recovery in jewellery manufacturing. |
| /insights/custom-software-vs-ready-made | Custom Software vs Ready-Made Software &#124; PentaForge | Compare workflow fit, implementation, ownership and future changes before choosing custom or ready-made software. A practical decision guide from PentaForge. | Custom or ready-made software: which fits your business? |
| /locations/rajkot — proposed only | Custom Software for Rajkot Businesses &#124; PentaForge | Explore custom software for Rajkot businesses, with jewellery manufacturing, billing and stock workflow examples. Discuss your requirements with PentaForge. | Custom software development for Rajkot businesses. |
| /locations/ahmedabad — conditional | Custom Software for Ahmedabad Businesses &#124; PentaForge | Discuss custom software for Ahmedabad businesses, from workflow discovery and data migration to connected applications and a carefully scoped rollout. | Custom software built for Ahmedabad business workflows. |

For the homepage, retain the existing positioning line “We build software around how your business works” as the central message; an explicit custom-software H1 can express the same promise. A useful proposed supporting sentence is: “PentaForge builds custom business software, web and mobile applications for businesses in Rajkot, Ahmedabad and across Gujarat.” Confirm actual service coverage before publication, and keep any India-wide claim consistent with the owner's delivery capacity.

No hard title/description character quota is proposed. Put the differentiating topic early and keep copy natural; Google can generate title links from several on-page signals and can choose different snippets. [Google's title-link guidance](https://developers.google.com/search/docs/appearance/title-link). [RESEARCH]

## L. Evidence boundaries, competitor research and approval gates

### Verified vs inferred

| Statement | Classification |
| --- | --- |
| 42 live pages return 200, have index directives/canonicals and appear in the sitemap | Verified live response evidence on audit date |
| The earlier empty-sitemap incident is currently resolved in live output | Verified live response evidence; Search Console recovery not inspected |
| Apex and www both serve content; apex canonical points to www | Verified for homepage and custom-software deep page; recommendation to redirect is a technical judgment |
| Four real jewellery project interfaces and 16 screenshots are documented | Owner context + code/documentation corroboration; no independent client interview or deployment audit |
| Company is physically based at a particular Ahmedabad office | **Not independently verified.** Website says Ahmedabad; owner confirmation required before strengthening this claim |
| Rajkot is the primary sales market | Owner-provided strategy, not analytics evidence |
| Suggested query ownership and potential cannibalization | Editorial hypotheses based on overlapping intent/content, not demonstrated ranking cannibalization |
| Product availability, pricing, support promises, onsite visits and specific integrations | Not established beyond existing scope statements; obtain confirmation before adding claims |
| Search volumes, keyword difficulty, current ranks, competitor traffic and AI citation frequency | Not verified; no numbers or rankings supplied |

### Competitor discovery — first-party evidence, not rank claims

Live search discovery used the seed phrases “custom software development company Rajkot,” “jewellery manufacturing ERP software Rajkot,” and “custom software development Ahmedabad.” These results are a research sample, not a localized Google rank-tracking report. Competitors' statements are their own published claims and were not independently audited.

| Website | Why relevant | Limited observation / lesson |
| --- | --- | --- |
| [Sarvang Technologies](https://tech.sarvang-group.com/) | Own homepage describes custom software, CRM, apps and AI services from Rajkot. | Clear service category and company/location context plus buyer FAQs. PentaForge can improve its own clarity without copying claims, office details or delivery promises. |
| [Darshvi Infosoft — JSpark Production](https://www.darshviinfosoft.com/JSpark_Manufacturing.pdf) | Own document identifies a Rajkot jewellery-software business and shows manufacturing/jobwork/stock workflows. | Specific production and weight/issue/receipt examples make the proposition concrete. PentaForge already has original screenshots to explain its own supported workflows; no need to copy competitor features. |
| [Zethic — Ahmedabad custom software page](https://zethic.com/services/custom-software-development-company-ahmedabad/) | Dedicated Ahmedabad service page describes web/mobile/AI/software procurement. | Distinct service/location wording and buyer-oriented sections are useful comparison points. Its customer, staffing, review and performance claims are not evidence PentaForge may reuse. |

No competitor rankings, keyword volumes, backlink strength or comparative performance were verified. These examples justify clearer content, not imitation or guaranteed search gains.

### Approval gates before implementation

1. Approve keyword ownership and the first page batch.
2. Confirm Ahmedabad identity wording, actual service coverage, public contact/social details and delivery commitments.
3. Confirm which product capabilities are available versus custom-project scope, and approve any numerical examples.
4. Approve original Rajkot content; decide whether Ahmedabad has enough distinct substance.
5. Separately authorize website edits and any later deployment. This task authorizes the audit document only.

### Per-page observed H2/H3 outline inventory

Raw server-rendered heading text follows, with whitespace/line breaks normalized where possible. Closed screenshot-dialog headings are identified rather than treated as visible duplicate sections. This inventory supplements D1/D2 so recommendations can be reviewed against the actual structure.


#### /

- H2: What can we build for you?
- H3: I run a business
- H3: I have an idea
- H3: I have repetitive work
- H3: I need ready-made software
- H2: From scattered work to one connected system.
- H2: First, your business. Then, the technology.
- H3: You explain.
- H3: We understand.
- H3: We design.
- H3: We engineer.
- H3: We launch.
- H3: We stay.
- H2: Industries we engineer for.
- H3: Jewellery
- H3: Manufacturing
- H3: Restaurants
- H3: Hotels
- H3: Education
- H3: Healthcare
- H3: Supermarkets & Retail
- H3: Logistics
- H2: Software built around your business. Not the other way around.
- H2: Focused software. Built for daily work.
- H3: Jewellery Billing
- H3: Manufacturing Management
- H3: Polishing Management
- H3: Inventory Management
- H3: Business Billing
- H2: From idea to infrastructure.
- H3: Web Applications
- H3: Mobile Applications
- H3: Desktop Software
- H3: AI & Automation
- H3: Backend & Cloud
- H3: Product Design
- H2: Built by PentaForge.
- H3: Jewellery Manufacturing Management System
- H3: Jewellery Polishing Management System
- H3: Custom Jewellery Billing System
- H2: Meet your team at PentaForge.
- H2: Don’t know what software you need?
- H2: Let’s understand what you’re building.
- H3: What do you need?
- H2: Ideas for better businesses and better software.
- H3: How Jewellery Manufacturing Software Works
- H3: How Gold Loss and Recovery Are Tracked in Jewellery Manufacturing
- H3: Custom Software vs Ready-Made Software: Which Does Your Business Need?
- H2: Have a business problem? Let’s engineer the solution.

#### /solutions

- H2: Custom Software
- H2: Business Digitization
- H2: Web Applications
- H2: Mobile Applications
- H2: Desktop Software
- H2: AI & Automation
- H2: Cloud & Backend
- H2: Have a business problem? Let’s engineer the solution.

#### /industries

- H2: Make, move & sell
- H3: Jewellery
- H3: Manufacturing
- H3: Retail
- H3: Supermarkets & Retail Stores
- H3: Logistics & Distribution
- H2: Serve, host & care
- H3: Restaurants & Cafés
- H3: Hotels & Hospitality
- H3: Schools & Colleges
- H3: Hospitals & Clinics
- H2: Build what comes next
- H3: Startups
- H3: Other Businesses
- H2: Have a business problem? Let’s engineer the solution.

#### /products

- H3: Jewellery Billing
- H3: Manufacturing Management
- H3: Polishing Management
- H3: Inventory Management
- H3: Business Billing
- H2: Have a business problem? Let’s engineer the solution.

#### /work

- H3: Jewellery Manufacturing Management System
- H3: Jewellery Polishing Management System
- H3: Custom Jewellery Billing System
- H3: Jewellery Operations & Stock System
- H2: Have a business problem? Let’s engineer the solution.

#### /company

- H3: We understand before we prescribe.
- H3: We design for the actual user.
- H3: We make the rules explicit.
- H3: We think beyond handover.
- H2: Meet the team.
- H3: Asif
- H2: Small enough to understand. Strong enough to grow.
- H3: A long-term technology partnership.
- H2: Have a business problem? Let’s engineer the solution.

#### /company/how-we-work

- H2: First, your business. Then, the technology.
- H3: You explain.
- H3: We understand.
- H3: We design.
- H3: We engineer.
- H3: We launch.
- H3: We stay.
- H3: Shared understanding before engineering.
- H3: A considered launch.
- H2: Have a business problem? Let’s engineer the solution.

#### /company/technology

- H3: Designed to be maintained.
- H3: Designed to be operated.
- H2: From idea to infrastructure.
- H3: Web Applications
- H3: Mobile Applications
- H3: Desktop Software
- H3: AI & Automation
- H3: Backend & Cloud
- H3: Product Design
- H2: Have a business problem? Let’s engineer the solution.

#### /contact

- H2: Start with the everyday.

#### /insights

- H3: How Jewellery Manufacturing Software Works
- H3: How Gold Loss and Recovery Are Tracked in Jewellery Manufacturing
- H3: Custom Software vs Ready-Made Software: Which Does Your Business Need?
- H2: Have a business problem? Let’s engineer the solution.

#### /privacy

- H2: Project inquiries
- H2: Local planning tools
- H2: Analytics preferences
- H2: Security and verification
- H2: Your choices

#### /terms

- H2: Website content
- H2: Project discussions
- H2: Guided planning
- H2: Responsible use
- H2: Questions about a project

#### /solutions/custom-software

- H2: Practical software. Everyday value.
- H3: A system that knows your rules
- H3: Information entered once
- H3: The right access for every person
- H3: Connected to the tools you use
- H2: A considered path to launch.
- H3: Engineering that supports the workflow.
- H3: Support is part of the conversation.
- H2: See the workflow in real software.
- H3: Jewellery Manufacturing Management System
- H2: Before we begin.
- H2: Have a business problem? Let’s engineer the solution.

#### /solutions/business-digitization

- H2: From scattered work to one connected system.
- H2: Practical software. Everyday value.
- H3: Registers become searchable records
- H3: Spreadsheets become a shared source
- H3: WhatsApp becomes part of a process
- H3: Paper bills become connected billing
- H2: A considered path to launch.
- H3: Engineering that supports the workflow.
- H3: Support is part of the conversation.
- H2: See the workflow in real software.
- H3: Jewellery Manufacturing Management System
- H2: Before we begin.
- H2: Have a business problem? Let’s engineer the solution.

#### /solutions/web-applications

- H2: Practical software. Everyday value.
- H3: Business applications & admin platforms
- H3: Customer portals & booking systems
- H3: SaaS products
- H3: Marketplaces & management systems
- H2: A considered path to launch.
- H3: Engineering that supports the workflow.
- H3: Support is part of the conversation.
- H2: Before we begin.
- H2: Have a business problem? Let’s engineer the solution.

#### /solutions/mobile-applications

- H2: Practical software. Everyday value.
- H3: Customer applications
- H3: Internal business tools
- H3: Notifications with purpose
- H3: Offline when the workflow requires it
- H2: A considered path to launch.
- H3: Engineering that supports the workflow.
- H3: Support is part of the conversation.
- H2: Before we begin.
- H2: Have a business problem? Let’s engineer the solution.

#### /solutions/desktop-software

- H2: Practical software. Everyday value.
- H3: Counter & workstation applications
- H3: Local device connections
- H3: Offline operations
- H3: Shared business information
- H2: A considered path to launch.
- H3: Engineering that supports the workflow.
- H3: Support is part of the conversation.
- H2: Before we begin.
- H2: Have a business problem? Let’s engineer the solution.

#### /solutions/ai-automation

- H2: Practical software. Everyday value.
- H3: Workflow automation
- H3: Document processing
- H3: Search & internal assistants
- H3: Support & business intelligence
- H2: A considered path to launch.
- H3: Engineering that supports the workflow.
- H3: Support is part of the conversation.
- H2: Before we begin.
- H2: Have a business problem? Let’s engineer the solution.

#### /solutions/cloud-backend

- H2: Practical software. Everyday value.
- H3: Accounts & permissions
- H3: Connected systems
- H3: Business data
- H3: Operations after launch
- H2: A considered path to launch.
- H3: Engineering that supports the workflow.
- H3: Support is part of the conversation.
- H2: Before we begin.
- H2: Have a business problem? Let’s engineer the solution.

#### /industries/jewellery

- H2: What gets in the way of a good day?
- H3: Material moves faster than the paperwork.
- H3: Every workshop has its own calculations.
- H2: Every step. Connected.
- H2: Build the parts your business actually needs.
- H3: Jewellery manufacturing
- H3: Gold stock & purity
- H3: Customer & order management
- H3: Karigar management
- H3: Casting & production tracking
- H3: Gold loss & recovery
- H3: Polishing management
- H3: Jewellery billing
- H3: Customer ledger
- H3: Reports & catalogue applications
- H2: A clearer way to run the daily work.
- H2: Software we’ve engineered for jewellery businesses.
- H3: Jewellery Manufacturing Management System
- H3: Jewellery Polishing Management System
- H3: Custom Jewellery Billing System
- H2: Find a useful starting point.
- H3: Jewellery Billing
- H3: Manufacturing Management
- H3: Polishing Management
- H2: Questions from your side of the business.
- H2: Have a business problem? Let’s engineer the solution.

#### /industries/manufacturing

- H2: What gets in the way of a good day?
- H3: An order status hides the next blocker.
- H3: Rework and partial completion need their own records.
- H2: Every step. Connected.
- H2: Build the parts your business actually needs.
- H3: Customers & orders
- H3: Raw material stock
- H3: Production planning
- H3: Workers & work allocation
- H3: Stage tracking
- H3: Quality checks
- H3: Finished inventory
- H3: Dispatch
- H3: Billing & reports
- H2: A clearer way to run the daily work.
- H2: A real jewellery manufacturing workflow.
- H3: Jewellery Manufacturing Management System
- H2: Questions from your side of the business.
- H2: Have a business problem? Let’s engineer the solution.

#### /industries/retail

- H2: What gets in the way of a good day?
- H3: The sale and the stock record disagree.
- H3: Customer balances need context.
- H2: Every step. Connected.
- H2: Build the parts your business actually needs.
- H3: Product catalogue
- H3: Stock movements
- H3: Customer records
- H3: Sales & returns
- H3: Payment tracking
- H3: Business billing
- H3: Purchase records
- H3: Business reports
- H2: A clearer way to run the daily work.
- H2: Find a useful starting point.
- H3: Inventory Management
- H3: Business Billing
- H2: Questions from your side of the business.
- H2: Have a business problem? Let’s engineer the solution.

#### /industries/restaurants

- H2: What gets in the way of a good day?
- H3: An order changes after it reaches the kitchen.
- H3: Tables, takeaway and bills use separate records.
- H3: Stock is checked only when something runs out.
- H2: Every step. Connected.
- H2: Build the parts your business actually needs.
- H3: From order to preparation
- H3: From bill to daily review
- H3: From ingredients to purchasing
- H2: A clearer way to run the daily work.
- H2: Questions from your side of the business.
- H2: Have a business problem? Let’s engineer the solution.

#### /industries/hotels

- H2: What gets in the way of a good day?
- H3: The room is vacant, but is it ready?
- H3: Guest charges arrive after the bill is prepared.
- H3: A shift change loses the important details.
- H2: Every step. Connected.
- H2: Build the parts your business actually needs.
- H3: Manage the stay
- H3: Coordinate service
- H3: Connect the right systems
- H2: A clearer way to run the daily work.
- H2: Questions from your side of the business.
- H2: Have a business problem? Let’s engineer the solution.

#### /industries/education

- H2: Different schools. Distinct first impressions.
- H3: LittleBloom Academy
- H3: Horizon International School
- H3: NextGen Public School
- H2: The right system for the work behind it.
- H3: School Website Development
- H3: Online Admission System
- H3: School ERP Development
- H3: Student Management
- H3: Attendance Management
- H3: Fee Management
- H3: Examination & Results Management
- H3: Parent Communication Portal
- H3: Faculty Management
- H3: School Event Management
- H3: Timetable Management
- H3: Custom School Software
- H2: Your identity. Your school’s way of working.
- H2: Connected records. From admission to results.
- H3: The same student is entered in several registers.
- H3: A fee question needs several people to answer it.
- H3: Academic rules differ between programmes.
- H2: A few useful answers.
- H2: Let’s Build Your School’s Digital Future

#### /industries/healthcare

- H2: What gets in the way of a good day?
- H3: Registration is repeated at each desk.
- H3: Doctor availability and the appointment list disagree.
- H3: Administrative records need clear accountability.
- H2: Every step. Connected.
- H2: Build the parts your business actually needs.
- H3: Reception and outpatient administration
- H3: Departments and stock
- H3: Define safeguards before rollout
- H2: A clearer way to run the daily work.
- H2: Questions from your side of the business.
- H2: Have a business problem? Let’s engineer the solution.

#### /industries/supermarkets

- H2: What gets in the way of a good day?
- H3: Checkout waits while someone checks an item.
- H3: Stock is present, but the right batch is not.
- H3: Closing the counter means rebuilding the day.
- H2: Every step. Connected.
- H2: Build the parts your business actually needs.
- H3: At the billing counter
- H3: Behind the shelves
- H3: Across counters and branches
- H2: A clearer way to run the daily work.
- H2: Questions from your side of the business.
- H2: Have a business problem? Let’s engineer the solution.

#### /industries/logistics

- H2: What gets in the way of a good day?
- H3: Dispatch readiness depends on phone calls.
- H3: A status does not explain a delivery exception.
- H3: Delivery evidence and billing are separated.
- H2: Every step. Connected.
- H2: Build the parts your business actually needs.
- H3: Prepare the dispatch
- H3: Follow the handoff
- H3: Keep customers informed
- H2: A clearer way to run the daily work.
- H2: Questions from your side of the business.
- H2: Have a business problem? Let’s engineer the solution.

#### /industries/startups

- H2: What gets in the way of a good day?
- H3: The feature list grows before the user journey works.
- H3: Early choices need room to change.
- H2: Every step. Connected.
- H2: Build the parts your business actually needs.
- H3: Product discovery
- H3: Web & mobile apps
- H3: SaaS platforms
- H3: Backend engineering
- H3: Authentication
- H3: Payments
- H3: Product analytics
- H3: AI features where useful
- H2: A clearer way to run the daily work.
- H2: Questions from your side of the business.
- H2: Have a business problem? Let’s engineer the solution.

#### /industries/other-businesses

- H2: What gets in the way of a good day?
- H3: Your process does not fit a standard category.
- H3: The exceptions live in someone’s memory.
- H2: Every step. Connected.
- H2: Build the parts your business actually needs.
- H3: Customer records
- H3: Team workflows
- H3: Approvals
- H3: Orders & scheduling
- H3: Inventory
- H3: Billing & payments
- H3: Document management
- H3: Useful reports
- H2: A clearer way to run the daily work.
- H2: Questions from your side of the business.
- H2: Have a business problem? Let’s engineer the solution.

#### /products/jewellery-billing

- H2: Tell us how your business works.
- H2: One focused workflow. Connected records.
- H3: Customer records
- H3: Weight & purity details
- H3: Making charges
- H3: Bills & balances
- H3: Payment records
- H2: The right fit matters.
- H2: Have a business problem? Let’s engineer the solution.

#### /products/jewellery-manufacturing

- H2: Tell us how your business works.
- H2: One focused workflow. Connected records.
- H3: Customer orders
- H3: Gold stock
- H3: Karigar work
- H3: Stage tracking
- H3: Loss & recovery
- H2: The right fit matters.
- H2: Have a business problem? Let’s engineer the solution.

#### /products/polishing-management

- H2: Tell us how your business works.
- H2: One focused workflow. Connected records.
- H3: Order tracking
- H3: Issue & return weights
- H3: Loss calculations
- H3: Making charges
- H3: Customer billing
- H2: The right fit matters.
- H2: Have a business problem? Let’s engineer the solution.

#### /products/inventory-management

- H2: Tell us how your business works.
- H2: One focused workflow. Connected records.
- H3: Item catalogue
- H3: Stock movements
- H3: Opening balances
- H3: Stock adjustments
- H3: Inventory reports
- H2: The right fit matters.
- H2: Have a business problem? Let’s engineer the solution.

#### /products/business-billing

- H2: Tell us how your business works.
- H2: One focused workflow. Connected records.
- H3: Customer records
- H3: Bills
- H3: Payment tracking
- H3: Outstanding balances
- H3: Business reports
- H2: The right fit matters.
- H2: Have a business problem? Let’s engineer the solution.

#### /work/jewellery-manufacturing-system

- H2: The work behind the system.
- H2: A connected way to work.
- H2: From the first record to the final balance.
- H2: Manufacturing control centre
- H2: Casting operations
- H2: Gold recovery and settlements
- H2: Purity configuration
- H2: Manufacturing reports
- H2: Manufacturing control centre
- H2: Designed around daily work.
- H2: The details matter.
- H2: Have a business problem? Let’s engineer the solution.

#### /work/jewellery-polishing-management

- H2: The work behind the system.
- H2: A connected way to work.
- H2: From the first record to the final balance.
- H2: Polishing dashboard
- H2: Polishing order registry
- H2: Polishing customer history
- H2: Polishing dashboard
- H2: Designed around daily work.
- H2: The details matter.
- H2: Have a business problem? Let’s engineer the solution.

#### /work/custom-billing-system

- H2: The work behind the system.
- H2: A connected way to work.
- H2: From the first record to the final balance.
- H2: Jewellery bill creation
- H2: Jewellery billing dashboard
- H2: Customer billing history
- H2: Advance gold and cash
- H2: Jewellery bill creation
- H2: Designed around daily work.
- H2: The details matter.
- H2: Have a business problem? Let’s engineer the solution.

#### /work/jewellery-operations-system

- H2: The work behind the system.
- H2: A connected way to work.
- H2: From the first record to the final balance.
- H2: Jewellery operations dashboard
- H2: Gold stock by karat
- H2: Jewellery production register
- H2: Production analytics
- H2: Jewellery operations dashboard
- H2: Designed around daily work.
- H2: The details matter.
- H2: Have a business problem? Let’s engineer the solution.

#### /insights/how-jewellery-manufacturing-software-works

- H2: Start with the customer order
- H2: Keep gold movements connected
- H2: Follow work through the workshop
- H2: Connect completion to billing
- H2: Read stock as a set of positions
- H2: Agree the exceptions before rollout
- H3: What does this look like in your business?
- H2: Keep exploring.
- H3: How Gold Loss and Recovery Are Tracked in Jewellery Manufacturing
- H3: Custom Software vs Ready-Made Software: Which Does Your Business Need?
- H2: Have a business problem? Let’s engineer the solution.

#### /insights/track-gold-loss-jewellery-manufacturing

- H2: Define what each weight represents
- H2: Record each handoff
- H2: Reconcile before drawing conclusions
- H2: Build the checks into the workflow
- H2: Keep gross weight and fine weight distinct
- H2: Track recovery as a separate movement
- H2: Use process-specific calculations
- H3: What does this look like in your business?
- H2: Keep exploring.
- H3: How Jewellery Manufacturing Software Works
- H3: Custom Software vs Ready-Made Software: Which Does Your Business Need?
- H2: Have a business problem? Let’s engineer the solution.

#### /insights/custom-software-vs-ready-made

- H2: Start with workflow fit
- H2: Compare the whole commitment
- H2: Ask about your data and future changes
- H2: Test one real workflow
- H2: Compare the same job in both options
- H2: Define a complete first release
- H2: Make the decision explainable
- H3: What does this look like in your business?
- H2: Keep exploring.
- H3: How Jewellery Manufacturing Software Works
- H3: How Gold Loss and Recovery Are Tracked in Jewellery Manufacturing
- H2: Have a business problem? Let’s engineer the solution.

