import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://studio36.md';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/en/admin', '/ro/admin', '/en/login', '/ro/login'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
