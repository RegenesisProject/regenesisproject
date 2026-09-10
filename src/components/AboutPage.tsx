import React, { useState, useEffect, useRef } from 'react';
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
import journeySilhouette from '../assets/images/journey_silhouette_1788616759304.jpg';
import part1Thumbnail from '../assets/images/series_part1_limit_switch_1788902240200.jpg';
import part2Thumbnail from '../assets/images/series_part2_willpower_1788902255808.jpg';
import part3Thumbnail from '../assets/images/series_part3_origin_1788902270549.jpg';
import part4Thumbnail from '../assets/images/series_part4_about_you_1788902283710.jpg';
import part5Thumbnail from '../assets/images/series_part5_spec_code_1788902297184.jpg';

interface VideoEpisode {
  id: string;
  partNumber: number;
  title: string;
  subline: string;
  duration?: string;
  thumbnailUrl: string;
  isAvailable?: boolean;
  youtubeId?: string;
}

const SERIES_EPISODES: VideoEpisode[] = [
  {
    id: 'v1-ep1',
    partNumber: 1,
    title: 'The Limit Switch',
    subline: "What you've called discipline, timing, or fear was never any of those.",
    duration: '',
    thumbnailUrl: part1Thumbnail,
    isAvailable: true,
    youtubeId: 'qKMNyDz7TnE',
  },
  {
    id: 'v1-ep2',
    partNumber: 2,
    title: 'Why Willpower Loses',
    subline: 'What the research shows about trying to out-muscle your own wiring.',
    duration: '',
    thumbnailUrl: part2Thumbnail,
    isAvailable: false,
  },
  {
    id: 'v1-ep3',
    partNumber: 3,
    title: 'The Origin',
    subline: 'A war zone, a collapse, and a decade of decoding.',
    duration: '',
    thumbnailUrl: part3Thumbnail,
    isAvailable: false,
  },
  {
    id: 'v1-ep4',
    partNumber: 4,
    title: 'This Is About You',
    subline: "Your past didn't need a combat zone to build one of these.",
    duration: '',
    thumbnailUrl: part4Thumbnail,
    isAvailable: false,
  },
  {
    id: 'v1-ep5',
    partNumber: 5,
    title: 'Reading Your Own Code',
    subline: "You can't rewrite code you've never read.",
    duration: '',
    thumbnailUrl: part5Thumbnail,
    isAvailable: false,
  },
];

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
  // Default to Part 3 — The Origin on the About page
  const [activeEpisode, setActiveEpisode] = useState<VideoEpisode>(SERIES_EPISODES[2]);
  const playerIframeRef = useRef<HTMLIFrameElement>(null);

  // Auto-advance sequence setup via YouTube IFrame message listener
  useEffect(() => {
    if (!isVideoOpen) return;

    const handleWindowMessage = (event: MessageEvent) => {
      try {
        let data = event.data;
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        // YouTube API postMessage state change event (0 === YT.PlayerState.ENDED)
        if (data?.event === 'onStateChange' && data?.info === 0) {
          setActiveEpisode((current) => {
            const nextPart = current.partNumber + 1;
            const nextEp = SERIES_EPISODES.find((ep) => ep.partNumber === nextPart);
            if (nextEp) {
              return nextEp;
            }
            return current;
          });
        }
      } catch {
        // Ignore cross-origin non-JSON messages
      }
    };

    window.addEventListener('message', handleWindowMessage);
    return () => window.removeEventListener('message', handleWindowMessage);
  }, [isVideoOpen]);

  return (
    <div className="bg-[#0C0B0A] text-[#F3EFE0] min-h-screen py-10 sm:py-16 px-4 sm:px-8 lg:px-16 border-b border-[#C9A227]/20 relative overflow-hidden font-inter">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[#C9A227]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#7E4F11]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1450px] mx-auto relative z-10">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* ================= LEFT COLUMN: PORTRAIT ================= */}
          <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-24">
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
            </ScrollReveal>
          </div>

          {/* ================= RIGHT COLUMN: HERO / IDENTITY & BIO ================= */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <ScrollReveal delay={0.15} yOffset={24}>
              
              {/* HERO / IDENTITY */}
              <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[#C9A227] tracking-[0.2em] sm:tracking-[0.25em] uppercase whitespace-pre-wrap">
                CEO  |  AUTHOR  |  KEYNOTE SPEAKER  |  CREATOR OF THE REGENESIS PROJECT
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
                  <div className="font-playfair font-bold text-lg sm:text-2xl text-[#FFFFFF]">
                    15+ YRS
                  </div>
                  <div className="font-mono text-[8px] sm:text-[9px] text-[#C9A227] tracking-wider uppercase font-semibold mt-2">
                    Two Operations, Side by Side
                  </div>
                </div>

                <div className="bg-[#151412] border border-[#C9A227]/25 rounded-xl p-3 sm:p-3.5 text-left">
                  <div className="font-playfair font-bold text-lg sm:text-2xl text-[#FFFFFF]">
                    8 FIGURES
                  </div>
                  <div className="font-mono text-[8px] sm:text-[9px] text-[#C9A227] tracking-wider uppercase font-semibold mt-2">
                    Cumulative Revenue Across Both
                  </div>
                </div>

                <div className="bg-[#151412] border border-[#C9A227]/25 rounded-xl p-3 sm:p-3.5 text-left">
                  <div className="font-playfair font-bold text-lg sm:text-2xl text-[#FFFFFF]">
                    6 FAILURES
                  </div>
                  <div className="font-mono text-[8px] sm:text-[9px] text-[#C9A227] tracking-wider uppercase font-semibold mt-2">
                    Before the First Exit
                  </div>
                </div>

                <div className="bg-[#151412] border border-[#C9A227]/25 rounded-xl p-3 sm:p-3.5 text-left">
                  <div className="font-playfair font-bold text-lg sm:text-2xl text-[#FFFFFF]">
                    1 MISSION
                  </div>
                  <div className="font-mono text-[8px] sm:text-[9px] text-[#C9A227] tracking-wider uppercase font-semibold mt-2">
                    End the Internal War
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* VIDEO PLACEHOLDER */}
            <div 
              onClick={() => {
                setActiveEpisode(SERIES_EPISODES[2]); // Default to Part 3 — The Origin on the About page
                setIsVideoOpen(true);
              }}
              className="group relative my-4 sm:my-6 bg-[#14120F] border border-[#C9A227]/30 hover:border-[#C9A227] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#000000]">
                <img 
                  src={journeySilhouette} 
                  alt="From a war zone to a business — the same wiring, two different worlds" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-105 brightness-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-[#0C0B0A]/40 to-transparent" />

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#C9962F] to-[#E2B13D] text-[#000000] shadow-[0_0_25px_rgba(226,177,61,0.6)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1 text-[#000000]" />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 sm:p-5 bg-[#12100d] border-t border-[#C9A227]/20">
                <p className="text-xs sm:text-sm font-playfair font-bold text-[#FFFFFF] leading-snug">
                  Watch: The Story &amp; Origin of Thomas Ventura
                </p>
                <p className="text-xs text-[#D4CEBF] font-inter mt-1 leading-relaxed">
                  From war-zone refugee to running two multi-million dollar operations at once — and why none of it fixed the real problem.
                </p>
              </div>
            </div>

            {/* BIO TEXT */}
            <div className="space-y-4 sm:space-y-5 text-xs sm:text-base text-[#D4CEBF] leading-relaxed font-inter pt-1">
              <p>
                Thomas Ventura is not a theorist. He is a veteran operator who decoded his own machine because his life depended on it.
              </p>

              <p>
                His story didn't start in America. He was born into a country that collapsed around him — surviving a catastrophic earthquake at two years old, then abandoned into dirt-floor poverty as a civil war erupted around him. By nine he had been held hostage at gunpoint for ransom, escaped a siege under machine-gun and tank fire, and been evacuated under fire aboard a U.S. C-130 military cargo plane.
              </p>

              <p>
                His life in the States began at nine, in the ghettos of Brooklyn and later Los Angeles — through poverty, gang violence, and brutal domestic abuse. By his early twenties he had been nearly killed three separate times. That childhood taught his nervous system one lesson above all others: stay alert, or don't survive. That wiring got him out. It also never turned off.
              </p>

              <p>
                He started with nothing and clawed his way out on feral, brute-force willpower. He took every job he could get, until he trained into underwater inspection — commercial diving for the oil majors, on sites across the country and overseas. He almost drowned twice. That forced him to find another path, one out of the employee trap.
              </p>

              <p>
                Then six business failures. He swallowed the shame each time and refused to stop — until one of them finally worked, and he sold it in his early thirties. His first exit. He took that momentum and built two multi-million dollar business operations, running them side by side for over fifteen years: national logistics, complex supply chains, and heavy manufacturing across multiple regional hubs. Eight figures in cumulative revenue across both.
              </p>

              <p>
                From the outside, it looked like the war was won. Inside, it was still being fought.
              </p>

              <p>
                What he called ambition was high-functioning anxiety. What he called independence was a nervous system that never stopped waiting for the next attack. He was running a high-stakes life on undiagnosed Complex PTSD.
              </p>

              <p>
                And underneath all of it, that familiar hum of imposter syndrome — the belief that no matter how much he achieved, he was still just a child of the gutter, faking his way through a success he didn't actually deserve.
              </p>

              <p>
                What looked like "procrastination," "self-sabotage," or "rigid control" was his body hitting its biological capacity — a survival system protecting him against pressure it could no longer metabolize. It ended where it always ends: panic attacks mistaken for heart attacks, emergency rooms, and a hard ceiling that no strategy, discipline, or success could break through.
              </p>

              <p>
                His survival operating system had a setpoint. That setpoint was his ceiling.
              </p>

              {/* Pull Quote */}
              <div className="bg-[#181613] border-l-4 border-[#C9A227] border-y border-r border-[#C9A227]/30 rounded-r-xl p-4 sm:p-6 my-4 sm:my-6 shadow-inner">
                <p className="font-playfair font-bold text-base sm:text-xl text-[#FCE289] leading-snug">
                  &ldquo;Code can be rewritten. I had to rewrite mine.&rdquo;
                </p>
              </div>

              <p>
                Refusing to accept the ceiling, Thomas spent years decoding it — mapping the human survival architecture across twelve scientific disciplines and testing everything on the hardest subject he had: himself. The result is The REGENESIS Project — an identity-architecture framework that decodes the Survival Operating System (SOS) silently capping your capacity, and reconfigures it.
              </p>

              <p>
                Today, Thomas helps anyone with the drive to build, lead, or create — founders, creators, closers, and builders of every kind — end the internal war between their drive to expand and the survival code built to keep them safe and small.
              </p>
            </div>

            {/* THE TRILOGY STRIP */}
            <div className="pt-8 border-t border-[#C9A227]/20 space-y-4">
              <div className="space-y-1">
                <h3 className="font-playfair font-bold text-base sm:text-lg tracking-[0.2em] sm:tracking-[0.25em] text-[#F3EFE0] uppercase">
                  THE REGENESIS TRILOGY
                </h3>
                <p className="font-mono text-[10px] sm:text-[11px] text-[#C9A227] tracking-wider font-semibold">
                  The Survival Source Code · The REGENESIS Protocol · The REGENESIS Blueprint
                </p>
                <p className="font-inter text-xs text-[#D4CEBF]/80 pt-0.5">
                  Book One — Coming 2027. Books Two &amp; Three to follow.
                </p>
              </div>

              {/* 3 Book Covers Display Row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg pt-1">
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
            </div>

            {/* EXPLORE + CTA */}
            <div className="pt-8 border-t border-[#C9A227]/20 space-y-4">
              <div className="space-y-1">
                <h4 className="font-playfair font-bold text-sm sm:text-base text-[#FFFFFF] uppercase tracking-wider">
                  EXPLORE THE FRAMEWORK: The Science · The Mythology · Keynotes
                </h4>
                <p className="font-inter text-xs text-[#C9A227]">
                  See what's running underneath your drive.
                </p>
              </div>

              {/* Secondary Navigation Links */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
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

              {/* Primary CTA / Quiz Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onOpenMirrorQuiz}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#7E4F11] via-[#C9A227] to-[#E2B13D] hover:opacity-90 text-black font-inter text-xs font-black uppercase tracking-[0.2em] rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer flex-1"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>GET EARLY ACCESS TO THE MIRROR QUIZ</span>
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
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a 
                  href="https://www.youtube.com/@IamThomasVentura" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-lg bg-[#181613] border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0C0B0A] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                  <span className="sr-only">YouTube</span>
                </a>
                <a 
                  href="https://web.facebook.com/profile.php?id=61585176921142" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-lg bg-[#181613] border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0C0B0A] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a 
                  href="https://www.instagram.com/iamthomasventura/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-lg bg-[#181613] border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0C0B0A] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Video Player Modal — Full 5-Part Series */}
      {isVideoOpen && (
        <div 
          onClick={() => setIsVideoOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pt-16 sm:pt-24 pb-3 bg-[#000000]/90 backdrop-blur-md animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[calc(100dvh-5rem)] flex flex-col bg-[#111111] border border-[#E2B13D]/60 rounded-2xl p-3 sm:p-5 md:p-6 shadow-[0_0_50px_rgba(226,177,61,0.3)] text-[#FFFFFF] overflow-y-auto overscroll-contain"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-9 h-9 flex items-center justify-center text-[#E2B13D] hover:text-[#FFFFFF] bg-[#000000]/80 border border-[#7E4F11] hover:border-[#E2B13D] rounded-full transition-colors cursor-pointer z-20 active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Video Player Display */}
            <div className="relative aspect-video max-h-[36vh] sm:max-h-[44vh] w-full rounded-xl overflow-hidden bg-[#000000] border border-[#7E4F11]/50 mb-3 sm:mb-4 flex items-center justify-center group shrink-0">
              {activeEpisode?.youtubeId ? (
                <iframe
                  ref={playerIframeRef}
                  src={`https://www.youtube.com/embed/${activeEpisode.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                  title={activeEpisode.title}
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <>
                  <img 
                    src={activeEpisode?.thumbnailUrl || journeySilhouette} 
                    alt={activeEpisode?.title || "Watch: The Story & Origin of Thomas Ventura"}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-[#000000]/40" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-2.5">
                    <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FCE289] bg-[#000000]/90 px-4 py-1.5 rounded-full border border-[#E2B13D]/50 shadow-md">
                      COMING SOON
                    </span>
                    <p className="text-xs sm:text-sm text-[#F3EFE0] font-inter">
                      Want to know the moment it's live?
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsVideoOpen(false);
                        onOpenMirrorQuiz();
                      }}
                      className="mt-1 px-4 py-2 sm:px-5 sm:py-2.5 rounded bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-black font-inter font-bold text-[10px] sm:text-xs uppercase tracking-[0.15em] hover:scale-105 transition-all shadow-md cursor-pointer"
                    >
                      GET EARLY ACCESS TO THE MIRROR QUIZ
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* 5-Part Series Episode Selector */}
            <div className="my-4 pt-3 pb-1 border-t border-[#7E4F11]/40">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FCE289] font-bold">
                    IT WAS NEVER DISCIPLINE — 5-PART SERIES
                  </span>
                  <span className="text-[11px] text-[#A69B89] font-inter hidden sm:inline">
                    — Select a part to view
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#E2B13D]/80">
                  Part {activeEpisode.partNumber} of 5
                </span>
              </div>

              {/* Grid of all 5 parts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {SERIES_EPISODES.map((ep) => {
                  const isCurrent = activeEpisode.id === ep.id;
                  return (
                    <button
                      key={ep.id}
                      type="button"
                      onClick={() => setActiveEpisode(ep)}
                      className={`group relative text-left rounded-xl p-2 transition-all duration-300 flex flex-col justify-between border cursor-pointer ${
                        isCurrent
                          ? 'bg-[#1D160C] border-[#FCE289] ring-2 ring-[#FCE289]/70 shadow-[0_0_20px_rgba(252,226,137,0.4)] -translate-y-0.5'
                          : 'bg-[#0D0D0D] border-[#7E4F11]/40 hover:border-[#E2B13D] hover:bg-[#14110C] opacity-80 hover:opacity-100'
                      }`}
                    >
                      {/* Artwork Thumbnail */}
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-[#050403] mb-2 border border-[#7E4F11]/40 flex items-center justify-center">
                        {ep.thumbnailUrl ? (
                          <img 
                            src={ep.thumbnailUrl} 
                            alt={ep.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        ) : (
                          <span className="font-playfair font-bold text-lg sm:text-xl text-[#FCE289]/90 tracking-wider">
                            0{ep.partNumber}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Number Badge */}
                        <div className="absolute top-1.5 left-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E2B13D] text-[#000000] font-bold font-inter text-[10px] sm:text-xs flex items-center justify-center shadow-md border border-[#FCE289]">
                          {ep.partNumber}
                        </div>

                        {/* Mini Play Indicator */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {isCurrent ? (
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#E2B13D] text-black flex items-center justify-center shadow-[0_0_12px_rgba(226,177,61,0.7)]">
                              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/70 text-[#E2B13D] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E2B13D] group-hover:text-black transition-all">
                              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Episode Title */}
                      <div>
                        <div className="text-[9px] font-mono text-[#FCE289] mb-0.5">
                          PART {ep.partNumber}
                        </div>
                        <h4 className="font-playfair font-bold text-[11px] sm:text-xs text-[#FFFFFF] leading-snug line-clamp-2 group-hover:text-[#FCE289] transition-colors">
                          {ep.title}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 flex-wrap">
                  <span className="font-inter text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#000000] bg-[#FCE289] px-2 py-0.5 rounded">
                    PART {activeEpisode.partNumber}
                  </span>
                </div>

                <h3 className="font-playfair font-bold text-lg sm:text-xl md:text-2xl text-[#FFFFFF] mb-1.5 sm:mb-2">
                  PART {activeEpisode.partNumber} — {activeEpisode.title}
                </h3>

                <p className="font-inter text-xs sm:text-sm text-[#E2B13D]/90 leading-relaxed">
                  {activeEpisode.subline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#7E4F11]/30 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#181613] border border-[#C9A227]/40 hover:border-[#C9A227] text-xs font-mono font-bold text-[#C9A227] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Player
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsVideoOpen(false);
                    onOpenMirrorQuiz();
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-black font-inter font-bold text-[10px] sm:text-xs uppercase tracking-[0.15em] hover:scale-105 transition-all shadow-md cursor-pointer"
                >
                  Get Early Access To The Mirror Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
