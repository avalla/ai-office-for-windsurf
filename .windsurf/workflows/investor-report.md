---

description: Generate project status report for investors with roadmap, completed work, in progress and pending tasks
---

# Workflow: Project Status Report for Investors

This workflow generates a complete project status report for investors, including comparison with the previous report to highlight progress.

## Prerequisites

- Intended for a product repository with runtime code (for example `apps/`, `supabase/`, `packages/`).
- If used in the framework-only repository, keep unavailable sections marked as `N/A` and focus on workflow/artifact progress.

## 📋 Step 1: Recent Data Collection

Analyze commits from the last 2 weeks to understand what has been done:

```bash
# Run in your project directory
git log --oneline --since="2 weeks ago" --no-merges --stat
```

Take note of:
- Modified files by area (apps/web, supabase, packages)
- New DB migrations added
- New tests added
- New UI pages/components

---

## 📋 Step 2: Retrieve Previous Report

Find the most recent previous report for comparison:

```bash
# List existing reports sorted by date
ls -la docs/investor-report-*.md 2>/dev/null | sort -t'-' -k4 -k5 -k6

# Or search for previous weekly reports
ls -la docs/weekly-report-*.md 2>/dev/null | sort -t'-' -k3 -k4 -k5
```

Identify:
- **Previous report**: `docs/investor-report-YYYY-MM-DD.md` (or weekly)
- **Previous date**: [PREV_REPORT_DATE]

Read the previous report and extract:
- Previous milestone status (completion percentages)
- Reported issues (resolved/persist/new)
- Features "In Progress" that are now "Completed"
- Previous metrics (commits, tests, coverage)

---

## 📋 Step 3: Feature Status Analysis

Read the reference documents for current status:

1. **Status Report**: `docs/STATUS_REPORT.md` - detailed work progress status
2. **Development Plan**: `docs/DEVELOPMENT_PLAN.md` - implementation status
3. **Previous Weekly Report**: `docs/weekly-report-*.md` (most recent)
4. **Billing/Monetization**: `docs/BILLING.md` - payment integration status

---

## 📋 Step 4: Test Coverage Verification

Count database tests and verify they pass:

```bash
# Count pgTAP test files
ls -la supabase/tests/database/*.test.sql | wc -l

# Run DB tests (optional, requires local DB)
bun run supabase test db
```

---

## 📋 Step 5: Generate Report Document

Create the file `docs/investor-report-YYYY-MM-DD.md` with the following structure:

### Detailed Report Structure

