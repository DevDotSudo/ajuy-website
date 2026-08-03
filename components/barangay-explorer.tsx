"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapIcon, SearchIcon } from "@/components/icons";
import type { Barangay } from "@/data/barangays";

export function BarangayExplorer({ items }: { items: Barangay[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("population-desc");
  const [classification, setClassification] = useState("All");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return [...items]
      .filter((item) => (!search || item.name.toLowerCase().includes(search) || item.psgc.includes(search)))
      .filter((item) => classification === "All" || item.classification === classification)
      .sort((a, b) => {
        if (sort === "name-asc") return a.name.localeCompare(b.name);
        if (sort === "name-desc") return b.name.localeCompare(a.name);
        if (sort === "population-asc") return a.population - b.population;
        return b.population - a.population;
      });
  }, [items, query, sort, classification]);

  return (
    <div>
      <div className="filter-bar">
        <label className="search-field"><SearchIcon /><span className="sr-only">Search barangays</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search barangay name or PSGC" /></label>
        <label><span>Classification</span><select value={classification} onChange={(event) => setClassification(event.target.value)}><option>All</option><option>Urban</option><option>Rural</option></select></label>
        <label><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="population-desc">Population: high to low</option><option value="population-asc">Population: low to high</option><option value="name-asc">Name: A to Z</option><option value="name-desc">Name: Z to A</option></select></label>
        <Link className="button button-map-directory" href="/map"><MapIcon /> Map all barangays</Link>
      </div>
      <div className="result-count">Showing {filtered.length} of {items.length} barangays</div>
      <div className="barangay-grid">
        {filtered.map((item, index) => (
          <article className="barangay-card" key={item.psgc}>
            <div className="barangay-card-top"><span className={`status-badge ${item.classification.toLowerCase()}`}>{item.classification}</span><span className="barangay-rank">#{String(index + 1).padStart(2, "0")}</span></div>
            <h2>{item.name}</h2>
            <div className="barangay-pop"><strong>{item.population.toLocaleString()}</strong><span>people in the 2024 POPCEN</span></div>
            <dl><div><dt>PSGC</dt><dd>{item.psgc}</dd></div><div><dt>Correspondence code</dt><dd>{item.correspondenceCode}</dd></div></dl>
            <div className="barangay-actions"><Link href={`/map?place=${encodeURIComponent(item.name)}`}><MapIcon /> View on Ajuy map</Link><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.name}, Ajuy, Iloilo, Philippines`)}`} target="_blank" rel="noreferrer">Google Maps ↗</a></div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <div className="empty-state"><h2>No barangay found</h2><p>Try another name, code, or filter.</p></div>}
    </div>
  );
}
