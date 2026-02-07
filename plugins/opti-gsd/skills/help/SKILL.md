---
description: Show all opti-gsd commands with descriptions and the recommended workflow
disable-model-invocation: true
---

# opti-gsd Help

Display all available commands and the recommended workflow.

```
opti-gsd — Spec-Driven Development
══════════════════════════════════════════════════════════════

Workflow: INIT → ROADMAP → PLAN → EXECUTE → REVIEW → VERIFY

Core Commands:
─────────────────────────────────────────────────────────────
  /opti-gsd:status      Show current state and next action
  /opti-gsd:init        Initialize opti-gsd in existing project
  /opti-gsd:new-project Scaffold a new project
  /opti-gsd:roadmap     Create or modify delivery roadmap
  /opti-gsd:plan        Plan the current phase
  /opti-gsd:execute     Execute phase plan (wave parallelism)
  /opti-gsd:review      AI-powered code review
  /opti-gsd:verify      Automated verification checks
  /opti-gsd:push        Push branch for CI/preview
  /opti-gsd:complete    Complete milestone, create PR
  /opti-gsd:rollback    Rollback to checkpoint

Capture Commands:
─────────────────────────────────────────────────────────────
  /opti-gsd:add-feature Capture a feature idea
  /opti-gsd:add-story   Capture a user story
  /opti-gsd:add-issue   Capture a bug/issue

Agent Team Commands (experimental):
─────────────────────────────────────────────────────────────
  /opti-gsd:team-execute  Execute with communicating teammates
  /opti-gsd:team-debug    Debug with competing hypotheses
  /opti-gsd:team-review   Multi-perspective code review

Utility Commands:
─────────────────────────────────────────────────────────────
  /opti-gsd:debug       Systematic debugging session
  /opti-gsd:research    Research a technical topic
  /opti-gsd:quick       Quick ad-hoc task
  /opti-gsd:migrate     Migrate v2 project to v3 format
  /opti-gsd:help        This help screen

Tips:
─────────────────────────────────────────────────────────────
  • Run /opti-gsd:status to see what to do next
  • All code changes happen on milestone branches (never main)
  • /opti-gsd:execute spawns fresh-context agents for each task
  • /opti-gsd:team-execute uses Agent Teams for cross-task coordination
  • Use /opti-gsd:rollback if something goes wrong
```
