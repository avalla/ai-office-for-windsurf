# Skill: task-create

## ROLE
Task Creation Specialist.

## GOAL
Creates tasks in `.ai-office/tasks/` with proper filenames and metadata, and placement in the correct Kanban folder.

## INPUTS
- Project path (required)
- Task title (required)
- Task description (required)
- Priority: High/Medium/Low (default: Medium)
- Assignee: @username (optional)
- Team: research/data/writing/devops/qa/design (required)
- Milestone: M1/M2/M3/M4 or custom (optional)
- Estimate: hours (optional)
- Dependencies: task IDs (optional)
- Acceptance criteria: list (optional)

## OUTPUTS
- Task file created in `.ai-office/tasks/TODO/`
- Task README.md updated with count
- Validation report

## STEPS

### 1. Generate Task ID
- Check existing tasks in all folders to determine next ID
- Use format: `T{phase}.{sequence}` for project tasks
- Use format: `BUG-{nnn}` for bug fixes
- Use format: `FEAT-{nnn}` for new features
- Use format: `TEST-{nnn}` for test tasks

### 2. Validate Inputs
- Check project exists at specified path
- Verify `.ai-office/tasks/TODO/` folder exists
- Validate team matches config.json teams
- Check dependencies exist if specified

### 3. Create Task File
- Generate filename: `{TASK-ID}-{slugified-title}.md`
- Use template below
- Place in `.ai-office/tasks/TODO/` folder

### 4. Update README.md
- Increment TODO count in `.ai-office/tasks/README.md`

## TASK TEMPLATE

```markdown
# {TASK-ID} {Title}

**Priority:** {High|Medium|Low}
**Assignee:** {@username|TBD}
**Team:** {team}
**Milestone:** {milestone|TBD}
**Estimate:** {n} ore
**Due Date:** {YYYY-MM-DD|TBD}
**Dependencies:** {#task-id|None}

## Description
{description}

## Acceptance Criteria
- [ ] {criterion 1}
- [ ] {criterion 2}
- [ ] {criterion 3}

## Status Updates
- **{YYYY-MM-DD}:** Initial task created in TODO/
```

## COMMANDS

### Create Task (Interactive)
```bash
task-create --project=japan-softpower-research --title="Analisi comparativa" --team=research
```

### Create Task (Full)
```bash
task-create \
  --project=japan-softpower-research \
  --title="Analisi comparativa export culturali" \
  --description="Confrontare export culturali Giappone vs Corea del Sud" \
  --priority=High \
  --team=research \
  --milestone=M2 \
  --estimate=4 \
  --assignee=@researcher \
  --criteria="Raccogliere dati export Corea,Confrontare trend,Produrre grafico comparativo"
```

## VALIDATION RULES

### Required Fields
- Title (min 5 characters)
- Team (must exist in config.json)
- Description (min 20 characters)

### Optional Fields
- Priority (default: Medium)
- Assignee (default: TBD)
- Milestone (default: TBD)
- Estimate (default: 0)
- Due Date (default: TBD)
- Dependencies (default: None)

### ID Generation Rules
- Check all folders: TODO, WIP, REVIEW, DONE, ARCHIVED
- Find highest existing task number
- Increment by 1
- Use appropriate prefix based on task type

## INTEGRATION
- Used by MCP tools: `ai_office_task_create` - Create new tasks
- `ai_office_task_move` - Move tasks between columns
- `ai_office_task_list` - List tasks by column
- `ai_office_task_count` - Count tasks per column
- Integrates with task-management for state transitions
- Updates project status files with task creation evidence

## ERROR HANDLING
- Invalid team: suggest valid teams from config
- Missing project: list available projects
- Duplicate ID: regenerate with next available
- Invalid dependencies: list valid task IDs

## EXAMPLES

### Example 1: Simple Task
```
User: "Crea un task per revisionare la bibliografia"

Result:
- ID: T5.1
- File: tasks/TODO/T5.1-revisione-bibliografia.md
- Team: research
- Priority: Medium
```

### Example 2: Complex Task
```
User: "Crea un task urgente per l'analisi comparativa Giappone-Corea, assegnato al researcher, milestone M2, 4 ore stimate"

Result:
- ID: T5.2
- File: tasks/TODO/T5.2-analisi-comparativa-giappone-corea.md
- Team: research
- Priority: High
- Assignee: @researcher
- Milestone: M2
- Estimate: 4
```
