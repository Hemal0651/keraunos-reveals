import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Landmark, Compass, CalendarCheck } from "lucide-react";
import CustomSelect from "./CustomSelect";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    atelier: "Athens",
    interest: "Complete Collection",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const atelierOptions = [
    { value: "Athens", label: "Athens (Plaka District)" },
    { value: "Dhaka", label: "Dhaka (Gulshan Atelier)" },
    { value: "New York", label: "New York (Tribeca Loft)" },
  ];

  const pieceOptions = [
    { value: "Complete Collection", label: "The Complete Collection" },
    { value: "The Aegis Coat", label: "The Aegis Coat" },
    { value: "Olympian Denim", label: "Olympian Denim" },
    { value: "The Pantheon Watch", label: "The Pantheon Watch" },
    { value: "Bespoke Inquiries", label: "Other Custom Order" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", email: "", atelier: "Athens", interest: "Complete Collection", notes: "" });
        onClose();
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            className="fixed inset-0 bg-ink/90 backdrop-blur-md z-150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-200 pointer-events-none">
            <motion.div
              className="bg-ink-soft border border-hair/15 max-w-lg w-full overflow-hidden shadow-2xl relative pointer-events-auto flex flex-col"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Gold Top line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bronze-dim via-bronze-light to-bronze-dim" />

              {/* Header */}
              <div className="p-8 border-b border-hair/10 flex justify-between items-center bg-ink">
                <div>
                  <span className="font-mono text-[10px] text-bronze tracking-[0.25em] uppercase">
                    Bespoke Fitting Services
                  </span>
                  <h3 className="font-serif text-xl text-marble mt-1 font-normal">
                    Secure Private Viewing
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-hair/10 flex items-center justify-center hover:border-bronze hover:text-bronze transition-colors duration-300 hoverable"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-8">
                {isSuccess ? (
                  <motion.div
                    className="text-center py-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="w-14 h-14 bg-bronze/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="text-bronze-light" size={24} />
                    </div>
                    <h4 className="font-serif text-lg text-marble mb-2">Viewing Registered</h4>
                    <p className="text-xs font-light text-slate max-w-xs mx-auto leading-relaxed">
                      A personal coordinator from the <span className="text-bronze">{formData.atelier}</span> atelier will contact you in 24 hours to coordinate secure admittance.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1.5">
                          Private Identity (Name)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-ink border-b border-hair/20 text-xs text-marble p-2.5 focus:outline-none focus:border-bronze transition-colors"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1.5">
                          Secure Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-ink border-b border-hair/20 text-xs text-marble p-2.5 focus:outline-none focus:border-bronze transition-colors"
                          placeholder="your.email@atelier.com"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1.5">
                            Atelier Studio
                          </label>
                          <CustomSelect
                            value={formData.atelier}
                            onChange={(val) => setFormData({ ...formData, atelier: val })}
                            options={atelierOptions}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1.5">
                            Focus Piece
                          </label>
                          <CustomSelect
                            value={formData.interest}
                            onChange={(val) => setFormData({ ...formData, interest: val })}
                            options={pieceOptions}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate tracking-wider mb-1.5">
                          Atelier Coordination Notes (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full bg-ink border-b border-hair/20 text-xs text-marble p-2.5 focus:outline-none focus:border-bronze transition-colors resize-none text-slate"
                          placeholder="Let us know if you have specific timing or material allergy profiles..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2 text-[10px] font-mono text-slate tracking-wider text-center border-t border-b border-hair/10 bg-ink/40 p-2">
                      <div className="flex flex-col items-center gap-1">
                        <Landmark size={12} className="text-bronze" />
                        <span>Est. Guilds</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Compass size={12} className="text-bronze" />
                        <span>Secure Escort</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <CalendarCheck size={12} className="text-bronze" />
                        <span>Private Entry</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-marble text-ink font-mono text-xs uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 hover:bg-transparent hover:text-marble border border-marble hover:shadow-[0_0_20px_rgba(193,154,75,0.2)] transition-all duration-300 disabled:opacity-50 hoverable"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Locking Schedule...</span>
                      ) : (
                        <span>Book Private Fitting</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
