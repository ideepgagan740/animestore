#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const srcRoot = path.join(root, 'src');
const docsRoot = path.join(srcRoot, 'docs');

const folderPurpose = {
  app: 'Next.js App Router entrypoints, route segments, layouts, and metadata.',
  core: 'Framework-independent domain primitives, enterprise rules, and app-level errors.',
  shared: 'Reusable UI, utilities, and primitives that are safe across all modules.',
  modules: 'Feature-first modules that own UI, state, API calls, types, tests, and rules for one business capability.',
  services: 'Application service facades that coordinate reusable API clients and integrations.',
  infrastructure: 'Concrete adapters for HTTP, browser storage, analytics, and external tools.',
  store: 'Global Redux Toolkit setup for auth, cart, and cross-feature UI state.',
  hooks: 'Global hooks that are not owned by one feature module.',
  providers: 'React provider composition for query cache, Redux, theme, error handling, and notifications.',
  layouts: 'Reusable page layout shells and responsive composition patterns.',
  styles: 'Global CSS, Tailwind variables, theme tokens, and reset styles.',
  types: 'Cross-cutting TypeScript contracts shared by multiple areas.',
  config: 'Environment and runtime configuration wrappers.',
  utils: 'Small generic helper functions with no business ownership.',
  constants: 'Stable app constants such as routes and feature flags.',
  tests: 'Global test setup, mocks, fixtures, and integration helpers.',
  docs: 'Human and AI-readable architecture guides, diagrams, and change history.',
};

function walkDirs(dir, result = []) {
  if (!fs.existsSync(dir)) return result;
  result.push(dir);
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) walkDirs(fullPath, result);
  }
  return result;
}

function listFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((item) => fs.statSync(path.join(dir, item)).isFile() && item !== 'README.md')
    .sort();
}

function inferPurpose(relativePath) {
  const parts = relativePath.split(path.sep).filter(Boolean);
  const key = parts[0];
  const leaf = parts[parts.length - 1];

  if (parts[0] === 'modules' && parts.length === 1) return folderPurpose.modules;
  if (parts[0] === 'modules' && parts.length === 2) return `Feature module for ${parts[1]} business capability. It owns its internal API, UI, state, types, tests, and documentation.`;
  if (parts[0] === 'modules' && parts.length > 2) return `${leaf} area for the ${parts[1]} feature module.`;

  return folderPurpose[key] ?? `Project folder for ${leaf} concerns.`;
}

function generateReadme(dir) {
  const relative = path.relative(srcRoot, dir).replace(/\\/g, '/') || 'src';
  const files = listFiles(dir);
  const purpose = relative === 'src' ? 'Frontend source root for the Anime Store enterprise application.' : inferPurpose(path.relative(srcRoot, dir));
  const fileList = files.length ? files.map((file) => `- \`${file}\`: See the filename and local imports for specific responsibility.`).join('\n') : '- No source files yet. Add files only when this folder owns the responsibility.';

  return `# ${relative}

## Purpose
${purpose}

## Responsibilities
- Keep code focused on this folder's ownership.
- Prefer small composable files with explicit exports.
- Keep business rules separate from framework and infrastructure concerns.

## File Explanations
${fileList}

## Data Flow
- UI events enter components or route pages.
- Feature hooks call APIs, services, or stores.
- Server state stays in TanStack Query; UI and global client state stay in Redux Toolkit.
- Shared helpers stay framework-light and reusable.

## State Flow
- Server state: TanStack Query hooks inside feature modules.
- Global UI/auth/cart state: Redux slices composed in \`src/store\`.
- Local component state: React state near the component that needs it.

## Dependency Rules
- Feature internals can import shared, core, services, infrastructure, config, utils, constants, and their own module.
- Feature internals must not import another module's internals. Use that module's \`index.ts\` public API.
- Shared and core must not depend on feature modules.
- Avoid circular dependencies and hidden side effects.

## Naming Conventions
- Components use PascalCase and \`.tsx\`.
- Hooks start with \`use\`.
- Types use descriptive names and may use \`.types.ts\`.
- Tests live beside the owning module inside \`tests\`.

## Extension Strategy
- Add new behavior in the narrowest owning folder.
- Promote code to \`shared\` only after at least two modules need it.
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
\`\`\`ts
// Good: import from a public module API when crossing feature boundaries.
import { ProductCard } from '@modules/products';
\`\`\`
`;
}

