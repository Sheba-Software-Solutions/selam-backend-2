import { Router, Request, Response } from 'express';
import { JobService } from '../services/jobService';
import { JobRepository } from '../repositories/jobRepo';

const router = Router();
const jobService = new JobService(new JobRepository());

// GET /api/v1/jobs
router.get('/', async (req: Request, res: Response) => {
  try {
    const jobs = await jobService.listJobs({}, {});
    res.json({ success: true, data: jobs, meta: { pagination: {} } });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to list jobs' } });
  }
});

// GET /api/v1/jobs/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const job = await jobService.getJob(req.params.id);
    if (!job) return res.status(404).json({ success: false, error: { message: 'Job not found' } });
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to get job' } });
  }
});

// POST /api/v1/jobs
router.post('/', async (req: Request, res: Response) => {
  try {
    const job = await jobService.createJob(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to create job' } });
  }
});

// PUT /api/v1/jobs/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const job = await jobService.updateJob(req.params.id, req.body);
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to update job' } });
  }
});

// PATCH /api/v1/jobs/:id
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const job = await jobService.updateJob(req.params.id, req.body);
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to update job' } });
  }
});

// POST /api/v1/jobs/:id/publish
router.post('/:id/publish', async (req: Request, res: Response) => {
  try {
    await jobService.publishJob(req.params.id, req.body.publish);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to publish/unpublish job' } });
  }
});

// DELETE /api/v1/jobs/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await jobService.archiveJob(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to archive job' } });
  }
});

export default router;
