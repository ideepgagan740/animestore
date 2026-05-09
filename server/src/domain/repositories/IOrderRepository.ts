import { Order, OrderStatus } from '../entities/Order';

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string, page: number, limit: number): Promise<Order[]>;
  create(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  findByStatus(status: OrderStatus, page: number, limit: number): Promise<Order[]>;
  count(): Promise<number>;
  countByUserId(userId: string): Promise<number>;
}