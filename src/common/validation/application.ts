import { z } from 'zod';

export const applicationSchema = z.object({
  candidateName: z.string().min(2).max(120),
  candidateEmail: z.string().email(),
  candidatePhone: z.string().optional(),
  coverLetter: z.string().max(5000).optional(),
  resumeUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
});
