---
phase: 1
title: Loop Mechanism
wave_count: 3
task_count: 7
estimated_tokens: 45k
---

# Phase 1: Loop Mechanism

## Must-Haves (Goal-Backward)

- [ ] Execute retries failed tasks automatically (up to max_retries per task)
- [ ] Verify fixes gaps and re-verifies until passed (up to max_iterations)
- [ ] Mode controls behavior: interactive prompts, yolo auto-loops
- [ ] Stop hook intercepts exit when loop incomplete, re-injects prompt
- [ ] Loop state tracked in STATE.md under `loop:` section
- [ ] Cross-platform hooks work on Windows (Git Bash) and Unix
- [ ] Config schema extended with loop settings

## Wave 1 (Parallel - Infrastructure)

<task id="01" wave="1">
  <files>
    <file action="create">hooks/hooks.json</file>
  </files>
  <action>
    Create hooks configuration file for Claude Code plugin integration.

    Content:
    ```json
    {
      "hooks": {
        "Stop": [
          {
            "matcher": "",
            "hooks": [
              {
                "type": "command",
                "command": "bash \"$CLAUDE_PROJECT_DIR/hooks/stop-hook.sh\""
              }
            ]
          }
        ]
      }
    }
    ```

    Notes:
    - "Stop" event fires when Claude session attempts to exit
    - Empty matcher means hook runs for all stop events
    - $CLAUDE_PROJECT_DIR is Claude Code's project root variable
    - Command invokes bash explicitly for Windows Git Bash compatibility
  </action>
  <libraries>none</libraries>
  <verify>
    <check type="file">hooks/hooks.json exists</check>
    <check type="content">File contains "Stop" hook type</check>
    <check type="content">File contains "stop-hook.sh" reference</check>
  </verify>
  <done>hooks.json exists with Stop hook configuration pointing to stop-hook.sh</done>
  <skills>none</skills>
</task>

<task id="02" wave="1">
  <files>
    <file action="create">hooks/stop-hook.sh</file>
  </files>
  <action>
    Create cross-platform stop hook script that checks loop state.

    The script must:
    1. Read .gsd/STATE.md to check if loop is active
    2. If loop active AND iteration < max_iterations AND not completed:
       - Return JSON: {"decision": "block", "prompt": "Continue loop..."}
    3. If loop not active OR completed OR max reached:
       - Return JSON: {"decision": "allow"}

    Script structure:
    ```bash
    #!/usr/bin/env bash
    # opti-gsd Stop Hook - Loop Continuation
    # Cross-platform: Windows Git Bash + Unix

    set -e

    STATE_FILE=".gsd/STATE.md"

    # Default: allow exit
    allow_exit() {
      echo '{"decision": "allow"}'
      exit 0
    }

    # Block exit and re-inject prompt
    block_exit() {
      local prompt="$1"
      echo "{\"decision\": \"block\", \"prompt\": \"$prompt\"}"
      exit 0
    }

    # Check if STATE.md exists
    if [[ ! -f "$STATE_FILE" ]]; then
      allow_exit
    fi

    # Parse loop state from STATE.md YAML frontmatter
    loop_active=$(grep -A 20 "^loop:" "$STATE_FILE" 2>/dev/null | grep "active:" | head -1 | awk '{print $2}' || echo "false")
    loop_type=$(grep -A 20 "^loop:" "$STATE_FILE" 2>/dev/null | grep "type:" | head -1 | awk '{print $2}' || echo "")
    iteration=$(grep -A 20 "^loop:" "$STATE_FILE" 2>/dev/null | grep "iteration:" | head -1 | awk '{print $2}' || echo "0")
    max_iterations=$(grep -A 20 "^loop:" "$STATE_FILE" 2>/dev/null | grep "max_iterations:" | head -1 | awk '{print $2}' || echo "20")
    paused=$(grep -A 20 "^loop:" "$STATE_FILE" 2>/dev/null | grep "paused:" | head -1 | awk '{print $2}' || echo "false")

    # If paused, allow exit
    if [[ "$paused" == "true" ]]; then
      allow_exit
    fi

    # If no active loop, allow exit
    if [[ "$loop_active" != "true" ]]; then
      allow_exit
    fi

    # Check if max iterations reached
    if [[ "$iteration" -ge "$max_iterations" ]]; then
      allow_exit
    fi

    # Loop is active and not complete - block exit
    if [[ "$loop_type" == "execute" ]]; then
      block_exit "Loop active. Continuing execute loop iteration $((iteration + 1))/$max_iterations. Run /opti-gsd:execute to retry failed tasks."
    elif [[ "$loop_type" == "verify" ]]; then
      block_exit "Loop active. Continuing verify loop iteration $((iteration + 1))/$max_iterations. Run /opti-gsd:verify to fix gaps and re-verify."
    else
      block_exit "Loop active. Run /opti-gsd:status to check state."
    fi
    ```

    Make executable: Git will preserve +x bit from commit.
  </action>
  <libraries>none</libraries>
  <verify>
    <check type="file">hooks/stop-hook.sh exists</check>
    <check type="content">Script contains shebang "#!/usr/bin/env bash"</check>
    <check type="content">Script contains "decision" JSON output</check>
    <check type="content">Script reads loop state from STATE.md</check>
  </verify>
  <done>stop-hook.sh exists with loop state checking and JSON decision output</done>
  <skills>none</skills>
