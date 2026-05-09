import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { CreateOrderUseCase } from '../../application/use-cases/CreateOrderUseCase';
import { CreateOrderDTO } from '../../application/dtos/OrderDTOs';

@injectable()
export class OrderController {
  constructor(
    @inject('CreateOrderUseCase') private createOrderUseCase: CreateOrderUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.userId; // From auth middleware
      const dto: CreateOrderDTO = req.body;
      const result = await this.createOrderUseCase.execute(userId, dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      // Implementation would go here
      res.status(200).json({ message: `Get orders for user ${userId}` });
    } catch (error) {
      next(error);
    }
  }
}