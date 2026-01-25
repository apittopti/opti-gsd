# Changelog: v2.1.0 - Tool Usage Observability

**Released:** 2026-01-25

## Summary

This release adds visibility into which tools (especially MCP tools) subagents use during workflow execution. Users can now track tool usage per task and view aggregated statistics.

## Features

### Tool Usage Logging (Phase 1)
- PostToolUse hook captures every tool call automatically
- Logs include tool name, timestamp, and task ID attribution
- Session grouping with 30-minute timeout detection
- Atomic write pattern prevents log corruption

### Usage Reporting (Phase 2)
- New `/opti-gsd:tools usage` command displays visual summaries
- Filter by task (`--task=T01`), tool type (`--type=mcp`), or session
- Unicode bar charts for visual representation
- JSON output mode for scripting (`--format=json`)

### Executor Integration (Phase 3)
- Task completion messages now include tool count
- Phase summaries include per-task tool breakdown
- Aggregate statistics: total calls, built-in vs MCP percentage

## Bug Fixes

### ISS001: Clickable Commands
Commands in "Next steps:" sections were inside markdown code blocks, making them non-clickable in terminal output. Fixed in 14 files.

### ISS002: Plugin → CLI Tool Terminology
Documentation incorrectly referred to opti-gsd as a "plugin". Updated to reflect that it's now a CLI tool installed via `npx opti-gsd`.

## Files Added

- `scripts/log-tool-usage.js` - Tool call logging script
- `scripts/analyze-tool-usage.js` - Usage analysis with filtering
- `hooks/hooks.json` - PostToolUse hook configuration

## Files Modified

- `commands/opti-gsd/tools.md` - Added usage subcommand documentation
- `agents/opti-gsd/opti-gsd-executor.md` - Added tool usage tracking sections
- `.gitignore` - Excludes tool-usage.json from version control
- 14 command files - Fixed clickable commands issue
- `CLAUDE.md`, `README.md`, `codebase.md` - Updated terminology

## Technical Notes

- Tool usage data stored in `.opti-gsd/tool-usage.json` (gitignored)
- MCP tools identified by `mcp__` prefix
- Built-in tools: Read, Edit, Write, Bash, Grep, Glob, Task, WebFetch, WebSearch

## Upgrade Instructions

Run the following to get v2.1.0:

```bash
npx github:apittopti/opti-gsd init
```

No migration needed - new features are additive.
