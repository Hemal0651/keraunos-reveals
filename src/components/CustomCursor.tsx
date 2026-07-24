import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Disable custom cursor on mobile or devices with no fine pointers
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasFinePointer) {
      return;
    }

    setIsHidden(false);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Render loop for ring interpolation
    let animationFrameId: number;
    const render = () => {
      // Smooth linear interpolation for the outer ring trailing effect
      const ease = 0.15;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Detect hoverable targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isHoverable = 
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".hoverable") ||
        target.closest("[role='button']") ||
        target.closest(".tilt-card") ||
        target.classList.contains("detail-item");

      if (isHoverable) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        id="cursor-dot"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-marble rounded-full pointer-events-none z-999 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      {/* Dragging Halo Ring */}
      <div
        ref={ringRef}
        id="cursor-ring"
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-998 border border-bronze/60 transition-[width,height,background-color,border-color] duration-300 ${
          isHovering
            ? "w-14 h-14 bg-bronze-glow/10 border-marble"
            : "w-8 h-8 bg-transparent border-bronze/60"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}
