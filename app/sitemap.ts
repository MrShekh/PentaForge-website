import type { MetadataRoute } from 'next';
import { publicRoutes } from '@/lib/routes';
import { site } from '@/config/site';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.siteUrl) return [];
  // This inventory contains published marketing pages only; demos and drafts are excluded.
  // Omit lastModified until reliable content modification dates are maintained.
  return [...new Set(publicRoutes)].map(path => ({ url: new URL(path, site.siteUrl).toString() }));
}
