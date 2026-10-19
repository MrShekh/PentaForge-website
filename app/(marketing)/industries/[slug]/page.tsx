import { notFound } from 'next/navigation';
import { industries } from '@/data/industries';
import { products } from '@/data/products';
import { caseStudies } from '@/data/caseStudies';
import { services } from '@/data/services';
import { PageHero } from '@/components/page-hero';
import { FinalCTA } from '@/components/sections/final-cta';
import { SectionHeading, TextLink, FAQ, JsonLd } from '@/components/ui';
import { WorkflowDiagram } from '@/components/diagrams/workflow';
import { ProductCard, CaseStudyCard } from '@/components/cards';
import { pageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/config/site';
export const dynamicParams = true;
export function generateStaticParams() { return industries.filter(i => i.slug !== 'education').map(i => ({ slug: i.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = industries.find(i => i.slug === slug); return item ? pageMetadata(item.seoTitle, item.summary, `/industries/${slug}`) : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params;
 const item = industries.find(i => i.slug === slug);
 if (!item) notFound();
 const relatedProducts = products.filter(p => p.industry === slug);
 const work = item.caseStudySlugs.map(project => caseStudies.find(s => s.slug === project)!).filter(Boolean);
 return <>
  <PageHero category={`Custom software for ${item.title}`} title={item.heading} summary={item.summary} breadcrumbs={[{ label: 'Industries', href: '/industries' }, { label: item.title, href: `/industries/${slug}` }]} cta={item.cta} />
  <section className="container section section-after-hero"><SectionHeading label="Start with the work" title="What gets in the way of a good day?" /><div className="feature-grid">{item.problems.map((problem, i) => <article key={problem.title}><span className="eyebrow">{String(i + 1).padStart(2, '0')} / Business problem</span><h3>{problem.title}</h3><p>{problem.text}</p></article>)}</div></section>
  <section className="section muted-section"><div className="container"><SectionHeading label="A workflow we can build around" title="Every step. Connected." text="This flow is a starting point for discussing your operation. Select a stage to explore its place in the system." /><WorkflowDiagram steps={item.workflow} interactive /><p className="industry-note">{item.note}</p></div></section>
  <section className="section container"><SectionHeading label="Potential custom capabilities" title="Build the parts your business actually needs." text="We can design these capabilities around your team, records and business rules. The final modules, device support and connections are agreed for your project." />{item.moduleGroups ? <div className="industry-module-groups">{item.moduleGroups.map((group, i) => <article key={group.title}><span className="eyebrow">{String(i + 1).padStart(2, '0')} / Connected modules</span><h3>{group.title}</h3><p>{group.text}</p><ul>{group.items.map(module => <li key={module}>{module}</li>)}</ul></article>)}</div> : <div className="module-list">{item.modules.map((module, i) => <div key={module}><span>{String(i + 1).padStart(2, '0')}</span><h3>{module}</h3></div>)}</div>}</section>
  <section className="section muted-section"><div className="container detail-two-column"><SectionHeading label="What we design towards" title="A clearer way to run the daily work." text="We agree the intended outcomes with your team and check them against complete workflows before rollout." /><ul className="industry-benefits">{item.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul></div></section>
  {work.length > 0 && <section className="container section"><SectionHeading label="Real systems we have built" title={slug === 'jewellery' ? 'Software we’ve engineered for jewellery businesses.' : 'A real jewellery manufacturing workflow.'} text="These case studies show actual PentaForge interfaces. Each project has its own scope and is separate from the custom capabilities discussed above." /><div className="case-grid">{work.map((study, index) => <CaseStudyCard key={study.slug} study={study} index={index} />)}</div></section>}
  {relatedProducts.length > 0 && <section className="section container"><SectionHeading label="Separate product inquiries" title="Find a useful starting point." text="Product availability and final scope are confirmed directly. A custom industry solution is not automatically an available product." /><div className="product-grid">{relatedProducts.map(product => <ProductCard key={product.slug} product={product} index={products.indexOf(product)} />)}</div></section>}
  <section className="section container faq-layout"><SectionHeading label="Before we begin" title="Questions from your side of the business." /><FAQ items={item.faq} /></section>
  <section className="container related-links" aria-label="Relevant services">{item.relatedServices.map(service => <TextLink key={service} href={`/solutions/${service}`}>{services.find(s => s.slug === service)!.title}</TextLink>)}{slug === 'retail' && <TextLink href="/industries/supermarkets">Supermarket & grocery workflows</TextLink>}{slug === 'supermarkets' && <TextLink href="/industries/retail">General retail workflows</TextLink>}<TextLink href="/industries">Explore all industries</TextLink></section>
  <FinalCTA />
  <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: item.seoTitle, serviceType: 'Custom software development', description: item.summary, url: absoluteUrl(`/industries/${slug}`), provider: { '@type': 'Organization', name: 'PentaForge', url: absoluteUrl('/') } }} />
 </>;
}
