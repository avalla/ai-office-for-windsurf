# .ai-agency Metaframework

This folder contains metaframework data for project management, architecture documentation, and task tracking.

## Structure

```
.ai-agency/
├── README.md                 # This file
├── config.json              # Project configuration (teams, workflows, transitions)
├── init.js                  # Initialization script (ES Module compatible)
├── task-manager.js          # Task management and workflow automation
├── report.js                # Project reporting and analytics
├── crazy-studio-integration.js # Crazy Studio agency integration
├── cli.js                   # CLI wrapper for convenient tool access (project-specific)
├── .gitignore               # Git ignore rules
├── tasks/                   # Kanban-style task management
│   ├── BACKLOG/            # Ideas and unprioritized tasks
│   ├── TODO/               # Tasks to be started
│   ├── WIP/                # Work in progress
│   ├── REVIEW/             # Tasks ready for review
│   ├── REJECTED/           # Failed review, needs rework
│   ├── DONE/               # Completed tasks
│   ├── ARCHIVED/           # Cancelled or obsolete tasks
│   └── README.md           # Task management guide
├── docs/                   # Project documentation
│   ├── README.md           # Documentation guide
│   ├── prd/                # Product Requirements Documents
│   ├── adr/                # Architecture Decision Records
│   ├── qa/                 # Quality assurance documentation
│   ├── runbooks/           # Operational procedures (plans, tasks, status)
│   ├── api/                # API documentation
│   └── guides/             # User guides and tutorials
├── architecture/           # Architecture diagrams (optional)
│   └── diagrams/           # Architecture diagrams
└── memory/                 # Project memory and insights
    ├── README.md           # Memory guide
    ├── patterns/           # Design and code patterns
    ├── insights/           # Key learnings and discoveries
    ├── decisions/          # Important decisions
    ├── bugs/               # Bug patterns and resolutions
    └── knowledge/          # Domain-specific expertise
```

## Quick Start

1. **Initialize in a new project:**
   ```bash
   cp -r /path/to/_skeleton/.ai-agency ./your-project/
   cd your-project/.ai-agency
   bun init.js "your-project-name"  # or node init.js
   ```

2. **Use the CLI wrapper (recommended):**
   ```bash
   cd your-project
   bun .ai-agency/cli.js help  # 2-3x faster than node!
   ```

3. **Apply agency-specific tech stack:**
   ```bash
   bun .ai-agency/cli.js tech-stack-manager apply crazy-studio game
   bun .ai-agency/cli.js tech-stack-manager package-json
   bun install
   ```

4. **Create your first task:**
   ```bash
   bun .ai-agency/cli.js task-manager create T001 "Initial task" TODO frontend
   ```

5. **Generate project reports:**
   ```bash
   bun .ai-agency/cli.js report summary
   ```

6. **Crazy Studio integration (if applicable):**
   ```bash
   bun .ai-agency/cli.js crazy-studio-integration brief
   ```

## Available Tools

### Core Metaframework Tools (in skeleton)

- **`init.js`** - Initialize .ai-agency folder structure
  - Bun and Node compatible (Bun recommended for 2-3x speed)
  - ES Module compatible (works with `"type": "module"` projects)
  - Creates all necessary directories and updates config.json
  - Automatically adds Bun to tech stack when detected

- **`task-manager.js`** - Complete task management system
  - Create, move, list, and validate tasks
  - Enforces proper state transitions
  - Standardized task format with metadata
  - Bun-optimized for faster execution

- **`report.js`** - Project reporting and analytics
  - Summary reports with statistics
  - Task distribution analysis
  - Team workload reports
  - Workflow efficiency metrics

- **`crazy-studio-integration.js`** - Crazy Studio agency tools
  - Creative project brief generation
  - Provocation planning
  - Viral marketing strategies
  - Integration validation

- **`tech-stack-manager.js`** - Agency-specific tech stack management
  - Apply recommended stacks based on agency and project type
  - Generate optimized package.json
  - Validate current stack configuration
  - Support for multiple agencies (Crazy Studio, Creative Agency, Game Studio, etc.)

### Project-Specific Tools

- **`cli.js`** - CLI wrapper (created per project)
  - Convenient access to all skeleton tools
  - Automatic path resolution
  - Unified interface for all commands

## Usage Examples

### Task Management
```bash
# Create a task
bun .ai-agency/cli.js task-manager create T002 "Add user auth" TODO backend

# Move task through workflow
bun .ai-agency/cli.js task-manager move T002 WIP
bun .ai-agency/cli.js task-manager move T002 REVIEW

# List tasks
bun .ai-agency/cli.js task-manager list
bun .ai-agency/cli.js task-manager list TODO

# Validate workflow
bun .ai-agency/cli.js task-manager validate
```

### Tech Stack Management
```bash
# Show available agency stacks
bun .ai-agency/cli.js tech-stack-manager stacks

# Apply agency-specific stack
bun .ai-agency/cli.js tech-stack-manager apply crazy-studio game
bun .ai-agency/cli.js tech-stack-manager apply creative-agency web

# Generate package.json
bun .ai-agency/cli.js tech-stack-manager package-json

# Validate current stack
bun .ai-agency/cli.js tech-stack-manager validate
```

### Reporting
```bash
# Project summary
bun .ai-agency/cli.js report summary

# Task distribution
bun .ai-agency/cli.js report tasks

# Team workload
bun .ai-agency/cli.js report teams

# Workflow efficiency
bun .ai-agency/cli.js report workflow
```

