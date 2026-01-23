#!/usr/bin/env bash
# opti-gsd Stop Hook - Loop Continuation
# Cross-platform: Windows Git Bash + Unix
#
# PURPOSE:
# Prevents the main Claude session from exiting while work is incomplete.
# Used for phase-level execution and verify loops.
#
# NOT USED FOR:
# - TDD Red-Green-Refactor loops (those run INSIDE subagents as natural control flow)
# - Subagents don't need stop hooks - they simply run to completion and return
#
# WHEN THIS HOOK BLOCKS EXIT:
# - loop.active: true AND loop.type: execute → Ensures all tasks in phase complete
# - loop.active: true AND loop.type: verify → Ensures verify-fix cycle completes
#
# The TDD loop inside each task is handled by the executor subagent, not this hook.

set -e

STATE_FILE=".gsd/STATE.md"

# Default: allow exit
allow_exit() {
  echo '{"decision": "allow"}'
  exit 0
}

# Block exit and re-inject prompt
block_exit() {
  local prompt="$1"
  echo "{\"decision\": \"block\", \"prompt\": \"$prompt\"}"
  exit 0
}

# Check if STATE.md exists
if [[ ! -f "$STATE_FILE" ]]; then
  allow_exit
fi

# Parse loop state from STATE.md YAML frontmatter
loop_active=$(grep -A 20 "^loop:" "$STATE_FILE" 2>/dev/null | grep "active:" | head -1 | awk '{print $2}' || echo "false")
loop_type=$(grep -A 20 "^loop:" "$STATE_FILE" 2>/dev/null | grep "type:" | head -1 | awk '{print $2}' || echo "")
iteration=$(grep -A 20 "^loop:" "$STATE_FILE" 2>/dev/null | grep "iteration:" | head -1 | awk '{print $2}' || echo "0")
max_iterations=$(grep -A 20 "^loop:" "$STATE_FILE" 2>/dev/null | grep "max_iterations:" | head -1 | awk '{print $2}' || echo "20")
paused=$(grep -A 20 "^loop:" "$STATE_FILE" 2>/dev/null | grep "paused:" | head -1 | awk '{print $2}' || echo "false")

# If paused, allow exit
if [[ "$paused" == "true" ]]; then
  allow_exit
fi

# If no active loop, allow exit
if [[ "$loop_active" != "true" ]]; then
  allow_exit
fi

# Check if max iterations reached
if [[ "$iteration" -ge "$max_iterations" ]]; then
  allow_exit
fi

# Loop is active and not complete - block exit
if [[ "$loop_type" == "execute" ]]; then
  block_exit "Loop active. Continuing execute loop iteration $((iteration + 1))/$max_iterations. Run /opti-gsd:execute to retry failed tasks."
elif [[ "$loop_type" == "verify" ]]; then
  block_exit "Loop active. Continuing verify loop iteration $((iteration + 1))/$max_iterations. Run /opti-gsd:verify to fix gaps and re-verify."
else
  block_exit "Loop active. Run /opti-gsd:status to check state."
fi
