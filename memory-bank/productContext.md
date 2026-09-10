# Product Context — PrepPilot

## Why this exists
Two failure modes today:
1. Candidates who want a *real* mock interview can't find a mentor with a matching free slot — scheduling
   friction kills the habit of practicing regularly.
2. Candidates who practice with static question banks get no adaptive follow-up and no feedback on delivery,
   only on "did you know the answer."

PrepPilot removes the friction from (1) with a real booking system, and solves (2) by making the AI interviewer
a genuine fallback that's always available — not a toy chatbot bolted on as a gimmick.

## Personas

**Candidate — "Ananya", final-year CS student**
Wants frequent, low-friction practice. Will use AI mode the night before an interview when no expert slot is
free, and will book a real expert for a rehearsal earlier in the process. Cares about: fast booking, honest
feedback, seeing improvement over time.

**Expert — "Rohit", SDE-2 at a mid-size company, alum of the same college**
Has maybe 2 hours a week to give. Wants: control over his own availability, no-shows to be handled gracefully,
a low-effort way to leave feedback (structured form, not a blank essay box).

**Admin — capstone team / platform owner**
Needs to approve new experts (prevent spam signups claiming false expertise), and see basic platform health
(sessions run, no-show rate, average rating).

## Core user flows

### Candidate — expert-led session
Sign up → complete profile (target role/domain) → browse experts filtered by domain → view expert's available
slots → book a slot → get confirmation email → join video call at the scheduled time → receive feedback report
after → see it added to dashboard history.

### Candidate — AI-led session (instant, no booking needed)
Sign up → "Practice now" → pick domain/role → optionally upload resume → AI asks first question (text or
voice) → candidate answers → AI asks adaptive follow-ups → session ends after N questions or time limit → AI
generates feedback report immediately → added to dashboard history.

### Expert flow
Sign up → apply with credentials (role, company/college, domains) → admin approves → set weekly availability →
get notified on new bookings → join video call → fill structured feedback form within 24h of session end →
feedback delivered to candidate.

## UX goals
- Booking a slot should take under 60 seconds from landing on an expert's profile.
- The AI interview mode should feel like a conversation, not a form — one question visible at a time.
- Feedback reports should be skimmable in 30 seconds (scores + 3 headline comments) with detail available
  on click.
