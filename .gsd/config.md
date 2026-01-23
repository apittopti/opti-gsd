---
# Project Configuration
app_type: claude-code-plugin
framework: claude-code

# Git Workflow
branching: milestone
prefix: gsd/
base: master
commits: conventional
workflow: solo  # solo = merge directly, team = create PR

# Execution Mode
mode: interactive
depth: standard

# Context Management
budgets:
  orchestrator: 15
  executor: 50
  planner: 60
  researcher: 70

# CI/CD & Toolchain
ci:
  package_manager: null
  build: null
  test: null
  lint: null
  typecheck: null
  e2e: null

# URLs
urls:
  local: null
  api: null
  staging: null
  production: null

# Deployment
deploy:
  target: github-marketplace
  ci_system: null
  production_branch: master

# Discovery Defaults
discovery:
  default_level: 1
  force_research: false

# Testing
testing:
  type: terminal  # Claude Code plugin - tested via CLI
  browser: false
  auto_detect: true  # Auto-determine test_required based on rules

  # Project-specific overrides (paths that always/never need tests)
  always_test: []
    # - "src/core/**"    # Critical paths
    # - "src/api/**"     # API endpoints
  never_test:
    - ".gsd/**"          # GSD metadata
    - "docs/**"          # Documentation
    - "*.md"             # Markdown files
    # - "src/generated/**"  # Auto-generated code

# Skills
skills:
  - test-driven-development
  - systematic-debugging
  - verification-before-completion

# MCP Integrations
mcps:
  github: MCP_DOCKER
  context7: MCP_DOCKER

# Verification
verification:
  type: terminal  # Test commands in Claude Code CLI
  github: MCP_DOCKER

# Loop Settings
loop:
  tdd_max_attempts: 5         # Max GREEN phase retries inside TDD cycle (per task)
  execute_max_retries: 2      # Max orchestrator retries if subagent fails entirely
  verify_max_iterations: 20   # Max verify-fix cycles
  auto_loop: true             # Enable loop by default (mode controls prompts)
---
