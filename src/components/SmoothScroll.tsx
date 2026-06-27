import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Bind Lenis scroll events to document.documentElement for scroll-driven animations
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      document.documentElement.style.setProperty("--scroll-y", `${scrollPos}px`);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
};

export default SmoothScroll;
