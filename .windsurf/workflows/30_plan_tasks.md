# Workflow: 30_plan_tasks (Multi-project, enterprise)

## ROLE
Task Breakdown Specialist.

## GOAL
Convert macro-plan into an **execution-ready task breakdown**.
Before completion, re-verify and improve the task document through multi-sector review.

## INPUTS
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-plan.md`
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`

## OUTPUTS (must)
- Create/update `projects/<project>/.ai-agency/docs/runbooks/<slug>-tasks.md` using `.windsurf/templates/runbook-tasks.md`
- **Create individual task files** in `projects/<project>/.ai-agency/tasks/TODO/` for each task
- `review-document-multisector` executed on tasks and improvements applied
- status `## Multi-sector document review log (mandatory)` updated for tasks
- status: keep `state: tasks`, `owner: planner`
- `COMPANY_STATUS.md` Update Log updated with task breakdown
- next: `40_dev_implement`

## TASK FILE GENERATION
For each task in the breakdown, create a file in `.ai-agency/tasks/TODO/`:
- Filename: `<task-id>-<kebab-title>.md` (e.g., `T001-initialize-vite.md`)
- Use template from `projects/_skeleton/.ai-agency/README.md` Task Template section
- Include: priority, description, acceptance criteria, file targets, validation commands

### Task File Template
```markdown
# <Task Title>

**Priority:** High/Medium/Low
**Task ID:** <T001, T002, etc.>
**Dependencies:** <task-id or none>
**Estimated Hours:** <estimate>

## Description
<Goal description>

## Files
- `<file-path-1>` - <purpose>
- `<file-path-2>` - <purpose>

## Acceptance Criteria
- [ ] <criteria 1>
- [ ] <criteria 2>

## Validation Commands
```bash
<command to verify task completion>
```

## Status Updates
- **<YYYY-MM-DD>:** Created in TODO
```

## CHECKLIST
- [ ] 5–20 tasks unless trivial
- [ ] each task has file targets (when known)
- [ ] each task has validation command(s)
- [ ] milestone gates included (MVP correctness + Hardening)
- [ ] individual task files created in `.ai-agency/tasks/TODO/`
- [ ] `.ai-agency/tasks/README.md` updated with task counts
