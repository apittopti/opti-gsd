---
name: execute
description: Execute the current phase plan — spawns executor agents for wave-based parallel task execution
disable-model-invocation: true
---

# Execute Phase Plan

Orchestrate execution of the current phase plan. This skill spawns executor subagents for each task and manages wave-based parallelism.

**This skill runs in main context** (not forked) because it needs to spawn subagents via the Task tool. Subagents cannot spawn other subagents.

## Phase Directory Convention

**CRITICAL:** Phase directories are ALWAYS zero-padded to 2 digits.
Phase 1 = `phase-01`. Format: `.opti-gsd/plans/phase-{NN}/`

## Step 0: Validate Branch

```bash
current_branch=$(git branch --show-current)
```

Block on protected branches (`master`, `main`, `production`, `prod`):
```
🛑 BLOCKED: Protected Branch
─────────────────────────────────────
Cannot execute on '{branch}'. This is a protected branch.
→ Switch to your milestone branch first.
```

If `branching.enabled` in config.json, verify on milestone branch. Auto-switch if needed:
```bash
git checkout {branch_pattern}
```

## Step 1: Load Plan

Read `.opti-gsd/plans/phase-{NN}/plan.json`.

If no plan exists:
```
⚠️ No Plan Found
─────────────────────────────────────
No plan.json for phase {N}.
→ Run /opti-gsd:plan to create a plan first.
```

Parse the plan to extract:
- Tasks with IDs, waves, files, actions, verification steps
- Wave structure and dependencies
- Must-have outcomes

## Step 2: Check for Recovery

Check git state for evidence of partial execution:

```bash
git status --porcelain
git log --oneline -20
```

**If uncommitted changes exist:**
```
⚠️ Uncommitted Changes Detected
─────────────────────────────────────
There are uncommitted changes in the working directory.

Options:
  A) Commit and continue — commit current changes, resume execution
  B) Stash and continue — stash changes, start fresh
  C) Discard and continue — WARNING: changes will be lost
```

**If previous execution progress exists** (check state.json `execution` field):
```
⚠️ Previous Execution In Progress
─────────────────────────────────────
Phase {N} execution was interrupted.
Completed: Tasks {list}
Remaining: Tasks {list}

Resuming from Wave {W}, Task {T}...
```

## Step 3: Determine Mode

Read `config.mode` from config.json:
- `interactive` — pause for user review between waves
- `autonomous` — execute all waves without pausing (immediate continue)

Ask user if not set:
```
Execution mode:
  A) Interactive — review between waves (recommended)
  B) Yolo — execute all waves without stopping
```

## Step 4: Pre-Execution Checkpoint

Create a checkpoint tag before any changes:
```bash
git tag -f "gsd/checkpoint/phase-{NN}/pre" HEAD
```

## Step 5: Wave Execution

For each wave in the plan:

### 5a: Announce Wave

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Wave {W} — {task_count} task(s)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 5b: Spawn Executor Agents

For each task in the wave, spawn an executor subagent via the Task tool.

**CRITICAL: Use the `opti-gsd/executor` custom agent.**

The prompt for each executor MUST include:
- The task JSON from plan.json (id, title, files, action, verify, done)
- The phase number and task ID
- The project type and relevant conventions
- CI commands from config.json
- Instruction to output `Commit: {hash}` after committing

**Single-task wave:** One Task call, wait for result.
**Multi-task wave:** Multiple Task calls in a SINGLE message for parallel execution.

Example for parallel wave:
```
[Task call 1: executor for T01]
[Task call 2: executor for T02]
[Task call 3: executor for T03]
```

### 5c: Collect Results

For each completed task:

1. **Parse commit hash** from executor output — look for `Commit: {hash}`
2. **Tag checkpoint with the specific commit hash:**
   ```bash
   git tag -f "gsd/checkpoint/phase-{NN}/T{id}" {commit_hash}
   ```
   This ensures per-task rollback works even with parallel execution.
3. **Record result** — success/failure, files changed, tests passed

### 5d: Update Progress

Update state.json after each wave:
```json
{
  "status": "executing",
  "execution": {
    "wave": {current_wave},
    "tasks_done": ["01", "02"],
    "tasks_failed": [],
    "tasks_pending": ["03"]
  }
}
```

### 5e: Handle Failures

If a task fails:
```
⚠️ Task {id} Failed
─────────────────────────────────────
{error_summary}

Options:
  A) Retry — re-run the task
  B) Skip — continue to next wave (task marked failed)
  C) Stop — pause execution, investigate manually
```

On retry: re-spawn executor for the failed task (max 2 retries).

### 5f: Inter-Wave Review (Interactive Mode)

In interactive mode, after each wave completes:
```
Wave {W} Complete
─────────────────────────────────────
✓ Task 01: {summary}
✓ Task 02: {summary}

Continue to Wave {W+1}? (yes / review / stop)
```

If user says "review" — show detailed changes from this wave.
In autonomous mode — proceed immediately to next wave.

## Step 6: Write Summary

After ALL waves complete, write `.opti-gsd/plans/phase-{NN}/summary.md`:

```markdown
# Phase {N} Execution Summary

**Date:** {timestamp}
**Tasks:** {done_count}/{total_count} completed
**Waves:** {wave_count}

## Results

### Task 01: {title}
- Status: ✓ complete
- Files: {list}
- Commit: {hash}

### Task 02: {title}
- Status: ✓ complete
- Files: {list}
- Commit: {hash}

## Verification Checklist
- [ ] {check from task 01}
- [ ] {check from task 02}
```

## Step 7: Update State

```json
{
  "status": "executed",
  "execution": {
    "wave": {final_wave},
    "tasks_done": ["01", "02", "03"],
    "tasks_failed": [],
    "tasks_pending": []
  },
  "last_active": "{timestamp}"
}
```

## Step 8: Final User Review

Present execution summary to the user:

```
Phase {N} Execution Complete
══════════════════════════════════════════════════════════════

{done_count}/{total_count} tasks completed successfully

Task Results:
  ✓ 01: {title}
  ✓ 02: {title}
  ✓ 03: {title}

Please review the changes. You can:
  → Browse the code changes
  → Run tests manually
  → Check the application

When ready:
  → /opti-gsd:review    — Get an AI-powered code review
  → /opti-gsd:verify    — Run automated verification checks
  → /opti-gsd:rollback  — Undo if something went wrong
```

**DO NOT auto-trigger verification.** The user decides when to verify.

## Step 9: Commit State

```bash
git add .opti-gsd/state.json .opti-gsd/plans/phase-{NN}/summary.md
git commit -m "docs: phase {N} execution complete

- {done_count}/{total_count} tasks completed
- {wave_count} waves executed"
```
