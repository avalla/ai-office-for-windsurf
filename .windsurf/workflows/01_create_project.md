# Workflow: 01_create_project (Multi-project)

## ROLE

Project initializer / Orchestrator.

## GOAL

Create a new project from skeleton, ask user for missing details, initialize all core artifacts, and enforce a
multi-sector review baseline.

## OUTPUTS (must)

- `projects/<project>/` created from skeleton
- `projects/<project>/.ai-agency/docs/prd/<slug>.md` created (may be placeholder)
- `projects/<project>/.ai-agency/docs/adr/<slug>.md` created (may be placeholder)
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-plan.md` created (may be placeholder)
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-tasks.md` created (may be placeholder)
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md` created and initialized
- `projects/<project>/.ai-agency/docs/qa/<slug>-testplan.md` created (may be placeholder)
- all created artifacts include the mandatory review section (`## Multi-sector review (mandatory)` for PRD/ADR/plan/tasks/QA, and `## Multi-sector document review log (mandatory)` for status)
- status: `state: create_project`, `owner: create_project`
- next: `10_ceo_prd` (to start the feature workflow)

## STEPS

1) Validate project name:
    - Ask user if the project name is clear.
    - Suggest format: `<domain>-<type>` (e.g., `marketplace-lite`, `auth-service`).
    - If unclear, ask for a short description to derive a name.

2) Confirm project scope:
    - Ask: "Is this a new standalone project or a feature within an existing project?"
    - If feature within existing, ask for the target project name.

3) Create project folder:
    - If `projects/<project>/` does not exist, copy from `projects/_skeleton/`.
    - **Create task directories**: `projects/<project>/.ai-agency/tasks/BACKLOG/`, `TODO/`, `WIP/`, `REVIEW/`,
      `REJECTED/`, `DONE/`, `ARCHIVED/`
    - Create `projects/<project>/.ai-agency/tasks/README.md` with task count template
    - If it exists, ask: "Project already exists. Continue with existing project or choose a different name?"

4) Determine initial slug:
    - If user provided a feature/bug description, generate a slug:
        - `feature-<domain>-<scope>` for features
        - `bugfix-<area>-<issue>` for bugfixes
        - `refactor-<area>-<goal>` for refactors
        - `spike-<topic>-investigation` for spikes
    - If unclear, ask for a short one-line description to generate slug.

5) Create core artifacts (may be placeholders):
    - Create status file from `projects/_skeleton/.ai-agency/docs/runbooks/STATUS_TEMPLATE.md`.
    - Set `project`, `slug`, `state: create_project`, `owner: create_project`, current date.
    - Create placeholder PRD/ADR/plan/tasks/QA from templates if they exist.
    - If templates are missing, create minimal placeholder files with clear TODO sections.
    - Run `review-document-multisector` on each created artifact and apply improvements immediately.

6) Initialize status metadata:
    - Set `qa_iteration: 0`, `review_iteration: 0`, `blocked_reason: null`.
    - Add a brief request summary based on user input.
    - Populate `## Multi-sector document review log (mandatory)` for each initialized artifact.
    - Set next action to `10_ceo_prd`.

7) Confirm with user:
    - Show created file paths.
    - Ask: "Project initialized. Ready to start with PRD (CEO/PM) workflow?"
    - If user wants to modify anything before proceeding, allow edits.

## INTERACTIVE PROMPTS (use when needed)

- "Project name not provided. Please specify a project name (e.g., 'marketplace-lite')."
- "Project '<project>' already exists. Use existing project or choose a different name?"
- "Slug not clear from description. Please provide a one-line summary to generate the slug."
- "No feature/bug description provided. Is this a new project setup or a specific feature/bug?"
- "Templates missing for some artifacts. Created placeholders with TODO sections. Continue?"

## ERROR HANDLING

- If skeleton copy fails: report error and ask user to check permissions.
- If project already exists and user chooses different name: restart from step 1.
- If status file creation fails: report error and retry.

## DONE CRITERIA

- Project directory exists with required subfolders.
- All core artifact files exist (even if placeholders).
- Every created artifact has a filled multi-sector review section.
- Status file is properly initialized with metadata.
- User confirms readiness to proceed to next workflow.
