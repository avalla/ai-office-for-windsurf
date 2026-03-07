# Workflow: 00_router (Multi-project)

## ROLE
Orchestrator.

## GOAL
Classify request, select **project**, generate slug, initialize status, route to next workflow.
If project does not exist or needs full initialization, route to `01_create_project`.
Every status artifact created/updated by router must include a multi-sector review baseline.

## OUTPUTS (must)
- project
- slug
- `projects/<project>/docs/runbooks/<slug>-status.md` created/updated
- `review-document-multisector` applied to the status artifact and logged
- state set to `router`
- next workflow selected

## STEPS
1) Determine request type:
   - Check for --import flag or import keywords
   - If import request → route to `01_import_project`
   - Else proceed with project creation workflow

2) For Import Requests:
   - Ask for existing project path if not provided
   - Validate project directory exists
   - Check if .ai-agency already exists
   - Generate project name from directory if not provided
   - Route to `01_import_project`

3) For New Project Requests:
   - Determine project name (user specified or default to `default`)
   - Check if project exists in projects/ directory
   - If `projects/<project>/` missing → route to `01_create_project`
   - If project exists but empty/incomplete → route to `01_create_project`
   - If project exists and ready → continue to step 4

4) Summarize request (3–7 bullets).
5) Create slug: `feature-*`, `bugfix-*`, `refactor-*`, `spike-*`, `import-*`.
6) Create status file from `projects/_skeleton/docs/runbooks/STATUS_TEMPLATE.md`.
7) Run `review-document-multisector` on the status artifact and record result in
   `## Multi-sector document review log (mandatory)`.

8) Route (enterprise feature path):
   - import → `01_import_project` → (dynamic routing based on project maturity)
   - feature → `10_ceo_prd` → `20_arch_adr` → `05_planner` → `30_plan_tasks`
   - bugfix/refactor/spike → `05_planner` → `30_plan_tasks`
