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
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md` created/updated
- `review-document-multisector` applied to the status artifact and logged
- state set to `router`
- next workflow selected
- `COMPANY_STATUS.md` updated with new project entry (if new project)

## STEPS

1) **Quick Decision Check**:
    - Invoke `office-quick-decision` once for the current request (unless a decision is already captured).
    - Let the user choose between "Direct Modification" vs "Formal Task".
    - If the user chooses "Formal Task" → continue with step 2 in the same `00_router` execution.
    - If the user chooses "Direct Modification" → execute immediately and exit the formal workflow.

2) **For Formal Tasks Only**:
   Determine request type:
    - Check for --import flag or import keywords
    - If import request → route to `01_import_project`
    - Else proceed with project creation workflow

3) For Import Requests:
    - Ask for existing project path if not provided
    - Validate project directory exists
    - Check if .ai-agency already exists
    - Generate project name from directory if not provided
    - Route to `01_import_project`

4) For New Project Requests:
    - Determine project name (user specified or default to `default`)
    - Check if project exists in projects/ directory
    - If `projects/<project>/` missing → route to `01_create_project`
    - If project exists but empty/incomplete → route to `01_create_project`
    - If project exists and ready → continue to step 5

5) Summarize request (3–7 bullets).
6) Create slug: `feature-*`, `bugfix-*`, `refactor-*`, `spike-*`, `import-*`.
7) Create status file from `projects/_skeleton/.ai-agency/docs/runbooks/STATUS_TEMPLATE.md`.
8) Run `review-document-multisector` on the status artifact and record result in
   `## Multi-sector document review log (mandatory)`.

9) **Update Company Status**:
    - If new project created, add entry to `COMPANY_STATUS.md` Project Details table
    - Update the Update Log with current date and action

10) Route (enterprise feature path):
- import → `01_import_project` → (dynamic routing based on project maturity)
- feature → `10_ceo_prd` → `20_arch_adr` → `05_planner` → `30_plan_tasks`
- bugfix/refactor/spike → `05_planner` → `30_plan_tasks`
