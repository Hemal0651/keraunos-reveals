import React, { useEffect, useRef } from "react";

interface RevealLayerProps {
  cursorPos: { x: number; y: number };
  radius: number;
}

export default function RevealLayer({ cursorPos, radius }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskDivRef = useRef<HTMLDivElement>(null);

  // Resize listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update canvas and mask on every render of RevealLayer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cursorX = cursorPos.x;
    const cursorY = cursorPos.y;
    const r = radius;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (r > 0.5) {
      // Create radial gradient with the specified stops
      const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, r);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.4, "rgba(255,255,255,1)");
      grad.addColorStop(0.6, "rgba(255,255,255,0.75)");
      grad.addColorStop(0.75, "rgba(255,255,255,0.4)");
      grad.addColorStop(0.88, "rgba(255,255,255,0.12)");
      grad.addColorStop(1, "rgba(255,255,255,0)");

      // Draw circle
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, r, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Convert to data URL and apply webkit/standard mask styles
    if (maskDivRef.current) {
      try {
        const maskUrl = canvas.toDataURL();
        maskDivRef.current.style.maskImage = `url(${maskUrl})`;
        maskDivRef.current.style.webkitMaskImage = `url(${maskUrl})`;
        maskDivRef.current.style.maskSize = "100% 100%";
        maskDivRef.current.style.webkitMaskSize = "100% 100%";
      } catch (err) {
        console.error("Canvas masking error: ", err);
      }
    }
  });

  return (
    <>
      {/* Hidden canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Reveal layer div showing BG_IMAGE_2 */}
      <div
        ref={maskDivRef}
        className="absolute inset-0 bg-[url(/a2.png)] bg-center bg-cover bg-no-repeat pointer-events-none z-[2]"
      />
    </>
  );
}
