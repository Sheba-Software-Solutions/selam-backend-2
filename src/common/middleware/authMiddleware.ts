import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../auth/jwt';
import { ApiError } from '../errors/ApiError';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json(new ApiError(401, 'UNAUTHORIZED', 'Missing Authorization header'));
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json(new ApiError(401, 'UNAUTHORIZED', 'Missing access token'));
  try {
    const payload = verifyAccessToken(token);
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(401).json(new ApiError(401, 'UNAUTHORIZED', 'Invalid or expired token'));
  }
}

export function requireRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json(new ApiError(403, 'FORBIDDEN', 'Insufficient role'));
    }
    next();
  };
}
