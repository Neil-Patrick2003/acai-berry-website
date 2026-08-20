# Hero imagery — placeholders

`model.png` and `berries.png` are **temporary** crops lifted from the design
reference screenshot at screenshot resolution. They exist so the hero renders
complete; they are not production assets.

Replace both with the real art before launch:

| File          | Used by                        | What it should become                                                                 |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| `model.png`   | `components/hero.tsx`          | The model + pouch shot, cut out on **transparent** background, ≥1600px wide.           |
| `berries.png` | `components/hero.tsx` (decor)  | The açaí berry cluster, transparent background, ≥900px wide.                            |

Once both have transparent backgrounds, drop the two `[mask-image:…]` classes in
`components/hero.tsx` — the fades only exist to hide the baked-in rectangular
background of these placeholder crops.
