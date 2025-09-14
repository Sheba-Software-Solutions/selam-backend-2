import { AdminUser } from '../models/AdminUser';

export class AdminUserRepository {
  async login(email: string) {
    // TODO: Implement password check and JWT
    return AdminUser.findOne({ email }).exec();
  }

  async refresh(token: string) {
    // TODO: Implement refresh token logic
    return null;
  }

  async logout(token: string) {
    // TODO: Implement logout logic
    return null;
  }

  async getProfile(userId: string) {
    return AdminUser.findById(userId).exec();
  }
}
