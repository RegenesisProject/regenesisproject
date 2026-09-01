import React from 'react';
import { Compass, Zap, ShieldCheck } from 'lucide-react';

export const ScienceManifesto: React.FC = () => {
  return (
    <section id="science" className="bg-[#090A0C] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#3d2e1b]">
      <div className="max-w-5xl mx-auto">
        
        <div className="relative bg-gradient-to-b from-[#120f0a] via-[#0d0a07] to-[#0a0805] border border-[#3d2e1b] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#e2b13d]/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#e2b13d]/10 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            {/* Eyebrow Badge */}
            <div className="flex flex-col items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c160c] border border-[#3d2e18] text-xs font-mono font-bold text-[#e2b13d] uppercase tracking-widest shadow-inner">
                <Compass className="w-3.5 h-3.5" />
                <span>THE CORE THESIS</span>
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold leading-tight text-white tracking-tight">
              REGENESIS is built on one premise: the hardest limits in your life aren't in your strategy or your discipline — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCE289] via-[#E2B13D] to-[#C9962F]">they're written into your survival wiring.</span>
            </h2>

            {/* Explanatory Text */}
            <p className="text-sm sm:text-base lg:text-lg text-[#D4CEBF] max-w-3xl mx-auto leading-relaxed font-sans font-normal">
              It explains how your <strong className="text-white font-semibold">Survival Source Code</strong> was written — shaping the behavior, identity, and neurochemistry running your life today — and how to rewrite that code and reclaim the capacity it's been holding back.
            </p>

            {/* 3 Phases Grid */}
            <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              
              {/* PHASE I */}
              <div className="bg-[#18130b] border border-[#4d3a24] hover:border-[#e2b13d] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-xl relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold text-[#fce289] bg-[#241b0f] px-2.5 py-1 rounded-md border border-[#4d3a24]">
                    PHASE I
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#241b0f] border border-[#4d3a24] text-[#fce289] flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white uppercase tracking-tight mb-1">
                  THE SURVIVAL CODE
                </h3>

                <p className="text-xs font-mono text-[#fce289] mb-3 font-semibold">
                  Awareness & Origin
                </p>

                <p className="text-xs text-stone-300 leading-relaxed font-normal">
                  <strong className="text-white font-semibold">See the code.</strong> Map the survival patterns written in your earliest years — the wiring that still decides how you react under pressure.
                </p>
              </div>

              {/* PHASE II */}
              <div className="bg-[#18130b] border border-[#4d3a24] hover:border-[#e2b13d] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-xl relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold text-[#fce289] bg-[#241b0f] px-2.5 py-1 rounded-md border border-[#4d3a24]">
                    PHASE II
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#241b0f] border border-[#4d3a24] text-[#fce289] flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white uppercase tracking-tight mb-1">
                  THE INTERRUPTION
                </h3>

                <p className="text-xs font-mono text-[#fce289] mb-3 font-semibold">
                  Protocol & Rewrite
                </p>

                <p className="text-xs text-stone-300 leading-relaxed font-normal">
                  <strong className="text-white font-semibold">Rewrite the code.</strong> The protocol for interrupting the old loops and reconfiguring the patterns quietly limiting you.
                </p>
              </div>

              {/* PHASE III */}
              <div className="bg-[#18130b] border border-[#4d3a24] hover:border-[#e2b13d] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-xl relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold text-[#fce289] bg-[#241b0f] px-2.5 py-1 rounded-md border border-[#4d3a24]">
                    PHASE III
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#241b0f] border border-[#4d3a24] text-[#fce289] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white uppercase tracking-tight mb-1">
                  THE NEW BUILD
                </h3>

                <p className="text-xs font-mono text-[#fce289] mb-3 font-semibold">
                  Embodiment & Expansion
                </p>

                <p className="text-xs text-stone-300 leading-relaxed font-normal">
                  <strong className="text-white font-semibold">Live the new build.</strong> A daily operating system that makes the new configuration your default — sustained output without the internal war.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

