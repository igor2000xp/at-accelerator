---
name: git-commit
description: Stage git changes and draft commit messages (do not run git commit). Use when the user wants help preparing a commit, asks for a commit message, or uses the /commit trigger. Emphasize staging files, reviewing diffs, and producing a concise, accurate message.
---

# Git Commit

## Overview

Prepare a clean git commit by reviewing changes, staging the right files, and drafting a concise commit message. Do not create the commit unless the user explicitly asks.

## Workflow

1. Inspect repository state
2. Select what to stage
3. Stage files
4. Draft commit message

## Repo-Specific Commit Conventions

Follow a Conventional Commits-style format based on repo examples:

`type(scope?): subject`

- Use a lowercase `type` like `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- `scope` is optional and should be short (feature, package, or area).
- Keep the subject imperative and concise, no trailing period.
- Add a body only when it clarifies what/why; use short bullet lines.

If uncertain about scope or type, ask the user which they prefer.

### 1. Inspect repository state

Run `git status -sb` and `git diff` (and `git diff --staged` if needed) to understand what changed. If the repo is large, limit diffs to files relevant to the user’s request.

If there are untracked files, confirm whether they should be included. If there are generated or build artifacts, avoid staging them unless the user explicitly asks.

### 2. Select what to stage

Prefer staging only the files relevant to a single logical change. If there are multiple unrelated changes, propose splitting into separate commits and ask which scope to stage first.

### 3. Stage files

Use explicit adds (e.g., `git add path/to/file`) rather than `git add -A` unless the user explicitly wants everything staged. After staging, re-check `git status -sb` to confirm.

Never run `git commit` in this skill. If the user asks for a commit, confirm and then proceed only with their explicit approval.

### 4. Draft commit message

Draft a concise, imperative summary line (50-72 chars target). Add a short body only when it improves clarity (what/why). If the user or repo uses a convention (e.g., Conventional Commits), follow it; otherwise, ask whether they want one.

When the user uses `/commit`, respond with:

- A brief summary of staged changes
- 2-3 candidate commit messages
- The exact staging commands that were run

Avoid inventing change details. Base messages on actual diffs.
