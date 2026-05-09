# Contains HTTP handlers, controllers, and API endpoints

*Last updated: 2026-05-09*

## Overview

**Purpose**: Contains HTTP handlers, controllers, and API endpoints

**Responsibilities**: Handle HTTP requests, validate input, format responses

## Architecture Flow

Controllers call application use cases, return HTTP responses

## Dependencies

Application layer, web framework

## Conventions

Controllers should be thin, focus on HTTP concerns

## Examples

AuthController, ProductController

## Directory Structure

- **controllers/** (3 files, 3 classes, 0 interfaces)
- **middlewares/** (5 files, 0 classes, 1 interfaces)
- **routes/** (3 files, 0 classes, 0 interfaces)

## Do's and Don'ts

### ✅ Do's
- Validate requests
- Handle HTTP errors
- Format responses

### ❌ Don'ts
- Contain business logic
- Access databases
- Import infrastructure directly

## Future Extensions

Add new controllers for new API endpoints

## Related Components

- **controllers**: AuthController, OrderController, ProductController
- **middlewares**: AuthenticatedRequest
