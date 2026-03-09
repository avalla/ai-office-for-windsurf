---
description: 22_ux_research (Multi-project)
---
# Workflow: 22_ux_research (Multi-project)

## ROLE
UX Researcher.

## GOAL
Conduct user research before design/implementation to reduce product risk.
Before completion, re-verify and improve research outputs through multi-sector review.

## INPUTS
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`
- PRD/ADR when available
- Existing user feedback or analytics (if available)

## OUTPUTS (must)
- `projects/<project>/.ai-agency/docs/research/<slug>-research.md` created/updated
- `review-document-multisector` executed on research document and improvements applied
- status `## Multi-sector document review log (mandatory)` updated for research
- status: `state: ux_research`, `owner: ux_researcher`
- next: `25_design_ui`
