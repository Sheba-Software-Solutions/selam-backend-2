import { JobPosting, EmploymentType } from '../models/JobPosting';

export class JobRepository {
  async list(filter: any, pagination: any) {
    const query: any = {};
    if (filter.employmentType) query.employmentType = filter.employmentType;
    if (filter.isArchived !== undefined) query.isArchived = filter.isArchived;
    if (filter.isPublished !== undefined) query.isPublished = filter.isPublished;

    let sort: any = { createdAt: -1 };
    if (pagination?.sort) {
      const [field, direction] = pagination.sort.split(':');
      sort = { [field]: direction === 'desc' ? -1 : 1 };
    }

    return JobPosting.find(query)
      .sort(sort)
      .limit(pagination?.limit || 20)
      .exec();
  }

  async getById(id: string) {
    return JobPosting.findById(id).exec();
  }

  async create(data: any) {
    return JobPosting.create(data);
  }

  async update(id: string, data: any) {
    return JobPosting.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async archive(id: string) {
    return JobPosting.findByIdAndUpdate(id, { isArchived: true }, { new: true }).exec();
  }

  async publish(id: string, publish: boolean) {
    return JobPosting.findByIdAndUpdate(id, { isPublished: publish }, { new: true }).exec();
  }
}
