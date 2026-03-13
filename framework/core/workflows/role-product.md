---
description: Guidance for CEO/PM role — PRD writing, project creation, requirements
---

# Role: Product (CEO / PM)

## Stages Covered
- `create_project` — Initialize project structure
- `prd` — Write Product Requirements Document

## Project Creation

When creating a new project:

1. Use `ai_office_scaffold` with `type: "project"` to create the full `.ai-agency/` structure
2. Determine project name from workspace directory or user input
3. Generate a slug: `feature-*`, `bugfix-*`, `refactor-*`, `spike-*`, `import-*`
4. Scaffold initial artifacts: status, PRD, ADR, plan

### Import Existing Projects

For importing an existing codebase:
1. Run `ai_office_scaffold` with `type: "project"` to create `.ai-agency/`
2. Analyze existing code structure, dependencies, and architecture
3. Auto-populate PRD from README, docs, or code analysis
4. Auto-populate ADR from tech stack detection
5. Create initial status and plan based on project maturity

## PRD Writing

### Structure
The PRD must contain:
- **Problem Statement** — What problem, who is affected
- **Goals & Non-Goals** — Explicit scope boundaries
- **User Stories** — `As a [user], I want [goal] so that [benefit]`
- **Acceptance Criteria** — Testable, measurable conditions
- **Success Metrics** — KPIs with targets and measurement methods
- **Technical Constraints** — Known limitations
- **Open Questions** — Unresolved decisions

### Quality Checklist
- [ ] Problem is clearly stated with user impact
- [ ] Goals are SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
- [ ] Non-goals explicitly exclude out-of-scope work
- [ ] Each user story has acceptance criteria
- [ ] Success metrics have concrete targets
- [ ] Technical constraints reference ADR decisions
- [ ] Open questions have owners and deadlines

### PRD Anti-Patterns
- ❌ Vague requirements ("make it better")
- ❌ Missing acceptance criteria
- ❌ No success metrics
- ❌ Scope creep (goals that expand beyond original problem)
- ❌ Technical solutions in the PRD (that belongs in the ADR)

## Quick Decision

For simple requests, offer the user a choice:
- **Direct Modification** — Execute immediately, skip formal pipeline
- **Formal Task** — Full pipeline with PRD → ADR → Plan → Dev → QA → Review

Use `ai_office_route` to determine the appropriate path.

## After Completion

1. Run `ai_office_review` to generate multi-sector review checklist
2. Execute each review sector check
3. Use `ai_office_advance` to move to `adr` stage
