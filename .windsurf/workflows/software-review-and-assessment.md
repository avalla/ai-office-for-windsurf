---
description: Generate comprehensive software review report for technical analysis, security, UX and code quality
---

# Workflow: Software Review & Assessment

This workflow generates a comprehensive technical report on the software status, covering database, backend, frontend, security and UX.

## Prerequisites

- Intended for a product repository with runtime code (for example `apps/`, `supabase/`, `packages/`).
- If used in the framework-only repository, mark missing runtime sections as `N/A` and focus on process/readiness assessment.

---

## 📋 Step 1: Database Analysis (Migrations)

Analyze migrations in `supabase/migrations/` to identify security, modeling and performance issues.

### Database Checklist

- **Schema Design**: Normalized tables, UUID primary keys, foreign keys with indexes
- **RLS Policies**: Does every table have RLS enabled? Are policies tested?
- **Triggers**: Appropriate logic in triggers, no infinite loops
- **Performance**: Indexes on frequently filtered columns
- **Enum Types**: Enum values consistent with business logic
- **Deprecated Objects**: Check if there are deprecated objects on db, e.g. Types, Views, Materialized Views, etc.

### Useful Commands

```bash
# Count migrations and verify order
cd /your/project/path
ls -la supabase/migrations/*.sql | wc -l
head -5 supabase/migrations/*.sql | grep -E "^--|^[0-9]"

# Verify RLS active on all tables
bunx pg-meta query "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename NOT LIKE 'pg_%'"
```

### Expected Output

- List of problematic migrations (if any)
- Tables without RLS (critical)
- Potentially slow queries (missing indexes)
- Refactoring suggestions

---

## 📋 Step 2: Seeds & pgTAP Test Analysis

Verify seed data integrity and database test completeness.

### Seeds Analysis

Check files in `supabase/seeds/`:
- Data consistent with current schema
- No references to removed columns
- Correct insertion order (FK dependencies)

### pgTAP Tests

```bash
# Reset DB and run all tests
bun run supabase db reset
bun run supabase test db
```

### Test Checklist

- **Schema Tests**: Tables, columns, types, constraints
- **RLS Tests**: Access by role (anonymous, user, seller, admin)
- **Trigger Tests**: Verify automatic behavior
- **Business Logic**: State transitions, validations
- **Performance**: Query plan, indexes used

### Expected Output

- Total number of tests and pass/fail
- Missing tests for new features
- Flaky tests to stabilize

---

## 📋 Step 3: Supabase Edge Functions Analysis

Examine Edge Functions in `supabase/functions/`.

### Edge Functions Checklist

- **Type Safety**: TypeScript strict mode, Supabase generated types
- **Error Handling**: Appropriate try/catch, errors not exposed to client
- **Auth**: JWT verification, user claims, role checks
- **Rate Limiting**: Abuse protection
- **Secrets**: No hardcoded secrets, use env vars
- **Logging**: Structured logging with correlation IDs

### Files to Analyze

```
supabase/functions/
├── _shared/
│   ├── supabase.ts          # Client initialization
│   └── cors.ts              # CORS configuration
├── revenuecat-webhooks/     # Webhook handler
└── [other functions]
```

### Useful Commands

```bash
# Type check functions
cd supabase/functions/revenuecat-webhooks
deno check index.ts

# Verify import maps
cat supabase/functions/import_map.json
```

### Expected Output

- Functions without type safety
- Missing error boundaries
- Potential auth vulnerabilities
- Improvement suggestions

---

## 📋 Step 4: Queue System Analysis

Review of the background jobs system in `apps/queues/`.

### Architecture

- **BullMQ**: Redis-based queue for heavy jobs
- **PGMQ**: Postgres-based queue for light jobs
- **Workers**: Separate processes for scalability

### Queue System Checklist

- **Job Definitions**: Clear job types, validated payload (Zod)
- **Error Handling**: Retry logic, dead letter queue
- **Monitoring**: Dashboard job status, alerting
- **Idempotency**: Jobs can be retried without side effects
- **Rate Limiting**: Throttling per job type

### Files to Analyze

```
apps/queues/
├── services/
│   ├── email-queue.ts
│   ├── notification-queue.ts
│   └── auction-queue.ts
├── workers/
│   ├── email-worker.ts
│   └── auction-worker.ts
└── libs/
    └── queue-client.ts
```

### Useful Commands

```bash
# Verify queue dependencies
cd apps/queues
cat package.json | grep -E "bullmq|pgmq"

# Type check
bunx tsc --noEmit
```

### Expected Output

