export interface ArticleSection { id: string; title: string; paragraphs: string[] }
export interface Article { slug: string; title: string; summary: string; category: string; status: 'draft' | 'published'; author?: string; publishedAt?: string; relatedService: string; relatedIndustry?: string; sections: ArticleSection[] }
export const articles: Article[] = [
  {
    "slug": "how-jewellery-manufacturing-software-works",
    "title": "How Jewellery Manufacturing Software Works",
    "summary": "A practical walkthrough of the records that connect an order, its gold, the workshop and the final bill.",
    "category": "Jewellery",
    "status": "published",
    "relatedService": "custom-software",
    "relatedIndustry": "jewellery",
    "sections": [
      {
        "id": "start-with-the-order",
        "title": "Start with the customer order",
        "paragraphs": [
          "A useful manufacturing system follows real work. The customer order records what needs to be made, the agreed specifications and the expected handover. That order becomes the reference for material movements and production activity.",
          "Before choosing screens, walk through a recent order with the people who handled it. Note where they copied information, asked for clarification or corrected a record. Those moments help define the system."
        ]
      },
      {
        "id": "track-the-material",
        "title": "Keep gold movements connected",
        "paragraphs": [
          "An issue of gold should record the quantity, purity, responsible person and related work. Returns and recovery should be recorded separately so the history remains understandable.",
          "Agree how your business handles weight precision and purity conversion. A clear calculation that the workshop can verify is more useful than an unexplained total."
        ]
      },
      {
        "id": "follow-production",
        "title": "Follow work through the workshop",
        "paragraphs": [
          "Stages can reflect your actual process: casting, work allocation, finishing, polishing and quality review. Each handoff should make the next responsible person and the expected information clear.",
          "Not every workshop needs every module. Begin with the records that matter for control and reconciliation, then add depth where the team needs it."
        ]
      },
      {
        "id": "close-the-loop",
        "title": "Connect completion to billing",
        "paragraphs": [
          "Completed work can provide the details for making charges and the final bill. Payments belong to the customer account, while production and material histories remain connected to the order.",
          "Before rollout, test a normal order and the exceptions: partial returns, corrections, cancelled work and outstanding balances."
        ]
      },
      {
        "id": "read-the-dashboard",
        "title": "Read stock as a set of positions",
        "paragraphs": [
          "In the manufacturing system built by PentaForge, the dashboard separates available fine gold, factory work in progress, customer receivables and karigar recovery. Each heading answers a different question. Material can be present in the business without being available to issue to the next job.",
          "A useful review starts with one position and follows it to its register. For casting, that means checking the batch, purity, fine gold issued, expected gross output and completion state. For recovery, it means distinguishing a customer settlement from scrap returned by a karigar. Putting everything into one total hides the explanation the workshop needs."
        ]
      },
      {
        "id": "agree-the-exceptions",
        "title": "Agree the exceptions before rollout",
        "paragraphs": [
          "Ask what happens when only part of an order returns, when an entry uses the wrong purity, or when recovery arrives after the finished goods. Decide who can correct the record, what explanation is needed and whether the original entry remains visible. These decisions belong in the workflow, not in an employee’s memory.",
          "Choose a small set of completed jobs for acceptance testing. Re-enter them into the new system, compare the resulting stock and balances with the checked source records, and ask the people who do the work to explain each result. The first release is useful when the team can carry a whole order through it and understand the numbers at the end."
        ]
      }
    ],
    "author": "PentaForge",
    "publishedAt": "2026-09-23"
  },
  {
    "slug": "track-gold-loss-jewellery-manufacturing",
    "title": "How Gold Loss and Recovery Are Tracked in Jewellery Manufacturing",
    "summary": "A workflow-first approach to issue weights, returns, recovery and accountable adjustments.",
    "category": "Jewellery",
    "status": "published",
    "relatedService": "custom-software",
    "relatedIndustry": "jewellery",
    "sections": [
      {
        "id": "define-records",
        "title": "Define what each weight represents",
        "paragraphs": [
          "Separate issued material, returned material, material still in work and recoverable residue. Mixing these categories makes it difficult to explain the balance.",
          "Use consistent units and agreed precision. Record purity alongside weight wherever conversion is needed, and have the business confirm the conversion method."
        ]
      },
      {
        "id": "record-handoffs",
        "title": "Record each handoff",
        "paragraphs": [
          "Link every issue and return to an order, process and responsible person. Record when the handoff occurred and who checked it.",
          "A correction should retain the original entry and its reason. Quietly overwriting a number removes the evidence needed to understand a later difference."
        ]
      },
      {
        "id": "reconcile",
        "title": "Reconcile before drawing conclusions",
        "paragraphs": [
          "A difference between issue and return is not automatically a final loss. Check work in progress, material awaiting recovery, measurement differences and unrecorded returns.",
          "Reports should show the components of the balance so the workshop can investigate. Agree approval rules for closing a job or adjusting a stock record."
        ]
      },
      {
        "id": "design-system",
        "title": "Build the checks into the workflow",
        "paragraphs": [
          "Use required references, reasonable input checks and review steps to catch missing information close to the point of entry.",
          "Validate the software against real examples supplied by the business. Include unusual jobs and corrections, not just straightforward completed orders."
        ]
      },
      {
        "id": "gross-and-fine",
        "title": "Keep gross weight and fine weight distinct",
        "paragraphs": [
          "A weight without a unit and purity is incomplete. Gross weight describes the measured material; a fine-weight figure expresses its gold content under the agreed touch calculation. Comparing unlike quantities can create a difference that looks like loss even when the underlying records simply use different bases.",
          "The PentaForge operations interface places karat-weight and fine-weight columns side by side in production analytics. The manufacturing interface also provides purity settings. These are useful places to make assumptions visible. A software setting still needs the business to approve its units, rounding and applicable purity rules."
        ]
      },
      {
        "id": "recovery-lifecycle",
        "title": "Track recovery as a separate movement",
        "paragraphs": [
          "Keep recoverable material visible while it is waiting for collection or settlement. Record which work it relates to, who holds it, when it is returned and how the returned quantity was checked. Do not treat a pending recovery as both available stock and an outstanding amount.",
          "In the manufacturing interface, customer gold settlements and karigar bench scrap recoveries have separate registers. That distinction helps explain who is settling what. An operational review should follow the entry through to the resulting stock or balance movement rather than relying on a dashboard total alone."
        ]
      },
      {
        "id": "polishing-rules",
        "title": "Use process-specific calculations",
        "paragraphs": [
          "Polishing records may track two passes, making charges, loss and touch on the same order. The supplied polishing workflow expresses loss as weight in minus weight out minus making charge. That only makes sense with the units and charge convention used by that workflow; a cash charge cannot simply be subtracted from a weight.",
          "Write down the rule in everyday language and check it against approved jobs, including partial returns and corrections. Keep loss, recovery and customer settlement as separate questions. This makes the resulting fine total explainable without assuming that every workshop uses the same calculation."
        ]
      }
    ],
    "author": "PentaForge",
    "publishedAt": "2026-09-23"
  },
  {
    "slug": "custom-software-vs-ready-made",
    "title": "Custom Software vs Ready-Made Software: Which Does Your Business Need?",
    "summary": "How to compare workflow fit, implementation effort and ownership before choosing a system.",
    "category": "Business systems",
    "status": "published",
    "relatedService": "custom-software",
    "sections": [
      {
        "id": "fit",
        "title": "Start with workflow fit",
        "paragraphs": [
          "Write down the jobs the software must support and the exceptions that happen every week. A ready-made product can be a strong choice when it already handles those jobs well.",
          "Custom software becomes worth considering when important rules cannot be expressed in existing tools, or when keeping several tools connected creates repeated work."
        ]
      },
      {
        "id": "tradeoffs",
        "title": "Compare the whole commitment",
        "paragraphs": [
          "Ready-made software usually provides an existing product to evaluate. You still need to consider configuration, data migration, staff training and integration limitations.",
          "Custom software needs discovery, design and engineering before the first complete release. In return, the scope can be shaped around your business. It also requires an explicit plan for maintenance and support."
        ]
      },
      {
        "id": "ownership",
        "title": "Ask about your data and future changes",
        "paragraphs": [
          "For either option, ask how you export records, recover from mistakes and move to another system. Understand who controls access and what happens if the provider relationship ends.",
          "Compare ongoing fees, support scope, change costs and the responsibilities your own team will take on."
        ]
      },
      {
        "id": "choose",
        "title": "Test one real workflow",
        "paragraphs": [
          "Use a recent order or transaction as a trial. Include an exception such as a return, partial payment or correction.",
          "The right choice is the one that supports your important work with a manageable cost and ownership model. It does not need to use the most fashionable technology."
        ]
      },
      {
        "id": "compare-real-records",
        "title": "Compare the same job in both options",
        "paragraphs": [
          "Give each shortlisted approach the same set of tasks: create a customer, record work, issue stock, complete part of the job, prepare a bill and record a partial payment. Then introduce a correction. Note which steps are supported directly, which need configuration and which still require a spreadsheet.",
          "Jewellery offers a clear illustration. A general invoice may track money well, while a particular workshop also needs fine-gold balances, touch, recovery and karigar work. The existence of those needs does not automatically require custom software. It does mean that a convincing evaluation must show those records working together."
        ]
      },
      {
        "id": "scope-first-release",
        "title": "Define a complete first release",
        "paragraphs": [
          "If custom software is the better fit, choose a bounded workflow that can be used from beginning to end. A customer registry without the billing or stock movement it depends on may look complete on screen while leaving the daily problem unresolved.",
          "Agree what belongs in the first release, what stays in the current system and how the two will reconcile during the transition. Include who will check migrated records, train users and decide whether the system is ready. For a ready-made product, apply the same discipline to configuration and adoption."
        ]
      },
      {
        "id": "decision-notes",
        "title": "Make the decision explainable",
        "paragraphs": [
          "Keep a short decision record covering essential workflows, accepted compromises, ownership of data, support responsibilities and expected changes. Ask for a written explanation of any important limitation. A promise that a feature can be added later is different from a feature you can evaluate now.",
          "Choose ready-made software when its tested workflow fits and its constraints are acceptable. Consider custom software when important business rules remain unsupported and the business can commit to discovery, validation and ongoing care. A combination can also work: a focused custom workflow connected to an existing system, with clear responsibility for the connection."
        ]
      }
    ],
    "author": "PentaForge",
    "publishedAt": "2026-09-23"
  },
  {
    "slug": "custom-business-software-cost",
    "title": "How Much Does Custom Business Software Cost?",
    "summary": "The scope decisions that shape a project estimate, without a misleading one-size-fits-all price.",
    "category": "Planning",
    "status": "draft",
    "relatedService": "custom-software",
    "sections": [
      {
        "id": "scope",
        "title": "The workflow determines the scope",
        "paragraphs": [
          "An estimate starts with what people need to do. A single billing workflow differs from a multi-location system with production, stock, payments and permissions.",
          "List users, platforms, essential tasks and business rules. Identify the smallest complete version that would be useful in daily work."
        ]
      },
      {
        "id": "complexity",
        "title": "Look beyond the number of screens",
        "paragraphs": [
          "Integrations, offline behavior, complicated calculations, data migration and approval rules can require more work than the visible interface suggests.",
          "Existing software and hardware also matter. A supported integration is different from an undocumented system that cannot reliably export its data."
        ]
      },
      {
        "id": "ongoing",
        "title": "Include the costs after launch",
        "paragraphs": [
          "Discuss hosting, third-party services, maintenance, monitoring, backups and future changes. Agree which responsibilities belong to the engineering partner and which belong to your team.",
          "Ask for assumptions and exclusions alongside the estimate so you can compare proposals on the same basis."
        ]
      },
      {
        "id": "prepare",
        "title": "Prepare for a useful project discussion",
        "paragraphs": [
          "Bring examples: a spreadsheet, an anonymized order, the current calculation method and a description of the main frustration.",
          "A meaningful estimate follows an agreed scope. Exact pricing before understanding the workflow can hide the decisions that affect both cost and usefulness."
        ]
      }
    ]
  },
  {
    "slug": "digitize-manufacturing-business",
    "title": "How to Digitize a Manufacturing Business",
    "summary": "Map the work, pilot a useful system and move carefully from scattered records to shared information.",
    "category": "Manufacturing",
    "status": "draft",
    "relatedService": "business-digitization",
    "relatedIndustry": "manufacturing",
    "sections": [
      {
        "id": "map",
        "title": "Map a complete production order",
        "paragraphs": [
          "Follow an order from customer confirmation through material allocation, production, quality review, dispatch and billing.",
          "For each stage, record the responsible person, the information they need and the evidence they leave for the next stage. Include delays, rework and rejected material."
        ]
      },
      {
        "id": "prioritize",
        "title": "Choose the first useful improvement",
        "paragraphs": [
          "Begin where missing information causes the most repeated work. That might be raw material availability, production status or a reliable dispatch record.",
          "Define what success looks like in observable terms: a person can find the order, understand its stage and identify what needs attention."
        ]
      },
      {
        "id": "migrate",
        "title": "Clean and migrate data carefully",
        "paragraphs": [
          "Agree names, item codes, units and opening balances before importing historical records. Trial the import and compare its results to the source.",
          "Keep a rollback plan and preserve source records until the new system has been checked. A controlled transition is more useful than a rushed changeover."
        ]
      },
      {
        "id": "adopt",
        "title": "Help the team make it part of daily work",
        "paragraphs": [
          "Test on the devices and connections the team actually uses. Provide simple guidance for normal tasks and a clear way to report problems.",
          "Review usage after launch. Adjust confusing steps and expand only when the first workflow is working reliably."
        ]
      }
    ]
  },
  {
    "slug": "mongodb-vs-postgresql-business-applications",
    "title": "MongoDB vs PostgreSQL for Business Applications",
    "summary": "A decision framework based on data relationships, consistency and operating needs.",
    "category": "Engineering",
    "status": "draft",
    "relatedService": "cloud-backend",
    "sections": [
      {
        "id": "business-data",
        "title": "Begin with the business records",
        "paragraphs": [
          "Write down the relationships between customers, orders, stock movements, bills and payments. Identify the changes that must succeed together and the reports the business needs.",
          "A database choice should follow these requirements, the team’s experience and the operating environment. It should not start with a preference for a logo."
        ]
      },
      {
        "id": "relational",
        "title": "When a relational model fits",
        "paragraphs": [
          "PostgreSQL is often considered when records have clear relationships and the application needs structured queries and consistency across related changes.",
          "Think through constraints and transactions early. A stock movement and its linked order update, for example, may need to be committed as one operation."
        ]
      },
      {
        "id": "document",
        "title": "When a document model fits",
        "paragraphs": [
          "MongoDB is often considered when a document naturally contains the information read and updated together. Model the application’s actual access patterns before deciding what belongs in one document.",
          "Flexible documents still need deliberate validation, indexes and migration practices. Flexibility does not remove the need to define business rules."
        ]
      },
      {
        "id": "evaluate",
        "title": "Evaluate the operating requirements",
        "paragraphs": [
          "Compare representative queries, reporting needs, backup and recovery procedures, access controls and the skills of the people who will maintain the system.",
          "Prototype uncertain parts with realistic data. The useful choice is the one that supports the workload and can be operated responsibly by the team."
        ]
      }
    ]
  }
];
export function readingTime(article: Article) { return Math.max(1, Math.ceil(article.sections.flatMap(s => s.paragraphs).join(' ').split(/\s+/).length / 200)); }
