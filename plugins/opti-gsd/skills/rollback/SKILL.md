---
description: Rollback to a checkpoint — phase-level or task-level granularity
disable-model-invocation: true
argument-hint: "[phase-task] e.g. '2' for phase or '2-01' for task"
---

# Rollback

Rollback to a previous checkpoint. Supports phase-level and per-task granularity.

## Arguments

- `{N}` — rollback to before phase N execution (phase-level)
- `{N}-{TT}` — rollback to before task TT in phase N (task-level)
- No args — list available checkpoints

## Step 1: List Checkpoints

```bash
git tag -l "gsd/checkpoint/*" --sort=-creatordate
```

Display available checkpoints:
```
Available Checkpoints:
─────────────────────────────────────
  gsd/checkpoint/phase-02/T03  — Task 03 of Phase 2
  gsd/checkpoint/phase-02/T02  — Task 02 of Phase 2
  gsd/checkpoint/phase-02/T01  — Task 01 of Phase 2
  gsd/checkpoint/phase-02/pre  — Before Phase 2 execution
  gsd/checkpoint/phase-01/T02  — Task 02 of Phase 1
  gsd/checkpoint/phase-01/T01  — Task 01 of Phase 1
  gsd/checkpoint/phase-01/pre  — Before Phase 1 execution
```

## Step 2: Confirm Rollback

```
⚠️ Rollback to: {tag}
─────────────────────────────────────
This will reset your code to the state at {tag}.
All changes after this point will be LOST.

Commits that will be undone:
{list of commits between tag and HEAD}

Continue? (yes/no)
```

## Step 3: Execute Rollback

```bash
git reset --hard {tag}
```

## Step 4: Update State

Update state.json to reflect the rollback:
- If rolled back to phase pre-checkpoint: set status to "planned", clear execution
- If rolled back to a task: update execution.tasks_done to exclude subsequent tasks

```json
{
  "status": "planned",
  "execution": null,
  "last_active": "{timestamp}"
}
```

## Step 5: Report

```
✓ Rolled Back to {tag}
─────────────────────────────────────
{commits_undone} commits undone.

→ /opti-gsd:execute   — Re-execute the phase
→ /opti-gsd:status    — See current state
```
