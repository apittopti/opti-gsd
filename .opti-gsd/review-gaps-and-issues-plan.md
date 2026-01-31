# opti-gsd: Gap Analysis vs Original GSD + Issue Resolution Plan

## Part 1: Features Missing from opti-gsd (vs glittercowboy/get-shit-done)

### CRITICAL MISSING: `/gsd:quick` Command
**Priority: P0 — Most requested feature in original repo**

The original GSD's biggest user-requested addition was `/gsd:quick` — a lightweight command that skips the full discuss→research→plan→execute ceremony for small/medium tasks. Users were frustrated that even tiny changes (moving a table into a card) triggered the full multi-agent pipeline.

**What it does:**
- Ad-hoc execution without research/planning phases
- Skips optional agents (researcher, plan-checker, verifier)
- Still maintains atomic commits and state tracking
- Creates `.planning/quick/` artifacts separate from phases
- Ideal for bug fixes, small features, one-off tasks

**opti-gsd equivalent needed:** A streamlined execution path that still uses fresh-context subagents but bypasses the full phase ceremony. This addresses issues #175, #120, #317 from the original repo.

---

### CRITICAL MISSING: `/gsd:verify-work` (UAT Command)
**Priority: P0 — Core workflow gap**

Original GSD has a distinct verify-work command that presents structured UAT (User Acceptance Testing) to humans with pass/fail/partial options. This is different from our `/opti-gsd:verify` which is an automated verification agent.

**What it does:**
- Presents test items from VERIFICATION.md one at a time
- User selects: pass / failed / partially working
- On failure: spawns diagnostic agent to investigate
- Creates UAT.md with results
- Gates milestone progression

---

### IMPORTANT MISSING: `/gsd:settings` and `/gsd:set-profile`
**Priority: P1 — Token cost management**

Original GSD has explicit settings management:
- **Model profiles**: quality/balanced/budget/adaptive
- **Workflow agent toggles**: enable/disable research, plan_check, verifier
- **Per-invocation overrides**: `--skip-research`, `--skip-verify`
- **Depth settings**: quick/standard/comprehensive planning
- **Mode settings**: interactive/yolo (opti-gsd has mode but not profiles)

---

### IMPORTANT MISSING: `/gsd:audit-milestone` and `/gsd:plan-milestone-gaps`
**Priority: P1 — Quality assurance**

Two commands that close the quality loop:
- `audit-milestone`: Confirms milestone achieved definition of done
- `plan-milestone-gaps`: Creates phases to address audit findings

---

### IMPORTANT MISSING: `/gsd:list-phase-assumptions`
**Priority: P1 — Transparency**

Shows Claude's intended approach before planning begins. Lets users catch wrong assumptions before committing to a plan.

---

### IMPORTANT MISSING: `/gsd:add-todo` and `/gsd:check-todos`
**Priority: P1 — Ad-hoc idea capture**

A lightweight todo system separate from issues/features/stories:
- `add-todo`: Quick capture during work sessions
- `check-todos`: Review and act on captured items
- Stored in `.planning/todos/`

opti-gsd has features, stories, and issues but no lightweight todo capture.

---

### MODERATE MISSING: `/gsd:update` and `/gsd:whats-new`
**Priority: P2 — User experience**

- `update`: Self-update mechanism with changelog preview
- `whats-new`: Show recent changes since user's last version

opti-gsd has `whats-new` but no self-update mechanism.

---

### MODERATE MISSING: `/gsd:join-discord` / Community Features
**Priority: P3 — Community**

Not directly relevant to opti-gsd but shows the importance of community building.

---

### MODERATE MISSING: Configurable Git Branching Strategy
**Priority: P2 — Brownfield workflow**

Original GSD added configurable branching:
- `git.branching_strategy: "phase"` — each phase gets its own branch
- Squash merge recommended at milestone completion
- Per-phase branches: `gsd/phase-03-auth`

opti-gsd has milestone branching but not per-phase branching options.

---

### MODERATE MISSING: `.planning/` Directory Health Check
**Priority: P2 — Reliability**

