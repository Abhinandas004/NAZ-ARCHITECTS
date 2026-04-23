import { CheckCircle2, ShieldCheck, Zap, Award, Users, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "We use premium materials and maintain rigorous standards to ensure the longevity of every project.",
  },
  {
    icon: Award,
    title: "Expert Design",
    description: "Our architectural solutions blend contemporary aesthetics with practical structural integrity.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We respect your time and strictly adhere to project timelines from concept to keys.",
  },
  {
    icon: Zap,
    title: "Innovative Approach",
    description: "Utilizing modern technology and creative thinking to solve complex architectural challenges.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your vision is our priority. We work closely with you to bring your dream space to life.",
  },
  {
    icon: CheckCircle2,
    title: "Complete Transparency",
    description: "Clear communication, honest pricing, and regular updates throughout the construction process.",
  },
];

const WhyUs = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="why-us" className="pt-8 pb-24 lg:pt-12 lg:pb-32 bg-secondary/50">
      <div className="container mx-auto px-6 lg:px-12" ref={ref}>
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p
            className={`text-sm tracking-[0.3em] uppercase text-warm mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            Our Edge
          </p>
          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-5xl text-foreground transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Why Choose NAZ Architects?
          </h2>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className={`flex gap-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-warm">
                  <reason.icon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3 tracking-wide">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
