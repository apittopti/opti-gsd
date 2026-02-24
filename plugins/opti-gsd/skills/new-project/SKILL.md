---
description: Scaffold a new project with opti-gsd workflow from scratch
disable-model-invocation: true
allowed-tools: Read, Glob, Bash, Write, Edit, AskUserQuestion
---

# New Project

Scaffold a brand new project with opti-gsd workflow built in.

## Step 1: Gather Requirements

Ask the user:
```
What are you building?
  Name:
  Type: (nextjs, react, node, python, rust, go, other)
  Description:
```

## Step 2: Scaffold Project

Based on type, create appropriate project structure using standard tooling:
- **nextjs**: `npx create-next-app@latest`
- **react**: `npm create vite@latest`
- **node**: `npm init -y`
- **python**: Create `pyproject.toml` + `src/` + `tests/`
- Other: Basic directory structure with README.md

## Step 3: Initialize Git

```bash
git init
git checkout -b gsd/v1.0
```

## Step 4: Initialize opti-gsd

Run the same flow as `/opti-gsd:init` (create `.opti-gsd/`, config.json, state.json).

Set milestone in state.json:
```json
{
  "milestone": "v1.0",
  "branch": "gsd/v1.0"
}
```

## Step 4b: UI/UX Design System

**For web application projects** (nextjs, react, vue, angular, svelte, astro), run the UI setup from init Step 5b — ask about color scheme, animations, theme style, dark mode, and component library. Save `ui-config.json` and generate `ui-guide.md` following the same rules as the init skill.

**For non-web projects**, skip this step.

## Step 5: CLAUDE.md

Create a project `CLAUDE.md` with opti-gsd workflow instructions (since this is a new project, no need to check for existing content):

```markdown
## opti-gsd Workflow

This project uses **opti-gsd** for spec-driven development. You don't need to remember any commands — just start working.

A hook runs on every message that reads the project state and tells you what to do next. Follow the SKILL.md file it points you to.

The workflow is: **INIT → ROADMAP → PLAN → EXECUTE → REVIEW → VERIFY → COMPLETE**

The hook handles routing automatically. At decision points you'll be asked to confirm before proceeding — answer those questions to keep the flow going.

**Useful manual commands:**
- `/opti-gsd:status` — see where you are
- `/opti-gsd:quick` — do something outside the main flow
- `/opti-gsd:debug` — systematic debugging
- `/opti-gsd:config` — change project settings
- `/opti-gsd:help` — see all commands

**Protected branches:** master, main, production, prod — all changes via milestone branches and PRs.
```

## Step 6: Initial Commit

```bash
git add -A
git commit -m "chore: scaffold {name} with opti-gsd

- {type} project structure
- opti-gsd workflow initialized
- Ready for roadmap planning"
```

## Step 7: Report

```
✓ Project Created
─────────────────────────────────────
Name: {name}
Type: {type}
Branch: gsd/v1.0

→ Run /opti-gsd:roadmap to plan your delivery phases
```
