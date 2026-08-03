"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowIcon, BuildingIcon, ChartIcon, MapIcon, PeopleIcon, SparkIcon } from "@/components/icons";
import { PopulationChart } from "@/components/population-chart";
import { barangays } from "@/data/barangays";
import { municipality } from "@/data/municipality";
import { populationHistory } from "@/data/population";

const sections = [
  ["overview", "Overview"],
  ["history", "History"],
  ["economy", "Economy"],
  ["geography", "Geography"],
  ["population", "Population"],
  ["profile-map", "Map"],
] as const;

const historyMilestones = [
  {
    year: "1890s",
    title: "Maritime heritage",
    text: "Historical references place the construction of Faro de Islas Calabazas during the Spanish period, connecting Ajuy to navigation along northern Iloilo waters.",
  },
  {
    year: "1903",
    title: "First population record in this series",
    text: "The earliest available municipal census observation used on this website recorded 7,854 residents.",
  },
  {
    year: "2000",
    title: "Population passed 45,000",
    text: "The census recorded 45,192 people, reflecting the long-term growth of Ajuy's mainland, coastal, and island communities.",
  },
  {
    year: "2024",
    title: "Current official profile",
    text: "The 2024 POPCEN lists 54,100 residents across 34 barangays, with Poblacion classified as urban and the other barangays classified as rural.",
  },
];

const economyPillars = [
  {
    title: "Fishing and coastal work",
    text: "Coastal and island communities are closely connected to fishing, boats, port activity, seafood, and everyday movement by sea.",
    icon: MapIcon,
  },
  {
    title: "Agriculture",
    text: "Farming and related rural livelihoods support households across Ajuy's inland and mainland barangays.",
    icon: SparkIcon,
  },
  {
    title: "Local trade and services",
    text: "The town center, barangay stores, transport, education, public offices, and small enterprises help connect the municipality's communities.",
    icon: BuildingIcon,
  },
  {
    title: "Visitor economy",
    text: "Islands, coastal landscapes, heritage sites, resorts, farms, and civic landmarks create opportunities for responsible local tourism.",
    icon: PeopleIcon,
  },
];

function mapEmbed(style: "roadmap" | "satellite") {
  const type = style === "satellite" ? "k" : "m";
  return `https://www.google.com/maps?q=${encodeURIComponent("Ajuy, Iloilo, Philippines")}&output=embed&t=${type}&z=11`;
}

