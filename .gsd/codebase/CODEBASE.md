# Opti-GSD Codebase Analysis

## Overview

Opti-GSD is a Claude Code plugin implementing spec-driven development with fresh context execution. It orchestrates development workflows through specialized agents, maintains project state, and integrates with external MCPs (Model Context Protocol servers).

**Plugin Type:** Native Claude Code Plugin
**Version:** 0.2.4
**Author:** apittopti

---

## Plugin Framework & Structure

### Framework: Claude Code Native Plugin System

The plugin uses the Claude Code native plugin architecture with:
- **Configuration:** `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`
- **Commands:** Markdown files in `commands/` directory defining slash commands
- **Agents:** Markdown files in `agents/` directory defining specialized subagents
- **Scripts:** Helper scripts in `scripts/` for statusline integration

### Plugin Configuration Files

| File | Purpose |
|------|---------|
| `.claude-plugin/plugin.json` | Plugin metadata (name, version, author) |
| `.claude-plugin/marketplace.json` | Marketplace listing for distribution |

### Command Structure Pattern

Commands follow a consistent YAML frontmatter + Markdown pattern:

```markdown
---
description: Brief description of command
---

# command-name

{Command documentation with behavior steps}
```

### Agent Structure Pattern

Agents use extended frontmatter including tool permissions:

```markdown
---
name: opti-gsd-{agent-name}
description: Agent purpose
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Browser
  - mcp__*
---

# Agent Title

{Agent instructions and protocols}
```

---

## Directory Structure

```
C:\Optimotive-dev\optio-gsd├── .claude-plugin/
│   ├── plugin.json           # Plugin metadata
│   └── marketplace.json      # Marketplace configuration
├── agents/                   # Specialized subagents (11 files)
│   ├── opti-gsd-executor.md
│   ├── opti-gsd-planner.md
│   ├── opti-gsd-debugger.md
│   ├── opti-gsd-verifier.md
│   ├── opti-gsd-project-researcher.md
│   ├── opti-gsd-phase-researcher.md
│   ├── opti-gsd-plan-checker.md
│   ├── opti-gsd-research-synthesizer.md
│   ├── opti-gsd-roadmapper.md
│   ├── opti-gsd-codebase-mapper.md
│   └── opti-gsd-integration-checker.md
├── commands/                 # Slash commands (34 files)
│   ├── help.md
│   ├── init.md
│   ├── new-project.md
│   ├── roadmap.md
│   ├── plan-phase.md
│   ├── execute.md
│   ├── execute-task.md
│   ├── verify.md
│   ├── push.md
│   ├── debug.md
│   ├── status.md
│   ├── resume.md
│   ├── pause.md
│   ├── ci.md
│   ├── context.md
│   ├── archive.md
│   ├── compact.md
│   ├── mode.md
│   ├── start-milestone.md
│   ├── complete-milestone.md
│   ├── add-phase.md
│   ├── insert-phase.md
│   ├── remove-phase.md
│   ├── discuss-phase.md
│   ├── decisions.md
│   ├── issues.md
│   ├── add-todo.md
│   ├── todos.md
│   ├── skills.md
│   ├── mcps.md
│   ├── research.md
│   ├── map-codebase.md
│   ├── whats-new.md
│   └── statusline-setup.md
├── docs/                     # Documentation (currently empty)
├── scripts/                  # Helper scripts
│   ├── gsd-statusline.sh     # Bash statusline script
│   └── gsd-statusline.js     # Node.js statusline script
└── OPTI-GSD-SPEC.md          # Full specification document
```

---

## Key Entry Points

### Commands (Slash Commands)

#### Project Setup
| Command | File | Description |
|---------|------|-------------|
| `/opti-gsd:help` | `commands/help.md` | Display all available commands |
| `/opti-gsd:init` | `commands/init.md` | Initialize in existing project (brownfield) |
| `/opti-gsd:new-project` | `commands/new-project.md` | Create new project with guided setup |
| `/opti-gsd:map-codebase` | `commands/map-codebase.md` | Analyze existing codebase |
| `/opti-gsd:ci` | `commands/ci.md` | Configure CI/CD toolchain |

