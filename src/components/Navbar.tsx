import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import logoDarkMode from "../assets/Logo/logoDarkMode-C_Xs4EAc-removebg-preview copy.png";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        if (currentScrollY > lastScrollY && currentScrollY > 100 && !mobileMenuOpen) {
          // Scrolling down - hide navbar
          setVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show navbar
          setVisible(true);
        }
      } else {
        // Desktop - always show
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled
        ? "bg-brand-bg/90 backdrop-blur-md border-b border-brand-card py-3 shadow-lg"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 pt-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img
            src={logoDarkMode}
            alt="RVPK Real Estates"
            className={`w-auto object-contain transition-all duration-300 hover:scale-102 ${scrolled ? "h-12" : "h-13"
              }`}
          />
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-8">
          {["Vision", "Leadership", "Value Proposition", "Appreciation Roadmap", "Legacy"].map((item) => {
            const sectionId = item.toLowerCase().replace(/ /g, "-");
            return (
              <button
                key={item}
                onClick={() => scrollToSection(sectionId)}
                className="group relative text-sm font-body font-medium tracking-wider text-brand-muted hover:text-brand-accent transition-colors duration-200 cursor-pointer"
              >
                {item}
                <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-brand-accent transition-all duration-300 group-hover:w-full" />
              </button>
            );
          })}
        </div>

        {/* Contact/CTA Button & Hamburger */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <Magnetic>
              <button
                onClick={() => scrollToSection("contact")}
                className="relative px-5 py-2 text-xs uppercase tracking-widest font-heading font-semibold border border-brand-accent text-brand-accent hover:text-brand-bg hover:bg-brand-accent transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(195,163,79,0.1)] hover:shadow-[0_0_20px_rgba(195,163,79,0.3)]"
              >
                Inquire Now
              </button>
            </Magnetic>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-muted hover:text-brand-accent transition-colors duration-200 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden bg-brand-bg/95 backdrop-blur-lg border-b border-brand-card overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {["Vision", "Leadership", "Value Proposition", "Appreciation Roadmap", "Legacy"].map((item) => {
                const sectionId = item.toLowerCase().replace(/ /g, "-");
                return (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(sectionId);
                      setTimeout(() => {
                        setMobileMenuOpen(false);
                      }, 150);
                    }}
                    className="text-left text-base font-body font-medium tracking-wider text-brand-muted hover:text-brand-accent transition-colors duration-200 py-2 cursor-pointer"
                  >
                    {item}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  scrollToSection("contact");
                  setTimeout(() => {
                    setMobileMenuOpen(false);
                  }, 150);
                }}
                className="w-full text-center py-4 border border-brand-accent text-brand-accent font-heading font-semibold text-xs uppercase tracking-widest hover:bg-brand-accent hover:text-brand-bg transition-all duration-300 cursor-pointer"
              >
                Inquire Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
