import manifest from './screenshot-manifest.json';
export interface Screenshot { src: string; width: number; height: number; alt: string; title: string; description: string }
function screen(project: string, file: string, title: string, description: string): Screenshot {
 const src = `/projects/${project}/${file}.webp`;
 const asset = manifest.find(a => a.src === src);
 if (!asset) throw new Error(`Missing screenshot: ${src}`);
 return { src, width: asset.width, height: asset.height, title, description, alt: `${title} — ${description} Built by PentaForge; private values concealed.` };
}
export const screenshots = {
 manufacturing: [
  screen('jewellery-manufacturing', 'dashboard', 'Manufacturing control centre', 'Fine gold stock, work in progress, customer receivables and karigar recovery in one view.'),
  screen('jewellery-manufacturing', 'casting', 'Casting operations', 'A casting register connects issued fine gold, purity, expected output and batch status.'),
  screen('jewellery-manufacturing', 'recovery', 'Gold recovery and settlements', 'Separate registers for customer gold settlements and karigar bench scrap recovery.'),
  screen('jewellery-manufacturing', 'purity', 'Purity configuration', 'Karat and touch settings make the workshop’s calculation inputs visible.'),
  screen('jewellery-manufacturing', 'reports', 'Manufacturing reports', 'Account categories bring stock, work in progress and recoverable balances into a shared ledger view.'),
 ],
 polishing: [
  screen('jewellery-polishing', 'dashboard', 'Polishing dashboard', 'Daily and monthly views bring together pieces, weights, charges, loss and settlement directions.'),
  screen('jewellery-polishing', 'order-registry', 'Polishing order registry', 'A table records customers, pieces, two weight passes, making charges, loss and touch, with print and Excel export controls.'),
  screen('jewellery-polishing', 'customer-history', 'Polishing customer history', 'Customer totals and an order history make previous work and fine settlement positions easier to review.'),
 ],
 billing: [
  screen('jewellery-billing', 'create-bill', 'Jewellery bill creation', 'Issue and receive lines sit alongside separate cash and fine-gold balance calculations.'),
  screen('jewellery-billing', 'dashboard', 'Jewellery billing dashboard', 'An overview of bills, customers, pending balances and advance stock.'),
  screen('jewellery-billing', 'bills', 'Customer billing history', 'A searchable bill register with balance status and print controls.'),
  screen('jewellery-billing', 'advance-stock', 'Advance gold and cash', 'A dedicated view distinguishes customer advances from pending gold dues.'),
 ],
 operations: [
  screen('jewellery-operations', 'dashboard', 'Jewellery operations dashboard', 'Stock is separated into admin gold, karigar work, finished goods, loss, recovery and customer balances.'),
  screen('jewellery-operations', 'stock', 'Gold stock by karat', 'Stock controls include adding or removing gold, fine-to-karat conversion and karat-wise totals.'),
  screen('jewellery-operations', 'production-register', 'Jewellery production register', 'A production table brings together bag references, karat, filling-in weight and finished weight.'),
  screen('jewellery-operations', 'analytics', 'Production analytics', 'Daily, monthly and filtered summaries compare issued material, finished weights and loss across purities.'),
 ],
} satisfies Record<string, Screenshot[]>;
