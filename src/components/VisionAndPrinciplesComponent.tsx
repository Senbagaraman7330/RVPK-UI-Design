import { useEffect, useRef, useState } from "react";
import { Cpu, Eye, Globe, ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import ScrollReveal, { SplitText } from "./ScrollReveal";

import Pattern1 from "../assets/vision/Corporate Precision.jpg";
import Pattern2 from "../assets/vision/Absolute Transparency.jpg";
import Pattern3 from "../assets/vision/Future Ecosystems.jpg";

interface SlideData {
  icon: typeof Cpu;
  title: string;
  description: string;
  bgImage: string;
}

export default function VisionAndPrinciplesComponent() {
  const principles: SlideData[] = [
    {
      icon: Cpu,
      title: "Corporate Precision",
      description:
        "Bridging the gap between global IT precision and real estate craftsmanship for flawless, zero-defect delivery.",
      bgImage: Pattern1,
    },
    {
      icon: Eye,
      title: "Absolute Transparency",
      description:
        "Committed to integrity, certified architect progress reports, regular status appraisals, and exceptional ROI.",
      bgImage: Pattern2,
    },
    {
      icon: Globe,
      title: "Future Ecosystems",
      description:
        "Building sustainable, micro-market urban environments that evolve with the needs of tomorrow's residents.",
      bgImage: Pattern3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const autoplayTimerRef = useRef<any>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const titleElRef = useRef<HTMLHeadingElement>(null);
  const imagesElRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef<HTMLDivElement | null>(null);

  // Keep track of slide elements
  const slideElsRef = useRef<{ el: HTMLDivElement; step: number; idx: number }[]>([]);

  const total = principles.length;
  const AUTOPLAY_DELAY = 3000; // time in ms for autoplay swap

  const mod = (n: number) => {
    return ((n % total) + total) % total;
  };

  // Sync state with ref for callback safety
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Preload images
  useEffect(() => {
    principles.forEach((p) => {
      const img = new Image();
      img.src = p.bgImage;
    });
  }, []);

  // Set initial title and slides
  useEffect(() => {
    if (!titleElRef.current || !imagesElRef.current) return;

    // Set initial title
    setTitle(principles[0].title);

    // Initial build of carousel
    buildCarousel(0);
  }, []);

  const setTitle = (text: string) => {
    if (!titleElRef.current) return;
    titleElRef.current.innerHTML = "";
    const line = document.createElement("div");
    line.className = "flex flex-nowrap justify-center lg:justify-start whitespace-nowrap";
    [...text].forEach((ch) => {
      const span = document.createElement("span");
      span.textContent = ch === " " ? "\u00A0" : ch;
      span.className = "inline-block will-change-transform text-white font-heading font-bold";
      line.appendChild(span);
    });
    titleElRef.current.appendChild(line);
    currentLineRef.current = line;
  };

  const animateTitle = (newText: string, direction: "next" | "prev") => {
    if (!titleElRef.current || !currentLineRef.current) return gsap.timeline();

    const h = titleElRef.current.offsetHeight || 80;
    const dir = direction === "next" ? 1 : -1;
    const oldLine = currentLineRef.current;
    const oldChars = Array.from(oldLine.querySelectorAll("span"));

    oldLine.style.cssText = "position:absolute;top:0;left:0;width:100%;display:flex;flex-wrap:nowrap;white-space:nowrap;";
    if (window.innerWidth < 1024) {
      oldLine.style.justifyContent = "center";
    }

    const newLine = document.createElement("div");
    newLine.style.cssText = "position:absolute;top:0;left:0;width:100%;display:flex;flex-wrap:nowrap;white-space:nowrap;";
    if (window.innerWidth < 1024) {
      newLine.style.justifyContent = "center";
    }

    [...newText].forEach((ch) => {
      const span = document.createElement("span");
      span.textContent = ch === " " ? "\u00A0" : ch;
      span.className = "inline-block will-change-transform text-white font-heading font-bold";
      newLine.appendChild(span);
    });
    titleElRef.current.appendChild(newLine);

    const newChars = Array.from(newLine.querySelectorAll("span"));
    gsap.set(newChars, { y: h * dir });

    const tl = gsap.timeline({
      onComplete: () => {
        oldLine.remove();
        newLine.style.cssText = "position:relative;";
        if (window.innerWidth < 1024) {
          newLine.style.display = "flex";
          newLine.style.justifyContent = "center";
          newLine.style.flexWrap = "nowrap";
          newLine.style.whiteSpace = "nowrap";
        }
        gsap.set(newChars, { clearProps: "all" });
        currentLineRef.current = newLine;
      },
    });

    tl.to(
      oldChars,
      {
        y: -h * dir,
        stagger: 0.02,
        duration: 0.55,
        ease: "power3.inOut",
      },
      0
    );

    tl.to(
      newChars,
      {
        y: 0,
        stagger: 0.02,
        duration: 0.55,
        ease: "power3.inOut",
      },
      0
    );

    return tl;
  };

  const getSlideProps = (step: number) => {
    if (!imagesElRef.current) return { x: 0, y: 0, rotation: 0, scale: 1, blur: 0, opacity: 1, zIndex: 1 };

    const w = imagesElRef.current.offsetWidth || 500;
    const h = imagesElRef.current.offsetHeight || 400;

    const positions = [
      { x: -2.0, y: 0, rot: 0, s: 1.0, b: 0, o: 0 },
      { x: -1.0, y: 0, rot: 0, s: 1.0, b: 0, o: 0 },
      { x: 0, y: 0, rot: 0, s: 1.0, b: 0, o: 1 },
      { x: 1.0, y: 0, rot: 0, s: 1.0, b: 0, o: 0 },
      { x: 2.0, y: 0, rot: 0, s: 1.0, b: 0, o: 0 },
    ];

    const idx = Math.max(0, Math.min(4, step + 2));
    const p = positions[idx];

    return {
      x: p.x * w,
      y: p.y * h,
      rotation: p.rot,
      scale: p.s,
      blur: p.b,
      opacity: p.o,
      zIndex: Math.abs(step) === 0 ? 3 : 1,
    };
  };

  const positionSlide = (slide: HTMLDivElement, step: number) => {
    const props = getSlideProps(step);
    gsap.set(slide, {
      xPercent: -50,
      yPercent: -50,
      x: props.x,
      y: props.y,
      rotation: props.rotation,
      scale: props.scale,
      opacity: props.opacity,
      filter: `blur(${props.blur}px)`,
      zIndex: props.zIndex,
    });
  };

  const makeSlideElement = (idx: number): HTMLDivElement => {
    const slide = document.createElement("div");
    slide.className = "absolute top-1/2 left-1/2 w-full h-full overflow-hidden rounded-sm border border-brand-accent/20 will-change-transform shadow-[0_15px_45px_rgba(0,0,0,0.7)] transition-all duration-300";

    const img = document.createElement("img");
    img.src = principles[idx].bgImage;
    img.alt = principles[idx].title;
    img.className = "w-full h-full object-cover brightness-[0.8] hover:scale-105 transition-transform duration-700 pointer-events-none";

    const overlay = document.createElement("div");
    overlay.className = "absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-transparent pointer-events-none";

    slide.appendChild(img);
    slide.appendChild(overlay);
    return slide;
  };

  const buildCarousel = (currIdx: number) => {
    if (!imagesElRef.current) return;
    imagesElRef.current.innerHTML = "";
    slideElsRef.current = [];

    for (let step = -1; step <= 1; step++) {
      const idx = mod(currIdx + step);
      const slide = makeSlideElement(idx);
      imagesElRef.current.appendChild(slide);
      positionSlide(slide, step);
      slideElsRef.current.push({ el: slide, step, idx });
    }
  };

  const animateCarousel = (direction: "next" | "prev", nextIdx: number) => {
    if (!imagesElRef.current) return gsap.timeline();

    const shift = direction === "next" ? -1 : 1;
    const enterStep = direction === "next" ? 2 : -2;
    const newIdx = direction === "next" ? mod(nextIdx + 1) : mod(nextIdx - 1);

    const newSlide = makeSlideElement(newIdx);
    imagesElRef.current.appendChild(newSlide);
    positionSlide(newSlide, enterStep);
    slideElsRef.current.push({ el: newSlide, step: enterStep, idx: newIdx });

    slideElsRef.current.forEach((s) => {
      s.step += shift;
    });

    const tl = gsap.timeline({
      onComplete: () => {
        slideElsRef.current = slideElsRef.current.filter((s) => {
          if (Math.abs(s.step) >= 2) {
            s.el.remove();
            return false;
          }
          return true;
        });
      },
    });

    slideElsRef.current.forEach((s) => {
      const props = getSlideProps(s.step);
      s.el.style.zIndex = String(props.zIndex);

      tl.to(
        s.el,
        {
          x: props.x,
          y: props.y,
          rotation: props.rotation,
          scale: props.scale,
          opacity: props.opacity,
          filter: `blur(${props.blur}px)`,
          duration: 0.6,
          ease: "power3.inOut",
        },
        0
      );
    });

    return tl;
  };

  const go = (direction: "next" | "prev") => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const nextIdx = direction === "next" ? mod(currentIndexRef.current + 1) : mod(currentIndexRef.current - 1);

    const master = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIdx);
        animatingRef.current = false;
      },
    });

    master.add(animateTitle(principles[nextIdx].title, direction), 0);
    master.add(animateCarousel(direction, nextIdx), 0);
  };

  // Autoplay Logic
  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      if (!animatingRef.current) {
        go("next");
      }
    }, AUTOPLAY_DELAY);
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  // Handle Autoplay & manual resets
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [currentIndex]);

  const handleManualGo = (direction: "next" | "prev") => {
    stopAutoplay();
    go(direction);
  };

  // Bind keydown, resize, and touch events (removed wheel scrolling)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (animatingRef.current) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        handleManualGo("next");
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        handleManualGo("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Swipe gestures
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (animatingRef.current) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        handleManualGo(diff > 0 ? "next" : "prev");
      }
    };

    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.addEventListener("touchstart", handleTouchStart, { passive: true });
      sliderElement.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    const handleResize = () => {
      if (animatingRef.current) return;
      slideElsRef.current.forEach((s) => {
        positionSlide(s.el, s.step);
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (sliderElement) {
        sliderElement.removeEventListener("touchstart", handleTouchStart);
        sliderElement.removeEventListener("touchend", handleTouchEnd);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const activePillar = principles[currentIndex];
  const ActiveIcon = activePillar.icon;

  return (
    <section id="vision" className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-brand-bg px-6 border-b border-brand-card overflow-hidden">
      {/* Background radial accent to divide section */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-brand-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-heading font-semibold block mb-3">
              Foundational Pillars
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              <SplitText text="Redefining Urban Living" delay={0.15} />
            </h2>
            <div className="w-24 h-[2px] bg-brand-accent mx-auto mb-8 relative origin-center">
              <div className="absolute top-0 left-0 w-full h-full bg-brand-accent animate-pulse" />
            </div>
            <p className="text-brand-muted text-base md:text-lg leading-relaxed font-body">
              Setting a new standard in Bangalore’s real estate by combining corporate governance, rigorous timelines, and structural craftsmanship.
            </p>
          </div>

          {/* GSAP Interactive Slider Body */}
          <div
            ref={sliderRef}
            className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[500px] p-4 md:p-8 rounded-sm mb-8 md:mb-12 overflow-visible"
          >
            {/* Left Column: Info Content */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full z-10">
              <div>
                {/* Active Icon Indicator */}
                <div className="w-14 h-14 bg-brand-card border border-brand-accent/20 flex items-center justify-center mb-8 rounded-sm text-brand-accent shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <ActiveIcon className="w-6 h-6" />
                </div>

                {/* Animated Pillar Title */}
                <h3
                  ref={titleElRef}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-heading font-bold text-white mb-6 min-h-[40px] md:min-h-[60px] relative overflow-hidden whitespace-nowrap"
                >
                  {/* Injected dynamically by GSAP */}
                </h3>

                {/* Pillar Description */}
                <p className="text-brand-muted text-base md:text-lg leading-relaxed font-body mb-8 transition-opacity duration-500">
                  {activePillar.description}
                </p>
              </div>

              {/* Slide Nav buttons and indicators */}
              <div className="hidden lg:flex items-center gap-6 mt-4">
                <button
                  onClick={() => handleManualGo("prev")}
                  className="w-12 h-12 rounded-sm border border-brand-card hover:border-brand-accent/50 bg-brand-card/50 flex items-center justify-center text-white hover:text-brand-accent transition-all duration-300 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {principles.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index === currentIndex) return;
                        handleManualGo(index > currentIndex ? "next" : "prev");
                      }}
                      className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${index === currentIndex ? "w-8 bg-brand-accent" : "w-2 bg-brand-card"
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleManualGo("next")}
                  className="w-12 h-12 rounded-sm border border-brand-card hover:border-brand-accent/50 bg-brand-card/50 flex items-center justify-center text-white hover:text-brand-accent transition-all duration-300 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Column: Carousel Stacking Images */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center w-full">
              <div className="relative w-full h-[300px] sm:h-[380px] md:h-[480px] overflow-hidden flex items-center justify-center">
                <div ref={imagesElRef} className="w-full h-full relative" />
              </div>

              {/* Mobile Slide Nav buttons and indicators */}
              <div className="flex lg:hidden items-center gap-6 mt-8">
                <button
                  onClick={() => handleManualGo("prev")}
                  className="w-12 h-12 rounded-sm border border-brand-card hover:border-brand-accent/50 bg-brand-card/50 flex items-center justify-center text-white hover:text-brand-accent transition-all duration-300 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {principles.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index === currentIndex) return;
                        handleManualGo(index > currentIndex ? "next" : "prev");
                      }}
                      className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${index === currentIndex ? "w-8 bg-brand-accent" : "w-2 bg-brand-card"
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleManualGo("next")}
                  className="w-12 h-12 rounded-sm border border-brand-card hover:border-brand-accent/50 bg-brand-card/50 flex items-center justify-center text-white hover:text-brand-accent transition-all duration-300 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Vision Statement / Execution Philosophy Callout */}
          {/* <div className="relative max-w-4xl mx-auto bg-brand-card border border-brand-accent/10 p-8 md:p-12 text-center rounded-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
            <h4 className="text-lg font-heading tracking-widest text-brand-accent uppercase mb-4">
              Our Execution Philosophy
            </h4>
            <p className="text-white text-lg md:text-xl font-light font-body italic leading-relaxed">
              &ldquo;We don't just build spaces; we engineer high-performance real estate ecosystems. By combining rigorous IT-driven execution frameworks with proven local mastery, we deliver assets that generate long-term wealth.&rdquo;
            </p>
          </div> */}
        </ScrollReveal>
      </div>
    </section>
  );
}
