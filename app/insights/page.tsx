import { PageHero } from '@/components/page-hero';
import { ArticleCard } from '@/components/cards';
import { articles } from '@/data/articles';
import { FinalCTA } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Insights & Practical Software Guides', 'Plain-language guides to jewellery software, manufacturing digitization, custom software planning and product engineering.', '/insights');
export default function Page() { return <><PageHero category="PentaForge insights" title="Better questions. Better software." summary="Practical thinking about business workflows and the technology behind them. These initial guides are drafts for editorial review, without an invented publication history." breadcrumbs={[{ label: 'Insights', href: '/insights' }]} /><section className="container section section-after-hero" id="guides"><div className="article-grid">{articles.map((a, i) => <ArticleCard {...a} index={i} key={a.slug} />)}</div></section><FinalCTA /></>; }
