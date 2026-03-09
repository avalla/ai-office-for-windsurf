# Architecture Modules (Framework Level)

Date: 2026-03-04
Owner: Framework team
Scope: framework modules only (not application runtime internals).

## 1) Core module map

| Module | Path | Responsibility | Inputs | Outputs |
|---|---|---|---|---|
| Workflow Orchestration | `.agents/workflows/` | Defines role handoff and state transitions | User request + current status state | Updated artifact state and next owner |
| Execution Skills | `.agents/skills/` | Reusable implementation playbooks for specific tasks | Workflow context + role objective | Procedural guidance and quality checks |
| Multi-sector Document Review | `.agents/skills/review-document-multisector.md` | Re-verifies every written artifact across product/architecture/security/reliability/QA/ops | Draft artifact + workflow context | Improved artifact + PASS/FAIL review evidence |
| Behavioral Rules | `.agents/rules/` | Repository-specific constraints and precedence | Agent actions + proposed changes | Allowed scope and guardrails |
| Global Policies | `.agents/policies/` | Cross-cutting engineering constraints (coding/security/testing) | Any implementation or review activity | Compliance requirements |
| Templates | `.agents/templates/` | Canonical artifact structures for repeatable execution | New project/feature setup | Standardized PRD/ADR/QA/Runbook artifacts |
| Framework Docs | `docs/` | Global process documentation and decisions | Cycle outcomes + framework updates | Decision log, roadmap, onboarding guidance |
| Project Skeleton | `projects/_skeleton/` | Bootstrap structure for new projects | New project initialization | Ready-to-fill project directory structure |
| Project Instances | `projects/<project>/` | Project-scoped execution artifacts and knowledge | Planned feature work | PRD/ADR/Plan/Tasks/Status/QA artifacts |
| CI Governance | `.github/workflows/` | Structural quality gates and consistency checks | Repo state at push/PR time | PASS/FAIL on framework integrity |

## 2) Dependency direction

Preferred dependency direction is top-down and artifact-driven:

1. Rules/policies constrain workflows and skills.
2. Workflows orchestrate state progression.
3. Skills implement execution details.
4. Multi-sector review validates every written artifact before handoff.
5. Templates standardize generated artifacts.
6. CI validates structure and consistency.

No module should bypass the artifact contract in `projects/<project>/.ai-agency/docs/*`.

## 3) Boundaries and anti-coupling rules

- Framework-level documentation (`docs/`) must not contain project-specific mutable state.
- Project-specific state and evidence must remain under `projects/<project>/.ai-agency/docs/runbooks/`.
- Skills should remain reusable and avoid hardcoding project names.
- Workflows should reference canonical artifact paths only.
- CI checks should fail fast on missing/empty mandatory framework artifacts.
- Every artifact must include a filled multi-sector review section and be logged in status.

## 4) Current architecture health snapshot

- Module boundaries are defined and mostly respected.
- Artifact-driven communication contract is explicit.
- CI structural gates are present for key framework integrity checks.
- Remaining risk: advanced workflows may still assume product-code paths not present in pure framework repositories.
