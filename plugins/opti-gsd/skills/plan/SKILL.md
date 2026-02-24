---
description: Generate an executable plan for the current phase with wave-based task parallelism
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, Task, AskUserQuestion
argument-hint: "[phase-number] [--research] [--skip-research] [--gaps]"
---

# Plan Phase

Generate an executable plan for the current (or specified) phase.

**This skill runs in main context** for user interaction. Heavy planning work (research, codebase analysis, plan generation) is delegated to the `planner` subagent via the Task tool.

## Arguments

- Phase number (optional — defaults to current phase from state.json)
- `--research` — force research even if research.md exists
- `--skip-research` — skip research step
- `--gaps` — plan gap closure for failed verification items only

## Phase Number Normalization

**CRITICAL:** ALWAYS zero-pad phase numbers to 2 digits when building directory paths.
```bash
printf "phase-%02d" {N}
```
- Phase `1` → `phase-01`, phase `10` → `phase-10`
- state.json stores phase as integer, directory uses zero-pad

## Step 0: Validate (main context)

1. Check `.opti-gsd/` exists and `state.json` is readable
2. Check `.opti-gsd/roadmap.md` exists — if not:
   ```
   ⚠️ No Roadmap
   ─────────────────────────────────────
   Cannot plan without a roadmap.
   → Run /opti-gsd:roadmap first.
   ```
3. Check state.json `status` — **block if** `status` is `"initialized"` (no roadmap yet):
   ```
   ⚠️ Wrong Workflow Stage
   ─────────────────────────────────────
   Current status: {status}
   Planning requires a roadmap first.
   → Run /opti-gsd:roadmap
   ```
   **Allow if** status is `roadmap_created`, `planned` (re-plan), `executed`, `reviewed`, `verified` (next phase), or `milestone_complete`.
4. Check branch — block on protected branches (`master`, `main`, `production`, `prod`)
5. If `branching.enabled` in config.json, verify milestone branch is active

## Step 1: Determine Phase (main context)

If phase number provided, use it. Otherwise read `phases.current` from state.json.

**Validate phase exists in roadmap.md** — search for a `## Phase {N}:` heading. If not found:
```
⚠️ Phase {N} Not in Roadmap
─────────────────────────────────────
Roadmap does not contain Phase {N}.
Available phases: {list from roadmap}
→ Run /opti-gsd:roadmap to view or modify the roadmap.
```

## Step 2: Spawn Planner Agent (via Task tool)

**CRITICAL: Use the `planner` custom agent** via the Task tool (`subagent_type: "planner"`).

The prompt for the planner MUST include:
- The phase number (already validated and zero-padded)
- Any flags (`--research`, `--skip-research`, `--gaps`)
- The project root path

The planner agent will autonomously:
1. Load context (config, state, roadmap, stories, issues, codebase analysis)
2. Research if needed (saves to `.opti-gsd/plans/phase-{NN}/research.md`)
3. Generate plan following task/wave design rules
4. Self-validate the plan
5. Write `.opti-gsd/plans/phase-{NN}/plan.json`
6. Update state.json to `"status": "planned"`
7. Commit the plan
8. Return a plan summary (wave structure, task list, file counts)

## Step 3: Present Plan and Prompt User (main context)

After the planner agent completes, read its output and present the plan summary:

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
```

**Use the `AskUserQuestion` tool** to prompt the user:
```
AskUserQuestion: "Plan ready. Execute now, revise, or stop? (execute / revise / stop)"
```

- If user says **"execute"** — tell them to run `/opti-gsd:execute`
- If user says **"revise"** — ask what to change, then re-spawn the planner agent with revision instructions
- If user says **"stop"** — end, plan is saved for later

**Do NOT end without prompting the user.**

## Gap Closure Mode

When `--gaps` is used, the plan skill operates differently:

### Gap Closure Validation (main context)

1. Check `.opti-gsd/plans/phase-{NN}/verification.json` exists — if not:
   ```
   ⚠️ No Verification Results
   ─────────────────────────────────────
   Cannot plan gap closure without verification results.
   → Run /opti-gsd:verify first.
   ```
2. Read verification.json and extract failed items:
   - `checks` entries with `"status": "fail"`
   - `plan_compliance.details` entries with `"status": "fail"`
   - `issues` array entries
3. If no failures found:
   ```
   ✓ No Gaps Found
   ─────────────────────────────────────
   Verification passed — nothing to fix.
   ```

### Gap Closure Planner Prompt

Include in the planner agent prompt:
- The full verification.json content
- The original plan.json (so planner knows what was already attempted)
- Specific instruction: **only create tasks to fix the identified gaps, not re-implement the whole phase**
- The planner should set `"gap_closure": true` in plan.json root

### Gap Closure Plan Format

The gap closure plan.json includes an extra field:
```json
{
  "version": "3.0",
  "phase": 2,
  "gap_closure": true,
  "title": "Phase 2 Gap Closure",
  "goal": "Fix {N} gaps from verification",
  "original_plan": "phase-02/plan.json",
  "gaps": [
    { "source": "check:typecheck", "description": "5 type errors in users.ts" },
    { "source": "task:03", "description": "Test check failed — missing assertion" }
  ],
  "waves": [ ... ],
  "total_tasks": 1,
  "total_waves": 1
}
```

### After Gap Closure

The gap closure plan follows the normal flow: execute → review → verify.
If verification passes this time, the phase moves to `verified`.
