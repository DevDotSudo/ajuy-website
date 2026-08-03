import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Gallery", description: "A visual gallery of selected locations and landmarks connected to Ajuy." };

export default function GalleryPage() {
  return <><PageHero eyebrow="Gallery" title="A closer look at Ajuy" description="Selected views of island scenery, coastal life, heritage, and public landmarks." /><section className="section"><div className="container"><GalleryGrid /><div className="source-note compact"><strong>Photo credits</strong><p>Images in this starter website come from Wikimedia Commons and retain their original licenses. See docs/IMAGE_CREDITS.md in the project.</p></div></div></section></>;
}
