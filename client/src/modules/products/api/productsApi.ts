import { apiClient } from '@services/api/apiClient';
import { apiRoutes } from '@config/apiRoutes';
import type { Product, ProductFilters } from '@modules/products/types/product.types';
import type { PaginatedResponse } from '@types/api';

interface BackendProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  anime?: {
    id: string;
    title: string;
    genre: string[];
  };
  stock: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BackendProductListResponse {
  products: BackendProduct[];
  total: number;
  page: number;
  limit: number;
}

const fallbackProducts: Product[] = [
  {
    id: 'naruto-figure',
    title: 'Naruto Sage Mode Figure',
    slug: 'naruto-sage-mode-figure',
    description: 'Premium collectible with battle-ready detailing and display base.',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80',
    price: { amount: 59.99, currency: 'USD' },
    rating: 4.8,
    stock: 18,
    category: 'Figures',
    tags: ['Naruto', 'Collectible'],
  },
  {
    id: 'manga-box',
    title: 'Classic Manga Starter Box',
    slug: 'classic-manga-starter-box',
    description: 'Curated beginner-friendly manga volumes for new anime fans.',
    imageUrl: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=900&q=80',
    price: { amount: 84.5, currency: 'USD' },
    rating: 4.6,
    stock: 9,
    category: 'Manga',
    tags: ['Manga', 'Bundle'],
  },
  {
    id: 'akatsuki-hoodie',
    title: 'Akatsuki Cloud Hoodie',
    slug: 'akatsuki-cloud-hoodie',
    description: 'Soft oversized hoodie with embroidered cloud details.',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
    price: { amount: 72, currency: 'USD' },
    rating: 4.9,
    stock: 24,
    category: 'Apparel',
    tags: ['Streetwear', 'Hoodie'],
  },
];

function mapBackendProduct(product: BackendProduct): Product {
  return {
    id: product.id,
    title: product.name,
    slug: product.id,
    description: product.description,
    imageUrl: product.images[0] ?? '/placeholder-product.png',
    price: { amount: product.price, currency: 'USD' },
    rating: 0,
    stock: product.stock,
    category: product.category,
    tags: product.anime?.genre ?? [],
  };
}

function fallbackProductList(filters?: ProductFilters): PaginatedResponse<Product> {
  const search = filters?.search?.toLowerCase();
  const data = search
    ? fallbackProducts.filter((product) => product.title.toLowerCase().includes(search))
    : fallbackProducts;

  return { data, page: 1, limit: data.length, total: data.length };
}

export const productsApi = {
  list: async (filters?: ProductFilters) => {
    try {
      const response = await apiClient.get<BackendProductListResponse | { message: string }>(
        apiRoutes.products.list,
        filters,
      );

      if ('products' in response) {
        return {
          data: response.products.map(mapBackendProduct),
          page: response.page,
          limit: response.limit,
          total: response.total,
        };
      }

      return fallbackProductList(filters);
    } catch {
      return fallbackProductList(filters);
    }
  },
  getById: async (id: string) => {
    const response = await apiClient.get<BackendProduct | { message: string }>(apiRoutes.products.detail(id));

    if ('name' in response) {
      return mapBackendProduct(response);
    }

    return fallbackProducts.find((product) => product.id === id) ?? null;
  },
};
