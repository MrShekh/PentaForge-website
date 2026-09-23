import type { Metadata } from 'next';
import { absoluteUrl, site } from '@/config/site';
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: absoluteUrl(path) }, openGraph: { title: `${title} | PentaForge`, description, url: absoluteUrl(path), siteName: site.companyName, type: 'website', locale: 'en_IN' }, twitter: { card: 'summary', title: `${title} | PentaForge`, description } };
}
