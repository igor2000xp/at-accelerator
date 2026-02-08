[PROFILE: STRICT_MEMORY_BANK_MODE=ON]

# AI Agents and Tools Configuration

This document outlines the AI agents and tools configured for the `at-accelerator` project to enhance development workflow, code quality, and maintenance.

## Primary Agent: Cursor AI

**Role**: Main intelligent coding assistant.

*   **Capabilities**:
    *   Context-aware code generation and refactoring.
    *   real-time debugging and error resolution.
    *   Natural language codebase querying.
*   **Configuration**:
    *   Defined in `.cursorrules` (located in project root).
    *   Excludes files listed in `.cursorignore`.
*   **Usage**: Interact via the Cursor IDE Chat or Composer features.

## Support Agent: Context7

**Role**: Specialized knowledge base for Angular components.

*   **Capabilities**: Provides specific rules and best practices for Angular component development.
*   **Integration**:
    *   Rules file: `docs/angular-rules/context7-components.mdc`.
    *   Referenced in `.cursorrules` to augment Cursor AI's knowledge.
*   **Source**: [Context7 Angular Components](https://context7.com/angular/components)

## Tooling Agents

### Angular CLI
**Role**: Standard project scaffolding and management tool.
*   **Capabilities**: Generates components, services, and other artifacts following Angular best practices.
*   **Usage**: `ng generate ...`

### Automation Scripts
**Role**: Project setup and maintenance automation.
*   **Script**: `scripts/setup-ai-workflow.sh`
*   **Function**: Automates the setup of the AI workflow, including directory structure creation, rule file downloading, and configuration generation.

# [MEMORY BANK: ACTIVE] Codex Memory Instructions

THIS SECTION IS MANDATORY FOR EVERY SESSION AND EVERY TASK.

## [MEMORY BANK: LOCATION]

- This project uses a file-based Memory Bank.
- Memory Bank root directory:
  - `memory-bank/`
- Structure:
  - `memory-bank/projectbrief.md`
  - `memory-bank/productContext.md`
  - `memory-bank/systemPatterns.md`
  - `memory-bank/techContext.md`
  - `memory-bank/activeContext.md`
  - `memory-bank/progress.md`

If any of these files are missing, you MUST explicitly tell the user and offer to create them before proceeding.

---

## [MEMORY BANK: REQUIRED STARTUP RITUAL]

BEFORE EXECUTING ANY TASK YOU MUST:

1. Find and read ALL of the following files (if they exist):
   - `memory-bank/projectbrief.md`
   - `memory-bank/productContext.md`
   - `memory-bank/systemPatterns.md`
   - `memory-bank/techContext.md`
   - `memory-bank/activeContext.md`
   - `memory-bank/progress.md`
2. Form an up-to-date picture of:
   - what the project is,
   - how it is architected,
   - what technical constraints exist,
   - what is currently being worked on,
   - what progress has been made and what decisions have been made.
3. Only then proceed to analyze the user's request and make code changes.

IF YOU CANNOT READ THESE FILES, YOU MUST NOTIFY THE USER.

---

## [MEMORY BANK: WRITE RULES]

You MUST update the Memory Bank upon any significant changes.

- You CANNOT invent facts.
- You record only:
  - confirmed info from code/config,
  - explicit user instructions,
  - logical deductions from existing documentation.

### [MEMORY BANK: projectbrief.md]

- Update when there are changes to:
  - high-level product purpose,
  - major system structure,
  - target audience or key goals.
- Record the essence of the change concisely.

### [MEMORY BANK: productContext.md]

- Update upon changes in:
  - business requirements,
  - use cases,
  - UX expectations.
- Describe in business language, not implementation details.

### [MEMORY BANK: systemPatterns.md]

- Update upon:
  - new architectural patterns or layer/module changes,
  - changes to Angular, RxJS, state-management rules,
  - any "code agreements" affecting the whole project.
- For important decisions use the format:
  - "Decision: ..."
  - "Reason: ..."
  - "Consequence: ..."

### [MEMORY BANK: techContext.md]

- Update upon:
  - version updates for Angular/Node/TS/key libs,
  - changes to scripts/commands (build, test, lint, e2e),
  - infrastructure changes (CI/CD, environments, integrations).
- Always ensure commands and versions are current.

### [MEMORY BANK: activeContext.md]

THIS IS THE MAIN FILE OF THE CURRENT FOCUS.

- Update:
  - at the start of a new task – what we are doing, in which branch, what questions exist,
  - after each significant step – what is done and what remains.
- The content of `activeContext.md` must make it clear what the project is doing right now.

### [MEMORY BANK: progress.md]

THIS IS THE CHRONOLOGICAL LOG OF PROGRESS AND DECISIONS.

- Update:
  - after each completed task/subtask,
  - after making important decisions (architectural, product, technical).
- Use format:
  - `[YYYY-MM-DD] Done: ...`
  - `[YYYY-MM-DD] Decision: ... (reason: ...)`

---

## [MEMORY BANK: DURING TASK]

During task execution:

- If the user explicitly asks "update memory / memory bank / project context":
  - First briefly summarize changes in the reply to the user.
  - Then update the corresponding files (`activeContext.md`, `progress.md`, others if needed).
- If you see that information in the Memory Bank is outdated or contradictory:
  - EXPLICITLY point this out to the user.
  - Propose a fix plan.
  - After agreement, update the necessary files.

---

## [MEMORY BANK: RESTRICTIONS]

YOU DO NOT HAVE THE RIGHT TO:

- Create new Memory Bank files/directories without a direct user request.
- Delete or clear existing Memory Bank files without explicit permission.
- Store disposable drafts, temporary TODOs, and diagnostic noise in the Memory Bank.
- Ignore this section of AGENTS.md — it has high priority and is mandatory for execution.
