import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, BuildingIcon, ChartIcon, MapIcon, PeopleIcon, PhoneIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { HomeVideoBanner } from "@/components/home-video-banner";
import { attractions } from "@/data/attractions";
import { communityUpdates } from "@/data/community-updates";
import { municipality } from "@/data/municipality";
import { populationHistory } from "@/data/population";

const quickLinks = [
  { href: "/barangays", title: "Find your barangay", text: "Search all 34 communities", icon: PeopleIcon },
  { href: "/government", title: "Government services", text: "Officials, offices, and guidance", icon: BuildingIcon },
  { href: "/population", title: "Population records", text: "Census data from 1903–2024", icon: ChartIcon },
  { href: "/emergency", title: "Emergency contacts", text: "Numbers and safety guidance", icon: PhoneIcon },
];

const miniPopulationMax = Math.max(...populationHistory.map((item) => item.population));
const miniPopulationGrowth = ((populationHistory.at(-1)!.population - populationHistory[0].population) / populationHistory[0].population) * 100;

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
        <div className="container home-hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span /> Official municipal information portal</div>
            <h1>Discover Ajuy.<br /><em>Connect with your community.</em></h1>
            <p>One modern website for barangay information, local government, public services, population records, culture, attractions, maps, contacts, and emergency guidance.</p>
            <div className="hero-actions"><Link className="button button-yellow" href="/about">Explore Ajuy <ArrowIcon /></Link><Link className="button button-ghost" href="/map"><MapIcon /> Open interactive map</Link></div>
            <div className="hero-trust"><div><strong>54,100</strong><span>2024 population</span></div><div><strong>34</strong><span>barangays</span></div><div><strong>1st</strong><span>income class</span></div></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo"><Image src="/images/nasidman.jpg" alt="Coastal landscape at Nasidman Island, Ajuy" fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div>
            <div className="hero-floating-card hero-location-card"><MapIcon /><div><span>Northern Iloilo</span><strong>Ajuy, Philippines</strong></div></div>
            <div className="seal-card"><Image src="/images/ajuy-seal.png" alt="Seal of the Municipality of Ajuy" width={110} height={110} /><div><span>Municipal profile</span><strong>Banwa sang Ajuy</strong><small>PSGC {municipality.psgc}</small></div></div>
          </div>
        </div>
        <div className="hero-scroll-cue"><span>Scroll to explore</span><i /></div>
      </section>

      <section className="quick-section"><div className="container quick-grid">{quickLinks.map((item) => { const Icon = item.icon; return <Link href={item.href} className="quick-card" key={item.href}><span className="quick-icon"><Icon /></span><span><strong>{item.title}</strong><small>{item.text}</small></span><ArrowIcon className="quick-arrow" /></Link>; })}</div></section>

      <HomeVideoBanner />

      <section className="section intro-modern"><div className="container split-intro"><div><SectionHeading eyebrow="About the municipality" title="A coastal municipality built by 34 communities" description="Ajuy brings together mainland, coastal, and island barangays in northern Iloilo. Its identity is shaped by farming, fishing, education, faith, trade, public service, and strong community ties." /><p className="large-copy">This portal makes important local information easier to read, search, and use on any device.</p><div className="button-row"><Link className="button" href="/about">Read Ajuy's profile</Link><Link className="text-link" href="/barangays">Browse every barangay <ArrowIcon /></Link></div></div><div className="stat-panel"><div><span>2024 POPCEN</span><strong>54,100</strong><small>residents</small></div><div><span>Municipal communities</span><strong>34</strong><small>barangays</small></div><div><span>Current leadership</span><strong>{municipality.mayor}</strong><small>municipal mayor</small></div><div><span>Local language</span><strong>Hiligaynon</strong><small>widely spoken</small></div></div></div></section>

      <section className="section section-soft"><div className="container"><SectionHeading eyebrow="Public information" title="Start with what you need today" description="Clear paths for residents, families, students, visitors, businesses, and barangay communities." align="center" /><div className="service-journey-grid"><Link href="/government" className="service-journey-card"><span>01</span><BuildingIcon /><h3>Find a municipal service</h3><p>Identify the office or service category related to documents, permits, health, social welfare, agriculture, and other concerns.</p><em>Government guide <ArrowIcon /></em></Link><Link href="/barangays" className="service-journey-card"><span>02</span><PeopleIcon /><h3>Search barangay information</h3><p>View official names, 2024 population counts, classifications, and PSGC codes for all 34 barangays.</p><em>Barangay directory <ArrowIcon /></em></Link><Link href="/map" className="service-journey-card"><span>03</span><MapIcon /><h3>Locate places on Google Maps</h3><p>Search barangays, islands, landmarks, farms, resorts, and public locations through one interactive map explorer.</p><em>Open map <ArrowIcon /></em></Link><Link href="/population" className="service-journey-card"><span>04</span><ChartIcon /><h3>Study population change</h3><p>Review 16 census and POPCEN observations from 1903 to 2024 with tables, charts, and CSV download.</p><em>Population page <ArrowIcon /></em></Link></div></div></section>

      <section className="section"><div className="container population-feature"><div className="population-feature-copy"><p className="eyebrow">Population at a glance</p><h2>From 7,854 people in 1903 to 54,100 in 2024.</h2><p>Ajuy's recorded census population grew by 46,246 people across the available historical series. The website separates census observations from annual estimates so the numbers are easier to understand correctly.</p><div className="population-metrics"><div><strong>6.89×</strong><span>the 1903 count</span></div><div><strong>+638</strong><span>from 2020 to 2024</span></div><div><strong>16</strong><span>population observations</span></div></div><Link className="button" href="/population">Explore population data <ArrowIcon /></Link></div><div className="population-mini-chart" aria-label="Ajuy population growth from 1903 to 2024"><div className="mini-chart-head"><div><span>Recorded population</span><strong>{populationHistory.at(-1)!.population.toLocaleString()}</strong><small>2024 POPCEN</small></div><b>+{miniPopulationGrowth.toFixed(1)}%</b></div><div className="mini-chart-plot"><div className="mini-chart-grid" aria-hidden="true"><span /><span /><span /></div><div className="mini-chart-bars">{populationHistory.map((item) => <i key={item.year} style={{ height: `${Math.max(8, (item.population / miniPopulationMax) * 100)}%` }} title={`${item.year}: ${item.population.toLocaleString()} people`}><span /></i>)}</div></div><div className="mini-chart-labels"><span>1903</span><span>1970</span><span>2000</span><span>2024</span></div><p>Each bar is a census or POPCEN observation, not an annual estimate.</p></div></div></section>

      <section className="section map-home-section"><div className="container map-home-grid"><div className="map-home-frame"><iframe title="Google Map of Ajuy, Iloilo" src="https://www.google.com/maps?q=Ajuy%2C%20Iloilo%2C%20Philippines&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div><div className="map-home-copy"><p className="eyebrow light">Interactive mapping</p><h2>Search every barangay and selected attraction.</h2><p>The new map explorer lets users choose a location, view it on an embedded Google Map, and open directions or a full map in a new tab.</p><ul><li>All 34 barangays</li><li>Islands and coastal destinations</li><li>Heritage and civic landmarks</li><li>Farms, resorts, and visitor points</li></ul><Link className="button button-yellow" href="/map"><MapIcon /> Explore the Ajuy map</Link></div></div></section>

      <section className="section"><div className="container"><div className="section-title-row"><SectionHeading eyebrow="Explore responsibly" title="Places that show Ajuy's character" description="Island landscapes, lighthouse heritage, coastal work, farms, and civic spaces." /><Link className="text-link" href="/attractions">View all {attractions.length} entries <ArrowIcon /></Link></div><div className="attraction-showcase">{attractions.slice(0, 5).map((item, index) => <Link href="/attractions" className={`showcase-card showcase-card-${index + 1}`} key={item.slug}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 40vw" /><span><small>{item.category}</small><strong>{item.name}</strong><em>{item.area}</em></span></Link>)}</div></div></section>

      <section className="section section-soft"><div className="container"><div className="section-title-row"><SectionHeading eyebrow="Community updates" title="Recent Ajuy-related provincial news" description="Selected official updates from the Iloilo Provincial Government." /><a className="text-link" href="https://iloilo.gov.ph/en/taxonomy/term/854" target="_blank" rel="noreferrer">More official updates ↗</a></div><div className="updates-grid">{communityUpdates.map((item) => <a className="update-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}><span>{item.category}</span><small>{item.date}</small><h3>{item.title}</h3><p>{item.text}</p><em>Read official source ↗</em></a>)}</div></div></section>

      <section className="section"><div className="container home-contact-banner"><div><p className="eyebrow light">Municipal contact</p><h2>Need an official answer or office assistance?</h2><p>Use the municipal contact page for published phone numbers, email, office location, and inquiry guidance.</p></div><div><Link className="button button-yellow" href="/contact">Contact the municipality</Link><Link className="button button-ghost" href="/emergency">Emergency contacts</Link></div></div></section>
    </>
  );
}
