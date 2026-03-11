# Workflow: Technical Debt Assessment

## ROLE
Senior Developer + Architect

## GOAL
Comprehensive technical debt analysis and code quality assessment to guide refactoring priorities and architectural decisions.

## INPUTS
- Project codebase analysis
- Build system outputs
- Test coverage reports
- Dependency manifests
- Performance metrics

## OUTPUTS (must)
- `office/reports/technical/YYYY-MM-DD-tech-debt-assessment.md`
- Code quality metrics and trends
- Refactoring priority matrix
- Architectural risk assessment
- Cost-benefit analysis for technical improvements

## ASSESSMENT AREAS

### 1. Code Quality Metrics
- **Complexity Analysis**: Cyclomatic complexity, maintainability index
- **Code Duplication**: Duplicate code blocks, shared logic opportunities
- **Test Coverage**: Unit, integration, E2E coverage by module
- **Code Churn**: High-change files, hotspots of activity
- **Documentation Coverage**: API docs, inline documentation quality

### 2. Dependency Analysis
- **Outdated Dependencies**: Security patches, version compatibility
- **License Compliance**: Open source license risks
- **Dependency Graph**: Circular dependencies, coupling analysis
- **Bundle Size Impact**: Large dependencies, optimization opportunities
- **Supply Chain Security**: Vulnerable transitive dependencies

### 3. Architecture Assessment
- **Design Pattern Compliance**: SOLID principles, architectural patterns
- **Module Coupling**: Tight coupling, high cohesion violations
- **Technical Layer Boundaries**: Cross-layer violations, separation of concerns
- **Scalability Issues**: Bottlenecks, performance constraints
- **Security Architecture**: Authentication patterns, data flow security

### 4. Performance Analysis
- **Database Performance**: Query optimization, indexing strategy
- **Frontend Performance**: Bundle size, rendering performance
- **API Performance**: Response times, throughput analysis
- **Memory Usage**: Memory leaks, resource management
- **Scalability Metrics**: Load testing results, capacity planning

## TECHNICAL DEBT CLASSIFICATION

### **CRITICAL** (Immediate Action Required)
- Security vulnerabilities in production
- Performance issues affecting users
- Blocking architectural constraints
- Compliance violations

### **HIGH** (Next Sprint Priority)
- Code complexity > 10
- Test coverage < 70%
- Outdated dependencies with known issues
- Performance degradation > 20%

### **MEDIUM** (Planned Refactoring)
- Code duplication > 15%
- Documentation gaps
- Minor performance issues
- Architectural improvements

### **LOW** (Technical Improvements)
- Code style inconsistencies
- Minor optimization opportunities
- Documentation enhancements
- Tooling improvements

## ASSESSMENT TOOLS

### Static Analysis
- **SonarQube**: Code quality, security, coverage
- **ESLint/TSLint**: Code style, potential errors
- **Complexity Analyzers**: Maintainability, cognitive complexity
- **Dependency Checkers**: Outdated packages, security scans

### Performance Analysis
- **Lighthouse**: Frontend performance, accessibility
- **Bundle Analyzers**: Webpack Bundle Analyzer
- **Database Profilers**: Query performance analysis
- **Load Testing**: k6, Artillery

### Architecture Analysis
- **Dependency Graph Tools**: Madge, dependency-cruiser
- **Code Visualization**: Sourcegraph, CodeCity
- **Pattern Detection**: Architectural pattern compliance
- **Security Analysis**: Snyk, OWASP tools

## REPORT STRUCTURE

### Executive Summary
- Overall technical debt score
- Critical issues requiring immediate attention
- Estimated remediation cost
- Business impact assessment

### Detailed Analysis
#### Code Quality Metrics
| Metric | Current | Target | Trend | Priority |
|--------|---------|--------|-------|----------|
| Cyclomatic Complexity | 8.2 | < 10 | → | MEDIUM |
| Test Coverage | 72% | > 80% | ↑ | HIGH |
| Code Duplication | 18% | < 10% | ↓ | HIGH |
| Documentation Coverage | 65% | > 90% | ↑ | MEDIUM |

#### Technical Debt Hotspots
1. **Module Name** - Issue description, impact, remediation cost
2. **Module Name** - Issue description, impact, remediation cost

#### Dependency Health
- **Outdated Dependencies**: 12 packages, 3 critical
- **Security Issues**: 5 vulnerabilities, 2 critical
- **License Risks**: 2 non-compliant licenses

### Refactoring Roadmap
#### Immediate (Next Sprint)
- [ ] Fix critical security vulnerabilities
- [ ] Improve test coverage in core modules
- [ ] Update outdated dependencies

#### Short-term (Next Month)
- [ ] Refactor high-complexity functions
- [ ] Eliminate code duplication
- [ ] Improve documentation

#### Long-term (Next Quarter)
- [ ] Architectural improvements
- [ ] Performance optimization
- [ ] Tooling enhancements

## COST-BENEFIT ANALYSIS

### Investment Required
- **Development Time**: 40 hours estimated
- **Testing & Validation**: 16 hours
- **Documentation**: 8 hours
- **Total Investment**: 64 hours

### Expected Benefits
- **Reduced Bug Rate**: 30% reduction in production issues
- **Development Velocity**: 20% increase in feature delivery
- **Maintenance Costs**: 25% reduction in ongoing maintenance
- **Team Satisfaction**: Improved developer experience

### ROI Calculation
- **Current Cost**: $X/month in bug fixes and maintenance
- **Projected Cost**: $Y/month after refactoring
- **Payback Period**: Z months
- **Annual Savings**: $Z/year

## MULTI-SECTOR REVIEW
- **Technical Review**: Code quality, architecture, performance
- **Business Review**: Cost-benefit analysis, risk assessment
- **Security Review**: Vulnerability assessment, compliance
- **Operations Review**: Maintainability, support impact

## ACTION ITEMS
1. **Critical**: Address security vulnerabilities within 1 week
2. **High**: Plan refactoring for next sprint
3. **Medium**: Schedule technical debt reduction in roadmap
4. **Low**: Include in ongoing development practices

## MONITORING
- **Monthly**: Technical debt assessment
- **Quarterly**: Architecture health review
- **Annual**: Comprehensive code quality audit

---

Created: 2026-03-11
