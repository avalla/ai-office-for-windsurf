---
description: Generate a custom agency, agents, and pipeline through a deep project interview. Usage: /office-company [reconfigure]
---

Arguments: `[reconfigure]`

- No args: run the full interview and generate everything from scratch
- `reconfigure`: show current agency and offer targeted changes

This command goes deeper than `/office-setup`. It interviews you about your project, company culture, and domain, then **generates custom agents** (with personality, competencies, and triggers), a **custom pipeline** tailored to your workflow, and a full **agency config**. The result is an agency that actually reflects your project — not a generic template.

---

## Step 0 — Check existing state

Read `.ai-office/project.config.md` if it exists. Extract `agency`, `project_name`, `advance_mode`.

If `reconfigure` arg is given and an agency exists:
- Show current agency summary (name, agents, pipeline stages)
- Ask: "What would you like to change? (agents / pipeline / culture / all)"
- Jump to the relevant phase below

Otherwise proceed with the full interview.

---

## Phase 1 — Project Discovery

Ask these questions **as a group** in a single message. Keep it conversational, not a form.

```
I'm going to ask you a few questions to design a custom agency for this project.
Take your time — the more specific you are, the better the agents will fit your work.

1. What is this project? Describe it in 2–3 sentences as you'd explain it to a new hire.

2. What's the end goal — what does "shipped and successful" look like in 6 months?

3. Who are the people who will actually use this? (developers, consumers, enterprises, internal teams...)

4. What's the riskiest part of this project? What could go wrong that would kill it?
```

**Wait for the user's answers.** Do not continue until they respond.

---

## Phase 2 — Domain Deep Dive

Based on Phase 1 answers, identify the **primary domain** and ask 3–4 targeted follow-up questions from the table below. Pick only the most relevant ones — do not ask all of them.

| Domain signals | Follow-up questions |
|----------------|---------------------|
| **Web / SaaS** | What's the auth model? Multi-tenant or single? Any real-time requirements? |
| **Mobile app** | iOS, Android, or cross-platform? Offline support needed? App store constraints? |
| **Game** | What genre and platform? Multiplayer? What does the content pipeline look like (levels, assets, narrative)? |
| **AI / ML product** | What models are involved? Who trains/fine-tunes? How is output quality measured? |
| **Fintech / payments** | What regulations apply (PCI, SOX, GDPR)? What's the fraud surface? |
| **Content / media** | What's the production pipeline? Editorial review process? Copyright considerations? |
| **Developer tooling / CLI** | Who's the target developer? What's the distribution model? Docs-first or code-first? |
| **Data pipeline / analytics** | What's the data volume and latency tolerance? Who consumes the output? |
| **Crypto / Web3** | What chain(s)? Smart contracts involved? Token economy? |
| **Hardware / IoT** | What firmware constraints? Remote update strategy? Failure mode handling? |
| **Healthcare** | HIPAA compliance? PHI handling? Clinical validation requirements? |
| **Internal tooling** | Who are the internal users? What legacy systems need integration? |

**Wait for answers before continuing.**

---

## Phase 3 — Team & Culture

Ask in a single message:

```
A few more questions about how you work:

1. Who's on the team? (just you + AI, small team, larger org — and what roles exist already)

2. How do you ship? (continuously, weekly sprints, milestone releases, or something else)

3. What does quality mean for this project? What would make you embarrassed to ship?

4. Is there anything about how you like to work that I should know?
   (e.g., "we review everything before merging", "we move fast and fix later", "security is non-negotiable")
```

**Wait for answers.**

---

## Phase 4 — Agent Roster Design

Using all answers from Phases 1–3, reason about which agents this project needs. Do this reasoning **before** presenting anything to the user.

### Reasoning rules

**Always include:**
- `developer` — implementation
- `qa` — quality and acceptance verification

