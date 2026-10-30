import {
  approvedBillingExample, approvedCombinedRatePercent, approvedFineAtTouchMilligrams,
  approvedMakingChargeMilligrams, approvedTotalBilledFineMilligrams,
  grams, gramsNumber, karatComparisonRows, weightChain, weightChainNet, weightChainFine,
  purityImpact, purityImpactFromTouch, purityImpactFromKarat, workInProgressJob,
  confirmedLossMilligrams, workInProgressRows, workInProgressCheck
} from './jewellery-examples';
export interface ArticleTable { caption: string; headers: string[]; rows: string[][]; note?: string }
export interface ArticleLink { href: string; label: string }
export interface ArticleSection { id: string; title: string; paragraphs: string[]; table?: ArticleTable; links?: ArticleLink[] }
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
        "id": "order-walkthrough",
        "title": "What does one order look like from first record to settlement?",
        "paragraphs": [
          "An order can be followed through seven kinds of record: the customer order, material allocation, casting or another first production stage, karigar issue and receive, production tracking, recovery and reconciliation, and billing or settlement. The table is a representative workflow, not a specification. Your stages, names and sequence will differ, and some workshops will skip or combine steps.",
          "The right-hand column points to the published screens that relate to each stage. Those screens come from separate systems and were captured with private values concealed. They show where each kind of record lives. They do not show one order carried through all seven stages, and we are not describing a live end-to-end transaction."
        ],
        "table": {
          "caption": "A representative order workflow and the published screens related to each stage",
          "headers": ["Stage", "What the workflow needs to record", "Related published screen"],
          "rows": [
            ["1. Customer order", "The customer, the agreed specification and the expected handover.", "Operations system: production register with order name and bag reference columns."],
            ["2. Material allocation", "Fine gold set aside from stock for the job, with its purity.", "Manufacturing control centre: available fine stock. Operations system: stock page with add and remove gold controls."],
            ["3. Casting or first stage", "Batch, purity, fine gold issued, expected and actual output.", "Manufacturing system: casting register with batch, karat, fine issued, expected gross, actual output, fine loss and status columns."],
            ["4. Karigar issue and receive", "What went out, what came back, who held it and when.", "Operations system: filling-in and finish weight columns; the dashboard separates material with a karigar from admin stock."],
            ["5. Production tracking", "Where the job stands and what material is still in work.", "Manufacturing system: work in progress on the control centre, and casting and order work-in-progress accounts in the reports ledger."],
            ["6. Recovery and reconciliation", "Scrap and dust returned, customer metal settled, differences explained.", "Manufacturing system: separate registers for customer gold settlements and karigar bench scrap recoveries."],
            ["7. Billing or settlement", "Charges, cash and fine-gold balances for the customer.", "Billing system: bill form with issue and receive lines and separate cash and fine-gold balance sections."]
          ],
          "note": "Stages 1 to 7 are a teaching sequence. Each published screen is a separate capture with values concealed, so none of them traces the same order."
        },
        "links": [
          { "href": "/work/jewellery-manufacturing-system", "label": "Manufacturing system case study" },
          { "href": "/work/jewellery-operations-system", "label": "Operations and stock case study" },
          { "href": "/work/custom-billing-system", "label": "Billing system case study" }
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
        "id": "exceptions-in-practice",
        "title": "What happens when an order does not go to plan?",
        "paragraphs": [
          "The workflow should make an exception visible instead of absorbing it. Five situations deserve a defined path: a partial return, a corrected weight, rework, material still with a worker, and two purity conventions meeting in one job.",
          "After a partial return, the remainder stays attached to the same order and the same worker, so the difference is a visible balance and not something people have to remember. A corrected weight should say which entry it replaces and why. Rework sends a piece back into work in progress; link it to the original order so the extra handling does not look like a second job.",
          "Gold still with a worker at the end of a day is a position, not a discrepancy. Purity needs the same care: if two parts of the business convert the same alloy at different touch values, one job produces two fine-gold totals. The gold-loss guide works through both ideas with labelled hypothetical figures."
        ],
        "links": [
          { "href": "/insights/track-gold-loss-jewellery-manufacturing#wip-not-loss", "label": "Is work-in-progress gold a loss?" },
          { "href": "/insights/track-gold-loss-jewellery-manufacturing#fine-gold-calculation", "label": "How fine gold is calculated" }
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
    "summary": "How gross weight, touch and fine gold, work in progress and recovery fit together in jewellery manufacturing, with labelled hypothetical examples.",
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
        "id": "gross-and-fine",
        "title": "What is the difference between gross weight and fine gold?",
        "paragraphs": [
          "A weight without a unit and purity is incomplete. Gross weight describes the measured material; a fine-weight figure expresses its gold content under the agreed touch calculation. Comparing unlike quantities can create a difference that looks like loss even when the underlying records simply use different bases.",
          "The PentaForge operations interface places karat-weight and fine-weight columns side by side in production analytics. The manufacturing interface also provides purity settings. These are useful places to make assumptions visible. A software setting still needs the business to approve its units, rounding and applicable purity rules."
        ]
      },
      {
        "id": "fine-gold-calculation",
        "title": "How is fine gold calculated in jewellery billing?",
        "paragraphs": [
          "Fine gold is the pure-gold content of a quantity of metal: the net weight multiplied by the touch (purity) percentage and divided by 100. The result is only as reliable as its inputs, and each input is an agreement between the business and its customers, so write the convention down before it is built into software.",
          `Start with the measured gross weight and subtract the deductions your business agrees to exclude, such as stone weight, to reach net weight. Apply the touch to the net weight to get fine gold. With ${grams(weightChain.grossMilligrams)} gross and ${grams(weightChain.deductionsMilligrams)} of agreed deductions, the net weight is ${grams(weightChainNet())}; at a touch of ${weightChain.touchPercent}% that net weight holds ${grams(weightChainFine())} of fine gold (${gramsNumber(weightChainNet())} × ${weightChain.touchPercent} ÷ 100). This is a hypothetical illustration of the definitions, not a description of how any particular bill is calculated.`,
          "PentaForge’s billing system gives each issue and receive line gross, deduction and net-weight fields alongside touch, rate and fine-gold fields, with separate cash and fine-gold balance sections. The published screen is an empty bill form: it shows that layout, not a worked calculation, and it does not prove a particular formula or rounding rule.",
          "Making charges are a separate agreement from purity. Businesses fix them per gram, per piece, as a percentage or in another agreed way, and that choice decides which ledger carries the charge. State whether a charge is billed in cash, in fine gold or both, how many decimals each figure keeps and when rounding happens.",
          `In one specific client billing workflow developed by PentaForge, the manufacturer uses an agreed billing convention where making charges are added as percentage points to the touch percentage to calculate a combined billing rate:
• Net weight: ${grams(approvedBillingExample.netMilligrams)}
• Touch: ${approvedBillingExample.touchPercent}%
• Making charge rate: ${approvedBillingExample.makingChargePoints} percentage points
• Combined billing rate: ${approvedCombinedRatePercent()}%
• Fine gold based on touch alone: ${gramsNumber(approvedBillingExample.netMilligrams)} × ${approvedBillingExample.touchPercent} ÷ 100 = ${grams(approvedFineAtTouchMilligrams())}
• Additional fine-gold equivalent charge: ${gramsNumber(approvedBillingExample.netMilligrams)} × ${approvedBillingExample.makingChargePoints} ÷ 100 = ${grams(approvedMakingChargeMilligrams())}
• Total fine-gold equivalent billed: ${gramsNumber(approvedBillingExample.netMilligrams)} × ${approvedCombinedRatePercent()} ÷ 100 = ${grams(approvedTotalBilledFineMilligrams())}

This is a specific commercial billing convention agreed for that workflow, not a universal jewellery industry formula. The physical piece contains ${grams(approvedFineAtTouchMilligrams())} of fine gold. The additional ${grams(approvedMakingChargeMilligrams())} is a financial making charge converted into fine-gold units for billing settlement—it is not physical gold contained in the piece or physically transferred to the customer. The total ${grams(approvedTotalBilledFineMilligrams())} represents the customer’s billed fine-gold liability (receivable), keeping billing balances distinct from physical metal movement and stock ledgers. This calculation demonstrates precision to three decimal places (0.001 g); any additional intermediate rounding rules require business confirmation for each deployment.`,
          `Purity is a convention too. The table compares simple karat arithmetic (karat divided by 24) with the default touch values on the purity settings screen of PentaForge’s manufacturing system, where they are configurable. On a hypothetical ${grams(purityImpact.netMilligrams)} of net 22K metal, a touch of ${purityImpact.defaultTouch}% gives ${grams(purityImpactFromTouch())} of fine gold, while 22 ÷ 24 gives ${grams(purityImpactFromKarat())}: a ${grams(purityImpactFromKarat() - purityImpactFromTouch())} gap that appears on every bill unless the business picks one convention and applies it consistently.`
        ],
        "table": {
          "caption": "Karat arithmetic compared with the default touch values on a published purity settings screen",
          "headers": ["Karat", "Karat ÷ 24", "Default touch shown"],
          "rows": karatComparisonRows(),
          "note": "Default touch values are as displayed on the purity settings screen in the manufacturing case study. They are configurable settings, not a universal standard."
        },
        "links": [
          { "href": "/work/custom-billing-system", "label": "See the billing interface" },
          { "href": "/work/jewellery-manufacturing-system", "label": "See the purity settings" }
        ]
      },
      {
        "id": "charges-and-loss",
        "title": "Is a making charge the same as gold loss?",
        "paragraphs": [
          "No. Weight loss, financial charges, billing liability and stock movements are four different records, and software that merges them makes every balance harder to explain. Weight loss is metal that was issued and not returned or recovered. A making charge is an agreed payment for work. A billing liability is what a customer owes, in cash, in metal or both. A stock movement records where physical metal went.",
          "Even when an agreed charge is expressed as a weight (such as the 0.400 g fine-gold equivalent making charge in the billing example above), it remains a billing figure until the records show that metal changed hands. Whether it also becomes a stock movement, and in which ledger, is a separate decision the business has to make and document. Conflating billing liability with physical workshop loss or raw material stock movements creates phantom variances. PentaForge’s published systems keep these figures apart: the operations dashboard shows karigar loss and manual making charge as separate cards, and the manufacturing reports list making-charge revenue separately from billed fine gold."
        ],
        "links": [
          { "href": "/work/jewellery-operations-system", "label": "Operations dashboard evidence" },
          { "href": "/work/jewellery-manufacturing-system", "label": "Manufacturing reports evidence" }
        ]
      },
      {
        "id": "record-handoffs",
        "title": "How should jewellery software track gold issued to karigars?",
        "paragraphs": [
          "Link every issue and return to an order, process and responsible person. Record when the handoff occurred and who checked it.",
          "A correction should retain the original entry and its reason. Quietly overwriting a number removes the evidence needed to understand a later difference."
        ],
        "links": [
          { "href": "/work/jewellery-operations-system", "label": "Production register in the operations case study" }
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
        "id": "wip-not-loss",
        "title": "Is work-in-progress gold considered loss?",
        "paragraphs": [
          "No. Gold still with a karigar is a position to be tracked, not a loss to be written off. A loss is a conclusion you can draw only after finished work, recoverable scrap and work still in progress have all been accounted for. In the operations system PentaForge built, the dashboard describes material given to a karigar as “given out, not yet finished — moved from Admin Stock, not lost”, and shows karigar loss separately as the realised loss on completed orders (filling-in weight minus finish weight).",
          `The table follows one hypothetical job in fine gold only, so no gross weight is added to a fine total. It assumes one touch convention for every conversion, scrap awaiting refining counted as recoverable rather than lost, loss confirmed only once finished work and refined recovery are both known, and no wastage allowance or customer-owned metal. Mid-job, ${grams(workInProgressJob.stages[0].inProgressMilligrams)} is still in progress and ${grams(workInProgressJob.stages[0].scrapEstimatedMilligrams)} of scrap awaits refining, yet nothing is confirmed as loss. After completion and refining, ${grams(confirmedLossMilligrams(workInProgressJob.stages[1]))} is the only remainder left unexplained.`,
          "Ledgers classify these balances differently, so this is not a universal formula. When refined scrap returns to stock, and who bears a confirmed loss (the workshop, the karigar or the customer), depend on the agreement. The software should show each position separately instead of collapsing them into one total."
        ],
        "table": {
          "caption": "Hypothetical job in fine gold: where each gram sits before and after completion",
          "headers": ["Position (fine gold)", "Mid-job", "After completion and refining"],
          "rows": workInProgressRows(),
          "note": `${workInProgressCheck()} Illustrative figures only; not client data.`
        },
        "links": [
          { "href": "/work/jewellery-operations-system", "label": "Stock by state in the operations case study" },
          { "href": "/work/jewellery-manufacturing-system", "label": "Recovery registers in the manufacturing case study" }
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
        "id": "recovery-lifecycle",
        "title": "Track recovery as a separate movement",
        "paragraphs": [
          "Keep recoverable material visible while it is waiting for collection or settlement. Record which work it relates to, who holds it, when it is returned and how the returned quantity was checked. Do not treat a pending recovery as both available stock and an outstanding amount.",
          "In the manufacturing interface, customer gold settlements and karigar bench scrap recoveries have separate registers. That distinction helps explain who is settling what. An operational review should follow the entry through to the resulting stock or balance movement rather than relying on a dashboard total alone."
        ]
      },
      {
        "id": "polishing-rules",
        "title": "How is polishing loss recorded?",
        "paragraphs": [
          "Polishing records may track two passes, making charges, loss and touch on the same order. The supplied polishing workflow expresses loss as weight in minus weight out minus making charge. That only makes sense with the units and charge convention used by that workflow; a cash charge cannot simply be subtracted from a weight.",
          "Write down the rule in everyday language and check it against approved jobs, including partial returns and corrections. Keep loss, recovery and customer settlement as separate questions. This makes the resulting fine total explainable without assuming that every workshop uses the same calculation."
        ],
        "links": [
          { "href": "/work/jewellery-polishing-management", "label": "Polishing management case study" }
        ]
      },
      {
        "id": "choose-software",
        "title": "What should a jewellery manufacturer check before choosing software?",
        "paragraphs": [
          "Check that the software makes your conventions visible and lets you test them on your own jobs. Five checks cover most of the risk: can you see and change the purity values it uses; can you follow a bill from gross weight through deductions and net weight to fine gold; are customer settlements, scrap recovery and work in progress kept in separate places; does a corrected weight keep the original entry and its reason; and does it reproduce the results of a few completed jobs, including the awkward ones?",
          "Ask for the demonstration to use your examples rather than the supplier’s, and write down the answers: units, decimals, rounding, purity values and who may adjust a record. Software that cannot show its assumptions cannot be checked, whoever built it. The settings screens and registers in our case studies are there to make assumptions visible, but each business still has to approve its own."
        ],
        "links": [
          { "href": "/insights/custom-software-vs-ready-made", "label": "Custom or ready-made software?" }
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
