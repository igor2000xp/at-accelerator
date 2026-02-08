# System Patterns

## Architecture
- **Framework**: Angular 18 with an NgModule-based root app; some features use standalone components.
- **State Management**: Angular Signals for reactive state and data flow.
- **Services**: Dedicated services for API interaction (`ApiService`) and favorites CRUD (`FavCrudService` + `LocalStorageService`).
- **Networking**: Functional HTTP interceptor prepends the Episodate base URL and centralizes error handling.
- **Routing**: App routing module provides search and favorites routes.

## Key Decisions

- **Decision**: Use a mixed NgModule + standalone component approach.
  - **Reason**: Root app and routing are module-based, while reusable UI (e.g., table) and pages (search) are standalone.
  - **Consequence**: Some components are declared in modules while others are imported directly.

- **Decision**: Use Angular Signals.
  - **Reason**: Provides fine-grained reactivity and better performance than Zone.js-heavy approaches.
  - **Consequence**: State updates are more explicit and predictable.

- **Decision**: Local Storage for Persistence.
  - **Reason**: Meets the requirement for a "personal list" without needing a backend database.
  - **Consequence**: Data is local to the device/browser; favorites are written and rehydrated on load.

- **Decision**: Global API error handling via interceptor.
  - **Reason**: Ensures a consistent user experience when API calls fail.
  - **Consequence**: Centralized error handling in the HTTP interceptor.
