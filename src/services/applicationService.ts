import { ApplicationRepository } from '../repositories/applicationRepo';

export class ApplicationService {
  private repo: ApplicationRepository;
  constructor(repo: ApplicationRepository) {
    this.repo = repo;
  }

  async submitApplication(jobId: string, data: any) {
    return this.repo.submit(jobId, data);
  }

  async listApplications(filter: any, pagination: any) {
    return this.repo.list(filter, pagination);
  }

  async getApplication(id: string) {
    return this.repo.getById(id);
  }

  async transitionStatus(id: string, status: string) {
  return this.repo.transitionStatus(id, status as import('../models/JobApplication').ApplicationStatus);
  }
}
