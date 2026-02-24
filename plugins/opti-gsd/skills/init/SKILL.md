---
description: Initialize opti-gsd in an existing project — analyzes codebase, creates config, state, and directory structure
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash, Write, Edit, AskUserQuestion
---

# Initialize opti-gsd

Set up opti-gsd for an existing project. For brownfield projects (existing code), this includes codebase analysis to understand the architecture before planning.

## Step 1: Check if Already Initialized

If `.opti-gsd/` already exists:
```
⚠️ Already Initialized
─────────────────────────────────────
.opti-gsd/ directory already exists.

→ Run /opti-gsd:status to see current state
→ Delete .opti-gsd/ and re-run /opti-gsd:init to start fresh
```

## Step 2: Check Branch Safety

```bash
git branch --show-current
```

If on `master`, `main`, `production`, or `prod`:
```
🛑 BLOCKED: Protected Branch
─────────────────────────────────────
Cannot initialize on '{branch}'. This is a protected branch.

Create a milestone branch first:
  git checkout -b gsd/v1.0
Then run /opti-gsd:init again.
```

## Step 3: Detect Project Type

Read existing project files to detect:
- `package.json` → project name, scripts (test, lint, build, typecheck), dependencies
- `tsconfig.json` / `jsconfig.json` → TypeScript/JavaScript
- `pyproject.toml` / `setup.py` / `requirements.txt` → Python
- `Cargo.toml` → Rust
- `go.mod` → Go
- `pom.xml` / `build.gradle` → Java/Kotlin
- `.github/workflows/` → existing CI
- `Dockerfile` / `docker-compose.yml` → container setup
- `next.config.*` / `nuxt.config.*` / `vite.config.*` → framework

## Step 4: Brownfield Analysis

**Determine if brownfield** (existing code) or greenfield (empty/new project):

```bash
# Count source files (excluding node_modules, .git, etc.)
find . -type f \( -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.rs" -o -name "*.go" -o -name "*.java" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" -not -path "*/build/*" | wc -l
```

**If brownfield (>5 source files)**, analyze the codebase:

### 4a: Architecture Scan

Use Glob and Grep to identify:
- **Directory structure** — top-level layout, key directories
- **Entry points** — main files, index files, app files
- **Tech stack** — frameworks, libraries, major dependencies
- **Patterns** — component structure, API routes, data models

### 4b: Dependency Analysis

Read package.json/pyproject.toml/Cargo.toml for:
- **Core dependencies** — framework, ORM, HTTP client, testing
- **Dev dependencies** — build tools, linters, formatters, test runners
- **Scripts** — available build/test/lint commands

### 4c: Code Metrics

```bash
# File count by type
find . -type f -name "*.ts" -not -path "*/node_modules/*" | wc -l
find . -type f -name "*.test.*" -not -path "*/node_modules/*" | wc -l
```

- Total source files
- Test file count
- Approximate test coverage indicator
- Number of components/modules/packages

### 4d: Write Analysis

Write `.opti-gsd/codebase-analysis.md`:

```markdown
# Codebase Analysis

Generated: {date}

## Overview

| Metric | Value |
|--------|-------|
| Project | {name} |
| Type | {detected_type} |
| Framework | {framework} |
| Language | {language} |
| Source files | {count} |
| Test files | {count} |

## Architecture

{description of directory structure and patterns}

### Key Directories
- `src/` — {description}
- `tests/` — {description}
- ...

### Entry Points
- {file} — {purpose}

## Tech Stack

### Core
- {framework} — {version}
- {library} — {purpose}

### Dev Tools
- {tool} — {purpose}

## Existing Patterns

{describe coding patterns observed: component structure, API conventions, state management, etc.}

## CI/CD

{describe existing CI setup if found, or note absence}

## Notes for Planning

{any observations relevant to future phase planning — tech debt, areas needing refactoring, well-structured vs messy areas}
```

**If greenfield (<= 5 source files)**, skip analysis — note "greenfield project" in config.

## Step 5: Confirm with User

Display the detected configuration, then **use the `AskUserQuestion` tool** to confirm:

```
Setting up opti-gsd for: {detected_name}
Type: {detected_type} ({brownfield|greenfield})
{if brownfield: "Files: {count} source, {count} test"}

Detected CI commands:
  lint:      {detected or "none"}
  typecheck: {detected or "none"}
  test:      {detected or "none"}
  build:     {detected or "none"}
```

**Call AskUserQuestion** with: `Does this look right? (yes / adjust)`

**Do NOT proceed until the user responds.** If user says "adjust", ask what to change.

## Step 5b: UI/UX Design System (Web Projects Only)

**Only for web application projects** (nextjs, react, vue, angular, svelte, astro). Skip this step for APIs, CLIs, libraries, or non-web projects.

