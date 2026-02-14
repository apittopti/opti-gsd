# opti-gsd Platform Integration Plan

**Date:** 2026-02-14
**Scope:** Integrate Claude Code Tasks API, Hooks, and Agent Teams into opti-gsd
**Approach:** 4 phases, each independently shippable

---

## Current State

- **Tasks API:** Not used. F002 (v2.2.0) added TaskCreate/TaskUpdate to executor agent, then retracted in architecture-v3 review based on incorrect belief they were "swarm-only." They're now generally available (v2.1.16+). The execute skill and executor agent have zero TaskCreate/TaskUpdate calls.
- **Hooks:** 1 of 13 implemented (`PostToolUse` for analytics logging). No security guards, no subagent monitoring, no context injection, no verification gates.
- **Agent Teams:** Not used. Execute skill spawns subagents via `Task` tool. No peer-to-peer communication, no shared task list, no delegate mode.
- **Agent Permissions:** All 5 agents have Write access and use `acceptEdits`. Verifier and researcher should be read-only. No model tiering.

---

## Phase 1: Tasks API Integration

**Goal:** Re-land TaskCreate/TaskUpdate in the execute skill so users see real-time visual progress in their terminal (Ctrl+T).

**Why first:** Immediate UX improvement, low risk, no architectural changes. The hybrid approach (plan.json stays source of truth, Tasks API is the visual/coordination layer) was already validated as the right design in F002.

### Changes

#### 1a. Execute Skill — Add Step 4b: Create Claude Code Tasks

**File:** `plugins/opti-gsd/skills/execute/SKILL.md`

Insert new step between Step 4 (Pre-Execution Checkpoint) and Step 5 (Wave Execution):

```
## Step 4b: Initialize Task Tracking

Create Claude Code Tasks from plan.json for visual progress:

For each task in plan.json (all waves):
  TaskCreate({
    subject: "T{id}: {title}",
    description: "{action}",
    status: "pending",
    blockedBy: [{task_ids_from_earlier_waves}]
  })

Store the returned task IDs (map: plan_task_id → claude_task_id).

Note: plan.json remains the source of truth. Claude Code Tasks are an
ephemeral visual layer for terminal progress display.
```

**Dependency mapping:** Tasks in Wave 1 have no `blockedBy`. Tasks in Wave 2+ get `blockedBy` set to all task IDs from the previous wave. This gives the Tasks system the same DAG structure as opti-gsd's wave model.

#### 1b. Execute Skill — Add TaskUpdate calls to Step 5

**File:** `plugins/opti-gsd/skills/execute/SKILL.md`

In Step 5b (Spawn Executor Agents), before spawning each task:
```
TaskUpdate({ taskId: {claude_task_id}, status: "in_progress" })
```

In Step 5c (Collect Results), after parsing commit hash:
```
TaskUpdate({ taskId: {claude_task_id}, status: "completed" })
```

In Step 5e (Handle Failures), on task failure:
```
TaskUpdate({ taskId: {claude_task_id}, status: "pending" })  // reset for retry
```

#### 1c. Execute Skill — Add allowed tool

**File:** `plugins/opti-gsd/skills/execute/SKILL.md`

Add `TaskCreate`, `TaskUpdate` to the `allowed-tools` frontmatter:
```yaml
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, Task, TaskCreate, TaskUpdate
```

#### 1d. Cross-Session Support (Optional)

**File:** `plugins/opti-gsd/skills/execute/SKILL.md`

Add note in Step 4b:
```
If CLAUDE_CODE_TASK_LIST_ID is set, tasks will be visible across sessions.
Consider setting it to "phase-{NN}" for multi-session visibility.
```

This is documentation-only — the feature works automatically when the env var is set.

### Files Modified
- `plugins/opti-gsd/skills/execute/SKILL.md` — Steps 4b, 5b, 5c, 5e, frontmatter

### Verification
- Execute a test phase and confirm tasks appear in terminal (Ctrl+T)
- Confirm tasks show pending → in_progress → completed transitions
- Confirm wave 2 tasks stay blocked until wave 1 completes

---

## Phase 2: Hooks Infrastructure

**Goal:** Add security guards, execution monitoring, context injection, and verification gates using Claude Code hooks.

**Why second:** Hooks are deterministic (no LLM calls, no token cost) and add safety/observability that benefits all subsequent work.

### Changes

#### 2a. PreToolUse Security Guard

**File:** `plugins/opti-gsd/hooks/hooks.json`

