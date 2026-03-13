# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added
- Initial AI Office- **Framework Structure**: Moved from projects/ to .ai-office/ at project root readiness (`docs/beta-operational-roadmap.md`)
- Demo project `projects/marketplace-lite` with PRD/ADR/Plan/Tasks/Status/QA artifacts
- Framework and project repo graphs for artifact/state-machine visibility
- Onboarding runbooks:
  - `docs/runbooks/start-new-project-quickstart.md`
  - `docs/runbooks/start-new-project-operational-checklist.md`
- Residual risk report for beta operations (`docs/beta-residual-risks.md`)
- **Installation**: `bin/ai-office init` installs .ai-office/ in project view
- Multi-sector document review skill (`.ai-office/skills/review-document-multisector.md`)

### Changed
- Multi-project contract alignment across CONTRIBUTING, skills, and status schema/template
- Framework CI strengthened with non-empty skills and status schema/template consistency checks
- Demo project status advanced through a full dry-run cycle up to postmortem
- Mandatory multi-sector reviewer gate added to all core document-writing workflows
- Templates/status schema enforce review sections and status review-log evidence
