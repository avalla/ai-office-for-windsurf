# Skill: sql-performance

## GOAL
Identify and mitigate SQL/database performance risks for changed queries and schema.

## INPUTS
- changed SQL/query paths
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`

## OUTPUT
- Append to `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`:
  - slow-path candidates
  - index opportunities
  - query-shape improvements
  - verification notes (before/after when measurable)

## CHECKLIST
- [ ] indexes exist for common filter/join/order columns
- [ ] no obvious N+1 pattern in changed flows
- [ ] large scans/joins identified and justified
- [ ] performance risk level recorded (LOW/MED/HIGH)

