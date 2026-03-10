# ServiceFlow

ServiceFlow is an operations-first CRM for **visa agencies** and **travel agencies**.

It is designed for two daily-use personas:
- **Workers (staff)**: execution-focused workflow (follow-ups, documents, submissions, ticketing, payment collection)
- **Owners/Managers**: business intelligence and oversight (pipeline health, revenue, performance, risk)

The application uses a dark SaaS dashboard UI with role-aware navigation and workflow pages for leads, cases, documents, invoices, payments, and reporting.

---

## Product Scope

ServiceFlow currently includes:

- Role-aware workspace split:
  - `staff` → `/dashboard`
  - `owner` / `manager` → `/owner-dashboard`
- Visa/travel domain mock workflows:
  - Dubai/Schengen/Turkey visa operations
  - Travel insurance, flight booking, hotel booking, tour package flows
- Case workflow board (drag-and-drop)
- Case detail page with:
  - client identity context
  - travel/embassy details
  - document checklist
  - timeline
  - notes + invoice/payment summary
- Leads and reports pages adapted for agency use
- Supabase SQL migration with org-scoped schema + RLS policies (foundation)

> Note: Current UI is driven by structured mock data in `src/lib/mock-data.ts` while backend integration patterns are scaffolded.

---

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Supabase SQL migration** for schema + RLS bootstrap

---

## Project Structure

```txt
src/
  app/
    (app)/
      dashboard/
      owner-dashboard/
      leads/
      cases/
      clients/
      services/
      invoices/
      payments/
      reports/
      tasks/
      settings/
    (auth)/login/
    actions.ts
    globals.css
    layout.tsx
    page.tsx
  components/
    app-shell.tsx
    case-workflow-board.tsx
    ui.tsx
  lib/
    auth.ts
    permissions.ts
    mock-data.ts
    database.types.ts
supabase/
  migrations/
    202603100001_serviceflow_schema.sql
```

---

## Roles & Routing Behavior

Role behavior is currently resolved via `getCurrentUser()` (demo shim) and used for route redirects/layout behavior:

- **staff**
  - lands on `/dashboard`
  - sees worker navigation and worker KPI/work queue priorities
- **manager** and **owner**
  - land on `/owner-dashboard`
  - see owner-focused KPI and analytics workspace

Demo role can be changed using environment variables (see below).

---

## Core Pages

- `/login` – auth entry page (UI shell)
- `/dashboard` – worker execution board
- `/owner-dashboard` – owner/manager analytics board
- `/leads` – visa/travel lead intake pipeline
- `/cases` – case board + case list
- `/cases/[id]` – detailed visa/travel case view
- `/reports` – agency reporting tables
- `/services` – service catalog
- `/clients`, `/invoices`, `/payments`, `/tasks`, `/settings` – scaffold pages in current build

---

## Local Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

Open: http://localhost:3000

### 3) Build for production

```bash
npm run build
```

---

## Environment Variables (Demo Mode)

Create a `.env.local` file (optional but recommended):

```bash
NEXT_PUBLIC_DEMO_USER_ID=00000000-0000-0000-0000-000000000001
NEXT_PUBLIC_DEMO_USER_NAME=Sarah Khan
NEXT_PUBLIC_DEMO_USER_ROLE=staff
NEXT_PUBLIC_DEMO_ORG_ID=00000000-0000-0000-0000-000000000111
```

Switch role quickly:
- `NEXT_PUBLIC_DEMO_USER_ROLE=staff` → worker dashboard
- `NEXT_PUBLIC_DEMO_USER_ROLE=manager` or `owner` → owner dashboard

---

## Database (Supabase)

A starter migration exists at:

- `supabase/migrations/202603100001_serviceflow_schema.sql`

It includes:
- core enums and tables
- organization scoping
- profile roles (`owner`, `manager`, `staff`)
- helper SQL functions (`current_organization_id`, `current_user_role`, etc.)
- row-level security policy scaffolding

### Apply migration

Use your preferred Supabase workflow (local or hosted) to apply the SQL migration to your project.

---

## NPM Scripts

- `npm run dev` – start local development server
- `npm run build` – production build (required quality gate)
- `npm run start` – serve built app
- `npm run lint` – lint checks

---

## Current Implementation Notes

This repository is currently a **high-fidelity product scaffold** with realistic visa/travel agency UI workflows and mock operational data.

What’s in place:
- role-aware workspace UX
- visa/travel status badges and domain data
- case board interactions and case timelines
- report and lead tables adapted to agency workflows

What is intentionally pending for full production rollout:
- replacing mock data with live Supabase reads/writes
- wiring real Supabase Auth sessions
- full CRUD server actions for all entities
- storage-backed document upload pipeline
- automated tests and CI hardening

---

## Deployment

You can deploy this app on Vercel (or another Node-compatible host) after configuring:

1. Runtime env vars
2. Supabase project + database migration
3. Auth/session integration
4. (Optional) storage buckets for document files

---

## Contributing

If you are continuing development, recommended next priorities:

1. Replace `mock-data.ts` reads with typed Supabase queries
2. Add create/update server actions for leads, cases, notes, invoices, payments
3. Add seed scripts for visa/travel reference data
4. Add E2E coverage for worker and owner critical workflows