**Use AskUserQuestion** to present:

```
UI/UX Design System
─────────────────────────────────────
Set up a design system for consistent, high-quality UI?

1. Color scheme (enter brand hex or choose preset):
   A) Blue (#236295)    B) Green (#16a34a)   C) Purple (#7c3aed)
   D) Red (#dc2626)     E) Orange (#ea580c)  F) Custom (provide hex)

2. Animation style:
   A) Full — Framer Motion (blur-fade, border-beam, number-ticker)
   B) Subtle — CSS transitions only (hover, smooth state changes)
   C) None

3. Theme style:
   A) Glassmorphism — Frosted glass, backdrop blur, layered shadows
   B) Flat — Clean borders, subtle shadows
   C) Minimal — Ultra-clean, whitespace-focused

4. Dark mode: Yes / No

5. Component library: shadcn/ui (recommended) / Skip

Or type "skip" to skip UI setup entirely.
```

**Do NOT proceed until the user responds.** If "skip", proceed without UI config.

### Save UI Config

Write `.opti-gsd/ui-config.json`:

```json
{
  "version": "1.0",
  "enabled": true,
  "colorScheme": {
    "primary": "{hex}",
    "secondary": "{computed — lighter variant of primary}",
    "accent": "{computed — vibrant variant of primary}"
  },
  "animations": "{full|subtle|none}",
  "componentLibrary": "{shadcn|none}",
  "themeStyle": "{glassmorphism|flat|minimal}",
  "darkMode": true,
  "typography": {
    "sans": "{Plus Jakarta Sans|Inter|system}",
    "mono": "{JetBrains Mono|system}"
  }
}
```

**Color computation:** Given a primary hex, generate secondary (20% lighter, slightly desaturated) and accent (10% lighter, more saturated). If user chose a preset, use the full preset palette.

**Preset palettes:**
| Preset | Primary | Secondary | Accent |
|--------|---------|-----------|--------|
| Blue | #236295 | #37a2db | #2CA5E0 |
| Green | #16a34a | #22d3ee | #10b981 |
| Purple | #7c3aed | #a78bfa | #8b5cf6 |
| Red | #dc2626 | #f87171 | #ef4444 |
| Orange | #ea580c | #fb923c | #f97316 |

### Generate UI Guide

Write `.opti-gsd/ui-guide.md` — a comprehensive design system reference. This is the **single source of truth** that tells Claude how to build UI for this project.

The guide MUST include these sections, customized to the user's choices:

**1. Overview table** — all settings at a glance

**2. Color palette** — brand colors, usage rules (primary for CTAs/links, secondary for highlights, accent for gradients/decoration)

**3. CSS variables** — convert the hex colors to HSL values, provide both light and dark mode variable pairs for: background, foreground, card, primary, secondary, muted, accent, destructive, success, warning, border, input, ring, sidebar colors, chart colors

**4. Tailwind config extensions** — custom colors (brand + semantic), border-radius, font families, box-shadows, keyframes, animations

