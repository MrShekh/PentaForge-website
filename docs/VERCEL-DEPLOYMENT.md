# Deploying both PentaForge applications to Vercel

Prepared 2 October 2026. This guide starts with no hosting accounts, database, bucket or purchased domain. The apps stay in separate repositories and separate Vercel projects. No cloud resources have been created and nothing has been deployed by this audit.

## What you need

| Service | Purpose | Suggested setup |
| --- | --- | --- |
| GitHub | Stores each app's source code | Two private repositories |
| Vercel | Runs the public website and private Control Center | Two Next.js projects, one per repository |
| Neon PostgreSQL | Stores accounts, leads, clients and business records | One production database for Control Center |
| Cloudflare R2 | Stores uploaded documents and company logos | One private production bucket |
| Domain name | Optional custom address | Start with the stable production `.vercel.app` addresses |

Vercel supplies project addresses, so a purchased domain is optional. Use the stable production address shown in **Project → Settings → Domains**, not a deployment-specific preview address. [Vercel domain documentation](https://vercel.com/docs/domains/working-with-domains)

Plan for hosting costs: Vercel Hobby is for personal, non-commercial use; these business apps should use a suitable paid plan. Review each provider's current prices and usage limits before enabling billing. R2 onboarding can require billing details. [Vercel fair use](https://vercel.com/docs/limits/fair-use-guidelines), [R2 getting started](https://developers.cloudflare.com/r2/get-started/)

Your computer's local database and local uploads are not copied to these services by deploying code. Start production with an empty database and a new administrator. If you need existing local business records, arrange a separate verified data-and-files migration before using production; do not upload the entire `.data` directory.

## 1. Prepare the repositories

The website already has Git metadata and uncommitted changes. Review and commit its intended source changes. Control Center currently has no Git metadata; create its own private repository. GitHub Desktop can publish each folder as a separate repository.

- Website folder: `new pentaforge website`
- Control Center folder: `pentaforge os`

Do not publish the parent `pf` folder as one combined app. Include `package-lock.json`, source, configuration, and Control Center's `prisma/migrations`. Exclude `.env*` except `.env.example`, `.data`, `.uploads`, `node_modules`, `.next`, logs and test outputs. The projects' ignore files already cover these local files. Before publishing, inspect the files staged for commit; ignore rules do not remove anything that was previously committed. If secrets ever entered a repository, rotate them.

## 2. Create the database

### Start fresh when you already have Neon

For a clean production start, create a new empty database in your existing Neon project:

1. Open Neon Console and select the intended project and production branch.
2. Under **Postgres database → Databases**, choose **Add database**.
3. Name it `pentaforge_os_production` (or another unused name), select its owner, and create it.
4. In the connection dialog, explicitly select this new database and obtain its pooled and direct connection strings.
5. Use these URLs for both the one-time setup file and the Vercel OS project. Apply the migrations and create only the administrator using step 5 below.

This gives the deployed OS no existing clients, projects, payments, expenses or leads. The administrator command adds the login, initial company settings and an audit entry. You can then enter your real data through the application. Existing local or Neon databases are preserved; creating a fresh production database does not delete them. [Neon database creation instructions](https://neon.com/docs/manage/databases)

`SEED_DEMO=false` prevents demo seeding but does **not** clear records already present. `prisma migrate deploy` applies schema migrations but does **not** clear existing business data either. Do not copy the old database into the new one or run the demo seed. A normal branch copied from an existing populated branch may contain its data, so select the newly created empty database explicitly.

If you specifically need to erase an existing database instead, first identify its exact project, branch and database and retain any required backup. Do not execute a generic reset against whichever connection happens to be in `.env`. On 3 October 2026, the OS configuration inspected locally still used `127.0.0.1:55432`; it did not identify a Neon database to erase.

If you do not already have Neon, create an account and a PostgreSQL project for production. Choose a region close to the Vercel function region you will use. In Neon's connection dialog, obtain the connection string for the production database in both pooled and direct forms. Keep the provider's TLS parameters intact.

- Pooled connection → Control Center `DATABASE_URL` (used by application queries).
- Direct connection to the **same database** → `DIRECT_URL` (used by Prisma migrations).

These URLs contain passwords: paste them only into private environment settings or the ignored setup file described below. Never put them in browser code, screenshots, chat, or Git. Neon documents both connection types in its [official connection guide](https://github.com/neondatabase/website/blob/main/content/docs/get-started/connect-neon.md).

Prisma now supports `DIRECT_URL` in this project. If it is blank, migrations use `DATABASE_URL`. Application connections have a five-connection limit per running instance; the provider pooler is still needed as Vercel scales across instances.

## 3. Create private file storage

In Cloudflare, enable R2 and create a bucket such as `pentaforge-production-files`. Keep public access disabled. Under R2 API Tokens, create credentials with **Object Read & Write**, restricted to this bucket. Save the **Access Key ID** and **Secret Access Key** in your password manager.

Record the bucket name and the S3 endpoint shown by Cloudflare. For an ordinary bucket it is `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`; jurisdiction-specific buckets need the endpoint shown for their jurisdiction. Set the region to `auto`. Use the S3 credentials, not a generic Cloudflare account API token. [Cloudflare's R2 authentication instructions](https://developers.cloudflare.com/r2/api/tokens/)

The app sends uploads through its authenticated server and reads private files through its API. Public bucket URLs and browser-to-bucket CORS settings are not needed for this flow. `STORAGE_DRIVER=local` is deliberately refused on Vercel because local uploads are not durable there.

## 4. Configure the Control Center Vercel project

In Vercel, import the Control Center repository. Choose a project name and note its stable production URL. Names below are examples only; use your actual assigned names.

| Vercel setting | Value |
| --- | --- |
| Framework Preset | Next.js |
| Root Directory | Repository root containing this app's `package.json` |
| Node.js Version | 24.x |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | Leave at Next.js default |

Do not omit development dependencies during installation: Prisma and TypeScript are required for the build. Control Center's build already runs `prisma generate` before `next build`. Database migrations are a separate explicit operation, not part of every preview build. [Prisma deployment guidance](https://www.prisma.io/docs/orm/v7/prisma-client/deployment/serverless/deploy-to-vercel)

Both apps pin Node 24.x in `package.json`, which Vercel supports. There is no need for a custom `vercel.json`, a persistent server process, or a custom `PORT` setting. [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)

Add these variables to the project's **Production** environment:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Hosted PostgreSQL pooled URL |
| `DIRECT_URL` | Direct URL to the same database; alternatively supply only to the migration environment |
| `BETTER_AUTH_URL` | `https://<control-project>.vercel.app` — exact production origin, no `/login` |
| `BETTER_AUTH_SECRET` | New random secret, at least 32 characters |
| `WEBSITE_LEAD_WEBHOOK_TOKEN` | A second, different random secret, 32–512 printable ASCII characters without spaces |
| `STORAGE_DRIVER` | `s3` |
| `S3_REGION` | `auto` |
| `S3_ENDPOINT` | The bucket's R2 S3 endpoint |
| `S3_BUCKET` | Your private bucket name |
| `S3_ACCESS_KEY_ID` | R2 Access Key ID |
| `S3_SECRET_ACCESS_KEY` | R2 Secret Access Key |
| `TRUSTED_IP_HEADER` | `x-vercel-forwarded-for` |
| `SEED_DEMO` | `false` |

Generate the two independent random secrets locally, running this command once per secret and saving each privately:

```powershell
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```

Do not reuse your local development tokens or admin password for production. Do not add `ADMIN_PASSWORD` to Vercel's normal runtime variables; it is only required by the one-time administrator command below. Never prefix server credentials with `NEXT_PUBLIC_`.

## 5. Initialize production tables and your administrator

This step writes to the hosted database. Perform it only after you have selected the intended production database. Do not run the local database helper or demo seed against production.

Inside `pentaforge os`, create a private file named `.env.production.setup` in your editor. This filename is ignored by Git and Vercel and is not automatically loaded by Next.js. Put the real values in it locally:

```dotenv
DATABASE_URL="<hosted pooled connection string>"
DIRECT_URL="<direct connection string for the SAME database>"
ADMIN_EMAIL="<your email address>"
ADMIN_PASSWORD="<new strong password, 12–128 characters>"
ADMIN_NAME="<your name>"
```

Use a fresh PowerShell terminal without previously exported production/test variables. Run each command separately, continuing only if the preceding command succeeds:

```powershell
Set-Location 'E:\Kaam\PentaForge\pf\pentaforge os'
npm ci
npm run db:generate
node --env-file=.env.production.setup node_modules/prisma/build/index.js migrate status
```

The status output must identify the expected **remote** database and host. A new database reports pending migrations; that is expected. If it identifies localhost, a different database, or a connection failure, stop and correct the setup file.

```powershell
node --env-file=.env.production.setup node_modules/prisma/build/index.js migrate deploy
node --env-file=.env.production.setup node_modules/prisma/build/index.js migrate status
node --env-file=.env.production.setup node_modules/tsx/dist/cli.mjs scripts/create-admin.ts
```

The first command applies all four existing migrations. The status command should report the database is up to date. The final command creates your administrator and initial company settings. It intentionally refuses to overwrite an existing account. Keep the password in your password manager and remove the setup file after successful setup. Do not run `db:seed` or `prisma migrate reset` on production.

Deploy or redeploy Control Center after its settings are saved. Open its exact production `/login` URL and sign in using the **new production credentials**. Your local user does not exist in the new hosted database. If Vercel built an initial deployment before setup finished, redeploy after configuration is complete.

## 6. Configure and deploy the public website

Import the website repository as a second Vercel project. Use the same Next.js/Node 24/`npm ci`/`npm run build` settings and the website repository root. Configure these **Production** variables:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://<website-project>.vercel.app`, the stable public production origin |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Your real public contact email |
| `NEXT_PUBLIC_CONTACT_PHONE` | Your real public contact number |
| `LEAD_WEBHOOK_URL` | `https://<control-project>.vercel.app/api/integrations/website/leads` |
| `LEAD_WEBHOOK_TOKEN` | Exactly the Control Center `WEBSITE_LEAD_WEBHOOK_TOKEN` value |
| `LEAD_WEBHOOK_VERCEL_BYPASS_SECRET` | Only needed if Vercel Deployment Protection covers the Control Center URL; see below |

Leave optional social and analytics values blank unless you use them. Set `NEXT_PUBLIC_VERCEL_ANALYTICS=true` only when enabling that integration. Configure **both** `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` if enabling Cloudflare Turnstile, and register the actual production website hostname. Turnstile is recommended for the public forms: their in-memory rate limit applies per server instance, not across all Vercel instances.

The website fails delivery visibly when the webhook is unconfigured or unavailable; it never saves inquiries to an email service or website database as a fallback. Set `NEXT_PUBLIC_SITE_URL` before the public build: blank intentionally produces noindex pages and omits canonical/sitemap URLs. Rebuild/redeploy after changing environment variables, especially `NEXT_PUBLIC_*` values embedded at build time.

### If Control Center has Vercel Deployment Protection

A valid application webhook token cannot pass Vercel's protection screen on its own. In the **Control Center** project's deployment protection settings, create a **Protection Bypass for Automation** secret. Copy it into the **website** project's server-only `LEAD_WEBHOOK_VERCEL_BYPASS_SECRET` variable and redeploy the website.

The website sends it as `x-vercel-protection-bypass`, together with the separate application bearer token. It does not expose either in the browser. Do not use the website project's own automatically provided `VERCEL_AUTOMATION_BYPASS_SECRET`: it belongs to the wrong destination. App login and webhook authentication remain required. [Vercel automation bypass documentation](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation)

## 7. Test the deployed apps before inviting customers

1. Open the website in a private browser window. Check navigation, mobile layout, contact details, `/robots.txt`, `/sitemap.xml`, and social share images.
2. Submit one clearly labeled test contact inquiry. It should show success and appear exactly once in Control Center's Leads page with the same details.
3. Submit one project planner inquiry. Check its selected platforms, features and description in Control Center.
4. Change a test lead to Won, review and confirm Convert to Client, then create a project. Check both links and saved client/business selections.
5. Log out. Private pages should return to login and `/api/leads` on Control Center should reject unauthenticated access. Log back in with your production administrator.
6. Upload a small permitted document, download it and remove the test document. Upload and view the company logo. Verify the files survive a redeploy; this confirms real R2 storage, not local temporary storage.
7. Export a small report as CSV, XLSX and PDF. Check an account with a restricted role if other team members will use the system.
8. Review Vercel runtime logs for errors, enable appropriate provider database backups, and set usage/billing alerts. A rollback of deployed code does not roll back database changes.

The app limits document uploads to 4 MiB. Keep this limit unless upload architecture changes; Vercel Functions impose a 4.5 MB request/response payload limit. Large report exports can also exceed that platform limit and would need a separate export/download design. [Vercel function limits](https://vercel.com/docs/functions/limitations)

Local automated tests cannot verify your eventual Vercel protection settings, hosted TLS connections, S3 credentials, production migrations or DNS. Those checks remain necessary after deployment.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Unable to sign in | Production tables migrated; administrator created in that same database; correct password; `BETTER_AUTH_URL` exactly matches the URL in the address bar; environment changes deployed |
| Login says invalid origin / 403 | Do not log in through a preview alias when `BETTER_AUTH_URL` names the production host |
| Local website and Control Center both appeared on 3000 | Both originally used Next's default port. Control Center's development command now explicitly uses 4000; website uses 3000. Production uses separate HTTPS hostnames, not local ports |
| Website form fails; Control Center receives nothing | Exact webhook path, matching tokens, deployed environment values, and any required destination Vercel bypass secret |
| Webhook returns HTML or Vercel login page | Deployment Protection is intercepting the request before the app; configure destination bypass |
| Database errors | Correct hosted URLs/TLS parameters, reachable provider, completed migrations; do not use `localhost:55432` on Vercel |
| Uploads fail | `STORAGE_DRIVER=s3`, correct bucket/endpoint/credentials and bucket access permissions; file type and 4 MiB limit |
| Website is noindex or sitemap is empty | Correct `NEXT_PUBLIC_SITE_URL` in Production, followed by a rebuild |

## Preview deployments and later domain changes

Keep production secrets scoped to Production. Before using previews, give Control Center previews their own database/branch and private bucket, and use a separate matching pair of webhook tokens for a paired website preview. Configure each preview's exact auth/webhook URLs. Do not give arbitrary previews production database access. Keep preview website `NEXT_PUBLIC_SITE_URL` blank so previews remain noindex.

When you buy a domain later, add each chosen hostname in the corresponding Vercel project, finish DNS verification, update Control Center `BETTER_AUTH_URL`, website `NEXT_PUBLIC_SITE_URL` and `LEAD_WEBHOOK_URL`, update Turnstile hostnames if used, and redeploy both apps. Repeat login, form delivery and upload checks.