- Jobs without payload validation
- Missing retry logic
- Potential race conditions
- Monitoring suggestions

---

## 📋 Step 5: Frontend Web Analysis (apps/web)

Complete review of the React application.

### Architecture Checklist

- **Type Safety**: TypeScript strict, no `any`, Supabase generated types
- **State Management**: React Query for server state, Context for global UI
- **Routing**: React Router v7 data mode, correct protected routes
- **Performance**: Code splitting, lazy loading, appropriate memoization
- **Security**: Input sanitization, XSS protection, CSRF tokens

### Component Checklist

- **Accessibility**: ARIA labels, focus management, keyboard navigation
- **Responsive**: Mobile-first, appropriate Tailwind breakpoints
- **Error Boundaries**: Graceful degradation, error tracking
- **Loading States**: Skeletons, spinners, optimistic updates

### Form Checklist

- **Validation**: Zod schemas for all forms
- **UX**: Real-time validation, clear error messages
- **Security**: No sensitive data in URL, CSRF protection

### Test Coverage

```bash
cd apps/web

# Type check
bunx tsc --noEmit

# E2E tests
bunx playwright test

# Verify presence of unit tests
find src -name "*.test.ts" -o -name "*.test.tsx" | wc -l
```

### Screenshot Analysis

If screenshots are present in `apps/web/screenshots/`:
- Analyze UX/UI inconsistencies
- Verify responsive design
- Check color contrast, font sizing
- Identify broken layouts

### Expected Output

- Components that are too large (SRP violation)
- Missing error boundaries
- Forms without Zod validation
- UI/UX inconsistencies
- Missing test coverage

---

## 📋 Step 6: Shared Packages Analysis

Review of packages in `packages/`.

### Checklist per Package

- **module-supabase**: Client configuration, type exports, RLS helpers
- **module-types**: Shared TypeScript types, database types
- **module-i18n**: Translation resources, locale detection, RTL support
- **module-logger**: Structured logging, log levels, correlation IDs
- **module-ai**: AI integration, prompt templates, error handling

### Verifications

```bash
# Type check all packages
cd packages/module-supabase && bunx tsc --noEmit
cd packages/module-i18n && bunx tsc --noEmit

# Verify barrel exports
cat packages/module-supabase/index.ts
cat packages/module-i18n/index.ts
```

### Expected Output

- Circular dependencies
- Missing exports
- Type inconsistencies
- Package bloat (too specific)

---

## 📋 Step 7: UX Heuristic Evaluation

Heuristic evaluation of the user interface.

### Nielsen Principles to Verify

1. **Visibility of system status**: Loading states, progress indicators, action feedback
2. **Match between system and real world**: Clear labels, standard iconography
3. **User control and freedom**: Undo/redo, exit from unwanted states
4. **Consistency and standards**: Uniform design system, consistent patterns
5. **Error prevention**: Real-time validation, confirmation for destructive actions
6. **Recognition rather than recall**: Auto-complete, recent items, intelligent defaults
7. **Flexibility and efficiency**: Shortcuts for power users, defaults for novices
8. **Aesthetic and minimalist design**: No clutter, relevant information
9. **Help users recognize, diagnose, and recover from errors**: Clear messages, suggested solutions
10. **Help and documentation**: Tooltips, contextual help, searchable FAQ

### Screenshot Analysis

```bash
# List available screenshots
ls -la apps/web/screenshots/
```

### Project-Specific Checklist

- **Homepage**: Hero performance, clear CTAs, prominent search
- **Detail Pages**: Gallery images, readable specs, evident contacts
- **Dashboard**: Clear navigation, relevant stats, quick actions
- **Creation Wizard**: Step indicator, progress saving, clear validation
- **Messaging**: Readable threads, notification badges, easy compose

### Expected Output

- Nielsen principles violations (prioritized)
- Design system inconsistencies
- Specific responsive issues
- UX improvement suggestions

---

## 📋 Step 8: Security Review

In-depth security analysis.

### Database Security

- **RLS Policies**: All tables protected, no bypass
- **SQL Injection**: Parameterized queries, no string concatenation
- **Secrets**: Database in env vars, regular rotation

### Frontend Security

- **XSS**: Input sanitization, Content Security Policy
- **CSRF**: Tokens for mutations, SameSite cookies
- **Auth**: Secure token storage, refresh logic, logout cleanup
- **Dependencies**: Known vulnerabilities (use `bun audit` or `snyk test`)

### API Security

- **Rate Limiting**: Limits per endpoint, IP-based throttling
- **Input Validation**: Zod schemas for all payloads
- **Output Encoding**: Sensitive data sanitization

