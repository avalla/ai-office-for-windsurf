# Skill: review-document-multisector

## GOAL
Re-verify and improve every written artifact using a multi-sector reviewer lens before moving to the next workflow.

## WHEN TO USE
Use immediately after creating or updating any project artifact, including:
- `docs/prd/<slug>.md`
- `docs/adr/<slug>.md`
- `docs/runbooks/<slug>-plan.md`
- `docs/runbooks/<slug>-tasks.md`
- `docs/qa/<slug>-testplan.md`
- `docs/runbooks/<slug>-status.md`

## MULTI-SECTOR REVIEW CHECKLIST
- Product: scope clarity, acceptance criteria quality, user value alignment.
- Architecture: coherence, trade-offs, rollout feasibility.
- Security: boundary risks, abuse cases, sensitive data handling.
- Reliability: failure modes, loop guards, operational constraints.
- QA/Testability: measurable validations and regression coverage.
- Operations/Release: ownership, handoff clarity, execution readiness.
- Compliance/Traceability: decision rationale and auditability.
- Language quality: English-only policy, concise and unambiguous phrasing.

## OUTPUT FORMAT (MANDATORY)
Append or update the `## Multi-sector review (mandatory)` section in the reviewed document with:
- Reviewer: `multi_sector_reviewer`
- Date: `<YYYY-MM-DD>`
- Result: `PASS|FAIL`
- Improvements applied:
  - ...
- Open issues:
  - ...

## STATUS EVIDENCE
Also add an entry to `projects/<project>/docs/runbooks/<slug>-status.md` under `## Checks run`:
- Command: multi-sector document review (`<artifact-path>`)
- Result: PASS/FAIL
- Notes: summary of key improvements and unresolved issues.
