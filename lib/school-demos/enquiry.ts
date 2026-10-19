import { z } from 'zod';
import { getSchool, type SchoolId } from '../../data/school-demos';
export const educationServices = ['School Website','School ERP','Admission System','Website + ERP','Other Custom Software'] as const;
export const educationFieldsSchema=z.object({
 city:z.string().trim().min(2,'Please enter your city.').max(100,'Please keep the city within 100 characters.').refine(v=>!/[\u0000-\u001f]/.test(v),'Please use a single line for your city.'),
 educationService:z.enum(educationServices,{error:'Please select an education service.'}),
 message:z.string().trim().min(20,'Please describe your project in at least 20 characters.').max(2400,'Please keep your message within 2400 characters.'),
});
export function schoolEnquiryContext(input:z.infer<typeof educationFieldsSchema>,demo?:SchoolId){const school=demo?getSchool(demo):undefined;return {need:input.educationService==='School Website'?'Web Platform' as const:'Custom Software' as const,message:`Education project\nCity: ${input.city}\nRequired service: ${input.educationService}\nDesign reference: ${school?`${school.name} (${school.id})`:'No demo selected'}\n\n${input.message}`};}
