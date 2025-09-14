import { Router, Request, Response } from 'express';
import { ContactService } from '../services/contactService';
import { ContactRepository } from '../repositories/contactRepo';

const router = Router();
const contactService = new ContactService(new ContactRepository());

// POST /api/v1/contact
router.post('/', async (req: Request, res: Response) => {
  try {
    const message = await contactService.submitMessage(req.body);
    res.status(201).json({ success: true, data: message });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to submit contact message' } });
  }
});

// GET /api/v1/contact-messages
router.get('/messages', async (req: Request, res: Response) => {
  try {
    const messages = await contactService.listMessages({}, {});
    res.json({ success: true, data: messages, meta: { pagination: {} } });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to list contact messages' } });
  }
});

// GET /api/v1/contact-messages/:id
router.get('/messages/:id', async (req: Request, res: Response) => {
  try {
    const message = await contactService.getMessage(req.params.id);
    if (!message) return res.status(404).json({ success: false, error: { message: 'Message not found' } });
    res.json({ success: true, data: message });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to get contact message' } });
  }
});

// PATCH /api/v1/contact-messages/:id/status
router.patch('/messages/:id/status', async (req: Request, res: Response) => {
  try {
    await contactService.updateStatus(req.params.id, req.body.status, req.body.handlerId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: { message: 'Failed to update contact message status' } });
  }
});

export default router;
