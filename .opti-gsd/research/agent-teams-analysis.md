# Research: Agent Teams Patterns — What Can We Adopt?

**Date:** 2026-02-14
**Source:** [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery)

---

## How hooks-mastery Structures Agent Teams

### The Three-Tier Architecture

```
┌─────────────────────────────────────────┐
│           META-AGENT (Opus)             │
│  Creates new agents on-the-fly from     │
│  user descriptions. Agent factory.      │
│  Tools: Write, WebFetch, Firecrawl      │
└────────────────┬────────────────────────┘
                 │ spawns
    ┌────────────┴────────────┐
    ▼                         ▼
┌──────────────┐   ┌──────────────────┐
│   BUILDER    │   │    VALIDATOR     │
│   (Opus)     │   │    (Opus)        │
│   cyan       │   │    yellow        │
│              │   │                  │
│ Full access  │   │ Read-only        │
│ Write, Edit  │   │ NO Write/Edit    │
│ Bash, Read   │   │ Read, Glob, Grep │
│ Glob, Grep   │   │ safe Bash        │
│              │   │                  │
│ Post-hooks:  │   │ Reports only,    │
│ ruff lint    │   │ never modifies   │
│ ty typecheck │   │                  │
└──────────────┘   └──────────────────┘
```

### Key Design Decisions

1. **Builder has inline validators via hooks** — When the builder uses Write or Edit, a PostToolUse hook automatically runs `ruff` (linter) and `ty` (type checker) on the changed file. Validation happens *during* implementation, not after.

2. **Validator uses `disallowedTools`** — Instead of listing allowed tools, it explicitly blocks `Write`, `Edit`, `NotebookEdit`. This is more restrictive — the validator literally cannot modify files.

3. **Both use Opus** — The team agents use the most capable model for quality, unlike our agents which use Sonnet for cost efficiency.

4. **Meta-agent creates new agents dynamically** — It fetches current Claude Code docs, analyzes requirements, and writes a complete `.md` agent file. This enables on-the-fly specialization.

5. **Domain-specific agent variants** — The crypto/ directory has 13 agents, with haiku/sonnet/opus variants of the same agent for cost/quality tradeoffs.

### Additional Specialized Agents

| Agent | Purpose | Model |
|---|---|---|
| `work-completion-summary` | TTS summary of completed work | Opus |
| `llm-ai-agents-and-eng-research` | Proactive AI news research | (default) |
| `hello-world-agent` | Example/template agent | (default) |

---

## How opti-gsd Currently Structures Agents

### Our Five-Agent Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    EXECUTE SKILL (Main Context)               │
│  Orchestrates waves, spawns subagents, manages state          │
│  Tools: Read, Glob, Grep, Bash, Write, Edit, Task            │
└───────┬──────────┬──────────┬──────────┬─────────────────────┘
        │          │          │          │
        ▼          ▼          ▼          ▼
  ┌──────────┐ ┌────────┐ ┌────────┐ ┌──────────┐ ┌──────────┐
  │ PLANNER  │ │EXECUTOR│ │REVIEWER│ │ VERIFIER │ │RESEARCHER│
  │ (sonnet) │ │(sonnet)│ │(sonnet)│ │ (sonnet) │ │ (sonnet) │
  │          │ │        │ │        │ │          │ │          │
  │ Read     │ │ Read   │ │ Read   │ │ Read     │ │ Read     │
  │ Glob     │ │ Glob   │ │ Glob   │ │ Glob     │ │ Glob     │
  │ Grep     │ │ Grep   │ │ Grep   │ │ Grep     │ │ Grep     │
  │ Bash     │ │ Bash   │ │ Bash   │ │ Bash     │ │ Bash     │
  │ Write    │ │ Write  │ │ Write  │ │ Write    │ │ Write    │
  │ Edit     │ │ Edit   │ │ Edit   │ │          │ │          │
  │ WebFetch │ │WebFetch│ │        │ │          │ │ WebFetch │
  │ WebSearch│ │        │ │        │ │          │ │ WebSearch│
  │          │ │        │ │        │ │          │ │          │
  │ acceptEd │ │acceptEd│ │acceptEd│ │ acceptEd │ │ acceptEd │
  └──────────┘ └────────┘ └────────┘ └──────────┘ └──────────┘
