---
description: Develop a feature through the formal framework pipeline
---

# Develop Feature

Use MCP tools for full framework governance on a feature request.

## Steps

1. Call `ai_office_route` with the feature request
   - Returns suggested stage, slug, and guidance file
2. Offer user a choice: **Direct Modification** (skip pipeline) or **Formal Task** (full pipeline)
3. For **Formal Task**, follow the pipeline:
   - `ai_office_scaffold` → `ai_office_advance` through each stage
   - At each stage, read the corresponding `role-*.md` guidance
   - Run `ai_office_review` before advancing
   - Use `ai_office_validate` to check quality gates

## Pipeline Path

`prd` → `adr` → `plan` → `tasks` → `dev` → `qa` → `review` → `release` → `postmortem`

## Usage

Say "develop a feature: [description]" or use `/develop-feature`.

## See Also
- `pipeline.md` — Stage transitions and quality gates
- `role-product.md` through `role-ops.md` — Per-stage guidance
