import { useState } from "react";
import { motion } from "motion/react";
import { Coins } from "lucide-react";
import ScrollReveal, { SplitText, staggerContainer, staggerItem } from "./ScrollReveal";

import MonthlyPayoutImg from "../assets/investment-structure/Monthly-payout.jpg";
import SecurityImg from "../assets/investment-structure/captial-safety.jpg";
import PreLaunchImg from "../assets/investment-structure/pre-launch1.jpg";

export default function InvestorValueComponent() {
  const [investment, setInvestment] = useState(10000000); // Default 1 Crore

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹ ${(val / 100000).toFixed(1)} Lakhs`;
  };

  const calculateMonthly = (val: number) => {
    // 18% P.A. paid monthly
    return (val * 0.18) / 12;
  };

  const calculateAnnual = (val: number) => {
    return val * 0.18;
  };

  return (
    <section id="value-proposition" className="relative py-24 md:py-32 bg-brand-bg px-6 border-b border-brand-card">
      <div className="absolute right-0 top-1/3 w-[450px] h-[450px] bg-brand-accent/3 rounded-full blur-[140px] pointer-events-none" />

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
              Investment Structure
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              <SplitText text="Investor Value Proposition" delay={0.15} />
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
              Sophisticated structures designed to maximize cash flow, secure capital principal, and capture early-stage asset appreciation.
            </motion.p>
          </div>

          {/* Pillars Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
          >
            {/* Card 1: 18% Interest */}
            <motion.div
              variants={staggerItem}
              className="group bg-brand-card border border-brand-accent/5 p-8 md:p-10 rounded-sm relative flex flex-col justify-between hover:border-brand-accent/20 transition-all duration-300 hover:translate-y-[-8px] cursor-pointer"
            >
              <div>
                <div className="w-full h-48 mb-6 overflow-hidden rounded-md border border-brand-accent/10">
                  <img
                    src={MonthlyPayoutImg}
                    alt="18% P.A. Yield"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">
                  18% P.A. Yield
                </h3>
                <p className="text-xs uppercase tracking-widest text-brand-accent mb-4 font-heading">
                  Monthly Payouts
                </p>
                <p className="text-brand-muted text-sm md:text-base leading-relaxed font-body mb-6">
                  Prorated and distributed monthly, securing steady cash flow for high-net-worth individuals and corporate partners.
                </p>
              </div>
              <div className="pt-6 border-t border-brand-bg">
                <span className="text-2xl font-heading font-bold text-white">
                  1.5 Lakhs <span className="text-brand-accent text-sm">/ Month</span>
                </span>
                <p className="text-[11px] text-brand-muted uppercase tracking-wider mt-1 font-body">
                  On an illustrative 1 Cr investment
                </p>
              </div>
            </motion.div>

            {/* Card 2: 100% Safe */}
            <motion.div
              variants={staggerItem}
              className="group bg-brand-card border border-brand-accent/5 p-8 md:p-10 rounded-sm relative flex flex-col justify-between hover:border-brand-accent/20 transition-all duration-300 hover:translate-y-[-8px] cursor-pointer"
            >
              <div>
                <div className="w-full h-48 mb-6 overflow-hidden rounded-md border border-brand-accent/10">
                  <img
                    src={SecurityImg}
                    alt="100% Capital Safety"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">
                  100% Capital Safety
                </h3>
                <p className="text-xs uppercase tracking-widest text-brand-accent mb-4 font-heading">
                  Asset Backed Security
                </p>
                <p className="text-brand-muted text-sm md:text-base leading-relaxed font-body mb-6">
                  Full principal liquidation upon project completion, or flexible roll-over privileges into next-phase premium developments.
                </p>
              </div>
              <div className="pt-6 border-t border-brand-bg">
                <span className="text-2xl font-heading font-bold text-white">
                  100% Secure
                </span>
                <p className="text-[11px] text-brand-muted uppercase tracking-wider mt-1 font-body">
                  Guaranteed by corporate asset backing
                </p>
              </div>
            </motion.div>

            {/* Card 3: Pre-Launch pricing */}
            <motion.div
              variants={staggerItem}
              className="group bg-brand-card border border-brand-accent/5 p-8 md:p-10 rounded-sm relative flex flex-col justify-between hover:border-brand-accent/20 transition-all duration-300 hover:translate-y-[-8px] cursor-pointer"
            >
              <div>
                <div className="w-full h-48 mb-6 overflow-hidden rounded-md border border-brand-accent/10">
                  <img
                    src={PreLaunchImg}
                    alt="Pre-Launch Pricing"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">
                  Pre-Launch Pricing
                </h3>
                <p className="text-xs uppercase tracking-widest text-brand-accent mb-4 font-heading">
                  Asset Allocation
                </p>
                <p className="text-brand-muted text-sm md:text-base leading-relaxed font-body mb-6">
                  Premium units allocated at ground-floor price points prior to RERA certification, with full flexibility to exit or trade.
                </p>
              </div>
              <div className="pt-6 border-t border-brand-bg">
                <span className="text-2xl font-heading font-bold text-white">
                  ₹6,500 <span className="text-brand-accent text-sm">/ sqft</span>
                </span>
                <p className="text-[11px] text-brand-muted uppercase tracking-wider mt-1 font-body">
                  Compared to post-RERA market average
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Investment Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-card border border-brand-accent/10 p-8 md:p-12 rounded-sm shadow-2xl max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-3 mb-8">
              <Coins className="w-6 h-6 text-brand-accent" />
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white">
                Yield Calculator
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Input Slider */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-heading uppercase tracking-wider text-brand-muted">
                    Investment Capital
                  </span>
                  <span className="text-xl font-heading font-bold text-brand-accent">
                    {formatCurrency(investment)}
                  </span>
                </div>
                <input
                  type="range"
                  min={2500000} // 25 Lakhs
                  max={50000000} // 5 Crores
                  step={250000}
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full h-1 bg-brand-bg rounded-lg appearance-none cursor-pointer accent-brand-accent animate-pulse"
                />
                <div className="flex justify-between text-[11px] text-brand-muted mt-2 font-body">
                  <span>Min: 25 Lakhs</span>
                  <span>Max: 5 Crores</span>
                </div>
              </div>

              {/* Calculations Output */}
              <div className="bg-brand-bg/60 border border-brand-card p-6 md:p-8 rounded-sm grid grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted block mb-1">
                    Monthly Payout
                  </span>
                  <span className="text-2xl md:text-3xl font-heading font-bold text-brand-accent">
                    ₹ {calculateMonthly(investment).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted block mb-1">
                    Annual Yield
                  </span>
                  <span className="text-2xl md:text-3xl font-heading font-bold text-white">
                    ₹ {calculateAnnual(investment).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="col-span-2 border-t border-brand-card pt-4 flex items-center justify-between text-xs text-brand-muted font-body">
                  <span>Interest Rate: 18% Per Annum</span>
                  <span className="text-brand-accent font-semibold">Prorated & Paid Monthly</span>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
