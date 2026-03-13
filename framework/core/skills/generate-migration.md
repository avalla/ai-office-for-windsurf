# Skill: generate-migration

## GOAL
Design a safe, reversible database migration aligned with PRD/ADR and project status.

## INPUTS
- `.ai-office/docs/prd/<slug>.md` (if feature path)
- `.ai-office/docs/adr/<slug>.md` (if feature path)
- `.ai-office/docs/runbooks/<slug>-status.md`

## OUTPUT
- Create migration file(s) in the target codebase migration folder.
- Append to `.ai-office/docs/runbooks/<slug>-status.md`:
  - migration file names
  - forward/backward strategy
  - validation commands run and PASS/FAIL

## CHECKLIST
- [ ] backward compatibility considered
- [ ] indexes for FK/filter/sort columns
- [ ] security boundaries (RLS/ACL) updated when needed
- [ ] rollback path documented
- [ ] schema tests updated/added when available

