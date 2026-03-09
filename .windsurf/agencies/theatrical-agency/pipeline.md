---
agency: theatrical-agency
---

# Theatrical Agency Pipeline

## Standard Spectacle Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                     THEATRICAL AGENCY PIPELINE                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  00_router ──► 01_create_project ──► 10_ceo_prd (Spectacle Brief)  │
│      │              │                      │                         │
│      │              ▼                      ▼                         │
│      │         PM scopes            CEO sets show vision            │
│      │      run-of-show plan         and launch boundaries          │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                               22_ux_research                 │
│      │                        (Culture Hacker signal scan)          │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                               25_design_ui                   │
│      │                    (Provocation Director + Designer)         │
│      │                                      │                        │
│      │              ┌───────────────────────┼───────────────────────┐│
│      │              │                       │                       ││
│      │              ▼                       ▼                       ▼│
│      │        27_video_create        26_audio_create        29_image_create│
│      │              │                       │                       ││
│      │              └───────────────────────┬───────────────────────┘│
│      │                                      ▼                        │
│      │                              28_game_create                  │
│      │                        (interactive scene layer)             │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                              40_dev_implement               │
│      │                         (integration + runtime hardening)    │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                         50_qa_validate + 45_security_pentest │
│      │                         (safety, reliability, risk pass)     │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                              60_review_merge                 │
│      │                         (narrative and quality coherence)    │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                              70_release                      │
│      │                            (spectacle launch event)           │
│      │                                      │                        │
│      │                                      ▼                        │
│      │                              90_postmortem_memory            │
│      │                             (impact and lessons captured)     │
│      │                                                               │
└─────────────────────────────────────────────────────────────────────┘
```

## Fast Spectacle Drop Pipeline

For short-cycle spectacular campaign drops:

```
Router → PM Brief → Signal Scan → Narrative Direction → Asset Burst → Safety Check → Launch
```

## Parallel Workstreams

| Phase | Parallel Workflows |
|-------|-------------------|
| Direction | 22_ux_research + 25_design_ui |
| Production | 27_video_create + 26_audio_create + 29_image_create + 28_game_create |
| Final Hardening | 40_dev_implement + 50_qa_validate + 45_security_pentest |

## Checkpoints

| Checkpoint | Trigger | Required Artifacts |
|------------|---------|-------------------|
| Brief Locked | PM and CEO align | Spectacle brief |
| Direction Locked | Provocation Director + Designer signoff | Narrative board + stage language |
| Production Ready | PM approves package | Production asset checklist |
| Safety Cleared | QA + Security pass | Safety and risk report |
| Launch Approved | CEO + Release Manager pass | Final launch package |

---

Updated: 2026-03-10
