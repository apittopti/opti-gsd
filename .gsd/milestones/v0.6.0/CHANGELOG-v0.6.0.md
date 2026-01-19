# Changelog: v0.6.0

## Summary

Add self-referential loop mechanism for resilient execution and verification. Inspired by the Ralph Wiggum pattern, loops are now the DEFAULT behavior - execute automatically retries failed tasks, and verify automatically fixes gaps and re-verifies.

## Features

### Loop Mechanism (Phase 1)
- **Execute Loop**: Automatically retries failed tasks up to 3 times with error context
- **Verify Loop**: Automatically fixes gaps and re-verifies up to 20 iterations
- **Stop Hook**: Intercepts session exit when loop is active, re-injects prompt to continue
- **Mode-Controlled**: Interactive mode prompts before retry/fix, yolo mode auto-loops
- **Cross-Platform**: Works on Windows (Git Bash) and Unix systems

## Components Added

### New Files
- `hooks/hooks.json` - Stop hook configuration for Claude Code
- `hooks/stop-hook.sh` - Cross-platform stop hook script (56 lines)

### Modified Commands
- `commands/execute.md` - Added Step 7a: Execute Loop with automatic task retry
- `commands/verify.md` - Added Step 7a: Verify Loop with gap-to-task generation

### Configuration
- `.gsd/config.md` - Added loop settings section:
  - `execute_max_retries: 3`
  - `verify_max_iterations: 20`
  - `auto_loop: true`
- `.gsd/STATE.md` - Added loop state tracking schema (13 fields)

## Technical Details

### Stop Hook Flow
1. Session attempts to exit
2. `stop-hook.sh` reads loop state from STATE.md
3. If loop active and not complete: returns `{"decision": "block", "prompt": "..."}`
4. If loop complete or not active: returns `{"decision": "allow"}`

### Gap-to-Task Generation
| Gap Type | Fix Strategy |
|----------|--------------|
| orphan | Add import + usage to parent |
| broken_link | Fix path/typo in reference |
| stub | Implement real functionality |
| missing_export | Add export statement |
| wrong_import | Correct import path |
| ci_failure | Apply specific fix for error |

## Commits

- c73ed64 feat(01-01): create hooks.json
- 53bce09 feat(01-02): create stop-hook.sh
- e34e39e feat(1-03): add loop settings to config
- b30c27e feat(1-04): add execute loop with retry
- 4c8027e feat(1-05): add verify loop with gap-to-task
- 36aba12 feat(1-06): initialize loop state in STATE.md
- a2cf154 docs(1-07): mark Phase 1 as COMPLETE
- 6a5bc6b docs: complete phase 1 - loop mechanism
- 73fbbc6 docs: verify phase 1 - passed
