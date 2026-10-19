import { notFound } from 'next/navigation';
import { getSchool } from '@/data/school-demos';
import { DemoShell } from '@/components/demos/demo-shell';
export default async function SchoolLayout({ children, params }: { children: React.ReactNode; params: Promise<{ school: string }> }) { const { school } = await params; const data = getSchool(school); if (!data) notFound(); return <DemoShell school={data}>{children}</DemoShell>; }
