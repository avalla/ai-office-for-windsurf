# Quickstart — Start New Project (Multi-project)

Owner: Framework team
Date: 2026-03-04

## Goal
Enable a new team member to start and run one project end-to-end without direct support.

## Prerequisites
- Repository cloned and up to date.
- Familiarity with the workflow state machine:
  `router -> create_project -> prd -> adr -> plan -> tasks -> dev -> qa -> review -> release -> postmortem`.

## Step-by-step
1. Run workflow `00_router`:
   - It will classify the request and route to `01_create_project` for new projects.
2. Let `01_create_project` initialize the project:
   - It will create project structure and core artifacts from framework templates.
3. Pick a feature slug:
   - use a stable slug such as `feature-<domain>-<scope>`
4. Create or refine core artifacts (if needed):
   - `projects/<project>/docs/prd/<slug>.md`
   - `projects/<project>/docs/adr/<slug>.md`
   - `projects/<project>/docs/runbooks/<slug>-plan.md`
   - `projects/<project>/docs/runbooks/<slug>-tasks.md`
   - `projects/<project>/docs/runbooks/<slug>-status.md`
   - `projects/<project>/docs/qa/<slug>-testplan.md`
5. Initialize status metadata:
   - set `project`, `slug`, `state`, `owner`, `qa_iteration`, `review_iteration`, `blocked_reason`
6. For each written/updated artifact, execute `review-document-multisector` and apply improvements.
7. Update status `## Multi-sector document review log (mandatory)` for every reviewed artifact.
8. Execute workflows in order and update status at every gate.
9. Run framework structural checks before QA/release.
10. Complete release + postmortem and append learnings to `docs/decision-log.md`.

## Done criteria
- All required artifacts exist and are non-empty.
- Every artifact includes a filled `## Multi-sector review (mandatory)` section.
- Status reflects the latest workflow gate.
- Status includes `## Multi-sector document review log (mandatory)` entries for all artifacts.
- At least one QA and one review outcome are recorded.
- Release notes and postmortem learnings are persisted.

## Related documents
Primary:
- `docs/repo-graph.md`
- `architecture/system-overview.md`

Secondary (open only when needed):
- `docs/runbooks/start-new-project-operational-checklist.md`
- `docs/beta-operational-roadmap.md`
- `docs/beta-residual-risks.md`
- `docs/decision-log.md`
