# Tech Context

## Technology Stack
- **Frontend Framework**: Angular 18.1.2
- **Language**: TypeScript 5.4.5
- **Styling**: mini.css v3.0.1 (Minimalist, responsive CSS framework)
- **Package Manager**: npm
- **Build Tool**: Angular CLI 18.1.2

## Development Environment
- **IDE**: Cursor AI
- **AI Configuration**: 
  - `AGENTS.md`: Defines Agent roles and Memory Bank rules.
  - `.cursorrules`: enforcing Angular best practices (Standalone, OnPush, Signals).

## Key Constraints
- **Public API**: Depends on Episodate API (`https://www.episodate.com/api/`). Rate limits and uptime are external factors.
- **No Backend**: Favorites persistence is strictly client-side (Local Storage).

## Commands
- **Serve**: `npm run start` (or `ng serve`)
- **Build**: `npm run build` (or `ng build`)
- **Test**: `npm run test` (Karma/Jasmine)
- **Lint**: `npm run lint`