function generateArchitectureDocs() {
  fs.mkdirSync(docsRoot, { recursive: true });

  const architecture = `# Frontend Architecture

The frontend uses Feature-Driven Modular Architecture with Clean Architecture concepts adapted for React and Next.js.

## Application Architecture

\`\`\`mermaid
flowchart TD
  App[Next.js App Router] --> Providers[Global Providers]
  Providers --> Layouts[Layouts]
  Layouts --> Modules[Feature Modules]
  Modules --> Shared[Shared Design System]
  Modules --> Query[TanStack Query Server State]
  Modules --> Store[Redux Toolkit Client State]
  Modules --> Services[API Services]
  Services --> Infrastructure[Axios Infrastructure]
  Infrastructure --> Backend[Anime Store Backend API]
\`\`\`

## Request Lifecycle

\`\`\`mermaid
sequenceDiagram
  participant UI as Component
  participant Hook as Feature Hook
  participant Query as TanStack Query
  participant API as API Client
  participant Axios as Axios Adapter
  participant BE as Backend
  UI->>Hook: user action or render
  Hook->>Query: query/mutation
  Query->>API: execute typed API call
  API->>Axios: HTTP request
  Axios->>BE: /api endpoint
  BE-->>Axios: response
  Axios-->>API: normalized data/error
  API-->>Query: typed result
  Query-->>UI: cached state update
\`\`\`

## State Management Flow

\`\`\`mermaid
flowchart LR
  ServerState[Server State] --> TanStack[TanStack Query]
  AuthState[Auth State] --> Redux[Redux Toolkit]
  CartState[Cart State] --> Redux
  UIState[Toast/Theme/UI] --> Redux
  ComponentState[Component-only State] --> ReactState[React useState/useReducer]
\`\`\`

## Authentication Flow

\`\`\`mermaid
sequenceDiagram
  participant User
  participant LoginForm
  participant useLogin
  participant AuthAPI
  participant TokenStore
  participant Redux
  User->>LoginForm: submit credentials
  LoginForm->>useLogin: mutate
  useLogin->>AuthAPI: POST /auth/login
  AuthAPI-->>useLogin: session
  useLogin->>TokenStore: store access token
  useLogin->>Redux: set user
  Redux-->>LoginForm: authenticated UI
\`\`\`

## Feature Communication

\`\`\`mermaid
flowchart TD
  Products[products module] -->|public export only| Cart[cart module]
  Auth[auth module] --> Store[global store]
  Cart --> Store
  Products --> Query[TanStack Query]
  Modules[All modules] --> Shared[shared UI]
\`\`\`

## Dependency Direction

\`\`\`mermaid
flowchart BT
  Infrastructure --> Services
  Services --> Modules
  Store --> Modules
  Shared --> Modules
  Core --> Modules
  Modules --> App
\`\`\`
`;

  const onboarding = `# AI Onboarding Guide

## Fast Mental Model
- \`src/app\` owns routes only.
- \`src/modules\` owns business features.
- \`src/shared\` owns reusable UI and helpers.
- \`src/infrastructure\` owns concrete adapters like Axios.
- \`src/store\` composes global Redux slices.

## How To Add A Feature
1. Create \`src/modules/<feature>\` with api, components, hooks, services, store, types, utils, validators, tests, and README.
2. Export cross-feature contracts from \`src/modules/<feature>/index.ts\`.
3. Add server-state hooks with TanStack Query.
4. Add Redux only for auth, cart, UI, or truly global client state.
5. Add route files under \`src/app\` that compose the feature page.
6. Run \`npm run precommit:check\`.

## How To Safely Refactor Modules
1. Identify the owning feature and public API.
2. Move internals without changing public exports first.
3. Update tests for the module.
4. Run boundary and circular dependency checks.
5. Update diagrams and README files with \`npm run update-docs\`.

## AI Agent Rules
- Do not place secrets in frontend env variables.
- Do not import another feature module's private folders.
- Keep generated code small, typed, and documented.
- Prefer existing patterns before introducing new libraries.
`;

  const quality = `# Quality System

## Pre-Commit Pipeline

\`\`\`mermaid
flowchart TD
  Commit[git commit] --> Docs[npm run update-docs]
  Docs --> Staged[lint-staged]
  Staged --> Types[npm run typecheck]
  Types --> Tests[npm run test]
  Tests --> Circular[npm run validate:deps]
  Circular --> Boundaries[npm run validate:boundaries]
  Boundaries --> CommitAllowed[commit allowed]
\`\`\`

## Checks
- ESLint detects unsafe code and architectural import mistakes.
- Prettier keeps formatting consistent.
- TypeScript blocks type regressions.
- Jest validates components and feature services.
- Madge detects circular dependencies.
- Boundary script prevents private cross-feature imports.
`;

  fs.writeFileSync(path.join(docsRoot, 'ARCHITECTURE.md'), architecture);
  fs.writeFileSync(path.join(docsRoot, 'AI_ONBOARDING.md'), onboarding);
  fs.writeFileSync(path.join(docsRoot, 'QUALITY_SYSTEM.md'), quality);
}

for (const dir of walkDirs(srcRoot)) {
  fs.writeFileSync(path.join(dir, 'README.md'), generateReadme(dir));
}

generateArchitectureDocs();
console.log('Documentation updated for src folders and docs diagrams.');
