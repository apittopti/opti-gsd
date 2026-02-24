---
description: View or update opti-gsd project configuration — CI commands, execution mode, branching, deployment
disable-model-invocation: true
allowed-tools: Read, Write, Edit, AskUserQuestion
argument-hint: "[view|mode|ci|branching|deployment] [value]"
---

# Configure opti-gsd

View or modify `.opti-gsd/config.json` interactively.

## Arguments

- No args → display current configuration
- `mode interactive|autonomous` → set execution mode
- `ci lint|typecheck|test|build|e2e <command>` → set a CI command (use `null` to clear)
- `branching on|off` → enable/disable branch enforcement
- `deployment <platform> [preview_url]` → set deployment config

## Step 0: Validate

Check `.opti-gsd/config.json` exists. If not:
```
⚠️ opti-gsd Not Initialized
─────────────────────────────────────
No .opti-gsd/config.json found.
→ Run /opti-gsd:init to initialize the project first.
```

## Step 1: View Configuration

If no arguments (or `view`), read and display current config:

```
opti-gsd Configuration
══════════════════════════════════════════════════════════════

Project:
  Name:       {project.name}
  Type:       {project.type}
  Framework:  {project.framework || "none"}
  Language:   {project.language}

Execution Mode: {mode}

CI Commands:
  lint:       {ci.lint || "not set"}
  typecheck:  {ci.typecheck || "not set"}
  test:       {ci.test || "not set"}
  build:      {ci.build || "not set"}
  e2e:        {ci.e2e || "not set"}

Branching:
  Enabled:    {branching.enabled}
  Pattern:    {branching.pattern}
  Protected:  {branching.protected}

Deployment:
  Platform:   {deployment.platform || "not set"}
  Preview:    {deployment.preview_url || "not set"}

Testing:
  Always test: {testing.always_test}
  Never test:  {testing.never_test}
══════════════════════════════════════════════════════════════
```

After displaying, **use the `AskUserQuestion` tool** to prompt:
`Change anything? (mode / ci / branching / deployment / done)`

**Do NOT end without prompting.**

## Step 2: Apply Changes

### Mode

Set `mode` field:
- `interactive` — pause between waves during execution (recommended)
- `autonomous` — run all waves without stopping

```json
{ "mode": "interactive" }
```

### CI Commands

Set individual CI command:
```json
{ "ci": { "lint": "npm run lint" } }
```

Use `null` to clear a command:
```json
{ "ci": { "e2e": null } }
```

### Branching

Toggle branch enforcement:
```json
{ "branching": { "enabled": true } }
```

### Deployment

Set deployment platform and optional preview URL:
```json
{
  "deployment": {
    "platform": "vercel",
    "preview_url": "https://{branch}.my-app.vercel.app"
  }
}
```

## Step 3: Save and Confirm

After each change:
1. Write the updated config.json
2. Display the changed field
3. **Use AskUserQuestion** to ask: `Change anything else? (mode / ci / branching / deployment / done)`

When user says **"done"**, display:
```
✓ Configuration Updated
─────────────────────────────────────
Changes saved to .opti-gsd/config.json
```

**Do NOT commit config changes** — config edits are local preferences, not workflow state.
