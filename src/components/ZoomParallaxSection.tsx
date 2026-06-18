import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface ImageItem {
  src: string;
  alt: string;
}

export default function ZoomParallaxSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  const images: ImageItem[] = [
    {
      src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      alt: "Luxury residential complex facade",
    },
    {
      src: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200&auto=format&fit=crop&q=80",
      alt: "Elegant modern apartments",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
      alt: "Luxury lobby overlooking landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
      alt: "Architectural pool and villa design",
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      alt: "Contemporary luxury space interior",
    },
    {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      alt: "Skyscraper steel and glass details",
    },
    {
      src: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/913f8081-ae4d-5ef5-95b7-f2d4b20fcc59/f1fe9f32-ea65-5485-ac44-91637a22c72c.jpg",
      alt: "Architectural structure blueprints",
    },
  ];

  return (
    <div ref={container} className="relative h-[300vh] bg-brand-bg">
      {/* Sticky container for the zoom effect */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center 
                ${index === 1 ? "[&>div]:!-top-[28vh] [&>div]:!left-[20vw] [&>div]:!h-[18vh] [&>div]:!w-[30vw] sm:[&>div]:!-top-[28vh] sm:[&>div]:!left-[18vw] sm:[&>div]:!h-[22vh] sm:[&>div]:!w-[30vw] md:[&>div]:!-top-[30vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[30vh] md:[&>div]:!w-[35vw]" : ""} 
                ${index === 2 ? "[&>div]:!-top-[12vh] [&>div]:!-left-[32vw] [&>div]:!h-[22vh] [&>div]:!w-[25vw] sm:[&>div]:!-top-[12vh] sm:[&>div]:!-left-[28vw] sm:[&>div]:!h-[30vh] sm:[&>div]:!w-[22vw] md:[&>div]:!-top-[10vh] md:[&>div]:!-left-[25vw] md:[&>div]:!h-[45vh] md:[&>div]:!w-[20vw]" : ""} 
                ${index === 3 ? "[&>div]:!top-[2vh] [&>div]:!left-[32vw] [&>div]:!h-[18vh] [&>div]:!w-[25vw] sm:[&>div]:!top-[2vh] sm:[&>div]:!left-[28vw] sm:[&>div]:!h-[22vh] sm:[&>div]:!w-[25vw] md:[&>div]:!left-[27.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[25vw]" : ""} 
                ${index === 4 ? "[&>div]:!top-[25vh] [&>div]:!left-[18vw] [&>div]:!h-[18vh] [&>div]:!w-[28vw] sm:[&>div]:!top-[25vh] sm:[&>div]:!left-[15vw] sm:[&>div]:!h-[22vh] sm:[&>div]:!w-[22vw] md:[&>div]:!top-[27.5vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[20vw]" : ""} 
                ${index === 5 ? "[&>div]:!top-[20vh] [&>div]:!-left-[22vw] [&>div]:!h-[18vh] [&>div]:!w-[30vw] sm:[&>div]:!top-[22vh] sm:[&>div]:!-left-[20vw] sm:[&>div]:!h-[22vh] sm:[&>div]:!w-[30vw] md:[&>div]:!top-[27.5vh] md:[&>div]:!-left-[22.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[30vw]" : ""} 
                ${index === 6 ? "[&>div]:!top-[8vh] [&>div]:!left-[35vw] [&>div]:!h-[12vh] [&>div]:!w-[20vw] sm:[&>div]:!top-[10vh] sm:[&>div]:!left-[32vw] sm:[&>div]:!h-[15vh] sm:[&>div]:!w-[18vw] md:[&>div]:!top-[22.5vh] md:[&>div]:!left-[25vw] md:[&>div]:!h-[15vh] md:[&>div]:!w-[15vw]" : ""}
              `}
            >
              <div className="relative h-[22vh] w-[35vw] sm:h-[24vh] sm:w-[32vw] md:h-[25vh] md:w-[25vw] rounded-sm overflow-hidden border border-brand-accent/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group transition-all duration-300">
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full object-cover brightness-[0.75] group-hover:brightness-[0.95] group-hover:scale-105 transition-all duration-750 ease-out"
                />
                {/* Subtle vignette/gradient layout on image cards */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/50 via-transparent to-transparent opacity-80" />

                {/* Central main card overlay text */}
                {index === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 md:p-6 text-center bg-brand-bg/35 backdrop-blur-[1px]">
                    <span className="text-[7px] sm:text-[9px] md:text-xs uppercase tracking-[0.2em] text-brand-accent font-heading font-semibold mb-1 block text-center max-w-[65%] sm:max-w-[70%] md:max-w-[80%]">
                      ARCHITECTURAL PRESTIGE
                    </span>
                    <h3 className="text-[10px] sm:text-xs md:text-2xl font-heading font-bold text-white leading-tight max-w-[65%] sm:max-w-[70%] md:max-w-[80%]">
                      Visualizing Spaces of Tomorrow
                    </h3>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
