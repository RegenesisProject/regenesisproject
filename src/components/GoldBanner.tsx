import React from 'react';

interface GoldBannerProps {
  title: string;
  subtitle: string;
}

export const GoldBanner: React.FC<GoldBannerProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-[#1A1A1A] text-[#FFFFFF] py-10 px-6 border-y border-[#D4AF37]/40 relative overflow-hidden">
      
      {/* Decorative Gold Accent Lines */}
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-[#D4AF37]" />
          <h3 className="font-playfair font-normal text-2xl sm:text-3xl text-[#FFFFFF] tracking-wide">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-center md:text-right">
          <p className="font-inter text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium">
            {subtitle}
          </p>
          <span className="hidden md:inline-block h-px w-10 bg-[#D4AF37]" />
        </div>

      </div>

    </div>
  );
};
