import { useState, useEffect } from "react";
import projectsVideo from "@/assets/WhatsApp Video 2026-04-12 at 3.17.07 PM.mp4";
import projectPoster from "@/assets/hero/hero-architecture.webp";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Skeleton } from "@/components/ui/skeleton";

const extractImages = (globMap: Record<string, any>) => {
  return Object.values(globMap).map((m: any) => typeof m === "string" ? m : m?.default || m) as string[];
};

const bedroomImages = extractImages(import.meta.glob("@/assets/bedroom/*.{jpeg,jpg,png,JPG,JPEG,webp}", { eager: true }));
const livingImages = extractImages(import.meta.glob("@/assets/living/*.{jpeg,jpg,png,JPG,JPEG,webp}", { eager: true }));
const kitchenImages = extractImages(import.meta.glob("@/assets/kitchen/*.{jpeg,jpg,png,JPG,JPEG,webp}", { eager: true }));

const ProjectSlideshow = ({ images, title, delayClass, isVisible, className = "" }: { images: string[], title: string, delayClass: string, isVisible: boolean, className?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (images.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000); // Slightly slower for better UX
    }
    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl transition-all duration-1000 group cursor-pointer bg-muted ${delayClass} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {images.map((img, idx) => (
        <div key={img} className="absolute inset-0">
          {!loadedImages[idx] && (
            <Skeleton className="absolute inset-0 z-10 w-full h-full" />
          )}
          <img
            src={img}
            alt={`${title} Preview ${idx + 1}`}
            onLoad={() => handleImageLoad(idx)}
            onError={() => handleImageError(idx)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentIndex && loadedImages[idx] ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors duration-700 group-hover:bg-black/40 z-20 pointer-events-none">
        <h3 className="text-white text-xl md:text-2xl font-bold uppercase tracking-widest drop-shadow-md transition-transform duration-700 group-hover:scale-110">
          {title}
        </h3>
      </div>
    </div>
  );
};

const Projects = () => {
  const { ref, isVisible } = useScrollReveal();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section id="projects" className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12" ref={ref}>
        {/* Header */}
        <div className="mb-16">
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
              Explore our carefully crafted spaces, built around your comfort and lifestyle.
            </p>
          </div>
        </div>

        {/* Projects Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Row 1: Video (Left) & Kitchen (Right) */}
          <div
            className={`group relative md:col-span-8 aspect-video md:aspect-auto md:h-[400px] lg:h-[450px] overflow-hidden rounded-xl transition-all duration-1000 bg-muted ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {!isVideoLoaded && (
              <Skeleton className="absolute inset-0 z-10 w-full h-full" />
            )}
            <video
              src={projectsVideo}
              poster={projectPoster}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              onError={() => setIsVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                isVideoLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
              } group-hover:scale-105`}
            />
          </div>

          <ProjectSlideshow
            images={kitchenImages}
            title="Kitchen"
            delayClass="delay-100"
            isVisible={isVisible}
            className="md:col-span-4 aspect-square md:aspect-auto"
          />

          {/* Row 2: Bedroom (Left) & Living (Right) */}
          <ProjectSlideshow
            images={bedroomImages}
            title="Bedroom"
            delayClass="delay-200"
            isVisible={isVisible}
            className="md:col-span-6 aspect-square md:aspect-[16/9]"
          />
          
          <ProjectSlideshow
            images={livingImages}
            title="Living"
            delayClass="delay-300"
            isVisible={isVisible}
            className="md:col-span-6 aspect-square md:aspect-[16/9]"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
