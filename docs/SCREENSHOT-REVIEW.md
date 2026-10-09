# Screenshot review

Reviewed all 22 supplied screenshots individually. Four distinct groups show built jewellery systems. All are desktop-sized application captures (roughly 1900×930); none establishes a native mobile app, a desktop installer or a verified underlying technology stack. Authentication settings are present in one capture, but there is no dedicated login capture.

The original folders had no existing code references. They were moved intact from `public/` into ignored `.private/screenshots/` because leaving unused raw images in `public/` would still expose them by URL. Git and Vercel ignore the private folder. No original was deleted. Published copies use irreversible opaque pixel masks, not CSS hiding or blur. WebP metadata is stripped; dimensions and UI aspect ratios are preserved.

Paths in the Source column are relative to `.private/screenshots/`. Published paths are relative to `public/`.

| Source | Published path / disposition |
| --- | --- |
| `Manufacturing ERP/dashboard.png` | `projects/jewellery-manufacturing/dashboard.webp` — manufacturing case cover |
| `Manufacturing ERP/casting balance.png` | `projects/jewellery-manufacturing/casting.webp` |
| `Manufacturing ERP/gold recovery.png` | `projects/jewellery-manufacturing/recovery.webp` |
| `Manufacturing ERP/purity configuration.png` | `projects/jewellery-manufacturing/purity.webp` |
| `Manufacturing ERP/report.png` | `projects/jewellery-manufacturing/reports.webp` |
| `Manufacturing ERP/customer.png` | Unused: personal customer/company/phone details; not needed to establish the workflow |
| `Jewellery ERP/dashboard.png` | `projects/jewellery-operations/dashboard.webp` — operations case cover |
| `Jewellery ERP/admin stock.png` | `projects/jewellery-operations/stock.webp` |
| `Jewellery ERP/order registery.png` | `projects/jewellery-operations/production-register.webp` |
| `Jewellery ERP/analytics.png` | `projects/jewellery-operations/analytics.webp` |
| `Jewellery ERP/customers.png` | Unused: multiple customer names and phone numbers |
| `Jewellery ERP/orders.png` | Unused: detailed order identifiers and jewellery designs; registry gives sufficient evidence |
| `Jewellery ERP/bills.png` | Unused: empty register adds little beside the dedicated billing project |
| `polishing software/dashboard.png` | `projects/jewellery-polishing/dashboard.webp` — polishing case cover |
| `polishing software/order registery.png` | `projects/jewellery-polishing/order-registry.webp` |
| `polishing software/customer.png` | `projects/jewellery-polishing/customer-history.webp` |
| `polishing software/settings.png` | Unused: account/authentication settings are unnecessary for public proof |
| `Billing Software/bill creating .png` | `projects/jewellery-billing/create-bill.webp` — billing case cover |
| `Billing Software/dashboard.png` | `projects/jewellery-billing/dashboard.webp` |
| `Billing Software/bill.png` | `projects/jewellery-billing/bills.webp` |
| `Billing Software/advance stock.png` | `projects/jewellery-billing/advance-stock.webp` |
| `Billing Software/customer.png` | Unused: customer contact/address fields; redundant for the selected presentation |

## Privacy treatment by project

- **Manufacturing:** concealed company/operator identity, transaction references, customer/karigar names, balances, populated batch values and browser hover URLs. Kept navigation, labels, purity configuration, empty-state structure and non-sensitive system categories.
- **Operations:** concealed account identity, stock/balance totals, production identifiers, weight values and design thumbnails. Generic item descriptions and karat categories remain visible. The source stock/register captures end at the viewport boundary; no unseen rows were invented.
- **Polishing:** concealed account identity, customer names, order identifiers, dates and transaction/settlement values. The registry’s rightmost columns are outside the original capture; the website preserves the supplied framing. Fine/touch descriptions are limited to the documented workflow and visible labels.
- **Billing:** concealed account email, populated invoice/customer row values, identifying bill header values, nonzero dues and hover URL. Empty zero-state metrics remain visible. The product label in the interface is software branding, not a claimed client identity or commercial release.

All 16 derivatives were visually reviewed. The image descriptions explicitly disclose concealed private values. No credentials are published.

## Owner review and useful future additions

Confirm permission to publicly show these interfaces and any domain-specific settings or generic item labels still visible. No client is named on the website. Prefer fresh, deliberately anonymised captures when convenient; that would allow removing large masks without exposing live business data. A wider/full registry capture would improve the polishing story. Add genuine mobile captures only if available. Confirm actual platforms, technology stacks and measured outcomes before publishing those claims.

Total published derivative size: **800,338 bytes across 16 lossless WebP files**. Private originals are not required for production deployment; retain a separate secure backup if needed.
