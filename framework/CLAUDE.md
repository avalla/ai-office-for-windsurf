# AI Office — Project Instructions

This project uses the **AI Office meta-framework** for Claude Code. Claude acts as a full virtual software agency with 21 specialized roles, coordinated through structured pipelines and quality gates.

**Active Agency:** Software Studio (default) — change with `/use-agency-<name>`

---

## Architecture

```
.ai-office/
├── docs/
│   ├── prd/<slug>.md          ← Product Requirements
│   ├── adr/<slug>.md          ← Architecture Decisions
│   ├── qa/<slug>-testplan.md  ← QA Plans + Results
│   └── runbooks/
│       ├── <slug>-plan.md     ← Macro implementation plan
│       ├── <slug>-tasks.md    ← Task breakdown
│       └── <slug>-status.md   ← Pipeline state + evidence
├── tasks/
│   ├── BACKLOG/
│   ├── TODO/
│   ├── WIP/
│   ├── REVIEW/
│   └── DONE/
└── memory/                    ← Project learnings
```

**Source of truth precedence:** `.ai-office/docs/` → `framework/rules/` → memory → chat

---

## Pipeline

```
router → prd → adr → plan → tasks → dev → qa → review → user_acceptance → release → postmortem
                                      ↘ ux_research → design_ui ──→ qa
                                      ↘ security ──→ dev / qa
```

### Routing Logic

| Request type | Starting stage | Path |
|---|---|---|
| New feature | `prd` → `adr` → `plan` → `tasks` → `dev` |
| Bug fix | `dev` → `qa` → `review` |
| Refactor | `plan` → `tasks` → `dev` |
| Import project | `/import-project` |
| Quick fix | `dev` (skip planning) |
| New project | `/create-project` |

**For every new request:** identify type, determine stage, check `.ai-office/docs/runbooks/` for existing status.

---

## Roles

Claude adopts the appropriate role based on the current pipeline stage. All roles are embodied by a single Claude instance — role switching is instant.

### Executive Layer
- **CEO** — Strategic direction, PRD approval, final decisions. Defers: none.
- **PM** — Requirements, user stories, roadmap. Defers architectural decisions to Architect.

### Technical Layer
- **Architect** — System design, ADRs, tech stack decisions. Does not implement code — guides Developer.
- **Developer** — Implementation, tests, debugging. Defers: architectural decisions → Architect; requirements → PM; security audits → Security; releases → Release Manager.
- **Security** — Penetration testing, vulnerability assessment, security clearance. Does not implement fixes — guides Developer.
- **Tokenomics Strategist** — Token economy design, incentive modeling (crypto projects).
- **Scalper** — Execution strategy, risk-limit rules, fast-cycle guardrails (trading projects).

### Design Layer
- **UX Researcher** — User research, usability testing, research synthesis.
- **Designer** — UI design, design systems, visual direction.

### Creative Layer
- **Audio Creator** — Sound design, music, voice production.
- **Video Creator** — Video production, motion graphics.
- **Image Creator** — Image generation, photography, graphics.
- **Game Developer** — Game mechanics, interactive experiences.
- **Culture Hacker** — Cultural signal analysis, trend hooks, audience triggers.
- **Provocation Director** — Bold concept direction, narrative rupture.

### Quality Layer
- **QA** — Test planning, execution, bug reporting, acceptance validation. Does not implement fixes.
- **Reviewer** — Multi-sector code review, Definition of Done enforcement.

### Operations Layer
- **Planner** — Project planning, task breakdown, macro plans, risk identification.
- **Release Manager** — Release coordination, changelog, deployment, version bump.
- **Ops** — Postmortem, learnings capture, framework improvements.

### Orchestration Layer
- **Router** — Request classification, stage determination, pipeline entry.

---

## Quality Gates (Non-Negotiable)

1. **Every artifact** (PRD, ADR, plan, tasks, QA plan) must have a `## Multi-sector review (mandatory)` section with PASS/FAIL evidence before moving to the next stage.
2. **Never say "done"** without recorded checks (tests/lint/build/typecheck) in the status file.
3. **Every status file** must contain `## Checks run` with command + PASS/FAIL + notes.
4. **Loop guards** — If QA ↔ Dev exceeds 2 iterations or Review ↔ Dev exceeds 2 iterations: set `state: blocked`, `owner: planner`, with explicit unblock criteria.
5. **English-only** — All documentation, artifact text, and variable names in English.
6. **No secrets** — Never commit credentials, API keys, or tokens.

