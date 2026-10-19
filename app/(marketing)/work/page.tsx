import { PageHero } from '@/components/page-hero';
import { WorkFilter } from '@/components/work-filter';
import { FinalCTA } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Built by PentaForge — Our Work', 'Explore real PentaForge systems for jewellery manufacturing, polishing, stock management and customer billing.', '/work');
export default function Page() { return <><PageHero category="Built by PentaForge" title="Real workflows. Thoughtfully engineered." summary="Software built around the way businesses operate. Explore real interfaces for manufacturing, polishing, stock management and billing." breadcrumbs={[{ label: 'Work', href: '/work' }]} /><section className="section container section-after-hero" id="projects"><WorkFilter /></section><FinalCTA /></>; }