</task>

<task id="03" wave="1">
  <files>
    <file action="modify">.gsd/config.md</file>
  </files>
  <action>
    Extend config.md with loop settings section.

    Add after the "# Verification" section (after line 70):

    ```yaml
    # Loop Settings
    loop:
      execute_max_retries: 3      # Max retries per failed task
      verify_max_iterations: 20   # Max verify-fix cycles
      auto_loop: true             # Enable loop by default (mode controls prompts)
    ```

    This defines project-level defaults.
    Mode (interactive/yolo) controls prompts, not whether loop runs.
  </action>
  <libraries>none</libraries>
  <verify>
    <check type="content">config.md contains "loop:" section</check>
    <check type="content">config.md contains "execute_max_retries"</check>
    <check type="content">config.md contains "verify_max_iterations"</check>
  </verify>
  <done>config.md contains loop settings section</done>
  <skills>none</skills>
</task>

## Wave 2 (Sequential - Command Modifications)

<task id="04" wave="2" depends="01,02,03">
  <files>
    <file action="modify">commands/execute.md</file>
  </files>
  <action>
    Add loop logic to execute.md.

    1. Update description (line 3):
       ```yaml
       description: Execute the current phase plan with wave-based parallelization, fresh context, and automatic retry on failures
       ```

    2. After "### Step 7: Handle Results" (around line 211), add:

       ```markdown
       ### Step 7a: Execute Loop - Retry Failed Tasks

       When a task reports TASK FAILED, the execute loop automatically attempts recovery.

       **Check Loop Settings:**
       - Read `loop.auto_loop` from config (default: true)
       - Read `loop.execute_max_retries` from config (default: 3)
       - Check current retry count for this task in STATE.md `loop.task_retries`

       **Mode-Based Behavior:**
       - **interactive mode**: Ask user before retry
         > "Task {N} failed. Retry? ({retries}/{max_retries} attempts used) [Y/n]"
       - **yolo mode**: Auto-retry without prompting

       **Retry Flow:**
       ```
       IF task_retries[task_id] < max_retries:
         1. Analyze failure from task output
         2. Generate error analysis (parse error, identify root cause)
         3. Update STATE.md loop state:
            loop:
              active: true
              type: execute
              phase: {N}
              iteration: {current + 1}
              task_retries:
                T{id}: {count + 1}
              last_error: {error_summary}
         4. Re-execute task with error context in prompt
         5. On success: continue to next task
         6. On failure: increment retry, loop back

       IF task_retries[task_id] >= max_retries:
         1. Update STATE.md:
            loop:
              active: false
              paused: true
              pause_reason: "Task {N} failed after {max_retries} retries"
         2. Report to user with full error context
         3. Stop execution
       ```

       **Error Context for Retry:**
       Include in retry subagent prompt:
       ```xml
       <previous_attempt>
         <error>{captured error output}</error>
         <analysis>{root cause analysis}</analysis>
         <suggested_fix>{specific fix to try}</suggested_fix>
         <attempt>{N} of {max_retries}</attempt>
       </previous_attempt>
       ```
       ```

    3. Update "### Step 8: Phase Complete" to clear loop state after completion.

    4. Add "## Loop State Reference" section at end documenting STATE.md loop schema.
  </action>
  <libraries>none</libraries>
  <verify>
    <check type="content">execute.md contains "Step 7a"</check>
    <check type="content">execute.md contains "task_retries"</check>
    <check type="content">execute.md contains "previous_attempt"</check>
    <check type="content">execute.md contains "Loop State Reference"</check>
  </verify>
  <done>execute.md contains Step 7a with loop retry logic</done>
  <skills>verification-before-completion</skills>
</task>

