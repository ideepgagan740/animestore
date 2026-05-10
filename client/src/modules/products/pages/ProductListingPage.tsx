'use client';

import { useState } from 'react';
import { Input } from '@shared/ui/atoms/Input';
import { ProductGrid } from '@modules/products/components/ProductGrid';
import { useProducts } from '@modules/products/hooks/useProducts';

export function ProductListingPage() {
  const [search, setSearch] = useState('');
  const productsQuery = useProducts({ search });
  const products = productsQuery.data?.data ?? [];

  return (
    <section>
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Anime marketplace</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Collectibles, manga, and apparel built for fans.</h2>
        <p className="mt-4 text-foreground/70">Feature-driven frontend architecture with server state, UI state, and feature state separated.</p>
      </div>
      <div className="mb-6 max-w-md">
        <Input aria-label="Search products" placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>
      {productsQuery.error ? <p className="mb-4 text-sm text-destructive">{productsQuery.error.message}</p> : null}
      <ProductGrid products={products} isLoading={productsQuery.isLoading} />
    </section>
  );
}
