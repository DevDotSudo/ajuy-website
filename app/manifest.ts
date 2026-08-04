import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Municipality of Ajuy",
    short_name: "Ajuy",
    description: "Municipal information portal for Ajuy, Iloilo",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFDF5",
    theme_color: "#2F6B3F",
    icons: [
      {
        src: "/images/ajuy-seal.png",
        sizes: "1000x1000",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/ajuy-seal.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/ajuy-seal.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
