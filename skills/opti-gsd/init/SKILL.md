---
name: init
description: Initialize opti-gsd in an existing project — creates config, state, and directory structure
disable-model-invocation: true
---

# Initialize opti-gsd

Set up opti-gsd for an existing project.

## Step 1: Check if Already Initialized

If `.opti-gsd/` already exists:
```
⚠️ Already Initialized
─────────────────────────────────────
.opti-gsd/ directory already exists.

→ Run /opti-gsd:status to see current state
→ Delete .opti-gsd/ and re-run /opti-gsd:init to start fresh
```

## Step 2: Check Branch Safety

```bash
git branch --show-current
```

If on `master`, `main`, `production`, or `prod`:
```
🛑 BLOCKED: Protected Branch
─────────────────────────────────────
Cannot initialize on '{branch}'. This is a protected branch.

Create a milestone branch first:
  git checkout -b gsd/v1.0
Then run /opti-gsd:init again.
```

## Step 3: Gather Project Info

Read existing project files to detect:
- `package.json` → project name, scripts (test, lint, build, typecheck)
- `tsconfig.json` / `pyproject.toml` / `Cargo.toml` → project type
- `.github/workflows/` → existing CI
- Existing test framework

Ask the user:
```
Setting up opti-gsd for: {detected_name}
Type: {detected_type}

Detected CI commands:
  lint:      {detected or "none"}
  typecheck: {detected or "none"}
  test:      {detected or "none"}
  build:     {detected or "none"}

Does this look right? (yes / adjust)
```

## Step 4: Create Directory Structure

```
.opti-gsd/
├── config.json
├── state.json
├── roadmap.md          (empty placeholder)
├── stories/
├── issues/
├── features/
├── plans/
└── learnings.md        (empty)
```

### config.json

```json
{
  "version": "3.0",
  "project": {
    "name": "{name}",
    "type": "{type}"
  },
  "branching": {
    "enabled": true,
    "pattern": "gsd/v{milestone}",
    "protected": ["master", "main", "production", "prod"]
  },
  "ci": {
    "lint": "{detected}",
    "typecheck": "{detected}",
    "test": "{detected}",
    "build": "{detected}",
    "e2e": null
  },
  "deployment": {
    "platform": null,
    "preview_url": null
  },
  "testing": {
    "always_test": [],
    "never_test": ["*.md", "*.json"]
  },
  "mode": "interactive",
  "urls": {
    "local": "http://localhost:3000"
  }
}
```

### state.json

```json
{
  "version": "3.0",
  "milestone": null,
  "branch": "{current_branch}",
  "phase": null,
  "status": "initialized",
  "phases": {
    "total": 0,
    "complete": [],
    "current": null,
    "pending": []
  },
  "execution": null,
  "last_active": "{timestamp}"
}
```

## Step 5: CLAUDE.md Integration

Check if CLAUDE.md exists and contains opti-gsd section:

```bash
grep -q "opti-gsd" CLAUDE.md 2>/dev/null
```

If missing, ask:
```
Add opti-gsd workflow instructions to CLAUDE.md? (yes/no)
```

If yes, append:

```markdown

---

## opti-gsd Workflow

This project uses **opti-gsd** for spec-driven development.

**Before any code changes:**
1. Check status: `/opti-gsd:status`
2. Ensure on milestone branch (never master/main)
3. Follow: Plan → Execute → Review → Verify

**Protected branches:** master, main, production, prod — PR only!

**Key commands:** `/opti-gsd:status`, `/opti-gsd:roadmap`, `/opti-gsd:plan`, `/opti-gsd:execute`, `/opti-gsd:review`, `/opti-gsd:verify`
```

## Step 6: Commit

```bash
git add .opti-gsd/
git add CLAUDE.md  # if modified
git commit -m "chore: initialize opti-gsd

- Created .opti-gsd/ directory structure
- Configured for {project_type} project
- CI commands: {detected_commands}"
```

## Step 7: Report

```
✓ opti-gsd Initialized
─────────────────────────────────────
Project: {name}
Type: {type}
Branch: {branch}

→ Run /opti-gsd:roadmap to create your delivery roadmap
→ Run /opti-gsd:status to see current state
```
