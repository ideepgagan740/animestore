import { Container } from 'inversify';

// Repositories
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { ICartRepository } from '../domain/repositories/ICartRepository';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';

// Services
import { IAuthService } from '../application/services/IAuthService';

// Use Cases
import { RegisterUserUseCase } from '../application/use-cases/RegisterUserUseCase';
import { LoginUserUseCase } from '../application/use-cases/LoginUserUseCase';
import { CreateProductUseCase } from '../application/use-cases/CreateProductUseCase';
import { CreateOrderUseCase } from '../application/use-cases/CreateOrderUseCase';

// Controllers
import { AuthController } from '../presentation/controllers/AuthController';
import { ProductController } from '../presentation/controllers/ProductController';
import { OrderController } from '../presentation/controllers/OrderController';

// Infrastructure
import { UserRepositoryImpl } from '../infrastructure/database/repositories/UserRepositoryImpl';
import { ProductRepositoryImpl } from '../infrastructure/database/repositories/ProductRepositoryImpl';
import { CartRepositoryImpl } from '../infrastructure/database/repositories/CartRepositoryImpl';
import { OrderRepositoryImpl } from '../infrastructure/database/repositories/OrderRepositoryImpl';
import { AuthServiceImpl } from '../infrastructure/external-services/AuthServiceImpl';

const container = new Container();

// Repositories
container.bind<IUserRepository>('IUserRepository').to(UserRepositoryImpl).inSingletonScope();
container.bind<IProductRepository>('IProductRepository').to(ProductRepositoryImpl).inSingletonScope();
container.bind<ICartRepository>('ICartRepository').to(CartRepositoryImpl).inSingletonScope();
container.bind<IOrderRepository>('IOrderRepository').to(OrderRepositoryImpl).inSingletonScope();

// Services
container.bind<IAuthService>('IAuthService').to(AuthServiceImpl).inSingletonScope();

// Use Cases
container.bind<RegisterUserUseCase>('RegisterUserUseCase').to(RegisterUserUseCase);
container.bind<LoginUserUseCase>('LoginUserUseCase').to(LoginUserUseCase);
container.bind<CreateProductUseCase>('CreateProductUseCase').to(CreateProductUseCase);
container.bind<CreateOrderUseCase>('CreateOrderUseCase').to(CreateOrderUseCase);

// Controllers
container.bind<AuthController>(AuthController).toSelf();
container.bind<ProductController>(ProductController).toSelf();
container.bind<OrderController>(OrderController).toSelf();

export { container };