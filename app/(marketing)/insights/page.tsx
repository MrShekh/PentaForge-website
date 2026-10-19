import { PageHero } from '@/components/page-hero';
import { ArticleCard } from '@/components/cards';
import { articles } from '@/data/articles';
import { FinalCTA } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Insights & Practical Software Guides', 'Plain-language guides to jewellery software, manufacturing digitization, custom software planning and product engineering.', '/insights');
export default function Page() { return <><PageHero category="PentaForge insights" title="Better questions. Better software." summary="Practical guides to business workflows, jewellery manufacturing and choosing software that fits your operation." breadcrumbs={[{ label: 'Insights', href: '/insights' }]} /><section className="container section section-after-hero" id="guides"><div className="article-grid">{articles.filter(a => a.status === 'published').map((a, i) => <ArticleCard {...a} index={i} key={a.slug} />)}</div></section><FinalCTA /></>; }
