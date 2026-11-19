---
name: Clinical Pulse
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3f4850'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#006860'
  on-tertiary: '#ffffff'
  tertiary-container: '#248279'
  on-tertiary-container: '#f3fffc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#9cf2e8'
  tertiary-fixed-dim: '#80d5cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#00504a'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
  price-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 32px
    letterSpacing: -0.02em
  pos-keypad:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system delivers an operational environment calibrated for high-throughput pharmacy counters and clinical inventory governance. The visual language merges clinical sterility with high-speed POS interaction patterns, eliminating extraneous decor to reduce cognitive friction, prevent dispense errors, and support sustained focus under pressure.

### Brand Personality & Mood
- **Sterile & Authoritative:** High-clarity white planes, crisp delineation, and structured surgical accents establish uncompromised pharmaceutical rigor.
- **Instantaneous Comprehension:** High-contrast data grouping and clear informational density allow pharmacists to verify prescriptions, stock counts, and contraindications in split seconds.
- **Calm Under Pressure:** Controlled saturation preserves emotional balance during peak counter rush hours, using sharp chromatic alerts strictly for actionable medical statuses.

### Design Movement
**Clinical Functionalism:** A synthesis of Swiss utilitarianism and modern medical ergonomics. Layouts leverage high-order visual hierarchy, generous touch zones (minimum 48px hit areas for POS touch displays), zero-latency visual states, and rigorous spatial grouping.

## Colors

The palette mimics a clinical diagnostic dashboard: stark clean surfaces paired with unambiguous functional state colors.

### Palette Architecture
- **Primary (`#0284c7` - Deep Clinical Cyan):** Drives core navigation, active order commands, receipt issuance, and primary POS interactive triggers.
- **Secondary (`#10b981` - Medical Mint):** Designates verified inventory, active scripts, batch matching, and validated transactions.
- **Tertiary (`#0f766e` - Deep Surgical Teal):** Anchors data headers, prescription audit logs, and persistent navigation structural chrome.
- **Neutral Dark (`#0f172a` - Ink Slate):** Formulates typography, clinical barcode data, and high-legibility batch numbers.
- **Neutral Surface (`#f8fafc` & `#ffffff`):** Base canvas and card tiers, engineered with subtle borders (`#e2e8f0`) to replicate sterile, anti-glare clinical screens.

### Functional Alerts & Categorical Medicine Tokens
- **Warning / Low-Stock (`#f59e0b`):** Immediate visual cue for re-order thresholds, partial dispenses, and expiring lots.
- **Critical / Contraindication (`#ef4444`):** Hard stop indicator for out-of-stock items, adverse drug-drug interactions (DDI), and expired narcotics.
- **Internal Medicine / العلاج الداخلي (`#3b82f6` on `#eff6ff`):** Standardized sky-tint badge for systemics, tablets, capsules, and oral suspensions.
- **External Medicine / العلاج الخارجي (`#8b5cf6` on `#f5f3ff`):** Distinct violet badge for topicals, unguents, otic/ophthalmic drops, and transdermal patches to eliminate dispensing confusion.

## Typography

The typography stack uses geometric, ultra-legible letterforms designed for high rendering clarity on both backlit desktop monitors and POS terminals. For Arabic scripts, pairing aligns with contemporary geometric grotesque proportions (such as Cairo or IBM Plex Sans Arabic fallback) to ensure seamless bi-directional English/Arabic medication labeling.

### Hierarchy Guidelines
- **Optical Legibility:** Numeric data (dosages, barcodes, quantities, batch IDs, Egyptian Pound monetary values) must always use tabular figures (`tnum`) to maintain vertical column scanning in busy sales receipts.
- **RTL/LTR Harmony:** Medicine scientific nomenclature (Latin alphabet) sits beside Arabic commercial names with calibrated font-metrics and optical line-height balance.
- **Micro-labels:** Drug schedule flags and usage routes use uppercase or weighted Arabic badges (`label-sm`) with strict padding for instant classification.

## Layout & Spacing

The layout model optimizes space utilization for split POS operations: split-screen checkout panels, product search matrices, and live customer carts.

