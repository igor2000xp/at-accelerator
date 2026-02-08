# Tech Context

## Technology Stack
- **Frontend Framework**: Angular 18.1.2
- **Language**: TypeScript 5.4.5
- **Styling**: mini.css v3.0.1 (Minimalist, responsive CSS framework)
- **Package Manager**: npm
- **Build Tool**: Angular CLI

## Development Environment
- **IDE**: Cursor AI
- **AI Configuration**: 
  - `AGENTS.md`: Defines Agent roles and Memory Bank rules.
  - `.cursorrules`: enforcing Angular best practices (Standalone, OnPush, Signals).

## Key Constraints
- **Public API**: Depends on Episodate API (`https://www.episodate.com/api/`). Rate limits and uptime are external factors.
- **No Backend**: Review "Favorites" persistence is strictly client-side (Local Storage).

## Commands
- **Serve**: `ng serve`
- **Build**: `ng build`
- **Test**: `ng test` (Karma/Jasmine)
- **Lint**: `ng lint`
