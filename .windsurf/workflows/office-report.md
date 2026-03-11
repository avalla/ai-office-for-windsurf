# Workflow: office-report

## ROLE
Ops + CEO

## GOAL
Generate comprehensive reports for agency operations: weekly summaries, client reports, investor updates, or custom analytics.

## TRIGGER
- `/office-report` slash command
- User requests agency report
- Scheduled reporting (weekly/monthly)

## OUTPUTS (must)
- Formatted report in requested format
- Key metrics and insights
- Actionable recommendations

## REPORT TYPES

### 1. Weekly Summary
**Audience:** Internal
**Content:** Activity summary, completed tasks, blockers, next week priorities

### 2. Client Report
**Audience:** Client
**Content:** Project progress, deliverables, timeline, issues, next steps

### 3. Investor Report
**Audience:** External stakeholders
**Content:** High-level progress, milestones, risks, roadmap (uses `/office-investor-report`)

### 4. Technical Debt Report
**Audience:** Internal technical
**Content:** Code quality metrics, test coverage, security findings, refactoring needs

### 5. Resource Utilization
**Audience:** Internal management
**Content:** Agent workload, project distribution, capacity analysis

## STEPS

1. **Determine Report Type**
   - Ask user for report type and audience
   - Identify time period to cover
   - Select projects to include

2. **Gather Data**
   Based on report type:
   - Read status files from projects
   - Read task READMEs for counts
   - Read decision logs for key decisions
   - Read postmortems for learnings

3. **Generate Report**

   #### Weekly Summary Template
   ```markdown
   # Weekly Agency Summary

   **Period:** YYYY-MM-DD to YYYY-MM-DD

   ## Overview
   - **Projects Active:** N
   - **Tasks Completed:** N
   - **Tasks In Progress:** N
   - **Blockers Resolved:** N

   ## Highlights
   - <key accomplishment 1>
   - <key accomplishment 2>

   ## Project Updates
   ### <Project 1>
   - Status: <state>
   - Progress: <description>
   - Next: <upcoming work>

   ## Blockers & Issues
   - <blocker 1>: <status/resolution>

   ## Next Week Priorities
   1. <priority 1>
   2. <priority 2>
   ```

   #### Client Report Template
   ```markdown
   # Project Report: <Project Name>

   **Client:** <client>
   **Period:** YYYY-MM-DD to YYYY-MM-DD
   **Report Date:** YYYY-MM-DD

   ## Executive Summary
   <2-3 sentence overview>

   ## Progress This Period
   - ✅ <completed item 1>
   - ✅ <completed item 2>
   - 🔄 <in progress item>

   ## Upcoming Deliverables
   - <deliverable 1> - Expected: <date>
   - <deliverable 2> - Expected: <date>

   ## Timeline Status
   - **Overall:** On Track / At Risk / Behind
   - **Notes:** <explanation if not on track>

   ## Issues & Risks
   - <issue>: <mitigation>

   ## Next Steps
   1. <next step 1>
   2. <next step 2>

   ## Questions for Client
   - <question 1>
   ```

4. **Add Analytics** (if applicable)
   - Velocity trends
   - Quality metrics
   - Time in each workflow state

5. **Present to User**
   - Show report preview
   - Offer to save to `office/reports/`
   - Offer to export in different format

## REPORT ARCHIVE
```
office/
├── reports/
│   ├── weekly/
│   │   └── YYYY-MM-DD-weekly-summary.md
│   ├── clients/
│   │   └── <client-slug>/
│   │       └── YYYY-MM-DD-<project>-report.md
│   └── technical/
│       └── YYYY-MM-DD-tech-debt.md
```

## SCHEDULE
- Weekly Summary: Every Monday (manual trigger)
- Client Reports: Per agreement with client
- Investor Report: Monthly/quarterly (via `/office-investor-report`)

---

Created: 2026-03-09
