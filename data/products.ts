import type { Screenshot } from './screenshots';
export type ProductStatus = 'Available' | 'Customizable' | 'In Development' | 'Coming Soon';
export interface Product {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  modules: string[];
  status: ProductStatus | null;
  industry: string;
  description?: string;
  geoNote?: string;
  workflowIntro?: string;
  caseStudy?: { slug: string; title: string; note: string };
  faq?: { question: string; answer: string }[];
  suitableFor?: string[];
  platforms?: string[];
  screenshots?: Screenshot[];
}
export const products: Product[] = [
  {
    slug: 'jewellery-billing',
    title: 'Jewellery Billing Software',
    summary: 'Jewellery billing software for gold calculations, making charges, customer balances and billing workflows, tailored to jewellery businesses.',
    tags: ['Jewellery', 'Billing', 'Business Software'],
    modules: [
      'Customer records & ledgers',
      'Gross, deduction & net weight',
      'Purity, touch & fine-gold calculations',
      'Configurable making charges',
      'Advance gold & jama balances',
      'Bill generation & print controls',
      'Payment & settlement history',
    ],
    status: null,
    industry: 'jewellery',
    description: 'Jewellery billing involves both currency and precious metal. Standard retail software cannot handle fine-gold liabilities, metal advances, touch conversions or making charges that vary by piece, weight or karigar. We design billing workspaces with dedicated cash and metal ledgers, clear issue and receive records, and printable invoices that explain every calculation to your customer.',
    geoNote: 'PentaForge builds dedicated jewellery billing software for retail showrooms and wholesale counters in Rajkot, Ahmedabad and across Gujarat.',
    workflowIntro: 'These verified modules reflect real jewellery billing operations. Specific calculation rules, tax setups, bill formats and hardware integrations are tailored to your store workflow.',
    caseStudy: {
      slug: 'custom-billing-system',
      title: 'Custom Jewellery Billing System',
      note: 'See how issue and receive entries, cash balances and fine-gold positions work in our Custom Jewellery Billing System case study.',
    },
    faq: [
      { question: 'How are making charges and fine gold calculated?', answer: 'Calculations follow your business rules. We configure making charges by piece, weight or percentage, and compute fine gold from gross weight, deductions and touch without forcing an arbitrary formula.' },
      { question: 'Can it manage separate cash and metal balances?', answer: 'Yes. The system maintains distinct ledgers for money and fine gold, tracking customer jama, advance metal deposits and running balances across transactions.' },
      { question: 'Is this available as an off-the-shelf product?', answer: 'We evaluate your store requirements against our verified billing modules. Scope, platform support and necessary customizations are confirmed during initial project discovery.' },
    ],
  },
  {
    slug: 'jewellery-manufacturing',
    title: 'Jewellery Manufacturing Software',
    summary: 'Manage jewellery manufacturing workflows, orders, stock and production tracking with custom software built around your business operations.',
    tags: ['Jewellery', 'Manufacturing', 'Production Software'],
    modules: [
      'Customer orders & job bags',
      'Fine gold & raw material stock',
      'Casting batch records & purity inputs',
      'Karigar work allocation & issue registers',
      'Production-stage tracking across workshop',
      'Gold loss, scrap recovery & settlements',
      'Categorised gold ledger & management reports',
    ],
    status: null,
    industry: 'jewellery',
    description: 'Gold moves constantly between admin stock, casting, karigar benches, polishing and recovery. Disconnected registers and spreadsheets leave workshop owners unable to determine what is on hand, what is in active production, and what material is pending recovery. We engineer manufacturing software that tracks material movement at each handoff, distinguishes fine gold from gross weight, and provides complete accountability across workers.',
    geoNote: 'PentaForge develops custom jewellery manufacturing software for workshops, karigars and manufacturers in Rajkot, Ahmedabad and across Gujarat.',
    workflowIntro: 'Explore the key production workflows we design around. Every module connects to a shared operational ledger, so everyone from casting managers to accountants works from the same record.',
    caseStudy: {
      slug: 'jewellery-manufacturing-system',
      title: 'Jewellery Manufacturing Management System',
      note: 'Inspect our real Jewellery Manufacturing Management System case study to see casting batches, karigar recovery, and gold ledgers in action.',
    },
    faq: [
      { question: 'How does the software handle gold purity and karat conversions?', answer: 'The system includes configurable karat and touch settings, allowing workshops to track pure 24K fine gold alongside 22K, 18K or custom alloy stock with explicit conversion inputs.' },
      { question: 'Can we track individual karigar loss and recovery?', answer: 'Yes. Daily metal issues, finished returns and recoverable scrap are recorded per karigar, reconciling expected versus actual recovery according to your workshop standards.' },
      { question: 'How do we get started with this software?', answer: 'Contact PentaForge to discuss your production volume, workshop stages and existing spreadsheets. We demonstrate matching system capabilities and outline the implementation plan.' },
    ],
  },
  {
    slug: 'polishing-management',
    title: 'Jewellery Polishing Management Software',
    summary: 'Track jewellery polishing orders, weight in and out, karigar work, polishing loss and billing through a practical management system.',
    tags: ['Jewellery', 'Polishing', 'Operations Software'],
    modules: [
      'Order registry & customer job intake',
      'Two-pass weight in & weight out records',
      'Agreed making charge calculations',
      'Polishing loss tracking & touch adjustments',
      'Fine settlement & customer history',
      'Karigar work assignment & bench tracking',
      'Daily & monthly dashboard summaries',
    ],
    status: null,
    industry: 'jewellery',
    description: 'Jewellery polishing involves precise weighing passes, volatile loss rates, making charge adjustments, and customer fine-gold settlements. Tracking high-value pieces in paper registers leads to reconciliation disagreements and unaccountable losses. We design polishing management systems with customer registries, piece-level weighing passes, and transparent fine-to-return and fine-to-collect dashboard summaries.',
    geoNote: 'PentaForge develops jewellery polishing management software for workshop units and job-work operations in Rajkot, Ahmedabad and throughout Gujarat.',
    workflowIntro: 'These operational areas structure the daily polishing lifecycle. The system records weight changes at each step while preserving clear settlement histories for every client.',
    caseStudy: {
      slug: 'jewellery-polishing-management',
      title: 'Jewellery Polishing Management System',
      note: 'Explore our Jewellery Polishing Management System case study to review verified order registries, two-pass weighing, and monthly fine summaries.',
    },
    faq: [
      { question: 'How is polishing loss calculated in the system?', answer: 'Loss calculations are configured around your workshop formula—typically evaluating intake weight, finished weight, touch and agreed making charges—without assuming fixed loss percentages.' },
      { question: 'Can the system handle multi-pass weighing?', answer: 'Yes. The interface supports multiple weighing passes (weight in and weight out) alongside piece counts and customer identification before generating final settlements.' },
      { question: 'Is this software ready for deployment?', answer: 'We demonstrate our verified polishing management workflows and configure client fields, export options and printer integrations to match your operational requirements.' },
    ],
  },
  { slug: 'inventory-management', title: 'Inventory Management', summary: 'Know what came in, what went out and what is available for the next order.', tags: ['Stock', 'Operations'], modules: ['Item catalogue', 'Stock movements', 'Opening balances', 'Stock adjustments', 'Inventory reports'], status: null, industry: 'retail' },
  { slug: 'business-billing', title: 'Business Billing', summary: 'Simple billing, customer records and payments around your everyday work.', tags: ['Billing', 'Business'], modules: ['Customer records', 'Bills', 'Payment tracking', 'Outstanding balances', 'Business reports'], status: null, industry: 'retail' },
];
