# Skill: trace-request

## GOAL
Translate a user request into concrete code/doc investigation targets and execution steps.

## INPUTS
- user request summary from router
- `projects/<project>/.ai-agency/docs/runbooks/<slug>-status.md`

## OUTPUT
- Add a trace section to `projects/<project>/.ai-agency/docs/runbooks/<slug>-plan.md`:
  - candidate modules/files
  - expected impact areas
  - validation signals for each area

## CHECKLIST
- [ ] request scope split into explicit sub-problems
- [ ] at least one upstream root-cause hypothesis identified
- [ ] validation strategy mapped before implementation

