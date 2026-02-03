---
name: review
description: Review phase execution results — AI-powered code review with plan-aware feedback
disable-model-invocation: true
context: fork
agent: reviewer
allowed-tools: Read, Glob, Grep, Bash, Write, Edit
argument-hint: "[phase-number]"
---

# Review Phase Results

Review the executed phase with plan-aware code review. Provides categorized feedback and targeted fixes.

## Step 0: Validate

1. Check `.opti-gsd/` exists
2. Determine phase (from argument or state.json)
3. Verify phase has been executed (summary.md exists)

If not executed:
```
⚠️ Phase Not Executed
─────────────────────────────────────
Phase {N} has not been executed yet.
→ Run /opti-gsd:execute to execute the phase first.
```

## Step 1: Load Context

Read:
- `.opti-gsd/plans/phase-{NN}/plan.json` — what was supposed to happen
- `.opti-gsd/plans/phase-{NN}/summary.md` — what actually happened
- `.opti-gsd/config.json` — CI commands, project type

Get the diff since phase start:
```bash
git diff gsd/checkpoint/phase-{NN}/pre..HEAD --stat
git diff gsd/checkpoint/phase-{NN}/pre..HEAD
```

## Step 2: Review Changes

For each task in the plan:

1. **Check completeness** — were all files created/modified as planned?
2. **Check correctness** — does the implementation match the plan's action?
3. **Check quality** — code style, patterns, potential bugs
4. **Check tests** — do verification steps pass?

Run CI commands if available:
```bash
{config.ci.lint}
{config.ci.typecheck}
{config.ci.test}
```

## Step 3: Categorize Feedback

Sort findings into categories:

```
Phase {N} Review
══════════════════════════════════════════════════════════════

✓ Plan Compliance: {X}/{total} tasks fully implemented

Issues Found:
─────────────────────────────────────────────────────────────

🔴 Must Fix (blocks verification):
  1. {description} — {file}:{line}
  2. {description} — {file}:{line}

🟡 Should Fix (quality concerns):
  1. {description} — {file}:{line}

🟢 Nice to Have:
  1. {description}

⚠️ Out of Scope (defer to future phase):
  1. {description} — belongs in Phase {M}
─────────────────────────────────────────────────────────────
```

## Step 4: Handle User Response

After presenting review:

**If user says "looks good" or approves:**
```
✓ Review Approved
─────────────────────────────────────
→ /opti-gsd:verify    — Run automated verification
→ /opti-gsd:push      — Push for CI/preview
```

Update state.json: `"status": "reviewed"`

**If user gives feedback or says "fix":**
Apply targeted fixes for the identified issues:
1. Fix must-fix items
2. Fix should-fix items if user agrees
3. Commit fixes:
   ```bash
   git add {changed_files}
   git commit -m "fix(phase-{NN}-R{round}): {summary}

   - {fix 1}
   - {fix 2}"
   ```
4. Re-review the fixes
5. Present updated review

**If user requests specific changes:**
Apply the requested changes, commit, and re-review.

## Step 5: Update State

After review is approved:
```json
{
  "status": "reviewed",
  "last_active": "{timestamp}"
}
```
