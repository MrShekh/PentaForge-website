# PentaForge — Step 5B: Company Identity, Entity Consistency & Evidence-Safe Content Implementation

Implementation date: **31 October 2026 (Asia/Kolkata)**.  
Production URL: **https://www.pentaforge.co.in/**.  
Baseline commit: `e481eb2` (`logo and favicon added`).  
Audit basis: `docs/AEO-GEO-STEP-5A-AUDIT.md`.  
Deployment status: **NOT DEPLOYED** (local verification only; do not commit, push, or deploy automatically).

---

## 1. Implementation Summary

This implementation addresses the verified, low-risk identity and entity gaps identified in the Step 5A audit without modifying design, navigation structure, or core functionality:

1. **Official Company Identity & Social Integration:**
   - Integrated the approved LinkedIn (`https://www.linkedin.com/company/pentaforge-official/`) and Instagram (`https://www.instagram.com/pentaforge.official/`) profiles as reliable defaults in `config/site.ts`.
   - Added validation via `resolveSocialUrl()` so malformed environment variables do not override approved profiles while valid HTTPS overrides remain supported.
   - Connected these official profiles directly to the visible website footer and `Organization.sameAs` in JSON-LD.
   - Preserved Facebook as unconfigured (no URL invented).

2. **Connected Structured Data & Entity Relationships:**
   - Linked all child structured data entities (`Service` in education, `CreativeWork` in case studies, `Article` in insights) directly to the canonical Organization `@id`: `https://www.pentaforge.co.in/#organization`.
   - Maintained reference integrity with consistent `name: 'PentaForge'` and `url: 'https://www.pentaforge.co.in/'`.
   - Eliminated duplicate top-level Organization objects across all routes.
   - Preserved educational demo disclosures and strict `noindex, follow` protection.

3. **Evidence-Safe Jewellery Product Claims (`data/products.ts`):**
   - **Manufacturing:** Qualified broad assertions regarding universal shared ledgers and total accountability; accurately distinguished demonstrated casting, recovery, and purity interfaces from customizable shop-floor integrations.
   - **Billing:** Replaced absolute claims about off-the-shelf software with balanced, factual distinctions; highlighted demonstrated cash/metal dual-ledger capabilities while clarifying configurable making charge options.
   - **Polishing:** Grounded weighing claims in the verified two-pass interface (weight in/weight out); marked karigar bench assignment and printer integrations as custom-scoped items rather than demonstrated out-of-the-box features.

4. **Rajkot Location Page Refinement (`app/(marketing)/locations/rajkot/page.tsx`):**
   - Replaced internal marketing jargon ("primary customer-acquisition market") with customer-focused phrasing ("PentaForge serves Rajkot businesses with custom software development...").
   - Balanced assertions regarding off-the-shelf software and guaranteed disruption-free migration.
   - Preserved all 4 jewellery case studies, local Rajkot relevance, metadata, canonicals, and minimalist visual hierarchy.

5. **Jewellery Industry Hub Refinement (`data/industries.ts`):**
   - Clarified FAQ answers to distinguish service availability across Rajkot/Ahmedabad from claims of delivered clients in every single city or category.
   - Kept potential custom capabilities (GST invoicing, showroom counters) distinct from demonstrated case studies.

6. **Ahmedabad Location & Service Area Alignment:**
   - Audited all references to Ahmedabad across `company/page.tsx`, `contact/page.tsx`, `footer.tsx`, and `layout.tsx`.
   - Transitioned unsupported physical office assertions ("based in Ahmedabad" or standalone `PostalAddress` without street address) into precise service-area statements: "Serving Ahmedabad, Rajkot and Gujarat".
   - Flagged physical address details for owner review before adding formal street address schema.

---

## 2. Exact Files Modified

