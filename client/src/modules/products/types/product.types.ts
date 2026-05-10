import type { Money } from '@core/domain/money';

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: Money;
  rating: number;
  stock: number;
  category: string;
  tags: string[];
}

export interface ProductFilters {
  search?: string;
  category?: string;
}
