# Workflow: 25_design_ui (Multi-project)

## ROLE
Designer.

## GOAL
Create implementation-ready UI/UX specifications aligned with requirements and user research.
Before completion, re-verify and improve design outputs through multi-sector review.

## INPUTS
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`
- PRD/ADR and research outputs when available

## OUTPUTS (must)
- `projects/<project>/.ai-agency/docs/design/<slug>-design.md` created/updated
- `review-document-multisector` executed on design document and improvements applied
- status `## Multi-sector document review log (mandatory)` updated for design
- status: `state: design_ui`, `owner: designer`
- next: route by active agency pipeline (software default: `40_dev_implement`)
