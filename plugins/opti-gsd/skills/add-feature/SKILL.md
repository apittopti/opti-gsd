---
description: Capture a feature idea for future planning without interrupting current work
disable-model-invocation: true
allowed-tools: Read, Bash, Write, AskUserQuestion
argument-hint: "<feature description>"
---

# Add Feature

Capture a feature idea quickly. Creates a feature file in `.opti-gsd/features/`.

## Process

1. Get next feature number:
   ```bash
   ls .opti-gsd/features/F*.md 2>/dev/null | wc -l
   ```
   Next ID = `F{count + 1}` (zero-padded to 3 digits: F001, F002, etc.)

2. If `$ARGUMENTS` provided, use as description. Otherwise ask:
   ```
   Describe the feature:
   ```

3. Create `.opti-gsd/features/F{NNN}.md`:

   ```markdown
   # F{NNN}: {title}

   **Added:** {date}
   **Status:** captured

   ## Description

   {description}

   ## Notes

   {any additional context}
   ```

4. Commit:
   ```bash
   git add .opti-gsd/features/F{NNN}.md
   git commit -m "feat: capture feature F{NNN} — {title}"
   ```

5. Report:
   ```
   ✓ Feature Captured: F{NNN}
   ─────────────────────────────────────
   {title}

   Saved to .opti-gsd/features/F{NNN}.md
   This will be considered during future phase planning.
   ```

## List Features

If `$ARGUMENTS` is "list" or "ls", list all features:
```
Features:
─────────────────────────────────────
F001: {title} — {status}
F002: {title} — {status}
```
