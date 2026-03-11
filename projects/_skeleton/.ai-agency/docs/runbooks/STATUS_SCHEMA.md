# Status Schema (Machine-friendly)

Required keys in `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`:

- project
- slug
- state: router|create_project|prd|adr|plan|tasks|ux_research|design_ui|dev|audio_create|video_create|image_create|game_create|security|qa|review|release|postmortem|blocked
- owner: router|create_project|planner|ceo_pm|architect|ux_researcher|designer|dev|audio_creator|video_creator|image_creator|game_developer|security|qa|reviewer|release|ops
- qa_iteration: integer
- review_iteration: integer
- blocked_reason: string|null
- created_at: YYYY-MM-DD
- updated_at: YYYY-MM-DD

Mandatory markdown section in every status artifact:
- `## Multi-sector document review log (mandatory)`
