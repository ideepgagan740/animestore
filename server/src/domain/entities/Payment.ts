import { Order } from './Order';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
}

export interface Payment {
  id: string;
  order: Order;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PaymentEntity implements Payment {
  constructor(
    public id: string,
    public order: Order,
    public amount: number,
    public method: PaymentMethod,
    public status: PaymentStatus = PaymentStatus.PENDING,
    public transactionId?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  complete(transactionId: string): void {
    this.status = PaymentStatus.COMPLETED;
    this.transactionId = transactionId;
    this.updatedAt = new Date();
  }

  fail(): void {
    this.status = PaymentStatus.FAILED;
    this.updatedAt = new Date();
  }

  refund(): void {
    this.status = PaymentStatus.REFUNDED;
    this.updatedAt = new Date();
  }
}