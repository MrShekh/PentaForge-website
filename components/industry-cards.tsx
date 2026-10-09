import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { featuredIndustries } from '@/data/industries';
export function IndustryCards() { return <div className="industry-card-grid">{featuredIndustries.map((item, i) => <Link href={`/industries/${item.slug}`} className="industry-card" key={item.slug}><div className="industry-card-top"><span className="eyebrow">{String(i + 1).padStart(2, '0')}</span><ArrowUpRight size={19} aria-hidden="true" /></div><h3>{item.shortTitle}</h3><p>{item.cardDescription}</p><ul>{item.highlights.map(text => <li key={text}>{text}</li>)}</ul><span className="industry-card-link">Explore {item.shortTitle}<ArrowUpRight size={15} aria-hidden="true" /></span></Link>)}</div>; }
