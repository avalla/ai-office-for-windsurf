# Repo Graph (Framework)

This document visualizes the framework structure and orchestration model in multi-project mode.

## 1) Top-level structure

```text
.
├── .agents/
│   ├── workflows/   # role orchestration and state transitions
│   ├── skills/      # reusable execution playbooks
│   ├── rules/       # behavioral constraints and precedence
│   ├── policies/    # coding/security/testing guardrails
│   └── templates/   # canonical artifact skeletons
├── projects/
│   ├── _skeleton/   # source template for new projects
│   └── <project>/
│       └── .ai-agency/  # project-scoped metaframework
│           ├── docs/        # communication artifacts
│           ├── memory/      # project learnings
│           └── tasks/       # kanban states
├── docs/            # framework-level docs (global)
└── .github/workflows/
    └── framework-ci.yml  # structural quality gates
```

## 2) Agent communication contract

Primary channel is artifact-based communication, not chat memory:

- project status and evidence:
  - `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`
- planning and execution:
  - `projects/<project>/.ai-agency/docs/runbooks/<slug>-plan.md`
  - `projects/<project>/.ai-agency/docs/runbooks/<slug>-tasks.md`
- product and architecture decisions:
  - `projects/<project>/.ai-agency/docs/prd/<slug>.md`
  - `projects/<project>/.ai-agency/docs/adr/<slug>.md`
- validation:
  - `projects/<project>/.ai-agency/docs/qa/<slug>-testplan.md`
- mandatory review metadata:
  - each artifact includes `## Multi-sector review (mandatory)`
  - status includes `## Multi-sector document review log (mandatory)`

Framework-level learnings remain global in `docs/decision-log.md`.

## 3) Workflow state machine and role handoff

```text
router
  ├─(new project)→ create_project → prd → adr → plan → tasks → dev → qa → review → release → postmortem
  ├─(feature)→ prd → adr → plan → tasks → dev → qa → review → release → postmortem
  └─(bugfix/refactor/spike)→ plan → tasks → dev → qa → review → release → postmortem
```

Role mapping by state:

- `router` -> router/orchestrator
- `create_project` -> project initializer / orchestrator
- `prd` -> ceo_pm
- `adr` -> architect
- `plan`/`tasks` -> planner
- `dev` -> dev
- `qa` -> qa
- `review` -> reviewer
- `release` -> release
- `postmortem` -> ops

Reliability loop guards:

- Dev <-> QA max 2 iterations (`qa_iteration <= 2`)
- Review <-> Dev max 2 iterations (`review_iteration <= 2`)
- on overflow: `state: blocked`, `owner: planner`, explicit `blocked_reason`

Mandatory document quality gate:

- Every written/updated artifact must be re-verified with `review-document-multisector`
  before workflow completion.

## 4) CI guard coverage

Framework CI currently enforces:

- required framework directories exist
- required workflows/templates are non-empty
- all skills are non-empty
- skeleton required directories exist
- status schema/template consistency between root docs and skeleton
- mandatory multi-sector review section exists in all core templates
- mandatory status review-log section exists in root and skeleton status templates

## 5) Per-project extension

Each concrete project should include its own `docs/repo-graph.md` to map domain modules and runtime code paths.

## 6) Framework architecture references

- Module boundaries and responsibilities: `architecture/modules.md`
- System-level context and execution flow: `architecture/system-overview.md`
