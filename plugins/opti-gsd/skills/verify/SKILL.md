---
description: Verify phase completion with automated CI checks, testing, and requirement validation
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash, Write, AskUserQuestion
argument-hint: "[phase-number]"
---

# Verify Phase

Run automated verification checks against the completed phase.

## Phase Number Normalization

**CRITICAL:** ALWAYS zero-pad phase numbers to 2 digits when building directory paths.
```bash
printf "phase-%02d" {N}
```

## Step 0: Validate

1. Check `.opti-gsd/` exists and `state.json` is readable
2. Determine phase (from argument or state.json)
3. Check state.json `status` — **block if** `status` is `"initialized"`, `"roadmap_created"`, or `"planned"`:
   ```
   ⚠️ Wrong Workflow Stage
   ─────────────────────────────────────
   Current status: {status}
   Verification requires an executed phase.
   → Run /opti-gsd:execute first.
   ```
   **Allow if** status is `executed`, `reviewed` (verify after review), or `verified` (re-verify).
4. Verify phase has been executed — check `.opti-gsd/plans/phase-{NN}/summary.md` exists

If summary.md missing:
```
⚠️ Phase Not Executed
─────────────────────────────────────
Phase {N} has no execution summary at .opti-gsd/plans/phase-{NN}/summary.md
→ Run /opti-gsd:execute to execute the phase first.
```

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

Record pass/fail for each. Skip commands that are null.

## Step 3: Run Task Verification

For each task in the plan, execute its `verify` checks (the `verify` array from plan.json):

- `type: "test"` — run the `cmd`, check exit code
- `type: "lint"` — run linter on specific files
- `type: "build"` — run build command

Record pass/fail for each check.

## Step 4: Requirement Coverage

Check each `must_haves` entry from plan.json:
- Is there code that implements it?
- Do tests cover it?
- Does it work as specified?

## Step 5: Write Results

Create `.opti-gsd/plans/phase-{NN}/verification.json`:

```json
{
  "version": "3.0",
  "phase": 2,
  "verified_at": "2026-02-01T14:00:00Z",
  "result": "pass",
  "checks": {
    "lint": { "status": "pass", "output": "" },
    "typecheck": { "status": "pass", "output": "" },
    "test": { "status": "pass", "output": "42 tests passed" },
    "build": { "status": "pass", "output": "" },
    "e2e": { "status": "skip", "reason": "not configured" }
  },
  "plan_compliance": {
    "total_tasks": 3,
    "verified": 3,
    "failed": 0,
    "details": [
      { "id": "01", "status": "pass", "note": "" },
      { "id": "02", "status": "pass", "note": "" },
      { "id": "03", "status": "pass", "note": "Fixed after review round 1" }
    ]
  },
  "issues": []
}
```

Field reference:
- `result`: `"pass"`, `"fail"`, or `"partial"`
- `checks.{name}.status`: `"pass"`, `"fail"`, or `"skip"`
- `plan_compliance.details[].status`: `"pass"` or `"fail"`
- `issues`: array of unresolved issue strings

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
  ✗ Task 03: Test check failed — {reason}

Requirements:
  ✓ {must_have 1}
  ✓ {must_have 2}
  ✗ {must_have 3} — gap identified

──────────────────────────────────────────────────────────────
Overall: PARTIAL (1 gap found)
```

After presenting results, **you MUST use the `AskUserQuestion` tool** to prompt the user for their decision. Do NOT end without asking.

**If all pass:**
```
✓ Phase {N} Verified
```

Update state.json: `"status": "verified"`, move phase to `phases.complete`.

**Call AskUserQuestion** with: `Phase {N} verified. What next? (plan next phase / complete milestone / stop)`

**If gaps found:**
**Call AskUserQuestion** with: `Verification found {N} gaps. Fix them now or investigate? (plan --gaps / review / stop)`

**Do NOT proceed until the user responds.**

## Step 7: Commit

```bash
git add .opti-gsd/plans/phase-{NN}/verification.json .opti-gsd/state.json
git commit -m "docs: verify phase {N} — {result}

- CI: {pass_count}/{total_count} passed
- Tasks: {verified}/{total_tasks} verified
- Issues: {issue_count}"
```
