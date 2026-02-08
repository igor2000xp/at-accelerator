# System Patterns

## Architecture
- **Framework**: Angular (Standalone Components).
- **State Management**: Angular Signals for reactive state and data flow.
- **Services**: Clean separation of concerns with dedicated services for API interaction (`TvMazeService`) and state (`FavoritesService`?).

## Key Decisions

- **Decision**: Use Standalone Components.
  - **Reason**: Simplifies architecture, reduces boilerplate (no NgModules), and aligns with modern Angular best practices.
  - **Consequence**: All components must import their dependencies directly.

- **Decision**: Use Angular Signals.
  - **Reason**: Provides fine-grained reactivity and better performance than Zone.js-heavy approaches.
  - **Consequence**: State updates are more explicit and predictable.

- **Decision**: Local Storage for Persistence.
  - **Reason**: Meets the requirement for a "personal list" without needing a backend database.
  - **Consequence**: Data is local to the device/browser.

- **Decision**: OnPush Change Detection.
  - **Reason**: Improves performance by reducing unnecessary change detection cycles.
  - **Consequence**: Components must rely on Observables/Signals or immutable data inputs.

- **Decision**: Global Error Handling.
  - **Reason**: Ensures a consistent user experience even when API calls fail.
  - **Consequence**: Usage of `HttpInterceptor` or global `ErrorHandler`.
