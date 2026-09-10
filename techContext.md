# Tech Context — PrepArena

## Frontend
- **Next.js** (App Router) + TypeScript
- **Tailwind CSS** + **shadcn/ui** for components — fast to vibe-code, looks intentional out of the box
- **@supabase/supabase-js** for auth session + realtime subscriptions
- **@jitsi/react-sdk** for embedding video calls

## Backend
- **FastAPI** — Python 3.11+
- **SQLAlchemy 2.0** (async engine, `asyncpg` driver) + **Alembic** for migrations
- **Pydantic v2** for schemas
- **httpx** (async) for calling Gemini/Groq/Resend APIs

## Database, Auth, Storage — Supabase (free tier)
- One project gives Postgres + Auth + Storage + Realtime, which avoids stitching together 3 separate free
  tiers with different quirks.
- Sign up: https://supabase.com — free tier includes 500MB DB, 1GB storage, 50k monthly active users (auth).
- **Gotcha:** free Supabase projects pause after ~1 week of inactivity. Fine for active development; if the
  project goes quiet before the demo, ping it a day early to wake it up.
- Use the Postgres connection string directly with SQLAlchemy (don't route ORM queries through the Supabase
  client — use it only for auth/storage/realtime from the frontend, and for auth token verification on the
  backend).

## AI — Google Gemini (primary) + Groq (fallback)
- **Gemini API free tier:** https://ai.google.dev — generous free quota, good at both structured JSON output
  (question generation, resume parsing) and conversational follow-ups. Use `gemini-2.0-flash` or newer for
  speed/cost; check current available free-tier models at the link above, since Google updates the lineup.
- **Groq free tier:** https://console.groq.com — very fast inference on open models (Llama, etc.), useful as
  a fallback if Gemini rate-limits mid-demo, or for latency-sensitive follow-up generation.
- **Gotcha:** free-tier LLM APIs have per-minute request caps. Design the AI interview flow to make one call
  per candidate answer, not multiple — batch "generate follow-up + score this answer" into a single prompt
  with structured JSON output rather than two separate calls.

## Video — Jitsi Meet
- https://jitsi.org — free, open source, no API key required for the public `meet.jit.si` server, no time caps.
- Backend generates a unique room name (e.g. `preparena-<booking_id>`) and stores it on the booking; frontend
  embeds that room via `@jitsi/react-sdk`.
- **Gotcha:** the public server is fine for a capstone demo but is shared infra — for anything beyond a demo,
  self-hosting Jitsi (still free, just needs a server) removes reliance on public server uptime.

## Email — Resend (primary) / Gmail SMTP (fallback)
- **Resend free tier:** https://resend.com — 100 emails/day free, clean API, good deliverability.
- **Fallback:** Gmail SMTP with an App Password if Resend signup/verification becomes a blocker — zero cost,
  slightly worse deliverability, no separate account needed if the team already has a Gmail address.

## Deployment
- **Frontend:** Vercel free tier — zero-config Next.js deploys, generous for a student project's traffic.
- **Backend:** Render or Railway free tier.
  - **Gotcha:** both free tiers spin down the backend after inactivity, causing a ~30-60s cold start on the
    first request. Mention this during the live demo (hit the backend once before presenting) rather than
    being surprised by it.

## Environment variables (add to `.env.example` as they're introduced)
```
# frontend/.env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_BASE_URL=

# backend/.env
DATABASE_URL=              # Supabase Postgres connection string
SUPABASE_JWT_SECRET=       # to verify frontend auth tokens
GEMINI_API_KEY=
GROQ_API_KEY=
RESEND_API_KEY=
```

## Free-tier limits worth planning around
- Supabase: 500MB DB — fine for MVP scale, but don't store full session transcripts as raw text forever;
  consider truncating or summarizing old AI-session transcripts.
- Gemini/Groq: per-minute rate caps — see AI gotcha above.
- Resend: 100 emails/day — fine for a demo, would need a paid tier at real scale (not a capstone concern).
