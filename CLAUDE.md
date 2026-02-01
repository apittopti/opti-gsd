# Claude Code Instructions for opti-gsd

This is the opti-gsd source repository. You are using opti-gsd to develop opti-gsd (bootstrapping).

## Bootstrapping Model

**Two versions exist:**

1. **Installed version** — The stable version providing `/opti-gsd:*` skills (in `~/.claude/` or user settings)
2. **Source version** — This repository you are modifying

**Key rules:**
- The installed version guides your workflow (skills, agents)
- The source version is what you're changing
- After completing a milestone, the user should update: `/plugin update opti-gsd`
- Never modify installed files directly — only modify source, then update plugin

## Workflow

**Flow:** INIT → ROADMAP → PLAN → EXECUTE → REVIEW → VERIFY → COMPLETE

**Before making code changes:**
1. Run `/opti-gsd:status` to see current state
2. Ensure on milestone branch (never master/main)
3. Follow the flow above

## Skills (v3.0)

| Skill | Use For |
|-------|---------|
| `/opti-gsd:status` | Current state and next action |
| `/opti-gsd:init` | Initialize in existing project |
| `/opti-gsd:new-project` | Scaffold new project |
| `/opti-gsd:roadmap` | Create/modify delivery roadmap |
| `/opti-gsd:plan` | Plan current phase |
| `/opti-gsd:execute` | Execute phase (wave parallelism) |
| `/opti-gsd:review` | AI-powered code review |
| `/opti-gsd:verify` | Automated verification |
| `/opti-gsd:push` | Push for CI/preview |
| `/opti-gsd:complete` | Complete milestone, create PR |
| `/opti-gsd:rollback` | Rollback to checkpoint |
| `/opti-gsd:debug` | Systematic debugging |
| `/opti-gsd:research` | Research a topic |
| `/opti-gsd:add-feature` | Capture feature idea |
| `/opti-gsd:add-story` | Capture user story |
| `/opti-gsd:add-issue` | Capture bug/issue |
| `/opti-gsd:quick` | Quick ad-hoc task |
| `/opti-gsd:help` | Show all commands |

## Agents

- **opti-gsd-planner** — Generates phase plans with wave-based parallelism
- **opti-gsd-executor** — Executes single tasks with atomic commits
- **opti-gsd-researcher** — Investigates technical topics
- **opti-gsd-verifier** — Verifies phase completion
- **opti-gsd-reviewer** — Reviews code changes against plan

## Conventions

**Phase directories:** Always zero-padded to 2 digits: `phase-01`, `phase-02`, `phase-10`.
State.json stores phase as integer, directory uses zero-pad: phase 1 → `phase-01`.

**Directory structure:**
- `.opti-gsd/` — Main workflow directory
  - `stories/` — User stories (US{NNN}.md)
  - `issues/` — Bug tracking (ISS{NNN}.md)
  - `features/` — Feature ideas (F{NNN}.md)
  - `plans/` — Phase plans (`phase-01/`, `phase-02/`, etc.)
  - `research/` — Research outputs

## Version Management

**CRITICAL: ALL three version files MUST be updated together on EVERY push to master.**

1. `package.json` — `"version"` field
2. `.claude-plugin/plugin.json` — `"version"` field
3. `.claude-plugin/marketplace.json` — `"version"` field in plugins array

All three MUST have identical version strings.

- **PATCH** (3.0.0 → 3.0.1): Bug fixes, small changes
- **MINOR** (3.0.0 → 3.1.0): New skills, features
- **MAJOR** (3.0.0 → 4.0.0): Breaking changes
