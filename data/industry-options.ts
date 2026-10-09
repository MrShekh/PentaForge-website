// Existing v1 Control Center values remain unchanged. New labels are retained in the description.
export const industryOptions = ['Jewellery', 'Manufacturing', 'Retail', 'Restaurants & Cafés', 'Hotels', 'Schools & Colleges', 'Healthcare', 'Supermarkets', 'Logistics', 'Startup', 'Other'] as const;
export type InquiryIndustry = typeof industryOptions[number];
export const industrySlugs = ['jewellery', 'manufacturing', 'retail', 'restaurants', 'hotels', 'education', 'healthcare', 'supermarkets', 'logistics', 'startups', 'other-businesses'] as const;
const legacyIndustries = ['Jewellery', 'Manufacturing', 'Retail', 'Startup', 'Other'] as const;
export function industryDescriptionPrefix(industry: InquiryIndustry) { return (legacyIndustries as readonly string[]).includes(industry) ? '' : `Industry: ${industry}\n\n`; }
export function integrationIndustry(industry: InquiryIndustry) { return (legacyIndustries as readonly string[]).includes(industry) ? industry as typeof legacyIndustries[number] : industry === 'Supermarkets' ? 'Retail' : 'Other'; }
export function industryMessageLimit(industry: InquiryIndustry) { return 3000 - industryDescriptionPrefix(industry).length; }
