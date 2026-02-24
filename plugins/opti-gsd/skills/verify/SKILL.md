---
description: Verify phase completion with automated CI checks, testing, and requirement validation
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash, Write, Task, AskUserQuestion
argument-hint: "[phase-number]"
---

# Verify Phase

Run automated verification checks against the completed phase.

**This skill runs in main context** for user interaction. Heavy verification work (running CI, checking compliance, writing results) is delegated to the `verifier` subagent via the Task tool.

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

## Step 1: Spawn Verifier Agent (via Task tool)

**CRITICAL: Use the `verifier` custom agent** via the Task tool (`subagent_type: "verifier"`).

The prompt for the verifier MUST include:
- The phase number (already validated and zero-padded)
- The project root path

The verifier agent will autonomously:
1. Load context (plan.json, summary.md, config.json)
2. Run all CI commands (lint, typecheck, test, build, e2e)
3. Run per-task verification checks from plan.json
4. Check requirement coverage against `must_haves`
5. Write `.opti-gsd/plans/phase-{NN}/verification.json` with results
6. Commit verification results
7. Return the verification report (pass/fail/partial with details)

**The verifier agent does NOT update state.json status or prompt the user** — it only verifies and reports back.

## Step 2: Present Results and Prompt User (main context)

After the verifier agent completes, present its report:

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
Overall: {PASS|FAIL|PARTIAL}
```

**Use the `AskUserQuestion` tool** to prompt the user. Do NOT end without asking.

**If all pass:**

Update state.json: `"status": "verified"`, move phase to `phases.complete`.

**Call AskUserQuestion** with: `Phase {N} verified. What next? (plan next phase / complete milestone / stop)`

**If gaps found:**

Keep status as `executed` (or `reviewed` if it was).

**Call AskUserQuestion** with: `Verification found {N} gaps. Fix them now or investigate? (plan --gaps / review / stop)`

**Do NOT proceed until the user responds.**
