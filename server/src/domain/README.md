# Contains business entities, value objects, and domain rules

*Last updated: 2026-05-09*

## Overview

**Purpose**: Contains business entities, value objects, and domain rules

**Responsibilities**: Define core business logic, entities, and domain events

## Architecture Flow

Entities are used by Application Layer use cases

## Dependencies

No external dependencies - pure business logic

## Conventions

Entities should be pure, no external imports except other domain objects

## Examples

UserEntity, ProductEntity, OrderEntity

## Directory Structure

- **entities/** (9 files, 9 classes, 11 interfaces)
- **repositories/** (4 files, 0 classes, 4 interfaces)
- **value-objects/** (2 files, 2 classes, 0 interfaces)

## Do's and Don'ts

### ✅ Do's
- Keep entities pure
- Use domain events
- Validate business rules

### ❌ Don'ts
- Import infrastructure code
- Use external libraries
- Handle HTTP requests

## Future Extensions

Add new entities, value objects, or domain services as business needs grow

## Related Components

- **entities**: AnimeEntity, CartEntity, CategoryEntity, OrderEntity, PaymentEntity
- **repositories**: ICartRepository, IOrderRepository, IProductRepository, IUserRepository
- **value-objects**: Email, Password
