---
name: quick
description: Quick ad-hoc task — make a small change outside the normal plan/execute flow
disable-model-invocation: true
argument-hint: "<what to do>"
---

# Quick Task

Make a small, ad-hoc change outside the normal phase workflow. For quick fixes, small tweaks, or one-off tasks.

## When to Use

- Bug fixes that can't wait for a phase
- Small configuration changes
- Documentation updates
- One-liner code changes

## When NOT to Use

- Multi-file features → use `/opti-gsd:plan` + `/opti-gsd:execute`
- Complex changes → use the full workflow
- If you're not sure → use `/opti-gsd:add-feature` to capture it first

## Process

1. Check branch safety — block on protected branches

2. Do the requested work: `$ARGUMENTS`

3. Run relevant CI checks:
   ```bash
   {config.ci.lint}
   {config.ci.typecheck}
   {config.ci.test}
   ```

4. Commit:
   ```bash
   git add {changed_files}
   git commit -m "{type}: {description}"
   ```

5. Report what was done:
   ```
   ✓ Quick Task Complete
   ─────────────────────────────────────
   {what was changed}
   Files: {list}
   ```
