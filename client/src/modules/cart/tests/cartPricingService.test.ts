import { calculateCartSubtotal } from '@modules/cart/services/cartPricingService';

describe('calculateCartSubtotal', () => {
  it('calculates product quantity totals', () => {
    const subtotal = calculateCartSubtotal([
      {
        quantity: 2,
        product: {
          id: '1',
          title: 'Figure',
          slug: 'figure',
          description: 'Collectible',
          imageUrl: '/image.png',
          price: { amount: 10, currency: 'USD' },
          rating: 5,
          stock: 3,
          category: 'Figures',
          tags: [],
        },
      },
    ]);

    expect(subtotal).toBe(20);
  });
});