```

### Current Gaps in Our Agent Design

| Issue | Detail |
|---|---|
| **All agents have Write access** | Verifier and Researcher shouldn't need Write |
| **All agents use acceptEdits** | Verifier should be read-only by design |
| **No inline validation hooks** | Executor can write bad code with no immediate feedback |
| **All agents use Sonnet** | No model flexibility for quality-critical vs routine work |
| **No meta-agent** | Can't create new specialized agents dynamically |
| **No agent variants** | Single config per agent, no cost/quality tiers |
| **Flat hierarchy** | No builder/validator separation of concerns |

---

## Recommendations

### 1. Enforce Read-Only Verifier (HIGH PRIORITY, LOW EFFORT)

**Problem:** Our verifier has `Write` access and `permissionMode: acceptEdits`. It's supposed to verify, not modify. If it accidentally writes, it corrupts the verification.

**Solution:** Use `disallowedTools` (like hooks-mastery) instead of listing tools:

```yaml
---
name: opti-gsd-verifier
description: Verifies phase completion — runs CI checks, validates requirements, reports gaps
tools: Read, Glob, Grep, Bash
disallowedTools: Write, Edit, NotebookEdit
model: sonnet
---
```

**State writing:** The verifier currently writes `verification.json`. Instead, have it output structured JSON to stdout. The execute/verify skill (running in main context) writes the file.

---

### 2. Enforce Read-Only Researcher (HIGH PRIORITY, LOW EFFORT)

**Problem:** The researcher has `Write` and `permissionMode: acceptEdits`. Research should be read-only — the skill orchestrator should write the output file.

**Solution:**

```yaml
---
name: opti-gsd-researcher
description: Investigates technical topics, best practices, libraries, and domain knowledge
tools: Read, Glob, Grep, Bash, WebFetch, WebSearch
disallowedTools: Write, Edit, NotebookEdit
model: sonnet
---
```

Have the researcher return findings as structured output. The `/research` skill writes the file.

---

### 3. Add Inline Validation Hooks to Executor (HIGH PRIORITY, MEDIUM EFFORT)

**Problem:** Our executor can write syntactically broken code, and it only catches issues during the verify step at the end.

**Solution:** Add PostToolUse hooks that run linting/type-checking whenever the executor uses Write or Edit:

```json
{
  "PostToolUse": [
    {
      "matcher": "Write|Edit",
      "hooks": [
        {
          "type": "command",
          "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/validate-on-write.js\""
        }
      ]
    }
  ]
}
```

The script would:
- Read the tool input to identify the changed file
- Run the project's configured linter on that file
- Exit 0 (log only) or exit 2 (block and feed error back to Claude)

This catches errors *during* implementation, not just at verification time.

---

### 4. Add Builder/Validator Pairing to Execute Workflow (MEDIUM PRIORITY, MEDIUM EFFORT)

**Problem:** After each wave executes, we rely on the user to trigger `/review` or `/verify`. There's no automatic validation.

**Solution:** After each wave's executor agents complete, automatically spawn a read-only validator agent to check the wave's output:

```
Wave 1: [Executor T01] [Executor T02]  ← parallel builders
         ↓ results
Wave 1 Validation: [Validator]          ← read-only check
         ↓ pass/fail
Wave 2: [Executor T03]                 ← only if wave 1 validated
```

**Implementation in execute skill:**

```
For each wave:
  1. Spawn executor agents (parallel)
  2. Collect results
  3. Spawn validator agent (read-only) to check wave output
  4. If validator reports issues → present to user / retry
  5. If validator passes → continue to next wave
