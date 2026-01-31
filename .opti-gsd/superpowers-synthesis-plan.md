# opti-gsd v3.0: The Best of Everything — Synthesis Plan

## Sources Analyzed

1. **obra/superpowers** (40.7k stars) — The dominant agentic skills framework
2. **glittercowboy/get-shit-done** (original GSD) — 235 GitHub issues analyzed
3. **opti-gsd** (our system) — Current v2.5.0 capabilities
4. **Community ecosystem** — SuperClaude Framework, 10x, awesome-agent-skills

---

## What Each System Does Best

### opti-gsd Strengths (KEEP)
- **Claude Code Task integration** — Visual progress via TodoWrite/TaskCreate during execution
- **Spec-driven planning** — Goal-backward methodology (observable outcomes → artifacts → connections)
- **Wave-based parallel execution** — Tasks grouped into dependency waves
- **Issue/Story/Feature tracking** — Built-in lightweight project management
- **Fresh context per task** — Context isolation that keeps quality high
- **Milestone branching** — Protected branches with milestone lifecycle
- **Atomic commits** — Each task gets its own commit

### Superpowers Strengths (ADOPT)
- **Two-stage code review** — Spec compliance THEN code quality (not just one review)
- **TDD enforcement** — RED-GREEN-REFACTOR as mandatory, not optional
- **Git worktrees** — Isolated workspaces per feature, not just branches
- **Verification-before-completion** — "NO COMPLETION CLAIMS WITHOUT FRESH EVIDENCE"
- **Brainstorming skill** — Socratic questioning, one question at a time, multiple choice
- **Auto-triggering skills** — Skills activate based on context, not just manual invocation
- **Plans as junior-engineer instructions** — 2-5 minute tasks with exact file paths and commands
- **Parallel agent dispatching** — Domain-based isolation with conflict detection
- **Branch finishing** — Structured merge/PR/keep/discard options with test gates

### Original GSD Strengths (ADOPT)
- **Quick command** — Lightweight execution without full ceremony
- **Verify-work UAT** — Human acceptance testing with pass/fail/partial
- **Model profiles** — quality/balanced/budget for cost management
- **Document manual changes** — Prevent agents from overwriting manual fixes
- **Organize/health check** — State integrity validation

---

## The Ideal Workflow: opti-gsd v3.0

### Core Philosophy Shift

**Current opti-gsd**: Phase-centric (roadmap → plan-phase → execute → verify)
**New opti-gsd**: Task-quality-centric with flexible entry points

The key insight from Superpowers: **quality comes from the task level, not the phase level**. Each task should have TDD, two-stage review, and verification-before-completion baked in. The phase is just a container.

### Workflow Tiers

#### Tier 1: Quick Mode (`/opti-gsd:quick`)
For small tasks, bug fixes, one-off changes. ~5 minutes.

```
User describes task
  → Single subagent dispatched with TDD + verification skills
  → Two-stage review (spec compliance + code quality)
  → Atomic commit
  → Done
```

No research, no planning ceremony, no phase overhead. But still gets TDD and review.

#### Tier 2: Standard Mode (`/opti-gsd:execute`)
For planned phase work. Current behavior enhanced.

```
Plan loaded
  → Wave-based dispatch (parallel where independent)
  → Each task: TDD → implement → spec review → quality review
  → Verification-before-completion gate
  → Atomic commit per task
  → Human checkpoint between waves (configurable)
  → Phase summary
```

#### Tier 3: Full Ceremony (`/opti-gsd:roadmap` → full lifecycle)
For new projects or major milestones. Current behavior.

```
Brainstorm (Socratic questioning)
  → Roadmap (goal-backward methodology)
  → Per-phase: Research → Plan → Execute (Tier 2) → Verify
  → Milestone audit
  → Branch finishing (merge/PR/keep/discard)
```

---

## Key Features to Implement

### 1. Two-Stage Code Review (from Superpowers)
**Impact: HIGH — This is the single biggest quality improvement available**

After each task execution, dispatch TWO sequential review subagents:

**Stage 1: Spec Compliance Review**
- Did the code do exactly what the plan asked? Nothing more, nothing less?
- Read actual code, don't trust implementer's summary
- Catches over-building and under-building
- Loop: issues found → implementer fixes → re-review

**Stage 2: Code Quality Review** (only after Stage 1 passes)
- Clean code, proper naming, no duplication
- Test coverage adequate
- No security issues (OWASP top 10)
- Loop: issues found → implementer fixes → re-review

**Implementation in opti-gsd:**
- Add to executor agent's post-task workflow
- Each review is a fresh subagent (context isolation)
- Configurable: can disable for quick mode or budget profile
- Results logged in task summary

