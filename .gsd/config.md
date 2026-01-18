---
# Project Configuration
app_type: claude-code-plugin
framework: claude-code

# Git Workflow
branching: milestone
prefix: gsd/
base: master
commits: conventional

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

# Browser Testing
browser:
  enabled: false
  headless: false
  viewport: [1280, 720]

# Skills
skills:
  - test-driven-development
  - systematic-debugging
  - verification-before-completion

# MCP Integrations
mcps:
  github: MCP_DOCKER
  browser: claude-in-chrome
  context7: MCP_DOCKER

# Verification MCPs
verification_mcps:
  browser: claude-in-chrome
  github: MCP_DOCKER
---