Add `PreToolUse` hook with matcher for `Bash`:
```json
{
  "matcher": "Bash",
  "hooks": [{
    "type": "command",
    "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/security-guard.js\" || true"
  }]
}
```

**File (new):** `plugins/opti-gsd/scripts/security-guard.js`

Reads `$CLAUDE_HOOK_EVENT` (JSON with tool input). Blocks (exit 2) on:
- `rm -rf /` or `rm -rf ~` or similar destructive patterns
- `git push --force` to protected branches (master, main, production, prod)
- `git reset --hard` without explicit user context
- Access to `.env`, credentials files, secrets
- `chmod 777` on sensitive directories

Allows (exit 0) everything else. Stderr on exit 2 explains why blocked.

#### 2b. SessionStart Context Injection

**File:** `plugins/opti-gsd/hooks/hooks.json`

Add `SessionStart` hook:
```json
{
  "matcher": "*",
  "hooks": [{
    "type": "command",
    "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/session-context.js\" || true"
  }]
}
```

**File (new):** `plugins/opti-gsd/scripts/session-context.js`

On session start, reads `.opti-gsd/state.json` and outputs to stdout (injected into Claude's context):
```
[opti-gsd] Milestone: v2.5.0 | Phase: 3 | Status: planned
[opti-gsd] Branch: gsd/v2.5.0 | Mode: interactive
[opti-gsd] Next action: /opti-gsd:execute
```

This gives Claude immediate awareness of project state without the user having to run `/opti-gsd:status`.

#### 2c. SubagentStart/SubagentStop Monitoring

**File:** `plugins/opti-gsd/hooks/hooks.json`

Add hooks for subagent lifecycle:
```json
{
  "SubagentStart": [{
    "matcher": "opti-gsd-executor",
    "hooks": [{
      "type": "command",
      "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/subagent-monitor.js\" start || true"
    }]
  }],
  "SubagentStop": [{
    "matcher": "opti-gsd-executor",
    "hooks": [{
      "type": "command",
      "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/subagent-monitor.js\" stop || true"
    }]
  }]
}
```

**File (new):** `plugins/opti-gsd/scripts/subagent-monitor.js`

Logs structured JSON events to `.opti-gsd/logs/execution.jsonl`:
```json
{"event":"subagent_start","agent":"opti-gsd-executor","task":"T01","timestamp":"..."}
{"event":"subagent_stop","agent":"opti-gsd-executor","task":"T01","duration_ms":45000,"timestamp":"..."}
```

Provides execution timeline for debugging and performance analysis.

#### 2d. TaskCompleted Verification Gate

**File:** `plugins/opti-gsd/hooks/hooks.json`

Add `TaskCompleted` hook:
```json
{
  "TaskCompleted": [{
    "matcher": "*",
    "hooks": [{
      "type": "command",
      "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/task-verify-gate.js\" || true"
    }]
  }]
}
```

**File (new):** `plugins/opti-gsd/scripts/task-verify-gate.js`

When a Claude Code Task is marked complete, runs lightweight verification:
- Check that the commit hash exists in git log
- Check that listed files were actually modified
- If checks fail: exit 2 with feedback (blocks task completion)
- If checks pass: exit 0

This is the platform-native equivalent of opti-gsd's verify step, applied at the individual task level.

#### 2e. PostToolUseFailure Logging

**File:** `plugins/opti-gsd/hooks/hooks.json`

Add `PostToolUse` hook for failures (expand existing matcher):
```json
{
  "matcher": "*",
  "hooks": [{
    "type": "command",
    "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/failure-logger.js\" || true"
  }]
}
```

**File (new):** `plugins/opti-gsd/scripts/failure-logger.js`

Reads `$CLAUDE_HOOK_EVENT`, checks if tool result indicates failure. Logs to `.opti-gsd/logs/failures.jsonl`:
```json
{"tool":"Bash","command":"npm test","error":"Exit code 1","timestamp":"..."}
```

### Files Modified
- `plugins/opti-gsd/hooks/hooks.json` — Add 5 new hook entries
- **New:** `plugins/opti-gsd/scripts/security-guard.js`
- **New:** `plugins/opti-gsd/scripts/session-context.js`
- **New:** `plugins/opti-gsd/scripts/subagent-monitor.js`
- **New:** `plugins/opti-gsd/scripts/task-verify-gate.js`
- **New:** `plugins/opti-gsd/scripts/failure-logger.js`

### Verification
- Attempt `rm -rf /` via Bash → blocked with explanation
- Attempt `git push --force main` → blocked
- Start new session → see project state injected
- Run execution → see subagent start/stop in logs
- Complete a task → verify gate checks commit exists

---

## Phase 3: Agent Hardening

**Goal:** Enforce least-privilege on agents and add domain context injection for smarter execution.

### Changes

#### 3a. Read-Only Verifier

**File:** `plugins/opti-gsd/agents/verifier.md`

Add `disallowedTools` to frontmatter:
```yaml
disallowedTools: Write, Edit, NotebookEdit
```

Remove `Write` from tools list. The verifier should only read and run checks, never modify code. Its output goes to stdout, and the verify *skill* (which runs in fork context) handles writing `verification.json`.

#### 3b. Read-Only Researcher

**File:** `plugins/opti-gsd/agents/researcher.md`

Add `disallowedTools` to frontmatter:
```yaml
disallowedTools: Edit, NotebookEdit
```

Keep `Write` — researcher needs to write `research.md` output files. But block Edit (shouldn't modify existing code) and NotebookEdit.

#### 3c. Model Tiering

**File:** `plugins/opti-gsd/agents/planner.md`

Consider changing model to `opus` for planning (higher reasoning quality for task design, dependency analysis, and wave structure). This is optional and depends on cost tolerance.

**File:** `plugins/opti-gsd/agents/verifier.md`

Consider changing model to `haiku` for verification (just running commands and checking outputs — doesn't need strong reasoning).

Note: Keep executor and reviewer on `sonnet` — they need good code understanding but not the deepest reasoning.

#### 3d. Domain Context Injection in Planner

**File:** `plugins/opti-gsd/skills/plan/SKILL.md`

Add optional `domain` field to task schema in Step 5:
```json
{
  "id": "01",
  "title": "Create User model",
  "domain": "database",
  "files": [...],
  "action": "...",
  "verify": [...]
}
```

Valid domains: `database`, `api`, `frontend`, `testing`, `security`, `infrastructure`, `documentation`

**File:** `plugins/opti-gsd/skills/execute/SKILL.md`

In Step 5b, when building the executor prompt, append domain-specific context if `task.domain` is present:

```
Domain contexts:
- database: "Follow migration patterns. Include rollback. Test with fixtures."
- api: "Validate inputs. Handle errors with proper HTTP codes. Document endpoints."
- frontend: "Follow component patterns. Check accessibility. Test user interactions."
- security: "Follow OWASP guidelines. Never log secrets. Validate all inputs."
- testing: "Follow existing test patterns. Cover edge cases. Mock external deps."
```

This gives executors domain expertise without creating specialized agent variants.

### Files Modified
- `plugins/opti-gsd/agents/verifier.md` — Add disallowedTools, optionally change model
- `plugins/opti-gsd/agents/researcher.md` — Add disallowedTools
- `plugins/opti-gsd/agents/planner.md` — Optionally change model
- `plugins/opti-gsd/skills/plan/SKILL.md` — Add domain field to task schema
- `plugins/opti-gsd/skills/execute/SKILL.md` — Add domain context injection

### Verification
- Verifier agent cannot write files (test by running verify skill)
- Researcher agent cannot edit existing files
- Planner generates domain tags when tasks clearly belong to a domain
- Executor receives domain context in prompt for tagged tasks

---

## Phase 4: Agent Teams Support (Optional Execution Mode)

**Goal:** Add an alternative execution mode that uses Claude Code Agent Teams instead of subagents, for phases where peer-to-peer communication and self-claiming add value.

**Why last:** Agent teams are experimental, token-heavy, and most phases work fine with subagents. This is an opt-in enhancement for complex, cross-cutting work.

### Changes

#### 4a. Config Extension

**File:** `.opti-gsd/config.json` (schema change)

Add `execution.engine` field:
```json
{
  "execution": {
    "engine": "subagent"
  }
}
```

Valid values:
- `"subagent"` (default) — current behavior, spawns executor subagents via Task tool
- `"team"` — creates an agent team with teammates as executors

#### 4b. Execute Skill — Team Mode Branch

**File:** `plugins/opti-gsd/skills/execute/SKILL.md`

After Step 4b (Initialize Task Tracking), add a conditional:

```
## Step 4c: Choose Execution Engine

Read `execution.engine` from config.json (default: "subagent").

If "team": follow Step 5-TEAM below.
If "subagent": follow Step 5 (existing wave execution).
```

Add new section:

```
## Step 5-TEAM: Agent Team Execution

### 5t-a: Create Team

Tell Claude Code to create an agent team:
"Create an agent team for phase {N} execution. Use delegate mode.
Spawn {task_count} executor teammates, one per task."

### 5t-b: Populate Shared Task List

The native Tasks created in Step 4b serve as the shared task list.
Teammates self-claim tasks. blockedBy dependencies enforce wave ordering.

### 5t-c: Configure Teammates

Each teammate receives the same context as a subagent executor:
- Task JSON from plan.json
- Phase number and project conventions
- CI commands from config.json
- Instruction to commit atomically and output Commit: {hash}

Optionally require plan approval for risky tasks:
"Require plan approval for Task {id} before implementation."

### 5t-d: Monitor and Collect

The lead monitors teammates via the shared task list.
As tasks complete (tracked by TaskCompleted hook from Phase 2):
- Parse commit hash from teammate output
- Tag checkpoint: git tag -f "gsd/checkpoint/phase-{NN}/T{id}" {hash}
- Record result in state.json

### 5t-e: Clean Up

After all tasks complete:
"Ask all teammates to shut down, then clean up the team."
```

#### 4c. TeammateIdle Hook

**File:** `plugins/opti-gsd/hooks/hooks.json`

Add `TeammateIdle` hook:
```json
{
  "TeammateIdle": [{
    "matcher": "*",
    "hooks": [{
      "type": "command",
      "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/teammate-idle.js\" || true"
    }]
  }]
}
```

**File (new):** `plugins/opti-gsd/scripts/teammate-idle.js`

When a teammate goes idle:
- Check shared task list for unclaimed, unblocked tasks
- If tasks remain: exit 2 with message "Claim the next available task from the task list"
- If no tasks remain: exit 0 (allow idle — work is done)

This keeps teammates productive without manual lead intervention.

### Files Modified
- `.opti-gsd/config.json` — Add execution.engine schema
- `plugins/opti-gsd/skills/execute/SKILL.md` — Add Step 4c and Step 5-TEAM
- `plugins/opti-gsd/hooks/hooks.json` — Add TeammateIdle hook
- **New:** `plugins/opti-gsd/scripts/teammate-idle.js`

### Verification
- Set `execution.engine: "team"` and run execute
- Confirm teammates spawn and self-claim tasks
- Confirm wave ordering enforced by blockedBy dependencies
- Confirm TeammateIdle hook keeps teammates working
- Confirm checkpoint tags created with correct commit hashes
- Confirm team cleanup after completion
- Set `execution.engine: "subagent"` and confirm existing behavior unchanged

---

## Implementation Order & Dependencies

```
Phase 1 (Tasks API) ──────────────────────> can ship independently
Phase 2 (Hooks) ───────────────────────────> can ship independently
Phase 3 (Agent Hardening) ─────────────────> can ship independently
Phase 4 (Agent Teams) ────────────────────> depends on Phase 1 (needs TaskCreate for shared task list)
                                            benefits from Phase 2 (TaskCompleted + TeammateIdle hooks)
```

Phases 1-3 are fully independent and could be done in parallel.
Phase 4 requires Phase 1's TaskCreate integration and benefits from Phase 2's hooks.

---

## Risk Assessment

| Phase | Risk | Mitigation |
|:------|:-----|:-----------|
| 1. Tasks API | TaskCreate/TaskUpdate may not be in allowed-tools for skills | Test with explicit allowed-tools; fall back to documenting as "call these tools" without frontmatter restriction |
| 2. Hooks | Hook scripts add latency to every tool call | Keep scripts under 100ms; use `|| true` to prevent blocking on errors |
| 3. Agent Hardening | Read-only verifier can't write verification.json | Verify skill (fork context) handles the write, not the agent |
| 4. Agent Teams | Experimental feature with known limitations | Make it opt-in via config; default stays "subagent" |

---

## What We're NOT Doing

- **Meta-agent / dynamic agent creation** — Overkill. Domain context injection (Phase 3d) gives 90% of the value.
- **Replacing plan.json with native Tasks** — plan.json is better for human review, version control, and auditing. Tasks are the visual/coordination layer.
- **Nested teams** — Not supported by the platform. Our subagent model is flat by design.
- **Mandatory agent teams** — Too expensive and experimental to be the default. Subagent mode stays default.
- **Full TodoWrite replacement** — The system prompt still references TodoWrite for in-session tracking. We add Tasks API for cross-session and visual progress, but don't fight the system prompt.
