'use client';
import { useState } from 'react';
import { ArrowRight, Check, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { industries } from '@/data/industries';
export function WorkflowDiagram({ steps, interactive = false }: { steps: string[]; interactive?: boolean }) {
 const [active, setActive] = useState(0);
 return <div className="workflow"><ol>{steps.map((step, i) => <li key={step} className={interactive && active === i ? 'current' : ''}>{interactive ? <button aria-pressed={active === i} onClick={() => setActive(i)}><span>{String(i + 1).padStart(2, '0')}</span>{step}</button> : <div><span>{String(i + 1).padStart(2, '0')}</span>{step}</div>}<ArrowRight size={15} aria-hidden="true" /></li>)}</ol>{interactive && <p className="workflow-caption" aria-live="polite"><Check size={15} />{steps[active]} — connected to the same business record, with clear ownership and a history of changes.</p>}</div>;
}
export function IndustryExplorer() {
 const [selected, setSelected] = useState(0); const industry = industries[selected];
 return <div className="industry-explorer"><div role="tablist" aria-label="Choose your industry" className="industry-tabs">{industries.map((item, i) => <button key={item.slug} role="tab" id={`industry-tab-${i}`} aria-selected={selected === i} aria-controls={`industry-panel-${i}`} tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={e => { let next = i; if (e.key === 'ArrowRight') next = (i + 1) % industries.length; else if (e.key === 'ArrowLeft') next = (i - 1 + industries.length) % industries.length; else if (e.key === 'Home') next = 0; else if (e.key === 'End') next = industries.length - 1; else return; e.preventDefault(); setSelected(next); document.getElementById(`industry-tab-${next}`)?.focus(); }}>{item.title === 'Other Businesses' ? 'Other' : item.title}</button>)}</div><div role="tabpanel" id={`industry-panel-${selected}`} aria-labelledby={`industry-tab-${selected}`} className="industry-panel" tabIndex={0}><div className="industry-panel-top"><span className="eyebrow">{industry.title} / Connected workflow</span><span className="diagram-index">PF — 0{selected + 1}</span></div><WorkflowDiagram key={industry.slug} steps={industry.workflow} /><div className="industry-description"><p>{industry.summary}</p><Link className="text-link" href={`/industries/${industry.slug}`}>{selected === 4 ? 'Explain My Business' : `Explore ${industry.title} Solutions`}<ArrowUpRight size={18} /></Link></div></div></div>;
}
