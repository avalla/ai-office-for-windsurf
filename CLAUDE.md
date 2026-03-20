# AI Office — Claude Code Instructions

This project is the **AI Office meta-framework** — an AI-driven multi-role project management system for Claude Code. It provides agencies, agents, workflows, rules, skills, and templates that can be installed into any project.

---

## Framework Architecture

```
ai-office/
├── framework/              ← Installable framework content
│   ├── core/
│   │   ├── agencies/       ← 6 agency templates (software-studio, creative, etc.)
│   │   ├── agents/         ← 21 agent profiles (personality, competencies, etc.)
│   │   ├── rules/          ← 22 development rules
│   │   ├── skills/         ← 19 reusable skill playbooks
│   │   ├── workflows/      ← 15 workflow definitions
│   │   └── templates/      ← PRD, ADR, QA, runbook templates
│   └── office-config.md    ← Global agency/agent roster
├── src/mcp-server/         ← MCP server (legacy, being migrated)
└── .claude/commands/       ← Claude Code slash commands (migrated skills)
```

When **installed into a project**, the framework creates:

```
your-project/
├── CLAUDE.md               ← Project-level instructions (see framework/CLAUDE.md)
├── .claude/commands/       ← Slash commands (copied from framework)
├── .ai-office/
│   ├── docs/               ← PRD, ADR, QA, runbooks
│   ├── tasks/              ← Kanban board (BACKLOG/TODO/WIP/REVIEW/DONE)
│   └── memory/             ← Project learnings
└── src/                    ← Project code
```

---

## Development Rules for This Repo

### Code Quality
- Prefer small, reviewable diffs. Avoid unrelated refactors during feature/bug work.
- Keep modules small, focused, composable. No "god" files.
- Prefer clear explicit code over cleverness.
- DRY with judgment; prefer clarity over over-abstraction.

### TypeScript
- Strict mode, no `any`. Use `unknown` + type guards when type is truly unknown.
- Prefer interfaces over types for object shapes.
- Avoid enums — use `as const` objects or union types.
- `const` over `let`, never `var`. Early returns, guard clauses first.

### Git
- Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `perf:`, `ci:`.
- Keep subject line under 72 characters. One logical change per commit.
- Branch names: `feat/listing-wizard`, `fix/bid-race-condition`.

### Security
- Never commit secrets, API keys, or credentials.
- Validate and sanitize all inputs at system boundaries.
- Use parameterized queries. Never log sensitive data.

### Runtime
- Default to Bun. Use `bun install`, `bun run`, `bun test`.
- Bun auto-loads `.env`; don't use `dotenv`.

---

## Framework Development Guidelines

When modifying framework content:

1. **Agents** — Edit files in `framework/core/agents/<name>/`. Each agent has: `personality.md`, `competencies.md`, `triggers.md`, `workflows.md`, `skills.md`, `mcp-adapters.md`.

2. **Agencies** — Edit files in `framework/core/agencies/<name>/`. Each agency has: `config.md`, `pipeline.md`, `templates.md`.

3. **Rules** — Edit files in `framework/core/rules/`. Base rules (always-on) vs addon rules (conditional).

4. **Skills → Slash Commands** — Skills in `framework/core/skills/` have corresponding slash commands in `.claude/commands/`. Keep them in sync.

5. **Workflows** — Edit files in `framework/core/workflows/`. These are role-specific playbooks.

6. **Templates** — Edit files in `framework/core/templates/`. These are document templates (PRD, ADR, QA, etc.).

When adding a new agent or agency, also update `framework/office-config.md` and `framework/software-mcp-proposals.md`.

---

## MCP Server Status

The `src/mcp-server/` contains the legacy MCP server implementation. It is **partially functional** (several tool handlers are stubs returning mock data):

- Stub handlers: `advance`, `scaffold`, `validate`, `review`, `report`, `pipelineInfo`
- Functional handlers: `route`, `getStatus`, `setStatus`, `listStatus`, `taskCreate`, `taskMove`, `taskList`, `taskCount`, `install`, `update`

The migration to Claude Code replaces the MCP server with:
- `CLAUDE.md` for project-level instructions
- `.claude/commands/` for all skill slash commands
- Direct file operations for state management (no MCP intermediary needed)

See `framework/CLAUDE.md` for the installable project template.
