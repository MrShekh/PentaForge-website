'use client';
import { useSearchParams } from 'next/navigation';
import { getSchool } from '@/data/school-demos';
import { ContactForm } from '@/components/forms/contact-form';
export function EducationEnquiry(){const params=useSearchParams();const school=getSchool(params.get('demo')||'');return <div>{school&&<p className="industry-proof-note">Design reference: <strong>{school.name}</strong>. Your enquiry goes to PentaForge about building a real school website.</p>}<ContactForm key={school?.id||'education'} education={{demo:school?.id}}/></div>;}
