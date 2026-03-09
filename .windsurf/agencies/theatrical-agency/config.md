---
agency: theatrical-agency
name: Theatrical Agency
description: Spectacular stage-inspired digital experiences and immersive launches
---

# Theatrical Agency Configuration

## Overview

Specialized agency for spectacular, stage-inspired product experiences, cinematic launches, and immersive campaign moments. Balances dramatic impact with safety, technical reliability, and delivery discipline.

## Agent Roster

### Active Agents (19)

| Layer | Agents | Active |
|-------|--------|--------|
| Orchestration | Router | ✅ |
| Executive | CEO, PM | ✅ |
| Design | UX Researcher, Designer | ✅ |
| Creative | Audio Creator, Video Creator, Image Creator, Game Developer, Culture Hacker, Provocation Director | ✅ |
| Technical | Architect, Developer, Security | ✅ (as needed) |
| Quality | QA, Reviewer | ✅ |
| Operations | Planner, Release Manager, Ops | ✅ |

### Agent Assignments

| Role | Agent | Responsibilities |
|------|-------|------------------|
| **Showrunner** | CEO | Vision, boundaries, final go/no-go |
| **Stage Producer** | PM | Scope, scheduling, stakeholder synchronization |
| **Audience Signal Lead** | Culture Hacker | Attention hooks and timing insights |
| **Narrative Director** | Provocation Director | Dramatic concept architecture and surprise moments |
| **Visual Stage Lead** | Designer | Stage language, layout, and visual consistency |
| **Motion FX Lead** | Video Creator | Cinematic motion and dynamic sequences |
| **Sonic Drama Lead** | Audio Creator | Audio storytelling and emotional pacing |
| **Key Art Lead** | Image Creator | Hero visuals, posters, and static campaign assets |
| **Interactive Scene Lead** | Game Developer | Interactive moments and experiential mechanics |
| **Technical Stage Lead** | Architect, Developer | Experience integration and runtime reliability |
| **Safety and Readiness** | QA, Reviewer, Security | Quality, safety controls, and final readiness signoff |
| **Operations** | Planner, Release Manager, Ops | Run-of-show planning, release operations, and postmortem |

## Workflow Pipeline

```
Router → PM (Spectacle Brief) → CEO (Show Vision) → Culture Hacker (Audience Signals)
    → [Provocation Director + Designer] (Narrative + Stage Language)
    → [Video Creator + Audio Creator + Image Creator + Game Developer] (Production)
    → [Developer + Architect] (Integration) → [QA + Security] (Safety/Readiness)
    → Reviewer (Final Coherence) → Release Manager (Launch) → Ops (Postmortem)
```

## Quality Gates

| Gate | Required Approvals |
|------|-------------------|
| Spectacle Brief Approval | PM, CEO |
| Narrative and Visual Lock | Provocation Director, Designer, CEO |
| Production Readiness | PM, Designer |
| Safety and Risk Check | QA, Security |
| Technical Reliability Pass | Architect, Developer |
| Final Launch Approval | CEO, Reviewer, Release Manager |

## Proposed Software Stack

Reference baseline: `.windsurf/software-mcp-proposals.md` (Agency-Level Proposal Matrix).

| Software | Purpose |
|----------|---------|
| Storyboarding and previsualization tools | Narrative framing, sequence planning, and cue design |
| Video/audio post-production suite | Motion, sound, and cinematic finishing |
| Real-time graphics/interaction tooling | Immersive and interactive spectacle components |
| TypeScript + React (Vite/Next.js) | Public launch surfaces and experience interfaces |
| Run-of-show and release orchestration tooling | Cue timing, deployment sequencing, and launch control |

## MCP Adapters

### Core (All Projects)

| Adapter | Usage |
|---------|-------|
| `runcomfy` | Dramatic visual/video generation and edit variants |
| `stitch` | Rapid stage layout and UI concept generation |
| `fetch` | Reference research for themes, stagecraft, and audience patterns |
| `playwright` | Flow validation for launch experiences and interactions |
| `lighthouse` | Performance and accessibility checks for public surfaces |

### Optional (Project-Specific)

| Adapter | When to Use |
|---------|-------------|
| `sequential-thinking` | Complex narrative branching and fallback planning |
| `ios-simulator` | Mobile preview of interactive launch sequences |
| `snyk` | Security hardening before large public launches |
| `supabase` | Event capture, telemetry, and audience analytics pipelines |

## Project Templates

### Spectacle Launch Experience

```
projects/<spectacle-launch>/
├── .ai-agency/
│   ├── docs/
│   │   ├── prd/<spectacle-launch>-brief.md
│   │   ├── adr/<spectacle-launch>-show-architecture.md
│   │   └── qa/<spectacle-launch>-safety-readiness.md
│   └── tasks/
├── stage/
├── assets/
├── interactions/
└── launch/
```

### Immersive Narrative Campaign

```
projects/<immersive-campaign>/
├── .ai-agency/
│   ├── docs/
│   └── tasks/
├── narrative/
├── production/
├── runtime/
└── distribution/
```

## Iteration Limits

| Loop | Max Iterations | Escalation |
|------|---------------|------------|
| Concept ↔ Safety | 3 | CEO |
| Production ↔ QA | 2 | Reviewer |
| Integration ↔ Performance | 2 | Architect |

## Quality Thresholds

| Metric | Target |
|--------|--------|
| Spectacle Readiness Checklist | 100% |
| Critical Safety Risks | 0 |
| Launch Reliability | 100% rehearsal pass |
| Accessibility Coverage | WCAG AA for public surfaces |

---

Updated: 2026-03-10
