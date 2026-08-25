# Hero imagery — placeholders

`model.png` and `berries.png` are **temporary** crops lifted from the design
reference screenshot at screenshot resolution. They exist so the hero renders
complete; they are not production assets.

Replace both with the real art before launch:

| File          | Used by                        | What it should become                                                                 |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| `model.png`   | `components/hero.tsx`          | The model + pouch shot, cut out on **transparent** background, ≥1600px wide.           |
| `berries.png` | `components/hero.tsx` (decor)  | The açaí berry cluster, transparent background, ≥900px wide.                            |

Both `[mask-image:…]` classes in `components/hero.tsx` only exist to hide the
baked-in rectangular backgrounds of these crops: the berries are faded in from
the top, and the model is clipped to the lavender medallion with its rim
feathered. Once the cut-outs have real transparency, the model can break out of
the medallion the way the design reference shows, and both fades can go.
