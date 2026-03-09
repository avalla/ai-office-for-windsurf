---
description: office-project-status
---
# Workflow: office-project-status

## ROLE
Planner + Ops

## GOAL
Provide a consolidated view of all active projects across the agency, identifying bottlenecks, resource conflicts, and priority adjustments needed.

## TRIGGER
- `/office-project-status` slash command
- User asks for agency overview
- Scheduled (weekly) status review

## OUTPUTS (must)
- Consolidated status report
- Resource conflict identification
- Priority recommendations
- Blocked items escalation

## STEPS

1. **Scan All Projects**
   - List all directories under `projects/`
   - Exclude `_skeleton/`
   - For each project, read status file if exists

2. **Extract Status Information**
   For each project:
   - Current workflow state
   - Active tasks (TODO/WIP/REVIEW counts)
   - Last activity timestamp
   - Blocked status and reason

3. **Generate Status Report**
   ```markdown
   # Agency Project Status Report
   
   **Generated:** YYYY-MM-DD HH:MM
   **Report Period:** Last 7 days
   
   ## Summary
   - **Total Projects:** N
   - **Active Projects:** N
   - **Blocked Projects:** N
   - **Completed This Period:** N
   
   ## Project Details
   
   | Project | State | Tasks | Last Activity | Status |
   |---------|-------|-------|---------------|--------|
   | <name> | <state> | TODO: N, WIP: N, REVIEW: N | <date> | ✅/⚠️/🚫 |
   
   ## Resource Conflicts
   - <description of any conflicts>
   
   ## Blocked Items
   - <project>: <reason> → <recommended action>
   
   ## Priority Recommendations
   - <recommendations based on client priority and deadlines>
   
   ## Next Actions
   - <immediate actions needed>
   ```

4. **Identify Issues**
   - Projects stuck in same state > 3 days
   - QA/Review iterations at limit
   - Resource conflicts (same agent needed)
   - Missing status files

5. **Generate Recommendations**
   - Priority rebalancing suggestions
   - Unblocking actions
   - Resource reallocation

6. **Present to User**
   - Show consolidated report
   - Highlight critical items
   - Ask for decisions on conflicts

## STATUS INDICATORS

| Indicator | Meaning |
|-----------|---------|
| ✅ | On track, no issues |
| ⚠️ | Attention needed, minor issues |
| 🚫 | Blocked, requires intervention |

## INTEGRATION
- Reads from: `projects/*/docs/runbooks/*-status.md`
- Reads from: `projects/*/.ai-agency/tasks/README.md`
- Updates: `office/reports/status-YYYY-MM-DD.md` (optional archive)

## SCHEDULE
- Manual: on demand via slash command
- Automatic: suggest weekly review

---

Created: 2026-03-09
