# opti-gsd Plugin Specification

## Overview

opti-gsd is a Claude Code plugin for spec-driven development with fresh context execution. It orchestrates workflows, manages state, and integrates with ecosystem skills and MCPs.

## Plugin Structure

```
~/.claude/plugins/opti-gsd/
├── plugin.json
├── README.md
├── commands/
│   └── opti-gsd/
│       ├── help.md
│       ├── init.md
│       ├── new-project.md
│       ├── roadmap.md
│       ├── plan-phase.md
│       ├── execute.md
│       ├── execute-task.md
│       ├── start-milestone.md
│       ├── complete-milestone.md
│       ├── status.md
│       ├── resume.md
│       ├── pause.md
│       ├── add-phase.md
│       ├── insert-phase.md
│       ├── decisions.md
│       ├── issues.md
│       ├── skills.md
│       └── mcps.md
└── docs/
    ├── recommended-skills.md
    └── stack-guides/
        ├── nextjs-supabase.md
        └── electron-sqlite.md
```

---

## plugin.json

```json
{
  "name": "opti-gsd",
  "version": "0.1.0",
  "description": "Spec-driven development with fresh context execution",
  "commands": "commands/"
}
```

---

## Project Files

When initialised, creates `.gsd/` in project root:

```
.gsd/
├── config.md
├── PROJECT.md
├── ROADMAP.md
├── STATE.md
├── ISSUES.md
├── DECISIONS.md
└── plans/
    ├── phase-01/
    │   ├── plan.md
    │   └── summary.md
    └── phase-02/
        └── plan.md
```

---

## File Formats

### config.md

```markdown
---
app_type: web
framework: nextjs
base_url: http://localhost:3000

branching: milestone
prefix: gsd/
base: main
commits: conventional

browser:
  enabled: true

skills:
  - test-driven-development
  - systematic-debugging
  - verification-before-completion

mcps:
  - supabase
  - stripe
---
```

### PROJECT.md

```markdown
# Project

## Overview

[One paragraph description]

## Goals

- Goal 1
- Goal 2

## Non-Goals

- What this project is NOT

## Tech Stack

- Framework: Next.js 14
- Database: Supabase
- Payments: Stripe

## Constraints

- Must work offline
- Must support IE11
```

### ROADMAP.md

```markdown
# Roadmap

## Milestone: v1.0

### Phase 1: Foundation

- [x] Complete
- Setup project structure, auth, database schema

### Phase 2: Core Features

- [ ] In progress
- User dashboard, settings, profile

### Phase 3: Payments

- [ ] Not started
- Stripe integration, subscription management
```

### STATE.md

```markdown
# State

## Current

- Milestone: v1.0
- Phase: 2
- Task: 3 of 5
- Branch: gsd/v1.0

## Last Session

- Date: 2026-01-18T14:30:00Z
- Stopped at: Phase 2, Task 3
- Notes: Dashboard layout complete, starting stats component

## Decisions

- 2026-01-15: Use jose not jsonwebtoken (CommonJS issues)
- 2026-01-16: Supabase RLS over custom auth middleware

## Usage

- Phase 1: 45k tokens
- Phase 2: 80k tokens (in progress)
```

### plans/phase-XX/plan.md

```markdown
# Phase 2: Core Features

## Task 1: Create dashboard layout

- **Files:** src/app/dashboard/page.tsx, src/components/DashboardLayout.tsx
- **Action:** Responsive grid layout with sidebar, header, main content area
- **Skills:** none
- **Verify:**
  - Browser: Page renders at /dashboard
  - Browser: Responsive at mobile/tablet/desktop
  - Browser: Console has no errors
- **Done:** Dashboard layout renders correctly

## Task 2: Create stats card component

- **Files:** src/components/StatsCard.tsx, src/components/StatsCard.test.tsx
- **Action:** Reusable card showing metric with label, value, trend indicator
- **Skills:** test-driven-development
- **Verify:**
  - Tests pass
  - Browser: Component renders in Storybook
- **Done:** StatsCard works with all variants

## Task 3: Create user stats API

- **Files:** src/app/api/stats/route.ts, src/app/api/stats/route.test.ts
- **Action:** GET endpoint returning user stats from Supabase
- **Skills:** test-driven-development
- **Verify:**
  - Tests pass
  - Supabase: Query executes correctly
- **Done:** API returns correct stats
```

