---
description: Enhanced review checklist templates for two-cycle review process
---

# Enhanced Review Checklists

## Cycle 1: Technical Review Checklist

### Code Quality Validation
- [ ] **No Mocked Implementations**
  - [ ] All API endpoints are real (not mock servers)
  - [ ] Database connections use actual schemas
  - [ ] External services are integrated (not stubbed)
  - [ ] File operations work with real storage
  - [ ] Authentication uses real user accounts

- [ ] **No Critical Placeholders**
  - [ ] No TODO comments in production code
  - [ ] No FIXME markers without tickets
  - [ ] No placeholder functions or empty implementations
  - [ ] No hardcoded credentials or config values
  - [ ] No debug code left in production paths

- [ ] **Integration Completeness**
  - [ ] All external API integrations implemented
  - [ ] Database migrations tested and reversible
  - [ ] Third-party services connected and authenticated
  - [ ] Webhooks and callbacks configured
  - [ ] Error handling for all external dependencies

### Architecture & Design
- [ ] **ADR Compliance**
  - [ ] Follows established architecture patterns
  - [ ] Consistent with project ADRs
  - [ ] Proper separation of concerns
  - [ ] Maintainable code structure
  - [ ] Scalable design decisions

- [ ] **Code Standards**
  - [ ] Follows language-specific best practices
  - [ ] Consistent naming conventions
  - [ ] Proper error handling patterns
  - [ ] Resource management (memory, connections)
  - [ ] Thread/concurrency safety where applicable

### Security Review
- [ ] **Input Validation**
  - [ ] All user inputs sanitized
  - [ ] SQL injection protection in place
  - [ ] XSS prevention implemented
  - [ ] File upload security checks
  - [ ] API rate limiting configured

- [ ] **Authentication & Authorization**
  - [ ] Secure password handling
  - [ ] Proper session management
  - [ ] Role-based access control
  - [ ] API authentication tokens secure
  - [ ] SSO integration tested

### Testing Coverage
- [ ] **Unit Tests**
  - [ ] Core business logic tested
  - [ ] Edge cases covered
  - [ ] Error conditions tested
  - [ ] Minimum 80% code coverage
  - [ ] All critical paths tested

- [ ] **Integration Tests**
  - [ ] Database operations tested
  - [ ] External API integrations tested
  - [ ] End-to-end user flows tested
  - [ ] Error scenarios tested
  - [ ] Performance benchmarks defined

---

## Cycle 2: Production Readiness Checklist

### Environment Validation
- [ ] **Staging Deployment**
  - [ ] Successfully deployed to staging
  - [ ] Environment variables configured
  - [ ] Database schema applied
  - [ ] External services connected
  - [ ] SSL certificates valid

- [ ] **Real Data Testing**
  - [ ] Production-like data set used
  - [ ] Data privacy maintained (sanitized)
  - [ ] Performance tested with realistic volume
  - [ ] Data integrity verified
  - [ ] Backup/restore tested

### Performance & Scalability
- [ ] **Response Time Benchmarks**
  - [ ] API response times under SLA
  - [ ] Database query performance optimized
  - [ ] Frontend load times acceptable
  - [ ] Background jobs complete timely
  - [ ] Caching strategies effective

- [ ] **Load Testing**
  - [ ] Concurrent user load tested
  - [ ] Peak traffic scenarios validated
  - [ ] Resource limits identified
  - [ ] Auto-scaling configured (if applicable)
  - [ ] Memory usage stable under load

### Production Integration
- [ ] **External Services**
  - [ ] All third-party APIs connected
  - [ ] Webhooks receiving and processing
  - [ ] Email services functional
  - [ ] Payment gateways tested (if applicable)
  - [ ] CDN/distribution working

- [ ] **Monitoring & Logging**
  - [ ] Application logging configured
  - [ ] Error tracking implemented
  - [ ] Performance monitoring active
  - [ ] Health checks functional
  - [ ] Alert thresholds set

### Security Production Check
- [ ] **Live Security Validation**
  - [ ] Authentication flows tested end-to-end
  - [ ] Authorization permissions verified
  - [ ] Session management secure
  - [ ] HTTPS properly configured
  - [ ] Security headers implemented