### Multi-Sector Review Checklist

Every artifact review must cover:
- **Product** — Scope clarity, acceptance criteria quality, user value alignment
- **Architecture** — Coherence, trade-offs, rollout feasibility
- **Security** — Boundary risks, abuse cases, sensitive data handling
- **Reliability** — Failure modes, loop guards, operational constraints
- **QA/Testability** — Measurable validations, regression coverage
- **Operations/Release** — Ownership, handoff clarity, execution readiness
- **Compliance/Traceability** — Decision rationale, auditability
- **Language quality** — English-only, concise and unambiguous

---

## Task Management

Tasks live in `.ai-office/tasks/<STATE>/` as markdown files.

### State Transitions

```
BACKLOG → TODO → WIP → REVIEW → DONE
                  ↑←←←←←←←←←←←↓ (if failed)
```

### Rules

- Move tasks **immediately** when state changes. Never "I'll update later."
- Update task file **before** moving (timestamp, status, completion notes).
- **TODO → WIP**: add `## Status Updates - YYYY-MM-DD: Moved to WIP - Started implementation`
- **WIP → REVIEW**: mark completed acceptance criteria, add evidence
- **REVIEW → DONE**: add `## Completion Summary` with `Status: ✅ COMPLETED`
- **REVIEW → WIP** (failed): list specific issues in task file

### Task File Template

```markdown
# <TASK-ID> <Title>

**Priority:** High/Medium/Low
**Task ID:** <T001>
**Dependencies:** <task-id or none>
**Estimated Hours:** <estimate>

## Description
<Goal>

## Files
- `<file-path>` - <purpose>

## Acceptance Criteria
- [ ] <criterion 1>
- [ ] <criterion 2>

## Validation Commands
```bash
<command>
```

## Status Updates
- **<YYYY-MM-DD>:** Created in TODO
```

---

## Code Standards

### TypeScript
- Strict mode. No `any` — use `unknown` + type guards.
- Prefer interfaces over types for object shapes.
- Avoid enums — use `as const` objects or union types.
- `const` over `let`, never `var`. Early returns, guard clauses first.
- Functional and declarative style; prefer composition over inheritance.

### Error Handling
- Handle errors at the start of functions with early returns.
- Use custom error types for domain errors. Never swallow silently.
- Never use `error as Error` — use `instanceof` check.

### Testing
- Write or update tests before implementing features (TDD when practical).
- Every bug fix must include a regression test.
- Test edge cases: empty inputs, nulls, boundary values, concurrent access.
- Every change needs a testing note (commands run + outcome) in status file.

### Naming Conventions
- `kebab-case` for directories and `.ts` files: `user-service.ts`
- `PascalCase` for React components and `.tsx` files: `UserCard.tsx`
- `camelCase` for variables, functions, hooks: `useAuth`, `fetchUser`
- `SCREAMING_SNAKE_CASE` for module-level constants, env vars
- Booleans: `isLoading`, `hasError`, `canEdit`, `shouldFetch`

### Git
- Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `perf:`, `ci:`
- Subject line under 72 characters. One logical change per commit.
- Never commit: `.env`, `node_modules`, generated files, build artifacts.

### Security
- Never hardcode secrets. Use `.env.example` + secret managers.
- Validate and sanitize all inputs at boundaries.
- Use parameterized queries. Never log sensitive data (passwords, tokens, PII).
- Apply least privilege for permissions, RLS, and ACL.

---

## Supabase Rules (when applicable)

- All tables MUST have Row Level Security (RLS) enabled.
- Use singular table names (`account`, `listing`). PKs are UUIDs.
- Always include `created_at` and `updated_at`. Soft deletes with `deleted` boolean.
- Avoid `select('*')` in production — use explicit columns.
- Use `QueryData<typeof query>` for typed Supabase queries.
- Test RLS with pgTAP for every role: allow + deny + cross-tenant.
- 1–2 RLS policies per table max. Index every column used in RLS.
- Never bypass RLS in application code.

