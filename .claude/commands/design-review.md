# /design-review — Review a component or section for design consistency

Audit any component or section against the Ground Control design system.

## Usage
/design-review [paste component code or describe what to review]

## What to check

Run through every item and report pass/fail with specific line references.

### Hard rules (any failure = must fix before proceeding)

| Rule | What to check |
|------|---------------|
| No rounded corners | Search for `rounded-` classes other than `rounded-none` |
| Token colors only | Search for hardcoded hex values (#) or rgb() in class attributes |
| Correct fonts | Display headings use `font-display`, data/labels use `font-mono` |
| Square indicators | Status dots are `w-1.5 h-1.5 inline-block` not `rounded-full` |
| Button inversion | Hover state inverts filled→outline or outline→filled |
| Uppercase labels | All UI labels, button text, section markers are uppercase |
| Border visible | Cards and containers use `border border-border-base` not box-shadow |

### Soft rules (flag but don't block)

| Rule | What to check |
|------|---------------|
| Copy voice | Flag any: "revolutionize", "seamlessly", "powerful", "cutting-edge" |
| Animation | Flag any JS animation or libraries (should be CSS only) |
| Images | Flag any stock photo references or rounded image containers |
| Spacing | Section padding should be `py-24` minimum on desktop |
| Scan line | Only one scan line element allowed, only in hero |

### Output format

```
## Design Review: <ComponentName>

### ✅ Passing
- [rule]: [confirmation]

### ❌ Must fix
- [rule]: Line X — [specific issue] → [how to fix]

### ⚠️  Soft flags
- [rule]: [issue] → [suggestion]

### Overall verdict
PASS / NEEDS WORK / BLOCKED
```
