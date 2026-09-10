# Active Context — PrepArena

> Update this file at the end of every work session, however small. This is the file that lets a teammate's
> agent session (or your own, a week later) pick up exactly where things were left off instead of re-deriving
> context from scratch or guessing.

## Current phase
Phase 0 — Setup & planning (see `ROADMAP.md`)

## Current focus
- Finalizing this planning doc set (AGENTS.md + memory-bank + ROADMAP.md) — done as of this session.
- Next: repo scaffolding (Next.js app + FastAPI app in the structure defined in AGENTS.md §3).

## Recent decisions
- Stack locked: Next.js + FastAPI (Python), Supabase for DB/Auth/Storage, Gemini (primary) + Groq (fallback)
  for AI, Jitsi for video.
- Expert model confirmed as hybrid: real experts AND an AI interviewer, not either/or.
- Team of 5 — module ownership proposed in `ROADMAP.md`, not yet confirmed with actual names.
- Payments explicitly out of scope for MVP — using a credits system instead of real money.

## Next steps
1. Assign the 5 roadmap modules to actual team members and update `ROADMAP.md` with names.
2. Create Supabase project, Gemini API key, Groq API key — share credentials securely with the team (not
   over plaintext chat).
3. Scaffold `/frontend` and `/backend` per the structure in `AGENTS.md`.
4. Write the first Alembic migration for the schema in `systemPatterns.md`.

## Open questions (resolve before Phase 1 ends)
- Exact scoring rubric for feedback (what does a "technical_score" of 7/10 mean, concretely?) — needs a
  written rubric so AI-generated and expert-authored feedback stay comparable.
- Credits system mechanics: do candidates get a fixed number per week, or earn them somehow?
