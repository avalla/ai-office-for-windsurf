---
trigger: model_decision
description: Apply this rule on React web projects (Vite, Next.js, etc.)
---

# Frontend React Best Practices

## Component File Naming

- Use **PascalCase** for React component file names (e.g., `UserCard.tsx`, not `user-card.tsx`).
- Use **kebab-case** for non-component files (hooks, utilities, services).
- Prefer **named exports** for components.

## Component Structure

- Structure files in this order: exported component, subcomponents, helpers, static content, types.
- Keep components small and focused (single responsibility principle).
- Use early returns to reduce nested conditions.
- Use functional components with hooks; avoid classes.
- Prefer iteration and modularization over code duplication.

## Project Structure (Feature-Based)

```
src/
  features/
    auth/
      components/
      hooks/
      services/
      types/
      index.ts          # barrel export
  shared/
    components/
    hooks/
    utils/
    types/
  pages/                # route components
  layouts/              # layout components
```

- Use absolute imports with path aliases (`@/features`, `@/shared`, etc.).
- Keep business logic in custom hooks, not in components.
- Separate UI components from business logic components.
- Use **barrel exports** (`index.ts`) for cleaner imports.

## Styling & UI (Generic)

- Implement responsive design with mobile-first approach.
- Ensure high accessibility (a11y) standards:
  - Use ARIA roles and native accessibility props.
  - Provide focus states for all interactive elements.
  - Test color contrast for accessibility.
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- Use CSS animations and transitions for smooth UX.
- Use loading skeletons and spinners for better perceived performance.

## State Management & Logic

- Use React Context for global state (auth, theme, etc.).
- Use React Query (TanStack Query) or similar for server state.
- Use local state for UI-only state.
- Use `useReducer` for complex local state logic.
- Implement proper state updates (immutable patterns).
- Avoid prop drilling by using context or custom hooks.
- Extract complex logic into custom hooks.

## Performance & Optimization

- Use `React.memo()` for expensive components.
- Use `useCallback` and `useMemo` for performance optimization.
- Implement code splitting with lazy loading (`React.lazy`, `Suspense`).
- Optimize images (WebP format, lazy loading).
- Use virtual scrolling for large lists.
- Minimize re-renders with proper dependency arrays.
- Use Intersection Observer for lazy loading.

## Error Handling

- Implement error boundaries for graceful error handling.
- Show user-friendly error messages.
- Provide proper 404 and 500 error pages.

## Testing Strategy

- Test component behavior, not implementation.
- Use meaningful test names.
- Test happy paths and edge cases.
- Test error states and loading states.
- Mock external dependencies.
- Aim for 80%+ code coverage.
- Use fixtures for consistent test data.

## Security & Best Practices

- Sanitize user inputs before rendering.
- Implement proper authentication checks.
- Never expose sensitive data in the frontend.
- Store secrets in environment variables, not in code.

## SEO & Meta Tags (if applicable)

- Use React Helmet or similar for managing document head.
- Implement proper meta tags for social sharing.
- Use semantic HTML for better SEO.
- Add alt text to all images.
- Use proper heading hierarchy (h1-h6).
