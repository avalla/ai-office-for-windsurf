# Workflow: 01_import_project (Multi-project)

## ROLE
Project Import Specialist.

## GOAL
Import existing project into .ai-agency framework while preserving existing work and structure.

## INPUTS
- Path to existing project directory
- Optional: custom project name
- Optional: team mapping configuration

## OUTPUTS (must)
- `.ai-agency/` folder structure created in existing project
- Project analysis report generated
- Existing tasks imported and categorized
- Core framework artifacts initialized from existing content
- Team mapping established
- `review-document-multisector` executed on all created artifacts
- Status file created with import evidence
- next: `10_ceo_prd` (for PRD review) or directly to appropriate workflow based on project maturity

## IMPORT STEPS

### 1. Project Analysis
- Scan existing project structure and files
- Detect project type (website, api, mobile, library, monorepo)
- Identify technology stack from package files
- Analyze existing documentation and configuration
- Map git history to team activity patterns

### 2. Create Framework Structure
- Initialize `.ai-agency/` folder with all subdirectories
- Copy skeleton configuration files
- Update config.json with detected project information
- Create initial README.md with import summary

### 3. Import Existing Content
- Convert existing issues/Todos to framework tasks
- Map existing documentation to framework docs structure
- Import team members and assign to framework teams
- Generate initial artifacts from existing project state

### 4. Artifact Generation
- Create PRD based on existing project description/README
- Generate ADRs for architectural decisions found in code
- Create initial task breakdown from project structure
- Set up QA plan based on existing tests and CI
- Initialize status with current project state

### 5. Team Mapping
- Analyze git contributors and CODEOWNERS
- Map existing team structure to framework teams
- Create team assignment history
- Set up team transition rules

### 6. Review and Validate
- Run `review-document-multisector` on all imported artifacts
- Generate import report with gaps and recommendations
- Validate task assignments and team mappings
- Create next-step recommendations

## DETECTION RULES

### Project Type Detection:
- **website**: index.html + package.json with frontend deps
- **api**: server files + API routes + database config
- **mobile**: React Native/Flutter/native mobile files
- **library**: package.json with main field, no UI
- **monorepo**: multiple packages + workspace config

### Task Import Sources:
- GitHub Issues API → tasks/TODO/
- JIRA export → framework task format
- TODO/FIXME comments → task generation
- Existing task files → format conversion
- Project management tools → import mapping

### Team Mapping Logic:
- Git commit patterns → team assignment
- File ownership patterns → expertise mapping
- CODEOWNERS → formal team structure
- Package.json contributors → team mapping

## IMPORT VALIDATION

### Must-Have Checks:
- [ ] Project directory exists and is accessible
- [ ] At least one source file detected
- [ ] Team members identified (at least 1)
- [ ] Project type successfully determined
- [ ] Framework structure created without conflicts

### Quality Checks:
- [ ] Imported tasks follow framework format
- [ ] Team assignments respect transition rules
- [ ] Generated artifacts reflect actual project state
- [ ] No duplicate or conflicting task IDs
- [ ] Documentation gaps identified and reported

## ERROR HANDLING

### Import Failures:
- **Directory not found**: Request valid path or create project first
- **Permission denied**: Check file system permissions
- **Already imported**: Use --force flag or analyze existing .ai-agency
- **No detectable project type**: Manual project type selection
- **Team mapping conflicts**: Require manual resolution

### Recovery Options:
- **Partial import**: Continue with available data
- **Manual override**: User provides missing information
- **Retry with options**: Different detection parameters
- **Abort and restart**: Clean slate import attempt

## OUTPUT ARTIFACTS

### Generated Files:
- `.ai-agency/config.json` (with detected project info)
- `.ai-agency/README.md` (import summary)
- `docs/prd/project-prd.md` (from existing description)
- `architecture/decisions/` (detected architectural decisions)
- `tasks/TODO/` (imported and generated tasks)
- `docs/runbooks/import-status.md` (import evidence)

### Reports:
- `docs/import-report.md` (comprehensive analysis)
- `docs/team-mapping.md` (team assignments and transitions)
- `docs/gap-analysis.md` (missing framework artifacts)

## ROUTING LOGIC

### After Import:
- **New project** (no existing structure) → `10_ceo_prd`
- **Mature project** (existing docs/structure) → `05_planner`
- **Active project** (recent development) → `30_plan_tasks`
- **Complex project** (multiple teams/dependencies) → `20_arch_adr`

### Routing Criteria:
- Project maturity level
- Existing documentation quality
- Team structure complexity
- Current development activity
- Identified gaps and risks

## CHECKLIST
- [ ] Project analysis completed and documented
- [ ] Framework structure created successfully
- [ ] Existing content imported and categorized
- [ ] Core artifacts generated from project state
- [ ] Team mapping established and validated
- [ ] All artifacts reviewed via multi-sector review
- [ ] Status file updated with import evidence
- [ ] Import report generated and reviewed
- [ ] Next workflow step determined and routed
