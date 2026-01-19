# Claude Code Instructions for opti-gsd

This is the opti-gsd plugin repository. When working on this codebase, always use the opti-gsd workflow, skills, and agents.

## Workflow Requirements

**Before making any changes to this codebase:**

1. Run `/opti-gsd:status` to understand current project state
2. Use `/opti-gsd:roadmap` to view or create the project roadmap
3. For new features or significant changes, use `/opti-gsd:plan-phase` to create an executable plan
4. Execute changes using `/opti-gsd:execute` for wave-based parallel execution with fresh context

## Key Commands

| Command | Use For |
|---------|---------|
| `/opti-gsd:status` | Check current state and next suggested action |
| `/opti-gsd:roadmap` | View/create project roadmap |
| `/opti-gsd:plan-phase` | Generate executable plan for a phase |
| `/opti-gsd:execute` | Execute current phase plan |
| `/opti-gsd:verify` | Verify phase completion |
| `/opti-gsd:add-idea` | Capture ideas without interrupting work |
| `/opti-gsd:add-story` | Capture user/client requests |
| `/opti-gsd:debug` | Start systematic debugging session |
| `/opti-gsd:research` | Research best practices for a topic |

## Available Agents

Use these specialized agents for complex tasks:

- **opti-gsd-planner** - Creates executable phase plans
- **opti-gsd-executor** - Autonomous plan execution with atomic commits
- **opti-gsd-verifier** - Goal-backward verification of phase completion
- **opti-gsd-debugger** - Systematic bug investigation
- **opti-gsd-codebase-mapper** - Analyzes existing codebases
- **opti-gsd-integration-checker** - Verifies component integration
- **opti-gsd-phase-researcher** - Investigates technical domains before planning
- **opti-gsd-project-researcher** - Investigates domain ecosystems

## Ad-hoc Changes

Even for small ad-hoc changes:

1. Consider if it should be captured as an idea (`/opti-gsd:add-idea`) or story (`/opti-gsd:add-story`)
2. For bug fixes, use `/opti-gsd:debug` for systematic investigation
3. After changes, consider running `/opti-gsd:verify` to ensure nothing broke

## Version Management

When bumping versions:
- Update `plugin.json` version
- Update `marketplace.json` version (they must stay in sync)
- Create a git tag for releases