Requested as `/gsd:health` — validates integrity of the planning directory, detects stale/corrupt state files, missing cross-references.

---

## Part 2: Categorized Issues from Original Repo (Applicable to opti-gsd)

### Category A: Context & Execution Quality (15 issues)

These are the core pain points that affect actual output quality:

| # | Issue | Severity | Resolution Strategy |
|---|-------|----------|-------------------|
| 326 | Discuss phase decisions not executed in plans | HIGH | Ensure planner reads CONTEXT.md via Read tool (not @-references in Task prompts) |
| 332 | Existing code migration: agents ignore user instructions | HIGH | Add explicit "user constraints" section to plan format that executor MUST follow |
| 343 | Research agent doesn't persist RESEARCH.md to disk | HIGH | Add explicit Write tool instruction in researcher agent |
| 253 | Plans created without user context | HIGH | Load CONTEXT.md content into planner prompt body, not as @-reference |
| 216 | Context cut after discussion: decisions not developed | HIGH | Same as #326 — fundamental @ reference issue |
| 351 | Overly optimistic commits (agent marks done when not) | MEDIUM | Add verification step in executor before marking complete |
| 100 | Too quick to say work is finished | MEDIUM | Add explicit "confirm with user" step at checkpoints |
| 165 | Fresh session approach doesn't work for executor | MEDIUM | Ensure per-plan (not per-phase) agent spawning |
| 315 | Executor agent failure / context overflow | MEDIUM | Enforce task size limits in planner |
| 131 | Discuss phase inefficient and cumbersome | LOW | Offer streamlined discuss mode for simple phases |

**Resolution Plan:** Create a "Context Integrity" initiative:
1. Replace all `@` file references in Task prompts with explicit Read→inject patterns
2. Add mandatory verification step in executor: "Diff actual changes vs plan requirements"
3. Add plan-level constraints section for user-specified requirements

---

### Category B: Quick/Lightweight Execution (8 issues)

| # | Issue | Severity | Resolution Strategy |
|---|-------|----------|-------------------|
| 175 | Token usage increased 4x after updates | HIGH | Implement `/opti-gsd:quick` command |
| 120 | Substantially more tokens and time after update | HIGH | Same as above |
| 317 | Need middle ground between quick and full ceremony | HIGH | Add depth/profile configuration |
| 344 | Plan all phases then execute all without stopping | MEDIUM | Add "yolo" batch execution mode |
| 136 | Auto-execute after planning | MEDIUM | Add plan-and-execute composite command |
| 75 | Execute all phases in milestone | MEDIUM | Add milestone-level execution |
| 206 | Plan phase not saving details from add-phase | LOW | Improve add-phase to capture more detail |

**Resolution Plan:** Implement tiered execution:
1. **Quick mode**: Single agent, no research, no verification — for small tasks
2. **Standard mode**: Current behavior
3. **Comprehensive mode**: Extra research, multiple verification rounds

---

### Category C: Cross-Platform / Installation (12 issues)

| # | Issue | Severity | Resolution Strategy |
|---|-------|----------|-------------------|
| 203/198/156/143/128 | Windows $HOME path issues | RESOLVED in GSD | Use absolute paths, not $HOME |
| 257/226/125 | ES module compatibility (.js vs .cjs) | HIGH | Use .cjs extension or add package.json with type:commonjs |
| 254 | macOS-specific assumptions | MEDIUM | Use cross-platform path resolution |
| 249 | gsd-intel-index.js crashes on Windows/WSL | LOW | N/A (feature was reverted) |
| 119 | Installation reports success but files not copied | MEDIUM | Verify file existence post-install |

**Resolution Plan:** opti-gsd should:
1. Use `os.homedir()` or `process.env.HOME` for path resolution
2. Use `.cjs` extension for all hook scripts
3. Add post-install verification step

---

### Category D: State Management & Recovery (10 issues)

