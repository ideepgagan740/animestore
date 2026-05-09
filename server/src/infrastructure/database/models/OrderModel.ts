import mongoose, { Schema, Document } from 'mongoose';
import { OrderStatus } from '../../../domain/entities/Order';

export interface IOrderDocument extends Document {
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
  status: OrderStatus;
  shippingAddress: string;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrderDocument>({
  user: {
    id: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  items: [{
    product: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
  shippingAddress: { type: String, required: true },
  paymentId: String,
}, {
  timestamps: true,
});

// Indexes
OrderSchema.index({ 'user.id': 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

export const OrderModel = mongoose.model<IOrderDocument>('Order', OrderSchema);