# Ground Control — Design System

> The control room for your IT operations — precise, European, no bullshit.

---

## Aesthetic

**Reference point:** Aerospace HUD / Mission control terminal.  
Think NASA mission control displays, Palantir Gotham, Bloomberg Terminal, Oxide Computer's website.  
Authoritative without being intimidating. Data-dense without being overwhelming.

---

## Non-negotiables

| Rule | Detail |
|------|--------|
| **Zero border-radius** | Buttons, cards, inputs, badges — all sharp corners. The only exception is the `clip-path` corner cut on cards. |
| **Visible 1px borders** | Not shadows. Actual lines. The grid must be legible from border structure alone. |
| **Noise/grain texture** | 3–5% opacity SVG noise on dark background surfaces. Applied to backgrounds only, not interactive elements. Use `.noise` class. |
| **Muted, desaturated colors** | Nothing neon. Severity colors are readable but not aggressive. |
| **Monospace for data** | All data values, domains, labels, button text → IBM Plex Mono. |
| **All-caps UI labels** | Section markers, button text, badge labels, column headers → `uppercase tracking-widest`. |
| **Square status indicators** | 6×6px squares, not circles. Never use `rounded-full` on indicators. |
| **Button hover: invert** | Filled → outline. Outline → filled. Military toggle feel. |

---

## What to actively avoid

- Rounded corners (anywhere, ever — `border-radius: 0 !important` is set globally)
- Neon glows — max one `box-shadow` glow per page, used sparingly
- Gradient backgrounds — solid colors + noise texture only
- Animated particles, matrix rain, or typing effects
- Generic SaaS purple/blue gradient hero images
- Inter, Roboto, or system fonts for display text
- Stock photography of people or abstract technology
- "Revolutionize", "seamlessly", "powerful", "game-changing", "cutting-edge" in copy

---

## Design Tokens

Defined in `src/styles/global.css` under `@theme {}` (Tailwind v4 CSS-first config).

### Backgrounds

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-base` | `#080B0F` | Page background |
| `--color-bg-raised` | `#0D1117` | Cards, panels |
| `--color-bg-overlay` | `#131920` | Nav, overlaid panels |
| `--color-bg-subtle` | `#1A2230` | Hover states, rows |

### Borders

| Token | Value | Usage |
|-------|-------|-------|
| `--color-border-dim` | `#1A2230` | Subtle internal dividers |
| `--color-border-base` | `#243040` | Default borders |
| `--color-border-focus` | `#4A6FA5` | Focus rings, decorative marks |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| `--color-text-primary` | `#E8EDF2` | Headings, key values |
| `--color-text-muted` | `#5A7184` | Body copy, secondary info |
| `--color-text-dim` | `#3A4F61` | Placeholders, timestamps, metadata |

### Accent

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | `#4A8FBF` | Primary accent — muted steel blue |
| `--color-accent-dim` | `#2D5A7A` | Dimmed accent (borders, dividers) |
| `--color-accent-glow` | `rgba(74,143,191,0.08)` | Glow background for highlighted cards |

### Severity

| Token | Color | Bg token | Usage |
|-------|-------|----------|-------|
| `--color-critical` | `#C0392B` | `--color-critical-bg` | DMARC failure, certificate expired |
| `--color-warning` | `#D68910` | `--color-warning-bg` | Expiring soon, policy weak |
| `--color-pass` | `#1E8449` | `--color-pass-bg` | Check passed, enforced |
| `--color-info` | `#2471A3` | `--color-info-bg` | Informational, partial checks |

All severity backgrounds are 8% opacity of the foreground color.

---

## Typography

| Role | Font | Class |
|------|------|-------|
| Display / headings | Chakra Petch | `font-display` |
| Body copy | IBM Plex Sans | `font-body` |
| Data, labels, buttons, code | IBM Plex Mono | `font-mono` |

**Rules:**
- Display font: bold/semibold, `uppercase`, tight tracking (`leading-[1.02] tracking-tight`)
- Body font: 400–500 weight, `leading-relaxed`
- Mono font: used for ALL UI chrome — buttons, badges, labels, timestamps, values

**Font loading (in `<head>`):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Component Patterns

### Card with corner cut

```tsx
// Cut variants: 'sm' (8px) | 'md' (12px, default)
// Uses clip-path polygon — not border-radius
<Card cut="md" bordered>
  …
</Card>
```

CSS behind it:
```css
.card-cut    { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%); }
.card-cut-sm { clip-path: polygon(0 0, calc(100% - 8px)  0, 100% 8px,  100% 100%, 0 100%); }
```

The `bordered` prop wraps in a `bg-border-base p-px` frame to produce a raised 1px border effect.

### DataGrid

The standard section layout: a bordered outer box with 1px dividers between N columns.
Used in every section across the site.

```tsx
<DataGrid cols={3}>
  <div className="p-8">column 1</div>
  <div className="p-8">column 2</div>
  <div className="p-8">column 3</div>
</DataGrid>
```

