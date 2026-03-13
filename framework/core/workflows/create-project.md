---
description: Create a new project using the framework workflow
---

# Create Project

Use MCP tools to create or import a project.

## New Project

1. Call `ai_office_route` with the user's request
2. Call `ai_office_scaffold` with `type: "project"` — creates full `.ai-agency/` structure with status, PRD, ADR, plan
3. Call `ai_office_review` to run multi-sector review on scaffolded artifacts
4. Call `ai_office_advance` to move to `prd` stage
5. Follow guidance in `role-product.md`

## Import Existing Project

1. Call `ai_office_route` with the import request
2. Call `ai_office_scaffold` with `type: "project"` to create `.ai-agency/`
3. Analyze existing code, README, package.json to auto-populate PRD and ADR
4. Call `ai_office_advance` based on project maturity:
   - **New** → `prd` (full pipeline)
   - **Mature** → `plan` (planning focus)
   - **Active** → `dev` (implementation focus)

## Usage

Say "create a new project" or "import this project" — the MCP tools handle the rest.

## See Also
- `pipeline.md` — Full pipeline reference
- `role-product.md` — PRD writing guidance
