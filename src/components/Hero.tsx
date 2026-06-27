import heroPoster from "@/assets/hero/hero-architecture.webp";
import heroVideo from "@/assets/hero/13470983_1920_1080_24fps.mp4";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500); // Trigger anim quickly
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Parallax mouse movements
    const handleMouseParallax = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseParallax, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseParallax);
  }, []);

  // JS magnetic hover logic for luxury feel
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0) scale(1.02)`;
    
    const arrow = el.querySelector(".arrow-icon") as HTMLElement;
    if (arrow) {
      arrow.style.transform = `translateX(6px)`;
    }
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.transform = `translate3d(0, 0, 0) scale(1)`;
    
    const arrow = el.querySelector(".arrow-icon") as HTMLElement;
    if (arrow) {
      arrow.style.transform = `translateX(0)`;
    }
  };

  const dustParticles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1.5}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 12 + 18}s`,
  }));

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#0c0d0e]">
      <style>{`
        @keyframes floatDust {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-80px) translateX(30px);
            opacity: 0.4;
          }
        }
        .animate-dust {
          animation: floatDust infinite ease-in-out;
        }
        @keyframes sunlightGlow {
          0%, 100% {
            opacity: 0.12;
            transform: translate(-10%, -10%) scale(1);
          }
          50% {
            opacity: 0.22;
            transform: translate(5%, 5%) scale(1.05);
          }
        }
        .animate-sunlight {
          animation: sunlightGlow 15s infinite ease-in-out;
        }
      `}</style>

      {/* Background Video Container */}
      <div className="absolute inset-0 z-0">
        {!loaded && <Skeleton className="absolute inset-0 z-10 w-full h-full rounded-none bg-neutral-900" />}
        <video
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setLoaded(true)}
          className="w-full h-full object-cover transition-opacity duration-[2.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `translate3d(${-mousePos.x * 12}px, ${-mousePos.y * 12}px, 0) scale(${loaded ? 1 : 1.08})`,
            transition: "transform 0.5s cubic-bezier(0.1, 0.9, 0.2, 1), scale 3s cubic-bezier(0.25, 1, 0.5, 1)",
            opacity: loaded ? 0.62 : 0,
          }}
        />

        {/* Cinematic dark scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-transparent to-black/35 z-1" />
        <div className="absolute inset-0 bg-black/30 z-1" />

        {/* Ambient Moving Sunlight Overlay */}
        <div 
          className="absolute -inset-10 bg-[radial-gradient(circle_at_15%_25%,rgba(218,165,32,0.18)_0%,transparent_60%)] mix-blend-screen pointer-events-none animate-sunlight z-2" 
        />

        {/* Floating dust particles */}
        <div className="absolute inset-0 z-2 overflow-hidden pointer-events-none">
          {dustParticles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-white/20 pointer-events-none animate-dust"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div 
        className="relative container mx-auto px-6 lg:px-12 pb-24 pt-32 sm:pt-36 lg:pb-32 z-10"
        style={{
          transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0)`,
          transition: "transform 0.5s cubic-bezier(0.1, 0.9, 0.2, 1)",
        }}
      >
        {/* Editorial Accent line */}
        <div
          className="h-px bg-warm/80 mb-6 transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] delay-300"
          style={{ width: loaded ? "4.5rem" : "0px", opacity: loaded ? 1 : 0 }}
        />

        {/* Subtitle */}
        <div className="overflow-hidden mb-4">
          <p
            className={`text-white/80 text-[10px] sm:text-xs tracking-[0.35em] uppercase drop-shadow-md transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) ${
              loaded ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-4 blur-sm"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            Architect & Interior
          </p>
        </div>

        {/* Main Title */}
        <div className="overflow-hidden mb-8">
          <h1 className="font-serif font-bold text-[36px] sm:text-[46px] md:text-[58px] xl:text-[76px] text-white leading-[0.95] max-w-4xl text-balance drop-shadow-lg">
            <span
              className={`block transition-all duration-[1.2s] cubic-bezier(0.25, 1, 0.5, 1) ${
                loaded ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-8 blur-md"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              NAZ ARCHITECTS
            </span>
            <span
              className={`block text-white/85 mt-2 md:mt-3 text-[0.62em] font-light tracking-[0.16em] uppercase transition-all duration-[1.2s] cubic-bezier(0.25, 1, 0.5, 1) ${
                loaded ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-8 blur-md"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              Consultant's
            </span>
          </h1>
        </div>

        {/* Description */}
        <div className="overflow-hidden mb-10">
          <p
            className={`text-white/60 font-light text-sm sm:text-base max-w-2xl leading-relaxed drop-shadow-md transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) ${
              loaded ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-8 blur-sm"
            }`}
            style={{ transitionDelay: "1000ms" }}
          >
            Crafting exceptional spaces with innovative design, quality materials, and expert execution—based in Balussery.
          </p>
        </div>

        {/* CTA Button */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 transition-all duration-1000 delay-[1200ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#projects"
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            className="group relative inline-flex w-fit items-center justify-center border border-white/30 bg-white/5 text-white text-[10px] sm:text-xs tracking-[0.25em] uppercase px-8 py-4 overflow-hidden backdrop-blur-sm transition-all duration-500 rounded-none shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:border-warm/80 hover:shadow-[0_0_30px_rgba(202,138,4,0.15)]"
            style={{ transition: "transform 0.2s ease-out, border-color 0.5s, box-shadow 0.5s" }}
          >
            {/* Sliding border expander */}
            <span className="absolute inset-0 bg-warm/95 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500">
              View Projects
              <span className="arrow-icon inline-block transition-transform duration-300">→</span>
            </span>
          </a>
        </div>
      </div>

      {/* Cinematic Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-[1400ms] z-10 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-white/40 text-[9px] tracking-[0.35em] uppercase drop-shadow-sm font-light">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/40 animate-bounce-subtle" />
      </div>
    </section>
  );
};

export default Hero;
