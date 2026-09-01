import React from 'react';
import { X, CheckCircle, Mic, Users, Send } from 'lucide-react';
import { KeynoteInfo } from '../types';

interface KeynoteDetailModalProps {
  keynote: KeynoteInfo | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const KeynoteDetailModal: React.FC<KeynoteDetailModalProps> = ({
  keynote,
  onClose,
  onOpenContact,
}) => {
  if (!keynote) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#1A1A1A] p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-[#1A1A1A] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 text-[#1A1A1A] hover:text-[#D4AF37] border border-[#1A1A1A]/20 hover:border-[#D4AF37] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-8 pb-6 border-b border-[#1A1A1A]/15">
          <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest mb-2">
            {keynote.number} · {keynote.category}
          </div>
          <h2 className="font-playfair font-normal text-3xl sm:text-4xl text-[#1A1A1A] mb-2">
            {keynote.title}
          </h2>
          <p className="font-playfair italic text-base text-[#D4AF37]">
            {keynote.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="bg-[#FFFDF0] p-6 border border-[#D4AF37]/40 text-sm text-[#1A1A1A] font-inter leading-relaxed">
            {keynote.fullDetails}
          </div>

          {/* Key Outcomes */}
          <div>
            <h3 className="font-inter font-bold text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-4">
              Key Audience Outcomes:
            </h3>
            <ul className="space-y-3">
              {keynote.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-[#1A1A1A] font-inter">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Audience */}
          <div className="p-4 bg-[#FFFDF7] border border-[#1A1A1A]/20 text-xs font-inter text-[#6C6863] flex items-center gap-3">
            <Users className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span><strong className="text-[#1A1A1A]">Ideal For:</strong> {keynote.targetAudience}</span>
          </div>

          {/* Booking CTA */}
          <div className="pt-6 border-t border-[#1A1A1A]/15">
            <button
              onClick={() => { onClose(); onOpenContact(); }}
              className="btn-gold-slide h-14 px-8 text-xs uppercase tracking-[0.2em] font-inter font-medium w-full flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
              <span>Inquire for Keynote Availability</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
