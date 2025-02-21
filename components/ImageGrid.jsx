import * as React from "react"
import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

// export interface Artwork {
//   artist: string
//   art: string
// }

export const works = [
  {
    artist: "Ornella Binni",
    art: "/banner.jpeg",
  },
  {
    artist: "Tom Byrom",
    art: "/banner.jpeg",

  },
  {
    artist: "Vladimir Malyavk",
    art: "/banner.jpeg",

  }, {
    artist: "Vladimir Malyavo",
    art: "/banner.jpeg",

  }, {
    artist: "ae",
    art: "/banner.jpeg",

  }, {
    artist: "ol",
    art: "/banner.jpeg",

  },
  {
    artist: "ma",
    art: "/banner.jpeg",

  }, {
    artist: "cl",
    art: "/banner.jpeg",

  }, {
    artist: "dr",
    art: "/banner.jpeg",

  }, {
    artist: "sr",
    art: "/banner.jpeg",

  }, {
    artist: "ro",
    art: "/banner.jpeg",

  },
  {
    artist: "qr",
    art: "/banner.jpeg",

  }, {
    artist: "xa",
    art: "/banner.jpeg",


  }, {
    artist: "xb",
    art: "/banner.jpeg",

  }, {
    artist: "xc",
    art: "/banner.jpeg",

  }, {
    artist: "xd",
    art: "/banner.jpeg",

  }, {
    artist: "xe",
    art: "/banner.jpeg",

  }, {
    artist: "xf",
    art: "/banner.jpeg",

  }, {
    artist: "xg",
    art: "/banner.jpeg",

  }, {
    artist: "xh",
    art: "/banner.jpeg",

  }, {
    artist: "Vladimir Malyvk",
    art: "/banner.jpeg",

  }, {
    artist: "Vladimo",
    art: "/banner.jpeg",

  },
]

export function ImageGrid() {
  return (
    <ScrollArea className="w-[1090px] whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <Image
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="aspect-[3/4] h-36 w-40 object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by{" "}
              <span className="font-semibold text-foreground">
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
