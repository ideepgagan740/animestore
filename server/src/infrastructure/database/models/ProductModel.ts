import mongoose, { Schema, Document } from 'mongoose';
import { Product } from '../../../domain/entities/Product';

export interface IProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  anime: {
    id: string;
    title: string;
    description: string;
    genre: string[];
    releaseDate: Date;
    episodes: number;
    rating: number;
    imageUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  stock: number;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProductDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  anime: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    genre: [String],
    releaseDate: Date,
    episodes: Number,
    rating: Number,
    imageUrl: String,
    isActive: { type: Boolean, default: true },
    createdAt: Date,
    updatedAt: Date,
  },
  stock: { type: Number, required: true, min: 0 },
  images: [String],
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

// Indexes
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ 'anime.id': 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ stock: 1 });
ProductSchema.index({ isActive: 1 });

export const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);