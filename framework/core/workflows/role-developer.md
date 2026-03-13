---
description: Guidance for Developer role — implementation, coding standards, task management
---

# Role: Developer

## Stage Covered
- `dev` — Implement features, write tests, record evidence

## Implementation Workflow

### 1. Review Assigned Tasks
- Check `.ai-agency/tasks/TODO/` for assigned tasks
- Use `ai_office_task_list` to see current board state
- Validate task dependencies are resolved

### 2. Move Tasks to WIP
- Use `ai_office_task_move` to move tasks from `TODO` to `WIP`
- Task files are automatically updated with timestamp

### 3. Implement
- Follow ADR patterns and tech stack decisions
- Keep diffs small and focused — one logical change per commit
- Write tests alongside implementation
- Use early returns and guard clauses
- Validate inputs at boundaries

### 4. Record Evidence
- Use `ai_office_set_status` to update status with checks run
- Record: command run, PASS/FAIL result, notes
- Example checks: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`

### 5. Move Tasks Forward
- Use `ai_office_task_move` to move completed tasks from `WIP` to `REVIEW`
- Update task files with completion evidence

## Coding Standards

### General
- TypeScript strict mode, no `any`
- Functional style, prefer composition
- `const` over `let`, never `var`
- Early returns to reduce nesting
- Descriptive names (`isLoading`, `hasError`, `fetchUser`)

### Testing
- Write tests for critical logic and invariants
- Every bug fix includes a regression test
- Test edge cases: empty inputs, nulls, boundary values
- Run full test suite before advancing

### Security
- Never hardcode secrets
- Validate and sanitize all inputs
- Use parameterized queries
- Never log sensitive data (passwords, tokens, PII)

### Task Management Rules
**Reference:** `.ai-office/rules/task-management.md`

**Before any task move:**
- ✅ Update task file with timestamp and reason
- ✅ Mark completed acceptance criteria
- ✅ Add completion summary for finished tasks

**Forbidden:**
- ❌ Moving tasks without file updates
- ❌ "I'll update later" mentality
- ❌ Silent state changes

## Loop Guard Warning

The `dev` stage participates in loop guards:
- QA ↔ Dev: max 2 iterations
- Review ↔ Dev: max 2 iterations

If you're bounced back from QA or Review, the iteration counter increments. At max iterations, the pipeline blocks and the planner must intervene.

## After Completion

1. Run all checks (tests, lint, typecheck, build)
2. Use `ai_office_validate` to verify quality gates
3. Use `ai_office_advance` to move to `qa` (or `security` if security assessment needed)
