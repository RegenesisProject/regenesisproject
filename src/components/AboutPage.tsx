import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Linkedin, 
  Youtube, 
  Facebook, 
  Instagram, 
  Play,
  X,
  Atom,
  ShieldCheck,
  KeyRound
} from 'lucide-react';
import { BOOKS_DATA } from '../data/siteData';
import { BookInfo, PageKey } from '../types';
import { ScrollReveal } from './ScrollReveal';
import originDocBg from '../assets/images/origin_documentary_bg_1788304796361.jpg';

interface AboutPageProps {
  onNavigatePage: (page: PageKey, sectionId?: string) => void;
  onOpenMirrorQuiz: () => void;
  onOpenSpeakerKit: () => void;
  onOpenContact: () => void;
  onOpenWaitlist: () => void;
  onSelectBook: (book: BookInfo) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigatePage,
  onOpenMirrorQuiz,
  onSelectBook,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="bg-[#0C0B0A] text-[#F3EFE0] min-h-screen py-10 sm:py-16 px-3 sm:px-8 lg:px-16 border-b border-[#C9A227]/20 relative overflow-hidden font-inter">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[#C9A227]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#7E4F11]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1450px] mx-auto relative z-10">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* ================= LEFT COLUMN: PORTRAIT & TRILOGY STRIP ================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <ScrollReveal yOffset={20}>
              {/* Executive Portrait Box */}
              <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-xl overflow-hidden border border-[#C9A227]/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] bg-[#121110] group mx-auto">
                <img 
                  src="https://res.cloudinary.com/ew2ztpgz/image/upload/v1784828493/regenerated_image_1784798224610-B1a6fML__1_wqi17x.png" 
                  alt="Thomas Ventura — Creator of The REGENESIS Project"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient Vignette Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-transparent to-black/10 pointer-events-none" />
                <div className="absolute inset-0 border border-[#C9A227]/20 rounded-xl pointer-events-none" />
              </div>

              {/* THE TRILOGY STRIP */}
              <div className="mt-8 text-center space-y-1.5 w-full max-w-[480px] mx-auto">
                <h3 className="font-playfair font-bold text-base sm:text-lg tracking-[0.2em] sm:tracking-[0.25em] text-[#F3EFE0] uppercase">
                  THE REGENESIS TRILOGY
                </h3>
                <p className="font-mono text-[10px] sm:text-[11px] text-[#C9A227] tracking-wider font-semibold">
                  The Survival Source Code · The REGENESIS Protocol · The REGENESIS Blueprint
                </p>
                <p className="font-inter text-xs text-[#D4CEBF]/80 pt-1">
                  Book One — Coming 2027. Books Two &amp; Three to follow.
                </p>
              </div>

              {/* 3 Book Covers Display Row */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-[480px] mt-4 mx-auto">
                {BOOKS_DATA.map((book) => (
                  <div 
                    key={book.id}
                    onClick={() => onSelectBook(book)}
                    className="group/book relative cursor-pointer aspect-[1/1.45] rounded-md overflow-hidden border border-[#C9A227]/30 hover:border-[#C9A227] shadow-lg transition-all duration-300 hover:-translate-y-1 bg-[#1A1815]"
                  >
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/book:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover/book:bg-transparent transition-colors" />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* ================= RIGHT COLUMN: HERO / IDENTITY & BIO ================= */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <ScrollReveal delay={0.15} yOffset={24}>
              
              {/* HERO / IDENTITY */}
              <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[#C9A227] tracking-[0.2em] sm:tracking-[0.25em] uppercase flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span>CEO</span>
                <span className="text-white/30">|</span>
                <span>AUTHOR</span>
                <span className="text-white/30">|</span>
                <span>KEYNOTE SPEAKER</span>
                <span className="text-white/30">|</span>
                <span>CREATOR OF THE REGENESIS PROJECT</span>
              </div>

              {/* Headline & Subtitle */}
              <div className="space-y-1.5 sm:space-y-2 mt-4">
                <h1 className="font-playfair font-black text-3xl sm:text-5xl lg:text-6xl text-[#FFFFFF] tracking-tight leading-none">
                  MEET THOMAS VENTURA
                </h1>
                <p className="font-playfair italic text-lg sm:text-2xl text-[#C9A227]">
                  The Architect of Capacity
                </p>
              </div>

              {/* STAT CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-6">
                <div className="bg-[#151412] border border-[#C9A227]/25 rounded-xl p-3 sm:p-3.5 text-left">
                  <span className="font-playfair font-bold text-lg sm:text-2xl text-[#FFFFFF] block">18+ YRS</span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-[#C9A227] tracking-wider uppercase font-semibold block mt-0.5">Running Two Companies Simultaneously</span>
                </div>

                <div className="bg-[#151412] border border-[#C9A227]/25 rounded-xl p-3 sm:p-3.5 text-left">
                  <span className="font-playfair font-bold text-lg sm:text-2xl text-[#FFFFFF] block">8 FIGURES</span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-[#C9A227] tracking-wider uppercase font-semibold block mt-0.5">Cumulative Revenue Across Both</span>
                </div>

                <div className="bg-[#151412] border border-[#C9A227]/25 rounded-xl p-3 sm:p-3.5 text-left">
                  <span className="font-playfair font-bold text-lg sm:text-2xl text-[#FFFFFF] block">6 FAILURES</span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-[#C9A227] tracking-wider uppercase font-semibold block mt-0.5">Before the First Exit</span>
                </div>

                <div className="bg-[#151412] border border-[#C9A227]/25 rounded-xl p-3 sm:p-3.5 text-left">
                  <span className="font-playfair font-bold text-lg sm:text-2xl text-[#FFFFFF] block">1 MISSION</span>
                  <span className="font-mono text-[8px] sm:text-[9px] text-[#C9A227] tracking-wider uppercase font-semibold block mt-0.5">End the Internal War CAPPING YOUR CAPACITY</span>
                </div>
              </div>
            </ScrollReveal>

            {/* VIDEO SLOT */}
            <div 
              onClick={() => setIsVideoOpen(true)}
              className="group relative my-4 sm:my-6 bg-gradient-to-r from-[#181510] via-[#221c13] to-[#181510] border border-[#C9A227]/30 hover:border-[#C9A227] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#000000]">
                <img 
                  src={originDocBg} 
                  alt="Thomas Ventura Origin Documentary Briefing" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/30 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 bg-[#0C0B0A]/80 backdrop-blur-md border border-[#C9A227]/50 text-[#C9A227] text-[10px] font-mono font-bold px-2.5 py-1 rounded-md shadow">
                  IN PRODUCTION • 2027
                </div>

                {/* Center Announcement Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#C9962F] to-[#E2B13D] text-[#000000] shadow-[0_0_25px_rgba(226,177,61,0.6)] flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                    <Play className="w-6 h-6 fill-current ml-1 text-[#000000]" />
                  </div>
                  <span className="text-xs sm:text-base font-playfair font-bold uppercase tracking-wider text-[#FFFFFF] drop-shadow-md">
                    DOCUMENTARY SCHEDULED FOR PRODUCTION IN 2027
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-[#FCE289] font-medium tracking-wide mt-1.5 max-w-lg drop-shadow-sm">
                    Check Back Later
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#12100d] border-t border-[#C9A227]/20 flex items-center justify-between text-xs text-[#D4CEBF]">
                <span className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-[#C9A227]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ORIGIN DOCUMENTARY</span>
                </span>
                <span className="text-[#FFFFFF] font-bold text-xs uppercase tracking-wider group-hover:text-[#C9A227] transition-colors">
                  Coming 2027 &rarr;
                </span>
              </div>
            </div>

            {/* BIO TEXT */}
            <div className="space-y-4 sm:space-y-5 text-xs sm:text-base text-[#D4CEBF] leading-relaxed font-inter pt-1">
              <p className="font-semibold text-[#FFFFFF] text-sm sm:text-lg leading-snug">
                Thomas Ventura is not a theorist. He is a veteran operator who decoded his own machine because his life depended on it.
              </p>

              <p>
                His story didn't start in a boardroom. He was born into a country that collapsed around him — surviving a catastrophic earthquake at two years old, then escaping a civil war at nine as a refugee, his family evacuated under fire aboard a U.S. C-130. His life in America began in the ghettos of Brooklyn, and later Los Angeles — through poverty, gang violence, and a childhood that taught his nervous system one lesson above all others: <strong className="text-[#FFFFFF]">stay alert, or don't survive.</strong> That wiring got him out. It also never turned off.
              </p>

              <p>
                He clawed his way up through dozens of punishing jobs—surviving a few close calls with death as an elite commercial inspection diver for petrochemical majors—before forcing his way into entrepreneurship to escape the employer trap, ultimately failing six times before his first exit. He took that momentum and built two multi-million dollar companies, running them simultaneously for over eighteen years: national logistics, complex supply chains, heavy manufacturing, and a cumulative eight-figure revenue stream across both.
              </p>

              <p>
                From the outside, it looked like the war was won. Inside, it was still being fought. What looked like &ldquo;procrastination,&rdquo; &ldquo;self-sabotage,&rdquo; or &ldquo;rigid control&rdquo; was actually his body hitting its biological capacity — a survival system protecting him against pressure it could no longer metabolize. It ended where it always ends: panic attacks mistaken for heart attacks, emergency rooms, and a hard ceiling that no strategy, discipline, or success could break through.
              </p>

              {/* Pull Quote */}
              <div className="bg-[#181613] border-l-4 border-[#C9A227] border-y border-r border-[#C9A227]/30 rounded-r-xl p-4 sm:p-6 my-4 sm:my-6 shadow-inner">
                <p className="font-playfair font-bold text-base sm:text-xl text-[#FCE289] leading-snug">
                  &ldquo;The Survival Code can be written. I had to rewrite mine.&rdquo;
                </p>
              </div>

              <p>
                Refusing to accept the ceiling, Thomas spent the next decade decoding it — mapping the human survival architecture across 12 disciplines of sciences and testing everything on the hardest subject he had: himself. The result is <strong className="text-[#FFFFFF]">The REGENESIS Project</strong> — an identity-architecture framework that decodes the Survival Operating System (SOS) quietly limiting your capacity, and reconfigures it.
              </p>

              <p>
                Today, Thomas helps anyone with the drive to build, lead, or create — founders, creators, closers, and builders of every kind — end the internal war between their desire for expansion and their survival code and wiring.
              </p>
            </div>

            {/* EXPLORE + CTA */}
            <div className="pt-6 border-t border-[#C9A227]/20 space-y-4">
              <div className="space-y-1">
                <h4 className="font-playfair font-bold text-sm sm:text-base text-[#FFFFFF] uppercase tracking-wider">
                  EXPLORE THE FRAMEWORK: The Science · The Mythology · Keynotes
                </h4>
                <p className="font-inter text-xs text-[#C9A227]">
                  See what's running underneath your drive.
                </p>
              </div>

              {/* Primary CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onOpenMirrorQuiz}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#7E4F11] via-[#C9A227] to-[#E2B13D] hover:opacity-90 text-black font-inter text-xs font-black uppercase tracking-[0.2em] rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer flex-1"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>GET EARLY ACCESS TO THE MIRROR QUIZ</span>
                </button>
              </div>

              {/* Secondary Navigation Links */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                <button
                  onClick={() => onNavigatePage('science')}
                  className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#181613] hover:bg-[#C9A227] text-[#FFFFFF] hover:text-[#0C0B0A] border border-[#C9A227]/40 rounded-lg text-xs font-inter font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm flex-1 justify-center"
                >
                  <Atom className="w-4 h-4 text-[#C9A227]" />
                  <span>The Science</span>
                </button>

                <button
                  onClick={() => onNavigatePage('mythology')}
                  className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#181613] hover:bg-[#C9A227] text-[#FFFFFF] hover:text-[#0C0B0A] border border-[#C9A227]/40 rounded-lg text-xs font-inter font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm flex-1 justify-center"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                  <span>The Mythology</span>
                </button>

                <button
                  onClick={() => onNavigatePage('keynotes')}
                  className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#181613] hover:bg-[#C9A227] text-[#FFFFFF] hover:text-[#0C0B0A] border border-[#C9A227]/40 rounded-lg text-xs font-inter font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm flex-1 justify-center"
                >
                  <KeyRound className="w-4 h-4 text-[#C9A227]" />
                  <span>Keynotes</span>
                </button>
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="pt-6 border-t border-[#C9A227]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-3">
                <a 
                  href="https://www.linkedin.com/in/thomasventura/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-lg bg-[#181613] border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0C0B0A] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.youtube.com/@IamThomasVentura" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-lg bg-[#181613] border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0C0B0A] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="https://web.facebook.com/profile.php?id=61585176921142" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-lg bg-[#181613] border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0C0B0A] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.instagram.com/iamthomasventura/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-lg bg-[#181613] border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0C0B0A] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          onClick={() => setIsVideoOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 pt-20 bg-black/90 backdrop-blur-md animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-[#12100d] border border-[#C9A227]/60 rounded-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(201,162,39,0.3)] text-[#FFFFFF] overflow-y-auto"
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#C9A227] hover:text-[#FFFFFF] bg-[#000000]/80 border border-[#C9A227]/40 rounded-full transition-colors cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-widest block mb-1">
                IN PRODUCTION • 2027
              </span>
              <h3 className="text-xl sm:text-2xl font-playfair font-bold text-[#FFFFFF]">
                The Story &amp; Origin of Thomas Ventura
              </h3>
            </div>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#C9A227]/30 mb-4 flex items-center justify-center">
              <img 
                src={originDocBg}
                alt="Thomas Ventura Origin Documentary Reel"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#C9962F] to-[#E2B13D] text-black flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(201,162,39,0.7)]">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-black" />
                </div>
                <p className="text-sm sm:text-base font-playfair uppercase tracking-wider font-bold text-[#FFFFFF] drop-shadow-md">
                  DOCUMENTARY SCHEDULED FOR PRODUCTION IN 2027
                </p>
                <p className="text-xs sm:text-sm text-[#FCE289] font-mono max-w-md mt-2 drop-shadow-sm font-medium">
                  Check Back Later
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsVideoOpen(false)}
                className="px-5 py-2.5 rounded-lg bg-[#181613] border border-[#C9A227]/40 hover:border-[#C9A227] text-xs font-mono font-bold text-[#C9A227] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
