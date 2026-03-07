---
trigger: always_on
---

# Runtime & Tooling Selection

- Prefer a **single runtime per surface**:
  - DB functions: Postgres/SQL
  - Edge Functions: Deno (Supabase runtime) or Node/Bun depending on project
  - Local tooling/build/test: Node or Bun (one chosen per repo)
- Avoid mixing Node/Bun/Deno in the same layer unless there is a clear isolation boundary.
- Document the chosen runtime in README and CI; keep lockfiles consistent.
- If multiple runtimes are supported, define a compatibility matrix and test each explicitly.
- Choose default runtime and require opt-in for alternates.
