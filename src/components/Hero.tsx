import heroPoster from "@/assets/hero/hero-architecture.webp";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-background">
      <div className="absolute inset-0">
        {!loaded && <Skeleton className="absolute inset-0 z-10 w-full h-full rounded-none" />}
        <img
          src={heroPoster}
          alt="Architectural Design"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          className={`w-full h-full object-cover transition-all duration-[2s] ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        />
        {error && (
          <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center">
            <span className="text-white/40 text-xs tracking-widest uppercase">Image Load Error</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-12 pb-20 pt-32 sm:pt-36 lg:pb-28">
        <div
          className={`h-px bg-warm mb-8 transition-all duration-1000 delay-300 ${loaded ? "w-16 opacity-100" : "w-0 opacity-0"}`}
        />

        <div className="overflow-hidden">
          <p
            className={`text-white/90 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 drop-shadow-md transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
              }`}
          >
            Architect & Interior
          </p>
        </div>

        <div className="overflow-hidden">
          <h1
            className={`font-serif font-bold text-[32px] sm:text-[38px] md:text-[50px] xl:text-[62px] text-white leading-[0.95] max-w-4xl text-balance drop-shadow-lg transition-all duration-700 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
              }`}
          >
            <span className="block">NAZ ARCHITECTS</span>
            <span className="block text-white/85 mt-2 md:mt-3 text-[0.65em] font-normal tracking-wide">Consultant's</span>
          </h1>
        </div>

        <div className="overflow-hidden">
          <p
            className={`text-white/60 font-light text-sm sm:text-base mt-8 md:mt-10 max-w-2xl drop-shadow-md transition-all duration-700 delay-[900ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
              }`}
          >
            Crafting exceptional spaces with innovative design, quality materials, and expert execution-based in Balussery.
          </p>
        </div>
        <div
          className={`mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 transition-all duration-700 delay-[1100ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <a
            href="#projects"
            className="group relative inline-flex w-fit items-center justify-center border border-white/60 bg-white/10 text-white text-[10px] sm:text-sm tracking-widest uppercase px-5 py-2.5 sm:px-8 sm:py-4 overflow-hidden backdrop-blur-sm transition-colors duration-500"
          >
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative group-hover:text-foreground transition-colors duration-500 drop-shadow-sm">
              View Projects
            </span>
          </a>

        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-[1400ms] ${loaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase drop-shadow-sm">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/60 animate-bounce-subtle" />
      </div>
    </section>
  );
};

export default Hero;
