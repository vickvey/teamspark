# Copilot / AI agent instructions for teamspark

Short, actionable guidance to help an AI code assistant be productive in this repo.

- Model preference: Enable GPT-5 mini for all clients — prefer `gpt-5-mini` for reasoning and code edits. If unavailable, fall back to the highest-capability model available.

- Big picture

  - This is a Next.js (app router) TypeScript project (Next 16, React 19) using the `app/` directory. Routes and server APIs live under `src/app` (see `src/app/api/*`).
  - UI primitives live under `src/components/ui` and larger features under `src/components/dashboard/*` and `src/components/landing/*`.
  - Server-only helpers belong in `src/lib/server/*` (see `src/lib/server/emotion-service.ts`) and general utilities live in `src/lib`.

- Key patterns and examples

  - Server vs client: prefer server components for data fetching. Server-only helpers use `"use server"` (example: `src/lib/server/emotion-service.ts`).
  - API routes: add or update routes under `src/app/api/*` (example: `src/app/api/mood-analyzer/route.ts`). Return JSON responses.
  - Styling: Tailwind CSS (globals in `src/app/globals.css`) + `cn` helper in `src/lib/utils.ts` for class merging.
  - State & persistence: supabase is included in deps (`@supabase/supabase-js`) and a Zustand store pattern is used (`src/lib/store/useSessionStore.ts`).

- Integrations & secrets

  - Hugging Face is used for emotion detection (`src/lib/server/emotion-service.ts`) and requires `HUGGING_FACE_API_KEY` in env. Do not commit secrets.
  - Check `package.json` for other deps (Supabase, sonner toaster, framer-motion).

- Developer workflows (explicit)

  - Preferred package manager: pnpm (workspace present). Common scripts (root):
    - dev: `pnpm dev` (or `npm run dev`)
    - build: `pnpm build`
    - start: `pnpm start`
    - lint: `pnpm lint`
  - Use the Next dev server to debug server components and API routes (http://localhost:3000).

- Conventions & do/don't

  - Keep secret keys in environment variables. Look for `process.env.*` usages (e.g., HUGGING_FACE_API_KEY).
  - Reuse UI primitives under `src/components/ui` rather than creating one-off styles.
  - Prefer small, focused PRs that change one feature area (e.g., dashboard, landing, api).

- Where to look for examples
  - Root layout and global wiring: `src/app/layout.tsx`
  - Server helper example: `src/lib/server/emotion-service.ts`
  - Client/dashboard example: `src/app/(dashboard)/child/page.tsx` and `src/components/dashboard/child/*`

If anything here is unclear or you want additional sections (tests, CI, or code style rules), tell me which area to expand and I'll iterate.
