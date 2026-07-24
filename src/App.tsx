import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp, Landmark, ShieldCheck, Mail, Sparkles, BookOpen } from "lucide-react";

import { CollectionItem, ProcessStep, StatItem, DetailStudy } from "./types";
import Card3D from "./components/Card3D";
import StatCounter from "./components/StatCounter";
import CustomCursor from "./components/CustomCursor";
import ProcessTimeline from "./components/ProcessTimeline";
import DetailModal from "./components/DetailModal";
import ContactModal from "./components/ContactModal";
import RevealLayer from "./components/RevealLayer";
import ChariotReel from "./components/ChariotReel";

// --- CORE STUDIO DATA ---
const products: CollectionItem[] = [
  {
    id: "aegis-coat",
    index: "I",
    name: "The Aegis Coat",
    description: "Raw wool and waxed cotton, cut like armor and worn like nothing at all. Built for weather that doesn't ask permission.",
    category: "Outerwear",
    price: "$1,850",
  },
  {
    id: "olympian-denim",
    index: "II",
    name: "Olympian Denim",
    description: "Selvedge indigo, stone-washed to look a decade older than it is. Ages the way marble does — better, slower, unbothered.",
    category: "Denim",
    price: "$480",
  },
  {
    id: "bronze-cufflink",
    index: "III",
    name: "Bronze Cufflink",
    description: "Cast from a single lightning silhouette. The one detail meant to be noticed only up close.",
    category: "Accessories",
    price: "$290",
  },
  {
    id: "herald-scarf",
    index: "IV",
    name: "The Herald Scarf",
    description: "Brushed merino, woven with a single bronze thread that catches the light exactly once per turn.",
    category: "Accessories",
    price: "$350",
  },
  {
    id: "storm-boot",
    index: "V",
    name: "Storm Leather Boot",
    description: "Full-grain hide, resined at the seams. Built to be resoled for longer than most coats last.",
    category: "Footwear",
    price: "$820",
  },
  {
    id: "pantheon-watch",
    index: "VI",
    name: "The Pantheon Watch",
    description: "A single hand, no numerals. Time told the way the old stories were — by feel, not by face.",
    category: "Horology",
    price: "$2,400",
  }
];

const detailsStudy: DetailStudy[] = [
  {
    id: "gaze",
    index: "I — Gaze",
    title: "The Watch",
    label: "A silent stare across millennia.",
    imageUrl: "/a1.png",
    objectPosition: "38% 12%"
  },
  {
    id: "grip",
    index: "II — Grip",
    title: "The Bolt",
    label: "Calculated power held in complete tension.",
    imageUrl: "/a1.png",
    objectPosition: "6% 42%"
  },
  {
    id: "drape",
    index: "III — Drape",
    title: "The Fold",
    label: "Folds that retain memory of natural geometry.",
    imageUrl: "/a1.png",
    objectPosition: "88% 55%"
  },
  {
    id: "form",
    index: "IV — Form",
    title: "The Frame",
    label: "A muscular architecture of sheer poise.",
    imageUrl: "/a1.png",
    objectPosition: "52% 68%"
  }
];

const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Quarry",
    description: "Raw material selected by hand, rejected more often than it's approved."
  },
  {
    step: "02",
    title: "Carve",
    description: "Form cut slow, with room left for the material to keep some of its own say."
  },
  {
    step: "03",
    title: "Cast",
    description: "Hardware and bronze fittings poured in-house, one mold at a time."
  },
  {
    step: "04",
    title: "Finish",
    description: "A final hand-pass — the only step never delegated to a machine."
  }
];

const statsData: StatItem[] = [
  { id: "finished", target: 1847, label: "Hours Hand-Finished" },
  { id: "seasonal", target: 12, label: "Pieces Per Season", suffix: "/yr" },
  { id: "studios", target: 3, label: "Ateliers Worldwide" },
  { id: "batch", target: 100, label: "Small-Batch Made", suffix: "%" }
];

const marqueeWords = ["MYTH", "MATERIAL", "MOTION", "POWER", "STILLNESS", "MARBLE"];

