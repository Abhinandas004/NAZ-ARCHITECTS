import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MapPin, Phone, Briefcase, ArrowUpRight } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    content: (
      <div className="flex flex-col gap-1">
        <a href="tel:+917559077744" className="text-primary-foreground text-lg hover:text-warm transition-colors duration-300">
          7559077744
        </a>
        <a href="tel:+918590589890" className="text-primary-foreground text-lg hover:text-warm transition-colors duration-300">
          8590589890
        </a>
      </div>
    ),
  },
  {
    icon: MapPin,
    label: "Location",
    content: <p className="text-primary-foreground text-lg">Balussery</p>,
  },
  {
    icon: Briefcase,
    label: "Services",
    content: <p className="text-primary-foreground text-lg">Interior Design · Plans · Labours · Materials</p>,
  },
];

const Contact = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();

  return (
    <section id="contact" className="py-24 lg:py-32 bg-foreground relative overflow-hidden">
      {/* Subtle accent shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-warm/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-warm/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`max-w-2xl mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary-foreground/40 mb-4">Get in Touch</p>
          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground transition-all duration-700 delay-100 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Let's create something remarkable together
          </h2>
          <div
            className={`h-px bg-warm mt-6 transition-all duration-1000 delay-300 ${
              headerVisible ? "w-16 opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>

        {/* Contact Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {contactInfo.map((info, i) => (
            <div
              key={info.label}
              className={`group p-8 rounded-lg border border-primary-foreground/10 hover:border-warm/30 bg-primary-foreground/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-warm/10 flex items-center justify-center mb-5 group-hover:bg-warm/20 transition-colors duration-300">
                <info.icon className="w-5 h-5 text-warm" />
              </div>
              <p className="text-primary-foreground/40 text-sm uppercase tracking-widest mb-3">{info.label}</p>
              {info.content}
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div
          className={`mt-12 flex justify-center transition-all duration-700 delay-500 ${
            cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="tel:+918590589890"
            className="group inline-flex items-center gap-3 border border-warm/50 text-warm text-sm tracking-widest uppercase px-12 py-4 rounded-lg hover:bg-warm hover:text-primary-foreground transition-all duration-500 min-w-[200px] justify-center"
          >
            <span>Call Us Now</span>
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
