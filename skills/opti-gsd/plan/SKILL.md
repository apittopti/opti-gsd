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
- `.opti-gsd/codebase/conventions.md` — if exists

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

```markdown
---
phase: {N}
title: {Phase Title}
wave_count: {count}
task_count: {count}
created: {timestamp}
---

# Phase {N}: {Title}

## Must-Haves (Goal-Backward)

- [ ] {Observable outcome 1}
- [ ] {Observable outcome 2}

## Wave 1

<task id="01" wave="1">
  <files>
    <file action="create">{path}</file>
    <file action="modify">{path}</file>
  </files>
  <action>
    {Specific implementation instructions}
    - {Detail 1}
    - {Detail 2}
  </action>
  <verify>
    <check type="test" cmd="{command}">{description}</check>
    <check type="lint" cmd="{command}">{description}</check>
  </verify>
  <done>{Measurable completion criteria}</done>
</task>

## Wave 2 (After Wave 1)

<task id="03" wave="2" depends="01,02">
  ...
</task>
```

## Step 6: Update state.json

```json
{
  "phase": {N},
  "status": "planned",
  "phases": {
    "current": {N},
    "in_progress": [{N}]
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
3. Mark plan with `gap_closure: true` in frontmatter
