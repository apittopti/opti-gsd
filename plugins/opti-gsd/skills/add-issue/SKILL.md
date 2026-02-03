---
description: Capture a bug or issue for tracking and future phase planning
disable-model-invocation: true
argument-hint: "<issue description>"
---

# Add Issue

Capture a bug or issue. Creates an issue file in `.opti-gsd/issues/`.

## Process

1. Get next issue number:
   ```bash
   ls .opti-gsd/issues/ISS*.md 2>/dev/null | wc -l
   ```
   Next ID = `ISS{count + 1}` (zero-padded to 3 digits: ISS001, ISS002, etc.)

2. If `$ARGUMENTS` provided, use as description. Otherwise ask:
   ```
   Describe the issue:
     - What's broken?
     - How to reproduce?
     - Severity: (critical / high / medium / low)
   ```

3. Create `.opti-gsd/issues/ISS{NNN}.md`:

   ```markdown
   # ISS{NNN}: {title}

   **Added:** {date}
   **Status:** open
   **Severity:** {severity}
   **Phase:** unassigned

   ## Description

   {description}

   ## Steps to Reproduce

   1. {step}

   ## Expected Behavior

   {expected}

   ## Actual Behavior

   {actual}
   ```

4. Commit:
   ```bash
   git add .opti-gsd/issues/ISS{NNN}.md
   git commit -m "docs: capture issue ISS{NNN} — {title}"
   ```

5. Report:
   ```
   ✓ Issue Captured: ISS{NNN}
   ─────────────────────────────────────
   {title} ({severity})

   Saved to .opti-gsd/issues/ISS{NNN}.md
   ```

## List Issues

If `$ARGUMENTS` is "list" or "ls", list all issues:
```
Issues:
─────────────────────────────────────
ISS001: {title} — {severity} / {status}
ISS002: {title} — {severity} / {status}
```
