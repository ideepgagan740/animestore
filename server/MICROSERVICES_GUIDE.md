# How to Add a New Microservice Later

This guide explains how to extract microservices from the current monolithic architecture while maintaining Clean Architecture principles.

## Current Architecture Assessment

The current Anime Store backend is built as a monolith with clear boundaries, making microservices extraction straightforward.

## Step 1: Identify Bounded Contexts

Analyze the domain to identify bounded contexts:

### Current Bounded Contexts
1. **User Management** - Authentication, profiles, roles
2. **Product Catalog** - Products, categories, inventory
3. **Order Processing** - Orders, payments, shipping
4. **Review System** - Product reviews and ratings
5. **Notification Service** - Emails, notifications

## Step 2: Choose Extraction Strategy

### Strategy 1: Database-per-Service
Each microservice has its own database.

### Strategy 2: Shared Database with Schema Separation
Services share database but use separate schemas.

### Strategy 3: Event-Driven Architecture
Services communicate via events (recommended).

## Step 3: Extract User Service

### 3.1 Create New Service Structure
```
user-service/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   └── User.ts
│   │   ├── repositories/
│   │   │   └── IUserRepository.ts
│   │   └── value-objects/
│   │       └── Email.ts
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── RegisterUserUseCase.ts
│   │   │   └── LoginUserUseCase.ts
│   │   ├── services/
│   │   │   └── IAuthService.ts
│   │   └── dtos/
│   │       └── AuthDTOs.ts
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── models/
│   │   │   │   └── UserModel.ts
│   │   │   ├── repositories/
│   │   │   │   └── UserRepositoryImpl.ts
│   │   │   └── DatabaseConnection.ts
│   │   ├── external-services/
│   │   │   └── AuthServiceImpl.ts
│   │   └── config/
│   │       └── Config.ts
│   ├── presentation/
│   │   ├── routes/
│   │   │   └── AuthRoutes.ts
│   │   ├── controllers/
│   │   │   └── AuthController.ts
│   │   └── middlewares/
│   │       ├── AuthMiddleware.ts
│   │       └── ErrorHandler.ts
│   └── shared/
│       ├── container.ts
│       ├── types/
│       ├── utils/
│       ├── constants/
│       └── errors/
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

### 3.2 Copy and Adapt Code
1. Copy User-related entities, use cases, repositories
2. Update container bindings
3. Modify routes to remove service prefix
4. Update database connection
5. Add service discovery configuration

### 3.3 Add Inter-Service Communication
```typescript
// Event publishing
export interface IEventPublisher {
  publish(event: UserRegisteredEvent): Promise<void>;
}

// Event types
export class UserRegisteredEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly timestamp: Date,
  ) {}
}
```

## Step 4: Extract Product Service

### 4.1 Product Service Structure
```
product-service/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── Product.ts
│   │   │   ├── Category.ts
│   │   │   └── Anime.ts
│   │   └── repositories/
│   │       ├── IProductRepository.ts
│   │       └── ICategoryRepository.ts
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── CreateProductUseCase.ts
│   │   │   └── GetProductsUseCase.ts
│   │   └── dtos/
│   │       └── ProductDTOs.ts
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── models/
│   │   │   └── repositories/
│   │   ├── message-queue/
│   │   │   └── ProductEventPublisher.ts
│   │   └── config/
│   └── presentation/
│       ├── routes/
│       ├── controllers/
│       └── middlewares/
│   └── shared/
└── ...
```

### 4.2 Handle Data Relationships
For products referencing users (created_by), use:

1. **Eventual Consistency**: Store user data in product service
2. **API Calls**: Call user service for user data
3. **CQRS**: Separate read/write models

## Step 5: Extract Order Service

### 5.1 Order Service Challenges
Orders reference products and users, requiring:

1. **Product Data Duplication**: Store product snapshots in orders
2. **Event Subscription**: Listen for product/user updates
3. **Saga Pattern**: Handle distributed transactions

### 5.2 Saga Implementation
```typescript
// Order saga
export class CreateOrderSaga {
  async execute(orderData: CreateOrderDTO): Promise<void> {
    // 1. Reserve products (call product service)
    // 2. Create order (local)
    // 3. Process payment (call payment service)
    // 4. Confirm order or rollback
  }
}
```

## Step 6: Implement Service Communication

### 6.1 Synchronous Communication (REST)
```typescript
// User service client
export class UserServiceClient {
  async getUser(userId: string): Promise<UserDTO> {
    const response = await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
    return response.data;
  }
}
```

### 6.2 Asynchronous Communication (Events)
```typescript
// Event bus
export interface IEventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe(eventType: string, handler: EventHandler): void;
}

