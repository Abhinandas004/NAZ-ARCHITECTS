import { Ruler, FileText, HardHat } from "lucide-react";
import serviceInterior from "@/assets/services/service-interior.webp";
import servicePlans from "@/assets/services/plans_image.webp";
import serviceLabour from "@/assets/services/Labour_image.webp";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const services = [
  {
    icon: Ruler,
    title: "Interior Design",
    description: "Thoughtfully curated interiors that blend aesthetics with functionality for every space.",
    image: serviceInterior,
    features: ["Space Planning", "Color Consultation", "Furniture Selection"],
  },
  {
    icon: FileText,
    title: "Plans",
    description: "Detailed architectural plans and blueprints tailored to your vision and requirements.",
    image: servicePlans,
    features: ["2D & 3D Drawings", "Structural Plans", "Site Analysis"],
  },
  {
    icon: HardHat,
    title: "Labours",
    description: "Skilled and experienced workforce to bring your architectural vision to life with precision.",
    image: serviceLabour,
    features: ["Skilled Workers", "Project Management", "Quality Assurance"],
  },
];

const Services = () => {
  const { ref, isVisible } = useScrollReveal(0.12);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoaded(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  // JS 3D Tilt Effect on mouse moves
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Rotate relative to center (-8deg to 8deg)
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
  };

  return (
    <section id="services" className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#eae7e0]">
      <div className="container mx-auto px-6 lg:px-12" ref={ref}>
        {/* Header */}
        <div className="mb-20">
          <div className="max-w-xl">
            <p
              className={`text-sm tracking-[0.3em] uppercase text-warm mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              What We Do
            </p>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl text-foreground transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Our Services
            </h2>
            <p
              className={`text-muted-foreground mt-6 text-sm leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              From concept to completion, we offer comprehensive architectural services that transform your vision into reality.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!isDataLoaded ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full bg-neutral-200/50" />
                <Skeleton className="h-6 w-3/4 bg-neutral-200/50" />
                <Skeleton className="h-20 w-full bg-neutral-200/50" />
              </div>
            ))
          ) : (
            services.map((service, i) => {
              const isImageLoaded = loadedImages[i];
              const displayNum = (i + 1).toString().padStart(2, "0");

              return (
                <div
                  key={service.title}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className={`group relative bg-[#fdfcf9] rounded-none overflow-hidden border border-black/5 transition-all duration-500 ease-out sweep-hover shadow-[0_4px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: `${i * 150}ms`,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  {/* Huge background number behind content */}
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-serif text-[120px] font-black text-black/[0.02] select-none pointer-events-none group-hover:text-warm/[0.04] group-hover:scale-110 transition-all duration-700">
                    {displayNum}
                  </span>

                  {/* Image Container with Zoom */}
                  <div className="relative overflow-hidden aspect-[4/3] bg-neutral-200">
                    {!isImageLoaded && (
                      <Skeleton className="absolute inset-0 z-10 w-full h-full bg-neutral-300" />
                    )}
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      onLoad={() => handleImageLoad(i)}
                      className={`w-full h-full object-cover transition-all duration-1000 ${
                        isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                      } group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90" />
                    
                    {/* Header Details */}
                    <div className="absolute bottom-4 left-5 right-5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md">
                        <service.icon className="w-4 h-4 text-warm" />
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-white drop-shadow-md">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description & Features */}
                  <div className="p-6 relative z-10">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 min-h-[48px]">
                      {service.description}
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-black/[0.05]">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-[10px] tracking-widest uppercase px-3 py-1 bg-secondary/40 text-foreground/80 border border-black/5 font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
