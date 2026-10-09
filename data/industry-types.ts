export interface IndustryBase { slug: string; title: string; heading: string; summary: string; workflow: string[]; modules: string[]; note: string }
export interface Industry extends IndustryBase {
 shortTitle: string;
 seoTitle: string;
 cardDescription: string;
 highlights: string[];
 problems: { title: string; text: string }[];
 moduleGroups?: { title: string; text: string; items: string[] }[];
 benefits: string[];
 relatedServices: string[];
 caseStudySlugs: string[];
 cta: string;
 faq: { question: string; answer: string }[];
}
