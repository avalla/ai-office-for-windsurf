---
agency: crazy-studio
name: Crazy Studio
description: Extreme-creative studio for bold, unexpected, and attention-dominating products
---

# Crazy Studio Configuration

## Overview

High-intensity creative studio designed for breakthrough launches, culturally disruptive storytelling, and "impossible-to-ignore" product experiences. Prioritizes originality, emotional impact, and controlled risk.

## Agent Roster

### Active Agents (19)

| Layer | Agents | Active |
|-------|--------|--------|
| Orchestration | Router | ✅ |
| Executive | CEO, PM | ✅ |
| Design | UX Researcher, Designer | ✅ |
| Creative | Audio Creator, Video Creator, Image Creator, Game Developer, Provocation Director, Culture Hacker | ✅ |
| Technical | Architect, Developer, Security | ✅ (as needed) |
| Quality | QA, Reviewer | ✅ |
| Operations | Planner, Release Manager, Ops | ✅ |

### Agent Assignments

| Role | Agent | Responsibilities |
|------|-------|------------------|
| **Creative Owner** | CEO | Defines ambition and approval boundaries |
| **Shock Product Lead** | PM | Brief shaping, timing, and execution orchestration |
| **Cultural Signal Lead** | Culture Hacker | Detects trends, tension points, and audience triggers |
| **Provocation Lead** | Provocation Director | Crafts bold concept directions and surprise moments |
| **Visual Lead** | Designer | Radical visual language and interaction style |
| **Motion Lead** | Video Creator | Cinematic and dynamic story execution |
| **Sound Lead** | Audio Creator | Sonic identity and dramatic audio moments |
| **Image Lead** | Image Creator | Key art, frames, and standout visual assets |
| **Quality & Safety** | QA, Reviewer, Security | Quality controls, brand safety, and risk checks |
| **Operations** | Planner, Release Manager, Ops | Planning, release, and learning capture |

## Workflow Pipeline

```
Router → PM (Shock Brief) → CEO (Creative Boundaries) → Culture Hacker (Signal Scan)
    → Provocation Director (Concept Rupture) → Designer (Visual System)
    → [Video Creator + Audio Creator + Image Creator] (Production)
    → QA + Security (Quality and Safety) → Reviewer (Final Narrative Pass)
    → Release Manager (Launch) → Ops (Impact Retrospective)
```

## Quality Gates

| Gate | Required Approvals |
|------|-------------------|
| Shock Brief Approval | PM, CEO |
| Cultural Relevance Check | Culture Hacker, PM |
| Provocation Concept Lock | Provocation Director, CEO |
| Production Readiness | Designer, PM |
| Safety and Risk Review | QA, Security |
| Final Launch Approval | CEO, Reviewer, Release Manager |

## Proposed Software Stack

Reference baseline: `.windsurf/software-mcp-proposals.md` (Agency-Level Proposal Matrix).

| Software | Purpose |
|----------|---------|
| Creative concept board tooling | Rapid ideation and concept branching |
| Video/audio/image production suite | Multi-format creative asset production |
| Campaign staging and landing tooling | Launch sequencing and narrative delivery |
| Experiment analytics dashboard | Creative impact and engagement tracking |
| Risk and compliance checklist tooling | Bold output with controlled safety boundaries |

## MCP Adapters

### Core (All Projects)

| Adapter | Usage |
|---------|-------|
| `runcomfy` | Experimental image/video generation and transformations |
| `stitch` | Fast interface and concept exploration |
| `fetch` | Trend, culture, and reference research |
| `playwright` | Story-flow and launch page interaction testing |
| `lighthouse` | Performance and accessibility quality checks |

### Optional (Project-Specific)

| Adapter | When to Use |
|---------|-------------|
| `sequential-thinking` | Complex concept branching and creative decisions |
| `ios-simulator` | Mobile-first previews for campaign/launch assets |

## Project Templates

### Shock Product Launch

```
projects/<shock-launch>/
├── .ai-agency/
│   ├── docs/
│   │   ├── brief/<shock-launch>-brief.md
│   │   ├── adr/<shock-launch>-creative-boundaries.md
│   │   └── qa/<shock-launch>-risk-qc.md
│   └── tasks/
├── concepts/
├── assets/
└── launch/
```

### Experimental Media Drop

```
projects/<media-drop>/
├── .ai-agency/
│   ├── docs/
│   └── tasks/
├── preproduction/
├── production/
├── post/
└── distribution/
```

## Iteration Limits

| Loop | Max Iterations | Escalation |
|------|---------------|------------|
| Concept Shock ↔ Brand Safety | 3 | CEO |
| Rough Cut ↔ QA/Security | 2 | Reviewer |
| Launch Package ↔ Release | 2 | PM |

## Quality Thresholds

| Metric | Target |
|--------|--------|
| Novelty Level | High, CEO-approved |
| Brand Safety | No blocked risks |
| Accessibility | Captions + readable metadata required |
| Launch Readiness | 100% package completion |

---

Updated: 2026-03-10
