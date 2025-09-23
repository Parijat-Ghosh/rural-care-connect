
import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query
  });


  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';


  if (err.name === 'ValidationError') {
    statusCode = 400;
    const validationErrors = Object.values((err as any).errors).map((error: any) => ({
      field: error.path,
      message: error.message
    }));
    return res.status(statusCode).json({
      success: false,
      message: 'Validation failed',
      errors: validationErrors
    });
  }

  
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

 
  if ((err as any).code === 11000) {
    statusCode = 409;
    const field = Object.keys((err as any).keyValue)[0];
    message = `Patient with this ${field} already exists`;
  }


  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
};
