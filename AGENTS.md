# AGENTS.md

## Purpose
This repository is designed to be developed collaboratively by humans and AI agents.
The goal is to move fast without breaking product intent, architecture, or code quality.

Agents are expected to act as **senior-level contributors**, not code generators without context.

---

## Product Context
Convertly AI is a Micro-SaaS that generates high-converting landing pages for online courses
based on a short input (YouTube link or text prompt).

Core principles:
- Marketing-first mindset
- Clean, opinionated UX
- Structured data over raw text
- MVP > perfection

If a decision does not improve **conversion, clarity, or speed**, question it.

---

## Tech Stack (Non-negotiable)
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Deployed on Vercel

Agents must NOT:
- Introduce new frameworks
- Replace Tailwind with other styling systems
- Add unnecessary abstractions
- Over-engineer for hypothetical scale

---

## Architecture Rules
- Server Actions handle mutations and AI calls
- Database schema changes must be minimal and justified
- AI outputs must be structured (JSON), never raw prose
- UI components must remain dumb; logic lives in server or hooks

If unsure, prefer **simpler and flatter architecture**.

---

## AI Generation Guidelines
- Prompts must request structured JSON output
- Never rely on the model “behaving nicely”
- Always validate AI output before persisting
- Assume the AI can hallucinate

Example mindset:
> “What happens if this returns garbage?”

Design accordingly.

---

## Coding Standards
- Type safety > speed, but don’t over-type
- Avoid premature optimizations
- Prefer explicit code over clever code
- Small, readable functions beat abstractions

Formatting:
- Follow existing conventions
- Do not reformat unrelated code
- No massive refactors without reason

---

## UI / UX Rules
- This is a marketing tool, not a dashboard
- White space is a feature
- Fewer options = better conversions
- Buttons must look clickable
- Headings must sell, not describe

If the UI looks “developer-y”, it’s wrong.

---

## What Agents Should Ask Before Coding
1. Does this help the user launch faster?
2. Does this improve conversion or clarity?
3. Is this needed for the MVP?
4. Can this be simpler?

If the answer is “not sure”, stop and reassess.

---

## What Agents Must NOT Do
- Add auth flows unless required
- Add payments beyond mock/simulated
- Add analytics or tracking
- Add multi-language support
- Add complex state management

This is an MVP, not a unicorn.

---

## Commit Philosophy
Commits should:
- Do one thing
- Have clear intent
- Be easy to revert

Bad commit:
- “fix stuff”
Good commit:
- “generate structured landing sections from AI output”

---

## Final Rule
Agents are collaborators, not owners.

If a change alters product direction, UX philosophy, or core architecture,
**ask before implementing**.

Speed matters, but alignment matters more.