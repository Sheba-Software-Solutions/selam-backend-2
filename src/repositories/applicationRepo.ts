import { JobApplication, ApplicationStatus } from '../models/JobApplication';

export class ApplicationRepository {
  async submit(jobId: string, data: any) {
    return JobApplication.create({ ...data, jobId });
  }

  async list(filter: any, pagination: any) {
    const query: any = {};
    if (filter.status) query.status = filter.status;
    if (filter.jobId) query.jobId = filter.jobId;

    let sort: any = { createdAt: -1 };
    if (pagination?.sort) {
      const [field, direction] = pagination.sort.split(':');
      sort = { [field]: direction === 'desc' ? -1 : 1 };
    }

    return JobApplication.find(query)
      .sort(sort)
      .limit(pagination?.limit || 20)
      .exec();
  }

  async getById(id: string) {
    return JobApplication.findById(id).exec();
  }

  async transitionStatus(id: string, status: ApplicationStatus) {
    return JobApplication.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }
}
