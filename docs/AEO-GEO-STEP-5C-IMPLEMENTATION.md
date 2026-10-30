# PentaForge — Step 5C: Original Jewellery Software Expertise & Answer-Focused Content Implementation

Implementation date: **31 October 2026 (Asia/Kolkata)**.  
Production URL: **https://www.pentaforge.co.in/**.  
Baseline commit: `181956c` (`5c implemented`).  
Basis documents: `docs/AEO-GEO-STEP-5A-AUDIT.md`, `docs/AEO-GEO-STEP-5B-IMPLEMENTATION.md`.  
Deployment status: **NOT DEPLOYED** (local verification only; do not commit, push, merge, or deploy automatically).

---

## 1. Executive Summary

This implementation delivers high-integrity, evidence-safe educational content for PentaForge's jewellery software guides and case studies. The objective is to provide business owners and AI-powered search engines with clear, accurate, and demonstrable explanations of real jewellery manufacturing and billing operations, grounded strictly in verifiable software evidence rather than speculative claims or AI-targeted manipulation.

Key milestones achieved:
1. **Mathematical Clarity & Owner-Approved Billing Convention:**  
   Educational calculations for gross weight, deductions, net weight, touch percentage, and fine gold were implemented with integer-milligram arithmetic in `data/jewellery-examples.ts`.  
   **Owner Approval Confirmed:** The PentaForge owner explicitly confirmed the client billing convention:
   - Net weight: $20.000\text{ g}$
   - Touch: $75\%$
   - Making charge rate: $2\text{ percentage points}$
   - Combined billing rate: $77\%$
   - Fine gold at touch alone: $15.000\text{ g}$
   - Additional fine-gold making charge equivalent: $0.400\text{ g}$
   - Total billed fine-gold equivalent: $15.400\text{ g}$  
   This calculation has been integrated into [`/insights/track-gold-loss-jewellery-manufacturing`](file:///e:/Kaam/PentaForge/pf/new%20pentaforge%20website/data/articles.ts) with explicit qualification that it is an agreed commercial convention used in a specific PentaForge-developed workflow, not a universal jewellery industry formula.
2. **Physical Metal vs. Billing Liability Distinction:**  
   The article explains the crucial distinction between physical gross/net metal ($20.000\text{ g}$ net), fine gold content ($15.000\text{ g}$ pure gold), financial labor charges ($0.400\text{ g}$ equivalent), and customer billing balances ($15.400\text{ g}$ liability), clarifying that labor equivalents do not represent physical metal movement or workshop loss.
3. **Work-in-Progress (WIP) vs. Physical Loss Distinction:**  
   A dedicated educational section and table demonstrate that gold issued to a karigar remains in-process inventory until final reconciliation and refining, preventing premature recording of false manufacturing losses.
4. **Representative 7-Stage Manufacturing Lifecycle:**  
   A structured walkthrough details the operational sequence from customer order to settlement while explicitly distinguishing a representative business flow from isolated demonstrated software modules (casting, recovery, billing).
5. **Contextual Case-Study Integration:**  
   Bidirectional, natural navigation was added between the in-depth educational guides (`/insights/...`) and the corresponding operational evidence pages (`/work/...`), including evidence-scope notes on masked/sample data.
6. **SEO & Design Preservation:**  
   Retained all canonical URLs, original publication dates (`2026-09-23`), minimalist styling, responsive behavior, and Article JSON-LD without injecting artificial `FAQPage` markup or keyword stuffing.

---

## 2. Files Modified and Added

| File | Status | Description |
| --- | --- | --- |
| `data/jewellery-examples.ts` | **Added / Updated** | Integer-milligram arithmetic models for weight conversion, touch comparison (22K 91.6% vs 22/24), WIP multi-stage reconciliation, and owner-approved 77% billing convention. |
| `tests/jewellery-examples.test.ts` | **Added / Updated** | Automated unit tests validating mathematical exactness, owner-approved billing calculation ($15.000 + 0.400 = 15.400\text{ g}$), column sum reconciliations, and published date retention. |
| `data/articles.ts` | **Modified** | Added owner-approved billing convention, question-led sections, gold calculation definitions, WIP reconciliation tables, 7-stage manufacturing walkthrough, and operational exceptions to `/insights/track-gold-loss-jewellery-manufacturing` and `/insights/how-jewellery-manufacturing-software-works`. |
| `data/caseStudies.ts` | **Modified** | Added contextual `guides` links and evidence-scope notes explaining that published project screens reflect real workflows with masked or empty sample data. |
| `app/(marketing)/insights/[slug]/page.tsx` | **Modified** | Rendered structured evidence links (`article-evidence`) and accessible data tables (`article-table`) with responsive data labels. |
| `app/(marketing)/work/[slug]/page.tsx` | **Modified** | Rendered related educational guide links within the case study navigation block. |
| `app/content.css` | **Modified** | Added responsive styles for `.article-table` and `.article-evidence`, converting tables to readable mobile cards below 700px. |

---

## 3. Mathematical Calculations, Assumptions & Evidence

All numerical teaching examples are modeled in integer milligrams (`data/jewellery-examples.ts`) to avoid floating-point inaccuracies.

### A. Weight Chain & Touch Calculation (Published)
- **Calculation:**  
  $$\text{Gross Weight: } 10.500\text{ g}$$  
  $$\text{Agreed Deductions (wax, stones, lac): } 0.500\text{ g}$$  
  $$\text{Net Weight: } 10.500 - 0.500 = 10.000\text{ g}$$  
  $$\text{Touch (18K sample): } 75.00\%$$  
  $$\text{Fine-Gold Equivalent: } 10.000 \times \frac{75}{100} = 7.500\text{ g}$$
- **Assumptions:** Purely definitional baseline. Distinguishes physical gross weight from net precious metal weight and fine-gold equivalent.
- **Evidence:** Matches standard Indian jewellery trade definitions and aligns with the columns present on the PentaForge billing screen (`Gross Weight`, `AD Weight`, `Less Weight`, `Net Weight`, `Tunch %`, `Fine Gold`).

### B. Owner-Approved Specific Billing Convention (Published)
- **Calculation:**  
  $$\text{Net Weight: } 20.000\text{ g}$$  
  $$\text{Touch: } 75.00\%$$  
  $$\text{Making Charge Rate: } 2\text{ percentage points}$$  
  $$\text{Combined Calculation Rate: } 75\% + 2\% = 77\%$$  
  $$\text{Fine Gold Based on Touch Alone: } 20.000 \times \frac{75}{100} = 15.000\text{ g}$$  
  $$\text{Additional Fine-Gold Equivalent Charge: } 20.000 \times \frac{2}{100} = 0.400\text{ g}$$  
  $$\text{Total Fine-Gold Equivalent Billed: } 20.000 \times \frac{77}{100} = 15.400\text{ g}$$
- **Exact Relationship:** $15.000\text{ g} + 0.400\text{ g} = 15.400\text{ g}$.
- **Assumptions & Scope:**
  - This is an approved commercial convention used in a specific PentaForge-developed billing workflow, **not an industry-wide formula**.
  - **Physical metal weight:** The ornament weighs $20.000\text{ g}$ net and physically contains $15.000\text{ g}$ of pure gold.
  - **Financial charge:** The $0.400\text{ g}$ is not physical gold inside the ornament or workshop metal loss; it is a financial making charge converted into fine-gold units for billing settlement.
  - **Billing balance:** The $15.400\text{ g}$ represents customer fine-gold liability (metal receivable). Billing liabilities and stock ledger movements remain distinct.
- **Rounding Boundary:** Precision is demonstrated to three decimal places ($0.001\text{ g}$ / $1\text{ mg}$). Any additional shop-specific rounding behaviors (e.g. intermediate rounding on multi-item bills) require client confirmation during deployment.
- **Approval Evidence:** Explicitly confirmed by PentaForge owner for client billing workflow.

### C. Karat vs. Decimal Touch Convention Comparison (Published)
- **Calculation (on 100.000 g net 22K):**  
  - Using configured decimal touch ($91.60\%$): $100.000 \times 0.916 = 91.600\text{ g}$ fine gold.  
  - Using theoretical karat fraction ($22/24 \approx 91.667\%$): $100.000 \times \frac{22}{24} = 91.667\text{ g}$ fine gold.  
  - Variance: $0.067\text{ g}$ per $100.000\text{ g}$ of net metal.
- **Evidence:** Verified against the published **Purity Configuration** screen in `/work/jewellery-manufacturing-system` (`public/projects/jewellery-manufacturing/purity.webp`), which displays configurable defaults: `24K: 99.5%`, `22K (916): 91.6%`, `18K (750): 75%`, and `14K (585): 58.5%`.

### D. Work-in-Progress (WIP) Reconciliation Lifecycle (Published)
- **Scenario:** 100.000 g fine gold issued to karigar.
- **Mid-Job Position:**  
  Finished work returned: $60.000\text{ g}$  
  Work in progress (with karigar): $30.000\text{ g}$  
  Scrap awaiting refining (estimated fine): $10.000\text{ g}$  
  Recovered from scrap: $0.000\text{ g}$  
  **Confirmed process loss:** $100.000 - (60.000 + 30.000 + 10.000) = 0.000\text{ g}$.
- **After Completion & Refining Position:**  
  Finished work returned: $87.000\text{ g}$  
  Work in progress: $0.000\text{ g}$  
  Scrap awaiting refining: $0.000\text{ g}$  
  Refined recovery: $11.400\text{ g}$  
  **Confirmed process loss:** $100.000 - (87.000 + 11.400) = 1.600\text{ g}$.
- **Evidence:** Supported by the Operations Dashboard cards (`public/projects/jewellery-operations/dashboard.webp`): *Admin Stock (Fine)*, *Karigar Stock (In Process)*, *Finished Goods*, *Recovered Stock*, and *Karigar Loss*.

---

## 4. Owner Review Observations

### 1. Illustrative 77% Making Charge Calculation
- **Status:** **APPROVED & PUBLISHED**
- **Confirmation:** The owner explicitly confirmed the validity of the $20.000\text{ g} \times 77\% = 15.400\text{ g}$ calculation for a specific client billing workflow.
- **Implementation:** Added to `data/articles.ts` with transparent disclosure of its status as a custom commercial convention rather than an industry standard.

### 2. Operational Display Discrepancy (Observation for Ongoing Reference)
- In the manufacturing purity configuration (`purity.webp`), 22K is defined as `91.6%`.
- In the casting register (`casting.webp`) and operations register (`register.webp`), items are labelled `22k (92%)`.
- **Note:** This reflects UI display rounding in custom client implementations. The published educational guide explicitly notes that software must apply a consistent, agreed purity touch rate internally.

---

## 5. Manufacturing Workflow & Operational Exceptions

In `/insights/how-jewellery-manufacturing-software-works`, two substantial sections were added without duplicating content:

1. **Representative Order Lifecycle Walkthrough:**  
   Breaks down the 7 key stages:
   - Stage 1: Customer Order & Specification
   - Stage 2: Material & Alloy Allocation
   - Stage 3: Casting & Tree Production
   - Stage 4: Karigar Issue & Bench Hand-off
   - Stage 5: Intermediate Bench Weigh-ins & WIP Tracking
   - Stage 6: Bench Scrap Recovery & Lot Reconciliation
   - Stage 7: Billing, Fine-Gold Settlement & Ledger Posting  
   *Note explicitly included:* Distinguishes a full theoretical sequence from isolated demonstrated software modules.

2. **Common Operational Exceptions:**  
   Details practical shop-floor realities:
   - Partial batch returns
   - Weight adjustments / scale recalibrations
   - Rework and casting reject recycling
   - Karigar bench balances spanning multiple days
   - Differing purity and rounding conventions

---

## 6. Real Case-Study & Evidence Connections

Contextual links and evidence descriptions were integrated across both guides and case studies:

- **From Gold Loss Guide (`/insights/track-gold-loss-jewellery-manufacturing`):**
  - Links to `/work/custom-billing-system` for gross/net weight and fine gold field separation.
  - Links to `/work/jewellery-operations-system` for WIP vs. confirmed loss ledger tracking.
  - Links to `/work/jewellery-manufacturing-system` for bench scrap recovery and lot reconciliation.
  - Links to `/work/jewellery-polishing-management` for two-pass weight tracking.
- **From Manufacturing Guide (`/insights/how-jewellery-manufacturing-software-works`):**
  - Links directly to casting registers, recovery ledgers, and billing modules.
- **From Case Studies (`/work/...`):**
  - Added direct links to the relevant educational guides under the "Related resources" section.
  - Added clarifying scope statements to the `challenge` sections indicating that captured screens display structure and workflow with sample or masked values to protect client confidentiality.

---

## 7. Structured Data, Technical SEO & Design Preservation

- **Canonical URLs:** Maintained 100% integrity (e.g., `https://www.pentaforge.co.in/insights/track-gold-loss-jewellery-manufacturing`).
- **Publication Dates:** Kept strictly at `2026-09-23`. No dates were altered or fabricated.
- **Structured Data:** Preserved valid `Article` JSON-LD schema linked to `https://www.pentaforge.co.in/#organization`. No abusive `FAQPage` markup was added.
- **Robots / Indexing:** No changes to crawler policies; preview protection remains active.
- **Visual & UI Design:** Zero changes to global fonts, color tokens, navbar, footer, or layout components. The newly added `.article-table` uses clean borders and typography matching the PentaForge design system, wrapping into accessible stacked cards on mobile screens (`<= 700px`).

---

## 8. Verification Results

All automated test suites, typechecks, builds, and SEO checks passed cleanly:

1. **Typecheck & Lint:**
   ```bash
   npm run typecheck
   # Exit code: 0
   npm run lint
   # Exit code: 0
   ```
2. **Automated Test Suite:**
   ```bash
   npm run test
   # Result: 35 tests passing, 0 failing (including tests/jewellery-examples.test.ts)
   ```
3. **Production Build:**
   ```bash
   npm run build
   # Compiled successfully: 92 static/SSG routes prerendered cleanly.
   ```
4. **SEO Verification (`scripts/verify-seo.ts`):**
   ```bash
   node --import tsx scripts/verify-seo.ts
   # Verified rendered metadata, canonicals, share images, schema, H1s, and indexability for 43 pages; sitemap and robots passed.
   ```
5. **Route & Link Verification (`scripts/verify-routes.ts`):**
   ```bash
   npm run verify:routes
   # 212 anchor links checked. Errors: 0.
   ```

---

## 9. Final Assessment Output

- **Implementation:** **PASS**
- **Calculation accuracy:** **PASS** *(Owner confirmed; verified with integer-milligram arithmetic; commercial scope and rounding boundaries fully documented)*
- **Evidence integrity:** **PASS**
- **Technical SEO:** **PASS**
- **UI preservation:** **PASS**
- **Deployment:** **NOT DEPLOYED**
