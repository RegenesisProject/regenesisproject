import React from 'react';
import { ArrowRight } from 'lucide-react';
import mountainTriumphImg from '../assets/images/mountain_triumph_hero_1785953023983.jpg';

interface ClosingBeatProps {
  onOpenMirrorQuiz?: () => void;
}

export const QuoteSection: React.FC<ClosingBeatProps> = ({ onOpenMirrorQuiz }) => {
  return (
    <section 
      className="relative bg-fixed bg-cover bg-center text-[#FFFFFF] py-28 px-6 sm:px-12 lg:px-16 border-t border-b border-[#C9962F]/30 overflow-hidden"
      style={{ backgroundImage: `url('${mountainTriumphImg}')` }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-[#000000]/65 to-[#000000]/85 z-0 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center">
          
          <h2 className="font-playfair font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#FFFFFF] leading-tight tracking-tight mb-8 drop-shadow-lg">
            Stop fighting your biology. <span className="bg-gradient-to-r from-[#FCE289] via-[#E2B13D] to-[#C9962F] bg-clip-text text-transparent">Command it.</span>
          </h2>

          <button
            onClick={onOpenMirrorQuiz}
            className="h-14 px-10 rounded-xl bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-[#000000] font-inter font-black text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center gap-3 cursor-pointer shadow-[0_4px_35px_rgba(226,177,61,0.5)] hover:shadow-[0_6px_45px_rgba(226,177,61,0.8)] hover:scale-105 transition-all duration-300"
          >
            <span>GET EARLY ACCESS TO THE MIRROR QUIZ</span>
            <ArrowRight className="w-4 h-4 text-[#000000]" />
          </button>

        </div>
      </div>
    </section>
  );
};

