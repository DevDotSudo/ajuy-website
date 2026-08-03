import type { Metadata } from "next";
import Link from "next/link";
import { AttractionExplorer } from "@/components/attraction-explorer";
import { MapIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { attractions } from "@/data/attractions";

export const metadata: Metadata = { title: "Attractions", description: "Explore Ajuy islands, coastal places, heritage landmarks, farms, resorts, and visitor experiences." };

export default function AttractionsPage() {
  return <><PageHero eyebrow="Explore Ajuy" title="Islands, heritage, coastlines, and local landmarks" description="Browse a larger visitor guide based on available tourism references and mapped local places. Always verify current access, schedules, weather, transport, and fees."><Link className="button button-yellow" href="/map"><MapIcon /> Open attraction map</Link></PageHero><section className="section"><div className="container"><AttractionExplorer items={attractions} /></div></section><section className="section section-soft"><div className="container responsible-grid"><div><p className="eyebrow">Visitor guide</p><h2>Explore with care and local respect</h2><p>Some entries are islands, active workplaces, private properties, or historically referenced destinations. A listing does not guarantee current public access.</p></div><ul><li>Check weather and sea conditions before island travel.</li><li>Use verified boat operators and approved passenger capacity.</li><li>Confirm private business hours, fees, and reservations.</li><li>Protect heritage ruins and never climb unsafe structures.</li><li>Ask before photographing residents or working areas.</li><li>Bring waste home and support local communities.</li></ul></div></section><section className="section"><div className="container source-note"><h2>Research note</h2><p>The expanded guide includes places found in historical provincial tourism listings, archived Ajuy tourism references, current map listings, travel directories, and local landmark documentation. Details that can change are intentionally marked for confirmation.</p></div></section></>;
}
