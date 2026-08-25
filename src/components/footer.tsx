import Link from "next/link";
import { Logo } from "./logo";
import { MailIcon, PhoneIcon, FacebookIcon } from "./icons";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo inverted />
          <p>Dependable solar guidance, installation, and support for homes and businesses across Cebu.</p>
          <span className="service-pill">Serving entire Cebu</span>
        </div>
        <div>
          <h2>Contact Solara</h2>
          <ul className="footer-links">
            {siteConfig.phones.map((phone) => (
              <li key={phone.href}><PhoneIcon /><a href={phone.href}>{phone.display}</a></li>
            ))}
            <li><MailIcon /><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
            <li><FacebookIcon /><a href={siteConfig.facebook} target="_blank" rel="noreferrer">Message on Facebook</a></li>
          </ul>
        </div>
        <div>
          <h2>Information</h2>
          <ul className="footer-simple-links">
            <li><Link href="/#solutions">Solar solutions</Link></li>
            <li><Link href="/#system-types">System types</Link></li>
            <li><Link href="/#faq">Frequently asked questions</Link></li>
            <li><Link href="/privacy">Privacy notice</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Solara. All rights reserved.</p>
        <p>Warm local service. Clear solar decisions.</p>
      </div>
    </footer>
  );
}
