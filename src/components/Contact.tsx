import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MapPin, Phone, Briefcase } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    content: (
      <div className="flex flex-col gap-1 z-10">
        <a href="tel:+917559077744" className="text-white text-lg hover:text-warm transition-colors duration-300">
          7559077744
        </a>
        <a href="tel:+918590589890" className="text-white text-lg hover:text-warm transition-colors duration-300">
          8590589890
        </a>
      </div>
    ),
  },
  {
    icon: MapPin,
    label: "Location",
    content: <p className="text-white text-lg z-10">Balussery, Calicut</p>,
  },
  {
    icon: Briefcase,
    label: "Services",
    content: <p className="text-white text-lg z-10">Interior Design · Plans · Labours</p>,
  },
];

const Contact = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.1);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.12);

  // JS magnetic hover logic
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0) scale(1.02)`;
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.transform = `translate3d(0, 0, 0) scale(1)`;
  };

  return (
    <section id="contact" className="py-28 lg:py-36 bg-[#1c1d1f] relative overflow-hidden">
      {/* Blueprint background grid for architect's workspace feeling */}
      <div className="absolute inset-0 blueprint-bg-dark opacity-35 pointer-events-none" />

      {/* Decorative architectural layout details (lines, coordinates, drafting guides) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Compass layout rings */}
          <circle cx="85%" cy="30%" r="180" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="5, 5" />
          <circle cx="85%" cy="30%" r="90" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="85%" y1="10%" x2="85%" y2="50%" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          <line x1="70%" y1="30%" x2="100%" y2="30%" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          
          {/* Rulers / Guides */}
          <line x1="0" y1="40" x2="100%" y2="40" stroke="rgba(252, 211, 77, 0.08)" strokeWidth="1" />
          <line x1="40" y1="0" x2="40" y2="100%" stroke="rgba(252, 211, 77, 0.08)" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-warm/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-warm/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div
          ref={headerRef}
          className={`max-w-2xl mb-20 transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-white/40 mb-4">Get in Touch</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Let's create something remarkable together
          </h2>
          <div className="h-px bg-warm/60 w-24 mt-8" />
        </div>

        {/* Floating Architect workspace Card Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((info, i) => (
            <div
              key={info.label}
              className={`group relative p-8 rounded-none border border-white/5 hover:border-warm/40 bg-[#242629]/45 backdrop-blur-md transition-all duration-700 hover:-translate-y-2 shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(202,138,4,0.06)] ${
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Corner accent lines mimicking trace sheets */}
              <span className="absolute top-0 left-0 w-4 h-px bg-white/10 group-hover:bg-warm/60 transition-colors duration-300" />
              <span className="absolute top-0 left-0 w-px h-4 bg-white/10 group-hover:bg-warm/60 transition-colors duration-300" />
              <span className="absolute bottom-0 right-0 w-4 h-px bg-white/10 group-hover:bg-warm/60 transition-colors duration-300" />
              <span className="absolute bottom-0 right-0 w-px h-4 bg-white/10 group-hover:bg-warm/60 transition-colors duration-300" />

              <div className="w-12 h-12 rounded-none bg-warm/10 flex items-center justify-center mb-6 group-hover:bg-warm group-hover:text-white transition-all duration-500">
                <info.icon className="w-5 h-5 text-warm group-hover:text-white transition-colors duration-500" />
              </div>
              
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 block mb-3 font-mono">
                {info.label}
              </span>
              
              <div className="text-white font-serif tracking-wide">
                {info.content}
              </div>
            </div>
          ))}
        </div>

        {/* Call Us Magnetic CTA Button */}
        <div
          className={`mt-16 flex justify-center transition-all duration-1000 delay-[400ms] ${
            cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="tel:+918590589890"
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            className="group relative inline-flex items-center gap-3 border border-warm/60 text-warm text-xs tracking-[0.25em] uppercase px-12 py-5 rounded-none hover:bg-warm hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(202,138,4,0.05)] hover:shadow-[0_0_30px_rgba(202,138,4,0.2)]"
            style={{ transition: "transform 0.2s ease-out, background-color 0.5s, color 0.5s, border-color 0.5s, box-shadow 0.5s" }}
          >
            <span>Call Us Now</span>
            <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Contact;
