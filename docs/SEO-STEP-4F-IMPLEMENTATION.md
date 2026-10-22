# SEO Step 4F — Rajkot Local SEO Landing Page

**Target Route:** `/locations/rajkot`  
**Production Canonical:** `https://www.pentaforge.co.in/locations/rajkot`  
**Status:** Completed locally. Tested and verified.  
**Deployment:** NOT DEPLOYED (Local implementation only; no automatic commit, push, or deployment performed).

---

## 1. Summary of Changes

Engineered a dedicated, high-quality, and genuinely useful Rajkot service-area page (`/locations/rajkot`) that addresses business owners seeking custom software, ERP systems, billing engines, and operational management applications in Rajkot and Gujarat. The implementation follows PentaForge's established design language, preserves single-H1 semantics, establishes natural internal linking, and avoids fabricated physical office claims or local business rich-result spam.

### Files Created:
- [`app/(marketing)/locations/rajkot/page.tsx`](file:///e:/Kaam/PentaForge/pf/new%20pentaforge%20website/app/(marketing)/locations/rajkot/page.tsx): The complete Rajkot location landing page, structured around real business workflows, custom software capabilities, jewellery industry expertise, structured delivery process, FAQs, and schema markup.

### Files Modified:
- [`lib/routes.ts`](file:///e:/Kaam/PentaForge/pf/new%20pentaforge%20website/lib/routes.ts): Added `'/locations/rajkot'` to `publicRoutes`, ensuring automatic inclusion in production sitemap generation and SEO verification scripts.
- [`app/(marketing)/solutions/[slug]/page.tsx`](file:///e:/Kaam/PentaForge/pf/new%20pentaforge%20website/app/(marketing)/solutions/[slug]/page.tsx): Added a contextual inbound link to `/locations/rajkot` (*Software development in Rajkot*) within the related links section of `/solutions/custom-software`.
- [`app/(marketing)/industries/[slug]/page.tsx`](file:///e:/Kaam/PentaForge/pf/new%20pentaforge%20website/app/(marketing)/industries/[slug]/page.tsx): Added a contextual inbound link to `/locations/rajkot` (*Rajkot software development*) within the related links section of `/industries/jewellery`.

---

## 2. Route Implementation & URL Structure

- **Route:** `/locations/rajkot`
- **Next.js File:** `app/(marketing)/locations/rajkot/page.tsx`
- **Canonical URL:** `https://www.pentaforge.co.in/locations/rajkot`
- **Layout Integration:** Rendered within `app/(marketing)/layout.tsx`, inheriting standard fonts (Manrope, IBM Plex Mono), global navigation, company footer, and analytics.

---

## 3. SEO Metadata

| Field | Configuration & Rendered Value |
| :--- | :--- |
| **Rendered Page Title** | `Software Development Company in Rajkot \| PentaForge` |
| **Raw Page Title** | `Software Development Company in Rajkot` (Template: `%s \| PentaForge`) |
| **Meta Description** | `PentaForge develops custom business software, ERP systems and web and mobile applications for businesses in Rajkot, Gujarat. Explore our real projects.` |
| **Canonical URL** | `https://www.pentaforge.co.in/locations/rajkot` |
| **Robots Directive** | `index, follow` (in production build) |
| **Open Graph Title** | `Software Development Company in Rajkot \| PentaForge` |
| **Open Graph Description**| Matches meta description |
| **Open Graph Image** | `https://www.pentaforge.co.in/og/default` (1200×630) |
| **Twitter Card** | `summary_large_image` |

---

## 4. Heading & Visible Section Architecture

### Exactly One H1:
- `<h1>Custom Software Development in Rajkot</h1>`

### Section Breakdown:
1. **Hero Section (`page-hero container`):**
   - **Breadcrumbs:** `Home` / `Rajkot Software Development`
   - **Eyebrow:** `Software Development in Rajkot`
   - **Single H1:** `Custom Software Development in Rajkot`
   - **Supporting Copy:** *"PentaForge builds custom business software, ERP systems and digital applications for businesses in Rajkot, helping teams manage the workflows, calculations and operations that generic software cannot easily accommodate."*
   - **Primary Action:** `Discuss Your Project` (links to `/contact`)
   - **Secondary Action:** `Explore Our Work` (links to `/work`)

2. **Editorial Intro Section (`detail-intro`):**
   - **Eyebrow:** `Built around your workflow.`
   - **Large Copy:** *"Off-the-shelf software forces growing businesses into rigid templates. We engineer custom software around how your team, records and calculations actually operate in Rajkot."*

3. **What PentaForge Develops (`section-after-hero` / `feature-grid`):**
   - *01 / Orders & Customers:* Centralized records, job bags, advances, and status tracking.
   - *02 / Stock & Inventory:* Raw materials, work in progress, transfers, finished goods, and reconciliations.
   - *03 / Billing & Calculations:* Custom pricing formulas, purity conversions, making charges, and dual cash/metal ledgers.
   - *04 / Manufacturing & Workflows:* End-to-end artisan allocation, batching, multi-pass processing, and scrap recovery.
   - *05 / Operations & Controls:* Role-based permissions, audit logs, and closing summaries for owners and floor supervisors.
   - *06 / Multi-Platform Engineering:* Web apps, mobile tools, and high-performance desktop software for billing counters.

4. **Why Custom Software (`muted-section` / `feature-grid`):**
   - Addresses specific operational limitations:
     - *Records live across notebooks and spreadsheets*
     - *Software cannot handle your exact calculation rules*
     - *Balances and inventory are difficult to reconcile*
     - *Owners need a connected operational view*

5. **Demonstrated Experience (`case-grid`):**
   - Highlights Rajkot's jewellery manufacturing, casting, polishing, and trade market.
   - Embeds all 4 verified PentaForge case studies using `CaseStudyCard`:
     1. [`/work/jewellery-manufacturing-system`](file:///e:/Kaam/PentaForge/pf/new%20pentaforge%20website/data/caseStudies.ts)
     2. [`/work/jewellery-polishing-management`](file:///e:/Kaam/PentaForge/pf/new%20pentaforge%20website/data/caseStudies.ts)
     3. [`/work/custom-billing-system`](file:///e:/Kaam/PentaForge/pf/new%20pentaforge%20website/data/caseStudies.ts)
     4. [`/work/jewellery-operations-system`](file:///e:/Kaam/PentaForge/pf/new%20pentaforge%20website/data/caseStudies.ts)

6. **How Projects Are Delivered (`muted-section`):**
   - **Interactive Process Flow:** `Discovery` → `Workflow Mapping` → `Architecture` → `Engineering` → `Validation` → `Deployment & Support`
   - Details real rules mapping and validation against real past orders.

7. **Working with Rajkot Businesses (`detail-two-column`):**
   - Factual guide explaining how local business owners can share workflows (e.g. sample bill or job sheet), review scopes, and collaborate directly with engineers.

8. **Frequently Asked Questions (`faq-layout`):**
   - *Does PentaForge develop custom software for Rajkot businesses?*
   - *Can you build software around our existing business calculations?*
   - *Do you develop jewellery manufacturing and billing software?*
   - *Can you modernize a business currently using Excel or paper registers?*
   - *How can we discuss a custom software project?*

9. **Related Links:**
   - Contextual navigation to `/solutions/custom-software`, `/industries/jewellery`, `/products/jewellery-manufacturing`, `/products/jewellery-billing`, `/products/polishing-management`, `/work`, and `/contact`.

10. **Final CTA:**
    - Standard `<FinalCTA />` prompting visitors to start a project or talk to PentaForge.

---

## 5. Keyword Mapping

| Target Keyword | Mapping Location on Page |
| :--- | :--- |
| **Software Development Company in Rajkot** | Rendered Page `<title>`, Open Graph title, Twitter title, FAQ answer 1 |
| **Custom software development in Rajkot** | Page `<h1>`, Service schema name, Hero supporting text |
| **Software company in Rajkot** | Hero copy, FAQ answer 1 |
| **ERP software development Rajkot** | Hero supporting text, related links, section headings |
| **Business software development Rajkot** | Meta description, capabilities section, why custom software |
| **Custom business software Rajkot** | Meta description, editorial intro, FAQ answer 1 |
| **Jewellery software development Rajkot** | Demonstrated experience section, FAQ answer 3, case study grid |
| **Web application development Rajkot** | Capabilities module 06, meta description |

---

## 6. Internal Linking Matrix

### Outbound Links from `/locations/rajkot`:
- `/contact` — Primary CTA ("Discuss Your Project") & Contact link
- `/work` — Secondary CTA ("Explore Our Work") & Case study links
- `/company/how-we-work` — Process link ("Learn more about how we work")
- `/solutions/custom-software` — Related service link
- `/industries/jewellery` — Related industry link
- `/products/jewellery-manufacturing` — Related product link
- `/products/jewellery-billing` — Related product link
- `/products/polishing-management` — Related product link
- `/work/jewellery-manufacturing-system` — Case study link
- `/work/jewellery-polishing-management` — Case study link
- `/work/custom-billing-system` — Case study link
- `/work/jewellery-operations-system` — Case study link

### Inbound Links to `/locations/rajkot`:
- From `/solutions/custom-software`: Contextual link in related links section (*Software development in Rajkot*).
- From `/industries/jewellery`: Contextual link in related links section (*Rajkot software development*).

---

## 7. Structured Data (`JSON-LD`)

Emits valid, truthful schema without fabricated local business claims:

1. **BreadcrumbList Schema:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "BreadcrumbList",
     "itemListElement": [
       { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pentaforge.co.in/" },
       { "@type": "ListItem", "position": 2, "name": "Rajkot Software Development", "item": "https://www.pentaforge.co.in/locations/rajkot" }
     ]
   }
   ```

2. **Service Schema:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Service",
     "name": "Custom Software Development in Rajkot",
     "serviceType": "Custom Software Development",
     "description": "PentaForge develops custom business software, ERP systems and web and mobile applications for businesses in Rajkot, Gujarat. Explore our real projects.",
     "url": "https://www.pentaforge.co.in/locations/rajkot",
     "areaServed": [
       { "@type": "City", "name": "Rajkot" },
       { "@type": "AdministrativeArea", "name": "Gujarat" },
       { "@type": "Country", "name": "India" }
     ],
     "provider": {
       "@type": "Organization",
       "@id": "https://www.pentaforge.co.in/#organization",
       "name": "PentaForge",
       "url": "https://www.pentaforge.co.in/"
     }
   }
   ```

*Safeguards:*
- No fake `LocalBusiness` entity.
- No invented Rajkot street addresses or fake office locations.
- No fake geo-coordinates or Google Maps listings.
- No fake customer counts, testimonials, reviews, or prices.
- Canonical organization ID references `https://www.pentaforge.co.in/#organization`.

---

## 8. Sitemap & Indexing

- Included once in `publicRoutes` in `lib/routes.ts`.
- Emitted in production `sitemap.xml` at `https://www.pentaforge.co.in/locations/rajkot`.
- Excluded from school demos and draft article paths.
- Verified in `tests/sitemap.test.ts` and `scripts/verify-seo.ts`.

---

## 9. Verification & Automated Test Results

| Command | Test Focus | Status | Output / Details |
| :--- | :--- | :--- | :--- |
| `npm run typecheck` | TypeScript Compiler | **PASS** | 0 errors |
| `npm run lint` | ESLint | **PASS** | 0 warnings or errors |
| `npm run test` | Node Test Suite | **PASS** | 28/28 tests passed |
| `npm run build` | Next.js Production Build | **PASS** | 89 static pages generated (including `/locations/rajkot`) |
| `scripts/verify-seo.ts` | Production SEO Validator | **PASS** | Verified 43 public marketing pages; 43 unique titles, 43 unique descriptions, canonicals, H1s, indexability |
| `npm run verify:routes` | Route & Link Crawler | **PASS** | 71 routes crawled, 0 broken links, 16 screenshots valid, 200 anchors verified |

---

## 10. Visual Regression & UI Inspection

Inspected via `browser_subagent` at `1280×800` (desktop) and `375×812` (mobile):
- **Desktop (1280×800):**
  - Hero composition matches existing marketing pages; breadcrumbs and primary/secondary button row render with balanced margins.
  - Custom capabilities grid renders 6 distinct cards with clean borders and typography.
  - "Why custom software" 4-card grid displays balanced whitespace.
  - Real case study grid showcases screenshots with accurate aspect ratios and metadata tags.
  - FAQ accordion functions smoothly with `+` toggles.
- **Mobile (375×812):**
  - Header, breadcrumbs, and hero headings wrap smoothly without overflowing.
  - Button row stacks naturally for touch interaction.
  - Single-column card stacking maintains readable contrast and generous tap targets.
  - No horizontal scrolling detected on any section.

Recording artifact: `rajkot_page_check_1792688523354.webp`

---

## 11. Unverified Business Claims Audit

- **Physical Office in Rajkot:** NONE claimed. Page truthfully describes software engineering services and customer acquisition focus.
- **Staff / Onsite Presence:** NONE claimed.
- **Client Testimonials:** NONE invented.
- **Completed Project Counts:** NONE invented.
- **Address:** Only global company address in Ahmedabad remains in root Organization schema; no misleading local address created.

---

## 12. Final Assessment

- **Implementation:** PASS
- **SEO tests:** PASS
- **UI preservation:** PASS
- **Deployment:** NOT DEPLOYED (Local changes preserved; awaiting user review)
