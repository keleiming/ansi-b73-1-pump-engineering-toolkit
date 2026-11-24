import assert from 'node:assert/strict';
import { loadPartsCatalog, lookupPart, calcNpsha, calcAffinity, screenAlloy } from './toolkit.mjs';

const catalog = loadPartsCatalog();
assert.equal(catalog.length, 223, 'Catalog should contain exactly 223 OEM cross-reference entries');

// Verify OEM lookup for Goulds 3196 & Durco Mark 3
const gouldsHit = lookupPart('104554');
assert.equal(gouldsHit.length, 1);
assert.equal(gouldsHit[0].ysm_code, 'GAB100');
assert.equal(gouldsHit[0].ysmpumps_en_url, 'https://ysmpumps.com/parts/104554-goulds-3196-casing/');

const durcoHit = lookupPart('DY46070A');
assert.equal(durcoHit.length, 1);
assert.equal(durcoHit[0].ysm_code, 'DAF100');
assert.equal(durcoHit[0].ysmpumps_en_url, 'https://ysmpumps.com/parts/dy46070a-durco-mark-3-casing/');

// Verify sea-level vs high-altitude NPSHa
const seaLevel = calcNpsha({ elevationM: 0, tempC: 20, staticHeadM: 2, frictionLossM: 0.5 });
const andes3500 = calcNpsha({ elevationM: 3500, tempC: 20, staticHeadM: 2, frictionLossM: 0.5 });
assert.ok(seaLevel.npshaM > 11 && seaLevel.npshaM < 12, `Unexpected sea-level NPSHa: ${seaLevel.npshaM}`);
assert.ok(andes3500.npshaM < seaLevel.npshaM - 3.0, 'High altitude must reduce NPSHa by >3m at 3500m');

// Verify 60Hz -> 50Hz affinity laws
const aff = calcAffinity({ rpm1: 1750, rpm2: 1450, flow1: 100, head1: 50, power1: 20 });
assert.ok(Math.abs(aff.flow2 - 82.86) < 0.05);
assert.ok(Math.abs(aff.head2 - 34.33) < 0.05);
assert.ok(Math.abs(aff.power2 - 11.38) < 0.05);

// Verify alloy screening
const alloy = screenAlloy('hot sulfuric acid');
assert.ok(alloy.candidateAlloys.includes('CN7M (Alloy 20)'));

console.log('ALL TESTS PASSED:', {
  totalParts: catalog.length,
  sampleGoulds: gouldsHit[0].ysm_code,
  sampleDurco: durcoHit[0].ysm_code,
  seaLevelNpshaM: seaLevel.npshaM,
  altitude3500NpshaM: andes3500.npshaM,
  affinity50HzFlow: aff.flow2,
});
