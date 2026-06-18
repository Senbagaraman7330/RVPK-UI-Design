import logoDarkMode from "../assets/Logo/logoDarkMode-C_Xs4EAc-removebg-preview copy.png";
import ScrollReveal from "./ScrollReveal";

export default function FooterComponent() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-brand-bg border-t border-brand-card py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
            {/* Brand Left Column */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <img
                    src={logoDarkMode}
                    alt="RVPK Real Estates"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <p className="text-brand-muted text-xs md:text-sm font-body max-w-sm leading-relaxed">
                  RVPK Real Estates is a premier capital deployment and construction partnership delivering grade-A residential and commercial assets within Bangalore's high-growth corridors.
                </p>
              </div>
            </div>

            {/* Quick links */}
            <div className="md:col-span-3">
              <h4 className="text-xs uppercase tracking-widest text-brand-accent font-heading font-bold mb-4">
                Investments
              </h4>
              <ul className="space-y-3 text-xs md:text-sm font-body text-brand-muted">
                {["Vision", "Leadership", "Value Proposition", "Appreciation Roadmap", "Legacy"].map((item) => {
                  const sectionId = item.toLowerCase().replace(/ /g, "-");
                  return (
                    <li key={item}>
                      <button
                        onClick={() => scrollToSection(sectionId)}
                        className="group relative hover:text-brand-accent transition-colors duration-200 cursor-pointer pb-1"
                      >
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-300 group-hover:w-full" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contacts info */}
            <div className="md:col-span-4">
              <h4 className="text-xs uppercase tracking-widest text-brand-accent font-heading font-bold mb-4">
                Headquarters
              </h4>
              <address className="not-italic text-xs md:text-sm font-body text-brand-muted space-y-2 leading-relaxed">
                <p>RVPK Real Estates Private Limited</p>
                <p>Silicon Valley Corridor, Outer Ring Road</p>
                <p>Bangalore, Karnataka 560103</p>
                <p className="pt-2">
                  Email:{" "}
                  <a href="mailto:invest@rvpk.in" className="text-white hover:text-brand-accent">
                    invest@rvpk.in
                  </a>
                </p>
              </address>
            </div>
          </div>

          {/* Disclaimer / RERA note */}
          <div className="border-t border-brand-card pt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-[10px] text-brand-muted font-body leading-relaxed">
            <div className="max-w-4xl">
              <p className="mb-2">
                **Disclaimer**: All returns, yields (18% P.A.), and valuations mapped within this document represent private placement terms and capital structure modeling. Real estate investments are subject to market conditions, local execution dynamics, and regulatory approvals. Pre-launch allocations are subject to RERA registration gates.
              </p>
              <p>
                &copy; {currentYear} RVPK Real Estates. All Rights Reserved. Designed for institutional trust and long-term appreciation.
              </p>
            </div>
            <div className="shrink-0 text-left lg:text-right">
              <span className="inline-block border border-brand-accent/20 px-3 py-1 rounded-sm text-brand-accent font-heading font-semibold uppercase tracking-widest text-[9px]">
                Corporate Grade Execution
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
