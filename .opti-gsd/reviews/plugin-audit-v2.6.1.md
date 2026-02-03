# Plugin Audit: opti-gsd v2.6.1

**Date:** 2026-02-01
**Reviewed against:** Claude Code official documentation (code.claude.com/docs)
**Branch:** claude/review-execute-command-gRXm8

## Summary

Comprehensive review of the opti-gsd plugin covering all agents, skills, hooks, scripts, manifests, and cross-references. All identified issues have been fixed.

## Audit Scope

- 5 agents (executor, planner, researcher, reviewer, verifier)
- 19 skills (status, init, new-project, roadmap, plan, execute, review, verify, push, complete, rollback, add-feature, add-story, add-issue, debug, research, quick, migrate, help)
- 1 hooks configuration (hooks.json)
- 4 scripts (log-tool-usage.js, analyze-tool-usage.js, gsd-statusline.js, gsd-statusline.sh)
- 3 manifest files (plugin.json, marketplace.json, package.json)
- 2 CLAUDE.md files (project + user)

## Issues Found & Fixed

### 1. Executor Agent — NotebookEdit in tools list

**Severity:** Low
**File:** `agents/opti-gsd/executor.md`
**Issue:** NotebookEdit was listed in tools but never used by the executor workflow.
**Fix:** Removed NotebookEdit from tools list.

### 2. Executor Agent — Co-Authored-By in commit template

**Severity:** Medium
**File:** `agents/opti-gsd/executor.md`
**Issue:** Commit message template included `Co-Authored-By: opti-gsd` but user preferences explicitly prohibit Co-Authored-By lines.
**Fix:** Removed Co-Authored-By line from commit template.

### 3. Planner Agent — Missing web tools

**Severity:** Medium
**File:** `agents/opti-gsd/planner.md`
**Issue:** Planner had no web access tools despite needing to research during planning.
**Fix:** Added WebFetch and WebSearch to tools list.

### 4. Forked Skills — Missing allowed-tools

**Severity:** Low (defense-in-depth)
**Files:** `skills/opti-gsd/{plan,review,verify,research}/SKILL.md`
**Issue:** Skills with `context: fork` delegated to agents but didn't specify `allowed-tools`. Per docs, `allowed-tools` restricts which tools are pre-approved during skill execution.
**Fix:** Added `allowed-tools` matching each agent's tools list:
- plan: Read, Glob, Grep, Bash, Write, Edit, WebFetch, WebSearch
- review: Read, Glob, Grep, Bash, Write, Edit
- verify: Read, Glob, Grep, Bash
- research: Read, Glob, Grep, Bash, WebFetch, WebSearch

### 5. Execute Skill — Missing allowed-tools

**Severity:** Low (defense-in-depth)
**File:** `skills/opti-gsd/execute/SKILL.md`
**Issue:** Execute skill runs in main context and spawns Task agents but had no `allowed-tools`.
**Fix:** Added `allowed-tools: Read, Glob, Grep, Bash, Write, Edit, Task`.

### 6. Hooks.json — Missing description

**Severity:** Low
**File:** `hooks/hooks.json`
**Issue:** Plugin hooks.json lacked the optional `description` field documented in the official spec.
**Fix:** Added `"description": "opti-gsd tool usage analytics — logs all tool invocations for session analysis"`.

### 7. Statusline Scripts — Stale .gsd references

**Severity:** High
**Files:** `scripts/gsd-statusline.js`, `scripts/gsd-statusline.sh`
**Issue:** Both scripts referenced the old `.gsd` directory and `STATE.md` file format from v1/v2. The v3 architecture uses `.opti-gsd/state.json`.
**Fix:**
- `gsd-statusline.js`: Updated to read `.opti-gsd/state.json` as JSON, parse `phases.current`, `phases.total`, `milestone`, `mode` from JSON structure.
- `gsd-statusline.sh`: Updated to read `.opti-gsd/state.json` with `jq`, removed `grep -oP` (Linux-only Perl regex) for cross-platform compatibility.

### 8. User CLAUDE.md — Incomplete command table

**Severity:** Low
**File:** `~/.claude/CLAUDE.md`
**Issue:** Missing `/opti-gsd:init`, `/opti-gsd:new-project`, and `/opti-gsd:migrate` from the Key Commands table.
**Fix:** Added all three missing skills to the table.

### 9. analyze-tool-usage.js — Stale built-in tools list

