import { useEffect, useState } from "react";
import Lenis from "lenis";

import Navbar from "./components/Navbar";
import HeroComponent from "./components/HeroComponent";
import VisionAndPrinciplesComponent from "./components/VisionAndPrinciplesComponent";
import ZoomParallaxSection from "./components/ZoomParallaxSection";
import LeadershipAndCredibilityComponent from "./components/LeadershipAndCredibilityComponent";
import InvestorValueComponent from "./components/InvestorValueComponent";
import GrowthRoadmapComponent from "./components/GrowthRoadmapComponent";
import TrustAndLegacyComponent from "./components/TrustAndLegacyComponent";
import ConversionComponent from "./components/ConversionComponent";
import FooterComponent from "./components/FooterComponent";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    (window as any).lenis = lenis;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen antialiased selection:bg-brand-accent selection:text-white">
      {/* Noise Texture Overlay */}
      <div className="noise-texture" />

      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-brand-accent z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Main Layout Navigation */}
      <Navbar />

      {/* Structured Sections */}
      <main>
        <HeroComponent />
        <VisionAndPrinciplesComponent />
        <ZoomParallaxSection />
        <LeadershipAndCredibilityComponent />
        <InvestorValueComponent />
        <GrowthRoadmapComponent />
        <TrustAndLegacyComponent />
        <ConversionComponent />
      </main>

      {/* Legal & Navigation Footer */}
      <FooterComponent />
    </div>
  );
}
