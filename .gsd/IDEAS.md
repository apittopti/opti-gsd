# Ideas Backlog

Quick capture for ideas to explore later.

---

## Completed

### I001: Integrate Ralph Wiggum loop pattern into opti-gsd

- **Added:** 2026-01-19
- **Category:** feature
- **Priority:** low
- **Status:** completed (v0.6.0)

---

## Pending

### I003: Push before verify, PR before merge

- **Added:** 2026-01-19
- **Category:** feature
- **Priority:** high
- **Status:** pending

Change workflow to push working branch before verify (not after), and always create PR instead of auto-merging:

1. **execute** → Complete phase tasks
2. **push** → Push branch to trigger preview deployment (move from after verify to before)
3. **verify** → Test locally AND on preview deployment
4. **complete-milestone** → Create PR (remove auto-merge, even for solo workflow)

Benefits:
- Preview deployments available during verification
- PR provides checkpoint before merge (even solo)
- Paper trail of merges
- Matches how most teams actually work

Files to modify:
- `commands/verify.md` - Require/suggest push before verify if deploy configured
- `commands/complete-milestone.md` - Remove auto-merge path, always create PR

---

## Completed

### I002: Enforce milestone branching

- **Added:** 2026-01-19
- **Category:** feature
- **Priority:** medium
- **Status:** completed (v0.7.0)

Commands like plan-phase and execute should check if working on base branch when `branching: milestone` is configured, and either warn or auto-create the milestone branch. Prevents accidental commits directly to master/main.

---
