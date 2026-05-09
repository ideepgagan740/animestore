import { User } from './User';
import { Product } from './Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  user: User;
  items: CartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CartEntity implements Cart {
  constructor(
    public id: string,
    public user: User,
    public items: CartItem[] = [],
    public totalPrice: number = 0,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.calculateTotal();
    this.updatedAt = new Date();
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.calculateTotal();
    this.updatedAt = new Date();
  }

  updateItemQuantity(productId: string, quantity: number): void {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.calculateTotal();
      this.updatedAt = new Date();
    }
  }

  clearCart(): void {
    this.items = [];
    this.totalPrice = 0;
    this.updatedAt = new Date();
  }

  private calculateTotal(): void {
    this.totalPrice = this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }
}