### Spatial Engine
- **Layout Architecture:** 12-column adaptive fluid grid for desktop management; structured 3-column split view (Catalog 7 cols / Live Receipt 5 cols) for active counter POS terminals.
- **Rhythm:** An 8-point base grid governing layouts, with 4-point micro-steps (`space-xs`) reserved for tight data tables, drug dosage counters, and prescription status indicators.
- **Touch Ergonomics:** POS touch screen interactions mandate minimum 48px heights on buttons, quick-pick drug categories, and numpad inputs, surrounded by `space-sm` boundary buffers to eradicate mistaps during rapid dispensing.

## Elevation & Depth

This design system avoids blurry, heavy drop shadows that muddy clinical visual clarity. Depth is communicated primarily through crisp tonal layering, sharp micro-borders, and high-precision ambient contact shadows.

### Elevation Levels
- **Base Level (Canvas):** `#f8fafc` background providing an anti-glare clinical backdrop.
- **Layer 1 (Cards, Tables, POS Shelves):** Pure `#ffffff` resting on Canvas, defined by a 1px crisp outline of `rgba(226, 232, 240, 0.9)` and an ultra-subtle contact shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04)`.
- **Layer 2 (Dropdowns, Drug Search Flyouts, Active Cart):** `#ffffff` elevated with `0 4px 12px -2px rgba(15, 23, 42, 0.08)`, 1px border of `rgba(203, 213, 225, 0.8)`.
- **Layer 3 (Modals, Contraindication Alerts, Payment Terminals):** Foreground overlays utilizing `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`, framed with dynamic status borders (e.g., solid `#ef4444` border for lethal contraindication warnings).

## Shapes

The design system employs a disciplined, soft geometric radius (0.25rem / 4px base, scale up to 0.5rem / 8px for containers). This communicates clinical precision and software sturdiness rather than consumer playfulness.

### Corner Radii Rules
- **Base Components (Inputs, Buttons, Chips, Numpad keys):** `0.25rem` (4px). Clean, precise, and spatial-efficient.
- **Panels & Surface Cards:** `0.5rem` (8px). Structural framing without wasting screen corners.
- **Route Badges (Internal/External Medicine):** Pill or semi-pill (`rounded-full` / `9999px`) to immediately signal categorical classification pills separate from square interactive actions.

## Components

### Buttons & POS Triggers
- **Primary Sale/Dispense:** Solid `#0284c7`, text `#ffffff`, high-weight font, minimum height 48px. Active press state shifts to `#0369a1` with immediate haptic/visual snap.
- **Stock Confirmation / Complete Order:** Solid `#10b981`, white text, commanding size.
- **Numpad & Action Buttons:** High-contrast background `#f1f5f9`, border 1px `#cbd5e1`, slate text `#0f172a`. Hover: `#e2e8f0`.

### Medical Route Badges (Categorical Distinction)
- **العلاج الداخلي (Internal Medicine):** Background `#eff6ff`, text `#1d4ed8`, border 1px `#bfdbfe`. Prefixed with an ingestible capsule/tablet icon.
- **العلاج الخارجي (External Medicine):** Background `#f5f3ff`, text `#6d28d9`, border 1px `#ddd6fe`. Prefixed with a topical droplet/tube icon.

### Inventory & Stock Status Chips
- **In Stock (متوفر):** Background `#ecfdf5`, text `#065f46`, border 1px `#a7f3d0`.
- **Low Stock (وشك النفاذ):** Background `#fffbeb`, text `#92400e`, border 1px `#fde68a`.
- **Out of Stock (غير متوفر):** Background `#fef2f2`, text `#991b1b`, border 1px `#fecaca`.

### Input Fields & Drug Search Bar
- **Global Drug Lookup:** Expanded search inputs (height 52px) featuring instant barcode scanner autofocus. Background `#ffffff`, border 1.5px `#cbd5e1`, focus border `#0284c7` with `0 0 0 3px rgba(2, 132, 199, 0.15)`. Prominent Arabic & English placeholder text.

### Clinical Contraindication Banner
- Hardened alert box with `#fef2f2` fill, `#b91c1c` 2px solid border, alert icon, and high-priority layout blocking checkout progression until explicitly acknowledged by the supervising pharmacist.

### POS Cart Line Item
- High-density rows displaying product name, active ingredient, route badge (داخلي/خارجي), quantity stepper (- 1 +), unit price, total price, and instantaneous stock level warning indicator.