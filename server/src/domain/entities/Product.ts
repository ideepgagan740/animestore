import { Anime } from './Anime';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  anime: Anime;
  stock: number;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductEntity implements Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public anime: Anime,
    public stock: number,
    public images: string[],
    public isActive: boolean = true,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  updateStock(newStock: number): void {
    this.stock = newStock;
    this.updatedAt = new Date();
  }

  reduceStock(quantity: number): void {
    if (this.stock >= quantity) {
      this.stock -= quantity;
      this.updatedAt = new Date();
    } else {
      throw new Error('Insufficient stock');
    }
  }

  updateDetails(
    name?: string,
    description?: string,
    price?: number,
    category?: string,
    images?: string[],
  ): void {
    if (name) this.name = name;
    if (description) this.description = description;
    if (price) this.price = price;
    if (category) this.category = category;
    if (images) this.images = images;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }
}