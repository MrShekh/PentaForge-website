import type { MetadataRoute } from 'next';
import { publicRoutes } from '@/lib/routes';
import { site } from '@/config/site';
export default function sitemap(): MetadataRoute.Sitemap { if (!site.siteUrl) return []; return publicRoutes.map(path => ({ url: new URL(path, site.siteUrl).toString() })); }
