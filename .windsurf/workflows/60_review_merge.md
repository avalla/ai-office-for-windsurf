# Workflow: 60_review_merge (Multi-project)

## ROLE
Multi-sector Reviewer.

## GOAL
Review changes across product, architecture, security, reliability, QA, and operations dimensions; enforce DoD.

## INPUTS
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`
- Tasks in REVIEW/ ready for final review
- All changed artifacts from previous workflows

## OUTPUTS (must)
- all changed artifacts re-verified through `review-document-multisector`
- status `## Multi-sector document review log (mandatory)` updated for all reviewed artifacts
- status: `state: review`, `owner: reviewer`
- Tasks moved from REVIEW/ to DONE/ with approval
- Task completion documented with review evidence
- `COMPANY_STATUS.md` Update Log updated with review completion

## TASK MANAGEMENT STEPS
1. **Review Tasks in REVIEW:**
   - Check tasks/REVIEW/ for tasks ready for final review
   - Validate all acceptance criteria are met and tested
   - Review QA validation results and implementation evidence

2. **Multi-sector Review:**
   - Execute `review-document-multisector` on all artifacts
   - Review technical implementation, security, reliability
   - Validate compliance with project standards

3. **Move Tasks to DONE:**
   - **CRITICAL RULE:** Update task file BEFORE moving (see `.windsurf/rules/task-management.md`)
   - Add completion summary:
   ```markdown
   ## Completion Summary
   **Status:** ✅ COMPLETED
   **Completed:** YYYY-MM-DD
   **Reviewer:** Multi-sector Review
   ```
   - Use `task-management` skill to move approved tasks to DONE/
   - Record review results and approval details

4. **Handle Review Issues:**
   - **CRITICAL RULE:** Update task file BEFORE moving back
   - Add status update: `- **YYYY-MM-DD:** Returned to WIP/REVIEW - Review feedback: [details]`
   - Move tasks with issues back to WIP/ or REVIEW/ as needed
   - Update assignment history if reassignment required
   - Document review feedback and required changes

## 🚨 **TASK MANAGEMENT RULES ENFORCEMENT**
**Reference:** `.windsurf/rules/task-management.md`

**REQUIRED FOR REVIEW → DONE:**
- ✅ Completion summary with timestamp
- ✅ Multi-sector reviewer identification
- ✅ All acceptance criteria marked ✅

**REQUIRED FOR REVIEW → WIP/REVIEW (Failed):**
- ✅ Detailed review feedback
- ✅ Specific improvement requirements
- ✅ Status update with timestamp

## LOOP GUARD
If FAIL:
- increment `review_iteration` by 1
- if `review_iteration` > 2 → `state: blocked`, `owner: planner`, set `blocked_reason`, then `05_planner`
- else → `40_dev_implement`

If PASS:
- Move tasks to DONE/ state
- route to `70_release`

## CHECKLIST
- [ ] All REVIEW tasks evaluated for final approval
- [ ] Multi-sector review completed on all artifacts
- [ ] Approved tasks moved to DONE/
- [ ] Tasks with issues returned with clear feedback
- [ ] Assignment history updated for any reassignments
- [ ] Status file updated with review evidence
- [ ] Task completion documented with lessons learned
