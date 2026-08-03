import Image from "next/image";
import Link from "next/link";
import { MailIcon, MapIcon, PhoneIcon, SparkIcon } from "@/components/icons";
import { municipality } from "@/data/municipality";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-cta-wrap">
        <div className="container footer-cta">
          <div><span>Need municipal information?</span><h2>Find the right page, office, or local contact.</h2></div>
          <div><Link className="button button-yellow" href="/contact">Contact Ajuy</Link><Link className="button button-ghost" href="/map"><MapIcon /> Open map</Link></div>
        </div>
      </div>
      <div className="container footer-main">
        <div className="footer-brand">
          <div className="footer-seal"><Image src="/images/ajuy-seal.png" alt="Seal of the Municipality of Ajuy" width={88} height={88} /></div>
          <div><strong>Municipality of Ajuy</strong><span>Banwa sang Ajuy</span><p>A modern public-information portal for Ajuy's residents, barangays, visitors, students, and communities.</p></div>
        </div>
        <div className="footer-column"><h2>Municipality</h2><div className="footer-links"><Link href="/about">Ajuy Profile</Link><Link href="/barangays">34 Barangays</Link><Link href="/government">Local Government</Link><Link href="/population">Population</Link></div></div>
        <div className="footer-column"><h2>Discover</h2><div className="footer-links"><Link href="/attractions">Attractions</Link><Link href="/culture">Culture & Festivals</Link><Link href="/gallery">Gallery</Link><Link href="/map">Interactive Map</Link></div></div>
        <div className="footer-column"><h2>Public help</h2><div className="footer-contact"><a href={`mailto:${municipality.email}`}><MailIcon /><span>{municipality.email}</span></a><a href={`tel:${municipality.phones[0].replace(/\s/g, "")}`}><PhoneIcon /><span>{municipality.phones[0]}</span></a><Link href="/emergency"><PhoneIcon /><span>Emergency contacts</span></Link><Link href="/contact"><SparkIcon /><span>Send an inquiry</span></Link></div></div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Municipality of Ajuy information portal. Verify changing government details before official use.</p>
        <p className="developer-credit">Designed and developed by <strong>Eric Dave S. Cala-or</strong></p>
      </div>
    </footer>
  );
}
