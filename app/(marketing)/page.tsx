import { Hero } from '@/components/sections/hero';
import { FinalCTA } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/config/site';
import { HomeContent } from '@/components/sections/home-content';
export const metadata = { ...pageMetadata('Custom Software & Digital Product Engineering', site.description, '/'), title: { absolute: 'PentaForge | Custom Software & Digital Product Engineering' } };
export default function Home() { return <><Hero /><HomeContent /><FinalCTA /></>; }
