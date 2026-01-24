#!/bin/bash
# Track subagent lifecycle for opti-gsd
# Called by SubagentStart and SubagentStop hooks

EVENT_TYPE="$1"  # "start" or "stop"
AGENT_ID="$2"
AGENT_TYPE="$3"

# Only track opti-gsd-executor subagents
if [[ "$AGENT_TYPE" != "opti-gsd-executor" ]]; then
  exit 0
fi

STATE_FILE=".gsd/STATE.md"

if [[ ! -f "$STATE_FILE" ]]; then
  exit 0
fi

case "$EVENT_TYPE" in
  "start")
    # Log that a task started (optional, for debugging)
    echo "# Subagent started: $AGENT_ID ($AGENT_TYPE) at $(date -Iseconds)" >> .gsd/logs/subagents.log 2>/dev/null || true
    ;;
  "stop")
    # Log completion
    echo "# Subagent stopped: $AGENT_ID ($AGENT_TYPE) at $(date -Iseconds)" >> .gsd/logs/subagents.log 2>/dev/null || true
    ;;
esac

exit 0
