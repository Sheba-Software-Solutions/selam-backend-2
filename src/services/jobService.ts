import { JobRepository } from '../repositories/jobRepo';

export class JobService {
  private repo: JobRepository;
  constructor(repo: JobRepository) {
    this.repo = repo;
  }

  async listJobs(filter: any, pagination: any) {
    return this.repo.list(filter, pagination);
  }

  async getJob(id: string) {
    return this.repo.getById(id);
  }

  async createJob(data: any) {
    return this.repo.create(data);
  }

  async updateJob(id: string, data: any) {
    return this.repo.update(id, data);
  }

  async archiveJob(id: string) {
    return this.repo.archive(id);
  }

  async publishJob(id: string, publish: boolean) {
    return this.repo.publish(id, publish);
  }
}
