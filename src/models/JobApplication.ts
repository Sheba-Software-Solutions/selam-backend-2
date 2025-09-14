import mongoose, { Schema, Document } from 'mongoose';

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  IN_REVIEW = 'IN_REVIEW',
  SHORTLISTED = 'SHORTLISTED',
  REJECTED = 'REJECTED',
  HIRED = 'HIRED',
  WITHDRAWN = 'WITHDRAWN',
}

export interface IJobApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  coverLetter?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  status: ApplicationStatus;
  reviewedAt?: Date;
  reviewerId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>({
  jobId: { type: Schema.Types.ObjectId, ref: 'JobPosting', required: true },
  candidateName: { type: String, required: true },
  candidateEmail: { type: String, required: true },
  candidatePhone: { type: String },
  coverLetter: { type: String },
  resumeUrl: { type: String },
  linkedinUrl: { type: String },
  portfolioUrl: { type: String },
  status: { type: String, enum: Object.values(ApplicationStatus), default: ApplicationStatus.SUBMITTED },
  reviewedAt: { type: Date },
  reviewerId: { type: Schema.Types.ObjectId, ref: 'AdminUser' },
}, { timestamps: true });

export const JobApplication = mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
