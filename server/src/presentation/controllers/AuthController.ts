import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase';
import { LoginUserUseCase } from '../../application/use-cases/LoginUserUseCase';
import { RegisterUserDTO, LoginUserDTO } from '../../application/dtos/AuthDTOs';

@injectable()
export class AuthController {
  constructor(
    @inject('RegisterUserUseCase') private registerUserUseCase: RegisterUserUseCase,
    @inject('LoginUserUseCase') private loginUserUseCase: LoginUserUseCase,
  ) {}

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: RegisterUserDTO = req.body;
      const result = await this.registerUserUseCase.execute(dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: LoginUserDTO = req.body;
      const result = await this.loginUserUseCase.execute(dto);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}