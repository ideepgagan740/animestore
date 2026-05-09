import { Cart } from '../entities/Cart';

export interface ICartRepository {
  findById(id: string): Promise<Cart | null>;
  findByUserId(userId: string): Promise<Cart | null>;
  create(cart: Cart): Promise<Cart>;
  update(cart: Cart): Promise<Cart>;
  delete(id: string): Promise<void>;
}