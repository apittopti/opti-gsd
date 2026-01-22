# Changelog: v0.8.3

## Summary
Convert stop hook from command-based to prompt-based to fix path resolution issues.

## Fixes
- **Fixed:** Stop hook no longer fails with "No such file or directory" error
- **Fixed:** Hook now works reliably across all environments

## Technical
- Converted `hooks/hooks.json` from command type to prompt type
- Removed dependency on external bash script
- Claude now checks STATE.md directly for active loops
- The `stop-hook.sh` script is no longer used (can be removed in future)

## Files Changed
- `hooks/hooks.json`
- `.claude-plugin/plugin.json` (version bump)
- `.claude-plugin/marketplace.json` (version bump)
