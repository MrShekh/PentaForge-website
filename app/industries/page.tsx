import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { industries } from '@/data/industries';
import { PageHero } from '@/components/page-hero';
import { FinalCTA } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Software for Your Industry', 'Connected software workflows for jewellery, manufacturing, retail, startups and businesses with their own way of working.', '/industries');
export default function Page() { return <><PageHero category="Industries" title="Different businesses. The same care for detail." summary="We study the way your industry works, then look closer at the rules and processes that make your business different." breadcrumbs={[{ label: 'Industries', href: '/industries' }]} /><section className="container section section-after-hero"><div className="service-directory">{industries.map((item, i) => <Link href={`/industries/${item.slug}`} key={item.slug}><span className="eyebrow">0{i + 1}</span><div><h2>{item.title}</h2><p>{item.summary}</p></div><ArrowUpRight size={26} /></Link>)}</div></section><FinalCTA /></>; }
