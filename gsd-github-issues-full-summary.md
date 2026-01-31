# glittercowboy/get-shit-done - All 235 Issues

Open: 131 | Closed: 104

---

### #357: feat: Phase Plans Summary
**OPEN** | Author: braxtonj | 2026-01-30 | Labels: none
TL;DR; - add a summary of what all the plans are gonna do in the `phases/NN-{{NAME}}/` folder

Reasoning:
context switching is killer.  when coming back to a project after a period of time (or even after a planning phase finishes executing and I was doing other things), it is time consuming to jump back and forth between each NN-NN-PLAN.md, NN-NN-SUMMARY.md, PROJECT.md, etc file to validate.  A high level summary of what a phase is going to accomplish with each determined plan, in one consolidated place, would be useful

perhaps `phases/NN-{{NAME}}/09-PLAN.md` + `phases/NN-{{NAME}}/09-SUMMARY....[truncated]

---

### #356: Setting Quality Profile globally when installing GSD
**OPEN** | Author: VladimirMakaev | 2026-01-30 | Labels: none
I usually want the most powerful model everywhere, recently started noticing that I got Sonnet unexpectedly then I started modifying setting for my projects which is annoying.

Can you add support for:
1) Setting quality globally in an installer
2) Use Opus even for verification
3) Having a project level override probably makes sense but I don't really care I just want it to use the most powerful model all the time.

---

### #355: gsd-executor not found?
**OPEN** | Author: b00y0h | 2026-01-30 | Labels: none
I've noticed this gsd-executor with recent updates but it doesn't seem to ever 'use' it?

<img width="520" height="266" alt="Image" src="https://github.com/user-attachments/assets/fa181b78-efb2-4831-b5d9-d8cd3b3d18be" />

I'm using gsd inside of [claudebox](https://github.com/RchGrav/claudebox) for all my work.

Also, sometimes (also inside of claudebox) I have to run /user:gsd commands and sometimes I can run /gsd: commands. I'll even tell claude to run `npx get-shit-done-cc --claude --global`, which it does, but doesn't seem to pick up that gsd-executor.

Also get errors like this:

<img wid...[truncated]

**Key Comments (1):**
- **glittercowboy**: I've ALSO found this lately too. It's quite weird - will look into it.

---

### #353: feat: add support for kimi-cli
**OPEN** | Author: bguiz | 2026-01-30 | Labels: none
- Currently claude code, opencode, and gemini are the supported harnesses
- Feature request: Also support kimi-cli as a harness

**Key Comments (1):**
- **bguiz**: FWIW, this the following is the gen AI result for how to go about adding this feature.
As the author of the project, LMK if this actually looks OK, or if it has left out anything @glittercowboy - I might create the PR for this myself if this is indeed what's involved.

----

To get **Get Shit Done (GSD)** to support `kimi-cli`, we need to implement it as a first-class "harness." GSD is an orchestr...[truncated]

---

### #352: Recommended workflow when doing verify-work for adding or changing the design?
**OPEN** | Author: nullbio | 2026-01-30 | Labels: none
What is the recommended flow for addressing bugs or design weaknesses during verify-work phases, without it interrupting the verify-work? 

For example, I have a v1 with 8 phases, I just finished the last phase and ran verify-work. The testing revealed some design issues I wish to adjust and address, at each point of the manual testing. Claude tried to add these to the existing REQUIREMENTS.md and edited the UAT to add a note to do some additional work. This doesn't seem like the correct way for GSD to pick up this additional work in a future flow. Is one of these other existing commands the p...[truncated]

---

### #351: Overly optimistic commits
**OPEN** | Author: oojacoboo | 2026-01-30 | Labels: none
So, I've been testing GSD and overall it's a pretty good tool.  Maybe it's not the ideal tool for our workflows and for brownfield applications though - not sure.

Firstly, the commit after every set of changes makes it very difficult to see what has been done from where you started, because each commit will contain a portion of the changes.  Then the next commit will undo half of them, and apply new changes.  Tracking changes commit-by-commit is a waste of time and basically useless.

That said, the only way to make this less problematic is to create a new branch and PR, every time.  However,...[truncated]

**Key Comments (5):**
- **jonassteinberg1**: @oojacoboo just a heads up you're not going to get a response. the guy that built this thing had zero idea how big it would become. he's one dude and he's got a lot on his plate. if you want something potentially merged you'll need to fork it and merge it yourself or submit a PR and hope it gets reviewed. There are 129 open issues lol and I haven't seen the author comment on any of the issues I've...[truncated]
- **glittercowboy**: I do _sometimes_ reply to them haha. It's just incredibly overwhelming the amount of issues that get raised every day so I hit a couple when I can.
- **glittercowboy**: In regards to the commit issue @oojacoboo, I very rarely use GSD for brownfield work myself. I know it's not ideal but my main priority with GSD is building a system that vibe codes NEW projects successfully. I can add it to the backlog but in the mean time feel free to submit a PR if you find a good solution.
- **oojacoboo**: @glittercowboy see https://github.com/glittercowboy/get-shit-done/pull/298 where I added some comments that address this concern.
- **glittercowboy**: The branching strategy from #298 is now merged, along with squash merge as the recommended option at milestone completion (5ee22e6).

**How this helps brownfield workflows:**

1. Set `git.branching_strategy: "phase"` in `.planning/config.json`
2. Each phase executes on its own branch (`gsd/phase-03-auth`)
3. All the "sausage making" commits stay on the feature branch
4. At `/gsd:complete-milestone...[truncated]

---

### #348: Feature: Support custom orchestrator rules that persist across updates
**OPEN** | Author: vaughngit | 2026-01-29 | Labels: none
## Problem

When GSD updates via `/gsd:update`, the installer performs a clean install that wipes:
- `~/.config/opencode/command/gsd-*.md`
- `~/.config/opencode/get-shit-done/`
- `~/.config/opencode/agents/gsd-*`
- `~/.config/opencode/gsd/`

This means any customizations to orchestrator behavior (like enforcing subagent usage) are lost on every update.

## Current Workaround

I created a post-update patch script that:
1. Stores custom rules in `~/.config/opencode/custom/orchestrator-rules.md`
2. Injects `@~/.config/opencode/custom/orchestrator-rules.md` into the `<execution_context>` of orches...[truncated]

---

### #346: README.md: Broken link for `gsd-gemini` community port returns 404
**OPEN** | Author: sscargal | 2026-01-29 | Labels: none
In the project's main [README.md](https://github.com/glittercowboy/get-shit-done/blob/main/README.md?plain=1#L581), the following link within the Community Ports table is no longer valid and returns a 404:

```
| [gsd-gemini](https://github.com/uberfuzzy/gsd-gemini) | Gemini CLI | Original Gemini adaptation |
```

**Key Comments (2):**
- **vedpawar2254**: Can we use @Cars-10's project instead, then.

https://github.com/Cars-10/get-shit-done-gemini

what are your thoughts @glittercowboy @sscargal
- **Cars-10**: @vedpawar2254 I download my version. Then tell gemini to update for gemini features using the latest https://github.com/glittercowboy/get-shit-done. Gemini chages everytday so doing that every time you will build an optimized gemini version

---

### #345: Gemini CLI implementation is broken
**CLOSED** | Author: cristianuibar | 2026-01-29 | Labels: none
For Gemini we need to use .toml files for the commands. 

The agent files have YAML frontmatter with tools as a comma-separated string (Gemini expects an array) and color which is an unrecognized key.

Docs:
https://geminicli.com/docs/core/subagents/
https://geminicli.com/docs/cli/skills/
https://geminicli.com/docs/tools/

We also need to enable the experimental subagets support. So go in `settings.json` and ensure you have `"experimental": { "enableAgents": true }`

```bash
Tool name mapping (Claude Code → Gemini CLI):                                                                           ...[truncated]

---

### #344: feature: plan all phases in parallel and then execute all phases sequentially (or parallel if possible) without stopping until everything is done and tested
**OPEN** | Author: jonassteinberg1 | 2026-01-29 | Labels: none
At this point there needs to be a `yolo` mode where all planning is done in parallel and all phases are executed until everything is done and all end-to-end tests pass. "Doting" (where you check-in with the LLM output/progress and assess if it's on "the right path") in my opinion is becoming pointless. Opus 4.5 certainly is good enough where I can assume that if my end-to-end tests pass at the end of everything then whatever is built is at least halfway functional. If whatever is built is halfway functional I won't have cared if I improved it or massaged it during inference and output -- I can...[truncated]

**Key Comments (2):**
- **gigi2006**: So I just tell him let's discuss all phases at once, something like this:

/gsd:discuss-phase 1-20

Then he asks me about all 20 phases, and once that's done, I tell him

/gsd:plan-phase 1-20 (Researches/Plans/Verifies in one go)

Then it runs for about 10 hours, depending on the project, and at the end, maybe another:

/gsd:verify-work 1-2

I don't know if this is the correct and optimal way, but...[truncated]
- **jonassteinberg1**: > So I just tell him let's discuss all phases at once, something like this:
> 
> /gsd:discuss-phase 1-20
> 
> Then he asks me about all 20 phases, and once that's done, I tell him
> 
> /gsd:plan-phase 1-20 (Researches/Plans/Verifies in one go)
> 
> Then it runs for about 10 hours, depending on the project, and at the end, maybe another:
> 
> /gsd:verify-work 1-2
> 
> I don't know if this is the co...[truncated]

---

### #343: gsd-phase-researcher doesn't persist RESEARCH.md to disk
**OPEN** | Author: jeremybernstein | 2026-01-29 | Labels: none
## Bug Summary

Researcher agent returns `## RESEARCH COMPLETE` claiming file was created, but never calls Write tool to persist RESEARCH.md.

## Environment

- **GSD Version:** 1.9.13
- **Model:** sonnet (balanced profile)
- **Config:** `commit_docs: false` (planning dir gitignored)

## Steps to Reproduce

1. Run `/gsd:plan-phase <N>` on phase needing research
2. Researcher spawns, executes (41 tool uses, 5m 37s in my case)
3. Returns structured output with "File Created: `.../<phase>-RESEARCH.md`"
4. File doesn't exist on disk

## Expected Behavior

Researcher should use Write tool to persis...[truncated]

---

### #341: Get-Shit-Done for Claude Cowork
**OPEN** | Author: JohnieLee | 2026-01-28 | Labels: none
Now that Claude Cowork has been rolled out, how difficult would it be to enable GSD for Claude Cowork?  

GSD does a better job at managing the context than native Claude.

---

### #338: Feature Request: `/gsd:health` - Planning Directory Health Check
**OPEN** | Author: sadiksaifi | 2026-01-28 | Labels: none
## Summary

Add a diagnostic command that validates the integrity of the `.planning/` directory and helps identify/recover from corrupted or inconsistent state.

## Problem Statement

### The Core Issue

The `.planning/` directory is the single source of truth for GSD's multi-agent orchestration system. It contains interconnected files that must maintain consistency across:

- **Core state files**: `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, `config.json`
- **Phase artifacts**: `phases/XX-name/{PLAN,SUMMARY,UAT,CONTEXT,RESEARCH}.md`
- **Supporting directories**: `research/`, `to...[truncated]

---

### #337: Handling seperate repos for backend and frontend
**OPEN** | Author: st3fus | 2026-01-28 | Labels: none
Any work on this area? I've noticed when I work with seperate repos for backend and frontend, it tends to get out of sync a lot. Is there a way currently to keep them synced better?

A lot of times, it adds a route on backend, but frontend decides to pick a different route name and so on

---

### #336: Claude plan mode overriding GSD plan mode
**OPEN** | Author: callesjoenell | 2026-01-28 | Labels: none
From time to time Claude goes into its own plan mode and dont follow GSD. I hade to explicitly change the claude.md to always use the GSD plan mode instead. Maybe this is wht some discuss mode glitches happen, that we think we are planning in GSD but we are planning in regular Claude plan mode instead?

---

### #334: Testing an agent loop with GSD
**OPEN** | Author: kripper | 2026-01-28 | Labels: none
I created a simple repository to experiment with agent loops:
https://github.com/kripper/agent-loop-edit-tabs-and-spaces/

I’ve been running it with OpenCode, but I’d like to understand how GSD could help in this scenario, and what changes I could make to better adapt the project to better work with GSD.

---

### #332: Existing code migration project failure
**OPEN** | Author: callesjoenell | 2026-01-28 | Labels: none
I had a project where I explicitly stated in the discuss phase that we needed to use an existing codebase for the visual implementation for a Shopify app. GSD implemented its own visual implementation and I ran a question of what happened why it did not follow my GSD instruction, here is the report:

GSD Framework Gap                                                                                                        
                                                                                                                           
  The GSD framework's context gathering phase did no...[truncated]

---

### #331: feat req: inject feedback mid loop
**OPEN** | Author: braxtonj | 2026-01-28 | Labels: none
Occasionally clarity needs to be injected while the system is getting shit done.

It would be useful to be able to inject additional feedback mid loop to course correct when needed.  You can tee up a command but you have to wait until a certain step is done (not always remedying and occasionally shortcircuiting the work being done, which is then cumbersome to pick back up).  Sometimes I just watch it and think "you fool.. why did i tell you to do that" or "what the hell.. what are you doing?".

Unfortunately, I think it's a CC limitation (well more REST API fundamentals) than a GSD limitation....[truncated]

---

### #330: Update breaks status line - settings.json reference not updated
**OPEN** | Author: brianfidler | 2026-01-28 | Labels: none
## Bug Description

**Component:** `/gsd:update` command
**Summary:** Running `/gsd:update` renames the statusline script but doesn't update the reference in `~/.claude/settings.json`, breaking the context percentage bar display.

## Environment

- **GSD Version:** Updated via `npx get-shit-done-cc --global`
- **Claude Code Version:** 2.1.21
- **OS:** macOS (Darwin 24.6.0, arm64)

## What Happened

After running `/gsd:update`, the status line showing context window usage percentage disappeared. 

Investigation revealed:
- The statusline script was renamed from `~/.claude/hooks/statusline.js` t...[truncated]

---

### #329: Integrate with New Claude Task Manager update. 
**OPEN** | Author: iamvince | 2026-01-28 | Labels: none
(no body)

---

### #326: Serious issues with the discussion phase: incomplete plans, gray areas discussed are not executed in the plans, even though they are included in the context.
**OPEN** | Author: MethCDN | 2026-01-27 | Labels: none
The discussion phase is becoming increasingly critical and problematic. The agents do not execute what is discussed and do not include it in the plans, and often the discussion of gray areas becomes an issue even for completing the plans. Just today, during the execution of a plan that had gone through a discussion phase, the agents even marked work as completed when it had not actually been done. I had to create a new phase to correct all the errors and produce a report comparing the context, the state, and the roadmap in order to identify everything that had not been completed.

It is import...[truncated]

**Key Comments (2):**
- **norenz92**: Yes, having the same issue..
- **MethCDN**: Unfortunately, the only option is to do independent research and break the project down into many milestones, which in principle would be the best practice anyway. The difficulty with very complex feature projects comes from the fact that not everyone is a programmer. I’ve been programming for 20 years and I know how to break down a development flow and micro-nuclearize milestones, but I end up ha...[truncated]

---

### #325: feat req: timestamp display in working output
**OPEN** | Author: braxtonj | 2026-01-27 | Labels: none
Running processes don't have a timestamp of when executed.  Usually this is no problem as things are hustling.  However, sometimes there are long running commands and things get confused.  Having a timestamp of each execution can help a user diagnose if there is an issue or not.

For instance, this last command has been running for 15min but has a 11m timeout supposedly.  This timeout was never honored and had i not been paying attention may have wasted another 10min waiting to be safe before killing and kicking work back off (side note, not honoring a timeout is a bit troublesome on its own)
...[truncated]

---

### #323: Stale Diagnostics/Linter issues
**OPEN** | Author: seanGSISG | 2026-01-27 | Labels: none
I doubt this has anything to do with GSD but was curious if anyone else has noticed similar issues and if they found a way to resolve it.

Often times I will get messages like this:

```bash
  Wave 1 Complete

  04.1-01: Refactor get_job() to reuse _build_job_response() + add tests
  get_job() now calls _build_job_response() and returns JobDetailResponse (16 fields instead of 10). 6 new tests in
 pTestGetJobDetailEndpoint. 1 auto-fix for MagicMock name parameter gotcha.

  However, I see diagnostics flagging an unused JobDetailResponse import in jobs.py and some unused parameters in    ─
  tes...[truncated]

---

### #322: Update command installs globally instead of for project when applicable
**OPEN** | Author: tylersatre | 2026-01-27 | Labels: none
First off, I'm loving this project!  I've only been using it for a few days but it has been great so far.

There is a minor issue with the `/gsd:update` command and where it updates.  Since I'm still in the tire kicking phase on this I'm testing it out with a couple of projects, I ran `npx get-shit-done-cc` to install it, selecting that I was installing for Claude Code and that I wanted it done local for this project only.

When I ran the `/gsd:update` command I realized that it had done a global install to update instead of updating my local project.  I dug in a bit and can see it is from `np...[truncated]

---

### #321: [potential Security Alert] New `postinstall` script added in `get-shit-done-cc@1.10.0-experimental.0`
**OPEN** | Author: alphaleadership | 2026-01-27 | Labels: none
A new `postinstall` script was detected in version `1.10.0-experimental.0` of the package `get-shit-done-cc`.

