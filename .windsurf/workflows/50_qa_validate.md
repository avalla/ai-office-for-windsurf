# Workflow: 50_qa_validate (Multi-project)

## ROLE
QA Engineer.

## GOAL
Validate behavior. Produce test plan + PASS/FAIL.
Before completion, re-verify and improve the QA test plan through multi-sector review.

## INPUTS
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`
- Tasks in WIP/ ready for QA validation
- Implementation evidence from dev workflow
- Optional: Security pentest report from `45_security_pentest` workflow

## OUTPUTS (must)
- `projects/<project>/.ai-agency/docs/qa/<slug>-testplan.md`
- `review-document-multisector` executed on test plan and improvements applied
- status `## Multi-sector document review log (mandatory)` updated for QA artifact
- status: `state: qa`, `owner: qa`
- Tasks moved from WIP/ to REVIEW/ with QA validation
- Task files updated with QA results
- `FRAMEWORK_STATUS.md` Update Log updated with QA status

## TASK MANAGEMENT STEPS
1. **Security Check (Optional):**
   - Check if security pentest report exists from `45_security_pentest`
   - Review any CRITICAL or HIGH security findings
   - If security blockers exist, coordinate with security team
   - Document security clearance status in QA plan

2. **Review WIP Tasks:**
   - Check tasks/WIP/ for tasks ready for QA
   - Validate all acceptance criteria are completed
   - Check implementation evidence exists
   - Verify security requirements are met if applicable

3. **QA Validation:**
   - Execute test plan against each task
   - Record PASS/FAIL results in task files
   - Document any issues or blockers found
   - Include security test results if pentest was performed

4. **Move Tasks to REVIEW:**
   - **CRITICAL RULE:** Update task file BEFORE moving (see `.windsurf/rules/task-management.md`)
   - Add status update: `- **YYYY-MM-DD:** Moved to REVIEW - Ready for QA validation`
   - Add: `- **YYYY-MM-DD:** All acceptance criteria completed ✅`
   - Include security clearance status if applicable
   - Use `task-management` skill to move passed tasks to REVIEW/
   - Record QA results and any required fixes

5. **Handle Failed Tasks:**
   - **CRITICAL RULE:** Update task file BEFORE moving back to WIP
   - Add status update: `- **YYYY-MM-DD:** Returned to WIP - Review feedback: [details]`
   - Move failed tasks back to WIP/ with feedback
   - Update assignment history if reassignment needed
   - Document failure reasons and next steps
   - Include security-related failures if applicable

## 🚨 **TASK MANAGEMENT RULES ENFORCEMENT**
**Reference:** `.windsurf/rules/task-management.md`

**REQUIRED FOR WIP → REVIEW:**
- ✅ All acceptance criteria marked ✅
- ✅ Status update with timestamp
- ✅ QA results recorded
- ✅ Security clearance verified (if pentest performed)

**REQUIRED FOR REVIEW → WIP (Failed):**
- ✅ Detailed failure reasons
- ✅ Specific feedback for fixes
- ✅ Status update with timestamp
- ✅ Security-related issues documented (if applicable)

## LOOP GUARD
If FAIL (including security failures):
- increment `qa_iteration` by 1 in status
- if `qa_iteration` > 2 → set `state: blocked`, `owner: planner`, set `blocked_reason`, then `05_planner`
- else route to `40_dev_implement` (or `45_security_pentest` for security issues)

If PASS:
- Move tasks to REVIEW/ state
- route to `60_review_merge`

## CHECKLIST
- [ ] Security pentest report reviewed (if exists)
- [ ] All WIP tasks reviewed for QA readiness
- [ ] Security clearance verified (if applicable)
- [ ] Test plan executed and results recorded
- [ ] Security test results included (if pentest performed)
- [ ] Passed tasks moved to REVIEW/
- [ ] Failed tasks returned to WIP/ with feedback
- [ ] Assignment history updated for reassignments
- [ ] Status file updated with QA evidence
- [ ] Security findings documented (if any)
