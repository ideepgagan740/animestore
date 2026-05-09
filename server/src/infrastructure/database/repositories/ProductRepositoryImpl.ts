import { injectable } from 'inversify';
import { ProductModel, IProductDocument } from '../models/ProductModel';
import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { ProductEntity } from '../../../domain/entities/Product';

@injectable()
export class ProductRepositoryImpl implements IProductRepository {
  async findById(id: string): Promise<ProductEntity | null> {
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) return null;
    return this.toEntity(productDoc);
  }

  async findByCategory(category: string, page: number, limit: number): Promise<ProductEntity[]> {
    const products = await ProductModel.find({ category, isActive: true })
      .skip((page - 1) * limit)
      .limit(limit);
    return products.map(this.toEntity);
  }

  async search(query: string, page: number, limit: number): Promise<ProductEntity[]> {
    const products = await ProductModel.find({
      $text: { $search: query },
      isActive: true,
    })
      .skip((page - 1) * limit)
      .limit(limit);
    return products.map(this.toEntity);
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    const productDoc = new ProductModel({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      anime: product.anime,
      stock: product.stock,
      images: product.images,
      isActive: product.isActive,
    });
    const savedDoc = await productDoc.save();
    return this.toEntity(savedDoc);
  }

  async update(product: ProductEntity): Promise<ProductEntity> {
    const updatedDoc = await ProductModel.findByIdAndUpdate(
      product.id,
      {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        anime: product.anime,
        stock: product.stock,
        images: product.images,
        isActive: product.isActive,
      },
      { new: true }
    );
    if (!updatedDoc) throw new Error('Product not found');
    return this.toEntity(updatedDoc);
  }

  async delete(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id);
  }

  async findAll(page: number, limit: number): Promise<ProductEntity[]> {
    const products = await ProductModel.find({ isActive: true })
      .skip((page - 1) * limit)
      .limit(limit);
    return products.map(this.toEntity);
  }

  async count(): Promise<number> {
    return ProductModel.countDocuments({ isActive: true });
  }

  async countByCategory(category: string): Promise<number> {
    return ProductModel.countDocuments({ category, isActive: true });
  }

  private toEntity(doc: IProductDocument): ProductEntity {
    return new ProductEntity(
      doc._id.toString(),
      doc.name,
      doc.description,
      doc.price,
      doc.category,
      doc.anime,
      doc.stock,
      doc.images,
      doc.isActive,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}