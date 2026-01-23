# opti-gsd Workflow Flowchart

## The Complete Picture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│   ANYTIME COMMANDS (can run at any point in the workflow)                          │
│   ─────────────────────────────────────────────────────────────────────            │
│   /status      → See where you are + what to do next                               │
│   /add-idea    → Capture idea for later                                            │
│   /add-story   → Capture user request                                              │
│   /debug       → Start debugging session                                           │
│   /issues      → View/add issues                                                   │
│   /decisions   → Log architectural decisions                                       │
│   /context     → Check context usage                                               │
│   /help        → Show commands                                                     │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │   START HERE    │
                              └────────┬────────┘
                                       │
                                       ▼
                    ┌──────────────────────────────────────┐
                    │         Is project initialized?       │
                    │            (.gsd/ exists?)            │
                    └──────────────────┬───────────────────┘
                                       │
                     ┌─────────────────┴─────────────────┐
                     │ NO                                │ YES
                     ▼                                   ▼
        ┌────────────────────────┐         ┌────────────────────────┐
        │   New or Existing?     │         │    Has ROADMAP.md?     │
        └───────────┬────────────┘         └───────────┬────────────┘
                    │                                  │
         ┌──────────┴──────────┐            ┌─────────┴─────────┐
         │ NEW        EXISTING │            │ NO              YES│
         ▼                     ▼            ▼                    │
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│ /new-project    │  │ /init           │  │ /roadmap        │    │
│                 │  │                 │  │ Define phases   │    │
│ Guided setup    │  │ Initialize in   │  └────────┬────────┘    │
│ wizard          │  │ existing code   │           │             │
└────────┬────────┘  └────────┬────────┘           │             │
         │                    │                    │             │
         └────────────────────┴────────────────────┴─────────────┘
                                       │
                                       ▼
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                                   ┃
┃                         THE MAIN LOOP (repeat per phase)                          ┃
┃                                                                                   ┃
┃  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐┃
┃  │          │     │          │     │          │     │          │     │          │┃
┃  │  PLAN    │────►│ EXECUTE  │────►│   PUSH   │────►│  VERIFY  │────►│  NEXT    │┃
┃  │          │     │          │     │          │     │          │     │  PHASE   │┃
┃  └──────────┘     └──────────┘     └──────────┘     └──────────┘     └────┬─────┘┃
┃       │                │                │                │                │      ┃
┃       │                │                │                │                │      ┃
┃  /plan-phase      /execute          /push           /verify              │      ┃
┃                                                                          │      ┃
┃                                                                          │      ┃
┃  ◄───────────────────────────────────────────────────────────────────────┘      ┃
┃                                                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                                       │
                                       │ (all phases done)
                                       ▼
                         ┌──────────────────────────┐
                         │   /complete-milestone    │
                         │   Creates PR, tags       │
                         └──────────────────────────┘
```

---

## Detailed Phase Loop

```
                              ┌─────────────────────┐
                              │  Current Phase: N   │
                              └──────────┬──────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
                    ▼                                         │
          ┌─────────────────┐                                │
          │   OPTIONAL:     │                                │
          │  /discuss-phase │  ◄── Capture decisions first   │
          │  /research      │  ◄── Research best practices   │
          └────────┬────────┘                                │
                   │                                         │
                   ▼                                         │
┌──────────────────────────────────────┐                     │
│             /plan-phase N            │                     │
├──────────────────────────────────────┤                     │
│ • Reads PROJECT.md, ROADMAP.md       │                     │
│ • Auto-detects test requirements     │                     │
│ • Creates wave-based task plan       │                     │
│ • Assigns skills per task            │                     │
│                                      │                     │
│ Output: .gsd/plans/phase-N/plan.md   │                     │
└──────────────────┬───────────────────┘                     │
                   │                                         │
                   ▼                                         │
┌──────────────────────────────────────┐                     │
│              /execute                │                     │
├──────────────────────────────────────┤                     │
│                                      │                     │
│  ┌────────────────────────────────┐  │                     │
│  │  FOR each wave (parallel):     │  │                     │
│  │    FOR each task:              │  │                     │
│  │      Spawn subagent            │  │                     │
│  │      ┌─────────────────────┐   │  │                     │
│  │      │ IF test_required:   │   │  │                     │
│  │      │   RED → GREEN →     │   │  │                     │
│  │      │   REFACTOR          │   │  │                     │
│  │      │ (TDD inside agent)  │   │  │                     │
│  │      └─────────────────────┘   │  │                     │
│  │      Auto-commit on complete   │  │                     │
│  │      Create checkpoint tag     │  │                     │
│  └────────────────────────────────┘  │                     │
│                                      │                     │
└──────────────────┬───────────────────┘                     │
                   │                                         │
         ┌─────────┴─────────┐                               │
         │                   │                               │
         ▼                   ▼                               │
   ┌──────────┐        ┌──────────────┐                      │
   │ SUCCESS  │        │    FAILED    │                      │
   └────┬─────┘        └──────┬───────┘                      │
        │                     │                              │
        │                     ▼                              │
        │         ┌────────────────────┐                     │
        │         │  RECOVERY OPTIONS  │                     │
        │         ├────────────────────┤                     │
        │         │ /recover  ← diagnose│                    │
        │         │ /rollback ← undo   │                     │
        │         └────────────────────┘                     │
        │                                                    │
        ▼                                                    │
