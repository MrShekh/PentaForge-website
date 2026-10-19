import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
export default function robots(): MetadataRoute.Robots {
  if (!site.siteUrl) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/', '/private/'] }, sitemap: `${site.siteUrl}/sitemap.xml` };
}
