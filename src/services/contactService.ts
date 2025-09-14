import { ContactRepository } from '../repositories/contactRepo';

export class ContactService {
  private repo: ContactRepository;
  constructor(repo: ContactRepository) {
    this.repo = repo;
  }

  async submitMessage(data: any) {
    return this.repo.submit(data);
  }

  async listMessages(filter: any, pagination: any) {
    return this.repo.list(filter, pagination);
  }

  async getMessage(id: string) {
    return this.repo.getById(id);
  }

  async updateStatus(id: string, status: string, handlerId?: string) {
  return this.repo.updateStatus(id, status as import('../models/ContactMessage').ContactStatus, handlerId);
  }
}
