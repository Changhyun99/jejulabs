import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const site = 'https://jejulabs.com';

  // 고정 페이지들
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/contact', changefreq: 'monthly', priority: '0.7' },
    { url: '/category/people', changefreq: 'weekly', priority: '0.8' },
    { url: '/category/reinterpret', changefreq: 'weekly', priority: '0.8' },
    { url: '/category/object', changefreq: 'weekly', priority: '0.8' },
    { url: '/category/culture', changefreq: 'weekly', priority: '0.8' },
    { url: '/category/notice', changefreq: 'weekly', priority: '0.7' },
    { url: '/en/', changefreq: 'monthly', priority: '0.8' },
    { url: '/cn/', changefreq: 'monthly', priority: '0.8' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${site}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${posts.map(post => `  <url>
    <loc>${site}/blog/${post.id}</loc>
    <lastmod>${post.data.date.toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
