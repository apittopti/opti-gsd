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
