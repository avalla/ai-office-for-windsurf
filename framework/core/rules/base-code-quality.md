---
trigger: always_on
---

# Code Quality Best Practices

## Diffs & Refactoring
- Prefer small, reviewable diffs.
- Avoid unrelated refactors during feature/bug work.

## Modules & Design
- Keep modules small, focused, and composable; avoid "god" files.
- Prefer clear, explicit code over cleverness; optimize only with evidence.
- Apply SOLID principles where applicable:
  - Single Responsibility: one reason to change.
  - Open/Closed: extend via new modules, not edits to core logic.
  - Liskov/Interface Segregation/Dependency Inversion: depend on abstractions, keep interfaces narrow.
- DRY with judgment: avoid duplication, but prefer clarity over over-abstraction.
- Favor pure functions and immutable data where practical; minimize shared mutable state.
- Prefer composition over inheritance.

## Code Style
- Validate inputs at boundaries (API, job handlers, webhooks).
- Use descriptive names for functions, variables, and modules; avoid abbreviations.
- Keep side-effects isolated; document when a function mutates state.

## Testing
- Add tests for critical logic and invariants; keep tests deterministic.

## Performance & Optimization
- Use lazy loading and code splitting for non-critical resources.
- Memoize expensive computations.
- Avoid premature optimization; profile first, optimize second.
- Use virtual scrolling for large datasets.
- Optimize images and assets (WebP format, lazy loading).

## Documentation
- Keep docs in sync with behavior when introducing new concepts.
