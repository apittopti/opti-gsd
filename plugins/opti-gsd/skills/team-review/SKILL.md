---
description: Multi-perspective code review — spawn an Agent Team with specialized reviewers that debate findings
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, Task
argument-hint: "[phase-number]"
---

# Team Review — Multi-Perspective Code Review

Review phase execution results using an Agent Team with specialized reviewers. Each reviewer examines changes through a different lens (security, performance, correctness, test coverage) and they debate findings to produce a thorough, multi-perspective review.

**Use team-review when:**
- The phase touched security-sensitive code (auth, payments, user data)
- Performance-critical paths were modified
- Changes span multiple layers (frontend, backend, database)
- You want maximum review confidence before shipping

**Use standard /opti-gsd:review when:**
- Small, focused changes
- Single-domain changes
- Token budget is a concern

## Prerequisites

Agent Teams must be enabled. Check:
```bash
echo $CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS
```

If not set:
```
⚠️ Agent Teams Not Enabled
─────────────────────────────────────
Team review requires Agent Teams (experimental).

To enable, add to your Claude Code settings.json:
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}

→ Or use /opti-gsd:review for standard single-perspective review.
```

## Phase Directory Convention

**CRITICAL:** Phase directories are ALWAYS zero-padded to 2 digits.
Phase 1 = `phase-01`. Format: `.opti-gsd/plans/phase-{NN}/`

## Step 0: Validate

1. Check `.opti-gsd/` exists
2. Determine phase (from argument or state.json)
3. Verify phase has been executed (summary.md exists)

If not executed:
```
⚠️ Phase Not Executed
─────────────────────────────────────
Phase {N} has not been executed yet.
→ Run /opti-gsd:execute or /opti-gsd:team-execute first.
```

## Step 1: Load Context

Read:
- `.opti-gsd/plans/phase-{NN}/plan.json` — what was planned
- `.opti-gsd/plans/phase-{NN}/summary.md` — what was executed
- `.opti-gsd/config.json` — CI commands, project type

Get the diff:
```bash
git diff gsd/checkpoint/phase-{NN}/pre..HEAD --stat
git diff gsd/checkpoint/phase-{NN}/pre..HEAD
```

## Step 2: Create Review Team

Spawn a team of specialized reviewers. The default team is:

```
Create an agent team to review Phase {N} from multiple perspectives.

Changes to review:
{diff stat summary}

Plan requirements:
{must_haves from plan.json}

Spawn these reviewer teammates:

1. "correctness-reviewer": Reviews whether the implementation correctly
   fulfills the plan requirements. Checks logic, edge cases, error handling,
   and plan compliance.

2. "security-reviewer": Reviews for security vulnerabilities — injection,
   auth bypass, data exposure, OWASP top 10. Checks input validation,
   output encoding, and access control.

3. "quality-reviewer": Reviews code quality — patterns, readability,
   maintainability, test coverage. Checks naming, duplication, complexity,
   and whether tests actually test the right things.

Rules for all reviewers:
- Read the plan.json to understand what was intended
- Read the actual diff to see what was implemented
- Run CI checks to verify passing state
- Message other reviewers if you find something in their domain
- Challenge other reviewers' findings if you disagree
- Categorize findings as: must-fix, should-fix, nice-to-have
- Do NOT make code changes — review only
```

### Reviewer Spawn Prompt Template

For each reviewer:
```
Spawn reviewer teammate "{role}-reviewer" with the prompt:
"You are a specialized {role} reviewer for Phase {N} of the opti-gsd project.

Plan: {plan.json summary}
Must-haves: {must_haves}

Your review focus: {role-specific instructions}

Get the diff:
  git diff gsd/checkpoint/phase-{NN}/pre..HEAD

Run CI checks:
  {ci.lint}
  {ci.typecheck}
  {ci.test}

For each finding, report:
  - Severity: must-fix / should-fix / nice-to-have
  - File and line number
  - Description of the issue
  - Suggested fix

Other reviewers: {list of other reviewer names and their focus areas}
Message them if you find something in their domain.
Challenge their findings if you have a different perspective.

DO NOT modify code. Review only."
```

