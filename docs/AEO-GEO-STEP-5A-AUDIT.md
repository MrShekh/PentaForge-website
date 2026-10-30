# PentaForge — Step 5A: AI Search Visibility & AEO/GEO Readiness Audit

Evidence snapshot: **30 October 2026**. Report finalized: **31 October 2026 (Asia/Kolkata)**. Production: **https://www.pentaforge.co.in/**.

Scope: read-only repository inspection, live public HTTP/HTML checks, official crawler documentation research, and this report. Repository baseline: `e481eb2` (`logo and favicon added`). The only repository change made for this task is this document. Recommendations below are proposals, not completed changes.

Evidence labels:

- **VERIFIED**: directly observed in source, a recorded HTTP response, parsed HTML, an executed test, or the cited official documentation. A published business statement is verified as published, not independently proven as a business outcome.
- **INFERRED**: a reasoned opportunity or risk based on those observations; not a demonstrated ranking or citation effect.
- **NOT VERIFIED**: insufficient access or evidence. This does not mean false, absent, or blocked.

## 1. Executive summary

**No P0 technical blocker was found in the checks performed.** All **43 published marketing routes** returned HTTP 200 without authentication; each had one H1, an official HTTPS/www canonical and `index, follow`. The production sitemap is valid XML with 43 unique entries. No sampled marketing page had `nosnippet`, `data-nosnippet`, or a restrictive `X-Robots-Tag`. Essential page text and JSON-LD were present in server-returned HTML. These are accessibility and eligibility observations, not evidence that a particular AI service has indexed, cited, or recommended PentaForge.

The strongest existing differentiation is the **four jewellery case studies and 16 published, privacy-treated interface images**: manufacturing, polishing, billing, and operations/stock. Recent SEO work already connects these to relevant service, product, industry and Rajkot pages. Avoid recreating that work or replacing it with generic AI-oriented prose.

The highest-value gaps are:

1. **P1 — Identity linkage:** production Organization `sameAs` is empty and the footer has no official social links, despite the owner supplying LinkedIn and Instagram.
2. **P1 — Claim precision:** some product/Rajkot statements are broader than their linked evidence. The billing page's universal claim about standard retail software also conflicts with the balanced ready-made comparison article. Separate demonstrated interfaces from project-dependent implementation promises.
3. **P1 — Local identity confirmation:** company/contact/footer wording and Organization address identify Ahmedabad as a base; the brief confirms service areas, not physical offices. Confirm the base before repeating it in additional profiles or schema.
4. **P2 — Better answers from existing evidence:** add approved, worked calculation examples and clearer product availability answers when genuine supporting information exists.
5. **P2 — Entity relationships:** the stable Organization ID already exists; reuse it in Article author/publisher, case-study creator, and education Service provider references where currently absent.

**AI visibility baseline: NOT VERIFIED.** None of the 20 prompts below was submitted to a consumer ChatGPT Search, Claude, Gemini, Google AI Mode/Overview, or Perplexity interface with its answer recorded. No rank, citation rate, recommendation frequency, or competitor comparison is claimed.

### Previous work: current state, not historical assumptions

| Step | VERIFIED current evidence | Assessment |
| --- | --- | --- |
| 4B — canonical www | Apex homepage and apex Rajkot URL redirect 308 to www; sampled Rajkot query is retained. HTTP www redirects 308 to HTTPS www. | Working in sampled production responses. Hosting redirect rule configuration was not accessed. |
| 4C — home/custom software | Homepage title/description and hero support mention custom software, ERP, Rajkot/Ahmedabad/Gujarat. Custom software page explains workflows and links to project evidence. | Earlier missing-geography and weak-service-context findings must not be carried forward unchanged. |
| 4D — jewellery products | All three product pages contain workflow detail, FAQs, availability qualifications and a matching case-study link. | Links are present. Remaining issue is precision of some claims, not missing case-study links. |
| 4E — jewellery hub | Links all four real cases, three published guides and the Rajkot page. Clearly labels potential custom capabilities separately from real systems. | Preserve that distinction, including for GST invoices and showroom capabilities. |
| 4F — Rajkot | Live `/locations/rajkot`, present in sitemap; four cases, service/product links, process and FAQs. Contextual inbound links exist from custom software and jewellery. | Useful existing destination. Remove internal acquisition language in a later content pass; no need for more city pages now. |

Reviewed the implementation documents for 4C–4F, sitemap/SEO reports, screenshot review, current data/templates, metadata/robots/routes, deployment documentation, and relevant tests. Historical documents saying “not deployed” describe their original task state; live responses establish that the corresponding content is now public. This audit itself made no deployment.

## 2. Technical crawler audit

### Live checks and method

Fetched all `publicRoutes` from the official origin, with redirects inspected rather than silently followed. Parsed returned HTML with JavaScript execution disabled and external resources blocked, so content observations do not depend on client hydration. Checked status, canonical, robots metadata, headings, main text, links, JSON-LD and selected HTTP headers. Additional requests covered robots, sitemap, drafts, school demos, missing routes, redirects and social endpoints.

| Check | Result and boundary | Status |
| --- | --- | --- |
| Public route availability | 43/43 HTTP 200, substantial main text, one H1 each; no login response or authentication header. | VERIFIED |
| Sitemap | `/sitemap.xml`: HTTP 200; XML parsed; 43 unique official-origin URLs; exact match to the 43 public routes; no draft/demo entries. | VERIFIED |
| Canonicals | All 43 resolve to their own HTTPS/www route. Homepage serialization without a trailing slash is the same root URL, not a conflicting host. | VERIFIED |
| Index/snippet directives | All 43 `index, follow`; no `nosnippet` or `data-nosnippet`; no restrictive `X-Robots-Tag` in these responses. | VERIFIED |
| Essential HTML | Descriptions, workflow explanations, FAQs, case-study narratives, guide text and links are in returned HTML; interactive controls are not required to extract that text. | VERIFIED |
| JSON-LD | All observed blocks parse as JSON. See section 6 for counts and semantic issues. | VERIFIED |
| Security challenge | No challenge HTML, 401/403/429, `WWW-Authenticate`, `x-vercel-mitigated`, or `cf-mitigated` found in the 43 public-page responses or 27 bot-token probes. | VERIFIED for these requests only |
| Hosting configuration | `next.config.ts` sets ordinary security headers; no repository UA block, middleware/proxy or local Vercel rule file was found in the inspected routing/configuration. Vercel dashboard/WAF rules and logs were unavailable. | VERIFIED source / NOT VERIFIED edge rules |
| Preview protection | `resolveSiteUrl` gives Vercel nonproduction deployments no indexable site URL; preview robots disallows `/`, sitemap is empty, marketing layout uses noindex. Existing targeted tests passed 4/4. | VERIFIED source/tests; live preview NOT VERIFIED |
| Draft articles | Three draft URLs return 404 with noindex and are absent from sitemap. | VERIFIED |
| School demos | All 28 demo routes return 200 with `noindex, follow`; absent from sitemap. Education's public hub remains indexable and explicitly calls demos fictional/frontend-only. | VERIFIED |
| Unknown page | `/not-a-real-route`: HTTP 404 with noindex. | VERIFIED |
| Experimental files | `/llms.txt` and `/llms-full.txt`: HTTP 404. This is not a discovered indexing defect. | VERIFIED |