### Crazy Studio Integration
```bash
# Generate creative brief
bun .ai-agency/cli.js crazy-studio-integration brief

# Create provocation plan
bun .ai-agency/cli.js crazy-studio-integration provocation

# Generate marketing strategy
bun .ai-agency/cli.js crazy-studio-integration marketing

# Validate integration
bun .ai-agency/cli.js crazy-studio-integration validate
```

## Task States and Transitions

The metaframework enforces proper task lifecycle:

- **BACKLOG** → TODO, ARCHIVED
- **TODO** → WIP, BACKLOG, ARCHIVED
- **WIP** → REVIEW, TODO, ARCHIVED
- **REVIEW** → DONE, REJECTED, WIP
- **REJECTED** → WIP, BACKLOG, ARCHIVED
- **DONE** → (terminal state)
- **ARCHIVED** → (terminal state)

## Configuration

Edit `config.json` to customize:
- Team definitions and skills
- Task types per team
- Workflow transitions
- Assignment rules
- Project metadata

## Integration with Agencies

The metaframework supports multiple agencies:
- **Creative Agency** - Design and UX focused projects
- **Crazy Studio** - High-creativity, high-impact launches
- **Game Studio** - Game development workflows
- **Software Studio** - Software engineering projects
- And more...

Each agency has specific integration tools and workflows.

## Best Practices

1. **Use the CLI wrapper** for consistent tool access
2. **Follow task naming conventions** (T001, T002, etc.)
3. **Keep task descriptions detailed** with clear acceptance criteria
4. **Validate workflow regularly** to catch issues early
5. **Generate reports** to track project progress
6. **Update memory** with patterns and insights as they emerge
7. **Check documentation** for complete command reference

## 📚 Documentation for AI Assistants

### Essential Guides
- **[Quick Start Guide](docs/guides/quick-start.md)** - 5-minute setup and daily commands
- **[Metaframework Commands](docs/guides/metaframework-commands.md)** - Complete command reference for AI discovery

### Key Commands for Easy Discovery
```bash
# Show all available tools
bun .ai-agency/cli.js help

# Task management (auto-tests on REVIEW)
bun .ai-agency/cli.js task-manager create T001 "Task" TODO team
bun .ai-agency/cli.js task-manager move T001 REVIEW

# Review testing
bun .ai-agency/cli.js review-tester queue
bun .ai-agency/cli.js review-tester test T001

# Project analytics
bun .ai-agency/cli.js report summary
bun .ai-agency/cli.js report workflow

# Agency-specific tech stacks
bun .ai-agency/cli.js tech-stack-manager stacks
bun .ai-agency/cli.js tech-stack-manager apply crazy-studio game
```

### AI Assistant Discovery Patterns
- Tasks in REVIEW state automatically trigger testing
- Use `task-manager validate` before state changes
- Check `tech-stack-manager stacks` for agency options
- Generate reports with `report summary` for project health
- All commands documented in `docs/guides/metaframework-commands.md`
   ```bash
   # Create a task file in tasks/TODO/
   # Use the template from tasks/README.md
   ```

3. **Start documenting:**
   - Add architecture decisions to `docs/adr/`
   - Document patterns in `memory/patterns/`
   - Create project documentation in `docs/`

## Task Management

### Task States
- **BACKLOG** - Ideas and unprioritized tasks
- **TODO** - Tasks ready to be started
- **WIP** - Currently in progress
- **REVIEW** - Ready for review/feedback
- **REJECTED** - Failed review, needs rework
- **DONE** - Completed
- **ARCHIVED** - Cancelled or obsolete

### Task Template
```markdown
# Task Title

**Priority:** High/Medium/Low
**Assignee:** @username
**Team:** frontend|backend|devops|qa|design
**Due Date:** YYYY-MM-DD
**Dependencies:** #task-id
**Estimated Hours:** 0

## Description
Detailed description...

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2

## Assignment History
- **YYYY-MM-DD:** Assigned to @username by @manager (reason: initial assignment)
- **YYYY-MM-DD:** Reassigned to @username2 by @manager (reason: expertise needed)

## Status Updates
- **YYYY-MM-DD:** Initial task created
```

### Naming Convention
Use `task-id-descriptive-title.md` format (e.g., `001-setup-authentication.md`).

## Usage

### Task Management
Tasks are organized as markdown files in the respective folders. Each task should include:
- Title and description
- Priority level
- Assignee (if applicable)
- Due date (if applicable)
- Dependencies
- Status updates

### Documentation
Architecture decisions, system designs, and project specifications are stored in their respective folders.

### Memory
Store patterns, insights, and learned information for future reference.

## Configuration

The `config.json` file contains:
- Project metadata
- Metaframework version and structure
- Workflow configuration
- Task state transitions

## Best Practices

1. **Keep it current** - Update documentation as the project evolves
2. **Be consistent** - Use templates and naming conventions
3. **Review regularly** - Archive completed tasks, update architecture docs
4. **Collaborate** - Use @mentions for assignments and reviews
5. **Automate** - Use the init script for new projects

## Integration

This structure integrates with:
- Git (tracked files, proper ignores)
- IDE (markdown editing, diagram support)
- CI/CD (documentation generation, task tracking)
- Project management tools (export/import capabilities)
