import { Request, Response, NextFunction } from 'express';

export function parsePagination(req: Request, res: Response, next: NextFunction) {
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const cursor = req.query.cursor as string | undefined;
  req.pagination = { limit, cursor };
  next();
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      pagination?: { limit: number; cursor?: string };
    }
  }
}