export function AjuyProfileExplorer() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mapStyle, setMapStyle] = useState<"roadmap" | "satellite">("roadmap");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -58% 0px", threshold: [0.08, 0.2, 0.45] },
    );

    sections.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const topBarangays = useMemo(
    () => [...barangays].sort((a, b) => b.population - a.population).slice(0, 5),
    [],
  );

  const firstPopulation = populationHistory[0];
  const latestPopulation = populationHistory[populationHistory.length - 1];
  const totalGrowth = latestPopulation.population - firstPopulation.population;
  const maxBarangayPopulation = topBarangays[0].population;

  function goToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className="profile-section-nav-wrap">
        <div className="container profile-section-nav" aria-label="Ajuy profile sections">
          {sections.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={activeSection === id ? "active" : ""}
              onClick={() => goToSection(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <section className="section profile-overview-section" id="overview">
        <div className="container profile-overview-grid">
          <div className="profile-overview-copy">
            <p className="eyebrow">Municipal overview</p>
            <h2>One municipality shaped by the coast, islands, farms, and barangays.</h2>
            <p className="large-copy">
              Ajuy is a first-income-class coastal municipality in northern Iloilo. Its 34 communities include the town center, mainland barangays, coastal settlements, and island communities.
            </p>
            <p>
              This profile combines the municipality's official identifiers, population records, community identity, livelihood themes, geography, and map information in one visual page.
            </p>
            <div className="profile-identity-row">
              <div><span>Local name</span><strong>{municipality.localName}</strong></div>
              <div><span>Province</span><strong>{municipality.province}</strong></div>
              <div><span>Region</span><strong>{municipality.region}</strong></div>
              <div><span>Postal code</span><strong>{municipality.zipCode}</strong></div>
            </div>
          </div>

          <div className="profile-overview-visual">
            <div className="profile-main-photo">
              <Image src="/images/port-culasi.jpg" alt="Coastal activity at the Port of Culasi in Ajuy" fill sizes="(max-width: 900px) 100vw, 48vw" />
            </div>
            <div className="profile-seal-badge">
              <Image src="/images/ajuy-seal.png" alt="Seal of the Municipality of Ajuy" width={92} height={92} />
              <div><span>Municipality profile</span><strong>Ajuy, Iloilo</strong><small>PSGC {municipality.psgc}</small></div>
            </div>
            <div className="profile-photo-note"><MapIcon /><span>Coastal municipality in northern Iloilo</span></div>
          </div>
        </div>

        <div className="container profile-fact-strip">
          <article><PeopleIcon /><span>2024 population</span><strong>{municipality.population2024.toLocaleString()}</strong><small>Official POPCEN count</small></article>
          <article><MapIcon /><span>Communities</span><strong>{municipality.barangayCount}</strong><small>Barangays</small></article>
          <article><BuildingIcon /><span>Classification</span><strong>1st class</strong><small>Income classification</small></article>
          <article><ChartIcon /><span>Recorded growth</span><strong>+{totalGrowth.toLocaleString()}</strong><small>People since 1903</small></article>
        </div>
      </section>

      <section className="section profile-history-section" id="history">
        <div className="container profile-section-heading-grid">
          <div>
            <p className="eyebrow light">History and identity</p>
            <h2>Ajuy's story is connected to maritime heritage and community growth.</h2>
          </div>
          <p>
            This timeline uses verifiable heritage and population milestones. A complete official municipal history should still be reviewed and approved by local historians and the municipality before publication.
          </p>
        </div>
        <div className="container profile-history-grid">
          <div className="profile-timeline">
            {historyMilestones.map((item) => (
              <article key={item.year}>
                <div className="profile-timeline-year">{item.year}</div>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
          <div className="profile-history-image">
            <Image src="/images/lighthouse.png" alt="Historic Faro de Islas Calabazas lighthouse remains" fill sizes="(max-width: 900px) 100vw, 42vw" />
            <div className="profile-image-caption"><span>Heritage landmark</span><strong>Faro de Islas Calabazas</strong><p>A maritime landmark associated with Calabasa Island and northern Iloilo navigation.</p></div>
          </div>
        </div>
      </section>

      <section className="section profile-economy-section" id="economy">
        <div className="container">
          <div className="profile-section-title-row">
            <div><p className="eyebrow">Community economy</p><h2>Livelihoods connected to land, sea, trade, and local services.</h2></div>
            <p>These themes describe Ajuy's broad community economy and should not be treated as a complete statistical economic inventory.</p>
          </div>
          <div className="profile-economy-grid">
            {economyPillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <span className="profile-card-number">0{index + 1}</span>
                  <div className="profile-economy-icon"><Icon /></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
          <div className="profile-economy-banner">
            <div><span>Local character</span><h3>Hiligaynon language, barangay life, food traditions, fiestas, and shared public spaces strengthen Ajuy's identity.</h3></div>
            <Link className="button button-yellow" href="/culture">Explore culture <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <section className="section profile-geography-section" id="geography">
        <div className="container profile-geography-grid">
          <div className="profile-geography-copy">
            <p className="eyebrow light">Geography</p>
            <h2>A municipality extending from inland communities to coastal and island barangays.</h2>
            <p>Ajuy is part of Iloilo's Fifth District in Western Visayas. Its geography shapes transport, livelihoods, community access, tourism, and the daily relationship between land and sea.</p>
            <div className="profile-geography-points">
              <div><strong>Northern Iloilo</strong><span>Municipal location</span></div>
              <div><strong>5th District</strong><span>Provincial district</span></div>
              <div><strong>Coastal and island</strong><span>Geographic character</span></div>
              <div><strong>34 barangays</strong><span>Local communities</span></div>
            </div>
            <Link className="button button-yellow" href="/map"><MapIcon /> Search the full Ajuy map</Link>
          </div>
          <div className="profile-geography-collage">
            <div className="profile-collage-large"><Image src="/images/nasidman.jpg" alt="Coastal view of Nasidman Island" fill sizes="(max-width: 900px) 100vw, 38vw" /></div>
            <div className="profile-collage-small"><Image src="/images/rizal-monument.png" alt="Rizal Monument at Ajuy town plaza" fill sizes="(max-width: 900px) 50vw, 18vw" /></div>
            <div className="profile-collage-label"><MapIcon /><span>Town center, mainland, coast, and islands</span></div>
          </div>
        </div>
      </section>

      <section className="section profile-population-section" id="population">
        <div className="container">
          <div className="profile-section-title-row profile-population-heading">
            <div><p className="eyebrow">Population</p><h2>More than a century of recorded population change.</h2></div>
            <p>The chart connects census and POPCEN observations to show long-term direction. It does not represent yearly estimates between census dates.</p>
          </div>
          <div className="profile-population-layout">
            <div className="profile-chart-card"><PopulationChart data={populationHistory} /></div>
            <aside className="profile-population-summary">
              <span>1903–2024</span>
              <strong>{latestPopulation.population.toLocaleString()}</strong>
              <small>latest recorded population</small>
              <div><b>+{totalGrowth.toLocaleString()}</b><em>increase from 1903</em></div>
              <div><b>{populationHistory.length}</b><em>census and POPCEN observations</em></div>
              <div><b>{(latestPopulation.population / firstPopulation.population).toFixed(2)}×</b><em>the 1903 population</em></div>
              <Link className="button" href="/population">Open full population page <ArrowIcon /></Link>
            </aside>
          </div>
          <div className="profile-barangay-ranking">
            <div><p className="eyebrow">Largest barangays</p><h3>Top five by 2024 population</h3></div>
            <div className="profile-ranking-list">
              {topBarangays.map((barangay, index) => (
                <div key={barangay.psgc}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{barangay.name}</strong>
                  <i><b style={{ width: `${(barangay.population / maxBarangayPopulation) * 100}%` }} /></i>
                  <em>{barangay.population.toLocaleString()}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section profile-map-section" id="profile-map">
        <div className="container profile-map-layout">
          <div className="profile-map-copy">
            <p className="eyebrow light">Visual map</p>
            <h2>See where Ajuy sits in northern Iloilo.</h2>
            <p>Switch between the standard map and satellite imagery. Use the dedicated map explorer to search all barangays and selected attractions.</p>
            <div className="profile-map-switch" role="group" aria-label="Profile map style">
              <button type="button" className={mapStyle === "roadmap" ? "active" : ""} onClick={() => setMapStyle("roadmap")}>Map</button>
              <button type="button" className={mapStyle === "satellite" ? "active" : ""} onClick={() => setMapStyle("satellite")}>Satellite</button>
            </div>
            <div className="button-row">
              <Link className="button button-yellow" href="/map"><MapIcon /> Search locations</Link>
              <a className="button button-ghost" href="https://www.google.com/maps/search/?api=1&query=Ajuy%2C%20Iloilo%2C%20Philippines" target="_blank" rel="noreferrer">Open Google Maps ↗</a>
            </div>
          </div>
          <div className="profile-map-frame">
            <iframe key={mapStyle} title={`Map of Ajuy in ${mapStyle} view`} src={mapEmbed(mapStyle)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            <div className="profile-map-overlay"><span>Municipality of Ajuy</span><strong>Iloilo, Western Visayas</strong></div>
          </div>
        </div>
      </section>

      <section className="section profile-source-section">
        <div className="container profile-source-card">
          <div><p className="eyebrow">Data and accuracy</p><h2>A profile designed to stay clear about its sources.</h2></div>
          <p>Population, barangay classifications, and PSGC records use Philippine Statistics Authority data. Published officials and municipal contact details use the Iloilo Provincial Government directory. Historical and cultural descriptions should be locally reviewed before official publication.</p>
        </div>
      </section>
    </>
  );
}
