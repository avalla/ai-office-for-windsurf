# Reliability Rule (Multi-project)

## Loop guards
- Dev ↔ QA: max 2 iterations (qa_iteration <= 2)
- Review ↔ Dev: max 2 iterations (review_iteration <= 2)

If a guard is exceeded:
- set `state: blocked`
- set `owner: planner`
- set `blocked_reason` with explicit unblock criteria

## Entry point enforcement
- **MUST invoke 00_router** before any other workflow for new requests.
- Direct project creation without router is FORBIDDEN.
- Workflow state transitions must follow the defined state machine.

## Determinism
All workflows must:
- read/update `projects/<project>/docs/runbooks/<slug>-status.md`
- keep `project` + `slug` consistent across all artifacts
- execute `review-document-multisector` for every written/updated artifact before workflow completion
- update `## Multi-sector document review log (mandatory)` in status for each reviewed artifact
