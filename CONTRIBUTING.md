# Contributing

This repository uses the **AI Office workflow**.

## Required pipeline
1. Router
2. Create Project (new project requests only)
3. PRD (feature path)
4. ADR (feature path)
5. Planner
6. Plan Tasks
7. Implementation
8. QA
9. Review
10. Release
11. Postmortem

For `bugfix/refactor/spike`, use: Router -> Planner -> Plan Tasks -> Implementation -> QA -> Review -> Release -> Postmortem.

## Required artifacts
- `projects/<project>/docs/prd/<slug>.md` (feature path)
- `projects/<project>/docs/adr/<slug>.md` (feature path)
- `projects/<project>/docs/qa/<slug>-testplan.md`
- `projects/<project>/docs/runbooks/<slug>-plan.md`
- `projects/<project>/docs/runbooks/<slug>-tasks.md`
- `projects/<project>/docs/runbooks/<slug>-status.md`

Every written/updated artifact must:
- include `## Multi-sector review (mandatory)` with PASS/FAIL and improvements
- be logged in status under `## Multi-sector document review log (mandatory)`

## Language policy
- Use English only for documentation, variable names, UI strings, and status/runbook content.
- Do not introduce Italian text in new or updated artifacts.

## Definition of Done
- Acceptance criteria met (PRD)
- Tests executed (and updated/added as needed)
- No secrets committed
- Docs updated where appropriate
- Status file updated with checks evidence (commands + PASS/FAIL)
- Multi-sector reviewer gate completed for every artifact touched in the cycle
