---
name: roadmap
description: Create, view, or modify the project roadmap with phased delivery plan
disable-model-invocation: true
argument-hint: "[view|add|insert|remove] [phase-number]"
---

# Roadmap

Create, view, or modify the project delivery roadmap.

## Arguments

- No args → view current roadmap (or create if none exists)
- `add` → add a new phase at the end
- `insert N` → insert a phase before phase N
- `remove N` → remove phase N
- `$ARGUMENTS` is passed through for any freeform request

## Step 0: Validate

Check `.opti-gsd/` exists and `state.json` is readable.

Check branch safety — block on protected branches:
```bash
current_branch=$(git branch --show-current)
```
If `master`, `main`, `production`, `prod` → block with error directing to create milestone branch.

If `branching.enabled` is true in config.json and no milestone set in state.json:
```
⚠️ No Milestone Active
─────────────────────────────────────
→ Set a milestone first. Example:
  Update state.json with milestone name, or start fresh with /opti-gsd:init
```

## Step 1: View Existing Roadmap

If `.opti-gsd/roadmap.md` exists and no creation requested:

Display the roadmap with phase status from state.json:

```
📋 Project Roadmap: {project_name}
══════════════════════════════════════════════════════════════

Phase 1: {title}
  Goal: {goal}
  Delivers: {items}
  Status: ✓ complete

Phase 2: {title}
  Goal: {goal}
  Delivers: {items}
  Status: ▶ current

Phase 3: {title}
  Goal: {goal}
  Delivers: {items}
  Status: ○ pending

══════════════════════════════════════════════════════════════

→ /opti-gsd:plan          — Plan current phase
→ /opti-gsd:roadmap add   — Add a new phase
```

## Step 2: Create New Roadmap

If no roadmap exists, interview the user:

```
Let's create your delivery roadmap.

What's the goal of this project/milestone?
What features or changes need to be delivered?
Any dependencies or ordering constraints?
```

Based on answers, create `.opti-gsd/roadmap.md`:

```markdown
# Roadmap: {project_name}

Milestone: {milestone}
Created: {date}

## Phase 1: {title}

**Goal:** {one-sentence goal}

**Delivers:**
- {item 1} — {brief description}
- {item 2} — {brief description}

**Success criteria:**
- {measurable outcome}

## Phase 2: {title}
...
```

## Step 3: Update State

Update state.json:
```json
{
  "status": "roadmap_created",
  "phases": {
    "total": {count},
    "complete": [],
    "current": 1,
    "pending": [2, 3, ...]
  },
  "last_active": "{timestamp}"
}
```

## Step 4: Commit

```bash
git add .opti-gsd/roadmap.md .opti-gsd/state.json
git commit -m "docs: create project roadmap

- {phase_count} phases planned
- Phase 1: {title}
- Milestone: {milestone}"
```

## Modify Operations

### Add Phase
Append a new phase section to roadmap.md. Update state.json phases.pending.

### Insert Phase
Insert before phase N. Renumber subsequent phases. Update all state references.

### Remove Phase
Remove phase section. Renumber. Update state references. Warn if phase has a plan or is complete.

Each modification commits:
```bash
git add .opti-gsd/roadmap.md .opti-gsd/state.json
git commit -m "docs: {add|insert|remove} phase {N} in roadmap"
```
