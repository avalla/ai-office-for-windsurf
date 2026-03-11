# Skill: security-quickcheck

## GOAL
Fast structured security review: secrets, auth boundaries, injection, data access.

## OUTPUT
Append to `.ai-office/docs/runbooks/<slug>-status.md`:

## Security quickcheck
- Secrets exposure: PASS/FAIL (+ details)
- Authn/Authz boundaries: PASS/FAIL (+ details)
- Injection risks (SQL/command/template): PASS/FAIL (+ details)
- Data access boundaries (RLS/ACL/tenancy): PASS/FAIL (+ details)
- Unsafe exec / filesystem: PASS/FAIL (+ details)

## Required mitigations (if any)
1. ...
