"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MapIcon, SearchIcon } from "@/components/icons";
import type { Attraction } from "@/data/attractions";

export function AttractionExplorer({ items }: { items: Attraction[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];
  const filtered = useMemo(() => {
    const clean = query.trim().toLowerCase();
    return items.filter((item) => (category === "All" || item.category === category) && (!clean || item.name.toLowerCase().includes(clean) || item.description.toLowerCase().includes(clean) || item.highlights.some((value) => value.toLowerCase().includes(clean))));
  }, [category, items, query]);

  return (
    <div className="attraction-explorer">
      <div className="attraction-filter-bar">
        <label className="search-field"><SearchIcon /><span className="sr-only">Search attractions</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search islands, heritage, farms…" /></label>
        <div className="category-pills">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
      </div>
      <div className="result-count">Showing {filtered.length} of {items.length} places and experiences</div>
      <div className="attraction-modern-grid">
        {filtered.map((item, index) => <article className="attraction-modern-card" key={item.slug}>
          <div className="attraction-modern-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" /><span>{item.category}</span><em>{String(index + 1).padStart(2, "0")}</em></div>
          <div className="attraction-modern-copy"><small>{item.area}</small><h2>{item.name}</h2><p>{item.description}</p><div className="highlight-chips">{item.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</div><div className="attraction-card-actions"><Link href={`/map?place=${encodeURIComponent(item.name)}`}><MapIcon /> Locate on map</Link><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}`} target="_blank" rel="noreferrer">Google Maps ↗</a></div><div className="travel-note"><strong>Plan safely</strong><span>{item.notice}</span></div></div>
        </article>)}
      </div>
      {filtered.length === 0 && <div className="empty-state"><h2>No attraction found</h2><p>Try a different category or search word.</p></div>}
    </div>
  );
}
