import React from 'react';
import { Target, Building, Users2, Briefcase } from 'lucide-react';

export const AudienceSection: React.FC = () => {
  return (
    <section className="bg-[#FFFFFF] text-[#1A1A1A] py-28 px-6 sm:px-12 lg:px-16 border-b border-[#1A1A1A]/10">
      
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 pb-8 border-b border-[#1A1A1A]/15 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#D4AF37]" />
              <span className="font-inter text-xs uppercase tracking-[0.3em] font-medium text-[#6C6863]">
                Target Alignment
              </span>
            </div>
            
            <h2 className="font-playfair font-normal text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">
              Who Needs This <em className="font-playfair italic font-normal text-[#D4AF37]">Work</em>?
            </h2>
          </div>

          <p className="font-inter text-xs sm:text-sm uppercase tracking-[0.2em] text-[#6C6863] max-w-md font-medium">
            For anyone with the drive to build, lead, or create — who keeps hitting an invisible wall.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="bg-[#FFFDF7] p-8 border-t border-[#1A1A1A] border-x border-b border-[#1A1A1A]/10 flex flex-col justify-between group hover:border-[#D4AF37] transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest mb-4">
                CATEGORY 01
              </div>
              <h3 className="font-playfair font-normal text-2xl text-[#1A1A1A] mb-3 group-hover:text-[#D4AF37] transition-colors">
                THE BOTTLENECK FOUNDER
              </h3>
              <p className="font-inter text-xs text-[#6C6863] leading-relaxed">
                "The one doing it all." Entrepreneurs stuck in high-effort, low-return cycles — where "working harder" has stopped yielding results and started yielding burnout. Whether you run a local shop, a national brand, or a business from your kitchen table, you are the lid on your own growth.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFDF7] p-8 border-t border-[#1A1A1A] border-x border-b border-[#1A1A1A]/10 flex flex-col justify-between group hover:border-[#D4AF37] transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest mb-4">
                CATEGORY 02
              </div>
              <h3 className="font-playfair font-normal text-2xl text-[#1A1A1A] mb-3 group-hover:text-[#D4AF37] transition-colors">
                THE "RELUCTANT" DELEGATOR
              </h3>
              <p className="font-inter text-xs text-[#6C6863] leading-relaxed">
                "The one who can't let go." Builders who know they need to delegate, but whose nervous system codes "trust" as "danger." For anyone whose need for control is quietly preventing their team — or their life — from stepping up.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFDF7] p-8 border-t border-[#1A1A1A] border-x border-b border-[#1A1A1A]/10 flex flex-col justify-between group hover:border-[#D4AF37] transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest mb-4">
                CATEGORY 03
              </div>
              <h3 className="font-playfair font-normal text-2xl text-[#1A1A1A] mb-3 group-hover:text-[#D4AF37] transition-colors">
                THE CYCLE BREAKER
              </h3>
              <p className="font-inter text-xs text-[#6C6863] leading-relaxed">
                "The one building without a blueprint." The first-generation builder defying family history to leave the employee mindset and enter the arena of ownership. You are building from scratch with no safety net to catch you if you fall — and carrying the biological load of being the only one holding it all up.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFDF7] p-8 border-t border-[#1A1A1A] border-x border-b border-[#1A1A1A]/10 flex flex-col justify-between group hover:border-[#D4AF37] transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div>
              <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest mb-4">
                CATEGORY 04
              </div>
              <h3 className="font-playfair font-normal text-2xl text-[#1A1A1A] mb-3 group-hover:text-[#D4AF37] transition-colors">
                THE PERFORMER WHO NEVER ARRIVES
              </h3>
              <p className="font-inter text-xs text-[#6C6863] leading-relaxed">
                "The one still chasing it." The creator, closer, or high-achiever who hits the milestone and feels the flinch instead of the win — constantly "on," chasing the next rank to quiet a hum that never goes quiet.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
