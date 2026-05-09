# Middlewares

*Last updated: 2026-05-09*

## Overview

Part of the **Contains HTTP handlers, controllers, and API endpoints** in the undefined.

## Files

### presentation\middlewares\AuthMiddleware.ts
- **Interfaces**: AuthenticatedRequest
- **Exports**: AuthenticatedRequest, authMiddleware

### presentation\middlewares\AuthValidation.ts
- **Exports**: registerSchema, loginSchema

### presentation\middlewares\ErrorHandler.ts
- **Exports**: errorHandler

### presentation\middlewares\RoleMiddleware.ts
- **Exports**: adminOnly, customerOnly

### presentation\middlewares\ValidationMiddleware.ts
- **Exports**: validateRequest

## Component Summary

- **Total Files**: 5
- **Classes**: 0
- **Interfaces**: 1
- **Test Coverage**: 0/5 files

## Dependencies

This directory belongs to the presentation layer and follows its architectural constraints.

## Maintenance Notes

When adding new components to this directory:
1. Ensure they follow the layer's conventions
2. Add appropriate tests
3. Update this README (automated via `npm run update-docs`)
4. Update the architecture diagram if needed

