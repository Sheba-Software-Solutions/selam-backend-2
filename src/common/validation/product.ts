import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3).max(120),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/).max(120),
  category: z.string().min(2).max(60),
  shortDescription: z.string().max(255),
  longDescription: z.string().max(5000).optional(),
  features: z.array(z.string().min(2).max(80)).max(25),
  priceModel: z.string().max(80),
  status: z.enum(['ACTIVE', 'COMING_SOON', 'DISCONTINUED']),
  heroImageUrl: z.string().url().optional(),
  gallery: z.array(z.string().url()).optional(),
});
