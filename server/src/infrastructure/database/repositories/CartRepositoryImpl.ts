import { injectable } from 'inversify';
import { CartModel, ICartDocument } from '../models/CartModel';
import { ICartRepository } from '../../../domain/repositories/ICartRepository';
import { CartEntity } from '../../../domain/entities/Cart';

@injectable()
export class CartRepositoryImpl implements ICartRepository {
  async findById(id: string): Promise<CartEntity | null> {
    const cartDoc = await CartModel.findById(id);
    if (!cartDoc) return null;
    return this.toEntity(cartDoc);
  }

  async findByUserId(userId: string): Promise<CartEntity | null> {
    const cartDoc = await CartModel.findOne({ 'user.id': userId });
    if (!cartDoc) return null;
    return this.toEntity(cartDoc);
  }

  async create(cart: CartEntity): Promise<CartEntity> {
    const cartDoc = new CartModel({
      user: cart.user,
      items: cart.items,
      totalPrice: cart.totalPrice,
    });
    const savedDoc = await cartDoc.save();
    return this.toEntity(savedDoc);
  }

  async update(cart: CartEntity): Promise<CartEntity> {
    const updatedDoc = await CartModel.findByIdAndUpdate(
      cart.id,
      {
        user: cart.user,
        items: cart.items,
        totalPrice: cart.totalPrice,
      },
      { new: true }
    );
    if (!updatedDoc) throw new Error('Cart not found');
    return this.toEntity(updatedDoc);
  }

  async delete(id: string): Promise<void> {
    await CartModel.findByIdAndDelete(id);
  }

  private toEntity(doc: ICartDocument): CartEntity {
    return new CartEntity(
      doc._id.toString(),
      doc.user,
      doc.items,
      doc.totalPrice,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}