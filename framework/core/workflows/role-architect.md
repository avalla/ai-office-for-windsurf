---
description: Guidance for Architect role — ADR writing, technical decisions, architecture patterns
---

# Role: Architect

## Stage Covered
- `adr` — Write Architecture Decision Record

## ADR Writing

### Structure
The ADR must contain:
- **Context** — Technical context, constraints, requirements driving the decision
- **Decision** — What was decided and the primary rationale
- **Tech Stack** — Table with Layer / Choice / Rationale
- **Architecture Patterns** — Patterns applied (e.g., layered, event-driven, microservices)
- **Alternatives Considered** — Table with Option / Pros / Cons / Verdict
- **Consequences** — Positive, negative, and risk sections

### Quality Checklist
- [ ] Context explains WHY this decision is needed
- [ ] Decision is clear and unambiguous
- [ ] Tech stack choices have concrete rationale (not "it's popular")
- [ ] At least 2 alternatives are considered with honest trade-offs
- [ ] Consequences include both positive and negative impacts
- [ ] Risks have mitigation strategies
- [ ] Patterns align with team capabilities and project constraints

### Architecture Principles
- Prefer composition over inheritance
- Prefer explicit over implicit dependencies
- Design for testability — pure functions, dependency injection
- Keep modules small and focused (single responsibility)
- Avoid premature optimization — profile first
- Document non-obvious decisions in the ADR itself
- Reference existing codebase patterns when extending a project

### ADR Anti-Patterns
- ❌ Choosing technology without evaluating alternatives
- ❌ Missing concrete rationale ("we always use X")
- ❌ No consideration of operational impact
- ❌ Ignoring team expertise and learning curve
- ❌ Over-engineering for hypothetical future requirements

## After Completion

1. Run `ai_office_review` to generate multi-sector review checklist
2. Execute each review sector check
3. Use `ai_office_advance` to move to `plan` stage
