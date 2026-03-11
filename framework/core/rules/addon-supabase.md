---
trigger: always_on
description: Guidelines for Supabase backend development including RLS, migrations, and Edge Functions
---


# Supabase

## Database
- All tables MUST have Row Level Security (RLS) enabled.
- Use singular table names (`account`, `listing`, `bid`).
- Primary keys are UUIDs (`gen_random_uuid()`).
- Always include `created_at` and `updated_at` timestamps.
- Use `deleted` boolean for soft deletes; never hard-delete user data.
- Index all foreign keys and common search fields.

## Migrations
- Don't create new migrations unless absolutely necessary (new entities, RLS, functions).
- During development, prefer modifying existing migrations + `db reset` over adding new ones.
- Always test migrations with `bun run supabase db reset` after changes.
- Generate TypeScript types after schema changes: `bun run supabase gen types typescript --local`.

## Security Best Practices
- Use dedicated schemas for application objects; avoid `public` for sensitive tables.
- Set `search_path` explicitly inside SECURITY DEFINER functions.
- Minimize SECURITY DEFINER usage; keep functions small and audited.
- GRANT only what is necessary to each role; prefer role-specific grants.
- Revoke default privileges when possible; document any broad grants.
- Avoid dynamic SQL in functions; if required, validate identifiers and inputs.
- Prefer immutable/stable functions for deterministic logic.
- Keep data access through RLS-protected tables; avoid bypass paths.
- Never commit secrets; use `.env.example` and secret managers.
- Validate and sanitize inputs at all boundaries (API, Edge Functions, webhooks).
- Store and verify webhook signatures; persist raw events for audit/replay.
- Implement idempotency keys for external side-effect operations.
- Log security-relevant events (auth changes, role changes, failed checks).
- Rotate secrets and keys regularly; document rotation procedures.
- Write policies for all CRUD operations per role.
- Test RLS with pgTAP for every role (anonymous, user, seller, admin).
- Use SECURITY DEFINER functions for operations that need elevated privileges.
- Never bypass RLS in application code.

## RLS Best Practices
- Prefer static SQL migrations for RLS policies; keep policies simple and index-friendly.
- Avoid subqueries/joins in RLS; avoid VOLATILE functions in policies.
- Use STABLE helper functions that only read JWT claims via `current_setting('request.jwt.claim.*')` or session vars.
- 1–2 RLS policies per table max; move complexity into precomputed masks/materialized fields or app-layer checks.
- Every column used in RLS must be indexed.
- Provide pgTAP tests for RLS and invariants; include optional EXPLAIN-based perf guardrails.
- Prefer `CREATE POLICY` with simple predicates.
- Prefer tenant isolation with `tenant_id` on every tenant-scoped table.
- Prefer permission checks via claims / precomputed masks, not joins.
- For each table with RLS, add pgTAP tests: allow + deny + cross-tenant.
- Keep policies to 1–2 per table; move complexity to precomputed fields or app-layer checks.
- Avoid VOLATILE functions in policies; no `now()` or `random()` in predicates.
- Use `SECURITY DEFINER` helper functions only when necessary; keep them minimal.
- Ensure RLS is enabled and FORCE RLS where appropriate for service roles.
- Add invariant tests: no table without RLS, no policy without index coverage.

## Edge Functions
- Put shared helpers in `supabase/functions/_shared` and import them via relative paths.
- Prefer a small number of "fat functions" over many tiny ones when logic is shared.
- Use hyphenated function names (URL-friendly).
- Keep JWT verification enabled by default; disable only for explicit webhook endpoints.
- Use `config.toml` to set per-function settings (verify_jwt, import_map).
- Add unit tests under `supabase/functions/tests` with `-test` suffix.
- Use Deno runtime conventions for edge functions.
- Validate all inputs with schemas.
- Return proper HTTP status codes and structured error responses.

## pgTAP Testing
- For each RLS-protected table, include pgTAP tests: allow + deny + cross-tenant.
- Add invariant tests (e.g., no table without RLS, no policy without index coverage).
- Keep tests deterministic; avoid reliance on current time or random values.
- Use fixtures that mirror real tenant/org relationships.
- Group tests by module/plugin and keep them close to migrations.
- Prefer small, focused tests over large monolithic suites.

## Queries
- Always type Supabase queries with generated types.
- Use `.select()` with explicit columns; avoid `select('*')` in production.
- For custom queries with joins, derive the result type from the query using `QueryData` (or `QueryResult`/`QueryError`) so nested response shapes stay accurate. Example:
  ```ts
  const query = supabase.from('countries').select('id,name,cities(id,name)')
  type CountriesWithCities = QueryData<typeof query>
  type CountriesWithCitiesResult = QueryResult<typeof query>
  type CountriesWithCitiesError = QueryError<typeof query>

  const { data, error }: CountriesWithCitiesResult = await query
  if (error) throw error
  const countries: CountriesWithCities = data
  ```
- Handle loading, error, and empty states for every query.

## Testing
- Run `bun run supabase test db` for database tests.
- Always `bun run supabase db reset` before analyzing test failures.
- Seed data must be consistent with test assertions.
