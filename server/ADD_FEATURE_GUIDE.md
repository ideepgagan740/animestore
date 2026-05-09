# How to Add a New Feature

This guide walks you through adding a new feature to the Anime Store backend following Clean Architecture principles.

## Example: Adding Product Categories Management

We'll add the ability for admins to manage product categories.

## Step 1: Domain Layer

### 1.1 Update existing Category entity (if needed)
The Category entity already exists in `src/domain/entities/Category.ts`. If you need to add business logic:

```typescript
// src/domain/entities/Category.ts
export class CategoryEntity implements Category {
  // ... existing code ...

  addSubcategory(name: string, description: string): CategoryEntity {
    // Business logic for adding subcategories
    const subcategory = new CategoryEntity(
      '', // ID will be generated
      name,
      description,
      undefined, // imageUrl
      true, // isActive
    );
    return subcategory;
  }
}
```

### 1.2 Create repository interface (if needed)
Category repository interface already exists. If you need new methods:

```typescript
// src/domain/repositories/ICategoryRepository.ts
export interface ICategoryRepository {
  // ... existing methods ...
  findActiveCategories(): Promise<Category[]>;
  findByParentId(parentId: string): Promise<Category[]>;
}
```

## Step 2: Application Layer

### 2.1 Create DTOs
```typescript
// src/application/dtos/CategoryDTOs.ts
export interface CreateCategoryDTO {
  name: string;
  description: string;
  imageUrl?: string;
  parentId?: string;
}

export interface CategoryResponseDTO {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  parentId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.2 Create use cases
```typescript
// src/application/use-cases/CreateCategoryUseCase.ts
import { inject, injectable } from 'inversify';
import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import { CategoryEntity } from '../../domain/entities/Category';
import { CreateCategoryDTO, CategoryResponseDTO } from '../dtos/CategoryDTOs';

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('ICategoryRepository') private categoryRepository: ICategoryRepository,
  ) {}

  async execute(dto: CreateCategoryDTO): Promise<CategoryResponseDTO> {
    // Check if category already exists
    const existingCategory = await this.categoryRepository.findByName(dto.name);
    if (existingCategory) {
      throw new Error('Category already exists');
    }

    const category = new CategoryEntity(
      '', // ID will be generated
      dto.name,
      dto.description,
      dto.imageUrl,
    );

    const savedCategory = await this.categoryRepository.create(category);

    return {
      id: savedCategory.id,
      name: savedCategory.name,
      description: savedCategory.description,
      imageUrl: savedCategory.imageUrl,
      isActive: savedCategory.isActive,
      createdAt: savedCategory.createdAt,
      updatedAt: savedCategory.updatedAt,
    };
  }
}
```

## Step 3: Infrastructure Layer

### 3.1 Update MongoDB model (if needed)
```typescript
// src/infrastructure/database/models/CategoryModel.ts
const CategorySchema = new Schema<ICategoryDocument>({
  // ... existing fields ...
  parentId: { type: String, ref: 'Category' },
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
}, {
  timestamps: true,
});

// Indexes
CategorySchema.index({ parentId: 1 });
CategorySchema.index({ name: 1, parentId: 1 }, { unique: true });
```

### 3.2 Update repository implementation
```typescript
// src/infrastructure/database/repositories/CategoryRepositoryImpl.ts
@injectable()
export class CategoryRepositoryImpl implements ICategoryRepository {
  // ... existing methods ...

  async findActiveCategories(): Promise<CategoryEntity[]> {
    const categories = await CategoryModel.find({ isActive: true });
    return categories.map(this.toEntity);
  }

  async findByParentId(parentId: string): Promise<CategoryEntity[]> {
    const categories = await CategoryModel.find({ parentId, isActive: true });
    return categories.map(this.toEntity);
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const categoryDoc = await CategoryModel.findOne({ name });
    return categoryDoc ? this.toEntity(categoryDoc) : null;
  }
}
```

## Step 4: Presentation Layer

### 4.1 Create controller
```typescript
// src/presentation/controllers/CategoryController.ts
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { CreateCategoryUseCase } from '../../application/use-cases/CreateCategoryUseCase';
import { CreateCategoryDTO } from '../../application/dtos/CategoryDTOs';

@injectable()
export class CategoryController {
  constructor(
    @inject('CreateCategoryUseCase') private createCategoryUseCase: CreateCategoryUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: CreateCategoryDTO = req.body;
      const result = await this.createCategoryUseCase.execute(dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Implementation here
      res.status(200).json({ message: 'Get all categories' });
    } catch (error) {
      next(error);
    }
  }
}
```

### 4.2 Create routes
```typescript
// src/presentation/routes/CategoryRoutes.ts
import { Router } from 'express';
import { container } from '../../shared/container';
import { CategoryController } from '../controllers/CategoryController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { adminOnly } from '../middlewares/RoleMiddleware';

const router = Router();
const categoryController = container.get<CategoryController>(CategoryController);

router.get('/', categoryController.getAll.bind(categoryController));
router.post('/', authMiddleware, adminOnly, categoryController.create.bind(categoryController));

export default router;
```

### 4.3 Add validation schemas
```typescript
// src/presentation/middlewares/CategoryValidation.ts
import Joi from 'joi';

export const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  imageUrl: Joi.string().uri().optional(),
  parentId: Joi.string().optional(),
});
```

## Step 5: Update Shared Layer

### 5.1 Update DI container
```typescript
// src/shared/container.ts
import { CreateCategoryUseCase } from '../application/use-cases/CreateCategoryUseCase';
import { CategoryController } from '../presentation/controllers/CategoryController';
import { CategoryRepositoryImpl } from '../infrastructure/database/repositories/CategoryRepositoryImpl';

// ... existing imports ...

// Use Cases
container.bind<CreateCategoryUseCase>('CreateCategoryUseCase').to(CreateCategoryUseCase);

// Controllers
container.bind<CategoryController>(CategoryController).toSelf();
```

### 5.2 Update main app
```typescript
// src/index.ts
import categoryRoutes from './presentation/routes/CategoryRoutes';

// ... existing imports ...

app.use('/api/categories', categoryRoutes);
```

## Step 6: Add Tests

### 6.1 Unit test for use case
```typescript
// src/application/use-cases/__tests__/CreateCategoryUseCase.test.ts
import { CreateCategoryUseCase } from '../CreateCategoryUseCase';

describe('CreateCategoryUseCase', () => {
  it('should create a category successfully', async () => {
    // Test implementation
  });
});
```

### 6.2 Integration test for API
```typescript
// src/presentation/routes/__tests__/CategoryRoutes.test.ts
import request from 'supertest';
import app from '../../../index';

describe('Category Routes', () => {
  it('should create category with admin auth', async () => {
    // Test implementation
  });
});
```

## Step 7: Update Documentation

### 7.1 Update Swagger
Add new endpoints to Swagger documentation in the route files.

### 7.2 Update READMEs
Update relevant README.md files in each layer to document the new feature.

## Step 8: Testing & Validation

1. Run unit tests: `npm run test`
2. Run integration tests
3. Test API endpoints manually
4. Check Swagger documentation
5. Validate with linting: `npm run lint`

## Summary

Following this process ensures:
- Clean separation of concerns
- Testable code
- Maintainable architecture
- Consistent patterns
- Proper documentation

Remember to always start from the Domain layer and work outward, maintaining the dependency direction of Clean Architecture.