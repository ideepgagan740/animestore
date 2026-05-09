import { injectable } from 'inversify';
import { OrderModel, IOrderDocument } from '../models/OrderModel';
import { IOrderRepository } from '../../../domain/repositories/IOrderRepository';
import { OrderEntity, OrderStatus } from '../../../domain/entities/Order';

@injectable()
export class OrderRepositoryImpl implements IOrderRepository {
  async findById(id: string): Promise<OrderEntity | null> {
    const orderDoc = await OrderModel.findById(id);
    if (!orderDoc) return null;
    return this.toEntity(orderDoc);
  }

  async findByUserId(userId: string, page: number, limit: number): Promise<OrderEntity[]> {
    const orders = await OrderModel.find({ 'user.id': userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return orders.map(this.toEntity);
  }

  async create(order: OrderEntity): Promise<OrderEntity> {
    const orderDoc = new OrderModel({
      user: order.user,
      items: order.items,
      totalPrice: order.totalPrice,
      status: order.status,
      shippingAddress: order.shippingAddress,
      paymentId: order.paymentId,
    });
    const savedDoc = await orderDoc.save();
    return this.toEntity(savedDoc);
  }

  async update(order: OrderEntity): Promise<OrderEntity> {
    const updatedDoc = await OrderModel.findByIdAndUpdate(
      order.id,
      {
        user: order.user,
        items: order.items,
        totalPrice: order.totalPrice,
        status: order.status,
        shippingAddress: order.shippingAddress,
        paymentId: order.paymentId,
      },
      { new: true }
    );
    if (!updatedDoc) throw new Error('Order not found');
    return this.toEntity(updatedDoc);
  }

  async delete(id: string): Promise<void> {
    await OrderModel.findByIdAndDelete(id);
  }

  async findByStatus(status: OrderStatus, page: number, limit: number): Promise<OrderEntity[]> {
    const orders = await OrderModel.find({ status })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return orders.map(this.toEntity);
  }

  async count(): Promise<number> {
    return OrderModel.countDocuments();
  }

  async countByUserId(userId: string): Promise<number> {
    return OrderModel.countDocuments({ 'user.id': userId });
  }

  private toEntity(doc: IOrderDocument): OrderEntity {
    return new OrderEntity(
      doc._id.toString(),
      doc.user,
      doc.items,
      doc.totalPrice,
      doc.status,
      doc.shippingAddress,
      doc.paymentId,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}