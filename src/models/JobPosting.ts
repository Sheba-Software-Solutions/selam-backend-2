import mongoose, { Schema, Document } from 'mongoose';

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERN = 'INTERN',
}

export interface IJobPosting extends Document {
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  description: string;
  requirements: string[];
  responsibilities: string[];
  compensationRange?: string;
  isPublished: boolean;
  isArchived: boolean;
  publishAt: Date;
  closeAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JobPostingSchema = new Schema<IJobPosting>({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: { type: String, enum: Object.values(EmploymentType), required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }],
  compensationRange: { type: String },
  isPublished: { type: Boolean, default: true },
  isArchived: { type: Boolean, default: false },
  publishAt: { type: Date, default: Date.now },
  closeAt: { type: Date },
}, { timestamps: true });

export const JobPosting = mongoose.model<IJobPosting>('JobPosting', JobPostingSchema);
