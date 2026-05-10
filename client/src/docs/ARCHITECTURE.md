# Frontend Architecture

The frontend uses Feature-Driven Modular Architecture with Clean Architecture concepts adapted for React and Next.js.

## Application Architecture

```mermaid
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
```

## Request Lifecycle

```mermaid
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
```

## State Management Flow

```mermaid
flowchart LR
  ServerState[Server State] --> TanStack[TanStack Query]
  AuthState[Auth State] --> Redux[Redux Toolkit]
  CartState[Cart State] --> Redux
  UIState[Toast/Theme/UI] --> Redux
  ComponentState[Component-only State] --> ReactState[React useState/useReducer]
```

## Authentication Flow

```mermaid
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
```

## Feature Communication

```mermaid
flowchart TD
  Products[products module] -->|public export only| Cart[cart module]
  Auth[auth module] --> Store[global store]
  Cart --> Store
  Products --> Query[TanStack Query]
  Modules[All modules] --> Shared[shared UI]
```

## Dependency Direction

```mermaid
flowchart BT
  Infrastructure --> Services
  Services --> Modules
  Store --> Modules
  Shared --> Modules
  Core --> Modules
  Modules --> App
```
