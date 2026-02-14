# Research: Claude Code Hooks Mastery — What Can We Adopt?

**Date:** 2026-02-14
**Source:** [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery)
**Blog:** [yuv.ai/blog/claude-code-hooks-mastery](https://yuv.ai/blog/claude-code-hooks-mastery)

---

## Executive Summary

The hooks-mastery repo implements **all 13 Claude Code lifecycle hooks** to add deterministic control layers around Claude's non-deterministic behavior. opti-gsd currently uses only **1 hook** (`PostToolUse` for tool-usage logging). There are several high-value patterns we can adopt to make our agentic workflow more robust, secure, and observable.

---

## What Hooks-Mastery Implements (All 13 Hooks)

| Hook | What It Does | Relevance to opti-gsd |
|---|---|---|
| `SessionStart` | Loads git status, project context, TODO files into session | **HIGH** — Could inject opti-gsd state/phase context |
| `SessionEnd` | Cleanup, session metrics | MEDIUM |
| `UserPromptSubmit` | Validates prompts, blocks dangerous patterns, stores last prompt | **HIGH** — Prompt guardrails for agentic workflows |
| `PreToolUse` | Blocks `rm -rf`, `.env` access, dangerous commands | **HIGH** — Security layer for executor agents |
| `PostToolUse` | Logs tool calls (we already do this) | Already implemented |
| `PostToolUseFailure` | Structured logging of tool failures | **HIGH** — Failure tracking for retry logic |
| `Stop` | AI-generated completion messages, transcript saving | LOW |
| `SubagentStart` | Logs when subagents spawn | **HIGH** — Wave execution monitoring |
| `SubagentStop` | Logs when subagents complete | **HIGH** — Wave execution monitoring |
| `PreCompact` | Backs up transcripts before context compaction | MEDIUM — Useful for debugging |
| `Notification` | TTS announcements | LOW — Nice-to-have |
| `PermissionRequest` | Auto-approves read-only ops, audits permission requests | MEDIUM |
| `Setup` | Repo initialization, periodic maintenance | LOW |

---

## Top Recommendations for opti-gsd

### 1. PreToolUse Security Hook (HIGH PRIORITY)

**What it does:** Intercepts every tool call before execution and blocks dangerous patterns.

**Why we need it:** Our executor agents have `permissionMode: acceptEdits` and run with broad tool access. A PreToolUse hook adds a deterministic safety net that catches dangerous operations regardless of what the LLM decides.

**Implementation:**
- Block `rm -rf /`, `rm -rf ~`, `rm -rf .` patterns
- Prevent `.env` and credential file access
- Block `git push --force` to protected branches
- Log all blocked attempts for audit

**Hook config:**
```json
{
  "PreToolUse": [{
    "matcher": "",
    "hooks": [{
      "type": "command",
      "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/pre-tool-use-guard.js\""
    }]
  }]
}
```

**Exit code semantics:**
- `0` = Allow (stdout goes to transcript)
- `2` = Block (stderr fed back to Claude as error)

---

### 2. SubagentStart/SubagentStop Tracking Hooks (HIGH PRIORITY)

**What it does:** Logs when subagents spawn and complete, enabling real-time wave execution monitoring.

**Why we need it:** opti-gsd's execute skill spawns parallel subagents in waves. Currently, we have no visibility into subagent lifecycle. These hooks would:
- Track which tasks are running in parallel
- Measure per-task execution time
- Detect hung or failed subagents
- Build wave-level execution timelines

**Implementation:**
```json
{
  "SubagentStart": [{
    "matcher": "",
    "hooks": [{
      "type": "command",
      "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/log-subagent.js\" start"
    }]
  }],
  "SubagentStop": [{
    "matcher": "",
    "hooks": [{
      "type": "command",
      "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/log-subagent.js\" stop"
    }]
  }]
}
```

**Log structure:**
```json
{
  "subagents": [
    {
      "id": "abc123",
      "started": "2026-02-14T10:00:00Z",
      "stopped": "2026-02-14T10:02:30Z",
      "duration_ms": 150000,
      "phase": "01",
      "wave": 1,
      "task": "T01"
    }
  ]
}
```

---

### 3. PostToolUseFailure Logging (HIGH PRIORITY)

**What it does:** Captures structured data when tool executions fail.

**Why we need it:** Our executor agents retry up to 3 times on failure. Currently, failure details are lost in the conversation context. A PostToolUseFailure hook would:
- Persist failure details (tool name, error message, input)
- Enable post-execution failure analysis
- Feed into smarter retry logic (e.g., don't retry the same failing command)
- Track failure patterns across sessions

**Implementation:**
```json
{
  "PostToolUseFailure": [{
    "matcher": "*",
    "hooks": [{
      "type": "command",
      "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/log-tool-failure.js\" || true"
    }]
  }]
}
```

---

### 4. SessionStart Context Injection (HIGH PRIORITY)

**What it does:** Automatically loads project context when a session begins.

**Why we need it:** When users start a new session, Claude has no awareness of opti-gsd's current state (active milestone, in-progress phase, pending tasks). A SessionStart hook could:
- Print current state from `state.json` to stdout (injected into Claude's context)
- Show the active roadmap milestone
- Display in-progress phase and wave status
- Surface any pending issues or failed verifications

**Implementation:**
```json
{
  "SessionStart": [{
    "matcher": "",
    "hooks": [{
      "type": "command",
      "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/session-context.js\""
    }]
  }]
}
```

The script reads `.opti-gsd/state.json` and prints a concise status summary to stdout, which Claude sees as initial context.

---

### 5. Team-Based Validation Pattern (MEDIUM PRIORITY)

**What it does:** Separates builder and validator agents with different tool permissions.

**Why we should adapt it:** Hooks-mastery uses a Builder (full access) + Validator (read-only) pattern. We already have executor + verifier agents, but our verifier has `Write` access and `permissionMode: acceptEdits`. We could tighten this:

**Current state:**
- `executor.md` — tools: Read, Glob, Grep, Bash, Write, Edit, WebFetch (correct)
- `verifier.md` — tools: Read, Glob, Grep, Bash, **Write** (should be read-only)

**Recommendation:** Remove `Write` from verifier and set `permissionMode: default`. The verifier should inspect and report, never modify code. It currently writes `verification.json` — this could be output via stdout instead, with the orchestrator writing the file.

---

### 6. PreCompact Transcript Backup (MEDIUM PRIORITY)

**What it does:** Saves a copy of the conversation transcript before Claude's automatic context compaction.

**Why it's useful:** During long execute phases, context compaction can lose important details. Backing up transcripts enables:
- Post-mortem debugging of failed phases
- Tracking how much context was available when decisions were made
- Session replay for understanding what happened

---

### 7. Structured JSON Event Logging (MEDIUM PRIORITY)

**What it does:** Every hook writes structured JSON to a `logs/` directory.

**Why it's useful:** Hooks-mastery has a unified logging approach: every lifecycle event produces a JSON log entry. We could consolidate our logging:
- `tool-usage.json` — tool calls (existing)
- `subagent-events.json` — subagent lifecycle (new)
- `tool-failures.json` — failed tool calls (new)
- `security-blocks.json` — blocked dangerous operations (new)
- `session-events.json` — session start/end (new)

This creates a comprehensive audit trail for any opti-gsd session.

---

## Architecture Comparison

| Aspect | hooks-mastery | opti-gsd |
|---|---|---|
| Hook coverage | 13/13 hooks | 1/13 hooks |
| Security filtering | PreToolUse blocks dangerous cmds | None |
| Subagent tracking | SubagentStart/Stop logging | None |
| Failure tracking | PostToolUseFailure logging | None |
| Context injection | SessionStart loads git/project state | Manual via /status skill |
| Team separation | Builder (write) + Validator (read-only) | Executor (write) + Verifier (also write) |
| Prompt validation | UserPromptSubmit with blocked patterns | None |
| Transcript backup | PreCompact backup before compaction | None |
| Logging format | Structured JSON per event type | Single tool-usage.json |
| Script runtime | Python via uv (inline deps) | Node.js |

---

## Implementation Priority Matrix

| Priority | Hook/Pattern | Effort | Impact |
|---|---|---|---|
| P0 | PreToolUse security guard | Low | High — prevents destructive operations |
| P0 | SubagentStart/Stop tracking | Low | High — wave execution visibility |
| P0 | SessionStart context injection | Low | High — immediate state awareness |
| P1 | PostToolUseFailure logging | Low | Medium — failure analysis |
| P1 | Verifier read-only enforcement | Low | Medium — separation of concerns |
| P2 | PreCompact transcript backup | Low | Medium — debugging aid |
| P2 | Unified structured logging | Medium | Medium — comprehensive audit trail |
| P3 | UserPromptSubmit validation | Low | Low — prompt guardrails |
| P3 | PermissionRequest auto-approve | Low | Low — reduces permission prompts |

---

## Key Design Principles to Adopt

1. **Exit code semantics are the control mechanism** — Exit 0 = allow, Exit 2 = block with feedback. This is how hooks control Claude deterministically.

2. **Stdout = context injection** — Anything printed to stdout by a hook is visible to Claude. Use this for SessionStart context loading.

3. **Stderr on exit 2 = error feedback** — When blocking, stderr content is fed back to Claude so it can adjust its behavior.

4. **Always fail safe** — Hook scripts should `|| true` or catch all exceptions. A crashing hook should never break the workflow.

5. **Keep hooks fast** — Hooks run synchronously. Keep them under 1-2 seconds to avoid degrading the user experience.

6. **Log everything, block selectively** — Most hooks should log-only. Only PreToolUse and UserPromptSubmit should ever block (exit 2).

---

## Next Steps

1. Implement P0 hooks (security guard, subagent tracking, session context)
2. Add structured logging infrastructure
3. Tighten verifier agent permissions
4. Add P1/P2 hooks incrementally
5. Build analytics dashboard from collected logs
