'use client';

import { CreditCard, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@shared/ui/atoms/Button';
import { formatMoney } from '@core/domain/money';
import { removeFromCart } from '@modules/cart/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { BorderBeam } from '@shared/ui/magic';

export function CartSummary() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = items.reduce((sum, item) => sum + item.product.price.amount * item.quantity, 0);

  return (
    <aside className="relative h-fit overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl lg:sticky lg:top-28">
      <BorderBeam duration={10} delay={1} colorFrom="hsl(var(--accent))" colorTo="hsl(var(--primary))" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <h2 className="text-2xl font-black">Cart</h2>
        </div>
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
                <Trash2 className="mr-2 h-4 w-4" /> Remove
              </Button>
            </div>
          ))}
          <div className="flex items-center justify-between text-lg font-black">
            <span>Subtotal</span>
            <span>{formatMoney({ amount: subtotal, currency: 'USD' })}</span>
          </div>
          <Button className="w-full">
            <CreditCard className="mr-2 h-4 w-4" /> Checkout
          </Button>
        </div>
      )}
      </div>
    </aside>
  );
}