**Include from standard roster if relevant:**
- `architect` — if the project has non-trivial technical decisions, multiple services, or scale concerns
- `pm` — if requirements need active management, or there are external stakeholders
- `designer` — if the project has user-facing UI
- `ux-researcher` — if user research or usability testing is needed
- `security-specialist` → rename to `security` — if auth, payments, PII, or compliance are in scope
- `reviewer` — if code review is a distinct step (team > solo or compliance requires it)
- `ops` — if deployment, monitoring, or postmortems are explicit concerns
- `release-manager` — if releases have coordination complexity
- `planner` — if planning and task breakdown is a distinct activity

**Invent new agents** for domain-specific roles that don't exist in the standard roster. Examples:

| Domain | Example custom agents |
|--------|-----------------------|
| Game | `game-designer`, `level-designer`, `narrative-writer`, `playtester`, `audio-designer` |
| AI/ML | `ml-engineer`, `data-scientist`, `prompt-engineer`, `model-evaluator` |
| Fintech | `compliance-officer`, `risk-analyst`, `fraud-specialist` |
| Content | `editor`, `fact-checker`, `seo-specialist`, `brand-guardian` |
| Crypto | `smart-contract-auditor`, `tokenomics-designer`, `community-manager` |
| Healthcare | `clinical-validator`, `privacy-officer`, `medical-reviewer` |
| Hardware | `firmware-engineer`, `hardware-integration-specialist` |
| DevTools | `dx-engineer`, `docs-writer`, `sdk-designer` |

For each custom agent, write a short internal description of their role (used later in file generation).

### Present the roster

```
Custom Agency: <slug>

Proposed agent roster (<N> agents):

Standard agents:
  ✅ developer      — <tailored focus for this project>
  ✅ qa             — <tailored focus>
  ✅ architect      — <tailored focus>
  ...

Custom agents (new for this project):
  🆕 <agent-name>   — <what they do and why this project needs them>
  🆕 <agent-name>   — ...

Do you want to add, remove, or rename any agents? (or say "looks good")
```

**Wait for the user's confirmation or changes.**

---

## Phase 5 — Pipeline Design

Design a custom pipeline based on the project's workflow. Map stages to agents using the approved roster.

### Rules for pipeline design

- Every pipeline must start with `router` and end with `release` or `postmortem`
- Include only stages that make sense for this project — don't add stages for completeness
- Custom stages are allowed (e.g., `playtesting`, `clinical-review`, `compliance-sign-off`, `editorial-review`)
- Parallel paths are allowed — note them in the pipeline
- Loop guards: identify which loops could repeat and set max iterations

### Present the pipeline

```
Proposed pipeline:

router → <stage> → <stage> → ... → release

| Stage | Agent | Description |
|-------|-------|-------------|
| router | router | Classify and route requests |
| <stage> | <agent> | <what happens here> |
...

Loop guards:
  <stage-a> ↔ <stage-b>: max N iterations

Does this pipeline match how you actually work? Any stages to add, remove, or reorder?
```

**Wait for confirmation or changes.**

---

## Phase 6 — Generate Files

After confirmation, generate all files. Tell the user: "Generating your custom agency — writing <N> files..."

### 6a — Custom agent files

For each **new custom agent** (not in the standard roster), generate 3 files:

**`.ai-office/agents/<agent-name>/personality.md`**
```markdown
---
trigger: when_referenced
---
# <Agent Name> Personality

## Core Traits

- **<trait>** — <description tailored to this project's context>
- **<trait>** — ...
(3–5 traits that reflect the agent's role AND this project's culture)

## Behavioral Patterns

### Decision Making
<how this agent makes decisions in this specific project context>

### Communication Style
<how they communicate — formal/casual, detail-oriented/high-level, etc.>

### Stress Response
<what they do when blocked, under pressure, or facing ambiguity>

## Interaction Preferences

- **Prefers:** <what they need to do their job well>
- **Dislikes:** <what slows them down or creates risk>
- **Defers to:** <who they escalate to and when>

## Domain Expertise

<2–3 paragraphs of specific domain knowledge this agent brings to THIS project. Not generic — reference the actual tech stack, domain constraints, and risks identified in the interview.>
```