// Product created event
export class ProductCreatedEvent implements DomainEvent {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly price: number,
  ) {}
}
```

### 6.3 Message Queue Setup
```typescript
// RabbitMQ configuration
export class MessageQueueConfig {
  static configure(): void {
    // Set up exchanges, queues, bindings
  }
}
```

## Step 7: Infrastructure Changes

### 7.1 API Gateway
```typescript
// Gateway routes
const routes = [
  { path: '/api/auth', service: 'user-service' },
  { path: '/api/products', service: 'product-service' },
  { path: '/api/orders', service: 'order-service' },
];
```

### 7.2 Service Discovery
```typescript
// Consul or Kubernetes service discovery
export class ServiceDiscovery {
  async getServiceUrl(serviceName: string): Promise<string> {
    // Implementation
  }
}
```

### 7.3 Configuration Management
```typescript
// Environment-based config
export const config = {
  serviceName: 'user-service',
  port: process.env.PORT || 3001,
  databaseUrl: process.env.DATABASE_URL,
  messageQueueUrl: process.env.MESSAGE_QUEUE_URL,
  userServiceUrl: process.env.USER_SERVICE_URL,
};
```

## Step 8: Database Migration

### 8.1 Separate Databases
```sql
-- User service database
CREATE DATABASE user_service;

-- Product service database
CREATE DATABASE product_service;

-- Order service database
CREATE DATABASE order_service;
```

### 8.2 Data Migration Scripts
```typescript
// Migration script
export class DataMigration {
  async migrateUsers(): Promise<void> {
    // Migrate user data to separate database
  }
}
```

## Step 9: Deployment Strategy

### 9.1 Docker Compose for Development
```yaml
version: '3.8'
services:
  user-service:
    build: ./user-service
    ports:
      - "3001:3000"
    depends_on:
      - user-db
      - rabbitmq

  product-service:
    build: ./product-service
    ports:
      - "3002:3000"
    depends_on:
      - product-db
      - rabbitmq

  order-service:
    build: ./order-service
    ports:
      - "3003:3000"
    depends_on:
      - order-db
      - rabbitmq

  api-gateway:
    build: ./api-gateway
    ports:
      - "3000:3000"
    depends_on:
      - user-service
      - product-service
      - order-service
```

### 9.2 Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: anime-store/user-service:latest
        ports:
        - containerPort: 3000
```

## Step 10: Monitoring and Observability

### 10.1 Health Checks
```typescript
// Health endpoint
app.get('/health', (req, res) => {
  res.json({
    service: 'user-service',
    status: 'healthy',
    timestamp: new Date(),
    dependencies: {
      database: 'healthy',
      messageQueue: 'healthy',
    },
  });
});
```

### 10.2 Logging
```typescript
// Structured logging
export class Logger {
  static info(service: string, message: string, data?: any): void {
    console.log(JSON.stringify({
      level: 'info',
      service,
      message,
      data,
      timestamp: new Date(),
    }));
  }
}
```

### 10.3 Distributed Tracing
```typescript
// Jaeger tracing
export class Tracing {
  static startSpan(name: string): Span {
    // Implementation
  }
}
```

## Step 11: Testing Strategy

### 11.1 Unit Tests
- Test each service in isolation
- Mock external service calls

### 11.2 Integration Tests
- Test service interactions
- Use test containers for databases

### 11.3 Contract Tests
- Verify API contracts between services
- Use Pact or Spring Cloud Contract

### 11.4 End-to-End Tests
- Test complete user journeys
- Use tools like Cypress or Postman

## Benefits of This Approach

1. **Scalability**: Scale services independently
2. **Technology Diversity**: Use different tech stacks
3. **Team Autonomy**: Teams can work independently
4. **Fault Isolation**: Failure in one service doesn't bring down others
5. **Deployment Flexibility**: Deploy services independently

## Challenges and Solutions

### Challenge 1: Distributed Transactions
**Solution**: Use Saga pattern for consistency

### Challenge 2: Service Communication
**Solution**: Define clear API contracts and use events

### Challenge 3: Data Consistency
**Solution**: Eventual consistency with compensating actions

### Challenge 4: Debugging
**Solution**: Distributed tracing and correlation IDs

### Challenge 5: Deployment Complexity
**Solution**: Infrastructure as Code and CI/CD pipelines

## Migration Timeline

1. **Phase 1**: Extract User Service (1-2 weeks)
2. **Phase 2**: Extract Product Service (1-2 weeks)
3. **Phase 3**: Extract Order Service (2-3 weeks)
4. **Phase 4**: Implement API Gateway (1 week)
5. **Phase 5**: Add monitoring and logging (1 week)
6. **Phase 6**: Performance testing and optimization (1-2 weeks)

This migration strategy maintains the Clean Architecture principles while enabling microservices benefits. The current codebase's structure makes this transition smooth and manageable.