# Workflow: 05_planner (Multi-project)

## ROLE
Engineering Manager / Planner.

## GOAL
Create a **macro-plan** (scope, milestones, risks, validation strategy).
Do NOT produce full task breakdown here.
Before completion, re-verify and improve the macro-plan through multi-sector review.

## INPUTS
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`
- PRD/ADR if present

## OUTPUTS (must)
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-plan.md` from `.windsurf/templates/runbook-plan.md`
- `review-document-multisector` executed on plan and improvements applied
- status `## Multi-sector document review log (mandatory)` updated for plan
- status: `state: plan`, `owner: planner`
- next: `30_plan_tasks`
