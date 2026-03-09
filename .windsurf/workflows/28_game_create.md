# Workflow: 28_game_create (Multi-project)

## ROLE
Game Developer.

## GOAL
Implement and integrate game systems and assets into a playable build.
Before completion, re-verify and improve game technical notes through multi-sector review.

## INPUTS
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`
- Game PRD/ADR/task breakdown
- Optional audio/image/design deliverables

## OUTPUTS (must)
- `projects/<project>/.ai-agency/docs/game/<slug>-implementation.md` created/updated
- `review-document-multisector` executed on game implementation notes and improvements applied
- status `## Multi-sector document review log (mandatory)` updated for game implementation
- status: `state: game_create`, `owner: game_developer`
- next: `50_qa_validate`
