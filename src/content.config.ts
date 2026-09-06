import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // URL 주소. glob 로더가 파일명보다 이 값을 우선해서 씁니다.
    slug: z.string().optional(),
    description: z.string(),
    date: z.date(),
    category: z.enum(['people', 'reinterpret', 'object', 'culture', 'notice']),
    thumbnail: z.string().optional(),
    author: z.string().default('JEJULABS'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
