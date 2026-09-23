import { products } from '@/data/products';
import { ProductCard } from '@/components/cards';
import { PageHero } from '@/components/page-hero';
import { FinalCTA } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Business Software Products', 'Explore PentaForge product concepts for jewellery billing, manufacturing, polishing, inventory and business billing.', '/products');
export default function Page() { return <><PageHero category="PentaForge products" title="Purpose-built for the work you do every day." summary="Explore the direction of our software products. These are product concepts; final features, availability and demonstrations will be confirmed directly." breadcrumbs={[{ label: 'Products', href: '/products' }]} /><section className="section container section-after-hero"><div className="product-grid">{products.map((p, i) => <ProductCard product={p} index={i} key={p.slug} />)}</div></section><FinalCTA /></>; }
