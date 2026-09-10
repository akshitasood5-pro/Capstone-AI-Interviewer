# Roadmap — PrepArena

Assumes roughly a 14-16 week window; adjust week numbers to your actual deadline. Each phase lists what "done"
looks like so it's a checkpoint, not just a date.

## Suggested module ownership (5 people)

| Role | Owns |
|---|---|
| **Frontend Lead** | Next.js app shell, candidate/expert dashboards, expert discovery UI, feedback report UI |
| **Backend Lead** | FastAPI project setup, auth integration, users/experts/DB models, API conventions |
| **AI/ML Engineer** | Gemini/Groq integration, AI interview loop, resume parsing, feedback scoring logic |
| **Scheduling & Video Engineer** | Availability calendar, booking flow, Jitsi integration, session lifecycle |
| **QA / DevOps / Docs** | Testing, CI, deployment (Vercel + Render/Railway), notifications, demo prep, docs |

Swap names in for roles once assigned, and update this table — it's the reference `systemPatterns.md`'s
module-mapping table points back to.

## Phase 0 — Setup & planning (Weeks 1-2)
**Done when:** repo scaffolded per `AGENTS.md`, all free-tier accounts created (Supabase, Gemini, Groq,
Resend), first "hello world" deploy of both frontend and backend is live.

## Phase 1 — Core auth & data model (Weeks 3-4)
**Done when:** a user can sign up as candidate or expert, log in, and see a role-appropriate empty dashboard.
DB schema from `systemPatterns.md` is migrated. Expert profile creation works.

## Phase 2 — Booking & video (Weeks 5-7)
**Done when:** a candidate can browse experts, book a real slot, and both parties can join a live Jitsi call
at the scheduled time. Booking confirmation email sends.

## Phase 3 — AI interviewer & resume parsing (Weeks 7-9)
**Done when:** "Practice now" lets a candidate pick a domain, optionally upload a resume, and complete a full
AI-led interview with adaptive follow-ups, ending in a generated feedback report.

## Phase 4 — Feedback, dashboards, polish (Weeks 10-12)
**Done when:** expert-authored feedback forms work, both feedback types render through the same report
component, and both dashboards show real session history and a basic progress trend.

## Phase 5 — Testing, deployment, docs (Weeks 13-14)
**Done when:** core flows have test coverage, both services are deployed to their free-tier hosts, and
`memory-bank/progress.md` reflects reality (this is also when it's worth re-reading `activeContext.md`'s
"open questions" and making sure none were left unresolved).

## Buffer & demo prep (Weeks 15-16)
Fix whatever the testing phase surfaced. Prepare demo script — remember the cold-start gotcha in
`techContext.md` (hit the deployed backend once before presenting).