**5. Component library setup:**
- If shadcn: dependencies to install (`@radix-ui/*`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate`), base components (Button with variant CVA, Card with shadow/hover, Dialog, Input, Select, Tabs, Toast), utility `cn()` function
- If none: suggest creating base components with CVA pattern anyway

**6. Theme style patterns:**
- If **glassmorphism**: define `glassCard` (bg-white/90 dark:bg-white/[0.04] backdrop-blur-xl), `glassCardHover` (hover lift + shadow), `accentBar` (gradient using brand colors), multi-layer shadows (shadow-glass, shadow-glass-hover, dark variants)
- If **flat**: clean card styles (border + shadow-sm), subtle hover (shadow-md), no backdrop-blur
- If **minimal**: borderless or hair-thin borders, whitespace for hierarchy, typography-driven, minimal shadows

Include a `lib/styles.ts` template with reusable style constants for the chosen theme.

**7. Animation components:**
- If **full**: provide complete component specs for:
  - `BlurFade` — scroll-triggered opacity + blur + translateY using framer-motion `useInView`, configurable delay/duration/offset
  - `BorderBeam` — CSS offset-path animated gradient border, configurable colors/size/duration
  - `NumberTicker` — spring-physics counter using framer-motion `useSpring`, scroll-triggered
  - Dependencies: `framer-motion`
  - Usage patterns: staggered delays (`0.1 + idx * 0.08`), wrap cards in BlurFade, BorderBeam inside cards
- If **subtle**: Tailwind keyframes (fade-in, scale-in, slide-in-right), transition utility classes, hover effects (`hover:-translate-y-0.5 transition-all duration-200`)
- If **none**: only essential micro-interactions (button press scale `active:scale-[0.98]`)

**8. Dark mode setup** (if enabled):
- `next-themes` with `attribute="class"`, ThemeProvider wrapper
- CSS variable pairs (every `:root` variable needs a `.dark` override)
- Rule: always use semantic tokens (`bg-card`, `text-foreground`), never hardcode colors
- Rule: every component MUST work in both modes

**9. Typography:**
- If custom fonts: `@fontsource-variable/{font}` installation, Tailwind `fontFamily` config, CSS `--font-sans` / `--font-mono` variables
- If system fonts: `system-ui, -apple-system, sans-serif` stack

**10. Page patterns** — code examples for:
- Standard page layout (header with title + action button, content area)
- Dashboard card grid (responsive grid with staggered animations)
- Form page (card with header, form fields, actions)
- Data table page (card with filters, table, pagination)

**Quality reference:** Use these patterns from production projects:
- Multi-layer composite shadows for depth
- Gradient accent bars using brand colors
- Staggered animation delays for lists
- Spring physics for number animations
- Scroll-triggered reveals
- Hover lift effects with smooth transitions
- `cn()` utility for all class composition

## Step 6: Create Directory Structure

```
.opti-gsd/
├── config.json
├── state.json
├── ui-config.json          (web projects only, if UI setup chosen)
├── ui-guide.md             (web projects only, if UI setup chosen)
├── codebase-analysis.md    (brownfield only)
├── roadmap.md              (empty placeholder)
├── stories/
├── issues/
├── features/
├── plans/
└── research/
```

### config.json

```json
{
  "version": "3.0",
  "project": {
    "name": "{name}",
    "type": "{type}",
    "framework": "{framework or null}",
    "language": "{language}"
  },
  "branching": {
    "enabled": true,
    "pattern": "gsd/v{milestone}",
    "protected": ["master", "main", "production", "prod"]
  },
  "ci": {
    "lint": "{detected}",
    "typecheck": "{detected}",
    "test": "{detected}",
    "build": "{detected}",
    "e2e": null
  },
  "deployment": {
    "platform": null,
    "preview_url": null
  },
  "testing": {
    "always_test": [],
    "never_test": ["*.md", "*.json"]
  },
  "mode": "interactive"
}
```

### state.json

```json
{
  "version": "3.0",
  "milestone": null,
  "branch": "{current_branch}",
  "phase": null,
  "status": "initialized",
  "phases": {
    "total": 0,
    "complete": [],
    "current": null,
    "pending": []
  },
  "execution": null,
  "last_active": "{timestamp}"
}
```

## Step 7: CLAUDE.md Integration

**Automatically** append opti-gsd instructions to the project's CLAUDE.md. Do NOT ask — just do it.

Check if CLAUDE.md already contains opti-gsd section:

```bash
grep -q "opti-gsd" CLAUDE.md 2>/dev/null
```

If the section **already exists**, skip this step.

If **missing** (or CLAUDE.md doesn't exist), append the following. Create CLAUDE.md first if needed.

```markdown

---

## opti-gsd Workflow

This project uses **opti-gsd** for spec-driven development. You don't need to remember any commands — just start working.

A hook runs on every message that reads the project state and tells you what to do next. Follow the SKILL.md file it points you to.

The workflow is: **INIT → ROADMAP → PLAN → EXECUTE → REVIEW → VERIFY → COMPLETE**

The hook handles routing automatically. At decision points you'll be asked to confirm before proceeding — answer those questions to keep the flow going.

**Useful manual commands:**
- `/opti-gsd:status` — see where you are
- `/opti-gsd:quick` — do something outside the main flow
- `/opti-gsd:debug` — systematic debugging
- `/opti-gsd:config` — change project settings
- `/opti-gsd:help` — see all commands

**Protected branches:** master, main, production, prod — all changes via milestone branches and PRs.
```

## Step 8: Commit

```bash
git add .opti-gsd/
git add CLAUDE.md  # if modified
git commit -m "chore: initialize opti-gsd

- Created .opti-gsd/ directory structure
- Configured for {project_type} project
- {if brownfield: 'Analyzed existing codebase ({file_count} files)'}
- CI commands: {detected_commands}"
```

## Step 9: Report

```
✓ opti-gsd Initialized
─────────────────────────────────────
Project: {name}
Type:    {type} ({brownfield|greenfield})
Branch:  {branch}
{if brownfield:
Analysis: .opti-gsd/codebase-analysis.md
          {source_count} source files, {test_count} test files
          Stack: {framework}, {key_deps}
}

→ Run /opti-gsd:roadmap to create your delivery roadmap
→ Run /opti-gsd:status to see current state
```

After displaying the report, **use the `AskUserQuestion` tool** to prompt:
`Ready to create your roadmap? (roadmap / stop)`

- If user says **"roadmap"** — tell them to run `/opti-gsd:roadmap`
- If user says **"stop"** — end
