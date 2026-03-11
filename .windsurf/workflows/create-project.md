---
description: Create a new project using the framework workflow
---

Follow the strict framework workflow to create a new project:

## For NEW Projects (from scratch):

1. **Always start with 00_router workflow**
   - The router will detect this is a new project request
   - It will automatically route to 01_create_project
   - Never create projects directly without workflow orchestration

2. **Router will:**
   - Ask for project name if unclear
   - Generate appropriate slug
   - Check if project exists
   - Route to 01_create_project if needed

3. **01_create_project will:**
   - Create project folder from skeleton
   - Initialize all core artifacts (PRD/ADR/plan/tasks/QA/status)
   - Run `review-document-multisector` on every initialized artifact
   - Ask for missing details interactively
   - Set up initial status metadata
   - Update status `## Multi-sector document review log (mandatory)`

4. **Then follow the full workflow:**
   - PRD (CEO/PM) → ADR (Architect) → Plan → Tasks → Dev → QA → Review → Release → Postmortem

## For EXISTING Projects (import):

1. **Start with 00_router workflow with --import flag**
   - The router will detect this is an import request
   - It will automatically route to 01_import_project
   - Never import projects directly without workflow orchestration

2. **Router will:**
   - Ask for existing project path if unclear
   - Generate appropriate slug based on project folder name
   - Check if project already has .ai-agency folder
   - Route to 01_import_project if import is needed

3. **01_import_project will:**
   - Analyze existing project structure and files
   - Detect project type and technology stack
   - Identify existing documentation and tasks
   - Create .ai-agency folder structure in existing project
   - Import existing content into framework format
   - Map existing team members to framework teams
   - Generate import report with gaps and recommendations

4. **Dynamic routing based on project maturity:**
   - **New project** → `10_ceo_prd` (full workflow)
   - **Mature project** → `05_planner` (planning focus)
   - **Active project** → `30_plan_tasks` (task focus)
   - **Complex project** → `20_arch_adr` (architecture focus)

## Usage

### Create New Project:
```bash
/00_router --project="my-new-website"
```

### Import Existing Project:
```bash
/00_router --import --path="/path/to/existing/project"
/00_router --import --path="/path/to/project" --name="custom-name"
```

### Import Options:
- **--analyze-only**: Just analyze, don't modify files
- **--dry-run**: Show what would be imported
- **--force**: Import even if .ai-agency exists
- **--preserve-tasks**: Keep existing task IDs
- **--team-map**: Custom team mapping file
Simply say "I want to create a new project [name]" or use this slash command. The router will handle the rest.

## Important
- Never bypass the router
- Never create project folders manually
- Always follow the workflow state machine
- All artifacts must be created through workflows
- Every written/updated artifact must include the required review section (`## Multi-sector review (mandatory)` for PRD/ADR/plan/tasks/QA, and `## Multi-sector document review log (mandatory)` for status files)
