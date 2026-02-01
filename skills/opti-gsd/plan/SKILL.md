---
name: plan
description: Generate an executable plan for the current phase with wave-based task parallelism
disable-model-invocation: true
context: fork
agent: opti-gsd/planner
argument-hint: "[phase-number] [--research] [--skip-research] [--gaps]"
---

# Plan Phase

Generate an executable plan for the current (or specified) phase.

## Arguments

- Phase number (optional — defaults to current phase from state.json)
- `--research` — force research even if research.md exists
- `--skip-research` — skip research step
- `--gaps` — plan gap closure for failed verification items only

## Phase Directory Convention

**CRITICAL:** Phase directories are ALWAYS zero-padded to 2 digits.
Phase 1 = `phase-01`, phase 10 = `phase-10`.
Format: `.opti-gsd/plans/phase-{NN}/`

## Step 0: Validate

1. Check `.opti-gsd/` exists, `state.json` readable, `roadmap.md` exists
2. Check branch — block on protected branches (`master`, `main`, `production`, `prod`)
3. If `branching.enabled` in config.json, verify milestone branch is active

## Step 1: Determine Phase

If phase number provided, use it. Otherwise read `phases.current` from state.json.
Validate phase exists in roadmap.md.

## Step 2: Load Context

Read:
- `.opti-gsd/config.json` — project type, CI commands, testing config
- `.opti-gsd/state.json` — current position
- `.opti-gsd/roadmap.md` — phase goals and deliverables
- `.opti-gsd/stories/` — story files for items in this phase
- `.opti-gsd/issues/` — issue files for items in this phase
- `.opti-gsd/codebase-analysis.md` — if exists (brownfield analysis from init)

Do NOT load other phase plans, archived content, or unrelated stories.

## Step 3: Research (Conditional)

**Skip if:** `--skip-research` flag, or `.opti-gsd/plans/phase-{NN}/research.md` exists, or phase is simple.

**Do if:** `--research` flag, or phase involves new technology, or no existing research.

If researching:
- Read relevant codebase files to understand current patterns
- Check documentation for libraries/frameworks involved
- Identify potential pitfalls and best practices
- Save to `.opti-gsd/plans/phase-{NN}/research.md`

## Step 4: Generate Plan

Create the plan following these rules:

### Task Design Rules
1. **2-6 tasks per phase** — atomic, focused units of work
2. **Each task modifies specific files** — listed explicitly with action (create/modify)
3. **Tasks in the same wave MUST NOT share writable files** — parallel safety
4. **Each task has verification steps** — how to confirm it works
5. **Each task has clear done criteria** — measurable completion
6. **Task sizing: 15-60 minutes each** — not too big, not too small

### Wave Design Rules
1. Tasks with no dependencies go in Wave 1 (parallel)
2. Tasks depending on Wave 1 outputs go in Wave 2
3. Minimize waves — most phases need 1-2 waves
4. Within a wave, tasks execute in parallel

### Self-Validation
Before writing the plan, verify:
- Every roadmap deliverable is covered by at least one task
- No circular dependencies
- No file conflicts within a wave
- Total task count is reasonable (2-6)
- Verification steps are concrete and runnable

## Step 5: Write plan.json

Create `.opti-gsd/plans/phase-{NN}/plan.json`:

```json
{
  "version": "3.0",
  "phase": 2,
  "title": "API Implementation",
  "goal": "Implement REST API endpoints for user management",
  "created": "2026-02-01T10:00:00Z",
  "must_haves": [
    "User CRUD endpoints functional",
    "All endpoints have tests"
  ],
  "waves": [
    {
      "wave": 1,
      "description": "Data models and database schema",
      "tasks": [
        {
          "id": "01",
          "title": "Create User model",
          "files": [
            { "path": "src/models/user.ts", "action": "create" },
            { "path": "src/db/migrations/001_users.ts", "action": "create" }
          ],
          "action": "Create User model with fields: id, email, name, created_at. Create migration.",
          "verify": [
            { "type": "test", "cmd": "npm test -- --grep User", "description": "Model tests pass" },
            { "type": "lint", "cmd": "npm run lint", "description": "No lint errors" }
          ],
          "done": "User model file exists and migration runs without errors"
        }
      ]
    },
    {
      "wave": 2,
      "description": "API endpoints (depends on models from wave 1)",
      "tasks": [
        {
          "id": "02",
          "title": "User CRUD endpoints",
          "files": [
            { "path": "src/routes/users.ts", "action": "create" },
            { "path": "src/routes/users.test.ts", "action": "create" }
          ],
          "action": "Implement GET/POST/PUT/DELETE for users with validation",
          "verify": [
            { "type": "test", "cmd": "npm test", "description": "All tests pass" }
          ],
          "done": "4 endpoints working with tests"
        }
      ]
    }
  ],
  "total_tasks": 2,
  "total_waves": 2
}
```

## Step 6: Update state.json

```json
{
  "phase": {N},
  "status": "planned",
  "phases": {
    "current": {N}
  },
  "execution": null,
  "last_active": "{timestamp}"
}
```

## Step 7: Commit

```bash
git add .opti-gsd/plans/phase-{NN}/
git add .opti-gsd/state.json
git commit -m "docs: plan phase {N} — {title}

- {task_count} tasks in {wave_count} waves
- Deliverables: {items}"
```

## Step 8: Present Plan

```
Phase {N}: {Title}
══════════════════════════════════════════════════════════════

Wave Structure:
  Wave 1 (parallel): Task 01, Task 02
  Wave 2 (sequential): Task 03

Tasks:
  01. {title} — {file_count} files
  02. {title} — {file_count} files
  03. {title} — {file_count} files

→ /opti-gsd:execute    — Start executing tasks
```

## Gap Closure Mode

When `--gaps` is used:
1. Read `.opti-gsd/plans/phase-{NN}/verification.json` for failed items
2. Create targeted tasks to close specific gaps only
3. Mark plan with `"gap_closure": true` in plan.json root
