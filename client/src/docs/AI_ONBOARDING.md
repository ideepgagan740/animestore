# AI Onboarding Guide

## Fast Mental Model
- `src/app` owns routes only.
- `src/modules` owns business features.
- `src/shared` owns reusable UI and helpers.
- `src/infrastructure` owns concrete adapters like Axios.
- `src/store` composes global Redux slices.

## How To Add A Feature
1. Create `src/modules/<feature>` with api, components, hooks, services, store, types, utils, validators, tests, and README.
2. Export cross-feature contracts from `src/modules/<feature>/index.ts`.
3. Add server-state hooks with TanStack Query.
4. Add Redux only for auth, cart, UI, or truly global client state.
5. Add route files under `src/app` that compose the feature page.
6. Run `npm run precommit:check`.

## How To Safely Refactor Modules
1. Identify the owning feature and public API.
2. Move internals without changing public exports first.
3. Update tests for the module.
4. Run boundary and circular dependency checks.
5. Update diagrams and README files with `npm run update-docs`.

## AI Agent Rules
- Do not place secrets in frontend env variables.
- Do not import another feature module's private folders.
- Keep generated code small, typed, and documented.
- Prefer existing patterns before introducing new libraries.
