import { Ruler, FileText, HardHat, Package, ArrowRight } from "lucide-react";
import serviceInterior from "@/assets/services/service-interior.webp";
import servicePlans from "@/assets/services/plans_image.webp";
import serviceLabour from "@/assets/services/Labour_image.webp";
import serviceMaterial from "@/assets/services/Material_image.webp";
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
  {
    icon: Package,
    title: "Materials",
    description: "Premium quality construction materials sourced for durability, beauty, and value.",
    image: serviceMaterial,
    features: ["Premium Sourcing", "Cost Optimization", "Eco-Friendly Options"],
  },
];

const Services = () => {
  const { ref, isVisible } = useScrollReveal();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [erroredImages, setErroredImages] = useState<Record<number, boolean>>({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Simulate data fetching delay to show shimmers if there was any real lag
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
    setErroredImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section id="services" className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-secondary/50">
      <div className="container mx-auto px-6 lg:px-12" ref={ref}>
        {/* Header */}
        <div className="mb-16">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {!isDataLoaded ? (
            // Initial Skeletons for the entire grid content
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            ))
          ) : (
            services.map((service, i) => {
              const isHovered = hoveredIndex === i;
              const isImageLoaded = loadedImages[i];

              return (
                <div
                  key={service.title}
                  className={`group relative bg-card rounded-lg overflow-hidden border border-border/50 transition-all duration-700 hover:shadow-xl hover:border-warm/30 hover:-translate-y-2 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Image Container with Shimmer */}
                  <div className="relative overflow-hidden aspect-[4/3] bg-muted">
                    {!isImageLoaded && (
                      <Skeleton className="absolute inset-0 z-10 w-full h-full" />
                    )}
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      onLoad={() => handleImageLoad(i)}
                      onError={() => handleImageError(i)}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                      } ${isHovered ? "scale-110" : ""}`}
                    />
                    {erroredImages[i] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                        <service.icon className="w-8 h-8 text-warm/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent transition-opacity duration-500" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center">
                          <service.icon className="w-4 h-4 text-warm" />
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-primary-foreground drop-shadow-md">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-[11px] tracking-wide uppercase px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground/70 border border-border/50"
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
