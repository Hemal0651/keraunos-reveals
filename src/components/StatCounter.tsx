import React, { useEffect, useState, useRef } from "react";
import { useInView, motion } from "motion/react";

interface StatCounterProps {
  target: number;
  label: string;
  suffix?: string;
}

export default function StatCounter({ target, label, suffix }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!isInView) return;

    let active = true;
    const duration = 1500; // 1.5s as matched to index.html
    const startTime = performance.now();

    const step = (now: number) => {
      if (!active) return;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);

    return () => {
      active = false;
    };
  }, [isInView, target]);

  return (
    <div
      ref={ref}
      id={`stat-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
      className="stat"
    >
      <span className="num">
        {count}
        {suffix && <span className="suffix">{suffix}</span>}
      </span>
      <div className="label">
        {label}
      </div>
    </div>
  );
}
