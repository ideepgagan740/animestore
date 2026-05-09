import { User } from './User';
import { Product } from './Product';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number; // Price at the time of order
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface Order {
  id: string;
  user: User;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderEntity implements Order {
  constructor(
    public id: string,
    public user: User,
    public items: OrderItem[],
    public totalPrice: number,
    public status: OrderStatus = OrderStatus.PENDING,
    public shippingAddress: string,
    public paymentId?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  addPaymentId(paymentId: string): void {
    this.paymentId = paymentId;
    this.updatedAt = new Date();
  }
}