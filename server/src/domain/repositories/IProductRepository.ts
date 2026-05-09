import { Product } from '../entities/Product';

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findByCategory(category: string, page: number, limit: number): Promise<Product[]>;
  search(query: string, page: number, limit: number): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  findAll(page: number, limit: number): Promise<Product[]>;
  count(): Promise<number>;
  countByCategory(category: string): Promise<number>;
}