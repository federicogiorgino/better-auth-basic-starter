# App Starter

Deploy-ready Next.js starter with **Better Auth** (email/password) and **Drizzle ORM** on PostgreSQL (Neon).

Stack: Next.js 16 · React 19 · Better Auth · Drizzle · Neon · TanStack Query · shadcn/ui · Tailwind · Biome

---

## Use this as a template

### Option A — GitHub template (recommended)

Publish once, then spin up apps from the GitHub UI or CLI.

```bash
# 1. Push this repo (or create a fresh remote)
git remote set-url origin https://github.com/<you>/app-starter.git
git push -u origin HEAD:main

# 2. Mark it as a template
gh repo edit <you>/app-starter --template

# 3. Scaffold a new app whenever you need one
gh repo create my-new-app --template <you>/app-starter --clone --private
cd my-new-app
```

Or: GitHub → your repo → **Use this template** → **Create a new repository**.

### Option B — Clone without git history

```bash
npx degit <you>/app-starter my-new-app
cd my-new-app
git init
git add .
git commit -m "chore: scaffold from app-starter"
```

### After scaffolding

1. Rename the package in `package.json` (`"name": "my-new-app"`).
2. Update `appName` in `lib/auth.ts` and metadata in `app/layout.tsx`.
3. Follow **Local setup** below.

---

## Local setup

### Prerequisites

- Node 20+
- [pnpm](https://pnpm.io)
- A free [Neon](https://neon.tech) account

### Install & env

```bash
pnpm install
cp .env.example .env
```

Fill in `.env` (see **Neon + Drizzle** below for `DATABASE_URL`):

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Neon Postgres connection string |
| `BETTER_AUTH_SECRET` | Min 32 chars — `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | App base URL (`http://localhost:3000` locally) |

### Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Unauthenticated users are sent to `/login`.

Demo auth pages (`/login`, `/register`) use hardcoded stub credentials in the client buttons — replace with real forms when you build your UI.

---

## Neon + Drizzle

This starter talks to Postgres through Neon's serverless HTTP driver:

- Runtime client: `drizzle/db.ts` → `@neondatabase/serverless` + `drizzle-orm/neon-http`
- Kit config: `drizzle.config.ts` → reads `DATABASE_URL`, schema at `drizzle/schema.ts`
- Auth tables: `drizzle/schemas/auth.ts` (re-exported from `drizzle/schema.ts`)

### 1. Create a Neon project

1. Go to [console.neon.tech](https://console.neon.tech) → **New Project**.
2. Pick a name, region (closest to you / your Vercel region), and Postgres version.
3. Create the project.

### 2. Copy the connection string

In the Neon dashboard → your project → **Connect**:

1. Select the `neondb` database (or the one you created).
2. Role: default is fine for local.
3. Copy the connection string.

Neon shows two URLs — use them like this:

| URL type | When to use |
| --- | --- |
| **Pooled** (has `-pooler` in the host) | App runtime (`pnpm dev` / Vercel). Matches this starter's HTTP driver. |
| **Direct** (no `-pooler`) | Prefer for `drizzle-kit` (`db:push`, `db:migrate`, `db:studio`) if pooled ever misbehaves. |

For this starter, **one pooled `DATABASE_URL` is usually enough** for both the app and Drizzle Kit.

Example shape:

```env
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-xxxx-xxxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

Paste it into `.env` as `DATABASE_URL`. Do not commit `.env`.

### 3. Push the schema

Auth tables (`user`, `session`, `account`, `verification`) live in `drizzle/schemas/auth.ts` but are **not** applied until you sync them:

```bash
# Fast path — apply schema directly (recommended while scaffolding)
pnpm db:push
```

You should see Drizzle create the Better Auth tables. Verify with:

```bash
pnpm db:studio
```

Opens a browser UI against your Neon DB.

### 4. Migrations (optional, better for production)

When you want versioned SQL instead of push:

```bash
pnpm db:generate   # writes SQL under drizzle/migrations/
pnpm db:migrate    # applies pending migrations to DATABASE_URL
```

Commit the generated `drizzle/migrations/` folder so deploys stay reproducible.

**Rule of thumb:** `db:push` while iterating locally; switch to generate + migrate before / once you share a production DB.

### 5. Adding your own tables

1. Add a file under `drizzle/schemas/` (e.g. `drizzle/schemas/posts.ts`).
2. Re-export it from `drizzle/schema.ts`:

   ```ts
   export * from "./schemas/auth";
   export * from "./schemas/posts";
   ```

3. Sync:

   ```bash
   pnpm db:push
   # or: pnpm db:generate && pnpm db:migrate
   ```

4. Import `db` from `@/drizzle/db` and query with the Drizzle API.

### 6. Better Auth schema changes

If you add Better Auth plugins that need new columns/tables:

```bash
npx @better-auth/cli@latest generate
```

Merge the output into `drizzle/schemas/auth.ts`, then `pnpm db:push` (or generate + migrate).

---

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm db:push` | Push Drizzle schema to DB |
| `pnpm db:generate` | Generate migrations |
| `pnpm db:migrate` | Run migrations |
| `pnpm db:studio` | Drizzle Studio |
| `pnpm biome:check` | Lint/format check |
| `pnpm biome:fix` | Auto-fix with Biome |

---

## Project layout

```
app/
  (auth)/login|register   # Auth pages (stub UI)
  (main)/                 # Protected home
  api/auth/[...all]/     # Better Auth handler
drizzle/
  db.ts                   # Neon + Drizzle client
  schema.ts               # Schema barrel
  schemas/auth.ts         # Better Auth tables
lib/
  auth.ts                 # Better Auth server
  auth-client.ts          # Better Auth client
  get-server-session.ts   # Cached server session helper
```

---

## Deploy (Vercel + Neon)

1. In Neon, create a project (or a separate **production** branch). Copy the **pooled** connection string.
2. Import the repo in [Vercel](https://vercel.com). Prefer the same region as Neon.
3. Set Vercel env vars (Production + Preview as needed):

   | Variable | Value |
   | --- | --- |
   | `DATABASE_URL` | Neon pooled URL |
   | `BETTER_AUTH_SECRET` | New secret — `openssl rand -base64 32` |
   | `BETTER_AUTH_URL` | Production URL, e.g. `https://my-app.vercel.app` |

4. Apply schema to production **before** (or right after) the first deploy:

   ```bash
   # one-off from your machine
   DATABASE_URL="<neon-prod-pooled-or-direct-url>" pnpm db:push

   # or, if you committed migrations:
   DATABASE_URL="<neon-prod-url>" pnpm db:migrate
   ```

5. Deploy on Vercel, then check `GET /api/auth/ok` → `{ "status": "ok" }`.

**Neon tip:** use [database branches](https://neon.tech/docs/guides/branching) for preview envs — point Vercel Preview `DATABASE_URL` at a branch connection string so prod data stays untouched.

---

## Extending auth

- Social providers: add to `lib/auth.ts` under `socialProviders` and set the matching env vars (see [Better Auth docs](https://www.better-auth.com/docs)).
- Schema updates: see **Neon + Drizzle → Better Auth schema changes**.
