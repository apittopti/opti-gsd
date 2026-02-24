#!/usr/bin/env node
/**
 * Workflow Router for opti-gsd
 *
 * UserPromptSubmit hook — fires on every user message.
 * Reads .opti-gsd/state.json, determines the next workflow step,
 * and outputs a concise directive for Claude to follow.
 *
 * Always exits 0 to avoid breaking the user's prompt.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const pluginRoot = (process.argv[2] || '').replace(/\\/g, '/');

/**
 * Find .opti-gsd directory by walking up from cwd
 */
function findOptiGsdDir() {
  let dir = process.cwd();
  const root = path.parse(dir).root;

  while (dir !== root) {
    const candidate = path.join(dir, '.opti-gsd');
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      return candidate;
    }
    dir = path.dirname(dir);
  }
  return null;
}

/**
 * Safely read and parse a JSON file
 */
function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function main() {
  const optiDir = findOptiGsdDir();

  // Not an opti-gsd project — silent exit
  if (!optiDir) return;

  const state = readJson(path.join(optiDir, 'state.json'));
  if (!state) {
    console.log(`[opti-gsd] .opti-gsd/ found but state.json missing or corrupt. Run /opti-gsd:init to reinitialize.`);
    return;
  }

  const status = state.status || 'initialized';
  const milestone = state.milestone || '?';
  const phase = state.phases?.current || state.phase || 1;
  const total = state.phases?.total || '?';
  const pad = String(phase).padStart(2, '0');

  // Check artifacts
  const plansDir = path.join(optiDir, 'plans', `phase-${pad}`);
  const hasRoadmap = fs.existsSync(path.join(optiDir, 'roadmap.md'));
  const hasPlan = fs.existsSync(path.join(plansDir, 'plan.json'));
  const hasVerification = fs.existsSync(path.join(plansDir, 'verification.json'));

  // Determine next skill and description
  let skill, desc;

  switch (status) {
    case 'initialized':
      if (!hasRoadmap) {
        skill = 'roadmap';
        desc = 'Create delivery roadmap';
      } else {
        skill = 'plan';
        desc = `Plan phase ${phase}`;
      }
      break;

    case 'roadmap_created':
      skill = 'plan';
      desc = `Plan phase ${phase}`;
      break;

    case 'planned':
      skill = 'execute';
      desc = `Execute phase ${phase} plan`;
      break;

    case 'executing': {
      skill = 'execute';
      const done = state.execution?.tasks_done?.length || 0;
      const failed = state.execution?.tasks_failed?.length || 0;
      const pending = state.execution?.tasks_pending?.length || 0;
      const taskTotal = done + failed + pending;
      desc = `Resume phase ${phase} execution (${done}/${taskTotal} tasks done)`;
      break;
    }

    case 'executed':
      skill = 'review';
      desc = `Review phase ${phase} changes`;
      break;

    case 'reviewed':
      skill = 'verify';
      desc = `Verify phase ${phase}`;
      break;

    case 'verified': {
      const pending = state.phases?.pending || [];
      if (pending.length > 0) {
        skill = 'plan';
        desc = `Plan next phase (phase ${pending[0]})`;
      } else {
        skill = 'complete';
        desc = 'Complete milestone — all phases verified';
      }
      break;
    }

    case 'milestone_complete':
      console.log(`[opti-gsd] Milestone ${milestone} complete. All phases verified and merged.`);
      return;

    default:
      skill = 'status';
      desc = 'Check project status (unknown state)';
  }

  // Build skill path with forward slashes
  const skillPath = pluginRoot
    ? `${pluginRoot}/skills/${skill}/SKILL.md`
    : `skills/${skill}/SKILL.md`;

  // Output — concise directive for Claude
  console.log(`[opti-gsd] Milestone: ${milestone} | Phase: ${phase}/${total} | Status: ${status}`);
  console.log(`Next: ${desc}`);
  console.log(`Follow: ${skillPath}`);
  console.log(`If already mid-step (user responded to a question you asked), continue where you left off — do NOT restart the step.`);
}

try {
  main();
} catch {
  // Never break the user's prompt
}
process.exit(0);
