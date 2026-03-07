# Workflow: 30_plan_tasks (Multi-project, enterprise)

## ROLE
Task Breakdown Specialist.

## GOAL
Convert macro-plan into an **execution-ready task breakdown**.
Before completion, re-verify and improve the task document through multi-sector review.

## INPUTS
- `projects/<project>/docs/runbooks/<slug>-plan.md`
- `projects/<project>/docs/runbooks/<slug>-status.md`

## OUTPUTS (must)
- Create/update `projects/<project>/docs/runbooks/<slug>-tasks.md` using `.windsurf/templates/runbook-tasks.md`
- `review-document-multisector` executed on tasks and improvements applied
- status `## Multi-sector document review log (mandatory)` updated for tasks
- status: keep `state: tasks`, `owner: planner`
- next: `40_dev_implement`

## CHECKLIST
- [ ] 5–20 tasks unless trivial
- [ ] each task has file targets (when known)
- [ ] each task has validation command(s)
- [ ] milestone gates included (MVP correctness + Hardening)
