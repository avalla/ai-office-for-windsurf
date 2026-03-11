# AI Office Framework Status

> **Auto-generated document** - Updated on: 2026-03-09
> This document is automatically updated when the metaframework is used.

---

## Framework Structure

```mermaid
graph TB
    subgraph "Root Level"
        W[.agents/]
        D[docs/]
        A[architecture/]
        P[projects/]
        O[office/]
    end
    
    subgraph ".agents/"
        W1[workflows/]
        W2[skills/]
        W3[rules/]
        W4[policies/]
        W5[templates/]
    end
    
    subgraph "projects/"
        S[_skeleton/]
        PR1[ai-office-demo/]
        PR2[autoepoque/]
        PR3[epic-birthday/]
        PR4[japan-softpower-research/]
    end
    
    subgraph "_skeleton/.ai-agency/"
        C[config.json]
        T[tasks/]
        DOCS[docs/]
        MEM[memory/]
    end
    
    W --> W1 & W2 & W3 & W4 & W5
    P --> S & PR1 & PR2 & PR3 & PR4
    S --> C & T & DOCS & MEM
```

---

## Workflow State Machine

```mermaid
stateDiagram-v2
    [*] --> router
    
    router --> create_project: new project
    router --> prd: feature
    router --> plan: bugfix/refactor/spike
    
    create_project --> prd
    
    prd --> adr
    adr --> plan
    plan --> tasks
    tasks --> dev
    dev --> qa
    
    qa --> review: PASS
    qa --> dev: FAIL (iteration < 2)
    qa --> blocked: FAIL (iteration >= 2)
    
    review --> release: PASS
    review --> dev: FAIL (iteration < 2)
    review --> blocked: FAIL (iteration >= 2)
    
    release --> postmortem
    postmortem --> [*]
    
    blocked --> plan: unblocked
```

---

## Kanban Task States

```mermaid
graph LR
    subgraph "Task Lifecycle"
        BL[BACKLOG] --> TODO
        TODO --> WIP
        WIP --> REVIEW
        REVIEW --> DONE
        REVIEW --> REJECTED
        REJECTED --> WIP
        TODO --> BL
        WIP --> TODO
    end
    
    BL -.-> ARCHIVED
    TODO -.-> ARCHIVED
    WIP -.-> ARCHIVED
    REJECTED -.-> ARCHIVED
    
    style BL fill:#90CAF9
    style TODO fill:#A5D6A7
    style WIP fill:#FFF59D
    style REVIEW fill:#CE93D8
    style REJECTED fill:#EF9A9A
    style DONE fill:#80CBC4
    style ARCHIVED fill:#BDBDBD
```

---

## Teams Structure

```mermaid
graph TB
    subgraph "Core Teams"
        FE[Frontend Team]
        BE[Backend Team]
        DE[DevOps Team]
        QA[QA Team]
        DS[Design Team]
    end
    
    subgraph "Specialized Teams"
        SEC[Security Team]
        MKT[Marketing Team]
        CR[Creative Team]
        RS[Research Team]
    end
    
    subgraph "Leadership"
        PM[CEO/PM]
        AR[Architect]
        PL[Planner]
        RL[Release]
        OP[Ops]
    end
    
    PM --> FE & BE
    AR --> FE & BE & DE
    PL --> QA & DE
    RL --> DE
    OP --> SEC
```

---

## Active Projects Overview

```mermaid
pie title Projects by Status
    "ai-office-demo" : 1
    "autoepoque" : 1
    "epic-birthday" : 1
    "japan-softpower-research" : 1
```

### Project Details

| Project | Status | Last Updated | Tasks |
|---------|--------|--------------|-------|
| ai-office-demo | ✅ Active | 2026-03-07 | See `.ai-agency/tasks/` |
| autoepoque | 🔄 In Progress | TBD | Minimal setup |
| epic-birthday | 🔄 In Progress | TBD | Has root docs (migrate) |
| japan-softpower-research | 🔄 In Progress | TBD | Minimal setup |

---

## Framework Health Metrics

```mermaid
graph LR
    subgraph "Quality Gates"
        CI[CI Checks]
        MS[Multi-sector Review]
        LG[Loop Guards]
    end
    
    subgraph "Metrics"
        WF[Workflows: 15+]
        SK[Skills: 16]
        RU[Rules: 20+]
        TE[Teams: 9]
        TS[Task States: 7]
    end
    
    CI --> WF & SK & RU
    MS --> TE
    LG --> TS
```

---

## Artifact Communication Contract

```mermaid
flowchart LR
    subgraph "Project Artifacts"
        PRD[.ai-agency/docs/prd/]
        ADR[.ai-agency/docs/adr/]
        QA[.ai-agency/docs/qa/]
        RB[.ai-agency/docs/runbooks/]
        MEM[.ai-agency/memory/]
        TS[.ai-agency/tasks/]
    end
    
    subgraph "Runbooks"
        PLAN[plan.md]
        TASKS[tasks.md]
        STATUS[status.md]
    end
    
    RB --> PLAN & TASKS & STATUS
```

---

## Update Log

| Date | Action | Updated By |
|------|--------|------------|
| 2026-03-09 | Initial creation | Framework Review |
| | | |

---

> **Note:** This document should be updated by workflows:
> - `00_router` - When routing new requests
> - `01_create_project` - When creating new projects
> - `30_plan_tasks` - When task breakdown changes
> - `50_qa_validate` - When QA status changes
> - `60_review_merge` - When review status changes
> - `90_postmortem_memory` - When project completes
