
# AI Office for Windsurf

A modular **AI Software Company framework** for Windsurf.

Includes:

- Multi‑role workflows (CEO, Architect, Planner, Developer, QA, Reviewer)
- Reusable Skills
- Memory layer
- Architecture map
- Supabase / SQL security helpers
- Logging + decision tracking

## Structure

.windsurf/
  workflows/
  skills/
  rules/
  templates/

docs/
architecture/
memory/
logs/

## Usage

Start with:

Run workflow → `00_router`

Then the system orchestrates the pipeline.
Every written/updated artifact must be re-verified through `review-document-multisector`
before advancing to the next workflow state.

## Documentation navigation (keep it lean)

Primary documents (start here):

- Framework map and contract: `docs/repo-graph.md`
- System architecture overview: `architecture/system-overview.md`
- New project onboarding entry point: `docs/runbooks/start-new-project-quickstart.md`

Secondary documents (open through primary docs when needed):

- Operational checklist: `docs/runbooks/start-new-project-operational-checklist.md`
- Operational beta roadmap: `docs/beta-operational-roadmap.md`
- Residual risks: `docs/beta-residual-risks.md`
- Framework decision history: `docs/decision-log.md`

Demo project ready for execution: `projects/marketplace-lite/`
- status (cycle completed to postmortem): `projects/marketplace-lite/docs/runbooks/feature-listings-bids-mvp-status.md`
- plan: `projects/marketplace-lite/docs/runbooks/feature-listings-bids-mvp-plan.md`
- tasks: `projects/marketplace-lite/docs/runbooks/feature-listings-bids-mvp-tasks.md`

Generated: 2026-03-04
