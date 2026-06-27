import { useState } from "react";
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
import PageIntroLoader from "@/components/PageIntroLoader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <PageIntroLoader onComplete={() => setIntroComplete(true)} />
      
      {introComplete && (
        <div className="min-h-screen text-foreground selection:bg-warm/30 transition-opacity duration-1000 ease-out opacity-100">
          <SmoothScroll />
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
      )}
    </>
  );
};

export default Index;
