# AGENTS.md — PrepPilot

> This file is read automatically by Antigravity (and any Claude session) before starting work in this repo.
> It is the single source of truth for how agents should behave here. Every team member's agent session reads
> the SAME copy of this file (it's committed to git) — that's what keeps 5 people vibe-coding in parallel from
> drifting into 5 different architectures.

## 0. Before you write any code

1. Read `memory-bank/projectbrief.md`, `memory-bank/productContext.md`, `memory-bank/systemPatterns.md`,
   and `memory-bank/techContext.md` — in that order.
2. Read `memory-bank/activeContext.md` to see what the last session was doing and what's next.
3. Check `memory-bank/progress.md` to see what's already built vs. still open.
4. Only then start the task.

At the **end of every session** (yours or a teammate's), update `activeContext.md` (what changed, what's next)
and `progress.md` (what now works, what's still broken). This is not optional — it is the only thing standing
between "5 people vibe-coding" and "5 incompatible codebases."

## 1. What this project is

PrepPilot — a hybrid AI + human-expert mock interview platform for interview preparation. Full detail in
`memory-bank/projectbrief.md`. One line: candidates book mock interviews either with a real expert (senior/
mentor/industry professional) or an AI interviewer, then get a structured feedback report either way.

("PrepPilot" is a placeholder name — rename freely, then find/replace it across these files.)

## 2. Tech stack (do not substitute without updating techContext.md)

- **Frontend:** Next.js (App Router, TypeScript), Tailwind CSS, shadcn/ui
- **Backend:** Python, FastAPI, Pydantic v2, SQLAlchemy 2.0 (async) + Alembic for migrations
- **Database:** Postgres via Supabase free tier
- **Auth:** Supabase Auth (email/password + Google OAuth)
- **AI:** Google Gemini API (free tier) as primary; Groq (free tier, Llama models) as fallback/fast path
- **Video calls:** Jitsi Meet embedded via `@jitsi/react-sdk` (free, no usage cap, no API key needed)
- **Realtime/notifications:** Supabase Realtime (Postgres changes) over building a custom WebSocket layer
- **Email:** Resend free tier
- **File storage:** Supabase Storage (resumes, avatars)
- **Deployment:** Frontend → Vercel (free tier). Backend → Render or Railway (free tier)

Full rationale, free-tier limits, and signup links are in `memory-bank/techContext.md`. Read it before
suggesting a different library "because it's more popular" — most alternatives here were picked specifically
because they have a workable *free* tier, which was a hard project constraint.

## 3. Repo structure

```
/frontend                # Next.js app
  /app                   # App Router pages
  /components
  /lib                   # API client, Supabase client, helpers
/backend                 # FastAPI app
  /app
    /api                 # routers, one file per resource (users, experts, bookings, sessions, ai)
    /services            # business logic, one file per domain area
    /models              # SQLAlchemy models
    /schemas             # Pydantic request/response schemas
    /core                # config, security, db session
  /alembic                # migrations
/memory-bank             # persistent project context (read section 0)
AGENTS.md                # this file
ROADMAP.md               # phased plan + module ownership
```

## 4. Conventions

- **Branches:** `<module>/<short-description>`, e.g. `booking/add-slot-locking`, `ai/resume-parser`.
- **Commits:** conventional commits (`feat:`, `fix:`, `chore:`, `docs:`) — keeps a messy vibe-coded history readable.
- **API responses:** always `{ "data": ..., "error": null }` or `{ "data": null, "error": { "message": ... } }`.
  Don't invent a different shape per endpoint.
- **Env vars:** never hardcode a key. Add every new one to `.env.example` in the relevant folder in the same
  commit that introduces it, with a one-line comment on where to get it.
- **Secrets:** never commit `.env`, service role keys, or Gemini/Groq keys. If you're about to write a key into
  a file that isn't `.env`, stop.
- **Migrations:** every model change goes through an Alembic migration — no manually editing the DB schema.

## 5. Rules for the agent specifically

- Don't silently swap a free-tier service for a paid one to "make it easier" — flag it and ask first. Budget is $0.
- Don't build features not listed as in-scope in `projectbrief.md` without checking with the team first — this
  is a capstone with a deadline, scope creep is the biggest risk.
- Prefer editing/extending existing services over creating a parallel implementation of the same thing.
- When two team members' agent sessions touch the same file, resolve conflicts by preferring whichever version
  matches `systemPatterns.md` — don't just pick the most recent edit.
- If a free API's rate limit or quota is hit, degrade gracefully (queue, retry, or fall back to the secondary
  provider listed in `techContext.md`) rather than blocking the whole feature.
