import { notFound } from 'next/navigation';
import { getSchool, schoolIds, schools } from '@/data/school-demos';
import { LittleBloomHome } from '@/components/demos/littlebloom/home';
import { HorizonHome } from '@/components/demos/horizon/home';
import { NextGenHome } from '@/components/demos/nextgen/home';
import { SchoolInterior } from '@/components/demos/school-interior';
type Params = { school: string; page?: string[] };
export const dynamicParams = false;
export function generateStaticParams() { return schoolIds.flatMap(school => [{ school, page: [] }, ...schools[school].pages.map(p => ({ school, page: [p.slug] }))]); }
export async function generateMetadata({ params }: { params: Promise<Params> }) { const { school, page } = await params; const data = getSchool(school); const content = data?.pages.find(p => p.slug === page?.[0]); const title = `${content?.label || data?.name || 'School demo'}${content ? ` | ${data?.name}` : ''} — PentaForge Concept`; const description = content?.introduction || `${data?.description} A fictional school website demonstration by PentaForge.`; return { title, description, openGraph: { title, description }, twitter: { title, description, card: 'summary' as const }, robots: { index: false, follow: true } }; }
export default async function SchoolPage({ params }: { params: Promise<Params> }) { const { school, page } = await params; const data = getSchool(school); if (!data || (page && page.length > 1)) notFound(); if (!page?.length) return school === 'littlebloom' ? <LittleBloomHome school={data} /> : school === 'horizon' ? <HorizonHome school={data} /> : <NextGenHome school={data} />; const content = data.pages.find(p => p.slug === page[0]); if (!content) notFound(); return <SchoolInterior school={data} page={content} />; }
