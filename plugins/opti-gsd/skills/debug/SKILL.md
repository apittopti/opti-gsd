---
description: Start a systematic debugging session — reproduce, isolate, fix, verify
disable-model-invocation: true
argument-hint: "[description of the bug]"
---

# Debug

Systematic debugging workflow: reproduce → isolate → fix → verify.

## Step 1: Understand the Bug

If `$ARGUMENTS` provided, use that as the bug description. Otherwise ask:
```
Describe the bug:
  - What's happening?
  - What should happen instead?
  - Steps to reproduce?
  - Any error messages?
```

## Step 2: Reproduce

Try to reproduce the issue:
1. Run the failing command or navigate to the failing state
2. Capture the exact error output
3. Identify the entry point (file and function)

If can't reproduce:
```
⚠️ Cannot reproduce the issue.
  - Is the error intermittent?
  - Are there specific conditions needed?
```

## Step 3: Isolate

Trace from the error to the root cause:
1. Read the stack trace or error location
2. Follow the call chain backward
3. Identify the specific line/condition causing the failure
4. Check recent git changes that might have introduced it:
   ```bash
   git log --oneline -10
   git diff HEAD~5..HEAD -- {relevant_files}
   ```

## Step 4: Fix

1. Write a failing test that reproduces the bug (if testable)
2. Apply the minimal fix
3. Run the test to confirm it passes
4. Run broader tests to check for regressions:
   ```bash
   {config.ci.test}
   ```

## Step 5: Commit

```bash
git add {changed_files}
git commit -m "fix: {brief description}

- Root cause: {explanation}
- Fix: {what was changed}"
```

## Step 6: Report

```
✓ Bug Fixed
─────────────────────────────────────
Root cause: {explanation}
Fix: {what was changed}
Files: {list}

→ Consider adding this to /opti-gsd:add-issue for tracking
```
