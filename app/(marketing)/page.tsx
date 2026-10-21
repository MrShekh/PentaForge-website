import { Hero } from '@/components/sections/hero';
import { FinalCTA } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';
import { HomeContent } from '@/components/sections/home-content';
export const metadata = {
  ...pageMetadata('Custom Software Development in Gujarat', 'PentaForge builds custom business software, ERP systems, web and mobile applications for businesses in Rajkot, Ahmedabad and across Gujarat.', '/'),
  title: 'Custom Software Development in Gujarat | PentaForge',
};
export default function Home() { return <><Hero /><HomeContent /><FinalCTA /></>; }