### ISSUES.md

```markdown
# Issues

## Open

### ISS-001

- **Severity:** medium
- **Found:** Phase 2, Task 2
- **Description:** Auth redirect doesn't preserve return URL
- **Context:** User lands on /login instead of intended page after auth

### ISS-002

- **Severity:** low
- **Found:** Phase 2, Task 3
- **Description:** API missing pagination headers
- **Context:** GET /api/users returns data but no total count

## Resolved

### ISS-003

- **Severity:** high
- **Found:** Phase 1, Task 3
- **Resolved:** Phase 1.1
- **Description:** JWT expiry too short
- **Fix:** Changed from 1h to 24h
```

---

## Commands

### /opti-gsd:help

Display all available commands with descriptions.

### /opti-gsd:init

Initialise opti-gsd in existing project.

**Behaviour:**

1. Detect git repo, default branch
2. Check package.json for framework detection
3. Infer app_type from framework
4. Scan ~/.claude/skills/ and ~/.claude/plugins/ for installed skills
5. Ask user about MCPs/services
6. Confirm or ask app_type if ambiguous
7. Create .gsd/ directory structure
8. Create config.md with detected settings
9. Git commit: "chore: initialise opti-gsd"

### /opti-gsd:new-project

Create new project with guided setup.

**Behaviour:**

1. Ask: What are you building? (web/desktop/mobile/api/cli/library)
2. Ask: What framework?
3. Ask: What services/MCPs?
4. Ask project questions until fully understood:
   - What is this project?
   - What are the main goals?
   - What are the constraints?
   - What is explicitly out of scope?
5. Create .gsd/ directory
6. Create config.md
7. Create PROJECT.md
8. Git commit: "chore: initialise opti-gsd project"

### /opti-gsd:roadmap

Create or view roadmap.

**Behaviour (create):**

1. Read PROJECT.md
2. Ask: What milestones do you see?
3. For v1.0: What phases needed?
4. Create ROADMAP.md with phases
5. Create phase directories in .gsd/plans/
6. Create STATE.md
7. Git commit: "docs: create roadmap"

**Behaviour (view):**

1. Display ROADMAP.md with status indicators

### /opti-gsd:plan-phase [N]

Generate execution plan for phase.

**Behaviour:**

1. Read PROJECT.md, ROADMAP.md, STATE.md
2. Read ISSUES.md (known issues to avoid)
3. Read config.md (available skills, MCPs, app_type)
4. Analyse phase requirements
5. Break into 2-4 atomic tasks
6. For each task, determine:
   - Files to modify
   - Action to take
   - Relevant skills (only if applicable)
   - Verification steps:
     - Code verification (tests, lint)
     - Browser verification (if web/desktop and UI task)
     - MCP verification (if data/payment task)
   - Done condition
7. Create .gsd/plans/phase-XX/plan.md
8. Git commit: "docs: plan phase X"

### /opti-gsd:execute

Execute current phase plan.

**Behaviour:**

1. Read config.md, STATE.md
2. Find current phase from STATE.md
3. Read .gsd/plans/phase-XX/plan.md
4. For each task:
   a. Build subagent prompt (see Subagent Prompt Template)
   b. Spawn subagent via Task tool
   c. Wait for completion
   d. Parse result:
   - If TASK COMPLETE:
     - git add [files]
     - git commit -m "{type}({phase}-{task}): {description}"
     - Update STATE.md
   - If TASK FAILED:
     - Log to STATE.md
     - Stop execution
     - Report failure
   - If NEW ISSUE reported:
     - Append to ISSUES.md
5. After all tasks:
   - Create summary.md
   - Update STATE.md: phase complete
   - Update ROADMAP.md: mark phase complete

### /opti-gsd:execute-task [N]

Execute single task from current phase.

**Behaviour:**
Same as execute but for single task only.

