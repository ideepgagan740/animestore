'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { formatMoney } from '@core/domain/money';
import { addToCart } from '@modules/cart';
import type { Product } from '@modules/products/types/product.types';
import { useAppDispatch } from '@store/hooks';

export function ProductCard({ product }: Readonly<{ product: Product }>) {
  const dispatch = useAppDispatch();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
    >
      <div className="relative h-52">
        <Image src={product.imageUrl} alt={product.title} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge>{product.category}</Badge>
          <span className="text-sm font-semibold">★ {product.rating}</span>
        </div>
        <div>
          <h3 className="text-lg font-black">{product.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-foreground/70">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <strong className="text-xl">{formatMoney(product.price)}</strong>
          <Button onClick={() => dispatch(addToCart(product))}>Add</Button>
        </div>
      </div>
    </motion.article>
  );
}
