# Anime Store Frontend

Production-grade enterprise frontend for the Anime Store built with Next.js App Router, React, TypeScript, Tailwind CSS, Redux Toolkit, TanStack Query, Storybook, Jest, Husky, and AI-readable documentation.

## Architecture

This frontend follows Feature-Driven Modular Architecture with Clean Architecture principles adapted for UI applications.

```txt
src/
├── app/             # Next.js routes and route composition
├── core/            # Framework-light domain primitives and errors
├── shared/          # Reusable design system and generic UI
├── modules/         # Isolated feature modules
├── services/        # Application API facades
├── infrastructure/  # Axios and external adapters
├── store/           # Redux Toolkit global state
├── hooks/           # Global reusable hooks
├── providers/       # React provider composition
├── layouts/         # Page shells and responsive layouts
├── styles/          # Tailwind and global theme tokens
├── types/           # Cross-cutting TypeScript contracts
├── config/          # Environment wrappers
├── utils/           # Generic helpers
├── constants/       # Stable constants
├── tests/           # Shared test utilities
└── docs/            # Generated architecture documentation
```

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The frontend runs on `http://localhost:5000` so the backend can keep using `http://localhost:3000`.

## Main Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test
npm run storybook
npm run precommit:check
npm run update-docs
```

## Feature Rules

- Add business features inside `src/modules/<feature>`.
- Keep feature internals private unless exported from `src/modules/<feature>/index.ts`.
- Use TanStack Query for server state.
- Use Redux Toolkit for auth, cart, global UI, and truly global client state.
- Use `src/shared/ui` for reusable atomic design system components.
- Never store secrets in frontend env variables, especially `NEXT_PUBLIC_*`.

## Backend Integration

- API base URL: `NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api`
- Backend CORS should allow `http://localhost:5000` during local development.
- Route contract details live in `src/docs/API_INTEGRATION.md`.

## Documentation

- Run `npm run update-docs` to regenerate folder README files and Mermaid architecture docs.
- See `src/docs/ARCHITECTURE.md`, `src/docs/AI_ONBOARDING.md`, and `src/docs/QUALITY_SYSTEM.md` after generation.
