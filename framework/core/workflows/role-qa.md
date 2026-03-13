---
description: Guidance for QA and Review roles — testing, validation, code review
---

# Role: QA & Review

## Stages Covered
- `qa` — Execute test plan, validate acceptance criteria
- `review` — Multi-sector code review, enforce Definition of Done

---

## QA Validation

### 1. Security Check (Optional)
- Check if security pentest report exists from `security` stage
- Review CRITICAL or HIGH security findings
- Document security clearance status in QA plan

### 2. Review WIP Tasks
- Use `ai_office_task_list` with `column: "WIP"` to find tasks ready for QA
- Validate all acceptance criteria are completed
- Check implementation evidence exists

### 3. Execute Test Plan
- Use `ai_office_scaffold` with `type: "testplan"` if test plan doesn't exist
- Execute tests against each task's acceptance criteria
- Record PASS/FAIL results

### Test Strategy
| Type | Focus | When |
|------|-------|------|
| Unit | Individual functions, edge cases | Every task |
| Integration | Module interactions, API contracts | Feature completion |
| E2E | User flows, acceptance criteria | Before review |
| Security | Vulnerability scanning, auth checks | If security stage was run |

### 4. Move Tasks
- **PASS:** Use `ai_office_task_move` to move from `WIP` to `REVIEW`
- **FAIL:** Move back to `WIP` with detailed feedback in task file

### QA Checklist
- [ ] All WIP tasks reviewed for readiness
- [ ] Test plan executed and results recorded
- [ ] Security findings reviewed (if applicable)
- [ ] Passed tasks moved to REVIEW
- [ ] Failed tasks returned with specific feedback
- [ ] Status file updated with QA evidence

### Loop Guard
- On FAIL: `qa_iteration` increments automatically via `ai_office_advance`
- If `qa_iteration > 2`: pipeline moves to `blocked`, planner must intervene
- On PASS: advance to `review`

---

## Enhanced Code Review

### Review Cycle Structure
The review process now includes **two mandatory cycles** for comprehensive validation:

1. **Cycle 1: Technical Review** - Code quality, architecture, security
2. **Cycle 2: Production Readiness** - Integration, performance, real-world testing

---

## Cycle 1: Technical Review

### 1. Initial Review Tasks in REVIEW
- Use `ai_office_task_list` with `column: "REVIEW"`
- Validate all acceptance criteria met and tested
- Review QA results and implementation evidence

### 2. Multi-Sector Technical Review
- Use `ai_office_review` to generate the full review checklist
- Execute checks across all 6 sectors:

| Sector | Key Questions |
|--------|--------------|
| **Product** | Aligns with PRD? Acceptance criteria clear? |
| **Architecture** | Follows ADR patterns? Maintainable? |
| **Security** | Inputs validated? Secrets managed? Auth correct? |
| **Reliability** | Errors handled? Logging present? Race conditions? |
| **QA** | Sufficient tests? Edge cases covered? |
| **Operations** | Deployment documented? Monitoring considered? |

### 3. Technical Review Validation
- **No Mocked Code**: All implementations must be real, functional code
- **No TODO/FIXME**: Critical placeholders must be resolved
- **Integration Points**: All external integrations tested and working
- **Database Schema**: migrations tested, rollback plans documented

### 4. Cycle 1 Decision
- **PASS**: Move to Cycle 2 (Production Readiness)
- **FAIL**: Return to `dev` with specific technical feedback

---

## Cycle 2: Production Readiness Review

### Trigger: Cycle 1 PASS
Only tasks that pass Technical Review advance to Production Readiness.

### 1. Production Environment Validation
- **Staging Deployment**: Deploy to staging environment
- **Real Data Testing**: Use production-like data (sanitized)
- **External Services**: Test with actual external APIs/services
- **Performance Testing**: Load testing with realistic scenarios

