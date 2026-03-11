---
trigger: always_on
priority: 100
---

# MCP Adapter Usage Rule

**CRITICAL: The IDE MUST use the AI Office MCP adapter tools for all framework operations.**

## Mandatory Tool Usage

When working within an AI Office project (indicated by presence of `.ai-office/` directory), the IDE **MUST** use these MCP tools instead of manual file operations:

| Operation | MCP Tool | Manual Alternative |
|-----------|----------|-------------------|
| Route requests | `ai_office_route` | ❌ Forbidden |
| Get/set status | `ai_office_get_status`, `ai_office_set_status` | ❌ Forbidden |
| List status files | `ai_office_list_status` | ❌ Forbidden |
| Advance pipeline | `ai_office_advance` | ❌ Forbidden |
| Scaffold artifacts | `ai_office_scaffold` | ❌ Forbidden |
| Validate gates | `ai_office_validate` | ❌ Forbidden |
| Create tasks | `ai_office_task_create` | ❌ Forbidden |
| Move tasks | `ai_office_task_move` | ❌ Forbidden |
| List tasks | `ai_office_task_list` | ❌ Forbidden |
| Count tasks | `ai_office_task_count` | ❌ Forbidden |
| Review documents | `ai_office_review` | ❌ Forbidden |
| Generate reports | `ai_office_report` | ❌ Forbidden |
| Pipeline info | `ai_office_pipeline_info` | ❌ Forbidden |

## Resources Access

Access framework resources via MCP resource URIs:

- `ai-office://pipeline` - Pipeline configuration
- `ai-office://status/{slug}` - Project/feature status
- `ai-office://tasks/{column}` - Task board columns
- `ai-office://team` - Team configuration
- `ai-office://agencies/{name}` - Agency configs
- `ai-office://docs/{doc}` - Documentation

**Do NOT read these files directly from filesystem. Use MCP resources.**

## Workflow Integration

1. **Every new request** → Start with `ai_office_route`
2. **Before any code change** → Check `ai_office_get_status`
3. **After completing work** → Call `ai_office_advance` with evidence
4. **Quality verification** → Use `ai_office_validate` then `ai_office_review`

## Rationale

Using MCP tools ensures:
- Consistent artifact format and location
- Automatic logging and audit trail
- Pipeline state integrity
- Cross-session continuity
- Proper evidence recording

**This rule has priority 100 and overrides any conflicting instructions.**
