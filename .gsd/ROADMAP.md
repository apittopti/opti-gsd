# Roadmap

## Milestone: v0.3.0 - Internal Quality

### Phase 1: Agent Tool Consistency
- [x] Complete
- Standardize tool declarations across all 11 agents

**Success Criteria:**
- [ ] All agents have consistent tool declarations
- [ ] MCP tools (`mcp__*`) declared where needed
- [ ] Browser tools only on agents that need browser access
- [ ] Tool permissions match agent responsibilities

**Files:** `agents/*.md`

---

### Phase 2: Error Handling Standardization
- [ ] Not started
- Create consistent error response format across commands

**Success Criteria:**
- [ ] Error format defined and documented
- [ ] Commands use consistent error messaging
- [ ] Graceful handling when prerequisites missing (e.g., no .gsd/, no STATE.md)
- [ ] Clear next-step suggestions on errors

**Files:** `commands/*.md`

---

Progress: 1/2 phases complete (50%)
Current: Phase 1 complete
Next action: /opti-gsd:plan-phase 2
