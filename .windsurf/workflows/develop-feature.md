---
description: Develop a feature through the formal framework pipeline
---

Use this workflow when the request is a feature and you want full framework governance.

## Steps

1. Start from `00_router`
   - Router classifies the request and captures project/slug.
   - Router runs `quick-decision` once for user choice.

2. If user chooses **Direct Modification**
   - Implement immediately.
   - Skip formal artifact workflow.

3. If user chooses **Formal Task**
   - Continue in the same `00_router` execution.
   - Route to formal feature path:
     `10_ceo_prd` → `20_arch_adr` → `05_planner` → `30_plan_tasks` → `40_dev_implement` → `45_security_pentest` (if required) → `50_qa_validate` → `60_review_merge` → `70_release` → `90_postmortem_memory`.

4. At each stage
   - Apply `review-document-multisector` before moving forward.
   - Update status file with evidence in `## Multi-sector document review log (mandatory)`.

## Usage

```bash
/develop-feature "Add dark mode toggle to settings"
```

Or use natural language and let `00_router` orchestrate automatically.
