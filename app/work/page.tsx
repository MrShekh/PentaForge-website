import { PageHero } from '@/components/page-hero';
import { WorkFilter } from '@/components/work-filter';
import { FinalCTA } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Built by PentaForge — Our Work', 'Explore project outlines for jewellery manufacturing, polishing management and custom business billing software.', '/work');
export default function Page() { return <><PageHero category="Built by PentaForge" title="Real workflows. Thoughtfully engineered." summary="Initial project outlines from the PentaForge brief. Illustrative interfaces show the direction; verified project details, screenshots and results will be added later." breadcrumbs={[{ label: 'Work', href: '/work' }]} /><section className="section container section-after-hero" id="projects"><WorkFilter /></section><FinalCTA /></>; }
