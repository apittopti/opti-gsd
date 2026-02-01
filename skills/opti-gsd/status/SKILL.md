---
name: status
description: Show current opti-gsd project state with progress bars and suggest the next action
disable-model-invocation: true
---

# Show Project Status

Read the opti-gsd project state and display a comprehensive status report.

## Step 1: Validate Prerequisites

Check for required files:

If `.opti-gsd/` doesn't exist:
```
⚠️ opti-gsd Not Initialized
─────────────────────────────────────
No .opti-gsd/ directory found in this project.

→ Run /opti-gsd:init to initialize an existing project
→ Run /opti-gsd:new-project to start a new project
```

If `.opti-gsd/state.json` missing:
```
⚠️ Project State Missing
─────────────────────────────────────
.opti-gsd/state.json not found.

→ Run /opti-gsd:init to reinitialize
```

## Step 2: Load State

1. Read `.opti-gsd/state.json`, `.opti-gsd/roadmap.md`
2. Check for phase plans: `.opti-gsd/plans/phase-{NN}/plan.json`
3. Check for verification: `.opti-gsd/plans/phase-{NN}/verification.json`
4. Read `.opti-gsd/learnings.md` if exists

**Phase directory convention:** Always zero-pad to 2 digits. Phase 1 = `phase-01`, phase 10 = `phase-10`.

## Step 3: Display Status

```
╔══════════════════════════════════════════════════════════════╗
║                      opti-gsd Status                        ║
╠══════════════════════════════════════════════════════════════╣
║  Milestone: {milestone}     Branch: {branch}                ║
║  Phase: {current} of {total}    Mode: {mode}                ║
╚══════════════════════════════════════════════════════════════╝

Where You Are:
──────────────────────────────────────────────────────────────

  ROADMAP ──► PLAN ──► EXECUTE ──► REVIEW ──► VERIFY
     ✓         ✓       ▶ HERE
──────────────────────────────────────────────────────────────

Phase {N} Progress: [████████████▎░░░░░░░] 62%
──────────────────────────────────────────────────────────────
[✓] Task 1: {description}
[✓] Task 2: {description}
[▸] Task 3: {description}    ← in progress
[ ] Task 4: {description}
──────────────────────────────────────────────────────────────
```

### Progress Bar Generation

Use Unicode eighth-block characters (bar width = 20):
```
█ = full    ▉ = 7/8    ▊ = 3/4    ▋ = 5/8
▌ = 1/2    ▍ = 3/8    ▎ = 1/4    ▏ = 1/8    ░ = empty
```

Algorithm:
1. `total_eighths = (percentage / 100) * 20 * 8`
2. `whole_blocks = floor(total_eighths / 8)` → use █
3. `partial = total_eighths % 8` → pick from: `["", "▏", "▎", "▍", "▌", "▋", "▊", "▉"]`
4. `empty_blocks = 20 - whole_blocks - (partial > 0 ? 1 : 0)` → use ░

## Step 4: Suggest Next Action

Show the primary action based on current state:

| State | DO THIS NOW |
|-------|-------------|
| No .opti-gsd/ | `/opti-gsd:new-project` or `/opti-gsd:init` |
| No roadmap | `/opti-gsd:roadmap` |
| No plan for current phase | `/opti-gsd:plan` |
| Plan exists, not executed | `/opti-gsd:execute` |
| Execution in progress | `/opti-gsd:execute` (resume) |
| Phase executed | `/opti-gsd:review` |
| Review done | `/opti-gsd:push` or `/opti-gsd:verify` |
| Pushed, not verified | `/opti-gsd:verify` |
| Verified, more phases | `/opti-gsd:plan` (next phase) |
| All phases done | `/opti-gsd:complete` |

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                      DO THIS NOW                           ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                            ┃
┃   /opti-gsd:execute                                        ┃
┃                                                            ┃
┃   Continue executing Task 3: {description}                 ┃
┃                                                            ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Also relevant:
  → /opti-gsd:add-feature — Capture something for later
  → /opti-gsd:help        — See all commands
```

## Step 5: Phase Overview

If 3+ phases exist, show collapsed overview:

```
All Phases:
──────────────────────────────────────────────────────────────
Phase 1: {title}      ✓ verified
Phase 2: {title}      ▶ current (62%)
Phase 3: {title}      ○ pending
──────────────────────────────────────────────────────────────
Overall: [████████▏░░░░░░░░░░░] 41%
```

## Workflow Stage Detection

| Stage | Check |
|-------|-------|
| ROADMAP | `.opti-gsd/roadmap.md` exists? |
| PLAN | `.opti-gsd/plans/phase-{NN}/plan.json` exists? |
| EXECUTE | `state.json` execution.tasks_done includes all tasks? |
| REVIEW | `state.json` status is "reviewed"? |
| VERIFY | `.opti-gsd/plans/phase-{NN}/verification.json` exists? |
