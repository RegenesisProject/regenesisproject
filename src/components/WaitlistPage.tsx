import React, { useState } from 'react';
import { book1Img, book2Img, book3Img } from '../data/content';
import { CheckCircle, ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { submitEmail } from '../utils/sheetApi';

interface WaitlistPageProps {
  onNavigateHome?: () => void;
  onOpenContact?: () => void;
  onOpenMirrorQuiz?: () => void;
  onNavigatePage?: (page: 'home' | 'science' | 'mythology' | 'about' | 'keynotes' | 'quiz' | 'speaker-kit' | 'waitlist') => void;
}

export const WaitlistPage: React.FC<WaitlistPageProps> = ({
  onNavigateHome,
  onOpenContact,
  onOpenMirrorQuiz,
  onNavigatePage,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('JOIN THE WAITLIST');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setButtonText('Submitting...');

    const res = await submitEmail(email, 'waitlist');

    if (res.status === 'success') {
      setButtonText('Subscribed ✓');
      setEmail('');
      setLoading(false);
    } else if (res.status === 'duplicate') {
      setButtonText("You're already on the list");
      setLoading(false);
    } else if (res.status === 'invalid') {
      setButtonText('Enter a valid email');
      setLoading(false);
    } else {
      setButtonText('Something went wrong — try again');
      setLoading(false);
    }
  };

  const handleQuizClick = () => {
    if (onOpenMirrorQuiz) {
      onOpenMirrorQuiz();
    } else if (onNavigatePage) {
      onNavigatePage('quiz');
    } else if (typeof window !== 'undefined') {
      window.location.href = '/mirror-quiz';
    }
  };

  return (
    <div className="bg-[#FFFFFF] text-[#111111] min-h-screen py-10 sm:py-16 px-4 sm:px-8 lg:px-12 font-sans relative overflow-hidden">
      
      <div className="max-w-[1050px] mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* Back Navigation Button */}
        {onNavigateHome && (
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-500 hover:text-[#c99a38] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Page</span>
          </button>
        )}

        {/* STEP 1: CENTERED HERO TOP HEADER */}
        <ScrollReveal>
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            
            {/* Top Gold Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181A20] border border-[#D4AF37]/60 text-[#EAD25A] text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-[#EAD25A] text-[#EAD25A]" />
              <span>THE REGENESIS TRILOGY</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-sans font-black text-[#111111] tracking-tight leading-[1.08] uppercase max-w-3xl mx-auto">
              One war. Three books.<br />
              Be there when the first one lands.
            </h1>

            {/* Description Subtitle */}
            <p className="text-sm sm:text-base text-stone-500 font-sans font-normal leading-relaxed max-w-2xl mx-auto">
              Book One decodes the survival code written in your earliest years. Book Two hands you the protocol to interrupt and rewrite it. Book Three is the 365-day blueprint for living the new configuration — and becoming The ONE.
            </p>

            {/* Dark Horizontal Pill Capsule with 3 Book Release Statuses */}
            <div className="mt-8 inline-block w-full max-w-3xl bg-[#14161D] border border-[#D4AF37]/50 rounded-2xl sm:rounded-full p-3 sm:p-4 text-white shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 text-center divide-y sm:divide-y-0 sm:divide-x divide-stone-800 text-xs sm:text-[13px] font-sans">
                <div className="px-2 py-1">
                  <span className="font-extrabold text-[#FCE338] uppercase">BOOK ONE</span>
                  <span className="text-stone-300"> — The Survival Source Code</span>
                  <span className="text-stone-400 font-mono text-[11px] block sm:inline"> · Coming 2027</span>
                </div>
                <div className="px-2 py-1">
                  <span className="font-bold text-stone-300 uppercase">BOOK TWO</span>
                  <span className="text-stone-400"> — The REGENESIS Protocol</span>
                  <span className="text-stone-500 font-mono text-[11px] block sm:inline"> · To Follow</span>
                </div>
                <div className="px-2 py-1">
                  <span className="font-bold text-stone-300 uppercase">BOOK THREE</span>
                  <span className="text-stone-400"> — The REGENESIS Blueprint</span>
                  <span className="text-stone-500 font-mono text-[11px] block sm:inline"> · To Follow</span>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* STEP 2: MIDDLE SECTION GRID (FORM & 3D FAN-STACKED BOOKS) */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-4">
            
            {/* Left Column: Form Section */}
            <div className="lg:col-span-6 space-y-5">
              
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-[#c99a38] uppercase block mb-1">
                  EXCLUSIVE ACCESS
                </span>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#111111] tracking-tight">
                  Join the waitlist
                </h2>
              </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (buttonText !== 'JOIN THE WAITLIST') setButtonText('JOIN THE WAITLIST');
                      }}
                      className="flex-1 px-4 py-3.5 bg-white border-2 border-stone-200 rounded-xl text-sm text-black placeholder-stone-400 focus:outline-none focus:border-[#c99a38] transition-all font-sans shadow-sm"
                    />
                    <button
                      type="submit"
                      disabled={loading || buttonText === 'Subscribed ✓'}
                      className="py-3.5 px-6 rounded-xl bg-[#FCE338] hover:bg-[#ebd123] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md shrink-0 whitespace-nowrap disabled:opacity-80"
                    >
                      <span>{buttonText}</span>
                    </button>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    You&apos;ll hear from us when Book One has a firm release date, and before it goes on sale anywhere else. That&apos;s it — no noise in between.
                  </p>

                  <p className="text-[11px] text-stone-400 font-sans pt-2 border-t border-stone-200">
                    You&apos;re signing up to receive emails from Thomas Ventura.
                  </p>
                </form>

            </div>

            {/* Right Column: 3D Fan Stacked Book Covers Image */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center pt-6 lg:pt-0">
              
              {/* Composite Book Covers Image */}
              <div className="w-full max-w-[420px] flex items-center justify-center py-2">
                <img 
                  src="https://res.cloudinary.com/ew2ztpgz/image/upload/v1786988163/rearrange_2_oabx2u.png" 
                  alt="The REGENESIS Trilogy Book Covers" 
                  className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Book Labels Row Below the Stack */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 text-center">
                
                <div className="px-3 py-1.5 rounded-full bg-[#14161D] text-white text-[10px] font-mono flex items-center gap-1.5 border border-[#D4AF37]/50 shadow-sm">
                  <span className="font-extrabold text-[#FCE338] bg-[#222530] px-1.5 py-0.5 rounded uppercase">BOOK 1</span>
                  <span className="text-stone-300 font-sans font-medium text-[11px]">The Survival Source Code</span>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-[#14161D] text-white text-[10px] font-mono flex items-center gap-1.5 border border-stone-800 shadow-sm">
                  <span className="font-bold text-stone-400 bg-[#222530] px-1.5 py-0.5 rounded uppercase">BOOK 2</span>
                  <span className="text-stone-400 font-sans font-medium text-[11px]">The REGENESIS Protocol</span>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-[#14161D] text-white text-[10px] font-mono flex items-center gap-1.5 border border-stone-800 shadow-sm">
                  <span className="font-bold text-stone-400 bg-[#222530] px-1.5 py-0.5 rounded uppercase">BOOK 3</span>
                  <span className="text-stone-400 font-sans font-medium text-[11px]">The REGENESIS Blueprint</span>
                </div>

              </div>

            </div>

          </div>
        </ScrollReveal>

        {/* STEP 3: "WHY THE HONEST VERSION" DARK CARD CONTAINER */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#181A22] text-white text-center space-y-4 shadow-2xl border border-[#D4AF37]/40 relative overflow-hidden">
            
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight">
              Why the honest version
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-xl mx-auto font-normal">
              REGENESIS is built on the idea that most personal development over-promises and under-delivers. We&apos;re not going to start by promising you a date we can&apos;t hold.
            </p>

            <p className="text-xs sm:text-sm text-[#FCE338] font-sans font-bold leading-relaxed max-w-xl mx-auto pt-1">
              Book One is being written now. When it has a real release date, you&apos;ll be the first to know.
            </p>

          </div>
        </ScrollReveal>

        {/* STEP 4: BOTTOM CTA BUTTON */}
        <ScrollReveal>
          <div className="pt-2 text-center">
            <button
              onClick={handleQuizClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FCE338] hover:bg-[#ebd123] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer inline-flex items-center justify-center gap-2 group"
            >
              <span>WHILE YOU WAIT — GET EARLY ACCESS TO THE MIRROR QUIZ</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};


