import { ProductRepository } from '../repositories/productRepo';

export class ProductService {
  private repo: ProductRepository;
  constructor(repo: ProductRepository) {
    this.repo = repo;
  }

  async listProducts(filter: any, pagination: any) {
    return this.repo.list(filter, pagination);
  }

  async getProduct(id: string) {
    return this.repo.getById(id);
  }

  async createProduct(data: any) {
    return this.repo.create(data);
  }

  async updateProduct(id: string, data: any) {
    return this.repo.update(id, data);
  }

  async deleteProduct(id: string) {
    return this.repo.softDelete(id);
  }

  async changeStatus(id: string, status: string) {
  return this.repo.changeStatus(id, status as import('../models/Product').ProductStatus);
  }
}
