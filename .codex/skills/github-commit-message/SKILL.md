---
name: github-commit-message
description: Draft concise Git commit messages based on the current repository changes before committing. Use when a user asks to create or refine a commit message from `git status`/`git diff` (staged or unstaged changes).
---

# GitHub Commit Message

## Overview
Create a clear, imperative summary line (50-72 chars target) and an optional body from the current repo changes, preferring staged changes when present.

## Workflow
1. Inspect changes with `git status --porcelain`.
2. Prefer staged changes (`git diff --staged`). If no staged changes exist, use working tree changes (`git diff`).
3. Identify a primary scope (single top-level folder or file) and dominant change type (add, remove, update, rename).
4. Draft a one-line summary in imperative mood.
5. If needed, add a short body with 1-3 bullets describing key changes or affected areas.

## Quick Start
Run the script to generate a draft message:

```bash
python3 ./.specsmd/aidlc/skills/github-commit-message/scripts/draft_commit_message.py
```

The script prints:
- Suggested summary line
- Optional body (bulleted) when multiple files or mixed change types

## Output Guidelines
- Use imperative verbs: Add, Update, Remove, Fix, Rename, Refactor.
- Keep the first line <= 72 chars when possible.
- Avoid redundant words like "commit" or "changes".
- If changes span multiple areas, use a broad scope (e.g., "Update multiple areas").

## Resources
### scripts/
- `draft_commit_message.py`: Analyzes git status/diff and prints a draft commit message.
