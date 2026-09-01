import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface KeynoteHomeBannerProps {
  onExploreKeynotes: () => void;
}

export const KeynoteHomeBanner: React.FC<KeynoteHomeBannerProps> = ({ onExploreKeynotes }) => {
  return (
    <section className="bg-[#0C0A07] text-[#FFFFFF] py-12 sm:py-16 px-4 sm:px-8 border-t border-b border-[#C9962F]/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center justify-center gap-3 text-sm sm:text-base md:text-lg font-inter font-medium text-[#E6E1D5] hover:text-[#FFFFFF] transition-colors group">
          <span>Bringing REGENESIS to a leadership team or event?</span>
          <button
            onClick={onExploreKeynotes}
            className="inline-flex items-center gap-2 font-bold text-[#FCE289] hover:text-[#FFFFFF] underline decoration-[#C9962F] underline-offset-4 cursor-pointer transition-colors"
          >
            <span>Explore Keynotes</span>
            <ArrowRight className="w-4 h-4 text-[#FCE289] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
