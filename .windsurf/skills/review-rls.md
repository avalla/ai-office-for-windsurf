# Skill: review-rls

## GOAL
Review row-level security policies and data-boundary correctness.

## INPUTS
- schema/migration files affecting protected tables
- `projects/<project>/docs/runbooks/<slug>-status.md`

## OUTPUT
- Append to `projects/<project>/docs/runbooks/<slug>-status.md`:
  - tables reviewed
  - allow/deny matrix by role
  - risks and mitigations

## CHECKLIST
- [ ] every sensitive table has RLS enabled
- [ ] policies enforce tenant/user isolation
- [ ] no unsafe bypass path identified
- [ ] policy predicates use indexed columns when possible

