---
trigger: always_on
---

# Project Rule: AI Office for {{IDE_NAME}}

This project uses the **AI Office metaframework** — an AI Software Company engine for {{IDE_NAME}}.

## Architecture

The framework is **installed inside your project**, not the other way around:

```
your-project/
├── .ai-office/       ← Complete framework (engine + artifacts)
│   ├── engine/       ← Framework engine (workflows, skills, rules, agents, agencies)
│   ├── docs/         ← PRD, ADR, QA, runbooks
│   ├── tasks/        ← Kanban board (BACKLOG → TODO → WIP → REVIEW → DONE)
│   ├── memory/       ← Project learnings
│   ├── versions/     ← Version tracking
│   └── config/       ← Configuration
├── src/              ← Your code
└── ...
```

## Source of truth and precedence

When conflicts exist, resolve using:

1) artifacts in `.ai-office/docs`
2) rules in `.ai-office/engine/rules/`
3) memory in `.ai-office/memory`
4) chat context

## Artifacts (communication contract)

- `.ai-office/docs/prd/<slug>.md` — requirements
- `.ai-office/docs/adr/<slug>.md` — architecture decisions
- `.ai-office/docs/qa/<slug>-testplan.md` — QA plan + results
- `.ai-office/docs/runbooks/<slug>-plan.md` — macro plan
- `.ai-office/docs/runbooks/<slug>-tasks.md` — task breakdown (enterprise)
- `.ai-office/docs/runbooks/<slug>-status.md` — FSM state + evidence

Headquarters-level artifacts (optional, for agency operations):

- `.ai-office/docs/repo-graph.md` — repo graph / audit baseline
- `.ai-office/docs/decision-log.md` — cross-project learnings
- `.ai-office/office/` — clients, meetings, reports

## Pipeline (enterprise)

Router → CEO/PM(PRD) → Architect(ADR) → Planner(macro-plan) → PlanTasks(task breakdown) → Dev → QA → Review → Release →
Postmortem

Pipeline stages and transitions are managed by the **AI Office MCP server** (`ai_office_*` tools).
See `.ai-office/engine/workflows/pipeline.md` for the full state machine reference.

## Quality gates (non-negotiable)

- **ALWAYS start with `ai_office_route`** for any new project or feature request.
- Never bypass the router or create projects directly without MCP orchestration.
- Every written/updated artifact must be re-verified via `ai_office_review` before advancing.
- Every status file must include `## Multi-sector document review log (mandatory)` with PASS/FAIL evidence.
- Never say "done" without **recorded checks** (tests/lint/build) in the status file.
- Use `ai_office_validate` to verify quality gates before `ai_office_advance`.
- Keep diffs small and focused.
- No secrets, ever.
- English-only content: documentation, variable names, artifact text, and user-facing strings must be in English.

Updated: 2026-03-12
