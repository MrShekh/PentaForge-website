import { products } from '@/data/products';
import { ProductCard } from '@/components/cards';
import { PageHero } from '@/components/page-hero';
import { FinalCTA } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Business Software Products', 'Discuss PentaForge software for jewellery billing, manufacturing, polishing, inventory and everyday business workflows.', '/products');
export default function Page() { return <><PageHero category="PentaForge products" title="Purpose-built for the work you do every day." summary="Find the right starting point for your business. Contact us to discuss product availability, supported platforms and fit. Our custom project portfolio is separate from the product catalogue." breadcrumbs={[{ label: 'Products', href: '/products' }]} /><section className="section container section-after-hero"><div className="product-grid">{products.map((p, i) => <ProductCard product={p} index={i} key={p.slug} />)}</div></section><FinalCTA /></>; }
