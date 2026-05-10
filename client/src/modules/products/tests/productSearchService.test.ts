import { filterProductsBySearch } from '@modules/products/services/productSearchService';
import type { Product } from '@modules/products';

const product: Product = {
  id: '1',
  title: 'Akatsuki Hoodie',
  slug: 'akatsuki-hoodie',
  description: 'Cloud apparel',
  imageUrl: '/hoodie.png',
  price: { amount: 10, currency: 'USD' },
  rating: 5,
  stock: 1,
  category: 'Apparel',
  tags: ['Naruto'],
};

describe('filterProductsBySearch', () => {
  it('matches products by title', () => {
    expect(filterProductsBySearch([product], 'hoodie')).toHaveLength(1);
  });
});
