---
trigger: always_on
---


# TypeScript & Best Practices

## Language & Type Safety
- Use TypeScript for all code; strict mode enabled.
- Prefer interfaces over types for object shapes.
- Avoid `any`; use `unknown` + type guards when type is truly unknown.
- Avoid enums; use `as const` objects or union types.
- Use `Pick`, `Omit`, `Partial`, `Required` utility types.
- Avoid type assertions (`as`) unless absolutely necessary; prefer type guards.
- Export types separately from values.

## Code Style
- Functional and declarative programming; avoid classes unless framework requires them.
- Prefer composition over inheritance.
- Use `const` over `let`, never `var`.
- Use early returns to reduce nesting; guard clauses first, happy path last.
- Keep functions small and focused (single responsibility).
- Prefer iteration and modularization over code duplication (DRY).
- Use `function` keyword for pure functions; arrow functions for callbacks/inline.
- See `addon-naming-conventions.md` for detailed naming guidelines.

## Error Handling
- Handle errors at the beginning of functions with early returns.
- Use custom error types for domain errors, not generic `Error`.
- Never swallow errors silently; always log or propagate.
- Never use `error as Error` type assertion in catch blocks; use `instanceof` check.
- Provide user-friendly error messages; log technical details separately.

## Testing
- Write or update tests before implementing features (TDD when practical).
- Never delete or weaken existing tests without explicit approval.
- Every bug fix must include a regression test.
- Test edge cases: empty inputs, nulls, boundary values, concurrent access.
- Use meaningful test names that describe the expected behavior.
- Every change must include a testing note (commands run + outcome).

## Performance
- Use lazy loading and code splitting for non-critical resources.
- Memoize expensive computations; use `useMemo`/`useCallback` in React.
- Avoid premature optimization; profile first, optimize second.

## Documentation
- Don't add or remove comments unless explicitly asked.
- When adding new public functions/APIs, add JSDoc with params and return type.
- Comments explain "why", not "what".
