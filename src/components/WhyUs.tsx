import { useState, useEffect, useRef } from "react";
import projectPoster from "@/assets/hero/hero-architecture.webp";

const extractImages = (globMap: Record<string, any>) => {
  return Object.values(globMap).map((m: any) => typeof m === "string" ? m : m?.default || m) as string[];
};

const bedroomImages = extractImages(import.meta.glob("@/assets/bedroom/*.{jpeg,jpg,png,JPG,JPEG,webp}", { eager: true }));
const livingImages = extractImages(import.meta.glob("@/assets/living/*.{jpeg,jpg,png,JPG,JPEG,webp}", { eager: true }));
const kitchenImages = extractImages(import.meta.glob("@/assets/kitchen/*.{jpeg,jpg,png,JPG,JPEG,webp}", { eager: true }));

// Map our assets to the four walkthrough scenes
const sceneImages = [
  livingImages[0] || projectPoster, // Living Room
  kitchenImages[0] || projectPoster, // Kitchen
  bedroomImages[0] || projectPoster, // Bedroom
  livingImages[2] || livingImages[0] || projectPoster, // Real Architectural Execution
];

const benefits = [
  {
    title: "Quality Assurance",
    description: "We source only premium materials and maintain rigorous structural and design standards to ensure the durability, health, and luxury of every home we build.",
    index: 0,
    svgPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 11l2 2 4-4", // Shield Check
  },
  {
    title: "Expert Design Team",
    description: "Our architectural designs integrate high-concept contemporary aesthetics with structural integrity, framing natural sunlight and local Calicut elements.",
    index: 1,
    svgPath: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5", // Award layers
  },
  {
    title: "Precision & Timely Delivery",
    description: "Respecting your investment means respecting your schedule. Our custom project planners ensure keys are delivered exactly on the agreed-upon timeline.",
    index: 2,
    svgPath: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2", // Clock
  },
  {
    title: "Client-Centric Collaboration",
    description: "Your luxury space is a direct reflection of your identity. We partner closely through interactive mockups, material drafts, and daily check-ins.",
    index: 3,
    svgPath: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75", // Users
  },
];

const WhyUs = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Detect which benefit item is currently closest to the vertical center of the screen
      const benefitElements = sectionRef.current.querySelectorAll(".benefit-block");
      let minDistance = Infinity;
      let closestIdx = 0;

      benefitElements.forEach((el, index) => {
        const itemRect = el.getBoundingClientRect();
        const distance = Math.abs((itemRect.top + itemRect.height / 2) - windowHeight / 2);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = index;
        }
      });

      setActiveIdx(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial trigger

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="why-us" ref={sectionRef} className="relative bg-[#f7f5f0] border-t border-black/5">
      <style>{`
        @keyframes strokeDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-stroke {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: strokeDraw 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      {/* Split Screen Container */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Column: Sticky Immersive Image Scene */}
        <div className="w-full lg:w-1/2 h-[45vh] lg:h-screen lg:sticky lg:top-0 relative overflow-hidden bg-[#0c0d0e] z-10 border-r border-black/5">
          {sceneImages.map((imgSrc, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-[1.6s] cubic-bezier(0.25, 1, 0.5, 1) ${
                activeIdx === idx ? "opacity-75 scale-100 filter-none" : "opacity-0 scale-105 blur-[2px]"
              }`}
            >
              <img
                src={imgSrc}
                alt={`Architectural Scene ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
            </div>
          ))}

          {/* Luxury Caption on Left Image */}
          <div className="absolute bottom-8 left-8 z-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 block mb-1">
              Scene Perspective
            </span>
            <span className="font-serif text-white tracking-widest text-lg font-light transition-all duration-700">
              {activeIdx === 0 && "01 · Living Space Harmony"}
              {activeIdx === 1 && "02 · Culinary Architecture"}
              {activeIdx === 2 && "03 · Serene Rest Sanctuary"}
              {activeIdx === 3 && "04 · Architectural Execution"}
            </span>
          </div>
        </div>

        {/* Right Column: Benefits Content Scrolling */}
        <div className="w-full lg:w-1/2 py-24 lg:py-32 px-8 lg:px-20 flex flex-col justify-center gap-24 lg:gap-36 z-20">
          <div className="max-w-md">
            <p className="text-sm tracking-[0.3em] uppercase text-warm mb-4">Our Edge</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
              Why Choose NAZ Architects?
            </h2>
            <p className="text-muted-foreground mt-4 text-sm font-light">
              Crafting premium spaces through precision engineering, curated interior design, and transparent management.
            </p>
          </div>

          {/* Benefits Blocks */}
          <div className="flex flex-col gap-24 lg:gap-32">
            {benefits.map((b) => {
              const isActive = activeIdx === b.index;
              return (
                <div
                  key={b.title}
                  className={`benefit-block flex gap-8 transition-all duration-700 transform ${
                    isActive ? "opacity-100 translate-x-0" : "opacity-40 -translate-x-2"
                  }`}
                >
                  {/* Drawing SVG Icon wrapper */}
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-none flex items-center justify-center border transition-all duration-500 ${
                      isActive ? "bg-warm text-white border-warm" : "bg-[#fdfcf9] text-foreground/50 border-black/10"
                    }`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                      >
                        {isActive ? (
                          <path d={b.svgPath} className="animate-stroke" />
                        ) : (
                          <path d={b.svgPath} />
                        )}
                      </svg>
                    </div>
                  </div>

                  {/* Benefit text */}
                  <div>
                    <span className="font-mono text-xs text-warm/80 tracking-widest block mb-2">
                      0{(b.index + 1).toString()}
                    </span>
                    <h3 className="font-serif text-2xl text-foreground mb-4 font-semibold tracking-wide">
                      {b.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-light">
                      {b.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyUs;
