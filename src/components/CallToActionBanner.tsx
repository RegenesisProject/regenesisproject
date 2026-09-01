import React from 'react';
import { Download, PhoneCall, Sparkles } from 'lucide-react';

interface CallToActionBannerProps {
  onOpenSpeakerKit: () => void;
  onOpenContact: () => void;
  onOpenWaitlist: () => void;
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({
  onOpenSpeakerKit,
  onOpenContact,
  onOpenWaitlist,
}) => {
  return (
    <section className="bg-[#1A1A1A] text-[#FFFFFF] py-16 sm:py-28 px-3 sm:px-12 lg:px-16 relative overflow-hidden border-b border-white/10">
      
      <div className="max-w-[1600px] mx-auto text-center relative z-10">
        
        <h2 className="font-playfair font-normal text-2xl xs:text-3xl sm:text-5xl lg:text-7xl text-[#FFFFFF] max-w-4xl mx-auto leading-tight mb-6 sm:mb-8">
          Bring This <em className="font-playfair italic font-normal text-[#D4AF37]">Framework</em> to Your Executive Team
        </h2>

        <p className="font-inter text-xs xs:text-sm sm:text-base text-[#FFFFFF]/80 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12">
          Reserve Thomas Ventura for your upcoming annual executive retreat, keynote event, or corporate leadership summit.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto">
          
          <button
            onClick={onOpenSpeakerKit}
            className="h-14 px-8 text-xs uppercase tracking-[0.2em] font-inter font-bold flex items-center justify-center gap-2 w-full sm:w-auto text-[#D4AF37] hover:text-[#000000] bg-[#1A1A1A] hover:bg-[#D4AF37] border-2 border-[#D4AF37] rounded-md transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
          >
            <Download className="w-4 h-4 text-[#D4AF37] group-hover:text-[#000000] transition-colors" />
            <span>Download Speaker Kit</span>
          </button>

          <button
            onClick={onOpenContact}
            className="btn-gold-slide h-14 px-8 text-xs uppercase tracking-[0.2em] font-inter font-medium flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer shadow-[0_4px_24px_rgba(212,175,55,0.2)]"
          >
            <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
            <span>Book a Call</span>
          </button>

          <button
            onClick={onOpenWaitlist}
            className="h-14 px-8 text-xs uppercase tracking-[0.2em] font-inter font-bold flex items-center justify-center gap-2 w-full sm:w-auto text-white hover:text-black bg-white/10 hover:bg-[#D4AF37] border border-white/30 hover:border-[#D4AF37] rounded-md transition-all duration-300 cursor-pointer shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:text-black" />
            <span>Join Waiting List</span>
          </button>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 font-inter text-xs uppercase tracking-[0.2em] text-[#FFFFFF]/60">
          <span>BOOK ONE COMING 2027</span>
          <span>•</span>
          <span>CPG INDUSTRY VETERAN</span>
          <span>•</span>
          <span>TWELVE-LENS FRAMEWORK</span>
        </div>

      </div>

    </section>
  );
};
