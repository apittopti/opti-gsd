---
description: Push current branch to remote for CI and preview deployment
disable-model-invocation: true
allowed-tools: Read, Bash
---

# Push Branch

Push the current branch to the remote repository for CI checks and preview deployment.

## Step 1: Validate

1. Check current branch is not protected (`master`, `main`, `production`, `prod`)
2. Check for uncommitted changes — warn if present

## Step 2: Push

```bash
git push -u origin $(git branch --show-current)
```

## Step 3: Check Deployment

If `deployment.platform` is configured in `.opti-gsd/config.json`:

```
Branch pushed. Preview deployment:
  Platform: {platform}
  URL: {preview_url} (check platform dashboard)
```

If not configured:
```
Branch pushed.
→ Run /opti-gsd:verify to verify locally
→ Check CI status on your repository
```

## Step 4: Report

```
✓ Pushed to origin/{branch}
─────────────────────────────────────

→ /opti-gsd:verify    — Verify phase completion
→ /opti-gsd:complete  — Complete milestone (if all phases done)
```