### 2. Integration Testing
| Integration Type | Validation Required |
|------------------|-------------------|
| **Database** | Real connections, transaction integrity |
| **External APIs** | Auth tokens, rate limits, error handling |
| **Third-party Services** | Webhooks, callbacks, notifications |
| **File Storage** | Upload/download, permissions, cleanup |
| **Authentication** | Real user accounts, permissions, SSO |

### 3. No Mock Validation Checklist
- [ ] All API calls use real endpoints (no mock servers)
- [ ] Database connections use production-like schema
- [ ] File operations work with actual storage systems
- [ ] Authentication uses real user accounts
- [ ] External services are integrated and functional
- [ ] Error handling works with real failure scenarios
- [ ] Logging captures real operational data

### 4. Performance & Scalability
- **Response Times**: Meet defined SLA under load
- **Concurrent Users**: Support expected user load
- **Memory Usage**: No memory leaks, efficient usage
- **Database Performance**: Query optimization tested
- **Resource Limits**: Respect infrastructure constraints

### 5. Security Validation
- **Authentication Flow**: Complete login/logout cycles
- **Authorization**: Real permission testing
- **Data Protection**: Sensitive data properly handled
- **Input Validation**: Real user input scenarios
- **Session Management**: Secure token handling

### 6. Production Readiness Decision
- **PASS**: Move to `user_acceptance`
- **FAIL**: Return to `dev` with production readiness feedback

---

## Enhanced Review Process

### Review Evidence Requirements

#### For Each Task
```markdown
## Review Evidence - [Task Name]

### Cycle 1: Technical Review
- Code Quality: [PASS/FAIL] - [Details]
- Architecture: [PASS/FAIL] - [Details]
- Security: [PASS/FAIL] - [Details]
- Tests: [PASS/FAIL] - [Coverage %]
- No Mocks: [Verified] - [Method]

### Cycle 2: Production Readiness
- Staging Deploy: [PASS/FAIL] - [Environment]
- Real Data: [PASS/FAIL] - [Data source]
- Performance: [PASS/FAIL] - [Metrics]
- Integration: [PASS/FAIL] - [Services tested]

### Final Decision
- Overall: [PASS/FAIL]
- Reviewer: [Name]
- Date: [Timestamp]
- Evidence: [Links to proof]
```

### Review Loop Guards

| Loop | Max Iterations | On Exceed |
|------|---------------|-----------|
| Review Cycle 1 ↔ Dev | 2 | `state: blocked`, `owner: planner` |
| Review Cycle 2 ↔ Dev | 1 | `state: blocked`, `owner: planner` |

**Note**: Cycle 2 has stricter limits because it should only fail for production readiness issues.

### Enhanced Review Checklist

#### Cycle 1: Technical Review
- [ ] All REVIEW tasks evaluated for technical quality
- [ ] Multi-sector technical review completed
- [ ] No mocked code or placeholders found
- [ ] All integrations implemented and tested
- [ ] Database schema and migrations validated
- [ ] Security review completed
- [ ] Code quality standards met

#### Cycle 2: Production Readiness
- [ ] Staging deployment successful
- [ ] Real data testing completed
- [ ] All external services integrated
- [ ] Performance benchmarks met
- [ ] Security validation with real auth
- [ ] Error handling tested in real scenarios
- [ ] Monitoring and logging operational

### Status Schema Updates
Add to status schema:
- `review_cycle`: integer (1 or 2)
- `review_cycle1_pass`: boolean
- `review_cycle2_pass`: boolean
- `production_ready`: boolean
- `mock_code_detected`: boolean

---

## After Review Completion

### Double PASS → User Acceptance
1. Both cycles completed successfully
2. All evidence documented
3. Production readiness confirmed
4. Use `ai_office_advance` to move to `user_acceptance`

### Any FAIL → Development
1. Document specific cycle and reason for failure
2. Return to `dev` with clear feedback
3. Increment appropriate iteration counter
4. Plan re-testing after fixes

### After Completion

Use `ai_office_advance` to move to the next stage:
- QA PASS → `review`
- Review PASS → `user_acceptance`
- FAIL → `dev` (with loop guard check)
