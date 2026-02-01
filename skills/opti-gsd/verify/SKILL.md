---
name: verify
description: Verify phase completion with automated CI checks, testing, and requirement validation
disable-model-invocation: true
context: fork
agent: opti-gsd/verifier
argument-hint: "[phase-number]"
---

# Verify Phase

Run automated verification checks against the completed phase.

## Step 0: Validate

1. Check `.opti-gsd/` exists, state.json readable
2. Determine phase (from argument or state.json)
3. Verify phase has been executed — check for `.opti-gsd/plans/phase-{NN}/summary.md`

If not executed:
```
⚠️ Phase Not Executed
─────────────────────────────────────
Phase {N} has no execution summary.
→ Run /opti-gsd:execute to execute the phase first.
```

**Phase directory convention:** Always zero-pad: phase 1 = `phase-01`.

## Step 1: Load Context

Read:
- `.opti-gsd/plans/phase-{NN}/plan.json` — tasks and verification steps
- `.opti-gsd/plans/phase-{NN}/summary.md` — execution results
- `.opti-gsd/config.json` — CI commands, deployment config

## Step 2: Run CI Commands

Execute each configured CI command:

```bash
# Lint
{config.ci.lint}

# Type check
{config.ci.typecheck}

# Unit tests
{config.ci.test}

# Build
{config.ci.build}

# E2E (if configured)
{config.ci.e2e}
```

Record pass/fail for each.

## Step 3: Run Task Verification

For each task in the plan, execute its `<verify>` checks:

- `type="test"` — run the command, check exit code
- `type="lint"` — run linter on specific files
- `type="console"` — check for console output
- `type="browser"` — note for manual verification (if no browser tool)

## Step 4: Requirement Coverage

Check each must-have outcome from the plan:
- Is there code that implements it?
- Do tests cover it?
- Does it work as specified?

## Step 5: Write Results

Create `.opti-gsd/plans/phase-{NN}/verification.json`:

```json
{
  "phase": {N},
  "timestamp": "{timestamp}",
  "status": "pass|partial|fail",
  "ci": {
    "lint": {"status": "pass|fail", "output": "..."},
    "typecheck": {"status": "pass|fail", "output": "..."},
    "test": {"status": "pass|fail", "output": "..."},
    "build": {"status": "pass|fail", "output": "..."},
    "e2e": {"status": "pass|fail|skip", "output": "..."}
  },
  "tasks": {
    "01": {"status": "pass|fail", "checks": [...]},
    "02": {"status": "pass|fail", "checks": [...]}
  },
  "requirements": {
    "covered": ["..."],
    "gaps": ["..."]
  }
}
```

## Step 6: Present Results

```
Phase {N} Verification
══════════════════════════════════════════════════════════════

CI Checks:
  ✓ Lint
  ✓ Typecheck
  ✓ Tests (42 passed)
  ✓ Build

Task Verification:
  ✓ Task 01: All checks passed
  ✓ Task 02: All checks passed
  ✗ Task 03: E2E check failed — {reason}

Requirements:
  ✓ {outcome 1}
  ✓ {outcome 2}
  ✗ {outcome 3} — gap identified

──────────────────────────────────────────────────────────────
Overall: PARTIAL (1 gap found)
```

**If all pass:**
```
✓ Phase {N} Verified
→ /opti-gsd:plan       — Plan next phase
→ /opti-gsd:complete   — Complete milestone (if last phase)
```

Update state.json: `"status": "verified"`, move phase to `phases.complete`.

**If gaps found:**
```
⚠️ Gaps Found
→ /opti-gsd:plan --gaps  — Plan targeted fixes
→ /opti-gsd:review       — Review and fix manually
```

## Step 7: Commit

```bash
git add .opti-gsd/plans/phase-{NN}/verification.json .opti-gsd/state.json
git commit -m "docs: verify phase {N} — {status}

- CI: {pass_count}/{total_count} passed
- Tasks: {task_pass}/{task_total} verified
- Gaps: {gap_count}"
```