### /opti-gsd:start-milestone [name]

Start new milestone branch.

**Behaviour:**

1. Check for uncommitted changes (abort if any)
2. Create branch: {prefix}{milestone-name}
3. Update STATE.md with branch name
4. Git commit: "chore: start milestone {name}"

### /opti-gsd:complete-milestone

Complete current milestone.

**Behaviour:**

1. Verify all phases complete
2. Generate changelog entry from summaries
3. Push branch
4. Create PR (if gh cli available) or instruct user
5. Tag release
6. Update STATE.md
7. Archive milestone to .gsd/milestones/

### /opti-gsd:status

Show current state and next action.

**Behaviour:**

1. Read STATE.md, ROADMAP.md, config.md
2. Display:
   - Current milestone, phase, task
   - Current branch
   - Progress (X/Y phases, X/Y tasks)
   - Active skills
   - Active MCPs
   - Open issues (count by severity)
   - Last session info
3. Suggest next action

### /opti-gsd:resume

Resume from last session.

**Behaviour:**

1. Read STATE.md
2. Show where we left off
3. Offer to continue execution

### /opti-gsd:pause

Pause work with context save.

**Behaviour:**

1. Update STATE.md with:
   - Current timestamp
   - Current position
   - Any notes about in-progress work
2. Git commit: "wip: pause at phase X task Y"

### /opti-gsd:add-phase

Add phase to end of current milestone.

**Behaviour:**

1. Ask: What does this phase accomplish?
2. Append to ROADMAP.md
3. Create phase directory
4. Git commit: "docs: add phase X"

### /opti-gsd:insert-phase [N]

Insert urgent phase after phase N.

**Behaviour:**

1. Ask: What urgent work?
2. Insert as phase N.1 in ROADMAP.md
3. Create phase directory
4. Git commit: "docs: insert phase X.1"

### /opti-gsd:decisions

Log architectural decision.

**Behaviour:**

1. Ask: What decision?
2. Ask: Why this choice?
3. Append to DECISIONS.md
4. Append summary to STATE.md decisions section
5. Git commit: "docs: decision - {summary}"

### /opti-gsd:issues

Review and manage issues.

**Behaviour:**

1. Read ISSUES.md
2. Analyse against current codebase
3. Report:
   - Which appear resolved? → Offer to close
   - Which are urgent? → Offer to insert fix phase
   - Which fit upcoming phases? → Note for planning
4. Execute chosen actions

### /opti-gsd:skills

Show detected skills.

**Behaviour:**

1. Scan ~/.claude/skills/ and plugins
2. Show installed skills
3. Show which are active in config
4. Suggest relevant skills not installed

### /opti-gsd:mcps

Show configured MCPs.

**Behaviour:**

1. Read config.md
2. Show active MCPs
3. Offer to add/remove

---

## Subagent Prompt Template

When /opti-gsd:execute spawns a subagent for a task:

```markdown
You are a focused implementation agent. Complete ONLY this task.

# Task

{task.action}

# Files

Only modify these files:
{for file in task.files}

- {file}
  {/for}

{if task.skills}

# Active Skills

The following skills apply to this task. Invoke and follow them exactly.

{for skill in task.skills}

## {skill.name}

{skill.instructions}

{/for}
{/if}

# Verification

Complete ALL verification steps before reporting done:

{for step in task.verify}

- {step}
  {/for}

# Done Condition

{task.done}

# Rules

1. Only modify listed files
2. Follow active skills exactly (if any)
3. Complete all verification steps
4. Do not expand scope
5. When complete, report exactly one of:
   - TASK COMPLETE
   - TASK FAILED: {reason}
6. If you discover issues unrelated to this task, report at end:
   - NEW ISSUE: [{severity}] {description}

{if config.browser.enabled}

# Browser Testing

Base URL: {config.base_url}
Use browser to verify UI changes. Check console for errors.
{/if}

{if task.mcps}

# Available MCPs

{for mcp in task.mcps}

- **{mcp}**: Use for verification
  {/for}
  {/if}

{if issues.open}

# Known Issues

These issues exist. Don't make them worse. Don't block on them.
{for issue in issues.open}

- {issue.id}: {issue.description} ({issue.severity})
  {/for}
  {/if}
```

