---
description: Pipeline state machine reference — stages, transitions, and quality gates
---

# AI Office Pipeline Reference

This document describes the pipeline state machine. Stage transitions are enforced programmatically by the `ai_office_advance` MCP tool.

## Pipeline Flow

```
router → create_project → prd → adr → plan → tasks → dev → qa → review → user_acceptance → release → postmortem
                                                  ↘               ↗         ↗
                                              ux_research → design_ui ──┘
                                                  ↘
                                    audio/video/image/game_create ──→ qa
                                                  ↘
                                              security ──→ dev / qa
```

## Stage Summary

| Stage | Role | Guidance File | Key Artifacts |
|-------|------|--------------|---------------|
| `router` | Orchestrator | pipeline.md | status file |
| `create_project` | Planner | role-product.md | PRD, ADR, plan, status |
| `prd` | CEO / PM | role-product.md | PRD |
| `adr` | Architect | role-architect.md | ADR |
| `plan` | Planner | role-planner.md | macro plan |
| `tasks` | Planner | role-planner.md | task breakdown + task files |
| `ux_research` | UX Researcher | role-creative.md | research doc |
| `design_ui` | Designer | role-creative.md | design doc |
| `audio_create` | Audio Creator | role-creative.md | audio assets |
| `video_create` | Video Creator | role-creative.md | video assets |
| `image_create` | Image Creator | role-creative.md | visual assets |
| `game_create` | Game Developer | role-creative.md | game mechanics |
| `dev` | Developer | role-developer.md | implementation + tests |
| `security` | Security Engineer | role-security.md | pentest report |
| `qa` | QA Engineer | role-qa.md | test plan + results |
| `review` | Multi-sector Reviewer | role-qa.md | review checklist |
| `user_acceptance` | UAT Facilitator | role-user-acceptance.md | UAT report + sign-off |
| `release` | Release Manager | role-ops.md | changelog + release notes |
| `postmortem` | Ops | role-ops.md | learnings + memory |
| `blocked` | Planner | pipeline.md | blocked reason |

## Quality Gates

Every stage requires:
- Status file updated with current state and owner
- `## Multi-sector document review log (mandatory)` section present
- Evidence of checks recorded in status file

## Loop Guards

| Loop | Max Iterations | On Exceed |
|------|---------------|-----------|
| QA ↔ Dev | 2 | `state: blocked`, `owner: planner` |
| Review Cycle 1 ↔ Dev | 2 | `state: blocked`, `owner: planner` |
| Review Cycle 2 ↔ Dev | 1 | `state: blocked`, `owner: planner` |
| UAT ↔ Dev | 1 | `state: blocked`, `owner: planner` |

When blocked, the planner must intervene with explicit unblock criteria.

## MCP Tools

All pipeline operations are handled by MCP tools:

| Tool | Purpose |
|------|---------|
| `ai_office_route` | Entry point — analyze request, suggest stage |
| `ai_office_scaffold` | Create artifacts from templates |
| `ai_office_advance` | Move to next stage (validates transitions) |
| `ai_office_get_status` | Read pipeline status |
| `ai_office_set_status` | Update status fields |
| `ai_office_list_status` | List all statuses (all/active/blocked) |
| `ai_office_validate` | Run quality gate checks |
| `ai_office_task_create` | Create kanban task |
| `ai_office_task_move` | Move task between columns |
| `ai_office_task_list` | List tasks by column |
| `ai_office_task_count` | Count tasks per column |
| `ai_office_review` | Generate multi-sector review checklist |
| `ai_office_report` | Generate reports (status/investor/tech-debt/audit) |
| `ai_office_pipeline_info` | Get stage details and valid transitions |

## Routing Logic

| Request Type | Starting Stage | Path |
|-------------|---------------|------|
| New feature | `router` → `prd` → `adr` → `plan` → `tasks` → `dev` |
| Bug fix | `router` → `dev` → `qa` → `review` → `user_acceptance` |
| Refactor | `router` → `plan` → `tasks` → `dev` |
| Import project | `router` → `create_project` |
| Quick fix | `router` → `dev` (skip planning) |
