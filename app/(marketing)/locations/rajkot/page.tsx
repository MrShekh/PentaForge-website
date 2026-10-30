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
        <p>PentaForge builds custom business software, ERP systems and digital applications for businesses in Rajkot, helping teams manage workflows, calculations and operations around their specific requirements.</p>
        <div className="button-row" style={{ marginTop: 32 }}>
          <ButtonLink href="/contact">Discuss Your Project</ButtonLink>
          <ButtonLink href="/work" secondary>Explore Our Work</ButtonLink>
        </div>
      </section>

      <section className="container section detail-intro">
        <div className="editorial-label">Built around your workflow.</div>
        <p className="large-copy">
          Ready-made software can be a good fit for standard workflows. When important rules remain unsupported, we can engineer custom software around how your team, records and calculations operate in Rajkot.
        </p>
      </section>

      <section className="container section section-after-hero">
        <SectionHeading
          label="Custom Software Capabilities"
          title="Software engineered for your operational reality."
          text="These are capabilities we can scope around your team, daily handoffs and business rules. Modules, integrations and controls are agreed for each project; not every system includes every capability below."
        />
        <div className="feature-grid">
          <article>
            <span className="eyebrow">01 / Orders & Customers</span>
            <h3>Orders and customer records</h3>
            <p>Connect customer histories, order specifications, advance deposits and production status to reduce repeated record entry. We agree which records belong in your first release.</p>
          </article>
          <article>
            <span className="eyebrow">02 / Stock & Inventory</span>
            <h3>Inventory and stock management</h3>
            <p>Scope records for raw materials, work in progress, transfers and finished goods. Balance updates, audit history and reconciliation checks are defined and validated for your workflow.</p>
          </article>
          <article>
            <span className="eyebrow">03 / Billing & Calculations</span>
            <h3>Billing and custom calculations</h3>
            <p>Define pricing, discounts, precious metal touch conversions, making charges and cash/metal ledgers around your requirements. Agree units and rounding, then validate calculations against approved examples.</p>
          </article>
          <article>
            <span className="eyebrow">04 / Manufacturing & Workflows</span>
            <h3>Production and workshop workflows</h3>
            <p>Map the stages your workshop needs, such as job bags, casting, work allocation, polishing and recovery. The final records, handoffs and checks are agreed in the project scope.</p>
          </article>
          <article>
            <span className="eyebrow">05 / Operations & Controls</span>
            <h3>Multi-user operational controls</h3>
            <p>Discuss the access each role needs. Permissions, activity logs and automated closing summaries are options to scope and test, not guaranteed features of every system.</p>
          </article>
          <article>
            <span className="eyebrow">06 / Multi-Platform Engineering</span>
            <h3>Web, mobile and desktop applications</h3>
            <p>Choose web, mobile or desktop development to suit your users and devices. Deployment, security controls and any hardware connections are assessed and agreed for the project.</p>
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
              <p>When stock balances, pending orders and customer dues are maintained in separate files, staff may spend time copying records and reconciling conflicting totals.</p>
            </article>
            <article>
              <span className="eyebrow">Operational Challenge / 02</span>
              <h3>Software cannot handle your exact calculation rules</h3>
              <p>Check whether your current software supports the touch adjustments, making charges, loss rules and deductions you use. Custom development may help when those rules still require manual workarounds.</p>
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
            text="We offer custom software development for manufacturers, traders and service businesses in Rajkot, Ahmedabad and throughout Gujarat."
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
              answer: 'Yes. PentaForge serves Rajkot businesses with custom software development, including ERP, billing and operational systems. We start with your workflow and agree the capabilities your business needs.'
            },
            {
              question: 'Can you build software around our existing business calculations?',
              answer: 'Yes. Custom calculations are a primary reason businesses choose PentaForge. We document your exact formulas—such as precious metal touch, making charges, tiered volume pricing, karigar loss allowances or custom tax structures—and validate them against approved past jobs before rollout.'
            },
            {
              question: 'Do you develop jewellery manufacturing and billing software?',
              answer: 'Yes. We have proven experience developing dedicated jewellery software for manufacturing workflows, casting batches, karigar gold issue and recovery registers, two-pass polishing records, and separate cash and fine-gold customer billing ledgers.'
            },
            {
              question: 'Can you modernize a business currently using Excel or paper registers?',
              answer: 'Yes. We can map your existing workflows and scope a transition from Excel or paper records. Migration, opening-balance checks, training and rollout timing are agreed with your team to manage disruption; a disruption-free transition is not guaranteed.'
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
