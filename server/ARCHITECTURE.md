# Architecture Documentation

## Clean Architecture Overview

```mermaid
graph TB
    subgraph "Presentation Layer"
        A[REST API Controllers]
        B[Routes]
        C[Middleware]
        D[DTOs]
    end

    subgraph "Application Layer"
        E[Use Cases]
        F[Application Services]
        G[DTOs]
    end

    subgraph "Domain Layer"
        H[Entities]
        I[Value Objects]
        J[Repository Interfaces]
        K[Business Rules]
    end

    subgraph "Infrastructure Layer"
        L[MongoDB Repositories]
        M[Redis Cache]
        N[External Services]
        O[Configuration]
    end

    subgraph "Shared Layer"
        P[Types]
        Q[Utils]
        R[Constants]
        S[Errors]
    end

    A --> E
    B --> A
    C --> A
    D --> E

    E --> H
    E --> I
    E --> J
    F --> E
    G --> E

    H --> K
    I --> K

    L --> J
    M --> J
    N --> F
    O --> N

    P --> A
    P --> E
    P --> H
    P --> L
    Q --> A
    Q --> E
    R --> A
    R --> E
    S --> A
    S --> E
```

## Request Lifecycle

```mermaid
sequenceDiagram
    participant Client
    participant Router
    participant Middleware
    participant Controller
    participant UseCase
    participant Repository
    participant Database

    Client->>Router: HTTP Request
    Router->>Middleware: Validate & Auth
    Middleware->>Controller: Process Request
    Controller->>UseCase: Execute Business Logic
    UseCase->>Repository: Data Access
    Repository->>Database: Query/Store
    Database-->>Repository: Data
    Repository-->>UseCase: Domain Entities
    UseCase-->>Controller: DTO Response
    Controller-->>Middleware: Format Response
    Middleware-->>Router: HTTP Response
    Router-->>Client: JSON Response
```

## Dependency Flow

```mermaid
graph TD
    A[Presentation] --> B[Application]
    A --> C[Shared]
    B --> D[Domain]
    B --> C
    D --> C
    E[Infrastructure] --> B
    E --> D
    E --> C

    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#fff3e0
    style D fill:#e8f5e8
    style E fill:#ffebee
```

## Module Communication

```mermaid
graph LR
    subgraph "Auth Module"
        AuthC[AuthController]
        AuthU[AuthUseCases]
        AuthR[AuthRepository]
    end

    subgraph "Product Module"
        ProdC[ProductController]
        ProdU[ProductUseCases]
        ProdR[ProductRepository]
    end

    subgraph "Order Module"
        OrdC[OrderController]
        OrdU[OrderUseCases]
        OrdR[OrderRepository]
    end

    AuthC --> AuthU
    AuthU --> AuthR
    ProdC --> ProdU
    ProdU --> ProdR
    OrdC --> OrdU
    OrdU --> OrdR

    AuthU -.-> ProdR
    ProdU -.-> AuthR
    OrdU -.-> AuthR
    OrdU -.-> ProdR
```

## Clean Architecture Boundary Explanation

### Dependency Direction
- **Outer layers** depend on **inner layers**
- **Inner layers** have no knowledge of **outer layers**
- Dependencies point **inward** toward the domain

### Layer Boundaries
1. **Presentation** → Application → Domain ← Infrastructure
2. **Infrastructure** implements interfaces defined in **Domain**
3. **Application** orchestrates **Domain** entities
4. **Presentation** adapts **Application** for delivery

### Benefits
- **Testability**: Inner layers can be tested in isolation
- **Maintainability**: Changes in outer layers don't affect inner layers
- **Flexibility**: Can swap implementations without changing business logic
- **Framework Independence**: Domain is free from external dependencies