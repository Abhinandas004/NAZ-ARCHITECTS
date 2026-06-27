import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import logo from "@/assets/logo/logo.webp";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <footer ref={ref} className="py-20 bg-[#0c0d0e] border-t border-white/5 relative overflow-hidden">
      {/* Evening garden / landscape silhouette line illustration overlay */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none opacity-[0.03] z-0">
        <svg className="w-full h-32" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Garden / trees outline */}
          <path d="M0 120 C 120 100, 240 100, 360 120 C 480 90, 600 110, 720 120 C 840 95, 960 105, 1080 120 C 1200 90, 1320 100, 1440 120 Z" fill="rgba(255, 255, 255, 0.4)" />
          {/* Subtle facade silhouette line */}
          <rect x="250" y="40" width="120" height="80" stroke="white" strokeWidth="1" />
          <rect x="750" y="20" width="180" height="100" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Logo brand info */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="NAZ Architects" 
                className="w-8 h-8 object-contain" 
              />
              <p className="font-serif text-xl tracking-wider text-white">
                NAZ<span className="text-warm font-semibold"> ARCHITECTS</span>
              </p>
            </div>
            <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-mono">
              Balussery · Calicut · Kerala
            </span>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] tracking-[0.25em] uppercase text-white/45">
            {["Projects", "Services", "Why Us", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-warm transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social / Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <div className="flex gap-4 mb-1 text-[10px] tracking-widest text-white/40 uppercase">
              <a href="https://wa.me/918590589890" target="_blank" rel="noreferrer" className="hover:text-warm transition-colors duration-300">WhatsApp</a>
              <span>·</span>
              <a href="https://www.instagram.com/naz_architect_clt/" target="_blank" rel="noopener noreferrer" className="hover:text-warm transition-colors duration-300">Instagram</a>
            </div>
            <p className="text-[10px] tracking-wider text-white/30 font-light">
              © {new Date().getFullYear()} NAZ Architects Consultant's. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
