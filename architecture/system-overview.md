# System Overview (AI Office Framework)

Date: 2026-03-04
Owner: Framework team

## Purpose
AI Office provides a documentation-first orchestration framework for multi-role software delivery in Antigravity.
It is designed to standardize planning, execution, QA, review, release, and postmortem across multiple projects.

## System context

```text
User Intent
   |
   v
Workflow Router (.agents/workflows)
   |
   +-- Project Workflows --> Role-specific execution via Skills --> Project Artifacts
   |                              |
   |                              v
   |                         Quality Gates --> Release Evidence + Postmortem
   |
   +-- Agency Workflows --> Office Operations (office/)
                                  |
                                  v
                             Client Management, Reports, Meetings
```

## Agency Operations Layer

The framework now includes an **Agency Operations** layer for managing the virtual AI agency:

- **Configuration:** `.agents/office-config.md` defines agents, roles, competencies
- **Operations Directory:** `office/` stores client profiles, meeting archives, reports
- **Workflows:** Client onboarding, project status, agent meetings, reporting

This enables the framework to operate as a complete virtual software agency, not just a project development tool.

## Core execution flow

1. Router identifies the path (`feature` or `bugfix/refactor/spike`).
2. For new project requests, router transitions through `create_project` before feature execution.
3. Required artifacts are produced in project scope (`PRD`, `ADR`, `Plan`, `Tasks`, `Status`, `QA`).
4. Every written/updated artifact is re-verified via `review-document-multisector` and logged in status.
5. Ownership transitions by state machine:
   `router -> create_project -> prd -> adr -> plan -> tasks -> dev -> qa -> review -> release -> postmortem`.
6. Iteration caps (`qa_iteration`, `review_iteration`) control reliability loops.
7. CI and structural checks validate framework integrity and artifact contract compliance.

## Data and artifact boundaries

- Framework-wide knowledge is stored in `docs/`.
- Project-specific decisions and execution evidence are stored in `projects/<project>/.ai-agency/docs/`.
- Reusable conventions and constraints are stored in `.agents/rules`, `.agents/policies`, and `.agents/templates`.

## Non-functional priorities

- Reliability: explicit state transitions and bounded QA/Review loops.
- Traceability: status files record command evidence and PASS/FAIL outcomes.
- Reproducibility: standardized artifact templates and skeleton-based project bootstrap.
- Governance: CI checks for structural drift and empty mandatory artifacts.
- Quality assurance by construction: mandatory multi-sector reviewer gate for each artifact.

## Current gaps and recommendations

- Gap: framework architecture docs were previously empty, reducing onboarding clarity.
- Gap: advanced workflows may still reference product-code structures not available in framework-only repositories.

Recommended next actions:
1. Keep this overview aligned with workflow/rule changes.
2. Add a per-project `architecture/system-overview.md` during project bootstrap.
3. Extend CI with markdown linting for documentation consistency.
