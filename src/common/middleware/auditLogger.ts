import { AuditLog } from '../../models/AuditLog';
import { Request, Response, NextFunction } from 'express';

export async function logAdminAction(req: Request, res: Response, next: NextFunction) {
  // Call this middleware after a successful admin mutation
  const user = (req as any).user;
  if (!user) return next();

  // You can pass audit details via res.locals.audit
  const audit = res.locals.audit;
  if (!audit) return next();

  await AuditLog.create({
    actorId: user.sub,
    entityType: audit.entityType,
    entityId: audit.entityId,
    action: audit.action,
    metadata: audit.metadata,
  });
  next();
}
