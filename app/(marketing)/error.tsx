'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <section className="container not-found"><span className="eyebrow">Something needs another look</span><h1>We couldn’t load this part of the site.</h1><p>Please try again. Your next conversation is still a click away.</p><div className="button-row"><button className="button button-primary" onClick={reset}>Try again</button><Link href="/" className="button button-secondary">Return home</Link></div></section>; }
