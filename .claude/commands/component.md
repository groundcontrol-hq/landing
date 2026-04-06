# /component — Generate a Ground Control UI component

Generate an Astro component following the Ground Control design system.

## Usage
/component <ComponentName> [description of what it does]

## Instructions

When this command is invoked, generate a complete, production-ready
Astro component following ALL rules in CLAUDE.md.

### Before writing any code, confirm:

1. **Zero border-radius** — `rounded-none` explicit on all interactive elements
2. **Correct font usage**:
   - Headings: `font-display` (Chakra Petch)
   - Body: `font-body` (IBM Plex Sans)
   - Labels, data, buttons, badges: `font-mono` (IBM Plex Mono)
3. **Button hover**: filled → outline inversion pattern
4. **Status indicators**: square (`w-1.5 h-1.5 inline-block`), never `rounded-full`
5. **Colors**: design token CSS variables only, never hardcoded hex
6. **Copy**: declarative, no filler adjectives, uppercase for UI labels

### Output format

Always output:

```
## Component: <ComponentName>

**Purpose**: [one sentence]
**Interactive**: [yes/no — if yes, note client:load or client:visible]
**Design decisions**: [2-3 bullet notes on key choices]

---

[Full component code]

---

**Usage example**:
[How to import and use in a page]
```

### Component template structure

```astro
---
// <ComponentName>.astro
// [Brief description]

interface Props {
  // typed props
}

const { } = Astro.props;
---

<!-- Component markup -->

<style>
  /* Scoped styles only for clip-path, keyframes, or things
     Tailwind cannot express. Everything else uses Tailwind utilities. */
</style>
```

### Design system reference (quick lookup)

**Backgrounds**: `bg-bg-base` `bg-bg-raised` `bg-bg-overlay` `bg-bg-subtle`
**Borders**: `border-border-dim` `border-border-base` `border-border-focus`
**Text**: `text-text-primary` `text-text-muted` `text-text-dim`
**Accent**: `text-accent` `bg-accent` `border-accent`
**Severity**: `text-critical` `text-warning` `text-pass` `text-info`
**Severity bg**: `bg-critical-bg` `bg-warning-bg` `bg-pass-bg` `bg-info-bg`
**Fonts**: `font-display` `font-body` `font-mono`
**Tracking**: `tracking-widest` for uppercase mono labels
**No radius**: `rounded-none` (explicit)
**Transition**: `transition-all duration-150` for hover states

### Card corner cut (use for all card components)

```css
clip-path: polygon(
  0 0,
  calc(100% - 12px) 0,
  100% 12px,
  100% 100%,
  0 100%
);
```

### Section marker pattern (use above all section headings)

```astro
<div class="flex items-center gap-3 mb-6">
  <div class="w-8 h-px bg-accent" />
  <span class="font-mono text-xs text-accent uppercase tracking-widest">
    {marker}
  </span>
</div>
```
