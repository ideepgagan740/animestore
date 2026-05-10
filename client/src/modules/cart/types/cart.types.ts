import type { Product } from '@modules/products';

export interface CartItem {
  product: Product;
  quantity: number;
}
