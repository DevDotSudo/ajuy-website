"use client";

import Image from "next/image";
import { useState } from "react";
import { CloseIcon } from "@/components/icons";
import { attractions } from "@/data/attractions";

export function GalleryGrid() {
  const [active, setActive] = useState<(typeof attractions)[number] | null>(null);
  return (
    <>
      <div className="gallery-grid">
        {attractions.map((item, index) => (
          <button className={`gallery-item gallery-item-${index + 1}`} key={item.slug} onClick={() => setActive(item)}>
            <Image src={item.image} alt={item.alt} fill sizes="(max-width: 720px) 100vw, 50vw" />
            <span><small>{item.category}</small><strong>{item.name}</strong></span>
          </button>
        ))}
      </div>
      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.name} onClick={() => setActive(null)}>
          <div className="lightbox-card" onClick={(event) => event.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close image"><CloseIcon /></button>
            <div className="lightbox-image"><Image src={active.image} alt={active.alt} fill sizes="90vw" /></div>
            <div className="lightbox-copy"><p className="eyebrow">{active.category}</p><h2>{active.name}</h2><p>{active.description}</p></div>
          </div>
        </div>
      )}
    </>
  );
}
