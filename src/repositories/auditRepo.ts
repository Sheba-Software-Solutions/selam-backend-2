import { AuditLog } from '../models/AuditLog';

export class AuditRepository {
  async list(filter: any, pagination: any) {
    const query: any = {};
    if (filter.actorId) query.actorId = filter.actorId;
    if (filter.entityType) query.entityType = filter.entityType;
    if (filter.entityId) query.entityId = filter.entityId;

    let sort: any = { createdAt: -1 };
    if (pagination?.sort) {
      const [field, direction] = pagination.sort.split(':');
      sort = { [field]: direction === 'desc' ? -1 : 1 };
    }

    return AuditLog.find(query)
      .sort(sort)
      .limit(pagination?.limit || 20)
      .exec();
  }
}
