---
description: Debug with competing hypotheses — spawn an Agent Team where investigators challenge each other's theories
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, Task
argument-hint: "<description of the bug>"
---

# Team Debug — Competing Hypotheses

Debug a complex issue by spawning an Agent Team where multiple investigators each pursue a different hypothesis and actively challenge each other's findings. This is the "scientific debate" pattern — the theory that survives scrutiny is most likely the root cause.

**Use team-debug when:**
- The root cause is unclear and could be in multiple systems
- Sequential debugging has stalled or gone in circles
- The bug involves multiple interacting components
- You want to avoid anchoring bias (committing to the first plausible theory)

**Use standard /opti-gsd:debug when:**
- The bug is in a single component
- The root cause is likely obvious from the error
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
Team debugging requires Agent Teams (experimental).

To enable, add to your Claude Code settings.json:
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}

→ Or use /opti-gsd:debug for standard sequential debugging.
```

## Step 1: Understand the Bug

If `$ARGUMENTS` provided, use that as the bug description. Otherwise ask:
```
Describe the bug:
  - What's happening?
  - What should happen instead?
  - Steps to reproduce?
  - Any error messages?
  - What systems/components could be involved?
```

## Step 2: Reproduce

Before spawning the team, attempt basic reproduction:
1. Run the failing command or navigate to the failing state
2. Capture the exact error output
3. Identify candidate areas of the codebase

If can't reproduce:
```
⚠️ Cannot reproduce the issue.
  - Is the error intermittent?
  - Are there specific conditions needed?

Proceeding with hypothesis-based investigation anyway.
```

## Step 3: Generate Hypotheses

Based on the bug description and initial investigation, generate 3-5 distinct hypotheses about the root cause. Each should point to a different area of the codebase.

Example:
```
Bug: "API returns 500 after deploying auth changes"

Hypotheses:
  H1: Token validation logic has a regression
  H2: Database migration didn't run, schema mismatch
  H3: Environment variable for auth service URL changed
  H4: Rate limiter is rejecting requests incorrectly
  H5: Middleware ordering changed, auth runs before parsing
```

## Step 4: Create the Investigation Team

```
Create an agent team to investigate this bug using competing hypotheses.

Bug description: {description}
Error output: {captured error}

Spawn {N} investigator teammates, one per hypothesis:
{for each hypothesis}
- Investigator "{H_label}": {hypothesis description}
{end for}

Rules for investigators:
1. Each investigator pursues their assigned hypothesis
2. They MUST look for evidence both FOR and AGAINST their theory
3. They should message other investigators to challenge their findings
4. When an investigator finds evidence that supports ANOTHER theory,
   they must share it with that investigator
5. Investigators should NOT make code changes — read-only investigation
6. Each investigator reports: evidence found, confidence level (high/medium/low),
   and whether they think their hypothesis is the root cause
```

### Investigator Spawn Prompt Template

For each hypothesis:
```
Spawn investigator teammate "{H_label}-investigator" with the prompt:
"You are investigating a bug in the codebase.

Bug: {description}
Error: {error output}

YOUR HYPOTHESIS: {hypothesis}
You believe the root cause is: {detailed hypothesis}

Your job:
1. Search the codebase for evidence supporting this theory
2. Also search for evidence AGAINST this theory (be honest)
3. Check git history for recent changes in your area
4. Message other investigators if you find something relevant to their hypothesis
5. Challenge other investigators' findings if you have counter-evidence

Other investigators and their hypotheses:
{list of other hypotheses and teammate names}

DO NOT modify any code. Read-only investigation.

Report your findings as:
  Hypothesis: {label}
  Confidence: high/medium/low
  Evidence FOR: {list}
  Evidence AGAINST: {list}
  Root cause? yes/no/maybe
  Recommended fix: {if you believe this is the cause}"
```

## Step 5: Monitor the Debate

While investigators work:
- Watch for cross-team messages (evidence sharing, challenges)
- If an investigator gets stuck, redirect them
- If two investigators converge on the same area, have them collaborate
- After sufficient investigation, ask for final reports

```
Ask all investigators to finalize their reports. Which hypothesis
has the strongest evidence? Challenge any investigator whose
confidence seems too high relative to their evidence.
```

## Step 6: Synthesize Findings

Collect all investigator reports and synthesize:

```
Bug Investigation Complete
══════════════════════════════════════════════════════════════

Hypotheses Tested: {count}

Results:
─────────────────────────────────────────────────────────────
  {H1}: {hypothesis} — Confidence: {level}
    Evidence: {summary}
    Verdict: {supported/refuted/inconclusive}

  {H2}: {hypothesis} — Confidence: {level}
    Evidence: {summary}
    Verdict: {supported/refuted/inconclusive}

  ...

Root Cause: {winning hypothesis or "inconclusive"}
─────────────────────────────────────────────────────────────

Supporting Evidence:
  • {key evidence 1}
  • {key evidence 2}

Recommended Fix:
  {specific fix recommendation with file and line references}
```

## Step 7: Clean Up Team

Shut down all investigators and clean up the team.

## Step 8: Apply Fix (If Approved)

If the user approves the fix:

1. Create a checkpoint:
   ```bash
   git tag -f "gsd/checkpoint/debug/pre" HEAD
   ```

2. Write a failing test that reproduces the bug (if testable)

3. Apply the minimal fix identified by the investigation

4. Run tests:
   ```bash
   {config.ci.test}
   ```

5. Commit:
   ```bash
   git add {changed_files}
   git commit -m "fix: {brief description}

   - Root cause: {winning hypothesis}
   - Investigated {count} hypotheses via Agent Team
   - Evidence: {key evidence summary}"
   ```

6. Report:
   ```
   ✓ Bug Fixed
   ─────────────────────────────────────
   Root cause: {explanation}
   Fix: {what was changed}
   Files: {list}
   Hypotheses tested: {count}

   → Consider /opti-gsd:add-issue to track this for future reference
   ```

If the user wants to investigate further or the results are inconclusive:
```
Investigation inconclusive. Options:
  A) Spawn new team with refined hypotheses
  B) Switch to /opti-gsd:debug for sequential deep-dive
  C) Capture as issue: /opti-gsd:add-issue
```
