import { User } from './User';
import { Product } from './Product';

export interface Review {
  id: string;
  user: User;
  product: Product;
  rating: number; // 1-5
  comment: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ReviewEntity implements Review {
  constructor(
    public id: string,
    public user: User,
    public product: Product,
    public rating: number,
    public comment: string,
    public isApproved: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  approve(): void {
    this.isApproved = true;
    this.updatedAt = new Date();
  }

  updateReview(rating?: number, comment?: string): void {
    if (rating) this.rating = rating;
    if (comment) this.comment = comment;
    this.updatedAt = new Date();
  }
}