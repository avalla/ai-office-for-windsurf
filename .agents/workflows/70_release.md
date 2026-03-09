---
description: 70_release (Multi-project)
---
# Workflow: 70_release (Multi-project)

## ROLE
Release Manager.

## GOAL
Prepare a release: update changelog, verify CI, create release notes.
Before completion, re-verify release documentation through multi-sector review.

## OUTPUTS
- Update `CHANGELOG.md`
- `review-document-multisector` executed on release notes/changelog updates
- status `## Multi-sector document review log (mandatory)` updated for release artifacts
- status: `state: release`, `owner: release`
- next: `90_postmortem_memory`
