---
description: Import existing project into the .ai-agency framework
---

# Import Project

Use MCP tools to bring an existing project into the AI Office framework.

## Steps

1. Call `ai_office_route` with the import request
2. Call `ai_office_scaffold` with `type: "project"` to create `.ai-agency/` structure
3. Analyze the existing codebase:
   - Scan `package.json`, `requirements.txt`, `pom.xml`, etc. for tech stack
   - Read `README.md` and existing docs to populate PRD
   - Detect architecture patterns for ADR
   - Find TODO comments or issue tracking for initial tasks
4. Auto-populate scaffolded artifacts with detected information
5. Call `ai_office_review` on all artifacts
6. Call `ai_office_advance` based on project maturity:
   - **New** → `prd` (needs full requirements)
   - **Mature** → `plan` (needs planning)
   - **Active** → `dev` (ready to work)

## Project Type Detection

| Type | Signals |
|------|---------|
| Website | `index.html`, frontend deps in `package.json` |
| API | Server files, database config, API endpoints |
| Mobile | React Native, Flutter, native mobile files |
| Library | `"main"` in `package.json`, no UI components |
| Monorepo | Multiple packages, workspace config |

## Usage

Say "import this project" or use `/import-project`.

## See Also
- `create-project.md` — New project creation
- `role-product.md` — PRD writing guidance
