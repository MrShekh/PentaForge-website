# Website → Control Center leads

## Architecture and contract

The two applications retain separate package files, dependencies, builds, configuration and deployment. There are no runtime imports across projects.

Browser → website `/api/leads` → server-side validation and spam checks → `POST /api/integrations/website/leads` on Control Center → independent validation → PostgreSQL transaction → acceptance receipt → website success.

Control Center uses its existing Next.js App Router, Prisma/PostgreSQL, Better Auth, roles, record service, database counters, rate limiter, notifications and audit log. Website uses Next.js App Router and Zod, with no new database or delivery provider.

The machine endpoint accepts only POST and `Authorization: Bearer <secret>`. A token is not a human session and grants no other API permissions. No browser CORS access is enabled. Requests are streamed with a 16,000-byte maximum; every object is strict and internal fields are rejected. Name/business support Unicode. Control Center defaults to NEW, MEDIUM and unassigned.

```json
{
  "version": 1,
  "submissionId": "6fdb6d02-7dc8-49f4-b4ed-c269324716e1",
  "source": "WEBSITE_PROJECT_PLANNER",
  "submissionType": "PROJECT_PLANNER",
  "contact": {
    "name": "Test Owner",
    "businessName": "Test Workshop",
    "email": "test@example.com",
    "phone": "+91 9000000000"
  },
  "project": {
    "industry": "Jewellery",
    "projectType": "Business Software",
    "description": "We need to connect our orders and stock records.",
    "currentStage": "Using Excel",
    "platforms": ["Web"],
    "features": ["Orders", "Inventory"]
  }
}
```

Contact uses `WEBSITE_CONTACT` / `CONTACT` and omits planner-only fields. Future product inquiries use `WEBSITE_PRODUCT_INQUIRY` / `PRODUCT_INQUIRY`, the same contact object, and `product: { productSlug, productName, message }` instead of project. No product UI is added.

Successful insertion returns 201; an identical retry returns 200. Both return `{ ok: true, id, leadNumber, submissionId, duplicate }`. The website verifies a matching receipt, not just a 2xx status. A changed payload using an existing ID returns 409. Email/phone never deduplicate different submissions.

The website gets a server-generated UUID from GET `/api/leads`, retains it in the mounted form for unchanged retries, and issues another for changed content or “Start another request.” A page reload starts a new form; duplicate protection is not identity matching. Non-browser callers should retain `submissionId` across retries. Legacy callers omitting it receive a fresh server UUID per POST and do not have cross-request retry protection.

## Leads workspace

- `/leads`: actual pipeline totals, 20-row database pagination, search by lead/name/business/email/phone, status/priority/source/industry/assignment/received-date filters. Date filters use UTC calendar days.
- `/leads/[id]`: contact, project scope, safe call/email and international WhatsApp links, management, notes, follow-up, conversion and activity.
- Admin/Super Admin/Support can manage leads. Other authenticated roles can read, consistent with existing operational permissions. Project creation also requires the existing project and financial permissions.
- Follow-up entry uses the operator's browser timezone; storage is UTC. Detail timestamps are shown in Asia/Kolkata. Overdue/upcoming labels are displayed. There is no background reminder sender.
- The sidebar counts NEW leads on server refresh. Intake creates existing in-app notifications for active Admin/Super Admin/Support users. No external messages are sent.
- Detail shows the latest 100 notes and events, explicitly labeled at the limit; older history remains stored.
- Manual creation supports phone/referral/WhatsApp/etc. Sources are strings in storage for future extension; accepted intake sources/types are strict.

## Conversion

Saving WON does not create a client. “Convert to Client” opens prefilled editable name/business/email/phone/industry fields. “Confirm client creation” calls the existing `saveRecord` client and business logic inside one serializable transaction with a locked lead. Business name/industry belong to the existing Business model. Client code generation, validation, permissions and audit are reused. Repeated conversion returns the linked client. Lead history remains.

“Create Project” uses the existing RecordForm and record service, with client/business, project type, description, features and platforms prefilled. The operator supplies the project name and financial terms and confirms save. Repeated project creation returns the linked project. No project is created automatically.

## Database

Migration `202609240001_leads` adds Lead, LeadNote, LeadStatus and LeadPriority. Unique indexes protect leadNumber/submissionId; indexes cover status/date, priority/date, source/date, industry, assignment/follow-up, email/phone and conversion relations. Lead numbers use the existing atomic Counter with six-digit minimum padding. Foreign keys restrict deletion of related history.

ActivityLog gains a nullable actor and machine actorLabel; existing rows are unchanged. Website activity uses “PentaForge Website.” Human changes use real user IDs. Conversion and all lead writes append audit records transactionally. The existing immutable audit trigger is preserved.

## Local setup (PowerShell, separate terminals)

From `E:\Kaam\PentaForge\pf\pentaforge os`:

```powershell
npm ci
# If you do not already have local PostgreSQL configured:
node scripts/local-db.mjs
```

The helper initializes a loopback PostgreSQL on 55432 and creates an ignored .env only when none exists. It does not overwrite an existing configuration. Leave it running. Configure Control Center `.env` with a local DATABASE_URL, BETTER_AUTH_SECRET, `BETTER_AUTH_URL=http://localhost:4000`, and WEBSITE_LEAD_WEBHOOK_TOKEN. Generate a shared token locally with `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`; store it privately, never commit it.

In a second Control Center terminal:

```powershell
npm run db:generate
npm run db:migrate
# First setup only, after configuring ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME:
npm run db:admin
npm run dev -- --port 4000
```