| File | Nature of Change |
| --- | --- |
| `config/site.ts` | Added `resolveSocialUrl()` helper and default official LinkedIn and Instagram profiles; maintained safe HTTPS overrides. |
| `components/layout/footer.tsx` | Updated footer location text to "Serving Ahmedabad, Rajkot and Gujarat"; renders verified social links. |
| `app/(marketing)/layout.tsx` | Aligned `Organization` JSON-LD: uses `areaServed` (Rajkot, Ahmedabad, Gujarat, India), `sameAs` from `site.socials`, removed unverified streetless `PostalAddress`. |
| `app/(marketing)/industries/education/page.tsx` | Linked `Service.provider` to stable `@id: 'https://www.pentaforge.co.in/#organization'`. |
| `app/(marketing)/work/[slug]/page.tsx` | Linked `CreativeWork.creator` to stable `@id: 'https://www.pentaforge.co.in/#organization'`. |
| `app/(marketing)/insights/[slug]/page.tsx` | Linked `Article.author` and `Article.publisher` to stable `@id: 'https://www.pentaforge.co.in/#organization'`. |
| `app/(marketing)/locations/rajkot/page.tsx` | Replaced internal acquisition wording with customer-centric language; qualified absolute software claims. |
| `data/products.ts` | Aligned claims in `jewellery-manufacturing`, `jewellery-billing`, and `polishing-management` with case-study evidence. |
| `data/industries.ts` | Qualified jewellery industry FAQs regarding regional client breadth and packaged availability. |
| `app/(marketing)/company/page.tsx` | Replaced "based in Ahmedabad" with service-area phrasing ("serving businesses in Ahmedabad, Rajkot and across Gujarat"). |
| `app/(marketing)/contact/page.tsx` | Replaced physical office label with "Serving Ahmedabad, Rajkot and Gujarat". |
| `scripts/verify-seo.ts` | Added assertions for Organization `@id`, `sameAs`, footer visible links, and child entity reference integrity. |
| `scripts/verify-routes.mjs` | Handled `/site.webmanifest` JSON validation in route crawler. |
| `tests/seo-entity.test.ts` *(new)* | Unit tests for social URL resolution, approved defaults, and override boundaries. |

---

## 3. Official Social URL Integration

### Configuration (`config/site.ts`)
```typescript
export function resolveSocialUrl(value: string | undefined, fallback?: string): string | undefined {
  const candidate = value?.trim();
  if (candidate && /^https:\/\//i.test(candidate)) {
    try {
      const url = new URL(candidate);
      if (url.protocol === 'https:' && url.hostname && !url.username && !url.password) return url.href;
    } catch {
      // A missing or malformed optional override must not hide an approved profile.
    }
  }
  return fallback;
}

export const site = {
  // ...
  socials: [
    { label: 'LinkedIn', url: resolveSocialUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL, 'https://www.linkedin.com/company/pentaforge-official/') },
    { label: 'Instagram', url: resolveSocialUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL, 'https://www.instagram.com/pentaforge.official/') },
    { label: 'GitHub', url: resolveSocialUrl(process.env.NEXT_PUBLIC_GITHUB_URL) },
  ].filter((item): item is { label: string; url: string } => !!item.url),
};
```

### Visible Footer Integration (`components/layout/footer.tsx`)
```tsx
{site.socials.length > 0 && (
  <>
    <h3 className="social-heading">Social</h3>
    {site.socials.map(link => (
      <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">
        {link.label} ↗
      </a>
    ))}
  </>
)}
```

---

## 4. Organization `sameAs` Before / After

### Before
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.pentaforge.co.in/#organization",
  "name": "PentaForge",
  "url": "https://www.pentaforge.co.in/",
  "sameAs": []
}
```

### After
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.pentaforge.co.in/#organization",
  "name": "PentaForge",
  "url": "https://www.pentaforge.co.in/",
  "sameAs": [
    "https://www.linkedin.com/company/pentaforge-official/",
    "https://www.instagram.com/pentaforge.official/"
  ]
}
```

---

## 5. Structured Data Reference Improvements

All entity references now resolve to the central Organization `@id`.

### Education Service (`app/(marketing)/industries/education/page.tsx`)
```diff
  <JsonLd data={{
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': title,
    'description': description,
    'serviceType': 'School website and custom education software development',
    'url': absoluteUrl('/industries/education'),
    'areaServed': [{'@type': 'City', 'name': 'Rajkot'}, {'@type': 'City', 'name': 'Ahmedabad'}, {'@type': 'Country', 'name': 'India'}],
-   'provider': {'@type': 'Organization', 'name': 'PentaForge', 'url': absoluteUrl('/')}
+   'provider': {'@type': 'Organization', '@id': 'https://www.pentaforge.co.in/#organization', 'name': 'PentaForge', 'url': absoluteUrl('/')}
  }} />
```