---

## App Type Detection

### From package.json

| Dependency      | Framework    | app_type |
| --------------- | ------------ | -------- |
| next            | Next.js      | web      |
| vite            | Vite         | web      |
| remix           | Remix        | web      |
| nuxt            | Nuxt         | web      |
| @sveltejs/kit   | SvelteKit    | web      |
| electron        | Electron     | desktop  |
| @tauri-apps/api | Tauri        | desktop  |
| react-native    | React Native | mobile   |
| expo            | Expo         | mobile   |
| express         | Express      | api      |
| fastify         | Fastify      | api      |
| hono            | Hono         | api      |
| @nestjs/core    | NestJS       | api      |
| commander       | Commander    | cli      |
| yargs           | Yargs        | cli      |

### Default base_url by app_type

| app_type | base_url                |
| -------- | ----------------------- |
| web      | http://localhost:3000   |
| desktop  | (launch command)        |
| api      | http://localhost:3000   |
| mobile   | (none - manual testing) |
| cli      | (none)                  |
| library  | (none)                  |

---

## Skill/MCP Relevance Rules

### When to apply skills

| Task type              | Relevant skills                               |
| ---------------------- | --------------------------------------------- |
| New feature with tests | test-driven-development                       |
| Bug fix                | systematic-debugging, test-driven-development |
| Refactoring            | verification-before-completion                |
| Config change          | none                                          |
| Documentation          | none                                          |
| Pure UI (no logic)     | none                                          |

### When to apply browser verification

| Condition                              | Browser verification |
| -------------------------------------- | -------------------- |
| app_type: web AND files include UI     | Yes                  |
| app_type: desktop AND files include UI | Yes                  |
| app_type: api                          | No                   |
| Files are only .ts/.js (no .tsx/.jsx)  | No                   |
| Files are only config                  | No                   |

### When to apply MCP verification

| Task involves       | MCP         |
| ------------------- | ----------- |
| Database read/write | supabase    |
| User auth/sessions  | supabase    |
| Payment processing  | stripe      |
| Email sending       | resend      |
| File storage        | supabase/s3 |
| Pure frontend       | none        |
| Pure logic          | none        |

---

## Git Conventions

### Commit messages

Format: `{type}({phase}-{task}): {description}`

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation
- chore: Maintenance
- refactor: Code refactoring
- test: Tests only
- style: Formatting only

Examples:

- `feat(02-01): create dashboard layout`
- `fix(02.1-01): preserve auth redirect URL`
- `docs(03-02): add API documentation`

### Branch naming

Format: `{prefix}{milestone-name}`

Examples:

- `gsd/v1.0`
- `gsd/v1.1-hotfix`
- `gsd/v2.0-redesign`

---

## Error Handling

### Task failure

1. Log failure to STATE.md
2. Do not commit partial work
3. Stop execution
4. Report to user with:
   - Which task failed
   - Failure reason
   - Suggested fix

### Verification failure

1. Treat as task failure
2. Include which verification step failed
3. Include actual vs expected result

### Git conflicts

1. Detect before starting task
2. Abort execution
3. Instruct user to resolve manually

---

## Build Order

Phase 1: Scaffold

- plugin.json
- help.md command

Phase 2: Initialisation

- init.md
- new-project.md
- File creation logic

Phase 3: Planning

- roadmap.md
- plan-phase.md

Phase 4: Execution

- execute.md
- execute-task.md
- Subagent prompt generation
- State updates
- Git commits

Phase 5: Git workflow

- start-milestone.md
- complete-milestone.md

Phase 6: Session management

- status.md
- resume.md
- pause.md

Phase 7: Utilities

- add-phase.md
- insert-phase.md
- decisions.md
- issues.md
- skills.md
- mcps.md

Phase 8: Documentation

- README.md
- Stack guides

---

## Agents

Defined in plugin's agents/ directory. These are specialized subagents spawned by commands.

