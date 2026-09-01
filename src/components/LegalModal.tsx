import React from 'react';
import { X, Shield } from 'lucide-react';

interface LegalModalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isTerms = type === 'terms';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#FFFFFF] border border-[#1A1A1A] p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-[#1A1A1A] max-h-[80vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 text-[#1A1A1A] hover:text-[#D4AF37] border border-[#1A1A1A]/20 hover:border-[#D4AF37] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-[#D4AF37] font-inter font-semibold text-xs uppercase tracking-[0.25em] mb-2">
            <Shield className="w-4 h-4" />
            <span>Legal Notice</span>
          </div>
          <h2 className="font-playfair font-normal text-3xl text-[#1A1A1A] uppercase">
            {isTerms ? 'Terms of Service' : 'Privacy Policy'}
          </h2>
          <p className="font-inter text-xs text-[#6C6863] mt-2">
            Effective Date: 2026 · Thomas Ventura & The REGENESIS Project™
          </p>
        </div>

        <div className="font-inter text-xs text-[#1A1A1A] leading-relaxed space-y-6">
          {isTerms ? (
            <>
              <p>
                Welcome to Thomas Ventura and The REGENESIS Project™. By accessing or using our website, services, keynotes, or publications, you agree to be bound by these Terms of Service.
              </p>
              <h4 className="font-playfair font-bold text-base text-[#1A1A1A]">1. Intellectual Property</h4>
              <p>
                All content, frameworks, trade names, including "The REGENESIS Project™", "Survival Operating System (SOS)", and "Optimized Neuro-Biological Evolution (O.N.E.)", are the exclusive property of Thomas Ventura.
              </p>
              <h4 className="font-playfair font-bold text-base text-[#1A1A1A]">2. Keynotes & Advisory</h4>
              <p>
                Information provided during keynotes and advisory sessions is for educational and strategic leadership purposes.
              </p>
            </>
          ) : (
            <>
              <p>
                Thomas Ventura is committed to protecting the privacy and confidentiality of high-level executives, founders, and event organizers.
              </p>
              <h4 className="font-playfair font-bold text-base text-[#1A1A1A]">1. Information Collection</h4>
              <p>
                We collect personal information (e.g. name, email, organization) strictly when voluntarily provided for newsletter subscription, quiz assessments, or keynote inquiries.
              </p>
              <h4 className="font-playfair font-bold text-base text-[#1A1A1A]">2. Confidentiality Guarantee</h4>
              <p>
                We never sell, lease, or distribute executive contact details or quiz assessment scores to third parties.
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