┌──────────────────────────────────────┐                     │
│               /push                  │                     │
├──────────────────────────────────────┤                     │
│ • Pushes branch to remote            │                     │
│ • Triggers preview deployment        │                     │
│ • Stores preview URL in STATE.md     │                     │
└──────────────────┬───────────────────┘                     │
                   │                                         │
                   ▼                                         │
┌──────────────────────────────────────┐                     │
│             /verify N                │                     │
├──────────────────────────────────────┤                     │
│ • Spawns verifier agent              │                     │
│ • Three-level artifact check:        │                     │
│   L1: Exists                         │                     │
│   L2: Substantive (not stub)         │                     │
│   L3: Wired (imported & used)        │                     │
│ • Integration checks                 │                     │
│ • CI validation                      │                     │
│ • Browser verification (if web)      │                     │
│                                      │                     │
│ Output: VERIFICATION.md              │                     │
└──────────────────┬───────────────────┘                     │
                   │                                         │
         ┌─────────┴─────────┐                               │
         │                   │                               │
         ▼                   ▼                               │
   ┌──────────┐        ┌──────────────┐                      │
   │ VERIFIED │        │  GAPS FOUND  │                      │
   └────┬─────┘        └──────┬───────┘                      │
        │                     │                              │
        │                     ▼                              │
        │         ┌────────────────────┐                     │
        │         │    /plan-fix N     │                     │
        │         │ Generate fix tasks │                     │
        │         └─────────┬──────────┘                     │
        │                   │                                │
        │                   ▼                                │
        │         ┌────────────────────┐                     │
        │         │     /execute       │                     │
        │         │   (run fix plan)   │                     │
        │         └─────────┬──────────┘                     │
        │                   │                                │
        │                   ▼                                │
        │         ┌────────────────────┐                     │
        │         │     /verify N      │ ◄── re-verify       │
        │         └─────────┬──────────┘                     │
        │                   │                                │
        └───────────────────┤                                │
                            │                                │
                            ▼                                │
                  ┌───────────────────┐                      │
                  │  More phases?     │                      │
                  └─────────┬─────────┘                      │
                            │                                │
              ┌─────────────┴─────────────┐                  │
              │ YES                    NO │                  │
              │                           │                  │
              │                           ▼                  │
              │               ┌─────────────────────┐        │
              │               │ /complete-milestone │        │
              │               │ • Creates PR        │        │
              │               │ • Tags release      │        │
              │               │ • Archives phases   │        │
              │               └─────────────────────┘        │
              │                                              │
              └──────────────────────────────────────────────┘
                            (back to loop)
