import type { Metadata } from "next";
import Link from "next/link";
import { BarangayExplorer } from "@/components/barangay-explorer";
import { MapIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { barangays } from "@/data/barangays";

export const metadata: Metadata = { title: "Barangays", description: "Search all 34 Ajuy barangays with 2024 population, classification, PSGC codes, and Google Maps links." };

export default function BarangaysPage() {
  const urban = barangays.filter((item) => item.classification === "Urban").length;
  return <><PageHero eyebrow="Barangay directory" title="Explore all 34 communities of Ajuy" description="Search official barangay names, 2024 POPCEN counts, urban or rural classification, PSGC codes, and location links."><div className="mini-stats"><div><strong>{barangays.length}</strong><span>Total barangays</span></div><div><strong>{urban}</strong><span>Urban</span></div><div><strong>{barangays.length - urban}</strong><span>Rural</span></div><Link href="/map"><MapIcon /> Open map</Link></div></PageHero><section className="section"><div className="container"><BarangayExplorer items={barangays} /><div className="source-note compact"><strong>Data source and map note</strong><p>Barangay names, classifications, codes, and population figures use the current PSA PSGC listing and 2024 POPCEN counts. Google Maps pins are external and may not always represent official barangay boundaries.</p></div></div></section></>;
}
