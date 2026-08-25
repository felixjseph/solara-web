import type { Metadata } from "next";
import Link from "next/link";
import { AssessmentForm } from "@/components/assessment-form";
import {
  ArrowIcon,
  BoltIcon,
  BuildingIcon,
  CheckIcon,
  FacebookIcon,
  HomeIcon,
  LeafIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  ToolsIcon,
} from "@/components/icons";
import { SolarScene } from "@/components/solar-scene";
import { brandNames, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Reliable Solar Solutions in Cebu",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

type Service = {
  icon: typeof ToolsIcon;
  title: string;
  copy: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    icon: ToolsIcon,
    title: "Design, installation & handover",
    copy: "Site-aware system design, installation, testing, commissioning, and a clear customer handover.",
    featured: true,
  },
  {
    icon: BoltIcon,
    title: "Grid-tied solar",
    copy: "Solar designed to work with the utility grid and the property's daytime energy use.",
  },
  {
    icon: ShieldIcon,
    title: "Hybrid & battery backup",
    copy: "Solar and compatible storage planned around essential loads and practical backup goals.",
  },
  {
    icon: LeafIcon,
    title: "Off-grid solar",
    copy: "Independent systems for sites where grid connection is unavailable or not the preferred option.",
  },
  {
    icon: BuildingIcon,
    title: "Commercial solar",
    copy: "Scalable design aligned with operating patterns, site constraints, and business priorities.",
  },
  {
    icon: ToolsIcon,
    title: "Maintenance & repairs",
    copy: "Cleaning, troubleshooting, repairs, consultation, and after-sales support for solar systems.",
  },
  {
    icon: CheckIcon,
    title: "Net-metering assistance",
    copy: "Guidance through an application process that remains subject to current utility and regulatory requirements.",
  },
];

const systemTypes = [
  {
    name: "Grid-tied",
    bestFor: "Properties connected to the grid that want to use solar during normal grid operation.",
    backup: "Generally shuts down during a grid outage for safety.",
    flow: ["Sun", "Solar panels", "Property", "Grid"],
  },
  {
    name: "Hybrid",
    bestFor: "Properties that want grid connection plus appropriately planned battery backup.",
    backup: "Can support selected loads when designed with compatible storage and controls.",
    flow: ["Sun", "Solar panels", "Battery", "Property + grid"],
  },
  {
    name: "Off-grid",
    bestFor: "Sites designed to operate independently from the utility grid.",
    backup: "Relies on carefully sized solar, storage, and often another backup source.",
    flow: ["Sun", "Solar panels", "Battery", "Independent loads"],
  },
] as const;

const faqs = [
  {
    question: "How do I know which solar system is right for my property?",
    answer: "The right system depends on your energy consumption, usage pattern, roof or site conditions, budget, and backup needs. Solara reviews these factors before recommending a size and configuration.",
  },
  {
    question: "What is the difference between grid-tied, hybrid, and off-grid solar?",
    answer: "Grid-tied solar works with the utility grid and normally has no outage backup. Hybrid systems combine solar, grid connection, and compatible battery storage. Off-grid systems are designed to operate independently and require careful storage and load planning.",
  },
  {
    question: "Will solar keep my property powered during an outage?",
    answer: "Not automatically. Standard grid-tied systems generally shut down during outages for safety. Backup requires a properly designed hybrid or off-grid configuration, a compatible inverter, batteries or other storage, and appropriate load planning. Backup does not mean every appliance can run indefinitely.",
  },
  {
    question: "How much does a solar system cost?",
    answer: "Cost depends on system size, configuration, site conditions, equipment, storage, and project scope. Solara confirms pricing and inclusions in a tailored proposal after assessment; the website does not publish unverified ranges.",
  },
  {
    question: "How long does installation take?",
    answer: "Timing varies with system complexity, site readiness, equipment availability, weather, and any external approvals. The project schedule is confirmed with the approved scope and proposal.",
  },
  {
    question: "Does Solara assist with net metering?",
    answer: "Yes. Solara can assist with the application process. Eligibility, requirements, review, approval, timing, and credit treatment remain subject to the current utility and regulatory rules.",
  },
  {
    question: "What warranties are included?",
    answer: "Warranty terms vary by selected panel, inverter, battery, other equipment, and the approved project scope. Solara confirms the applicable equipment and workmanship terms in the tailored proposal before work proceeds.",
  },
  {
    question: "Does Solara serve my area in Cebu?",
    answer: "Solara's launch service area covers entire Cebu. Share your city or municipality in the assessment form so the team can review the site requirements.",
  },
  {
    question: "What happens after I request an assessment?",
    answer: "Solara reviews your property type, location, bill range, goals, and preferred contact method. The team will contact you to clarify the request and arrange the appropriate next step without promising a fixed response time.",
  },
] as const;

