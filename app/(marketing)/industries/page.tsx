import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { industries } from '@/data/industries';
import { PageHero } from '@/components/page-hero';
import { FinalCTA } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Custom Software for Different Industries', 'Software built around real workflows in jewellery, manufacturing, retail, restaurants, hotels, education, healthcare, logistics and startups.', '/industries');
const groups = [
 { title: 'Make, move & sell', slugs: ['jewellery', 'manufacturing', 'retail', 'supermarkets', 'logistics'] },
 { title: 'Serve, host & care', slugs: ['restaurants', 'hotels', 'education', 'healthcare'] },
 { title: 'Build what comes next', slugs: ['startups', 'other-businesses'] },
];
export default function Page() { return <><PageHero category="Industries we engineer for" title="Different businesses. The same care for detail." summary="From a workshop to a restaurant, a campus to a dispatch desk: we study how the work happens and build software around it. Explore the custom capabilities relevant to your operation." breadcrumbs={[{ label: 'Industries', href: '/industries' }]} /><section className="container section section-after-hero"><p className="industry-proof-note">These pages describe software we can design and build. Our Work section separately documents the real jewellery and manufacturing systems we have already engineered.</p>{groups.map(group => <section key={group.title} aria-label={group.title}><h2 className="industry-directory-title">{group.title}</h2><div className="service-directory">{group.slugs.map(slug => { const item = industries.find(i => i.slug === slug)!; return <Link href={`/industries/${item.slug}`} key={item.slug}><span className="eyebrow">{String(industries.indexOf(item) + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.cardDescription}</p></div><ArrowUpRight size={26} aria-hidden="true" /></Link>; })}</div></section>)}</section><FinalCTA /></>; }
