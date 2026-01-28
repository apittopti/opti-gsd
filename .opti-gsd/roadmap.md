# Roadmap: v2.4.0 - Cleanup & Single Source of Truth

**Milestone:** v2.4.0
**Goal:** Remove redundant version tracking, maintain single source of truth

## Problem Statement

- VERSION file exists separately from package.json
- Two places to update version = potential for mismatch
- package.json is the actual source of truth for npm/npx

## Success Criteria

- [x] VERSION file removed
- [x] package.json is the only version source
- [x] CLI updated if it references VERSION file

---

## Phase 1: Remove VERSION File [COMPLETE]

**Goal:** Single source of truth for version

**Delivers:** Cleaner codebase with no version duplication

**Success Criteria:**
- [x] VERSION file deleted
- [x] No references to VERSION file in codebase
- [x] package.json version remains authoritative

**Implementation Notes:**
- Check if bin/cli.js or any file reads VERSION
- Delete VERSION file
- Verify npm/npx still works correctly

---
