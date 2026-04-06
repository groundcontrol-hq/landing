# Ground Control — Landing Page
## Claude Code Instructions

---

## Project purpose

This is the marketing landing page for **Ground Control** (`groundcontrol.land`),
a security and IT operations platform for European tech companies.

Two pages to build:
- `/` — Platform home (Ground Control suite overview)
- `/sentinel` — Sentinel product page (security monitoring)

---

## Tech stack

| Layer       | Choice                                      |
|-------------|---------------------------------------------|
| Framework   | Astro 4.x (static + islands architecture)   |
| Styling     | Tailwind CSS v4 (CSS-first config)          |
| Components  | Ark UI (headless, for interactive elements) |
| Language    | TypeScript throughout                       |
| Icons       | Custom SVG, Phosphor Icons (thin weight)    |
| Fonts       | Chakra Petch (display) + IBM Plex (body/mono) |
| Animation   | CSS only — no GSAP, no Framer              |
| Deploy      | Static export → Cloud Run or Cloudflare Pages |

**No React. No Next.js. No Vue.** Astro components only unless
an island specifically needs interactivity (domain checker form).

---

## Aesthetic — read this before writing any code or CSS

### The reference point

**Aerospace HUD / Mission control terminal** — not "space startup with gradients."
Think NASA mission control displays, Palantir Gotham, Bloomberg Terminal,
Oxide Computer's website. Authoritative without being intimidating.

### Non-negotiables

- **Zero border-radius everywhere.** Buttons, cards, inputs, badges — all sharp corners.
  The only exception is the clip-path corner cut on cards (see below).
- **Visible 1px borders.** Not shadows. Actual lines. The grid should be
  legible from border structure alone.
- **Noise/grain texture** on dark background surfaces. 3–5% opacity SVG noise overlay.
  Applied to backgrounds only, not interactive elements.
- **Muted, desaturated colors.** Nothing neon. Severity colors are readable but not aggressive.
- **Monospace for all data, values, domains, labels, buttons.** IBM Plex Mono.
- **All-caps for UI labels, button text, section markers.**
- **Square status indicators** — not circles. 6×6px squares, not dots.
- **Button hover: filled → outline inversion.** Military toggle feel.

### What to actively avoid

- Rounded corners (anywhere, ever)
- Neon glows (`box-shadow` glow effects — maximum one per page, sparingly)
- Gradient backgrounds (solid colors + noise texture only)
- Animated particles or matrix effects
- Generic SaaS purple/blue gradient hero images
- Inter, Roboto, or system fonts for display text
- Stock photography of people or abstract technology
- "Revolutionize", "seamlessly", "powerful", "game-changing" in copy

---

## Design tokens (Tailwind v4 CSS config)

Define in `src/styles/tokens.css`. Tailwind v4 uses `@theme` block:

```css
@import "tailwindcss";

@theme {
  /* Backgrounds */
  --color-bg-base:     #080B0F;
  --color-bg-raised:   #0D1117;
  --color-bg-overlay:  #131920;
  --color-bg-subtle:   #1A2230;

  /* Borders */
  --color-border-dim:  #1A2230;
  --color-border-base: #243040;
  --color-border-focus:#4A6FA5;

  /* Text */
  --color-text-primary:#E8EDF2;
  --color-text-muted:  #5A7184;
  --color-text-dim:    #3A4F61;

  /* Accent — muted steel blue */
  --color-accent:      #4A8FBF;
  --color-accent-dim:  #2D5A7A;
  --color-accent-glow: rgba(74,143,191,0.08);

  /* Severity — desaturated */
  --color-critical:    #C0392B;
  --color-warning:     #D68910;
  --color-pass:        #1E8449;
  --color-info:        #2471A3;

  /* Severity backgrounds */
  --color-critical-bg: rgba(192,57,43,0.08);
  --color-warning-bg:  rgba(214,137,16,0.08);
  --color-pass-bg:     rgba(30,132,73,0.08);
  --color-info-bg:     rgba(36,113,163,0.08);

  /* Typography */
  --font-display: 'Chakra Petch', sans-serif;
  --font-body:    'IBM Plex Sans', sans-serif;
  --font-mono:    'IBM Plex Mono', monospace;

  /* Spacing — 4px base grid */
  --spacing-px: 1px;

  /* No border radius — all 0 */
  --radius-none: 0px;
}
```

---

## Component patterns

### Card with corner cut

