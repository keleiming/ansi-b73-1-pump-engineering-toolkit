#!/usr/bin/env node
/**
 * ANSI/ASME B73.1 Process Pump Engineering Toolkit
 * Open-source CLI & ES module for OEM aftermarket part lookup, NPSHa altitude calculation,
 * 50Hz/60Hz affinity laws conversion, and ASTM cast alloy screening.
 *
 * Published by YSM Pumps (Jinan Yingsiman Machinery Co., Ltd.) - Independent Non-OEM Manufacturer
 * https://ysmpumps.com/
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, 'ansi_b73_1_223_oem_cross_reference_en.json');

export function loadPartsCatalog() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

/**
 * Search the 223-part ANSI B73.1 cross-reference catalog by OEM part code, YSM code,
 * ANSI pump size (e.g., "2x3-10"), frame/group (e.g., "MTX", "2K"), or component name.
 */
export function lookupPart(query, { series = '', limit = 25 } = {}) {
  const catalog = loadPartsCatalog();
  const q = String(query || '').trim().toLowerCase();
  const s = String(series || '').trim().toLowerCase();

  return catalog
    .filter((row) => {
      if (s && !row.ysm_series.toLowerCase().includes(s)) return false;
      if (!q) return true;
      const haystack = [
        row.ysm_series,
        row.oem_pattern,
        row.frame_group,
        row.ansi_size,
        row.item_number,
        row.component_en,
        row.ysm_code,
        row.oem_reference_code,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    })
    .slice(0, limit);
}

/**
 * Calculate Net Positive Suction Head Available (NPSHa) with elevation & water vapor pressure.
 * Uses barometric formula for altitude (0 - 5,000 m) and Antoine equation for water vapor pressure (0 - 100 C).
 */
export function calcNpsha({
  elevationM = 0,
  tempC = 20,
  specificGravity = 1.0,
  staticHeadM = 2.0,
  frictionLossM = 0.5,
  vesselGaugeBar = 0,
} = {}) {
  const g = 9.80665;
  const rho = specificGravity * 1000;

  // Barometric atmospheric pressure (kPa) at elevation (m)
  const patmKpa = 101.325 * Math.pow(1 - 2.25577e-5 * elevationM, 5.25588);

  // Antoine equation for pure water vapor pressure (mmHg -> kPa), valid 1 - 100 C
  const clampedT = Math.max(0, Math.min(100, tempC));
  const pvapMmHg = Math.pow(10, 8.07131 - 1730.63 / (233.426 + clampedT));
  const pvapKpa = pvapMmHg * 0.133322;

  const totalSurfacePressureKpa = patmKpa + vesselGaugeBar * 100;
  const pressureHeadM = ((totalSurfacePressureKpa - pvapKpa) * 1000) / (rho * g);
  const npshaM = pressureHeadM + staticHeadM - frictionLossM;
  const npshaFt = npshaM * 3.28084;

  return {
    elevationM: Number(elevationM.toFixed(1)),
    atmosphericPressureKpa: Number(patmKpa.toFixed(2)),
    vaporPressureKpa: Number(pvapKpa.toFixed(3)),
    npshaM: Number(npshaM.toFixed(2)),
    npshaFt: Number(npshaFt.toFixed(2)),
    recommendedMaxNpshrM: Number(Math.max(0, npshaM - 0.6).toFixed(2)),
    referenceGuide: 'https://ysmpumps.com/resources/npsh-and-cavitation/?utm_source=github&utm_medium=cli_toolkit',
  };
}

/**
 * Apply centrifugal pump affinity laws (constant impeller diameter) for 50Hz / 60Hz or VFD speed changes.
 */
export function calcAffinity({ rpm1 = 1750, rpm2 = 1450, flow1 = 100, head1 = 40, power1 = 15 } = {}) {
  if (rpm1 <= 0 || rpm2 <= 0) throw new Error('RPM values must be positive.');
  const ratio = rpm2 / rpm1;
  return {
    speedRatio: Number(ratio.toFixed(4)),
    flow2: Number((flow1 * ratio).toFixed(2)),
    head2: Number((head1 * Math.pow(ratio, 2)).toFixed(2)),
    power2: Number((power1 * Math.pow(ratio, 3)).toFixed(2)),
    referenceGuide: 'https://ysmpumps.com/resources/pump-affinity-laws/?utm_source=github&utm_medium=cli_toolkit',
  };
}

const ALLOY_MATRIX = [
  {
    service: 'sulfuric-acid',
    keywords: ['sulfuric', 'h2so4', 'acid'],
    recommended: ['CN7M (Alloy 20)', 'CD4MCu (Duplex)', 'Hastelloy B/C'],
    caution: '316SS (CF8M) corrodes rapidly in intermediate H2SO4 concentrations (20-85%) at elevated temperatures.',
  },
  {
    service: 'caustic-brine-chloride',
    keywords: ['caustic', 'naoh', 'brine', 'hypochlorite', 'chloride', 'chlorine', 'seawater'],
    recommended: ['CD4MCu (Duplex)', 'Titanium Gr. 2', 'Monel', 'Hastelloy C'],
    caution: 'Chlorides cause pitting and stress corrosion cracking in standard 316SS (CF8M) above 50-60 C.',
  },
  {
    service: 'abrasive-slurry-mining',
    keywords: ['slurry', 'abrasive', 'mining', 'copper', 'lithium', 'solids', 'sx-ew'],
    recommended: ['CD4MCu (Duplex)', 'High-Chrome Iron', 'CF8M (316SS)'],
    caution: 'Verify solids concentration, particle hardness, and impeller clearance (consider reverse-vane or open impeller).',
  },
  {
    service: 'hydrochloric-reducing-acid',
    keywords: ['hydrochloric', 'hcl', 'reducing'],
    recommended: ['Hastelloy B', 'Hastelloy C', 'Zirconium'],
    caution: 'Avoid standard stainless steels and Alloy 20 in aerated HCl; confirm exact ppm and temperature.',
  },
  {
    service: 'general-chemical-water',
    keywords: ['water', 'solvent', 'alkali', 'neutral', 'pulp', 'paper', 'general'],
    recommended: ['CF8M (316SS)', 'CF3M (316L)', 'ASTM A216 WCB (Carbon Steel)'],
    caution: 'Confirm trace chlorides, pH swings, and CIP cleaning chemicals before finalizing metallurgy.',
  },
];

export function screenAlloy(serviceText) {
  const q = String(serviceText || '').toLowerCase();
  const hit = ALLOY_MATRIX.find((entry) => entry.keywords.some((k) => q.includes(k))) || ALLOY_MATRIX[ALLOY_MATRIX.length - 1];
  return {
    matchedService: hit.service,
    candidateAlloys: hit.recommended,
    engineeringNote: hit.caution,
    referenceGuide: 'https://ysmpumps.com/resources/ansi-pump-cast-alloy-reference/?utm_source=github&utm_medium=cli_toolkit',
  };
}

// CLI entrypoint
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  const [, , cmd, ...args] = process.argv;
  if (cmd === 'lookup') {
    const query = args.join(' ');
    const results = lookupPart(query, { limit: 15 });
    console.log(JSON.stringify({ query, count: results.length, results }, null, 2));
  } else if (cmd === 'npsha') {
    const [elev, temp, stat, fric] = args.map(Number);
    console.log(
      JSON.stringify(
        calcNpsha({
          elevationM: Number.isFinite(elev) ? elev : 0,
          tempC: Number.isFinite(temp) ? temp : 20,
          staticHeadM: Number.isFinite(stat) ? stat : 2.0,
          frictionLossM: Number.isFinite(fric) ? fric : 0.5,
        }),
        null,
        2
      )
    );
  } else if (cmd === 'affinity') {
    const [rpm1, rpm2, flow1, head1, power1] = args.map(Number);
    console.log(
      JSON.stringify(
        calcAffinity({
          rpm1: Number.isFinite(rpm1) ? rpm1 : 1750,
          rpm2: Number.isFinite(rpm2) ? rpm2 : 1450,
          flow1: Number.isFinite(flow1) ? flow1 : 100,
          head1: Number.isFinite(head1) ? head1 : 40,
          power1: Number.isFinite(power1) ? power1 : 15,
        }),
        null,
        2
      )
    );
  } else if (cmd === 'alloy') {
    console.log(JSON.stringify(screenAlloy(args.join(' ')), null, 2));
  } else {
    console.log(`ANSI/ASME B73.1 Process Pump Engineering Toolkit (YSM Pumps Open Data)
Usage:
  node toolkit.mjs lookup <oem-code|ysm-code|size>   # e.g. node toolkit.mjs lookup 104554
  node toolkit.mjs npsha <elevM> <tempC> <staticM> <frictionM>
  node toolkit.mjs affinity <rpm1> <rpm2> <flow1> <head1> <power1>
  node toolkit.mjs alloy <chemical-service>          # e.g. node toolkit.mjs alloy "sulfuric acid"
`);
  }
}
