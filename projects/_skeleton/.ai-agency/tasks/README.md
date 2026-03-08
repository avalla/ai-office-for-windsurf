# Tasks

Kanban-style task management for the project.

## Task Counts

- **TODO:** 0
- **WIP:** 0
- **REVIEW:** 0
- **DONE:** 0
- **ARCHIVED:** 0

## Task States

- **TODO** - Tasks ready to be started
- **WIP** - Currently in progress
- **REVIEW** - Ready for review/feedback
- **DONE** - Completed
- **ARCHIVED** - Cancelled or obsolete

## Task Template

Create a new task file using this template:

```markdown
# Task Title

**Priority:** High/Medium/Low
**Task ID:** T001
**Dependencies:** none
**Estimated Hours:** 1

## Description
Detailed description of the task...

## Files
- `path/to/file.ts` - purpose

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2

## Validation Commands
```bash
npm run test
```

## Status Updates
- **YYYY-MM-DD:** Created in TODO
```

## Naming Convention

Use `<task-id>-<kebab-title>.md` format (e.g., `T001-setup-authentication.md`).

## State Transitions

When moving tasks between states, **ALWAYS**:
1. Update the task file with timestamp and reason
2. Move the file to the appropriate directory
3. Update the counts in this README

### TODO → WIP
```markdown
## Status Updates
- **YYYY-MM-DD:** Moved to WIP - Started implementation
```

### WIP → REVIEW
```markdown
## Status Updates
- **YYYY-MM-DD:** Moved to REVIEW - Ready for QA
```

### REVIEW → DONE
```markdown
## Completion Summary
**Status:** ✅ COMPLETED
**Completed:** YYYY-MM-DD

## Status Updates
- **YYYY-MM-DD:** Moved to DONE - All acceptance criteria met
```
