import { User } from './User';
import { Product } from './Product';

export interface Wishlist {
  id: string;
  user: User;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export class WishlistEntity implements Wishlist {
  constructor(
    public id: string,
    public user: User,
    public products: Product[] = [],
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  addProduct(product: Product): void {
    if (!this.products.find(p => p.id === product.id)) {
      this.products.push(product);
      this.updatedAt = new Date();
    }
  }

  removeProduct(productId: string): void {
    this.products = this.products.filter(p => p.id !== productId);
    this.updatedAt = new Date();
  }

  clearWishlist(): void {
    this.products = [];
    this.updatedAt = new Date();
  }
}