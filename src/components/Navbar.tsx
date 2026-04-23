import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo/logo.webp";

const navItems = ["Projects", "Services", "Why Us", "About", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const scrolledPastTop = scrollPos > 50;
      setScrolled(scrolledPastTop);

      // 1. Hero check - immediately clear if at home or near top
      if (scrollPos < 120) {
        setActiveSection("");
        return;
      }

      // 2. Bottom of page check
      const atBottom = window.innerHeight + scrollPos >= document.documentElement.scrollHeight - 80;
      if (atBottom) {
        setActiveSection("contact");
        return;
      }

      // 3. Section detection
      const sections = navItems.map((item) => item.toLowerCase().replace(/\s+/g, "-"));
      let current = "";
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 100;
          if (scrollPos + offset >= element.offsetTop) {
            current = sectionId;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm py-0"
            : "bg-transparent py-2"
        }`}
      >
        {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-hero-top-scrim" />}

        <div className="relative container mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <a
            href="#"
            className={`flex items-center gap-2 font-serif text-sm sm:text-base lg:text-lg leading-none tracking-wide transition-colors duration-500 text-shadow-soft ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            <img src={logo} alt="NAZ Architects Consultants" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            <span className="flex flex-col leading-tight">
              <span className="flex items-baseline gap-1">
                <span>NAZ</span>
                <span
                  className={`transition-colors duration-500 ${
                    scrolled ? "text-warm" : "text-primary-foreground/88"
                  }`}
                >
                  ARCHITECTS
                </span>
              </span>
              <span
                className={`text-[10px] sm:text-xs tracking-[0.18em] transition-colors duration-500 ${
                  scrolled ? "text-foreground/72" : "text-primary-foreground/78"
                }`}
              >
                Consultant's
              </span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-10 text-xs lg:text-sm tracking-widest uppercase font-normal">
            {navItems.map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={(e) => {
                  setMobileOpen(false);
                  e.currentTarget.blur();
                }}
                className={`relative inline-block transition-all duration-500 whitespace-nowrap outline-none focus:outline-none ${
                  activeSection === item.toLowerCase().replace(/\s+/g, "-") 
                    ? "after:w-full font-medium" 
                    : "after:w-0 font-normal"
                } after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-warm after:transition-all after:duration-300 ${
                  scrolled
                    ? activeSection === item.toLowerCase().replace(/\s+/g, "-") ? "text-warm" : "text-foreground/30 hover:text-foreground/60 focus:text-foreground/30"
                    : activeSection === item.toLowerCase().replace(/\s+/g, "-") ? "text-white" : "text-white/30 hover:text-white/70 focus:text-white/30"
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {item}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden relative z-[60] w-10 h-10 flex items-center justify-center transition-colors duration-300 ${
              mobileOpen
                ? "text-foreground"
                : scrolled
                  ? "text-foreground"
                  : "text-primary-foreground"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[55] bg-background/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 p-2 text-white/80 hover:text-white hover:rotate-90 hover:scale-110 transition-all duration-300 md:hidden"
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>
        {navItems.map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setMobileOpen(false)}
            className={`font-serif text-3xl block transition-all duration-500 ${
              activeSection === item.toLowerCase().replace(/\s+/g, "-") ? "text-warm" : "text-white/85 hover:text-white"
            } ${
              mobileOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: mobileOpen ? `${i * 80 + 200}ms` : "0ms" }}
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
