'use client';
import { industrySlugs } from '@/data/industry-options';
import { track } from '@vercel/analytics';
export const eventNames = ['start_project_clicked', 'contact_started', 'contact_submitted', 'planner_started', 'planner_completed', 'case_study_viewed', 'product_viewed', 'industry_selected'] as const;
export type EventName = typeof eventNames[number];
const industries: readonly string[] = industrySlugs;
// Only known event names and an optional industry enum leave the browser. Never pass form data.
export function trackEvent(name: EventName, industry?: string) {
 if (typeof window === 'undefined' || !eventNames.includes(name)) return;
 try { if (localStorage.getItem('pentaforge-analytics-consent') !== 'accepted') return; } catch { return; }
 const properties = industry && industries.includes(industry) ? { industry } : {};
 const analyticsWindow = window as typeof window & { gtag?: (...args: unknown[]) => void };
 if (/^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID || '')) analyticsWindow.gtag?.('event', name, { ...properties, page_location: window.location.origin + '/', page_referrer: '', page_title: 'PentaForge' });
 if (process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true') track(name, properties);
}