### Case Studies CreativeWork (`app/(marketing)/work/[slug]/page.tsx`)
```diff
  <JsonLd data={{
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': study.title,
    'description': study.summary,
    'url': absoluteUrl(`/work/${slug}`),
    'image': absoluteUrl(study.coverImage.src),
-   'creator': { '@type': 'Organization', 'name': 'PentaForge', 'url': absoluteUrl('/') },
+   'creator': { '@type': 'Organization', '@id': 'https://www.pentaforge.co.in/#organization', 'name': 'PentaForge', 'url': absoluteUrl('/') },
    'about': study.industry
  }} />
```

### Guides Article (`app/(marketing)/insights/[slug]/page.tsx`)
```diff
  <JsonLd data={{
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': a.title,
    'description': a.summary,
    'datePublished': a.publishedAt,
-   'author': { '@type': 'Organization', 'name': a.author, 'url': absoluteUrl('/') },
-   'publisher': { '@type': 'Organization', 'name': 'PentaForge', 'url': absoluteUrl('/') },
+   'author': { '@type': 'Organization', '@id': 'https://www.pentaforge.co.in/#organization', 'name': a.author, 'url': absoluteUrl('/') },
+   'publisher': { '@type': 'Organization', '@id': 'https://www.pentaforge.co.in/#organization', 'name': 'PentaForge', 'url': absoluteUrl('/') },
    'image': absoluteUrl(`/og/${slug}`),
    'mainEntityOfPage': absoluteUrl(`/insights/${slug}`)
  }} />
```

---

## 6. Corrected Claims Before / After

### A. Jewellery Billing Product (`data/products.ts`)
- **Before Description:** *"Traditional retail software assumes money-only transactions and fixed gross weights. Jewellery billing requires managing pure gold touch conversions, customer fine gold deposits (jama), labour charges, and running bullion balances. We engineer billing software built around precious metal accounting..."*
- **After Description:** *"Jewellery transactions involve fine gold conversions, customer advance metal (jama), labour charges and running balances alongside monetary payments. When standard retail software does not support those calculations, businesses often rely on manual workarounds. We build billing systems around precious metal accounting..."*
- **Before Off-the-shelf FAQ:** *"Is this an off-the-shelf billing product? / We provide pre-built, production-tested jewellery billing workflows that can be deployed as an independent system or customized to integrate with your specific ledger structure..."*
- **After Off-the-shelf FAQ:** *"Is this available as an off-the-shelf product? / Off-the-shelf availability is confirmed directly with PentaForge; this page does not confirm an immediately deployable package. We can show the existing billing workflow and agree the scope, platform support and any required customization before you commit."*

### B. Jewellery Manufacturing Product (`data/products.ts`)
- **Before Description:** *"...We engineer manufacturing software that tracks material movement at each handoff, distinguishes fine gold from gross weight, and provides complete accountability across workers."*
- **After Description:** *"...Our published manufacturing interface distinguishes fine stock and work in progress, with casting records, purity settings and recovery registers. Additional handoffs and controls are scoped around your workshop."*
- **Before Workflow Intro:** *"Explore the key production workflows we design around. Every module connects to a shared operational ledger, so everyone from casting managers to accountants works from the same record."*
- **After Workflow Intro:** *"The case study shows casting, recovery and categorised gold-ledger views. These production workflows are starting points for a scope discussion. Which modules share records, how they connect and who can use them are agreed and tested for your project."*

### C. Jewellery Polishing Product (`data/products.ts`)
- **Before Module:** `'Karigar work assignment & bench tracking'`
- **After Module:** `'Karigar assignment & bench tracking — custom scope'`
- **Before Multi-pass FAQ:** *"Can the system handle multi-pass weighing? / Yes. The interface supports multiple weighing passes (weight in and weight out) alongside piece counts and customer identification before generating final settlements."*
- **After Multi-pass FAQ:** *"Can the system handle multi-pass weighing? / The published interface supports two weight-in and weight-out passes alongside piece counts and customer records. Additional passes would require a separate scope and validation; unlimited passes are not confirmed."*

