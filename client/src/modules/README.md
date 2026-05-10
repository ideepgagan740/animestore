# modules

## Purpose
Feature-first modules that own UI, state, API calls, types, tests, and rules for one business capability.

## Responsibilities
- Keep code focused on this folder's ownership.
- Prefer small composable files with explicit exports.
- Keep business rules separate from framework and infrastructure concerns.

## File Explanations
- No source files yet. Add files only when this folder owns the responsibility.

## Data Flow
- UI events enter components or route pages.
- Feature hooks call APIs, services, or stores.
- Server state stays in TanStack Query; UI and global client state stay in Redux Toolkit.
- Shared helpers stay framework-light and reusable.

## State Flow
- Server state: TanStack Query hooks inside feature modules.
- Global UI/auth/cart state: Redux slices composed in `src/store`.
- Local component state: React state near the component that needs it.

## Dependency Rules
- Feature internals can import shared, core, services, infrastructure, config, utils, constants, and their own module.
- Feature internals must not import another module's internals. Use that module's `index.ts` public API.
- Shared and core must not depend on feature modules.
- Avoid circular dependencies and hidden side effects.

## Naming Conventions
- Components use PascalCase and `.tsx`.
- Hooks start with `use`.
- Types use descriptive names and may use `.types.ts`.
- Tests live beside the owning module inside `tests`.

## Extension Strategy
- Add new behavior in the narrowest owning folder.
- Promote code to `shared` only after at least two modules need it.
- Add README details when introducing new patterns or dependencies.

## Do's and Don'ts
- Do keep imports explicit and architecture boundaries clean.
- Do update tests and docs when behavior changes.
- Don't put secrets in frontend environment variables.
- Don't bypass the API layer from components.

## Common Mistakes
- Mixing server state into Redux instead of TanStack Query.
- Importing another feature's private files.
- Adding generic components to a feature when they belong in shared UI.

## Example Usage
```ts
// Good: import from a public module API when crossing feature boundaries.
import { ProductCard } from '@modules/products';
```
