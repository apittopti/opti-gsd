# Research: Once UI Integration for opti-gsd

**Date:** 2026-02-14
**Topic:** Integrating Once UI as a UI generation toolkit within the opti-gsd workflow
**Status:** Recommendation Ready

---

## Executive Summary

Once UI is an open-source design system and component library built exclusively for Next.js. It can be integrated into opti-gsd's workflow so that when users build web applications through gsd, the system can scaffold, plan, execute, and verify UI work using Once UI as the default component library for Next.js/React projects.

**Integration approach:** Enhance opti-gsd's existing skills and agents to be "Once UI-aware" — no new skills needed, just targeted modifications to `new-project`, `init`, `plan`, `execute`, and the agent specs.

---

## Once UI Overview

### What It Is
- Open-source design system for **Next.js** (Next.js-only)
- 100+ pre-styled, accessible React components
- Single-file theming configuration (design tokens, not utility classes)
- Claims ~70% less code vs shadcn + Tailwind
- MIT licensed, active community (~1.6k GitHub stars)

### Core Package
```bash
npm i @once-ui-system/core
```

### Scaffolding Tools
```bash
# Create new project
npx create-once-ui-app@latest

# CLI for adding components to existing projects
npx once-ui-cli init
npx once-ui-cli add <component-name>
npx once-ui-cli list
```

### Key Components & Features
| Category | Examples |
|----------|---------|
| Layout | `Row`, `Column`, `Grid` — semantic layout primitives |
| Forms | Buttons, inputs, selects, toggles |
| Data Viz | Responsive charts (Recharts-based) |
| Content | MDX support, code blocks, badges, tags |
| Navigation | Command palette (kbar), page transitions |
| SEO | Meta/schema components, OG image generation |
| AI | "Magic Agent" — drop-in chatbot UI (Vercel AI SDK) |

### Theming System
- **Token-based** — semantic variables (`--color-primary`) not utility classes
- **Single configuration file** — all theme settings in one place
- **Dark mode** — built-in via token switching
- **Figma parity** — design assets mirror the codebase

### Templates Available
| Template | Purpose |
|----------|---------|
| Magic Portfolio | Portfolio/blog with MDX |
| Magic Agent | AI chatbot deployment |
| Magic Convert | Landing page + dashboard |
| Magic Store | E-commerce (Pro) |

### Limitations
- **Next.js only** — no Vue, Svelte, or plain React/Vite support
- **Own styling syntax** — not Tailwind-based; developers need to learn the token system
- **Some advanced templates are Pro** (paid) — core components are free/MIT

---

## Integration Points in opti-gsd

### 1. Config Schema Extension (`config.json`)

Add a `ui_framework` field to project configuration:

```json
{
  "project": {
    "name": "my-app",
    "type": "nextjs",
    "framework": "next",
    "language": "typescript",
    "ui_framework": "once-ui"
  }
}
```

Supported values: `"once-ui"`, `"shadcn"`, `"tailwind"`, `"material-ui"`, `null`

**Where:** `plugins/opti-gsd/skills/init/SKILL.md` — schema section

---

### 2. Project Scaffolding (`new-project` skill)

**Current behavior:** For `nextjs` type, runs `npx create-next-app@latest`

**Enhanced behavior:**
- After type selection, ask: *"UI framework? (once-ui, shadcn, tailwind, none)"*
- If `once-ui` selected:
  ```bash
  npx create-once-ui-app@latest {project-name}
  ```
  OR for more control:
  ```bash
  npx create-next-app@latest {project-name}
  cd {project-name}
  npm i @once-ui-system/core
  npx once-ui-cli init
  ```
- Store choice in `config.json` as `ui_framework`

**Where:** `plugins/opti-gsd/skills/new-project/SKILL.md`

---

### 3. Project Detection (`init` skill)

**Current behavior:** Detects project type from config files and dependencies.

**Enhanced behavior:**
- Scan `package.json` for `@once-ui-system/core` in dependencies
- If found → set `"ui_framework": "once-ui"` in config.json
- Include in codebase-analysis.md under a "UI Framework" section
- If Next.js project with no UI framework detected → suggest Once UI

**Where:** `plugins/opti-gsd/skills/init/SKILL.md` — detection step

---

### 4. Phase Planning (`planner` agent)

**Current behavior:** Generates task plans based on phase goals and codebase analysis.

**Enhanced behavior:**
When `config.ui_framework === "once-ui"`:
- Include in planner context: *"This project uses Once UI (@once-ui-system/core). When planning UI tasks, use Once UI components (Row, Column, Grid for layout; built-in form controls, charts, etc.). Reference https://docs.once-ui.com for component APIs."*
- For first UI phase, suggest a Wave 1 setup task if Once UI isn't installed yet
- When generating component-creation tasks, reference Once UI patterns

**Example generated task:**
```json
{
  "id": "02",
  "title": "Create dashboard layout with Once UI",
  "files": [
    { "path": "src/app/dashboard/page.tsx", "action": "create" },
    { "path": "src/app/dashboard/layout.tsx", "action": "create" }
  ],
  "action": "Build dashboard page using Once UI Row/Column/Grid layout components. Import from @once-ui-system/core. Include responsive chart using Once UI data visualization.",
  "verify": [
    { "type": "build", "cmd": "npm run build", "description": "Build succeeds" },
    { "type": "lint", "cmd": "npm run lint", "description": "No lint errors" }
  ],
  "done": "Dashboard renders with responsive layout and chart component"
}
```

