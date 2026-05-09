# How Dependency Injection Works

## Overview

This project uses Inversify, a powerful dependency injection container for TypeScript, to manage dependencies across all layers.

## Why Dependency Injection?

1. **Testability**: Easy to mock dependencies in unit tests
2. **Maintainability**: Clear dependency management
3. **Flexibility**: Can swap implementations without changing code
4. **Clean Architecture**: Supports interface-based programming

## Container Setup

The DI container is configured in `src/shared/container.ts`:

```typescript
import { Container } from 'inversify';

// Create container
const container = new Container();

// Bind interfaces to implementations
container.bind<IUserRepository>('IUserRepository').to(UserRepositoryImpl).inSingletonScope();
container.bind<IAuthService>('IAuthService').to(AuthServiceImpl).inSingletonScope();

// Bind concrete classes
container.bind<RegisterUserUseCase>('RegisterUserUseCase').to(RegisterUserUseCase);
container.bind<AuthController>(AuthController).toSelf();

export { container };
```

## Binding Types

### 1. Interface to Implementation
```typescript
container.bind<IRepository>('IRepository').to(RepositoryImpl);
```

### 2. Concrete Classes
```typescript
container.bind<UseCase>(UseCase).toSelf();
```

### 3. Singleton Scope
```typescript
container.bind<IService>('IService').to(ServiceImpl).inSingletonScope();
```

### 4. Factory Functions
```typescript
container.bind<IFactory>('IFactory').toFactory(() => {
  return () => new SomeClass();
});
```

## Using Dependencies

### Constructor Injection
```typescript
@injectable()
export class UseCase {
  constructor(
    @inject('IRepository') private repository: IRepository,
    @inject('IService') private service: IService,
  ) {}
}
```

### Property Injection
```typescript
@injectable()
export class Controller {
  @inject('IUseCase') private useCase!: IUseCase;
}
```

### Method Injection
```typescript
@injectable()
export class Service {
  @inject('IDependency') private dependency!: IDependency;

  @injectMethod()
  public setDependency(@inject('IDependency') dependency: IDependency) {
    this.dependency = dependency;
  }
}
```

## Resolving Dependencies

### From Container
```typescript
const useCase = container.get<UseCase>('UseCase');
const repository = container.get<IRepository>('IRepository');
```

### In Tests
```typescript
const mockRepository = new MockRepository();
container.unbind('IRepository');
container.bind<IRepository>('IRepository').toConstantValue(mockRepository);
```

## Scopes

### Transient (Default)
```typescript
container.bind<IService>('IService').to(ServiceImpl);
// New instance each time
```

### Singleton
```typescript
container.bind<IService>('IService').to(ServiceImpl).inSingletonScope();
// Same instance always
```

### Request Scope
```typescript
container.bind<IService>('IService').to(ServiceImpl).inRequestScope();
// New instance per request
```

## Advanced Features

### Multi-Injection
```typescript
container.bind<IHandler>('IHandler').to(Handler1);
container.bind<IHandler>('IHandler').to(Handler2);

@injectable()
export class Manager {
  constructor(
    @multiInject('IHandler') private handlers: IHandler[],
  ) {}
}
```

### Tagged Bindings
```typescript
container.bind<IWeapon>('IWeapon').to(Sword).whenTargetTagged('type', 'melee');
container.bind<IWeapon>('IWeapon').to(Bow).whenTargetTagged('type', 'ranged');

@injectable()
export class Warrior {
  constructor(
    @inject('IWeapon') @tagged('type', 'melee') private weapon: IWeapon,
  ) {}
}
```

### Contextual Bindings
```typescript
container.bind<IWeapon>('IWeapon').to(Sword).whenInjectedInto(Warrior);
container.bind<IWeapon>('IWeapon').to(Bow).whenInjectedInto(Archer);
```

## Best Practices

### 1. Use Interfaces
Always program to interfaces, not implementations:

```typescript
// Good
constructor(@inject('IRepository') private repo: IRepository)

// Bad
constructor(private repo: RepositoryImpl)
```

### 2. Single Responsibility
Each class should have a single, well-defined responsibility.

### 3. Constructor Injection
Prefer constructor injection over property injection for required dependencies.

### 4. Naming Conventions
Use consistent naming for binding keys:
- Interfaces: `'I' + InterfaceName`
- Classes: `ClassName`

### 5. Error Handling
Handle missing dependencies gracefully:

```typescript
try {
  const service = container.get<IService>('IService');
} catch (error) {
  console.error('Service not bound:', error);
}
```

### 6. Testing
Unbind and rebind for tests:

```typescript
beforeEach(() => {
  container.unbind('IDependency');
  container.bind<IDependency>('IDependency').to(MockDependency);
});

afterEach(() => {
  container.unbind('IDependency');
  container.bind<IDependency>('IDependency').to(RealDependency);
});
```

## Common Patterns

### Repository Pattern
```typescript
container.bind<IUserRepository>('IUserRepository').to(UserRepositoryImpl).inSingletonScope();
```

### Service Pattern
```typescript
container.bind<IAuthService>('IAuthService').to(AuthServiceImpl).inSingletonScope();
```

### Use Case Pattern
```typescript
container.bind<RegisterUserUseCase>('RegisterUserUseCase').to(RegisterUserUseCase);
```

### Controller Pattern
```typescript
container.bind<AuthController>(AuthController).toSelf();
```

## Debugging

### Check Bindings
```typescript
console.log(container.getBindings());
```

### Check if Bound
```typescript
const isBound = container.isBound('IService');
```

### Get All Bindings for Interface
```typescript
const bindings = container.getBindingsForService('IService');
```

## Migration to Microservices

The DI container makes it easy to extract microservices:

1. **Identify bounded contexts** from domain analysis
2. **Create separate containers** for each microservice
3. **Move relevant bindings** to new containers
4. **Update communication** between services
5. **Maintain interface contracts** for inter-service communication

This architecture prepares the system for future microservices extraction while maintaining clean, testable code.