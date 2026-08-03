"use client";

import { useEffect, useMemo, useState } from "react";
import { MapIcon, SearchIcon } from "@/components/icons";

export type MapPoint = {
  id: string;
  name: string;
  kind: "Barangay" | "Attraction";
  query: string;
  detail: string;
  category?: string;
};

type MapStyle = "roadmap" | "satellite";

function embedUrl(query: string, mapStyle: MapStyle) {
  const type = mapStyle === "satellite" ? "k" : "m";
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed&t=${type}&z=14`;
}

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function MapExplorer({ points }: { points: MapPoint[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Barangay" | "Attraction">("All");
  const [selectedId, setSelectedId] = useState(points[0]?.id || "");
  const [mapStyle, setMapStyle] = useState<MapStyle>("roadmap");

  useEffect(() => {
    const place = new URLSearchParams(window.location.search).get("place");
    if (!place) return;
    const found = points.find((point) => point.name.toLowerCase() === place.toLowerCase() || point.id === place);
    if (found) setSelectedId(found.id);
  }, [points]);

  const filtered = useMemo(() => {
    const clean = search.trim().toLowerCase();
    return points.filter((point) =>
      (filter === "All" || point.kind === filter) &&
      (!clean || point.name.toLowerCase().includes(clean) || point.detail.toLowerCase().includes(clean) || point.category?.toLowerCase().includes(clean)),
    );
  }, [filter, points, search]);

  const selected = points.find((point) => point.id === selectedId) || filtered[0] || points[0];

  return (
    <div className="map-explorer">
      <aside className="map-sidebar">
        <div className="map-search-head">
          <p className="eyebrow">Search locations</p>
          <h2>Find a place in Ajuy</h2>
          <label className="map-search-field">
            <SearchIcon />
            <span className="sr-only">Search map locations</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Barangay or attraction" />
          </label>
          <div className="map-tabs" role="group" aria-label="Map location type">
            {(["All", "Barangay", "Attraction"] as const).map((item) => (
              <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
                {item === "All" ? "All places" : `${item}s`}
              </button>
            ))}
          </div>
        </div>
        <div className="map-result-summary">{filtered.length} location{filtered.length === 1 ? "" : "s"} found</div>
        <div className="map-location-list">
          {filtered.map((point) => (
            <button key={point.id} className={selected?.id === point.id ? "active" : ""} onClick={() => setSelectedId(point.id)}>
              <span className="map-list-icon"><MapIcon /></span>
              <span>
                <strong>{point.name}</strong>
                <small>{point.kind}{point.category ? ` · ${point.category}` : ""}</small>
                <em>{point.detail}</em>
              </span>
            </button>
          ))}
          {filtered.length === 0 && <div className="map-empty"><strong>No location found</strong><span>Try another barangay or attraction name.</span></div>}
        </div>
      </aside>
      <div className="map-stage">
        {selected && (
          <>
            <div className="map-stage-toolbar">
              <div className="map-stage-copy">
                <span>{selected.kind}</span>
                <strong>{selected.name}</strong>
                <small>{selected.detail}</small>
              </div>
              <div className="map-toolbar-actions">
                <div className="map-style-switch" role="group" aria-label="Map display style">
                  <button className={mapStyle === "roadmap" ? "active" : ""} onClick={() => setMapStyle("roadmap")} aria-pressed={mapStyle === "roadmap"}>Map</button>
                  <button className={mapStyle === "satellite" ? "active" : ""} onClick={() => setMapStyle("satellite")} aria-pressed={mapStyle === "satellite"}>Satellite</button>
                </div>
                <a className="button button-small" href={mapsUrl(selected.query)} target="_blank" rel="noreferrer"><MapIcon /> Open in Google Maps</a>
              </div>
            </div>
            <div className="map-frame">
              <iframe key={`${selected.id}-${mapStyle}`} title={`Google Map showing ${selected.name} in ${mapStyle} view`} src={embedUrl(selected.query, mapStyle)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <div className="map-disclaimer"><strong>Map note</strong><span>Switch between the standard map and satellite imagery. Confirm island access, boat routes, road conditions, and exact entrances locally.</span></div>
          </>
        )}
      </div>
    </div>
  );
}
