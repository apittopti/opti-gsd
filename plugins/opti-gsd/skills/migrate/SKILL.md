---
description: Migrate an existing opti-gsd project from v2 to v3 format — converts state, config, and plans
disable-model-invocation: true
---

# Migrate v2 → v3

One-time migration for projects using the old opti-gsd format. Converts all orchestration files to v3 schemas while preserving progress.

## Step 1: Detect Version

Read `.opti-gsd/state.json`:

```json
// v2 — no version field, has in_progress array
{ "phases": { "complete": [], "in_progress": [], "pending": [] } }

// v3 — has version field, has total/current
{ "version": "3.0", "phases": { "total": 4, "complete": [], "current": 2, "pending": [] } }
```

If `state.json` has `"version": "3.0"`:
```
✓ Already v3
─────────────────────────────────────
This project is already using v3 format.
Nothing to migrate.
```

If `.opti-gsd/` doesn't exist:
```
⚠️ Not Initialized
─────────────────────────────────────
No .opti-gsd/ directory found.
→ Run /opti-gsd:init to initialize a new project.
```

## Step 2: Backup

Create a backup before modifying anything:

```bash
cp -r .opti-gsd .opti-gsd.v2-backup
```

Report:
```
Backup created: .opti-gsd.v2-backup/
```

## Step 3: Migrate config.json

Read `.opti-gsd/config.json` and transform:

### v2 format (what exists):
```json
{
  "project": { "name": "my-app", "type": "nextjs" },
  "mode": "interactive",
  "branching": { "enabled": true, "pattern": "gsd/v{milestone}" },
  "ci": { "lint": "...", "typecheck": "...", "test": "...", "build": "...", "e2e": null },
  "deployment": { "platform": null, "preview_url": null },
  "testing": { "always_test": [], "never_test": ["*.md", "*.json"] }
}
```

### v3 format (target):
```json
{
  "version": "3.0",
  "project": {
    "name": "my-app",
    "type": "nextjs",
    "framework": null,
    "language": null
  },
  "branching": {
    "enabled": true,
    "pattern": "gsd/v{milestone}",
    "protected": ["master", "main", "production", "prod"]
  },
  "ci": { "lint": "...", "typecheck": "...", "test": "...", "build": "...", "e2e": null },
  "deployment": { "platform": null, "preview_url": null },
  "testing": { "always_test": [], "never_test": ["*.md", "*.json"] },
  "mode": "interactive"
}
```

### Migration rules:
1. Add `"version": "3.0"`
2. Add `"branching.protected": ["master", "main", "production", "prod"]` if missing
3. Add `"project.framework": null` if missing — try to detect from project files
4. Add `"project.language": null` if missing — try to detect from project files
5. Keep all existing values intact
6. Remove any deprecated fields: `"urls"` (if present)

## Step 4: Migrate state.json

Read `.opti-gsd/state.json` and transform:

### v2 format (what exists):
```json
{
  "milestone": "v1.0",
  "branch": "gsd/v1.0",
  "phase": 2,
  "task": "03",
  "status": "executing",
  "phases": {
    "complete": [1],
    "in_progress": [2],
    "pending": [3, 4]
  },
  "last_active": "2026-01-29T00:00:00Z",
  "context": "Working on phase 2"
}
```

### v3 format (target):
```json
{
  "version": "3.0",
  "milestone": "v1.0",
  "branch": "gsd/v1.0",
  "phase": 2,
  "status": "executing",
  "phases": {
    "total": 4,
    "complete": [1],
    "current": 2,
    "pending": [3, 4]
  },
  "execution": {
    "wave": null,
    "tasks_done": [],
    "tasks_failed": [],
    "tasks_pending": []
  },
  "last_active": "2026-01-29T00:00:00Z"
}
```

### Migration rules:
1. Add `"version": "3.0"`
2. Compute `"phases.total"` from `complete.length + in_progress.length + pending.length`
3. Set `"phases.current"` from first element of `in_progress` array (or `phase` field)
4. Remove `"phases.in_progress"` — replaced by `phases.current`
5. Remove `"task"` — moved into `execution` block
6. Remove `"context"` — no longer used
7. Add `"execution"` block:
   - If status is `"executing"` and `task` was set: populate `tasks_done` with tasks before current task ID, `tasks_pending` with current and remaining
   - If not executing: set `execution` to `null`
8. Map old status values to new:

| v2 Status | v3 Status |
|-----------|-----------|
| `initialized` | `initialized` |
| `planning` | `roadmap_created` |
| `planned` | `planned` |
| `executing` | `executing` |
| `executed` | `executed` |
| `reviewing` | `executed` |
| `reviewed` | `reviewed` |
| `verifying` | `reviewed` |
| `verified` | `verified` |
| `milestone_complete` | `milestone_complete` |
| `paused` | keep current underlying status |

## Step 5: Migrate plan.json Files

