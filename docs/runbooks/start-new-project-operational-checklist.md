# Operational Checklist — Start New Project

Owner: Framework team
Date: 2026-03-04

## A) Project bootstrap
- [ ] `projects/<project>/` created from `projects/_skeleton/`
- [ ] PRD created (`docs/prd/<slug>.md`)
- [ ] ADR created (`docs/adr/<slug>.md`)
- [ ] Plan created (`docs/runbooks/<slug>-plan.md`)
- [ ] Tasks created (`docs/runbooks/<slug>-tasks.md`)
- [ ] Status created (`docs/runbooks/<slug>-status.md`)
- [ ] QA checklist created (`docs/qa/<slug>-testplan.md`)

## B) Workflow execution
- [ ] Router completed
- [ ] Create Project completed (for new project requests)
- [ ] PRD completed
- [ ] ADR completed
- [ ] Plan completed
- [ ] Tasks completed
- [ ] Dev completed
- [ ] QA completed (PASS/FAIL explicitly written)
- [ ] Review completed (PASS/FAIL explicitly written)
- [ ] Release completed
- [ ] Postmortem completed

## C) Reliability guards
- [ ] `qa_iteration <= 2`
- [ ] `review_iteration <= 2`
- [ ] If blocked, `blocked_reason` contains explicit unblock criteria

## D) Structural quality gates
- [ ] All workflow/template files non-empty
- [ ] All skill files non-empty
- [ ] Status template contains `project`
- [ ] Status schema contains `create_project` and `tasks` states
- [ ] Every artifact contains `## Multi-sector review (mandatory)`
- [ ] Status contains `## Multi-sector document review log (mandatory)`

## E) Final evidence package
- [ ] Status includes commands run + PASS/FAIL outcomes
- [ ] Status includes review entries for every written artifact
- [ ] `CHANGELOG.md` updated
- [ ] `docs/decision-log.md` updated with learnings
