import type { Metadata } from 'next';
import { Manrope, IBM_Plex_Mono } from 'next/font/google';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/layout/footer';
import { JsonLd } from '@/components/ui';
import { site, absoluteUrl } from '@/config/site';
import '../globals.css';
import '../content.css';
import '../screenshots.css';
import '../industry-expansion.css';
import { navigation } from '@/data/navigation';
import { LinkEvents } from '@/components/analytics-events';
import { AnalyticsConsent } from '@/components/analytics';
const sans = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex', display: 'swap' });
export const metadata: Metadata = { metadataBase: site.siteUrl ? new URL(site.siteUrl) : undefined, title: { default: 'PentaForge | Custom Software & Digital Product Engineering', template: '%s | PentaForge' }, description: site.description, icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/icon-32.png', sizes: '32x32' }], apple: '/apple-touch-icon.png' }, verification: { google: process.env.GOOGLE_SITE_VERIFICATION }, robots: { index: !!site.siteUrl, follow: true } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={`${sans.variable} ${mono.variable}`}><body id="top"><a className="skip-link" href="#main-content">Skip to content</a><Navbar navigation={navigation} /><main id="main-content">{children}</main><Footer /><AnalyticsConsent /><LinkEvents /><JsonLd data={[{ '@context': 'https://schema.org', '@type': 'Organization', name: site.companyName, url: absoluteUrl('/'), logo: absoluteUrl('/icon-512.png'), address: { '@type': 'PostalAddress', addressLocality: 'Ahmedabad', addressRegion: 'Gujarat', addressCountry: 'IN' }, ...(site.email ? { email: site.email } : {}), ...(site.phone ? { telephone: site.phone } : {}), sameAs: site.socials.map(s => s.url) }, { '@context': 'https://schema.org', '@type': 'WebSite', name: site.companyName, url: absoluteUrl('/'), description: site.description }]} /></body></html>; }