#### Planning
| Command | File | Description |
|---------|------|-------------|
| `/opti-gsd:roadmap` | `commands/roadmap.md` | Create or view roadmap |
| `/opti-gsd:discuss-phase` | `commands/discuss-phase.md` | Capture decisions before planning |
| `/opti-gsd:plan-phase` | `commands/plan-phase.md` | Generate execution plan |
| `/opti-gsd:add-phase` | `commands/add-phase.md` | Add phase to roadmap |
| `/opti-gsd:insert-phase` | `commands/insert-phase.md` | Insert phase at position |
| `/opti-gsd:remove-phase` | `commands/remove-phase.md` | Remove pending phase |

#### Execution
| Command | File | Description |
|---------|------|-------------|
| `/opti-gsd:execute` | `commands/execute.md` | Execute current phase plan |
| `/opti-gsd:execute-task` | `commands/execute-task.md` | Execute single task |
| `/opti-gsd:push` | `commands/push.md` | Push branch for preview deployment |
| `/opti-gsd:verify` | `commands/verify.md` | Verify phase completion |
| `/opti-gsd:debug` | `commands/debug.md` | Start debugging session |

#### Session Management
| Command | File | Description |
|---------|------|-------------|
| `/opti-gsd:status` | `commands/status.md` | Show current state |
| `/opti-gsd:resume` | `commands/resume.md` | Resume from last session |
| `/opti-gsd:pause` | `commands/pause.md` | Pause with context save |
| `/opti-gsd:context` | `commands/context.md` | Show context usage |
| `/opti-gsd:archive` | `commands/archive.md` | Archive completed phase |
| `/opti-gsd:compact` | `commands/compact.md` | Reduce context footprint |

### Agents (Specialized Subagents)

| Agent | File | Purpose | Spawned By |
|-------|------|---------|------------|
| `opti-gsd-executor` | `agents/opti-gsd-executor.md` | Execute tasks with atomic commits | `/execute` |
| `opti-gsd-planner` | `agents/opti-gsd-planner.md` | Create phase plans | `/plan-phase` |
| `opti-gsd-debugger` | `agents/opti-gsd-debugger.md` | Systematic debugging | `/debug` |
| `opti-gsd-verifier` | `agents/opti-gsd-verifier.md` | Verify phase completion | `/verify` |
| `opti-gsd-project-researcher` | `agents/opti-gsd-project-researcher.md` | Research domain ecosystems | `/new-project` |
| `opti-gsd-phase-researcher` | `agents/opti-gsd-phase-researcher.md` | Research technical domains | `/plan-phase --research` |
| `opti-gsd-plan-checker` | `agents/opti-gsd-plan-checker.md` | Validate plans before execution | `/plan-phase` (auto) |
| `opti-gsd-research-synthesizer` | `agents/opti-gsd-research-synthesizer.md` | Consolidate research | `/new-project` (auto) |
| `opti-gsd-roadmapper` | `agents/opti-gsd-roadmapper.md` | Transform requirements to phases | `/new-project` |
| `opti-gsd-codebase-mapper` | `agents/opti-gsd-codebase-mapper.md` | Analyze brownfield codebases | `/init` |
| `opti-gsd-integration-checker` | `agents/opti-gsd-integration-checker.md` | Verify component integration | `/verify` |

---

## Patterns & Conventions

### State Management Pattern

Projects create a `.gsd/` directory with:

```
.gsd/
├── config.md           # YAML frontmatter configuration
├── PROJECT.md          # Project vision and constraints
├── REQUIREMENTS.md     # REQ-IDs with phase mapping
├── ROADMAP.md          # Phase progress tracking
├── STATE.md            # Compact session state (YAML frontmatter)
├── ISSUES.md           # Issue tracking
├── DECISIONS.md        # Architecture decisions
├── plans/
│   └── phase-XX/
│       ├── plan.md     # XML-structured tasks
│       ├── RESEARCH.md # Discovery findings
│       └── summary.md  # Execution summary
├── archive/            # Completed phases
├── summaries/          # Compact phase summaries (~100 tokens)
├── codebase/           # Brownfield analysis documents
└── debug/              # Debug session state
```

### Task XML Format

Tasks use XML structure for precise parsing:

```xml
<task id="01" wave="1" reqs="DASH-01">
  <files>
    <file action="create">src/components/StatsCard.tsx</file>
  </files>
  <action>Implementation instructions</action>
  <verify>
    <check type="test" cmd="npm test">Tests pass</check>
    <check type="lint" cmd="npm run lint">No lint errors</check>
  </verify>
  <done>Measurable completion criteria</done>
  <skills>test-driven-development</skills>
</task>
```

