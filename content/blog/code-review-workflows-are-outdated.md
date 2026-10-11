---
title: Code review workflows are outdated
date: 2026-10-11
description: Why the GitHub pull request experience is incomplete.
tags: [software, code-review, codesloth]
project: codesloth
cover: /projects/codesloth/01-hero.png
---

# What are code reviews?

It's a peer review process of the code changes you are going to deploy which is going to impact millions of users.

# Why are code reviews needed?

One might think, this one line change is not going to do anything, but it might lead to the next memory leak which crashes production during a critical product demo and leads to a loss of 100k in new revenue.

Especially post AI, [code churn rate has skyrocketed](https://www.gitclear.com/the_ai_code_quality_maintainability_gap). One might think I can always redo this, rewrite this, that’s more story points wasted on the same problem with another review cycle.

# Problems with current code review process

A PR is a result of:
1. Multiple agent iterations
2. User feedback
3. Bug fixes
4. Rewrites post proof reading
5. Performance fixes
6. Dead code cleanup

It’s unfair to expect someone to review this whole SDLC, understand context, think of potential bugs and improvements.

You open GitHub PR view, and its just a bunch of text, config, comments and just a lot of cognitive load.

# How I plan to solve this

Meet CodeSloth. It orders your PRs into a story via AST parsing, SFC compilation etc and paints a picture on which modules need to be reviewed first and slowly build context and opinion.

![Every pull request is a story](/projects/codesloth/02-story.png)

![One step at a time](/projects/codesloth/03-one-step.png)

CodeSloth shows critical, at risk changes like config updates, migrations etc

![Catch what breaks after tests pass](/projects/codesloth/05-risky-changes.png)

With every change, it builds a timeline of commits which lead to this point. Commit messages are now generally readable and good because of AI agents.

![See how each file got here](/projects/codesloth/04-commit-story.png)

You can also see a graph of how each change affects upstream modules.

![See how it all connects](/projects/codesloth/06-graph.png)

**Demo link:** [YouTube Demo](https://www.youtube.com/watch?v=NoZFZuZq0Wk)
