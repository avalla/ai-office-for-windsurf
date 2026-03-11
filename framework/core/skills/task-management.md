# Skill: task-management

## ROLE
Task Management Orchestrator.

## GOAL
Manage task state transitions, assignments, and movement between folders according to workflow rules and team assignments.

## INPUTS
- Project path
- Task ID or file path
- Target state (optional)
- Assignment changes (optional)

## OUTPUTS
- Task moved to appropriate folder
- Task file updated with new state and assignments
- Assignment history updated
- Validation report

## STEPS

### 1. Load and Validate Task
- Read task file from current location
- Parse task metadata (assignee, team, priority, dependencies)
- Validate task format and required fields
- Check current state from folder location

### 2. Validate Transition
- Load project config.json for transition rules
- Check if target state is valid from current state
- Verify assignee team compatibility
- Check for assignment loops (review assignment history)

### 3. Update Task Content
- Add new status update with timestamp
- Update assignment history if changed
- Update assignee and team fields
- Add transition reason if provided

### 4. Move Task File
- Determine target folder path
- Move task file to new location
- Verify file exists in new location
- Update any cross-references in other tasks

### 5. Update Dependencies
- Check dependent tasks in TODO folder
- Notify if this task blocks others
- Update dependency status if needed

## VALIDATION RULES

### Assignment Loop Prevention
- Track assignment history in task file
- Prevent reassignment to previous assignee within 7 days without explicit reason
- Require manager approval for reassignment loops
- Log all assignment changes with timestamps and reasons

### State Transition Rules
- Follow config.json task_transitions rules
- Require acceptance criteria completion for TODO→WIP
- Require review completion for WIP→REVIEW
- Require approval for REVIEW→DONE
- Archive tasks that are obsolete or cancelled

### Team Compatibility
- Only assign tasks to appropriate team members
- Validate team assignments against task type
- Check team member availability
- Prevent cross-team reassignment without approval

## COMMANDS

### List Tasks by State
```bash
task-management list --state=TODO --team=frontend
```

### Assign Task
```bash
task-management assign --task=001-create-project-structure --to=@developer --reason="frontend expertise needed"
```

### Move Task
```bash
task-management move --task=001-create-project-structure --to=WIP --reason="starting implementation"
```

### Validate Task
```bash
task-management validate --task=001-create-project-structure
```

## INTEGRATION
- Used by MCP tools: `ai_office_task_move`, `ai_office_task_list`, `ai_office_task_count`
- Referenced in guidance: `role-developer.md`, `role-qa.md`
- Integrates with `task-create` skill for new task creation
- Integrates with review-document-multisector for assignment changes
- Updates project status files with task movement evidence
- Provides audit trail for task transitions

## QUICK COMMANDS

### Create New Task
```bash
# Use task-create skill
task-create --project=<project> --title="<title>" --team=<team>
```

### Full Task Lifecycle
```bash
# 1. Create
task-create --project=myproject --title="New feature" --team=dev

# 2. Start work
task-management move --task=FEAT-001 --to=WIP --reason="starting"

# 3. Complete
task-management move --task=FEAT-001 --to=REVIEW --reason="ready for review"

# 4. Approve
task-management move --task=FEAT-001 --to=DONE --reason="approved"
```

## ERROR HANDLING
- Invalid transitions: report error and suggest valid targets
- Assignment conflicts: require manager override
- Missing dependencies: block transition until resolved
- File system errors: retry with exponential backoff
