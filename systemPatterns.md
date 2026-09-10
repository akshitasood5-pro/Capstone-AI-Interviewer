# System Patterns — PrepArena

## High-level architecture

```
                         ┌───────────────────────┐
                         │   Next.js frontend     │
                         │  (Vercel, TypeScript)  │
                         └──────────┬─────────────┘
                                    │ REST (fetch) + Supabase client (auth, realtime, storage)
                                    ▼
                         ┌───────────────────────┐
                         │   FastAPI backend      │
                         │  (Render/Railway)      │
                         │  routers → services →  │
                         │  models (SQLAlchemy)   │
                         └───┬──────────┬─────────┘
                             │          │
              ┌──────────────┘          └───────────────┐
              ▼                                          ▼
   ┌─────────────────────┐                    ┌────────────────────────┐
   │ Supabase             │                    │ AI services             │
   │ - Postgres (DB)       │                    │ - Gemini API (primary)  │
   │ - Auth                │                    │ - Groq API (fallback)   │
   │ - Storage (resumes)   │                    └────────────────────────┘
   │ - Realtime            │
   └─────────────────────┘
              ▲
              │ embedded iframe, no backend round-trip needed for the call itself
   ┌─────────────────────┐
   │ Jitsi Meet            │
   │ (video call)          │
   └─────────────────────┘
```

The backend never proxies video frames — Jitsi rooms are joined directly by the frontend. The backend's job
re: video is only to create a unique room name per session and store it against the booking.

## Design patterns to follow

- **Layered backend:** `api/` (routers, thin — validate input, call a service, return output) →
  `services/` (business logic, the only place that talks to models) → `models/` (SQLAlchemy ORM). Don't put
  business logic in routers, don't query the DB directly from routers.
- **Schema separation:** every request/response shape is a Pydantic model in `schemas/`, never return an ORM
  object directly from an endpoint.
- **AI calls are isolated:** all Gemini/Groq calls go through `services/ai_service.py`, which handles the
  primary→fallback switch and prompt templates. No other file calls the AI SDKs directly — this is what makes
  swapping providers later a one-file change instead of a grep-and-replace.
- **Async by default:** FastAPI routes and SQLAlchemy calls are async — needed since AI calls and video-room
  setup both involve waiting on external services.

## Database schema (outline — see actual models in `/backend/app/models`)

- **users** — id, email, role (candidate/expert/admin), name, created_at
- **candidate_profiles** — user_id, target_role, resume_url, resume_parsed_summary (jsonb)
- **expert_profiles** — user_id, domains (array), bio, company/title, approved (bool), avg_rating
- **availability_slots** — expert_id, start_time, end_time, is_booked
- **bookings** — id, candidate_id, expert_id (nullable if AI session), slot_id (nullable), session_type
  (expert/ai), status (scheduled/completed/cancelled/no_show), jitsi_room_name
- **sessions** — booking_id, started_at, ended_at, transcript (jsonb, for AI sessions)
- **feedback** — session_id, communication_score, technical_score, problem_solving_score, comments,
  authored_by (expert_id or "ai")
- **notifications** — user_id, type, payload (jsonb), read (bool), created_at

## Module → API router mapping (maps to team ownership in ROADMAP.md)

| Module | Routers | Owner (see ROADMAP.md) |
|---|---|---|
| Auth & users | `/auth`, `/users` | Backend Lead |
| Expert discovery & profiles | `/experts` | Frontend Lead + Backend Lead |
| Booking & availability | `/availability`, `/bookings` | Video/Scheduling owner |
| Video sessions | `/sessions` | Video/Scheduling owner |
| AI interviewer & resume parsing | `/ai/interview`, `/ai/resume` | AI/ML owner |
| Feedback & dashboards | `/feedback`, `/dashboard` | Frontend Lead |
| Notifications | `/notifications` | QA/DevOps owner |
