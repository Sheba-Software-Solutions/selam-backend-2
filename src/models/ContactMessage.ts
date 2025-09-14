import mongoose, { Schema, Document } from 'mongoose';

export enum ContactStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  DISMISSED = 'DISMISSED',
}

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  handledById?: mongoose.Types.ObjectId;
  handledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: Object.values(ContactStatus), default: ContactStatus.NEW },
  handledById: { type: Schema.Types.ObjectId, ref: 'AdminUser' },
  handledAt: { type: Date },
}, { timestamps: true });

export const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
