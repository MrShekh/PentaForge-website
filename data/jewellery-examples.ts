// Hypothetical teaching figures for the published jewellery guides.
// Quantities are held as integer milligrams so every published total can be checked exactly.
// None of these figures is client data, and none is a PentaForge billing or stock convention.

/** Milligrams to a three-decimal gram figure, e.g. 7500 -> "7.500". */
export const gramsNumber = (milligrams: number) => (milligrams / 1000).toFixed(3);
/** Milligrams to a labelled gram figure, e.g. 7500 -> "7.500 g". */
export const grams = (milligrams: number) => `${gramsNumber(milligrams)} g`;

/**
 * Default touch values shown on the purity settings screen published in the
 * jewellery manufacturing case study. They are configurable settings, not a standard.
 */
export const karatReference = [
  { karat: 24, label: '24K', defaultTouch: 99.5 },
  { karat: 22, label: '22K', defaultTouch: 91.6 },
  { karat: 18, label: '18K', defaultTouch: 75 },
  { karat: 14, label: '14K', defaultTouch: 58.5 },
] as const;

export const karatFractionPercent = (karat: number) => (karat / 24) * 100;

export const karatComparisonRows = () => karatReference.map(row => [
  row.label,
  `${karatFractionPercent(row.karat).toFixed(2)}%`,
  `${row.defaultTouch}%`,
]);

export const fineMilligramsFromTouch = (netMilligrams: number, touchPercent: number) => Math.round((netMilligrams * touchPercent) / 100);
export const fineMilligramsFromKarat = (netMilligrams: number, karat: number) => Math.round((netMilligrams * karat) / 24);

/** Generic definitions only: gross less agreed deductions is net; net at a touch gives fine gold. */
export const weightChain = { grossMilligrams: 10500, deductionsMilligrams: 500, touchPercent: 75 } as const;
export const weightChainNet = () => weightChain.grossMilligrams - weightChain.deductionsMilligrams;
export const weightChainFine = () => fineMilligramsFromTouch(weightChainNet(), weightChain.touchPercent);

/** Why a touch convention must be explicit: the same net weight under two conventions. */
export const purityImpact = { netMilligrams: 100000, karat: 22, defaultTouch: 91.6 } as const;
export const purityImpactFromTouch = () => fineMilligramsFromTouch(purityImpact.netMilligrams, purityImpact.defaultTouch);
export const purityImpactFromKarat = () => fineMilligramsFromKarat(purityImpact.netMilligrams, purityImpact.karat);

export interface JobStage { name: string; finishedMilligrams: number; inProgressMilligrams: number; scrapEstimatedMilligrams: number; recoveredMilligrams: number }

/**
 * One hypothetical job, in fine gold only, so no gross weight is added to a fine total.
 * Assumptions: one agreed touch convention was used for every conversion; scrap awaiting
 * refining counts as recoverable, not lost; loss is only confirmed once finished work and
 * refined recovery are both known; no wastage allowance and no customer-owned metal.
 */
export const workInProgressJob = {
  issuedMilligrams: 100000,
  stages: [
    { name: 'Mid-job', finishedMilligrams: 60000, inProgressMilligrams: 30000, scrapEstimatedMilligrams: 10000, recoveredMilligrams: 0 },
    { name: 'After completion and refining', finishedMilligrams: 87000, inProgressMilligrams: 0, scrapEstimatedMilligrams: 0, recoveredMilligrams: 11400 },
  ] satisfies JobStage[],
};

/** Confirmed process loss is whatever remains once every other position is accounted for. */
export const confirmedLossMilligrams = (stage: JobStage) =>
  workInProgressJob.issuedMilligrams - stage.finishedMilligrams - stage.inProgressMilligrams - stage.scrapEstimatedMilligrams - stage.recoveredMilligrams;

export const workInProgressRows = () => {
  const [mid, done] = workInProgressJob.stages;
  const issued = grams(workInProgressJob.issuedMilligrams);
  return [
    ['Issued to karigar', issued, issued],
    ['Finished work returned', grams(mid.finishedMilligrams), grams(done.finishedMilligrams)],
    ['Still with karigar (work in progress)', grams(mid.inProgressMilligrams), grams(done.inProgressMilligrams)],
    ['Scrap awaiting refining (estimated fine gold)', grams(mid.scrapEstimatedMilligrams), grams(done.scrapEstimatedMilligrams)],
    ['Recovered from scrap after refining', grams(mid.recoveredMilligrams), grams(done.recoveredMilligrams)],
    ['Confirmed process loss', grams(confirmedLossMilligrams(mid)), grams(confirmedLossMilligrams(done))],
  ];
};

/** Human-readable proof line that both columns account for the quantity issued. */
export const workInProgressCheck = () => {
  const [mid, done] = workInProgressJob.stages;
  const issued = grams(workInProgressJob.issuedMilligrams);
  const midParts = [mid.finishedMilligrams, mid.inProgressMilligrams, mid.scrapEstimatedMilligrams].map(gramsNumber).join(' + ');
  const doneParts = [done.finishedMilligrams, done.recoveredMilligrams, confirmedLossMilligrams(done)].map(gramsNumber).join(' + ');
  return `Check: mid-job, ${midParts} = ${issued} issued; at completion, ${doneParts} = ${issued}.`;
};
