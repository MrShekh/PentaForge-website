'use client';
import { useEffect } from 'react';
import { trackEvent, type EventName } from '@/lib/analytics-events';
export function ViewEvent({ name }: { name: EventName }) { useEffect(() => { trackEvent(name); }, [name]); return null; }
export function LinkEvents() { useEffect(() => { const handler = (event: MouseEvent) => { const anchor = (event.target as Element)?.closest<HTMLAnchorElement>('a[href]'); if (!anchor) return; const url = new URL(anchor.href, location.origin); if (url.origin === location.origin && (url.pathname === '/contact' || url.hash === '#project-planner')) trackEvent('start_project_clicked'); }; document.addEventListener('click', handler); return () => document.removeEventListener('click', handler); }, []); return null; }
