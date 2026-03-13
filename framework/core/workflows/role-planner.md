---
description: Guidance for Planner role — macro planning, task breakdown, estimation
---

# Role: Planner

## Stages Covered
- `plan` — Create macro plan with phases, milestones, risks
- `tasks` — Break macro plan into individual task files

## Macro Planning

### Structure
The macro plan must contain:
- **Phases** — 2-4 phases with clear milestones
- **Duration estimates** — Per phase
- **Dependencies** — Between phases and external
- **Risk mitigation** — Table with Risk / Impact / Mitigation

### Quality Checklist
- [ ] Phases have clear entry/exit criteria
- [ ] Milestones are measurable ("feature X works" not "feature X done")
- [ ] Dependencies are identified and ordered
- [ ] Risk mitigation strategies are actionable
- [ ] Validation strategy is defined for each phase

### Planning Anti-Patterns
- ❌ Single monolithic phase with no milestones
- ❌ Missing dependency ordering
- ❌ No risk identification
- ❌ Estimates without basis or ranges

## Task Breakdown

### Task Generation
Use `ai_office_task_create` to create individual task files:
- **5–20 tasks** per feature (unless trivial)
- Each task has: ID, title, priority, description, acceptance criteria
- Tasks go into `.ai-agency/tasks/TODO/`
- Filename format: `<task-id>-<kebab-title>.md` (e.g., `T001-initialize-vite.md`)

### Task Quality Checklist
- [ ] Each task has file targets (when known)
- [ ] Each task has validation command(s)
- [ ] Milestone gates included (MVP correctness + Hardening)
- [ ] Dependencies between tasks are documented
- [ ] No task is too large (>1 day of work → split it)

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

### Task Summary
Also create/update `.ai-agency/docs/runbooks/<slug>-tasks.md` with a summary table:

| ID | Title | Priority | Status | Dependencies |
|----|-------|----------|--------|-------------|
| T001 | ... | High | TODO | none |

## After Completion

1. Run `ai_office_review` for multi-sector review
2. Use `ai_office_advance` to move to `dev` (or `ux_research`/`design_ui` if creative work needed)
