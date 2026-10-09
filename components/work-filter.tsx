'use client';
import { useState } from 'react';
import { caseStudies } from '@/data/caseStudies';
import { CaseStudyCard } from '@/components/cards';
export function WorkFilter() { const [filter, setFilter] = useState('All'); const filtered = caseStudies.filter(s => filter === 'All' || s.tags.includes(filter)); return <><div className="filter-tabs" role="group" aria-label="Filter projects">{['All', ...new Set(caseStudies.flatMap(s => s.tags))].map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}</div><p className="sr-only" role="status">{filtered.length} projects</p><div className="case-grid">{filtered.map(study => <CaseStudyCard key={study.slug} study={study} index={caseStudies.indexOf(study)} />)}</div></>; }
