import type { Metadata } from 'next';
import { absoluteUrl, site } from '@/config/site';
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const parts = path.split('/').filter(Boolean);
  const imagePath = `/og/${parts.length === 2 && ['work', 'products', 'insights'].includes(parts[0]) ? parts[1] : 'default'}`;
  const image = absoluteUrl(imagePath);
  return { title, description, alternates: { canonical: absoluteUrl(path) }, openGraph: { title: `${title} | PentaForge`, description, url: absoluteUrl(path), siteName: site.companyName, type: 'website', locale: 'en_IN', ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: `${title} — PentaForge` }] } : {}) }, twitter: { card: 'summary_large_image', title: `${title} | PentaForge`, description, ...(image ? { images: [image] } : {}) } };
}
