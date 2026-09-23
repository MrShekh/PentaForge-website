'use client';
import Script from 'next/script';
import { useCallback, useEffect, useRef } from 'react';
type TurnstileApi = { render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void }) => string; remove: (id: string) => void };
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
 const ref = useRef<HTMLDivElement>(null); const id = useRef<string | null>(null); const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
 const render = useCallback(() => { const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile; if (key && ref.current && api && id.current === null) id.current = api.render(ref.current, { sitekey: key, callback: onToken, 'expired-callback': () => onToken(''), 'error-callback': () => onToken('') }); }, [key, onToken]);
 useEffect(() => { render(); return () => { const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile; if (api && id.current !== null) { api.remove(id.current); id.current = null; } }; }, [render]);
 if (!key) return null;
 return <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={render} /><div ref={ref} className="turnstile" /></>;
}
