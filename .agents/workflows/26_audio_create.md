---
description: 26_audio_create (Multi-project)
---
# Workflow: 26_audio_create (Multi-project)

## ROLE
Audio Creator.

## GOAL
Produce audio assets ready for integration across product, media, or game contexts.
Before completion, re-verify and improve audio documentation through multi-sector review.

## INPUTS
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`
- Creative/design requirements from PRD or design docs

## OUTPUTS (must)
- `projects/<project>/.ai-agency/docs/creative/<slug>-audio.md` created/updated
- `review-document-multisector` executed on audio document and improvements applied
- status `## Multi-sector document review log (mandatory)` updated for audio
- status: `state: audio_create`, `owner: audio_creator`
- next: route by active agency pipeline (`27_video_create`, `28_game_create`, or `50_qa_validate`)