**Severity:** Low
**File:** `scripts/analyze-tool-usage.js`
**Issue:** `BUILTIN_TOOLS` set contained deprecated tool names (`TodoRead`, `TodoWrite`, `MultiEdit`, `LS`, `Agent`, `Batch`) that don't exist in current Claude Code and was missing current tools (`NotebookEdit`, `AskUserQuestion`, `EnterPlanMode`, `ExitPlanMode`, `Skill`, `ToolSearch`).
**Fix:** Updated to match current Claude Code built-in tool set.

### 10. User CLAUDE.md — Stale agent references (fixed in prior iteration)

**Severity:** High (prior fix)
**File:** `~/.claude/CLAUDE.md`
**Issue:** Referenced 5 non-existent agents (debugger, codebase-mapper, integration-checker, phase-researcher, project-researcher) and old skill name `plan-phase`.
**Fix:** Complete rewrite with correct 5 agents and all 19 skills.

### 11. Agents missing permissionMode: acceptEdits

**Severity:** Medium
**Files:** `agents/opti-gsd/{planner,reviewer,verifier,researcher}.md`
**Issue:** All four agents write files (plan.json, state.json, verification.json, research output, code fixes) but used `default` permission mode, which would prompt for permission on every write. Only the executor had `acceptEdits`.
**Fix:** Added `permissionMode: acceptEdits` to all four agents.

### 12. Verifier and Researcher missing Write tool

**Severity:** Medium
**Files:** `agents/opti-gsd/verifier.md`, `agents/opti-gsd/researcher.md`
**Issue:** Both agents write output files (`verification.json`, `state.json`, research markdown) but didn't have Write in their tools list. The verifier skill's `allowed-tools` also didn't include Write.
**Fix:** Added Write to verifier and researcher tool lists. Updated verify and research skill `allowed-tools` to match.

### 13. Statusline scripts reading mode from wrong file

**Severity:** Medium
**Files:** `scripts/gsd-statusline.js`, `scripts/gsd-statusline.sh`
**Issue:** Both statusline scripts read `mode` from `state.json`, but the `mode` field is defined in `config.json` (set during `/opti-gsd:init`). The `state.json` schema has no `mode` field, so the mode indicator (A for autonomous, Y for yolo) never displayed.
**Fix:**
- `gsd-statusline.js`: Now reads `config.json` separately for the `mode` field.
- `gsd-statusline.sh`: Now reads `config.json` with `jq` for the `mode` field.

### 14. Status skill — missing config.json in load step

**Severity:** Low
**File:** `skills/opti-gsd/status/SKILL.md`
**Issue:** Step 2 (Load State) listed `state.json` and `roadmap.md` to read, but not `config.json`. The display template shows `Mode: {mode}` which comes from config.json.
**Fix:** Added `.opti-gsd/config.json` to the load file list.

### 15. analyze-tool-usage.js — Incomplete built-in tools list

**Severity:** Low
**File:** `scripts/analyze-tool-usage.js`
**Issue:** `BUILTIN_TOOLS` set was missing several current Claude Code tools: `TaskOutput`, `TaskStop`, `TaskCreate`, `TaskGet`, `TaskUpdate`, `TaskList`, `ListMcpResourcesTool`, `ReadMcpResourceTool`.
**Fix:** Added all missing tools to the set.

## Validation Checklist

### Manifest Consistency
- [x] plugin.json version: 2.6.1
- [x] marketplace.json version: 2.6.1
- [x] package.json version: 2.6.1
- [x] All three match

### Agent Frontmatter Fields
| Agent | name | description | tools | model | permissionMode |
|-------|------|-------------|-------|-------|----------------|
| executor | opti-gsd-executor | Yes | Read, Glob, Grep, Bash, Write, Edit, WebFetch | sonnet | acceptEdits |
| planner | opti-gsd-planner | Yes | Read, Glob, Grep, Bash, Write, Edit, WebFetch, WebSearch | sonnet | acceptEdits |
| researcher | opti-gsd-researcher | Yes | Read, Glob, Grep, Bash, Write, WebFetch, WebSearch | sonnet | acceptEdits |
| reviewer | opti-gsd-reviewer | Yes | Read, Glob, Grep, Bash, Write, Edit | sonnet | acceptEdits |
| verifier | opti-gsd-verifier | Yes | Read, Glob, Grep, Bash, Write | sonnet | acceptEdits |

All agents use valid frontmatter fields per docs: name, description, tools, model, permissionMode.