Scan for existing plan files:
```bash
find .opti-gsd/plans -name "plan.json" 2>/dev/null
```

For each plan.json found, check format:

### v2 format (XML-style tasks in JSON):
```json
{
  "phase": 2,
  "tasks": [
    {
      "id": "01",
      "wave": 1,
      "title": "Create User model",
      "files": ["src/models/user.ts"],
      "action": "Create User model...",
      "verify": "Run tests",
      "done": "Model exists"
    }
  ]
}
```

Or older format with XML task blocks stored as strings.

### v3 format (target):
```json
{
  "version": "3.0",
  "phase": 2,
  "title": "Phase title from roadmap",
  "goal": "Phase goal from roadmap",
  "created": "2026-02-01T00:00:00Z",
  "must_haves": ["Observable outcome from roadmap"],
  "waves": [
    {
      "wave": 1,
      "description": "Wave 1 tasks",
      "tasks": [
        {
          "id": "01",
          "title": "Create User model",
          "files": [
            { "path": "src/models/user.ts", "action": "create" }
          ],
          "action": "Create User model...",
          "verify": [
            { "type": "test", "cmd": "npm test", "description": "Run tests" }
          ],
          "done": "Model exists"
        }
      ]
    }
  ],
  "total_tasks": 1,
  "total_waves": 1
}
```

### Migration rules:
1. Add `"version": "3.0"`
2. Group tasks by their `wave` field into `waves[]` array
3. If tasks have no `wave` field, put all in wave 1
4. Add `"title"` and `"goal"` from roadmap.md (read the matching phase section)
5. Add `"must_haves"` — extract from roadmap phase deliverables
6. Add `"created"` — use file modification time or current time
7. Add `"wave.description"` — generate from task titles in that wave
8. Compute `"total_tasks"` and `"total_waves"`
9. Convert `files` from string array to object array:
   - `"src/file.ts"` → `{ "path": "src/file.ts", "action": "create" }` (default to create for new tasks, modify for existing files)
10. Convert `verify` from string to object array:
   - `"Run tests"` → `[{ "type": "test", "cmd": "npm test", "description": "Run tests" }]`
   - If verify was already an array of strings, wrap each in an object
11. Keep `id`, `title`, `action`, `done` fields unchanged

### Handle XML-style plans:
If a plan contains XML-like task blocks as strings (very old format):
```xml
<task id="01" wave="1">
  <title>Create User model</title>
  <files>src/models/user.ts</files>
  <action>Create User model...</action>
  <verify>Run tests</verify>
  <done>Model exists</done>
</task>
```

Parse these into the v3 JSON structure. Extract each field from the XML tags.

## Step 6: Create Missing Directories

Ensure these directories exist (v3 expects them):
```bash
mkdir -p .opti-gsd/research
mkdir -p .opti-gsd/stories
mkdir -p .opti-gsd/issues
mkdir -p .opti-gsd/features
mkdir -p .opti-gsd/plans
```

## Step 7: Handle Deprecated Files

Check for files that v3 no longer uses:

| Old File | Action |
|----------|--------|
| `.opti-gsd/codebase/*.md` | Move to `.opti-gsd/codebase-analysis.md` (consolidate) or leave in place |
| `.opti-gsd/debug/*.md` | Leave in place — debug outputs are still readable |
| `.opti-gsd/learnings.md` | Leave in place — still useful context |
| `.opti-gsd/tools.json` | Leave in place — not used by v3 but harmless |

Do NOT delete any files. Old files are harmless and may contain useful history.

## Step 8: Validate

After migration, validate all files:

1. **config.json** — parse as JSON, check `version` is `"3.0"`, check required fields exist
2. **state.json** — parse as JSON, check `version` is `"3.0"`, check `phases` has correct structure
3. **plan.json** (each) — parse as JSON, check `waves` array exists, check tasks have required fields

If any validation fails, report the specific error and don't commit.

## Step 9: Commit

```bash
git add .opti-gsd/
git commit -m "chore: migrate opti-gsd from v2 to v3

- config.json: added version, branching.protected, project metadata
- state.json: restructured phases, added execution block
- plan.json: grouped tasks into waves structure
- Backup preserved at .opti-gsd.v2-backup/"
```

## Step 10: Report

```
✓ Migration Complete (v2 → v3)
══════════════════════════════════════════════════════════════

Files migrated:
  ✓ config.json — added version, protected branches, project metadata
  ✓ state.json  — restructured phases, execution block
  {for each plan:}
  ✓ plans/phase-{NN}/plan.json — grouped {N} tasks into {M} waves

Backup: .opti-gsd.v2-backup/

Current state:
  Milestone: {milestone}
  Phase:     {phase} ({status})
  Progress:  {complete}/{total} phases complete

→ Run /opti-gsd:status to verify everything looks correct
→ If something went wrong: rm -rf .opti-gsd && mv .opti-gsd.v2-backup .opti-gsd
```
