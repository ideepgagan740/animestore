import type { CartItem } from '@modules/cart';

export function countCartItems(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
