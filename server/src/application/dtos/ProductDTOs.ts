export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  animeId: string;
  stock: number;
  images: string[];
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  images?: string[];
}

export interface ProductResponseDTO {
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
}

export interface ProductListDTO {
  products: ProductResponseDTO[];
  total: number;
  page: number;
  limit: number;
}