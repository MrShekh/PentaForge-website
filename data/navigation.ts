import { services } from './services';
import { industries } from './industries';
import { products } from './products';
export const navigation = [
 { label: 'Solutions', href: '/solutions', description: 'Start with the problem. We’ll find the right system.', links: services.map(s => ({ label: s.title, href: `/solutions/${s.slug}` })) },
 { label: 'Products', href: '/products', description: 'Purpose-built software for everyday business.', links: products.map(p => ({ label: p.slug === 'jewellery-manufacturing' ? 'Jewellery Manufacturing' : p.title, href: `/products/${p.slug}` })) },
 { label: 'Industries', href: '/industries', description: 'Real workflows. Understood in detail.', links: industries.map(i => ({ label: i.title, href: `/industries/${i.slug}` })) },
 { label: 'Work', href: '/work', description: 'Explore the systems behind the work.', links: [{ label: 'Case Studies', href: '/work' }, { label: 'Projects', href: '/work#projects' }] },
 { label: 'Company', href: '/company', description: 'Business understanding meets software engineering.', links: [{ label: 'About PentaForge', href: '/company' }, { label: 'How We Work', href: '/company/how-we-work' }, { label: 'Technology', href: '/company/technology' }, { label: 'Contact', href: '/contact' }] },
 { label: 'Insights', href: '/insights', description: 'Clear thinking about businesses and software.', links: [{ label: 'Blog', href: '/insights' }, { label: 'Guides', href: '/insights#guides' }] },
];
