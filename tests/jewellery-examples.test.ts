import { test } from 'node:test';
import assert from 'node:assert/strict';
import { articles } from '../data/articles';
import {
  confirmedLossMilligrams, grams, karatComparisonRows, purityImpactFromKarat, purityImpactFromTouch,
  weightChainFine, weightChainNet, workInProgressCheck, workInProgressJob, workInProgressRows,
} from '../data/jewellery-examples';

test('gross less deductions gives net, and net at touch gives fine gold', () => {
  assert.equal(grams(weightChainNet()), '10.000 g');
  assert.equal(grams(weightChainFine()), '7.500 g');
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

test('published guides keep dates, unique section ids and omit the unapproved convention', () => {
  const published = articles.filter(a => a.status === 'published');
  assert.equal(published.length, 3);
  for (const a of published) {
    assert.equal(a.publishedAt, '2026-09-23');
    const ids = a.sections.map(s => s.id);
    assert.equal(new Set(ids).size, ids.length);
    const text = JSON.stringify(a);
    assert.ok(!text.includes('15.400') && !text.includes('77%'));
  }
});