### Role-Specific Instructions

**Correctness Reviewer:**
```
Focus on:
- Does each task's implementation match the plan's action instructions?
- Are all files from the plan created/modified?
- Edge cases: empty inputs, null values, boundary conditions
- Error handling: are errors caught and handled appropriately?
- Logic correctness: does the code do what it claims?
- Plan compliance: are all must_haves satisfied?
```

**Security Reviewer:**
```
Focus on:
- Injection vulnerabilities (SQL, command, XSS, template)
- Authentication and authorization checks
- Data exposure (logging secrets, leaking PII)
- Input validation at system boundaries
- Cryptographic usage (hardcoded keys, weak algorithms)
- Dependency vulnerabilities (if new deps added)
- OWASP Top 10 applicability
```

**Quality Reviewer:**
```
Focus on:
- Code duplication and DRY violations
- Naming clarity and consistency with existing patterns
- Cyclomatic complexity — are functions too complex?
- Test quality — do tests actually verify behavior or just coverage?
- Missing tests for new code paths
- Consistency with existing codebase conventions
- Dead code or unused imports
```

## Step 3: Monitor Review Discussion

While reviewers work:
- Watch for cross-reviewer messages (disagreements, shared findings)
- If reviewers converge on the same issue, note the consensus
- After sufficient review, ask for final reports

```
Ask all reviewers to finalize their reports. Resolve any disagreements
by having the relevant reviewers discuss their perspectives.
```

## Step 4: Synthesize Review

Collect all reviewer reports and merge into a unified review:

```
Phase {N} Team Review
══════════════════════════════════════════════════════════════

Reviewers: Correctness, Security, Quality
Plan Compliance: {X}/{total} tasks fully implemented

🔴 Must Fix (blocks verification):
─────────────────────────────────────────────────────────────
  1. [{reviewer}] {description} — {file}:{line}
     Agreed by: {list of reviewers who confirmed}

  2. [{reviewer}] {description} — {file}:{line}

🟡 Should Fix (quality concerns):
─────────────────────────────────────────────────────────────
  1. [{reviewer}] {description} — {file}:{line}

🟢 Nice to Have:
─────────────────────────────────────────────────────────────
  1. [{reviewer}] {description}

⚠️ Out of Scope (defer to future phase):
─────────────────────────────────────────────────────────────
  1. [{reviewer}] {description}

Review Consensus:
─────────────────────────────────────────────────────────────
  • Correctness: {pass/concerns}
  • Security: {pass/concerns}
  • Quality: {pass/concerns}
```

**Cross-reviewer agreement strengthens findings.** If multiple reviewers independently flag the same issue, note it as high-confidence.

## Step 5: Clean Up Team

Shut down all reviewers and clean up the team.

## Step 6: Handle User Response

**If user says "looks good" or approves:**
```
✓ Team Review Approved
─────────────────────────────────────
→ /opti-gsd:verify    — Run automated verification
→ /opti-gsd:push      — Push for CI/preview
```

Update state.json: `"status": "reviewed"`

**If user says "fix":**
Apply targeted fixes for must-fix and approved should-fix items:
1. Fix each issue
2. Commit:
   ```bash
   git add {changed_files}
   git commit -m "fix(phase-{NN}-TR{round}): {summary}

   - {fix 1} [flagged by {reviewer}]
   - {fix 2} [flagged by {reviewer}]"
   ```
3. Re-run CI checks
4. Present updated status (no need to re-spawn full team for fix verification)

**If user requests specific changes:**
Apply the requested changes, commit, and present results.

## Step 7: Update State

After review is approved:
```json
{
  "status": "reviewed",
  "review": {
    "mode": "agent-team",
    "reviewers": ["correctness", "security", "quality"],
    "must_fix_count": 0,
    "should_fix_count": 0
  },
  "last_active": "{timestamp}"
}
```
