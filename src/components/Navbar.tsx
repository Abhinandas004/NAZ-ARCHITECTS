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
      const scrolledPastTop = scrollPos > 40;
      setScrolled(scrolledPastTop);

      // 1. Hero check - clear active indicator if near top
      if (scrollPos < 120) {
        setActiveSection("");
        return;
      }

      // 2. Bottom of page check
      const atBottom = window.innerHeight + scrollPos >= document.documentElement.scrollHeight - 100;
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
          const offset = 140; // larger offset for luxury spacing
          if (scrollPos + offset >= element.offsetTop) {
            current = sectionId;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileOpen(false);

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Find Lenis instance or do smooth scroll element scroll
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[600ms] cubic-bezier(0.25, 1, 0.5, 1) ${
          scrolled
            ? "bg-[#fdfcf9]/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.02)] h-16"
            : "bg-transparent h-24"
        }`}
      >
        {/* Scrim overlay for transparency state */}
        {!scrolled && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-hero-top-scrim transition-opacity duration-500" />
        )}

        <div className="relative container mx-auto px-6 lg:px-12 flex items-center justify-between h-full">
          {/* Logo brand */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, "root")}
            className={`flex items-center gap-3 font-serif transition-colors duration-500 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            <img
              src={logo}
              alt="NAZ Architects"
              className={`object-contain transition-all duration-[600ms] cubic-bezier(0.25, 1, 0.5, 1) ${
                scrolled ? "w-8 h-8 sm:w-9 sm:h-9" : "w-10 h-10 sm:w-11 sm:h-11"
              }`}
            />
            <span className="flex flex-col leading-tight">
              <span className="flex items-baseline gap-1">
                <span className="font-semibold tracking-wider text-sm sm:text-base">NAZ</span>
                <span
                  className={`text-xs sm:text-sm transition-colors duration-500 ${
                    scrolled ? "text-warm font-semibold" : "text-white/80"
                  }`}
                >
                  ARCHITECTS
                </span>
              </span>
              <span
                className={`text-[8px] sm:text-[9px] tracking-[0.25em] uppercase transition-colors duration-500 ${
                  scrolled ? "text-foreground/60" : "text-white/60"
                }`}
              >
                Consultant's
              </span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-xs tracking-[0.2em] uppercase font-medium">
            {navItems.map((item) => {
              const sectionId = item.toLowerCase().replace(/\s+/g, "-");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item}
                  href={`#${sectionId}`}
                  onClick={(e) => handleLinkClick(e, sectionId)}
                  className={`relative py-2 transition-colors duration-500 outline-none select-none group ${
                    scrolled
                      ? isActive
                        ? "text-warm font-semibold"
                        : "text-foreground/50 hover:text-foreground"
                      : isActive
                        ? "text-white font-semibold"
                        : "text-white/55 hover:text-white"
                  }`}
                >
                  {item}
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-warm transition-all duration-500 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden relative z-[60] w-10 h-10 flex items-center justify-center transition-colors duration-300 ${
              mobileOpen
                ? "text-foreground"
                : scrolled
                  ? "text-foreground"
                  : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6 animate-pulse" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-[#fdfcf9]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-[600ms] cubic-bezier(0.85, 0, 0.15, 1) ${
          mobileOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 p-2 text-foreground/60 hover:text-foreground hover:rotate-90 hover:scale-110 transition-all duration-300 md:hidden"
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>
        
        {navItems.map((item, i) => {
          const sectionId = item.toLowerCase().replace(/\s+/g, "-");
          const isActive = activeSection === sectionId;
          return (
            <a
              key={item}
              href={`#${sectionId}`}
              onClick={(e) => handleLinkClick(e, sectionId)}
              className={`font-serif text-3xl block transition-all duration-500 transform ${
                isActive ? "text-warm scale-105" : "text-foreground/70 hover:text-foreground"
              } ${
                mobileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: mobileOpen ? `${i * 80 + 150}ms` : "0ms" }}
            >
              {item}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
