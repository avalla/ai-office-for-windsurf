---
description: office-agent-meeting
---
# Workflow: office-agent-meeting

## ROLE
All Agents (orchestrated by Router)

## GOAL
Simulate a virtual meeting between agents to discuss cross-cutting concerns, resolve conflicts, or make collaborative decisions.

## TRIGGER
- `/office-agent-meeting` slash command
- User requests agent discussion
- Workflow escalation triggers meeting

## OUTPUTS (must)
- Meeting summary
- Decisions made
- Action items with owners

## MEETING TYPES

### 1. Planning Meeting
**Participants:** CEO, PM, Architect, Planner
**Purpose:** Project planning, scope decisions, timeline adjustments

### 2. Technical Review
**Participants:** Architect, Developer, Security, QA
**Purpose:** Architecture decisions, technical debt, security concerns

### 3. Quality Gate
**Participants:** QA, Reviewer, Developer
**Purpose:** Release readiness, quality issues, test failures

### 4. Retrospective
**Participants:** All agents
**Purpose:** Process improvement, lessons learned, team feedback

### 5. Escalation
**Participants:** CEO, relevant agents
**Purpose:** Resolve blocked items, resource conflicts, priority disputes

## STEPS

1. **Determine Meeting Type**
   - Ask user for meeting purpose
   - Or infer from current context (blocked items, etc.)
   - Select appropriate participants

2. **Gather Context**
   - Read relevant status files
   - Read recent decision logs
   - Identify open questions

3. **Simulate Discussion**
   Each agent contributes based on their role:
   
   ```
   ## Meeting: <Type>
   **Date:** YYYY-MM-DD
   **Participants:** <agents>
   
   ### Agenda
   1. <item 1>
   2. <item 2>
   
   ### Discussion
   
   **CEO:** <perspective>
   **Architect:** <perspective>
   **Developer:** <perspective>
   **QA:** <perspective>
   [... other participants]
   
   ### Decisions
   - <decision 1> (approved by: <agents>)
   - <decision 2> (approved by: <agents>)
   
   ### Action Items
   - [ ] <action> - Owner: <agent> - Due: <date>
   - [ ] <action> - Owner: <agent> - Due: <date>
   
   ### Next Meeting
   - <when/if needed>
   ```

4. **Present to User**
   - Show meeting summary
   - Highlight decisions requiring user approval
   - Confirm action items

5. **Record Outcomes**
   - Update relevant status files
   - Log decisions in decision-log.md
   - Create tasks for action items

## AGENT PARTICIPATION PATTERNS

| Agent | Typical Contributions |
|-------|----------------------|
| **CEO** | Strategic direction, business impact, final decisions |
| **PM** | User needs, requirements, scope |
| **Architect** | Technical feasibility, architecture impact |
| **Developer** | Implementation details, effort estimates |
| **Security** | Risk assessment, security implications |
| **QA** | Quality concerns, test coverage |
| **Reviewer** | Standards compliance, code quality |
| **Planner** | Timeline, resource allocation |
| **Ops** | Process improvements, operational concerns |

## ESCALATION PROTOCOL
If meeting cannot resolve:
1. Document disagreement
2. Present options to user
3. User makes final decision
4. Record decision and rationale

## ARCHIVE
Meetings are archived in: `office/meetings/YYYY-MM-DD-<topic>.md`

---

Created: 2026-03-09
