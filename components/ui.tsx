import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { absoluteUrl } from '@/config/site';
export function ButtonLink({ href, children, secondary = false, className = '' }: { href: string; children: ReactNode; secondary?: boolean; className?: string }) {
  return <Link href={href} className={`button ${secondary ? 'button-secondary' : 'button-primary'} ${className}`}>{children}<ArrowRight size={17} aria-hidden="true" /></Link>;
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) { return <Link className="text-link" href={href}>{children}<ArrowUpRight size={17} aria-hidden="true" /></Link>; }
export function Label({ children, number }: { children: ReactNode; number?: string }) { return <div className="eyebrow">{number && <span className="section-number">{number} /</span>}{children}</div>; }
export function SectionHeading({ label, number, title, text }: { label: string; number?: string; title: ReactNode; text?: string }) { return <div className="section-heading"><Label number={number}>{label}</Label><h2>{title}</h2>{text && <p>{text}</p>}</div>; }
export function JsonLd({ data }: { data: unknown }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />; }
export function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  const all = [{ label: 'Home', href: '/' }, ...items];
  return <><nav className="breadcrumbs" aria-label="Breadcrumb"><ol>{all.map((item, i) => <li key={item.href}>{i > 0 && <span aria-hidden="true">/</span>}{i === all.length - 1 ? <span aria-current="page">{item.label}</span> : <Link href={item.href}>{item.label}</Link>}</li>)}</ol></nav>{absoluteUrl('/') && <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: all.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.label, item: absoluteUrl(item.href) })) }} />}</>;
}
export function FAQ({ items }: { items: { question: string; answer: string }[] }) { return <div className="faq">{items.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>; }
