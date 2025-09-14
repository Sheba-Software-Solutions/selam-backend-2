import { Router, Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { AdminUserRepository } from '../repositories/adminUserRepo';
import { loginSchema } from '../common/validation/auth';
import logger from '../infra/logger';
import type pino from 'pino';
const typedLogger: pino.Logger = logger;

const router = Router();
const authService = new AuthService(new AdminUserRepository());

// POST /api/v1/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
  typedLogger.warn({ issues: parseResult.error.issues }, 'Login validation failed');
  return res.status(400).json({ success: false, error: { message: 'Invalid request', details: parseResult.error.issues } });
    }
    const { email, password } = parseResult.data;
    const user = await authService.login(email, password);
    if (!user) return res.status(401).json({ success: false, error: { message: 'Invalid credentials' } });
    res.json({ success: true, data: user });
  } catch (err) {
  typedLogger.error({ err }, 'Login error');
  res.status(500).json({ success: false, error: { message: 'Failed to login', details: err instanceof Error ? err.message : err } });
  }
});

// POST /api/v1/auth/refresh
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const result = await authService.refresh(req.body.token);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to refresh token' } });
  }
});

// POST /api/v1/auth/logout
router.post('/logout', async (req: Request, res: Response) => {
  try {
    await authService.logout(req.body.token);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to logout' } });
  }
});

// GET /api/v1/auth/me
router.get('/me', async (req: Request, res: Response) => {
  try {
    // In a real app, get userId from JWT
    const userId = req.query.userId as string;
    const profile = await authService.getProfile(userId);
    if (!profile) return res.status(404).json({ success: false, error: { message: 'User not found' } });
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to get profile' } });
  }
});

export default router;
