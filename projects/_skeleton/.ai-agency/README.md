# .ai-agency Metaframework

This folder contains metaframework data for project management, architecture documentation, and task tracking.

## Structure

```
.ai-agency/
├── README.md                 # This file
├── config.json              # Project configuration (teams, workflows, transitions)
├── init.js                  # Initialization script
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
   node init.js "your-project-name"
   ```

2. **Create your first task:**
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
