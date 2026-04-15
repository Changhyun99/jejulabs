import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum([
      'brand-story',
      'ingredient',
      'beauty-lab',
      'jeju-life',
      'notice'
    ]),
    thumbnail: z.string().optional(),
    author: z.string().default('JEJULABS'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
