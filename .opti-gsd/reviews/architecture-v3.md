# opti-gsd v3 Architecture — Ground-Up Redesign

**Date:** 2026-02-01
**Purpose:** Complete rewrite based on official Claude Code documentation (code.claude.com)

---

## Current State (41 commands, 11 agents)

The current plugin has accumulated inconsistencies:
- Commands that should be skills (they're workflows, not orchestrators)
- Agents that duplicate command logic
- State management conflicts between commands
- References to tools that may not be available (TaskCreate/TaskUpdate in non-swarm mode)
- 41 commands creating a bloated `/` menu

## Key Insights from Official Docs

### What each extension type is for

| Type | Purpose | Context Cost | When to Use |
|------|---------|-------------|-------------|
| **CLAUDE.md** | Always-on rules | Every request | "Always do X" conventions |
| **Skill** | Knowledge + invocable workflows | Low (descriptions only) until used | Repeatable tasks, reference docs |
| **Subagent** | Isolated worker | Separate context | Read many files, parallel work |
| **Hook** | Deterministic automation | Zero | Must-happen-every-time actions |
| **MCP** | External service connection | Every request (tool schemas) | Database, Slack, browser |

### Critical constraints

1. **Subagents CANNOT spawn other subagents** — no nesting
2. **Skills can run in fork context** (`context: fork`) — acts like a subagent
3. **Skills can specify `agent` field** — picks which subagent runs the forked skill
4. **`disable-model-invocation: true`** — user-only trigger (no context cost until invoked)
5. **`user-invocable: false`** — Claude-only (hidden from / menu, Claude loads when relevant)
6. **Background subagents auto-deny permissions** — MCP tools unavailable
7. **Skill descriptions budget: 15,000 chars** — all skill descriptions combined

### The Task tool reality

- The `Task` tool spawns subagents (built-in or custom from `.claude/agents/`)
- `TaskCreate`/`TaskUpdate` are NOT in official docs — they're swarm/team mode only
- For parallel execution, the orchestrator uses multiple `Task` calls in a single message
- `TaskOutput` reads background task results
- Subagents report back via their return value, not via task tracking

---

## New Architecture

### Design Principles

1. **Skills for user-facing workflows** — everything the user invokes with `/`
2. **Agents for isolated heavy lifting** — research, planning, execution, verification
3. **CLAUDE.md for always-on rules** — branch protection, commit conventions
4. **Hooks for deterministic automation** — tool logging, lint-on-edit
5. **No nested orchestration** — since subagents can't spawn subagents, skills that need sub-work must be the top-level orchestrator calling `Task` tool directly
6. **Simple state** — `state.json` with one clear schema, no conflicting formats

### The Core Flow

```
INIT → ROADMAP → PLAN → EXECUTE → REVIEW → VERIFY → COMPLETE
```

Each step is a **user-invocable skill**. The user drives the flow. Status tells them what's next.

### New Plugin Structure

```
opti-gsd/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── status/SKILL.md              # Show state, suggest next action
│   ├── init/SKILL.md                # Initialize project
│   ├── new-project/SKILL.md         # Scaffold new project
│   ├── roadmap/SKILL.md             # Create/view roadmap
│   ├── plan/SKILL.md                # Plan current phase (was plan-phase)
│   ├── execute/SKILL.md             # Execute phase plan
│   ├── review/SKILL.md              # Review execution results
│   ├── verify/SKILL.md              # Verify phase completion
│   ├── push/SKILL.md                # Push branch for CI/preview
│   ├── rollback/SKILL.md            # Rollback to checkpoint
│   ├── complete/SKILL.md            # Complete milestone, create PR
│   ├── debug/SKILL.md               # Systematic debugging
│   ├── research/SKILL.md            # Research a topic
│   ├── add-feature/SKILL.md         # Capture feature idea
│   ├── add-story/SKILL.md           # Capture user story
│   ├── add-issue/SKILL.md           # Capture bug/issue
│   ├── help/SKILL.md                # Show all commands
│   └── quick/SKILL.md               # Quick ad-hoc task
├── agents/
│   ├── opti-gsd/
│   │   ├── planner.md               # Generates phase plans
│   │   ├── executor.md              # Executes a single task
│   │   ├── researcher.md            # Investigates technical topics
│   │   ├── verifier.md              # Runs verification checks
│   │   └── reviewer.md              # Reviews code changes
├── hooks/
│   └── hooks.json                   # Tool usage logging
├── scripts/
│   └── log-tool-usage.js
├── CLAUDE.md                        # Plugin-level always-on rules
└── package.json
```

### What was removed (41 → 17 skills)

| Removed | Reason |
|---------|--------|
| `archive` | Not needed — `/compact` is built-in |
| `compact` | Built-in Claude Code feature |
| `context` | Built-in Claude Code feature |
| `decisions` | Fold into CLAUDE.md or a reference skill |
| `discuss-phase` | Fold into `plan` skill (optional research step) |
| `execute-task` | Internal — executor agent handles this |
| `features` | Merge into `add-feature` (list + add) |
| `insert-phase` | Fold into `roadmap` skill |
| `add-phase` | Fold into `roadmap` skill |
| `remove-phase` | Fold into `roadmap` skill |
| `issues` | Merge into `add-issue` (list + add) |
| `stories` | Merge into `add-story` (list + add) |
| `map-codebase` | Use Explore subagent directly |
| `migrate` | One-time — not needed as permanent command |
| `mode` | Fold into status or config |
| `pause` / `resume` | Built-in (`claude --continue`, `/resume`) |
| `plan-fix` | Fold into `plan --gaps` |
| `ci` | Fold into `verify` skill |
| `setup-claude-md` | Fold into `init` |
| `start-milestone` | Fold into `init` or `roadmap` |
| `statusline-setup` | Built-in |
| `tools` | MCP management is built-in |
| `whats-new` | Plugin marketplace handles this |

### What was merged (11 → 5 agents)

| Old Agents | New Agent | Why |
|------------|-----------|-----|
| `opti-gsd-planner` + `opti-gsd-plan-checker` | `planner` | Checker logic inlined into planner |
| `opti-gsd-executor` | `executor` | Same but simplified |
| `opti-gsd-phase-researcher` + `opti-gsd-project-researcher` + `opti-gsd-research-synthesizer` | `researcher` | One research agent |
| `opti-gsd-verifier` + `opti-gsd-integration-checker` | `verifier` | One verification agent |
| `opti-gsd-codebase-mapper` + `opti-gsd-debugger` | (removed) | Use built-in Explore agent, or `debug` skill |
| `opti-gsd-roadmapper` | (inlined) | Roadmap logic simple enough for skill |

---

## Skill Designs

### 1. `/opti-gsd:status`

```yaml
name: status
description: Show current project state and suggest next action
disable-model-invocation: true
```

**What it does:** Reads `state.json`, shows progress, suggests next command.
**No agent needed** — reads files and formats output.

### 2. `/opti-gsd:init`

```yaml
name: init
description: Initialize opti-gsd in an existing project
disable-model-invocation: true
```

**What it does:** Creates `.opti-gsd/` directory, config.json, state.json. Checks branch safety. Optionally sets up CLAUDE.md integration.

### 3. `/opti-gsd:roadmap`

```yaml
name: roadmap
description: Create or view the project roadmap with phased delivery plan
disable-model-invocation: true
```

**What it does:** Creates/displays roadmap.md. Handles add/insert/remove phase inline.

### 4. `/opti-gsd:plan`

```yaml
name: plan
description: Generate an executable plan for the current phase
disable-model-invocation: true
context: fork
agent: opti-gsd/planner
```

**What it does:** Spawns planner agent in forked context. Planner reads roadmap, stories, issues, generates plan.json with wave-based tasks.

### 5. `/opti-gsd:execute`

```yaml
name: execute
description: Execute the current phase plan with wave-based task parallelism
disable-model-invocation: true
```

**What it does:** This is the orchestrator. It CANNOT run in `context: fork` because it needs to spawn executor subagents via `Task` tool. Runs in main context.

Flow:
1. Load plan.json
2. Check for recovery (uncommitted work, partial progress)
3. For each wave: spawn executor agents via `Task` tool (parallel for wave tasks)
4. Collect results, tag checkpoints using commit hashes from executor output
5. After all waves: present summary for user review
6. Write summary.md
7. Suggest next step (review or verify)

### 6. `/opti-gsd:review`

```yaml
name: review
description: Review phase execution results and get targeted fixes
disable-model-invocation: true
context: fork
agent: opti-gsd/reviewer
```

**What it does:** Spawns reviewer in forked context. Reviews changes, runs checks, provides feedback. User says "looks good" to approve or gives feedback for fixes.

### 7. `/opti-gsd:verify`

```yaml
name: verify
description: Verify phase completion with automated checks and testing
disable-model-invocation: true
context: fork
agent: opti-gsd/verifier
```

**What it does:** Spawns verifier agent. Runs CI commands, checks test coverage, validates against plan requirements.

### 8. `/opti-gsd:rollback`

```yaml
name: rollback
description: Rollback to a checkpoint (phase or task level)
disable-model-invocation: true
argument-hint: "[phase-task] e.g. 2-01"
```

**What it does:** Lists checkpoints, rolls back to selected one. Simple git operations.

### 9. `/opti-gsd:push`

```yaml
name: push
description: Push current branch for CI and preview deployment
disable-model-invocation: true
```

### 10. `/opti-gsd:complete`

```yaml
name: complete
description: Complete the milestone and create a pull request
disable-model-invocation: true
```

### 11-17. Utility Skills

`debug`, `research`, `add-feature`, `add-story`, `add-issue`, `help`, `quick` — straightforward skills, some with `context: fork` for isolation.

---

## Agent Designs

### `planner.md`

```yaml
name: opti-gsd-planner
description: Generates executable phase plans with wave-based task parallelism
tools: Read, Glob, Grep, Bash, Write, Edit
model: sonnet
```

Reads context, generates plan.json. Includes self-validation (was plan-checker).

### `executor.md`

```yaml
name: opti-gsd-executor
description: Executes a single task from a phase plan with TDD and atomic commits
tools: Read, Glob, Grep, Bash, Write, Edit, NotebookEdit, WebFetch
permissionMode: acceptEdits
```

Executes one task. Makes atomic commits. Reports commit hash and results.
**Key:** Must output `Commit: {hash}` so orchestrator can tag checkpoints.

### `researcher.md`

```yaml
name: opti-gsd-researcher
description: Investigates technical topics, best practices, and domain knowledge
tools: Read, Glob, Grep, Bash, WebFetch, WebSearch
model: sonnet
```

Single research agent replacing three.

### `verifier.md`

```yaml
name: opti-gsd-verifier
description: Verifies phase completion with CI checks, testing, and requirement validation
tools: Read, Glob, Grep, Bash
model: sonnet
```

Runs all verification checks. Reports pass/fail with details.

### `reviewer.md`

```yaml
name: opti-gsd-reviewer
description: Reviews code changes against plan requirements and provides feedback
tools: Read, Glob, Grep, Bash
model: sonnet
```

Reviews changes, categorizes feedback, suggests fixes.

---

## State Management

### Single `state.json` schema

```json
{
  "version": "3.0",
  "milestone": "v1.0",
  "branch": "gsd/v1.0",
  "phase": 2,
  "status": "executing",
  "phases": {
    "total": 4,
    "complete": [1],
    "current": 2,
    "pending": [3, 4]
  },
  "execution": {
    "wave": 1,
    "tasks_done": ["01", "02"],
    "tasks_failed": [],
    "tasks_pending": ["03", "04"]
  },
  "last_active": "2026-02-01T12:00:00Z"
}
```

**Rules:**
- `phases` always uses array format — no nested objects
- `execution` tracks current phase execution state
- Verification results stored separately in `plans/phase-{NN}/verification.json`
- No `loop` section — execution state is simpler

### Phase directory convention (unchanged)

```
.opti-gsd/plans/phase-01/
├── plan.json          # The plan
├── research.md        # Phase research (optional)
├── summary.md         # Execution summary (after execute)
└── verification.json  # Verification results (after verify)
```

---

## Config Schema

```json
{
  "version": "3.0",
  "project": {
    "name": "my-app",
    "type": "nextjs"
  },
  "branching": {
    "enabled": true,
    "pattern": "gsd/v{milestone}",
    "protected": ["master", "main", "production", "prod"]
  },
  "ci": {
    "lint": "npm run lint",
    "typecheck": "npm run typecheck",
    "test": "npm test",
    "build": "npm run build",
    "e2e": null
  },
  "deployment": {
    "platform": null,
    "preview_url": null
  },
  "testing": {
    "always_test": [],
    "never_test": ["*.md", "*.json"]
  },
  "mode": "interactive",
  "urls": {
    "local": "http://localhost:3000"
  }
}
```

---

## Execute Flow (Detailed — the hardest skill)

Since execute is the most complex and the source of most bugs, here's the detailed flow:

### Pre-execution
1. **Check branch** — block on protected branches
2. **Load plan.json** — parse tasks and waves
3. **Check for recovery** — look for uncommitted work, partial progress via git log

### Wave execution
4. **For each wave:**
   - Spawn executor agents via `Task` tool (one per task in the wave)
   - For waves with 1 task: sequential (wait for result)
   - For waves with 2+ tasks: parallel `Task` calls in single message
   - Collect results from each executor
   - **Parse commit hash** from executor output (`Commit: {hash}`)
   - **Tag checkpoint:** `git tag -f "gsd/checkpoint/phase-{NN}/T{id}" {commit_hash}`
   - Update state.json execution progress
   - If any task failed: offer retry or skip

### Post-execution
5. **Write summary.md** — execution summary with all results
6. **Present to user** — show what was done, what passed, what failed
7. **Update state.json** — mark phase as executed
8. **Suggest next step** — `/opti-gsd:review` or `/opti-gsd:verify`

### Key fixes from review findings:
- **Tags use commit hash from executor output** (not HEAD) — fixes parallel tag issue
- **summary.md written BEFORE suggesting verify** — fixes prerequisite conflict
- **No auto-trigger of verify** — user decides when to verify
- **No conflicting state formats** — single schema

---

## Migration Path

1. Delete all files in `commands/opti-gsd/`
2. Delete all files in `agents/opti-gsd/`
3. Create `skills/` directory with new skills
4. Create new agents in `agents/opti-gsd/`
5. Update `hooks/hooks.json`
6. Update `.claude-plugin/plugin.json` to v3.0
7. Update CLAUDE.md

---

## Summary

| Metric | v2.x | v3.0 |
|--------|------|------|
| Commands/Skills | 41 commands | 17 skills |
| Agents | 11 | 5 |
| User-facing / menu items | 41 | 17 |
| State schemas | 2 conflicting | 1 unified |
| Nesting depth | Commands calling agents calling tools | Skills → agents → tools (flat) |
| Relies on TaskCreate | Yes (swarm-only) | No (uses Task tool) |
