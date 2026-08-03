import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AjuyProfileExplorer } from "@/components/ajuy-profile-explorer";
import { ArrowIcon, MapIcon } from "@/components/icons";
import { municipality } from "@/data/municipality";

export const metadata: Metadata = {
  title: "Ajuy Profile",
  description: "An interactive profile of Ajuy covering history, facts, economy, geography, population, communities, and maps.",
};

export default function AboutPage() {
  return (
    <>
      <section className="profile-hero">
        <div className="profile-hero-orb profile-hero-orb-one" />
        <div className="profile-hero-orb profile-hero-orb-two" />
        <div className="container profile-hero-grid">
          <div className="profile-hero-copy">
            <div className="hero-kicker"><span /> Interactive municipal profile</div>
            <h1>Get to know <em>Ajuy.</em></h1>
            <p>Explore the municipality's history, identity, economy, geography, communities, population, and location through one modern visual page.</p>
            <div className="hero-actions">
              <Link className="button button-yellow" href="#overview">Start exploring <ArrowIcon /></Link>
              <Link className="button button-ghost" href="/map"><MapIcon /> Open full map</Link>
            </div>
            <div className="profile-hero-stats">
              <div><strong>{municipality.population2024.toLocaleString()}</strong><span>2024 population</span></div>
              <div><strong>{municipality.barangayCount}</strong><span>barangays</span></div>
              <div><strong>{municipality.district}</strong><span>Iloilo district</span></div>
              <div><strong>{municipality.language}</strong><span>widely spoken</span></div>
            </div>
          </div>
          <div className="profile-hero-media">
            <div className="profile-hero-photo profile-hero-photo-main"><Image src="/images/nasidman.jpg" alt="Coastal landscape of Nasidman Island in Ajuy" fill priority sizes="(max-width: 900px) 100vw, 44vw" /></div>
            <div className="profile-hero-photo profile-hero-photo-small"><Image src="/images/rizal-monument.png" alt="Rizal Monument in Ajuy town plaza" fill priority sizes="(max-width: 900px) 45vw, 18vw" /></div>
            <div className="profile-hero-seal"><Image src="/images/ajuy-seal.png" alt="Seal of the Municipality of Ajuy" width={120} height={120} /><span>Municipality of Ajuy</span></div>
            <div className="profile-hero-location"><MapIcon /><div><span>Northern Iloilo</span><strong>Western Visayas</strong></div></div>
          </div>
        </div>
      </section>
      <AjuyProfileExplorer />
    </>
  );
}
