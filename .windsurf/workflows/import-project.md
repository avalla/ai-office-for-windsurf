---
description: Import existing project into the .ai-agency framework
---

Follow the import workflow to bring existing projects into the structured framework:

1. **Start with 00_router workflow**
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
   - Detect project type (website, api, mobile, library)
   - Identify existing documentation and configuration
   - Create .ai-agency folder structure in existing project
   - Initialize core artifacts based on existing project state
   - Import existing tasks if any task tracking found
   - Map existing team members to framework teams
   - Run `review-document-multisector` on all imported artifacts
   - Generate import report with gaps and recommendations

4. **Project Analysis Steps:**
   - Scan for package.json, requirements.txt, pom.xml, etc.
   - Identify technology stack and team assignments
   - Detect existing docs (README, CONTRIBUTING, etc.)
   - Find any existing issue tracking or task files
   - Analyze git history for team activity patterns

5. **Artifact Generation:**
   - Create PRD based on existing project description
   - Generate ADRs for architectural decisions found in code
   - Create initial task list from TODO comments or issues
   - Set up QA plan based on existing tests
   - Initialize status with current project state

6. **Then follow the full workflow:**
   - PRD review → ADR review → Plan refinement → Tasks organization → Dev assessment → QA setup → Review → Release planning → Retrospective

## Import Detection Rules

### Automatic Project Type Detection:
- **website**: Contains index.html, package.json with frontend deps
- **api**: Has server files, API endpoints, database config
- **mobile**: React Native, Flutter, or native mobile files
- **library**: package.json with "main" field, no UI components
- **monorepo**: Multiple packages, lerna/nx/pnpm workspace

### Existing Task Detection:
- GitHub Issues → Convert to tasks/TODO/
- JIRA export → Convert to framework tasks
- TODO comments in code → Create tasks from comments
- Existing task files → Import and restructure

### Team Mapping:
- Git commit authors → Map to framework teams
- CODEOWNERS file → Extract team assignments
- Package.json contributors → Map to appropriate teams
- Existing org charts → Import team structure

## Usage

### Import Command:
```bash
# Import project from existing folder
/00_router --import --path="/path/to/existing/project"

# Import with specific project name
/00_router --import --path="/path/to/project" --name="my-project"
```

### Import Options:
- **--analyze-only**: Just analyze, don't modify files
- **--dry-run**: Show what would be imported
- **--force**: Import even if .ai-agency exists
- **--preserve-tasks**: Keep existing task IDs
- **--team-map**: Custom team mapping file

## Post-Import Checklist

- [ ] Project structure analyzed and documented
- [ ] Existing tasks imported and categorized
- [ ] Team members mapped to framework teams
- [ ] Core artifacts generated from existing content
- [ ] Import report reviewed and gaps identified
- [ ] Multi-sector review completed on all artifacts
- [ ] Status file updated with import evidence
- [ ] Next workflow step determined based on project state

## Common Import Scenarios

### 1. Plain Website Project:
- Detect HTML/CSS/JS structure
- Create frontend-focused task list
- Map to frontend team primarily

### 2. API Backend Project:
- Detect server framework and database
- Create backend and DevOps tasks
- Map to backend team with DevOps collaboration

### 3. Full-Stack Application:
- Detect both frontend and backend
- Create cross-team task dependencies
- Map to multiple teams with coordination needs

### 4. Library/Package:
- Detect package structure and dependencies
- Create API documentation tasks
- Map to appropriate team based on package type

## Import Report Template

The import workflow generates a comprehensive report:
- **Project Summary**: Type, size, complexity
- **Technology Stack**: Detected frameworks and tools
- **Team Analysis**: Existing contributors and suggested mapping
- **Task Inventory**: Imported and auto-generated tasks
- **Documentation Gap**: Missing framework artifacts
- **Recommendations**: Next steps and priorities
