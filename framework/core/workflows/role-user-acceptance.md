---
description: Guidance for User Acceptance Testing — real user validation, business value confirmation
---

# Role: User Acceptance Testing

## Stage Covered
- `user_acceptance` — Real user validation, business value confirmation, sign-off

---

## User Acceptance Testing (UAT)

### Goal
Validate that the delivered solution meets real user needs and provides intended business value before release.

### When UAT Runs
- **After:** `review` stage completed (all technical reviews passed)
- **Before:** `release` stage (no deployment without UAT sign-off)
- **Trigger:** All tasks in DONE, technical validation complete

---

## UAT Process

### 1. Preparation
- **Identify Test Users** — Real end users, stakeholders, business representatives
- **Prepare Test Environment** — Staging/pre-production with production-like data
- **Create UAT Plan** — Test scenarios, success criteria, timeline
- **Prepare Test Materials** — User guides, test scripts, feedback forms

### 2. User Test Scenarios

| Scenario Type | Focus | Example |
|---------------|-------|---------|
| **Business Flow** | Complete user journeys | "Complete purchase from start to finish" |
| **Edge Cases** | Real-world edge cases | "Handle network interruption during upload" |
| **Performance** | User-perceived speed | "Load dashboard with 1000+ items" |
| **Accessibility** | Diverse user needs | "Navigate using keyboard only" |
| **Mobile/Cross-platform** | Device-specific behavior | "Use on tablet with touch interface" |

### 3. UAT Execution

#### Test Session Structure
```markdown
## UAT Session - [Date]

### Test Users Present
- [Name] - [Role] - [Experience Level]
- [Name] - [Role] - [Experience Level]

### Scenarios Tested
1. [Scenario name] - [Status: PASS/FAIL/PARTIAL]
   - User feedback: 
   - Issues found:
   - Suggestions:

### Overall Assessment
- Business value achieved: [Yes/No/Partial]
- Ready for release: [Yes/No/With conditions]
- Blockers: [List any showstoppers]
```

#### Success Criteria
- **Business Value:** User confirms solution solves their problem
- **Usability:** Users can complete tasks without assistance
- **Performance:** Response times meet user expectations
- **Completeness:** All user stories work as intended
- **No Showstoppers:** No critical issues blocking normal use

### 4. Feedback Collection

#### Methods
- **Observation:** Watch users interact with the solution
- **Interviews:** Ask users about their experience
- **Surveys:** Structured feedback on specific aspects
- **Metrics:** Task completion rates, time-on-task, error rates

#### Feedback Categories
| Category | Questions |
|----------|-----------|
| **Functionality** | Does it do what you expect? |
| **Usability** | Is it easy to use? |
| **Performance** | Is it fast enough? |
| **Value** | Does this help you achieve your goals? |
| **Issues** | What problems did you encounter? |

---

## UAT Decision Gates

### PASS Criteria ✅
- **≥ 80%** of test scenarios pass
- **No critical** usability issues
- **Business value confirmed** by primary users
- **Performance meets** user expectations
- **Accessibility requirements** satisfied

### FAIL Criteria ❌
- **Critical issues** preventing normal use
- **Business value not realized** by users
- **Major usability problems** requiring redesign
- **Performance below** user expectations
- **Safety/accessibility** concerns

### CONDITIONAL PASS ⚠️
- **Minor issues** that don't block release
- **Workarounds available** for problems
- **User training needed** for complex features
- **Future improvements** planned

---

## UAT Documentation

### UAT Report Template
```markdown
# User Acceptance Test Report - [slug]

**Date:** YYYY-MM-DD
**Test Period:** X days
**Test Users:** N participants

## Executive Summary
- Overall status: [PASS/FAIL/CONDITIONAL]
- Business value achieved: [Yes/No/Partial]
- Release recommendation: [Approve/Reject/Approve with conditions]

## Test Results
| Scenario | Status | User Feedback | Issues |
|----------|--------|---------------|--------|
| [Scenario 1] | PASS | "Easy to use" | None |
| [Scenario 2] | FAIL | "Confusing interface" | Button not working |

## Issues Found
| Severity | Issue | Impact | Resolution |
|----------|-------|--------|------------|
| Critical | [Issue] | Blocks core workflow | [Fix planned] |
| Major | [Issue] | Impacts efficiency | [Workaround] |
| Minor | [Issue] | Cosmetic/annoyance | [Future fix] |

## User Feedback Summary
### Positive Feedback
- "Much faster than old system"
- "Intuitive interface"

### Improvement Suggestions
- "Add keyboard shortcuts"
- "Better error messages"

## Release Decision
- [ ] Approved for release
- [ ] Approved with conditions (list conditions)
- [ ] Not approved - requires fixes

## Next Steps
- [ ] Address critical issues
- [ ] Update user documentation
- [ ] Plan user training
- [ ] Schedule follow-up UAT
```

---

## UAT Quality Gates

### Before UAT
- [ ] All technical reviews completed
- [ ] Solution deployed to test environment
- [ ] Test data prepared and sanitized
- [ ] Test users identified and scheduled
- [ ] UAT plan and scenarios prepared

### During UAT
- [ ] Test sessions facilitated and documented
- [ ] User feedback captured systematically
- [ ] Issues logged with severity and impact
- [ ] Progress tracked against scenarios

### After UAT
- [ ] UAT report completed and reviewed
- [ ] Stakeholder sign-off obtained
- [ ] Release decision documented
- [ ] Lessons learned captured

---

## Integration with Pipeline

### Status Schema Updates
Add to status schema:
- `user_acceptance` stage
- `uat_iteration` counter
- `uat_users` array
- `uat_business_value_confirmed` boolean

### MCP Tool Usage
- `ai_office_task_list` - Track UAT scenarios as tasks
- `ai_office_review` - Generate UAT-specific checklist
- `ai_office_advance` - Move to release after UAT PASS

### Loop Guards
| Loop | Max Iterations | On Exceed |
|------|---------------|-----------|
| UAT ↔ Dev | 1 | `state: blocked`, `owner: planner` |

---

## UAT Best Practices

### Do's ✅
- **Use real users** from target audience
- **Test in realistic environment** 
- **Focus on business outcomes**, not technical details
- **Capture both quantitative and qualitative feedback**
- **Document everything** for traceability

### Don'ts ❌
- **Don't use developers** as test users
- **Don't test in development environment**
- **Don't ignore usability issues** for "technical correctness"
- **Don't proceed without business sign-off**
- **Don't skip documentation** of findings

---

## After UAT Completion

### PASS → Release
1. Update status with UAT results
2. Attach UAT report to artifacts
3. Use `ai_office_advance` to move to `release`
4. Include UAT summary in release notes

### FAIL → Dev
1. Document specific user feedback
2. Create tasks for identified issues
3. Use `ai_office_advance` to return to `dev`
4. Plan re-testing after fixes

### CONDITIONAL → Release
1. Document conditions and workarounds
2. Plan future improvements
3. Update user documentation
4. Proceed to release with caveats
