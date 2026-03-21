# AI Office — Roadmap

## Todo

- [ ] **GitHub Issues sync** (`/office-sync github`)
  - One-way push: AI Office tasks → GitHub Issues (AI Office as source of truth)
  - Store `**Issue:** #N` in task file for linking
  - One-time import: pull open GitHub Issues as task stubs (for onboarding existing repos)
  - Avoid bidirectional sync — conflict resolution not worth the complexity

## In Progress

_(nothing)_

## Done

- [x] `/office-company` — custom agency, agents, and pipeline generator
  - Deep 4-phase conversational interview
  - Invents custom agent types with personality/competencies/triggers files
  - Generates custom `pipeline.md` per agency
  - `office-advance` reads custom pipeline when present (falls back to default)

- [x] Migrate skills to `.claude/commands/` (removed `disable-model-invocation`)
- [x] Refactor `install-local.js` — claude-code as primary target, copies `CLAUDE.md` + commands
- [x] Add all 23 office-* slash commands
