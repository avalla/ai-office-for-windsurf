# Skill: project-analysis

## ROLE
Project Analysis Specialist.

## GOAL
Analyze existing project structure, detect technology stack, identify team patterns, and generate framework-compatible artifacts.

## INPUTS
- Project directory path
- Analysis options (depth, sources, output format)

## OUTPUTS
- Project type classification
- Technology stack inventory
- Team structure analysis
- Existing task inventory
- Documentation assessment
- Import recommendations

## ANALYSIS CAPABILITIES

### Project Type Detection
- **Website**: HTML/CSS/JS, frontend frameworks, static assets
- **API**: Server frameworks, database configs, API endpoints
- **Mobile**: React Native, Flutter, native mobile projects
- **Library**: Package.json with main field, reusable components
- **Monorepo**: Multiple packages, workspace configurations
- **CLI Tool**: Executable scripts, command-line interfaces

### Technology Stack Analysis
- **Frontend**: React, Vue, Angular, Svelte, vanilla JS
- **Backend**: Node.js, Python, Java, Go, Rust, PHP
- **Database**: PostgreSQL, MongoDB, MySQL, Redis, SQLite
- **Infrastructure**: Docker, Kubernetes, CI/CD configs
- **Testing**: Jest, Cypress, Pytest, JUnit, etc.
- **Build Tools**: Webpack, Vite, Gradle, Maven, npm scripts

### Team Pattern Detection
- **Git Contributors**: Author frequency, commit patterns
- **File Ownership**: CODEOWNERS, file modification patterns
- **Expertise Areas**: Technology-specific contributions
- **Collaboration Patterns**: Co-commit analysis, review patterns

### Existing Task Discovery
- **Issue Trackers**: GitHub Issues, JIRA, Linear exports
- **Code Comments**: TODO, FIXME, HACK, NOTE comments
- **Project Management**: Trello, Asana, Monday.com data
- **Documentation**: README tasks, ROADMAP items

## ANALYSIS METHODS

### Static Code Analysis
```bash
# Detect project type from file patterns
find . -name "package.json" -o -name "requirements.txt" -o -name "pom.xml"
find . -name "*.html" -o -name "index.html"
find . -name "Dockerfile" -o -name "docker-compose.yml"
find . -name "*.test.*" -o -name "test_*"
```

### Dependency Analysis
- Parse package.json, requirements.txt, pom.xml
- Identify framework versions and compatibility
- Detect security vulnerabilities in dependencies
- Map dependencies to team expertise areas

### Git History Analysis
```bash
# Contributor patterns
git log --pretty=format:"%an" | sort | uniq -c | sort -nr
# File ownership patterns
git log --name-only --pretty=format:"%an" | grep -v "^$" | sort | uniq -c
# Technology expertise
git log --name-only | grep -E "\.(js|py|java|go)$" | sort | uniq -c
```

### Documentation Assessment
- README quality and completeness
- API documentation existence
- Architecture documentation
- Contributing guidelines
- Deployment instructions

## IMPORT STRATEGIES

### Conservative Import
- Preserve existing structure
- Add .ai-office alongside existing files
- Minimal disruption to current workflow
- Gradual framework adoption

### Restructured Import
- Reorganize files to framework standards
- Convert existing docs to framework format
- Full framework integration from start
- Immediate workflow compliance

### Hybrid Import
- Keep existing working files
- Add framework structure for new work
- Parallel systems during transition
- Phased framework adoption

## TEAM MAPPING LOGIC

### Skill-Based Assignment
```javascript
const teamMapping = {
  'react', 'vue', 'angular', 'css', 'html': 'frontend',
  'nodejs', 'express', 'fastapi', 'django': 'backend',
  'docker', 'kubernetes', 'aws', 'ci-cd': 'devops',
  'jest', 'cypress', 'testing', 'qa': 'qa',
  'figma', 'sketch', 'design', 'ux': 'design'
};
```

### Contribution Pattern Analysis
- **Frontend specialists**: Mostly UI component commits
- **Backend specialists**: API and database commits
- **DevOps specialists**: Infrastructure and deployment commits
- **QA specialists**: Test files and documentation commits
- **Full-stack contributors**: Mixed pattern across domains

### Collaboration Mapping
- **Code review pairs**: Regular review relationships
- **Co-commit patterns**: Frequent collaboration
- **Domain expertise**: Technology-specific knowledge
- **Cross-functional work**: Multiple domain contributions

## OUTPUT REPORTS

### Project Summary Report
```markdown
## Project Analysis Report
- **Type**: Website/Monorepo
- **Size**: Medium (50-200 files)
- **Complexity**: Moderate (3-5 technologies)
- **Maturity**: Growing (6-12 months active)
```

### Technology Stack Report
```markdown
## Technology Inventory
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL
- **Infrastructure**: Docker, GitHub Actions
- **Testing**: Jest, Cypress
```

### Team Structure Report
```markdown
## Team Analysis
- **Total Contributors**: 5
- **Frontend Team**: 2 members (primary UI work)
- **Backend Team**: 2 members (API and database)
- **DevOps**: 1 member (infrastructure and deployment)
```

### Import Recommendations
```markdown
## Import Strategy
- **Recommended**: Hybrid import
- **Reason**: Preserve existing workflow while adding framework
- **Next Steps**: Start with task management integration
```

## VALIDATION RULES

### Import Readiness Checks
- [ ] Project directory accessible
- [ ] At least one source file detected
- [ ] Team members identifiable
- [ ] Project type determinable
- [ ] No conflicting framework structures

### Quality Assurance
- [ ] Technology stack accurately detected
- [ ] Team assignments respect expertise
- [ ] Existing tasks properly categorized
- [ ] Documentation gaps identified
- [ ] Import strategy appropriate

## ERROR HANDLING

### Analysis Failures
- **No source files**: Suggest project creation instead
- **Undetectable project type**: Manual selection required
- **No team patterns**: Default to generic team assignment
- **Conflicting structures**: Require manual resolution

### Recovery Options
- **Partial analysis**: Continue with available data
- **Manual override**: User provides missing information
- **Alternative detection**: Different analysis parameters
- **Expert review**: Manual team assignment and categorization

## INTEGRATION POINTS
- Used by `01_import_project` workflow
- Provides data for team mapping in task-management skill
- Supplies technology context for ADR generation
- Informs routing decisions in import workflow
- Supports gap analysis for framework adoption
