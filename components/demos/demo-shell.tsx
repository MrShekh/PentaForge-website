import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { demoEnquiryHref, type SchoolDemo } from '@/data/school-demos';
import { SchoolNav } from './school-nav';
import s from './school.module.css';
export function DemoShell({ school, children }: { school: SchoolDemo; children: React.ReactNode }) {
 return <div className={`${s.shell} ${s[school.id]}`}>
  <a className={s.skip} href="#school-main">Skip to content</a>
  <div className={s.demoBar}><span>Concept website · Fictional school · Illustrative stock photography</span><Link href={demoEnquiryHref(school.id)}>Build a website like this <ArrowUpRight size={13} aria-hidden="true" /></Link></div>
  <SchoolNav school={school} />
  <main id="school-main">{children}</main>
  <footer className={s.footer}><div className={s.container}><div className={s.footerTop}><div><Link className={s.footerBrand} href={`/demos/${school.id}`}>{school.name}</Link><p>{school.motto}</p><span className={s.small}>An imagined school. A real design demonstration.</span></div><div><span className={s.eyebrow}>Begin a new chapter</span><h2>There’s more to discover.</h2><Link className={s.button} href={`/demos/${school.id}/admissions`}>Explore admissions <ArrowUpRight size={16} /></Link></div></div><nav className={s.footerLinks} aria-label="School footer">{school.pages.map(p=><Link key={p.slug} href={`/demos/${school.id}/${p.slug}`}>{p.label}</Link>)}</nav><div className={s.footerBottom}><span>Illustrative content, dates and profiles. No real school affiliation.</span><Link href="/industries/education">Website Demo by PentaForge ↗</Link></div><p className={s.credits}>Licensed stock photography is illustrative, not this school’s campus or community. <Link href="/industries/education#photo-credits">Photo credits & sources</Link></p></div></footer>
 </div>;
}