```markdown
# 📊 [Project Name] - Investor Project Status Report

**Date**: [TODAY]
**Version**: [Alpha/Beta/RC]
**Reference Period**: Last 2 weeks
**Previous Report**: [PREV_REPORT_DATE]

---

## 1. Executive Summary

[Summary in 3-5 bullet points of general status]

---

## 2. Differences from Previous Report

### 📈 Key Progress (from [PREV_REPORT_DATE])

| Area | Previous Status | Current Status | Delta |
|------|---------------|----------------|-------|
| **Milestone 1 - MVP Core** | [%] | [%] | [+/-N%] |
| **Milestone 2 - Auctions** | [%] | [%] | [+/-N%] |
| **Milestone 3 - Monetization** | [%] | [%] | [+/-N%] |
| **DB Tests** | [N] | [N] | [+/-N] |
| **Commits** | [N] | [N] | [+/-N] |

### ✅ Completed Features (new from [PREV_REPORT_DATE])

1. **[FEATURE 1]**: [brief completion description]
2. **[FEATURE 2]**: [brief completion description]

### 🆕 New Issues (to monitor)

- [List new issues that emerged]

### 🔧 Resolved Issues (from [PREV_REPORT_DATE])

- [List issues from previous report now resolved]

---

## 3. Complete Roadmap

### 🎯 Milestone 1: MVP Core (Target: [DATE])
| Feature | Status | % Completion |
|---------|--------|---------------|
| Authentication | ✅ Completed | 100% |
| Profile Management | ✅ Completed | 100% |
| Core Feature A | ✅ Completed | 100% |
| Core Feature B | ✅ Completed | 95% |
| Feature C | 🔄 In Progress | 80% |
| Feature D | 🔄 In Progress | 90% |

### 🎯 Milestone 2: Module A (Target: [DATE])
| Feature | Status | % Completion |
|---------|--------|---------------|
| Backend Module A | ✅ Completed | 100% |
| API Endpoint 1 | ✅ Completed | 100% |
| API Endpoint 2 | ✅ Completed | 100% |
| UI Module A | 🔄 In Progress | 60% |
| Realtime Updates | ⏳ To Do | 30% |

### 🎯 Milestone 3: Monetization (Target: [DATE])
| Feature | Status | % Completion |
|---------|--------|---------------|
| Subscription Schema | ✅ Completed | 100% |
| Payment Webhooks | ⏳ To Do | 10% |
| Purchase Flow | ⏳ To Do | 0% |
| Pricing Page | 🔄 In Progress | 50% |

### 🎯 Milestone 4: Mobile App (Target: [DATE])
| Feature | Status | % Completion |
|---------|--------|---------------|
| Mobile Setup | ✅ Completed | 100% |
| Auth Flow | ⏳ To Do | 0% |
| Core Screens | ⏳ To Do | 0% |

---

## 3. Work Detail Last 2 Weeks

### 3.1 Backend (Supabase)

**New Migrations**:
- [List migrations added with description]

**New Tests**:
- [List tests added]

**Updated Functions**:
- [List modified functions]

### 3.2 Frontend Web (apps/web)

**New/Updated Pages**:
- [List pages with change description]

**Components**:
- [List new/modified components]

**i18n**:
- [Translation status]

### 3.3 Shared Packages

**Changes**:
- [List changes to packages]

### 3.4 DevOps / CI

**Changes**:
- [GitHub Actions, configurations, etc.]

---

## 4. Technical Status

### 4.1 Database
- **Total Migrations**: [N] SQL files
- **pgTAP Tests**: [N] files, ~[N] assertions
- **RLS Policies**: 100+ active policies
- **Cron Jobs**: 6 scheduled jobs

### 4.2 Web App
- **Framework**: React 18 + TypeScript + Bun
- **Pages implemented**: [N]/[TOTAL]
- **Typecheck**: ✅ Pass / ❌ Errors

### 4.3 Mobile App
- **Framework**: React Native + Expo
- **Status**: Scaffolding (5%)

---

## 5. Issues and Blockers

### 🔴 Critical (Blocking for Beta)
1. **[ISSUE 1]**: [Description and impact]
2. **[ISSUE 2]**: [Description and impact]

### 🟡 Moderate
1. **[ISSUE 1]**: [Description]

### 🟢 Low
1. **[ISSUE 1]**: [Description]

---

## 6. Next Steps (Next 2 Weeks)

1. **[PRIORITY 1]**: [Description] - [Owner] - [ETA]
2. **[PRIORITY 2]**: [Description] - [Owner] - [ETA]
3. **[PRIORITY 3]**: [Description] - [Owner] - [ETA]

---

## 7. Key Metrics

| Metric | Value | Trend |
|--------|-------|-------|
| Commits last 14 days | [N] | ↑/↓/→ |
| Files modified | [N] | ↑/↓/→ |
| DB Tests | [N] | ↑/↓/→ |
| Estimated coverage | [N]% | ↑/↓/→ |

---

## 8. Timeline to Beta

```
[TODAY] ─────────────────────────────────────────────► [BETA]
         │                    │                    │
    Billing/RC           Module A UI            Mobile MVP
    (2-3 weeks)           (2 weeks)             (6-8 weeks)
```

**Estimated Beta Date**: [DATE]

---

# 📝 Executive Summary

[Condensed version in 1 page for quick read]

## General Status: [🟢 On Track / 🟡 At Risk / 🔴 Blocked]

**What works today**:
- ✅ [Feature 1]
- ✅ [Feature 2]
- ✅ [Feature 3]

**What's missing for Beta**:
- ⏳ [Feature 1] - [N] weeks
- ⏳ [Feature 2] - [N] weeks

**Main Risk**: [Brief description]

**Required Requests/Decisions**: [If any]
```

---

## 📋 Step 6: Populate the Report

Use the collected information to fill in each section:

### Data sources for each section:

| Section | Source |
|---------|-------|
| Differences | Previous report `docs/investor-report-YYYY-MM-DD.md` |
| Roadmap | `docs/STATUS_REPORT.md` + `docs/DEVELOPMENT_PLAN.md` |
| Last 2 weeks work | `git log` output + modified files |
| Technical status | Count files in `supabase/migrations/`, `supabase/tests/database/` |
| Issues | `docs/STATUS_REPORT.md` risks section + TODO.md if exists |
| Next steps | `docs/STATUS_REPORT.md` operational roadmap section |

---

## 📋 Step 7: Verify and Save

1. Verify that all sections are filled
2. Check that numbers are consistent with codebase reality
3. Save file to `docs/investor-report-YYYY-MM-DD.md`
4. Optional: create a PDF version for distribution

---

## 📋 Step 8: Generate Final Summary

At the end of the detailed document, always add an **Executive Summary** of maximum 1 page containing:

1. **General status** (traffic light: green/yellow/red)
2. **3-5 main achievements** from the last 2 weeks
3. **Top 3 issues** with impact and timeline
4. **Estimated Beta date** with confidence level
5. **Any requests/decisions** needed from stakeholders

---

## 🔄 Recommended Frequency

- **Full report**: Every 2 weeks (aligned with sprint)
- **Quick update**: Weekly (only sections 2, 4, 6, 7)

---

## 📁 Output Files

The workflow produces:
- `docs/investor-report-YYYY-MM-DD.md` - Full report
- (Optional) `docs/investor-report-YYYY-MM-DD-summary.md` - Executive summary only
