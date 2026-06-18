import { motion } from "motion/react";
import { BarChart3 } from "lucide-react";
import ScrollReveal, { SplitText } from "./ScrollReveal";

import GrowthRoadmapImg from "../assets/Gowth-Roadmap.jpg";

export default function GrowthRoadmapComponent() {
  const steps = [
    {
      stage: "Stage 01",
      title: "Pre-Launch Entry (Pre-RERA)",
      price: "₹6,500",
      unit: "/ sqft",
      description:
        "The ground-floor entry point. By acquiring allocation at this gate, investors lock in the lowest cost basis before official regulatory registrations publish.",
      badge: "Highest Upside",
    },
    {
      stage: "Stage 02",
      title: "Launch Gate (Post-RERA)",
      price: "₹7,500",
      unit: "/ sqft",
      description:
        "Immediate value realization. RERA approval triggers global sales, forcing price adjustment toward market index standards.",
      badge: "15.3% Appreciation",
    },
    {
      stage: "Stage 03",
      title: "Maturity Gates (MG1 - MG3)",
      price: "₹9,500",
      unit: "/ sqft",
      description:
        "Incremental appreciation gates tied to structural completions (plinth, core-structure, and final handover stages).",
      badge: "46.1% Net Appreciation",
    },
  ];

  return (
    <section id="appreciation-roadmap" className="relative py-24 md:py-32 bg-brand-bg px-6 border-b border-brand-card overflow-hidden">
      <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-brand-accent/2 rounded-full blur-[120px] pointer-events-none" />

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
              Appreciation Path
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              <SplitText text="Growth Roadmap" delay={0.15} />
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
              Strategic pricing trajectory mapping the transition from early-stage capitalization to secondary market liquidation.
            </motion.p>
          </div>

          {/* Layout Grid: Timeline left, Image right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mb-24">
            {/* Left Column: Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative border-l border-brand-accent/20 pl-6 md:pl-10 space-y-12"
            >
              {steps.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Bullet Node */}
                  <div className="absolute left-[-31px] md:left-[-45px] top-1.5 w-4 h-4 rounded-full bg-brand-bg border-[3px] border-brand-accent group-hover:bg-brand-accent transition-colors duration-300" />
                  
                  <div className="bg-brand-card border border-brand-accent/5 p-6 md:p-8 rounded-sm hover:border-brand-accent/25 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-heading font-semibold text-brand-accent tracking-widest uppercase bg-brand-bg/85 px-3 py-1 border border-brand-accent/20 rounded-sm">
                          {step.stage}
                        </span>
                        <h3 className="text-lg md:text-xl font-heading font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <span className="text-xs uppercase tracking-wider text-brand-accent font-heading font-medium bg-brand-accent/10 px-3 py-1 rounded-sm">
                        {step.badge}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <p className="text-brand-muted text-sm leading-relaxed font-body max-w-2xl">
                        {step.description}
                      </p>
                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-3xl md:text-4xl font-heading font-bold text-white block">
                          {step.price}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-brand-muted font-body">
                          {step.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Right Column: Image Display */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative flex"
            >
              <div className="relative w-full h-full min-h-[260px] sm:min-h-[360px] lg:min-h-0 overflow-hidden rounded-md border border-brand-accent/10 shadow-2xl group">
                <img
                  src={GrowthRoadmapImg}
                  alt="Growth Roadmap Visualization"
                  className="absolute inset-0 w-full h-full object-cover rounded-md transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
                {/* Subtle gold overlay highlight on hover */}
                <div className="absolute inset-0 border border-brand-accent/0 group-hover:border-brand-accent/20 transition-all duration-500 rounded-md pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Competitive Advantage Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-card/45 border border-brand-accent/10 p-8 md:p-12 rounded-sm shadow-xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-8">
              <div className="flex items-center space-x-2 mb-4 text-brand-accent">
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-heading font-bold">
                  Market Peer Evaluation
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-4">
                Exceptional Value Compared to Market Peers
              </h3>
              <p className="text-brand-muted text-sm md:text-base leading-relaxed font-body">
                Competitors like **DS MAX** and **Provident Botanica** trade at established price points between **₹7,000 and ₹9,000/sqft**.
                By entering RVPK at **₹6,500/sqft**, you lock in a discount margin from day one, guaranteeing substantial equity appreciation on launch.
              </p>
            </div>
            <div className="md:col-span-4 bg-brand-bg/60 border border-brand-card p-6 rounded-sm text-center">
              <span className="text-xs uppercase tracking-wider text-brand-muted block mb-2">
                RVPK Discount Edge
              </span>
              <div className="text-3xl font-heading font-bold text-brand-accent mb-2">
                ₹500 - ₹2,500
              </div>
              <span className="text-[10px] text-brand-muted uppercase tracking-widest font-body">
                Below Local Benchmarks
              </span>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
