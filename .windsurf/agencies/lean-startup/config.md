---
agency: lean-startup
name: Lean Startup
description: Rapid MVP development with minimal viable processes
---

# Lean Startup Configuration

## Overview

Streamlined agency for rapid MVP development and prototyping. Minimizes overhead to maximize speed. Focuses on validated learning and iterative development.

## Agent Roster

### Active Agents (7)

| Layer | Agents | Active |
|-------|--------|--------|
| Orchestration | Router | ✅ |
| Executive | CEO, PM | ✅ |
| Design | UX Researcher, Designer | ❌ (combined with PM) |
| Creative | Audio Creator, Video Creator, Image Creator, Game Developer | ❌ |
| Technical | Architect, Developer, Security | ✅ (Developer leads) |
| Quality | QA, Reviewer | ❌ (Developer self-reviews) |
| Operations | Planner, Release Manager, Ops | ❌ (CEO handles) |

### Agent Assignments

| Role | Agent | Responsibilities |
|------|-------|------------------|
| **Founder** | CEO | Vision, decisions, releases |
| **Product** | PM | Requirements, design, validation |
| **Engineering** | Developer | Implementation, testing, deployment |
| **Architecture** | Architect | Technical decisions (consulted) |

## Workflow Pipeline

```
Router → PM (Hypothesis) → CEO (Approve) → Developer (Build) → CEO (Validate)
    → Developer (Iterate) → Release (Ship)
```

## Quality Gates

| Gate | Required Approvals |
|------|-------------------|
| Feature Decision | CEO |
| MVP Release | CEO |

**Note:** Minimal gates for speed. Trust over process.

## Proposed Software Stack

Reference baseline: `.windsurf/software-mcp-proposals.md` (Agency-Level Proposal Matrix).

| Software | Purpose |
|----------|---------|
| TypeScript + React (Vite/Next.js) | Rapid MVP UI development |
| Node.js/Bun | Fast backend/API iteration |
| Supabase | Managed auth/data/storage for quick validation |
| Vitest/Jest + Playwright | Lean automated test coverage |
| Analytics dashboard tooling | Build-measure-learn decision support |

## MCP Adapters

### Core (All Projects)

| Adapter | Usage |
|---------|-------|
| `supabase` | Backend, auth, database |
| `playwright` | Quick E2E tests |
| `fetch` | Documentation lookup |

### Optional

| Adapter | When to Use |
|---------|-------------|
| `snyk` | Before public launch |
| `lighthouse` | Performance check |

## Project Templates

### MVP

```
projects/<mvp>/
├── .ai-agency/
│   ├── docs/
│   │   └── hypothesis/<mvp>-hypothesis.md
│   └── metrics/
├── src/
├── tests/ (minimal)
└── README.md
```

### Prototype

```
projects/<prototype>/
├── .ai-agency/
│   └── docs/
│       └── notes.md
├── prototype/
└── README.md
```

## Iteration Limits

| Loop | Max Iterations | Escalation |
|------|---------------|------------|
| Build ↔ Measure | 1 per sprint | CEO |
| Pivot Decision | Immediate | CEO |

## Quality Thresholds

| Metric | Target |
|--------|--------|
| Time to MVP | < 2 weeks |
| Test Coverage | ≥ 50% (minimal) |
| Performance | Functional |
| Security | Basic (no critical vulns) |

## Lean Principles

1. **Build-Measure-Learn** - Rapid iteration cycles
2. **Validated Learning** - Data-driven decisions
3. **Minimum Viable** - Only essential features
4. **Pivot or Persevere** - Quick decision making

---

Updated: 2026-03-10