### 2. TDD Enforcement (from Superpowers)
**Impact: HIGH — Prevents "works on my machine" and hallucinated completions**

Enforce RED-GREEN-REFACTOR in executor:

```
For each task:
  1. Write failing test (RED)
  2. Run test, confirm it FAILS for the right reason
  3. Write minimal implementation (GREEN)
  4. Run test, confirm it PASSES
  5. Refactor if needed
  6. Run all tests, confirm nothing broken
  7. Commit
```

**Red flags that trigger restart:**
- Code written before test
- Test that passes immediately (didn't actually test anything)
- "Too simple to test" / "I'll test later"

**Exceptions (require explicit user opt-out):**
- Config files, generated code, throwaway prototypes
- Non-functional changes (docs, comments)

**opti-gsd already has TDD concepts** — this formalizes and enforces them.

### 3. Verification-Before-Completion Gate (from Superpowers)
**Impact: HIGH — Eliminates the #1 user complaint: "agent claims done but isn't"**

Before ANY completion claim:
1. Identify the command that proves the assertion
2. Run it FRESH (not cached)
3. Read FULL output
4. Confirm output matches claim
5. Only then mark complete

**Banned phrases in completion:** "should work", "probably passes", "seems to"

**Implementation:**
- Add to executor agent's task completion step
- Add to verify command's phase verification
- Log evidence in verification.md

### 4. Quick Command (`/opti-gsd:quick`)
**Impact: HIGH — Addresses token waste for small tasks**

```markdown
# Quick Task Execution

1. User provides task description
2. Single subagent spawned with:
   - TDD skill (if code change)
   - Verification-before-completion skill
   - Two-stage review (spec + quality)
3. Subagent executes task
4. Atomic commit
5. State updated (quick task logged)
```

No roadmap, no phase, no research. Just quality execution.

### 5. Git Worktree Support (from Superpowers)
**Impact: MEDIUM — Better isolation for parallel work**

Instead of just branches, use git worktrees:
- Each feature/task gets its own working directory
- No file conflicts between parallel agents
- Clean test baseline verification before work starts
- Proper cleanup on completion

**Implementation:**
- Add `using-git-worktrees` skill equivalent
- Add `finishing-a-development-branch` skill equivalent
- Integrate with milestone branching (worktree per milestone)
- `.gitignore` safety for project-local worktrees

### 6. Enhanced Brainstorming (from Superpowers)
**Impact: MEDIUM — Better requirements gathering**

Replace current discuss-phase with Socratic brainstorming:
- One question at a time (not a dump of questions)
- Multiple choice when possible
- Present designs in 200-300 word chunks for validation
- 2-3 approach options with trade-offs before committing

### 7. Auto-Triggering Skills (from Superpowers)
**Impact: MEDIUM — Reduce command overhead**

Skills should activate based on context, not just explicit commands:
- Agent detects it's debugging → systematic-debugging activates
- Agent detects it's implementing → TDD activates
- Agent detects it's finishing → verification activates
- Agent detects test failures → parallel dispatch considered

**Implementation:**
- Add skill activation rules to agent prompts
- Skills check for relevance before any task
- "Mandatory workflows, not suggestions"

### 8. Model Profiles (from original GSD issues)
**Impact: MEDIUM — Cost management**

```json
{
  "profiles": {
    "quality": { "planning": "opus", "execution": "opus", "review": "opus" },
    "balanced": { "planning": "opus", "execution": "sonnet", "review": "sonnet" },
    "budget": { "planning": "sonnet", "execution": "haiku", "review": "sonnet" }
  }
}
```

Configurable per-command model selection. Default: balanced.

### 9. Parallel Agent Dispatching Enhancement (from Superpowers)
**Impact: MEDIUM — Already have waves, but can improve**

Current opti-gsd has wave-based parallelism. Enhance with:
- **Domain-based isolation** — Group by subsystem, not just dependency
- **Conflict detection** — Post-dispatch check for file overlap
- **Integration verification** — Full test suite after all parallel agents complete
- **Failure isolation** — One agent's failure doesn't block others

### 10. Branch Finishing Workflow (from Superpowers)
**Impact: MEDIUM — Structured completion**

After milestone/phase completion, present four options:
1. **Merge locally** — Merge to main, verify tests, delete branch
2. **Create PR** — Push and open PR with summary + test plan
3. **Keep branch** — Preserve for later
4. **Discard** — Require typed confirmation, then force-delete

Gates: ALL tests must pass before options 1 or 2 are available.

### 11. Note Manual Changes (`/opti-gsd:note-change`)
**Impact: MEDIUM — Brownfield workflow**

Capture manual edits so agents don't overwrite them:
- Records what changed and why
- Added to codebase context for future agents
- Referenced in plan verification

### 12. State Health Check (`/opti-gsd:health`)
**Impact: LOW — Maintenance**

Validate .opti-gsd directory:
- Cross-reference state.json ↔ roadmap.md ↔ plans
- Detect stale debug sessions
- Find orphaned artifacts
- Report inconsistencies

---

## Implementation Phases

### Phase 1: Core Quality Revolution (v3.0.0)
**Theme: Every task gets TDD + two-stage review + verification**

| Task | What Changes |
|------|-------------|
| Two-stage code review | Add spec-compliance + code-quality review subagents to executor |
| TDD enforcement | Add RED-GREEN-REFACTOR protocol to executor agent |
| Verification-before-completion | Add evidence-based completion gates |
| Quick command | New `/opti-gsd:quick` for lightweight execution |

**Why this first:** These four changes transform output quality regardless of which workflow tier is used. They address the top complaints from GSD users (agent claims done but isn't, code doesn't match spec, no tests).

### Phase 2: Workflow Flexibility (v3.1.0)
**Theme: Right-sized execution for every task**

| Task | What Changes |
|------|-------------|
| Model profiles | Config-driven model selection per command |
| Auto-triggering skills | Context-aware skill activation |
| Enhanced brainstorming | Socratic questioning in discuss-phase |
| Workflow agent toggles | Skip research/verify via flags |

### Phase 3: Git & Isolation (v3.2.0)
**Theme: Better code isolation and completion**

| Task | What Changes |
|------|-------------|
| Git worktree support | Worktree-per-feature with setup/cleanup |
| Branch finishing workflow | Merge/PR/keep/discard with test gates |
| Parallel dispatch enhancement | Domain isolation + conflict detection |
| Note manual changes | Capture manual edits in context |

### Phase 4: State & Maintenance (v3.3.0)
**Theme: Keep the system healthy**

| Task | What Changes |
|------|-------------|
| State health check | `.opti-gsd/` integrity validation |
| Milestone audit | Definition-of-done verification |
| Auto-update codebase | Post-milestone codebase re-analysis |
| Phase number normalization | Fix zero-padding issues |

---

## What We Explicitly DO NOT Adopt

| Feature | Source | Why Not |
|---------|--------|---------|
| Multi-CLI support (Codex, OpenCode, Gemini) | Superpowers, GSD issues | Focus on Claude Code excellence first |
| Plugin marketplace | Superpowers | Over-engineering for current stage |
| TOON compression | GSD issue #15 | XML tags are semantic, not data overhead |
| Concurrent milestone execution | GSD issue #33 | Sequential milestones prevent state conflicts |
| CLAUDE.md hierarchy | GSD issue #26 | Explicit context loading > implicit hierarchy |
| Session management commands | GSD issue #34 | Claude Code's /resume + state.json covers this |

---

## Summary: The opti-gsd Advantage

After this synthesis, opti-gsd v3.0 would combine:

| Capability | Source | Status |
|------------|--------|--------|
| Goal-backward planning | opti-gsd | KEEP |
| Wave-based parallel execution | opti-gsd | KEEP + ENHANCE |
| Claude Code Task integration | opti-gsd | KEEP |
| Issue/Story/Feature tracking | opti-gsd | KEEP |
| Fresh context per task | opti-gsd | KEEP |
| Milestone lifecycle | opti-gsd | KEEP |
| **Two-stage code review** | **Superpowers** | **ADOPT** |
| **TDD enforcement** | **Superpowers** | **ADOPT** |
| **Verification-before-completion** | **Superpowers** | **ADOPT** |
| **Git worktrees** | **Superpowers** | **ADOPT** |
| **Auto-triggering skills** | **Superpowers** | **ADOPT** |
| **Socratic brainstorming** | **Superpowers** | **ADOPT** |
| **Branch finishing workflow** | **Superpowers** | **ADOPT** |
| **Quick command** | **Original GSD** | **ADOPT** |
| **Model profiles** | **Original GSD** | **ADOPT** |
| **Note manual changes** | **Original GSD** | **ADOPT** |
| **State health check** | **Original GSD** | **ADOPT** |

This creates a system that is:
- **More flexible** than original GSD (three execution tiers)
- **Higher quality** than Superpowers (goal-backward planning + wave parallelism + task tracking)
- **More practical** than both (built-in project management + Claude Code Task integration)
- **Cost-conscious** (model profiles + quick mode + configurable depth)