### Context Management Pattern

| Agent Type | Max Context Budget |
|------------|-------------------|
| Orchestrator | 15% |
| Executor | 50% |
| Planner | 60% |
| Researcher | 70% |

Key pattern: Spawn fresh subagents to maintain context quality.

### Git Workflow Pattern

- **Commit Format:** `{type}({phase}-{task}): {description}`
- **Branch Format:** `{prefix}{milestone-name}` (e.g., `gsd/v1.0`)
- **Types:** feat, fix, docs, chore, refactor, test, style

### Verification Pattern (Three Levels)

1. **Level 1 - Existence:** Does the file exist?
2. **Level 2 - Substantive:** Is it real implementation or stub?
3. **Level 3 - Wired:** Is it connected to the system?

---

## Integration Points

### MCP Integrations

The plugin integrates with external MCPs configured in `.gsd/config.md`:

| MCP Type | Purpose | Config Key |
|----------|---------|------------|
| Database | Supabase, Prisma queries | `mcps: [supabase]` |
| Payments | Stripe operations | `mcps: [stripe]` |
| Browser | E2E testing | `verification_mcps.browser` |
| GitHub | CI status checks | `verification_mcps.github` |
| Context7 | Documentation fetching | (auto-detected) |

### CI/CD Integration

Detected from project files and stored in `.gsd/config.md`:

```yaml
ci:
  package_manager: npm|pnpm|yarn|bun|cargo|go|poetry
  build: {build command}
  test: {test command}
  lint: {lint command}
  typecheck: {typecheck command}
  e2e: {e2e command}
```

### Deployment Platform Integration

Supports preview deployments on:
- Vercel
- Netlify
- Railway
- Render
- Fly.io

---

## Technical Debt & Concerns

### Documentation Gaps

1. **Missing README.md** - No user-facing documentation at root level
2. **Empty docs/ directory** - Stack guides mentioned in spec but not implemented
3. **No examples** - No example `.gsd/` project structure for reference

### Specification Drift

The `OPTI-GSD-SPEC.md` references structure patterns that may not fully align with current implementation:
- Spec references `commands/opti-gsd/` subdirectory (actual: `commands/`)
- Spec shows version 0.1.0 in examples (actual: 0.2.4)

### Missing Test Infrastructure

- No automated tests for command logic
- No validation of XML task parsing
- No CI workflow for the plugin itself

### Potential Improvements

1. **Agent Tool Consistency** - Some agents list `mcp__*` tools, others do not
2. **Error Handling** - No standardized error response format across commands
3. **Version Tracking** - Version appears in multiple files (plugin.json, marketplace.json, help.md uses dynamic)

---

## Workflow Summary

```
┌─────────────────────────────────────────────────────────────┐
│  INIT → ROADMAP → [RESEARCH] → PLAN → EXECUTE → PUSH →     │
│    ↓                                              ↓         │
│  Setup project    Repeat for each phase      VERIFY →      │
│                                                  ↓          │
│                                              RELEASE        │
└─────────────────────────────────────────────────────────────┘
```

### Typical Flow

1. `/opti-gsd:init` or `/opti-gsd:new-project` - Setup
2. `/opti-gsd:roadmap` - Define phases
3. `/opti-gsd:plan-phase N` - Create execution plan
4. `/opti-gsd:execute` - Execute with subagent spawning
5. `/opti-gsd:push` - Deploy preview
6. `/opti-gsd:verify` - Validate completion
7. `/opti-gsd:archive` - Free context

---

## File Statistics

| Category | Count |
|----------|-------|
| Commands | 34 |
| Agents | 11 |
| Scripts | 2 |
| Config Files | 2 |
| Spec Documents | 1 |
| **Total Source Files** | **50** |

---

## Key Findings Summary

1. **Well-structured plugin** - Clear separation between commands, agents, and configuration
2. **Comprehensive agent system** - 11 specialized agents covering planning, execution, verification, debugging, and research
3. **Context-aware design** - Explicit budgets and subagent spawning to maintain quality
4. **CI/CD integration** - Built-in support for multiple deployment platforms
5. **Missing documentation** - No README or user guides at root level
6. **No automated tests** - Plugin has no test coverage
