---
trigger: always_on
---


# Git & Commit Rules

## Commits
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `perf:`, `ci:`.
- Keep subject line under 72 characters.
- One logical change per commit.
- Write commit messages in English.

## Before Committing
- When asked to commit, always show the diff summary first.
- Ensure linting and type-check pass before committing.
- Never commit: `.env`, `node_modules`, generated files, build artifacts.

## Branches
- Use descriptive branch names: `feat/listing-wizard`, `fix/bid-race-condition`.
- Keep branches short-lived; merge frequently.
