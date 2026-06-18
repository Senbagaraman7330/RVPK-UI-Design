import { useEffect, useState } from "react";
import { motion, useTransform, useScroll } from "motion/react";
import Magnetic from "./Magnetic";
import { SplitText } from "./ScrollReveal";
import ThreeTower from "./ThreeTower";

// --- Background Floating Paths SVG Animation ---
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full text-brand-accent/15"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function HeroComponent() {
  const { scrollY } = useScroll();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const opacityVal = useTransform(scrollY, [0, 450], [1, 0]);
  const scaleVal = useTransform(scrollY, [0, 450], [1, 0.94]);
  const heroContentY = useTransform(scrollY, [0, 450], [0, -35]);

  const heroCardOpacity = isDesktop ? opacityVal : 1;
  const heroCardScale = isDesktop ? scaleVal : 1;

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-bg px-6 py-24 md:py-32">
      {/* Floating Paths SVG Background Animation (Replaces Canvas Particles) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Premium Architectural Grid Pattern */}
      <div className="absolute inset-0 architectural-grid pointer-events-none" />

      {/* Animated Ambient Glow Backdrops */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[130px] pointer-events-none animate-slow-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-brand-accent/3 rounded-full blur-[150px] pointer-events-none animate-slow-pulse" style={{ animationDelay: "-6s" }} />

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10">

        {/* Left Side: Brand content with scroll translate-y */}
        <motion.div
          style={{ y: heroContentY }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.3 }}
            className="flex items-center space-x-2 px-4 py-2 border border-brand-accent/20 bg-brand-card/50 rounded-full mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(195,163,79,0.05)]"
          >
            <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] font-heading font-medium text-brand-accent">
              Silicon Valley of India • Bangalore
            </span>
          </motion.div>

          {/* Core Value Statement */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white leading-tight mb-6">
            <SplitText text="A Convergence of" delay={0.5} /> <br />
            <span className="drop-shadow-[0_2px_10px_rgba(195,163,79,0.2)]">
              <SplitText
                text="Corporate Excellence"
                delay={0.8}
                className="bg-gradient-to-r from-brand-accent via-brand-accent-hover to-brand-accent bg-clip-text text-transparent"
              />
            </span>
          </h1>

          {/* Supporting description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 1.1 }}
            className="text-base md:text-lg text-brand-muted font-body max-w-xl leading-relaxed mb-10"
          >
            Setting a new standard in Bangalore’s high-growth corridors by bridging the gap between multi-billion dollar IT operations precision and local real estate craftsmanship.
          </motion.p>

          {/* Primary Engagement CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.3 }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
          >
            <Magnetic>
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto px-8 py-4 bg-brand-accent text-brand-bg font-heading font-semibold text-sm uppercase tracking-widest hover:bg-brand-accent-hover hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(195,163,79,0.3)] hover:shadow-[0_4px_30px_rgba(238,222,132,0.5)] cursor-pointer"
              >
                Explore Pre-Launch Opportunities
              </button>
            </Magnetic>

            <Magnetic>
              <button
                onClick={() => {
                  const el = document.getElementById("vision");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-brand-card/50 text-white font-heading font-semibold text-sm uppercase tracking-widest border border-brand-accent/20 hover:border-brand-accent hover:bg-brand-card transition-all duration-300 cursor-pointer"
              >
                Read Our Vision
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Right Side: Interactive 3D Golden Skyline */}
        <div className="lg:col-span-5 flex justify-center items-end h-[650px] md:h-[700px] relative w-full">
          <motion.div
            style={{ opacity: heroCardOpacity, scale: heroCardScale }}
            className="w-full h-full flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
              className="w-full h-full"
            >
              <ThreeTower />
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Elegant scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted font-heading">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-accent to-transparent animate-bounce" />
      </div>
    </section>
  );
}
