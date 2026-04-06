# /section — Generate a full page section

Generate a complete page section (hero, features, pricing, etc.)
for the Ground Control landing page.

## Usage
/section <SectionName> <page: home|sentinel> [additional context]

## Instructions

Generate a full Astro section component. Sections are larger than
UI components — they contain layout, copy, and multiple sub-components.

### Section checklist before outputting

- [ ] Opens with a `<SectionMarker>` with numbered label (e.g. "01 / THE PROBLEM")
- [ ] Section uses `noise` class for background texture if it's a hero or featured section
- [ ] All text copy follows the brand voice (declarative, no filler words)
- [ ] Mobile-first responsive layout using Tailwind grid/flex
- [ ] No images unless specifically requested — product UI or geometric only
- [ ] Scanline animation only in hero sections, nowhere else
- [ ] Consistent padding: `py-24 px-6 max-w-6xl mx-auto` for section containers

### Copy guidelines for sections

**Home hero headline options** (pick the most relevant):
- "Your IT operations, under control."
- "Security and infrastructure monitoring for European tech companies."

**Sentinel hero headline** (use this exact copy):
- "Is someone sending emails pretending to be you?"

**Section marker format**: `[NUMBER] / [TOPIC]` in uppercase mono
Examples: `01 / THE PROBLEM` `02 / HOW IT WORKS` `03 / WHAT WE CHECK`

**EU trust bar copy** (use exact facts):
- "Data stored in Frankfurt, Germany"
- "NIS2 Article 21 compliance reporting"  
- "GDPR-compliant by design"
- "Founded and operated in Italy"

### Output format

```
## Section: <SectionName>
**Page**: home | sentinel
**Position**: [where in page flow]
**Key design decisions**: [bullet notes]

---

[Full section code]

---

**Dependencies** (components this section uses):
- ComponentName — import path
```
