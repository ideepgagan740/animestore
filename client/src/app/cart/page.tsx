import { CartSummary } from '@modules/cart/components/CartSummary';
import { MainLayout } from '@layouts/MainLayout';

export default function CartPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-xl">
        <CartSummary />
      </div>
    </MainLayout>
  );
}
