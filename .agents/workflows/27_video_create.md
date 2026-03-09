---
description: 27_video_create (Multi-project)
---
# Workflow: 27_video_create (Multi-project)

## ROLE
Video Creator.

## GOAL
Produce delivery-ready video assets with clear technical and content specifications.
Before completion, re-verify and improve video documentation through multi-sector review.

## INPUTS
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`
- Creative brief, design assets, and optional audio inputs

## OUTPUTS (must)
- `projects/<project>/.ai-agency/docs/creative/<slug>-video.md` created/updated
- `review-document-multisector` executed on video document and improvements applied
- status `## Multi-sector document review log (mandatory)` updated for video
- status: `state: video_create`, `owner: video_creator`
- next: route by active agency pipeline (`50_qa_validate` or downstream creative integration)
