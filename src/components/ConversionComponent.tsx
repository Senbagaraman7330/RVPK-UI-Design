import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import ScrollReveal, { SplitText } from "./ScrollReveal";

export default function ConversionComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tier: "1Cr+",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-brand-bg px-6 border-b border-brand-card overflow-hidden">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] bg-brand-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Text content & details */}
            <div className="lg:col-span-5">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-xs uppercase tracking-[0.3em] text-brand-accent font-heading font-semibold block mb-3"
              >
                Inquire Now
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                <SplitText text="Partner With" delay={0.15} /> <br />
                <span className="text-brand-accent">
                  <SplitText text="RVPK Real Estates" delay={0.3} />
                </span>
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="text-brand-muted text-sm md:text-base font-body leading-relaxed mb-10 max-w-md"
              >
                Secure ground-floor pre-launch pricing, establish monthly yield payouts, and build a partnership of corporate integrity with our executive team.
              </motion.p>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Electronic Mail", val: "invest@rvpk.in", href: "mailto:invest@rvpk.in" },
                  { icon: Phone, label: "Executive Line", val: "+91 80 4455 6677", href: "tel:+918044556677" },
                  { icon: MapPin, label: "Registered Office", val: "Silicon Valley Corridor, Bangalore, India" }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 + idx * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-10 h-10 bg-brand-card border border-brand-accent/10 flex items-center justify-center rounded-sm transition-transform duration-300 hover:scale-105">
                        <Icon className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-brand-muted block font-heading">
                          {item.label}
                        </span>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-body text-white hover:text-brand-accent transition-colors duration-200">
                            {item.val}
                          </a>
                        ) : (
                          <span className="text-sm font-body text-white">
                            {item.val}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="lg:col-span-7 bg-brand-card border border-brand-accent/5 p-8 md:p-10 rounded-sm shadow-2xl relative"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center rounded-full mx-auto mb-6">
                    <Send className="w-6 h-6 text-brand-accent" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">
                    Inquiry Received
                  </h3>
                  <p className="text-brand-muted text-sm font-body max-w-sm mx-auto">
                    An RVPK capital relations partner will contact you shortly to share prospectus materials and schedule a private conference.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-heading font-bold text-white mb-4 border-b border-brand-bg pb-3">
                    Request Private Placement Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-brand-muted font-heading block mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-brand-bg/80 border border-brand-accent/10 focus:border-brand-accent px-4 py-3 text-sm text-white font-body rounded-sm focus:outline-none transition-colors duration-200 gold-glow-input"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-brand-muted font-heading block mb-2">
                        Corporate Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. john@corporate.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-brand-bg/80 border border-brand-accent/10 focus:border-brand-accent px-4 py-3 text-sm text-white font-body rounded-sm focus:outline-none transition-colors duration-200 gold-glow-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-brand-muted font-heading block mb-2">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-brand-bg/80 border border-brand-accent/10 focus:border-brand-accent px-4 py-3 text-sm text-white font-body rounded-sm focus:outline-none transition-colors duration-200 gold-glow-input"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-brand-muted font-heading block mb-2">
                        Planned Allocation
                      </label>
                      <select
                        value={formData.tier}
                        onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                        className="w-full bg-brand-bg/80 border border-brand-accent/10 focus:border-brand-accent px-4 py-3 text-sm text-white font-body rounded-sm focus:outline-none transition-colors duration-200 gold-glow-input"
                      >
                        <option value="25L - 50L">₹25 Lakhs - ₹50 Lakhs</option>
                        <option value="50L - 1Cr">₹50 Lakhs - ₹1 Crore</option>
                        <option value="1Cr+">₹1 Crore +</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-brand-muted font-heading block mb-2">
                      Inquiry Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Specify any details relating to allocation, schedule, or entity structures..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-brand-bg/80 border border-brand-accent/10 focus:border-brand-accent px-4 py-3 text-sm text-white font-body rounded-sm focus:outline-none transition-colors duration-200 resize-none gold-glow-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-accent text-brand-bg font-heading font-semibold text-xs uppercase tracking-widest hover:bg-brand-accent-hover transition-colors duration-300 cursor-pointer shadow-[0_4px_20px_rgba(195,163,79,0.15)]"
                  >
                    Submit Private Inquiry
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
