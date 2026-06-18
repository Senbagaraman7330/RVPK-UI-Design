import { motion } from "motion/react";
import { Award, FileText } from "lucide-react";
import ScrollReveal, { SplitText, staggerContainer, staggerItem } from "./ScrollReveal";
import LegacyImg from "../assets/legacy.jpg";

export default function TrustAndLegacyComponent() {
  const projects = [
    { name: "Sai Nikethan", type: "Residential Complex", status: "Delivered" },
    { name: "Satyam Resorts", type: "Luxury Leisure", status: "Delivered" },
    { name: "Prime Mansion", type: "Premium Apartments", status: "Delivered" },
  ];

  return (
    <section id="legacy" className="relative py-24 md:py-32 bg-brand-bg px-6 border-b border-brand-card">
      <div className="absolute right-0 bottom-0 w-[350px] h-[350px] bg-brand-accent/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-xs uppercase tracking-[0.3em] text-brand-accent font-heading font-semibold block mb-3"
            >
              Execution Integrity
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              <SplitText text="Legacy & Trust" delay={0.15} />
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
              className="w-24 h-[2px] bg-brand-accent mx-auto mb-8 origin-center"
            />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
              className="text-brand-muted text-base md:text-lg leading-relaxed font-body"
            >
              A proven track record of structural excellence, absolute transparency, and investor stability.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            {/* Track Record & Portfolio */}
            <div>
              <div className="flex items-center space-x-3 mb-6 text-brand-accent">
                <Award className="w-6 h-6" />
                <h3 className="text-lg font-heading font-bold uppercase tracking-wider">
                  Proven Track Record
                </h3>
              </div>

              <p className="text-brand-muted text-sm md:text-base font-body leading-relaxed mb-8">
                With 26 years of collective operational experience, our execution partners have designed, built, and delivered landmark projects across Bangalore's urban corridors.
              </p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {projects.map((proj, idx) => (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    className="bg-brand-card/40 border border-brand-accent/5 hover:border-brand-accent/10 p-5 rounded-sm flex items-center justify-between transition-all duration-300 cursor-pointer"
                  >
                    <div>
                      <h4 className="font-heading font-bold text-white text-sm tracking-wide">
                        {proj.name}
                      </h4>
                      <span className="text-xs text-brand-muted font-body">{proj.type}</span>
                    </div>
                    <span className="text-[10px] uppercase font-heading tracking-widest text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-sm">
                      {proj.status}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Absolute Transparency & Architect Progress */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-brand-card border border-brand-accent/5 p-8 md:p-10 rounded-sm relative shadow-xl hover:border-brand-accent/20 transition-all duration-300"
            >
              <div className="absolute top-6 right-6 opacity-[0.03] pointer-events-none">
                <FileText className="w-24 h-24 text-brand-accent" />
              </div>

              <div className="w-full h-56 mb-6 overflow-hidden rounded-md border border-brand-accent/10 relative">
                <img
                  src={LegacyImg}
                  alt="Absolute Transparency"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              <div className="flex items-center space-x-3 mb-6 text-brand-accent">
                <FileText className="w-6 h-6" />
                <h3 className="text-lg font-heading font-bold uppercase tracking-wider">
                  Absolute Transparency
                </h3>
              </div>

              <h4 className="text-xl font-heading font-bold text-white mb-4">
                Certified Architect Appraisals
              </h4>

              <p className="text-brand-muted text-sm md:text-base font-body leading-relaxed mb-6">
                We eliminate execution anxiety by providing every capital partner with regular construction milestones updates, verified architect appraisals, and escrow account reports.
              </p>

              <ul className="space-y-3 text-xs md:text-sm font-body text-brand-muted">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full shrink-0" />
                  <span>Monthly Status Appraisals & Account Ledgers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full shrink-0" />
                  <span>RERA Compliance Postings & Auditor Review Papers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full shrink-0" />
                  <span>Certified Quantity Surveyor Completion Certifications</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Stakeholder Voices Quote */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-brand-card/30 border border-brand-card p-8 md:p-12 rounded-sm text-center max-w-4xl mx-auto shadow-2xl"
          >
            <div className="absolute top-4 left-6 text-brand-accent/10 pointer-events-none">
              <Quote className="w-16 h-16" />
            </div>

            <p className="text-white text-lg md:text-xl font-light font-body italic leading-relaxed mb-6">
              &ldquo;The level of professionalism and corporate precision RVPK brings to real estate is refreshing. Their commitment to transparency and monthly payouts has made my investment journey completely stress-free.&rdquo;
            </p>
            
            <span className="text-xs uppercase tracking-[0.2em] font-heading font-bold text-brand-accent block">
              — Satisfied Investor, RVPK Capital Partner
            </span>
          </motion.div> */}
        </ScrollReveal>
      </div>
    </section>
  );
}
