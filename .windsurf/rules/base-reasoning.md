---
trigger: always_on
---


# Reasoning & Scope Control

## Think Before Acting
- Before making changes, explain your understanding of the problem.
- If uncertain about an API, library, or function behavior, search docs first.
- Never invent function signatures, parameters, or APIs that don't exist.
- When debugging, identify root cause before proposing fixes.
- If a fix requires changes in multiple files, list all affected files first.

## Scope Control
- Only modify files directly related to the current task.
- Don't refactor unrelated code while fixing a bug.
- Don't add features that weren't requested.
- If you notice an unrelated issue, mention it but don't fix it unless asked.
- Prefer minimal upstream fixes over downstream workarounds.

## Anti-Hallucination
- Never use `// rest of code here` or similar placeholders; always write complete implementations.
- Never assume a file, function, or table exists without checking.
- When referencing existing code, verify it exists in the codebase first.
- If you're unsure about something, say so explicitly.

## Change Strategy
- Prefer minimal, focused edits over large rewrites.
- Single-line fix > small refactor > rewrite.
- Don't move files or rename exports without checking all usages.
- Respect existing patterns: if the codebase uses X, don't introduce Y for the same purpose.
- Ask before creating new packages, modules, or architectural layers.
