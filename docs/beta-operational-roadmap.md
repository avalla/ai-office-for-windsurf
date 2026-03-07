# Roadmap — AI Office Framework Operational Beta

Date: 2026-03-04
Owner: Framework team
Scope: operational framework (workflows + artifacts + gates), not a final application product.

## Beta goal
Make the framework reliably usable by a team to run at least one real project end-to-end:
Router -> PRD -> ADR -> Planner -> Plan Tasks -> Dev -> QA -> Review -> Release -> Postmortem.

## Starting state
- Multi-project pipeline defined.
- Project skeleton available.
- Historical gaps on path/state consistency and incomplete skills.

## Definition of "operational beta"
Operational beta is achieved when:
1. All core workflows are documented and consistent with multi-project artifacts.
2. All core skills are non-empty and usable.
3. Framework CI blocks structural regressions (workflow/template/skill/schema).
4. At least one demo project (`marketplace-lite`) exists with complete bootstrap artifacts.
5. Evidence exists for at least one full simulated cycle with updated state.
6. Every written/updated artifact is re-verified by a multi-sector reviewer and logged in status.

## Progress snapshot (2026-03-04)
- [x] Phase 1 — Contract consistency
- [x] Phase 2 — Skill hardening
- [x] Phase 3 — Framework CI gates
- [x] Phase 4 — Operational demo project
- [x] Phase 5 — End-to-end dry run (demo status advanced to `postmortem`)
- [x] Phase 6 — Onboarding hardening (quickstart + checklist + residual risks)

Recommended next focus: consolidate the cycle on a second feature/project to validate framework portability.

## Recommended timeline (4 weeks)

### Phase 1 — Contract consistency (Week 1)
Deliverables:
- Align multi-project paths across docs/rules/skills.
- Align the status schema (`project` + `tasks`).
Exit criteria:
- No blocking legacy references to `docs/runbooks/<slug>-status.md` in operational skills.

### Phase 2 — Skill hardening (Week 1)
Deliverables:
- Complete empty skills with minimum viable playbooks.
Exit criteria:
- 0 empty skill files.

### Phase 3 — Framework CI gates (Week 2)
Deliverables:
- CI checks for empty files + status schema/template consistency.
- CI checks enforce mandatory multi-sector review sections and workflow review hooks.
Exit criteria:
- `framework-ci` pipeline passes on a clean branch.

### Phase 4 — Operational demo project (Week 2)
Deliverables:
- `projects/marketplace-lite` initialized.
- Initial PRD/ADR/Plan/Tasks/Status/QA artifacts created.
Exit criteria:
- Demo project is ready to enter `40_dev_implement`.

### Phase 5 — End-to-end dry run (Week 3)
Deliverables:
- Simulate at least one full cycle through release/postmortem.
Exit criteria:
- Final status updated + decision log enriched.

### Phase 6 — Hardening and onboarding (Week 4)
Deliverables:
- "Start new project" quickstart guide + operational checklist.
- Residual risk report.
Exit criteria:
- A new team member can execute the flow without direct support.

## Prioritized backlog (P0/P1/P2)

### P0 (immediate)
- Path and status schema consistency.
- Non-empty skills.
- Framework CI with minimum structural gates.
- Demo project initialization.

### P1 (right after)
- Full dry run with evidence.
- Workflow report improvements (investor/review) with explicit prerequisites.
- More rigorous release and postmortem checklists.

### P2 (post-beta)
- Markdown/rules lint automation.
- Automatic artifact generation from templates.
- Multi-project status dashboard.

## Main risks
- Future divergence between root status schema and skeleton.
- Advanced workflows that assume product-codebase folders not present in this framework repo.
- Reduced auditability without consolidated release/tag history.

## Mitigations
- CI with multi-layer consistency checks.
- Keep the "artifacts-first" rule as a hard constraint.
- Keep the demo project continuously updated after every framework change.

## Next 48 hours
1. Run `framework-ci` locally and fix any regressions.
2. Complete bootstrap artifacts for `marketplace-lite`.
3. Start the first Dev task for the demo project and record evidence in the status file.
