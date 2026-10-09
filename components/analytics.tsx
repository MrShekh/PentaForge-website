'use client';
import { useSyncExternalStore } from 'react';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
const key = 'pentaforge-analytics-consent';
function subscribe(callback: () => void) { window.addEventListener('storage', callback); window.addEventListener('pf-consent', callback); return () => { window.removeEventListener('storage', callback); window.removeEventListener('pf-consent', callback); }; }
function getConsent() { try { return localStorage.getItem(key); } catch { return null; } }
export function AnalyticsConsent() {
 const consent = useSyncExternalStore(subscribe, getConsent, () => null);
 const ga = process.env.NEXT_PUBLIC_GA_ID; const vercel = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true';
 if (!ga && !vercel) return null;
 function choose(value: string) { try { localStorage.setItem(key, value); } catch { return; } window.dispatchEvent(new Event('pf-consent')); if (consent === 'accepted' && value !== 'accepted') window.location.reload(); }
 return <>{consent === 'accepted' && <>{ga && /^G-[A-Z0-9]+$/.test(ga) && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" /><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:window.location.origin+'/',page_referrer:'',page_title:'PentaForge'});`}</Script></>}{vercel && <Analytics beforeSend={event => ({ ...event, url: event.url.split('?')[0].split('#')[0] })} />}</>}{consent === null ? <aside className="analytics-banner" aria-label="Optional analytics"><p>Allow optional analytics to help us understand how the website is used?</p><button onClick={() => choose('declined')}>No thanks</button><button onClick={() => choose('accepted')}>Allow analytics</button></aside> : <button className="analytics-preference" onClick={() => choose(consent === 'accepted' ? 'declined' : 'accepted')}>{consent === 'accepted' ? 'Turn off analytics' : 'Allow analytics'}</button>}</>;
}
