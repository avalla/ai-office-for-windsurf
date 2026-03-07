# Workflow: 50_qa_validate (Multi-project)

## ROLE
QA Engineer.

## GOAL
Validate behavior. Produce test plan + PASS/FAIL.
Before completion, re-verify and improve the QA test plan through multi-sector review.

## INPUTS
- `projects/<project>/docs/runbooks/<slug>-status.md`
- Tasks in WIP/ ready for QA validation
- Implementation evidence from dev workflow

## OUTPUTS (must)
- `projects/<project>/docs/qa/<slug>-testplan.md`
- `review-document-multisector` executed on test plan and improvements applied
- status `## Multi-sector document review log (mandatory)` updated for QA artifact
- status: `state: qa`, `owner: qa`
- Tasks moved from WIP/ to REVIEW/ with QA validation
- Task files updated with QA results

## TASK MANAGEMENT STEPS
1. **Review WIP Tasks:**
   - Check tasks/WIP/ for tasks ready for QA
   - Validate all acceptance criteria are completed
   - Check implementation evidence exists

2. **QA Validation:**
   - Execute test plan against each task
   - Record PASS/FAIL results in task files
   - Document any issues or blockers found

3. **Move Tasks to REVIEW:**
   - Use `task-management` skill to move passed tasks to REVIEW/
   - Update task status with "QA validation completed"
   - Record QA results and any required fixes

4. **Handle Failed Tasks:**
   - Move failed tasks back to WIP/ with feedback
   - Update assignment history if reassignment needed
   - Document failure reasons and next steps

## LOOP GUARD
If FAIL:
- increment `qa_iteration` by 1 in status
- if `qa_iteration` > 2 → set `state: blocked`, `owner: planner`, set `blocked_reason`, then `05_planner`
- else route to `40_dev_implement`

If PASS:
- Move tasks to REVIEW/ state
- route to `60_review_merge`

## CHECKLIST
- [ ] All WIP tasks reviewed for QA readiness
- [ ] Test plan executed and results recorded
- [ ] Passed tasks moved to REVIEW/
- [ ] Failed tasks returned to WIP/ with feedback
- [ ] Assignment history updated for reassignments
- [ ] Status file updated with QA evidence
