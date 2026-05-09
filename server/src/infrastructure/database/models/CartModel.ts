import mongoose, { Schema, Document } from 'mongoose';

export interface ICartDocument extends Document {
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
      description: string;
      price: number;
      category: string;
      anime: {
        id: string;
        title: string;
        genre: string[];
      };
      stock: number;
      images: string[];
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    quantity: number;
  }[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICartDocument>({
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
      description: String,
      price: { type: Number, required: true },
      category: String,
      anime: {
        id: String,
        title: String,
        genre: [String],
      },
      stock: Number,
      images: [String],
      isActive: Boolean,
      createdAt: Date,
      updatedAt: Date,
    },
    quantity: { type: Number, required: true, min: 1 },
  }],
  totalPrice: { type: Number, default: 0 },
}, {
  timestamps: true,
});

// Indexes
CartSchema.index({ 'user.id': 1 }, { unique: true });

export const CartModel = mongoose.model<ICartDocument>('Cart', CartSchema);