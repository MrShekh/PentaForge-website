import { ImageResponse } from 'next/og';
import { caseStudies } from '@/data/caseStudies';
import { products } from '@/data/products';
import { articles } from '@/data/articles';
export const dynamic = 'force-static';
export const dynamicParams = false;
const entries = [{ slug: 'default', title: 'We turn business problems into software.', label: 'SOFTWARE ENGINEERED AROUND YOUR BUSINESS' }, ...caseStudies.map(s => ({ slug: s.slug, title: s.title, label: 'BUILT BY PENTAFORGE / REAL BUSINESS SOFTWARE' })), ...products.map(p => ({ slug: p.slug, title: p.title, label: 'PENTAFORGE PRODUCTS / LET’S FIND THE RIGHT FIT' })), ...articles.filter(a => a.status === 'published').map(a => ({ slug: a.slug, title: a.title, label: 'PENTAFORGE INSIGHTS / PRACTICAL GUIDES' }))];
export function generateStaticParams() { return entries.map(({ slug }) => ({ slug })); }
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params; const entry = entries.find(e => e.slug === slug); if (!entry) return new Response('Not found', { status: 404 });
 return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#f7f7f5', color: '#111111', padding: '54px 62px', position: 'relative' }}><div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 25, letterSpacing: 3 }}><svg width="38" height="38" viewBox="0 0 36 36"><path d="M4 30V6h28v7H12v5h15v7H12v5H4Z M25 30h7v-7l-7 7Z" fill="#2454ec" /></svg>PENTAFORGE</div><div style={{ display: 'flex', marginTop: 56, color: '#636460', fontSize: 14, letterSpacing: 2 }}>{entry.label}</div><div style={{ display: 'flex', marginTop: 23, maxWidth: 950, fontSize: entry.title.length > 75 ? 52 : 65, lineHeight: 1.13, letterSpacing: -3, fontWeight: 700 }}>{entry.title}</div><div style={{ position: 'absolute', left: 62, bottom: 45, right: 62, display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #dedfda', paddingTop: 24, fontSize: 17, color: '#636460' }}><span>Understand. Engineer. Build.</span><span>Ahmedabad, India ↗</span></div><div style={{ position: 'absolute', right: -80, top: -90, width: 280, height: 280, border: '1px solid #b9c8f5', borderRadius: '50%', display: 'flex', background: '#edf1ff' }} /></div>, { width: 1200, height: 630 });
}