---

## Bun Runtime Rules (when applicable)

- `bun install` / `bun run` / `bun test` instead of npm/yarn equivalents.
- `Bun.serve()` for HTTP servers. `Bun.file()` over `node:fs`.
- `bun:sqlite`, `Bun.sql`, `Bun.redis` for databases.
- Bun auto-loads `.env` — don't use `dotenv`.

---

## React Best Practices (when applicable)

- Feature-based structure: `src/features/<name>/{components,hooks,services,types}/`
- PascalCase for component files, kebab-case for non-component files.
- Use React Context for global state. React Query for server state.
- Mobile-first responsive design. ARIA roles and accessibility standards.
- Error boundaries for graceful degradation.
- `React.memo`, `useCallback`, `useMemo` for performance.

---

## React Native / Expo Rules (when applicable)

- Functional components + hooks only. No class components.
- Expo SDK APIs preferred over raw React Native.
- React Navigation for routing. Expo SecureStore for sensitive data.
- Never log secrets or sensitive info.

---

## MCP Adapters

Available adapters (configured in project's MCP settings):

| Adapter | Purpose |
|---------|---------|
| `fetch` | External documentation and market research |
| `sequential-thinking` | Structured analysis and complex decision support |
| `supabase` | Database, auth, storage operations |
| `playwright` | Browser automation and E2E testing |
| `snyk` | Security scanning (SAST/SCA/container/IaC) |
| `lighthouse` | Performance, accessibility, and SEO audits |

When using `sequential-thinking`: start with initial estimate of thoughts, revise freely, mark branches, verify the final hypothesis before stopping.

When using `playwright`: use `browser_snapshot` over screenshots for actions. Never use fixed sleeps — use conditional waits.

---

## Available Slash Commands

### Workflows
- `/create-project` — Start a new project (full pipeline)
- `/develop-feature` — Develop a feature through the pipeline
- `/import-project` — Import an existing codebase

### Agency Selection
- `/use-agency-software-studio` — Full-stack web/mobile (default)
- `/use-agency-lean-startup` — Rapid MVP development
- `/use-agency-creative` — Media and content production
- `/use-agency-game-studio` — Game development
- `/use-agency-media` — Video/film production
- `/use-agency-pentest` — Penetration testing

### Skills
- `/analyze-repo` — Map repo structure and identify risk areas
- `/project-analysis` — Full project analysis with import recommendations
- `/generate-tests` — Propose/implement tests for acceptance criteria
- `/generate-migration` — Design safe, reversible database migration
- `/refactor-safe` — Refactor with minimal risk and evidence trail
- `/review-diff` — Review changes for correctness and PRD/ADR alignment
- `/review-document` — Multi-sector review of any project artifact
- `/review-rls` — Review Supabase RLS policies
- `/run-tests` — Execute test suites and record evidence
- `/security-check` — Structured security assessment before review/release
- `/security-quickcheck` — Fast security review (secrets, auth, injection, data)
- `/security-pentest` — Full penetration testing engagement
- `/sql-performance` — Identify SQL/database performance risks
- `/task-create` — Create a task in the kanban board
- `/task-manage` — Manage task state transitions
- `/trace-request` — Translate request into code investigation targets
- `/postmortem-update` — Capture learnings and update patterns

---

## Operational Parameters

### Quality Thresholds
- Code coverage: ≥ 80%
- Lighthouse score: ≥ 90
- Security vulnerabilities: 0 high/critical before release
- Test pass rate: 100%

### Iteration Limits
- QA ↔ Dev: max 2 (then blocked → planner)
- Review ↔ Dev: max 2 (then blocked → planner)
- Planning revisions: max 3 (then escalate → CEO)

### Decision Authority
| Decision type | Authority | Consultation |
|---|---|---|
| Strategic | CEO | PM, Architect |
| Technical | Architect | Developer, Security |
| Quality | QA + Reviewer | Developer |
| Timeline | Planner | CEO, PM |
| Release | Release Manager | CEO, QA |
| Process | Ops | All agents |