export default function HomePage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/brand/solara-sunburst.png`,
    email: siteConfig.email,
    telephone: siteConfig.phones[0].display,
    areaServed: { "@type": "AdministrativeArea", name: "Cebu, Philippines" },
    sameAs: [siteConfig.facebook],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phones[0].display,
        contactType: "customer service",
        areaServed: "PH",
        availableLanguage: "English",
      },
    ],
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replaceAll("<", "\\u003c") }} />

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span />Solar energy solutions across Cebu</span>
            <h1>Reliable solar for brighter, more independent homes and businesses.</h1>
            <p className="hero-lead">Solara designs and installs solar solutions for Cebu, backed by honest advice and dependable support from assessment onward.</p>
            <div className="hero-actions">
              <Link className="button" href="#contact">Get a Free Solar Assessment <ArrowIcon /></Link>
              <Link className="text-link" href="#solutions">Explore Solar Solutions <ArrowIcon /></Link>
            </div>
            <div className="hero-direct">
              <a href={siteConfig.phones[0].href}><PhoneIcon />Call Solara</a>
              <a href={siteConfig.facebook} target="_blank" rel="noreferrer"><FacebookIcon />Message on Facebook</a>
            </div>
            <p className="trust-microcopy">Residential <span>•</span> Commercial <span>•</span> Installation <span>•</span> After-sales support</p>
          </div>
          <SolarScene />
        </div>
      </section>

      <section className="audience-band" aria-labelledby="audience-heading">
        <div className="container">
          <div className="section-heading compact-heading">
            <span className="eyebrow">Start with your property</span>
            <h2 id="audience-heading">A clearer path to solar, built around you.</h2>
          </div>
          <div className="audience-grid">
            <article className="audience-card audience-home">
              <div className="audience-icon"><HomeIcon /></div>
              <div>
                <span className="card-kicker">Residential</span>
                <h3>Solar for Homes</h3>
                <p>Explore appropriate sizing, daily energy use, and backup options with guidance that makes the tradeoffs easier to understand.</p>
                <Link className="text-link" href="/?property=Residential#contact">Assess my home <ArrowIcon /></Link>
              </div>
            </article>
            <article className="audience-card audience-business">
              <div className="audience-icon"><BuildingIcon /></div>
              <div>
                <span className="card-kicker">Commercial</span>
                <h3>Solar for Business</h3>
                <p>Plan around operating needs, cost management, scalable design, maintenance, and dependable ongoing support.</p>
                <Link className="text-link" href="/?property=Commercial#contact">Assess my business <ArrowIcon /></Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="solutions" className="section services-section" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">Complete solar support</span>
              <h2 id="services-heading">From first questions to a working system.</h2>
            </div>
            <p>Solara brings design, installation, commissioning, and ongoing care into one clear process—while keeping each recommendation grounded in your property and energy needs.</p>
          </div>
          <div className="services-grid">
            {services.map(({ icon: Icon, title, copy, featured }) => (
              <article key={title} className={featured ? "service-item service-featured" : "service-item"}>
                <Icon />
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="system-types" className="section system-section" aria-labelledby="systems-heading">
        <div className="container">
          <div className="section-heading centered-heading">
            <span className="eyebrow">Understand your options</span>
            <h2 id="systems-heading">Three ways solar can fit into an energy system.</h2>
            <p>These are educational starting points. A site and usage assessment is still needed before choosing a configuration.</p>
          </div>
          <div className="systems-grid">
            {systemTypes.map((system, index) => (
              <article className="system-card" key={system.name}>
                <div className="system-number">0{index + 1}</div>
                <h3>{system.name}</h3>
                <div className="energy-flow" aria-label={`${system.name} energy flow: ${system.flow.join(" to ")}`}>
                  {system.flow.map((step, stepIndex) => (
                    <span key={step}>{step}{stepIndex < system.flow.length - 1 && <ArrowIcon />}</span>
                  ))}
                </div>
                <dl>
                  <div><dt>May suit</dt><dd>{system.bestFor}</dd></div>
                  <div><dt>During an outage</dt><dd>{system.backup}</dd></div>
                </dl>
                <p className="assessment-required"><CheckIcon />Assessment required for final design</p>
              </article>
            ))}
          </div>
          <aside className="safety-note">
            <ShieldIcon />
            <div>
              <h3>Backup needs careful load planning.</h3>
              <p>A properly designed hybrid or off-grid system may support selected loads during an outage. Battery capacity, compatible equipment, available solar energy, and how much power is being used all matter; backup does not mean every appliance can operate indefinitely.</p>
            </div>
          </aside>
        </div>
      </section>

      <section id="packages" className="section packages-section" aria-labelledby="packages-heading">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">Non-priced starting points</span>
              <h2 id="packages-heading">A useful starting size. A proposal built for your site.</h2>
            </div>
            <p>These configurations help begin the conversation. They are not a recommendation, price list, or performance estimate.</p>
          </div>
          <div className="packages-grid">
            {["3 kW", "5 kW", "10 kW+"].map((size) => (
              <article className="package-card" key={size}>
                <span className="package-size">{size}</span>
                <h3>{size} Solar System</h3>
                <p className="package-lead">Final sizing follows an energy-usage and site assessment.</p>
                <ul>
                  <li><CheckIcon />Configured for grid-tied, hybrid, or other applicable requirements.</li>
                  <li><CheckIcon />Equipment and inclusions follow the tailored design.</li>
                  <li><CheckIcon />Output, warranty, and pricing are confirmed in the proposal.</li>
                </ul>
                <Link className="button button-outline" href="#contact">Request a Tailored Quote <ArrowIcon /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section process-section" aria-labelledby="process-heading">
        <div className="container process-layout">
          <div className="process-intro">
            <span className="eyebrow eyebrow-light">How it works</span>
            <h2 id="process-heading">A clear path from questions to commissioning.</h2>
            <p>Every step makes the next decision more informed. Project timing is confirmed only after the site, scope, equipment, and external requirements are understood.</p>
            <Link className="button button-light" href="#contact">Start with an assessment <ArrowIcon /></Link>
          </div>
          <ol className="process-list">
            <li><span>01</span><div><h3>Tell us about the property.</h3><p>Share the location, property type, and what you want the system to help with.</p></div></li>
            <li><span>02</span><div><h3>Review energy needs.</h3><p>Discuss the electricity-bill range, usage pattern, backup priorities, and goals.</p></div></li>
            <li><span>03</span><div><h3>Assess the site.</h3><p>Review roof or site conditions and recommend an appropriate system.</p></div></li>
            <li><span>04</span><div><h3>Receive a tailored proposal.</h3><p>See the design, scope, equipment selection, confirmed terms, and quotation.</p></div></li>
            <li><span>05</span><div><h3>Install and support.</h3><p>Install, test, commission, hand over the system, and continue with after-sales support.</p></div></li>
          </ol>
        </div>
      </section>

      <section id="why-solara" className="section values-section" aria-labelledby="values-heading">
        <div className="container values-layout">
          <div className="values-story">
            <span className="eyebrow">Why Solara</span>
            <h2 id="values-heading">Advice that earns trust before work begins.</h2>
            <p className="values-lead">Solar should feel like a well-understood decision—not a leap. Solara explains what is known, what still depends on assessment, and what belongs in the final proposal.</p>
            <blockquote>When a proposed system is not appropriate yet, honest guidance means saying so and explaining the better next step.</blockquote>
          </div>
          <div className="values-list">
            {[
              ["Reliability", "Dependable workmanship and support throughout the project."],
              ["Transparency", "Honest recommendations and clear, site-specific proposals."],
              ["Empowerment", "Greater control over informed energy decisions."],
              ["Innovation", "Current, appropriate solar technology selected for the design."],
              ["Sustainability", "A long-term commitment to cleaner energy choices."],
            ].map(([value, meaning], index) => (
              <article key={value}><span>0{index + 1}</span><div><h3>{value}</h3><p>{meaning}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section brands-section" aria-labelledby="brands-heading">
        <div className="container">
          <div className="section-heading centered-heading">
            <span className="eyebrow">Equipment selection</span>
            <h2 id="brands-heading">Product brands available for project selection.</h2>
            <p>Equipment availability and final component selection depend on the approved system design and quotation.</p>
          </div>
          <ul className="brand-grid" aria-label="Available product brands">
            {brandNames.map((brand) => <li key={brand}>{brand}</li>)}
          </ul>
        </div>
      </section>

      <section id="faq" className="section faq-section" aria-labelledby="faq-heading">
        <div className="container faq-layout">
          <div className="faq-intro">
            <span className="eyebrow">Questions, answered plainly</span>
            <h2 id="faq-heading">What to know before requesting an assessment.</h2>
            <p>Still deciding where to begin? Solara can help you understand the options without assuming a particular system is right for you.</p>
            <a className="text-link" href={`mailto:${siteConfig.email}`}>Ask a different question <MailIcon /></a>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary><span>{faq.question}</span><i aria-hidden="true" /></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="assessment-section" aria-label="Free solar assessment form">
        <div className="container"><AssessmentForm /></div>
      </section>

      <section className="direct-cta" aria-labelledby="direct-cta-heading">
        <div className="container direct-cta-inner">
          <div><span className="eyebrow">Ready when you are</span><h2 id="direct-cta-heading">Start with an honest solar conversation.</h2></div>
          <div className="direct-cta-links">
            <a href={siteConfig.phones[0].href}><PhoneIcon />Call {siteConfig.phones[0].display}</a>
            <a href={siteConfig.facebook} target="_blank" rel="noreferrer"><FacebookIcon />Message Solara</a>
          </div>
        </div>
      </section>
    </main>
  );
}
