import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../shared/errors/CustomErrors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      errors: err.serializeErrors(),
    });
    return;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: Object.values((err as any).errors).map((e: any) => ({
        message: e.message,
        field: e.path,
      })),
    });
    return;
  }

  // Mongoose duplicate key error
  if ((err as any).code === 11000) {
    res.status(409).json({
      success: false,
      error: 'Duplicate entry',
      message: 'A record with this information already exists',
    });
    return;
  }

  // Default error
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
};