**Where:** `plugins/opti-gsd/agents/planner.md`

---

### 5. Task Execution (`executor` agent)

**Current behavior:** Receives task JSON, implements code, runs verification, commits.

**Enhanced behavior:**
When spawning executor agents for Once UI projects, include context:
```
## UI Framework: Once UI
- Package: @once-ui-system/core
- Import pattern: import { Button, Row, Column, Grid } from "@once-ui-system/core"
- Layout: Use Row, Column, Grid — NOT div with className
- Theming: Uses design tokens, NOT Tailwind utilities
- Docs: https://docs.once-ui.com
- Follow existing project patterns for component structure
```

This ensures every executor agent knows to use Once UI components instead of raw HTML/CSS or other frameworks.

**Where:** `plugins/opti-gsd/skills/execute/SKILL.md` — executor spawn section, `plugins/opti-gsd/agents/executor.md`

---

### 6. Code Review (`reviewer` agent)

**Enhanced behavior:**
When `config.ui_framework === "once-ui"`:
- Flag raw `<div>` layouts that should use `Row`/`Column`/`Grid`
- Flag direct CSS that should use design tokens
- Flag third-party component imports when Once UI equivalents exist
- Ensure consistent import patterns

**Where:** `plugins/opti-gsd/agents/reviewer.md`

---

### 7. CLAUDE.md Injection (`init` skill)

When Once UI is detected/selected, inject guidelines into the project's CLAUDE.md:

```markdown
## UI Framework: Once UI

This project uses Once UI (@once-ui-system/core) for UI components.

- Import components from "@once-ui-system/core"
- Use Row, Column, Grid for layouts (not raw div)
- Use design tokens for theming (not inline styles or Tailwind)
- Reference: https://docs.once-ui.com
```

**Where:** `plugins/opti-gsd/skills/init/SKILL.md` — CLAUDE.md injection section

---

## Implementation Scope

### Files to Modify

| File | Change | Effort |
|------|--------|--------|
| `skills/new-project/SKILL.md` | Add UI framework selection, Once UI scaffolding | Medium |
| `skills/init/SKILL.md` | Add UI framework detection, config field, CLAUDE.md injection | Medium |
| `agents/planner.md` | Add UI framework context to planning instructions | Small |
| `agents/executor.md` | Add UI framework context to execution instructions | Small |
| `agents/reviewer.md` | Add UI framework review guidelines | Small |
| `skills/execute/SKILL.md` | Pass UI framework context when spawning executors | Small |

### Files NOT Modified
- `skills/roadmap/SKILL.md` — framework-agnostic
- `skills/verify/SKILL.md` — already runs CI commands which cover Once UI
- `agents/verifier.md` — CI commands already validate build/lint/test
- `skills/rollback/SKILL.md` — git operation, framework-agnostic
- `skills/complete/SKILL.md` — PR creation, framework-agnostic

---

## Once UI vs Alternatives

| Aspect | Once UI | shadcn/ui + Tailwind |
|--------|---------|---------------------|
| Framework | Next.js only | Any React |
| Styling | Design tokens | Utility classes |
| Setup | Single config file | Multiple configs |
| Code volume | ~70% less (claimed) | More verbose |
| Components | 100+ pre-styled | Modular, copy-paste |
| Learning curve | Lower | Higher (Tailwind classes) |
| Flexibility | More opinionated | More flexible |
| Scaffolding | `npx create-once-ui-app` | `npx shadcn-ui init` |

**Recommendation:** Support Once UI as **default for Next.js projects** and shadcn/Tailwind as the alternative. The config field makes this user-selectable.

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Once UI is Next.js-only | Only offer for `nextjs` project type; fall back to shadcn for plain React |
| Token system unfamiliar to some users | Include docs link in executor/reviewer context |
| Pro templates behind paywall | Only reference free/MIT components |
| Library may have breaking changes | Pin version in scaffolding; detect version in init |
| Executor agents may not know Once UI API | Include import patterns and docs URL in agent context |

---

## Recommended Implementation Order

1. **Config schema** — add `ui_framework` field (foundation for everything else)
2. **init skill** — detect Once UI + CLAUDE.md injection (immediate value for existing projects)
3. **new-project skill** — add UI framework selection (value for new projects)
4. **planner agent** — UI-framework-aware task generation (better plans)
5. **executor agent** — UI framework context injection (better code generation)
6. **reviewer agent** — UI framework review guidelines (better reviews)

---

## Sources

- [Once UI Official Site](https://once-ui.com/)
- [Once UI Documentation](https://docs.once-ui.com/)
- [@once-ui-system/core on npm](https://www.npmjs.com/package/@once-ui-system/core)
- [Once UI Next.js Starter (GitHub)](https://github.com/once-ui-system/nextjs-starter)
- [Once UI CLI (GitHub)](https://github.com/once-ui-system/cli)
- [create-once-ui-app on npm](https://www.npmjs.com/package/create-once-ui-app)
- [Once UI on Vercel Templates](https://vercel.com/templates/next.js/once-ui-design-for-nextjs)
