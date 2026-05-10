import { useMemo } from 'react';
import { useAppSelector } from '@store/hooks';

export function useCartTotals() {
  const items = useAppSelector((state) => state.cart.items);

  return useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.product.price.amount * item.quantity, 0);
    return { itemCount, subtotal };
  }, [items]);
}
