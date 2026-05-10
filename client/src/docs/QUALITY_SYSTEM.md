# Quality System

## Pre-Commit Pipeline

```mermaid
flowchart TD
  Commit[git commit] --> Docs[npm run update-docs]
  Docs --> Staged[lint-staged]
  Staged --> Types[npm run typecheck]
  Types --> Tests[npm run test]
  Tests --> Circular[npm run validate:deps]
  Circular --> Boundaries[npm run validate:boundaries]
  Boundaries --> CommitAllowed[commit allowed]
```

## Checks
- ESLint detects unsafe code and architectural import mistakes.
- Prettier keeps formatting consistent.
- TypeScript blocks type regressions.
- Jest validates components and feature services.
- Madge detects circular dependencies.
- Boundary script prevents private cross-feature imports.
