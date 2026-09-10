# Roadmap — PrepPilot

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

## Phase 1 — Landing, Candidate Profile & Resume Intelligence (Weeks 1-3)
Landing page, auth flow, candidate profile, resume upload → AI analysis → scoring → report display.
**Done when:** a user can visit the landing page, sign up, update their profile, upload a resume, and receive a full AI-generated diagnostic report.

## Phase 2 — AI Mock Interview (Weeks 4-6)
Domain/role selection, adaptive question loop, AI-generated feedback.
**Done when:** a candidate can start an instant AI interview, answer questions adaptively, and receive a scored feedback report.

## Phase 3 — Expert Discovery & Booking (Weeks 7-9)
Expert profiles, availability calendar, booking flow, confirmation emails.
**Done when:** a candidate can browse experts, book a slot, and get a confirmation email.

## Phase 4 — Video Sessions & Expert Feedback (Weeks 10-12)
Jitsi integration, session lifecycle, structured feedback forms.
**Done when:** both parties can join a video call and the expert can submit structured feedback.

## Phase 5 — Dashboards, Notifications & Polish (Weeks 13-14)
Candidate/expert dashboards, email notifications, progress trends.
**Done when:** both dashboards show real data and emails send.

## Buffer & Demo Prep (Weeks 15-16)
Fix whatever the testing phase surfaced. Prepare demo script — remember the cold-start gotcha in
`techContext.md` (hit the deployed backend once before presenting).
