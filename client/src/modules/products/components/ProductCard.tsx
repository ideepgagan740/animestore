'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { Badge } from '@shared/ui/atoms/Badge';
import { Button } from '@shared/ui/atoms/Button';
import { formatMoney } from '@core/domain/money';
import { addToCart } from '@modules/cart';
import type { Product } from '@modules/products/types/product.types';
import { useAppDispatch } from '@store/hooks';
import { BorderBeam } from '@shared/ui/magic';

interface ProductVisualTone {
  from: string;
  to: string;
  badge: string;
  name: string;
}

const productVisualTones = {
  aggressive: {
    from: 'hsl(355 78% 54%)',
    to: 'hsl(20 92% 55%)',
    badge: 'hsl(355 78% 54%)',
    name: 'High energy',
  },
  collector: {
    from: 'hsl(260 68% 58%)',
    to: 'hsl(199 84% 48%)',
    badge: 'hsl(260 68% 58%)',
    name: 'Collector grade',
  },
  story: {
    from: 'hsl(214 64% 48%)',
    to: 'hsl(170 62% 40%)',
    badge: 'hsl(214 64% 48%)',
    name: 'Story arc',
  },
  lifestyle: {
    from: 'hsl(174 62% 36%)',
    to: 'hsl(286 46% 52%)',
    badge: 'hsl(174 62% 36%)',
    name: 'Daily wear',
  },
} satisfies Record<string, ProductVisualTone>;

function getProductVisualTone(product: Product): ProductVisualTone {
  const productText = `${product.title} ${product.category} ${product.tags.join(' ')}`.toLowerCase();

  if (/akatsuki|battle|demon|attack|slayer|berserk|rage|curse|weapon|villain|combat/.test(productText)) {
    return productVisualTones.aggressive;
  }

  if (/figure|collectible|statue|premium|display/.test(productText)) {
    return productVisualTones.collector;
  }

  if (/manga|novel|volume|box|starter|book/.test(productText)) {
    return productVisualTones.story;
  }

  return productVisualTones.lifestyle;
}

export function ProductCard({ product }: Readonly<{ product: Product }>) {
  const dispatch = useAppDispatch();
  const tone = getProductVisualTone(product);
  const toneStyle =
    {
      '--product-tone': tone.badge,
      '--product-tone-from': tone.from,
      '--product-tone-to': tone.to,
    } as CSSProperties;
  const badgeToneStyle = {
    backgroundColor: `color-mix(in srgb, ${tone.badge} 12%, transparent)`,
    color: tone.badge,
  } as CSSProperties;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      style={toneStyle}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl transition-shadow hover:shadow-glow"
    >
      <BorderBeam
        duration={9}
        colorFrom="var(--product-tone-from)"
        colorTo="var(--product-tone-to)"
        className="opacity-0 transition-opacity group-hover:opacity-90"
      />
      <div className="relative h-52 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="relative space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge style={badgeToneStyle}>{product.category}</Badge>
            <span className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-xs font-semibold text-foreground/65">
              {tone.name}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-sm font-semibold">
            <Star className="h-3.5 w-3.5 fill-[var(--product-tone)] text-[var(--product-tone)]" /> {product.rating}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-black">{product.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-foreground/70">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <strong className="text-xl">{formatMoney(product.price)}</strong>
          <Button onClick={() => dispatch(addToCart(product))}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
