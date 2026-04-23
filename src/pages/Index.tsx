import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import NetworkStatus from "@/components/NetworkStatus";

const Index = () => {
  return (
    <div className="min-h-screen">
      <NetworkStatus />
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      <WhyUs />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