**`.ai-office/agents/<agent-name>/competencies.md`**
```markdown
---
trigger: when_referenced
---
# <Agent Name> Competencies

## Core Competencies

<3–5 competency areas with specific skills listed under each, tailored to the domain>

## Skill Levels

| Competency | Level | Notes |
|------------|-------|-------|
| <competency> | Expert/Advanced/Intermediate | <context> |

## Limitations

- Does not make <other role>'s decisions — defers to <agent>
- <Other meaningful limitations specific to this agent's scope>
```

**`.ai-office/agents/<agent-name>/triggers.md`**
```markdown
---
trigger: when_referenced
---
# <Agent Name> Triggers

## Primary Triggers

### Pipeline Stages
Active during: <list of pipeline stages where this agent leads>

### Workflow Events

| Event | Action |
|-------|--------|
| <event> | <what the agent does> |

## Activation Conditions

### Required For
- <situation where this agent must be involved>

### Optional For
- <situation where this agent may be consulted>
```

### 6b — Agency config

**`.ai-office/agencies/<slug>/config.md`**
```markdown
---
agency: <slug>
name: <Agency Name>
description: <one-line description>
---

# Agency: <Agency Name>

**Project:** <project_name>
**Domain:** <domain>
**Generated:** <today ISO>

## Active Agents

| Agent | Role | Focus for this project |
|-------|------|------------------------|
| <agent> | <role> | <specific focus> |
...

## Handoff Rules

<Derived from the pipeline and culture. Specific, not generic.
E.g.: "Security review is mandatory before every merge — not just at release."
Or: "Playtester feedback gates every level-design iteration.">

## Quality Gates

| Gate | Owner | Criteria |
|------|-------|----------|
| <stage> | <agent> | <what must be true to pass> |
...

## Loop Guards

| Loop | Max | Escalate to |
|------|-----|-------------|
| <stage-a> ↔ <stage-b> | N | <agent> |
...

## Culture Notes

> <A short paragraph capturing the team's working style and values, drawn from the interview answers. This shapes how all agents behave.>
```

### 6c — Custom pipeline file

**`.ai-office/agencies/<slug>/pipeline.md`**
```markdown
---
agency: <slug>
---

# Pipeline: <Agency Name>

## Stages

| Stage | Agent | Description |
|-------|-------|-------------|
| router | router | Classify and route the request |
| <stage> | <agent> | <what happens here> |
...
| release | release-manager | Deploy and announce |

## Transition Rules

| From | Default Next | Notes |
|------|-------------|-------|
| router | <stage> | |
| <stage> | <next-stage> | |
...

## Parallel Paths

<If any stages run in parallel or have branch points, describe them here.>
<E.g.: "After plan, ux_research and security can run in parallel before dev.">

## Loop Guards

| Guard key | Transition | Max |
|-----------|-----------|-----|
| <key>_iteration | <stage-a> → <stage-b> | N |
...
```

### 6d — Update project.config.md

Write or update `.ai-office/project.config.md` with:
- All fields from `/office-setup` (reuse if already set, ask only for missing ones)
- `agency: <slug>` pointing to the new custom agency

### 6e — Update agency.json

Write `.ai-office/agency.json`:
```json
{
  "name": "<slug>",
  "selectedAt": "<ISO timestamp>",
  "custom": true,
  "generated_by": "office-company"
}
```

---

## Phase 7 — Confirm

```
✅ Custom agency generated: <Agency Name>

Files written:
  .ai-office/agencies/<slug>/config.md
  .ai-office/agencies/<slug>/pipeline.md
  .ai-office/agents/<custom-agent-1>/personality.md
  .ai-office/agents/<custom-agent-1>/competencies.md
  .ai-office/agents/<custom-agent-1>/triggers.md
  ... (N files total)

Agency: <N> agents (<list names>)
Pipeline: <stage1> → <stage2> → ... (<N> stages)

Next:
  /office-route <describe your first task>   — start routing work through the pipeline
  /office-doctor                             — verify the full setup is healthy
  /office-agency list                        — review the agent roster
```

<!-- ai-office-version: 1.5.0 -->
