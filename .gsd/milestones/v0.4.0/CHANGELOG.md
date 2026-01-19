# Changelog: v0.4.0

## Summary
Verifier Checkpoint Protocol - Enables the verifier agent to survive context exhaustion by saving incremental progress after each verification stage.

## Features
- **Checkpoint Protocol**: Verifier now writes progress after each of 7 stages (CI-lint, CI-typecheck, CI-test, CI-build, Artifacts, Key-Links, E2E)
- **Resume Support**: New `--resume` flag allows verification to continue from last checkpoint
- **Atomic Writes**: Progress file uses temp-file-then-rename pattern to prevent corruption
- **Progress Tracking**: VERIFICATION-PROGRESS.md tracks incremental state with structured format

## Fixes
- Issue #001-verifier-checkpoint: Context exhaustion no longer loses verification progress

## Technical
- Added Checkpoint Protocol section to `agents/opti-gsd-verifier.md`
- Added Step 2.5 (Check for Resume) to `commands/verify.md`
- Pattern matches existing executor (STATE.md updates) and debugger (Context Survival) patterns
- 7-stage checkpoint sequence ensures atomic progress tracking

## Files Modified
- `agents/opti-gsd-verifier.md`
- `commands/verify.md`

## Commits
- `c22ff58` feat(01-01): add checkpoint protocol to verifier agent
- `a52c93b` feat(01-02): add --resume flag to verify command
- `798a279` feat(01-03): integrate progress file template
- `8593274` docs(01): phase execution summary
- `e3bec6d` docs: verify phase 1 - passed
