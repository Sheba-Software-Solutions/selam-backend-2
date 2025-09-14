import { Router, Request, Response } from 'express';
import { AuditService } from '../services/auditService';
import { AuditRepository } from '../repositories/auditRepo';

const router = Router();
const auditService = new AuditService(new AuditRepository());

// GET /api/v1/audit-logs
router.get('/', async (req: Request, res: Response) => {
  try {
    const logs = await auditService.listLogs({}, {});
    res.json({ success: true, data: logs, meta: { pagination: {} } });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to list audit logs' } });
  }
});

export default router;
