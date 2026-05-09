# AI Agent Onboarding Guide

## Welcome AI Agent!

This document helps AI agents understand and work with the Anime Store backend codebase. The project follows Clean Architecture principles designed specifically for AI-friendly development.

## Project Structure Overview

```
src/
├── domain/           # 🧠 Business Logic (Pure, Framework-Free)
├── application/      # 🎯 Use Cases (Business Workflows)
├── infrastructure/   # 🔌 External Systems (DB, APIs, Config)
├── presentation/     # 🌐 HTTP Layer (REST API)
└── shared/          # 🛠️ Common Utilities
```

## Quick Start for AI Agents

### 1. Understand the Architecture
- **Domain**: Contains business entities and rules
- **Application**: Contains use cases that orchestrate business logic
- **Infrastructure**: Contains implementations of domain interfaces
- **Presentation**: Contains HTTP API endpoints
- **Shared**: Contains common types and utilities

### 2. Key Principles
- **Dependency Injection**: All dependencies are injected via constructor
- **Interface Segregation**: Domain defines interfaces, Infrastructure implements them
- **Single Responsibility**: Each class has one reason to change
- **SOLID Principles**: Applied throughout the codebase

### 3. Common Patterns

#### Adding a New Feature
1. **Domain**: Create entity and repository interface
2. **Application**: Create use case and DTOs
3. **Infrastructure**: Implement repository
4. **Presentation**: Create controller and routes

#### Example: Adding User Profile Update
```typescript
// 1. Domain: Add method to User entity
class UserEntity {
  updateProfile(firstName: string, lastName: string) {
    // business logic here
  }
}

// 2. Application: Create use case
class UpdateUserProfileUseCase {
  constructor(private userRepo: IUserRepository) {}
  async execute(userId: string, dto: UpdateProfileDTO) {
    // orchestrate business logic
  }
}

// 3. Infrastructure: Repository already exists
// 4. Presentation: Add route and controller method
```

## AI-Friendly Features

### 1. Clear Separation of Concerns
Each layer has a specific responsibility, making it easy to locate and modify code.

### 2. Comprehensive Documentation
Every folder contains a README.md explaining:
- Purpose and responsibilities
- File contents and flow
- Dependency rules
- Extension strategies

### 3. Type Safety
Full TypeScript implementation with strict typing for better IDE support and error catching.

### 4. Dependency Injection
Clear dependency management makes testing and mocking straightforward.

### 5. Repository Pattern
Data access is abstracted behind interfaces, allowing easy testing and implementation swapping.

## How to Navigate the Codebase

### Finding Business Logic
- Look in `src/domain/entities/` for business rules
- Check `src/application/use-cases/` for workflows

### Finding API Endpoints
- Routes are in `src/presentation/routes/`
- Controllers are in `src/presentation/controllers/`

### Finding Data Access
- Repository interfaces in `src/domain/repositories/`
- Implementations in `src/infrastructure/database/repositories/`

### Finding Configuration
- Environment config in `src/infrastructure/config/Config.ts`
- DI container in `src/shared/container.ts`

## Common Tasks for AI Agents

### 1. Adding a New Entity
1. Create entity class in `domain/entities/`
2. Create repository interface in `domain/repositories/`
3. Implement repository in `infrastructure/database/repositories/`
4. Add to DI container in `shared/container.ts`

### 2. Adding a New API Endpoint
1. Create DTOs in `application/dtos/`
2. Create use case in `application/use-cases/`
3. Create controller method in `presentation/controllers/`
4. Add route in `presentation/routes/`

### 3. Adding Validation
1. Create Joi schema in `presentation/middlewares/`
2. Use `validateRequest` middleware in routes

### 4. Adding Authentication
1. Use `authMiddleware` for protected routes
2. Use `adminOnly` or `customerOnly` for role-based access

### 5. Adding Error Handling
1. Throw custom errors from `shared/errors/`
2. Errors are automatically handled by `errorHandler` middleware

## Testing Strategy

### Unit Tests
- Test domain entities in isolation
- Mock repositories in use case tests
- Test utilities and helpers

### Integration Tests
- Test complete workflows with real repositories
- Test API endpoints with supertest

### Repository Tests
- Test database operations
- Use test database for isolation

## Best Practices for AI Agents

### 1. Respect Layer Boundaries
- Don't make Domain depend on Infrastructure
- Don't put business logic in Controllers
- Keep Presentation layer thin

### 2. Follow Naming Conventions
- Use cases: `VerbNounUseCase`
- Entities: `NounEntity`
- Repositories: `NounRepositoryImpl`
- Controllers: `NounController`

### 3. Use Dependency Injection
- Always inject dependencies via constructor
- Register implementations in container
- Use interfaces for dependencies

### 4. Handle Errors Properly
- Use custom error classes from `shared/errors/`
- Let global error handler format responses
- Provide meaningful error messages

### 5. Write Self-Documenting Code
- Use descriptive variable and method names
- Add comments for complex business logic
- Keep methods small and focused

## Getting Help

If you need to understand a specific part of the codebase:
1. Check the README.md in the relevant folder
2. Look at existing implementations as examples
3. Check the architecture documentation
4. Examine the DI container for dependencies

Remember: This architecture is designed to be AI-friendly with clear boundaries, comprehensive documentation, and consistent patterns. Follow the established conventions and you'll be able to extend and maintain the codebase effectively!