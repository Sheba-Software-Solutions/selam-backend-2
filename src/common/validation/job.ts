import { z } from 'zod';

export const jobSchema = z.object({
  title: z.string().min(3).max(120),
  department: z.string().max(80).optional(),
  location: z.string().max(120),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN']),
  description: z.string().max(5000),
  requirements: z.array(z.string().min(2).max(80)),
  responsibilities: z.array(z.string().min(2).max(80)),
  compensationRange: z.string().max(80).optional(),
  isPublished: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  publishAt: z.string().optional(),
  closeAt: z.string().optional(),
});
