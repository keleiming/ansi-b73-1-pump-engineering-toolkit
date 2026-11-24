# ANSI/ASME B73.1 Process Pump Engineering Toolkit (English + Spanish)

[![Interactive Web Tool](https://img.shields.io/badge/Interactive_Web_Tool-Launch_GitHub_Pages-ea580c)](https://keleiming.github.io/ansi-b73-1-pump-engineering-toolkit/)
[![Official English Portal](https://img.shields.io/badge/English_Portal-ysmpumps.com-0b2239)](https://ysmpumps.com/?utm_source=github&utm_medium=readme&utm_campaign=ansi_toolkit)
[![Portal Español](https://img.shields.io/badge/Portal_Español-ysmbombas.com-15803d)](https://ysmbombas.com/?utm_source=github&utm_medium=readme&utm_campaign=ansi_toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

Open-source engineering toolkit, CLI, and **223-part OEM aftermarket cross-reference dataset** for **ANSI/ASME B73.1 chemical process pumps**, maintained by **[YSM Pumps (Jinan Yingsiman Machinery Co., Ltd.)](https://ysmpumps.com/?utm_source=github&utm_medium=readme)** — an independent foundry and CNC pump manufacturer operating since 2010.

Designed for **chemical plant maintenance engineers, reliability engineers, process engineers, EPC contractors, and MRO pump distributors** working with:
- **[Goulds 3196 Replacement Pumps & Parts (YSM G196)](https://ysmpumps.com/goulds-3196-pump-parts/?utm_source=github&utm_medium=readme)** — also compatible with [Griswold 811](https://ysmpumps.com/product/griswold-811-replacement/?utm_source=github&utm_medium=readme), [Peerless 8196](https://ysmpumps.com/product/peerless-8196-replacement/?utm_source=github&utm_medium=readme), [Summit 2196](https://ysmpumps.com/product/summit-2196-replacement/?utm_source=github&utm_medium=readme), [Aurora 3550](https://ysmpumps.com/product/aurora-3550-replacement/?utm_source=github&utm_medium=readme), and [PumpWorks PWA Gen2](https://ysmpumps.com/product/pumpworks-pwa-gen2-replacement/?utm_source=github&utm_medium=readme).
- **[Flowserve Durco Mark 3 Replacement Pumps & Parts (YSM D Mark III)](https://ysmpumps.com/durco-mark-3-pump-parts/?utm_source=github&utm_medium=readme)** — reverse-vane impeller Groups 1K, 2K, 3K (also compatible with [Summit Clark 3](https://ysmpumps.com/product/summit-clark-3-replacement/?utm_source=github&utm_medium=readme)).

---

## Launch the Free Online Toolkit (No Install Required)

Open **[keleiming.github.io/ansi-b73-1-pump-engineering-toolkit](https://keleiming.github.io/ansi-b73-1-pump-engineering-toolkit/)** directly in your browser:
1. **223 OEM Part Cross-Reference Finder**: Filter casings, impellers, BigBore/tapered seal chambers, shafts, sleeves, frames, and adapters by OEM part number or ANSI size (`1x1.5-6` through `8x10-15G` and `1K`–`3K`).
2. **High-Altitude NPSHa Cavitation Calculator**: Correct barometric pressure from 0 to 5,000 m elevation plus liquid temperature vapor pressure.
3. **50Hz / 60Hz Pump Affinity Laws Converter**: Instantly scale flow ($Q$), head ($H$), and shaft power ($P$) between 1450/2900 RPM and 1750/3500 RPM.
4. **Standardized Plant RFQ Builder**: Assemble your pump nameplate and selected OEM part codes into a ready-to-send RFQ for 48-hour stock verification.

---

## Command-Line & Node.js Usage (Zero Dependencies)

Requires Node.js 18+:

```bash
# Look up an OEM part number (Goulds 3196 or Durco Mark 3)
node toolkit.mjs lookup 104554
node toolkit.mjs lookup DY46070A
node toolkit.mjs lookup "2x3-10"

# Compute NPSHa at 3,500 m elevation, 25 °C water, 2 m static head, 0.5 m friction loss
node toolkit.mjs npsha 3500 25 2 0.5

# Convert 60 Hz (1750 RPM) performance to 50 Hz (1450 RPM)
node toolkit.mjs affinity 1750 1450 100 40 15

# Screen ASTM cast alloys for corrosive chemical service
node toolkit.mjs alloy "sulfuric acid"

# Run automated verification suite
node test_toolkit.mjs
```

---

## Repository Files

| File | Purpose |
| :--- | :--- |
| [`index.html`](./index.html) | Zero-dependency interactive engineering web app (GitHub Pages) |
| [`toolkit.mjs`](./toolkit.mjs) | Node.js ESM module & CLI for part lookup, NPSHa, affinity laws, and metallurgy screening |
| [`ansi_b73_1_223_oem_cross_reference_en.csv`](./ansi_b73_1_223_oem_cross_reference_en.csv) | Clean UTF-8 English CSV of all **223 ANSI B73.1 OEM cross-reference codes** |
| [`ansi_b73_1_223_oem_cross_reference_en.json`](./ansi_b73_1_223_oem_cross_reference_en.json) | Structured JSON dataset with direct technical page links (EN + ES) |
| [`test_toolkit.mjs`](./test_toolkit.mjs) | Automated assertion tests covering dataset integrity and hydraulic formulas |

---

## High-Demand OEM Part Pages (Direct Spec Links)

| Series | ANSI Size | Component | OEM Ref # | YSM Code | Spec Page |
| :--- | :--- | :--- | :---: | :---: | :--- |
| YSM G196 (3196) | 1x1.5-6 (STX) | Casing / Volute | `104554` | `GAB100` | [104554 Casing Specs](https://ysmpumps.com/parts/104554-goulds-3196-casing/?utm_source=github&utm_medium=readme) |
| YSM G196 (3196) | 1x1.5-6 (STX) | Open Impeller | `076781` | `GAB3` | [076781 Impeller Specs](https://ysmpumps.com/parts/076781-goulds-3196-impeller/?utm_source=github&utm_medium=readme) |
| YSM G196 (3196) | 2x3-8 (MTX) | Casing / Volute | `24741` | `GAF100` | [24741 Casing Specs](https://ysmpumps.com/parts/24741-goulds-3196-casing/?utm_source=github&utm_medium=readme) |
| YSM G196 (3196) | 2x3-8 (MTX) | Open Impeller | `0100161` | `GAF3` | [0100161 Impeller Specs](https://ysmpumps.com/parts/0100161-goulds-3196-impeller/?utm_source=github&utm_medium=readme) |
| YSM G196 (3196) | 1.5x3-13 (MTX) | Casing / Volute | `24963` | `GAS100` | [24963 Casing Specs](https://ysmpumps.com/parts/24963-goulds-3196-casing/?utm_source=github&utm_medium=readme) |
| YSM G196 (3196) | 6x8-13 (XLTX) | Casing / Volute | `25450` | `GNA100` | [25450 Casing Specs](https://ysmpumps.com/parts/25450-goulds-3196-casing/?utm_source=github&utm_medium=readme) |
| YSM D Mark III | 2K3x2-8 (Group 2) | Casing / Volute | `DY46070A` | `DAF100` | [DY46070A Casing Specs](https://ysmpumps.com/parts/dy46070a-durco-mark-3-casing/?utm_source=github&utm_medium=readme) |
| YSM D Mark III | 2K3x2-8 (Group 2) | Reverse-Vane Impeller | `MY46066A82` | `DAF3` | [MY46066A82 Impeller Specs](https://ysmpumps.com/parts/my46066a82-durco-mark-3-impeller/?utm_source=github&utm_medium=readme) |
| YSM D Mark III | 2K2x1LF-10 (Group 2) | Low-Flow Casing | `BY40035AV` | `DYC100` | [BY40035AV Casing Specs](https://ysmpumps.com/parts/by40035av-durco-mark-3-casing/?utm_source=github&utm_medium=readme) |
| YSM D Mark III | 2K2x1LF-10 (Group 2) | Low-Flow Impeller | `MY55574A100` | `DYC3` | [MY55574A100 Impeller Specs](https://ysmpumps.com/parts/my55574a100-durco-mark-3-impeller/?utm_source=github&utm_medium=readme) |

---

## Core Engineering References on YSM Pumps

- [Centrifugal Pump Parts Diagram & Wet-End / Power-End Breakdown](https://ysmpumps.com/resources/centrifugal-pump-parts/?utm_source=github&utm_medium=readme)
- [How to Read an ANSI B73.1 Pump Nameplate & Identify Replacement Parts](https://ysmpumps.com/pump-nameplate-drawing-replacement-identification/?utm_source=github&utm_medium=readme)
- [ANSI Pump Size Codes & Frame Cross-Reference (STX, MTX, LTX, XLTX, 1K–3K)](https://ysmpumps.com/resources/ansi-pump-size-codes/?utm_source=github&utm_medium=readme)
- [YSM G196 vs. Goulds 3196 Dimensional Interchangeability](https://ysmpumps.com/resources/g196-vs-goulds-3196-interchangeability/?utm_source=github&utm_medium=readme)
- [YSM D Mark III vs. Durco Mark 3 Technical Comparison](https://ysmpumps.com/resources/ysm-d-mark-iii-vs-durco-mark-3/?utm_source=github&utm_medium=readme)
- [ANSI Cast Alloy Selection (WCB, CF8M, CD4MCu, Alloy 20, Hastelloy, Titanium)](https://ysmpumps.com/resources/ansi-pump-cast-alloy-reference/?utm_source=github&utm_medium=readme)
- [Urgent ANSI Pump Parts RFQ Checklist (48h Stock Dispatch)](https://ysmpumps.com/urgent-ansi-pump-parts-rfq-checklist/?utm_source=github&utm_medium=readme)
- [Spanish Open Dataset & 223 OEM Codes Portal (Chile, Perú, México, Colombia, España)](https://ysmbombas.com/repuestos-ansi/?utm_source=github&utm_medium=readme)

---

## Foundry QA & Lead Time Benchmarks (Jinan Yingsiman Machinery Co., Ltd.)

- **In-House Foundry & CNC Plant**: 3,000 m² facility in Boshan, Zibo, China (since 2010)
- **Alloys Cast In-House**: ASTM A216 WCB, CF8M (316SS), CF3M (316L), CD4MCu (Duplex), CN7M (Alloy 20), Monel, Nickel, Hastelloy B/C, Titanium Gr. 2/3, Zirconium
- **Quality Verification**: Heat-level PMI spectrometry (EN 10204 3.1), 3D CMM Tornado NCA10158 dimensional inspection, dynamic impeller balancing, hydrostatic pressure testing, 3 hydraulic test stands up to 250 kW / 9,000 m³/h, and optional third-party witness inspection (SGS / Bureau Veritas / TÜV)
- **Reference Dispatch Lead Times**: Stock CF8M/CD4MCu spares **48 h** · Standard spares **~1 week** · Wet end **~2 weeks** · Complete pump **~4 weeks** · **12-month warranty**
- **Direct Engineering Contact**: `gavin42541@gmail.com` / `miya_zhang@vip.163.com` · WhatsApp `+86 186 1541 9318` · [Request a Quote](https://ysmpumps.com/contact-us-2/?utm_source=github&utm_medium=readme)

> **Independent Aftermarket Disclaimer**: YSM Pumps (Jinan Yingsiman Machinery Co., Ltd.) is an independent non-OEM manufacturer. Goulds®, 3196®, Durco®, Flowserve®, Mark 3®, Griswold®, Peerless®, Summit®, Aurora®, and PumpWorks® are trademarks of their respective owners and are used strictly for dimensional compatibility reference under ASME B73.1.
