# ServiceFlow

ServiceFlow is a responsive operations dashboard for visa and travel agencies. It provides two clear workspaces:

- **Worker Workspace** for day-to-day execution (leads, cases, and personal queue).
- **Owner Workspace** for business oversight (revenue, staff performance, and reporting).

The app is built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**, and ships with rich mock data for demo workflows.

## Core Features

### Workspace-aware shell
- Persistent top shell with:
  - Workspace badge (**Worker Workspace** / **Owner Workspace**)
  - Page title + short description
  - User identity area
- Sidebar with a stronger active state:
  - brighter text
  - stronger border/background
  - clear selected-page emphasis

### Workspace switcher (demo-friendly)
- A visible **Worker / Owner** switcher is available in the header.
- Switching workspaces keeps routing behavior consistent by mapping equivalent pages where possible:
  - `/dashboard` ↔ `/owner-dashboard`
  - shared routes like `/leads`, `/cases`, `/settings` stay on the same route
  - owner-only pages fall back to `/dashboard` when switching to worker

### Distinct owner pages
- **Revenue (`/revenue`)** includes revenue-focused totals and collections views.
- **Staff Performance (`/staff-performance`)** includes team KPIs and staff ranking tables.
- **Reports (`/reports`)** is a true report hub with report section links and previews.

### Corrected route map
The primary app routes are:

- `/dashboard`
- `/owner-dashboard`
- `/revenue`
- `/leads`
- `/cases`
- `/staff-performance`
- `/reports`
- `/settings`

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**

## Project Structure

```text
src/
  app/
    (app)/
      dashboard/
      owner-dashboard/
      revenue/
      leads/
      cases/
      staff-performance/
      reports/
      settings/
    (auth)/
      login/
  components/
    app-shell.tsx
    ui.tsx
  lib/
    navigation.ts
    mock-data.ts
    auth.ts
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run in development

```bash
npm run dev
```

Open `http://localhost:3000`.

### 3) Build for production

```bash
npm run build
```

### 4) Run production server

```bash
npm start
```

## Demo identity / environment variables

The app includes demo defaults in `src/lib/auth.ts` and can read:

- `NEXT_PUBLIC_DEMO_USER_ID`
- `NEXT_PUBLIC_DEMO_USER_NAME`
- `NEXT_PUBLIC_DEMO_USER_ROLE`
- `NEXT_PUBLIC_DEMO_ORG_ID`

If these are not set, the app uses built-in demo values.

## UX Notes

- Navigation clarity was intentionally improved without changing the overall visual theme.
- Revenue, Staff Performance, and Reports now render unique content and purpose-specific KPIs.
- Navigation item keys are stable IDs (not duplicated hrefs), preventing duplicate key warnings.

## Quality Checks

Run the following before shipping:

```bash
npm run lint
npm run build
```

## License

Internal/demo project. Add your own license policy before public distribution.
