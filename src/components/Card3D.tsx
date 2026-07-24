import React, { useRef } from "react";
import { motion } from "motion/react";

interface Card3DProps {
  index: string;
  title: string;
  description: string;
  category?: string;
  price?: string;
  onViewDetails: () => void;
}

export default function Card3D({
  index,
  title,
  description,
  onViewDetails,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const r = card.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    
    // Tilt calculations matching index.html
    const rx2 = ((py / r.height) - 0.5) * -6;
    const ry2 = ((px / r.width) - 0.5) * 6;
    
    card.style.transform = `perspective(700px) rotateX(${rx2}deg) rotateY(${ry2}deg) translateY(-2px)`;
    card.style.setProperty('--mx', `${px}px`);
    card.style.setProperty('--my', `${py}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  return (
    <motion.div
      ref={cardRef}
      id={`card-${index.toLowerCase()}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onViewDetails}
      className="collection-card group relative cursor-pointer select-none hoverable"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, ease: [0.16, 0.9, 0.28, 1] }}
    >
      {/* Card Content with 3D depth */}
      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col h-full relative z-10 items-start pointer-events-none">
        <span className="num font-mono text-[11px] text-bronze-dim tracking-[0.12em] block">
          {index}
        </span>

        <h3 className="font-serif text-[1.6rem] font-normal text-marble mt-[22px] mb-[14px]">
          {title}
        </h3>

        <p className="text-[13.5px] leading-[1.7] text-slate mb-[26px]">
          {description}
        </p>

        <div className="mt-auto">
          <span className="link font-mono text-[11px] tracking-[0.1em] uppercase text-marble border-b border-bronze-dim pb-1 transition-all duration-300 group-hover:border-bronze group-hover:tracking-[0.16em]">
            View Piece
          </span>
        </div>
      </div>
    </motion.div>
  );
}

