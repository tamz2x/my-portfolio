import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(1).max(120),
  slug: z.string().min(1).max(80).regex(/^[a-z0-9-]+$/, 'lowercase, numbers, dashes only'),
  description: z.string().max(2000).optional().default(''),
  tags: z.array(z.string().max(30)).max(10).optional().default([]),
  cover: z.string().url().or(z.literal('')).optional(),
})

export const uploadSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  files: z.array(z.any()).max(20),
})