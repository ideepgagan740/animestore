# Contains common utilities and cross-cutting concerns

*Last updated: 2026-05-09*

## Overview

**Purpose**: Contains common utilities and cross-cutting concerns

**Responsibilities**: Logging, configuration, common types, utilities

## Architecture Flow

Used by all layers as needed

## Dependencies

Minimal - only standard libraries and utilities

## Conventions

Keep utilities generic and reusable

## Examples

Logger, Config, Common types

## Directory Structure

- **constants/** (1 files, 0 classes, 0 interfaces)
- **errors/** (1 files, 4 classes, 0 interfaces)
- **types/** (1 files, 0 classes, 3 interfaces)
- **utils/** (1 files, 2 classes, 0 interfaces)

## Do's and Don'ts

### ✅ Do's
- Provide utilities
- Handle cross-cutting concerns
- Keep dependencies minimal

### ❌ Don'ts
- Contain business logic
- Import layer-specific code
- Create circular dependencies

## Future Extensions

Add new utilities as the application grows

## Related Components

- **errors**: ValidationError, NotFoundError, UnauthorizedError, ForbiddenError
- **types**: PaginationOptions, PaginatedResponse, ApiResponse
- **utils**: PaginationHelper, ResponseHelper
