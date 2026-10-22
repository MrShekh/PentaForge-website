import { services } from '@/data/services';
import { products } from '@/data/products';
import { industries } from '@/data/industries';
import { caseStudies } from '@/data/caseStudies';
import { articles } from '@/data/articles';
export const publicRoutes = ['/', '/solutions', '/industries', '/products', '/work', '/company', '/company/how-we-work', '/company/technology', '/contact', '/insights', '/privacy', '/terms', '/locations/rajkot', ...services.map(s => `/solutions/${s.slug}`), ...industries.map(i => `/industries/${i.slug}`), ...products.map(p => `/products/${p.slug}`), ...caseStudies.map(s => `/work/${s.slug}`), ...articles.filter(a => a.status === 'published').map(a => `/insights/${a.slug}`)];
