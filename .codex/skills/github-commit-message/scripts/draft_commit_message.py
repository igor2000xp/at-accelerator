#!/usr/bin/env python3
import subprocess
import sys
from collections import Counter
from pathlib import Path


def run(cmd: list[str]) -> str:
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"Command failed: {' '.join(cmd)}\n{result.stderr.strip()}")
    return result.stdout


def get_status() -> list[str]:
    output = run(["git", "status", "--porcelain"])
    return [line for line in output.splitlines() if line.strip()]


def parse_paths(status_lines: list[str]) -> list[str]:
    paths: list[str] = []
    for line in status_lines:
        # Porcelain format: XY <path> (or XY <path> -> <path>)
        if " -> " in line:
            path = line.split(" -> ")[-1].strip()
        else:
            path = line[3:].strip()
        if path:
            paths.append(path)
    return paths


def top_level_scope(paths: list[str]) -> str:
    if not paths:
        return ""
    tops = [p.split("/")[0] for p in paths]
    top_counts = Counter(tops)
    top, count = top_counts.most_common(1)[0]
    if len(top_counts) == 1:
        return top
    if count >= max(2, len(paths) // 2):
        return top
    return "multiple areas"


def change_type(status_lines: list[str]) -> str:
    # Prefer specific verbs when a single type dominates.
    types: list[str] = []
    for line in status_lines:
        x, y = line[0], line[1]
        code = x if x != " " else y
        if code == "A":
            types.append("add")
        elif code == "D":
            types.append("remove")
        elif code == "R":
            types.append("rename")
        else:
            types.append("update")
    if not types:
        return "update"
    counts = Counter(types)
    most, count = counts.most_common(1)[0]
    if count == len(types):
        return most
    return "update"


def diff_exists(staged: bool) -> bool:
    cmd = ["git", "diff", "--staged", "--name-only"] if staged else ["git", "diff", "--name-only"]
    output = run(cmd).strip()
    return bool(output)


def main() -> int:
    try:
        status_lines = get_status()
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        return 1

    if not status_lines:
        print("No changes detected. Create changes before drafting a commit message.")
        return 0

    use_staged = diff_exists(staged=True)
    scope_paths = parse_paths(status_lines)
    scope = top_level_scope(scope_paths)
    verb = change_type(status_lines).capitalize()

    if not use_staged:
        print("Note: No staged changes. Draft is based on unstaged changes.\n")

    if scope:
        summary = f"{verb} {scope}"
    else:
        summary = f"{verb} changes"

    print("Suggested summary:")
    print(summary)

    if len(scope_paths) > 1:
        print("\nOptional body:")
        for path in sorted(scope_paths)[:10]:
            print(f"- {path}")
        if len(scope_paths) > 10:
            print(f"- ...and {len(scope_paths) - 10} more")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
