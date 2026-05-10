'use client';

import { Button } from '@shared/ui/atoms/Button';
import { formatMoney } from '@core/domain/money';
import { removeFromCart } from '@modules/cart/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

export function CartSummary() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = items.reduce((sum, item) => sum + item.product.price.amount * item.quantity, 0);

  return (
    <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-xl lg:sticky lg:top-28">
      <h2 className="text-2xl font-black">Cart</h2>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-foreground/70">Your cart is empty. Add products to test global state.</p>
      ) : (
        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-b-0">
              <div>
                <h3 className="font-semibold">{item.product.title}</h3>
                <p className="text-sm text-foreground/65">
                  {item.quantity} × {formatMoney(item.product.price)}
                </p>
              </div>
              <Button variant="ghost" onClick={() => dispatch(removeFromCart(item.product.id))}>
                Remove
              </Button>
            </div>
          ))}
          <div className="flex items-center justify-between text-lg font-black">
            <span>Subtotal</span>
            <span>{formatMoney({ amount: subtotal, currency: 'USD' })}</span>
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      )}
    </aside>
  );
}
