# /opti-gsd:review — User Feedback Loop

## The Problem

Current workflow is linear and one-directional:

```
execute → verify → plan-fix (automated gaps only) → execute again → verify again
                                                      ↑
                                             No user input here
```

After execution, the user can see the result but has no structured way to say:
- "The login form works but the styling is wrong"
- "This feature does X but I wanted Y"
- "The API returns data but the format is wrong"
- "You missed handling the edge case where..."
- "The error messages aren't user-friendly"

The only options are:
1. Start a whole new phase (overkill)
2. Use `/opti-gsd:quick` for each individual fix (disconnected from context)
3. Manually fix everything (defeats the purpose)
4. `/opti-gsd:plan-fix` which only addresses automated verification gaps, not user observations

## The Solution: `/opti-gsd:review`

A **human-in-the-loop review command** that accepts user feedback after execution (or after verification) and generates targeted refinement tasks.

---

## Command Definition

```yaml
name: opti-gsd:review
description: Review phase results, provide feedback, and generate refinement tasks
arguments:
  - phase: Phase number (optional, defaults to current/last executed phase)
```

## Workflow Position

```
execute → review (NEW) → verify → review (optional) → plan-fix → execute → done
              ↑                        ↑
         User describes           User reviews
         what needs fixing         verification results
```

The key insight: **review can be used at ANY point after execution**, not just once. It's a conversation, not a gate.

## Behavior

### Step 1: Present Current State

Show the user what was done, making it easy to identify issues:

```markdown
## Phase {N} Review: {Title}

### Completed Tasks
| # | Task | Files Changed | Tests |
|---|------|--------------|-------|
| T01 | Setup auth schema | 3 files | 4 passing |
| T02 | Create login page | 2 files | 2 passing |
| T03 | Add API endpoints | 4 files | 6 passing |

### What You Should See
{Compiled from user_observable fields in plan.json}
1. User can navigate to /login and see a login form
2. User can enter email/password and submit
3. User sees error message for invalid credentials
4. User is redirected to dashboard on success

### Quick Checks
{If browser MCP available, offer to screenshot key pages}
{If API endpoints created, show example curl commands}
{If CLI tool, show example commands}

**What would you like to change or fix?**
(Describe issues, or type "looks good" to proceed to verification)
```

### Step 2: Collect User Feedback

Accept free-form feedback. The user can describe issues in plain English:

```
User: "The login form works but:
1. There's no 'forgot password' link
2. The error message just says 'Error' — it should say what went wrong
3. The form doesn't clear after a failed attempt
4. I also want a 'remember me' checkbox"
```

Or structured feedback:

```
User: "T02 needs changes — the form layout should be centered, not left-aligned"
```

### Step 3: Categorize Feedback

Parse user feedback into categories:

| Category | Description | Action |
|----------|-------------|--------|
| **Missing feature** | Something that should exist but doesn't | New task |
| **Wrong behavior** | Works but does the wrong thing | Modify task |
| **Visual/UX** | Looks wrong, bad layout, wrong text | Quick fix |
| **Edge case** | Doesn't handle a specific scenario | New test + fix |
| **Scope change** | User changed their mind about requirements | Update CONTEXT + new task |

Present the categorization back to the user:

```markdown
## Feedback Analysis

I've categorized your feedback:

| # | Feedback | Category | Estimated Effort |
|---|----------|----------|-----------------|
| 1 | Add 'forgot password' link | Missing feature | New task (small) |
| 2 | Improve error messages | Wrong behavior | Modify T02 output |
| 3 | Clear form after failure | Edge case | New test + fix |
| 4 | Add 'remember me' checkbox | Missing feature | New task (small) |

**Does this look right?** (Adjust if needed, or confirm to generate fix plan)
```

### Step 4: Generate Review Plan

Create `.opti-gsd/plans/phase-{N}/review-plan.json` with targeted tasks:

```json
{
  "type": "review",
  "phase": 1,
  "source": "user_review",
  "feedback_items": 4,
  "waves": [
    {
      "wave": 1,
      "parallel": true,
      "tasks": [
        {
          "id": "R01",
          "title": "Add forgot password link to login form",
          "source": "user_feedback #1",
          "category": "missing_feature",
          "files": ["src/app/login/page.tsx"],
          "test_required": true,
          "action": "Add a 'Forgot password?' link below the login form that navigates to /auth/forgot-password",
          "user_observable": "User sees 'Forgot password?' link on login page",
          "verify": "Link visible and navigates to correct page",
          "done": "Forgot password link present and functional"
        },
        {
          "id": "R02",
          "title": "Improve login error messages",
          "source": "user_feedback #2",
          "category": "wrong_behavior",
          "files": ["src/app/login/page.tsx", "src/api/auth.ts"],
          "test_required": true,
          "action": "Replace generic 'Error' message with specific messages: 'Invalid email or password', 'Account not found', 'Too many attempts'",
          "user_observable": "User sees specific error message explaining what went wrong",
          "verify": "Different error scenarios show different messages",
          "done": "All error cases have specific, user-friendly messages"
        },
        {
          "id": "R03",
          "title": "Clear form after failed login attempt",
          "source": "user_feedback #3",
          "category": "edge_case",
          "files": ["src/app/login/page.tsx"],
          "test_required": true,
          "test_files": ["src/app/login/__tests__/page.test.tsx"],
          "action": "Clear password field (keep email) after failed login attempt",
          "user_observable": "After failed login, password field is cleared but email remains",
          "verify": "Failed login clears password but keeps email",
          "done": "Form state resets correctly on failure"
        },
        {
          "id": "R04",
          "title": "Add remember me checkbox",
          "source": "user_feedback #4",
          "category": "missing_feature",
          "files": ["src/app/login/page.tsx", "src/api/auth.ts"],
          "test_required": true,
          "action": "Add 'Remember me' checkbox. When checked, extend session duration from 1 hour to 30 days.",
          "user_observable": "User sees 'Remember me' checkbox on login form",
          "verify": "Checkbox toggles session duration",
          "done": "Remember me functionality works end-to-end"
        }
      ]
    }
  ]
}
```

