---
description: Guidance for office operations — reports, client onboarding, meetings, audits (headquarters mode)
---

# Office Operations

These operations are primarily for **headquarters mode** (agency-level management across multiple projects). They can also be used in single-project mode for reporting.

All report generation is handled by the `ai_office_report` MCP tool.

---

## Reports

### Project Status Report
Use `ai_office_report` with `type: "status"` to generate a project overview including:
- Pipeline status for all features
- Task board counts
- Active/blocked feature summary

### Investor Report
Use `ai_office_report` with `type: "investor"` to generate a stakeholder report including:
- Executive summary
- Progress overview (completed/in-progress/blocked)
- Feature details with current stage
- Blockers section
- Roadmap and risks placeholders

For a detailed investor report with git analysis, also run:
```bash
git log --oneline --since="2 weeks ago" --no-merges --stat
```

Populate the report with:
| Section | Source |
|---------|--------|
| Progress | Status files via `ai_office_list_status` |
| Roadmap | `.ai-agency/docs/runbooks/<slug>-plan.md` |
| Work detail | `git log` output |
| Technical status | Count files in project directories |
| Issues | Status files with `blocked` state |
| Next steps | Plan documents |

### Tech Debt Assessment
Use `ai_office_report` with `type: "tech-debt"` to generate an assessment template covering:
- Code quality (linter, TODOs, large files, duplication)
- Testing (coverage, untested paths, flaky tests)
- Architecture (ADR compliance, circular deps, god modules)
- Security (dependency vulns, hardcoded secrets, auth patterns)
- Performance (N+1 queries, bundle size, lazy loading)

### Comprehensive Audit
Use `ai_office_report` with `type: "audit"` to generate a framework + project audit covering:
- Framework integrity (all `.ai-office/` components present)
- Project artifacts inventory
- Pipeline status for all features

---

## Client Onboarding

For onboarding a new client project in headquarters mode:

1. Create client directory in `office/clients/<client-name>/`
2. Document client information:
   - Contact details
   - Project scope and requirements
   - Budget and timeline constraints
3. Initialize project: `bin/ai-office init /path/to/client-project`
4. Run `ai_office_route` with the initial request
5. Follow standard pipeline for project creation

### Client Directory Structure
```
office/clients/<client-name>/
├── README.md          # Client overview
├── contracts/         # Agreements
├── meetings/          # Meeting notes
└── reports/           # Client-specific reports
```

---

## Agent Meetings

For structured decision-making sessions:

1. Define the topic and participants (agent roles)
2. Each agent provides perspective from their domain
3. Record decisions in `.ai-agency/docs/adr/` or `docs/decision-log.md`
4. Assign action items with owners

### Meeting Template
```markdown
# Meeting — <topic>

**Date:** YYYY-MM-DD
**Participants:** <agent roles>
**Decision needed:** <question>

## Perspectives
### Product
- ...

### Architecture
- ...

### Security
- ...

## Decision
- ...

## Action Items
| Action | Owner | Due |
|--------|-------|-----|
| ... | ... | ... |
```

---

## Quick Decision

For lightweight decisions that don't need a full meeting:

1. State the question clearly
2. List options with pros/cons
3. Record decision and rationale
4. Append to `docs/decision-log.md`

---

## Recommended Report Frequency

| Report | Frequency | Audience |
|--------|-----------|----------|
| Status | Weekly | Team |
| Investor | Biweekly | Stakeholders |
| Tech Debt | Monthly | Engineering |
| Audit | Quarterly | All |
