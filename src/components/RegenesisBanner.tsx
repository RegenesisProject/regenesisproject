import React from 'react';

export const RegenesisBanner: React.FC = () => {
  return (
    <section className="relative py-12 bg-gradient-to-r from-[#8B6B23] via-[#C5A028] to-[#8B6B23] border-y border-[#F3E5AB]/40 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Metallic Sheen Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-widest text-[#090A0C] uppercase drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)] mb-2">
          THE REGENESIS PROJECT
        </h2>
        <p className="text-sm sm:text-base font-medium tracking-[0.2em] text-[#1A1810] uppercase">
          Recoding the Operating System Beneath Your Habits™
        </p>
      </div>
    </section>
  );
};
