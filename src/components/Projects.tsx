import { useState, useEffect, useRef } from "react";
import projectsVideo from "@/assets/WhatsApp Video 2026-04-12 at 3.17.07 PM.mp4";
import projectPoster from "@/assets/hero/hero-architecture.webp";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Skeleton } from "@/components/ui/skeleton";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

const extractImages = (globMap: Record<string, any>) => {
  return Object.values(globMap).map((m: any) => typeof m === "string" ? m : m?.default || m) as string[];
};

const bedroomImages = extractImages(import.meta.glob("@/assets/bedroom/*.{jpeg,jpg,png,JPG,JPEG,webp}", { eager: true }));
const livingImages = extractImages(import.meta.glob("@/assets/living/*.{jpeg,jpg,png,JPG,JPEG,webp}", { eager: true }));
const kitchenImages = extractImages(import.meta.glob("@/assets/kitchen/*.{jpeg,jpg,png,JPG,JPEG,webp}", { eager: true }));

// Walkthrough Steps
const walkthroughSequence = [
  // Living Room
  { label: "Living Room - Main View", desc: "Sun-drenched luxury living space featuring custom wood accents.", img: livingImages[0] || projectPoster },
  { label: "Living Room - Slat Wall", desc: "Elegantly detailed wood slat paneling framing the lounge area.", img: livingImages[1] || livingImages[0] || projectPoster },
  { label: "Living Room - Staircase Detail", desc: "Architectural staircase design integrating structure and light.", img: livingImages[2] || livingImages[0] || projectPoster },
  
  // Kitchen
  { label: "Kitchen - Premium Finishes", desc: "Sleek contemporary cabinetry paired with clean functional surfaces.", img: kitchenImages[0] || projectPoster },
  { label: "Kitchen - Layout Design", desc: "Optimized workspace layouts tailored for luxury culinary execution.", img: kitchenImages[1] || kitchenImages[0] || projectPoster },

  // Bedroom
  { label: "Bedroom - Master Sanctuary", desc: "Minimalist master bedroom designed with clean architectural lines.", img: bedroomImages[0] || projectPoster },
  { label: "Bedroom - Fitted Wardrobe", desc: "Elegantly integrated wardrobe spaces using high-end veneer finishes.", img: bedroomImages[1] || bedroomImages[0] || projectPoster },
  { label: "Bedroom - Architectural Detail", desc: "Refined wall panels and indirect lighting integration.", img: bedroomImages[2] || bedroomImages[0] || projectPoster },
];

