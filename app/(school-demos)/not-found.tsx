import Link from 'next/link';
export default function NotFound() { return <main style={{ padding: '100px 24px', maxWidth: 800, margin: 'auto' }}><p>School demo / 404</p><h1 style={{ margin: '24px 0' }}>That page isn’t in this school’s prospectus.</h1><Link href="/industries/education">Explore the PentaForge school collection →</Link></main>; }
