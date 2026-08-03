import type { Metadata } from "next";
import { MapExplorer, type MapPoint } from "@/components/map-explorer";
import { PageHero } from "@/components/page-hero";
import { attractions } from "@/data/attractions";
import { barangays } from "@/data/barangays";

export const metadata: Metadata = { title: "Ajuy Map", description: "Search Ajuy barangays and attractions using an interactive Google Maps explorer." };

const points: MapPoint[] = [
  ...barangays.map((barangay) => ({ id: `barangay-${barangay.psgc}`, name: barangay.name, kind: "Barangay" as const, query: `${barangay.name}, Ajuy, Iloilo, Philippines`, detail: `${barangay.classification} barangay · ${barangay.population.toLocaleString()} people in 2024` })),
  ...attractions.map((attraction) => ({ id: attraction.slug, name: attraction.name, kind: "Attraction" as const, query: attraction.mapQuery, detail: attraction.area, category: attraction.category })),
];

export default function MapPage() {
  return <><PageHero eyebrow="Interactive mapping" title="Locate Ajuy's barangays and attractions" description="Search all 34 barangays and selected visitor places, switch between standard and satellite views, then open the location in Google Maps." /><section className="section map-page-section"><div className="container"><MapExplorer points={points} /></div></section></>;
}
