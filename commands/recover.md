---
description: Diagnose and fix interrupted execution states
---

# recover

Diagnose and fix interrupted or failed execution states.

## Behavior

1. **Scan Git state** — Check for uncommitted work, last checkpoint
2. **Compare to STATE.md** — Find inconsistencies
3. **Auto-fix what's safe** — Update STATE.md to match reality
4. **Report and suggest** — Show status and next action

## Output

```markdown
## Recovery Scan

**Git:**
- Last checkpoint: gsd/checkpoint/phase-2/T02
- Uncommitted changes: {yes/no}

**STATE.md:**
- Says: Phase 2, Task 3
- Reality: Tasks 1-2 committed, Task 3 incomplete

**Action taken:**
- Updated STATE.md to Phase 2, Task 3 (ready to continue)

**Next:**
→ `/opti-gsd:execute` — Continue from Task 3
```

## When STATE.md Ahead of Reality

If STATE.md claims more progress than commits show:

```markdown
**Warning:** STATE.md ahead of commits

STATE.md says Task 4 complete, but no commit found.

**Options:**
→ `/opti-gsd:rollback 2-03` — Rollback to last known good
→ Continue anyway (work may be lost)
```

## When Uncommitted Work Exists

```markdown
**Uncommitted changes found:**
- src/components/StatsCard.tsx

**Options:**
A) Commit as WIP: `git add . && git commit -m "wip: partial task"`
B) Discard: `git checkout .`
C) Stash: `git stash`

Then run `/opti-gsd:execute` to continue.
```
