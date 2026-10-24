---
title: "Claude Tips: How to Use Claude and Claude Code Better"
date: 2026-10-24
description: Claude tips for engineers, designers, and product managers. Eight gotchas to remember and how to use Claude Code better with the agent lifecycle I follow on every project.
tags: [ai, claude, claude-code, claude-tips, ai-agents]
---

This is for engineers, designers, product managers, or anyone who wants to use Claude better. First, eight gotchas to remember. Then a real example, start to finish, using the agent lifecycle I follow on every project.

<a id="gotchas"></a>

# Gotchas to Remember

<a id="dumb-zone"></a>

## 1. Long chats make Claude less sharp (the "dumb zone")

Every chat has a limit on how much Claude can hold at once, called the context window. Think of it as Claude's working memory. Your messages, its replies, uploaded files, and search results all count toward it. The fuller it gets, the more likely Claude is to miss details, forget instructions, or make things up.

Dex Horthy from HumanLayer calls this the "dumb zone" and, in his talk [*No Vibes Allowed*](https://www.youtube.com/watch?v=rmvDxxNubIg&t=355s), puts the tipping point at about 40% of the context window. Chroma's [context rot](https://www.trychroma.com/research/context-rot) research backs up the idea: all 18 models it tested got worse as input grew. The 40% mark is a rule of thumb, not a hard line, but it's a good default.

- Start a new chat when you switch tasks
- If a chat gets long, ask Claude for a summary and paste it into a fresh chat
- Only share the files and details Claude actually needs

<a id="clear-brief"></a>

## 2. Vague asks get vague results

Treat Claude like a smart teammate on their first day. They can do a lot, but they can't read your mind. Skip the details and Claude fills the gaps with guesses, which is usually where things go wrong. Anthropic's own [prompting guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) gives the same advice.

Before handing over a task, cover the five things below. The one most people skip is how to check the work. When Claude can test its own output, it catches and fixes mistakes before you ever see them.

- **Goal:** what you want at the end
- **How:** the approach or steps to follow
- **Watch out for:** rules, limits, and things to avoid
- **How to check:** a test, an example to match, or a checklist
- **Tools:** the files, apps, or connectors Claude can use

<a id="agent-teams"></a>

## 3. One agent doing everything is slow and fills up fast

Claude Code's [agent teams](https://code.claude.com/docs/en/agent-teams) let a lead agent hand work to several teammates. Each teammate has its own context window, and they can message each other directly. Each agent holds only what it needs, so it stays out of the [dumb zone](#dumb-zone). And the work happens in parallel.

But more agents doesn't always mean faster. In 1967, Gene Amdahl [showed](https://www3.cs.stonybrook.edu/~rezaul/Spring-2019/CSE613/reading/Amdahl-1967.pdf) that extra processors only speed up the parts of a job that can run at the same time, now known as [Amdahl's law](https://en.wikipedia.org/wiki/Amdahl%27s_law). Two people can chop vegetables together, but the rice still takes 20 minutes. So split tasks into pieces that don't wait on each other.

- Agent teams are experimental and only in Claude Code
- Each teammate is a full session, so it uses up your limits faster
- Don't let two agents edit the same file

<a id="learn-capabilities"></a>

## 4. You don't need to learn every new feature

With most tools, every new feature means reading docs and digging through settings. With Claude, you can describe what you want in plain words, and it can set the feature up and use it for you. You don't need to know how [agents message each other](#agent-teams). Just say: *"Split this into a researcher, a writer, and a reviewer, and have them work in parallel."*

The [agent teams docs](https://code.claude.com/docs/en/agent-teams) say exactly this: describe the task and teammates in plain language, and Claude does the rest. The same goes for most features. If you're unsure something is possible, ask Claude to look it up and set it up.

- Some features need a one-time setup, which you may need to approve
- Claude may not know about the newest features, so ask it to check the latest docs first

<a id="connectors"></a>

## 5. Connect Claude to the tools your team already uses

Out of the box, Claude only sees what you paste into the chat. [Connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities) let it read straight from apps like BigQuery, Metabase, Asana, and Google Docs. Ask *"What were the top support issues last week?"* and Claude pulls the answer itself. No more copying between ten tabs.

Most popular apps are in the [connectors directory](https://claude.com/marketplace/connectors-plugins), and others like Freshdesk can be added as custom connectors. Many connectors can also create, edit, or delete things, so keep them read-only unless you really need more. Your company admin may need to turn on a connector first.

- **Use a view-only account:** Claude can only do what that account can do
- **Block write actions:** set each action to "Always allow," "Needs approval," or "Blocked" in the connector's settings

<a id="connector-bloat"></a>

## 6. Turning on every connector eats into your context

With so many [connectors](#connectors) on offer, it's tempting to switch them all on. But each connector and MCP server adds some setup text to every chat, and that takes up context window before you've typed a word. The more you connect, the closer you start to the [dumb zone](#dumb-zone).

Claude Code has eased this a lot. It now loads tool details only when they're needed, so only short names load at the start. Even so, each connection still adds a bit, and it adds up. Type `/context` to see what's taking up space, then keep only the connectors you actually need for the task.

- Run `/context` to see what's filling your context window
- Turn connectors on for the task at hand, and off when you're done
- Fewer connectors also means fewer chances for Claude to pick the wrong tool

<a id="verbosity"></a>

## 7. Claude can talk too much

Long answers take longer to read, and in a long session they also fill up the context window and push you toward the [dumb zone](#dumb-zone). One fix is to ask Claude to write in [Simplified Technical English](https://asd-ste100.org/about_STE.html) (ASD-STE100). It's a writing standard the aerospace industry built so maintenance manuals can't be misread.

Its main rules are simple: short sentences, one idea per sentence, active voice, and words with only one meaning. Put this in your preferences or your CLAUDE.md file so it applies every time. Keep in mind that STE makes sentences clearer, not answers shorter. For shorter answers, change Claude's response style too.

- **In the Claude app:** pick the "Concise" style from the tools menu in a chat
- **In Claude Code:** type `/output-style` and choose "Concise"
- **For your own rules:** add a line like *"Write in ASD-STE100 Simplified Technical English"* to your preferences or CLAUDE.md
- Lowering Claude's effort setting doesn't make it talk less. Ask for shorter answers directly

<a id="compaction"></a>

## 8. Compact on purpose, not when you run out

Compaction shrinks a long chat into a short summary so Claude can keep going with a fresh context window. Claude Code does this on its own when the window is nearly full, but by then you're already deep in the [dumb zone](#dumb-zone), and the summary is written by a model that's already struggling. Dex Horthy calls the better habit [intentional compaction](https://www.youtube.com/watch?v=rmvDxxNubIg&t=448s): you choose when it happens.

The best moment is right after Claude gets a result you're happy with. Type `/compact` followed by what to keep. Tell it to focus on what worked and the results, and to drop the noise, like errors, dead ends, and failed attempts. Claude carries forward only the good parts.

- Compact right after a good result, not when the window is full
- Example: *"/compact Keep the final approach, the decisions we made, and the test results. Drop the failed attempts and error logs."*
- Mistakes left in context can lead Claude to repeat them, so prune them out

# My Agent Lifecycle: A Real Example

The [gotchas](#gotchas) are easier to remember when you see them in action. So let's walk through a real problem, start to finish, using the agent lifecycle I follow on every project: **Goal, Plan, Tools, Implementation, and Verification.**

Here's the problem. Each active user on our platform creates 200 pieces of content a week. We want more. Let's see how Claude gets us there.

<a id="goal"></a>

## 1. Goal

The goal is one fixed number: **grow weekly content per active user from 200 to 206, a 3% lift.** It doesn't change during the project. Every agent, every idea, and every result gets checked against it.

A vague goal like "get users to create more" lets anything count as progress. A fixed number keeps Claude honest, and it keeps you honest too.

- One number, written down before any work starts
- Every idea must explain how it moves that number
- Every result at the end is measured against it

<a id="plan"></a>

## 2. Plan

<a id="four-agents"></a>

### Four agents gather context

Before deciding what to build, we need to understand what's happening today. That context lives in four places that don't depend on each other, so four agents work on them at the same time. Each one writes its findings into its own workspace file, which keeps every agent's context window small.

Session recordings get an agent of their own. Reading screens takes far more of the context window than reading text, so mixing them with anything else would push that agent into the [dumb zone](#dumb-zone) fast.

- **Agent 1, what users say:** NPS feedback, support tickets, emails, and user calls from Granola or Dovetail
- **Agent 2, what users do:** session recordings from Hotjar
- **Agent 3, how the product is used:** top content types and sources from the data warehouse, split by country, state, language, and organization
- **Agent 4, the outside world:** competitor analysis of popular platforms, plus blunt feedback and popular asks, using search tools like Tavily, Reddit, Google, and X

<a id="program-manager"></a>

### A program manager pulls it together

When the four agents finish, a program manager agent reads only their summaries, not the raw tickets or recordings. So even with a huge amount of data gathered, its context window stays out of the [dumb zone](#dumb-zone). This is the one step that has to wait for the others, which is [Amdahl's law](#agent-teams) in action.

Its instruction file (in Claude Code, a markdown file in the `.claude/agents` folder) tells it to publish the report as a Claude artifact, with diagrams and charts so a huge pile of findings is easy to take in. Every claim must cite its source, so you can check anything while you read. Anthropic's [guide to reducing hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) recommends the same.

- A readable report with charts, not a wall of text
- Every claim links back to the ticket, call, recording, or query it came from
- Top ideas, the findings behind each, and how much of the 6 extra pieces each could add

### You don't have to set this up yourself

That sounds like a lot to set up, but remember [gotcha 4](#learn-capabilities): learn what Claude can do, not how the tool works. Write the plan with one task per agent, and hand it to the program manager.

Ask it to start a separate agent for each task. It spins them up, hands out the work, and messages each agent directly to check progress. You never touch a setting.

- Write the plan once, one task per agent
- Ask: *"Start a separate agent for each task in this plan and coordinate them."*
- Get back one cited report

<a id="tools"></a>

## 3. Tools

Every agent in this story is only as good as what it can reach. [Connectors](#connectors) plug Claude into the tools your team already uses: Granola and Dovetail for calls, Hotjar for recordings, BigQuery and Metabase for data, Storybook for your design system, your CI/CD pipeline for deploys, and Sentry or Grafana for observability.

But more connectors isn't better. Each one [takes up some context window](#connector-bloat), and many can change data, not just read it. So give each agent only the connectors its job needs, and lock them down.

- **Read-only by default:** connect with view-only accounts, and block write actions in each connector's settings
- **Only what's needed:** run `/context` to see what's taking up space
- **Missing an app?** Add it as a custom connector

<a id="implementation"></a>

## 4. Implementation

### Design and get feedback

With the report in hand, the top idea goes to [Claude Design](https://claude.com/product/design). Connect your design system so the screens use your real buttons, colors, and layouts. With the [Storybook MCP server](https://storybook.js.org/docs/ai/mcp/overview), Claude reads your components directly. Markdown files describing your design system work too.

Share the design as an artifact and send the link to your peers. They comment right on it, and you hand those comments to Claude to work through.

- Connect your design system through Storybook or markdown files
- Share the artifact for review and collect comments in one place
- Let Claude work through the feedback

<a id="routines"></a>

### Automate the follow-ups

Peer review means follow-up: design comments, PR reviews, PR comments, and new tasks across several projects. Instead of checking each by hand, set up a [routine](https://code.claude.com/docs/en/web-scheduled-tasks), a saved prompt that runs on a schedule using your connectors.

Cloud routines run on Anthropic's servers, even with your laptop closed. Local ones run on your computer, for work that needs your local files. Either way, you get one summary of everything that needs your attention.

- Check comments on your shared artifacts
- Check PR reviews, PR comments, and tasks assigned to you
- Cloud routines run without asking for approval, so keep their connectors [read-only](#tools)

<a id="team-rules"></a>

### Build with your team's rules

Now the engineering agent takes over. Give it your team's rules in short docs, saved in a [CLAUDE.md file](https://code.claude.com/docs/en/memory#claude-md-files) that Claude reads on every task. It follows your patterns instead of inventing its own.

Start it in a fresh chat with only the final report and the approved design. The research chat is long gone, and so is the [dumb zone](#dumb-zone). When the code is ready, it deploys to your dev environment through your CI/CD connector.

- How to write tests and keep components stateless
- How to use stores for shared data, and how to build hooks or composables
- Which patterns to follow when writing a new API

<a id="verification"></a>

## 5. Verification

### Test on dev

Before anything goes further, the engineering agent writes and runs end-to-end tests, which click through the feature the way a real user would. You also test the feature and the UX yourself on dev.

If something fails, the agent fixes it and runs the tests again. Nothing moves forward until the tests pass and the experience feels right.

- End-to-end tests for the main user flows
- A hands-on UX check on dev
- A person reviews before anything reaches production

### Close the loop with observability

Once it's live, set up another [routine](#routines) that checks your observability tools on a schedule: what failed, what works, and what's slow. That report goes straight back to the engineering agent, which pushes the next fix.

Every round of real data shapes the next version, without you chasing it by hand.

- A routine checks Sentry or Grafana for errors and slow spots
- The engineering agent turns that report into the next change

### Measure against the goal

Finally, back to the number. Reuse the [four agents from the plan](#four-agents), now focused on the new feature. They pull fresh feedback, warehouse data, and recordings, and check how the A/B test is doing against the [goal](#goal) of 206.

Ask Claude to share the results as an artifact with charts, or as a dashboard in your existing analytics tool, like Metabase, through its connector. Now the whole team can track the number on their own.

- Compare the A/B groups against the goal
- Ask Claude whether the difference is big enough to trust, not just whether it went up
- Share results as an artifact or a dashboard

# Tips While It Runs

You don't have to sit and wait while the agents work. In Claude Code, type `/btw` followed by a question to ask something on the side. The main task keeps going, and the side question doesn't take up any [context window](#dumb-zone). If something looks off, send a normal message to steer Claude back on track.

Made a mistake while steering? Press Esc twice to roll back to an earlier checkpoint. One catch: it undoes file edits Claude made, but not things like deleted files or commands it ran in the terminal.

- `/btw` for quick side questions
- A regular message to correct course
- Esc twice to roll back to a checkpoint

# Wrapping Up

That's the whole agent lifecycle. A fixed goal, a plan built on real context, the right tools, an engineering agent that follows your rules, and a verification loop that keeps checking the number.

You don't need to master every tool along the way. Learn what Claude can do, give it a [clear brief](#clear-brief), and let it set up the rest. Your job shifts from doing every step to steering, reviewing, and deciding.

- **[Goal](#goal):** 200 to 206 pieces per active user a week
- **[Plan](#plan):** four agents gather context, a program manager writes the cited report
- **[Tools](#tools):** read-only connectors, only the ones each agent needs
- **[Implementation](#implementation):** design, review, and build with your team's rules
- **[Verification](#verification):** E2E tests, observability, warehouse data, and A/B results
