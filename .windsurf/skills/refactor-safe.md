# Skill: refactor-safe

## GOAL
Refactor with minimal risk, preserving behavior and evidence trail.

## INPUTS
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-tasks.md`
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`

## OUTPUT
- Minimal focused code changes tied to explicit task IDs.
- Update `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md` with:
  - impacted files
  - checks run (lint/test/typecheck/build) and PASS/FAIL
  - rollback note for risky changes

## CHECKLIST
- [ ] no behavior change unless explicitly requested
- [ ] no unrelated renames/moves
- [ ] tests still pass or failures triaged
- [ ] docs adjusted only where behavior changed

