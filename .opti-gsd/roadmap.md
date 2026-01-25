# Roadmap: v2.1.0 - Tool Usage Observability

**Milestone:** v2.1.0
**Goal:** Add visibility into which tools (especially MCP tools) subagents use during workflow execution

## Success Criteria

- [x] Tool calls are logged with timestamps during execution
- [x] Logs attribute tool calls to specific tasks (T01, T02, etc.)
- [x] User can view tool usage summary via command
- [x] Session grouping allows analysis by phase/wave

---

## Phase 1: Core Logging Infrastructure [COMPLETE]

**Goal:** Capture tool calls to a structured log file

**Deliverables:**
- F001: PostToolUse hook that logs tool calls
- F001: Log file structure (.opti-gsd/tool-usage.json)
- F001: Task context injection for attribution

**Success Criteria:**
- [x] Hook fires on every tool call
- [x] Log entries include: tool name, timestamp, task ID (if in execution context)
- [x] Log persists across sessions

---

## Phase 2: Usage Reporting [COMPLETE]

**Goal:** Let users view and analyze tool usage patterns

**Deliverables:**
- F001: `/opti-gsd:tools usage` command
- F001: Summary statistics (tool counts, MCP vs built-in, per-task breakdown)

**Success Criteria:**
- [x] Command displays readable summary
- [x] Can filter by phase, task, or tool type
- [x] Shows MCP tool discovery insights

---

## Phase 3: Executor Integration [COMPLETE]

**Goal:** Correlate tool usage with task outcomes

**Deliverables:**
- F001: Executor agent reports tools used in completion message
- F001: Summary includes tools per task in phase summary

**Success Criteria:**
- [x] Task completion messages include tool count
- [x] Phase summary shows which tools were used