Draft URLs tested: `/insights/custom-business-software-cost`, `/insights/digitize-manufacturing-business`, `/insights/mongodb-vs-postgresql-business-applications`. Demo families: LittleBloom (8 routes), Horizon (10), NextGen (10), including its sample portals.

Production [robots.txt](https://www.pentaforge.co.in/robots.txt) returned:

```text
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: https://www.pentaforge.co.in/sitemap.xml
```

There are **no dedicated rules for the nine bots below**. Public URLs are allowed by the wildcard policy; excluded internal paths remain disallowed. `noindex` is not authentication or a general prohibition on training use. Do not loosen demo/preview protections to chase AI visibility, and do not assume robots disallow alone provides access security.

### Nine requested crawler policies

For each row, made three **synthetic, token-only User-Agent requests** to `/`, `/solutions/custom-software`, and `/locations/rajkot`. All 27 returned 200, expected page content, and `index, follow`. These requests came from this audit environment, **not verified provider IPs**; they cannot establish that real crawler traffic passes an IP-specific WAF rule.

| Bot/token | Documented purpose | Current site robots policy | Synthetic result | Interpretation |
| --- | --- | --- | --- | --- |
| OAI-SearchBot | ChatGPT search discovery, separate from training. [OpenAI bots](https://developers.openai.com/api/docs/bots) | Allowed on public paths. | 200 × 3 | No sampled UA-token block. Genuine crawler access/index inclusion NOT VERIFIED. |
| ChatGPT-User | User-directed page retrieval; not the control for automatic Search inclusion. Robots rules may not apply to these user requests. [OpenAI bots](https://developers.openai.com/api/docs/bots) | No specific restriction. | 200 × 3 | A successful fetch is not a ChatGPT recommendation. |
| GPTBot | Potential model-training collection, independently controllable from search. [OpenAI bots](https://developers.openai.com/api/docs/bots) | Allowed on public paths. | 200 × 3 | Training permission is a separate owner decision; no change proposed as a prerequisite for Search. |
| Claude-SearchBot | Search indexing/relevance for Claude; observes robots policy. [Anthropic crawler guidance](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) | Allowed on public paths. | 200 × 3 | Actual Claude discovery/citation NOT VERIFIED. |
| Claude-User | Retrieval in response to user requests; Anthropic documents respect for robots. [Anthropic crawler guidance](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) | Allowed on public paths. | 200 × 3 | Distinguish from training and search crawling. |
| ClaudeBot | Collection for model development/training; observes robots policy. [Anthropic crawler guidance](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) | Allowed on public paths. | 200 × 3 | No evidence that permitting training earns citations. |
| PerplexityBot | Search discovery; Perplexity documents that this bot is not for foundation-model training. [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) | Allowed on public paths. | 200 × 3 | Check genuine IP traffic if a real failure occurs. |
| Googlebot | Google Search crawling, relevant to Search AI features. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) | Allowed on public paths. | 200 × 3 | Search indexing and snippet eligibility are prerequisites, not guarantees of AI Overview/Mode inclusion. |
| bingbot (Bingbot) | Bing search crawling/indexing; honors robots rules. [Bing crawler help](https://www.bing.com/webmasters/help/how-to-report-an-issue-with-bingbot-25c19802) | Allowed on public paths. | 200 × 3 | Bing inclusion alone does not establish inclusion in another provider's answers. |

**Gemini nuance:** Google-Extended is a robots product token, not a separate HTTP User-Agent. It controls specified Gemini training **and grounding uses** in Gemini Apps/Vertex AI; it does not control Google Search inclusion or ranking. With no specific restriction, this site's wildcard policy does not block it. Do not describe it as training-only or block it while assuming all Gemini retrieval remains unaffected. No Google-Extended HTTP “bot test” was invented. See [Google's common crawler documentation](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended).

Perplexity also documents a separate user-directed fetcher, Perplexity-User. It was not among the requested nine and was not tested. Provider-specific retrieval rules should not be generalized from another company's user agent. [Perplexity documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)

If genuine crawling fails later, inspect timestamped access/WAF logs and validate provider identity against its official IP guidance before adding narrow exceptions. Never disable security broadly or trust a User-Agent string alone; [Bing's verification guidance](https://www.bing.com/webmasters/help/verify-bingbot-2195837f) explicitly provides identity verification.

### Complete public sitemap inventory

Source: [production sitemap](https://www.pentaforge.co.in/sitemap.xml), cross-checked against `lib/routes.ts`. Every URL below returned 200 and passed the canonical/indexability checks above. Legal pages are genuine current public routes, not primary buyer-answer destinations.

| Group | Included URLs |
| --- | --- |
| Homepage | https://www.pentaforge.co.in/ |
| Solutions hub | https://www.pentaforge.co.in/solutions |
| Seven services | https://www.pentaforge.co.in/solutions/custom-software<br>https://www.pentaforge.co.in/solutions/business-digitization<br>https://www.pentaforge.co.in/solutions/web-applications<br>https://www.pentaforge.co.in/solutions/mobile-applications<br>https://www.pentaforge.co.in/solutions/desktop-software<br>https://www.pentaforge.co.in/solutions/ai-automation<br>https://www.pentaforge.co.in/solutions/cloud-backend |
| Industries hub | https://www.pentaforge.co.in/industries |
| Eleven industries | https://www.pentaforge.co.in/industries/jewellery<br>https://www.pentaforge.co.in/industries/manufacturing<br>https://www.pentaforge.co.in/industries/retail<br>https://www.pentaforge.co.in/industries/restaurants<br>https://www.pentaforge.co.in/industries/hotels<br>https://www.pentaforge.co.in/industries/education<br>https://www.pentaforge.co.in/industries/healthcare<br>https://www.pentaforge.co.in/industries/supermarkets<br>https://www.pentaforge.co.in/industries/logistics<br>https://www.pentaforge.co.in/industries/startups<br>https://www.pentaforge.co.in/industries/other-businesses |
| Products hub | https://www.pentaforge.co.in/products |
| Five products | https://www.pentaforge.co.in/products/jewellery-billing<br>https://www.pentaforge.co.in/products/jewellery-manufacturing<br>https://www.pentaforge.co.in/products/polishing-management<br>https://www.pentaforge.co.in/products/inventory-management<br>https://www.pentaforge.co.in/products/business-billing |
| Work hub | https://www.pentaforge.co.in/work |
| Four case studies | https://www.pentaforge.co.in/work/jewellery-manufacturing-system<br>https://www.pentaforge.co.in/work/jewellery-polishing-management<br>https://www.pentaforge.co.in/work/custom-billing-system<br>https://www.pentaforge.co.in/work/jewellery-operations-system |
| Company/process/technology | https://www.pentaforge.co.in/company<br>https://www.pentaforge.co.in/company/how-we-work<br>https://www.pentaforge.co.in/company/technology |
| Contact and location | https://www.pentaforge.co.in/contact<br>https://www.pentaforge.co.in/locations/rajkot |
| Insights hub | https://www.pentaforge.co.in/insights |
| Three published guides | https://www.pentaforge.co.in/insights/how-jewellery-manufacturing-software-works<br>https://www.pentaforge.co.in/insights/track-gold-loss-jewellery-manufacturing<br>https://www.pentaforge.co.in/insights/custom-software-vs-ready-made |
| Legal | https://www.pentaforge.co.in/privacy<br>https://www.pentaforge.co.in/terms |

## 3. Company entity consistency

| Element | Evidence/status | Finding and proposed treatment |
| --- | --- | --- |
| Company name/category | VERIFIED: PentaForge throughout site; home/service/company describe custom software/business engineering. LinkedIn display name is “PentaForge Official.” | Core identity is consistent; “Official” is a profile label, not evidence of a separate company. |
| Origin and Organization ID | VERIFIED: `https://www.pentaforge.co.in/`, `https://www.pentaforge.co.in/#organization`. WebSite has `/#website` and references the Organization. | Already implemented. Keep these IDs; do not create duplicate local-city organizations. |
| Logo | VERIFIED: Organization uses `/pentaforge-logo-color.png`; direct request returns 200 image/png. Visible footer uses the corresponding SVG brand asset. | Different file formats are not a contradictory identity. Preserve working assets. |
| Social relationships | VERIFIED: production `sameAs: []`; no LinkedIn/Instagram/Facebook links in sampled site navigation/footer. `config/site.ts` only includes configured public social variables. | P1: use the two supplied official URLs in the shared source consumed by footer and schema. Actual Vercel variable values NOT VERIFIED; empty output does not prove why they are missing. |
| LinkedIn | VERIFIED: supplied page accessible with company name, custom software/ERP description and jewellery experience. | Align the canonical website link and approved company description. Self-published profile statements are not independent client proof. |
| Instagram | VERIFIED: direct HTTP 200 and page title identifying `@pentaforge.official` / PentaForge Software & AI. Web research fetch separately throttled. | Owner identifies this as official. Full bio, outbound website link and post consistency NOT VERIFIED; do not infer an absent profile from the throttled fetch. |
| Facebook/GitHub | Facebook URL not supplied; no verified official GitHub identity established. | Do not invent profile links or create listings in this audit. |
| Geography | VERIFIED site text says “based in Ahmedabad”; contact/footer say Ahmedabad, Gujarat, India. Organization contains Ahmedabad PostalAddress without a street. Rajkot page describes serving businesses there, not a street office. | Physical base NOT VERIFIED from owner brief. Confirm Ahmedabad base; if only service coverage is approved, use service-area wording and remove the unverified address assertion in a later change. No fake Rajkot branch, maps pin, hours or coordinates. |
| Contact channels | VERIFIED: contact form and inquiry steps visible; no public email/telephone in observed Organization, and no homepage mailto/tel link. Source fields are optional. | Confirm channels if owner wants them published. Do not invent them. Form delivery was not submitted/tested in this audit. |
| Industry expertise | VERIFIED published evidence concentrates on jewellery; other industries largely describe custom possibilities. Education explicitly distinguishes demos from live systems. | Preserve honest breadth: offered service is not proof of a delivered project in each sector. |

Official profiles: [LinkedIn](https://www.linkedin.com/company/pentaforge-official/), [Instagram](https://www.instagram.com/pentaforge.official/). LinkedIn's “business presence” wording does not establish an office. Its employee range, founding year and company type are self-reported; do not promote them into verified schema facts without owner confirmation.

**INFERRED benefit:** aligning visible official links with `sameAs` reduces ambiguity about which profiles belong to PentaForge. No measured AI recommendation improvement is claimed.

## 4. Content and answer-readiness audit

### Nine required customer questions, each with an existing source

The answers below summarize the currently published material. They do not certify software behavior beyond the evidence described in section 5.

| Customer question | Supported concise answer | Specific source | Gap/action |
| --- | --- | --- | --- |
| What is PentaForge? | A company building custom business software and digital applications around business workflows. | [Company](https://www.pentaforge.co.in/company) | Clear category. Confirm the physical-base wording separately. |
| What software does it build? | Custom business systems, ERP workflows, web/mobile/desktop applications, automation and backend systems are offered. | [Solutions](https://www.pentaforge.co.in/solutions) | Distinguish offered service breadth from demonstrated project breadth. |
| Does it develop custom ERP systems? | Yes, custom software/ERP development is explicitly offered for orders, stock, billing and operational workflows. | [Custom software](https://www.pentaforge.co.in/solutions/custom-software) | Do not imply a universal packaged ERP or complete accounting suite. |
| Has it built jewellery manufacturing software? | The published case study documents a manufacturing interface covering fine stock, casting, workshop records, recovery and reports. | [Manufacturing case](https://www.pentaforge.co.in/work/jewellery-manufacturing-system) | Strong first-party interface evidence; deployment/customer outcomes are not independently verified. |
| Can it handle fine-gold calculations? | Billing evidence contains gross/net/deduction, touch and fine-gold fields; operations evidence distinguishes karat/fine views. | [Billing case](https://www.pentaforge.co.in/work/custom-billing-system) | Add an approved illustrative calculation with units/rounding; current screenshots do not establish every configurable formula. |
| Does it support polishing workflows? | The documented registry shows two weighing passes, pieces, making charges, loss/touch fields and settlement history. | [Polishing case](https://www.pentaforge.co.in/work/jewellery-polishing-management) | Two passes are evidenced; unlimited passes or full bench allocation should not be implied without proof. |
| Does it build software for Rajkot businesses? | The site explicitly offers custom software and ERP development for Rajkot businesses. | [Rajkot page](https://www.pentaforge.co.in/locations/rajkot) | Service coverage is supported by the brief. Specific local client history and office presence are not established. |
| How does a customer start? | Describe the workflow/problem through the contact form; the stated next steps are review, a first-version discussion and technical planning. | [Contact](https://www.pentaforge.co.in/contact) | Strong direct next step. No verified response-time SLA or public direct channel; do not invent one. |
| What differentiates it from generic software? | Workflow-specific records, calculations and connected business states, demonstrated in jewellery cases; suitability still depends on needs. | [Custom vs ready-made guide](https://www.pentaforge.co.in/insights/custom-software-vs-ready-made) | Use this balanced comparison to qualify product-page universal claims. No unsupported superiority/rank claim. |

### Readiness by requested page group

| Page/group | Existing strengths (VERIFIED text/structure) | Remaining gap (INFERRED opportunity unless otherwise marked) |
| --- | --- | --- |
| [Homepage](https://www.pentaforge.co.in/) | Updated descriptive metadata/supporting text, services and project pathways. | Slogan H1 is acceptable with current explanatory copy. No need to redesign or force a keyword-heavy heading. Add shared identity links through existing footer. |
| [Custom software](https://www.pentaforge.co.in/solutions/custom-software) | ERP context, practical examples, discovery/support FAQs and real project links. | A compact evidence-backed boundary between included discovery and separately scoped integrations would help purchase decisions; avoid fixed budgets/timelines without owner facts. |
| [Jewellery hub](https://www.pentaforge.co.in/industries/jewellery) | Strong four-case/three-guide linkage and explicit “Potential custom capabilities” labeling. | Keep GST invoices/showroom catalogue in that prospective category. FAQ “works with” local wholesalers/retailers implies client experience not established by named evidence; verify or use service-availability wording. |
| [Manufacturing product](https://www.pentaforge.co.in/products/jewellery-manufacturing) | Fine stock, casting, recovery and configurable purity; matching proof link. | “Every module connects to a shared operational ledger” and “complete accountability” are broader than interface-only proof. Describe intended/project-agreed architecture unless verified across the offered implementation. |
| [Billing product](https://www.pentaforge.co.in/products/jewellery-billing) | Clear money/metal distinction, advances, issue/receive, matching case and scope caveat. | “Standard retail software cannot handle…” is an unsupported universal competitor claim. “These verified modules” covers configurable charge options not all demonstrated by current captures. Qualify the blanket wording. |
| [Polishing product](https://www.pentaforge.co.in/products/polishing-management) | Strong explanation of two-pass records, fine-to-return/collect and case link. | Karigar assignment/bench tracking is not established by this case's three captures. “Ready for deployment?” gets a configuration explanation rather than a direct availability answer. Distinguish print controls from confirmed printer integrations. |
| [Rajkot](https://www.pentaforge.co.in/locations/rajkot) | Direct local-service answer, four case studies, discovery process and links. | FAQ says “Rajkot is our primary customer-acquisition market”: internal strategy rather than a useful buyer answer. Generic-software claims, automated daily closing/audit trails and promises of disruption-free transition need scoping/qualification. |
| Four [case studies](https://www.pentaforge.co.in/work) | Concrete problems, workflows, screenshots, feature descriptions and engineering considerations. | No verified named clients, outcomes, implementation stacks or rollout details. Improve with owner-approved evidence, not manufactured testimonials. |
| [Manufacturing guide](https://www.pentaforge.co.in/insights/how-jewellery-manufacturing-software-works) | Explains order/material handoffs, stock positions and acceptance testing. | Add one approved anonymized order walkthrough to connect existing concepts, not another generic overview page. |
| [Gold loss guide](https://www.pentaforge.co.in/insights/track-gold-loss-jewellery-manufacturing) | Separates stock, WIP, recovery, gross/fine weight and process-specific calculations. Explicitly warns against subtracting cash from weight. | A worked example with agreed units, touch and rounding would improve answer extraction; never present one workshop's loss rule as universal. |
| [Custom vs ready-made guide](https://www.pentaforge.co.in/insights/custom-software-vs-ready-made) | Balanced fit/cost/ownership evaluation, same-job comparison and first-release scope. | Useful source of precise comparison language for products/Rajkot. No need to duplicate its full discussion across those pages. |
| [Company](https://www.pentaforge.co.in/company), [process](https://www.pentaforge.co.in/company/how-we-work), [technology](https://www.pentaforge.co.in/company/technology) | Engineering principles, process and scope discussions; team presentation. | Confirm base/contact details; don't invent biographies or assign article authorship to team members without approval. General technology capability is not a verified stack for any case. |
| [Contact](https://www.pentaforge.co.in/contact) | Accessible labeled inquiry form, clear next steps and confidentiality warning. | Delivery, support commitments and direct channels NOT VERIFIED. Test delivery later with an authorized test inquiry. |

**Repetition:** repeated closing CTAs and shared interface-disclosure captions are normal. Product/hub/Rajkot copy does repeat workflow lists and geography. Prefer a short page-specific answer plus the existing evidence link; do not append the same FAQ set to every route. Repetition is an editorial opportunity here, not a demonstrated penalty.

## 5. Case-study evidence audit

“Verified evidence” here means the published narrative, image references and repository screenshot manifest agree on the demonstrated interface. This audit did not operate the underlying applications, inspect client databases, or independently re-certify historical business delivery. `docs/SCREENSHOT-REVIEW.md` records the earlier individual image/privacy review; it is supporting provenance, not an independent client endorsement.

| Real case | Existing published evidence | What it supports | What it does not establish |
| --- | --- | --- | --- |
| [Manufacturing](https://www.pentaforge.co.in/work/jewellery-manufacturing-system) | 5 images: dashboard, casting, recovery, purity, reports. `public/projects/jewellery-manufacturing/`. | Distinct fine stock/WIP/receivables/recovery positions, casting/purity fields, settlement and ledger views. | Universal ERP coverage, every permission/integration, live accuracy, automated closing, measured savings or a named Rajkot client. |
| [Polishing](https://www.pentaforge.co.in/work/jewellery-polishing-management) | 3 images: dashboard, order registry, customer history. `public/projects/jewellery-polishing/`. | Two weight-in/out passes, piece counts, charge/loss/touch fields, customer settlement positions, print/Excel controls. | Unlimited passes, full bench scheduling/assignment, every printer integration or production-readiness for a new buyer. |
| [Billing](https://www.pentaforge.co.in/work/custom-billing-system) | 4 images: create bill, dashboard, bills, advance stock. `public/projects/jewellery-billing/`. | Issue/receive lines, weight/deduction/net/touch/fine fields, cash/metal balances, advances and print controls. | Verified GST compliance, all making-charge modes, supported printer models, installation platforms or off-the-shelf availability. |
| [Operations/stock](https://www.pentaforge.co.in/work/jewellery-operations-system) | 4 images: dashboard, stock, production register, analytics. `public/projects/jewellery-operations/`. | Stock states, karat controls, issued/finished records and purity-oriented analytics. | Implementation stack, client identity, quantitative loss reduction, all integrations or a packaged inventory release. |

All four cases already state that device support, deployment, access controls and integrations for a similar system are agreed in discovery. Preserve this important qualification. The jewellery hub already separates custom possibilities from these cases; **GST invoices are labeled a potential capability there, not a proven delivered feature**. Do not misreport that existing qualification as missing.

### Evidence improvements to commission, not invent

1. **One sanitized order walkthrough:** show the same clearly labeled example moving through order, material issue, work/return and settlement. Obtain publication permission and avoid authentic customer identifiers or private amounts.
2. **One calculation explanation:** owner-approved inputs, units, purity/touch basis and rounding; mark numbers as illustrative, not measured client outcomes. Describe correction/partial-return edge cases. The current gold-loss article's warning about cash versus weight is valuable.
3. **A better polishing registry capture:** the screenshot review notes that rightmost columns are outside the supplied capture. A fresh wide capture can establish what is actually present without inventing unseen UI.
4. **One technical decision per case:** only after an engineer confirms it, explain a concrete tradeoff such as separate metal/cash records or handling corrections. Do not infer a framework, database, installer or mobile app from desktop-sized screenshots.
5. **Before/after process evidence:** an approved qualitative comparison can describe which duplicated records a specific project replaced. Numerical time/loss improvements require a defined baseline, measurement period and client permission.
6. **Demonstration readiness:** show genuine screens or a controlled sanitized walkthrough of delivered functionality. A prototype must be labeled a prototype; a school frontend demo must remain fictional and noindex.

Classification to preserve: **demonstrated** = bounded jewellery interface evidence; **custom possibility** = project-scoped workflows/platforms/integrations and other-industry offerings; **future R&D** = exploratory work only when explicitly identified and approved. No verified AI production case or future-R&D project was established during this audit; do not relabel jewellery or school work as one.

## 6. Structured-data findings

Counts are top-level JSON-LD types across the 43 live marketing responses, not counts of distinct real-world entities.

| Type | Observed count | Finding |
| --- | --- | --- |
| Organization | 43 | One top-level Organization per page, consistently `/#organization`. Repeating the same ID across routes is appropriate identity reuse, not 43 competing companies. `sameAs` empty; Ahmedabad address needs owner confirmation. |
| WebSite | 43 | One per page, stable `/#website`, publisher references `/#organization`. Already connected correctly. |
| BreadcrumbList | 42 | Present on non-home marketing routes, parseable absolute URLs. No duplicate top-level breadcrumb object found per page. |
| Service | 19 | Seven service pages, eleven industries, Rajkot. Eighteen providers reference `/#organization`; education uses name/URL without ID. |
| CreativeWork | 4 | Real case studies; descriptive name, URL, image and creator. Creator uses name/URL without canonical Organization ID. |
| Article | 3 | Published guides; headline, description, publication date, image and mainEntityOfPage. Author/publisher are name-only Organization objects without shared ID. Visible byline is PentaForge, so don't invent a named author. |
| Other types | None observed as top-level objects | No Product, SoftwareApplication, LocalBusiness, AggregateRating or FAQPage detected. Their absence is not automatically a defect. |

No JSON parse errors, conflicting top-level company names, or duplicate top-level Organization/WebSite objects were observed within a page. Existing Organization references resolve to the same-page identity object. Missing `@id` on embedded organizations is a consistency enhancement, **not a broken URL or invalid JSON**. Adding the reference would connect claims to the known entity more explicitly.

Article dates are `2026-09-23` and match visible publication dates. They are not today's build date. No newly invented `dateModified` or sitemap `lastmod` is warranted. Historical publication accuracy itself is not independently established by this audit.

The three products intentionally discuss availability and scope; don't attach invented price, availability, reviews, supported-platform lists or offer schema. Visible FAQs do not require FAQPage markup for AI eligibility. Google's guidance says no special AI schema or AI text file is required for Search AI features. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features)

Proposed improvements: populate the two verified official social relationships from the same source as visible links; reuse `/#organization` in the three template locations above; align any confirmed geography change in visible copy and Organization together. Preserve truthful service-area distinctions. These improve consistency; they do not guarantee rich results or AI citations.

## 7. Twenty buyer/search prompts

**Exactly 20 proposed prompts, five per category. All live AI result statuses: NOT RUN / NOT VERIFIED.** These are a researched evaluation set grounded in current workflows and buyer needs, not claims of query volume or observed platform answers. “Evidence” describes PentaForge's current page content; “action” is a proposal.

### Branded discovery

| ID | Prompt | Intent | Relevant existing page | Current evidence | Gap | Recommended action |
| --- | --- | --- | --- | --- | --- | --- |
| B1 | What is PentaForge, and what business software does it build? | Identify company/services | [Company](https://www.pentaforge.co.in/company) | Clear software-engineering description and process. | Official profiles not linked from site; physical base unconfirmed. | Link confirmed socials; reconcile base/service-area wording. |
| B2 | Does PentaForge develop custom ERP systems for businesses in Rajkot? | Branded local fit | [Rajkot](https://www.pentaforge.co.in/locations/rajkot) | Explicit ERP/service coverage and four cases. | Service availability can be confused with verified local client history. | Use service wording; remove acquisition-strategy phrase. |
| B3 | Has PentaForge built jewellery manufacturing software, and can I see examples? | Validate delivery evidence | [Manufacturing case](https://www.pentaforge.co.in/work/jewellery-manufacturing-system) | Five interface images with workflow explanations. | No owner-approved end-to-end demonstration or independent customer confirmation. | Add a sanitized walkthrough when available. |
| B4 | Can PentaForge's jewellery billing software keep cash and fine-gold balances separate? | Branded feature validation | [Billing case](https://www.pentaforge.co.in/work/custom-billing-system) | Separate ledgers, issue/receive and advances. | Complete worked settlement example absent. | Add approved example with units and balance directions. |
| B5 | How do I discuss a polishing or gold-stock software project with PentaForge? | Branded conversion | [Contact](https://www.pentaforge.co.in/contact) | Form and next-step explanation. | No confirmed direct contact channel or turnaround commitment. | Keep form clear; add only owner-confirmed channels. |

### Unbranded vendor discovery

| ID | Prompt | Intent | Relevant existing page | Current evidence | Gap | Recommended action |
| --- | --- | --- | --- | --- | --- | --- |
| U1 | Which software development companies serve Rajkot SMEs needing custom ERP? | Local vendor shortlist | [Rajkot](https://www.pentaforge.co.in/locations/rajkot) | Local-service offer, ERP description and jewellery work. | Independent local references not verified. | Pursue genuine relevant references, not fabricated rankings. |
| U2 | Find developers in Gujarat with examples of jewellery manufacturing and casting software. | Industry specialist shortlist | [Jewellery hub](https://www.pentaforge.co.in/industries/jewellery) | Four real-case links and casting/purity evidence. | Third-party corroboration not established. | Share an approved technical case through official profiles/community channels. |
| U3 | Who builds jewellery billing systems with metal advances and cash ledgers? | Specialist billing search | [Billing product](https://www.pentaforge.co.in/products/jewellery-billing) | Jama/advances, cash/metal description and matching case. | Blanket comparison with standard software overreaches. | Qualify comparison; tie capability statements to demonstrated fields. |
| U4 | Find a developer for polishing job-work software with two-pass weighing and fine settlement. | Specialist operations search | [Polishing case](https://www.pentaforge.co.in/work/jewellery-polishing-management) | Two-pass registry, touch/loss and settlement fields. | Wider registry view and readiness details incomplete. | Publish a fresh approved capture and clarify project-dependent availability. |
| U5 | Which developers can build gold-stock software separating workshop WIP, karigar stock and finished goods? | Stock workflow vendor search | [Operations case](https://www.pentaforge.co.in/work/jewellery-operations-system) | Separate stock states, karat register and analytics. | Transfer/correction example not shown end to end. | Add one approved stock movement and reconciliation walkthrough. |

### Technical informational

| ID | Prompt | Intent | Relevant existing page | Current evidence | Gap | Recommended action |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | How should jewellery software distinguish gross weight, net weight, touch and fine gold? | Understand calculation concepts | [Gold loss guide](https://www.pentaforge.co.in/insights/track-gold-loss-jewellery-manufacturing) | Explains gross/fine distinction, units and approved purity rules. | No explicit approved numeric example covering each term. | Add one illustrative, unit-labeled calculation; document rounding assumptions. |
| T2 | How can software distinguish gold still in production from actual loss and pending recovery? | Reconciliation design | [Gold loss guide](https://www.pentaforge.co.in/insights/track-gold-loss-jewellery-manufacturing) | Separates WIP, recovery and final loss. | No single example tracing all positions. | Show a hypothetical reconciliation clearly labeled as explanatory. |
| T3 | How should a polishing register track two weighing passes and making charges? | Process-specific calculation | [Polishing case](https://www.pentaforge.co.in/work/jewellery-polishing-management) | Two passes and workflow-specific loss convention. | Short case explanation is easier to misread without units. | Link directly to gold-loss guide's cash-versus-weight warning; add approved example. |
| T4 | What records should connect a jewellery order, casting batch, karigar work and final bill? | ERP workflow design | [Manufacturing guide](https://www.pentaforge.co.in/insights/how-jewellery-manufacturing-software-works) | Connected handoffs, references and exceptions. | No approved single-order walkthrough. | Extend existing guide using real interface evidence. |
| T5 | When should an SME choose custom operational software instead of ready-made software? | Evaluate architecture/ownership | [Comparison guide](https://www.pentaforge.co.in/insights/custom-software-vs-ready-made) | Fit, total commitment, ownership, same-job trial and complete first release. | Product/Rajkot wording is less balanced. | Reuse the guide's qualified reasoning in those pages. |

### Purchase intent

| ID | Prompt | Intent | Relevant existing page | Current evidence | Gap | Recommended action |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | I need jewellery manufacturing software for a Rajkot workshop. What should I prepare for a demo? | Prepare vendor evaluation | [Manufacturing product](https://www.pentaforge.co.in/products/jewellery-manufacturing) | Asks for production volume, stages and current spreadsheets. | Demo availability and example checklist not confirmed. | Confirm demonstration process; request sanitized jobs only. |
| P2 | Can I buy PentaForge jewellery billing software immediately, or does it need customization? | Availability and fit | [Billing product](https://www.pentaforge.co.in/products/jewellery-billing) | Availability/platform/pricing subject to discussion. | Off-the-shelf FAQ gives an indirect answer. | State confirmed commercial availability plainly; keep unknowns conditional. |
| P3 | Can jewellery polishing software match our loss rules, export records and work with our printer? | Configuration/integration qualification | [Polishing product](https://www.pentaforge.co.in/products/polishing-management) | Case shows export/print controls; page describes configuration. | Specific hardware, units and supported integration scope not proven. | Confirm those requirements before promising support. |
| P4 | Can a custom ERP replace our SME's Excel order, stock and billing workflow, and how does the project start? | Discovery and migration | [Custom software](https://www.pentaforge.co.in/solutions/custom-software) | Workflow discovery, examples and staged process. | Actual migration responsibilities and acceptance boundaries project-dependent. | Explain required anonymized samples and agreed validation without fixed promises. |
| P5 | Before commissioning a gold-stock system, what should I ask about data ownership, support and rollout cost? | Procurement/risk evaluation | [Comparison guide](https://www.pentaforge.co.in/insights/custom-software-vs-ready-made) | Ownership, export, support/change costs and adoption checks. | No verified standard commercial terms or price range. | Offer a scope discussion; publish terms only after owner approval. |

For a later observed baseline, run these exact prompts using the relevant consumer search-enabled products. Record platform/mode, date/time, language/region, exact prompt, answer capture, cited URLs, company facts, errors and whether PentaForge appeared. Separate branded from unbranded results and note variability/personalization. A bare mention is not a citation. Compare like-for-like later; absence in one run is not proof of crawler failure. Do not score this report's unrun prompts as zero visibility.

## 8. Social and external credibility gaps

| Channel | What is known | Legitimate next action | Verification |
| --- | --- | --- | --- |
| LinkedIn Company Page | VERIFIED accessible owner-supplied profile; describes software/ERP and jewellery experience, with website reference. Self-published, not independent endorsement. | Align approved name, description, service areas and final canonical www link; share concise evidence-based case summaries linking to canonical cases. | Owner checks profile fields and final destination; inspect public post and backlink. |
| Instagram | VERIFIED endpoint/title/handle; full bio/backlink/posts NOT VERIFIED. | Owner checks bio/website link, uses genuine approved interface/process material, labels demos. | Public profile review and link destination check. |
| Facebook | NOT VERIFIED: URL not supplied. | Request official URL when available. No fabricated handle or sameAs entry. | Confirm ownership and public URL before adding. |
| Relevant directories | No specific existing PentaForge listing verified in this audit. | Consider only a real trade association or business directory for which PentaForge is eligible, with correct identity. Confirm any physical-location requirements before listing. | Check eligibility, ownership, accurate details and live listing; no duplicate city-office listings. |
| Partnerships/client references | None independently verified here. | Ask genuine clients/partners whether they wish to acknowledge completed work or approve a case reference. No invented partner logos. | Written permission, accurate relationship description, live source if published. |
| Technical cases/engineering articles | Four cases and three useful guides already exist. | Improve one with approved engineering detail, then share where it answers a real industry question. | Verify author/reviewer, claims, code/workflow examples and permissions. |
| Industry communities | No specific membership or third-party mention verified. | Participate transparently in relevant jewellery/manufacturing discussions; disclose affiliation and answer the question before linking. | Public contribution quality and relevance; no mass promotional posting. |

**NOT VERIFIED:** independent reviews, press coverage, rankings, directory membership, awards, client endorsements or partnership credentials. This is not a comprehensive backlink-index audit, so it does not claim these do not exist. Do not buy mentions, manufacture reviews, mass-submit directories or generate fake local listings.

## 9. Experimental tactics to avoid

### llms.txt assessment

The [llms.txt proposal](https://llmstxt.org/) describes a convention for curated, model-readable site context/navigation. It is a proposal with potential utility for particular documentation/agent workflows, not proof that publishing it improves vendor recommendations. Perplexity's developer documentation exposes an llms.txt-style documentation entry point; that is a documentation-navigation use case, not evidence its consumer search ranks vendors using such a file. [Perplexity documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)

Google explicitly says its Search AI features do not require special AI text files or special schema. Its guidance retains ordinary indexability, snippet eligibility and useful content as foundations. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features)

**Decision: do not add `llms.txt` or `llms-full.txt` in Step 5B.** No controlled evidence of benefit for PentaForge's target discovery experiences was established. Current 404s are not a P0/P1 issue. Consider a P3 experiment only if an actual consuming agent/documentation workflow requests it: define the consumer and success criterion, include only approved canonical public material, measure fetch/use, and maintain freshness. Do not mirror drafts, private screenshots, demo identities or entire page bodies into an unreviewed export.

Also avoid keyword-stuffed AI FAQ pages, hidden model instructions, synthetic testimonials, “best company” claims without evidence, unnecessary schema, fabricated authors/addresses, mass city pages and training-bot changes sold as guaranteed search gains. No tactic in this report guarantees an AI recommendation.

## 10. Prioritized 30-day implementation roadmap

Priority definitions: **P0** critical technical blocker; **P1** high-impact opportunity; **P2** useful enhancement; **P3** optional experiment. None of the tested issues currently warrants P0. Effort is an estimate, not a delivery commitment. Owner confirmation and publication permissions may determine timing. This is a proposed plan, not authorization to change production.

| Timing | Issue | Evidence | Impact | Effort | Priority | Recommended solution | Affected files/pages | Verification method |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Days 1–3 | Missing official profile links | Empty live sameAs; no footer social links; owner supplied two URLs. | Clearer company identity and user verification. | Low | P1 | Populate one shared, validated source with LinkedIn/Instagram; retain optional overrides. | `config/site.ts`; existing layout/footer consumers. | Parse live/local JSON-LD and inspect visible links; exactly the approved profiles, no placeholders. |
| Days 1–3 | Unconfirmed base/contact facts | Company/contact/footer and schema state Ahmedabad; brief confirms service areas only. | Avoid false physical-location inference. | Low, owner-dependent | P1 | Confirm base and public channels. Use service wording if base cannot be confirmed; no invented contacts. | Marketing layout, company/contact pages, footer; `config/site.ts` only for confirmed channels. | Owner-approved fact sheet; visible metadata/schema agree. |
| Days 2–6 | Product claims exceed bounded evidence | Billing universal competitor claim; polishing bench tracking/readiness; manufacturing universal ledger wording. | More accurate extraction and buyer expectations. | Low–medium | P1 | Qualify unsupported generalizations; distinguish demonstrated from configurable; answer availability directly. | `data/products.ts`; three jewellery product pages. | Sentence-to-case evidence review; preserve product caveats and working links. |
| Days 2–6 | Rajkot/jewellery local language | Acquisition-market FAQ; “works with” named customer categories; broad automation promises. | Clearer local service answer without implied unverified client history. | Low | P1 | Use customer-facing service wording and project-dependent scope; keep hub's potential-capability labels. | `app/(marketing)/locations/rajkot/page.tsx`, jewellery record in `data/industries.ts`. | Review against owner-confirmed geography/project evidence; no fake branches or cases. |
| Days 4–7 | Incomplete shared entity references | Education provider, case creators and Article author/publisher omit existing ID. | Consistent machine-readable attribution. | Low | P2 | Reference existing `/#organization`; retain valid visible facts. | Education, work `[slug]`, insights `[slug]` templates. | Parse rendered JSON-LD; references resolve; no extra duplicate Organization objects. |
| Days 5–10 | No observed AI baseline | All 20 proposed prompts unrun in named products. | Enables evidence-based prioritization. | Medium | P2 | Run recorded baseline across available target systems; keep platform/mode/region and citation details. | Separate measurement record; no site code required. | Exact prompt/answer/source capture; distinguish mention, citation and factual accuracy. |
| Days 8–15 | Worked calculation/workflow evidence | Cases/guides have strong descriptions but no approved complete worked example. | Better practical answer quality and demonstrable expertise. | Medium, owner-dependent | P2 | Add one unit-labeled calculation and one end-to-end example to existing guide/case. | `data/articles.ts`, `data/caseStudies.ts`; approved `public/projects/` derivatives if needed. | Engineer checks arithmetic, units, rounding and exceptions; privacy/permission review. |
| Days 10–18 | Demo/availability questions indirect | Product FAQs defer scope but do not clearly answer immediate availability. | Better purchase qualification. | Low, owner-dependent | P2 | Confirm commercial status, demo process, supported configurations and what must be scoped. | `data/products.ts`, existing contact/process text if needed. | Owner approval; no fabricated prices, SLAs or platform lists; authorized inquiry-delivery test if commissioned. |
| Days 15–25 | Limited corroboration established | Official LinkedIn accessible; independent references not verified. | More legitimate ways to verify identity and work. | Medium | P2 | Publish approved case summary on official profile; pursue one genuine eligible association/partner/client reference. | External profiles; existing canonical case pages. | Public accuracy, permission and destination checks; no purchased/spam links. |
| Days 26–30 | Need outcome review after changes | Technical eligibility alone is not citation performance. | Avoids attributing random output changes to SEO. | Low–medium | P2 | Repeat matched prompt subset and technical checks; inspect Search Console/Bing/logs if owner grants access. | Measurement record, sitemap/schema/robots checks. | Compare same conditions; report variability and uncertainty; don't claim causation from a single run. |
| Defer beyond core work | llms.txt hypothesis | Proposal exists; target-system benefit not established. | Unknown for current buyer discovery. | Low to build, ongoing maintenance | P3 | Only pilot for an identified consumer and measurable use case. No file now. | None in Step 5B. | Consumer use/fetch evidence and freshness checks, not file-exists scoring. |

## 11. Exact proposed scope for Step 5B

**Proposed title: “Entity consistency and evidence-safe answers on existing pages.”** No implementation has been performed. Keep the existing layout, navigation, typography, routes, crawl permissions, sitemap membership and demo/draft/preview safeguards.

### Bounded core change list

1. **`config/site.ts`:** make the owner-supplied LinkedIn and Instagram URLs available to the existing shared social list, preferably as explicit public defaults with valid optional overrides. Preserve optional GitHub behavior without inventing a URL. No Facebook entry. These profile URLs are public configuration, not credentials. Existing footer and Organization already consume this list; no separate link system is needed.
2. **`app/(marketing)/industries/education/page.tsx`:** add the existing canonical Organization `@id` to Service.provider. Preserve fictional-demo disclosures and scope language.
3. **`app/(marketing)/work/[slug]/page.tsx`:** add the same ID to CreativeWork.creator; do not add client identities, ratings or invented metrics.
4. **`app/(marketing)/insights/[slug]/page.tsx`:** add the same ID to Article.author/publisher. Preserve PentaForge byline and existing truthful dates; no invented personal author or modification timestamp.
5. **`data/products.ts`, jewellery entries only:** qualify the billing universal competitor claim and “verified modules” blanket; scope manufacturing shared-ledger claims; separate polishing two-pass evidence from unverified bench assignment and hardware integrations. Make immediate-availability questions explicit without asserting an unconfirmed release. Keep case-study links and availability/platform/pricing caveats.
6. **`app/(marketing)/locations/rajkot/page.tsx`:** replace “primary customer-acquisition market” with an approved service-availability answer. Qualify universal claims about ready-made software and blanket operational/transition promises. Retain the four genuine cases and local service intent.
7. **`data/industries.ts`, jewellery entry only:** qualify local-client-history implications in the FAQ unless the owner confirms them; preserve the existing distinction between potential capabilities and completed systems, including GST-related capability scope. No other-industry rewrite.
8. **Focused verification and implementation record:** add/update an appropriately named entity test (proposed `tests/seo-entity.test.ts`) and `docs/AEO-GEO-STEP-5B-IMPLEMENTATION.md` to check approved identities and rendered references. Content review should compare claims to evidence, not merely assert exact marketing strings.

### Explicit conditional additions, decided by facts

- **Ahmedabad base:** owner confirmation is required to retain or expand physical-base assertions. If only service areas are approved, the bounded correction set is `app/(marketing)/layout.tsx` (Organization.address), `app/(marketing)/company/page.tsx`, `app/(marketing)/contact/page.tsx`, and `components/layout/footer.tsx`, including affected metadata. Use service-area wording and retain `areaServed`; do not substitute an invented address. If the base is confirmed, do not change these files merely for activity.
- **Public email/phone:** add only if supplied and approved for publication. Leave absent otherwise; never derive them from guesses or private correspondence.
- **Availability/features:** if confirmation is unavailable, use conditional scoping language. Do not claim verified hardware, unlimited weighing passes, GST compliance, packaged release status or client location without evidence.

Worked examples, new screenshots, external profile edits, directory work and live AI baselines are later roadmap activities, **outside this small Step 5B code scope** unless separately commissioned. No new routes, llms files, schema spam, location organizations, AI-specific hidden content or robots permission changes.

### Step 5B acceptance checks

- Existing 43 public routes still resolve, canonicalize and remain in the sitemap exactly once; intentional demo/draft/preview protection unchanged.
- LinkedIn/Instagram visible links and Organization.sameAs agree exactly with approved URLs; shared ID remains `https://www.pentaforge.co.in/#organization`.
- Education/case/Article references resolve to that Organization without duplicate top-level entities; all JSON-LD parses and agrees with visible content.
- Review amended statements against the bounded evidence table; availability and locality answers are clear and truthful.
- Run lint, TypeScript, relevant tests and production build for that future implementation; inspect affected desktop/mobile pages for unchanged layout and working links.
- Prepare a reviewable local result and report deployment requirements. **Do not commit, push or deploy automatically.**

## 12. Verification limitations and audit completion

### What was actually verified in this audit

- Read current source, prior implementation records and screenshot provenance; inspected live HTML and public metadata on 43 marketing routes.
- Parsed live sitemap XML and compared its 43 unique official URLs with current public routes.
- Checked all 28 demo routes, three draft article URLs, an unknown 404, robots, experimental-file absence, sampled redirects, public social endpoints and Organization logo endpoint.
- Made 27 token-only synthetic crawler requests with expected content checks; no successful response was treated as a genuine provider crawl or AI answer.
- Re-ran `node --import tsx --test tests/sitemap.test.ts`: **4 tests passed, 0 failed**. This covers production origin fallback/rejection, preview environment protections, generated XML/public exclusions and preview metadata-route behavior.
- Consulted current official provider documentation linked inline. The llms.txt source is the proposal itself, not an official search-engine requirement.

### What remains NOT VERIFIED

- Real provider-IP requests, historical crawler activity, WAF/CDN dashboard rules, Vercel environment values, access-log traffic and deployment settings. A spoofed UA cannot verify these.
- Search Console/Bing indexing status, impressions, backlink inventory, Google AI eligibility in practice, and all actual consumer-AI answers/citations. The audit's HTTP success is not index coverage.
- A live preview deployment. Preview policy is verified from source and executed tests, not a supplied preview URL.
- Underlying application runtime correctness, native/desktop/mobile platform support, integrations, production deployment status per case, commercial terms, customer identities/locations, measured outcomes, awards or certifications.
- Physical office/base confirmation beyond current published statements, public contact details not supplied, official Facebook URL and full Instagram profile/post consistency.
- End-to-end contact-form delivery. No inquiry was submitted and nobody was contacted.
- Fresh visual re-review of all screenshot pixels. Existing screenshot documentation records the earlier privacy review; this audit reviewed its provenance and published descriptions rather than re-running the underlying application or asserting new client consent.

A failed/throttled external fetch was not classified as a website bot block. Instagram's research fetch throttled, while a separate direct response returned 200 with the expected profile title; only that limited observation is reported. No platform citation results were fabricated.

Lint, TypeScript and a new production build were **not run for this Markdown-only audit**; no runtime code changed. Historical implementation test/build results were not presented as fresh results. Targeted sitemap tests and live checks above are the verification executed for this task.

**Audit completed: YES**  
**Production changes: NONE**  
**Deployment: NOT DEPLOYED**

Only `docs/AEO-GEO-STEP-5A-AUDIT.md` was created. No recommendations implemented, no secrets changed, no messages sent to third parties, no commit, no push, and no deployment performed.
