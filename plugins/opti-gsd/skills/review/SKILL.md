---
description: Review phase execution results — AI-powered code review with plan-aware feedback
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, Task, AskUserQuestion
argument-hint: "[phase-number]"
---

# Review Phase Results

Review the executed phase with plan-aware code review. Provides categorized feedback and targeted fixes.

**This skill runs in main context** for user interaction. Heavy review work (loading diffs, running CI, analyzing changes) is delegated to the `reviewer` subagent via the Task tool.

## Phase Number Normalization

**CRITICAL:** ALWAYS zero-pad phase numbers to 2 digits when building directory paths.
```bash
printf "phase-%02d" {N}
```

## Step 0: Validate (main context)

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

## Step 1: Spawn Reviewer Agent (via Task tool)

**CRITICAL: Use the `reviewer` custom agent** via the Task tool (`subagent_type: "reviewer"`).

The prompt for the reviewer MUST include:
- The phase number (already validated and zero-padded)
- The project root path

The reviewer agent will autonomously:
1. Load context (plan.json, summary.md, config.json)
2. Get the diff since phase start (`git diff gsd/checkpoint/phase-{NN}/pre..HEAD`)
3. Run CI commands (lint, typecheck, test)
4. Review each task for completeness, correctness, quality
5. Categorize findings into Must Fix / Should Fix / Nice to Have / Out of Scope
6. Return the full categorized review report

**The reviewer agent does NOT update state.json or prompt the user** — it only analyzes and reports back.

## Step 2: Present Review and Prompt User (main context)

After the reviewer agent completes, present its categorized findings:

```
Phase {N} Review
══════════════════════════════════════════════════════════════

✓ Plan Compliance: {X}/{total} tasks fully implemented

Issues Found:
─────────────────────────────────────────────────────────────

🔴 Must Fix (blocks verification):
  1. {description} — {file}:{line}

🟡 Should Fix (quality concerns):
  1. {description} — {file}:{line}

🟢 Nice to Have:
  1. {description}

⚠️ Out of Scope (defer to future phase):
  1. {description} — belongs in Phase {M}
─────────────────────────────────────────────────────────────
```

**Auto-fix and proceed:**

If there are **Must Fix** items:
- Automatically proceed to Step 3 to apply fixes — do NOT prompt the user.

If there are **no Must Fix** items (only Should Fix / Nice to Have / clean):
- Automatically proceed to Step 4 (approve and verify) — do NOT prompt the user.

Should Fix and Nice to Have items are logged in the review output but do NOT block the pipeline. They can be addressed later via `/opti-gsd:quick` if desired.

## Step 3: Apply Fixes via Reviewer Agent (if requested)

If user says "fix", spawn the `reviewer` agent again via Task tool with:
- The list of issues to fix (from Step 2 output)
- Instructions to apply fixes, commit, and re-run CI
- Commit message format: `fix(phase-{NN}-R{round}): {summary}`

After the fix agent completes, present updated review summary.

If Must Fix items remain after **2 fix rounds**, prompt the user with `AskUserQuestion` — something may need manual intervention. Otherwise, auto-proceed to Step 4.

## Step 4: Approve and Update State (main context)

Present:
```
✓ Review Complete
─────────────────────────────────────
→ Auto-proceeding to verification...
```

Update state.json: `"status": "reviewed"`

**Immediately proceed to the verify skill** — do NOT prompt the user or wait for input. Verification is the next automatic step in the pipeline.
