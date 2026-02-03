# Execute Command Review — Fresh Review (Revision 5)

**Date:** 2026-02-01
**Revision:** 5 — fresh review of current execute.md after fixes applied
**Reviewer:** Claude (automated review)

**Files Reviewed:**
- `commands/opti-gsd/execute.md` (855 lines) — orchestrator (post-fix state)
- `agents/opti-gsd/opti-gsd-executor.md` (597 lines) — subagent (post-fix state)
- `commands/opti-gsd/verify.md` (722 lines) — verification flow
- `commands/opti-gsd/rollback.md` (204 lines) — rollback flow
- `commands/opti-gsd/review.md` (314 lines) — standalone review
- `commands/opti-gsd/plan-phase.md` (351 lines) — planning
- `commands/opti-gsd/status.md` (305 lines) — status display
- `hooks/hooks.json` — tool usage hook
- `scripts/log-tool-usage.js` — tool logging
- `.opti-gsd/config.json`, `state.json`

---

## What Was Fixed (from previous review)

The following issues from revision 4 have been addressed in the current codebase:

- **Step 8/8b reorder** — Step 8 is now "Final User Review (MANDATORY)" and Step 8b is "Write Phase Metadata (after approval)." Correct ordering.
- **recover.md removed** — Recovery logic folded into execute.md Step 3b. Correct.
- **Per-task checkpoint tags added** — Step 5 point 3 now creates them. But see finding #1 below.
- **Double-commit fixed** — Step 7 no longer commits; executor owns commits. Correct.
- **ToolSearch removed** — Replaced with direct MCP calls across all agent files. Correct.
- **Redundant wave gate removed** — Step 5 point 2 no longer has the extra prompt. Correct.
- **Config references fixed** — Step 0 uses `branching.enabled`, Step 6 uses `Browser tool available` and `config.urls.local`. Correct.
- **Executor task tracking removed** — Executor no longer tries to call TaskCreate/TaskUpdate. Correct.
- **Yolo mode fixed** — Immediate continue, no timed wait. Correct.
- **Duplicate step numbering fixed** — Step 5b items properly numbered. Correct.
- **Context budget softened** — Now labeled "Guidelines." Correct.

---

## Summary

**11 new findings** (3 high, 5 medium, 3 low). These are issues in the CURRENT state of the code that the previous review either didn't catch or that were introduced by the fixes.