<task id="05" wave="2" depends="01,02,03">
  <files>
    <file action="modify">commands/verify.md</file>
  </files>
  <action>
    Add loop logic to verify.md.

    1. Update description (line 3):
       ```yaml
       description: Verify phase completion with goal-backward analysis, integration checking, and automatic gap fixing
       ```

    2. After "### Step 7: Handle Result" (around line 399), add:

       ```markdown
       ### Step 7a: Verify Loop - Fix Gaps and Re-verify

       When verification reports `gaps_found`, the verify loop automatically attempts to close gaps.

       **Check Loop Settings:**
       - Read `loop.auto_loop` from config (default: true)
       - Read `loop.verify_max_iterations` from config (default: 20)
       - Check current iteration in STATE.md `loop.iteration`

       **Mode-Based Behavior:**
       - **interactive mode**: Ask before fix attempt
         > "Verification found {N} gaps. Attempt automatic fix? ({iteration}/{max}) [Y/n]"
       - **yolo mode**: Auto-fix without prompting

       **Gap-to-Task Generation:**

       Parse `<gaps>` from VERIFICATION.md and generate fix tasks:

       | Gap Type | Fix Strategy |
       |----------|--------------|
       | orphan | Add import + usage to parent |
       | broken_link | Fix path/typo in reference |
       | stub | Implement real functionality |
       | missing_export | Add export statement |
       | wrong_import | Correct import path |
       | ci_failure | Apply specific fix for error |

       **Verify Loop Flow:**
       ```
       IF iteration < max_iterations:
         1. Parse gaps from VERIFICATION.md
         2. Generate fix tasks (one per gap)
         3. Update STATE.md loop state
         4. Execute fix tasks (spawn subagents)
         5. Commit fixes atomically
         6. Re-run verification
         7. If passed: clear loop, report success
         8. If gaps remain: loop back

       IF iteration >= max_iterations:
         1. Mark loop as paused
         2. Report remaining gaps to user
         3. Suggest manual intervention
       ```

       **Fix Task Subagent Prompt:**
       ```xml
       <gap type="{type}" iteration="{N}/{max}">
         <file>{affected_file}</file>
         <description>{gap_description}</description>
         <evidence>{from VERIFICATION.md}</evidence>
       </gap>
       ```
       ```

    3. Update `gaps_found` section in Step 7 to integrate with loop (proceed to Step 7a by default).

    4. Add "## Loop State Reference" and "## Gap Types" reference sections at end.
  </action>
  <libraries>none</libraries>
  <verify>
    <check type="content">verify.md contains "Step 7a"</check>
    <check type="content">verify.md contains "Gap-to-Task"</check>
    <check type="content">verify.md contains "gaps_remaining"</check>
    <check type="content">verify.md contains "Loop State Reference"</check>
  </verify>
  <done>verify.md contains Step 7a with verify loop and gap-to-task generation</done>
  <skills>verification-before-completion</skills>
</task>

## Wave 3 (Sequential - Integration)

<task id="06" wave="3" depends="04,05">
  <files>
    <file action="modify">.gsd/STATE.md</file>
  </files>
  <action>
    Update STATE.md to include initialized loop state schema.

    Add to YAML frontmatter after `open_issues: []`:

    ```yaml
    loop:
      active: false
      type: null
      phase: null
      iteration: 0
      max_iterations: 20
      task_retries: {}
      gaps_remaining: 0
      started: null
      last_iteration: null
      paused: false
      pause_reason: null
      history: []
    ```

    Update Session Context:
    ```markdown
    ## Session Context
    Phase 1 planned: Loop mechanism for execute and verify.
    Loop infrastructure ready.
    Ready for execution.
    ```
  </action>
  <libraries>none</libraries>
  <verify>
    <check type="content">STATE.md contains "loop:" section</check>
    <check type="content">STATE.md contains "task_retries:"</check>
    <check type="content">STATE.md contains "history:"</check>
  </verify>
  <done>STATE.md contains initialized loop state schema</done>
  <skills>none</skills>
</task>

<task id="07" wave="3" depends="04,05">
  <files>
    <file action="modify">.gsd/ROADMAP.md</file>
  </files>
  <action>
    Update ROADMAP.md to mark Phase 1 as PLANNED.

    Change line 9 from:
    ```markdown
    **Status:** DISCUSSED
    ```
    To:
    ```markdown
    **Status:** PLANNED
    ```

    Update the "### Delivers" section to reflect final implementation:
    ```markdown
    ### Delivers
    - Execute loop: retry failed tasks automatically (mode-controlled)
    - Verify loop: fix gaps and re-verify until passed (mode-controlled)
    - Stop hook: intercept exit when loop incomplete
    - Loop is DEFAULT behavior (controlled by mode, not flags)
    - Cross-platform hooks (Windows Git Bash + Unix)
    ```

    Update "### Tasks" to "### Components" with actual files:
    ```markdown
    ### Components
    1. hooks/hooks.json - Stop hook configuration
    2. hooks/stop-hook.sh - Cross-platform stop hook script
    3. commands/execute.md - Step 7a: Loop retry logic
    4. commands/verify.md - Step 7a: Loop fix logic
    5. .gsd/config.md - Loop settings section
    6. .gsd/STATE.md - Loop state tracking schema
    ```
  </action>
  <libraries>none</libraries>
  <verify>
    <check type="content">ROADMAP.md contains "PLANNED"</check>
    <check type="content">ROADMAP.md contains "hooks.json"</check>
  </verify>
  <done>ROADMAP.md reflects Phase 1 as PLANNED</done>
  <skills>none</skills>
</task>

---

## Key Links

| From | To | Connection |
|------|-----|------------|
| hooks/hooks.json | hooks/stop-hook.sh | Points to script path |
| hooks/stop-hook.sh | .gsd/STATE.md | Reads loop state |
| commands/execute.md | .gsd/STATE.md | Writes loop.task_retries |
| commands/verify.md | .gsd/STATE.md | Writes loop.iteration |
| .gsd/config.md | commands/execute.md | Provides execute_max_retries |
| .gsd/config.md | commands/verify.md | Provides verify_max_iterations |

---

## Context Budget

- Wave 1: ~10% (infrastructure files)
- Wave 2: ~25% (command modifications)
- Wave 3: ~5% (state updates)
- Total: ~40% orchestrator budget
