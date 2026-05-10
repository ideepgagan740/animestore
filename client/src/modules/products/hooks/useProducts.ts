import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@modules/products/api/productsApi';
import type { ProductFilters } from '@modules/products/types/product.types';

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsApi.list(filters),
  });
}
