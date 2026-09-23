import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { PageHero } from '@/components/page-hero';
import { FinalCTA } from '@/components/sections/final-cta';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Software Solutions', 'Custom software, business digitization, web, mobile, desktop, AI and backend engineering built around real workflows.', '/solutions');
export default function Page() { return <><PageHero category="Our solutions" title="Start with the business problem." summary="We’ll help you choose the right system, the right platform and a practical path from idea to everyday use." breadcrumbs={[{ label: 'Solutions', href: '/solutions' }]} /><section className="container section section-after-hero"><div className="service-directory">{services.map((s, i) => <Link href={`/solutions/${s.slug}`} key={s.slug}><span className="eyebrow">0{i + 1}</span><div><h2>{s.title}</h2><p>{s.summary}</p></div><ArrowUpRight size={27} /></Link>)}</div></section><FinalCTA /></>; }
