import { AdminUserRepository } from '../repositories/adminUserRepo';

export class AuthService {
  private repo: AdminUserRepository;
  constructor(repo: AdminUserRepository) {
    this.repo = repo;
  }

  async login(email: string, password: string) {
  const user = await this.repo.login(email);
  if (!user) return null;
  // Use bcryptjs to compare password
  const bcrypt = await import('bcryptjs');
  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? user : null;
  }

  async refresh(token: string) {
    return this.repo.refresh(token);
  }

  async logout(token: string) {
    return this.repo.logout(token);
  }

  async getProfile(userId: string) {
    return this.repo.getProfile(userId);
  }
}