```astro
---
// Card.astro
interface Props {
  class?: string;
}
const { class: className } = Astro.props;
---
<div
  class:list={[
    "bg-bg-raised border border-border-base p-6",
    "card-clip",           /* clip-path applied via CSS */
    className
  ]}
>
  <slot />
</div>

<style>
.card-clip {
  clip-path: polygon(
    0 0,
    calc(100% - 12px) 0,
    100% 12px,
    100% 100%,
    0 100%
  );
}
</style>
```

### Button patterns

```astro
---
// Button.astro
interface Props {
  variant?: 'primary' | 'ghost' | 'outline';
  href?: string;
  class?: string;
}
const { variant = 'primary', href, class: className } = Astro.props;
const Tag = href ? 'a' : 'button';
---
<Tag
  href={href}
  class:list={[
    /* Base — all buttons */
    "inline-flex items-center gap-2 px-5 py-2.5",
    "font-mono text-xs uppercase tracking-widest",
    "border transition-all duration-150",
    "rounded-none",          /* explicit zero radius */
    /* Variants */
    variant === 'primary' && [
      "bg-accent text-bg-base border-accent",
      "hover:bg-transparent hover:text-accent",
    ],
    variant === 'ghost' && [
      "bg-transparent text-text-muted border-border-base",
      "hover:border-accent hover:text-accent",
    ],
    variant === 'outline' && [
      "bg-transparent text-accent border-accent",
      "hover:bg-accent hover:text-bg-base",
    ],
    className
  ]}
>
  <slot />
</Tag>
```

### Severity badge

```astro
---
// SeverityBadge.astro
type Severity = 'critical' | 'warning' | 'pass' | 'info';
interface Props { severity: Severity; label?: string; }
const { severity, label } = Astro.props;

const config = {
  critical: { text: 'Critical', classes: 'bg-critical-bg text-critical border-critical/30' },
  warning:  { text: 'Warning',  classes: 'bg-warning-bg  text-warning  border-warning/30'  },
  pass:     { text: 'Pass',     classes: 'bg-pass-bg     text-pass     border-pass/30'     },
  info:     { text: 'Info',     classes: 'bg-info-bg     text-info     border-info/30'     },
};
const cfg = config[severity];
---
<span class:list={[
  "inline-flex items-center gap-1.5 px-2 py-0.5",
  "font-mono text-xs uppercase tracking-wider border",
  cfg.classes
]}>
  <!-- Square indicator, not circle -->
  <span class:list={["w-1.5 h-1.5 inline-block", `bg-${severity}`]} />
  {label ?? cfg.text}
</span>
```

### Section marker (used above section headings)

```astro
<!-- Usage: <SectionMarker label="01 / SECURITY" /> -->
<div class="flex items-center gap-3 mb-6">
  <div class="w-8 h-px bg-accent" />
  <span class="font-mono text-xs text-accent uppercase tracking-widest">
    {label}
  </span>
</div>
```

### Noise texture overlay

Apply to any dark surface that needs depth:

```css
/* In global CSS */
.noise {
  position: relative;
}
.noise::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
  opacity: 0.04;
  pointer-events: none;
  z-index: 1;
}
```

### Status indicator (square, not circle)

```html
<!-- Blinking critical indicator -->
<span class="inline-block w-1.5 h-1.5 bg-critical animate-pulse" />

<!-- Static pass indicator -->
<span class="inline-block w-1.5 h-1.5 bg-pass" />
```

---

## Page structure

### Home (`/`)

```
<Layout>
  <Nav />                    ← sticky, products in nav
  <HeroHome />               ← headline + 3 product cards
  <ProblemStrip />           ← 3 columns, no icons, plain type
  <ProductSuite />           ← Sentinel (live) + Desk/Launch (coming)
  <EuropeTrustBar />         ← EU residency, NIS2, GDPR facts
  <SentinelSpotlight />      ← product screenshot + 3 bullets
  <PricingTeaser />          ← "Free to start" + link to /sentinel#pricing
  <Footer />
</Layout>
```

### Sentinel (`/sentinel`)

```
<Layout>
  <Nav />
  <HeroSentinel />           ← question headline + domain checker input
  <DomainChecker />          ← Astro island, interactive, shows results inline
  <ProblemScenarios />       ← 3 scenarios (spoofing, SSL expiry, M365 misconfigured)
  <HowItWorks />             ← 3 steps, no jargon
  <WhatWeCheck />            ← full check list in two columns
  <Nis2Section />            ← NIS2 angle + sample report download
  <Pricing />                ← full 3-tier table
  <Faq />                    ← 6 questions, Ark UI accordion
  <CtaFinal />               ← domain checker repeated
  <Footer />
</Layout>
```

