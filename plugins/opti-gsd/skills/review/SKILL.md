---
description: Review phase execution results — AI-powered code review with plan-aware feedback
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, AskUserQuestion
argument-hint: "[phase-number]"
---

# Review Phase Results

Review the executed phase with plan-aware code review. Provides categorized feedback and targeted fixes.

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
   Review requires an executed phase.
   → Run /opti-gsd:execute first.
   ```
   **Allow if** status is `executed`, `reviewed` (re-review), or `verified`.
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

## Step 4: Prompt User for Decision

After presenting the categorized review, **you MUST use the `AskUserQuestion` tool** to ask the user what to do next. Do NOT end without prompting.

If there are **Must Fix** items:
```
AskUserQuestion: "There are {N} must-fix issues. Fix them now, or stop to investigate? (fix / quick fix / stop)"
```

If there are **no Must Fix** items (only Should Fix / Nice to Have / clean):
```
AskUserQuestion: "Review complete — no blockers found. What next? (verify / quick fix suggestions / stop)"
```

Options explained:
- **"verify"** — skip fixes, proceed to `/opti-gsd:verify`
- **"fix"** — apply fixes inline in this review session (for Must Fix items)
- **"quick fix"** — tell the user to run `/opti-gsd:quick {description}` for targeted Should Fix / Nice to Have items outside the review flow
- **"stop"** — end, user investigates manually

**Do NOT proceed until the user responds.** This is a hard gate.

**If user says "verify" or "approve" or "looks good":**
```
✓ Review Approved
─────────────────────────────────────
→ /opti-gsd:verify    — Run automated verification
→ /opti-gsd:push      — Push for CI/preview
```

Update state.json: `"status": "reviewed"`

**If user says "fix" or gives feedback:**
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
5. Present updated review and **ask again using AskUserQuestion**

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
