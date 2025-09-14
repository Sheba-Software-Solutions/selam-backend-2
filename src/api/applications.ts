import { Router, Request, Response } from 'express';
import { ApplicationService } from '../services/applicationService';
import { ApplicationRepository } from '../repositories/applicationRepo';

const router = Router();
const applicationService = new ApplicationService(new ApplicationRepository());

// POST /api/v1/jobs/:id/applications
router.post('/jobs/:id/applications', async (req: Request, res: Response) => {
  try {
    const application = await applicationService.submitApplication(req.params.id, req.body);
    res.status(201).json({ success: true, data: application });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to submit application' } });
  }
});

// GET /api/v1/applications
router.get('/applications', async (req: Request, res: Response) => {
  try {
    const applications = await applicationService.listApplications({}, {});
    res.json({ success: true, data: applications, meta: { pagination: {} } });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to list applications' } });
  }
});

// GET /api/v1/applications/:id
router.get('/applications/:id', async (req: Request, res: Response) => {
  try {
    const application = await applicationService.getApplication(req.params.id);
    if (!application) return res.status(404).json({ success: false, error: { message: 'Application not found' } });
    res.json({ success: true, data: application });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to get application' } });
  }
});

// PATCH /api/v1/applications/:id/status
router.patch('/applications/:id/status', async (req: Request, res: Response) => {
  try {
    await applicationService.transitionStatus(req.params.id, req.body.status);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to transition application status' } });
  }
});

export default router;
