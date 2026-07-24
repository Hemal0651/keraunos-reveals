import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, ArrowRight, ShieldCheck, Gem, Hammer } from "lucide-react";
import { CollectionItem } from "../types";
import CustomSelect from "./CustomSelect";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CollectionItem | null;
}

export default function DetailModal({ isOpen, onClose, item }: DetailModalProps) {
  const [formState, setFormState] = useState({ name: "", email: "", size: "Medium", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sizeOptions = [
    { value: "Small", label: "Small / Custom 38" },
    { value: "Medium", label: "Medium / Custom 40" },
    { value: "Large", label: "Large / Custom 42" },
    { value: "Atelier Fit", label: "Bespoke Atelier Fit" },
  ];

  if (!item) return null;

  // Fabrication metadata for luxurious detailing
  const fabrications: Record<string, { materials: string; origin: string; weight: string; customInfo: string }> = {
    I: {
      materials: "70% Raw Italian Merino Wool, 30% Waxed Egyptian Cotton",
      origin: "Biella & Giza Ateliers",
      weight: "480 GSM Outer Weight",
      customInfo: "Specially formulated water-repellent finish infused with natural beeswax.",
    },
    II: {
      materials: "100% Selvedge Indigo Cotton, Ring-Spun Japanese Denim",
      origin: "Kojima Atelier, Okayama",
      weight: "14.5 oz Heavyweight Indigo",
      customInfo: "Traditional shuttle-loomed weave. Left unwashed to mold perfectly to your signature posture.",
    },
    III: {
      materials: "95% Ancient Cast Bronze, 5% Pure Sterling Silver Alloy",
      origin: "Athens Fine casting foundry",
      weight: "28 Grams (Weighted Balance)",
      customInfo: "Individually hand-carved model, cast using lost-wax methods dating to 400 BC.",
    },
    IV: {
      materials: "100% Fine Grade Merino Wool, Brushed Finish",
      origin: "Melbourne Highlands",
      weight: "320 GSM Warm drape",
      customInfo: "Featuring a singular structural thread cast in metallic bronze silk weave along the perimeter.",
    },
    V: {
      materials: "100% Full-Grain Tuscan Calfskin Leather",
      origin: "Santa Croce sull'Arno ateliers",
      weight: "2.2mm Structured Thickness",
      customInfo: "Double-stitch welted construction, natural veg-tanned processing that patinas under friction.",
    },
    VI: {
      materials: "Sapphire Crystal, Matte-Finished Grade 5 Titanium Case, Leather Strap",
      origin: "Geneva Precision Studio",
      weight: "42mm Dial diameter",
      customInfo: "Custom high-frequency hand movement. Designed to turn without divisions or ticks.",
    },
  };

  const selectedFab = fabrications[item.index] || {
    materials: "Fine-weave luxury blends and certified organic natural fibers.",
    origin: "Athens & Dhaka ateliers",
    weight: "Optimized seasonal weight",
    customInfo: "Hand-finished using heritage sewing techniques.",
  };

  const handleInquire = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({ name: "", email: "", size: "Medium", message: "" });
        onClose();
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur */}
          <motion.div
            className="fixed inset-0 bg-ink/80 backdrop-blur-md z-150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-out Sidebar Drawer */}
          <motion.div
            id="detail-drawer"
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-ink-soft border-l border-hair/10 z-200 overflow-y-auto shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
          >
            {/* Drawer Header */}
            <div className="p-8 border-b border-hair/10 flex justify-between items-center bg-ink">
              <div>
                <span className="font-mono text-[10px] text-bronze tracking-[0.25em] uppercase">
                  Collection Spec Sheet
                </span>
                <h2 className="font-serif text-2xl text-marble mt-1 font-normal">
                  {item.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-hair/10 flex items-center justify-center hover:border-bronze hover:text-bronze transition-colors duration-300 hoverable"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-8 space-y-10 flex-grow">
              {/* Mythic Backdrop */}
              <div>
                <h4 className="font-mono text-xs text-bronze/70 tracking-widest uppercase mb-3">
                  Historical Backdrop & Inspiration
                </h4>
                <p className="text-sm font-light text-slate leading-relaxed italic">
                  &ldquo;Every seam on the {item.name} is aligned with classical golden ratios, preserving the posture of authority once carved in raw marble.&rdquo;
                </p>
              </div>

              {/* Fabrication specs */}
              <div className="bg-ink-card border border-hair/10 p-6 space-y-4">
                <h4 className="font-mono text-[10px] text-marble tracking-widest uppercase flex items-center gap-2 pb-3 border-b border-hair/10">
                  <Hammer size={12} className="text-bronze" /> Fabrication & Origin
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
                  <div>
                    <span className="text-slate block mb-1">Materials</span>
                    <span className="text-marble-dim">{selectedFab.materials}</span>
                  </div>
                  <div>
                    <span className="text-slate block mb-1">Atelier of Origin</span>
                    <span className="text-marble-dim">{selectedFab.origin}</span>
                  </div>
                  <div>
                    <span className="text-slate block mb-1">Fabric Weight</span>
                    <span className="text-marble-dim">{selectedFab.weight}</span>
                  </div>
                  <div>
                    <span className="text-slate block mb-1">Caretaking Method</span>
                    <span className="text-marble-dim">Dry Clean / Professional Polish</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-hair/10 text-xs text-slate italic leading-relaxed">
                  {selectedFab.customInfo}
                </div>
              </div>

              {/* Quality Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-hair/10 p-4 flex items-start gap-3">
                  <ShieldCheck size={18} className="text-bronze shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-mono uppercase text-marble tracking-wider">Lifetime Repair</h5>
                    <p className="text-[11px] text-slate font-light mt-1">Free structural restoration at any of our three global ateliers.</p>
                  </div>
                </div>
                <div className="border border-hair/10 p-4 flex items-start gap-3">
                  <Gem size={18} className="text-bronze shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-mono uppercase text-marble tracking-wider">Numbered Cast</h5>
                    <p className="text-[11px] text-slate font-light mt-1">Individually stamped and cataloged in the Athens Studio logs.</p>
                  </div>
                </div>
              </div>

              {/* Inquire form */}
              <div className="pt-8 border-t border-hair/10">
                <h4 className="font-mono text-xs text-bronze/70 tracking-widest uppercase mb-4">
                  Request Private Atelier Fittings
                </h4>

                {isSuccess ? (
                  <motion.div
                    className="bg-bronze/10 border border-bronze/30 p-6 text-center text-marble rounded-sm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Check className="mx-auto text-bronze-light mb-3 animate-pulse" size={28} />
                    <h5 className="font-serif text-lg font-medium mb-1">Atelier Informed</h5>
                    <p className="text-xs font-light text-slate">
                      We have prepared a record of your request. A representative from {selectedFab.origin} will reach out directly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInquire} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1.5">
                          Signature Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full bg-ink border-b border-hair/20 text-xs text-marble p-2.5 focus:outline-none focus:border-bronze transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1.5">
                          Atelier Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full bg-ink border-b border-hair/20 text-xs text-marble p-2.5 focus:outline-none focus:border-bronze transition-colors"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1.5">
                          Size Segment
                        </label>
                        <CustomSelect
                          value={formState.size}
                          onChange={(val) => setFormState({ ...formState, size: val })}
                          options={sizeOptions}
                        />
                      </div>
                      <div className="flex items-end">
                        <span className="text-[11px] text-slate italic leading-tight">
                          Atelier fit requires in-person mapping.
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1.5">
                        Private Note / fitting preferences
                      </label>
                      <textarea
                        rows={2}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full bg-ink border-b border-hair/20 text-xs text-marble p-2.5 focus:outline-none focus:border-bronze transition-colors resize-none"
                        placeholder="Specify if you prefer fitting in Athens, Dhaka, or New York..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-marble text-ink font-mono text-xs uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 hover:bg-transparent hover:text-marble border border-marble hover:box-shadow hover:shadow-[0_0_20px_rgba(193,154,75,0.2)] transition-all duration-300 disabled:opacity-50 hoverable"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Mapping Fabric...</span>
                      ) : (
                        <>
                          <span>Submit Private Request</span>
                          <ArrowRight size={13} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
