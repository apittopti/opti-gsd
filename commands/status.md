---
description: Show current project state and suggest next action.
---

Read the opti-gsd project state and display a status report with visual progress bars.

## Your Task

1. Check if `.gsd/` directory exists
2. If not, display "opti-gsd not initialized" and suggest `/opti-gsd:init`
3. If yes, read STATE.md and ROADMAP.md
4. Display status with progress bars as shown below

## Output Format

Display this format (adapt values from actual state):

```
╔══════════════════════════════════════════════════════════════╗
║                      opti-gsd Status                         ║
╠══════════════════════════════════════════════════════════════╣
║  Milestone: v1.0          Branch: gsd/v1.0                   ║
║  Phase: 2 of 4            Mode: interactive                  ║
╚══════════════════════════════════════════════════════════════╝

Phase Progress:
──────────────────────────────────────────────────────────────
Phase 1: Auth           [████████████████████] 100% ✓ complete
Phase 2: Core Features  [████████████░░░░░░░░]  60% ← current
Phase 3: Settings       [░░░░░░░░░░░░░░░░░░░░]   0%   pending
Phase 4: Payments       [░░░░░░░░░░░░░░░░░░░░]   0%   pending
──────────────────────────────────────────────────────────────
Overall: [████████░░░░░░░░░░░░] 40%

Current Phase Tasks:
──────────────────────────────────────────────────────────────
[✓] Task 1: Setup database schema
[✓] Task 2: Create API endpoints
[▸] Task 3: Implement business logic    ← in progress
[ ] Task 4: Add validation
[ ] Task 5: Write tests
──────────────────────────────────────────────────────────────

Context: ~80k tokens (40% of budget) ████████░░░░░░░░░░░░

Open Issues: 2 (0 critical, 1 medium, 1 low)

→ Next: /opti-gsd:execute to continue Task 3
```

## Progress Bar Generation

Use these characters for progress bars:
- Full block: █
- Empty block: ░
- Bar width: 20 characters
- Calculate: filled = (percentage / 100) * 20

## State Detection

| Condition | Next Action |
|-----------|-------------|
| No .gsd/ folder | `/opti-gsd:init` or `/opti-gsd:new-project` |
| No ROADMAP.md | `/opti-gsd:roadmap` |
| Phase not planned | `/opti-gsd:plan-phase {N}` |
| Tasks in progress | `/opti-gsd:execute` |
| Phase done, not verified | `/opti-gsd:verify {N}` |
| All phases complete | `/opti-gsd:complete-milestone` |
