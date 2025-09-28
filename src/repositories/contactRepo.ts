import { ContactMessage, ContactStatus } from '../models/ContactMessage';

export class ContactRepository {
  async submit(data: any) {
    // Accept firstName, lastName, phone, email, subject, message and store as separate fields
    const { firstName, lastName, email, phone, subject, message } = data;
    return ContactMessage.create({ firstName, lastName, email, phone, subject, message });
  }

  async list(filter: any, pagination: any) {
    const query: any = {};
    if (filter.status) query.status = filter.status;

    let sort: any = { createdAt: -1 };
    if (pagination?.sort) {
      const [field, direction] = pagination.sort.split(':');
      sort = { [field]: direction === 'desc' ? -1 : 1 };
    }

    return ContactMessage.find(query)
      .sort(sort)
      .limit(pagination?.limit || 20)
      .exec();
  }

  async getById(id: string) {
    return ContactMessage.findById(id).exec();
  }

  async updateStatus(id: string, status: ContactStatus, handlerId?: string) {
    return ContactMessage.findByIdAndUpdate(id, { status, handledById: handlerId }, { new: true }).exec();
  }
}
