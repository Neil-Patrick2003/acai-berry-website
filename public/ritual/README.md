# Ritual imagery — placeholder

`portrait.png` is a **temporary** crop lifted from the design reference
screenshot (270×346 source, upscaled 2×). It exists so the section renders
complete; it is not a production asset.

Replace it with the real photograph — same rounded-rectangle crop, transparent
corners, ≥1080px wide — keeping the file name so no code changes are needed.
The `<Image>` in `components/wellness-ritual.tsx` declares `width={540}
height={692}`; update those to the new intrinsic size.