### Step 5: Execute Review Fixes

```markdown
## Review Plan Ready

**Feedback items:** 4
**Tasks generated:** 4 (all in 1 wave, parallelizable)

Execute refinements now? [Y/n]

→ Yes: Spawns executor with review-plan.json
→ No: Saves plan for later execution with /opti-gsd:execute --review
```

Execution uses the SAME executor agent with the SAME quality gates:
- TDD (if test_required)
- Two-stage review (spec compliance + quality)
- Verification-before-completion
- Atomic commits

### Step 6: After Review Execution

```markdown
## Review Complete: Phase {N}

**Refinements applied:** 4/4
**New tests added:** 3
**Commits:** 4

### Changes Summary
- R01: Added forgot password link (commit abc123)
- R02: Improved error messages with specific text (commit def456)
- R03: Form clears password on failure (commit ghi789)
- R04: Added remember me checkbox (commit jkl012)

### What's Next?
→ /opti-gsd:review {N}           — More feedback? Keep iterating
→ /opti-gsd:verify {N}           — Satisfied? Run verification
→ Type feedback directly          — Just tell me what else needs fixing
```

The key: **the user can keep running /opti-gsd:review as many times as needed**. Each round generates targeted fixes. When satisfied, they proceed to verify.

## Multiple Review Rounds

Review plans are numbered: `review-plan-1.json`, `review-plan-2.json`, etc.

```
Round 1: User spots 4 issues → 4 fix tasks → execute
Round 2: User spots 2 more issues → 2 fix tasks → execute
Round 3: "Looks good" → proceed to verify
```

Each round's review plan and results are preserved for history.

## Integration with Existing Commands

### From execute.md (Step 10 - Report)
Update next steps to include review:

```markdown
**Next steps:**
→ /opti-gsd:review {N}          — Review results and provide feedback
→ /opti-gsd:verify {N}          — Verify phase completion
→ /opti-gsd:plan-phase {N+1}    — Plan next phase
```

### From verify.md (Step 7 - Handle Result)
Update gaps_found and human_needed to include review:

```markdown
**Next steps:**
→ /opti-gsd:review {N}          — Describe what's wrong (recommended)
→ /opti-gsd:plan-fix {N}        — Auto-generate fixes for technical gaps
→ Fix manually and re-verify
```

### State Tracking
Add to state.json:

```json
{
  "phases": {
    "1": {
      "status": "review",
      "review_rounds": 2,
      "last_review": "2026-01-31T10:30:00Z"
    }
  }
}
```

## Why This Is Different from plan-fix

| | plan-fix | review |
|---|---------|--------|
| **Input** | Automated verification gaps | Human observations |
| **Scope** | Technical (orphans, CI, links) | Anything (UX, behavior, missing features) |
| **Trigger** | After verification finds gaps | After execution OR verification, any time |
| **Iteration** | Single pass | Multiple rounds until user satisfied |
| **Context** | Reads verification.md | Reads user's words + plan.json + actual code |

## Why This Is Different from quick

| | quick | review |
|---|-------|--------|
| **Context** | Standalone, no phase context | Full phase context (plan, tasks, commits) |
| **Scope** | Any ad-hoc task | Refinements to specific phase output |
| **Tracking** | Separate quick_tasks array | Part of phase lifecycle |
| **History** | Disconnected | Linked to original tasks (R01 refines T02) |

---

## Implementation Changes Required

### New Files
1. `commands/opti-gsd/review.md` — This command definition

### Modified Files
1. `commands/opti-gsd/execute.md` — Step 10: Add review to next steps (first option)
2. `commands/opti-gsd/verify.md` — Step 7: Add review to gap handling options
3. `commands/opti-gsd/status.md` — Recognize "review" phase status
4. `commands/opti-gsd/help.md` — Add review command
5. `agents/opti-gsd/opti-gsd-executor.md` — Handle review-plan.json format (same as plan.json, different source field)

### State Changes
- New phase status: `"review"` (between executed and verified)
- New state field: `review_rounds` counter
- New artifacts: `review-plan-{N}.json` per round
