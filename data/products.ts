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
      'Making-charge rules scoped to your workflow',
      'Advance gold & jama balances',
      'Bill generation & print controls',
      'Payment & settlement history',
    ],
    status: null,
    industry: 'jewellery',
    description: 'Jewellery billing can involve both currency and precious metal. A ready-made system may fit if it supports your metal advances, touch calculations and making-charge rules. Our published billing interface shows separate cash and fine-gold balances, issue and receive records, and bill print controls. We assess any additional calculation or integration requirements with your business.',
    geoNote: 'PentaForge builds dedicated jewellery billing software for retail showrooms and wholesale counters in Rajkot, Ahmedabad and across Gujarat.',
    workflowIntro: 'The case study demonstrates weight and touch fields, cash and metal balances, advances and print controls. The areas below guide a scope discussion; making-charge options, tax setups, bill formats and hardware integrations need project-specific assessment, implementation and testing.',
    caseStudy: {
      slug: 'custom-billing-system',
      title: 'Custom Jewellery Billing System',
      note: 'See how issue and receive entries, cash balances and fine-gold positions work in our Custom Jewellery Billing System case study.',
    },
    faq: [
      { question: 'How are making charges and fine gold calculated?', answer: 'The published billing interface includes gross weight, deductions, net weight, touch and fine-gold fields. We agree units, purity inputs and rounding with your business. Making charges by piece, weight or percentage are requirements to assess and validate for your project, not a claim that every option is already available.' },
      { question: 'Can it manage separate cash and metal balances?', answer: 'Yes. The system maintains distinct ledgers for money and fine gold, tracking customer jama, advance metal deposits and running balances across transactions.' },
      { question: 'Is this available as an off-the-shelf product?', answer: 'Off-the-shelf availability is confirmed directly with PentaForge; this page does not confirm an immediately deployable package. We can show the existing billing workflow and agree the scope, platform support and any required customization before you commit.' },
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
    description: 'Gold moves between stock, casting, karigar work, polishing and recovery. Disconnected records can make available stock, work in progress and pending recovery difficult to reconcile. Our published manufacturing interface distinguishes fine stock and work in progress, with casting records, purity settings and recovery registers. Additional handoffs and controls are scoped around your workshop.',
    geoNote: 'PentaForge develops custom jewellery manufacturing software for workshops, karigars and manufacturers in Rajkot, Ahmedabad and across Gujarat.',
    workflowIntro: 'The case study shows casting, recovery and categorised gold-ledger views. These production workflows are starting points for a scope discussion. Which modules share records, how they connect and who can use them are agreed and tested for your project.',
    caseStudy: {
      slug: 'jewellery-manufacturing-system',
      title: 'Jewellery Manufacturing Management System',
      note: 'Inspect our real Jewellery Manufacturing Management System case study to see casting batches, karigar recovery, and gold ledgers in action.',
    },
    faq: [
      { question: 'How does the software handle gold purity and karat conversions?', answer: 'The manufacturing case study shows configurable karat and touch settings. We agree the purities, conversion inputs, units and rounding your workshop needs, then validate those rules against approved examples.' },
      { question: 'Can we track individual karigar loss and recovery?', answer: 'The published system includes karigar records and bench scrap recovery registers. We can scope how your issues, returns, expected recovery and adjustments should connect, with reconciliation rules agreed and tested for your workshop.' },
      { question: 'How do we get started with this software?', answer: 'Contact PentaForge to discuss your production volume, workshop stages and existing spreadsheets. We demonstrate matching system capabilities and outline the implementation plan.' },
    ],
  },
  {
    slug: 'polishing-management',
    title: 'Jewellery Polishing Management Software',
    summary: 'Track jewellery polishing orders, two-pass weights, making charges, polishing loss and customer settlements through a practical management system.',
    tags: ['Jewellery', 'Polishing', 'Operations Software'],
    modules: [
      'Order registry & customer job intake',
      'Two-pass weight in & weight out records',
      'Agreed making charge calculations',
      'Polishing loss tracking & touch adjustments',
      'Fine settlement & customer history',
      'Karigar assignment & bench tracking — custom scope',
      'Daily & monthly dashboard summaries',
    ],
    status: null,
    industry: 'jewellery',
    description: 'Jewellery polishing records need to connect weighing passes, making charges and customer settlements. Paper records can make those positions difficult to reconcile. Our published interface shows customer records, piece counts, two weight-in and weight-out passes, and fine-to-return and fine-to-collect summaries. Additional workflow requirements are scoped separately.',
    geoNote: 'PentaForge develops jewellery polishing management software for workshop units and job-work operations in Rajkot, Ahmedabad and throughout Gujarat.',
    workflowIntro: 'The case study demonstrates two-pass weighing, loss and touch fields, customer history and settlement summaries. Karigar assignment and bench tracking are custom requirements to assess; they are not demonstrated features of the published polishing interface.',
    caseStudy: {
      slug: 'jewellery-polishing-management',
      title: 'Jewellery Polishing Management System',
      note: 'Explore our Jewellery Polishing Management System case study to review verified order registries, two-pass weighing, and monthly fine summaries.',
    },
    faq: [
      { question: 'How is polishing loss calculated in the system?', answer: 'Loss calculations are configured around your workshop formula—typically evaluating intake weight, finished weight, touch and agreed making charges—without assuming fixed loss percentages.' },
      { question: 'Can the system handle multi-pass weighing?', answer: 'The published interface supports two weight-in and weight-out passes alongside piece counts and customer records. Additional passes would require a separate scope and validation; unlimited passes are not confirmed.' },
      { question: 'Is this software ready for deployment?', answer: 'Deployment readiness for your business must be confirmed with PentaForge; an immediately deployable release is not confirmed here. The existing interface shows print and Excel export controls. Required fields, exports, printer compatibility and deployment arrangements are assessed and tested for your project.' },
    ],
  },
  { slug: 'inventory-management', title: 'Inventory Management', summary: 'Know what came in, what went out and what is available for the next order.', tags: ['Stock', 'Operations'], modules: ['Item catalogue', 'Stock movements', 'Opening balances', 'Stock adjustments', 'Inventory reports'], status: null, industry: 'retail' },
  { slug: 'business-billing', title: 'Business Billing', summary: 'Simple billing, customer records and payments around your everyday work.', tags: ['Billing', 'Business'], modules: ['Customer records', 'Bills', 'Payment tracking', 'Outstanding balances', 'Business reports'], status: null, industry: 'retail' },
];