**Script content:**
```
npm run build:tui
```
see [npm documentation on package scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts) for more details.
and [the detector](https://github.com/alphaleadership/npm-check). to understand why this script might be dangerous.
to get the alert only for dangerous scripts, please visit[the telegram](https://t.me/npmalert)
This could be a security risk. Please investigate.

---

### #320: feat req: Optional Overly Explicit Output
**OPEN** | Author: braxtonj | 2026-01-27 | Labels: none
Very much enjoying the tool but often I'm wondering what the hell it is doing as it get's shit done..

Update GSD to optionally give much more explicit output.  For instance, what was happening in the following:

    ```                                           
     Waiting…rce .venv/bin/activate && time pytest tests/test_catalog.py tests/test_iceberg_writer.py -v --tb=short 2>&1 | tail -15)                  
                                                                                                                                                      
     Waiting…rce .venv/bin/activat...[truncated]

**Key Comments (3):**
- **davesienkowski**: I believe there is discussion around something very similar to what you're looking to have done over in the Discord chat.

Also, I've found myself using the below Claude Code plugin when I'm curious what Claude is/has done.

https://github.com/thedotmack/claude-mem
- **braxtonj**: i'll check `claude-mem` out for sure.  thank you

how well has it worked with the GSD workflow for you @davesienkowski?  any pitfalls to watch out for?
- **davesienkowski**: > i'll check `claude-code` out for sure.  thank you
> 
> how well has it worked with the GSD workflow for you @davesienkowski?  any pitfalls to watch out for?

It's definitely a little heavy, in the way of using some context, but worth it if you want more verbose output of what your agent is doing. Not that its a context hog but uses very small amount of context a lot. 

Take a look at that repo p...[truncated]

---

### #319: New feature: Auto-proceed after limit reset
**OPEN** | Author: GorgeousGeorge25 | 2026-01-27 | Labels: none
When hitting rate limit "Stop and wait" seems to be the only option.
How about automatically resume once rate limit resets every 5 hours for Claude? Could save some time now and then on longer runs.

**Key Comments (1):**
- **superresistant**: It's very simple I love it. Not sure if cc support a wait time so long.

---

### #318: Question on Token Usage: API Tokens vs OAuth (High Usage on Max Plan)
**OPEN** | Author: byeadro | 2026-01-26 | Labels: none
first off, great work on GSD. I’ve been actively using it and really like the overall approach.
I recently switched over to GSD from the Bmad method, and I had a question around how authentication and token usage is handled.

Main question:
Does GSD use API tokens or OAuth tokens under the hood?

For context, when I was using the Bmad method, I had to modify the autonomous agent to use OAuth tokens instead of API tokens. Once I made that change, usage costs dropped significantly, and I was able to run the agent much longer without hitting limits.

With GSD, I’m noticing much higher usage than ...[truncated]

**Key Comments (2):**
- **seanGSISG**: How would it use API tokens if there is no API key set?

All GSD uses are slash commands, hooks, agents, templates etc.  It's not using the SDK.

I have migrated from Obra/SuperPowers and GSD seems to use the same amount of usage but with better results.
- **superresistant**: OAuth if you auth

---

### #317: Need a middle ground between /gsd:quick and /gsd:new-milestone
**OPEN** | Author: ajaygunalan | 2026-01-26 | Labels: none
`/gsd:quick` skips the quality agents entirely (no discuss, no research, no plan checker, no verifier). At the other extreme, `/gsd:new-milestone`  and `/gsd:new-project` forces full project ceremony—questioning, research, requirements, and a roadmap.

There’s nothing in between.

What’s missing is a way to run the full quality pipeline—`discuss-phase → plan-phase → execute-phase → verify-work`—for a single task, without `new-project` or `new-milestone`.

This gap is exactly why #280 (experiment mode) ended up re-implementing research, planning, execution, and verification inside a single sub-...[truncated]

**Key Comments (2):**
- **superresistant**: /gsd:new-milestone and /gsd:new-project should ask you the number of phases and verification
- **felix-ht**: this whole things is just clunky as f***

---

### #316: How should we log GSD workflow decisions for debugging?
**OPEN** | Author: davesienkowski | 2026-01-26 | Labels: none
# GSD Framework Debug Logging - Request for Feedback

## Problem

GSD is a prompt-based workflow framework for Claude Code. Workflows are markdown files containing orchestration instructions that Claude follows. When something goes wrong, we have no visibility into:

- Which workflow step we're in
- What decisions were made (skip research? use existing plans?)
- What config values influenced the decision
- What context was passed to spawned agents
- Why a particular path was taken

Currently, Claude Code hooks only give us raw tool calls (Bash, Read, Write, Task) - not the semantic meaning of ...[truncated]

**Key Comments (5):**
- **davesienkowski**: Any suggestions on how to best go about debugging or adding some kind of logging to the GSD framework? This would only be on the dev side and specifically for developing the GSD framework.

Being able to see the entire process, workflow, choices, subagents, hooks used, errors returned, that GSD goes through during use would be helpful.
- **szymontex**: https://github.com/alingse/ai-cli-log
for the record
- **superresistant**: > https://github.com/alingse/ai-cli-log for the record

is it the best? I saw many repo trying to log but don't know what to chose 

There's this one also https://github.com/daaain/claude-code-log
- **superresistant**: > Any suggestions on how to best go about debugging or adding some kind of logging to the GSD framework? This would only be on the dev side and specifically for developing the GSD framework.
> 
> Being able to see the entire process, workflow, choices, subagents, hooks used, errors returned, that GSD goes through during use would be helpful.


It would be useful to quickly benchmark specific agent...[truncated]
- **davesienkowski**: Perhaps the Claude Code session log itself could somehow be parsed to get all the details? I don't recall where it saves those or if they are temp.

---

### #315: Executer Agent Failure
**OPEN** | Author: SamuelMiller | 2026-01-25 | Labels: none
Lastest version of GSD on Windows 11 using Z.ai GLM 4.7 through Antigravity Tools proxy:

Debug Report: gsd-executor Silent Failure                       
                                
  Diagnosis                                                             
  Root Cause: Context overflow causing agents to hallucinate         
  completion                    
  
  Evidence

  Current State on Disk

  ✅ Plan 01-02 - Complete
  - 7 commits in git log (all successful)
  - Files created: src/api/routes/apps.py, src/api/routes/search.py  
  - SUMMARY.md exists
  - All tasks verified complete

  ❌...[truncated]

---

### #314: How to handle a structural requirement discovered after a phase is completed?
**OPEN** | Author: EmreErdogan | 2026-01-25 | Labels: none
Hi,

I have a question about an edge case. Let me give you an example scenario:

* Phase 2 is fully completed.
* Before starting Phase 3, I realized I forgot a **structural requirement**.
* This requirement affects the **database schema** and a couple of **core project features**.
* As a result, it impacts Phase 2 outputs and all downstream phases.

Restarting the project or regenerating `PROJECT.md`, `REQUIREMENTS.md`, and `ROADMAP.md` from scratch doesn’t feel appropriate. This isn’t a new idea — it’s a correction that must be applied on top of the existing work. Continuing without addressin...[truncated]

---

### #313: map-codebase  in an umbrella repo
**CLOSED** | Author: cbjerg | 2026-01-25 | Labels: none
I tried running  /gsd:map-codebase  in my umbrella repo, that has to sub repos (api and web), and it made a .planning/codebase only for the api. It did not recognize that there is another repo in there. 
I usually run claude in an umbrella repo in cursor to have it be aware of changes in the frontend that might need changes in the api as well. Is this possible to do, and I just overlooked something
Cheers

Christian

**Key Comments (1):**
- **cbjerg**: Sorry, I am an idiot. Started claude from the api sub dir.

---

### #305: [Feature request] Milestones as subfolders within the phases folder
**OPEN** | Author: HalSarj | 2026-01-25 | Labels: none
My phases folder is getting hard to manage and I really like the milestones feature.

I think it'd be useful to create a sub folder within phases for each milestone. I'm nervous to just do this manually in case I confuse claude.

**Key Comments (2):**
- **palonsorodriguez**: Strongly support this feature! The current flat structure creates significant confusion when working with multiple milestones.

## Concrete Problem

When you have multiple active milestones (e.g., shipped milestone with maintenance phases + new milestone in development), the `.planning/phases/` directory becomes ambiguous:

```
.planning/phases/
├── 01-authentication/        # Which milestone?
├──...[truncated]
- **simfor99**: This would be a great combination with the requested git workttee feature! 😎📐

---

### #304: "Error: Unknown agent type: general-purpose is not a valid agent type" in opencode
**OPEN** | Author: flatpalagent | 2026-01-25 | Labels: none
<img width="1118" height="299" alt="Image" src="https://github.com/user-attachments/assets/82cdc58b-0521-4eb0-9dc4-e6caeb85bbab" />
I use OpenCode 1.1.35 and GSD v1.9.13.

**Key Comments (1):**
- **greggh**: I am getting this too and wondering if it should be changed to OpenCode's "general" agent or if it is actually wrong because it is choosing to use the "general-purpose" agent where it is planning, and also when it is doing the GAP work at the end of a phase. Shouldn't both of those be updated to the correct general agent for OpenCode? OpenCode's is just named "general":
https://opencode.ai/docs/ag...[truncated]

---

### #303: Respect Claude Code's includeCoAuthoredBy setting
**CLOSED** | Author: eddiecervello | 2026-01-25 | Labels: none
## Problem

GSD command templates include hardcoded `Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>` lines in commit message templates, which ignores the user's Claude Code configuration.

**Example from `commands/gsd/quick.md` (line ~271):**
```bash
git commit -m "$(cat <<'COMMIT_EOF'
docs(quick-${next_num}): ${DESCRIPTION}

Quick task completed.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
COMMIT_EOF
)"
```

## Expected Behavior

Claude Code has built-in settings to control this:
```json
{
  "includeCoAuthoredBy": false,
  "gitAttribution": false
}
```

GSD should respec...[truncated]

**Key Comments (1):**
- **superresistant**: See https://github.com/glittercowboy/get-shit-done/pull/286

---

### #302: [Feature Request] /gsd:add-tests <phase>
**OPEN** | Author: deepbludev | 2026-01-25 | Labels: none
One of the things I love about the GSD workflow is that after the implementation and verification, y produces a UAT for the human to manually verify. THIS IS AWESOME and I always follow it gladly.

Nevertheless, after I finish, I always add tests (without clearing context) with something like
`/gsd:quick update the test suite (unit and e2e) in the @./tests/unit and @tests/e2e folder, based on the requirements of this phase. To verify your work, use pnpm:test:run to run the unit test and pnpm:e2e to run the e2e tests. Once everything passes, commit your work `

I'm thinking that adding a proper...[truncated]

**Key Comments (3):**
- **Quidge**: I've had the same thought. Came here after looking through the manual wondering if this was already built in and I missed it.

From experience working on various projects, there are tiers of tests that don't break clean into classic e2e/integration/unit designations. Sometimes they're killer units, other (mostly other times for these sorts of things) they're integration or full e2e tests. Bigger e...[truncated]
- **deepbludev**: yeah that is a great point
I think that the UAT generated by GSD already points out what should be tested, and maybe GSD could approach it like this:
- comprehensive unit tests for every single point in the UAT + all functions and server-side functionality
- analyze the UAT and determine a sensible set of e2e tests, like mut-have smoke tests and the main functionality that needs to be fully tested...[truncated]
- **mpool**: If I add the command while invoking plan-phase, I get exactly what I want (plus more) in each plan document:

> I want to generate some gherkin style acceptance criteria and unit tests to be included in this planning for execution

So I am +1 upvote on this feature request, but am personally putting some thought into where it fits in. GSD does not insist on upfront acceptance criteria processes, s...[truncated]

---

### #294: local model support
**OPEN** | Author: hafezsamy | 2026-01-24 | Labels: none
does gsd support local models in general like models downloaded using ollama or not?
as i tried a couple of modules in claude and it's just not working 
it just gives me a text 

i'm doing below to use a local models with claude:

add below to .bashrc 
#claude setting
export ANTHROPIC_MODEL=qwen2.5-coder:14b-instruct-q5_0
export ANTHROPIC_AUTH_TOKEN=ollama
export ANTHROPIC_BASE_URL=http://localhost:11434

then when start claude it reads the models and the gsd, but when starting any new project using /gsd it just out put text like chatgpt

so what is the issue ?

**Key Comments (4):**
- **yidakee**: pretty sure you can do this with LM Studio 2 using their OpenAI endpoints

https://lmstudio.ai/docs/developer/openai-compat
- **wit2008**: I tried using GSD with OpenCode. I configured opencode to use local models on my framework desktop (via LiteLLM). I tried gpt-oss-120b, and both of the qwen models. It's extremely slow, and went off-plan from GSD. I let it go all night long planning phases, and when I checked in the morning, it had started writing code...over 1100 uncommitted/untracked changes.

I think this really was built aroun...[truncated]
- **Tibsfox**: to configure opencode:

https://opencode.ai/docs/providers/#ollama

You can configure opencode to use local models through Ollama.
opencode.json

{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": {
        "baseURL": "http://localhost:11434/v1"
      },
      "models": {
     ...[truncated]
- **hafezsamy**: i get it working partially with opencode but not perfect of course
plz find what i did below may be it's useful for u:

first OpenCode requires a larger context window. It is recommended to use a context window of at least 64k tokens (from the Ollama official Docs) 
[](https://docs.ollama.com/integrations/opencode)

Tasks which require large context like web search, agents, and coding tools should...[truncated]

---

### #293: SWE-Bench
**OPEN** | Author: kripper | 2026-01-24 | Labels: none
Have you considered evaluating GSD-style workflows against SWE-bench as a way to quantify how much the iterative planning + execution loop improves bug-fixing performance.

**Key Comments (6):**
- **tnypxl**: I think any kind of evaluation process would be good. SWE Bench might be overkill to start with. It could be more valuable to roll GSD's own benchmarks to start. Then target SWE-bench as a v2 for "Benchmarks and Evaluations".
- **superresistant**: It's been discussed in the discord.
- **tnypxl**: > It's been discussed in the discord. 

Not every user will want to join the discord. It works great for contributors! Just kind of useless and obfuscating for anyone else.
- **superresistant**: > > It's been discussed in the discord.
> 
> Not every user will want to join the discord. It works great for contributors! Just kind of useless and obfuscating for anyone else.

Sure. You didn't miss anything. We're just at the throwing ideas phase.
- **jonassteinberg1**: > It's been discussed in the discord.

What's the name of the discord channel?
- **superresistant**: GSD
https://discord.gg/wbWHCCvg

---

### #292: [Feat] Support OpenHands
**OPEN** | Author: kripper | 2026-01-24 | Labels: none
OpenHands offers a rich agent management environment where each session can run in an isolated docker container (necessary for more complex systems), but also supports local mode (without docker).
It supports cli, web, rest API, etc.

---

### #291: [Feature Request] Support concurrent milestone execution with isolated state management
**OPEN** | Author: yidakee | 2026-01-24 | Labels: none
### Problem Statement

GSD currently assumes **single-milestone execution** with shared state files. This prevents teams or individuals from working on multiple milestones in parallel — a common need when managing separate workstreams (e.g., a feature milestone alongside a bugfix/maintenance milestone).

### Use Case Examples

#### Example 1: Hotfix interrupts feature development

**Scenario:** You're mid-way through `v2.0` (major feature work, Phase 12 of 20) when a critical production issue requires a `v1.5.1` hotfix milestone with its own phases.

**What breaks:**
- Running `/gsd:new-milest...[truncated]

**Key Comments (2):**
- **DennisS213**: +1 for this feature!                                                                    
                                                                                          
  I'm running into this exact limitation with my project.                                              
                                                                                          
  My use case: Sequential...[truncated]
- **jacobcxdev**: +1. I use GSD extensively in a personal context, but would like to use it within a team context safely.

---

### #290: Discuss-Phase answers hidden by next question
**OPEN** | Author: PCJones | 2026-01-24 | Labels: none
Hi,

when I answer a question in discuss-phase often claude will respond with an answer, which might have important context to see if claude understood what I meant.

The problem is that most of the time the next question will pop up immediately, hiding claudes response to my previous answer.

**Key Comments (1):**
- **cadr**: For reference, I was getting this when I was running claude in the MacOS terminal, but wasn't getting this when running claude inside a terminal in Cursor.  This may be a red herring and there was some other difference, just something I noticed this morning.

---

### #285: Change of plans
**OPEN** | Author: devyeshtandon | 2026-01-24 | Labels: none
Mid execution, if there is a change in plan, it is important to expose a command that can update the plan (add phase immediately or in the end). This will account for changes that came up during a project execution

**Key Comments (2):**
- **dkmaker**: Well that is not really efficient - and replanning mid implementation is a source to issues - and trouble - the correct thing is to stop and revert the changes and replan - OR make a new phase that captures the issues that was discovered - either way is good - but change plans in between

I just tell it to capture the details and when plan is executed - i use the add-phase command and tell it to d...[truncated]
- **devyeshtandon**: That sounds fair. 

But let's say we want to implement 5 modules:
A (independent)
B (independent)
C (independent)
D (depends on A and B)
E (depends on C and D)

If, after implementing C, the developer realizes that having C' will make E more exhaustive. It would make sense to keep the option open. Wdyt? 

Let the developer decide if it's right to roll back the entire execution or continue from her...[truncated]

---

### #264: Cannot change model profile when mapping existing codebase without creating settings file manually
**OPEN** | Author: colinangel | 2026-01-23 | Labels: none
When using GSD to map an existing codebase, you cannot change the default model by using /gsd:set-profile because the .planning/config.json doesn't yet exist and it throws an error.

---

### #263: Execute-plan gone?
**OPEN** | Author: ALuhning | 2026-01-23 | Labels: none
Was it intentional to remove the /gsd:execute-plan command?  Don't see it in /gsd:help and doesn't seem to be working anymore.  Was useful, did something else replace it or now execution is the full phase or nothing?  Thanks.

**Key Comments (1):**
- **amohamed369**: Yea it was replaced with /gsd:execute-phase. Does all the plans in the phase, either sequentially or in parallel to save on time (also depending on ur config - run /gsd:settings). It will still respect checkpoints though. If you want, you could either put check points in each plan (instruct during plan phase), or just tell it in the command (i.e. /gsd:execute-phase 2 please only do one plan at a t...[truncated]

---

### #262: Fix: Allow specifiying custom model names for agents
**OPEN** | Author: DLakin01 | 2026-01-23 | Labels: none
We have configured Claude Code to talk to our LiteLLM gateway instead of Anthropic directly. We use nonstandard model names in LiteLLM (`claude-4-5-sonnet`, `claude-4-5-haiku`, `claude-4-5-opus`). It would be good to be able to configure overrides for GSD to use custom model names instead of the defaults, so we can take advantage of this tool

**Key Comments (1):**
- **superresistant**: I think you can set aliases in cc config somewhere
You can also alias in status line

---

### #261: feat: Configurable model name mapping in config.json
**CLOSED** | Author: DLakin01 | 2026-01-23 | Labels: none
## Problem

The model profiles feature (#160) is excellent for controlling token spend, but model names are **hardcoded** in workflow files (`claude-4-5-opus`, `claude-4-5-sonnet`, `claude-4-5-haiku`). This creates issues when:

1. **Claude Code uses different model identifiers** - The CLI may expect different model strings than what GSD hardcodes
2. **Users want to use alternative models** - e.g., mapping "opus" to a different high-capability model
3. **Provider differences** - OpenRouter, local deployments, or other providers may use entirely different naming conventions

Currently, changing...[truncated]

**Key Comments (4):**
- **vlad-tsoy**: @DLakin01, was this implemented? I'm seeing the issue where, during the planning phase, the Opus 4.1 model is being used. I'm using Claude Code with the Azure AI Foundry and only have 4.5 versions deployed.
- **thekana**: @vlad-tsoy try the workaround https://github.com/anthropics/claude-code/issues/18447#issue-3819718460
- **DLakin01**: I ended up doing the same thing @thekana suggested - setting env vars in my ~/.zshrc to overwrite the default model names. Works perfectly!
- **vlad-tsoy**: @thekana, thank you for the workaround, that works for me too!

---

### #260: Claude Code shows   ⬆ /gsd:update in statusline, although it's fully updated
**CLOSED** | Author: jeremybernstein | 2026-01-23 | Labels: none
```
❯ claude --dangerously-skip-permissions

 ▐▛███▜▌   Claude Code v2.1.17
▝▜█████▛▘  Opus 4.5 · Claude Max
  ▘▘ ▝▝    ~/path/pathity/path/path

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
❯ Try "fix lint errors"
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  ⬆ /gsd:update │ Opus 4.5 │ Transformer
  ⏵⏵ bypass permissions on (shift+tab to cycle)
```

**Key Comments (1):**
- **jeremybernstein**: Apparently 1.9.10 is the latest, although /gsd:update tells me that 1.9.6 is the latest and that I'm on the latest version. Calling /gsd:whats-new seems to have cleared the state

---

### #259: Fix: Add feature discussion guard to prevent duplicate feature proposals
**OPEN** | Author: simfor99 | 2026-01-23 | Labels: none
## Summary

When users discuss features in conversation, Claude may suggest implementing features that **already exist in REQUIREMENTS.md**, causing confusion and duplicate work.

## Related Issue

This is related to #253 (Plans Created Without User Context) - both are **context-management gaps** where relevant planning files aren't loaded at the right time.

## Root Cause

1. `resume-project.md` loads STATE.md and PROJECT.md, but **NOT REQUIREMENTS.md**
2. There's no instruction to check existing plans before suggesting new features in ad-hoc conversations

## Real-World Example

**User:** "W...[truncated]

---

### #258: FYI: Upstream Claude Code bug affects Task() syntax parsing
**OPEN** | Author: simfor99 | 2026-01-23 | Labels: none
## Summary

There's a bug in Claude Code's parser that intermittently affects GSD commands which spawn subagents using Task() pseudo-code blocks.

## Upstream Issue

**Claude Code Bug:** https://github.com/anthropics/claude-code/issues/20368

## Symptoms

When running commands like `/gsd:plan-phase` or `/gsd:new-project`, users may see:

```
● general-purpose"(Research Phase 2.5)
  ⎿  Error: Agent type 'general-purpose"' not found.
```

Note the trailing `"` in `general-purpose"` — this is Claude Code's parser incorrectly extracting the subagent_type value.

## Affected Commands

Any GSD comma...[truncated]

---

### #257: Status line doesn't work on Node project with es modules
**OPEN** | Author: oren-hollander | 2026-01-23 | Labels: none
Node.js walks up the directory tree looking for a package.json to determine module type. Since .claude/hooks/ doesn't have its own package.json, it inherits your project's "type"

Changing the .claude/hooks/gsd-statusline.js to cjs solves this.

**Key Comments (1):**
- **derseitenschneider**: Bump, same here

---

### #256: Invalid tool paramaters with Claude Code v2.1.17
**CLOSED** | Author: restrolla | 2026-01-23 | Labels: none
GSD v1.9.6

Example below. Has issues with tool calls (parameters "invalid") and also availability of gsd-specific skills/agents. Defaults to useing Claude Code's "general-purpose" agent instead.

● Read(.planning/REQUIREMENTS_V14.md)
  ⎿  Read 154 lines

● Now I have all the context. Let me spawn the researcher agent with the appropriate prompt:
  ⎿  Initializing…
  ⎿  Invalid tool parameters

● Let me correct the Task call:
  ⎿  Initializing…
  ⎿  Invalid tool parameters
  ⎿  Initializing…
  ⎿  Invalid tool parameters

● I see the issue - the subagent_type "gsd-phase-researcher" may not be a...[truncated]

**Key Comments (3):**
- **BlacKcuD**: I have a similar issue but I always assumed it is related to me overwriting some models in my environment variables. The error messages are not helpful to identify what is really going on. How can I debug this and is there a way to make tool calls more generic to make them work with multiple models?

Example output of a situation:

```
 Now let me spawn the gsd-planner with quick mode context. Sin...[truncated]
- **restrolla**: I'm beginning to think it was related to CC updates. Seems to have resolved now. I mainly flagged for info, and appears other people had similar issues. If it goes away, then I guess it was some weird CC bug.
- **restrolla**: Fixed with CC v2.1.19:

- Fixed backgrounded hook commands not returning early, **potentially causing the session to wait on a process that was intentionally backgrounded**

---

### #255: Issues with Claude Code v2.1.17 and continuation of thinking about nothing when task complete
**CLOSED** | Author: restrolla | 2026-01-23 | Labels: none
GSD v 1.9.6

This may be some weird bug with this CC version (hooks?) but even when a set of tasks (e.g. mapping codebase) is finished, CC keeps cycling through "Combobulating..., Bloviating ... etc." and you need to escape multiple time or restart CC to initiate a new command cycle.

**Key Comments (4):**
- **wnstfy**: The same issue. Over 90 minutes of nothing .
- **samdoidge**: I'm seeing the same:
GSD v1.9.4
Claude Code v2.1.17

<img width="792" height="406" alt="Image" src="https://github.com/user-attachments/assets/8bf804ba-f02b-4342-8ba3-f52825e7146e" />
- **superresistant**: Isn't it fixed in v2.1.19 ?
https://github.com/anthropics/claude-code/releases
- **restrolla**: Yes. It is. So a CC problem (transient). From changelog:

- Fixed backgrounded hook commands not returning early, **potentially causing the session to wait on a process that was intentionally backgrounded**

---

### #254: MacOS specific assumptions
**OPEN** | Author: GottZ | 2026-01-23 | Labels: none
<img width="809" height="163" alt="Image" src="https://github.com/user-attachments/assets/c878dd07-405f-455b-a2b6-b3ecc8ea3286" />
I've noticed random read failures regarding GSD files.
this is purely on a linux environment, where XDG_HOME or ~ are sufficient to access this directory.

**Key Comments (1):**
- **GottZ**: <img width="682" height="122" alt="Image" src="https://github.com/user-attachments/assets/b710dfb6-0387-4d5b-9157-47efca487793" />

can we just point this to ~/.claude or $HOME/.claude instead?

---

### #253: Plans Created Without User Context
**OPEN** | Author: callesjoenell | 2026-01-23 | Labels: none
GSD Framework Issue Report: Plans Created Without User Context                                                           
                                                                                                                           
  What Happened                                                                                                            
                                                                                                                           
  Timeline (from git log and file timestamps):                                                            ...[truncated]

**Key Comments (2):**
- **simfor99**: I was facing a similar issue today, so +1
- **simfor99**: ## Related Issue: Feature Discussion Guard (#259)

While investigating this issue, I discovered a **related context-management gap**:

### The Pattern

Both issues stem from the same root cause: **relevant planning files aren't loaded when needed**.

| Issue | Missing File | When |
|-------|--------------|------|
| #253 | CONTEXT.md | During `/gsd:plan-phase` |
| #259 | REQUIREMENTS.md | During ad...[truncated]

---

### #252: Nice to Have - Embedded MCP Serena Configuration
**OPEN** | Author: HiteSit | 2026-01-23 | Labels: none
GSD consume a lot of tokes.
I was thinking if there is a way to force it to use the MCP Serena to perfcorm many of the research task so to save many tokens.
Maybe it's possible to create some sort of HOOK system that checks the (e.g. .mcp.json) confirming or not the presence of MCP Serena ... So that it's possible to imagine two operational branch: "with Serena" and "without Serena".

Ideas?

---

### #251: nice to have : i recommend to extract feedback from this article
**OPEN** | Author: fprivitera | 2026-01-23 | Labels: none
https://arxiv.org/abs/2509.16198

i used this article to build my own agent, and just with a single agent results were great, i don't imagine what can happen if you add features to your project based on this article.

**Key Comments (2):**
- **davesienkowski**: Thanks for the recommendation! I'm reading through it.
Any features mentioned in the article that you would suggest?
- **davesienkowski**: Thanks for the suggestion! Read the paper. A majority of the features they present do not fit with the GSD philosophy. Although there were some enhancements found that would benefit GSD. 

I've submitted PRs based on the discovered enhancements. 

#269
#270
#275
#276
#277
#278

---

### #250: Global installation succeeds, but CLI commands are missing with opencode installation
**OPEN** | Author: Ehtz | 2026-01-23 | Labels: none
I just installed globally with opencode and it installed on .opencode but commands are not appearing.

I am reverting back to https://github.com/rokicool/gsd-opencode for the time being.
Above was installed gloablly and works in .config/opencode file

**Key Comments (1):**
- **shyney7**: Should be fixed with latest version since the version before was installing in the wrong directory ~.opencode instead of the correct path ~.config/.opencode

Manual removal of gsd in ~.opencode should be done before reinstall.


Please close if fixed.

---

### #249: gsd-intel-index.js causing crashes on windows and wsl
**OPEN** | Author: ngudles69 | 2026-01-23 | Labels: none
I used Claude Code (both Windows and WSL) version.  After running for a while, e.g. when context reaches 40-50%, i would get a crash... some sort of bun crash (see below).  This keeps happening and after some digging, it lead to gsd-intel-index.js.  I cannot see the whole code but it looks like it triggers on every hook call (PostHookUse).  The code does something then it spins up ANOTHER CLAUDE instance after every tool use.  I see Claude sometimes do like 30-50 tools use. I can imagine constantly spinning running this code and spinning up a new process.

Also i check the .planning/intel fold...[truncated]

**Key Comments (2):**
- **ngudles69**: What is the impact if I disable it?
- **amohamed369**: I think this was rolled back? Maybe try updating?

---

### #246: new update causes issue where planner gets stuck in thinking phase or if asking a question I cant reply due to it thinking
**OPEN** | Author: mrbarnaclebot-ux | 2026-01-23 | Labels: none
After the new update, when gsd asks me questions sometimes I cant reply as its still in thinking mode and sometimes when its doing research it gets stuck for a long time, tokens arent being used.

---

### #244: Codebuff integration
**OPEN** | Author: Orinks | 2026-01-23 | Labels: none
With the recent edition of Codebuff being able to be authenticated with Claude, I would love GSD to be able to use it. Speed alone is quite faster than Claude Code.

I'm not 100 percent sure whether it has everything GSD needs. It has custom agents and MCP tool availability. Doesn't have hooks though.

https://www.codebuff.com/docs/agents/mcp-servers
for info on MCP tools and custom subagents.

---

### #243: Best practices for team collaboration?
**OPEN** | Author: zzzze | 2026-01-23 | Labels: none
Hey!

First off, loving the tool, it's been super helpful for my personal workflow.

I'm trying to figure out the best way to use GSD in a team setting (or when working on parallel tasks). Right now, my approach is to only commit the .planning/codebase directory to git, and I've added the rest of the .planning/ folder to my .gitignore.

My thinking is that the rest of the files in .planning are specific to my current context/session, so sharing them might mess things up for other teammates working on different things.

Does that sound like the right way to handle it? Or is there a better workf...[truncated]

**Key Comments (3):**
- **davesienkowski**: Hmm, I don't think a workflow has been worked out for a team environment. Part of the GSD philosophy was around solo development.

I think you're on the right track though. I might spend some time poking around with some team workflows to see what is possible.
- **zzzze**: Thanks for the response!

If we proceed with sharing .planning/codebase, I'm a bit concerned about handling updates and merge conflicts. Since the codebase structure evolves as we add new features, that directory will change frequently. Do you have any tips on how to manage conflicts there in a team setting?

Also, I wanted to mention a workflow I find really useful: During Code Reviews, I usually...[truncated]
- **rmindel**: We have been considering this also in our team.

A few things:
* At the end of a milestone, probably best to add mapping the code base again, or at least updating it based on the changes of the work done, so when pushing your code it includes the updated codebase.
* I would separate the .planning folder into a local folder dedicated for solo use, and a team folder where the codebase files will be ...[truncated]

---

### #241: Stuck on Spawning planner
**OPEN** | Author: arkadybag | 2026-01-22 | Labels: none
<img width="860" height="246" alt="Image" src="https://github.com/user-attachments/assets/8b4719b9-2aed-4ebf-8d80-5fe839cdcfdb" />

It is phase 2, where i have:
- 02-CONTEXT.md
- 02-RESEARCH.md

It stuck forever

**Key Comments (7):**
- **mratan**: I have a similar problem where it appears to just hang for an extended period of time...

`● ◆ Spawning 4 researchers in parallel...                                                                                                   
    → Stack research                                                                                                                        
    → Features research    ...[truncated]
- **sasquatch-vide-coder**: Edit: Going back to version 1.9.4 fixed the issue for me.

I'm having the exact same issues with the latest version. I've restarted the device it was running on and started the planning phase again with the same thing. It will keep counting up to 2.2 tokens over and over.

  gsd-phase-researcher(Research Phase 1 SSH Honeypot)
  ⎿  Fetch(https://github.com/mscdex/ssh2/blob/master/README.md)
     We...[truncated]
- **PCJones**: edit: Downgrading to 1.9.5 fixed it
I have the exact same issue on windows using 1.9.11. Research phase always gets stuck on /gsd:plan-phase., no errors. Just nothing happening.
- **shyney7**: @arkadybag which version did you use when encountering this problem?
- **sasquatch-vide-coder**: > [@arkadybag](https://github.com/arkadybag) which version did you use when encountering this problem?

For me v1.9.6
- **PCJones**: Hmm, now I had the same issue again after upgrading from claude code npm v2.1.15 to native 2.1.19. 
I downgraded earlier so that might also be relevant. I have the feeling that there might be a bug in (native) 2.1.9 where no permission is asked in tasks and so it hangs forever.
- **Zapkin**: I got the same issue when running claude code v2.1.23 and gsd v1.9.11; It hangs during the last step of research(writing the research.md)

---

### #239: Feature Proposal: Research Cache for Reusable Knowledge
**OPEN** | Author: lucasalexander132 | 2026-01-22 | Labels: none
### Problem

During the research phase, web searches often retrieve information that would be valuable across multiple projects—especially when working with the same tech stack.

### Proposed Solution

Implement a research cache that stores relevant findings from previous research phases. Before performing new web searches, the system would first query this local knowledge base for applicable results.

### Example Use Case

A research phase on "Next.js performance optimization strategies" generates findings that could benefit future projects using the same stack. Instead of re-searching the we...[truncated]

---

### #238: Debug sessions don't auto-close when issues are fixed outside /gsd:debug
**OPEN** | Author: stavarc | 2026-01-22 | Labels: none
## Problem

Debug sessions remain active indefinitely even after the underlying issue has been resolved through normal development work.

### What happened

- 5 debug sessions accumulated in `.planning/debug/` with status `investigating` or `verifying`
- The actual issues were fixed during regular phase execution (not via `/gsd:debug`)
- Sessions were never moved to `resolved/` because nothing detected the fix
- `/gsd:progress` continued showing "5 active debug sessions" creating noise

### Expected behavior

Either:
1. Debug sessions should have a way to be batch-closed when stale
2. `/gsd:pr...[truncated]

**Key Comments (2):**
- **stavarc**: ## Root Cause Analysis

Reading the gsd-debugger agent reveals the gap more precisely.

### How sessions close (current design)

Sessions close via the `archive_session` step, which runs automatically when the full cycle completes:

```
investigation_loop → fix_and_verify → archive_session (moves to resolved/)
```

### What's missing

There's no way to close a session outside that happy path:

1. ...[truncated]
- **qx54**: Can confirm.

Additionally debug files in `.plannin/debug/*` don't get committed to git, they just stay as unchanged changes indefinitely.

This is with the workflow: `/gsd:verify-work 1` → `/gsd:execute-phase 1 --gaps-only`

---

### #237: Manual update of Project
**OPEN** | Author: aagirre-rvp | 2026-01-22 | Labels: none
It would be really nice if we could get a way to manually invoke Claude to spin up sub-agents that systematically go through and update all documentation given the current context of the conversation. That way, if the agent doesn't acknowledge that a step should be documented, we can take that work and have it analyzed and converted to GSD format.

---

### #236: Add instructions on how to uninstall to README
**CLOSED** | Author: AssisrMatheus | 2026-01-22 | Labels: none
Not sure if only deleting the files on `~/.claude` is enough. What's the correct/expected uninstall steps?

**Key Comments (5):**
- **frenchie4111**: Seconded - I would love to get rid of it
- **glittercowboy**: Added `--uninstall` flag in the latest version.

**To uninstall GSD:**

```bash
# From Claude Code (global)
npx get-shit-done-cc@latest --claude --global --uninstall

# From OpenCode (global)
npx get-shit-done-cc@latest --opencode --global --uninstall

# From current project (local install)
npx get-shit-done-cc@latest --claude --local --uninstall
```

This removes all GSD commands, agents, hooks, ...[truncated]
- **Zotikus1001**: Those only install. they dont unistall anything.
- **AssisrMatheus**: > Added `--uninstall` flag in the latest version.
> 
> **To uninstall GSD:**
> 
> # From Claude Code (global)
> npx get-shit-done-cc@latest --claude --global --uninstall
> 
> # From OpenCode (global)
> npx get-shit-done-cc@latest --opencode --global --uninstall
> 
> # From current project (local install)
> npx get-shit-done-cc@latest --claude --local --uninstall
> This removes all GSD commands, ag...[truncated]
- **AssisrMatheus**: For anyone that wants to uninstall this. I basically followed what the code does here: https://github.com/stavarc/get-shit-done/commit/12e6acbf53eadadfbb2d41b4075e5a52166de3d8

- Delete `~/.claude/get-shit-done` folder
- Delete `~/.claude/commands/gsd` folder
- Delete `~/.claude/agents/gsd-*` files
- Delete `~/.claude/hooks/gsd-*` files
- Delete references for said `gsd` hooks and statusline on `~...[truncated]

---

### #235: How do you fix GSD with GSD?
**OPEN** | Author: ajaygunalan | 2026-01-22 | Labels: none
## The Gap

Some bugs/issues require research + experiments to find the root cause and then further research + experiments to find the right fix. `/gsd:debug` already supports multi-session diagnosis by persisting learnings to `.planning/debug/<slug>.md`. The gap starts after root cause found when the fix is not obvious, you often need to try multiple solution approaches (A/B/C), verify each, and record what was tried and learned so you can resume later without repeating work.

```
ISSUE (root cause unknown)
        |
        v
/gsd:debug (multi-session; persists learnings to .planning/debug/<...[truncated]

---

### #234: 📦Proposal: Discord Server for GSD Community Discussions
**CLOSED** | Author: davesienkowski | 2026-01-22 | Labels: none
## Discord Server for GSD Community Discussions

Hey @glittercowboy and everyone 

I set up a Discord server as a potential space for GSD discussions, troubleshooting, and community chat.

**Discord Invite:** https://discord.gg/CzkyRgJF

@glittercowboy - I'd like to grant you admin access if you're interested.

Before we go all-in on this, I wanted to get thoughts from you and the community:
- Is a Discord server a good fit for GSD, or would it fragment discussions away from GitHub issues?
- Any concerns or suggestions?

Would love to hear what everyone thinks.

**Key Comments (3):**
- **eng-aguilera**: I like the idea
- **amohamed369**: Isnt there already a discord? https://discord.gg/w3bN2DBET
- **davesienkowski**: > Isnt there already a discord? https://discord.gg/w3bN2DBET

Wow, you're right. I wasn't aware of that.

---

### #230: Bug: GSD agent subagent_type calls missing 'gsd-pipeline:' prefix
**CLOSED** | Author: simfor99 | 2026-01-22 | Labels: none
## Problem

When GSD is installed as a Claude Code plugin, all agents are registered with the namespace prefix `gsd-pipeline:`. However, the commands and workflows reference agents **without** this prefix, causing Task tool failures.

### Error Example

```
● gsd-executor(Execute Plan 01) Sonnet 4.5
  ⎿  Error: Agent type 'gsd-executor' not found. Available agents: [...] 
     gsd-pipeline:gsd-executor, gsd-pipeline:gsd-planner, ...
```

### Root Cause

Claude Code plugins register agents under `{plugin-id}:{agent-name}` namespace. The GSD plugin uses `gsd-pipeline` as its plugin ID, so all ag...[truncated]

**Key Comments (2):**
- **glittercowboy**: Closing this as the described behavior only occurs with an unsupported installation method.

GSD is installed via `npx get-shit-done-cc`, which copies files to `~/.claude/` or `./.claude/`. This doesn't use Claude Code's plugin namespace system.

The `gsd-pipeline:{agent-name}` namespacing you're seeing indicates you installed GSD as a Claude Code plugin, which isn't a supported path. We removed m...[truncated]
- **simfor99**: Hi @glittercowboy, thanks for the clarification!

Just to add some context from my side: I definitely didn't try to install GSD as a plugin or do anything unconventional.

What likely happened: I originally installed GSD back when it used the standard `npm install` method (which would register it in package.json). Then, when you switched to the `npx`-based installation, the new installer copied fi...[truncated]

---

### #229: gsd-opencode link
**CLOSED** | Author: jonsugar | 2026-01-22 | Labels: none
As requested the gsd-opencode link.

https://github.com/rokicool/gsd-opencode

**Key Comments (1):**
- **glittercowboy**: Already added to README in the Community Ports section. Thanks for the reference!

---

### #228: taking HOURS to initiate a new project and map codebase
**OPEN** | Author: michaeldeblok | 2026-01-22 | Labels: none
/gsd:map-codebase was spinning for 7+ hours on a relatively small existing project.

/gsd:new-project was spinning for 8+ hours on a different project that again was relatively small.

**Key Comments (4):**
- **glittercowboy**: This is definitely a bug with CC. It's has been mad slow for me lately.
- **arkadybag**: There is also an issue that it forgets to create PROJECT.MD
- **superresistant**: > /gsd:map-codebase was spinning for 7+ hours on a relatively small existing project.
> 
> /gsd:new-project was spinning for 8+ hours on a different project that again was relatively small.

What cc version. Does it crash at the end or finish the task? 
What model?
- **PCJones**: Might be related to #241 - can you try downgrading to 1.9.5 ?

---

### #226: ReferenceError in a stopHook
**OPEN** | Author: jonaslaberg | 2026-01-22 | Labels: none
ReferenceError: require is not defined in ES module scope, you can use import           
  instead                                                                                 
  This file is being treated as an ES module because it has a '.js' file extension        
   and '/Users/jonaslaberg/.claude/hooks/package.json' contains "type": "module".         
  To treat it as a CommonJS script, rename it to use the '.cjs' file extension.           
      at file:///Users/jonaslaberg/.claude/hooks/gsd-intel-prune.js:13:12                 
      at ModuleJob.run (node:internal/modules/esm/module...[truncated]

---

### #225: commands/plan-phase.md requires "context: fork" in the frontmatter for "agent: gsd-planner" to work or remove "agent: gsd-planner"
**OPEN** | Author: seanrobertkennedy | 2026-01-22 | Labels: none
After digging into this a little more, based on the way the command is written, it seems that removing "agent: gsd-planner" from the frontmatter would make more sense. Without "context: fork" "agent: gsd-planner" isn't doing anything. When I add "context: fork" it actually confuses Claude because the command itself says to spawn the gsd-planner agent.

---

### #221: 📦 Proposal: Lightweight Release & Branching Strategy
**CLOSED** | Author: davesienkowski | 2026-01-21 | Labels: none
## Proposal: Release & Branching Strategy

### Problem

- 131 tags in ~1 month creates noise for users finding stable versions
- 0 GitHub Releases means no visible release notes
- Direct commits to main led to the codebase intelligence revert (3,065 lines)
- No CI to catch Windows/cross-platform issues before merge

### Proposal

A lightweight release workflow that fits GSD's "no enterprise theater" philosophy:

**Branching:** Just `main` + feature branches. No `develop`, no release branches.

**Tags:** Batch patches weekly. Tag minors when features ship. Use pre-release tags (`v1.10.0-alpha.1...[truncated]

**Key Comments (3):**
- **tnypxl**: This is a good starting point. I think as more people use this, the patterns will need to be more stable.
- **superresistant**: Thx I was thinking about the same. 
We can make is clearer for everyone without enterprise larping. 

Those md files can be directly ingested in TÂCHES agentic workflow so the agent will follow that procedure.
- **davesienkowski**: Agreed!

Although I encourage others to enhance/improve GSD themselves beyond the philosophy of GSD or pulling PRs to their own forks. Who knows what someone might be able to accomplish. GSD works great but I can definitely see others wanting to expand it further.

---

### #218: ⚠️ GSD commands may not work after latest Claude Code update - Investigation in progress
**CLOSED** | Author: glittercowboy | 2026-01-21 | Labels: bug
## Issue Summary
After the latest Claude Code update, GSD commands using the colon syntax (e.g., `/gsd:help`, `/gsd:new-project`) may not be working properly. This appears to be related to how Claude Code handles namespaced commands in subdirectories.

## Symptoms
- GSD commands timeout when invoked (e.g., `/gsd:help`)
- Commands don't appear in `/help` output
- Commands exist in `~/.claude/commands/gsd/` but are not accessible

## Current Status
**Actively investigating** - I've opened an issue with the Claude Code team: https://github.com/anthropics/claude-code/issues/19749

## Are You Affec...[truncated]

**Key Comments (9):**
- **davesienkowski**: Which latest version of CC are you referring to?
- **glittercowboy**: I made the mistake of running /migrate-installer and it installed Claude locally. Kind of fucked shit up. Still investigating what went wrong.
- **glittercowboy**: BTW @davesienkowski - looked into Issue triage permissions but it's not available on my Github plan/repo setup as it's not an Org. Any suggestions? Would love to grant you permissions
- **davesienkowski**: @glittercowboy - Write access is one option. You’d likely want to set up branch protection on main. I’d really only be labeling and closing issues, leaving merging PRs to you, but branch protection would prevent any accidental direct pushes to main without review.

Another option is converting the repo to a free GitHub Organization, which would unlock that Triage role. Just heads up that it would ...[truncated]
- **dergachoff**: <img width="475" height="707" alt="Image" src="https://github.com/user-attachments/assets/528f855a-bb93-4a68-9b1b-7b3e4485f1ce" />

CC 2.1.14, latest GSD 1.9.4 – commands with ":" are present in /help and are working (started /gsd:new-milestone)
- **mchillak-alt**: I can't get any gsd slash commands to show up "unknown skill".  I've had claude run numerous symlink fixes and still nothing.  using claude 2.1.15 and GSD 1.9.4 -  

*update I have a temporary workaround.  This is a summary from claude of what was done: 

⏺ Summary for GitHub Issue                                                      
                                                               ...[truncated]
- **glittercowboy**: @mchillak-alt GSD doesn't use skills. It's all commands. 

Did you perhaps install via the 'plugin installer' by any chance? (If so this doesn't work and I don't know why people keep saying they installed it like this as it's not an official option haha)

It all works for me in /commands/gsd/* again.
- **mchillak-alt**: No it was installed globally off the command line in a fresh terminal.  Not
sure why it’s giving me problems but the work around seems to be working
for now.  I can’t think of anything else that would cause this.  Maybe
because I’m on Max Mojave os?

Mischa


On Thu, Jan 22, 2026 at 6:30 PM TÂCHES ***@***.***> wrote:

> *glittercowboy* left a comment (glittercowboy/get-shit-done#218)
> ...[truncated]
- **Rmsharks4**: Commands exit:
<img width="503" height="165" alt="Image" src="https://github.com/user-attachments/assets/adb21a96-34f8-4ef3-98f7-76d22833aa24" />
When run, it says API connection refused and timeout:

<img width="789" height="443" alt="Image" src="https://github.com/user-attachments/assets/9e3fcc1c-3204-44c5-8ce5-22c09ad632f8" />

GSD: 1.9.13
Claude-Code: 2.1.19

---

### #217: Task Tool InputValidationError: map-codebase.md uses unparseable YAML syntax on Claude Code CLI 2.1.x
**OPEN** | Author: erwinh22 | 2026-01-21 | Labels: none
## Bug Description

Running `/gsd:map-codebase` on Windows with Claude Code CLI 2.1.14 and GSD v1.9.1 throws:

```
InputValidationError: Task failed schema validation
Missing required parameters: description, prompt, subagent_type
```

## Environment

| Component | Version |
|-----------|---------|
| Claude Code CLI | 2.1.14 |
| GSD | v1.9.1 |
| OS | Windows 10/11 (Build 26200) |
| Shell | PowerShell 7.5.4 |

## Root Cause

The `spawn_agents` step in `get-shit-done/workflows/map-codebase.md` uses YAML-style documentation format that Claude cannot parse as Task tool parameters:

**Broken Format...[truncated]

**Key Comments (1):**
- **erwinh22**: ## Resolution Update - FIX VERIFIED WORKING

I've thoroughly investigated and resolved this issue. The fix is now **verified working**.

### Root Cause Summary

**Two issues were identified:**

1. **Invalid \subagent_type\ values** - Custom types like \gsd-codebase-mapper\, \gsd-executor\, \gsd-planner\ cause InputValidationError. Only \\"general-purpose\"\ is valid.

2. **Missing Task tool instru...[truncated]

---

### #216: Context cut after the phase discussion. Even if items are present in the context, they are not developed.
**OPEN** | Author: MethCDN | 2026-01-21 | Labels: none
There continue to be decisions made during discussions that are not executed in the plans. I especially notice this happening with custom responses when it’s decided to add text. It’s becoming very frustrating because even though these decisions are present in the context, they are not implemented. After the discussion phase, changes are made but not reported, and there is no minimal verification to check whether there are other areas that need to be implemented. Decisions taken during the discussion are autonomously moved to different development version tags. In my case, a feature was delibe...[truncated]

---

### #212: feat: Enhanced statusline with real-time project metrics and configurable display
**OPEN** | Author: jamiebuchanan | 2026-01-21 | Labels: none
## Problem

The current statusline only shows basic information:
- Model name
- Directory
- Context usage (percentage bar)

This provides minimal insight into GSD project progress, costs, and system state. Users working on long-running projects or using adaptive model selection have no visibility into:
- Phase and plan completion progress
- Session and project-wide costs
- Model usage distribution (especially for adaptive mode)
- Rate limit warnings
- Git state
- Active agents or checkpoints

## Solution

Enhanced statusline with 3 configurable display levels and real-time project metrics.

##...[truncated]

**Key Comments (7):**
- **jamiebuchanan**: ## 🐛 Bug Fix: Cost tracking showing $0.00

Identified and fixed the root cause of costs showing $0.00 in the statusline.

### Problem

The `usage.json` file had empty task arrays because **no PostToolUse hook was capturing tool usage**. The statusline was calculating costs correctly, but there was no data to calculate from.

### Solution

**Created `hooks/gsd-usage-posttool.js`** - A PostToolUse h...[truncated]
- **jamiebuchanan**: ## 🚀 Enhancement: Agent Cost Tracking

Added intelligent agent-specific token estimation to accurately track costs when spawning subagents.

### Problem

The previous fix tracked tool usage but estimated Task tool calls (agent spawning) at only 5k/1k tokens. In reality, agents can consume **50k-150k+ tokens** depending on their type and workload. This meant costs were significantly underestimated ...[truncated]
- **jamiebuchanan**: ## 🎯 Default Configuration Update

Updated GSD defaults to optimize for multi-agent workflows and cost visibility.

### New Defaults

**Model Profile: adaptive (was balanced)**
- Intelligent model selection based on task complexity
- Reduces costs by 30-50% vs balanced profile
- Routes simple tasks to Haiku, complex to Opus
- Better suited for GSD's varied agent workloads

**Statusline Level: deta...[truncated]
- **jamiebuchanan**: ## Update: Critical Bug Fixed

PR #213 now includes a critical fix (commit `194778e`) that enables the enhanced statusline.

**Bug discovered:** The enhanced statusline was built but never activated. The install script was still using the simple `gsd-statusline.js`, so all the features (configurable display, cost tracking, model usage, git state) were never actually shown.

**Fixed:** Install scri...[truncated]
- **jcheroske**: Does this take over the status line display completely? Can it be easily enhanced? I've been messing with https://github.com/rz1989s/claude-code-statusline. Being able to easily plug into something like that, or at least copying some of its features, would be sweet. I really like seeing my MCP servers (MCP:3/3: basic-memory, context7, pal) in the status.
- **jamiebuchanan**: ## Update: Usage Tracking Accuracy Improved

PR #213 now includes an additional fix (commit `accfb14`) that significantly improves cost calculation accuracy.

**What was fixed:**
- Usage tracking now checks for actual token usage data from Claude Code (when available)
- Falls back to much better estimates when actual data unavailable
- Adds transparency with `estimated` flag on each task entry
- S...[truncated]
- **jamiebuchanan**: @jcheroske This is an enhancement of the existing status line, expanding it's functionality.

---

### #210: Adaptive Model Selection Based on Task Complexity
**OPEN** | Author: jamiebuchanan | 2026-01-21 | Labels: none
# Adaptive Model Selection Based on Task Complexity

## Problem

GSD users face a trade-off between cost and quality when selecting static model profiles:

- **Quality profile**: Highest quality but expensive (Opus for most tasks)
- **Balanced profile**: Good compromise but still uses Opus for all planning
- **Budget profile**: Cost-effective but may sacrifice quality on complex tasks

**Specific pain points:**
- Simple CRUD operations don't need Opus, but users pay for it anyway
- Complex architecture decisions get same model as trivial edits in budget mode
- No automatic adjustment based on ...[truncated]

**Key Comments (2):**
- **jamiebuchanan**: ## Update: Adaptive Profile Now Fully Accessible

PR #211 now includes a fix (commit `7c54fa2`) that makes the adaptive profile easily accessible to users.

**What was missing:** While adaptive profile was implemented, it wasn't clearly marked as the default/recommended option in `/gsd:set-profile`, and switching to it didn't initialize the required `adaptive_settings`.

**Fixed:** 
- Adaptive now...[truncated]
- **De-Novo-Research**: Don't forget to update the "Model Profiles" page on the main page to describe the adaptive feature

---

### #208: Team Plan Detection & Usage Guidance
**OPEN** | Author: jamiebuchanan | 2026-01-21 | Labels: none
# Team Plan Detection & Usage Guidance

## Problem

GSD's multi-agent orchestration pattern (parallel research, plan verification loops, wave-based execution) can quickly exhaust rate limits on Claude Team accounts. Users may not realize their plan is suboptimal for GSD until they hit limits mid-project.

**Specific pain points:**
- Research phase: 4 parallel agents
- Planning: Multiple verification loop iterations with planner + checker
- Execution: N executors running in parallel waves
- Verification: Verifier + potential debug agents

Team plans have lower rate limits than personal plans, m...[truncated]

**Key Comments (1):**
- **jamiebuchanan**: ## ✅ Fix Implemented

The account type detection is now fully automated and no longer relies on user input.

### Changes Made

**Removed user input fallback** from `/gsd:check-plan` command:
- ❌ Removed `AskUserQuestion` from allowed-tools
- ❌ Removed user prompt fallback when detection fails
- ✅ Added automated detection using environment variables and session files
- ✅ Returns `unknown` if detec...[truncated]

---

### #206: Plan Phase is not saving all the details i entered
**OPEN** | Author: Orbita-Media | 2026-01-21 | Labels: none
When im planning a phase i initially put all the details in my text and i expect GSD to write them all down. 
But when i do /clear to discuss-phase, it only noted down general information about single points and not the details..

Can this be fixed?

**Key Comments (7):**
- **davesienkowski**: I think I understand what's happening.

  ## The Issue

  It looks like you're running `/gsd:plan-phase` first, providing your detailed context there, then running `/clear` and `/gsd:discuss-phase` afterward.

  The problem is that `/clear` wipes the conversation — any details you provided that weren't already saved to a file are lost.

  ## The Intended Order

  GSD is designed to run in this ord...[truncated]
- **Orbita-Media**: Thank you, i miswrote what i meant. i personally "plan" a phase with "add-phase" and describe all details there. Then i do "discuss-phase" and before that i /clear. And all the details are gone
- **davesienkowski**: Thanks for clarifying! I think I understand now.

  ## How GSD Is Designed

  GSD has specific tools for specific purposes:

  - **`/gsd:add-phase`** — Adds a phase *title* to your roadmap. It's a quick utility to say "I need to do X." Not designed for detailed requirements.

  - **`/gsd:discuss-phase`** — This is where you capture implementation details. It asks structured questions, captures you...[truncated]
- **Orbita-Media**: Thank you, i didnt know that add-phase is only for adding a name to the phase instead of telling what i want to have. I thought discuss was only for going in even more in detail
- **davesienkowski**: You're welcome. Add-phase does a bit more behind the scenes than just adding a name to the phase, it's just not designed to incorporate and save detailed information like discuss-phase.

I think of it as: add-phase is like the topic or overall goal or task you're wanting to do. Discuss-phase is where it asks you questions and you provide more detailed information to the phase.
- **be-ant**: Maybe there should be a "babysitting prompt" config option , like in videogames with the "is is your first time playing?"

"Hey, we are in the add-phase step, the objective is blah blah blah but keep in mind that blah blah blah. For more info, read the docs!"
- **Orbita-Media**: the problem i have with discuss-phase is, that i dont want to remember all details until i get a question about it. i want a function where i can throw in all ideas and specific details and that all those things get remembered. add-todo isnt doing this either. it saves the things i write only generally

---

### #203: ERROR: .claude\hooks\gsd-intel-prune.js  - stop hook
**CLOSED** | Author: MethCDN | 2026-01-21 | Labels: none
```
● Ran 1 stop hook
  ⎿  Stop hook error: Failed with non-blocking status code: node:internal/modules/cjs/loader:1404
    throw err;                                                                                                    ^
                                                                                                                Error: Cannot find module 'E:\mysite-test\$HOME\.claude\hooks\gsd-intel-prune.js'
      at Function._resolveFilename (node:internal/modules/cjs/loader:1401:15)
      at defaultResolveImpl (node:internal/modules/cjs/loader:1057:19)
      at resolveForCJ...[truncated]

**Key Comments (5):**
- **davesienkowski**: If you navigate to where it thinks the file is located do you see it there?
Paste the following into file explorer to see if the `gsd-intel-prune.js` file exists.

`E:\mysite-test\$HOME\.claude\hooks\`
- **De-Novo-Research**: I am getting a similar error during the new project command, running on Windows 11 command line

 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GSD ► QUESTIONING
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                                                 
  What do you want to build?                                                                              ...[truncated]
- **superresistant**: I proposed the fix, waiting for merge :  https://github.com/glittercowboy/get-shit-done/pull/207
- **davesienkowski**: See Commit d1fda80: revert: remove codebase intelligence system
- **glittercowboy**: Fixed by #207 - hook commands now use absolute paths instead of $HOME

---

### #202: feat: Add multi-stack support to /gsd:analyze-codebase (35+ languages)
**CLOSED** | Author: davesienkowski | 2026-01-21 | Labels: none
## Problem

The current `/gsd:analyze-codebase` command only supports JavaScript/TypeScript codebases, with hardcoded:
- **Globs**: `**/*.{js,ts,jsx,tsx,mjs,cjs}`
- **Export patterns**: ES6 modules, CommonJS, TypeScript namespaces only
- **Naming conventions**: camelCase, PascalCase (JavaScript conventions)

This limits GSD's applicability to enterprise and brownfield projects, which are often **polyglot** (multiple languages/stacks). The current analyzer cannot index non-JS/TS codebases, blocking effective use of `/gsd:map-codebase` and `/gsd:query-intel` for these projects.

## Real-World Us...[truncated]

**Key Comments (3):**
- **iongion**: This is gold, I was chatting with it today when I updated to latest version


`But can't /gsd:analyze-codebase also target python too ?`

```text
- You're right - the /gsd:analyze-codebase command as defined targets JS/TS files specifically (**/*.{js,ts,jsx,tsx,mjs,cjs}), but there's no fundamental reason it couldn't also analyze Python files. The same indexing concepts apply:
```

I ran it and it...[truncated]
- **davesienkowski**: Making a note that Codebase Intelligence was reverted/rolled-back in the latest release of GSD. 

Commit d1fda80

> revert: remove codebase intelligence system
> Rolled back the intel system due to overengineering concerns:
> - 1200+ line hook with SQLite graph database
> - 21MB sql.js dependency
> - Entity generation spawning additional Claude calls
> - Complex system with unclear value
> 
> Remo...[truncated]
- **davesienkowski**: Closing until codebase intelligence system discussion comes up again.

---

### #201: feature request: make use of Claude Chrome to test GUI navigation
**OPEN** | Author: be-ant | 2026-01-21 | Labels: none
The checkpoint feature and the /gsd:verify-work step currently walks users through each testable deliverable manually.
Proposal: Before presenting verification items to the user, spawn an agent using the Claude Chrome extension to perform automated pre-verification (clicking through UI flows, checking endpoints, testing interactions). This would:

Save user time by filtering out obvious failures before UAT begins
Provide richer diagnostic context when issues are found
Keep users focused on judgment calls rather than mechanical checks

The agent could produce a pre-verification report indicatin...[truncated]

**Key Comments (1):**
- **superresistant**: I love the idea but I think Claude Chrome extension is the wrong choice because it's behind a paywall, doesn't support Brave, Arc, or other Chromium-based and doesn't work with WSL.
I looked it up and I believe [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) is the best choice.

---

### #198: $HOME error path
**CLOSED** | Author: gadnaw | 2026-01-20 | Labels: none
The error path shows:
  C:\Users\admin\Desktop\new GSD\$HOME\.claude\hooks\gsd-intel-prune.js

i just run /gsd:new-project, and that error come out. i am on windows.

**Key Comments (5):**
- **gadnaw**: ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GSD ► QUESTIONING
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  What do you want to build?

● Ran 1 stop hook
  ⎿  Stop hook error: Failed with non-blocking status code: node:internal/modules/cjs/loader:1424
    throw err;

Error: Cannot find module 'C:\Users\admin\Desktop\sdf\$HOME\.claude\hooks\gsd-intel-prune.js'
- **gadnaw**: removing the /.claude/settings.json temporarily solve the issue.
- **gadnaw**: i use windows terminal. that causes the problem. i manually change the path of the hooks to SOLVE the issue in me.

QUESTION: should i continue to use windows terminal? what are the alternatives?

from this:
/c/Users/USERNAME/.claude/hooks/statusline.js

to this:
C:/Users/USERNAME/.claude/hooks/statusline.js
- **superresistant**: > i use windows terminal. that causes the problem. i manually change the path of the hooks to SOLVE the issue in me.
> 
> QUESTION: should i continue to use windows terminal? what are the alternatives?
> 

Windows Terminal is fine, I use it. I proposed the fix https://github.com/glittercowboy/get-shit-done/pull/207 
It's a simple path problem. TÂCHES is on MacOS so he cannot anticipate some of tho...[truncated]
- **glittercowboy**: Fixed by #207 - hook commands now use absolute paths instead of $HOME

---

### #196: I got a prompt to "approve" the last change, as the human user, but I had to exit the claude session and now I can't approve the prompt
**OPEN** | Author: stevenreddie | 2026-01-20 | Labels: none
I was building a website and was told to execute the changes using "npm run dev" or maybe "npm dev server" and I couldn't get this command to execute in a new terminal, so I had to exit claude. At the same time I was at a prompt that told me to type "approve" if I accepted the changes. Now that I've exited, I can't find the approval prompt again.

---

### #195: Issue: /gsd:query-intel fails - missing graph.db and indexing hook
**OPEN** | Author: mkritz | 2026-01-20 | Labels: none
Version: [1.9.0](https://github.com/glittercowboy/get-shit-done/releases/tag/v1.9.0) - 2025-01-20

**Description**
The `/gsd:query-intel` command references infrastructure that does not exist:

1. Expects `graph.db` at `.planning/intel/graph.db` — not created by `/gsd:analyze-codebase`
2. Expects hook at `hooks/gsd-intel-index.js` — does not exist

**Steps to reproduce**

1. Run `/gsd:analyze-codebase` (completes successfully, creates entities)
2. Run `/gsd:query-intel hotspots`
3. Command fails with `"graph.db not found"`

**What was created by `analyze-codebase`**

* `.planning/intel/index.j...[truncated]

**Key Comments (1):**
- **DevSecNate**: I saw the same behavior on [1.9.1](https://github.com/glittercowboy/get-shit-done/releases/tag/v1.9.1), though mine did not generate entities. I was able to generate entities and the graph.db on my second `/gsd:analyze-codebase` call by replacing my local bundled hook files:
```
.claude/hooks/gsd-intel-index.js
.claude/hooks/gsd-intel-prune.js
.claude/hooks/gsd-intel-session.js
```

With the unbun...[truncated]

---

### #192: Feature: /gsd:map-docs for documentation-heavy projects
**OPEN** | Author: szymontex | 2026-01-20 | Labels: none
/gsd:map-codebase is designed to analyze code repositories — it spawns agents looking for tech stack, architecture patterns,   
  testing frameworks, integrations, etc. This works great for codebases with actual code.                                        
                                                                                                                                 
  However, some projects are documentation-first or documentation-only:                                                          
  - Internal knowledge bases (markdown files organized by domain)                 ...[truncated]

**Key Comments (7):**
- **szymontex**: **Additional clarification / context**

One thing I want to explicitly highlight is that **GSD today is very strongly code-oriented**, and it does this *extremely well*.
`/gsd:map-codebase` gives Claude a mental model of a large codebase in a way that feels close to how a senior engineer would approach it.

The gap I’m running into is that **I increasingly use Claude (and Claude Code) not only for...[truncated]
- **ajaygunalan**: Hey — I’m also thinking along similar lines. I have a lot of notes (Markdown files) in my Obsidian vault on robotics/machine learning topics ([https://robothesis.com/README](https://robothesis.com/README)), and I’m envisioning using GSD for projects like you metioned.

Here are two feature requests related to that:

* [https://github.com/glittercowboy/get-shit-done/issues/83](https://github.com/gl...[truncated]
- **szymontex**: @ajaygunalan yeah, your Obsidian vault is a good example of exactly this. Hundreds of interconnected markdown files where knowledge structure matters, not code.

Checked your linked issues — #83 and #80 both make sense in this context. `--think` mode would actually pair well with `map-docs` for domains where you need Claude to reason through relationships before doing anything.

The broader point:...[truncated]
- **ajaygunalan**: Exactly. Ultimately, this depends on how you envision GSD evolving and which problems it aims to own. @glittercowboy I’d be very interested in your perspective on GSD’s role beyond coding, particularly for knowledge-first workflows like this.
- **szymontex**: I'll try to give it a shot and rewrite it for this type of tasks. Let you know if something will born out of it.
- **szymontex**: @ajaygunalan 
Quick update from my side:

I now have a working map-docs flow that’s separate from map-codebase and actually treats markdown as the primary artifact. It already gives useful structure/quality insight on docs-first repos (layout, naming, links, gaps, audience, etc.).

Importantly, this isn’t a sidecar tool — once docs are detected, it works end-to-end with the standard GSD flow (plan...[truncated]
- **ajaygunalan**: Yeah, sure. You can clone it from here: https://github.com/ajaygunalan/robo_thesis. I just pushed it, but the vault is still a work in progress.

I’ve been trying to use Claude Code with custom prompts (https://github.com/ajaygunalan/vegapunk) to organize everything. I’m actively refining the prompts, but it’s still far from done.

Feel free to clone both and use them. If it helps, I’d be happy! I...[truncated]

---

### #191: Feature: Multi-Session Quick Workflows (`quick-save` / `quick-resume`)
**CLOSED** | Author: ajaygunalan | 2026-01-20 | Labels: none
## Problem

`/gsd:quick` works great for single-session tasks. But when a quick task needs multiple sessions (context window fills up), all progress is lost.

## Proposed Solution

Add two commands to enable multi-session quick workflows:

### `/gsd:quick-save`
Pause a quick task by asking the user what to preserve:
- Iterative questions until user says "enough"
- Writes `.planning/quick/NNN-slug/.continue-here.md`
- Updates STATE.md

### `/gsd:quick-resume`
Resume from saved context:
- Finds `.continue-here.md` in most recent quick task
- Loads saved context + GSD files (@codebase/*, @STATE.m...[truncated]

**Key Comments (1):**
- **ajaygunalan**: `/gsd:debug` already handles multi-session workflows.                                                                                           
                                                                                                                                                                       
  **How it works:**                                                                    ...[truncated]

---

### #190: Please open source /github: commands or integrate in gsd
**OPEN** | Author: AshExplained | 2026-01-20 | Labels: none
As shown in your live stream https://youtu.be/k1pNmBHC9CU?t=2360 please this will help us who commit to github repos

---

### #189: Verification.md file issue on phase
**OPEN** | Author: MethCDN | 2026-01-20 | Labels: none
If during a phase modifications or implementation requests are made that are not included in the plan, the `verification.md` file is not created, and this causes the command `/gsd:plan-phase N --gaps` to not work.

 ```
/gsd:plan-phase 4 --gaps                                                                                       
  ⎿  Read C:\Users\info\.claude\get-shit-done\references\ui-brand.md (161 lines)                                 
  ⎿  Read .planning\STATE.md (264 lines)                                                                         
  ⎿  Read .planning\ROADMAP.md (378 line...[truncated]

---

### #188: A Publish command similar to /gsd-publish-version to package and publish to github
**OPEN** | Author: AshExplained | 2026-01-20 | Labels: none
As you showed in livestream https://youtu.be/k1pNmBHC9CU?t=808 please add a publish feature which we can use in our own repos

**Key Comments (2):**
- **alex036**: Couldnt this just be a skill specific to your environment and deployment process?
- **AshExplained**: Yeah but i would like the system to create a package and deployment process for a greenfield project

---

### #185: Design Prompt (Crude and VibeCodey lol)
**CLOSED** | Author: amohamed369 | 2026-01-19 | Labels: none
1. "Invoke the frontend-design skill"
2. I am creating/want to create [X]. Make it stunning award winning beautiful amazing jaw dropping drop dead gorgeous with visuals animations transitions everything interactive reactive hover effects etc motion.dev gsap scroll effects click effects etc, all in theme and style, snappy and responsive. Keep it simple and minimal though and clean using as much already done, built in, and standard as possible while still doing it all completely thoroughly and fully. You MUST use frontend-design skill (its a plugin) throughout. Everything full production quality...[truncated]

---

### #184: /model opusplan
**OPEN** | Author: bhrbek | 2026-01-19 | Labels: none
Are you able to leverage the /model opusplan config in Claude Code to plan with Opus and execute with Sonnet?  Or does it leverage this by default?

**Key Comments (1):**
- **kai-osthoff**: Perhaps that one? https://github.com/glittercowboy/get-shit-done/issues/160

@glittercowboy shipped it already.

---

### #182: Discuss Phase looking useless. Not execution contex.
**CLOSED** | Author: MethCDN | 2026-01-19 | Labels: none
```
Feature: Shell *************************"
From CONTEXT.md: "Icon in *************************"
Status: ❌ MISSING
────────────────────────────────────────
Feature: Settings icon
From CONTEXT.md: "Opens *************************""
Status: ❌ MISSING
────────────────────────────────────────
Feature: Clear icon
From CONTEXT.md: "Clears *************************""
Status: ❌ MISSING
────────────────────────────────────────
Feature: Stop icon
From CONTEXT.md: "Interrupts ru*************************"
Status: ❌ MISSING
────────────────────────────────────────
Feature: Keyboard shortcuts customizatio...[truncated]

**Key Comments (6):**
- **glittercowboy**: Thanks for reporting this. I haven't seen this behavior before and haven't had other reports of discuss-phase outputs not flowing into planning.

To help diagnose this edge case, could you provide more context?

1. **What was your exact workflow?** Did you run `/gsd:discuss-phase` first, then `/gsd:plan-phase` separately? Or something else?
2. **What platform are you on?** (macOS/Windows/Linux, sh...[truncated]
- **MethCDN**: After the phase discussion, Claude started developing, and while I was running a test to verify what had been done, I realized that almost all the points we had agreed on during the discussion phase were missing. When I noticed this, I asked why they were not there, and Claude replied that there was nothing else to develop. When I asked him to check the research and the entire planning, he confirm...[truncated]
- **MethCDN**: I told Claude to add to STATE.md a comparison between what is included in the plans and what is decided during the discussion, and to do this every time a new phase starts or a plan development begins. This is what happened with the third phase
P.S. If you want i have a screenshot but it's in Italian languagge. i have translate all with GPT.
--------------------------------------------------------...[truncated]
- **glittercowboy**: ## Root Cause Found & Fixed

Thanks for the detailed debugging @MethCDN — your investigation helped pinpoint this.

### The Problem

The `@` file reference syntax (e.g., `@.planning/phases/05-foo/05-CONTEXT.md`) **does not expand when passed through the Task tool**. 

When `/gsd:plan-phase` spawned the planner subagent, it was passing prompts like:

```markdown
**Phase Context (if exists):**
@.pla...[truncated]
- **glittercowboy**: Shipping a fix for this edge case shortly. Thanks for the detailed report — it helped track down a subtle but important bug in how context flows between agents.

Appreciate you digging into it! 🙏
- **MethCDN**: it's a pleasure. you GSD give me 10X more accurate develop on Claude. I think my bug report it's  only a little thanks for you incredible great job.

---

### #175: Newer versions feel like they eat through tokens and context very quickly - it feels like there should be a switch to deal simply or use agents.
**CLOSED** | Author: fullofsound | 2026-01-19 | Labels: none
<h2 id="summary">Summary</h2>
<p>GSD feels like it has become over-engineered over the last ~10–14 days. It now spins up more sub-agents and repeatedly reloads/reads context, which causes disproportionately high “Max plan” usage even for simple tasks. This makes it harder to justify using GSD for everyday small changes.</p>
<h2 id="what-changed-observed-">What changed (observed)</h2>
<ul>
<li><p>When you started using GSD (~1.5 weeks ago), it felt simpler:</p>
<ul>
<li>fewer sub-agents</li>
<li>less repeated context loading</li>
<li>lower overall usage cost for small tasks</li>
</ul>
</li>
<li...[truncated]

**Key Comments (5):**
- **fullofsound**: Don't get me wrong, it's super great and very much appreciated. I just felt like the earlier versions achieved a similar goal and used a lot less in terms of Claude usage :)
- **glittercowboy**: This is actually my main concern right now. Working on an implementation for lightweight task completion.

GSD updates have made it substantially more robust and effective at implementing large tasks at the expense of time and token usage.

I'm working on something I call "fly swatting" which will make completing small to medium tasks much lighter whilst still keeping the state machine updated.
- **kjellml80**: I love the idea behind this, but it is so utterly slow. Looks to be too much overhead. The agent spend more time reading, updating and writing .md files than it is writing code. Hope this get better.
- **glittercowboy**: Shipped: `/gsd:quick`

Thanks for this detailed write-up — it directly shaped what I built today.

**The new command:**
```
/gsd:quick
> What do you want to do? "create a small local test script"
```

**What it keeps:**
- Atomic commits (every task committed separately)
- State tracking (STATE.md knows what you did)
- Documented work (PLAN.md + SUMMARY.md)
- Same planner, same executor — same qual...[truncated]
- **fullofsound**: Thanks Lex. Will give it a go!

---

### #173: Never commit to main, always create a branch for each new project, even for each phase?
**CLOSED** | Author: beldar | 2026-01-19 | Labels: none
I wasn't expecting so many commits. I think it will be interesting every time a new project is created that all of these commits happen in a new branch so they can then be squashed. If it happens on main it's a pain in the ass .

**Key Comments (3):**
- **AshExplained**: Git branching done on each phase and merge after verify work succeeds after the phase is done. @glittercowboy please research about this. this will help us to easily rollback if a phase didnt work as expected instead of main..let main branch be teh best working condition one always
- **szymontex**: Yup, I always restrict pushing to main and made special gsd branch on my projects for that reason. Just prompt it and it'll follow it.
Here's what works:

**1. CLAUDE.md instructions** (simplest)
```markdown
## Git workflow
- NEVER commit or push directly to main
- Always create a feature branch first: `git checkout -b gsd/task-name`
- Only push to feature branches
```

**2. PreToolUse hook** (mor...[truncated]
- **caminadab**: Maybe even just having GSD work on the current branch instead of forcing a run of `git init` on new projects would really help with this. I get forcing `git init` for greenfields, but for brownfields its a bit cumbersome.

---

### #172: Website Needed
**OPEN** | Author: slathrop | 2026-01-19 | Labels: none
GSD needs a nice, promotional/educational website, esp. for non-technical users to help them understand and get up-to-speed. 

The website should be a simple GitHub Pages site. And the site contents should be easily editable as markdown using the same templating syntax used by the meta-prompting markdown.

A domain name should be used to simplify the URL for the GitHub Pages site.

**Key Comments (3):**
- **slathrop**: I have registered:

> https://gsd.site

on Namecheap and I'd be willing to donate it to the project. It is easy enough if TÂCHES wishes to create/use an account on Namecheap, I can easily do an intra-registrar domain transfer.
- **Shugar**: https://github.com/glittercowboy/get-shit-done/pull/174
- **lsaballo**: this get shit done , is insanely good !!!, thanks Taches...,  a local ui with a kanban column styles for tasks/phases and progress tracking/management it will be awesome.

---

### #170: Integrate Open source RLM to extend context
**CLOSED** | Author: nicokaniak | 2026-01-19 | Labels: none
Integrate RLM in Claude Code with its own primitives, detailed in the following repo [https://github.com/brainqub3/claude_code_RLM], based on the paper [https://arxiv.org/pdf/2512.24601v1]

**Key Comments (1):**
- **glittercowboy**: Thanks for the suggestion. RLM is interesting for processing very large single documents, but GSD approaches context differently - we use structured planning artifacts (`.planning/`) and fresh agent contexts rather than extended token windows. This keeps execution focused and predictable.

The RLM approach could be useful as a separate Claude Code skill for document analysis, but it's not a natura...[truncated]

---

### #169: Different Coding Agent for projects with multiple programming languages
**OPEN** | Author: jocax | 2026-01-19 | Labels: none
Larger projects have often different programming languages and have the need to use special agents and sub agents. Therefore it would be great if "get-shit-done" can support that. Below is my cc analyze what needs to be changes and implemented. Is that the way to go?

# Analysis Summary

## Current Architecture

The GSD framework has a fixed executor routing:

| Location | Current Behavior |
|----------|------------------|
| `execute-phase.md:234-236` | Hard-codes `subagent_type="gsd-executor"` for all plans |
| `execute-phase.md:251` | Uses `subagent_type="general-purpose"` for checkpoint pla...[truncated]

**Key Comments (2):**
- **markvandeven**: it goes for the planning as well. Gemini or OpenAI can be used for some of the research and brainstorming stuff. In some cases these models can be better for those phases (and it can save some Claude tokens as well for people running into rate limits)
- **doruchiulan**: interested, I feel this is a limitation. I want to provide special skills to agents executing different parts of the code ? Even for other commands that would be needed

---

### #168: Documentation: Comprehensive Architecture Overview with Mermaid Diagrams
**OPEN** | Author: jmvl | 2026-01-19 | Labels: none
# Get Shit Done (GSD) - Architecture Overview

**A meta-prompting, context engineering and spec-driven development system for Claude Code by TÂCHES.**

---

## Table of Contents

1. [Philosophy & Core Principles](#philosophy--core-principles)
2. [System Architecture](#system-architecture)
3. [State File Ecosystem](#state-file-ecosystem)
4. [Command Reference](#command-reference)
5. [Workflow Flows](#workflow-flows)
6. [Implementation Patterns](#implementation-patterns)

---

## Philosophy & Core Principles

### The Problem GSD Solves

Claude's quality degrades with context size. GSD manages th...[truncated]

**Key Comments (2):**
- **tezza1971**: This is a good start. I think that GSD needs it's own website with a /docs/ directory. @glittercowboy 
Something a bit more beefy than /gsd:help (which takes over a minute to respond sometimes because it's self-documenting?). Obviously this would incur maintainance overhead but thats what claude is for (just run it over the docs every other update). Could have a dedicated docs repo with a skill th...[truncated]
- **tezza1971**: or just activate the wiki here on github for this repo. Less automatable, but contributers can easily help.

---

### #165: [Question] | [BUG] I have the feeling that the 'fresh session' approach does not work for the Executor gsd-executor
**OPEN** | Author: shintaii | 2026-01-19 | Labels: none
So I had my first big project using GSD, and I let it run overnight. I run for 8 hours in the same 'agent.'

I thought the idea was that it uses fresh agents for tasks, so we make use of the good first 125K tokens. But I have the feeling it spawns an agent for every PHASE. If it is a huge phase, it tries to solve that all in 1 go, with 1 agent, compacting all the time. 

Is this the expected behavior?

[Screenshot](https://imgur.com/a/gJ5oWin)

**Key Comments (4):**
- **glittercowboy**: The architecture does spawn fresh agents per **plan**, not per phase. Each plan in execute-phase gets its own ~200k context via the Task tool.

A few things that might explain what you saw:
- If your phase had only one plan, it would indeed be one agent for the whole phase
- The Claude Code UI may not clearly delineate when subagents start/end
- Compaction messages in the UI might be from the orch...[truncated]
- **shintaii**: There were 4 phases; this was phase 1. 
Phase one had 3 plans.

 /gsd:execute-phase was used.
- **davesienkowski**: I've noticed something similar happen once or twice, but I've not had the chance to investigate.
It's possible GSD determined that the plans within the phase could not be run in parallel so it's doing them individually.

Maybe having some kind of task or todo indicator in the GSD-statusline might help determine what's happening?
- **davesienkowski**: In my prompting travels with Claude. I've noticed it handles the words "agents" and "subagents" oddly between different versions of Claude Code. 

In a previous commit I came across the below.
Commit 72da23d



![image](https://github.com/user-attachments/assets/4d07cf54-058c-4280-bab0-2560d89ccbe3)

---

### #164: gsd-project-researcher agent uses 2025 in search queries
**CLOSED** | Author: AshExplained | 2026-01-19 | Labels: none
Please add todays date as a variable when the agent starts its work otherwise it takes claude training cutoff date and we may get old research data back

<img width="717" height="182" alt="Image" src="https://github.com/user-attachments/assets/eca6b2b5-d65f-4112-ac9e-9156e17addac" />

**Key Comments (1):**
- **glittercowboy**: Fixed in cd1e278. The researcher agents had hardcoded "2025" in their query template examples, and Claude was copying them literally instead of substituting the current year.

Changed to `[current year]` placeholder with explicit instruction to check today's date.

---

### #163: Add option to skip Context7 for specific frameworks with unreliable data
**OPEN** | Author: gebeer | 2026-01-19 | Labels: none
## Problem

Context7 may index frameworks where the documentation data is broken or useless. Research agents currently prioritize Context7, but there's no way to tell them to skip it for specific frameworks.

### Example: ProcessWire

Context7 has ProcessWire indexed with seemingly valid metrics:
- **712 snippets** indexed
- **154,775 tokens** available

But the actual data quality is poor:

| Metric | Value | Issue |
|--------|-------|-------|
| Benchmark Score | **0** | No quality validation |
| Trust Score | 7/10 | Mediocre |
| Source Attribution | Points to `LICENSE.txt` | Completely broke...[truncated]

**Key Comments (1):**
- **gebeer**: **Related:** #161 (GSD agents cannot access Context7 MCP tools)

Issue #161 documents that custom subagents cannot access MCP servers due to Claude Code bug #13898. This means the research agents (`gsd-phase-researcher`, `gsd-project-researcher`, `gsd-planner`) don't have direct Context7 access anyway.

However, a `skipContext7` config option would still be valuable for:

1. **Orchestrator pre-fet...[truncated]

---

### #162: Feature request: archive phase folders/documents after milestone
**OPEN** | Author: jspicher | 2026-01-18 | Labels: none
I am finding it difficult to know which phase folders are from previous milestones and which are part of the current milestone. I believe it would be much easier if the `/gsd:complete-milestone` command were to archive the finished/completed phases into a .done (or similar) location so it would be easier to tell which folders are currently in progress, and which are not.

---

### #161: GSD agents cannot access Context7 MCP tools
**CLOSED** | Author: s0up4200 | 2026-01-18 | Labels: none
# Issue: GSD agents cannot access Context7 MCP tools

## Summary

Multiple GSD agents document Context7 as a primary research tool, but custom subagents in Claude Code cannot access MCP tools due to a known bug.

## Affected Agents

| Agent | Purpose | Uses Context7 For |
|-------|---------|-------------------|
| `gsd-phase-researcher` | Research before planning | Library docs, patterns, pitfalls |
| `gsd-project-researcher` | Research before roadmap | Domain ecosystem discovery |
| `gsd-planner` | Create execution plans | Library APIs, code examples |

## Root Cause

**Claude Code Bug #13898*...[truncated]

**Key Comments (8):**
- **s0up4200**: ## Implemented Workaround

We tested and implemented a workaround locally. Here's what we did:

### Changes to `/gsd:plan-phase` orchestrator

1. Added pre-fetch instructions before spawning `gsd-phase-researcher`:
   - Parse phase description for technology keywords
   - Call `mcp__context7__resolve-library-id` and `mcp__context7__query-docs`
   - Include results in agent prompt as `<pre_fetched_...[truncated]
- **s0up4200**: ## Alternative Suggestion: Remove Subagent Spawning for Research

Given the MCP limitation, an alternative design would be to **not spawn researcher subagents at all** and instead have users invoke research commands directly.

### Current Flow (requires workaround)
```
/gsd:plan-phase 3
  └─► spawns gsd-phase-researcher (can't use MCP - needs workaround)
  └─► spawns gsd-planner (can't use MCP - n...[truncated]
- **shyney7**: Shouldn't user scope MCP servers work for sub agents? According to the claude code issue this should only affect project scope MCP servers?

Edit: ok can confirm that e.g. in the research phase when 4 parallel research agents are spawned they are not able to access the global user scope context7 mcp. This is a pretty critical issue because it can lead to agents starting hallucinating.
- **kkrshna**: Had a bad 2 days trying to make GSD work with a 'Figma to code conversion' design task. It was a simple enough one-page Figma file.
In hindsight, I shouldn't have tried building design as the first thing using GSD. 🤦‍♂️ 

GSD executor subagents wrote `// VERIFIED: Figma Section Map` comments in code without actually calling the Figma MCP tool. They took shortcuts, used existing (wrong) files, and ...[truncated]
- **shyney7**: This is one of the biggest issues with gsd right now that causes bad results and waste of tokens for complex projects.

There are already separate commands:
`/gsd:research-phase`
`/gsd:plan-phase`
But even if you run them separately they spawn sub agents that can't access MCPs.
Would be better to run this commands manually and without spawning sub agents as long as Claude Code is not fixed regardi...[truncated]
- **davesienkowski**: If I recall, Claude Code subagents cannot yet make mcp tool calls. Maybe hooks could somehow be utilized in/with the subagents?
- **glittercowboy**: ## Fixed in v1.9.5

The MCP access issue for subagents has been fixed and published.

### The Problem

Custom subagents (defined in `.claude/agents/`) cannot access MCP tools due to Claude Code bug #13898. This affected `gsd-phase-researcher`, `gsd-project-researcher`, and `gsd-planner` which need Context7 for documentation lookups.

### The Fix

Switched to `general-purpose` agent (which has MCP ...[truncated]
- **shyney7**: Can someone confirm this? My research sub agent still used webfetch commands during research phase instead of looking of invocing the context7 mcp server !?

I think removing explicit tools available in the .md file template could fix this as general purpose sub agents have access to all tools by default and inherit from orchestrator.

---

### #160: Feature Request: Model Profiles for GSD Agents
**CLOSED** | Author: kai-osthoff | 2026-01-18 | Labels: none
Add switchable model profiles (`quality` / `balanced` / `budget`) to GSD, allowing users to control token spend based on their current quota situation.

## Problem

Currently, all GSD agents default to whatever model the user's CLAUDE.md specifies (typically Opus for quality). This means:

- **Read-only verification agents** (gsd-verifier, gsd-plan-checker) run on Opus despite only needing pattern matching
- **Implementation agents** (gsd-executor) run on Opus despite following explicit plans
- **Research agents** run on Opus despite primarily doing web searches and summarization

A single `/g...[truncated]

**Key Comments (2):**
- **glittercowboy**: ## Implemented in v1.8.1

Model profiles are now available. Switch profiles to control which Claude model each agent uses.

### Usage

```bash
/gsd:set-profile budget    # Conserve quota
/gsd:set-profile balanced  # Default - smart allocation
/gsd:set-profile quality   # Maximum reasoning power
```

Or configure via `/gsd:settings`.

### Profile Breakdown

| Agent | quality | balanced | budget |
|...[truncated]
- **sebikoux**: Can't wait to test it ! Thanks. both of you !!!

---

### #157: [FEATURE] Add guidance or command for cleaning up completed phase folders
**CLOSED** | Author: superdejooo | 2026-01-18 | Labels: none
## Problem

After completing multiple milestones, the `.planning/phases/` folder accumulates many phase folders that are no longer needed for active context.

In my project, I have:
  - 12 completed milestones (v1-v12)
  - 90+ phase folders in `.planning/phases/`
  - All key accomplishments preserved in `MILESTONES.md` and `milestones/v[X]-ROADMAP.md` archives

The `/gsd:complete-milestone` workflow excellently handles:
  - ✅ Archiving milestone details to `milestones/v[X.Y]-ROADMAP.md`
  - ✅ Collapsing ROADMAP.md to one-line summaries
  - ✅ Creating MILESTONES.md entries

But it doesn't addre...[truncated]

---

### #156: [Windows] SessionStart hook fails: $HOME path mangling causes "Cannot find module" error
**CLOSED** | Author: begna112 | 2026-01-18 | Labels: none
### Problem

The `gsd-check-update.js` hook configuration uses `$HOME` for the script path:

```json
"command": "node \"$HOME/.claude/hooks/gsd-check-update.js\""
```

On Windows, when Claude Code runs hooks (likely via PowerShell), $HOME contains an MSYS-style path (/c/Users/username). Node.js then interprets this as a Windows path, resulting in:

```
C:\c\Users\username\.claude\hooks\gsd-check-update.js
```

This path doesn't exist, causing the error:

```
Error: Cannot find module 'C:\c\Users\begna112\.claude\hooks\gsd-check-update.js'
  at Module._resolveFilename (node:internal/modules/cjs...[truncated]

**Key Comments (3):**
- **gsa9**: ## Test Result: Window Flash Still Occurs

Tested the proposed solution on Windows 11 - the path resolution works correctly, but **the window flash still occurs**.

### Why It Doesn't Work

The `windowsHide: true` option only prevents window flash when the **parent process** uses it in its spawn call. In this solution:

1. Claude Code spawns `node -e "..."` → **this causes the flash**
2. The spawn...[truncated]
- **superresistant**: Hi, did the flash fix work for you guys? https://github.com/glittercowboy/get-shit-done/pull/167 (was merged)

I proposed a fix for the hooks https://github.com/glittercowboy/get-shit-done/pull/207
- **glittercowboy**: Fixed by #207 - hook commands now use absolute paths instead of $HOME

---

### #155: Add a gsd:discuss command to discuss with gsd like a helper 
**CLOSED** | Author: AshExplained | 2026-01-18 | Labels: none
User may have questions regarding how to use gsd when they are clueless on next steps or sometimes they just want to ask questions about the repo/project 

A gsd:discuss will be great addition

---

### #154: Add /gsd:discuss command to discuss the codebase with all the relevant files from .planning in context (don't forget .planning/codebase dir)
**OPEN** | Author: kaladivo | 2026-01-18 | Labels: none
(no body)

---

### #153: Update codebase documents after phase verified
**OPEN** | Author: AshExplained | 2026-01-18 | Labels: none
Please make this automatic as it's a pain to map codebase every now and then on running brownfield projects

---

### #152: automatically run /map-codebase after finishing a milestone
**OPEN** | Author: kaladivo | 2026-01-18 | Labels: none
(no body)

**Key Comments (1):**
- **dergachoff**: Yes! When reading readme I understood that codebase docs would be auto updated at some point before or when completing milestone, but that's not the case. So after a milestone dedicated to creating test coverage CONCERNS.MD and TESTING.MD still tell me about the lack of tests. At least until I do a new map. But in readme it's implied that mapping is done once in brownfield projects.

---

### #147: Keep adding milestones
**OPEN** | Author: cajoy | 2026-01-18 | Labels: none
I've created a design doc with a new roadmap (7 phases for a product pivot). I want to add it as a new milestone, but I don't want to add these phases to my current milestone — it's separate work.

  Problem is /gsd:new-milestone won't let me create a new milestone because the current one isn't finished. But I don't want to archive or abandon it either — both milestones are valid, just different tracks.

  Ideally I'd like something like update-roadmap or import-roadmap that:
  - Reads a design doc
  - Creates milestone/phases from it
  - Doesn't require finishing the current one

  Or at leas...[truncated]

---

### #146: Features: Automatically continue writing code after limit reset
**OPEN** | Author: CPloscaru | 2026-01-18 | Labels: none
When you use claude pro, you hit time and time again limit. Is it possible to set gsp to automatically continue after the limit reset? Maybe set a cron to launch the script againt?

**Key Comments (2):**
- **kai-osthoff**: @CPloscaru sounds like https://github.com/glittercowboy/get-shit-done/issues/160 will be helpful too?
- **CPloscaru**: @kai-osthoff Thank for sharing. I just start trying gsd so I was not aware of this. It would definitely be great to improve the granularity/control of the model used. So we would use it efficiently.

But my request is more about the "YOLO" mod. I would like to let claude and gsd run autonomously and restart when he reach the limit of my plan.

---

### #145: Add UI mock generation layer
**OPEN** | Author: AshExplained | 2026-01-18 | Labels: none
Similar to the plugin creation project https://github.com/glittercowboy/plugin-freedom-system where /dream used to route to a ui skill https://github.com/glittercowboy/plugin-freedom-system/tree/main/.claude/skills/ui-mockup which used to output html with yaml specs. we need that in GSD please. letting AI decide UI while development needs so much rework to fix later

---

### #144: Add bin entries for hooks to enable cross-platform support
**OPEN** | Author: gsa9 | 2026-01-18 | Labels: none
## Problem

The `SessionStart` hook and `statusLine` commands use `$HOME` which doesn't expand on Windows PowerShell, causing startup errors.

**Original broken configuration:**
```json
"command": "node \"$HOME/.claude/hooks/statusline.js\""
```

**Current workaround:**
```json
"command": "node -e \"require(require('os').homedir() + '/.claude/hooks/statusline.js')\""
```

This workaround is cross-platform but causes a **brief console window flash** on Windows because `node -e` spawns a new console window.

## Proposed Solution

Add bin entries to `package.json` so the hooks are available as CL...[truncated]

**Key Comments (2):**
- **gsa9**: Update: Filed a related issue with Claude Code itself: anthropics/claude-code#19012

The root cause is that Claude Code doesn't use windowsHide: true when spawning hook commands on Windows. If they fix that, any hook command would work without the window flash, regardless of how paths are resolved.

In the meantime, the bin entries approach is still the cleanest cross-platform solution and would a...[truncated]
- **gsa9**: ## Update: Working Windows Solution Found

After extensive testing, found a working solution that eliminates the console window flash on Windows.

### Root Cause
The `$HOME` variable doesn't expand on Windows PowerShell, and different hook types are spawned differently by Claude Code:
- **statusLine**: Spawned with stdin/stdout piped → `node -e` works without flash
- **SessionStart**: Spawned deta...[truncated]

---

### #143: $HOME doesn't expand on Windows in hook commands
**CLOSED** | Author: gsa9 | 2026-01-18 | Labels: none
## Problem

The `SessionStart` hook and `statusLine` use `$HOME` which doesn't expand on Windows, causing a startup hook error.

**Current configuration (broken on Windows):**

`hooks.SessionStart`:
```json
{
  "type": "command",
  "command": "node \"$HOME/.claude/hooks/gsd-check-update.js\""
}
```

`statusLine`:
```json
"statusLine": {
  "type": "command",
  "command": "node \"$HOME/.claude/hooks/statusline.js\""
}
```

## Solution

Use Node.js to resolve the home directory at runtime, making it cross-platform.

`hooks.SessionStart`:
```json
"SessionStart": [
  {
    "matcher": "startup",
   ...[truncated]

**Key Comments (2):**
- **gsa9**: See Issue "Add bin entries for hooks to enable cross-platform support" #144 created afterwards, for a better solution proposed by the ever present C Opus itself.
- **glittercowboy**: Fixed by #207 - hook commands now use absolute paths instead of $HOME

---

### #140: Does /gsd:execute-plan use something like a Ralph Loop? Should it?
**CLOSED** | Author: jcheroske | 2026-01-18 | Labels: none
Just wondering how things work under-the-hood and if there's an opportunity to enhance phase execution for better results.

**Key Comments (1):**
- **AsterixBG**: [No need to wonder](https://github.com/glittercowboy/get-shit-done/blob/main/get-shit-done/workflows/execute-plan.md).

---

### #139: Feature Request: Availability for other CLIs
**OPEN** | Author: AshExplained | 2026-01-18 | Labels: none
GSD development logic is solid. However its bind to claude code. The reason speckit became so famous that it gives user and option to select their required CLIs like codex or gemini etc during installation and adapts. Hopefully GSD also does similar to that and then the whole world will be able to enjoy GSD irrespective of which AI model they use.

And if they have gsd installed for claude with other clis as well in the same machine, this way users can also try offloading some token heavy tasks like researching and debugging code etc to other models like codex or gemini and keep claude reserve...[truncated]

**Key Comments (12):**
- **superresistant**: He stated many times already on his live YT that he doesn't want to have to maintain the integration into other IDE he doesn't use but feel free to maintain an integration yourself, that's the point of open source.
- **ffroliva**: But the point is totaly valid! supporting other CLIs would help the project explode as other users use other providers.
- **ajaygunalan**: Features like sub-agents and interactive user questioning—which are what make GSD powerful—are currently only available in Claude Code. Because of this, implementing GSD in another CLI without feature parity doesn’t make much sense right now. In the long run, once other CLIs mature, this could become viable. But at the moment, it’s simply not feasible, in my opinion.
- **shoootyou**: I just created a fork for this: https://www.npmjs.com/package/get-shit-done-multi bc I normally use Github Copilot CLI and sometimes Codex
- **superresistant**: When I have time I'll do some research on it. What CLI would you like ? 
I've seen many ppl asking for open code support, is this the CLI you use ?
- **ffroliva**: Gemini CLI would be a good cadidate.
- **shoootyou**: > Gemini CLI would be a good cadidate.

Por Gemini use https://github.com/Cars-10/get-shit-done-gemini
- **markvandeven**: > He stated many times already on his live YT that he doesn't want to have to maintain the integration into other IDE he doesn't use but feel free to maintain an integration yourself, that's the point of open source.

but looking at the number of pull requests there are already a few ppl willing to contribute to this. i think it is a matter of finding a few that can be trusted to help maintain GSD...[truncated]
- **shayki5**: Codex please!!
- **RPainter8West**: I'd love to see this working in the Github Copilot plugin for VsCode.  It supports agent skills and subagents now.
- **haeusser**: I love the idea of being able to ask different models for their input. From my own (manual) experience, it can often unblock you asking codex when claude got stuck or vice versa.

Not sure if it is as easy as https://github.com/skills-directory/skill-codex

edit: I also have the impression that the large codex context window can help better at complex tasks.
- **glittercowboy**: GSD now supports Gemini! 🎉

---

### #138: Update Project from older GSD versions?
**OPEN** | Author: Orbita-Media | 2026-01-18 | Labels: none
Is there anything i need to spend attention on when updating to the newest GSD with my existing projects? Because files and flow where created with older versions and now in version 1.6.4 (i installed GSD 4 days before this version), projects where initialized with the older workflows and files(?)

Do the existing projects automatically update everything if i do /gsd:resume-work oder execute-phase or anything?

---

### #137: Feature Request: Notion integration for plans and docs.
**OPEN** | Author: JohnieLee | 2026-01-18 | Labels: none
It would be a pretty killer use case if you can read/write the plans/roadmap/artifacts into Notion.

The specific use case I have is:
1. I ask Claude to generate a full tech spec for the entire project 
2. I review the tech spec and provide feedback on various sections.  Right now, I do this by referencing the anchor link and adding my comments.

What I would like to do is:
1. Claude generates the tech spec in Notion
2. I review the doc and add comments inline using Notions comment functionality
3. Claude/GSD reads the comments and updates the notion doc inline.

**Key Comments (5):**
- **superresistant**: I personally don't like notion and don't want it to creep into everything. 
What stop you from making a script that watch the files and import them into notion as you go?
For the other comment-feature, this would be a notion api comment end point, something like that.
- **malkhuzayyim**: You might find https://github.com/steveyegge/beads matches your use case a bit more, its meant for integrating with existing ticketing systems. I assume notion could be already supported or a target for them. This would probably mean its more leaning into notion databases rather than documents.

The plans GSD generate aren't meant to be longterm artifacts anyway is my understanding. Once a roadmap...[truncated]
- **JohnieLee**: It doesn't need to be Notion.  It could be Google Docs. 

My specific use case is for teams and enterprise development.  

How I use GSD is that for the first Plan, I have it create a PRD and Tech Spec for the entire project.  These are expected to be quite detailed and get reviewed by the team before we go into implementation.  This is also a way for me to gut check GSD and provide it the necessa...[truncated]
- **ajaygunalan**: These are local markdown files, you can open it VS-code or obsidian, why notion or Google docs (cloud-based)?
- **alikinir**: Integration with beads sounds very reasonable.

---

### #136: Calling phase execution automatically after planning would be nice
**OPEN** | Author: gyuszka92 | 2026-01-17 | Labels: none
Is there a situation where after the planning of a phase is finished, we don't want to call the execution right away? 
Would be nice to have a plan-and-execute phase command which would remove the manual "work" of calling the "execute phase" command when the planning is finished.

**Key Comments (3):**
- **lydonator**: The problem with that is having access to clear the context.  There is no claude code hook that can be called to clear the context in a running query/agent. Without this, even with sub agents you would quickly run out of context in the orchestration thread.
- **AshExplained**: Call me mad but Sometimes I like to plan all the phases first and get the plan documents ready before execution
- **gyuszka92**: @lydonator hmm...let's see if I can find a workaround.

@AshExplained exactly 😎

This is one of the main challanges this project brings. Finding the perfect balance between milestone sizes, pre-planning and maximizing the time claudr code can run by itself with no interraction by us.

For example, if an integration planned for phase 2 introduces new variables into the .env files (which I need to d...[truncated]

---

### #135: Other Agent Support
**CLOSED** | Author: Skeegan123 | 2026-01-17 | Labels: none
I have noticed other issues/PR's being closed that have attempted to support other agents like OpenCode. Is the issue that you dont feel the PR's accomplished this in a reliable/easy to maintain way? Or is it that the team is not interested in adding this support at all? I have a local branch set up that just changes the install script and allows this to be installed to both claude code and opencode with the ability to add other agents like cursor relatively easily. Is it worth it to create a PR with these changes or will they just get closed because that is not the goal of the project. I thin...[truncated]

**Key Comments (3):**
- **AshExplained**: Can you please share the script that will be very helpful for me as I would like to use other agents for research and debug tasks thereby saving cc tokens?
- **Skeegan123**: > Can you please share the script that will be very helpful for me as I would like to use other agents for research and debug tasks thereby saving cc tokens?

@AshExplained Sorry I have been very busy and there are a few things I would like to change before creating a fork or anything with the change. I will try to get to it asap and will update here when I do
- **Skeegan123**: Closing because OpenCode support was added!

---

### #134: [Feature request] Adding UI mock-up generation to the planning phase.
**OPEN** | Author: gyuszka92 | 2026-01-17 | Labels: none
This is a very promising system. I love it, I've been using it since a couple of days and I also watched some of the videos on the Youtube channel.
What I really miss is including the design mock-up generation somewhere in the planning.

I saw a video on the Ytb channel where the [plugin-freedom-system](https://github.com/glittercowboy/plugin-freedom-system) is used to generate the Flutterverb plugin. The planning phase (/dream command) included the design mock-up generation (html file + yml file). That seemed very next level, because I think seeing the GUI upfront actually helps making better...[truncated]

**Key Comments (4):**
- **lydonator**: GSD gives you the flexibility to do this if you want to. Just make Phase 1 be a GUI mockup. For example if you're building a full stack web app, have Phase 1 be a GUI framework, launched on a dev server. Then run through the rest of your design phases/plans (preferably not YOLO), and watch it build while it jumps through the plans. Need something big changed, insert a phase, if small change, just ...[truncated]
- **AshExplained**: Yes! Please @glittercowboy Please bring over /dream to gsd:dream and somehow integrate this to planning phase with user consent so that its non intrusive. I am working on front end heavy projects and creating logic first and then UI seems backwards and takes a lot of code changes later. Having UI mocks first is so much more better way or atleast gives a very good head start
- **AshExplained**: > GSD gives you the flexibility to do this if you want to. Just make Phase 1 be a GUI mockup. For example if you're building a full stack web app, have Phase 1 be a GUI framework, launched on a dev server. Then run through the rest of your design phases/plans (preferably not YOLO), and watch it build while it jumps through the plans. Need something big changed, insert a phase, if small change, jus...[truncated]
- **lydonator**: > > GSD gives you the flexibility to do this if you want to. Just make Phase 1 be a GUI mockup. For example if you're building a full stack web app, have Phase 1 be a GUI framework, launched on a dev server. Then run through the rest of your design phases/plans (preferably not YOLO), and watch it build while it jumps through the plans. Need something big changed, insert a phase, if small change, j...[truncated]

---

### #133: Antigravity Support
**OPEN** | Author: Geargrindadmin | 2026-01-17 | Labels: none
Like the title says.

---

### #132: Claude code Limitaiton CLI
**OPEN** | Author: nicokaniak | 2026-01-17 | Labels: none
I posted this issue in the chat, but I think it was misinterpreted.  The problem of GSD being based on Claude Code is that you actually need a Claude Pro subscription to be able to use Claude Code, regardless of using or not using Claude as the main LLM.
If GSD were to be created for another sdk (Gemini) or its own thing, which can later give options of which LLM to use, it would be amazing cause we would be eliminating the barriero of actually needing the pro subcrpition to access CC.

**Key Comments (7):**
- **aalimov**: > we would be eliminating the barriero of actually needing the pro subcrpition to access CC

We should make a PR
- **AshExplained**: Oh I created a duplicate to this https://github.com/glittercowboy/get-shit-done/issues/139 by mistake
and this idea will let the user freely use any AI or multiple (if they have sub to multiple)
Imagine using gemini for research, claude to code and codex to debug
- **coldshalamov**: Taches (glittercowboy) talked about making a version of GSD outside of claude code in his last live stream https://www.youtube.com/watch?v=WlEZTFBRYw0 
I'm actually listening to it now and I didn't hear him mention a lot of specifics, but I use GSD in Opencode which I'm fully converted to. Ironically claude is the only provider that doesn't work there
- **AshExplained**: @coldshalamov do you use some script to convert it for opencode?
- **superresistant**: Guys you have so many router options to use other subscription into claude code. This is not a real limitation.
- **BrahimDahmani**: Hi everyone,
it seems there has already been some work in this area, such as https://github.com/rokicool/gsd-opencode and https://github.com/RazvanBugoi/get-shit-done. You might want to consider whether aligning around a single solution could be helpful, to reduce duplicated effort.
- **pjagielski**: the problem of using separate repo for that would be how to stay updated if @glittercowboy pushes updates daily (which is sick btw!)
one option would be to use git submodule, but this would require kind of pipeline to pull the changes and transform to other agent format, which would be a big overhead

---

### #131: The new /discuss-phase is inefficient and cumbersome
**OPEN** | Author: rolandtolnay | 2026-01-17 | Labels: none
I keep having this feeling that the way the plugin worked at 1.5.x versions was a lot more pleasant to use than 1.6.x.

Discussing a phase back then felt like an optional step if something was omitted from the initial planning.
But generally you could plan a phase, and chat back and forth in the same context until you had the plan you wanted.
Now with the planner sub-agents thats gone.

It feels like there in an attempt to provide more "hands-off" automation, we ended up adding more bloat.
With the whole automatic plan verification and phase verification now, implementing even simple phases ta...[truncated]

---

### #130: discussion: make milestones the default approach
**OPEN** | Author: malkhuzayyim | 2026-01-17 | Labels: none
2 days into using GSD, loving it so far, love the simplicity, great project and mental model. it feels like the native planning mode in claude code (which was the only thing i use always, i never used meta frameworks to augment planning and context), this feels like a natural evolution.

**Here's a take I have based on my experience so far. I hope its useful.**

There's a few things that perhaps require clarification around getting started, just to clarify the mental model.

I started using this on a fresh project, it just had a bit of boilerplate, and its a non-trivial project that i expect t...[truncated]

**Key Comments (3):**
- **lydonator**: I kinda like that the first run through is essential your MVP (Minimum Viable Product) run. From experience, very few runs will enter milestone territory, primarily because the majority of projects are small enough to complete on a single run, but also because people are getting better at ensuring their needs are met in the first run. I typically only use additional milestones for features I "didn...[truncated]
- **malkhuzayyim**: I agree, its nice for a quick start to not think about milestones. but projects/roadmaps evolution, interations, and logical chunking of work are a core aspect for anyone maintaining any serious project, whether its greenfield or brownfield.

Having a clear mental model for iterations, and what are core artifacts that should be maintained across milestones, and what are disposable/archiveable arti...[truncated]
- **lydonator**: Mmmm, I guess if you are working on something that is architecturally complex and might require many iterations or rollbacks etc, sure.... things could be tightened up. This stuff can get real finnicky real fast if you try to appease everyone's best practices and desires for how they wanna work.

---

### #129: gsd-notify.sh - errors since last update
**OPEN** | Author: kai-osthoff | 2026-01-17 | Labels: none
...ming captured in todo: Skip for closed beta DMG → Add before public release.

⏺ Ran 2 stop hooks
  ⎿  Stop hook error: Failed with non-blocking status code: /bin/sh:
  /Users/kai.osthoff/.claude/hooks/gsd-notify.sh: No such file or directory

✻ Sautéed for 40s


Best regards, Kai

---

### #128: startup failure on windows (terminal app) running powershell  Global config   version 1.6.4
**CLOSED** | Author: ssss2art | 2026-01-17 | Labels: none
SessionStart:startup hook error: Failed with non-blocking status code: node:internal/modules/cjs/loader:1404
       throw err;
       ^

     Error: Cannot find module 'E:\AI-files\AI-Fixture_Builder\$HOME\.claude\hooks\gsd-check-update.js'
         at Function._resolveFilename (node:internal/modules/cjs/loader:1401:15)
         at defaultResolveImpl (node:internal/modules/cjs/loader:1057:19)
         at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1062:22)
         at Function._load (node:internal/modules/cjs/loader:1211:37)
         at TracingChannel.traceSync (node:diagnostics_c...[truncated]

**Key Comments (1):**
- **glittercowboy**: Fixed by #207 - hook commands now use absolute paths instead of $HOME

---

### #127: feat: Integrated Multi-Provider Model Selector
**OPEN** | Author: cleong14 | 2026-01-17 | Labels: none
## Description
Implement a unified model selection system that allows users to switch between various LLM providers seamlessly. This feature will decouple the application logic from specific model vendors, enabling support for Claude Code Router, OpenRouter, and local deployments like Ollama.

## Proposed Solution
The implementation should include a centralized configuration manager and a standardized interface to handle requests across different API protocols (OpenAI-compatible vs. native Anthropic vs. local Ollama).

---

### #126: Formatting jank
**OPEN** | Author: gannonh | 2026-01-17 | Labels: none
Total nit, but reporting anyway. Next up formatting is janky:

<img width="574" height="206" alt="Image" src="https://github.com/user-attachments/assets/38554f81-c893-48b0-b7b2-78f36a650f85" />

Likely fixed if you remove the tics and `<sub>` tag

---

### #125: ES module compatibility error in startup hook
**OPEN** | Author: jlave-dev | 2026-01-17 | Labels: none
## Description

When installing GSD in a project with ES module configuration (`"type": "module"` in `package.json`), the startup hook fails with a `ReferenceError` because the hook file uses CommonJS `require()` syntax.

This occurs in projects that use ES modules (indicated by `"type": "module"` in `package.json`) when the GSD hook attempts to run during Claude Code startup.

## Steps to Reproduce

1. Create or navigate to a project with `"type": "module"` in `package.json`
2. Install GSD (which adds `.claude/hooks/gsd-check-update.js`)
3. Run `claude` or any command that triggers the Sessio...[truncated]

**Key Comments (2):**
- **bman654**: statusline.js has the same problem.  I renamed both to .cjs extension and changed settings.json to look for .cjs instead of .js and that resolved the issue
- **davesienkowski**: Smart workaround!

---

### #123: Lastest files from livestream not in Repo?
**CLOSED** | Author: eng-aguilera | 2026-01-17 | Labels: none
Watching the livestream at https://www.youtube.com/watch?v=5L3dm7KBCmY there is this new magical breakthrough file called goal-backward.md

so here I am following the video like a cooking show, get to the plan phase 1, and my GSD (which I updated while watching the video) only shows:

  ⎿  Read ../../../.claude/get-shit-done/references/ui-brand.md (161 lines)
  ⎿  Read .planning/STATE.md (60 lines)
  ⎿  Read .planning/ROADMAP.md (210 lines)
  ⎿  Read .planning/REQUIREMENTS.md (304 lines)

where in the video at https://youtu.be/5L3dm7KBCmY?t=2390 it shows many more files including goal-backward...[truncated]

**Key Comments (4):**
- **glittercowboy**: Update again?
- **eng-aguilera**: I did, I am in 1.6.4 , should I see goal-backward.md on the references folder? or am I being dumb? I am installing globally to claude, not to a project

<img width="402" height="286" alt="Image" src="https://github.com/user-attachments/assets/c11d4293-be13-4df7-9501-9ab562e3f2cc" />
- **rolandtolnay**: To be fair, the latest version when that livestream was filmed was 1.5.13, and now its 1.6.4.
The library has been changed quite a bit since then.

From Claude:

### History for `goal-backward.md`

| Date | Commit | Action |
|------|--------|--------|
| 2026-01-15 | `869f02e` | Added - `get-shit-done/references/goal-backward.md` (286 lines) |
| 2026-01-16 | `7ba0af8` | Deprecated - Content reduced...[truncated]
- **eng-aguilera**: ah ,ok makes sense, then this is not an issue

---

### #122: Add `/gsd:qa-run` autonomous QA agent that produces a QA report and can gate phase/milestone progression
**OPEN** | Author: osama1998H | 2026-01-17 | Labels: none
### Problem

* Current verification (`/gsd:verify-work`) is **manual by design** and depends on the user to execute the checks and report results.
* `/gsd:progress` can detect UAT issues and fix-plan status, but it does not enforce a “quality gate” before allowing next-phase planning or milestone completion. 

### Proposal (fits current architecture)

1. **New slash command:** `/gsd:qa-run [optional: phase or plan number like verify-work]`

   * Scope selection should mirror `/gsd:verify-work` (default to most recently completed plan via SUMMARY, or accept `4` / `04-02`). 
   * Reads: `.planni...[truncated]

**Key Comments (3):**
- **osama1998H**: @glittercowboy
- **lydonator**: This is the kinda addon that's suitable as a plugin. Hopefully Taches can assess my PR soon, then you can be one of the first to test building a plugin with this :)
- **AshExplained**: Similar to https://github.com/glittercowboy/get-shit-done/issues/117

---

### #121: Add “do not mention Claude” instruction to executor/orchestrator
**CLOSED** | Author: szymontex | 2026-01-17 | Labels: none
Hey, thanks for the project.

Could you add a simple instruction to the executor/orchestrator prompt like:
“Please do not mention Claude in commit messages.”

This way generated commits won’t include Claude mentions by default and stay clean.

Thanks.

**Key Comments (4):**
- **rolandtolnay**: You can configure that by changing your [attribution settings ](https://code.claude.com/docs/en/settings#attribution-settings) within `settings.json` for Claude Code.
- **Marcel-Bich**: @szymontex If you want more control over this, you can try my plugin [dogma](https://github.com/Marcel-Bich/marcel-bich-claude-marketplace) (it works best with all the other plugins from my repo but they aren't needed if you don't want them).

=> One of dogma's first features was precisely to prevent AI agents of all kinds from doing such things typically for AI or acting as co-authors and the lik...[truncated]
- **superresistant**: PR #286 now makes GSD respect the `attribution.commit` setting from `~/.claude/settings.json` during install.

- `attribution.commit: ""` → removes Co-Authored-By lines from installed files
- `attribution.commit: "custom"` → uses custom attribution
- Not set → keeps default

Also works for OpenCode via `disable_ai_attribution` in `opencode.json`.
- **szymontex**: @superresistant Amazing, thank you

---

### #120: GSD Using Substantially More Tokens (and time) After Update?
**CLOSED** | Author: professionalcrastinationco | 2026-01-17 | Labels: none
On version 1.5.27

### Problem

> It seems like token usage and length of time to finish tasks has increased roughly 4x.
> 
> Small tasks like changing colors, that used to take 2-3 minutes, now takes as many as 10. 
> 
> I definitely noticed all the new commands and flows GSD uses, but it seems like it throws every command and generates huge swarms of agents to fix what should be fixed with only a few. 
> 
> I had one bug fix generate a swarm of over 100 agents and eat up 10k tokens in about 60 seconds. And it still took longer to fix with 100 agents than it had in the past

### Suggestion: 
...[truncated]

**Key Comments (7):**
- **AshExplained**: Do you mean where it looks something like this?

<img width="565" height="834" alt="Image" src="https://github.com/user-attachments/assets/4b783ce9-0a88-4dc4-8c8a-cbeba15c0bea" />
- **professionalcrastinationco**: > Do you mean where it looks something like this?
> 
> <img alt="Image" width="565" height="834" src="https://private-user-images.githubusercontent.com/168268868/537137588-4b783ce9-0a88-4dc4-8c8a-cbeba15c0bea.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Njg2NjAwNjAsIm5iZiI6MTc2ODY1OTc2MCwicGF0aCI6Ii...[truncated]
- **professionalcrastinationco**: Here is an example, I asked GSD to just move a table, into a collapsible card. I already have tables in cards elsewhere in my app, and referenced that in my prompt.  It should have been a quick an easy fix.

Instead, it ate up over 200k tokens and ended up taking over 11 minutes just to plan the task. And it's been working on the task for another 10 minutes since then. 

<img width="741" height="7...[truncated]
- **glittercowboy**: Thanks for the detailed report and for sharing those screenshots - really helps illustrate the issue.

## What's happening

GSD is designed for **project-scale work** - multi-phase features, greenfield builds, complex refactors. The orchestration system (`/gsd:plan-phase` → `/gsd:execute-phase`) intentionally spawns multiple specialized agents:

1. **Researcher** - investigates implementation appr...[truncated]
- **professionalcrastinationco**: Thanks for the quick reply! 

What's interesting, is that i have been using GSD for all the big stuff as you mentioned (full projects, big features/functionality additions etc) but I have also been using it to fix the small bugs that occur during those large builds just so that it could track history better using small phases, and it did a wonderful job at both.

Prior to these most recent version...[truncated]
- **Peralysis**: I believe I'm seeing an increase in token use as well. Working on a two similar projects. The newer project I started today is burning through tokens (only have the Pro sub). Just the initial project init burned through 5 hours worth of tokens before finishing planning the first phase. This is an empty project. The older project I initially tested GSD out with was able to map the codebase, init a ...[truncated]
- **Peralysis**: Actually, disregard my last message. I double checked my setup and noticed that after updating Claude Code it was defaulting to Opus instead of Sonnet, which explains the higher token usage in my case.

---

### #119: Installation reports success but files are not actually copied (WSL2/Ubuntu)
**CLOSED** | Author: michabbb | 2026-01-17 | Labels: none
### Environment
- OS: Ubuntu 24.04.3 LTS running on WSL2
- Windows: Windows 11
- Kernel: Linux 6.6.87.2-microsoft-standard-WSL2
- Node: v23.11.1
- GSD Version: 1.6.3

### Description

When running `npx get-shit-done-cc`, the installer displays the banner, prompts for installation location (Global/Local), and then reports successful installation with all checkmarks:

```
✓ Installed commands/gsd
✓ Installed get-shit-done
✓ Installed agents
✓ Wrote VERSION (1.6.3)
✓ Installed hooks
✓ Configured update check hook
✓ Configured statusline

Done! Launch Claude Code and run /gsd:help.
```

However, *...[truncated]

---

### #117: Auto-trigger /gsd:verify-work when gsd-verifier returns human_needed status
**OPEN** | Author: AshExplained | 2026-01-17 | Labels: none
Currently, when `gsd-verifier` completes with `status: human_needed`, it outputs a message saying "Human Verification Required" with test items, but the user must manually invoke `/gsd:verify-work` to actually perform the tests.

### Current Behavior

```
/gsd:execute-phase N
│
└── gsd-verifier runs → status: human_needed
│
└── Outputs: "N items need human testing..."
└── User must manually run: /gsd:verify-work N
```


The verifier identifies items that need human verification and lists them in VERIFICATION.md, but does nothing to facilitate the actual testing.

### Proposed Behavior

When `g...[truncated]

---

### #116: After last update on windows i perform Ran 1 stop hook
**CLOSED** | Author: MethCDN | 2026-01-17 | Labels: none
I'm using widows, and this error wasn't show on previous GSD verions. i have the last at moment 1.6.3 - Claude code cli 2.1.11

```
Ran 1 stop hook                              
  ⎿  Stop hook error: Failed with              
  non-blocking status code: <3>WSL             
  (37350 - Relay) ERROR:                       
  CreateProcessCommon:725:                     
  execvpe(/bin/bash) failed: No such           
  file or directory
```

**Key Comments (7):**
- **AshExplained**: I manually deleted the stop hook from .claude folder settings.json to get this fixed
- **MethCDN**: thanks ash but i think it's better solving this issue on the main code of GSD
- **AshExplained**: > thanks ash but i think it's better solving this issue on the main code of GSD

Yes absolutely! I was just giving a temp fix lol
- **glittercowboy**: This is a known issue that was fixed in v1.6.0 (commit `967734d`).

**What happened:**
Previous versions included a bash-based notification hook (`gsd-notify.sh`) that doesn't work on Windows. When Claude Code tries to run it, it fails because `/bin/bash` doesn't exist on native Windows.

**The fix:**
- v1.6.0 removed the bash hook and converted all hooks to Node.js for cross-platform support
- v1...[truncated]
- **MethCDN**: hi glittercowboy. I already have the latest version, but the problem was not resolved by reinstalling it.


npx get-shit-done-cc --global
Need to install the following packages:
get-shit-done-cc@1.6.4
Ok to proceed? (y) y 


   ██████╗ ███████╗██████╗
  ██╔════╝ ██╔════╝██╔══██╗
  ██║  ███╗███████╗██║  ██║
  ██║   ██║╚════██║██║  ██║
  ╚██████╔╝███████║██████╔╝
   ╚═════╝ ╚══════╝╚═════╝

  Get Sh...[truncated]
- **MethCDN**: Okay, I’ve reinstalled version 1.6.4. I previously had 1.6.3, and now it works. I apologize for the previous message — I thought I already had the latest version.
- **glittercowboy**: Fixed by #207 - hook commands now use absolute paths instead of $HOME

---

### #115: REGRESSION: Research still skipped with "Research: Unlikely" after v1.5.20 fix
**CLOSED** | Author: thepiper18 | 2026-01-17 | Labels: none
## Problem Description

Despite version 1.5.20 (released 2026-01-16) fixing the issue where research was being skipped based on premature "Research: Unlikely" predictions, this behavior is still occurring in the latest version when running `/gsd:plan-phase`.

## Reproduction Steps

1. Run `/gsd:plan-phase 8` (or any phase number)
2. Observe the output

## Actual Output (Current Behavior)

```
GSD ► PLANNING PHASE 8

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Research: Skipped (roadmap says "Unlikely", comprehensive context exists)
```

The research phase is being skipped with t...[truncated]

---

### #114: OUCH! Windows hooks don't work after GSD update
**CLOSED** | Author: professionalcrastinationco | 2026-01-17 | Labels: none
I updated GSD today on my Windows 11 machine. Started getting the error:

```
● Ran 1 stop hook                 
  ⎿  Stop hook error: Failed with non-blocking status code: /bin/bash:                                 
  /home/<username>/.claude/hooks/gsd-notify.sh: No such file or directory 
```

Had Claude Code look into it, and write the rest of this issue notice because this is out of my wheelhouse...


### Environment                                                                                          
  
```
  - OS: Windows 11
  - GSD Version: Latest (v1.5.27)
  - Installation: npx get...[truncated]

**Key Comments (3):**
- **professionalcrastinationco**: Apparently these hooks only impact the new notification and status line upgrades? So not a massive issue.
- **davesienkowski**: I had the same issue. Seems like Claude Code version 2.1.9 caused some issues on Windows. 

I rolled back to CC version 2.1.7 and all seems to work. 

You can try this if you're on Windows. Paste the below into PowerShell:
`& ([scriptblock]::Create((irm https://claude.ai/install.ps1))) 2.1.7`
- **glittercowboy**: Fixed in v1.5.29.

**Changes:**
- Converted hooks from bash scripts to Node.js (cross-platform)
- Removed the notification popup hook entirely (was blocking, not a true toast on any platform)
- Statusline and update-check hooks now work on Windows

**To update:**
```bash
npx get-shit-done-cc --global
```

Note: If you have existing GSD notification hooks in your `~/.claude/settings.json`, you may ...[truncated]

---

### #113: Request for Triage permissions to help organize issues
**OPEN** | Author: davesienkowski | 2026-01-16 | Labels: none
I've been actively following and contributing to this project. I've had a couple of PRs merged and have really enjoyed the discussions around different implementation approaches. It's been great learning how the project handles things.

I find myself checking the issues regularly to stay up to date and find areas where I can help. I'd love to be able to add labels to issues. It would help me (and others) more easily filter and find relevant issues to work on or track. I'm happy to help keep things organized as new issues come in.

Would you consider adding me as a collaborator with Triage perm...[truncated]

**Key Comments (1):**
- **davesienkowski**: Hey, I received an invitation via email to collab on your repo. Although when I clicked the invite link it says it could not find the repo or the invite was revoked. 

Just wanted to confirm if you meant to send the invite or if you were just testing it out. 

Still looking to contribute. 

Thanks!

---

### #112: Phase folder naming inconsistency (zero-padding)
**CLOSED** | Author: seanrobertkennedy | 2026-01-16 | Labels: none
Note: I'm not an engineer, I'm super ignorant, and so I had Claude Code diagnose this, fix it for me, and write this summary. But I wanted to flag it so you were aware.

# Issue: Phase folder naming inconsistency (zero-padding)

## Summary

When running `/gsd:research-phase` or `/gsd:plan-phase` on a phase number like `8`, the commands create a new folder `8-phase-name/` instead of finding the existing `08-phase-name/` folder that was created during `/gsd:create-roadmap`.

This results in:
- Empty folder from roadmap creation (e.g., `08-phase-name/`)
- New folder with inconsistent naming (e.g....[truncated]

**Key Comments (1):**
- **glittercowboy**: Fixed in 567bdd2 — commands now normalize phase input (8 → 08) before directory lookups.

---

### #111: Agent type 'gsd-executor' not found.
**CLOSED** | Author: adaptpatrick | 2026-01-16 | Labels: none
Firstly I want to start by saying GSD seems pretty darn wicked. 👏 Major props. 

Something I'm experiencing during usage is the following error/warning though:

<img width="2580" height="220" alt="Image" src="https://github.com/user-attachments/assets/99670008-fbfe-407a-8f3c-f7f6201d08e8" />

It doesn't prevent execution, and I can't see any reference to 'gsd-executor' in the docs/github repo, but I thought I would flag it in case it's something that should be and can be addressed relatively quickly/easily?

LMK if there's anything I can do to help with this - be it more info or some hands-on ...[truncated]

**Key Comments (5):**
- **glittercowboy**: When is the last time you updated?

You likely just need a fresh install.

`npx get-shit-done-cc --latest`
- **adaptpatrick**: Appreciate the quick reply. I'll try this when I'm next using GSD & let you know. 

What does the executor offer over the general-purpose agent?
- **glittercowboy**: It allows for an entire phase (~5-8 plans) to be completed autonomously in a single context window. You'll often end up with only around 30-40% context used in main Claude thread.

Try it - you'll be blown away.
- **adaptpatrick**: Oooh, sounds interesting! Does it do this by clearing the context as it progresses? It's not compacting, right? 🫣😬
- **adaptpatrick**: Updating to the latest version fixed this issue so I'm happy for this to be closed. ✅

GSD is wicked so far. Excited to see where this project goes and support it as much as I can. 🔥

---

### #110: [Feature Request] model picker for task level
**OPEN** | Author: XRI111 | 2026-01-16 | Labels: none
Would be great to add logic for GSD to assign the best model for some of the work it assigns. Bug squashing with Opus is like swatting a fly with a bazooka. Small stuff can certainly be handled by Haiku.

**Key Comments (1):**
- **jameswyse**: Seems like a great way to take advantage of all the planning and research that's already completed

---

### #109: consider removing all phases on complete milestone
**OPEN** | Author: osama1998H | 2026-01-16 | Labels: none
When a new milestone is completed, consider removing all phase documents from the `phases/` directory to start with a clean slate. Since each phase is already referenced and preserved within the milestone folder as a dedicated `.md` file, retaining duplicate phase files is unnecessary and can create confusion.

In addition, update `stats.md` by removing phase-specific entries and keeping only a concise reference (link) to the relevant milestone `.md` file within the `milestones/` folder. This approach keeps the codebase organized, reduces duplication, and maintains a clear, traceable project h...[truncated]

---

### #108: [Feature Request] Multi-project support for monorepos with independent apps
**OPEN** | Author: dlc252 | 2026-01-16 | Labels: none
Related to #64 and #54, but addressing a different use case.

---

## Setup

Not "feature branches", these are completely separate apps sharing infrastructure:

```
monorepo/
├── apps/backend/        # REST API (v2.3) - Team A
├── apps/frontend/       # Web app (v1.8) - Team B
├── services/analytics/  # Python ML service (v3.1) - Team C
└── .planning/           # ← ONE planning context for ALL
```

Each app has independent:
- Release cycles (backend v2.3 ≠ frontend v1.8)
- Roadmaps (backend API refactor ≠ frontend redesign)
- Teams (Team A ≠ Team B ≠ Team C)

**Current friction:** All teams sh...[truncated]

**Key Comments (1):**
- **ap1969**: I'd add a second situation with the same issue: I use a standard template app for my app development:

 - an upstream repo handles standard SAAS stuff (registration, billing, tenancy, etc), and that gets merged into downstream repos regularly
 - the downstream handles app-specific functionality (the actual job-to-be-done for that specific app).

I want to store the GSD docs in git, so they're ther...[truncated]

---

### #106: revet back to the /verfiy-work style
**CLOSED** | Author: osama1998H | 2026-01-16 | Labels: none
Preview this workflow shows the test title and options to select 
- pass 
- failed 
- partially  
- and the default input for the user 


Now it shows it in this style

<img width="1436" height="562" alt="Image" src="https://github.com/user-attachments/assets/2f4f79bd-67d7-47cf-b15d-54dfebfddc06" />

The user doesn't know what to do or what to write as input 
The old style is better

**Key Comments (1):**
- **girgizrazvan-lgtm**: Agree

---

### #105: Document manual changes
**OPEN** | Author: kaladivo | 2026-01-16 | Labels: none
Sometimes after a GSD finishes phase or a plan it is easier to fix a bug manually than having to torture prompt the to fix it - especially if it's a small thing. I would still like the GSD to document the change and make sure to take that into a consideration when it works on the next thing. 

Example: 
In new nextJS the middleware.ts file was renamed to proxy.ts. Since it was recent change, the agents  are still creating middlware.ts. I changed the name manually and then ran another phase, but the agent just renamed the file to middleware.ts again. 

It would be cool to have a command that au...[truncated]

**Key Comments (3):**
- **kaladivo**: So for others. What I find works pretty well is this: 

After finishing phase I made some changes and then did: 
/clean
/gsd:progress
I made changes to current implementation document that a part of changes in phase 1 and commit them. Also consider other status files and document my changes.

But I think it would be great to have an option to discuss the current state of the development (mid stage...[truncated]
- **glittercowboy**: This is really interesting and definitely worth considering. Thanks for the suggestion.

You've hit on a real workflow gap — when you make manual fixes (especially for things like recent framework changes that Claude doesn't know about), GSD has no way to know about them. So the next agent just overwrites your work.

A `/gsd:document-change` or similar command that:
1. Captures what you changed an...[truncated]
- **kaladivo**: Yes! And also maybe something like /gsd:implement-change - when you want to prompt the code change, instead of writing it manually...

---

### #104: discuss phase command create dublicated phase directory
**OPEN** | Author: osama1998H | 2026-01-16 | Labels: none
When I use the discuss phase workflow, when it finish it creates a directory for the phase event. The directory is alrady exist

**Key Comments (1):**
- **Valdarix**: This may not be tied to just discuss phase. I am seeing something similar with research phase as well. 

For example, I am getting:
1-foundation and 01-foundation

I am having to duplicate the MD files into bot folders to ensure that it doesn't waste time because of file not found errors. 

This is from a fresh install of GSD  today,

Happening in Claude Claude running in Terminal on Windows and r...[truncated]

---

### #103: research agent didnt commit it files generated
**CLOSED** | Author: osama1998H | 2026-01-16 | Labels: none
when the reseach agent complete a reseach of phase the agent didnt committed the reseach.md file generated by this step

**Key Comments (1):**
- **glittercowboy**: Literally just fixed this 😜

Update with `npx get-shit-done-cc --latest`

Fixed :)

---

### #102: "THIS IS FRAUD"
**CLOSED** | Author: in3sting-star | 2026-01-16 | Labels: none
Just pasting the last part of investigating what happened with my 30euros worth of Claude credits, using Claude code + GSD inside Antigravity.

"THIS IS FRAUD

The commit d33b56d ONLY created the SUMMARY.md file - it made ZERO changes to actual code. It just added documentation claiming work was done.

The commit message lists 5 other commits (810f468, 7a64eb2, etc.) but these commits don't exist in your repository.

What happened:

The agent claimed to make 5 atomic commits changing the code
Those commits were never pushed or don't exist
The agent then created a summary document CLAIMING the ...[truncated]

**Key Comments (7):**
- **osama1998H**: Bro, it's an AI, and you're just prompting it, so it's not a deterministic path. Sometimes the agent gets things wrong, and your job is to help it get back on track.
- **in3sting-star**: That’s true, Osama.

Just a heads up for anyone else trusting it blindly.
At the rate the usage was burning i said to myself “damn this is cooking bigtime”.

So not really, please check the actual progress, don’t be like me. 
Thanks
- **lydonator**: You're using it "inside" Antigravity? Can you explain that a bit more?
- **in3sting-star**: Sure @lydonator, in Antigravity, on the left side panel, bottom icon you have Extensions, or just press Ctrl+shift+X, in the new window search for claude code, install, and then proceed to installing GSD as you normally would on claude code.
- **sashaegorov**: @in3sting-star all these toys consume tokens and credits **like crazy**.
If you are concerned about your budget, use alternative Chinese models.
I've tried `Claude Code` with `MiniMax M2.1`, cheap and works well.
Also, `GLM 4.7` could be configured to work with `Claude Code`, but I've not tried yet.
I've checked it for:
- 100% pure Python development with classes, design patterns, and refactoring....[truncated]
- **glittercowboy**: I'm sorry that happened — that fucking sucks.

That said, GSD is built exclusively for Claude Code and only tested/supported in that environment. I can't verify or support usage through Antigravity or other third-party integrations.

When running GSD directly in Claude Code, I haven't experienced the hallucination behavior you're describing — commits are real and code changes are implemented.

If ...[truncated]
- **evilbuck**: I know this is closed, but maybe someone will find it useful.

I ported GSD to opencode, it's a work in progress. I've seen the same things, depending on the model. Some models don't take the initiative to infer what the prompt told them. Or they forget to finish up for whatever reason. I have never experienced that using Sonnet or Opus. 
Typically when things go sideways in opencode with a cheap/...[truncated]

---

### #101: add /organize command to gsd
**OPEN** | Author: osama1998H | 2026-01-16 | Labels: none
**Problem:** After using this tool for some time, I observed that the project structure occasionally becomes inconsistent. For example, a completed to-do may be moved into a new milestone, then into the “Phases” section (e.g., marked as *Completed* or *Shipped*), yet it still remains listed in the *todos* file. In other cases, the *state* file may not reflect the latest updates, and the overall ordering within `project.md` may drift out of alignment.

**Suggested solution:** Introduce an `/organize` command with an optional parameter specifying the target area (e.g., a file, section, or specif...[truncated]

---

### #100: Too quick to say work is finished
**OPEN** | Author: blazejp83 | 2026-01-16 | Labels: none
I will show an example from what I just had

1) I am on a human checkpoint, before the milestone finish, I am supposed to verify everything and say 'approved'
2) I notice there is some issue and report it
3) Work starts in a subtask
4) After completing I want to report something else but he already determines that the work is finished, HOORAY MILESTONE COMPLETED

I believe that after this subtask finishes he should ask me is this everything and can we finish or not.

**Key Comments (2):**
- **MattiJarvinen**: Incremental development. 1st pass done then alter in the second one.

If you need more control there are tools that don't rush into making before you have approved the specs it has written and you need to manually give a go for everything.
- **blazejp83**: i don't think you understood my issue. the issue was that i never 'approved'. there could be multiple issues and i could be repeating them a couple of times. unless what is expected is to report every single one in one go - if so, then it is not clear from instructions. i'll expand my example: I am supposed to test X, I navigate to page, and encounter Y. to not lose it, i tell him 'hey, there's Y'...[truncated]

---

### #99: Missing: /gsd:report-bug
**OPEN** | Author: AshExplained | 2026-01-16 | Labels: none
<html>
<body>
<!--StartFragment--><h2 style="color: rgb(204, 204, 204); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(24, 24, 24); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Current Bug Reporting Options (Workarounds)</...[truncated]

**Key Comments (4):**
- **davesienkowski**: It's possible that the gsd:debugger agent may already handle some of what you indicate is missing. Maybe this agent could be extended to automatically handle those bug reporting options?

#https://github.com/glittercowboy/get-shit-done/blob/main/agents/gsd-debugger.md
- **osama1998H**: there is another use for this users can use /gsd:report-bug to report bugs ralated to GSD and automaticly open github issues in this repo with much context and strucutred template @glittercowboy
- **lydonator**: Wouldn't it be cool if you could run /gsd:report-bug _insert bug description_
Then the command kicks off a sub-agent that looks through recent run history, attempts to fix the bug in-situ, verifies it and if it is deemed resolved, submits a PR for bugfix here. If bug isn't fixed one shot, then open an Issue here for Taches/Others to deep dive it.

Could be a nice way to "donate" to the project ind...[truncated]
- **markvandeven**: > 3. Links to relevant code/phase
> 4. Creates `.planning/bugs/BUG-001.md`

Actually GSD can solve a big challenge in agile development: bugs or feature requests that are added later in the project usually are described as some sort of incremental change/delta. Rarely is the PRD or other documentation properly updated to the most recent changes. So this bug report can be referenced in the PRD as a...[truncated]

---

### #98: No "abort" or "rollback" path shown
**OPEN** | Author: AshExplained | 2026-01-16 | Labels: none
What if mid-milestone the user realizes the approach is wrong or just wants to rollback easily?
A lot of users will not know git reverts so maybe this way it will be easier for people to rollback to a safer version which they felt was working 

Missing paths:

/gsd:abandon-milestone — throw away current milestone, start over
/gsd:revert-phase N — git revert all commits from a phase

---

### #97: Gsd:postmilestone
**OPEN** | Author: wolverin0 | 2026-01-16 | Labels: none
Update codebase knowledge with newly added content from previous milestone completion.

**Key Comments (1):**
- **davesienkowski**: I just ran into this same scenario. That would be nice if it automatically updated the codebase knowledge as you work through milestones.

---

### #96: GSD Plugins
**CLOSED** | Author: lydonator | 2026-01-16 | Labels: none
I see a lot of requests for features and improvements to GSD.... and I'm a little concerned that what GSD does really well in it's base form, is gonna run into something that LLM's are just not very good at evaluating, and this is "Feature Creep".

My suggestion as the title implies, is building a plugin system for GSD that anyone can contribute to by way of PR inclusion. This lets users decide if they want the shiny new stuff, or if they'd be better off without it. It also opens up GSD to be improved in ways that would normally require a fork, updates that swing quite a bit away from base fun...[truncated]

**Key Comments (6):**
- **davesienkowski**: I do like that idea. Keeps the base GSD philosophy but you can extend it to suit your need.
- **AshExplained**: This is a great idea
- **lydonator**: OK, I've begun working on this. So far looks quite promising. It's an extensive refit and will take a little time to polish before I submit a PR. When the base Plugin Manager is complete, I'm gonna add an extra milestone to build a Plugin Builder command that will "hopefully" make rolling useful plugins..... more approachable for everyone :). This will likely be in the form of a GSD command like /...[truncated]
- **davesienkowski**: I'm not all that versed in what git features provide but would something like -tags in the commits or maybe even having a separate branch created for each plugin. Then the plugin-list would find all based on the tags and could merge the plugin branch into your existing GSD set up?
- **lydonator**: > I'm not all that versed in what git features provide but would something like -tags in the commits or maybe even having a separate branch created for each plugin. Then the plugin-list would find all based on the tags and could merge the plugin branch into your existing GSD set up?

/gsd:plugin-install will have a couple of target types, local dir & git link (initially). This means that any plugi...[truncated]
- **lydonator**: https://github.com/glittercowboy/get-shit-done/pull/118

---

### #95: $$$ There isn't a way to donate money to the project
**OPEN** | Author: evilbuck | 2026-01-16 | Labels: none
Give us a way to make donations for the project. One-time or recurring. Some easy choices or name your own price. I support a few projects that give me value myself. I think github has some sort of donations system built-in. Yes Github sponsors. Makes it dead easy to give projects money.

**Key Comments (3):**
- **glittercowboy**: GitHub Sponsors is now set up and the FUNDING.yml has been added to the repo (83ecf38).

Once the sponsor account is approved (pending), the "Sponsor" button will appear on the repo page.

Thanks for the nudge!
- **kaladivo**: Setup a bitcoin address (preferably lighthing) too :). Might make it easier to donate for some people :).
- **evilbuck**: FYI, I cilcked the sponsor button, however it just takes me to your gh profile.

---

### #94: ./claude/agents not copied
**CLOSED** | Author: jspicher | 2026-01-16 | Labels: none
Hello, was in your YouTube for GSD and decided to give it a go. 
After running `npx get-shit-done-cc` - l noticed it didn't copy over the the custom sub-agents from the repo. 

Important note - l was installing it in my project -- not globally. 

OS: Win 10
Terminal: Windows Terminal running Powershell

**Key Comments (2):**
- **glittercowboy**: Re-install! 

It was a package.json issue thats resolved now.
- **jspicher**: Confirmed, added to a new project this morning and it's working perfectly. 
👍

---

### #93: No "/gsd:research-project" ?
**OPEN** | Author: Orbita-Media | 2026-01-16 | Labels: none
There is no skill "/gsd:research-project", which should create the RESEARCH.MD

**Key Comments (2):**
- **glittercowboy**: There most certainly is. Re-install?
- **pauljasperdev**: Was removed in 1.6.0 https://github.com/glittercowboy/get-shit-done/blob/main/CHANGELOG.md#160---2026-01-17

Would be nice to be able to manually retrigger this.

EDIT: `npx get-shit-done-cc@1.5.30` to get command back

---

### #91: [Discussion] Can you describe the proper git/github workflow you should use with GSD?
**OPEN** | Author: meenie | 2026-01-15 | Labels: none
I've gone through a full milestone implementing a new feature. At first, it started committing everything on `main`. I quickly checked out a new branch so it could continue to commit there instead. Now that it's done, it's wanting to archive the project and create a tag. I have yet to push this up to github so I can do a review and squash/merge the PR. It should only be creating a tag once everything is merged into `main`.

What's the ideal way we should be using git/github with GSD?

**Key Comments (3):**
- **malkhuzayyim**: trying this out on a fresh project, and enjoying it so far, first day. I am asking myself the same questions though, wondering how do the workflows fit into a large established project where you have feature branching -> squashing as a standard practice.

I found myself also wondering how the gsd commands for roadmap/map-codebase should be used in such a project (multi-year long project, with larg...[truncated]
- **Marcel-Bich**: @meenie @malkhuzayyim I posted a new comment on a similar topic in another discussion, you might find it interesting too => #77
- **RobBiddle**: Ideally GSD should use Git Feature Branch Workflow by default. 
I have that instruction in my CLAUDE.md but it seems to get ignored more often than not.

---

### #88: Feature: Add context: fork to heavy commands
**CLOSED** | Author: s3-oz | 2026-01-15 | Labels: none
`context: fork` runs a command in an isolated context. Only the final result returns to the user's main conversation. Keeps context clean during heavy operations.

  This is ideal for commands that don't need user interaction mid-execution. Commands that pause for user input (checkpoints, questions, verification) should NOT use fork.

  Optionally, you can also specify `agent:` to use a specialist agent type (`Explore`, `Plan`, or `general-purpose`). If omitted, defaults to `general-purpose`.

It does work with the sub agents but no point as its claude indie claude inside claude. I think anthr...[truncated]

**Key Comments (2):**
- **davesienkowski**: https://github.com/glittercowboy/get-shit-done/issues/31
- **glittercowboy**: This is in the latest update. Reinstall with:

```
npx get-shit-done-cc
```

---

### #87: missing the context window progress bar
**OPEN** | Author: osama1998H | 2026-01-15 | Labels: none
I'm using the latest version you deployed. I don't see the directory currently working in and the context window limit progress bar, like what i see in your live stream, this image for your live 

<img width="485" height="89" alt="Image" src="https://github.com/user-attachments/assets/5b7037ab-31ab-42ee-a42e-996ea7531764" />

**Key Comments (2):**
- **davesienkowski**: That area is what's called the Status Line. I don't believe GSD has one built-in, but you can configure your own.

[Claude Code Status Line](https://code.claude.com/docs/en/statusline#context-window-usage)

[CCSTATUSLINE](https://github.com/sirmalloc/ccstatusline)
- **davesienkowski**: > I'm using the latest version you deployed. I don't see the directory currently working in and the context window limit progress bar, like what i see in your live stream, this image for your live

This should be fixed in one of the newer updates. Check out the link below for how to update:
https://github.com/glittercowboy/get-shit-done?tab=readme-ov-file#staying-updated

---

### #86: agents/ directory missing from npm package - subagents not installed
**CLOSED** | Author: s3-oz | 2026-01-15 | Labels: none
## Bug Description

  The `agents/` directory is not included in the npm package, so subagents (`gsd-executor`, `gsd-verifier`, `gsd-integration-checker`) are never installed when users run `npx get-shit-done-cc`.

  ## Impact

  Core commands that depend on these subagents may not work correctly:
  - `/gsd:execute-plan` → uses `gsd-executor`, `gsd-verifier`
  - `/gsd:execute-phase` → uses `gsd-executor`, `gsd-verifier`
  - `/gsd:audit-milestone` → uses `gsd-integration-checker`

  ## Root Cause

  `package.json` `files` array doesn't include `agents`:

  ```json
  "files": [
    "bin",
    "c...[truncated]

---

### #85: Feature: project "upgrade"
**CLOSED** | Author: gannonh | 2026-01-15 | Labels: none
First, love gsd. Absolute game changer. I started a new project today and during set-up was introduced to various enhancements, like the new REQUIREMENTS.md > ROADMAP.md workflow. It's awesome how fast you guys are shipping cool new features. It would be nice to have a way to update existing artifacts. Not sure if needed, but it occurred to me when setting up a new project.  If interested, happy to dig in deeper and open a pr.

**Key Comments (1):**
- **gannonh**: Closing. Non-issue. Projects are evolving with updates just fine.

---

### #83: Feature: Algorithm Documentation for math-heavy projects (robotics, ML, scientific computing)
**OPEN** | Author: ajaygunalan | 2026-01-15 | Labels: none
## Problem


In algorithm-heavy projects (robotics, ML, scientific computing, graphics), math and code drift apart during development. You write a Kalman filter based on a research. It works. Weeks later, you tweak the code during debugging. Now the algorithm pseudo-code no longer matches. Six months later, nobody remembers which is correct.

This happens because:
- Math lives in papers, notebooks, or your head
- Code lives in files
- Nothing connects them

## Solution

Add `.planning/algorithms/<name>.md` — a living document that keeps algorithm specifications (math, architectures, pipelines)...[truncated]

---

### #82: Issue: When are phase placeholders in STATE.md and ROADMAP.md finalized?
**CLOSED** | Author: osuvaldo90 | 2026-01-15 | Labels: none
I have used the `gsd:add-phase` command to extend the scope of a milestone. However, I noticed that this command creates placeholders for the new phase in `ROADMAP.md` and `STATE.md` without committing those files but neither `gsd:plan-phase` nor `gsd:discuss-phase` update those placeholders or commits those files.

Is one of these commands/steps expected to finalize the changes in `ROADMAP.md` and `STATE.md` or have I missed something?

## Observed Flow

`add-phase` creates:
- Phase directory: `.planning/phases/{NN}-{slug}/`
- ROADMAP.md entry with placeholders: `**Goal:** [To be planned]`, `...[truncated]

**Key Comments (2):**
- **glittercowboy**: Fixed in 2569be6.

The gap you identified was real - no command was finalizing the placeholders.

**The fix:** `/gsd:plan-phase` now updates ROADMAP.md before committing:
- Replaces `[To be planned]` Goal with derived goal from CONTEXT.md or RESEARCH.md
- Updates `**Plans:** 0 plans` to actual count
- Adds checkbox list of plan files

This will be in the next release.
- **osuvaldo90**: Thanks for the clarification and prompt fix. I appreciate the work you've put into this tool.

---

### #81: The gsd-executor subagent type isn't available in this environment. Let me spawn general-purpose agents instead to execute each plan.
**CLOSED** | Author: jsauvain | 2026-01-15 | Labels: none
what is missing?

**Key Comments (13):**
- **glittercowboy**: Can you give some more detail? Hard to diagnose without knowing more
- **glittercowboy**: Also please run:

/gsd:whats-new

What version are you one?
- **jsauvain**: Was a completely fresh installation (today) using npx get-shit-done-cc.
Happened on the first phase execution.

Will update once limits reset (consumed Max x5 in 1h) 

`
⏺ gsd-executor(Execute 02-01 Collections UI)
  ⎿  Initializing…
  ⎿  Error: Agent type 'gsd-executor' not found. Available agents: Bash, general-purpose, statusline-setup, Explore, Plan, claude-code-guide,
     solid-dev-partner

...[truncated]
- **glittercowboy**: Did you install GSD --global or --local?
- **jsauvain**: local
- **glittercowboy**: Go into the folder:

run in terminal `npx get-shit-done-cc --latest`

Then check in the local folder .claude, does the folder /agents exist and if so does gsd-excutor.md exist within it?
- **RinTheWeeb**: the agents folder is missing for me as well. Also running local.
- **RinTheWeeb**: I added the agents into C:\Users\X\.claude folder and GSD can find them now.
- **jxonas**: Same problem here. Installer does not copy agents to `~/.claude/agents`

```
npx get-shit-done-cc@latest --global
Need to install the following packages:
get-shit-done-cc@1.5.13
Ok to proceed? (y) y


   ██████╗ ███████╗██████╗
  ██╔════╝ ██╔════╝██╔══██╗
  ██║  ███╗███████╗██║  ██║
  ██║   ██║╚════██║██║  ██║
  ╚██████╔╝███████║██████╔╝
   ╚═════╝ ╚══════╝╚═════╝

  Get Shit Done v1.5.13
  A meta...[truncated]
- **jxonas**: With a little help from Github Copilot :)

---

The installer is not copying agents to `~/.claude/agents/` when installing via `npx get-shit-done-cc` because the `agents/` directory is missing from the published npm package. 

## Problem

The `package.json` `files` field only includes: 
```json
"files": [
  "bin",
  "commands",
  "get-shit-done"
]
```

The `agents/` directory is not listed, so it'...[truncated]
- **drewrawitz**: Thanks so much for this, @jxonas! I was running into the same thing, and your workaround works great! 🙏
- **jsauvain**: @glittercowboy fixed for me with the latest version :)
- **glittercowboy**: package.json did not install /agent folder but it's fixed now so closing this issue.

Thanks guys!

---

### #80: feat: Add --think mode option to existing GSD commands
**OPEN** | Author: ajaygunalan | 2026-01-15 | Labels: none
**Description:**

Add optional `--think` parameter to existing GSD commands that applies a mental framework during execution.

**Syntax:**
```
/gsd:<command> [args] --think=<framework>
```

**Examples:**
```
/gsd:new-project --think=first-principles
/gsd:define-requirements --think=pareto
/gsd:plan-phase 1 --think=second-order
/gsd:debug --think=5-whys
/gsd:verify-work --think=inversion
```

**Available frameworks:**
- `pareto` — 80/20 focus
- `first-principles` — Break down and rebuild
- `inversion` — What guarantees failure?
- `second-order` — Consequences of consequences
- `5-whys` — Root c...[truncated]

**Key Comments (6):**
- **mcampbell**: Curious to hear how you envision these values mapping to LLM prompts.
- **ajaygunalan**: Well, I think that, for example, when you’re debugging or planning things, there can be advantages to thinking in certain modes, right? Using approaches like the 80/20 rule, second-order thinking, or thinking in terms of five ways can each be useful in specific scenarios—especially for debugging and planning.
- **mcampbell**: Sure, -I- can have mental models, but LLM's don't - what's the proposal here to map these different ways of "thinking" to a statistical next-word guesser?
- **lydonator**: > Sure, -I- can have mental models, but LLM's don't - what's the proposal here to map these different ways of "thinking" to a statistical next-word guesser?

Injecting these "thinking principles" into the context primes the model to give an answer it otherwise would have. This isn't a new idea in prompt engineering and can be an good way to reduce token usage if you know how to use it effectively.
- **mcampbell**: > Injecting these "thinking principles" into the context

Yeah, that's my question.  How do you do that?
- **ajaygunalan**: You can have two Markdown files, and then add a the second as an command line option. When that option is selected, you dynamically combine the two files—both are referenced and read together.

---

### #79: Support jujtsu instead of git
**OPEN** | Author: faldor20 | 2026-01-15 | Labels: none
Hey!
I'm loving the GSD workflow, but it often tries to do git commands. That's great, except I use jujutsu in all my repos, so they tend to either fail, or not work very well. 
I'm curious if you'd be interested in supporting jujutsu as an alternative?
I don't know the ins and outs of how claudecode works internally so I'm not sure if there is a git tool or something? if not I imagine it's just a matter of have alternative versions of all the git parts of the prompts.

I'd be happy to submit alternatives to the existing git prompts if there is interest.

Thanks for the great tool!

**Key Comments (2):**
- **ajaygunalan**: Just out of curiosity, what's advantage of jujtsu over git? I tried it but didn't notice any different. Just wondering what makes  jujtsu powerful in your opinion and whats your workflow optmized using jujtsu over git?
- **faldor20**: Firstly, quick preamble:
I dont directly contribute to jj or anything, but I did make [jj_tui](https://github.com/faldor20/jj_tui) 

My highlights: 
Easy commits: jj lets me make commits without needing to worry too much about thier exact contents. Say I want to try something new, I make a new commit, make my changes, if I decide I to go a different direction, I make a new commit off the parrent a...[truncated]

---

### #78: Feature request: Antigravity Agent skills
**OPEN** | Author: smelllvar | 2026-01-15 | Labels: none
Can this be used in Antigravity as agent skills?

**Key Comments (4):**
- **ajaygunalan**: Gemini 3 isn’t a good model for agentic coding. After some time, it gets sloppy. My suggestion is to use Claude. To answer your question: these are fundamentally prompts written as Markdown files, so you can use them—not exactly like Get Shit Done, but definitely as custom prompts by copying them. It’s not a big deal. Clone this repo and ask it to install everything for you, and make sure to provi...[truncated]
- **smelllvar**: Ok, i'll try it like that. 
claude opus 4.5 and Sonnet 4.5 are in antigravity that i prefer to use.. gemini for some not so important tasks.. There is a new update that brought skills to antigravity agents. This project seems to be ideal use for them.. 
Need to make those md files as unique skills.
- **gannonh**: If you want to use gsd in Antigravity (which I do, waiting for a usage reset), you can run a bash script to create symlinks from the Antigravity global_workflows dir to your claude commands. Here is a snippet of my script:

```bash
# --- Sync commands from all subfolders in .claude/commands ---
GEMINI_WORKFLOWS="~/.gemini/antigravity/global_workflows"
CLAUDE_COMMANDS="~/.claude/commands"

if [ -d ...[truncated]
- **fabian-von-tiedemann**: if you are using opencode there is a port: https://github.com/rokicool/gsd-opencode

---

### #77: [Discussion] How does this work into "legacy" codebases?
**OPEN** | Author: mcampbell | 2026-01-15 | Labels: none
Even as a solo dev, there are projects that are "done" but you want to add a new feature.  I don't need/want GSD artifacts (well, not all of them) at the root level of the project since I want to run the complete gsd workflow but only for one feature.  Then do it again for the next feature.  How is this handled?  

One advantage of spec-kit is that it puts all of this sort of thing in a `specs/[feature-name]` subdir so they are all by themselves and you can just rerun the process for each feature as its own thing.

Curious how people are handling this.

**Key Comments (7):**
- **Marcel-Bich**: I'm relatively new to GSD specifically and my workflow goes kind of like this in already existing projects:

> after each step is finished => `/clear`

1. `/gsd:map-codebase`
2. `/gsd:new-project`
3. `/gsd:create-roadmap` (define phases for your feature/milestone)
4. `/gsd:plan-phase` (creates PLAN.md for current phase)
5. `/gsd:execute-plan` or `/gsd:progress` (executes the plan)
6. Repeat 4-6 fo...[truncated]
- **mcampbell**: @Marcel-Bich So you're overwriting the generated docs with each feature/iteration?  (That's fine, just wanted to confirm.)
- **shawnspeak**: @mcampbell If the feature/iteration is "big enough" then I am overwriting the generated docs and running the entire process again. 
Otherwise, I just let CC plan mode handle it and use the ./planning/codebase docs as supplemental context.
- **Marcel-Bich**: @mcampbell Not necessarily. I usually remove them if they bother me (e.g., I move them to an archive directory or something like that). I want to keep my repo as clean as possible and only “keep” things that I need at the moment, but otherwise I don't want to delete anything because I sometimes have to fall back on the original plan if something goes wrong.

(My entire workflow is somewhat more co...[truncated]
- **Marcel-Bich**: @mcampbell I've found myself more often using `/gsd:new-milestone` and `/gsd:add-phase` instead of playing games with the roadmap.
As far as I understand, the roadmap is there to keep track of a full big thing from start to end, while milestones are there to add new big things. Phases are getting added to the end of a milestone.

Think of it like this in short: 
- roadmap => the whole project
- mi...[truncated]
- **mcampbell**: > I've found myself more often using /gsd:new-milestone and /gsd:add-phase...

This may be the golden nugget I'm looking for; thanks @Marcel-Bich !
- **Marcel-Bich**: @mcampbell
I've worked the last days and nights a lot on a system that provides help with exactly what you (and me and others too) had asked themselves many times. I've provided the "credo" [plugin](https://github.com/Marcel-Bich/marcel-bich-claude-marketplace/wiki/Claude-Code-Credo-Plugin) exactly for that purpose to provide live help inside of a project with all kind of opiniated things like GSD...[truncated]

---

### #76: Feature request : allow this to work on Github Copilot CLI
**OPEN** | Author: NansD | 2026-01-15 | Labels: none
I went across this repository which is amazing, congrats for the good work !
As a Copilot CLI user I thought we could think of adding the option to setup these tools and meta-prompting solutions for Github Copilot. Do you think this would be interesting ?

I did a bit of chatting with an AI to discuss the feasibility of this : 

<details>
<summary>Copilot's response on the feasibility to achieve this feature</summary>


<h2>Feasibility:  <strong>Moderate Effort</strong> ✅</h2>
<h3>What Makes It Feasible:</h3>
<ol>
<li>
<p><strong>Simple Core Structure</strong>: The repo is primarily a collecti...[truncated]

**Key Comments (4):**
- **mcampbell**: I _think_ copilot CLI handles subagents now.  If I recall correctly, spec-kit uses them.
- **HaydenReeve**: There are some native sub-agents, but I think they're still working towards custom ones. Unsure of the exact status of this
- **devdnn**: Watching this, couple of other forks.

I will fork and see if I can contribute to this.
- **s-KaiNet**: GSD supports opencode from [1.9.6](https://github.com/glittercowboy/get-shit-done/releases/tag/v1.9.6). opencode, in turn  [supports GH Copilot natively](https://github.blog/changelog/2026-01-16-github-copilot-now-supports-opencode/)  starting from Jan 16.
I know it's not what is requested in this issue, but at least there is a way for GH Copilot users to use GSD through the opencode, which is gre...[truncated]

---

### #75: Feature request - /gsd:execute-all-milestone
**OPEN** | Author: ggindinson | 2026-01-15 | Labels: none
It would be great to have a feature for executing all phases one by one automatically in a milestone

---

### #74: How to provide more details to existing phase/plan ?
**OPEN** | Author: danielo515 | 2026-01-15 | Labels: none
Hello, and first of all thanks for this and for sharing it with the community.

I'm just starting using it, and I saw some "decissions" claude has taken that need further improvement. I'm in the first foundation phase and I see that it has picked Typescript 5.7, npm as package manager, etc, and I want it to rewrite the plan and all the related documents to use latest typescript and pnpm package manager. I also want to tell it what validation library to use and how.
How can I "amend" this details to the current phase? I don't want to insert a new phase in between 1 and 2, because this should ha...[truncated]

**Key Comments (2):**
- **davesienkowski**: You can try to use the command below to discuss the phase you're looking to amend.

/gsd:discuss-phase [N]
- **danielo515**: I think that is what I ended up doing.
Thanks.
What if I want to rethink core parts of the project?

Thanks again

On Thu, Jan 15, 2026 at 4:55 PM Rezolv ***@***.***> wrote:

> *davesienkowski* left a comment (glittercowboy/get-shit-done#74)
> <https://github.com/glittercowboy/get-shit-done/issues/74#issuecomment-3755542329>
>
> You can try to use the command below to discuss the phase ...[truncated]

---

### #71: Feature Request: `/gsd:check-project` - CLAUDE.md Conflict Detection
**OPEN** | Author: willmarkman | 2026-01-15 | Labels: none
>  Feature Request: `/gsd:check-project` - CLAUDE.md Conflict Detection
> 
> ## Problem
> 
> When using GSD in a project that already has a custom `CLAUDE.md`, there's no way to know if the project's rules conflict with or duplicate GSD's methodology.
> 
> This leads to:
> 1. **Conflicts** - Project rules that contradict GSD (e.g., "never use subagents")
> 2. **Redundancy** - Duplicated rules that waste context tokens and can drift out of sync
> 3. **Confusion** - Users unsure what to keep vs. remove from their CLAUDE.md
> 
> Currently users must manually compare their CLAUDE.md against GSD's ...[truncated]

**Key Comments (2):**
- **jdevalk**: Since I've definitely ran into this myself, I'd highly recommend this.
- **stavarc**: This is a good idea and i'd go one step further:

Make this a /gsd:new-claude-md

1. Make a backup of your existing CLAUDE.md > CLAUDE.md.bak
2. Generate a CLAUDE.md file from scratch based on the curent project's ./planning/codebase containing  industry's best practices related to the current project
3. Merge the CLAUDE.md with CLAUDE.md.bak while prioritising the 1st over the 2nd

---

### #69: Current version dropped the commands what to do next - why?
**CLOSED** | Author: blazejp83 | 2026-01-14 | Labels: none
After updating to newest version the behavior of giving clear commands what to do next with the path to the planning file changed. Now instead of just copy & paste I had to scramble to figure out what the next step should be, it turned out that when I ran /gsd:progress it was there, however the previous behavior of next command (without clear) was better.

**Key Comments (8):**
- **davesienkowski**: Seems like there may be a regression somewhere. I'm looking into it.
- **glittercowboy**: Thanks for the report. I'm investigating but haven't reproduced it yet — next steps are still appearing for me after plan/phase execution.

Can you share:
1. Which command did you run? (`/gsd:execute-plan`, `/gsd:execute-phase`, or something else?)
2. What did you see after completion? (paste the output if you have it)
3. What version are you on? (`npm list -g get-shit-done-cc`)

This will help me...[truncated]
- **glittercowboy**: Actually, disregard the version check — just run:

```bash
npx get-shit-done-cc@latest
```

This will install the latest version. Let me know if the issue persists after that.
- **blazejp83**: it was before the milestone finish
- **glittercowboy**: Fixed in e8199d9.

**Root cause:** The orchestrator pattern conversion (8ed6a8f) removed the workflow context loading for context efficiency, but inadvertently removed the `offer_next` step that presents the copy/paste-ready next commands.

The old version loaded the full 1800-line `execute-plan.md` workflow (which has `offer_next`). The new orchestrator only loads a thin template and spawns a sub...[truncated]
- **glittercowboy**: Please reinstall the latest version with _npx get-shit-done-cc@latest_

That should fix it
- **davesienkowski**: You're quick! That's exactly what I discovered.
- **blazejp83**: Wow, amazing! Thanks!

---

### #68: [Feature request] Config option for generating a patch file after phase was completed
**OPEN** | Author: rolandtolnay | 2026-01-14 | Labels: none
I realize this might only be relevant to some segment of the user base, but as a developer I still prefer reviewing the code generated periodically. It helps me maintain a mental model of the project, and spot any code styling / maintenance red flags which I can correct from CLAUDE.MD or skills.

For now, I created a custom hook `review-phase` which I pass in the phase number, and it generates a patch file for me based on the commit messages containing that phase. It saves it as `01-PATCH.patch` inside the phase folder. 

I have to call this one manually every time before proceeding to the nex...[truncated]

**Key Comments (2):**
- **glittercowboy**: Interesting workflow - reviewing AI-generated code in batch to catch patterns for CLAUDE.md feedback makes sense.

Could you share your `review-phase` hook implementation? Would help us evaluate whether this belongs in core or is better documented as a hook example for others with similar workflows.
- **rolandtolnay**: I realise now that I wrote "hook", but I meant to say a slash command.

Here it is: 
(I created it using your `/create-slash-command` prompt from the other repo) 

````markdown
# review-feature

Generate a patch file for a completed feature or entire phase and open it for review.

## Usage

```
/review-feature 2        # Review entire phase 02 (all features)
/review-feature 02       # Same as abov...[truncated]

---

### #66: Changing planning directory
**CLOSED** | Author: yestheboxer | 2026-01-14 | Labels: none
I want to be able to have gsd not use my repo to store planning files. but instead a possible global place (home directory) so I dont need to change my gitignore. Possibly segmented by HEAD commit so it knows it doesnt need to rerun any code mapping if the branch we're on has already been indexed?

**Key Comments (1):**
- **glittercowboy**: Thanks for the suggestion! After thinking through this, we're going to keep the current behavior.

**Why .planning/ isn't gitignored by default:**

GSD's planning files (STATE.md, PLAN-*.md, CODEBASE.md) are designed to persist across sessions - they're the project's memory, not disposable scratch files. Making them gitignored by default would treat them as temporary when they're actually core to ...[truncated]

---

### #65: [Feature request] /release-notes command similar to Claude Code
**CLOSED** | Author: rolandtolnay | 2026-01-14 | Labels: none
I absolutely love this package, and I've started rolling it out across all my projects.

Its super exciting to see you actively maintain it, however this brings a new challenge with it:

As people start developing workflows specific to their project, they start to expect the framework to behave a certain way.
But naturally as it evolves, features are added and removed (like the ISSUES.md system removed recently, and replaced in favor of TODOs).

So I think to keep the package scalable longterm, it would be super helpful to have a command which shows the latest changes, similar to how Claude Co...[truncated]

**Key Comments (1):**
- **glittercowboy**: Done! 

Reinstall with _npx get-shit-done-cc@latest_

Then run /gsd:whats-new 

👊🏻

---

### #64: discussion: Git worktrees as escape hatch for parallel contexts — does this fit GSD?
**OPEN** | Author: davesienkowski | 2026-01-14 | Labels: none
## Context

Issue #54 raised a real pain point: when users need parallel work contexts (urgent hotfix during feature development), GSD's repo-scoped `.planning/` creates friction. 

The maintainer correctly noted:
> "GSD represents current project context, not a multi-track workspace."

I've been thinking about whether git worktrees could address this *without* violating that principle, and wanted to get your perspective before investing in implementation.

## The Idea

Git worktrees create independent working directories sharing a single `.git` repository. Each worktree naturally gets its own...[truncated]

**Key Comments (2):**
- **Marcel-Bich**: @davesienkowski Maybe my "hydra" [plugin](https://github.com/Marcel-Bich/marcel-bich-claude-marketplace) is just what you need => I use it myself to work with gsd in parallel without interfering with anything in the current project directory.
- **nickazg**: Yeah agree, I've been wondering this. Parallel contexts works to some extent without worktrees (ie each context seems to only commit its own files), but that far from perfect and will of course cause issues that a worktree/PR would fix.

---

### #62: feat: Add --full flag to /gsd:progress for complete milestone tree view
**CLOSED** | Author: davesienkowski | 2026-01-14 | Labels: none
## Problem

After working through multiple phases, it's difficult to recall what was previously planned and decided. `/gsd:progress` shows recent work and current position, but doesn't answer:

- "What did I decide about auth back in phase 3?"
- "Which phase handled rate limiting?"
- "How many tasks remain across all phases?"

## Why Not STATE.md?

Considered enhancing STATE.md instead, but it's the wrong fit:

| Factor | STATE.md | /gsd:progress --full |
|--------|----------|---------------------|
| Size constraint | Violates 100-line limit | No constraint (output only) |
| Purpose | Working ...[truncated]

**Key Comments (1):**
- **davesienkowski**: Closing per: https://github.com/glittercowboy/get-shit-done/pull/63#issuecomment-3751073147

---

### #61: Which one is the correct approach for different feature implementations?
**CLOSED** | Author: ibrahimsn98 | 2026-01-14 | Labels: none
Hello 👋 
Let's say I have implemented a filtering feature to the lists in my application, then I completed the milestone. After that, I want to implement completely different feature on the same project; for example purchase page. 
Which one is the right approach for context management? Creating a new milestone, or creating a new project?
Thank you!

**Key Comments (2):**
- **glittercowboy**: When you're done, run `/gsd:complete-milestone` - this will tidy up ROADMAP.md and STATE.md and create a /milestones folder entry.

Then run `/gsd:discuss-milestone {your idea you want to discuss}`

Chat with Claude until you're happy to commit to the idea

Then run `/gsd:new-milestone` to create a formal roadmap for the milestone.

Then run `/gsd:plan-phase` as per usual. Boom
- **ibrahimsn98**: Thank you!

---

### #59: Marketplace Installer Plugin for Claude Code
**CLOSED** | Author: Marcel-Bich | 2026-01-14 | Labels: none
Hey Lex!

I created an installer plugin that makes GSD available via the Claude Code plugin marketplace. Wanted to let you know in case you'd like to mention it somewhere.

**What it does:**
- Adds GSD to the Claude Code marketplace for discovery
- `/gsd:setup` clones your repo and installs commands to `~/.claude/`
- After restart, users have the full GSD command set
- `/gsd:uninstall` to cleanly remove
- Full credit and links back to your repo

**Repo:** [marcel-bich-claude-marketplace/plugins/get-shit-done](https://github.com/Marcel-Bich/marcel-bich-claude-marketplace/tree/main/plugins/get-s...[truncated]

**Key Comments (3):**
- **glittercowboy**: Thanks for building this and for the heads-up!

I'm going to pass on adding it to the README for now. My concern is sync drift — I update GSD frequently and can't guarantee a third-party wrapper stays compatible. I don't want users hitting issues from version mismatches and ending up here confused.

The npm/npx installation is the supported path:
```bash
npx get-shit-done-cc
```

You're welcome to...[truncated]
- **Marcel-Bich**: Okay, all right, thanks for the reply. FYI I'll try to keep my repo up to date, since I'm an intensive user of GSD and Claude Code myself and need it updated anyway :)
- **Marcel-Bich**: @glittercowboy 
FYI something strange happened while I was "completing" my marketplace... some unknown entity committed something into my repo. I have no idea how [it](https://github.com/Marcel-Bich/marcel-bich-claude-marketplace/commit/bd840f280831b083bd1f90cb94448f538e109fae) got there, but it mentions you in [GENESIS.md#the-third-book-the-multiplication](https://github.com/Marcel-Bich/marcel-bi...[truncated]

---

### #58: Opencode glm?
**CLOSED** | Author: frankbasti | 2026-01-14 | Labels: none
Will this work with other models via opencode?

**Key Comments (3):**
- **buz-ch**: That one does: https://github.com/rokicool/gsd-opencode

As for running in CC, at least with GLM it works.
- **glittercowboy**: GSD is designed specifically for Claude Code. I can't speak to compatibility with other tools or models.

The fork @buz-ch linked may work for your use case, but note that third-party forks won't necessarily stay in sync with this repo — I update frequently.
- **frankbasti**: Thank you

---

### #56: [Feature Request] Please add an /gsd:add-issues 
**CLOSED** | Author: TheShibo | 2026-01-13 | Labels: none
Please add an /gsd:issues, where you can note all the issues that you found.

And also add a feature to gsd:debug, where you can systematically debug all the issues that have been found.

Thanks in advance!

(PS: GSD is the best addon for claude code that i had the pleasure to work with, by far!)

**Key Comments (1):**
- **glittercowboy**: After investigating, I found that the ISSUES.md system (Rule 5 for deferred enhancements) was dead code — it never actually triggered in 100+ projects. I've removed it entirely in commit 62f1279.

For tracking issues you find during work, use the existing todo system:

```bash
/gsd:add-todo "description of issue"  # Capture it
/gsd:check-todos                        # Review and select one
/gsd:de...[truncated]

---

### #54: Branch/task isolation for multi-task workflows?
**CLOSED** | Author: vitaliiorlov | 2026-01-12 | Labels: none
Hi,

I'm using the GSD plugin and enjoying the structured workflow. However, I'm running into an issue with task isolation.

The `.planning/` directory (`phases/`, etc.) is stored at the repo root without any scoping. When I switch branches to work on a different task, the planning context from the previous task remains.

Additionally, `PROJECT.md`, `ROADMAP.md`, and `STATE.md` are heavily connected to a single task and could benefit from scoping as well.

My current workaround is manually cleaning up planning files when switching tasks.

Questions:
1. Is there a recommended way to work on mul...[truncated]

**Key Comments (1):**
- **glittercowboy**: GSD is designed for sequential milestone execution - one project focus at a time. The `.planning/` directory represents your current project context, not a multi-track workspace.

The intended workflow is: finish milestone → archive with `/gsd:complete-milestone` → start next work.

That said, I can see the use case for parallel feature development. Keeping this on the radar as a potential future ...[truncated]

---

### #53: add /debug workflow to GSD
**CLOSED** | Author: osama1998H | 2026-01-12 | Labels: none
the /debug workflow is awesome its investigating and verifying issues without touching the code,  consinder adding it to GSD

**Key Comments (1):**
- **glittercowboy**: Added! `/gsd:debug` is now available.

**How it works:**
1. Run `/gsd:debug "issue description"` — gathers symptoms through questions (what happened, what should happen, errors, when it started)
2. Creates `.planning/debug/[slug].md` to track investigation state
3. Investigates autonomously using scientific method (evidence → hypothesis → test)
4. Persists across `/clear` — run `/gsd:debug` with n...[truncated]

---

### #52: [Feature Request] Persist a “next recommended command” across /clear
**CLOSED** | Author: mateoblack | 2026-01-11 | Labels: none
### Problem 

One small but high-impact friction point:

I often finish a milestone, see the UI prompt showing the next recommended step, and reflexively type `/clear` to start a fresh context. That wipes out the recommendation, even though the underlying GSD state (phases, STATE.md, etc.) is still intact.

At that point I have to go dig through STATE.md or reason about the workflow to remember what the next command was supposed to be. Assuming, I'm going to execute the plan instead of manually verifying everytime in this scenario. The system knows the next logical term it’s just not preserved...[truncated]

**Key Comments (3):**
- **cowwoc**: I tried filing a RFE for it but... https://github.com/anthropics/claude-code/issues/9118

Ideally, we want custom slash commands (not just hook scripts) to be able to invoke clear before beginning execution.
- **lydonator**: > I tried filing a RFE for it but... [anthropics/claude-code#9118](https://github.com/anthropics/claude-code/issues/9118)
> 
> Ideally, we want custom slash commands (not just hook scripts) to be able to invoke clear before beginning execution.

I'd go one further and say that running YOLO mode should clear the context after each plan step and rip right on through until it either finishes the phas...[truncated]
- **glittercowboy**: This already exists! After `/clear`, run `/gsd:progress` — it reads your STATE.md and ROADMAP.md, shows your current position, and tells you exactly what command to run next.

The recommendation isn't stored in conversation history (which gets cleared), it's reconstructed from your planning files. So `/gsd:progress` is your "what was I doing?" command after any context reset.

---

### #51: Inconsistent plan file naming convention (e.g., 06-04-PLAN.md vs 6.1-01-PLAN.md)
**CLOSED** | Author: thepiper18 | 2026-01-11 | Labels: none
## Problem
The plan file naming convention appears to be inconsistent. When completing phases, the naming format changes without a clear pattern.

## Example
In `.planning/STATE.md`, I observed:
- Previous session: `06-04-PLAN.md` (Phase 6 complete)
- Current session: `6.1-01-PLAN.md` (Phase 6.1 complete)

This suggests an inconsistency in how:
1. Phase numbers are formatted (with or without leading zeros: `06` vs `6`)
2. Sub-phases are introduced (jump from `06-04` to `6.1-01`)
3. The naming scheme handles phase transitions and version numbering

## Expected Behavior
The file naming should fo...[truncated]

---

### #50: GSD doesn't add its methodology rules to existing project CLAUDE.md files
**CLOSED** | Author: willmarkman | 2026-01-11 | Labels: none
### Problem

When using GSD in a project that already has an existing `CLAUDE.md` file, GSD does not inject/merge its own methodology rules into the project. This causes Claude to:

1. Follow the project's existing CLAUDE.md rules
2. But NOT follow GSD-specific patterns like:
   - Using parallel subagents for execution
   - Creating SUMMARY.md after task completion
   - Following the GSD commit format
   - Using `run_in_background: true` for subagents
   - Spawning multiple agents in one message

### Current Behavior

1. User has existing project with `CLAUDE.md` containing project-specific ru...[truncated]

**Key Comments (4):**
- **glittercowboy**: @willmarkman Thanks for the detailed write-up. This is a nuanced issue.

**How GSD methodology is currently loaded:**

When you run `/gsd:execute-plan`, the command loads:
```
@~/.claude/get-shit-done/workflows/execute-phase.md
```

This workflow contains all the subagent orchestration, SUMMARY.md creation, commit format, etc. The methodology is injected via `@` reference at command execution time...[truncated]
- **glittercowboy**: GSD's methodology is baked into the slash commands themselves—when you run `/gsd:execute-plan`, the command tells Claude how to behave (parallel subagents, SUMMARY.md creation, etc.).

There's no separate "GSD rules" that need to live in CLAUDE.md. The commands ARE the rules.

If you're seeing conflicts, check if your CLAUDE.md has instructions that contradict GSD patterns (like "always ask before...[truncated]
- **willmarkman**: Feature Request: `/gsd:check-project` - CLAUDE.md Conflict Detection

## Problem

When using GSD in a project that already has a custom `CLAUDE.md`, there's no way to know if the project's rules conflict with or duplicate GSD's methodology.

This leads to:
1. **Conflicts** - Project rules that contradict GSD (e.g., "never use subagents")
2. **Redundancy** - Duplicated rules that waste context toke...[truncated]
- **willmarkman**: I hope this would help it then:)

---

### #49: Claude plugin lists `auto.md` which does not exist
**CLOSED** | Author: egonelbre | 2026-01-11 | Labels: none
https://github.com/glittercowboy/get-shit-done/blob/94b01b97ab1e22205845ccd9c4517f561af321b1/.claude-plugin/plugin.json#L29

Contains `auto.md` which does not exist.

---

### #48: Question about/add-todo command
**CLOSED** | Author: osama1998H | 2026-01-11 | Labels: none
Hi i saw your live stream on youtube u used a useful workflow for adding todo the used it to map and plan the next milestone i used latest version of gsd and didnt find that command is there an equivalent to it ?

**Key Comments (1):**
- **glittercowboy**: Hey @osama1998H! 

The workflow you saw in the livestream is now part of GSD as of v1.3.34.

**New commands:**

**`/gsd:add-todo [description]`** - Capture ideas mid-session
- Extracts context from your conversation (or use explicit description)
- Creates structured todo file in `.planning/todos/pending/`
- Infers area from file paths for grouping
- Commits automatically

**`/gsd:check-todos [area...[truncated]

---

### #47: Add examples for each command and it usege
**CLOSED** | Author: osama1998H | 2026-01-10 | Labels: none
Consider to add in the readme file or other documents a full usege and examples for each command and the expected output

**Key Comments (1):**
- **glittercowboy**: Agree this would be helpful! Not prioritizing it myself right now, but PRs welcome if you want to take a crack at it.

I'm planning to make a YouTube walkthrough that'll cover usage examples visually - might be more useful than written docs for something like this.

---

### #45: Feature: Autonomous Milestone Execution (`/gsd:execute-milestone`)
**CLOSED** | Author: GuitaristForEver | 2026-01-10 | Labels: none
## Feature Summary

New command that runs entire milestones autonomously without manual intervention.

## What's New

- `/gsd:execute-milestone` command for full automation
- Auto-planning of unplanned phases
- Real-time progress logging with emoji formatting
- Production-grade error handling with state preservation
- Safe interrupt (Ctrl+C) and resume capability
- Integration with `/gsd:progress` command

## Implementation

- Command entry point: `commands/gsd/execute-milestone.md`
- Core workflow: `get-shit-done/workflows/execute-milestone.md`
- Updated progress routing: `commands/gsd/progre...[truncated]

**Key Comments (3):**
- **SixFive7**: I saw this: https://github.com/glittercowboy/get-shit-done/commit/b04034267d5b227c48033b27d9fd819c3f7576fc
But then this: https://github.com/glittercowboy/get-shit-done/commit/6593edcb8b06441a1434e0ea14d4532cb6f003ff
Maybe @glittercowboy can provide some insight?
- **GuitaristForEver**: Right.. i was looking for an open issue about that 😅 waiting for @glittercowboy to shed a light on this.
Thanks @SixFive7
- **glittercowboy**: Thanks for the detailed implementation design! The architecture you outlined (auto-planning unplanned phases, sequential execution, interrupt/resume) is solid.

We're not adding autonomous milestone execution at this time—the current workflow of explicit `/gsd:plan-phase` → `/gsd:execute-plan` gives users more control and visibility.

If you've got this working in your fork, feel free to share it ...[truncated]

---

### #44: Proposed Bug fixing flow for GSD
**CLOSED** | Author: callesjoenell | 2026-01-10 | Labels: none
## Problem
When debugging complex issues, context windows get polluted with failed investigation 
paths, large irrelevant file reads, and tangent explorations. This leads to "context rot" 
where Claude loses track of the original problem.

## Proposed Solution
A `/gsd:fix-bug` command with structured state tracking and context management.

### Features
- Creates `.planning/BUG-FIX.md` to track investigation progress
- Structured phases: investigate → root cause → fix → verify
- Monitors context usage, advises `/clear` when needed (15+ tool calls without progress)
- Clean handoff: updates state...[truncated]

**Key Comments (2):**
- **glittercowboy**: Addressed by `/gsd:debug` — just shipped.

Your proposal was spot on: structured state tracking in `.planning/debug/`, phases (investigate → root cause → fix → verify), context management with clean handoff for `/clear`, and archiving resolved bugs.

The implementation includes:
- `.planning/debug/[slug].md` for tracking investigation progress
- Symptom gathering through adaptive questions
- Evide...[truncated]
- **callesjoenell**: My pleasure, it’s so great to use your system. It really works. I’ll share my projects in a month or two when they are in production of you want to show other examples.

> On 13 Jan 2026, at 18:16, TÂCHES ***@***.***> wrote:
> 
> 
> glittercowboy
>  left a comment 
> (glittercowboy/get-shit-done#44)
>  <https://github.com/glittercowboy/get-shit-done/issues/44#issuecomment-3745493862>
> Ad...[truncated]

---

### #41: [Feature Request] Add context window awareness and optimization guidance to GSD commands
**CLOSED** | Author: davesienkowski | 2026-01-09 | Labels: none
### Problem

GSD's power comes from context engineering—giving Claude the right information at the right time. But users have no visibility into:

- How much context window is being used
- When they're approaching limits
- Which GSD files consume the most tokens
- When to compact or start fresh

The README mentions context degradation:

> "As Claude fills its context window, quality degrades. You've seen it: 'Due to context limits, I'll be more concise now.'"

But GSD doesn't help users monitor or avoid this.

### What Changed

Claude Code now provides:

- Real-time context window percentage i...[truncated]

**Key Comments (1):**
- **glittercowboy**: Claude Code's `/context` command already shows token breakdown. GSD's subagent architecture handles context isolation automatically - that's the main win.

Docs about context management could be helpful but not prioritizing right now. PRs welcome if you want to add a section to the README.

---

### #40: [Feature Request] Document and leverage LSP integration for smarter task execution
**CLOSED** | Author: davesienkowski | 2026-01-09 | Labels: none
### Problem

When `/gsd:execute-plan` implements code, the subagent doesn't have real-time feedback about:

- Type errors introduced by changes
- Missing imports
- Undefined references
- Breaking changes to function signatures

The agent writes code, then discovers issues only when running tests or builds—sometimes several steps later.

### What Changed

Claude Code added **LSP (Language Server Protocol)** support, providing:

- Real-time diagnostics (errors, warnings)
- Go-to-definition
- Find references
- Hover documentation

This means Claude can catch issues immediately as it writes code, ...[truncated]

**Key Comments (2):**
- **glittercowboy**: @davesienkowski Good suggestion. LSP integration is valuable and underutilized.

**What I'm thinking:**

1. **README addition** - Yes, a brief section on code intelligence makes sense. Users should know LSP is available.

2. **Execution workflow guidance** - This is where it gets interesting. The execute-phase workflow could include:
   ```
   After modifying code, use LSP hover/diagnostics to ver...[truncated]
- **glittercowboy**: Thanks for the detailed write-up! LSP is a Claude Code feature—when language servers are available, Claude will use them automatically during GSD execution. Setup and configuration docs belong in Claude Code's documentation rather than GSD's.

If you're finding LSP helpful with your GSD workflow, that's great to hear!

---

### #39: [Feature Request] Add `/gsd:stats` command for project-specific progress tracking
**CLOSED** | Author: davesienkowski | 2026-01-09 | Labels: none
### Problem

GSD projects involve many tasks, phases, and sessions. Users have no easy way to see:

- How many tasks completed vs. remaining
- Time spent per phase
- Velocity trends (tasks per session)
- Project completion percentage

Claude Code's `/stats` shows general usage, but nothing GSD-specific.

### Proposed Solution

Add a `/gsd:stats` command that displays project-specific statistics:

```yaml
---
name: gsd:stats
description: Display GSD project statistics and progress
---

# GSD Project Statistics

Show progress metrics for the current GSD project.

## Output

```
📊 GSD Stats: my-a...[truncated]

**Key Comments (1):**
- **glittercowboy**: STATE.md already tracks current position and progress. Adding velocity metrics and charts would require new tracking infrastructure for marginal benefit.

Keeping GSD lightweight for now. PRs welcome if you want to prototype this.

---

### #38: [Feature Request] Add `plan_mode_required` option for users who want subagent plan approval
**CLOSED** | Author: davesienkowski | 2026-01-09 | Labels: none
### Problem

GSD is designed for automation—YOLO mode, walk away, trust the system. But some users want oversight:

- New users still learning to trust GSD
- High-stakes projects where mistakes are costly
- Debugging sessions where you want to see what the agent plans to do
- Team environments with review requirements

Currently, it's all-or-nothing: either full autonomous execution or manual step-by-step.

### What Changed

Claude Code added `plan_mode_required` as a spawn parameter. When set, the subagent must show its plan and get approval before implementing:

```javascript
Task({
  prompt...[truncated]

**Key Comments (4):**
- **glittercowboy**: Thanks for the detailed writeup! Before implementing, I wanted to verify the technical details.

I couldn't find `plan_mode_required` as a Task tool parameter in:
- The [subagents documentation](https://code.claude.com/docs/en/sub-agents)
- The Claude Code changelog
- Context7 docs

The closest I found is `permissionMode: plan` which puts subagents in read-only mode, but that's different from what...[truncated]
- **davesienkowski**: > Thanks for the detailed writeup! Before implementing, I wanted to verify the technical details.
> 
> I couldn't find `plan_mode_required` as a Task tool parameter in:
> - The [subagents documentation](https://code.claude.com/docs/en/sub-agents)
> - The Claude Code changelog
> - Context7 docs
> 
> The closest I found is `permissionMode: plan` which puts subagents in read-only mode, but that's dif...[truncated]
- **davesienkowski**: ## Quick note on `plan_mode_required`

After checking the official Claude Code changelog and GitHub repo, this parameter doesn't exist. The third-party sites reporting it appear to have AI-generated documentation that hallucinated the feature. No worries - it led to a better conversation.

## Reframing the problem

The original ask was "approval before subagent execution." But thinking through GSD...[truncated]
- **glittercowboy**: This was implemented and merged. Thanks for the feature request!

---

### #37: [Feature Request] Add subagent resume capability for interrupted or partially completed tasks
**CLOSED** | Author: davesienkowski | 2026-01-09 | Labels: none
### Problem

Sometimes task execution gets interrupted:

- Rate limit hit mid-task
- Network issues
- User accidentally cancels
- System timeout on very long tasks

Currently, if `/gsd:execute-plan` is interrupted, users must restart the entire task from scratch. The subagent's progress, context, and partial work are lost.

### What Changed

Claude Code now supports **subagent resume by agent ID**. When a subagent completes (or is interrupted), Claude Code displays an agent ID. That agent can be resumed:

```javascript
Task({
  prompt: "Continue where you left off",
  resume: "agent_abc123"  /...[truncated]

**Key Comments (4):**
- **hkollner**: This is a great feature suggestion since I had this happen on Pro Plan. Voting for this too!
- **davesienkowski**: I'm attempting to add this feature and will be submitting a PR when done.
- **cowwoc**: Isn't one of the goal of GSD to run only 2-3 tasks per plan (subagent invocation) in order to avoid getting anywhere close to needing to compact? This seems to imply that there are no "Long-running tasks" to resume. They are all short by design.

Am I wrong?
- **davesienkowski**: Depending on how well and thorough your plans are, with context for each subagent/task in mind, you may not ever need to resume a subagents task. Larger codebases tend to consume a bit more context. Even with GSD's excellent handling of everything.

Although, there are times where a user may lose their Claude Code connection or it crashes, etc. Other times the subagents task may consume more conte...[truncated]

---

### #36: [Feature Request] Document and leverage large output persistence for complete codebase analysis
**CLOSED** | Author: davesienkowski | 2026-01-09 | Labels: none
### Problem

`/gsd:analyze-codebase` spawns parallel agents to analyze your codebase and create 7 documents in `.planning/codebase/`. These agents often run commands that produce large outputs:

- `find . -name "*.ts"` on large repos
- Dependency tree analysis (`npm ls`, `pip list`)
- Full `git log` for commit history analysis
- Test suite output for understanding coverage

Previously, Claude Code **truncated** large outputs, meaning analysis agents were working with incomplete information. The resulting codebase documents could miss important patterns or dependencies.

### What Changed

Claud...[truncated]

**Key Comments (1):**
- **glittercowboy**: Thanks! This is a Claude Code feature that works automatically—GSD benefits from it out of the box without any configuration needed.

---

### #35: [Feature Request] Add specialized agent types for different GSD phases (analyzer, implementer, reviewer)
**CLOSED** | Author: davesienkowski | 2026-01-09 | Labels: none
### Problem

GSD has distinct phases with different requirements:

- **Analysis** (`/gsd:analyze-codebase`): Needs read-only access, should explore broadly
- **Implementation** (`/gsd:execute-plan`): Needs full write access, should be focused
- **Verification**: Needs read + bash for running tests, shouldn't modify code

Currently, all GSD commands use the same default agent configuration. This means:

- Analysis agents have write permissions they shouldn't use
- No enforcement of "read-only exploration" vs "write-enabled implementation"
- Can't optimize tool access per phase

### Proposed Sol...[truncated]

**Key Comments (1):**
- **glittercowboy**: Interesting idea - the architecture is clean. For now, prompt-based separation is working fine and I haven't seen accidental writes in practice.

Not pursuing this myself right now, but happy to explore via PR if you want to prototype it.

---

### #34: [Feature Request] Add session management commands for multi-session project continuity
**CLOSED** | Author: davesienkowski | 2026-01-09 | Labels: none
### Problem

Real GSD projects span multiple sessions:

- Day 1: `/gsd:extract` and `/gsd:create-roadmap`
- Day 2: Phase 1 tasks
- Day 3: Continue Phase 1, start Phase 2
- Week 2: Resume after a break

But there's no good way to maintain continuity:

- Claude Code's `/resume` screen shows generic timestamps, not project names
- Users lose track of which session had their GSD project
- Re-orienting after a break requires manually re-reading `.planning/` files
- No quick way to capture "where I left off"

### Proposed Solution

Claude Code v2.0+ added `/rename` and `claude --resume "session-name...[truncated]

**Key Comments (1):**
- **glittercowboy**: STATE.md captures where you left off, and Claude Code's `/resume` handles session continuity. These together cover the use case.

Not adding more session ceremony right now. PRs welcome if you see gaps.

---

### #33: [Feature Request] Add async parallel execution commands (`/gsd:execute-async`, `/gsd:execute-phase`)
**CLOSED** | Author: davesienkowski | 2026-01-09 | Labels: none
### Problem

GSD promises a "walk away" workflow:

> "Now I can say 'go,' put it in YOLO mode, and go to the beach."
> "Walk away, come back to completed work."

But execution is still **synchronous**:

- `/gsd:execute-plan` blocks until the task completes
- Users must wait for Task 1 to finish before starting Task 2
- Long-running tasks (test suites, complex implementations) lock up the entire session
- No true parallelism despite GSD's multi-task design

### Proposed Solution

Claude Code now supports async background agents. GSD could leverage this with new commands:

**1. `/gsd:execute-asy...[truncated]

**Key Comments (5):**
- **lydonator**: This is the single biggest feature that would take GSD into orbit, though I don't think it necessarily needs it's own command. The system should use the same logic that determines whether or not sub-agent tasks are conflicting or not (i.e. Can be parallelised). If no conflicts are found for phases/plans, then asynchronous agents should be spawned along with some way to detect completion and produc...[truncated]
- **davesienkowski**: > This is the single biggest feature that would take GSD into orbit, though I don't think it necessarily needs it's own command. The system should use the same logic that determines whether or not sub-agent tasks are conflicting or not (i.e. Can be parallelised). If no conflicts are found for phases/plans, then asynchronous agents should be spawned along with some way to detect completion and prod...[truncated]
- **hkollner**: > > This is the single biggest feature that would take GSD into orbit, though I don't think it necessarily needs it's own command. The system should use the same logic that determines whether or not sub-agent tasks are conflicting or not (i.e. Can be parallelised). If no conflicts are found for phases/plans, then asynchronous agents should be spawned along with some way to detect completion and pr...[truncated]
- **glittercowboy**: `/gsd:execute-phase` already supports parallel plan execution (marked experimental). Check the README for details.

Let me know if you run into issues with the existing implementation.
- **davesienkowski**: > `/gsd:execute-phase` already supports parallel plan execution (marked experimental). Check the README for details.
> 
> Let me know if you run into issues with the existing implementation.

I had a chance to test this with a current project. Worked flawlessly! 

<img width="1219" height="1131" alt="Image" src="https://github.com/user-attachments/assets/67ef4780-128c-40dc-bfba-537e75fc95cf" />

---

### #32: [Feature Request] Add command-level hooks for automatic atomic commits after task completion
**CLOSED** | Author: davesienkowski | 2026-01-09 | Labels: none
### Problem

GSD promises surgical, traceable commits:

> "Each task gets its own commit immediately after completion"
> "Git bisect finds exact failing task. Each task independently revertable."

But currently, users must **manually commit** after each task completes. This leads to:

- Forgotten commits that bundle multiple tasks together
- Inconsistent commit message formats
- Extra cognitive load ("did I commit that?")
- The "atomic commit" promise depending on user discipline

### Proposed Solution

Claude Code v2.1+ supports hooks directly in command frontmatter. Embedding a `Stop` hook i...[truncated]

**Key Comments (1):**
- **glittercowboy**: Thanks for the detailed writeup, but this is already handled by the execution workflow.

When Claude follows `/gsd:execute-plan`, it commits after each task as instructed - no user discipline required. The workflow tells Claude to commit, and Claude does.

The `Stop` hook approach wouldn't work anyway - Stop fires once at session end, not after each task. There's no "task completed" hook event bec...[truncated]

---

### #31: [Feature Request] Add `context: fork` to execution commands for conversation-aware subagents
**CLOSED** | Author: davesienkowski | 2026-01-09 | Labels: none
### Problem
When `/gsd:execute-plan` spawns a subagent, that agent starts with a completely empty context. It has no knowledge of:

- Clarifications discussed during `/gsd:extract`
- Decisions made during roadmap creation
- Preferences mentioned in conversation but not captured in formal docs
- Edge cases the user brought up during planning

This means the execution subagent often makes decisions that contradict earlier discussions, or asks questions that were already answered.

### Proposed Solution
Claude Code v2.1+ introduced `context: fork` frontmatter for skills and commands. Adding this ...[truncated]

**Key Comments (3):**
- **cowwoc**: My 2 cents: this would defeat the entire point of using subagents in the first place. If your subagent is missing context, add it to the plan.
- **davesienkowski**: > My 2 cents: this would defeat the entire point of using subagents in the first place. If your subagent is missing context, add it to the plan.

That's a good point. I wonder if there's something that can be done so if a subagent determines its missing needed context that it could add that as a follow-up task to update the plan or note some technical debt follow-up.
- **davesienkowski**: I'll close this issue since @cowwoc makes a good point.

---

### #30: plan everything vs finishing phases early
**CLOSED** | Author: piffie | 2026-01-09 | Labels: none
Question: 
it seems the plugin prefers to plan all phases, before starting implementing the first one. 
Typically when i code after implementation the plan can change quite. 

Special reason that all phases should be planned first, or is it free to choose to implement phase 1 before planning phase 2?

**Key Comments (3):**
- **davesienkowski**: You can have GSD start implementing any phase at any time. You can also add in a phase to the plan/roadmap at any time.
The reason for planning all phases first helps prevent technical debt and additional code changes mid-way to accommodate a plan that might break a previous change.
- **glittercowboy**: @piffie Great question, and @davesienkowski nailed the answer.

**TL;DR: You're free to implement phase 1 before planning phase 2.** GSD doesn't enforce upfront planning.

**The workflow:**
1. `/gsd:create-roadmap` creates a high-level phase breakdown (just names and goals)
2. `/gsd:plan-phase 1` creates the detailed task plan for phase 1 only
3. Execute phase 1
4. `/gsd:plan-phase 2` - now you pl...[truncated]
- **glittercowboy**: Also important to note that you can `discuss-phase` and `research-phase` phase long before planning them.

---

### #28: Support for OpenCode (The Open Source, Model-Agnostic Engine)
**CLOSED** | Author: Sanady | 2026-01-09 | Labels: none
**Is your feature request related to a problem? Please describe.**
GSD is currently hardcoded to wrap `claude` (Claude Code). While Claude Code is excellent, it locks the GSD system into a single provider (Anthropic) and a closed-source ecosystem.

A new, rapidly growing open-source alternative has emerged: **[OpenCode](https://github.com/anomalyco/opencode)**.

**Describe the solution you'd like**
I propose adding an abstraction layer to GSD to support running **OpenCode** (`opencode`) as the underlying execution engine alongside `claude`.

**Why OpenCode?**
1.  **Model Agnosticism:** OpenCod...[truncated]

**Key Comments (2):**
- **gortium**: See: https://github.com/glittercowboy/get-shit-done/issues/3
- **glittercowboy**: GSD is built specifically for Claude Code and I don't use OpenCode myself, so I won't be maintaining a port.

That said, if someone builds a working OpenCode port, I'm happy to link to it in the README as a community fork. Feel free to build it and share!

---

### #27: PFS and GSD
**CLOSED** | Author: hkollner | 2026-01-09 | Labels: none
First off, AMAZING work on this brother! Looking forward seeing this grow over the next few weeks :)

PFS (Plugin Freedom System) has a lot of specific skills and agents for building plugins, which the GSD doesn't have.

To my understanding, GSD is the better and more generic system. How would I go about bringing the PFS resources, plugin specific skills, agents and workflows into GSD?

I am very confused and I would really appreciate it if you could clarify this. You have stated on one of your youtube comments that you use GSD for plugin creation now and that the PFS system is the old fashion...[truncated]

**Key Comments (5):**
- **budi760**: can you clarify what is PFS
- **hkollner**: > can you clarify what is PFS

Plugin Freedom System:
https://github.com/glittercowboy/plugin-freedom-system

It was developed Specifically to create Vst plugins and includes many skills such as audio dsp.
- **hkollner**: Also to furhter add context. The author recently added 2 Live videos on youtube vibecoding EXISTING vst plugins but did not specify how he started these plugins. Was it started using PFS and then continued in GSD or started in GSD? This is somewhat confusing.
- **glittercowboy**: Good question! PFS (https://github.com/glittercowboy/plugin-freedom-system) was an earlier experiment for JUCE plugin development workflows. I now use GSD for all plugin work instead.

**Migration path:** Dogfood it. Set up a GSD project whose purpose is to extract whatever plugin-specific skills, patterns, or workflows you want from PFS. Let GSD analyze the PFS repo and pull out the useful bits i...[truncated]
- **hkollner**: > Good question! PFS (https://github.com/glittercowboy/plugin-freedom-system) was an earlier experiment for JUCE plugin development workflows. I now use GSD for all plugin work instead.
> 
> **Migration path:** Dogfood it. Set up a GSD project whose purpose is to extract whatever plugin-specific skills, patterns, or workflows you want from PFS. Let GSD analyze the PFS repo and pull out the useful ...[truncated]

---

### #26: Consider leaning more heavily on CLAUDE.md files instead of STACK.md ARCHITECTURE.md, and STRUCTURE.md
**CLOSED** | Author: Ghoughpteighbteau | 2026-01-08 | Labels: none
CLAUDE.md files have an interesting hierarchical property to them that can provide automatic context to agents based on where they are navigating.

For example. if you had a CLAUDE.md file located at `./commands/gsd`, then when a new agent starts up, it will automatically load `/CLAUDE.md`, then when it goes to make modifications to `./commands/gsd`, `./commands/gsd/CLAUDE.md` will load. Which is a good opportunity to define structure, conventions, and other information specific to this section.

I would be curious to hear your thoughts on this strategy, if you've explored it before, ect.

Tha...[truncated]

**Key Comments (3):**
- **blazejp83**: Isn't this a way to bloat context of all subagents?
- **Ghoughpteighbteau**: More broadly, I'd say that our goal is to document everything a new developer would need to know about a project, and then for each agent, you filter all of that information down to only the bare minimum required to complete it's objective. The less prompt an agent has, the smarter it is. So your goal of avoiding context bloat to agents is something I completely agree with.

The current architectu...[truncated]
- **glittercowboy**: Interesting idea! The CLAUDE.md hierarchy is clever for implicit context loading.

GSD uses explicit context loading by design—commands control exactly what gets loaded via @-references. This keeps context predictable and lets us optimize what each phase sees.

May revisit this approach in the future. Thanks for the suggestion!

---

### #25: Read tool calls fail with tilde paths (~/.claude/...)
**CLOSED** | Author: b00y0h | 2026-01-08 | Labels: none
## Description

GSD skills are failing to read template files because they're using tilde paths (`~/.claude/...`) when calling the Read tool, but the Read tool requires absolute paths.

## Steps to Reproduce

1. Run any GSD skill that tries to read template files (e.g., `/gsd:map-codebase`)
2. Observe errors like:

```
Read(~/.claude/get-shit-done/templates/codebase/stack.md)
  ⎿  Error reading file
```

## Expected Behavior

Template files should be read successfully.

## Actual Behavior

Read tool fails because it doesn't expand the tilde (`~`) to the user's home directory path.

## Root Cau...[truncated]

**Key Comments (7):**
- **glittercowboy**: Hmm, I'm not seeing this issue on my end - the @ references are working fine for me.

Is anyone else experiencing this? Curious if this is environment-specific or something I'm not catching.
- **b00y0h**: I will add that it's happening when inside a docker container (specifically using claudebox)
- **b00y0h**: <img width="667" height="351" alt="Image" src="https://github.com/user-attachments/assets/a3f141c3-2ffc-4db1-a950-062a96e0716d" />

here's an output showing it can't read those files
- **cowwoc**: Try `!ls -la ~/.claude/` and iteratively dig into what's in each directory.
- **b00y0h**: Anything you notice?

```
➜  ~ ls -alF ~/.claude/get-shit-done
total 0
drwxr-xr-x  5 BobbySmith staff 160 Dec 21 14:56 ./
drwxr-xr-x 23 BobbySmith staff 736 Jan  9 10:43 ../
drwxr-xr-x 11 BobbySmith staff 352 Dec 21 14:56 references/
drwxr-xr-x 16 BobbySmith staff 512 Dec 21 14:56 templates/
drwxr-xr-x 15 BobbySmith staff 480 Dec 21 14:56 workflows/
```

```
➜  ~ ls -alF ~/.claude/get-shit-done/re...[truncated]
- **cowwoc**: Everything looks normal... Sorry, I'm stumped.
- **glittercowboy**: This is expected behavior in containerized environments. The `~` shorthand relies on shell expansion which may not work consistently in Docker.

**Workaround:** Set `CLAUDE_CONFIG_DIR` before installing to use absolute paths:
```bash
CLAUDE_CONFIG_DIR=/home/youruser/.claude npx get-shit-done-cc --global
```

Added this to the README troubleshooting section.

---

### #24: Feedback
**CLOSED** | Author: cowwoc | 2026-01-08 | Labels: none
First of all, thank you very much for releasing GSD. I've been programming for over 30 years now and I've rediscovered the joy of programming again :)

I think GSD get a lot of things right from the "choose your own adventure" perspective, making it easy and fun to develop new products. Coming from a programming background, you can imagine I have some feedback on the nitty gritty details.

Ideally, I wanted to take GSD and add my project-specific preferences on top of it but I found that in many cases this required me to basically fork the codebase. So, instead of doing that, I'll try to contr...[truncated]

**Key Comments (4):**
- **glittercowboy**: This is great feedback - especially the concurrency work. Multiple Claude instances with locks and worktrees is something I've been curious about.

Would you be open to pushing your fork so I can see the full implementation? Easier to evaluate the approach as a whole before breaking it into PRs.

Interested in the concurrency and approval gates especially. Terminology change is probably too breaki...[truncated]
- **aguilarguisado**: hey guys. I was about posting exactly the same. Working with worktrees and multiple projects in parallel would be awesome!
- **cowwoc**: It looks like my implementation does not actually work properly, preventing me from actually contributing actual PRs at this point. I think the ideas themselves are good ones and will continue working towards them but please don't wait on me for the actual implementation. Sorry.
- **glittercowboy**: Thanks for the detailed feedback\! These are solid ideas - particularly the concurrency/worktrees approach and approval gates. We've noted them and some are already being tracked in related issues (#54, #38). Closing this as the specific implementation isn't coming, but the ideas are appreciated and may influence future development.

---

### #23: Installation instructions are a bit confusing
**CLOSED** | Author: robertguss | 2026-01-08 | Labels: none
In the README there are two different ways of installing and it's not clear if you need to do both or one or the other. 

Currently it shows how to install via the CC plugin marketplace and also with npx. 

What is the preferred way to install? 

Thank you!

**Key Comments (1):**
- **glittercowboy**: Just pushed an updated README that's clearer. Removed the plugin nonsense - now it's clear it's npx install only.

---

### #22: [FEATURE] Tried porting to codex 'SKILL' style prompts with reasonable success
**CLOSED** | Author: chboishabba | 2026-01-08 | Labels: none
poasting to remind myself to share, getting late here. I think all it did was basically just change file references to land in the .codex folder instead. personally prefer to be able to use local LLM/other providers, I presume there's some way to do all this in something like opencode or continue.dev

I'm close to my quota for codex so if I hit it I'll have a shot at converting for gemini

**Key Comments (4):**
- **glittercowboy**: Interesting\! Would love to see what you came up with when you're ready to share.
- **atqamz**: I actually WIP by GSD-ing my GSD fork to support Codex since I only have Codex 😅
just planned this for my own use

but in case you guys might want to see it:
https://github.com/atqamz/get-shit-done/tree/feat/codex-port
- **chboishabba**: [get-shit-done-codex.zip](https://github.com/user-attachments/files/24555589/get-shit-done-codex.zip) just doing a few other things yet but would be interesting to see how similar they ended up -- I think the main thing it did was just change file references. I also have a routine that's similar but a bit more basic/condensed... But I think I had it weave that in too... For my dashitest repo, I tr...[truncated]
- **glittercowboy**: Cool that you got it working with Codex\! I won't be maintaining ports for other platforms, but if you publish your Codex version somewhere, I'm happy to link to it in the README as a community port.

---

### #21: Differerent models for different tasks
**CLOSED** | Author: Tycho-02 | 2026-01-08 | Labels: none
Is it possible to use the opus model for thinking and planning and the sonnet model for coding etc...?

**Key Comments (1):**
- **glittercowboy**: **Thanks for the suggestion!**

This is possible today - you can switch models mid-session with `/model` in Claude Code.

**Workflow:**
1. `/model opus` before `/gsd:plan-phase`
2. `/model sonnet` before `/gsd:execute-plan`

GSD's config.json infrastructure could theoretically support a `models` section to automate this, but I'm not sure it's worth the added complexity yet. The manual `/model` swi...[truncated]

---

### #19: [PRAISE] GSD worked great!
**CLOSED** | Author: davesienkowski | 2026-01-08 | Labels: none
Shipped:

  - 9 phases (35 plans complete)
  - Bug review, security audit, dead code removal, telemetry migration, smoke testing, mobile responsive

  Summary Files Created:

  - .planning/MILESTONES.md — Project milestone history
  - .planning/milestones/v0.5-ROADMAP.md — Full v0.5 archive

  Updated Files:

  - .planning/PROJECT.md — Requirements evolved (validated section)
  - .planning/ROADMAP.md — Reorganized with milestone grouping
  - .planning/STATE.md — Current position updated

  Git:

  - Commit: 3574fc2 — chore: complete v0.5 pre-release stabilization milestone
  - Tag: v0.5 (local...[truncated]

**Key Comments (1):**
- **glittercowboy**: Thanks for sharing this! Great to see GSD working well for a real project - 9 phases and 35 plans is solid validation of the workflow. Appreciate you taking the time to post.

---

### #18: Hardcoded paths
**CLOSED** | Author: egorpavlikhin | 2026-01-08 | Labels: none
Hi, interesting set of skills. I was curious to try it out and ran into an issue where some of the template paths seem to be hardcoded to your username (`emeli` is not me)

```
● Let me continue creating the remaining documentation files:

● Read(C:\Users\emeli\.claude\get-shit-done\templates\codebase\conventions.md)
  ⎿  Error reading file

● Read(C:\Users\emeli\.claude\get-shit-done\templates\codebase\testing.md)
  ⎿  Error reading file

● Read(C:\Users\emeli\.claude\get-shit-done\templates\codebase\concerns.md)
  ⎿  Error reading file
```

**Key Comments (4):**
- **cowwoc**: I'm not the author but I suspect the bug is on your end. I was able to install and use the templates just fine and I also did not find any mention of `emeli` in the source-code.

I suggest asking claude to debug this on your end. You might be surprised :) It's pretty good at self-debugging.
- **egorpavlikhin**: Interesting because I have no idea who `emeli` is, might just be a hallucination
- **davesienkowski**: Check your users folder.
- **glittercowboy**: Thanks for reporting. Verified there's no hardcoded username in the codebase - we use `~/.claude/` paths throughout which Claude Code resolves at runtime.

This appears to be Claude hallucinating a path during execution (it invented "emeli" from somewhere). A few things that might help:
- Start a fresh Claude Code session
- Explicitly tell Claude your Windows username if it keeps happening
- Repor...[truncated]

---

### #17: [Claude in Chrome] Requires tasks to be run in main context?
**CLOSED** | Author: davesienkowski | 2026-01-07 | Labels: none
First off, excellent job creating this workflow. Successfully used it to validate my entire web application codebase from top to bottom.

What I noticed was that when I have the "Claude in Chrome" plugin enabled for a project it will of course use that for those features.
Unfortunately, with GSD it's indicating these tasks requiring browser automation must be run in the main context. This of course eats up context quickly.

 I'm not sure if that's a Claude in Chrome limitation or if it's something that can be added to GSD to allow subagents to work with that plugin.

Thanks!

**Key Comments (3):**
- **davesienkowski**: Thank you. I had a feeling it was a Claude Code limitation related to subagents and mcp/plugin tool usage. No worries, I can work around it.
- **glittercowboy**: Thanks for reporting this! I haven't had a chance to test GSD with Claude in Chrome yet, but I'll give it a go and see what I can do.

Could you share the exact error message you're seeing? That would help me understand whether this is something GSD can work around or a platform limitation.
- **davesienkowski**: > Thanks for reporting this! I haven't had a chance to test GSD with Claude in Chrome yet, but I'll give it a go and see what I can do.
> 
> Could you share the exact error message you're seeing? That would help me understand whether this is something GSD can work around or a platform limitation.

Here's an insight that my claude gave me regarding Claude in Chrome when I was running the GSD workfl...[truncated]

---

### #16: constantly stopped by PLAN_START_TIME type bash command
**CLOSED** | Author: b00y0h | 2026-01-07 | Labels: none
Anyway to automatically accept these?


`PLAN_START_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ"); PLAN_START_EPOCH=$(date +%s); echo "START_TIME=$PLAN_START_TIME"; echo "START_EPOCH=$PLAN_START_EPOCH"`

Claude doesn't prompt with a 'always accept' for these types of bash commands and so I constantly find myself accepting these for the work to continue. Any advice would be appreciated.

Also, THANKS for this great framework. Really enjoy it.

**Key Comments (2):**
- **glittercowboy**: Thanks for the kind words and for raising this!

GSD is designed to run with `claude --dangerously-skip-permissions` - that's how I use it. The whole point is frictionless automation, and stopping for `date` approvals defeats that.

If you'd rather not run in that mode, you can add these to your project's `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(date:*)",
 ...[truncated]
- **glittercowboy**: Documented in README - GSD is designed for `--dangerously-skip-permissions` mode, with settings.json alternative for those who prefer granular control.

---

### #15: worth looking into TOON compression
**CLOSED** | Author: tezza1971 | 2026-01-07 | Labels: none
Token Oriented Object Notation is effectively "shorthand" for human language that allows the LLM to consume less tokens. This matters in context engineering where tokens are potentially burdensome prompt overhead because they're so often added to user-prompts.

Not all LLMs take toon compression with equal accuracy depending on just how aggressively short the shorthand is.

**Key Comments (2):**
- **glittercowboy**: Thanks for the suggestion! I looked into TOON - it's clever for compressing structured data (JSON, tabular records) when sending to LLMs.

GSD's prompts are prose instructions with XML semantic markers, not data payloads - so TOON's compression approach doesn't apply here. The XML tags (`<task>`, `<action>`, `<verify>`) aren't data serialization overhead; they're semantic structure that helps Clau...[truncated]
- **tezza1971**: Got it. I think I'm realizing that these platforms really need tailored approaches. And trying to port one context engineering toolkit to another platform is probably the wrong way to think about things. I think the best we can do is take the patterns from one system and re-implement them in the other system in a way that is optimized for the target subsystems. GSD was just never gonna port to vsc...[truncated]

---

### #12: It is unclear when phase artifacts should be committed
**CLOSED** | Author: bacongravy | 2026-01-06 | Labels: none
The `execute-phase.md` workflow contains explicit instructions for performing atomic commits of each task's output in a `<task_commit>` section. Likewise, the `create-roadmap.md` and `create-milestone.md` workflows includes instructions for committing the artifacts created by them.

In contrast, the `discuss-phase.md`, `research-phase.md`, and `plan-phase.md` workflows contain no instructions to commit the created artifacts. While it is simple enough to ask `claude` to commit these files, it would be more convenient if GSD was more opinionated about it and took the action itself at the appropr...[truncated]

**Key Comments (1):**
- **glittercowboy**: Fixed in v1.3.26.

Each phase workflow now commits its artifacts immediately:

| Workflow | Commits |
|----------|---------|
| `discuss-phase.md` | CONTEXT.md |
| `research-phase.md` | RESEARCH.md |
| `plan-phase.md` | PLAN.md (+ DISCOVERY.md if present) |
| `execute-phase.md` | SUMMARY.md, STATE.md, ROADMAP.md |

The key insight: planning artifacts (CONTEXT, RESEARCH, PLAN) are **inputs to execut...[truncated]

---

### #11: /gsd:discuss-milestone recommends calling /clear, which causes the summary to be lost
**CLOSED** | Author: bacongravy | 2026-01-06 | Labels: none
# What happened

I was using `/gsd:discuss-milestone` and after the summary was generated I followed the instructions to call `/clear`, which resulted in the loss of the summary that was generated by that command.

# Diagnosis

In `get-shit-done/workflows/discuss-milestone.md`, the following appears:

```markdown
## ▶ Next Up

**Create Milestone v[X.Y]** — [Theme Name]

`/gsd:new-milestone`

<sub>`/clear` first → fresh context window</sub>
```

These instructions are printed out by the command after the summary. If you follow the instructions and call `/clear` before `/gsd:new-milestone` then ...[truncated]

**Key Comments (2):**
- **glittercowboy**: ## Fix Implemented

Thanks for the detailed report and analysis. You were right — the phase discussion pattern (with `{phase}-CONTEXT.md`) was the model to follow.

### Changes

**New file:** `get-shit-done/templates/milestone-context.md`
- Template for the handoff file

**Updated:** `get-shit-done/workflows/discuss-milestone.md`
- Added `write_context` step that creates `.planning/MILESTONE-CONTE...[truncated]
- **bacongravy**: @glittercowboy Thanks for taking a look at this, and for the fast turnaround. The approach described does appear to resolve the issue that I reported. I wonder about the decision to make the milestone context a temporary file — the phase context, research, and discovery files are not considered temporary — but the described approach is still an improvement, and much simpler than a complete overhau...[truncated]

---

### #10: Add support for CLAUDE_CONFIG_DIR
**CLOSED** | Author: cowwoc | 2026-01-06 | Labels: none
When the installer is run in `--global` mode, please install into `${CLAUDE_CONFIG_DIR}` instead of `~/.claude` if it's defined.

**Key Comments (1):**
- **glittercowboy**: Fixed in v1.3.24. The installer now respects `CLAUDE_CONFIG_DIR` when set, including proper tilde expansion for paths like `~/custom-claude`.

---

### #9: Provide install steps for Docker containers
**CLOSED** | Author: cowwoc | 2026-01-06 | Labels: none
`npx get-shit-done-cc` triggers an interactive prompt which cannot be used inside `Dockerfile`. After further investigation I discovered that I can pass `--local` and `--global` for non-interactive installs. It would be good if README.md documented this possibility.

Thanks!

**Key Comments (1):**
- **glittercowboy**: Thanks for catching this! Added documentation for the `--global` and `--local` flags to the README. This will be available in the next release.

---

### #7: Possible malware clone https://www.npmjs.com/package/get-shit-done-codex
**CLOSED** | Author: zaraken | 2026-01-02 | Labels: none
I have found this possible malware clone https://www.npmjs.com/package/get-shit-done-codex
It claims that get-shit-done-cc is deprecated and also installs both get-shit-done-cc and get-shit-done-codex cli.
I have not inspected the contents of the clone but on the surface it already smells.

**Key Comments (2):**
- **glittercowboy**: Just inspected it and it seems legit. Thanks for sharing!
- **zaraken**: Well that is good to hear! Then sorry to raise an alarm! 

Nevertheless, if in doubt report the package on npm and GitHub. Contact the author directly to clear things up: could be a misunderstanding or a compromised account.

---

### #6: Install process and Claude plugin settings
**CLOSED** | Author: miloofcroton | 2026-01-02 | Labels: none
I'm finding some disconnect between the install process for this plugin and claude's `.claude/settings.json` configuration details. It seems as though all users of the application will have to run the node script `npx get-shit-done-cc` on their local to integrate the plugin, but it would be nice if we could register it in claude settings (which are git-controlled) so that any new user would automatically get the changes.

This might be my fault, as I am barely familiar with claude plugins, and the the docs for this (https://code.claude.com/docs/en/settings#plugin-settings) don't really explain...[truncated]

**Key Comments (2):**
- **glittercowboy**: The thing is it's _not_ a CC plugin. 

GSD is effectively just markdown files that live in your global ~/.claude or project ./.claude folders. 

While it's not set up for automatic updates all you have to do is run `npx get-shit-done-cc` and updates to my latest version.
- **deadcoder0904**: Oh cool, was gonna ask how to update it. Might be helpful to mention this in docs.

---

### #4: Just Wanted To Stay Thanks!!!
**CLOSED** | Author: professionalcrastinationco | 2025-12-29 | Labels: none
### This is by far, the most powerful addition to my Claude Code work! 

No junk. Nothing over-engineered.

Literally just gets shit done. 

Totally revolutionized my workflow.

So thanks again!!!

**Key Comments (2):**
- **glittercowboy**: Hahaha love this! Thank you so much for the kind words friend ❤️

Stoked that you're enjoying _Getting Shit Done_
- **davesienkowski**: Awesome job! It's also a much easier workflow to follow. And it just works!
If you know of a way to somehow have this run fully automated, like auto /clear and continue, that would be great.

---

### #3: opencode port
**CLOSED** | Author: dbachelder | 2025-12-17 | Labels: none
I watched your video today and wanted to try it out, but my setup is opencode, so I attempted a port of your main ideas but working with opencode primitives and limitations. 

https://github.com/dbachelder/get-shit-done-opencode

So far it seems to be working, but will keep iterating as I refine it for this environment.

I tried to give you credit but, let me know if you want me to change the name or take it down.. fine by me either way!

**Key Comments (10):**
- **glittercowboy**: Good shit man! Keep me posted. I really dig Opencode - only tried it out yesterday for the first time.
- **dbachelder**: @glittercowboy I guess I was still a few minutes away from the moment in the video where you discovered open code! funny. 

So far it seems to be working quite well, I'm several phases through a large roadmap and i'm pretty happy with it. I ran into an issue during phase research where it got a bit lost. I made some changes to the prompt to adjust that I haven't tested yet. 

I wish opencode had t...[truncated]
- **dbachelder**: @glittercowboy I don't want to keep this issue open for no reason, just wasn't sure how to communicate with you otherwise. feel free to close unless you want me to post more updates here. I have synced my repo with yours. I've used it for one small project which is complete and one ongoing larger project.. so far to great success. thanks for all the work and sharing!
- **deadcoder0904**: @dbachelder What video? Oh I saw him in YT algorithm recently for Meta Prompting video but only bookmarked it. Would love the specific video.
- **dbachelder**: @deadcoder0904 https://www.youtube.com/live/AAG97Yatadc?si=nxIkb2oOvWiGsBOf
- **deadcoder0904**: Cool, thanks. That one is longer one but I saw 2 other 30 mins videos & they were gold!!

Tysm for the link. I always felt Kiro's Spec to be too long.
- **NeedleLittle**: I use VS Code with its Claude code plugin, is it possible to integrate GSD with it somehow? 
It would be a very useful combo.
Sorry for the dumb question but I am just starting using Claude for coding, I didn't now where to ask this question and I posted it here.

Thank you in advance.
- **davesienkowski**: > I use VS Code with its Claude code plugin, is it possible to integrate GSD with it somehow? It would be a very useful combo. Sorry for the dumb question but I am just starting using Claude for coding, I didn't now where to ask this question and I posted it here.
> 
> Thank you in advance.

Once you install GSD, you should be able to access/use the GSD slash commands (example: /gsd:new-project ) ...[truncated]
- **lydonator**: Sadly it looks like OpenCode will no longer be able to use Anthropic subscriptions, which means costly use of the API if you wanna move out of the walled garden.
- **dbachelder**: I hope they walk it back... But I had moved back to CC a week or so ago anyway

---

### #2: Error: Bash command permission check failed when running /gsd:new-project
**CLOSED** | Author: webdevbrian | 2025-12-17 | Labels: none
``` bash

/gsd:new-project
Error: Bash command permission check failed for pattern "!`[ -d .planning ] && echo "PLANNING_EXISTS" || echo "NO_PLANNING"`": This Bash command contains multiple operations. The following part requires approval: [ -d .planning ]

```

**Key Comments (2):**
- **glittercowboy**: Mmmmm this is likely an issue with needing your approval for the bash command. I always run in --dangerously-skip-permissions mode so it just does it without asking.

Will have a look into this tomorrow to come up with a workaround.
- **glittercowboy**: Fixed! Check again :)

---

### #1: not working after npx install
**CLOSED** | Author: webdevbrian | 2025-12-17 | Labels: none
See the below terminal output.

``` bash
bk@Bs-Laptop gig-assist % npx get-shit-done-cc

   ██████╗ ███████╗██████╗
  ██╔════╝ ██╔════╝██╔══██╗
  ██║  ███╗███████╗██║  ██║
  ██║   ██║╚════██║██║  ██║
  ╚██████╔╝███████║██████╔╝
   ╚═════╝ ╚══════╝╚═════╝

  Get Shit Done v1.2.10
  A meta-prompting, context engineering and spec-driven
  development system for Claude Code by TÂCHES.

  Where would you like to install?

  1) Global (~/.claude) - available in all projects
  2) Local  (./.claude) - this project only

  Choice [1]: 2
  Installing to ./.claude

  ✓ Installed commands/gsd
  ✓ Installe...[truncated]

**Key Comments (1):**
- **webdevbrian**: Run `/gsd:help` within CLAUDE ;) Not running it in terminal.
