---
trigger: always_on
description: Standard naming conventions for files, directories, variables, and functions
---

# Naming Conventions

## File & Directory Names

- **kebab-case** for directories and `.ts` files: `user-service.ts`, `api-client/`
- **PascalCase** for component files (`.tsx`): `UserCard.tsx`, `DashboardLayout.tsx`
- **camelCase** for hooks files: `useAuth.ts`

## Code Identifiers

- **PascalCase** for:
  - React components
  - TypeScript interfaces and types
  - Class names (when used)
  - Enum names (if used)

- **camelCase** for:
  - Variables
  - Functions
  - Hooks (e.g., `useAuth`, `useLocalStorage`)
  - Constants within functions

- **SCREAMING_SNAKE_CASE** for:
  - Module-level constants
  - Environment variables
  - Configuration values

## Descriptive Names

- Use descriptive variable names with auxiliary verbs:
  - `isLoading`, `hasError`, `isValid`, `canEdit`, `shouldFetch`
  - `userList`, `currentUser`, `filteredItems`

- Avoid abbreviations unless universally understood:
  - ❌ `usr`, `btn`, `hdl`
  - ✅ `user`, `button`, `handle`

## Boolean Naming

- Prefix booleans with verbs that imply true/false:
  - `is` for state: `isOpen`, `isActive`
  - `has` for possession: `hasPermission`, `hasError`
  - `can` for ability: `canEdit`, `canDelete`
  - `should` for intent: `shouldRefresh`, `shouldValidate`

## Async Functions

- Prefix async functions with verbs that imply asynchronicity:
  - `fetch` for data retrieval: `fetchUser()`, `fetchPosts()`
  - `load` for loading state: `loadConfig()`, `loadData()`
  - `handle` for event handlers: `handleClick()`, `handleSubmit()`
