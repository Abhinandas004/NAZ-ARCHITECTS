import { useEffect, useState } from "react";

const PageIntroLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<"logo" | "draw" | "fade-out" | "done">("logo");

  useEffect(() => {
    // 1. Logo phase (0 to 800ms)
    const phase2Timer = setTimeout(() => {
      setPhase("draw");
    }, 800);

    // 2. Percent counter (0 to 100 over 2.2 seconds)
    const duration = 2000;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let step = 0;

    const counterInterval = setInterval(() => {
      step++;
      const nextPercent = Math.min(100, Math.floor((step / steps) * 100));
      setPercent(nextPercent);
      if (nextPercent === 100) {
        clearInterval(counterInterval);
        setPhase("fade-out");
        
        // 3. Complete and unmount after fadeout completes
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 800);
      }
    }, intervalTime);

    return () => {
      clearTimeout(phase2Timer);
      clearInterval(counterInterval);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#0c0d0e] flex flex-col items-center justify-center transition-all duration-[800ms] cubic-bezier(0.85, 0, 0.15, 1) ${
        phase === "fade-out" ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <style>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-blueprint {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: drawLine 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .grid-line {
          opacity: 0.03;
          stroke: #ffffff;
        }
      `}</style>

      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" />
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative flex flex-col items-center max-w-sm w-full px-8 text-center">
        {/* Logo Text */}
        <div
          className={`transition-all duration-700 ${
            phase === "logo" ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <h2 className="font-serif text-3xl tracking-[0.25em] text-white">
            NAZ<span className="text-warm"> ARCHITECTS</span>
          </h2>
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/50 mt-1">Consultants</p>
        </div>

        {/* Blueprint House Drawing Animating */}
        <div
          className={`w-64 h-48 my-6 transition-all duration-1000 ${
            phase === "logo" ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <svg viewBox="0 0 160 120" className="w-full h-full fill-none">
            {/* Ground line */}
            <line
              x1="10"
              y1="95"
              x2="150"
              y2="95"
              stroke="rgba(202, 138, 4, 0.4)"
              strokeWidth="0.75"
              className="animate-blueprint"
            />
            {/* House Structure */}
            <path
              d="M 30,95 L 30,45 L 85,45 L 85,95 Z"
              stroke="rgba(255, 255, 255, 0.65)"
              strokeWidth="1"
              className="animate-blueprint"
            />
            {/* Cantilever/Upper Level */}
            <path
              d="M 60,45 L 60,20 L 130,20 L 130,70 L 85,70"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.25"
              className="animate-blueprint"
            />
            {/* Details and Glass Panels */}
            <rect
              x="40"
              y="55"
              width="30"
              height="40"
              stroke="rgba(202, 138, 4, 0.35)"
              strokeWidth="0.5"
              className="animate-blueprint"
            />
            <rect
              x="75"
              y="30"
              width="45"
              height="30"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.75"
              className="animate-blueprint"
            />
            <line
              x1="97"
              y1="30"
              x2="97"
              y2="60"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="0.5"
              className="animate-blueprint"
            />
            {/* Horizontal architectural guides */}
            <line
              x1="15"
              y1="20"
              x2="145"
              y2="20"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="0.5"
              strokeDasharray="2, 2"
              className="animate-blueprint"
            />
            <line
              x1="15"
              y1="45"
              x2="145"
              y2="45"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="0.5"
              strokeDasharray="2, 2"
              className="animate-blueprint"
            />
          </svg>
        </div>

        {/* Counter and Text */}
        <div
          className={`flex flex-col items-center gap-2 transition-all duration-700 ${
            phase === "logo" ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="font-mono text-xs tracking-widest text-warm">
            {percent.toString().padStart(3, "0")}%
          </span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/30">
            Drawing Architectural Journey...
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageIntroLoader;
