import type { Product } from '@modules/products';

export function filterProductsBySearch(products: Product[], search: string) {
  const normalizedSearch = search.trim().toLowerCase();

  if (!normalizedSearch) return products;

  return products.filter((product) =>
    [product.title, product.description, product.category, ...product.tags]
      .join(' ')
      .toLowerCase()
      .includes(normalizedSearch),
  );
}
