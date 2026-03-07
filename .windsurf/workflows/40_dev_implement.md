# Workflow: 40_dev_implement (Multi-project)

## ROLE
Developer.

## GOAL
Implement tasks and record evidence.
Any status updates produced in this workflow must be re-verified through multi-sector review.

## INPUTS
- `projects/<project>/docs/runbooks/<slug>-tasks.md`
- `projects/<project>/docs/runbooks/<slug>-status.md`
- Tasks assigned to developer in tasks/TODO/

## OUTPUTS (must)
- status: `state: dev`, `owner: dev`
- record checks run in status (tests/lint/build)
- `review-document-multisector` executed on updated status sections and log updated
- Tasks moved from TODO/ to WIP/ with assignment tracking
- Task assignment history updated to prevent loops
- next: `50_qa_validate`

## TASK MANAGEMENT STEPS
1. **Review Assigned Tasks:**
   - Check tasks/TODO/ for tasks assigned to current developer
   - Validate team assignments match developer expertise
   - Check for assignment loops in task history

2. **Move Tasks to WIP:**
   - **CRITICAL RULE:** Update task file BEFORE moving (see `.windsurf/rules/TASK_MANAGEMENT_RULES.md`)
   - Add status update: `- **YYYY-MM-DD:** Moved to WIP - Started implementation`
   - Use `task-management` skill to move assigned tasks to WIP/
   - Record assignment change if different from previous assignee

3. **Track Progress:**
   - Update task files with implementation progress
   - Record completion of acceptance criteria
   - Note any blockers or dependencies

4. **Validate Dependencies:**
   - Check if dependent tasks are ready
   - Update cross-references between tasks
   - Notify if blocking other tasks

## 🚨 **TASK MANAGEMENT RULES ENFORCEMENT**
**Reference:** `.windsurf/rules/TASK_MANAGEMENT_RULES.md`

**REQUIRED BEFORE ANY MOVE:**
- ✅ Update task file with timestamp and reason
- ✅ Mark completed acceptance criteria if any
- ✅ Add completion summary for finished tasks

**FORBIDDEN:**
- ❌ Moving tasks without file updates
- ❌ "I'll update later" mentality
- ❌ Silent state changes

## CHECKLIST
- [ ] All assigned tasks moved from TODO/ to WIP/
- [ ] Assignment history updated for reassignments
- [ ] No assignment loops detected
- [ ] Task dependencies validated
- [ ] Status file updated with task movement evidence
- [ ] Multi-sector review completed
