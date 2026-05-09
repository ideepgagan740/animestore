# Contains external concerns and implementations

*Last updated: 2026-05-09*

## Overview

**Purpose**: Contains external concerns and implementations

**Responsibilities**: Database access, external APIs, framework integrations

## Architecture Flow

Implements repository interfaces, provides external services

## Dependencies

Domain interfaces, external libraries

## Conventions

Implement interfaces defined in Domain layer

## Examples

MongoUserRepository, RedisCacheService

## Directory Structure

- **cache/** (0 files, 0 classes, 0 interfaces)
- **config/** (1 files, 0 classes, 0 interfaces)
- **database/** (1 files, 1 classes, 0 interfaces)
- **external-services/** (1 files, 1 classes, 0 interfaces)

## Do's and Don'ts

### ✅ Do's
- Implement domain interfaces
- Handle external errors
- Use external libraries

### ❌ Don'ts
- Contain business logic
- Import presentation code
- Expose internal details

## Future Extensions

Add new repository implementations or external service integrations

## Related Components

- **database**: DatabaseConnection
- **external-services**: AuthServiceImpl