```
~/.claude/plugins/opti-gsd/
├── plugin.json
├── commands/
├── agents/
│   ├── task-executor.md
│   ├── planner.md
│   ├── researcher.md
│   ├── codebase-mapper.md
│   └── reviewer.md
└── docs/
```

### task-executor.md

Executes individual tasks from plans.

```markdown
---
name: task-executor
description: Focused implementation agent for single task execution
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Browser
  - mcp__supabase
  - mcp__stripe
---

You are a focused implementation agent. Complete ONLY the task provided.

## Rules

1. Only modify files specified in the task
2. Follow active skills exactly (if provided)
3. Complete all verification steps before reporting done
4. Do not expand scope beyond the task
5. Do not refactor unrelated code
6. Do not add features not specified

## Output Format

When complete, report exactly ONE of:

TASK COMPLETE

or

TASK FAILED: {reason}

## Issue Discovery

If you discover issues UNRELATED to this task, report at end:

NEW ISSUE: [{severity}] {description}

Severities: critical, high, medium, low

Do not fix unrelated issues. Log and continue.
```

### planner.md

Creates phase plans from roadmap.

```markdown
---
name: planner
description: Creates atomic task plans for phases
tools:
  - Read
  - Glob
  - Grep
skills:
  - test-driven-development
  - systematic-debugging
---

You are a planning agent. Create detailed execution plans.

## Input

You will receive:

- PROJECT.md (goals, constraints)
- ROADMAP.md (phase description)
- config.md (app_type, skills, MCPs)
- ISSUES.md (known issues to avoid)
- Codebase context (if brownfield)

## Output

Create a plan.md with 2-4 atomic tasks.

For each task:

1. **Files** - Only files that need modification
2. **Action** - Clear, specific instructions
3. **Skills** - Only if applicable to task type (see rules)
4. **Verify** - Concrete verification steps
5. **Done** - Measurable completion criteria

## Skill Assignment Rules

Apply test-driven-development when:

- Creating new features with logic
- Fixing bugs
- Files include test files

Apply systematic-debugging when:

- Fixing bugs
- Investigating issues

Apply NO skills when:

- Config changes
- Documentation
- Pure styling
- Simple file moves

## Verification Rules

Include browser verification when:

- app_type is web or desktop
- Task modifies UI files (.tsx, .jsx, .vue, .svelte)

Include MCP verification when:

- Task involves database operations → supabase
- Task involves payments → stripe
- Task involves auth → supabase

Include only code verification when:

- Backend logic only
- Config changes
- Library code

## Task Sizing

Each task should:

- Take 10-30 minutes for a human
- Touch 1-3 files
- Have clear success criteria
- Be independently verifiable

If a task seems larger, split it.
```

### researcher.md

Researches domains and ecosystems before planning.

```markdown
---
name: researcher
description: Researches domains, libraries, and best practices
tools:
  - Read
  - WebSearch
  - WebFetch
  - Glob
---

You are a research agent. Investigate domains before implementation.

## Purpose

Gather knowledge about:

- Best libraries for the task
- Common patterns and pitfalls
- How experts build this type of thing
- Compatibility issues
- Security considerations

## Output

Create RESEARCH.md with:

### Recommended Approach

[Summary of best approach]

### Libraries

| Library | Purpose | Why chosen |
| ------- | ------- | ---------- |
| ...     | ...     | ...        |

### Patterns

[Common patterns for this domain]

### Pitfalls

[Things to avoid, common mistakes]

### References

[Links to docs, examples]

## Rules

1. Prefer well-maintained libraries (recent commits, active issues)
2. Prefer libraries with TypeScript support
3. Note any known compatibility issues
4. Note security considerations
5. Be specific, not generic
```

### codebase-mapper.md

Analyses existing codebases for brownfield projects.

