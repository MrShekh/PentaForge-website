'use client';
import { trackEvent } from '@/lib/analytics-events';
import { useState } from 'react';
import { ArrowRight, Check, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Industry } from '@/data/industry-types';
export function WorkflowDiagram({ steps, interactive = false }: { steps: string[]; interactive?: boolean }) {
 const [active, setActive] = useState(0);
 return <div className="workflow"><ol>{steps.map((step, i) => <li key={step} className={interactive && active === i ? 'current' : ''}>{interactive ? <button aria-pressed={active === i} onClick={() => setActive(i)}><span>{String(i + 1).padStart(2, '0')}</span>{step}</button> : <div><span>{String(i + 1).padStart(2, '0')}</span>{step}</div>}<ArrowRight size={15} aria-hidden="true" /></li>)}</ol>{interactive && <p className="workflow-caption" aria-live="polite"><Check size={15} />{steps[active]} — a stage to connect with the people, records and decisions around it.</p>}</div>;
}
type WorkflowIndustry = Pick<Industry, 'slug' | 'title' | 'shortTitle' | 'workflow' | 'summary'>;
export function IndustryExplorer({ industries }: { industries: WorkflowIndustry[] }) {
 const [selected, setSelected] = useState(industries[0].slug);
 const industry = industries.find(item => item.slug === selected)!;
 return <div className="industry-explorer"><label className="industry-selector-label" htmlFor="industry-workflow-selector"><span>Explore an industry workflow</span><select id="industry-workflow-selector" value={selected} aria-controls="industry-workflow-panel" onChange={event => { setSelected(event.target.value); trackEvent('industry_selected', event.target.value); }}>{industries.map(item => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label><div id="industry-workflow-panel" className="industry-panel" role="region" aria-label={`${industry.title} workflow`}><div className="industry-panel-top"><span className="eyebrow" aria-live="polite">{industry.title} / A workflow we can build</span><span className="diagram-index">PF — {String(industries.indexOf(industry) + 1).padStart(2, '0')}</span></div><WorkflowDiagram key={industry.slug} steps={industry.workflow} /><div className="industry-description"><p>{industry.summary}</p><Link className="text-link" href={`/industries/${industry.slug}`}>{industry.slug === 'other-businesses' ? 'Explain My Business' : `Explore ${industry.shortTitle} Solutions`}<ArrowUpRight size={18} /></Link></div></div></div>;
}