| # | Issue | Severity | Resolution Strategy |
|---|-------|----------|-------------------|
| 314 | Structural requirement discovered after phase complete | HIGH | Add `/opti-gsd:rework-phase` command |
| 285 | Change of plans mid-execution | MEDIUM | Use add-phase + insert-phase (already have) |
| 238 | Debug sessions don't auto-close when fixed outside debug | MEDIUM | Add stale session cleanup to status command |
| 104 | Duplicate phase directories (zero-padding mismatch) | MEDIUM | Normalize phase numbers: always zero-pad |
| 112 | Phase folder naming inconsistency | MEDIUM | Same as above |
| 101 | Organize command to clean up state | MEDIUM | Add `/opti-gsd:cleanup` command |
| 109 | Remove phase folders on milestone complete | LOW | Add archive option to complete-milestone |
| 105 | Document manual changes | MEDIUM | Add `/opti-gsd:note-change` command |

**Resolution Plan:**
1. Add phase number normalization (8 → 08) everywhere
2. Add state cleanup/health command
3. Add "note manual change" command for brownfield workflows

---

### Category E: Brownfield / Existing Codebase (8 issues)

| # | Issue | Severity | Resolution Strategy |
|---|-------|----------|-------------------|
| 351 | Brownfield commit strategy problems | HIGH | Add configurable branching strategy |
| 337 | Handling separate repos for backend/frontend | MEDIUM | Add multi-repo awareness |
| 108 | Multi-project support for monorepos | MEDIUM | Support scoped .opti-gsd directories |
| 77 | How does this work with legacy codebases | INFO | Better documentation |
| 153 | Update codebase docs after phase verified | MEDIUM | Auto-trigger map-codebase update |
| 152 | Auto map-codebase after milestone | MEDIUM | Add to complete-milestone workflow |

**Resolution Plan:**
1. Add `git.branching_strategy` config option: "milestone" (current) or "phase"
2. Auto-update codebase analysis after milestone completion
3. Document brownfield best practices

---

### Category F: Multi-Provider / CLI Support (7 issues)

| # | Issue | Severity | Resolution Strategy |
|---|-------|----------|-------------------|
| 139/132/135 | Support for other CLIs (Gemini, Codex, etc.) | LOW for now | Architecture already CLI-agnostic via markdown |
| 294 | Local model support | LOW | Out of scope until local models improve |
| 262 | Custom model name mapping | MEDIUM | Add model alias config |

**Resolution Plan:** opti-gsd is Claude Code-focused. Add model alias config but defer multi-CLI support.

---

### Category G: Verification & Testing (5 issues)

| # | Issue | Severity | Resolution Strategy |
|---|-------|----------|-------------------|
| 302 | Add test generation command | HIGH | Add `/opti-gsd:add-tests` command |
| 122 | QA agent with gated progression | MEDIUM | Add QA step to verify workflow |
| 117 | Auto-trigger verify-work after execution | MEDIUM | Make verification automatic |
| 189 | Verification.md not created for off-plan changes | MEDIUM | Always generate verification.md |

**Resolution Plan:**
1. Add `/opti-gsd:add-tests` that generates test suite based on UAT
2. Make verification.md creation mandatory after any execution

---

### Category H: UX & Observability (10 issues)

| # | Issue | Severity | Resolution Strategy |
|---|-------|----------|-------------------|
| 320 | Optional verbose output | MEDIUM | Add verbosity config |
| 325 | Timestamp display in output | LOW | Add timestamps to wave execution |
| 290 | Discuss phase answers hidden by next question | LOW | Claude Code UI limitation |
| 126 | Formatting jank in next-up suggestions | LOW | Fix markdown formatting |
| 316 | Debug logging for GSD workflow decisions | MEDIUM | Add debug/trace mode |
| 212 | Enhanced statusline with metrics | LOW | Nice-to-have enhancement |
| 87 | Missing context window progress bar | RESOLVED | Already have statusline |

---

## Part 3: Prioritized Implementation Plan

### Phase 1: Quick Command & Core Quality (v3.0.0)
**Goal: Address the #1 user pain point and core quality issues**