### Useful Commands

```bash
# Security audit dependencies
bun audit

# Snyk scan (if configured)
bunx snyk test

# Verify env vars not committed
grep -r "sk-" . --include="*.ts" --include="*.tsx" 2>/dev/null || echo "No hardcoded secrets found"
```

### Expected Output

- Critical vulnerabilities (CVSS > 7)
- Missing security headers
- Weak RLS policies
- Hardcoded secrets

---

## 📋 Step 9: Performance Review

Application performance analysis.

### Frontend Performance

- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: Analysis with `bun build --analyze`
- **Image Optimization**: WebP format, lazy loading, responsive images
- **Code Splitting**: Route-based splitting, lazy components

### Database Performance

- **Query Analysis**: EXPLAIN ANALYZE for slow queries
- **N+1 Queries**: Detection and fix with appropriate joins
- **Indexing**: Indexes on filtered/sorted columns

### API Performance

- **Response Times**: P95 < 200ms for API calls
- **Caching**: React Query cache, HTTP cache headers
- **Compression**: gzip/brotli for responses

### Useful Commands

```bash
# Lighthouse CI (if configured)
bunx lighthouse http://localhost:3000

# Bundle analysis
cd apps/web
bun build --analyze 2>/dev/null || echo "Manual analysis needed"
```

### Expected Output

- Slow queries to optimize
- Components causing excessive re-renders
- Missing cache strategies
- Bundle bloat opportunities

---

## 📋 Step 10: Generate Report Document

Create the file `docs/software-review-YYYY-MM-DD.md` with the complete structure.

### Report Template

