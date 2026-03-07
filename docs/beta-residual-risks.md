# Operational Beta — Residual Risks

Date: 2026-03-04
Owner: Framework team

## 1) Drift between root status template/schema and skeleton
- Impact: medium-high
- Signal: mismatch in `project`/`state` fields
- Mitigation: keep CI consistency checks for root vs skeleton
- Owner: framework maintainer

## 2) Limited coverage for advanced workflows oriented to product codebases
- Impact: medium
- Signal: workflows referencing folders not present in the framework repo
- Mitigation: explicit prerequisites in workflows + docs-only fallback
- Owner: framework architect

## 3) Evidence quality depends on manual discipline
- Impact: medium
- Signal: incomplete status updates or missing PASS/FAIL outcomes
- Mitigation: mandatory operational checklist in release gate
- Owner: reviewer/release manager

## 4) Reduced auditability without consolidated release/tag history
- Impact: medium
- Signal: difficulty reconstructing baselines and deltas
- Mitigation: strict changelog discipline and systematic tagging
- Owner: release manager

## 5) No runtime application validation in the framework repo
- Impact: low-medium for framework, high for downstream projects
- Signal: tests are only structural/documentation-oriented
- Mitigation: require runtime QA in the target application repo
- Owner: downstream product team

## 6) Multi-sector review gate bypass in ad-hoc documentation updates
- Impact: medium
- Signal: artifacts missing `## Multi-sector review (mandatory)` and no status review-log entry
- Mitigation: CI enforcement on templates/workflow hooks + release checklist verification
- Owner: reviewer/release manager

## Summary
The framework is suitable for an operational process beta (artifacts/workflows/gates).
The main residual risk is operational rather than structural: preserving long-term discipline on evidence, review, and release quality.