1. **Implement `/opti-gsd:quick`** — Lightweight task execution
   - Skip research, plan-check, verification agents
   - Single agent with fresh context
   - Atomic commit + state tracking
   - `.opti-gsd/quick/` artifact storage

2. **Fix Context Integrity** — Ensure plans include user decisions
   - Replace `@`-references in Task tool prompts with Read→inject
   - Add mandatory "user constraints" section to plan XML format
   - Add "verify plan matches CONTEXT.md" step in plan-checker

3. **Add `/opti-gsd:verify-work`** — Human UAT command
   - Structured pass/fail/partial for each test item
   - Auto-spawn debugger on failures
   - Create UAT.md with results

---

### Phase 2: Configuration & Profiles (v3.1.0)
**Goal: Let users control cost/quality tradeoffs**

4. **Model profiles**: quality/balanced/budget
   - Configure which model for planning, execution, verification
   - `config.json` setting with `/opti-gsd:set-profile` command

5. **Workflow agent toggles**
   - Enable/disable: research, plan_check, verifier
   - Per-command overrides: `--skip-research`, `--skip-verify`

6. **Depth settings**: quick/standard/comprehensive
   - Control planning thoroughness

---

### Phase 3: Brownfield & State Management (v3.2.0)
**Goal: Make opti-gsd work well for existing projects**

7. **Configurable git branching**
   - Per-phase branches option
   - Squash merge at milestone completion

8. **Phase number normalization**
   - Always zero-pad (8 → 08)
   - Auto-detect and fix mismatches

9. **State health check** (`/opti-gsd:health`)
   - Validate .opti-gsd directory integrity
   - Detect stale debug sessions
   - Check cross-references between state files

10. **Note manual changes** (`/opti-gsd:note-change`)
    - Capture manual edits in state
    - Prevent agents from overwriting manual fixes

---

### Phase 4: Testing & Verification (v3.3.0)
**Goal: Close the quality loop**

11. **Add test generation** (`/opti-gsd:add-tests`)
    - Generate tests based on UAT/verification criteria
    - Support unit, integration, e2e

12. **Audit milestone** (`/opti-gsd:audit-milestone`)
    - Comprehensive definition-of-done check
    - Generate gap report

13. **Plan milestone gaps** (`/opti-gsd:plan-gaps`)
    - Create remediation phases from audit findings

---

### Phase 5: UX Polish (v3.4.0)
**Goal: Developer experience improvements**

14. **Todo system** (`/opti-gsd:add-todo`, `/opti-gsd:check-todos`)
    - Lightweight idea capture
    - Separate from issues/features/stories

15. **List phase assumptions** (`/opti-gsd:assumptions`)
    - Show Claude's intended approach before planning

16. **Debug/trace mode**
    - Verbose logging of workflow decisions
    - Timestamps in execution output

17. **Auto-update codebase analysis**
    - Trigger incremental codebase update after milestone completion

---

## Summary Statistics

| Category | Total Issues | High Severity | Applicable to opti-gsd |
|----------|-------------|---------------|----------------------|
| Context & Execution Quality | 15 | 6 | 10 |
| Quick/Lightweight Execution | 8 | 3 | 7 |
| Cross-Platform | 12 | 3 | 5 |
| State Management | 10 | 1 | 8 |
| Brownfield | 8 | 1 | 6 |
| Multi-Provider | 7 | 0 | 1 |
| Verification & Testing | 5 | 1 | 4 |
| UX & Observability | 10 | 0 | 5 |
| **TOTAL** | **75** | **15** | **46** |

**Key Insight:** The original GSD's 235 issues boil down to ~75 unique problems, of which ~46 are directly applicable to opti-gsd. The highest-impact improvements are:

1. **Quick command** (solves 8+ issues around token waste)
2. **Context integrity fixes** (solves 6+ issues around plans ignoring user decisions)
3. **Model profiles** (solves 5+ issues around cost management)
4. **Verify-work UAT** (solves 4+ issues around incomplete verification)
5. **Brownfield branching** (solves 4+ issues around existing project workflows)