```

This adds an automatic quality gate between waves without requiring manual review.

---

### 5. Model Tier Strategy (MEDIUM PRIORITY, LOW EFFORT)

**Problem:** All agents use Sonnet. Some tasks benefit from higher reasoning (Opus) while others are simple enough for Haiku.

**Solution:** Tiered model selection based on task complexity:

| Agent | Current | Recommended | Rationale |
|---|---|---|---|
| Planner | sonnet | **opus** | Planning quality determines everything downstream |
| Executor | sonnet | sonnet | Good balance for implementation |
| Reviewer | sonnet | **opus** | Needs deep reasoning to catch subtle issues |
| Verifier | sonnet | **haiku** | Mostly running commands and checking output |
| Researcher | sonnet | sonnet | Good balance for synthesis work |

**Alternative:** Let the user configure model tiers in `config.json`:

```json
{
  "models": {
    "planner": "opus",
    "executor": "sonnet",
    "reviewer": "opus",
    "verifier": "haiku",
    "researcher": "sonnet"
  }
}
```

---

### 6. Meta-Agent for Dynamic Specialization (LOW PRIORITY, MEDIUM EFFORT)

**Problem:** When a phase requires domain-specific expertise (e.g., database migration, security audit, performance optimization), our generic executor may lack specialized knowledge.

**Solution:** A meta-agent that creates purpose-built executor variants:

```
/opti-gsd:execute (phase with DB migration tasks)
  → Meta-agent creates "db-migration-executor" with:
    - Domain-specific instructions for migration patterns
    - Relevant tool permissions
    - Model selection based on complexity
  → Phase executes with specialized agent
```

**When to use:** This is powerful but adds complexity. Only worth implementing after the simpler improvements (read-only agents, inline validation) are in place.

---

### 7. Agent Color Coding (LOW PRIORITY, LOW EFFORT)

hooks-mastery assigns colors to agents (builder=cyan, validator=yellow) for visual distinction in terminal output. We could adopt this for status line clarity:

```yaml
# In agent frontmatter
color: cyan     # executor
color: green    # planner
color: yellow   # verifier
color: red      # reviewer (finding issues)
color: blue     # researcher
```

---

## Implementation Priority

| # | Change | Effort | Impact | Touches |
|---|---|---|---|---|
| 1 | Read-only verifier (`disallowedTools`) | 5 min | High | `agents/verifier.md`, `skills/verify/SKILL.md` |
| 2 | Read-only researcher (`disallowedTools`) | 5 min | Medium | `agents/researcher.md`, `skills/research/SKILL.md` |
| 3 | Inline validation hooks (lint-on-write) | 1-2 hrs | High | `hooks/hooks.json`, new script |
| 4 | Wave-level auto-validation | 2-3 hrs | High | `skills/execute/SKILL.md` |
| 5 | Model tier strategy | 30 min | Medium | All agent `.md` files, `config.json` |
| 6 | Meta-agent | 3-4 hrs | Medium | New agent, new skill |
| 7 | Agent colors | 10 min | Low | All agent `.md` files |

---

## Summary: hooks-mastery vs opti-gsd Agent Philosophy

| Aspect | hooks-mastery | opti-gsd | Recommendation |
|---|---|---|---|
| **Separation of concerns** | Strict: builder writes, validator reads | Loose: all agents can write | Adopt strict separation |
| **Inline validation** | PostToolUse hooks lint on every write | None — validate at end only | Add lint-on-write hooks |
| **Model selection** | Opus for team agents | Sonnet for everything | Tier by role criticality |
| **Dynamic agents** | Meta-agent creates new agents | Fixed set of 5 agents | Defer — not needed yet |
| **Permission model** | `disallowedTools` for restrictions | `tools` whitelist only | Use `disallowedTools` for read-only agents |
| **Auto-validation** | Builder → Validator pipeline | Manual review trigger | Add wave-level validation |
| **Agent variants** | haiku/sonnet/opus per agent | Single variant | Add config-driven model selection |

The biggest wins are **tightening permissions** (items 1-2, trivial effort) and **inline validation** (item 3, moderate effort). The builder/validator wave pipeline (item 4) is the most architecturally significant change and would transform our execute workflow from "build everything, then check" to "build-and-verify per wave."
