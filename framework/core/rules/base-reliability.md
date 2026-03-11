---
trigger: always_on
---

# Reliability Rule (Multi-project)

## Loop guards
- Dev ↔ QA: max 2 iterations (qa_iteration <= 2)
- Review ↔ Dev: max 2 iterations (review_iteration <= 2)

If a guard is exceeded:
- set `state: blocked`
- set `owner: planner`
- set `blocked_reason` with explicit unblock criteria

## Scope
- Entry-point and orchestration enforcement lives in `base-ai-office.md`.

## Determinism
All workflows must:
- read/update `.ai-office/docs/runbooks/<slug>-status.md`
- keep `project` + `slug` consistent across all artifacts
- execute `review-document-multisector` for every written/updated artifact before workflow completion
- update `## Multi-sector document review log (mandatory)` in status for each reviewed artifact
