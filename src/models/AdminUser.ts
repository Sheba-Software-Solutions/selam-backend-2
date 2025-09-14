import mongoose, { Schema, Document } from 'mongoose';

export enum AdminRole {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface IAdminUser extends Document {
  email: string;
  passwordHash: string;
  displayName: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String, required: true },
  role: { type: String, enum: Object.values(AdminRole), default: AdminRole.ADMIN },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const AdminUser = mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