```

---

## Command Categories

### CORE WORKFLOW (5 commands - the essentials)
```
┌────────────────┬─────────────────────────────────────────────────┐
│ Command        │ Purpose                                         │
├────────────────┼─────────────────────────────────────────────────┤
│ /roadmap       │ Define what you're building (phases)            │
│ /plan-phase    │ Generate execution plan for phase N             │
│ /execute       │ Run the plan (TDD, parallel, auto-commit)       │
│ /push          │ Push to trigger preview deployment              │
│ /verify        │ Verify everything works                         │
└────────────────┴─────────────────────────────────────────────────┘
```

### ANYTIME COMMANDS (run whenever needed)
```
┌────────────────┬─────────────────────────────────────────────────┐
│ Command        │ Purpose                                         │
├────────────────┼─────────────────────────────────────────────────┤
│ /status        │ WHERE AM I? WHAT DO I DO NEXT?                  │
│ /add-idea      │ Capture idea without interrupting               │
│ /add-story     │ Capture user request                            │
│ /debug         │ Systematic bug investigation                    │
│ /issues        │ Track problems                                  │
│ /decisions     │ Log architectural decisions                     │
│ /context       │ Check context usage                             │
│ /help          │ Show commands                                   │
└────────────────┴─────────────────────────────────────────────────┘
```

### RECOVERY COMMANDS (when things go wrong)
```
┌────────────────┬─────────────────────────────────────────────────┐
│ Command        │ When to use                                     │
├────────────────┼─────────────────────────────────────────────────┤
│ /recover       │ Execution interrupted, need to diagnose         │
│ /rollback      │ Need to undo to a checkpoint                    │
│ /plan-fix      │ Verification found gaps, need fix plan          │
└────────────────┴─────────────────────────────────────────────────┘
```

### MILESTONE COMMANDS (start/end of major work)
```
┌────────────────────┬─────────────────────────────────────────────┐
│ Command            │ Purpose                                     │
├────────────────────┼─────────────────────────────────────────────┤
│ /start-milestone   │ Create milestone branch (before work)       │
│ /complete-milestone│ Create PR, tag release (after all phases)   │
└────────────────────┴─────────────────────────────────────────────┘
```

---

## TDD Loop (Inside Execute)

```
                    ┌─────────────────────────────────────┐
                    │   Task with test_required: true     │
                    └──────────────────┬──────────────────┘
                                       │
                                       ▼
                    ┌─────────────────────────────────────┐
                    │            RED PHASE                │
                    │  ────────────────────────────────── │
                    │  • Test files: WRITE                │
                    │  • Impl files: LOCKED               │
                    │  • Goal: Write FAILING test         │
                    │  • Success: Test FAILS              │
                    └──────────────────┬──────────────────┘
                                       │
                                       ▼
                    ┌─────────────────────────────────────┐
                    │           GREEN PHASE               │
                    │  ────────────────────────────────── │
                    │  • Test files: LOCKED               │
                    │  • Impl files: WRITE                │
                    │  • Goal: Make test pass             │
                    │  • Success: Test PASSES             │
                    └──────────────────┬──────────────────┘
                                       │
                         ┌─────────────┴─────────────┐
                         │ PASS                 FAIL │
                         ▼                           │
          ┌──────────────────────────┐               │
          │      REFACTOR PHASE      │               │
          │  ──────────────────────  │               │
          │  • Clean up code         │               │
          │  • Keep tests green      │               │
          └────────────┬─────────────┘               │
                       │                             │
                       ▼                             │
               ┌──────────────┐                      │
               │ TASK COMPLETE│                      │
               └──────────────┘                      │
                                                     │
                                    ┌────────────────┘
                                    │ (retry up to 5x)
                                    ▼
                         ┌────────────────────┐
                         │  Analyze failure   │
                         │  Fix impl, retry   │
                         └────────────────────┘
```

---

## Recovery Flows

### When Execution Fails
```
        ┌───────────────────┐
        │  /execute FAILED  │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │     /recover      │───────► Diagnose issue
        └─────────┬─────────┘         Shows:
                  │                   • Git state
                  │                   • STATE.md vs reality
                  │                   • Suggested fix
                  │
                  ▼
    ┌─────────────┴─────────────┐
    │                           │
    ▼                           ▼
┌──────────────┐        ┌───────────────┐
│ Fix manually │        │   /rollback   │
│ then /execute│        │   to checkpoint│
└──────────────┘        └───────────────┘
```

### When Verification Finds Gaps
```
        ┌───────────────────┐
        │  /verify → GAPS   │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │    /plan-fix N    │───────► Generate fix tasks
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │     /execute      │───────► Run fix plan
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │    /verify N      │───────► Re-verify
        └───────────────────┘
```

---

## Checkpoint System

```
Timeline of a phase execution:

    ┌───────────────────────────────────────────────────────────┐
    │                                                           │
    │  gsd/checkpoint/phase-2/pre                               │
    │           │                                               │
    │           ▼                                               │
    │      ┌─────────┐                                          │
    │      │ Task 01 │                                          │
    │      └────┬────┘                                          │
    │           │                                               │
    │  gsd/checkpoint/phase-2/T01                               │
    │           │                                               │
    │           ▼                                               │
    │      ┌─────────┐                                          │
    │      │ Task 02 │                                          │
    │      └────┬────┘                                          │
    │           │                                               │
    │  gsd/checkpoint/phase-2/T02                               │
    │           │                                               │
    │           ▼                                               │
    │      ┌─────────┐                                          │
    │      │ Task 03 │  ◄── Something breaks here               │
    │      └────┬────┘                                          │
    │           │                                               │
    │           ▼                                               │
    │  /rollback 2-03  ───► Resets to T02 checkpoint            │
    │  /rollback 2     ───► Resets to pre checkpoint            │
    │  /rollback last  ───► Resets to most recent checkpoint    │
    │                                                           │
    │  gsd/checkpoint/phase-2/post  (after all tasks)           │
    │                                                           │
    └───────────────────────────────────────────────────────────┘
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  LOST? START HERE:                                              │
│  ─────────────────                                              │
│                                                                 │
│      /status                                                    │
│                                                                 │
│  Shows exactly where you are and what to do next.               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  THE 5-COMMAND WORKFLOW:                                        │
│  ───────────────────────                                        │
│                                                                 │
│      /roadmap → /plan-phase → /execute → /push → /verify        │
│                      │                              │           │
│                      └──────── repeat ◄─────────────┘           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SOMETHING WENT WRONG?                                          │
│  ─────────────────────                                          │
│                                                                 │
│      /recover   ← Diagnose and fix                              │
│      /rollback  ← Undo to checkpoint                            │
│      /plan-fix  ← Fix verification gaps                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
