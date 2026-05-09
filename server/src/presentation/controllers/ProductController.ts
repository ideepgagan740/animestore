import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { CreateProductUseCase } from '../../application/use-cases/CreateProductUseCase';
import { CreateProductDTO } from '../../application/dtos/ProductDTOs';

@injectable()
export class ProductController {
  constructor(
    @inject('CreateProductUseCase') private createProductUseCase: CreateProductUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: CreateProductDTO = req.body;
      const result = await this.createProductUseCase.execute(dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Implementation would go here
      res.status(200).json({ message: 'Get all products' });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      // Implementation would go here
      res.status(200).json({ message: `Get product ${id}` });
    } catch (error) {
      next(error);
    }
  }
}