- [ ] **Data Protection**
  - [ ] Sensitive data encrypted at rest
  - [ ] Data transmission encrypted
  - [ ] PII handling compliant
  - [ ] Audit logging enabled
  - [ ] Data retention policies applied

### Operational Readiness
- [ ] **Deployment Process**
  - [ ] Automated deployment pipeline
  - [ ] Rollback procedure tested
  - [ ] Database migration scripts verified
  - [ ] Configuration management
  - [ ] Zero-downtime deployment (if required)

- [ ] **Support Infrastructure**
  - [ ] Documentation updated
  - [ ] Support runbooks prepared
  - [ ] On-call procedures defined
  - [ ] User guides updated
  - [ ] Training materials prepared

---

## Review Evidence Templates

### Task Review Evidence
```markdown
## Review Evidence - [Task Name]

**Reviewer:** [Name]
**Date:** [Timestamp]
**Review Cycle:** [1/2]

### Cycle 1: Technical Review
- **Code Quality:** [PASS/FAIL]
  - Mock Code Detected: [Yes/No]
  - Critical Issues: [List]
  - Integration Status: [Complete/Incomplete]

- **Architecture:** [PASS/FAIL]
  - ADR Compliance: [Yes/No]
  - Design Patterns: [Appropriate/Needs Improvement]
  - Maintainability: [Good/Fair/Poor]

- **Security:** [PASS/FAIL]
  - Input Validation: [Complete/Incomplete]
  - Authentication: [Secure/Needs Work]
  - Data Protection: [Adequate/Inadequate]

- **Testing:** [PASS/FAIL]
  - Unit Test Coverage: [X%]
  - Integration Tests: [Pass/Fail]
  - Edge Cases: [Covered/Missing]

### Cycle 2: Production Readiness
- **Staging Deployment:** [PASS/FAIL]
  - Environment: [Staging URL]
  - Issues Found: [List]
  - Resolution: [Complete/Pending]

- **Performance:** [PASS/FAIL]
  - Response Times: [Within SLA/Exceeds SLA]
  - Load Testing: [Passed/Failed]
  - Resource Usage: [Optimal/High]

- **Integration:** [PASS/FAIL]
  - External APIs: [All Connected/Some Missing]
  - Real Data Testing: [Complete/Partial]
  - Error Handling: [Robust/Needs Improvement]

- **Security:** [PASS/FAIL]
  - Live Auth Testing: [Passed/Failed]
  - Data Encryption: [Verified/Not Verified]
  - Monitoring: [Configured/Missing]

### Final Decision
- **Overall Status:** [PASS/FAIL]
- **Ready for Next Cycle:** [Yes/No]
- **Blockers:** [List if any]
- **Evidence Links:** [Links to tests, deployments, screenshots]

### Feedback for Development
- **Strengths:** [What went well]
- **Issues:** [What needs fixing]
- **Recommendations:** [Improvement suggestions]
```

### Production Readiness Declaration
```markdown
## Production Readiness Declaration

**Project:** [Project Name]
**Feature:** [Feature Name]
**Date:** [Timestamp]

### Declaration Statement
I, [Reviewer Name], certify that this feature has passed both technical review and production readiness validation and is ready for user acceptance testing.

### Validation Summary
- **Cycle 1 (Technical):** [PASS/FAIL] on [Date]
- **Cycle 2 (Production):** [PASS/FAIL] on [Date]
- **No Mock Code:** [Verified]
- **Real Integrations:** [All Connected]
- **Performance Benchmarks:** [Met]
- **Security Validation:** [Passed]

### Production Environment Tested
- **Staging URL:** [URL]
- **Database:** [Schema Version]
- **External Services:** [List connected]
- **Performance Metrics:** [Key metrics]

### Risks and Mitigations
- **Known Risks:** [List any remaining risks]
- **Mitigations in Place:** [How risks are addressed]
- **Monitoring:** [What is monitored post-release]

### Approval Signature
**Reviewer:** [Name/Title]
**Contact:** [Email/Slack]
**Approval Date:** [Timestamp]
```