### Skill Frontmatter Fields
| Skill | name | description | disable-model-invocation | context | agent | allowed-tools | argument-hint |
|-------|------|-------------|--------------------------|---------|-------|---------------|---------------|
| status | Yes | Yes | true | - | - | - | - |
| init | Yes | Yes | true | - | - | - | - |
| new-project | Yes | Yes | true | - | - | - | - |
| roadmap | Yes | Yes | true | - | - | - | Yes |
| plan | Yes | Yes | true | fork | opti-gsd/planner | Yes | Yes |
| execute | Yes | Yes | true | - | - | Yes | - |
| review | Yes | Yes | true | fork | opti-gsd/reviewer | Yes | Yes |
| verify | Yes | Yes | true | fork | opti-gsd/verifier | Yes | Yes |
| push | Yes | Yes | true | - | - | - | - |
| complete | Yes | Yes | true | - | - | - | - |
| rollback | Yes | Yes | true | - | - | - | Yes |
| add-feature | Yes | Yes | true | - | - | - | Yes |
| add-story | Yes | Yes | true | - | - | - | Yes |
| add-issue | Yes | Yes | true | - | - | - | Yes |
| debug | Yes | Yes | true | - | - | - | Yes |
| research | Yes | Yes | true | fork | opti-gsd/researcher | Yes | Yes |
| quick | Yes | Yes | true | - | - | - | Yes |
| migrate | Yes | Yes | true | - | - | - | - |
| help | Yes | Yes | true | - | - | - | - |

All skills use valid frontmatter fields per docs.

### Cross-Reference Integrity
- [x] plan skill → `agent: opti-gsd/planner` → `agents/opti-gsd/planner.md` exists
- [x] review skill → `agent: opti-gsd/reviewer` → `agents/opti-gsd/reviewer.md` exists
- [x] verify skill → `agent: opti-gsd/verifier` → `agents/opti-gsd/verifier.md` exists
- [x] research skill → `agent: opti-gsd/researcher` → `agents/opti-gsd/researcher.md` exists
- [x] execute skill spawns `opti-gsd/executor` via Task tool → `agents/opti-gsd/executor.md` exists
- [x] All skill allowed-tools match their corresponding agent's tools list
- [x] Help skill lists all 19 skills
- [x] Project CLAUDE.md lists all 19 skills
- [x] User CLAUDE.md lists all 19 skills
- [x] Project CLAUDE.md lists all 5 agents
- [x] User CLAUDE.md lists all 5 agents

### Hooks Validation
- [x] hooks.json has valid JSON structure
- [x] hooks.json has `description` field
- [x] PostToolUse event with `"*"` matcher is valid per docs
- [x] Command uses `${CLAUDE_PLUGIN_ROOT}` for plugin-relative paths
- [x] Script (`log-tool-usage.js`) always exits 0 to avoid breaking hook execution

### Script Validation
- [x] log-tool-usage.js: Node.js, cross-platform, reads stdin JSON, writes to `.opti-gsd/tool-usage.json`
- [x] analyze-tool-usage.js: Node.js, cross-platform, reads from `.opti-gsd/tool-usage.json`, complete BUILTIN_TOOLS set
- [x] gsd-statusline.js: Node.js, cross-platform, reads `.opti-gsd/state.json` + `config.json` (FIXED)
- [x] gsd-statusline.sh: Bash with jq, reads `.opti-gsd/state.json` + `config.json` (FIXED)

### Document Structure & AI Readability
- [x] All skills use clear step-by-step numbered sections
- [x] All agents have structured Input/Process/Output sections
- [x] Code blocks use language annotations (bash, json, markdown)
- [x] Status output formats use consistent box-drawing characters
- [x] Error messages follow consistent format: icon + title + explanation + next action
- [x] Phase directory convention (zero-padding) documented in all relevant skills

## Items NOT Changed (Intentionally)

1. **Executor has WebFetch but not WebSearch**: The executor may need to fetch specific URLs from plan context but doesn't need general web search during task implementation.

2. **Verifier has Write but not Edit**: Verifier needs Write (for verification.json and state.json) but intentionally excludes Edit — its job is to verify, not fix code.

3. **All agents use `permissionMode: acceptEdits`**: Every agent writes files (plan.json, verification.json, state.json, research output, source fixes), so all need auto-approved edits to avoid permission prompts during automated workflows.

4. **No `user-invocable: false` skills**: All skills are user-invocable. None are agent-only. This is correct for this plugin's design.

5. **No `skills` preloading in agent frontmatter**: Agents receive full context via skill content when invoked through forked skills. Preloading additional skills is unnecessary.
