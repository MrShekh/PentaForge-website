'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import type { Screenshot } from '@/data/screenshots';
export function ScreenshotGallery({ screenshots }: { screenshots: Screenshot[] }) {
 const [active, setActive] = useState(0);
 const [zoomed, setZoomed] = useState(false);
 const dialog = useRef<HTMLDialogElement>(null);
 const opener = useRef<HTMLButtonElement | null>(null);
 const scroll = useRef<HTMLDivElement>(null);
 function change(delta: number) { setActive(i => (i + delta + screenshots.length) % screenshots.length); setZoomed(false); scroll.current?.scrollTo(0, 0); }
 function close() { dialog.current?.close(); }
 const current = screenshots[active];
 return <><div className="project-screenshots">{screenshots.map((shot, index) => <figure key={shot.src} className={index === 0 ? 'screen-feature screen-cover' : 'screen-feature'}><div className="screen-story"><span className="eyebrow">{String(index + 1).padStart(2, '0')} / Inside the system</span><h2>{shot.title}</h2><p>{shot.description}</p></div><button className="screen-open" onClick={e => { opener.current = e.currentTarget; setActive(index); setZoomed(false); dialog.current?.showModal(); document.body.style.overflow = 'hidden'; }} aria-label={`Enlarge ${shot.title}`}><span className="window-bar" aria-hidden="true"><i /><i /><i /><span>{shot.title}</span><Expand size={16} /></span><Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={index === 0 ? '(max-width: 700px) 100vw, 90vw' : '(max-width: 800px) 100vw, 60vw'} /><span className="screen-enlarge">Inspect interface <Expand size={14} /></span></button><figcaption>Actual application interface. Account identities and business values are concealed.</figcaption></figure>)}</div><dialog ref={dialog} className="screenshot-dialog" aria-labelledby="screenshot-dialog-title" onClose={() => { document.body.style.overflow = ''; opener.current?.focus(); }} onClick={e => { if (e.target === e.currentTarget) close(); }} onKeyDown={e => { if (e.key === 'ArrowLeft') { e.preventDefault(); change(-1); } if (e.key === 'ArrowRight') { e.preventDefault(); change(1); } }}><div className="viewer-toolbar"><h2 id="screenshot-dialog-title">{current.title}</h2><button onClick={() => setZoomed(x => !x)} aria-pressed={zoomed}>{zoomed ? 'Fit to screen' : 'Zoom to detail'}</button><button onClick={close} autoFocus aria-label="Close screenshot"><X size={22} /></button></div><div ref={scroll} className={`viewer-image ${zoomed ? 'is-zoomed' : ''}`}><Image src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="1920px" unoptimized /></div><div className="viewer-bottom"><button onClick={() => change(-1)} aria-label="Previous screenshot"><ArrowLeft size={20} /></button><p aria-live="polite">{active + 1} / {screenshots.length} · {current.description}</p><button onClick={() => change(1)} aria-label="Next screenshot"><ArrowRight size={20} /></button></div></dialog></>;
}
