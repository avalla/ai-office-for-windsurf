# Status Schema for .ai-agency Metaframework

## Command Discovery Reference

**Essential Commands for Status Management:**

```bash
# Check current project status
bun .ai-agency/cli.js report summary

# List tasks by state
bun .ai-agency/cli.js task-manager list
bun .ai-agency/cli.js task-manager list REVIEW

# Validate workflow integrity
bun .ai-agency/cli.js task-manager validate

# Check review queue and testing status
bun .ai-agency/cli.js review-tester queue
bun .ai-agency/cli.js review-tester test-all
```

## Task Status Schema

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
