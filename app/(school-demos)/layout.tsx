import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display, Manrope } from 'next/font/google';
import '@/components/demos/demo-reset.css';
const body = DM_Sans({ subsets: ['latin'], variable: '--school-sans', display: 'swap' });
const editorial = Playfair_Display({ subsets: ['latin'], variable: '--school-serif', display: 'swap' });
const modern = Manrope({ subsets: ['latin'], variable: '--school-modern', display: 'swap' });
export const metadata: Metadata = { icons: { icon: '/school-demos/favicon.svg' }, robots: { index: false, follow: true }, title: { default: 'School Website Demonstrations | PentaForge', template: '%s' } };
export default function DemoRootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" className={`${body.variable} ${editorial.variable} ${modern.variable}`}><body>{children}</body></html>; }
