import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [cursorState, setCursorState] = useState<"default" | "view" | "open" | "drag" | "explore">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (is not touch-only)
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    const mouse = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Lerp the outer ring for smooth lag/momentum effect
    let rafId: number;
    const tick = () => {
      const lerpFactor = 0.12; // Smooth elastic lag
      ring.x += (mouse.x - ring.x) * lerpFactor;
      ring.y += (mouse.y - ring.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    // Event delegation to detect interactive states
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorAttr) {
        setCursorState(cursorAttr as any);
      } else if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setCursorState("explore");
      } else {
        setCursorState("default");
      }
    };

    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Don't render cursor on mobile/touch screens
  const hasHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
  if (!hasHover || !isVisible) return null;

  return (
    <>
      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-warm rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-warm pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out pointer-events-none ${
          cursorState === "default"
            ? "w-8 h-8 opacity-45"
            : cursorState === "view"
            ? "w-16 h-16 bg-warm/15 border-warm scale-110 opacity-100"
            : cursorState === "open"
            ? "w-16 h-16 bg-warm/20 border-warm/85 scale-110 opacity-100"
            : cursorState === "drag"
            ? "w-14 h-14 bg-warm/10 border-warm scale-100 opacity-100"
            : "w-12 h-12 bg-warm/10 border-warm scale-110 opacity-90"
        }`}
        style={{ willChange: "transform" }}
      >
        {cursorState !== "default" && cursorState !== "explore" && (
          <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-foreground select-none">
            {cursorState}
          </span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
