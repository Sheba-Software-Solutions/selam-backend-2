import { AuditRepository } from '../repositories/auditRepo';

export class AuditService {
  private repo: AuditRepository;
  constructor(repo: AuditRepository) {
    this.repo = repo;
  }

  async listLogs(filter: any, pagination: any) {
    return this.repo.list(filter, pagination);
  }
}
