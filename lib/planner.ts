export const needOptions = ['Business Software', 'Mobile App', 'Web Platform', 'SaaS Product', 'Automation', 'Not Sure'] as const;
export const platformOptions = ['Web', 'Android', 'iOS', 'Windows', 'macOS'] as const;
export const featureOptions = ['Login', 'Customers', 'Employees', 'Orders', 'Inventory', 'Billing', 'Payments', 'Reports', 'WhatsApp', 'AI', 'Custom Workflow'] as const;
export const stageOptions = ['Just an idea', 'Currently manual', 'Using Excel', 'Existing software', 'Need replacement', 'Need upgrade'] as const;
export function suggestModules(problem: string): string[] {
 const text = problem.toLowerCase(); const result = new Set<string>();
 const rules: [RegExp, string[]][] = [[/customer|client|contact/, ['Customer Management']], [/order|register|job|production/, ['Order Management']], [/stock|inventory|gold|material|product/, ['Inventory']], [/bill|invoice|charge/, ['Billing']], [/payment|balance|money|paid/, ['Payment Tracking']], [/staff|employee|worker|karigar|team/, ['Team Management']], [/repeat|manual|spreadsheet|excel|whatsapp/, ['Workflow Automation']]];
 rules.forEach(([rule, items]) => { if (rule.test(text)) items.forEach(x => result.add(x)); });
 if (!result.size) ['Customer Management', 'Order Management', 'Custom Workflow'].forEach(x => result.add(x));
 result.add('Reports'); return Array.from(result);
}
