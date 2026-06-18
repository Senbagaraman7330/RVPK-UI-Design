import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Briefcase, Building, Layers } from "lucide-react";
import ScrollReveal, { SplitText, staggerContainer, staggerItem } from "./ScrollReveal";
import CountUpRaw from "react-countup";
import { useInView } from "react-intersection-observer";

// Safely handle ESM/CJS default export variation for react-countup in Vite
const CountUp = (CountUpRaw as any).default || CountUpRaw;

function GoldenFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
      size: number;
    }

    const particles: Particle[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn particles at the top and middle area of the canvas (where the text sits)
      if (particles.length < 60 && Math.random() < 0.35) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.5) + (height * 0.1), // spawn around the text height
          vx: (Math.random() - 0.5) * 0.4,
          vy: Math.random() * 0.8 + 0.4, // float downwards
          alpha: Math.random() * 0.85 + 0.15,
          decay: Math.random() * 0.012 + 0.006,
          size: Math.random() * 2.5 + 0.8,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        // If invisible or out of canvas bounds
        if (p.alpha <= 0 || p.y > height) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Premium warm gold gradient with glow
        ctx.fillStyle = `rgba(195, 163, 79, ${p.alpha})`;
        ctx.shadowColor = "rgba(238, 222, 132, 0.9)";
        ctx.shadowBlur = p.size * 3;
        
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-[140%] -top-[10%] pointer-events-none z-0" />;
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className="relative inline-block overflow-visible pr-6 py-2">
      {/* Background dissolving gold particle flow */}
      <GoldenFlow />
      <span
        className="relative z-10 font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-brand-accent drop-shadow-[0_2px_12px_rgba(195,163,79,0.35)] whitespace-nowrap"
      >
        {inView ? <CountUp end={value} duration={2.5} /> : "0"}
        {suffix}
      </span>
    </div>
  );
}

export default function LeadershipAndCredibilityComponent() {
  const leaders = [
    {
      name: "Prasanna Kumar",
      role: "IT & Finance Strategy",
      metricValue: 26,
      metricSuffix: " Yrs",
      metricLabel: "Global Corporate IT Experience",
      icon: Briefcase,
      points: [
        "Led multi-billion USD engagements for Samsung's global ecosystem.",
        "Expertise in long-term financial modeling, operational strategy, and scaling systems.",
        "Brings institutional discipline and global corporate standards to real estate development.",
      ],
    },
    {
      name: "PB Naidu",
      role: "Real Estate Execution",
      metricValue: 18,
      metricSuffix: "+ Yrs",
      metricLabel: "Bangalore Market Experience",
      icon: Building,
      points: [
        "18+ years delivering self-owned projects in Bangalore’s high-growth micro-markets.",
        "Master of regulatory pathways, RERA licensing, and local execution logistics.",
        "Proven track record of high-quality, structural craftsmanship and timely delivery.",
      ],
    },
  ];

  return (
    <section id="leadership" className="relative pt-12 pb-24 md:pt-16 md:pb-32 bg-brand-bg px-6 border-b border-brand-card">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-accent/2 rounded-full blur-[120px] pointer-events-none" />

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
              Corporate Leadership
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              <SplitText text="The Leadership Synergy" delay={0.15} />
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
              Decades of global excellence and proven construction mastery combined to institutionalize Bangalore’s investment landscape.
            </motion.p>
          </div>

          {/* Leaders Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20"
          >
            {leaders.map((leader, idx) => {
              const IconComp = leader.icon;
              return (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  className="bg-brand-card border border-brand-accent/5 p-8 md:p-12 relative flex flex-col justify-between rounded-sm shadow-xl hover:border-brand-accent/20 transition-all duration-300"
                >
                  <div>
                    {/* Decorative Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-heading border-b border-brand-accent/20 pb-1">
                        Partner Profile
                      </span>
                      <IconComp className="w-6 h-6 text-brand-accent/40" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-sm font-heading tracking-widest text-brand-accent uppercase mb-8">
                      {leader.role}
                    </p>

                    <ul className="space-y-4 mb-8 text-brand-muted text-sm md:text-base font-body">
                      {leader.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start space-x-3">
                          <span className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-2 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Animated Metric */}
                  <div className="pt-8 border-t border-brand-card flex items-center space-x-6">
                    <div className="flex items-baseline">
                      <Counter value={leader.metricValue} suffix={leader.metricSuffix} />
                    </div>
                    <div className="text-xs uppercase tracking-wider text-brand-muted font-heading max-w-[150px] leading-tight">
                      {leader.metricLabel}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Synergy Summary Callout */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-card/30 border border-brand-card p-8 md:p-10 text-center rounded-sm max-w-3xl mx-auto shadow-xl"
          >
            <div className="flex justify-center mb-4">
              <Layers className="w-8 h-8 text-brand-accent/60" />
            </div>
            <h4 className="text-lg font-heading font-bold text-white mb-2">
              Strategic Convergence
            </h4>
            <p className="text-brand-muted text-sm md:text-base font-body leading-relaxed">
              By merging Prasanna's institutional finance precision with PB Naidu's hands-on regulatory and engineering mastery, RVPK eliminates delivery delays, guarantees capitalization structures, and builds with structural superiority.
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
