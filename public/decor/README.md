# Decorative art — placeholders

| File               | Used by                              | Replace with                                          |
| ------------------ | ------------------------------------ | ----------------------------------------------------- |
| `palm-leaves.png`  | `components/product-collection.tsx`  | Tropical leaf art on a transparent background.        |
| `acai-corner.png`  | `components/product-collection.tsx`  | Açaí berry cluster on a transparent background.       |

Both are crops from the design reference and carry a baked-in background, which
is why each `<Image>` has `[mask-image:…]` edge fades. Remove those classes once
the replacements have real transparency.
