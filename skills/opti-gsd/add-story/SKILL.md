---
name: add-story
description: Capture a user story with acceptance criteria for phase planning
disable-model-invocation: true
argument-hint: "<story description>"
---

# Add Story

Capture a user story. Creates a story file in `.opti-gsd/stories/`.

## Process

1. Get next story number:
   ```bash
   ls .opti-gsd/stories/US*.md 2>/dev/null | wc -l
   ```
   Next ID = `US{count + 1}` (zero-padded to 3 digits: US001, US002, etc.)

2. If `$ARGUMENTS` provided, use as description. Otherwise ask:
   ```
   As a _____, I want to _____, so that _____.
   ```

3. Create `.opti-gsd/stories/US{NNN}.md`:

   ```markdown
   # US{NNN}: {title}

   **Added:** {date}
   **Status:** captured
   **Phase:** unassigned

   ## Story

   As a {role}, I want to {action}, so that {benefit}.

   ## Acceptance Criteria

   - [ ] {criterion 1}
   - [ ] {criterion 2}
   - [ ] {criterion 3}

   ## Notes

   {additional context}
   ```

4. Commit:
   ```bash
   git add .opti-gsd/stories/US{NNN}.md
   git commit -m "docs: capture story US{NNN} — {title}"
   ```

5. Report:
   ```
   ✓ Story Captured: US{NNN}
   ─────────────────────────────────────
   {title}

   Saved to .opti-gsd/stories/US{NNN}.md
   Assign to a phase in /opti-gsd:roadmap
   ```

## List Stories

If `$ARGUMENTS` is "list" or "ls", list all stories:
```
Stories:
─────────────────────────────────────
US001: {title} — Phase {N} / {status}
US002: {title} — unassigned
```