const Projects = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [selectedWalkthrough, setSelectedWalkthrough] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const walkthroughScrollRef = useRef<HTMLDivElement>(null);

  // Horizontal wheel-scroll handling for the walkthrough
  useEffect(() => {
    const scroller = walkthroughScrollRef.current;
    if (!scroller || !selectedWalkthrough) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      
      // Calculate next scroll position
      scroller.scrollLeft += e.deltaY * 1.2;

      // Update active step based on scroll position
      const stepWidth = scroller.clientWidth;
      const currentStep = Math.round(scroller.scrollLeft / stepWidth);
      setActiveStep(Math.min(walkthroughSequence.length - 1, Math.max(0, currentStep)));
    };

    scroller.addEventListener("wheel", handleWheel, { passive: false });
    return () => scroller.removeEventListener("wheel", handleWheel);
  }, [selectedWalkthrough]);

  return (
    <section id="projects" className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#f7f5f0] relative">
      <style>{`
        .clip-reveal {
          clip-path: inset(100% 0 0 0);
          transition: clip-path 1.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .clip-reveal.active {
          clip-path: inset(0 0 0 0);
        }
      `}</style>

      <div className="container mx-auto px-6 lg:px-12" ref={ref}>
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <p
              className={`text-sm tracking-[0.3em] uppercase text-warm mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              Selected Work
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl text-foreground transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Featured Projects
            </h2>
            <p
              className={`text-muted-foreground mt-6 text-sm leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Explore our carefully crafted spaces, built around comfort, premium aesthetics, and timeless design.
            </p>
          </div>

          {/* Luxury Walkthrough Trigger Button */}
          <button
            onClick={() => setSelectedWalkthrough(true)}
            data-cursor="view"
            className={`group inline-flex items-center gap-3 border border-foreground/15 bg-transparent hover:bg-foreground hover:text-white px-8 py-4 transition-all duration-500 text-xs tracking-widest uppercase font-semibold h-fit ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span>Interactive Walkthrough</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

        {/* Immersive Projects Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Video Card (Span 8) */}
          <div
            onClick={() => setSelectedWalkthrough(true)}
            data-cursor="view"
            className={`group relative md:col-span-8 aspect-video md:aspect-auto md:h-[480px] lg:h-[550px] overflow-hidden bg-muted cursor-pointer transition-all duration-1000 clip-reveal ${
              isVisible ? "active" : ""
            }`}
          >
            {!isVideoLoaded && (
              <Skeleton className="absolute inset-0 z-10 w-full h-full bg-neutral-200" />
            )}
            <video
              src={projectsVideo}
              poster={projectPoster}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            {/* Interactive Luxury Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex flex-col justify-end p-8">
              <span className="text-[10px] tracking-[0.3em] text-warm uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                Balussery, Calicut
              </span>
              <h4 className="font-serif text-2xl text-white my-2 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                NAZ Signature Estate
              </h4>
              <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2 text-[11px] text-white/50 uppercase tracking-widest transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                <span>Residential Walkthrough</span>
                <span>4500 SQ. FT. · 2026</span>
              </div>
            </div>
          </div>

          {/* Kitchen Slideshow Card (Span 4) */}
          <div
            onClick={() => setSelectedWalkthrough(true)}
            data-cursor="view"
            className={`group relative md:col-span-4 aspect-square md:aspect-auto md:h-[480px] lg:h-[550px] overflow-hidden bg-muted cursor-pointer transition-all duration-1000 delay-150 clip-reveal ${
              isVisible ? "active" : ""
            }`}
          >
            <img
              src={kitchenImages[0] || projectPoster}
              alt="Kitchen Design"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e]/85 via-[#0c0d0e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex flex-col justify-end p-8">
              <span className="text-[10px] tracking-[0.3em] text-warm uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                Calicut, Kerala
              </span>
              <h4 className="font-serif text-2xl text-white my-2 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                Minimal Culinary Kitchen
              </h4>
              <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2 text-[11px] text-white/50 uppercase tracking-widest transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                <span>Wood & Concrete</span>
                <span>2025</span>
              </div>
            </div>
          </div>

          {/* Bedroom Card (Span 6) */}
          <div
            onClick={() => setSelectedWalkthrough(true)}
            data-cursor="view"
            className={`group relative md:col-span-6 aspect-square md:aspect-[16/10] overflow-hidden bg-muted cursor-pointer transition-all duration-1000 delay-300 clip-reveal ${
              isVisible ? "active" : ""
            }`}
          >
            <img
              src={bedroomImages[0] || projectPoster}
              alt="Bedroom Design"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e]/85 via-[#0c0d0e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex flex-col justify-end p-8">
              <span className="text-[10px] tracking-[0.3em] text-warm uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                Balussery
              </span>
              <h4 className="font-serif text-2xl text-white my-2 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                Timeless Rest Sanctuary
              </h4>
              <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2 text-[11px] text-white/50 uppercase tracking-widest transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                <span>Interior Design</span>
                <span>2026</span>
              </div>
            </div>
          </div>

          {/* Living Card (Span 6) */}
          <div
            onClick={() => setSelectedWalkthrough(true)}
            data-cursor="view"
            className={`group relative md:col-span-6 aspect-square md:aspect-[16/10] overflow-hidden bg-muted cursor-pointer transition-all duration-1000 delay-450 clip-reveal ${
              isVisible ? "active" : ""
            }`}
          >
            <img
              src={livingImages[0] || projectPoster}
              alt="Living Room Design"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e]/85 via-[#0c0d0e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex flex-col justify-end p-8">
              <span className="text-[10px] tracking-[0.3em] text-warm uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                Calicut
              </span>
              <h4 className="font-serif text-2xl text-white my-2 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                Textured Living Studio
              </h4>
              <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-2 text-[11px] text-white/50 uppercase tracking-widest transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                <span>Stone & Light</span>
                <span>2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IMMERSIVE WALKTHROUGH FULLSCREEN OVERLAY */}
      {selectedWalkthrough && (
        <div className="fixed inset-0 z-[9999] bg-[#0c0d0e] flex flex-col justify-between overflow-hidden">
          {/* Header Bar */}
          <div className="w-full px-6 lg:px-12 py-6 border-b border-white/10 flex justify-between items-center z-20">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-warm font-semibold">Architectural Journey</span>
              <h3 className="text-white text-lg font-serif">NAZ Modern Walkthrough</h3>
            </div>
            <button
              onClick={() => setSelectedWalkthrough(false)}
              className="w-12 h-12 rounded-full border border-white/20 hover:border-warm/80 hover:text-warm text-white flex items-center justify-center transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Horizontal Scroller container */}
          <div
            ref={walkthroughScrollRef}
            className="flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth z-10 no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {walkthroughSequence.map((step, idx) => (
              <div
                key={step.label}
                className="w-full min-w-full h-full snap-start flex flex-col lg:flex-row relative"
              >
                {/* Left/Main Image */}
                <div className="flex-1 h-[50vh] lg:h-full relative overflow-hidden bg-neutral-900">
                  <img
                    src={step.img}
                    alt={step.label}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
                </div>

                {/* Right/Info Panel (Glassmorphism overlap) */}
                <div className="w-full lg:w-[480px] bg-neutral-950 p-8 lg:p-16 flex flex-col justify-center border-l border-white/10 z-10">
                  <span className="font-mono text-xs text-warm tracking-[0.25em] uppercase">
                    Step {(idx + 1).toString().padStart(2, "0")} / {walkthroughSequence.length}
                  </span>
                  <h4 className="font-serif text-3xl md:text-4xl text-white mt-4 mb-6">
                    {step.label}
                  </h4>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8">
                    {step.desc}
                  </p>
                  
                  {/* Indicators / Progress bar */}
                  <div className="w-full bg-white/10 h-[2px] rounded-full relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-warm rounded-full transition-all duration-500"
                      style={{ width: `${((idx + 1) / walkthroughSequence.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Bar / Navigation Controls */}
          <div className="w-full px-6 lg:px-12 py-6 border-t border-white/10 flex justify-between items-center bg-neutral-950 z-20">
            <button
              disabled={activeStep === 0}
              onClick={() => {
                const scroller = walkthroughScrollRef.current;
                if (scroller) {
                  scroller.scrollLeft -= scroller.clientWidth;
                }
              }}
              className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/50 hover:text-white disabled:opacity-30 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              disabled={activeStep === walkthroughSequence.length - 1}
              onClick={() => {
                const scroller = walkthroughScrollRef.current;
                if (scroller) {
                  scroller.scrollLeft += scroller.clientWidth;
                }
              }}
              className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/50 hover:text-white disabled:opacity-30 transition-colors duration-300"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
