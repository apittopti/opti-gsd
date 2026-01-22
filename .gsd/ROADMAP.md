# Roadmap: v0.8.3 [COMPLETE]

## Overview
Fix stop hook to use prompt-based approach instead of command-based.

## Milestone: v0.8.3 [COMPLETE]

### Phase 1: Convert Stop Hook to Prompt-Based [COMPLETE]
**Goal:** Make stop hook work reliably across all environments

**Problem:** Command-based stop hook fails because `$CLAUDE_PLUGIN_ROOT` environment variable isn't passed to bash subprocess.

**Solution:** Convert to prompt-based hook which lets Claude check STATE.md directly without external scripts.

**Files:**
- `hooks/hooks.json` - Convert from command to prompt type

**Acceptance Criteria:**
- [x] Stop hook no longer shows path errors
- [x] Loop continuation still works when loop.active is true
- [x] No external script dependencies