From `E:\Kaam\PentaForge\pf\new pentaforge website`, set `.env.local`:

```dotenv
LEAD_WEBHOOK_URL=http://localhost:4000/api/integrations/website/leads
LEAD_WEBHOOK_TOKEN=<same privately generated token>
```

```powershell
npm ci
npm run dev -- --port 3000
```

For the supplied sibling folders, `node scripts/setup-website-local.mjs` from Control Center configures both ignored local environment files with matching private tokens and the ports above. It preserves database/login credentials and refuses remote URLs or conflicting higher-precedence environment files. It does not run migrations, seed data, or deploy anything.

The local PostgreSQL helper now creates UTF-8 databases and uses graceful `pg_ctl` startup/shutdown on Windows. A legacy WIN1252 local database can be copied with `node scripts/upgrade-local-encoding.mjs` while both apps are stopped. This loopback-only helper applies the existing migrations to a new database, copies data, checks every data table's row counts and encoding-independent checksums, then switches local configuration. It retains the original database and a private snapshot under `.data`; it refuses to overwrite a target containing data. No production database should use this helper.

Use `localhost` consistently for Control Center so the Origin matches BETTER_AUTH_URL. Loopback HTTP delivery is allowed only outside production. Both apps require tokens at least 32 characters long. Production always requires HTTPS.

Open website `/contact`, submit test-only details, and check Control Center `/leads` after signing in. Repeat through the project planner. Set a follow-up, add a note, mark Won, review conversion fields, confirm, then optionally create a project. Do not run demo seeds on existing customer data.

## Verification commands

Each app: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

Control Center: `node scripts/test-leads.mjs` starts isolated UTF-8 PostgreSQL on 55439, applies all migrations and runs real database tests for international names, concurrent intake/numbering, conflicting retries, defaults, audit/notifications, conversion, permissions, projects, notes, search and shared rate limiting. It never uses the configured application database. Test data stays under ignored `.data/leads-test-*`; PostgreSQL stops at completion. Port 55439 must be free.

For real browser verification, run `node scripts/test-leads.mjs --browser`. It also needs the website dependencies and Playwright Chromium. It starts test apps on 3001/4001 with ephemeral tokens, exercises both forms and conversion, saves synthetic-data screenshots under `.data/qa-leads`, and stops its servers. It does not change either app’s saved environment.

The browser run also checks every Control Center API route family over HTTP, including machine-token isolation, malformed payloads, internal fields, duplicate receipts, read-only/disabled users, report exports and invalid license validation. The result is saved to `.data/qa-leads/endpoints.json`. Website route/link/image checks are saved separately to the website's `test-results/routes.json`. These are smoke/security checks, not exhaustive business-rule tests for all pre-existing modules.

Website `npm run verify:routes` skips valid lead creation by default. For an isolated test environment, use `TEST_LEAD_DELIVERY=accepted` to test configured delivery, or `unconfigured` to expect 503. The browser runner sets this automatically. Do not opt into valid submissions against customer data just to crawl pages.

## Production configuration after deployment

1. Deploy the applications independently using their own roots and existing build settings.
2. Control Center: configure DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL for its final HTTPS host and existing storage settings. Set WEBSITE_LEAD_WEBHOOK_TOKEN to a secure random secret (32–512 printable non-space characters).
3. Back up the database, then apply the committed migrations with `npm run db:migrate` in the deployment migration step, before directing traffic to the new app. Do not use db push or a demo seed.
4. Website: set LEAD_WEBHOOK_URL to the exact Control Center integration URL and LEAD_WEBHOOK_TOKEN to the same secret. No NEXT_PUBLIC secret variable is used. Keep canonical domain, analytics and optional Turnstile keys configured as before. Restart/redeploy after server environment changes.
5. Hosting access protection must permit server-to-server requests to this specific endpoint while its bearer authentication remains active. A host-level login page will fail receipt verification.
6. Retain public website WAF/edge rate limiting and preferably Turnstile. Its existing instance-local limiter alone is not sufficient across serverless instances. Control Center uses shared PostgreSQL limits (120 authenticated requests/minute, including retries); apply edge limits for unauthenticated abuse. Schedule deletion of expired ApiRateLimit buckets through your existing database maintenance job as appropriate.
7. Test a real inquiry, verify it in Leads, retry with the same submission ID, and check that no duplicate appears. Verify unprivileged users cannot mutate leads and token-only requests cannot read internal APIs.

Nothing is deployed, no DNS/domains changed, and no production environment variables or database records are changed by this implementation.

## Troubleshooting

| Result | Meaning / action |
| --- | --- |
| 401 | Missing/mismatched/short token. Check both server environments privately. |
| 400 | Invalid JSON/version/source/type/field or internal-field injection. Compare the contract. |
| 409 | A submission ID was reused with changed content. Retry original content, or use a new ID for an intentional new inquiry. Identical retries return 200. |
| 413 | Body exceeds 16 KB. |
| 429 | Rate limit exceeded; wait for the next window. |
| 503 from Control Center | Database/storage transaction unavailable, or migration missing. Check database health and migration status. |
| 503 from website | Webhook URL/token unconfigured or invalid. |
| Website 502 | Rejection, network failure, invalid receipt or 10-second delivery timeout. The form retains the summary and submission ID for retry. |

Delivery logs contain timestamp, submission/request ID, destination status and category only. They do not contain tokens, headers, contact data or inquiry descriptions. A timeout can occur after commit: retrying the same payload/ID safely retrieves the original acceptance receipt.
