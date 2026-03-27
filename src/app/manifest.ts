import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Salam Society",
    short_name: "Salam Society",
    description:
      "Muslim community events, programs, and initiatives in Ottawa, Ontario.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0f",
    theme_color: "#F47B20",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["community", "religion", "education"],
    lang: "en",
  };
}
