# Status Schema (Machine-friendly)

Required keys in `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`:

- project
- slug
- state: router|create_project|prd|adr|plan|tasks|dev|qa|review|release|postmortem|blocked
- owner: router|create_project|planner|ceo_pm|architect|dev|qa|reviewer|release|ops
- qa_iteration: integer
- review_iteration: integer
- blocked_reason: string|null
- created_at: YYYY-MM-DD
- updated_at: YYYY-MM-DD

Mandatory markdown section in every status artifact:
- `## Multi-sector document review log (mandatory)`
