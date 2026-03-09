# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added
- Initial AI Office framework structure
- Beta roadmap for operational readiness (`docs/beta-operational-roadmap.md`)
- Demo project `projects/marketplace-lite` with PRD/ADR/Plan/Tasks/Status/QA artifacts
- Framework and project repo graphs for artifact/state-machine visibility
- Onboarding runbooks:
  - `docs/runbooks/start-new-project-quickstart.md`
  - `docs/runbooks/start-new-project-operational-checklist.md`
- Residual risk report for beta operations (`docs/beta-residual-risks.md`)
- Multi-sector document review skill (`.agents/skills/review-document-multisector.md`)
- New game project `projects/rave-arcade-brawler` (Phaser 3 + TypeScript + Vite)
- Full project artifacts for slug `feature-rave-arcade-brawler-core-loop`:
  - PRD, ADR, plan, tasks, status, QA test plan
  - Task board transitions completed up to DONE
  - Crazy Studio-aligned prototype scope and documentation

### Changed
- Multi-project contract alignment across CONTRIBUTING, skills, and status schema/template
- Framework CI strengthened with non-empty skills and status schema/template consistency checks
- Demo project status advanced through a full dry-run cycle up to postmortem
- Mandatory multi-sector reviewer gate added to all core document-writing workflows
- Templates/status schema enforce review sections and status review-log evidence
- Completed end-to-end framework cycle for `rave-arcade-brawler` through dev → qa → review → release → postmortem evidence
