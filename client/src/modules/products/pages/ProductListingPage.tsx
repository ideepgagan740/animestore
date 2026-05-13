'use client';

import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@shared/ui/atoms/Input';
import { ProductGrid } from '@modules/products/components/ProductGrid';
import { useProducts } from '@modules/products/hooks/useProducts';
import { AnimatedGridPattern, BorderBeam, ShimmerText } from '@shared/ui/magic';

export function ProductListingPage() {
  const [search, setSearch] = useState('');
  const productsQuery = useProducts({ search });
  const products = productsQuery.data?.data ?? [];

  return (
    <section>
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8">
        <AnimatedGridPattern cellSize={44} opacity={0.42} />
        <BorderBeam duration={8} />
        <div className="relative max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Anime marketplace
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            <ShimmerText>Collectibles, manga, and apparel</ShimmerText> built for fans.
          </h2>
          <p className="mt-4 max-w-2xl text-foreground/70">
            Browse fan-ready drops with a responsive catalog, polished cart state, and animated details inspired by Magic UI.
          </p>
        </div>
      </div>
      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
          <Input
            aria-label="Search products"
            className="pl-10"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      {productsQuery.error ? <p className="mb-4 text-sm text-destructive">{productsQuery.error.message}</p> : null}
      <ProductGrid products={products} isLoading={productsQuery.isLoading} />
    </section>
  );
}
