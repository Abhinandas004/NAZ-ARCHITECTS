import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Award, Target, Users, TrendingUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const stats = [
  { icon: Award, value: 100, suffix: "+", label: "Projects Completed" },
  { icon: Users, value: 100, suffix: "+", label: "Happy Clients" },
  { icon: Target, value: 4, suffix: "", label: "Core Services" },
  { icon: TrendingUp, value: 100, suffix: "%", label: "Commitment" },
];

const CountUp = ({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <>{count}{suffix}</>;
};

const About = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();

  return (
    <section id="about" className="pt-12 pb-24 lg:pt-16 lg:pb-32 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 -skew-x-12 origin-top-right hidden lg:block" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`max-w-2xl mb-16 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-warm mb-4">About Us</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground transition-all duration-700 delay-100">
            Where form meets function
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
          {/* Main Text */}
          <div
            ref={contentRef}
            className={`lg:col-span-12 transition-all duration-1000 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground/80 leading-snug mb-10 max-w-5xl">
              <span className="text-warm font-bold italic">NAZ Architectures</span> is a modern design and consulting firm dedicated to creating innovative, functional, and aesthetically refined spaces.
            </p>
            
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
              <div className="space-y-6">
                <p className="text-muted-foreground/90 leading-relaxed text-base md:text-lg">
                  We specialize in residential and commercial architecture, delivering designs that perfectly balance creativity, practicality, and client vision. With a strong focus on detail and quality, our approach combines contemporary design principles with efficient space planning.
                </p>
                <p className="text-muted-foreground/90 leading-relaxed text-base md:text-lg">
                  From concept development to execution support, we ensure every project reflects elegance, comfort, and long-term value. Our team works tirelessly to bridge the gap between imagination and structural reality.
                </p>
              </div>

              <div className="relative pl-8 md:pl-12 border-l border-warm/20 flex flex-col justify-center">
                <div className="absolute top-0 left-0 w-1 h-12 bg-warm/40" />
                <p className="font-serif text-lg md:text-xl text-foreground/90 italic leading-relaxed">
                  "At NAZ Architectures, we believe that every space tells a story. Our mission is to transform ideas into inspiring environments that enhance lifestyle and experience."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-px bg-warm/60" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-warm font-semibold">Our Mission</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative p-6 rounded-lg bg-card border border-border/50 text-center group hover:border-warm/30 hover:shadow-lg transition-all duration-500 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-warm/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-5 h-5 text-warm" />
              </div>
              <p className="font-serif text-3xl md:text-4xl text-foreground mb-1">
                <CountUp target={stat.value} suffix={stat.suffix} isVisible={statsVisible} />
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