```markdown
---
name: codebase-mapper
description: Analyses existing codebase structure and patterns
tools:
  - Read
  - Glob
  - Grep
  - Bash
---

You are a codebase analysis agent. Map an existing codebase.

## Output

Create 7 documents in .gsd/codebase/:

### STACK.md

- Languages and versions
- Frameworks
- Key dependencies
- Dev dependencies
- Build tools

### ARCHITECTURE.md

- High-level structure
- Design patterns used
- Data flow
- State management
- API patterns

### STRUCTURE.md

- Directory layout
- Where things live
- Naming conventions
- Key files and their purpose

### CONVENTIONS.md

- Code style
- Naming patterns
- Import conventions
- Error handling patterns
- Comment style

### TESTING.md

- Test framework
- Test patterns
- Coverage approach
- Test file locations
- Mocking patterns

### INTEGRATIONS.md

- External services
- API connections
- Third-party SDKs
- Environment variables

### CONCERNS.md

- Tech debt
- Known issues
- Fragile areas
- Missing tests
- Security concerns

## Rules

1. Be factual, not judgmental
2. Note actual patterns, not ideal patterns
3. Include file paths as examples
4. Note inconsistencies (different patterns in different areas)
```

### reviewer.md

Verifies completed work before milestone completion.

```markdown
---
name: reviewer
description: Reviews completed phases for quality and completeness
tools:
  - Read
  - Glob
  - Grep
  - Bash
  - Browser
---

You are a review agent. Verify work meets requirements.

## Input

- ROADMAP.md (what was planned)
- Phase summaries (what was done)
- Current codebase

## Checks

### Completeness

- All planned features implemented?
- All tasks marked complete?
- Any skipped items?

### Quality

- Tests passing?
- No console errors?
- No TypeScript errors?
- Linting clean?

### Functionality

- Features work as specified?
- Edge cases handled?
- Error states handled?

### Issues

- Any new issues introduced?
- Any existing issues made worse?

## Output

REVIEW PASSED

or

REVIEW FAILED:

- [ ] Issue 1
- [ ] Issue 2
- [ ] Issue 3

Recommendation: {fix issues | ship anyway | needs discussion}
```

---

## Agent Invocation

### From /opti-gsd:execute

```markdown
For each task in plan:

1. Load task-executor agent
2. Inject:
   - Task details
   - Active skills (full content)
   - Available MCPs
   - Known issues
   - Browser config (if applicable)
3. Spawn via Task tool
4. Await completion
5. Parse result
6. Update state
```

### From /opti-gsd:plan-phase

```markdown
1. Load planner agent
2. Inject:
   - PROJECT.md
   - ROADMAP.md (current phase)
   - config.md
   - ISSUES.md
   - Codebase docs (if exist)
3. Spawn via Task tool
4. Receive plan.md
5. Save to .gsd/plans/phase-XX/
```

### From /opti-gsd:init (brownfield)

```markdown
1. Load codebase-mapper agent
2. Spawn via Task tool
3. Receive 7 analysis documents
4. Save to .gsd/codebase/
```

### From /opti-gsd:plan-phase (with research flag)

```markdown
1. Load researcher agent
2. Inject phase description
3. Spawn via Task tool
4. Receive RESEARCH.md
5. Load planner agent with RESEARCH.md as context
6. Continue planning
```

### From /opti-gsd:complete-milestone

```markdown
1. Load reviewer agent
2. Inject:
   - ROADMAP.md
   - All phase summaries
   - Current codebase access
3. Spawn via Task tool
4. If REVIEW PASSED: proceed with completion
5. If REVIEW FAILED: report issues, abort completion
```

---

## Parallel Execution

For independent tasks, spawn multiple task-executor agents simultaneously.

### Detection

Tasks are independent if:

- No shared files
- No import dependencies between output files
- No sequential data requirements

### Implementation

```markdown
Phase plan marks parallel groups:

## Parallel Group A

- Task 1: Stats card component (files: src/components/StatsCard.tsx)
- Task 2: Activity feed component (files: src/components/ActivityFeed.tsx)
- Task 3: Chart wrapper (files: src/components/Chart.tsx)

## Sequential (after Group A)

- Task 4: Dashboard layout (files: src/app/dashboard/page.tsx)
  - Imports from tasks 1, 2, 3
```

Orchestrator:

1. Spawn tasks 1, 2, 3 simultaneously
2. Await all complete
3. Spawn task 4
4. Await complete
