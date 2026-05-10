import type { CartItem } from '@modules/cart/types/cart.types';

export function calculateCartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.product.price.amount * item.quantity, 0);
}
