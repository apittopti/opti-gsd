# Roadmap: v0.8.1

## Overview
Bug fix release to resolve plugin path resolution issues in help and whats-new commands.

## Milestone: v0.8.1

### Phase 1: Fix Plugin Path Resolution
**Goal:** Use `${CLAUDE_PLUGIN_ROOT}` for reliable plugin file access

**Problem:** Commands like `/opti-gsd:help` search multiple directories before finding `plugin.json`, causing errors and noise.

**Solution:** Update commands to use `${CLAUDE_PLUGIN_ROOT}` variable which Claude Code provides to plugins.

**Files:**
- `commands/help.md` - Update plugin.json path references
- `commands/whats-new.md` - Update plugin.json path reference

**Acceptance Criteria:**
- [ ] Help command reads plugin.json without directory search errors
- [ ] Whats-new command reads plugin.json without directory search errors
- [ ] Both commands use `${CLAUDE_PLUGIN_ROOT}/.claude-plugin/plugin.json`
