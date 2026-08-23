import Image from "next/image";
import { Reveal } from "@/components/reveal";

type Tile = {
  src: string;
  /** Flex ratio within its row or column, taken from the reference layout. */
  grow: string;
  sizes: string;
};

const BAND_ONE: Tile[] = [
  {
    src: "/community/photo-1.png",
    grow: "flex-[27]",
    sizes: "(min-width: 640px) 33vw, 60vw",
  },
  {
    src: "/community/photo-2.png",
    grow: "flex-[20]",
    sizes: "(min-width: 640px) 25vw, 44vw",
  },
];

const BAND_TWO: Tile[] = [
  {
    src: "/community/photo-5.png",
    grow: "flex-[30]",
    sizes: "(min-width: 640px) 23vw, 40vw",
  },
  {
    src: "/community/photo-6.png",
    grow: "flex-[22]",
    sizes: "(min-width: 640px) 17vw, 30vw",
  },
  {
    src: "/community/photo-7.png",
    grow: "flex-[21]",
    sizes: "(min-width: 640px) 16vw, 28vw",
  },
];

const SIDE_COLUMN: Tile[] = [
  {
    src: "/community/photo-3.png",
    grow: "flex-[7]",
    sizes: "(min-width: 640px) 20vw, 32vw",
  },
  {
    src: "/community/photo-4.png",
    grow: "flex-[7]",
    sizes: "(min-width: 640px) 20vw, 32vw",
  },
  {
    src: "/community/photo-8.png",
    grow: "flex-[5]",
    sizes: "(min-width: 640px) 20vw, 32vw",
  },
];

const ALT = "A customer with her pouch of Açaí Berry Glow";

function PhotoTile({ tile }: { tile: Tile }) {
  return (
    <div className={`group relative overflow-hidden ${tile.grow}`}>
      <Image
        src={tile.src}
        alt={ALT}
        fill
        sizes={tile.sizes}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
  );
}

export function CommunityGallery() {
  return (
    <section className="bg-sand px-4 pb-14 sm:px-6 lg:px-10 lg:pb-20 2xl:px-16">
      <div className="mx-auto max-w-[1400px] rounded-[1.75rem] bg-brand-300/70 p-4 sm:rounded-[2.5rem] sm:p-6 lg:p-8">
        <Reveal as="div"><h2 className="text-center font-display text-[clamp(1.25rem,2.6vw,2rem)] font-bold text-brand-700">
          Loved by Our BEYOU Community
        </h2></Reveal>

        {/* Mosaic — each band carries its own aspect so the flex ratios have a
            height to divide, and the side column stacks below on small screens. */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-6 lg:gap-4">
          <div className="flex flex-[3] flex-col gap-3 lg:gap-4">
            <div className="flex aspect-[754/427] gap-3 lg:gap-4">
              {BAND_ONE.map((tile) => (
                <PhotoTile key={tile.src} tile={tile} />
              ))}
            </div>
            <div className="flex aspect-[757/298] gap-3 lg:gap-4">
              {BAND_TWO.map((tile) => (
                <PhotoTile key={tile.src} tile={tile} />
              ))}
            </div>
          </div>

          <div className="flex aspect-[757/257] gap-3 sm:aspect-auto sm:flex-1 sm:flex-col lg:gap-4">
            {SIDE_COLUMN.map((tile) => (
              <PhotoTile key={tile.src} tile={tile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
