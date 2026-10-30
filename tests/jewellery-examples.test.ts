import { test } from 'node:test';
import assert from 'node:assert/strict';
import { articles } from '../data/articles';
import {
  approvedBillingExample, approvedCombinedRatePercent, approvedFineAtTouchMilligrams,
  approvedMakingChargeMilligrams, approvedTotalBilledFineMilligrams,
  confirmedLossMilligrams, grams, karatComparisonRows, purityImpactFromKarat, purityImpactFromTouch,
  weightChainFine, weightChainNet, workInProgressCheck, workInProgressJob, workInProgressRows,
} from '../data/jewellery-examples';

test('gross less deductions gives net, and net at touch gives fine gold', () => {
  assert.equal(grams(weightChainNet()), '10.000 g');
  assert.equal(grams(weightChainFine()), '7.500 g');
});

test('owner-approved billing convention calculates exact three-decimal figures using integer milligrams', () => {
  assert.equal(grams(approvedBillingExample.netMilligrams), '20.000 g');
  assert.equal(approvedBillingExample.touchPercent, 75);
  assert.equal(approvedBillingExample.makingChargePoints, 2);
  assert.equal(approvedCombinedRatePercent(), 77);

  // Fine gold at touch alone (20.000 * 75 / 100)
  assert.equal(approvedFineAtTouchMilligrams(), 15000);
  assert.equal(grams(approvedFineAtTouchMilligrams()), '15.000 g');

  // Additional making charge equivalent (20.000 * 2 / 100)
  assert.equal(approvedMakingChargeMilligrams(), 400);
  assert.equal(grams(approvedMakingChargeMilligrams()), '0.400 g');

  // Total billed fine-gold equivalent (20.000 * 77 / 100)
  assert.equal(approvedTotalBilledFineMilligrams(), 15400);
  assert.equal(grams(approvedTotalBilledFineMilligrams()), '15.400 g');

  // Exact integer addition holds
  assert.equal(
    approvedFineAtTouchMilligrams() + approvedMakingChargeMilligrams(),
    approvedTotalBilledFineMilligrams()
  );
});

test('22K purity conventions differ by a known amount', () => {
  assert.equal(grams(purityImpactFromTouch()), '91.600 g');
  assert.equal(grams(purityImpactFromKarat()), '91.667 g');
  assert.equal(grams(purityImpactFromKarat() - purityImpactFromTouch()), '0.067 g');
  assert.deepEqual(karatComparisonRows(), [
    ['24K', '100.00%', '99.5%'], ['22K', '91.67%', '91.6%'], ['18K', '75.00%', '75%'], ['14K', '58.33%', '58.5%'],
  ]);
});

test('work-in-progress example accounts for exactly the quantity issued at both stages', () => {
  const [mid, done] = workInProgressJob.stages;
  assert.equal(60000 + 30000 + 10000 + 0, 100000);
  assert.equal(87000 + 0 + 0 + 11400 + 1600, 100000);
  assert.equal(confirmedLossMilligrams(mid), 0);
  assert.equal(confirmedLossMilligrams(done), 1600);
  assert.equal(workInProgressRows().at(-1)?.join('|'), 'Confirmed process loss|0.000 g|1.600 g');
  assert.match(workInProgressCheck(), /60\.000 \+ 30\.000 \+ 10\.000 = 100\.000 g/);
  assert.match(workInProgressCheck(), /87\.000 \+ 11\.400 \+ 1\.600 = 100\.000 g/);
});

test('published guides keep dates, unique section ids and properly qualify the approved billing convention', () => {
  const published = articles.filter(a => a.status === 'published');
  assert.equal(published.length, 3);
  for (const a of published) {
    assert.equal(a.publishedAt, '2026-09-23');
    const ids = a.sections.map(s => s.id);
    assert.equal(new Set(ids).size, ids.length);
  }

  const goldLoss = published.find(a => a.slug === 'track-gold-loss-jewellery-manufacturing')!;
  const goldLossText = JSON.stringify(goldLoss);
  assert.ok(goldLossText.includes('15.400 g'));
  assert.ok(goldLossText.includes('77%'));
  assert.ok(goldLossText.includes('specific commercial billing convention'));
  assert.ok(goldLossText.includes('not a universal jewellery industry formula'));

  // Ensure other articles don't accidentally leak this specific billing calculation
  const otherArticles = published.filter(a => a.slug !== 'track-gold-loss-jewellery-manufacturing');
  for (const a of otherArticles) {
    const text = JSON.stringify(a);
    assert.ok(!text.includes('15.400') && !text.includes('77%'));
  }
});
