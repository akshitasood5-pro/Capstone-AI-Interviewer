# Project Brief — PrepPilot

## One-line pitch
An "expert-hire" style platform where candidates book mock interviews with either a real human expert or an
AI interviewer, and walk away with a structured feedback report either way.

## Problem statement
Students preparing for placements/internships struggle to get realistic interview practice: real mentors are
hard to schedule and often unpaid favors, and generic "practice question" sites give no live feedback. This
platform makes booking a mock interview as easy as booking a slot on a calendar — with a real person when one's
available, or instantly with an AI interviewer when it's not.

## Target users
- **Candidate** — a student preparing for interviews (technical or HR rounds).
- **Expert** — a senior student, alum, or industry professional who volunteers/lists availability to conduct
  mock interviews.
- **Admin** — approves expert applications, monitors platform health, resolves disputes.

## In scope for MVP (capstone deliverable)
1. Auth with 3 roles (candidate / expert / admin)
2. Expert profile creation + discovery (filter by domain, e.g. "DSA", "System Design", "HR/behavioral")
3. Availability calendar for experts + booking flow for candidates
4. Video call for expert-led sessions (embedded, no separate app needed)
5. AI-led mock interview mode: candidate picks a domain/role, AI asks questions, listens/reads answers, adapts
   follow-ups
6. Resume upload → AI extracts skills/experience to tailor which questions get asked
7. Structured feedback report after every session (expert-authored or AI-generated): scored on communication,
   technical depth, problem-solving, with free-text comments
8. Candidate dashboard: session history, feedback over time, a basic progress trend
9. Expert dashboard: upcoming bookings, past sessions, ratings received
10. Email notifications: booking confirmed, session reminder, feedback ready

## Explicitly out of scope for MVP
- Real payments (use a "credits" system instead — no live money changing hands; this also sidesteps
  PCI/compliance concerns for a student project)
- Mobile app (web-responsive only)
- Group interviews / panel interviews
- Multi-language support

## Success criteria
- A candidate can complete an entire flow end-to-end: sign up → find/pick an expert or AI → book or start
  instantly → have the session → receive a feedback report — with no manual intervention.
- An expert can complete: sign up → set availability → get booked → conduct session → submit feedback.
- All of the above runs on entirely free-tier services (see `techContext.md`) at demo/evaluation scale.
