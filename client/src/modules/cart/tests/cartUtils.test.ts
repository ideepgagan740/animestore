import { countCartItems } from '@modules/cart/utils/cart.utils';

describe('countCartItems', () => {
  it('counts item quantities', () => {
    expect(countCartItems([])).toBe(0);
  });
});
