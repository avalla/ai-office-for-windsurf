# Projects workspace

This repository supports **multiple projects** under `projects/<project>/`.

Each project has its own `.ai-agency/` folder containing:
- `docs/` (artifacts: prd, adr, qa, runbooks)
- `memory/` (project learnings)
- `tasks/` (kanban: BACKLOG, TODO, WIP, REVIEW, REJECTED, DONE, ARCHIVED)
- `architecture/` (diagrams, optional)

Global framework lives in `.agents/`.

## Create a new project
1) Run `/create-project` workflow or `00_router`
2) Project will be created from `projects/_skeleton/`
3) Initialize with: `cd projects/<project>/.ai-agency && node init.js "<project>"`

## Import an existing project
1) Run `/import-project` workflow
2) Choose: copy to `projects/<slug>/` OR import in-place
3) Framework will analyze and create `.ai-agency/` structure

Generated: 2026-03-09
