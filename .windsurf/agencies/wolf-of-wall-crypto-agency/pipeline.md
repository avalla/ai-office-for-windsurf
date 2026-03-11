---
agency: wolf-of-wall-crypto-agency
---

# Wolf of Wall Crypto Agency Pipeline

## Standard Crypto Growth Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                WOLF OF WALL CRYPTO AGENCY PIPELINE                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  00_router ──► 01_create_project ──► 10_ceo_prd (Growth Brief)     │
│      │              │                      │                         │
│      │              ▼                      ▼                         │
│      │        PM scopes goals         CEO sets targets              │
│      │        and market focus        and risk boundaries           │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                               20_arch_adr                    │
│      │                          (architecture baseline)               │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                        Tokenomics Strategist                  │
│      │                        (mechanism + incentive model)          │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                               05_planner                     │
│      │                               30_plan_tasks                   │
│      │                                      │                        │
│      │              ┌───────────────────────┴───────────────────────┐│
│      │              ▼                                               ▼│
│      │         22_ux_research                                 25_design_ui│
│      │      (signals/trends)                                  (token UX) │
│      │              └───────────────────────┬───────────────────────┘│
│      │                                      ▼                        │
│      │                      40_dev_implement + Scalper              │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                         45_security_pentest + 50_qa_validate │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                               60_review_merge                │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                               70_release                     │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                               90_postmortem_memory           │
│      │                                                               │
└─────────────────────────────────────────────────────────────────────┘
```

## Fast Token Campaign Pipeline

For short-cycle campaign launches:

```
Router → PM Brief → Tokenomics Model → Market Signal Scan → Campaign Assets + Execution Rules → QA/Security → Launch
```

## Parallel Workstreams

| Phase | Parallel Workflows |
|-------|-------------------|
| Mechanism Modeling | 20_arch_adr + Tokenomics Strategist |
| Positioning | 22_ux_research + 25_design_ui |
| Pre-launch hardening | 45_security_pentest + 50_qa_validate |
| Launch prep | PM coordination + Scalper guardrails + Release packaging |

## Checkpoints

| Checkpoint | Trigger | Required Artifacts |
|------------|---------|-------------------|
| Growth Brief Locked | PM + CEO align | Growth brief |
| Architecture Approved | Architect confirms | ADR with monetization model |
| Tokenomics Model Approved | Tokenomics Strategist + Architect align | Tokenomics model and incentive matrix |
| Execution Rules Cleared | Scalper + Security pass | Execution playbook and risk limits |
| Security Cleared | Security pass | Security validation report |
| Launch Ready | Reviewer + Release Manager pass | Launch checklist |
| Post-launch Review | Ops closes cycle | Postmortem and KPI snapshot |

---

Updated: 2026-03-09