---

## Copy voice

- Short sentences. Declarative.
- Technical terms used correctly, not avoided.
- No: "revolutionize", "seamlessly", "powerful", "game-changing", "cutting-edge"
- First person for trust statements: "We store your data in Frankfurt."
- Willing to name what competitors don't do.
- Numbers and facts over adjectives: "Checks run every 6 hours" not "frequent monitoring"
- All-caps section markers: "01 / THE PROBLEM" not "The Problem"

---

## Fonts setup (in `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Animation rules

- CSS transitions only: `transition-all duration-150` for interactive states
- `duration-300` for reveals and panel opens
- One scan-line animation allowed in hero (slow, 8s, very low opacity)
- `animate-pulse` only for blinking status indicators
- No JavaScript animation libraries
- No scroll-triggered animations (keep it fast and accessible)

### Scan line keyframe

```css
@keyframes scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

.scanline {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(
    transparent,
    rgba(74, 143, 191, 0.06),
    transparent
  );
  animation: scanline 8s linear infinite;
  pointer-events: none;
  z-index: 100;
}
```

---

## File naming conventions

```
src/
  components/
    ui/
      Button.astro
      Card.astro
      SeverityBadge.astro
      SectionMarker.astro
      StatusDot.astro
    sections/
      home/
        HeroHome.astro
        ProductSuite.astro
        EuropeTrustBar.astro
      sentinel/
        HeroSentinel.astro
        DomainChecker.astro   ← client:load island
        WhatWeCheck.astro
        Nis2Section.astro
        Pricing.astro
        Faq.astro             ← client:visible island (Ark accordion)
    layout/
      Layout.astro
      Nav.astro
      Footer.astro
  pages/
    index.astro
    sentinel.astro
  styles/
    tokens.css               ← Tailwind v4 @theme block
    global.css               ← noise, scanline, base resets
```

---

## Astro config

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    tailwind({ configFile: false }),  // v4 uses CSS config, not JS
  ],
  output: 'static',
});
```

---

## Package.json dependencies

```json
{
  "dependencies": {
    "astro":           "^4.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "tailwindcss":     "^4.0.0",
    "@ark-ui/anatomy": "^3.0.0",
    "zod":             "^3.23.0"
  },
  "devDependencies": {
    "typescript":      "^5.5.0",
    "@types/node":     "^20.0.0"
  }
}
```

Note: Ark UI is used for interactive headless primitives only:
- Accordion (FAQ section)
- Any future dialog/modal
Import from `@ark-ui/anatomy` for unstyled components.
Do NOT use Ark's styled components — style everything with Tailwind.

---

## Domain checker (interactive island)

The domain checker is the most important interactive element.
It lives in `DomainChecker.astro` with `client:load`.

Behavior:
1. User types a domain
2. On submit: calls `/api/check?domain=x` (or the GC API)
3. Shows skeleton loader (pulsing rectangles, not spinner)
4. Renders results inline — same sharp card aesthetic
5. CTA at bottom of results: "Monitor this domain continuously →"

Result card structure:
```
┌─ CHECK RESULT ──────────────────────── [domain] ─┐
│                                                   │
│  ■ DMARC     [CRITICAL]  Policy set to p=none    │
│  ■ SPF       [PASS]      Hard fail enforced       │
│  ■ SSL       [WARNING]   Expires in 28 days       │
│  ■ DKIM      [PASS]      selector1, selector2     │
│                                                   │
│  [MONITOR THIS DOMAIN →]                          │
└───────────────────────────────────────────────────┘
```

The skeleton loader uses animated bg-bg-subtle rectangles,
never a spinning circle.

---

## MCP integrations (optional, configure as needed)

If Figma MCP is connected:
- Read design tokens from Figma variables and map to CSS custom properties
- Export component frames as reference for implementation
- Do NOT copy Figma CSS directly — translate to Tailwind utility classes

If browser/screenshot MCP is connected:
- Use for visual QA of implemented components
- Compare against design references

---

## What good output looks like

Before writing any component, answer:
1. Does it have zero border-radius?
2. Does it use the correct font (mono for labels/data, display for headings)?
3. Are status indicators square, not round?
4. Does button hover invert (filled → outline)?
5. Is the copy declarative and free of filler adjectives?
6. Does it use design tokens (CSS variables) not hardcoded colors?

If any answer is no, fix it before moving on.

---

## Ground Control brand voice in one sentence

**"The control room for your IT operations — precise, European, no bullshit."**