On mobile it collapses to single column with horizontal dividers. At `md` it switches to N columns with vertical dividers.

### Button

```tsx
<Button variant="primary">Start free →</Button>   // accent fill, inverts on hover
<Button variant="ghost">See all products</Button>  // transparent, accent border on hover
<Button variant="outline" href="/sentinel">Open →</Button>  // accent border, fills on hover
<Button size="sm">Small</Button>
```

Hover behavior is always an inversion — filled becomes outline, outline becomes filled.

### SectionMarker

```tsx
<SectionMarker label="01 / The Problem" />
```

Renders a short horizontal accent line + mono uppercase label. Always placed above section headings.

### SeverityBadge

```tsx
<SeverityBadge severity="critical" />
<SeverityBadge severity="warning" label="Expiring soon" />
<SeverityBadge severity="pass" />
<SeverityBadge severity="info" />
```

Renders a square indicator (not a dot/circle) + label with appropriate severity color.

### StatusDot

```tsx
<StatusDot color="pass" />             // static green square
<StatusDot color="critical" blink />   // blinking red square
<StatusDot color="accent" size="xs" /> // small accent dot
```

Always square. Never `rounded-full`. Supports `blink` for live critical indicators.

### StatusPill

```tsx
// General status announcement
<StatusPill color="pass" blink>Now available — Sentinel free tier</StatusPill>

// Highlighted callout (accent variant)
<StatusPill variant="accent" color="accent">Most popular</StatusPill>
```

### FeatureItem

```tsx
// Neutral list (product cards)
<FeatureItem>SSL certificate expiry monitoring</FeatureItem>

// Confirmed check (attack surface panels)
<FeatureItem color="pass">DMARC policy enforcement (p=reject)</FeatureItem>

// Monospace technical item
<FeatureItem mono color="pass">selector1, selector2</FeatureItem>
```

### StatBlock

```tsx
<StatBlock value="10,000" label="spoofed emails sent from one domain in a single attack" />
```

Large accent-colored display number with a muted mono descriptor. Separated from above content by a top border.

### PricingRow

```tsx
<div className="divide-y divide-border-dim">
  <PricingRow label="Domains" value="Unlimited" />
  <PricingRow label="NIS2 report" value="✓ Full PDF export" />
  <PricingRow label="API access" value="—" />
</div>
```

Value logic: `—` → dim, `✓…` → pass green, everything else → text-primary.

### TextLink

```tsx
<TextLink href="/sentinel/email">DNS & Email deep scan →</TextLink>
```

Mono, uppercase, accent, hover → text-primary. No underline.

### Badge

```tsx
<Badge>NIS2</Badge>
<Badge className="text-warning border-warning/30">Beta</Badge>
```

Generic mono uppercase tag for arbitrary labels. Use `SeverityBadge` for status-colored variants.

---

## Noise Texture

Apply `.noise` to any dark surface that needs depth (sections, hero, overlays):

```css
.noise::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,…fractalNoise…");
  opacity: 0.035;
  pointer-events: none;
  z-index: 1;
}
```

The `.noise` class requires `position: relative` on the element.

---

## Animations

| Use | Class / rule | Duration | Notes |
|-----|-------------|----------|-------|
| Interactive state changes | `transition-all duration-150` | 150ms | Buttons, links, hover |
| Panel opens, reveals | `transition-all duration-300` | 300ms | Accordions, modals |
| Hero scanline | `.scanline` | 10s linear infinite | One per page, very low opacity |
| Critical status indicator | `.blink` (step-end) | 1.5s | Only for live critical dots |

**No JavaScript animation libraries.** No scroll-triggered animations.

### Scanline keyframe

```css
@keyframes scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
.scanline {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(transparent, rgba(74,143,191,0.06), transparent);
  animation: scanline 10s linear infinite;
  pointer-events: none;
  z-index: 100;
}
```

---

## Copy Voice

- Short sentences. Declarative.
- Technical terms used correctly, not avoided.
- Numbers and facts over adjectives: "Checks run every 6 hours" not "frequent monitoring".
- First person for trust statements: "We store your data in Frankfurt."
- Willing to name what competitors don't do.
- All-caps section markers: "01 / THE PROBLEM" not "The Problem".

**Banned words:** revolutionize, seamlessly, powerful, game-changing, cutting-edge, innovative, transformative, robust, leverage (as a verb), synergy.

---

## Quality Checklist

Before shipping any component:

- [ ] Zero border-radius (check buttons, inputs, cards, badges)
- [ ] Correct font: `font-mono` for labels/data/buttons, `font-display` for headings
- [ ] Status indicators are square, not round (`rounded-none` or `inline-block`)
- [ ] Button hover inverts (filled → outline, outline → filled)
- [ ] Copy is declarative, no filler adjectives
- [ ] Colors from design tokens only — no hardcoded hex values
- [ ] No `box-shadow` glow unless it's the one allowed per page
- [ ] No gradient backgrounds
