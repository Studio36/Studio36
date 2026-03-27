import { MetadataRoute } from 'next';
import { getAllPhotosets } from '@/app/[locale]/actions/photosetActions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://studio36.md';
  const photosets = await getAllPhotosets();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/ro`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/ro/proiecte`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/en/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  const photosetRoutes: MetadataRoute.Sitemap = photosets.flatMap((photoset) => [
    { url: `${baseUrl}/ro/fotoset/${photoset.id}`, lastModified: photoset.createdAt, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/en/photoset/${photoset.id}`, lastModified: photoset.createdAt, changeFrequency: 'monthly', priority: 0.7 },
  ]);

  return [...staticRoutes, ...photosetRoutes];
}