### D. Rajkot Service-Area Page (`app/(marketing)/locations/rajkot/page.tsx`)
- **Before FAQ:** *"Yes. Rajkot is our primary customer-acquisition market. We build custom business software..."*
- **After FAQ:** *"Yes. PentaForge serves Rajkot businesses with custom software development, including ERP, billing and operational systems. We start with your workflow and agree the capabilities your business needs."*
- **Before Capabilities Intro:** *"We build custom systems around your team, daily handoffs and specific business rules, distinct from prepackaged generic software."*
- **After Capabilities Intro:** *"These are capabilities we can scope around your team, daily handoffs and business rules. Modules, integrations and controls are agreed for each project; not every system includes every capability below."*
- **Before Spreadsheets FAQ:** *"Yes. Many of our systems replace fragmented spreadsheets and manual registers. We map your current paper workflows, migrate opening balances, and design intuitive interfaces that your team can adopt comfortably without disrupting daily work."*
- **After Spreadsheets FAQ:** *"Yes. We can map your existing workflows and scope a transition from Excel or paper records. Migration, opening-balance checks, training and rollout timing are agreed with your team to manage disruption; a disruption-free transition is not guaranteed."*

---

## 7. Ahmedabad Location Assertions Requiring Owner Review

The Step 5A audit found that previous text described PentaForge as "based in Ahmedabad" and included a streetless `PostalAddress` in schema.

### Actions Taken in Step 5B:
1. Transitioned public copy from unsupported physical assertions ("based in Ahmedabad") to factual service-area copy ("Serving Ahmedabad, Rajkot and Gujarat").
2. Replaced the incomplete `PostalAddress` schema with an explicit `areaServed` array covering Rajkot, Ahmedabad, Gujarat, and India.
3. Did not invent street addresses, branch offices, phone numbers, or Google Business Profile links.

### Flagged for Owner Decision:
- If PentaForge has a registered physical commercial office in Ahmedabad suitable for public listing, the owner can supply the verified street address, postal code, and business phone number to add full `PostalAddress` schema and a Google Business Profile link.
- Until verified, the current implementation safely represents PentaForge as a technology engineering provider serving Ahmedabad and Rajkot businesses.

---

## 8. Verification Results

### A. Test & Build Suite
- **`npm run lint`**: PASSED (0 warnings, 0 errors).
- **`npm run typecheck`**: PASSED (0 errors).
- **`npm run test`**: PASSED (30/30 tests passed, including new `seo-entity.test.ts`).
- **`npm run build`**: PASSED (92 static and dynamic routes built successfully in 2.1s).
- **`node --import tsx scripts/verify-seo.ts`**: PASSED (43 canonical marketing routes, sitemaps, robots, metadata, and entity schemas verified).
- **`npm run verify:routes`**: PASSED (72 routes crawled, 16 screenshots verified, 13 share images verified, 200 anchors verified, 0 broken links).

### B. Visual Inspection (Desktop & Mobile Browser Subagent)
Visual inspection was executed on `http://localhost:3000` using the browser subagent. Recordings and screenshots were captured to verify live rendering:
1. **Footer Social Links & Text:** Verified visible LinkedIn and Instagram links with arrow glyphs, and bottom copy: `"Serving Ahmedabad, Rajkot and Gujarat"`. Screenshot: `footer_inspection_1793387106606.png`.
2. **Rajkot Location Page (`/locations/rajkot`):** Verified customer-facing FAQ text and capabilities section. Screenshot: `rajkot_faq_1793387188589.png`.
3. **Jewellery Billing Page (`/products/jewellery-billing`):** Verified qualified claims and realistic calculation phrasing. Screenshot: `jewellery_billing_1793387262527.png`.
4. **Mobile Layout (`390×844`):** Verified responsive header, hamburger menu, and clean footer stacking with zero horizontal overflow. Screenshots: `mobile_view_1793387297587.png`, `mobile_view_1793387351709.png`.
5. **Session Video Recording:** Saved at `aeo_step5b_verify_1793387046597.webp`.

---

## 9. Remaining Limitations & Next Steps

1. **Owner Profile Confirmations:**
   - Facebook profile URL is not yet established.
   - Physical street address / office hours are omitted until owner provides formal documentation.
2. **AI Engine Retrieval Baseline:**
   - Step 5A noted that live query testing across consumer AI search interfaces (ChatGPT Search, Perplexity, Claude, Google AI Overviews) has not been baselined. Once deployed, live retrieval probing can be performed using the Step 5A query set.

---

## 10. Final Assessment

- **Implementation:** **PASS**
- **Technical SEO:** **PASS**
- **Entity Consistency:** **PASS**
- **Claim Accuracy:** **PASS**
- **UI Preservation:** **PASS**
- **Deployment:** **NOT DEPLOYED** (per instruction, changes remain in local working tree for owner review).
