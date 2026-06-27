import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Award, Target, Users, TrendingUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const stats = [
  { icon: Award, value: 100, suffix: "+", label: "Projects Completed" },
  { icon: Users, value: 100, suffix: "+", label: "Happy Clients" },
  { icon: Target, value: 3, suffix: "", label: "Core Services" },
  { icon: TrendingUp, value: 100, suffix: "%", label: "Commitment" },
];

const CountUp = ({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1800;
    const steps = 50;
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
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.1);
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal(0.12);
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal(0.15);

  const quoteText = `"At NAZ Architectures, we believe that every space tells a story. Our mission is to transform ideas into inspiring environments that enhance lifestyle and experience."`;
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!contentVisible) return;
    
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedQuote(quoteText.slice(0, index + 1));
      index++;
      if (index >= quoteText.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [contentVisible]);

  return (
    <section id="about" className="pt-28 pb-24 lg:pt-36 lg:pb-32 relative overflow-hidden bg-[#fdfcf9]">
      <style>{`
        @keyframes panBlueprint {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 160px 160px;
          }
        }
        .blueprint-animate {
          animation: panBlueprint 40s linear infinite;
        }
      `}</style>

      {/* Blueprint Moving Grid Background Accent */}
      <div className="absolute inset-0 blueprint-bg opacity-40 blueprint-animate pointer-events-none" />

      {/* Elegant warm gradient circle */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-warm/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div
          ref={headerRef}
          className={`max-w-2xl mb-20 transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-warm mb-4">About Us</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            Where Form Meets Function
          </h2>
          <div className="h-px bg-warm/20 w-32 mt-6" />
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-24" ref={contentRef}>
          {/* Left Text Block */}
          <div
            className={`lg:col-span-7 space-y-8 transition-all duration-[1.2s] ${
              contentVisible ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-12 blur-sm"
            }`}
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-foreground/90 leading-snug tracking-wide">
              <span className="text-warm font-bold italic">NAZ Architectures</span> is a modern design and consulting firm dedicated to creating innovative, functional, and aesthetically refined spaces.
            </h3>
            
            <div className="space-y-6 text-muted-foreground/80 leading-relaxed font-light text-base md:text-lg">
              <p>
                We specialize in residential and commercial architecture, delivering designs that perfectly balance creativity, practicality, and client vision. With a strong focus on detail and quality, our approach combines contemporary design principles with efficient space planning.
              </p>
              <p>
                From concept development to execution support, we ensure every project reflects elegance, comfort, and long-term value. Our team works tirelessly to bridge the gap between imagination and structural reality.
              </p>
            </div>
          </div>

          {/* Right Floating Glass Card (Mission Statement) */}
          <div
            className={`lg:col-span-5 relative flex items-center transition-all duration-[1.5s] delay-200 ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            {/* Growing Vertical Divider Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-warm/15 hidden lg:block">
              <div
                className={`w-full bg-warm/80 transition-all duration-[2s] ease-in-out ${
                  contentVisible ? "h-full" : "h-0"
                }`}
              />
            </div>

            <div className="w-full pl-0 lg:pl-12">
              {/* Mission Glass Card */}
              <div 
                className={`relative p-8 md:p-10 bg-white/40 backdrop-blur-md border rounded-none overflow-hidden transition-all duration-[1.2s] ${
                  typingDone 
                    ? "border-warm/30 shadow-[0_25px_60px_rgba(202,138,4,0.06)] bg-warm/[0.01]" 
                    : "border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
                }`}
              >
                {/* Growing side line mimicking a pen line */}
                <span 
                  className="absolute top-0 left-0 w-1.5 bg-warm transition-all duration-[1.2s] ease-out" 
                  style={{ height: typingDone ? "4.5rem" : "0px" }}
                />

                <p className="font-serif text-lg md:text-xl text-foreground/90 italic leading-relaxed min-h-[140px]">
                  {displayedQuote}
                  {!typingDone && (
                    <span className="inline-block w-[3px] h-[18px] bg-warm ml-1 animate-pulse align-middle" />
                  )}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <div 
                    className="h-px bg-warm/60 transition-all duration-[1s]" 
                    style={{ width: typingDone ? "2.5rem" : "0px" }}
                  />
                  <span 
                    className="text-[9px] tracking-[0.25em] uppercase text-warm font-semibold transition-all duration-[1s] delay-300"
                    style={{ 
                      opacity: typingDone ? 1 : 0,
                      transform: typingDone ? "translateY(0)" : "translateY(4px)"
                    }}
                  >
                    Our Mission
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative p-8 bg-[#fdfcf9] border border-black/5 text-center group hover:border-warm/30 hover:shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-500 ${
                statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="w-12 h-12 rounded-none bg-warm/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-warm group-hover:text-white transition-all duration-500">
                <stat.icon className="w-5 h-5 text-warm group-hover:text-white transition-colors duration-500" />
              </div>
              <p className="font-serif text-3xl md:text-4xl text-foreground mb-2 font-semibold">
                <CountUp target={stat.value} suffix={stat.suffix} isVisible={statsVisible} />
              </p>
              <p className="text-xs tracking-wider uppercase text-muted-foreground font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
