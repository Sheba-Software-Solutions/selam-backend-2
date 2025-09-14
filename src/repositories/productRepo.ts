import { Product, ProductStatus } from '../models/Product';

export class ProductRepository {
  async list(filter: any, pagination: { limit: number; cursor?: string; sort?: string }) {
    const query: any = {};
    if (filter.status) query.status = filter.status;
    if (filter.category) query.category = filter.category;
    if (filter.isArchived !== undefined) query.isArchived = filter.isArchived;

    let sort: any = { createdAt: -1 };
    if (pagination.sort) {
      const [field, direction] = pagination.sort.split(':');
      sort = { [field]: direction === 'desc' ? -1 : 1 };
    }

    const cursorQuery = pagination.cursor ? { _id: { $gt: pagination.cursor } } : {};
    return Product.find({ ...query, ...cursorQuery })
      .sort(sort)
      .limit(pagination.limit)
      .exec();
  }

  async getById(id: string) {
    return Product.findById(id).exec();
  }

  async create(data: any) {
    return Product.create(data);
  }

  async update(id: string, data: any) {
    return Product.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async softDelete(id: string) {
    return Product.findByIdAndUpdate(id, { isArchived: true }, { new: true }).exec();
  }

  async changeStatus(id: string, status: ProductStatus) {
    return Product.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }
}
