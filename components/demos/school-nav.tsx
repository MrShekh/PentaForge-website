'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { Menu, X, Flower2, Shield, ArrowUpRight, Blocks } from 'lucide-react';
import type { SchoolDemo } from '@/data/school-demos';
import s from './school.module.css';
export function SchoolNav({ school }: { school: SchoolDemo }) {
 const path=usePathname(); const drawer=useRef<HTMLDialogElement>(null); const trigger=useRef<HTMLButtonElement>(null);
 const links=school.pages.filter(p=> !['admissions','contact','teachers','achievements','student-portal','parent-portal'].includes(p.slug)).slice(0,5);
 const Mark=school.id==='littlebloom'?Flower2:school.id==='horizon'?Shield:Blocks;
 const close=()=>drawer.current?.close();
 return <header className={s.header}><div className={`${s.container} ${s.nav}`}><Link className={s.brand} href={`/demos/${school.id}`} aria-label={`${school.name} home`}><span className={s.brandMark}><Mark size={27} strokeWidth={1.5} aria-hidden="true" /></span><span>{school.shortName}<small>{school.id==='horizon'?'INTERNATIONAL SCHOOL':school.id==='nextgen'?'PUBLIC SCHOOL':'ACADEMY'}</small></span></Link><nav className={s.desktopNav} aria-label="School navigation">{links.map(p=><Link aria-current={path.endsWith('/'+p.slug)?'page':undefined} key={p.slug} href={`/demos/${school.id}/${p.slug}`}>{p.label}</Link>)}</nav><Link className={`${s.button} ${s.navCta}`} href={`/demos/${school.id}/${school.id==='nextgen'?'student-portal':'admissions'}`}>{school.id==='nextgen'?'Portal preview':'Admissions'}<ArrowUpRight size={16} aria-hidden="true" /></Link><button className={s.menuButton} aria-label="Open school navigation" ref={trigger} onClick={()=>drawer.current?.showModal()}><Menu /></button></div><dialog className={s.drawer} ref={drawer} onClose={()=>trigger.current?.focus()} onClick={e=>{if(e.target===e.currentTarget)close();}}><div className={s.drawerInside}><div className={s.drawerTop}><span>{school.name}</span><button className={s.iconButton} aria-label="Close school navigation" onClick={close}><X /></button></div><nav aria-label="Mobile school navigation"><Link href={`/demos/${school.id}`} onClick={close}>Home</Link>{school.pages.map(p=><Link key={p.slug} href={`/demos/${school.id}/${p.slug}`} onClick={close}>{p.label}</Link>)}</nav><p className={s.small}>A fictional school website by PentaForge.</p></div></dialog></header>;
}
