import { inject, injectable } from 'inversify';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { ProductEntity } from '../../domain/entities/Product';
import { CreateProductDTO, ProductResponseDTO } from '../dtos/ProductDTOs';

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject('IProductRepository') private productRepository: IProductRepository,
  ) {}

  async execute(dto: CreateProductDTO): Promise<ProductResponseDTO> {
    // Note: In a real implementation, you'd fetch the anime entity
    // For now, we'll create a minimal anime object
    const anime = {
      id: dto.animeId,
      title: '', // Would be fetched from repository
      description: '',
      genre: [],
      releaseDate: new Date(),
      episodes: 0,
      rating: 0,
      imageUrl: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const product = new ProductEntity(
      '', // ID will be generated
      dto.name,
      dto.description,
      dto.price,
      dto.category,
      anime,
      dto.stock,
      dto.images,
    );

    const savedProduct = await this.productRepository.create(product);

    return {
      id: savedProduct.id,
      name: savedProduct.name,
      description: savedProduct.description,
      price: savedProduct.price,
      category: savedProduct.category,
      anime: {
        id: savedProduct.anime.id,
        title: savedProduct.anime.title,
        genre: savedProduct.anime.genre,
      },
      stock: savedProduct.stock,
      images: savedProduct.images,
      isActive: savedProduct.isActive,
      createdAt: savedProduct.createdAt,
      updatedAt: savedProduct.updatedAt,
    };
  }
}