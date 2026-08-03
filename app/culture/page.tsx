import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { cultureHighlights } from "@/data/culture";

export const metadata: Metadata = { title: "Culture and Festivals", description: "Ajuy's coastal identity, livelihoods, language, food heritage, and community celebrations." };

export default function CulturePage() {
  return (
    <><PageHero eyebrow="Culture and Festivals" title="Stories carried by land, sea, and community" description="Ajuy's local identity grows from Hiligaynon language, coastal livelihoods, farming, faith, food, and barangay celebrations." /><section className="section"><div className="container culture-intro"><div className="culture-photo"><Image src="/images/port-culasi.jpg" alt="Boats and coastal life at the Port of Culasi in Ajuy" fill sizes="(max-width: 900px) 100vw, 48vw" /></div><div><p className="eyebrow">Living heritage</p><h2>Culture is part of everyday life</h2><p>Ajuy's culture is not limited to a single event. It can be seen in work by the coast, meals shared at home, farming communities, local faith traditions, schools, markets, and gatherings across 34 barangays.</p><p>Festival names, exact annual dates, programs, and schedules should be confirmed with the municipal tourism or cultural office before publication.</p></div></div></section><section className="section section-soft"><div className="container"><div className="culture-grid">{cultureHighlights.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.title}</h2><p>{item.text}</p></article>)}</div></div></section><section className="section"><div className="container quote-card"><blockquote>“Community knowledge is strongest when residents, elders, culture workers, and local offices review the story together.”</blockquote><p>Content guidance for future municipal updates</p></div></section></>
  );
}
