---
name: new-project
description: Scaffold a new project with opti-gsd workflow from scratch
disable-model-invocation: true
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

## Step 5: Initial Commit

```bash
git add -A
git commit -m "chore: scaffold {name} with opti-gsd

- {type} project structure
- opti-gsd workflow initialized
- Ready for roadmap planning"
```

## Step 6: Report

```
✓ Project Created
─────────────────────────────────────
Name: {name}
Type: {type}
Branch: gsd/v1.0

→ Run /opti-gsd:roadmap to plan your delivery phases
```
