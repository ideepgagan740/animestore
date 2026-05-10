'use client';

import { ProductCard } from '@modules/products/components/ProductCard';
import type { Product } from '@modules/products/types/product.types';
import { Skeleton } from '@shared/ui/feedback/Skeleton';

export function ProductGrid({ products, isLoading }: Readonly<{ products: Product[]; isLoading: boolean }>) {
  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-96" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
