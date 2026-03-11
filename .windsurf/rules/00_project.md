---
trigger: always_on
---

# Project Rule: AI Office for Windsurf (Multi-project)

This repository is an **AI Software Company framework** for Windsurf Cascade.

## Source of truth and precedence

When conflicts exist, resolve using:

1) artifacts in `/projects/<project>/.ai-agency/docs`
2) rules/policies
3) memory in `/projects/<project>/.ai-agency/memory`
4) chat context

## Artifacts (communication contract)

All work is namespaced by **project**.

- `projects/<project>/.ai-agency/docs/prd/<slug>.md` — requirements
- `projects/<project>/.ai-agency/docs/adr/<slug>.md` — architecture decisions
- `projects/<project>/.ai-agency/docs/qa/<slug>-testplan.md` — QA plan + results
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-plan.md` — macro plan
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-tasks.md` — task breakdown (enterprise)
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md` — FSM state + evidence

Framework-level artifacts (global):

- `docs/repo-graph.md` — framework repo graph / audit baseline
- `docs/decision-log.md` — framework learnings

## Pipeline (enterprise)

Router → CEO/PM(PRD) → Architect(ADR) → Planner(macro-plan) → PlanTasks(task breakdown) → Dev → QA → Review → Release →
Postmortem

## Quality gates (non-negotiable)

- **ALWAYS start with 00_router workflow** for any new project or feature request.
- Never bypass the router or create projects directly without workflow orchestration.
- Every written/updated artifact must be re-verified by a multi-sector reviewer before moving to the next workflow.
- Every status file must include `## Multi-sector document review log (mandatory)` with PASS/FAIL evidence.
- Never say "done" without **recorded checks** (tests/lint/build) in the status file.
- Keep diffs small and focused.
- No secrets, ever.
- English-only content: documentation, variable names, artifact text, and user-facing strings must be in English.

Updated: 2026-03-04
