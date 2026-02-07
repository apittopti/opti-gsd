---
description: Execute phase plan using Agent Teams — teammates communicate and coordinate during parallel execution
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, Task
argument-hint: "[phase-number]"
---

# Team Execute Phase Plan

Execute the current phase plan using Claude Code Agent Teams. Unlike standard `/opti-gsd:execute` which uses isolated subagents, team-execute spawns communicating teammates that can share discoveries, coordinate on interfaces, and self-assign tasks.

**Use team-execute when:**
- Tasks in a wave share interfaces or contracts (e.g., API producer + consumer)
- Tasks span multiple layers (frontend + backend + tests)
- Complex phases where executors benefit from real-time coordination

**Use standard execute when:**
- Tasks are fully independent
- Single-wave plans
- Token budget is a concern (teams use significantly more tokens)

## Prerequisites

Agent Teams must be enabled. Check:
```bash
echo $CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS
```

If not set:
```
⚠️ Agent Teams Not Enabled
─────────────────────────────────────
This skill requires Agent Teams (experimental).

To enable, add to your Claude Code settings.json:
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}

→ Or use /opti-gsd:execute for standard subagent execution.
```

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

## Step 2: Pre-Execution Checkpoint

```bash
git tag -f "gsd/checkpoint/phase-{NN}/pre" HEAD
```

## Step 3: Create Agent Team

Tell Claude to create an Agent Team for this phase. The team structure should be:

```
Create an agent team to execute Phase {N}: {phase_title}.

Team structure:
- One executor teammate per task in the current wave
- Each teammate owns specific files (no overlap within a wave)
- Teammates should message each other when they discover something
  that affects another teammate's work (shared types, interfaces,
  unexpected patterns)

Require plan approval before teammates make changes.
```

### Teammate Spawn Prompts

For each task, the teammate spawn prompt MUST include:
- The full task JSON from plan.json
- Phase number and task ID
- Project type and conventions from config.json
- CI commands to run for verification
- **File ownership:** "You own these files: {list}. Do NOT modify other files."
- **Communication guidance:** "If you discover something that affects {other_tasks}, message the relevant teammate."
- Instruction to output `Commit: {hash}` after committing

Example spawn instruction:
```
Spawn executor teammate "T01-{task_title}" with the prompt:
"You are executing Task 01 of Phase {N} for the opti-gsd project.

Task: {task JSON}

You own: {file list}
Do NOT modify files outside your ownership.

If you discover shared types, interface changes, or patterns that
affect other tasks in this wave, message the relevant teammate:
{teammate list with their file ownership}

After implementing:
1. Run verification: {verify commands}
2. Commit atomically
3. Report: Commit: {hash}

Follow existing code conventions. One task, one commit."
```

## Step 4: Wave Execution

For each wave in the plan:

### 4a: Announce Wave

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Wave {W} — {task_count} task(s) [Agent Team Mode]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 4b: Spawn Teammates for Wave

Spawn all task executors for the wave simultaneously. Use delegate mode to prevent the lead from implementing directly:
- Press Shift+Tab to enter delegate mode
- All tasks assigned via shared task list
- Teammates self-claim tasks as they finish

### 4c: Monitor and Coordinate

While teammates work:
- Watch for inter-teammate messages about shared interfaces
- Redirect teammates if they get stuck
- Nudge teammates who haven't updated task status

### 4d: Collect Results

After all teammates in the wave finish:

1. **Parse commit hashes** from each teammate's output
2. **Tag checkpoints:**
   ```bash
   git tag -f "gsd/checkpoint/phase-{NN}/T{id}" {commit_hash}
   ```
3. **Record results** — success/failure per task, files changed

### 4e: Update Progress

Update state.json after each wave:
```json
{
  "status": "executing",
  "execution": {
    "mode": "agent-team",
    "wave": {current_wave},
    "tasks_done": ["01", "02"],
    "tasks_failed": [],
    "tasks_pending": ["03"]
  }
}
```

### 4f: Handle Failures

If a task fails:
```
⚠️ Task {id} Failed
─────────────────────────────────────
{error_summary}

Options:
  A) Spawn replacement teammate to retry
  B) Skip — continue to next wave (task marked failed)
  C) Stop — shut down team, investigate manually
```

### 4g: Clean Up Wave

After each wave completes, shut down all wave teammates before spawning the next wave's team. This prevents resource bloat across waves.

## Step 5: Write Summary

After ALL waves complete, write `.opti-gsd/plans/phase-{NN}/summary.md`:

```markdown
# Phase {N} Execution Summary

**Date:** {timestamp}
**Mode:** Agent Team
**Tasks:** {done_count}/{total_count} completed
**Waves:** {wave_count}

## Results

### Task 01: {title}
- Status: ✓ complete
- Files: {list}
- Commit: {hash}
- Team communication: {any notable inter-teammate coordination}

## Verification Checklist
- [ ] {check from task 01}
- [ ] {check from task 02}
```

## Step 6: Clean Up Team

Ask the lead to clean up the team:
```
Clean up the team
```

Shut down any remaining teammates first if needed.

## Step 7: Update State

```json
{
  "status": "executed",
  "execution": {
    "mode": "agent-team",
    "wave": {final_wave},
    "tasks_done": ["01", "02", "03"],
    "tasks_failed": [],
    "tasks_pending": []
  },
  "last_active": "{timestamp}"
}
```

## Step 8: Final User Review

```
Phase {N} Execution Complete [Agent Team Mode]
══════════════════════════════════════════════════════════════

{done_count}/{total_count} tasks completed successfully

Task Results:
  ✓ 01: {title}
  ✓ 02: {title}

Team Coordination Notes:
  • {any notable cross-task coordination that occurred}

When ready:
  → /opti-gsd:review       — Single-perspective code review
  → /opti-gsd:team-review  — Multi-perspective team code review
  → /opti-gsd:verify       — Automated verification checks
  → /opti-gsd:rollback     — Undo if something went wrong
```

**DO NOT auto-trigger verification.** The user decides when to verify.

## Step 9: Commit State

```bash
git add .opti-gsd/state.json .opti-gsd/plans/phase-{NN}/summary.md
git commit -m "docs: phase {N} execution complete (agent-team)

- {done_count}/{total_count} tasks completed
- {wave_count} waves executed via Agent Teams"
```
