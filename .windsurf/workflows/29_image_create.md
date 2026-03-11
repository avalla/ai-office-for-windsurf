# Workflow: 29_image_create (Multi-project)

## ROLE
Image Creator.

## GOAL
Create optimized image assets with usage guidance for implementation and distribution.
Before completion, re-verify and improve image documentation through multi-sector review.

## INPUTS
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`
- Design requirements or creative brief

## OUTPUTS (must)
- `projects/<project>/.ai-agency/docs/creative/<slug>-images.md` created/updated
- `review-document-multisector` executed on image document and improvements applied
- status `## Multi-sector document review log (mandatory)` updated for image assets
- status: `state: image_create`, `owner: image_creator`
- next: route by active agency pipeline (`27_video_create`, `28_game_create`, or `50_qa_validate`)
