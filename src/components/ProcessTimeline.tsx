import { useRef } from "react";
import { useInView } from "motion/react";
import { ProcessStep } from "../types";

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <div ref={containerRef} id="process-timeline" className="process-track">
      {/* Desktop Horizontal Connect Line */}
      <div className="process-line" />
      
      {/* Interactive horizontal fill line */}
      <div className={`process-line-fill ${isInView ? "filled" : ""}`} style={{ top: "11px" }} />

      {/* Steps List */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-0 relative z-10">
        {steps.map((item) => (
          <div
            key={item.step}
            id={`step-${item.step}`}
            className="step flex-1 min-w-[200px] flex flex-col group pr-6 relative"
          >
            {/* Step dot */}
            <div className="flex items-center gap-4 md:flex-col md:items-start mb-0">
              <div className="dot select-none">
                {item.step}
              </div>
            </div>

            {/* Step Body */}
            <div>
              <h4 className="font-serif text-[1.25rem] font-normal text-marble mb-2.5 transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-[13px] leading-[1.7] text-slate max-w-[230px] font-light">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

