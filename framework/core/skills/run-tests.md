# Skill: run-tests

## GOAL
Execute relevant test suites and report reliable evidence for gate decisions.

## INPUTS
- `.ai-office/docs/runbooks/<slug>-tasks.md`
- `.ai-office/docs/runbooks/<slug>-status.md`

## OUTPUT
- Run task-defined validation commands in order.
- Append each command result to `.ai-office/docs/runbooks/<slug>-status.md`:
  - Command
  - Result: PASS/FAIL/NOT RUN
  - Notes (short failure hint)

## CHECKLIST
- [ ] at least one end-to-end or integration validation for MVP tasks
- [ ] failures include suspected cause + impacted files
- [ ] flaky results are flagged explicitly

