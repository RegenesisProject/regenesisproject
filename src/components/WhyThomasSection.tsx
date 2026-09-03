import React from 'react';

export const WhyThomasSection: React.FC = () => {
  return (
    <section className="bg-[#F8F6F0] text-[#1A1A1A] py-16 sm:py-28 px-4 sm:px-12 lg:px-16 border-t border-b border-[#D4AF37]/25 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-20 pb-6 sm:pb-8 border-b border-[#D4AF37]/30 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#D4AF37]" />
              <span className="font-sans text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold text-[#8B6E14]">
                Operator Credentials
              </span>
            </div>
            
            <h2 className="font-playfair font-normal text-3xl sm:text-5xl lg:text-6xl text-[#111111]">
              Why Thomas <em className="font-playfair italic font-normal text-[#B8860B]">Ventura</em>?
            </h2>
          </div>

          <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#555047] font-semibold max-w-sm leading-relaxed">
            Not a motivational speaker. A battle-tested founder who built and scaled multi-million dollar supply chains.
          </p>
        </div>

        {/* 3 Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-[#FFFFFF] border-t-2 border-[#D4AF37] p-8 sm:p-10 border-x border-b border-[#E8E3D5] rounded-b-xl flex flex-col justify-between group hover:border-[#B8860B] transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(184,134,11,0.15)] transform hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 bg-[#FAF6ED] border border-[#D4AF37] text-[#8B6E14] flex items-center justify-center font-mono text-xs font-bold mb-6 rounded-md shadow-sm">
                01
              </div>

              <h3 className="font-playfair font-bold text-2xl text-[#111111] mb-3 group-hover:text-[#B8860B] transition-colors">
                HARDWARE, NOT SOFTWARE
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#4A4843] leading-relaxed">
                Most strategists talk about Mindset (Software). Thomas addresses Biological Capacity (Hardware). He explains why your expansion strategy stops working when your biology hits its limit.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FFFFFF] border-t-2 border-[#D4AF37] p-8 sm:p-10 border-x border-b border-[#E8E3D5] rounded-b-xl flex flex-col justify-between group hover:border-[#B8860B] transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(184,134,11,0.15)] transform hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 bg-[#FAF6ED] border border-[#D4AF37] text-[#8B6E14] flex items-center justify-center font-mono text-xs font-bold mb-6 rounded-md shadow-sm">
                02
              </div>

              <h3 className="font-playfair font-bold text-2xl text-[#111111] mb-3 group-hover:text-[#B8860B] transition-colors">
                THE STORY IS TRUE
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#4A4843] leading-relaxed">
                Thomas didn't learn this in a lab. He reverse-engineered it out of an actual war zone, actual poverty, and over fifteen years of running two operations side by side — decoding his own machine because his life depended on it.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FFFFFF] border-t-2 border-[#D4AF37] p-8 sm:p-10 border-x border-b border-[#E8E3D5] rounded-b-xl flex flex-col justify-between group hover:border-[#B8860B] transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(184,134,11,0.15)] transform hover:-translate-y-1">
            <div>
              <div className="w-10 h-10 bg-[#FAF6ED] border border-[#D4AF37] text-[#8B6E14] flex items-center justify-center font-mono text-xs font-bold mb-6 rounded-md shadow-sm">
                03
              </div>

              <h3 className="font-playfair font-bold text-2xl text-[#111111] mb-3 group-hover:text-[#B8860B] transition-colors">
                THE "TIGER" IN THE ROOM
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#4A4843] leading-relaxed">
                Thomas brings the presence of a veteran operator. He validates the "Internal War" high-performers feel but never talk about, creating immediate trust with the most skeptical people in the room.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

