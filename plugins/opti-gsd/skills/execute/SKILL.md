---
description: Execute the current phase plan — spawns executor agents for wave-based parallel task execution
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, Task, AskUserQuestion
---

# Execute Phase Plan

Orchestrate execution of the current phase plan. This skill spawns executor subagents for each task and manages wave-based parallelism.

**This skill runs in main context** (not forked) because it needs to spawn subagents via the Task tool. Subagents cannot spawn other subagents.

## Phase Number Normalization

**CRITICAL:** ALWAYS zero-pad phase numbers to 2 digits when building directory paths.
```bash
printf "phase-%02d" {N}
```
- Phase `1` → `phase-01`, phase `10` → `phase-10`
- state.json stores phase as integer, directory uses zero-pad

## Step 0: Validate

### 0a: Check State

Read `.opti-gsd/state.json`. **Block if** `status` is `"initialized"` or `"roadmap_created"`:
```
⚠️ Wrong Workflow Stage
─────────────────────────────────────
Current status: {status}
Execution requires a plan.
→ Run /opti-gsd:plan first.
```
**Allow if** status is `planned`, `executing` (resume), `executed` (re-execute), `reviewed`, or `verified`.

### 0b: Validate Plan Exists

Check `.opti-gsd/plans/phase-{NN}/plan.json` exists. **Block if missing** (even if status says planned — the file is the source of truth):
```
⚠️ No Plan Found
─────────────────────────────────────
No plan.json for phase {N} at .opti-gsd/plans/phase-{NN}/plan.json
→ Run /opti-gsd:plan to create a plan first.
```

**Validate plan is non-empty:** Check `total_tasks > 0` and every wave has `tasks.length > 0`. Block if empty:
```
⚠️ Empty Plan
─────────────────────────────────────
Plan for phase {N} has 0 tasks. Cannot execute.
→ Run /opti-gsd:plan to regenerate.
```

### 0c: Validate Branch

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

Read `.opti-gsd/plans/phase-{NN}/plan.json` (already validated in Step 0b).

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

**If uncommitted changes exist**, display the warning then **use the `AskUserQuestion` tool** to get the user's choice:
```
⚠️ Uncommitted Changes Detected
─────────────────────────────────────
There are uncommitted changes in the working directory.
```

**Call AskUserQuestion** with options:
```
  A) Commit and continue — commit current changes, resume execution
  B) Stash and continue — stash changes, start fresh
  C) Discard and continue — WARNING: changes will be lost
```
**Do NOT proceed until the user responds.**

**If previous execution progress exists** (check state.json `execution` field is not null and `status` is `"executing"`):

Display the recovery summary:
```
⚠️ Previous Execution In Progress
─────────────────────────────────────
Phase {N} execution was interrupted.
Completed: Tasks {list from execution.tasks_done}
Failed:    Tasks {list from execution.tasks_failed}
Remaining: Tasks {list from execution.tasks_pending}
Last wave:  {execution.wave}
```

**Use the `AskUserQuestion` tool** to ask:
`Resume execution or start over? (resume / restart)`

**Do NOT proceed until the user responds.**

**If user says "resume":**
1. Skip all waves that are fully completed (all tasks in `execution.tasks_done`)
2. For the interrupted wave: only spawn executors for tasks NOT in `tasks_done`
3. Failed tasks (`tasks_failed`) are retried unless user says otherwise
4. Continue from the next incomplete wave onward

**If user says "restart":**
1. Clear execution state: set `execution` to null
2. Proceed from Wave 1 as a fresh execution
3. Note: previous checkpoint tags still exist for rollback

## Step 3: Determine Mode

Read `config.mode` from config.json:
- `interactive` — pause for user review between waves
- `autonomous` — execute all waves without pausing (immediate continue)

If not set, use the `AskUserQuestion` tool to ask the user:
```
Execution mode:
  A) Interactive — review between waves (recommended)
  B) Yolo — execute all waves without stopping
```
**You MUST use the AskUserQuestion tool here** — do not assume a default or continue without the user's answer.

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

**CRITICAL: Use the `executor` custom agent.**

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

1. **Parse commit hash** from executor output — look for `Commit: {hash}` (a 7-40 character hex string)
2. **If commit hash found**, tag the checkpoint:
   ```bash
   git tag -f "gsd/checkpoint/phase-{NN}/T{id}" {commit_hash}
   ```
   This ensures per-task rollback works even with parallel execution.
3. **If commit hash NOT found** (executor crashed or forgot to report it):
   - Check if the executor made any commits by looking at recent git log:
     ```bash
     git log --oneline -3
     ```
   - If a matching commit exists (message contains `phase-{NN}-T{id}`), use that hash
   - If no commit found, mark the task as **failed** and proceed to failure handling (Step 5e)
   - **Do NOT silently skip tagging** — every completed task must have a checkpoint
4. **Record result** — success/failure, files changed, tests passed

### 5d: Update and Persist Progress

**CRITICAL:** Update AND commit state.json after each wave completes. This ensures progress survives crashes.

Update state.json:
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

Commit immediately:
```bash
git add .opti-gsd/state.json
git commit -m "chore: execution progress — wave {W} complete"
```

### 5e: Handle Failures

If a task fails, display the error then **use the `AskUserQuestion` tool** to get the user's choice:
```
⚠️ Task {id} Failed
─────────────────────────────────────
{error_summary}
```

**Call AskUserQuestion** with options:
```
  A) Retry — re-run the task
  B) Skip — continue to next wave (task marked failed)
  C) Stop — pause execution, investigate manually
```
**Do NOT proceed until the user responds.**

On retry: re-spawn executor for the failed task (max 2 retries).

### 5f: Inter-Wave Review (Interactive Mode)

In interactive mode, after each wave completes, display the wave summary then **use the `AskUserQuestion` tool to wait for the user's response before proceeding**:

```
Wave {W} Complete
─────────────────────────────────────
✓ Task 01: {summary}
✓ Task 02: {summary}
```

**You MUST call AskUserQuestion** with the prompt: `Continue to Wave {W+1}? (yes / review / stop)`

**Do NOT proceed to the next wave until the user responds.** This is a hard gate — the model must block here.

- If user says **"yes"** — proceed to next wave
- If user says **"review"** — show detailed changes from this wave, then ask again
- If user says **"stop"** — halt execution, update state.json with progress so far

In autonomous mode — proceed immediately to next wave without asking.

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
