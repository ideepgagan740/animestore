import { CartSummary } from '@modules/cart/components/CartSummary';
import { ProductListingPage } from '@modules/products/pages/ProductListingPage';
import { MainLayout } from '@layouts/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <ProductListingPage />
        <CartSummary />
      </div>
    </MainLayout>
  );
}
