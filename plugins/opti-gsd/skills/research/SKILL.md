---
description: Research best practices, patterns, and approaches for a technical topic
disable-model-invocation: true
context: fork
agent: researcher
allowed-tools: Read, Glob, Grep, Bash, Write, WebFetch, WebSearch
argument-hint: "<topic>"
---

# Research

Investigate a technical topic and produce a summary of best practices, patterns, and recommendations.

## Input

`$ARGUMENTS` — the topic to research.

## Process

1. **Understand the scope** — what specifically needs to be researched?
2. **Search the codebase** — what patterns already exist?
3. **Search the web** — current best practices, common pitfalls
4. **Check documentation** — official docs for relevant libraries/frameworks
5. **Synthesize** — combine findings into actionable recommendations

## Output

Save research to `.opti-gsd/research/{topic-slug}.md`:

```markdown
# Research: {Topic}

**Date:** {timestamp}
**Context:** {why this was researched}

## Key Findings

1. {finding 1}
2. {finding 2}

## Recommended Approach

{specific recommendation for this project}

## Pitfalls to Avoid

- {pitfall 1}
- {pitfall 2}

## References

- {source 1}
- {source 2}
```

Present summary to user:
```
Research Complete: {topic}
─────────────────────────────────────
{2-3 sentence summary}

Saved to: .opti-gsd/research/{slug}.md

Key recommendation: {primary recommendation}
```
