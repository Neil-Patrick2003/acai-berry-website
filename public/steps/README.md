# Ritual imagery — placeholders

Every file here is a **temporary** crop lifted from the design reference
screenshot. They exist so the section renders complete; none of them is a
production asset, and all are low resolution.

| File            | Used by                        | Replace with                                                      |
| --------------- | ------------------------------ | ----------------------------------------------------------------- |
| `step-1..3.png` | `components/ritual-steps.tsx`  | Square crops of each step photo, ≥600×600, transparent corners.    |
| `composite.png` | `components/ritual-steps.tsx`  | The berry / pouch / glass composite, ≥1400px wide.                 |

`composite.png` carries a baked-in background, which is why the `<Image>` in
`ritual-steps.tsx` has a `[mask-image:…]` left fade. Drop that class once the
replacement has a transparent or full-bleed background.
