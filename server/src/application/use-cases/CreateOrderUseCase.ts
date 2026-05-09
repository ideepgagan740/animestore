import { inject, injectable } from 'inversify';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { ICartRepository } from '../../domain/repositories/ICartRepository';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { OrderEntity, OrderStatus } from '../../domain/entities/Order';
import { CreateOrderDTO, OrderResponseDTO } from '../dtos/OrderDTOs';

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject('IOrderRepository') private orderRepository: IOrderRepository,
    @inject('ICartRepository') private cartRepository: ICartRepository,
    @inject('IProductRepository') private productRepository: IProductRepository,
  ) {}

  async execute(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO> {
    // Get user's cart
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // Validate stock and calculate total
    let totalPrice = 0;
    const orderItems = [];

    for (const item of dto.items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      orderItems.push({
        product,
        quantity: item.quantity,
        price: product.price,
      });
      totalPrice += product.price * item.quantity;

      // Reduce stock
      product.reduceStock(item.quantity);
      await this.productRepository.update(product);
    }

    // Create order
    const order = new OrderEntity(
      '', // ID will be generated
      cart.user,
      orderItems,
      totalPrice,
      OrderStatus.PENDING,
      dto.shippingAddress,
    );

    const savedOrder = await this.orderRepository.create(order);

    // Clear cart
    cart.clearCart();
    await this.cartRepository.update(cart);

    return {
      id: savedOrder.id,
      user: {
        id: savedOrder.user.id,
        email: savedOrder.user.email,
        firstName: savedOrder.user.firstName,
        lastName: savedOrder.user.lastName,
      },
      items: savedOrder.items.map(item => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.price,
        },
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: savedOrder.totalPrice,
      status: savedOrder.status,
      shippingAddress: savedOrder.shippingAddress,
      createdAt: savedOrder.createdAt,
      updatedAt: savedOrder.updatedAt,
    };
  }
}