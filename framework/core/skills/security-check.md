# Skill: security-check

## GOAL
Run a structured security assessment before review/release gates.

## INPUTS
- changed files from current task
- `.ai-office/docs/runbooks/<slug>-status.md`

## OUTPUT
- Append to `.ai-office/docs/runbooks/<slug>-status.md`:
  - threat summary (auth, data boundary, injection, secrets, dependency risk)
  - findings grouped by severity: HIGH/MED/LOW
  - required mitigations and owners

## CHECKLIST
- [ ] secret leakage scan performed
- [ ] authn/authz boundaries verified for changed paths
- [ ] input validation coverage checked
- [ ] dependency risks reviewed when lock/manifest changed
- [ ] security-relevant tests run or explicitly marked NOT RUN

