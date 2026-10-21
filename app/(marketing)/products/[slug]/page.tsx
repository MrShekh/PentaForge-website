import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { PageHero } from '@/components/page-hero';
import { FinalCTA } from '@/components/sections/final-cta';
import { SectionHeading, TextLink, FAQ } from '@/components/ui';
import { ViewEvent } from '@/components/analytics-events';
import { pageMetadata } from '@/lib/seo';
export const dynamicParams = true;
export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
const defaultFaq = [
  { question: 'How do I check availability?', answer: 'Contact PentaForge with the workflow you need to manage. We will confirm availability, the supported platform and whether there is a suitable product to demonstrate.' },
  { question: 'Can it follow my business rules?', answer: 'We compare the available scope with your workflow. Where there is a gap, we discuss configuration or a separately scoped custom software approach.' },
  { question: 'Are the systems in Work available as products?', answer: 'The Work section shows custom systems we have built. Each was designed for a particular workflow; it does not automatically represent a reusable product or a commercial release.' },
];
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find(p => p.slug === slug);
  if (!p) return {};
  const metaTitle = slug === 'jewellery-billing' ? 'Jewellery Billing & Gold Calculation Software' : p.title;
  return pageMetadata(metaTitle, p.summary, `/products/${slug}`);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find(p => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <ViewEvent name="product_viewed" />
      <PageHero
        category={`PentaForge products / ${p.status || 'Discuss availability'}`}
        title={p.title}
        summary={p.summary}
        breadcrumbs={[{ label: 'Products', href: '/products' }, { label: p.title, href: `/products/${slug}` }]}
        cta="Discuss product availability"
      />
      <section className="container section section-after-hero product-detail">
        <div className="product-workflow">
          <span className="eyebrow">Start with the fit</span>
          <h2>Tell us how your business works.</h2>
          <p>{p.description || 'Bring your current registers, the calculations your team uses and the parts of the day that take too much time. Together we can compare your requirements with the available software and discuss the right approach.'}</p>
          {p.geoNote && <p>{p.geoNote}</p>}
          {p.caseStudy && (
            <p>
              {p.caseStudy.note}{' '}
              <TextLink href={`/work/${p.caseStudy.slug}`}>Explore the case study</TextLink>
            </p>
          )}
          <p>Product availability, supported platforms, pricing and the exact scope are confirmed during that conversation.</p>
          <TextLink href="/contact">Discuss your requirements</TextLink>
        </div>
        <div>
          <SectionHeading
            label="Workflows to discuss"
            title="One focused workflow. Connected records."
            text={p.workflowIntro || 'Use these areas to map what your business needs. We will agree the features and any custom development before work begins.'}
          />
          <div className="module-list">
            {p.modules.map((m, i) => (
              <div key={m}>
                <span>0{i + 1}</span>
                <h3>{m}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container faq-layout">
        <SectionHeading label="A useful starting point" title="The right fit matters." />
        <FAQ items={p.faq || defaultFaq} />
      </section>
      <section className="container related-links">
        <TextLink href={`/industries/${p.industry}`}>Explore industry solutions</TextLink>
        <TextLink href="/solutions/custom-software">Need something custom?</TextLink>
        {p.caseStudy ? (
          <TextLink href={`/work/${p.caseStudy.slug}`}>{p.caseStudy.title}</TextLink>
        ) : (
          <TextLink href="/work">See systems we built</TextLink>
        )}
      </section>
      <FinalCTA />
    </>
  );
}
