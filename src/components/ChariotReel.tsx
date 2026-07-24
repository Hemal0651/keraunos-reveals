import React, { useState, useRef } from "react";
import { motion } from "motion/react";

export default function ChariotReel() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="chariot-reel scroll-mt-20" id="journey">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/chariot-poster.png"
      >
        <source src="/chariot.mp4" type="video/mp4" />
      </video>
      <div className="chariot-scrim" />
      <span className="chariot-tag">
        <span className="dot" />
        Live Study
      </span>

      <motion.div
        className="chariot-content"
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 0.9, 0.28, 1] }}
      >
        <span className="eyebrow">Archive — Specimen No. 002</span>
        <h2>The Sky Chariot</h2>
        <p className="chariot-desc">
          Bronze, cast whole, kept always in motion. It's the piece our own craftsmen keep coming back to when something needs to feel like it's already been somewhere.
        </p>
        <div className="chariot-meta">
          <div className="chariot-meta-item">
            <span className="chariot-meta-label">Material</span>
            <span className="chariot-meta-value">Cast Bronze</span>
          </div>
          <div className="chariot-meta-item">
            <span className="chariot-meta-label">Origin</span>
            <span className="chariot-meta-value">Storm Road</span>
          </div>
          <div className="chariot-meta-item">
            <span className="chariot-meta-label">Status</span>
            <span className="chariot-meta-value">In Motion</span>
          </div>
        </div>
        <button
          onClick={() => scrollToSection("collection")}
          className="plate-link hoverable"
        >
          Continue the Story <span className="arrow">→</span>
        </button>
      </motion.div>

      <button
        className="mute-toggle hoverable"
        onClick={toggleMute}
        aria-label="Toggle sound"
      >
        {muted ? (
          <svg className="icon-off" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
            <path d="M4 9v6h4l5 5V4L8 9H4z" stroke="#ece7dc" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M17 8l4 8M21 8l-4 8" stroke="#c19a4b" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="icon-on" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
            <path d="M4 9v6h4l5 5V4L8 9H4z" stroke="#ece7dc" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M16 9a4 4 0 010 6M18.5 7a7.5 7.5 0 010 10" stroke="#c19a4b" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </section>
  );
}
