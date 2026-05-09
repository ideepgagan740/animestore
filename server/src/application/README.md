# Contains use cases and application services

*Last updated: 2026-05-09*

## Overview

**Purpose**: Contains use cases and application services

**Responsibilities**: Orchestrate domain objects, handle business workflows

## Architecture Flow

Use cases call domain entities and infrastructure services

## Dependencies

Domain layer, Infrastructure interfaces

## Conventions

Use cases should be thin, focus on orchestration

## Examples

RegisterUserUseCase, CreateOrderUseCase

## Directory Structure

- **dtos/** (3 files, 0 classes, 11 interfaces)
- **services/** (1 files, 0 classes, 2 interfaces)
- **use-cases/** (4 files, 4 classes, 0 interfaces)

## Do's and Don'ts

### ✅ Do's
- Use dependency injection
- Return DTOs
- Handle application logic

### ❌ Don'ts
- Import infrastructure implementations
- Handle HTTP details
- Access databases directly

## Future Extensions

Add new use cases for new business requirements

## Related Components

- **dtos**: RegisterUserDTO, LoginUserDTO, AuthResponseDTO, RefreshTokenDTO, CreateOrderDTO
- **services**: TokenPair, IAuthService
- **use-cases**: CreateOrderUseCase, CreateProductUseCase, LoginUserUseCase, RegisterUserUseCase