```markdown
# 🔍 [Project Name] - Software Review

**Date**: [YYYY-MM-DD]
**Reviewer**: [Name/AI]
**Version**: [Alpha/Beta/RC]
**Commit Ref**: [SHA]

---

## Executive Summary

**General Status**: 🟢 Good / 🟡 Improvable / 🔴 Critical

**Scores by Area**:
| Area | Score | Trend |
|------|-------|-------|
| Database | X/10 | ↑/↓/→ |
| Backend | X/10 | ↑/↓/→ |
| Frontend | X/10 | ↑/↓/→ |
| UX/UI | X/10 | ↑/↓/→ |
| Security | X/10 | ↑/↓/→ |
| Performance | X/10 | ↑/↓/→ |

**Top 3 Priorities**:
1. [Priority 1] - Severity
2. [Priority 2] - Severity
3. [Priority 3] - Severity

---

## 1. Database Review

### Schema & Migrations
- **Total Migrations**: N files
- **Last Migration**: [name]
- **Tables**: N

#### ✅ Strengths
- [List strengths]

#### ⚠️ Issues
| Issue | Severity | File | Description |
|-------|----------|------|-------------|
| [Issue 1] | 🔴 High | [file] | [desc] |
| [Issue 2] | 🟡 Medium | [file] | [desc] |

#### 📝 Suggestions
- [Suggestion 1]
- [Suggestion 2]

### RLS Policies
- **Tables with RLS**: N/N (X%)
- **Total Policies**: N

#### Coverage by Role
| Table | Anonymous | User | Seller | Admin |
|---------|-----------|------|--------|-------|
| listing | ✅ | ✅ | ✅ | ✅ |
| bid | ❌ | ✅ | ✅ | ✅ |

#### RLS Issues
- [Specific issue]

### pgTAP Tests
- **Total Tests**: N
- **Pass**: N | **Fail**: N | **Skip**: N

#### Coverage
| Category | Tests | Status |
|-----------|------|-------|
| Schema | N | ✅ |
| RLS | N | ✅ |
| Triggers | N | ✅ |
| Business Logic | N | ✅ |

#### Test Failure Analysis
- [If present, detailed analysis]

---

## 2. Backend Review

### Edge Functions
| Function | Type Safety | Error Handling | Auth | Rate Limit | Status |
|----------|-------------|----------------|------|------------|--------|
| revenuecat-webhooks | ✅ | ✅ | ✅ | ❌ | 🟡 |

#### Issues
- [Specific issue]

### Queue System (apps/queues)
- **Framework**: BullMQ / PGMQ
- **Workers**: N active
- **Job Types**: [list]

#### Job Reliability
| Job Type | Retry | DLQ | Idempotent | Status |
|----------|-------|-----|------------|--------|
| email | ✅ 3x | ✅ | ✅ | 🟢 |
| notification | ❌ | ❌ | ❌ | 🔴 |

#### Issues
- [Specific issue]

---

## 3. Frontend Review (apps/web)

### Architecture
- **Framework**: React 18 + TypeScript + Bun
- **Router**: React Router v7 (Data Mode)
- **Styling**: Tailwind v4 + Radix UI
- **State**: React Query + Context

#### Type Safety
- **Strict Mode**: ✅ / ❌
- **Type Errors**: N
- **Any Usage**: N occurrences

#### Component Analysis
| Component | Lines | Props | Complexity | Status |
|-----------|-------|-------|------------|--------|
| NewListingPage | 594 | 0 | 🔴 High | ⚠️ |
| ListingCard | 45 | 8 | 🟢 Low | ✅ |

#### Architecture Issues
- [Specific issue]

### Test Coverage
| Type | Count | Coverage | Status |
|------|-------|----------|--------|
| Unit | N | X% | 🟡 |
| E2E (Playwright) | 5 | - | 🟡 |
| Visual Regression | 0 | 0% | 🔴 |

#### Test Gaps
- [Area without tests]

### Form & Validation
| Form | Zod Schema | Error UX | Status |
|------|------------|----------|--------|
| Login | ✅ | ✅ | 🟢 |
| New Listing | ❌ | 🟡 | 🔴 |

---

## 4. UX/UI Review

### Heuristic Evaluation

| Principle | Score | Note |
|-----------|-------|------|
| Visibility of status | X/10 | [Note] |
| Match real world | X/10 | [Note] |
| User control | X/10 | [Note] |
| Consistency | X/10 | [Note] |
| Error prevention | X/10 | [Note] |
| Recognition > recall | X/10 | [Note] |
| Flexibility | X/10 | [Note] |
| Minimalist design | X/10 | [Note] |
| Error recovery | X/10 | [Note] |
| Help docs | X/10 | [Note] |

### Screenshots Analysis
[If available]

### Inconsistencies Found
- [Inconsistency 1]
- [Inconsistency 2]

### UX Suggestions
- [Suggestion 1]
- [Suggestion 2]

---

## 5. Security Review

### Vulnerabilities
| CVE/Severity | Component | Description | Fix |
|--------------|------------|-------------|-----|
| [If present] | | | |

### RLS Bypass Risks
- [Risk analysis]

### Secrets & Env
- **Hardcoded Secrets**: N found
- **Env Files**: .env.example updated? ✅/❌

### Headers & CSP
- **CSP**: Configured? ✅/❌
- **X-Frame-Options**: ✅/❌
- **HSTS**: ✅/❌

---

## 6. Performance Review

### Core Web Vitals (estimated)
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| LCP | < 2.5s | Xs | 🟢/🟡/🔴 |
| FID | < 100ms | Xms | 🟢/🟡/🔴 |
| CLS | < 0.1 | X | 🟢/🟡/🔴 |

### Bundle Analysis
- **Main Bundle**: X KB (gzipped)
- **Vendor Bundle**: X KB
- **Code Split Points**: N

### Query Performance
| Query | Time | Index Used | Note |
|-------|------|------------|------|
| listing search | Xms | ✅ | |
| profile fetch | Xms | ❌ | Missing index |

### Optimization Opportunities
- [Opp 1]
- [Opp 2]

---

## 7. Action Items

### 🔴 Critical (Immediate fix)
- [ ] [Action 1] - Owner - ETA
- [ ] [Action 2] - Owner - ETA

### 🟡 High (Next sprint)
- [ ] [Action 1] - Owner - ETA
- [ ] [Action 2] - Owner - ETA

### 🟢 Medium (Backlog)
- [ ] [Action 1] - Owner
- [ ] [Action 2] - Owner

---

## Appendix

### Tools Used
- pgTAP for DB tests
- bunx tsc for type checking
- Manual code review
- [Other tools]

### References
- docs/STATUS_REPORT.md
- docs/DEVELOPMENT_PLAN.md
- supabase/migrations/
- apps/web/src/
```

---

## 📁 Output Files

The workflow produces:

- `docs/software-review-YYYY-MM-DD.md` - Full report with all sections
- `docs/software-review-YYYY-MM-DD-summary.md` - Executive summary only (optional)

---

## 🔄 Recommended Frequency

- **Full review**: Every 4 weeks (monthly)
- **Partial review**: Every sprint (2 weeks) on specific area
- **Security review**: Every 2 weeks or after major changes
- **Performance review**: Before every milestone/release

---

## 📊 Pre-Review Checklist

Before starting, verify:

- [ ] Database reset and tests passing
- [ ] Codebase committed (no uncommitted changes)
- [ ] Screenshots updated (if doing UX review)
- [ ] Access to all necessary tools

