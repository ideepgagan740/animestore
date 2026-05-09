export interface CreateOrderDTO {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: string;
}

export interface OrderResponseDTO {
  id: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  items: {
    product: {
      id: string;
      name: string;
      price: number;
    };
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: string;
  shippingAddress: string;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderListDTO {
  orders: OrderResponseDTO[];
  total: number;
  page: number;
  limit: number;
}