export default function App() {
  const [loading, setLoading] = useState(true);

  // Hero reveal layer states & refs
  const heroRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);
  const isHoveredRef = useRef(false);
  const radiusRef = useRef(0);
  const [currentRadius, setCurrentRadius] = useState(0);

  const mouse = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const smooth = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const gridOffset = useRef({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  useEffect(() => {
    let animId: number;

    const updatePosition = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;

      const targetRadius = isHoveredRef.current ? 260 : 0;
      radiusRef.current += (targetRadius - radiusRef.current) * 0.1; // Smoothly grow or shrink radius

      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        const cx = (smooth.current.x - rect.left) / rect.width - 0.5;
        const cy = (smooth.current.y - rect.top) / rect.height - 0.5;

        gridOffset.current.x += (cx * 16 - gridOffset.current.x) * 0.06;
        gridOffset.current.y += (cy * 16 - gridOffset.current.y) * 0.06;

        if (patternRef.current) {
          patternRef.current.setAttribute("x", String(gridOffset.current.x));
          patternRef.current.setAttribute("y", String(gridOffset.current.y));
        }
      }

      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      setCurrentRadius(radiusRef.current);

      animId = requestAnimationFrame(updatePosition);
    };

    animId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
  };
  
  // Header interaction states
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Scroll progress meter
  const [scrollProgress, setScrollProgress] = useState(0);

  // Modular dynamic modal state triggers
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CollectionItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Back to top indicator trigger
  const [showToTop, setShowToTop] = useState(false);

  // Newsletter subscription states
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // --- RUNTIME SIDE EFFECTS ---
  useEffect(() => {
    // Let preloader stay for a refined moment
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    const handleScroll = () => {
      const currentY = window.scrollY;
      
      // Scrolled header background trigger
      setScrolled(currentY > 45);

      // Hide header on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 200) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = currentY;

      // Update scroll progress width percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(currentY / totalHeight);
      }

      // Back to top button visibility threshold
      setShowToTop(currentY > window.innerHeight * 0.7);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(loaderTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenProduct = (product: CollectionItem) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterSubmitting(true);
    setTimeout(() => {
      setNewsletterSubmitting(false);
      setNewsletterSuccess(true);
      setNewsletterEmail("");
      setTimeout(() => {
        setNewsletterSuccess(false);
      }, 3000);
    }, 1200);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-ink text-marble selection:bg-bronze selection:text-ink relative overflow-hidden font-sans">
      
      {/* 1. SEAMLESS REFINED PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="preloader"
            className="fixed inset-0 bg-ink z-999 flex flex-col items-center justify-center gap-6"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          >
            {/* Self-drawing lightning bolt using SVG line lengths */}
            <svg className="w-12 h-16" viewBox="0 0 46 70" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M30 2 L10 38 L22 38 L14 68 L38 30 L24 30 Z"
                fill="none"
                stroke="#c19a4b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
            <motion.span
              className="font-serif text-sm tracking-[0.35em] text-marble-dim uppercase mt-2 font-light"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Keraunos
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. OPTIMIZED HIGH-PERFORMANCE CUSTOM CURSOR */}
      <CustomCursor />

      {/* 3. SOLID FIXED SCROLL METER */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-bronze-dim via-bronze to-bronze-light z-200 origin-left"
        style={{ transform: `scaleX(${scrollProgress})`, width: "100%", willChange: "transform" }}
      />

      {/* 4. FLOATING DOCK HEADER NAVIGATION */}
      <header
        id="siteHeader"
        className={`${scrolled ? "scrolled" : ""} ${!headerVisible ? "hide" : ""}`}
      >
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="logo hoverable"
        >
          KERAUNOS
        </div>
        
        <nav>
          <ul>
            <li>
              <button onClick={() => scrollToSection("details")} className="hoverable">
                Details
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("collection")} className="hoverable">
                Collection
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("process")} className="hoverable">
                Craft
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("journey")} className="hoverable">
                The Journey
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("manifesto")} className="hoverable">
                Manifesto
              </button>
            </li>
            <li>
              <button onClick={() => setIsContactOpen(true)} className="hoverable">
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* 5. PARALLAX HERO SECTION */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        className="relative h-screen min-h-[640px] w-full flex items-end overflow-hidden"
      >
        {/* Base background layer (BG_IMAGE_1) */}
        <div className="absolute inset-0 bg-[url(/a1.png)] bg-center bg-cover bg-no-repeat pointer-events-none z-0" />

        {/* Reveal layer (BG_IMAGE_2 with spotlight) */}
        <RevealLayer cursorPos={cursorPos} radius={currentRadius} />

        {/* Grid background - opacity 0.1, full-cover, absolutely positioned behind content */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none z-[3]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
              ref={patternRef}
            >
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Editorial scrim gradients matched to index.html */}
        <div 
          className="absolute inset-0 pointer-events-none z-[4]" 
          style={{
            background: "linear-gradient(to right, rgba(7,8,10,0.88) 0%, rgba(7,8,10,0.35) 22%, rgba(7,8,10,0) 40%, rgba(7,8,10,0) 66%, rgba(7,8,10,0.55) 84%, rgba(7,8,10,0.92) 100%), linear-gradient(to top, rgba(7,8,10,0.85) 0%, rgba(7,8,10,0.15) 34%, rgba(7,8,10,0) 55%)"
          }}
        />

        {/* Hero Copy Overlay */}
        <div className="relative z-10 w-full px-[5vw] pb-[9vh] flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-[480px] w-full flex flex-col items-start">
            <span className="font-mono text-[11px] text-bronze tracking-[0.28em] uppercase mb-[18px] block select-none">
              Est. in Marble — Worn in Motion
            </span>
            <h1 className="font-serif font-medium text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.98] tracking-[-0.01em] text-marble">
              Forged in <br />
              <span className="italic font-light text-bronze font-serif">Myth.</span>
            </h1>
            
            {/* Elegant lightning rule design element */}
            <svg className="w-[120px] h-[28px] mt-[22px] text-bronze block" viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M64 1 L38 15 L52 15 L44 27 L82 11 L66 11 Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.3, duration: 1.1 }}
              />
            </svg>
          </div>

          <div className="max-w-full md:max-w-[300px] text-left md:text-right flex flex-col md:items-end">
            <p className="text-[14.5px] leading-[1.7] text-marble-dim font-light mb-[22px]">
              Every garment carries the weight of the old stories — power held in stillness, strength worn quietly. Keraunos is built for those who don't need to raise their voice.
            </p>
            <button
              onClick={() => scrollToSection("collection")}
              className="cta hoverable inline-flex items-center gap-[10px] font-mono text-[11.5px] tracking-[0.18em] uppercase text-ink bg-marble px-[22px] py-[14px] border border-marble hover:bg-transparent hover:text-marble hover:shadow-[0_0_26px_rgba(193,154,75,0.28)] transition-all duration-300 font-medium"
            >
              Enter the Collection
            </button>
          </div>
        </div>

        {/* Scroll Cue indicator */}
        <div className="absolute left-1/2 bottom-[34px] -translate-x-1/2 flex flex-col items-center gap-[10px] z-10 opacity-70 select-none pointer-events-none hidden md:flex">
          <span className="font-mono text-[10px] text-slate tracking-[0.2em] uppercase">Descend</span>
          <div className="w-[1px] h-[34px] bg-gradient-to-b from-bronze to-transparent relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-1/2 bg-bronze"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </div>
        </div>
      </section>

      {/* 6. INFINITE SEAMLESS RUNNING MARQUEE */}
      <div className="marquee select-none relative flex">
        <div className="marquee-track">
          {/* First sequence */}
          {["MYTH", "MATERIAL", "MOTION", "POWER", "STILLNESS", "MARBLE"].map((word, i) => (
            <span key={`f-${i}`}>
              {word}
            </span>
          ))}
          {/* Duplicated sequence for seamless transition */}
          {["MYTH", "MATERIAL", "MOTION", "POWER", "STILLNESS", "MARBLE"].map((word, i) => (
            <span key={`d-${i}`}>
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* 7. THE PREMISE INTRODUCTION */}
      <section className="strip grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start" id="premise">
        <div>
          <span className="eyebrow block mb-4">The Premise</span>
        </div>
        <div>
          <h2>
            Three thousand years ago, the thunderbolt was a warning to gods and men alike. We kept the <span className="accent">weight</span>, and left the war behind — objects built to outlast every trend they were never trying to follow.
          </h2>
        </div>
      </section>

      {/* 8. INCREMENTING STATS COUNTERS */}
      <section className="stats">
        {statsData.map((stat) => (
          <StatCounter
            key={stat.id}
            target={stat.target}
            label={stat.label}
            suffix={stat.suffix}
          />
        ))}
      </section>

      {/* 9. A STUDY IN MARBLE DETAILS GALLERY */}
      <section id="details" className="details scroll-mt-20">
        <div className="section-head">
          <h2>
            A Study in Marble
          </h2>
          <p>
            Four details from the same figure — proof that stillness rewards a closer look.
          </p>
        </div>

        {/* Gallery Image Grid with interactive zoom detail hover panels */}
        <div className="detail-grid">
          {detailsStudy.map((detail, idx) => (
            <motion.div
              key={detail.id}
              id={`detail-${detail.id}`}
              initial={{ opacity: 0, scale: 0.92, y: 34 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: idx * 0.08, ease: [0.16, 0.9, 0.28, 1] }}
              className="detail-item group"
            >
              <img
                src={detail.imageUrl}
                alt={detail.title}
                referrerPolicy="no-referrer"
                style={{ objectPosition: detail.objectPosition }}
              />
              
              {/* Overlay Tags */}
              <div className="tag pointer-events-none">
                <span className="idx block">
                  {detail.index}
                </span>
                <h4>{detail.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 10. PRODUCT COLLECTION GRID */}
      <section id="collection" className="collection scroll-mt-20">
        <div className="section-head">
          <h2>
            The Collection
          </h2>
          <p>
            A small, deliberate set of pieces — each one named for what it protects, not what it costs.
          </p>
        </div>

        {/* Interactive Card Grid with custom state drawer hooks */}
        <div className="collection-grid">
          {products.map((item) => (
            <Card3D
              key={item.id}
              index={item.index}
              title={item.name}
              description={item.description}
              category={item.category}
              price={item.price}
              onViewDetails={() => handleOpenProduct(item)}
            />
          ))}
        </div>
      </section>

      {/* 11. PROCESS / HOW IT'S MADE SECTION */}
      <section id="process" className="process scroll-mt-20">
        <div className="section-head">
          <h2>
            How It's Made
          </h2>
          <p>
            Four steps, unchanged for a century, and unlikely to change for another.
          </p>
        </div>

        {/* Progress horizontal line and steps tracker */}
        <ProcessTimeline steps={processSteps} />
      </section>

      {/* 11.5 CHARIOT REEL SECTION (THE JOURNEY) */}
      <ChariotReel />

      {/* 12. TEXT MANIFESTO WITH RADIAL GLOW */}
      <section id="manifesto" className="manifesto scroll-mt-20">
        {/* Soft breathing background gold radial pulse */}
        <div className="manifesto-glow" />

        <blockquote>
          &ldquo;Strength that announces itself has already lost something. <em>Ours stays quiet</em> — until the moment it doesn&apos;t.&rdquo;
          <cite>
            — Keraunos Studio Notes, Vol. II
          </cite>
        </blockquote>
      </section>

      {/* 13. CHRONICLE / PRESS BRANDS */}
      <section className="press">
        <span className="eyebrow">
          As Felt By
        </span>
        <div className="press-row items-center">
          {["Monocle", "Kinfolk", "032c", "Anti Fashion", "Cereal"].map((brand) => (
            <span
              key={brand}
              id={`press-${brand.toLowerCase().replace(/\s+/g, "")}`}
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* 14. FOOTER CALL-TO-ACTION */}
      <section id="contact" className="footer-cta">
        <h2>
          Ready to carry <em>the weight?</em>
        </h2>
        <button
          onClick={() => setIsContactOpen(true)}
          className="cta hoverable inline-flex items-center gap-[10px] font-mono text-[11.5px] tracking-[0.18em] uppercase text-ink bg-marble px-[22px] py-[14px] border border-marble hover:bg-transparent hover:text-marble hover:shadow-[0_0_26px_rgba(193,154,75,0.28)] transition-all duration-300 font-medium"
        >
          Get in Touch
        </button>
      </section>

      {/* 15. NEWSLETTER BOX */}
      <section className="newsletter">
        <div className="newsletter-box">
          <h3>
            Notes from the studio, sent rarely — only when there&apos;s something worth the weight.
          </h3>

          <div className="flex-1 max-w-[440px] min-w-[260px]">
            {newsletterSuccess ? (
              <motion.div
                className="bg-bronze/10 border border-bronze/30 p-4 text-center rounded-sm text-xs font-mono text-marble tracking-wider"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                Atelier Registered. Thank you.
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form flex gap-0 w-full">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-transparent border-0 border-b border-slate text-sm text-marble px-1 py-3 focus:outline-none focus:border-bronze transition-colors placeholder:text-slate"
                />
                <button
                  type="submit"
                  disabled={newsletterSubmitting}
                  className="hoverable bg-none border-0 border-b border-marble text-marble font-mono text-[11px] tracking-[0.16em] uppercase px-[18px] py-3 cursor-pointer hover:text-bronze hover:border-bronze transition-all"
                >
                  {newsletterSubmitting ? "..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 16. DETAILED FOOTER SECTION */}
      <footer>
        <div className="footer-grid">
          <div className="footer-col flex flex-col items-start">
            <div className="logo">
              KERAUNOS
            </div>
            <p>
              Objects built with the weight of old stories — worn quietly, held for longer than a season.
            </p>
          </div>

          <div className="footer-col flex flex-col items-start">
            <h5>
              Shop
            </h5>
            <ul>
              <li>
                <button onClick={() => scrollToSection("collection")} className="hoverable block">
                  Collection
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("details")} className="hoverable block">
                  Details
                </button>
              </li>
              <li>
                <a href="#gift" className="hoverable block">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col flex flex-col items-start">
            <h5>
              Studio
            </h5>
            <ul>
              <li>
                <button onClick={() => scrollToSection("process")} className="hoverable block">
                  Craft
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("manifesto")} className="hoverable block">
                  Manifesto
                </button>
              </li>
              <li>
                <a href="#careers" className="hoverable block">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col flex flex-col items-start">
            <h5>
              Connect
            </h5>
            <ul>
              <li>
                <a href="#instagram" className="hoverable block">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#journal" className="hoverable block">
                  Journal
                </a>
              </li>
              <li>
                <button onClick={() => setIsContactOpen(true)} className="hoverable block">
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom legal info */}
        <div className="footer-bottom">
          <span>&copy; 2026 Keraunos Studio</span>
          <div className="flex gap-4">
            <span className="hover:text-bronze transition-colors cursor-pointer">Athens</span>
            <span>&middot;</span>
            <span className="hover:text-bronze transition-colors cursor-pointer">Dhaka</span>
            <span>&middot;</span>
            <span className="hover:text-bronze transition-colors cursor-pointer">New York</span>
          </div>
        </div>
      </footer>

      {/* 17. BACK TO TOP SCROLL ACCENT */}
      <AnimatePresence>
        {showToTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed right-6 bottom-6 md:right-10 md:bottom-10 z-100 w-11 h-11 rounded-full border border-bronze-dim bg-ink/80 backdrop-blur-md flex items-center justify-center text-bronze hover:border-bronze hover:bg-bronze hover:text-ink transition-all duration-300 hoverable"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1 }}
            aria-label="Back to Top"
          >
            <ChevronUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* MODULAR MODAL DRAWERS AND INQUIRIES POPUPS */}
      <DetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        item={selectedProduct}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
