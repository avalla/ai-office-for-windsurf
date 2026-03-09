# Decision Log

## Template
- Date:
- Topic:
- Decision:
- Rationale:
- Alternatives considered:
- Risks / mitigations:
- Follow-ups:

## 2026-03-04 — Beta cycle #1 (marketplace-lite)
- Date: 2026-03-04
- Topic: First end-to-end dry-run to validate framework beta readiness
- Decision: Close the cycle at `postmortem` after QA PASS + Review PASS + Release evidence updates
- Rationale: Beta objective requires at least one full simulated cycle with updated status and decision evidence
- Alternatives considered:
  - Stop at `dev`: rejected (insufficient proof for operational beta)
  - Stop at `qa`: rejected (missing review/release/postmortem closure)
- Risks / mitigations:
  - Risk: future drift between contracts and artifacts
  - Mitigation: keep CI structural gates and onboarding checklist mandatory before release
- Follow-ups:
  - Keep `docs/runbooks/start-new-project-quickstart.md` and checklist updated with workflow changes
  - Evaluate markdown lint automation in P2

## 2026-03-05 — Mandatory multi-sector document review gate
- Date: 2026-03-05
- Topic: Enforce per-artifact quality review before workflow completion
- Decision: Require `review-document-multisector` execution for every written/updated artifact and log evidence in status
- Rationale: Improve consistency, reduce weak handoffs, and make documentation quality auditable
- Alternatives considered:
  - Keep review only in `60_review_merge`: rejected (too late, misses per-artifact improvements)
  - Optional reviewer gate: rejected (not reliable for operational quality)
- Risks / mitigations:
  - Risk: additional process overhead
  - Mitigation: standardized review template + CI checks for mandatory review sections
- Follow-ups:
  - Keep workflow hooks and templates synchronized with CI assertions
  - Evaluate lightweight automation to pre-fill review stubs in future phases

## 2026-03-07 — AI Office Demo Website - Full Framework Cycle Validation
- Date: 2026-03-07
- Topic: Validate complete AI Office framework workflow with real project implementation
- Decision: Successfully completed full 9-stage workflow (00_router → 90_postmortem) for ai-office-demo project
- Rationale: Demonstrates framework maturity and operational readiness through single-cycle execution with zero iterations
- Alternatives considered:
  - Partial workflow execution: rejected (insufficient validation)
  - Multi-iteration approach: rejected (would indicate framework issues)
- Risks / mitigations:
  - Risk: IDE warnings/errors during development (TypeScript module resolution, CSS warnings)
  - Mitigation: Documented as expected behavior, resolved by dependency installation
  - Risk: Runtime testing limitations without dependencies
  - Mitigation: Clear documentation of testing requirements and validation steps
- Follow-ups:
  - Consider adding automated dependency installation to workflow
  - Enhance templates with better error handling guidance
  - Evaluate runtime performance and security testing integration
  - Document single-cycle success as framework validation evidence

## 2026-03-09 — Rave Arcade Brawler (Crazy Studio) full-cycle completion
- Date: 2026-03-09
- Topic: End-to-end framework closure for a Phaser-based arcade game prototype
- Decision: Complete the full workflow cycle and close in `postmortem` with documented QA/review/release evidence
- Rationale: Validate that the metaframework is effective not only for web apps but also for interactive game prototypes
- Alternatives considered:
  - Stop at `dev`: rejected (missing governance proof)
  - Stop at `qa`: rejected (missing review/release/postmortem closure)
- Risks / mitigations:
  - Risk: `init.js` CommonJS incompatibility under project `type: module`
  - Mitigation: manual metadata initialization in `.ai-agency/config.json` + status evidence
  - Risk: large JS chunk warning from Phaser bundle
  - Mitigation: accepted as prototype non-blocker; hardening follow-up logged
- Follow-ups:
  - Add optional chunk-splitting guidance for Phaser projects
  - Consider modernizing skeleton `init.js` to ESM-compatible implementation
  - Introduce minimal automated smoke checks for gameplay artifacts