The most critical: per-task checkpoint tags are broken with parallel execution (they tag HEAD, not the task's specific commit), and Step 8 auto-triggers verification before summary.md is written in Step 8b.

---

## HIGH Severity (3)

### 1. Per-task checkpoint tags broken with parallel execution

Step 5 point 3 (line 242-243):
```
git tag -f "gsd/checkpoint/phase-{N}/T{task_id}" HEAD
```

This tags HEAD after TaskOutput returns. But when Wave 1 spawns T01, T02, T03 in parallel, all three executors commit independently. By the time the orchestrator processes results sequentially via TaskOutput, HEAD contains commits from ALL parallel tasks.

Result: `T01`, `T02`, `T03` tags all point to the same (or nearly the same) commit — the last one. Per-task rollback (`/opti-gsd:rollback 2-01`) would roll back to a point that still includes T02 and T03's changes.

**Impact:** Per-task rollback is functionally broken for parallel tasks. Only sequential (single-task-per-wave) rollback works correctly.
**Fix:** The executor already reports `Commit: {hash}` in its output. Parse the commit hash from the TaskOutput result and tag that specific commit:
```
git tag -f "gsd/checkpoint/phase-{N}/T{task_id}" {commit_hash_from_result}
```

### 2. Step 8 auto-triggers verification before summary.md exists

Step 8 (line 625-631):
```
After user approves (or says "verify"):
  Automatically trigger verification...
  Then execute the verification flow (spawn verifier agent, same as /opti-gsd:verify).
```

Step 8b (line 635-692) writes summary.md AFTER Step 8.

But verify.md Step 1 (line 104-111) has a prerequisite check:
```
If phase summary doesn't exist:
  ⚠️ Phase Not Executed
  → Run /opti-gsd:execute to execute the phase first
```

The verifier will see no summary.md and refuse to run, telling the user to run execute — which they just did.

**Impact:** Auto-verification from Step 8 always fails its prerequisite check.
**Fix:** Either write summary.md before triggering verification (move the summary write from Step 8b to before the verify trigger in Step 8), or have the inline verification skip the summary prerequisite when called from within execute.

### 3. state.json `phases` structure conflict between execute and verify

Execute Step 8b (line 669-678) writes:
```json
{
  "phases": {
    "complete": ["...", "{N}"],
    "in_progress": [],
    "pending": ["{N+1}", "..."]
  }
}
```

Verify Step 7d (verify.md line 688-701) writes:
```json
{
  "phases": {
    "{N}": {
      "status": "verified",
      "review": { "rounds": 2, ... }
    }
  }
}
```

These are incompatible structures for the same `phases` key. The actual state.json uses the array format (`complete`/`in_progress`/`pending`). If verify writes its object format, it overwrites the arrays. If it merges, the shape is inconsistent — some phases are in arrays, one is a nested object.

Status.md, plan-phase.md, and execute.md all read the array format. Verify's write would break all of them.

**Impact:** Running verify corrupts state.json for all other commands.
**Fix:** Verify should store review metadata in a separate key (e.g., `phases_meta.{N}`) or extend the array format with a companion object. The `phases` key must remain array-based.

---

## MEDIUM Severity (5)

### 4. Deploy config field name mismatch across files

Execute Step 9 (line 698) and verify Step 0 (line 44) both reference `deploy.target`:
```
If `deploy.target` is set (vercel, netlify, etc.)
```

But config.json has:
```json
"deployment": {
  "platform": null,
  "preview_url": null
}
```

The field is `deployment.platform`, not `deploy.target`. Every deploy check in execute.md and verify.md uses the wrong key path.

**Fix:** Change `deploy.target` to `deployment.platform` in execute.md Step 9 and verify.md Step 0.

### 5. plan-phase.md and discuss-phase.md still use old `branching: milestone` check

Execute.md Step 0 was fixed to use `branching.enabled`, but:
- `plan-phase.md` line 54: `If branching: milestone is configured`
- `discuss-phase.md` lines 21, 36: `branching: milestone`

These still reference the old format. Since the actual config uses `branching.enabled: true`, these commands would never detect that branching is configured.

**Impact:** plan-phase and discuss-phase skip milestone branch enforcement even when branching is enabled.
**Fix:** Update both files to use `branching.enabled` like execute.md does.

### 6. Tool usage per-task attribution unreliable during parallel execution

`log-tool-usage.js` (lines 50-60) determines the current task by:
1. Checking `state.json` for `loop.current_task`
2. Falling back to `background_tasks` — but only if exactly 1 task is running

During parallel execution, multiple tasks run simultaneously. The fallback requires `running.length === 1`, which fails with parallel waves. Tool calls from parallel subagents all get logged without task attribution (or with wrong attribution).

The executor's "Tools Used" reporting (reading tool-usage.json filtered by task) will show incomplete or no data for parallel tasks.

**Impact:** Tool usage analytics are inaccurate for any wave with 2+ parallel tasks.
**Fix:** The hook receives tool calls from subagent processes. Each subagent could set an environment variable with its task ID, and the hook could read it. Or accept that per-task attribution only works for sequential waves.

### 7. Step 10 suggests manual verify when Step 8 already auto-ran it

Step 8 (line 625-631) auto-triggers verification after user approval.
Step 10 (line 745) then suggests:
```
→ /opti-gsd:verify {N}       — Then verify (automated checks + preview testing)
```

If verification already ran in Step 8, this is confusing — the user would think they still need to verify.

**Fix:** Step 10 should adapt based on whether verification ran. If it did, show verification results instead of suggesting the command. If user said "looks good" (skipping verify), then the suggestion makes sense.

### 8. verify.md has duplicate "Step 3" numbering

verify.md has:
- Step 3: Run CI Commands (line 156)
- Step 3b: Code Intelligence Diagnostics (line 205)
- Step 3c: Debt Balance Check (line 254)
- Step 3: Run E2E Tests (line 320)

Two sections are both labeled "Step 3." The E2E section should be Step 3d or Step 4.

---

## LOW Severity (3)

### 9. Config.json missing `loop` and `urls` sections referenced by execute

Step 6 prompt references `config.loop.tdd_max_attempts` (line 395) and `config.urls.local` (line 447). Config.json has neither `loop` nor `urls` sections. Both have fallback defaults (`|| 5` and `|| 'http://localhost:3000'`), so execution isn't blocked, but the config schema is incomplete.

Step 7a (lines 531-539) shows `loop` should exist in config:
```json
{ "loop": { "tdd_max_attempts": 5, "execute_max_retries": 2 } }
```

**Fix:** Add `loop` and `urls` sections to config.json with their defaults, or document them as optional config additions.

### 10. Recovery commit pattern matching fragile with review fix commits

Step 3b recovery (line 131) counts commits matching `{type}({phase}-T{N}):`. But Step 5b review fixes use format `fix({phase}-R{round}):`. These also match the phase pattern but not the task pattern. If recovery logic does a simple `grep` for the phase number in commit messages, it could miscount by including review fix commits.

**Fix:** Be explicit that recovery counts only commits matching `*({phase}-T*):` pattern, excluding `*({phase}-R*):` review fix commits.

### 11. Step 3b recovery offers "Discard and continue" for uncommitted work

Step 3b (line 147) offers to discard uncommitted changes. If a subagent crashed mid-task, these changes might be partially-complete work worth keeping. "Discard" is the most destructive option but presented alongside "commit" and "stash" without warning.

**Fix:** Add a warning to the discard option: `→ Discard and continue (WARNING: changes will be lost)`

---

## Previously Fixed Issues (Confirmed Resolved)

These findings from revision 4 have been properly addressed:

| # | Finding | Status |
|---|---------|--------|
| ~~1~~ | TaskCreate/TaskUpdate/TaskOutput retracted | Retracted (tools are real) |
| 2 | Step 8/8b ordering | **Fixed** |
| 3 | Per-task tags missing | **Fixed** (but see new #1) |
| 4 | recover.md misplaced | **Fixed** (removed) |
| 5 | Parallel git conflicts | **Open** (not addressed) |
| 6 | Double-commit | **Fixed** |
| 7 | Config structure mismatch | **Partially fixed** (execute fixed, plan-phase/discuss-phase not) |
| 8 | Redundant wave gate | **Fixed** |
| ~~9~~ | Synchronous polling retracted | Retracted (TaskOutput is correct) |
| 10 | Non-existent config fields | **Fixed** |
| 11 | Duplicate task tracking | **Fixed** |
| 12 | ToolSearch | **Fixed** |
| 13 | Yolo mode | **Fixed** |
| 14 | Duplicate step numbering | **Fixed** |
| 15 | Wave mapping in resume | **Fixed** |
| 16 | Missing loop config | **Open** (config still lacks section) |
| 17 | Token/Duration reporting | **Fixed** (Duration removed) |
| 18 | Co-Authored-By inconsistency | **Open** (not addressed) |
| 19 | Failed tasks "completed" | **Fixed** (executor no longer manages tasks) |
| 20 | Conditional Browser comment | **Fixed** |
| 21 | Context budget language | **Fixed** |

---

## Strengths

1. **Step 8/8b ordering is now correct** — User review happens before metadata is committed. Data integrity preserved.
2. **Wave-based parallelism** — Sound dependency management with intra-wave parallelism.
3. **Two-layer architecture** — Persistent plan.json + ephemeral Claude Code Tasks. Clean separation.
4. **Protected branch enforcement** — Defense in depth at orchestrator and executor level.
5. **Review checkpoints** — Plan-aware feedback that detects future-phase requests. Well-designed.
6. **TDD Red-Green-Refactor** — File permission locking prevents test manipulation.
7. **Step 3b recovery** — Git-reality-based recovery is the right approach (replacing session-scoped task IDs).
8. **Error Learning System** — Institutional memory from failures. Good feedback loop.
9. **Clear single ownership** — Executor owns commits, orchestrator owns task tracking. No overlap.

---

## Recommendations (Priority Order)

1. **Fix per-task tags for parallel execution** — Parse commit hash from executor's TaskOutput result. Tag the specific commit, not HEAD.
2. **Fix verification prerequisite conflict** — Write summary.md before triggering auto-verification in Step 8, or adjust verify to accept inline calls without summary.md.
3. **Unify state.json `phases` structure** — Choose one format (arrays). Move verify's review metadata to a separate key.
4. **Fix deploy config references** — `deploy.target` → `deployment.platform` in execute.md and verify.md.
5. **Fix branching check in plan-phase/discuss-phase** — `branching: milestone` → `branching.enabled`.
6. **Address parallel git conflicts** — Planner should validate that parallel tasks don't share writable files.
7. **Fix verify.md duplicate Step 3** — Renumber E2E tests section.
8. **Adapt Step 10 based on verification state** — Don't suggest verify if it already ran.
9. **Add missing config sections** — `loop` and `urls` defaults in config.json.
10. **Fix tool usage attribution** — Accept limitation for parallel waves, or pass task ID via environment.
