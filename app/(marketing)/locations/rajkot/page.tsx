import type { Metadata } from 'next';
import { Breadcrumbs, Label, ButtonLink, TextLink, SectionHeading, FAQ, JsonLd } from '@/components/ui';
import { CaseStudyCard } from '@/components/cards';
import { WorkflowDiagram } from '@/components/diagrams/workflow';
import { FinalCTA } from '@/components/sections/final-cta';
import { caseStudies } from '@/data/caseStudies';
import { pageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = pageMetadata(
  'Software Development Company in Rajkot',
  'PentaForge develops custom business software, ERP systems and web and mobile applications for businesses in Rajkot, Gujarat. Explore our real projects.',
  '/locations/rajkot'
);

export default function RajkotLocationPage() {
  return (
    <>
      <section className="page-hero container">
        <Breadcrumbs items={[{ label: 'Rajkot Software Development', href: '/locations/rajkot' }]} />
        <Label>Software Development in Rajkot</Label>
        <h1>Custom Software Development in Rajkot</h1>
        <p>PentaForge builds custom business software, ERP systems and digital applications for businesses in Rajkot, helping teams manage the workflows, calculations and operations that generic software cannot easily accommodate.</p>
        <div className="button-row" style={{ marginTop: 32 }}>
          <ButtonLink href="/contact">Discuss Your Project</ButtonLink>
          <ButtonLink href="/work" secondary>Explore Our Work</ButtonLink>
        </div>
      </section>

      <section className="container section detail-intro">
        <div className="editorial-label">Built around your workflow.</div>
        <p className="large-copy">
          Off-the-shelf software forces growing businesses into rigid templates. We engineer custom software around how your team, records and calculations actually operate in Rajkot.
        </p>
      </section>

      <section className="container section section-after-hero">
        <SectionHeading
          label="Custom Software Capabilities"
          title="Software engineered for your operational reality."
          text="We build custom systems around your team, daily handoffs and specific business rules, distinct from prepackaged generic software."
        />
        <div className="feature-grid">
          <article>
            <span className="eyebrow">01 / Orders & Customers</span>
            <h3>Orders and customer records</h3>
            <p>Centralize customer histories, order specifications, advance deposits and production status in a single shared record, eliminating duplicate entries across notebooks and loose papers.</p>
          </article>
          <article>
            <span className="eyebrow">02 / Stock & Inventory</span>
            <h3>Inventory and stock management</h3>
            <p>Track raw materials, active work in progress, location transfers and finished goods with real-time balance calculations, automated audit trails and variance reconciliation.</p>
          </article>
          <article>
            <span className="eyebrow">03 / Billing & Calculations</span>
            <h3>Billing and custom calculations</h3>
            <p>Incorporate your specific pricing formulas, tiered discounts, precious metal touch conversions, making charges and dual currency/metal ledgers with exact mathematical precision.</p>
          </article>
          <article>
            <span className="eyebrow">04 / Manufacturing & Workflows</span>
            <h3>Production and workshop workflows</h3>
            <p>Follow work from customer job bags through batching, artisan work allocation, multi-pass processing, quality review and scrap recovery with complete accountability.</p>
          </article>
          <article>
            <span className="eyebrow">05 / Operations & Controls</span>
            <h3>Multi-user operational controls</h3>
            <p>Provide distinct workspaces for owners, floor managers, counter staff and accountants, backed by granular permission tiers, activity logs and automated daily closing summaries.</p>
          </article>
          <article>
            <span className="eyebrow">06 / Multi-Platform Engineering</span>
            <h3>Web, mobile and desktop applications</h3>
            <p>Deploy secure cloud web applications, mobile tools for field teams, or fast desktop software for high-volume billing counters and workstation-connected hardware.</p>
          </article>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container">
          <SectionHeading
            label="Why Custom Software"
            title="Signs your business has outgrown spreadsheets."
            text="Generic tools work well for standard needs, but operational complexity requires software that mirrors your real business rules."
          />
          <div className="feature-grid">
            <article>
              <span className="eyebrow">Operational Challenge / 01</span>
              <h3>Records live across notebooks and spreadsheets</h3>
              <p>When stock balances, pending orders and customer dues are maintained in separate files, staff spend hours copying data and rectifying conflicting totals instead of serving clients.</p>
            </article>
            <article>
              <span className="eyebrow">Operational Challenge / 02</span>
              <h3>Software cannot handle your exact calculation rules</h3>
              <p>Standard software assumes standard formulas. If your business uses custom touch adjustments, multi-tier making charges, scrap loss ratios or trade deductions, standard software forces manual overrides.</p>
            </article>
            <article>
              <span className="eyebrow">Operational Challenge / 03</span>
              <h3>Balances and inventory are difficult to reconcile</h3>
              <p>A simple stock total doesn’t explain what is in factory work in progress, what is held by workers, and what is finished. Custom software keeps each operational state distinct and explainable.</p>
            </article>
            <article>
              <span className="eyebrow">Operational Challenge / 04</span>
              <h3>Owners need a connected operational view</h3>
              <p>Making timely business decisions in a competitive market requires dependable, real-time reporting rather than waiting for end-of-day or month-end manual compilation.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="container section">
        <SectionHeading
          label="Demonstrated Experience"
          title="Real business systems built by PentaForge."
          text="Rajkot is renowned for its jewellery manufacturing, casting, polishing and trade workshops. Explore real systems we have engineered for precious metal tracking and workshop operations."
        />
        <div className="case-grid">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </div>
      </section>

      <section className="section muted-section">
        <div className="container">
          <SectionHeading
            label="Our Delivery Process"
            title="A structured, collaborative path to launch."
            text="We follow a disciplined engineering process to design, build and roll out software tailored to your business."
          />
          <WorkflowDiagram steps={['Discovery', 'Workflow Mapping', 'Architecture', 'Engineering', 'Validation', 'Deployment & Support']} />
          <div className="detail-two-column">
            <div>
              <h3>Built around your verified rules.</h3>
              <p>We begin by studying your existing registers, spreadsheets and daily handoffs. We document your calculation rules, user permissions and edge cases before engineering begins, ensuring the system reflects your actual operation.</p>
            </div>
            <div>
              <h3>Validated with real business data.</h3>
              <p>Before rollout, we test the system against real past jobs and completed orders to verify that balances, ledgers and reports match. We provide user onboarding and ongoing maintenance under an agreed project scope.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="detail-two-column">
          <SectionHeading
            label="Working with PentaForge"
            title="Collaborating with Rajkot business owners."
            text="We work closely with manufacturers, traders and service businesses in Rajkot, Ahmedabad and throughout Gujarat."
          />
          <div>
            <h3>Starting the conversation</h3>
            <p>You don’t need a detailed technical specification to begin. Describe your typical workflow, where bottlenecks occur, and which registers or tools you use today. Sharing an anonymized order, bill or job sheet gives us the context to discuss a practical software solution.</p>
            <p style={{ marginTop: 16 }}>We provide clear, written project proposals outlining scope, milestones and deliverables. You work directly with the software engineers building your application, with regular review milestones throughout development.</p>
            <TextLink href="/company/how-we-work">Learn more about how we work</TextLink>
          </div>
        </div>
      </section>

      <section className="container section faq-layout">
        <SectionHeading
          label="Frequently Asked Questions"
          title="Questions from Rajkot business owners."
        />
        <FAQ
          items={[
            {
              question: 'Does PentaForge develop custom software for Rajkot businesses?',
              answer: 'Yes. Rajkot is our primary customer-acquisition market. We build custom business software, ERP systems, billing software and operational management platforms for manufacturers, wholesalers and growing businesses in Rajkot, Ahmedabad and throughout Gujarat.'
            },
            {
              question: 'Can you build software around our existing business calculations?',
              answer: 'Yes. Custom calculations are a primary reason businesses choose PentaForge. We document your exact formulas—such as precious metal touch, making charges, tiered volume pricing, karigar loss allowances or custom tax structures—and validate them against approved past jobs before rollout.'
            },
            {
              question: 'Do you develop jewellery manufacturing and billing software?',
              answer: 'Yes. We have proven experience developing dedicated jewellery software for manufacturing workflows, casting batches, karigar gold issue and recovery registers, multi-pass polishing loss tracking, and dual cash/metal customer billing ledgers.'
            },
            {
              question: 'Can you modernize a business currently using Excel or paper registers?',
              answer: 'Yes. Many of our systems replace fragmented spreadsheets and manual registers. We map your current paper workflows, migrate opening balances, and design intuitive interfaces that your team can adopt comfortably without disrupting daily work.'
            },
            {
              question: 'How can we discuss a custom software project?',
              answer: 'You can submit an inquiry through our contact form describing your workflow and requirements. We will schedule a discovery discussion to explore your operational needs, demonstrate relevant capabilities from built systems, and outline a practical implementation plan.'
            }
          ]}
        />
      </section>

      <section className="container related-links" aria-label="Relevant services and resources">
        <TextLink href="/solutions/custom-software">Custom Software & ERP Development</TextLink>
        <TextLink href="/industries/jewellery">Jewellery Industry Solutions</TextLink>
        <TextLink href="/products/jewellery-manufacturing">Jewellery Manufacturing Software</TextLink>
        <TextLink href="/products/jewellery-billing">Jewellery Billing Software</TextLink>
        <TextLink href="/products/polishing-management">Jewellery Polishing Management</TextLink>
        <TextLink href="/work">Explore Built Systems</TextLink>
        <TextLink href="/contact">Contact PentaForge</TextLink>
      </section>

      <FinalCTA />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Custom Software Development in Rajkot',
          serviceType: 'Custom Software Development',
          description: 'PentaForge develops custom business software, ERP systems and web and mobile applications for businesses in Rajkot, Gujarat. Explore our real projects.',
          url: absoluteUrl('/locations/rajkot'),
          areaServed: [
            { '@type': 'City', name: 'Rajkot' },
            { '@type': 'AdministrativeArea', name: 'Gujarat' },
            { '@type': 'Country', name: 'India' }
          ],
          provider: {
            '@type': 'Organization',
            '@id': 'https://www.pentaforge.co.in/#organization',
            name: 'PentaForge',
            url: absoluteUrl('/')
          }
        }}
      />
    </>
  );
}
