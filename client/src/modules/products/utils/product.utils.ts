import type { Product } from '@modules/products';

export function isProductInStock(product: Product) {
  return product.stock > 0;
}
