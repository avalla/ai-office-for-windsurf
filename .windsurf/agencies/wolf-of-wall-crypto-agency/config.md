---
agency: wolf-of-wall-crypto-agency
name: Wolf of Wall Crypto Agency
description: Crypto product growth, token launch strategy, and monetization systems with strong risk controls
---

# Wolf of Wall Crypto Agency Configuration

## Overview

Specialized agency for high-growth crypto products, token launch strategy, community-driven adoption, and monetization optimization. Focuses on strong execution with explicit security, compliance, and risk guardrails.

## Agent Roster

### Active Agents (20)

| Layer | Agents | Active |
|-------|--------|--------|
| Orchestration | Router | ✅ |
| Executive | CEO, PM | ✅ |
| Design | UX Researcher, Designer | ✅ |
| Creative | Audio Creator, Video Creator, Image Creator, Culture Hacker, Provocation Director | ✅ |
| Technical | Architect, Tokenomics Strategist, Developer, Scalper, Security | ✅ |
| Quality | QA, Reviewer | ✅ |
| Operations | Planner, Release Manager, Ops | ✅ |

### Agent Assignments

| Role | Agent | Responsibilities |
|------|-------|------------------|
| **Growth Owner** | CEO | Revenue targets, strategic approvals, risk tolerance |
| **Market Lead** | PM | Product scope, launch calendar, coordination |
| **Narrative Signal Lead** | Culture Hacker | Market narratives, trend timing, audience hooks |
| **Launch Concept Lead** | Provocation Director | Differentiated campaign and launch concept |
| **Token UX Lead** | Designer | Conversion paths, onboarding, trust UX |
| **Technical Lead** | Architect | On-chain/off-chain architecture and scalability |
| **Tokenomics Lead** | Tokenomics Strategist | Incentive design, mechanism validation, KPI economics |
| **Build Lead** | Developer | Feature implementation, integrations, automations |
| **Execution Strategy Lead** | Scalper | Execution rule design, risk limits, fast-cycle strategy guardrails |
| **Security Lead** | Security | Wallet, smart-contract, and platform security checks |
| **Quality Control** | QA, Reviewer | Test quality, release readiness, standards |
| **Operations** | Planner, Release Manager, Ops | Planning, launch operations, post-launch learning |

## Workflow Pipeline

```
Router → PM (Growth Brief) → CEO (Targets/Boundaries) → Architect (System Design)
    → Tokenomics Strategist (Mechanism Model) → Planner (Launch Plan/Tasks)
    → [Culture Hacker + Provocation Director] (Positioning)
    → Designer (Token UX) → [Developer + Scalper] (Build/Execution Rules) → Security (Audit)
    → QA (Validation) → Reviewer (Readiness) → Release Manager (Launch) → Ops (Postmortem)
```

## Quality Gates

| Gate | Required Approvals |
|------|-------------------|
| Growth Brief Approval | PM, CEO |
| Architecture and Tokenomics Review | Architect, Tokenomics Strategist, CEO |
| Execution Guardrails Review | Scalper, Security |
| Security Audit Clearance | Security |
| QA Validation | QA |
| Launch Readiness Review | Reviewer, Release Manager |
| Final Launch Authorization | CEO, PM |

## Proposed Software Stack

Reference baseline: `.windsurf/software-mcp-proposals.md` (Agency-Level Proposal Matrix).

| Software | Purpose |
|----------|---------|
| TypeScript + React (Vite/Next.js) | Growth product UI and launch surfaces |
| Node.js/Bun + API integrations | Backend orchestration and campaign automations |
| Supabase | Event tracking, auth, and operational data storage |
| On-chain integration toolkit | Wallet, contract, and protocol interactions |
| Analytics + KPI dashboard stack | Token/growth funnel and monetization monitoring |

## MCP Adapters

### Core (All Projects)

| Adapter | Usage |
|---------|-------|
| `snyk` | Security scanning (SAST/SCA/container/IaC) |
| `supabase` | Data, auth, analytics, operational storage |
| `playwright` | E2E validation for growth and conversion flows |
| `fetch` | Market, protocol, and ecosystem research |
| `revenuecat` | Subscription and recurring revenue coordination (if app-based) |

### Optional (Project-Specific)

| Adapter | When to Use |
|---------|-------------|
| `lighthouse` | Landing/performance optimization for conversion |
| `stitch` | Rapid campaign and UI concept generation |
| `runcomfy` | Creative assets for launch campaigns |

## Project Templates

### Token Launch Platform

```
projects/<token-launch>/
├── .ai-agency/
│   ├── docs/
│   │   ├── prd/<token-launch>-growth-brief.md
│   │   ├── adr/<token-launch>-architecture.md
│   │   └── qa/<token-launch>-launch-readiness.md
│   └── tasks/
├── contracts/
├── app/
├── analytics/
└── launch/
```

### Crypto Growth Product

```
projects/<crypto-growth>/
├── .ai-agency/
│   ├── docs/
│   └── tasks/
├── src/
├── integrations/
├── campaigns/
└── dashboards/
```

## Iteration Limits

| Loop | Max Iterations | Escalation |
|------|---------------|------------|
| Build ↔ Security | 2 | Architect |
| Execution Tuning ↔ QA | 2 | Reviewer |
| QA ↔ Developer | 2 | Reviewer |
| Growth Plan ↔ Market Signals | 3 | CEO |

## Quality Thresholds

| Metric | Target |
|--------|--------|
| Critical Security Issues | 0 |
| High Security Issues | 0 before launch |
| Test Pass Rate | 100% |
| Launch Checklist Completion | 100% |
| Unresolved Risk Limit Violations | 0 before launch |
| Conversion Tracking Coverage | 100% key funnel events |

---

Updated: 2026-03-10
