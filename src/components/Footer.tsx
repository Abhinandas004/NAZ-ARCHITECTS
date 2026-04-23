import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import logo from "@/assets/logo/logo.webp";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer ref={ref} className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <img src={logo} alt="NAZ Architects Consultants" className="w-8 h-8 object-contain" />
              <p className="font-serif text-lg tracking-wide text-foreground">
                NAZ<span className="text-warm"> ARCHITECTS</span> <span className="text-muted-foreground text-sm">Consultant's</span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground">Balussery</p>
          </div>

          <div className="flex items-center gap-8 text-xs tracking-widest uppercase text-muted-foreground">
            {["Projects", "About", "Services", "Team", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-foreground transition-colors duration-300 hidden md:block"
              >
                {item}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NAZ Architects Consultant's
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
