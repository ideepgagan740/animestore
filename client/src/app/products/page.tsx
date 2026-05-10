import { ProductListingPage } from '@modules/products/pages/ProductListingPage';
import { MainLayout } from '@layouts/MainLayout';

export default function ProductsPage() {
  return (
    <MainLayout>
      <ProductListingPage />
    </MainLayout>
  );
}
