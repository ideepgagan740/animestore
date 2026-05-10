import { apiClient } from '@services/api/apiClient';
import { apiRoutes } from '@config/apiRoutes';
import type { CartItem } from '@modules/cart/types/cart.types';

interface CheckoutRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: string;
}

export const cartApi = {
  checkout: (items: CartItem[], shippingAddress: string) => {
    const body: CheckoutRequest = {
      items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity })),
      shippingAddress,
    };

    return apiClient.post<{ id: string }, CheckoutRequest>(apiRoutes.orders.create, body);
  },
};
