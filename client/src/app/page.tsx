import { CartSummary } from '@modules/cart/components/CartSummary';
import { ProductListingPage } from '@modules/products/pages/ProductListingPage';
import { MainLayout } from '@layouts/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <ProductListingPage />
        <CartSummary />
      </div>
    </MainLayout>
  );
}
