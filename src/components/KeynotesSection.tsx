import React, { useState } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';
import { portraitImg, thomasCutoutImg } from '../data/content';

interface KeynotesProps {
  onOpenBooking?: (inquiryType?: string) => void;
  onOpenSpeakerKit?: () => void;
  onSelectKeynote?: (keynote: any) => void;
}

interface KeynoteDetail {
  id: string;
  numberLabel: string;
  title: string;
  subtitle: string;
  para1: string;
  para2Html: React.ReactNode;
  fullDescription: string;
  takeaways: string[];
}

const KEYNOTES_LIST: KeynoteDetail[] = [
  {
    id: "keynote-1",
    numberLabel: "KEYNOTE 1",
    title: "THE BIOLOGY OF BUSINESS BEHAVIOR",
    subtitle: "Recoding the Operating System Beneath Your Habits™",
    para1: "Strategy is logic, but behavior is chemistry. If you are fighting an \"Internal War\" between your will to scale and your urge to pull back, it isn't a mindset flaw. It is a hardware limitation.",
    para2Html: (
      <>
        Discover why your <strong className="font-bold text-black">Biological Architecture</strong> is the invisible ceiling on your growth, and learn how to overwrite the <strong className="font-bold text-black">Survival Conditioning</strong> that is keeping your business safe, but small.
      </>
    ),
    fullDescription: "In this flagship keynote, Thomas Ventura breaks down the neuroscience of executive resistance and limbic threat gates. Leaders learn how nervous system bandwidth directly dictates revenue scaling, risk tolerance, and decision speed.",
    takeaways: [
      "Identify the 3 subconscious threat triggers that stall corporate growth",
      "Calculate your executive biological ceiling and prefrontal bandwidth",
      "Re-wire autonomic coherence for high-stakes negotiation"
    ]
  },
  {
    id: "keynote-2",
    numberLabel: "KEYNOTE 2",
    title: "REGENESIS: THE PROTOCOL FOR EXPANSION",
    subtitle: "Architecting Biological Capacity for Sustainable Scale",
    para1: "Motivation runs out. Coherent Biology doesn't—it's a renewable engine. When you hit a growth ceiling, it's often your biology, not the market, resisting expansion. Your body sees growth as a threat and instinctively slows you down to protect you.",
    para2Html: (
      <>
        Stop running your leadership on emergency stress reserves. Learn the <strong className="font-bold text-black">REGENESIS Protocol™</strong>—the blueprint for upgrading your internal hardware to sustain exponential scale without the burnout.
      </>
    ),
    fullDescription: "Designed for C-suite executives, founders, and high-performance teams, this session delivers the 4-pillar tactical framework for neuro-biological capacity expansion and sustainable corporate longevity.",
    takeaways: [
      "Transition from sympathetic stress lock to coherent executive focus",
      "Implement the 365-day biological capacity expansion protocol",
      "Eliminate key-person biological risk across your executive team"
    ]
  }
];

export const Keynotes: React.FC<KeynotesProps> = ({ onOpenBooking }) => {
  const [selectedKeynote, setSelectedKeynote] = useState<KeynoteDetail | null>(null);

  return (
    <section id="keynotes-section" className="w-full relative bg-black text-white font-sans overflow-hidden py-16 sm:py-24">
      {/* Target anchor tag for #keynotes */}
      <div id="keynotes" className="absolute -top-20" />
      
      {/* Background Stage Image with Greyscale Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img 
          src={portraitImg} 
          alt="Thomas Ventura Keynote Stage" 
          className="w-full h-full object-cover filter grayscale contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </div>

      {/* Right side cutout portrait simulation */}
      <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-25 hidden lg:block pointer-events-none z-0">
        <img 
          src={thomasCutoutImg} 
          alt="Thomas Ventura Speaking" 
          className="h-full w-auto object-cover filter grayscale contrast-150 ml-auto"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-sans font-medium text-[#cccccc] tracking-wide block mb-2">
            Where Biology Meets Business Strategy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-sans">
            SIGNATURE KEYNOTES
          </h2>
        </div>

        {/* 2 White Keynote Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {KEYNOTES_LIST.map((keynote) => (
            <div 
              key={keynote.id}
              className="bg-white text-black rounded-2xl p-8 sm:p-10 shadow-2xl flex flex-col justify-between text-center items-center transform hover:-translate-y-1 transition-all duration-300 border border-gray-200"
            >
              <div className="w-full flex flex-col items-center">
                {/* Keynote Number */}
                <span className="text-xs font-mono font-black tracking-widest text-[#8c5d12] uppercase mb-2">
                  {keynote.numberLabel}
                </span>

                {/* Main Keynote Title */}
                <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight leading-snug mb-2 font-sans">
                  {keynote.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm font-bold text-[#222222] mb-6 font-sans">
                  {keynote.subtitle}
                </p>

                {/* Paragraph 1 */}
                <p className="text-xs sm:text-sm text-[#0d0d0d] font-normal leading-relaxed mb-4 font-sans">
                  {keynote.para1}
                </p>

                {/* Paragraph 2 */}
                <p className="text-xs sm:text-sm text-[#0d0d0d] font-normal leading-relaxed mb-8 font-sans">
                  {keynote.para2Html}
                </p>
              </div>

              {/* Read Full Description Gold Button */}
              <button
                onClick={() => setSelectedKeynote(keynote)}
                className="px-7 py-3 rounded-lg text-xs sm:text-sm font-bold text-black shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                style={{
                  background: 'linear-gradient(180deg, #e6bc52 0%, #cb9a2f 100%)',
                }}
              >
                Read Full Description
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Full Description Modal */}
      {selectedKeynote && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0c0a07] text-white border border-[#3d2e1b] rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto animate-fadeIn text-left">
            
            <button
              onClick={() => setSelectedKeynote(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#1c1812] text-[#aaaaaa] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono font-bold text-[#e2b13d] uppercase tracking-wider block mb-1">
              {selectedKeynote.numberLabel} Overview
            </span>

            <h3 className="text-2xl font-black text-white font-sans uppercase mb-2">
              {selectedKeynote.title}
            </h3>

            <p className="text-xs font-semibold text-[#c9962f] mb-4">
              {selectedKeynote.subtitle}
            </p>

            <p className="text-sm text-[#dddddd] leading-relaxed mb-6 font-sans">
              {selectedKeynote.fullDescription}
            </p>

            <div className="space-y-2 mb-8 bg-[#14100a] p-4 rounded-xl border border-[#2d2113]">
              <span className="text-xs font-mono font-bold text-[#e2b13d] uppercase block mb-2">
                Audience Key Takeaways
              </span>
              {selectedKeynote.takeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#cccccc]">
                  <CheckCircle2 className="w-4 h-4 text-[#e2b13d] shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const title = selectedKeynote.title;
                  setSelectedKeynote(null);
                  if (onOpenBooking) {
                    onOpenBooking(`Keynote Booking: ${title}`);
                  }
                }}
                className="w-full py-3 px-5 text-xs font-bold text-black gold-gradient-bg rounded-lg uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Check Availability For Event</span>
              </button>

              <button
                onClick={() => setSelectedKeynote(null)}
                className="w-full py-3 px-5 text-xs font-semibold text-[#dddddd] bg-[#1a1815] border border-[#332617] rounded-lg hover:bg-[#252019] flex items-center justify-center"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export const KeynotesSection = Keynotes;
