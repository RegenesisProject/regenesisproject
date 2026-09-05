import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MidPageQuizCTAProps {
  onOpenMirrorQuiz: () => void;
}

export const MidPageQuizCTA: React.FC<MidPageQuizCTAProps> = ({ onOpenMirrorQuiz }) => {
  return (
    <section className="bg-[#0C0A07] text-[#FFFFFF] py-10 sm:py-12 px-4 sm:px-8 border-t border-b border-[#C9962F]/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative z-10">
        <h3 className="font-playfair font-bold text-xl sm:text-2xl text-[#FFFFFF]">
          See what's running underneath your drive.
        </h3>

        <button
          onClick={onOpenMirrorQuiz}
          className="w-full sm:w-auto min-h-[48px] h-auto py-3.5 px-4 sm:px-8 rounded-xl bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-[#000000] font-inter font-black text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_25px_rgba(226,177,61,0.35)] hover:shadow-[0_6px_35px_rgba(226,177,61,0.6)] hover:scale-105 transition-all duration-300 text-center"
        >
          <span>GET EARLY ACCESS TO THE MIRROR QUIZ</span>
          <ArrowRight className="w-4 h-4 text-[#000000] shrink-0" />
        </button>
      </div>
    </section>
  );
};
