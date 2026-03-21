---
description: Show installed AI Office framework version and check for updates
---

## Steps

1. Read `.claude/commands/office.md` frontmatter to find any version comment at the bottom (e.g. `<!-- ai-office-version: 1.5.0 -->`). If not present, report "unknown".

2. Read the framework source version from the repo root `VERSION` file (present when this repo is cloned locally). If it doesn't exist, note that the source is not available locally.

3. Compare the two versions using semver rules (major.minor.patch).

4. Output:

```
AI Office Framework

Installed version : 1.1.0
Available version : 1.1.0

Status: ✅ Up to date

Commands installed: .claude/commands/ (23 files)
```

If installed < available:
```
Status: ⚠️  Update available (1.0.0 → 1.1.0)

To update, run:
  node install-local.js /path/to/this/project

Or ask me: "update the ai-office commands"
```

If installed version is unknown:
```
Status: ❓ Version unknown — framework may have been installed manually

To stamp the current version, re-run the installer:
  node install-local.js /path/to/this/project
```

5. Also check: are all 23 expected commands present in `.claude/commands/`? List any missing ones.

<!-- ai-office-version: 1.5.0 -->
