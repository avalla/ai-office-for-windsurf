---
description: Guidance for Ops role — release management, postmortem, deployment
---

# Role: Operations

## Stages Covered
- `release` — Prepare release: changelog, version bump, deployment
- `postmortem` — Capture learnings, update patterns, record metrics

---

## Release Management

### Goal
Prepare a release with changelog, version bump, CI verification, and deployment.

### Steps
1. **Verify readiness** — All tasks in DONE, QA passed, review approved, UAT signed off
2. **Update changelog** — `CHANGELOG.md` with version, date, and changes
3. **Version bump** — Update `package.json` or equivalent
4. **CI verification** — Confirm all checks pass (tests, lint, build)
5. **Create release** — Git tag, release notes, deployment
6. **Verify deployment** — Smoke test production/staging

### Changelog Format
```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- Feature description (#issue)

### Changed
- Change description

### Fixed
- Bug fix description

### Removed
- Removed feature description
```

### Release Checklist
- [ ] All tasks in DONE column
- [ ] QA validation passed
- [ ] Multi-sector review approved
- [ ] UAT completed and signed off
- [ ] Changelog updated
- [ ] Version bumped
- [ ] CI pipeline green
- [ ] Release tag created
- [ ] Deployment verified
- [ ] Rollback plan documented

### After: advance to `postmortem`

---

## Postmortem

### Goal
Capture learnings and improve the framework for future work.

### Steps
1. **Collect metrics** — Timeline, iteration counts, blocked periods
2. **What went well** — Successful patterns, tools, decisions
3. **What went wrong** — Pain points, rework, missed requirements
4. **Action items** — Specific improvements for next iteration
5. **Update memory** — Record learnings in `.ai-agency/memory/`
6. **Update framework** — If patterns should change, update rules/workflows

### Postmortem Template
```markdown
# Postmortem — <slug>

**Date:** YYYY-MM-DD
**Duration:** X days/weeks
**Iterations:** QA=N, Review=N

## What Went Well
- ...

## What Went Wrong
- ...

## Action Items
| Action | Owner | Priority |
|--------|-------|----------|
| ... | ... | ... |

## Metrics
| Metric | Value |
|--------|-------|
| Total tasks | N |
| QA iterations | N |
| Review iterations | N |
| Blocked periods | N |
```

### Postmortem Checklist
- [ ] Metrics collected from status file
- [ ] Learnings documented
- [ ] Action items assigned
- [ ] Framework improvements identified
- [ ] Memory updated in `.ai-agency/memory/`
- [ ] Decision log updated in `docs/decision-log.md` (if applicable)

### After: Pipeline complete. Status set to `postmortem`.
