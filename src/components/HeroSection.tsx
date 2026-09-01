import React, { useState } from 'react';
import { Play, Sparkles, X, ArrowRight, ShieldCheck, Award, ChevronRight } from 'lucide-react';
import { submitEmail } from '../utils/sheetApi';

const HERO_BG_URL = 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1784739994/sreached_yc6gwp.png';

interface HeroSectionProps {
  onOpenMirrorQuiz: () => void;
  onOpenSpeakerKit: () => void;
  onOpenWaitlist: () => void;
}

interface VideoItem {
  id: string;
  eyebrow: string;
  title: string;
  subline: string;
  category: string;
  duration: string;
  description: string;
  thumbnailUrl: string;
  isStartHere?: boolean;
}

const VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    eyebrow: 'START HERE',
    title: 'It Was Never Discipline',
    subline: 'Why every attempt to expand keeps hitting the same wall — decoded by a war-zone refugee turned operator.',
    category: 'KEYNOTE HIGHLIGHT',
    duration: '',
    description: 'Why every attempt to expand keeps hitting the same wall — decoded by a war-zone refugee turned operator.',
    thumbnailUrl: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1784828493/regenerated_image_1784798224610-B1a6fML__1_wqi17x.png',
    isStartHere: true,
  },
  {
    id: 'v2',
    eyebrow: 'THE FRAMEWORK',
    title: 'What Is The REGENESIS Project?',
    subline: 'Why mindset keeps failing you — and what actually rewrites the pattern.',
    category: 'EXECUTIVE ADVISORY',
    duration: '',
    description: 'Why mindset keeps failing you — and what actually rewrites the pattern.',
    thumbnailUrl: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1786988742/regenesis_wings_5_mzlkgi.png',
  },
  {
    id: 'v3',
    eyebrow: 'THE ASSESSMENT',
    title: 'What Is The Mirror Quiz?',
    subline: 'A system scan that shows you the hardware running underneath your habits.',
    category: 'FRAMEWORK BREAKDOWN',
    duration: '',
    description: 'A system scan that shows you the hardware running underneath your habits.',
    thumbnailUrl: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1786988577/mirror_quiz_cover_x9ldby.jpg',
  },
  {
    id: 'v4',
    eyebrow: 'COMING 2027',
    title: 'The Trilogy',
    subline: 'Three books mapping the full migration.',
    category: 'UPCOMING RELEASE',
    duration: '',
    description: 'Three books mapping the full migration.',
    thumbnailUrl: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1785187163/book_1.2_-_Copy_op3afs.png',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenMirrorQuiz,
  onOpenSpeakerKit,
  onOpenWaitlist,
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<VideoItem | null>(null);
  const [trilogyEmail, setTrilogyEmail] = useState('');
  const [trilogyLoading, setTrilogyLoading] = useState(false);
  const [trilogyButtonText, setTrilogyButtonText] = useState('Join Trilogy Waitlist');

  const handleTrilogySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trilogyEmail.trim()) return;

    setTrilogyLoading(true);
    setTrilogyButtonText('Joining...');

    const res = await submitEmail(trilogyEmail.trim(), 'waitlist');

    if (res.status === 'success') {
      setTrilogyButtonText('Subscribed ✓');
      setTrilogyEmail('');
      setTrilogyLoading(false);
    } else if (res.status === 'duplicate') {
      setTrilogyButtonText("You're already on the list");
      setTrilogyLoading(false);
    } else if (res.status === 'invalid') {
      setTrilogyButtonText('Enter a valid email');
      setTrilogyLoading(false);
    } else {
      setTrilogyButtonText('Something went wrong — try again');
      setTrilogyLoading(false);
    }
  };

  return (
    <section className="relative min-h-[90vh] bg-[#000000] text-[#FFFFFF] pt-16 sm:pt-24 pb-12 sm:pb-16 px-3 sm:px-8 lg:px-12 flex flex-col justify-between overflow-hidden border-b border-[#7E4F11]/30">
      
      {/* Stadium / Keynote Audience Background Image (Default) */}
      <img 
        src={HERO_BG_URL} 
        alt="Thomas Ventura Keynote Stage" 
        referrerPolicy="no-referrer"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out pointer-events-none ${
          hoveredVideo ? 'opacity-20 scale-105' : 'opacity-65 scale-100'
        }`}
      />

      {/* Hovered Video Background Layer Cross-Fade */}
      {VIDEOS.map((vid) => (
        <img 
          key={`bg-${vid.id}`}
          src={vid.thumbnailUrl} 
          alt={vid.title}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out pointer-events-none ${
            hoveredVideo?.id === vid.id ? 'opacity-75 scale-105' : 'opacity-0 scale-100'
          }`}
        />
      ))}

      {/* Dark Vignette Overlay for High Typography Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/85 via-[#000000]/60 to-[#000000]/95 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#7E4F11]/25 via-[#C9962F]/15 to-transparent blur-[140px] pointer-events-none" />

      {/* Center Hero Banner Section */}
      <div className="max-w-5xl mx-auto text-center relative z-10 my-auto py-8 sm:py-12 lg:py-16 px-4">
        
        {/* Main Bold Headline */}
        <h1 className="font-playfair font-bold text-3xl sm:text-5xl md:text-6xl text-[#FFFFFF] leading-[1.18] tracking-tight mb-5 max-w-4xl mx-auto drop-shadow-xl">
          The hardest part of building your dreams isn't strategy, mindset, or willpower.
        </h1>

        {/* Headline 2: Highlighted Key Statement Badge */}
        <div className="relative inline-block my-2 sm:my-3 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#181107]/90 via-[#2a1d0d] to-[#181107]/90 border border-[#C9962F]/50 shadow-[0_0_35px_rgba(201,150,47,0.25)] backdrop-blur-md">
          <p className="font-inter text-lg sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FCE289] via-[#E2B13D] to-[#C9962F] tracking-tight">
            It's the internal war against your own biology.
          </p>
        </div>

        {/* Subhead Explanation Card */}
        <div className="mt-6 mb-8 max-w-3xl mx-auto p-5 sm:p-6 rounded-2xl bg-[#0c0804]/80 border border-[#3d2e1b] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden text-left sm:text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-[1.5px] bg-gradient-to-r from-transparent via-[#E2B13D] to-transparent" />
          <p className="font-inter text-sm sm:text-base md:text-lg text-[#E6E1D5] leading-relaxed font-normal">
            Your earliest years installed a Survival Operating System that still runs you today. REGENESIS decodes it — and reconfigures the patterns silently capping your capacity.
          </p>
        </div>

        {/* Call-to-action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto w-full">
          <button
            onClick={onOpenMirrorQuiz}
            className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-xl bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-[#000000] font-inter font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_4px_30px_rgba(226,177,61,0.45)] hover:shadow-[0_6px_40px_rgba(226,177,61,0.7)] hover:scale-[1.02] transition-all duration-300"
          >
            <span>GET EARLY ACCESS TO THE MIRROR QUIZ</span>
            <ChevronRight className="w-4.5 h-4.5 text-[#000000]" />
          </button>
        </div>

      </div>

      {/* Bottom Floating 4-Card Grid Row */}
      <div className="max-w-[1600px] mx-auto w-full relative z-10 mt-6 lg:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {VIDEOS.map((vid, idx) => (
            <div key={vid.id} className="relative flex flex-col">
              {/* Card Container */}
              <div
                onClick={() => setActiveVideo(vid)}
                onMouseEnter={() => setHoveredVideo(vid)}
                onMouseLeave={() => setHoveredVideo(null)}
                className={`group relative min-h-[260px] sm:min-h-[280px] lg:min-h-[300px] rounded-2xl overflow-hidden bg-[#111111] transition-all duration-500 cursor-pointer flex flex-col justify-between p-5 sm:p-6 border ${
                  vid.isStartHere
                    ? 'border-[#FCE289] shadow-[0_0_40px_rgba(252,226,137,0.45)] ring-1 ring-[#FCE289]/60 hover:shadow-[0_0_60px_rgba(252,226,137,0.7)] hover:-translate-y-1.5'
                    : 'border-[#7E4F11]/50 hover:border-[#E2B13D] hover:shadow-[0_0_30px_rgba(226,177,61,0.35)] hover:-translate-y-1'
                }`}
              >
                {/* Back card glowing aura for "START HERE" */}
                {vid.isStartHere && (
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FCE289] via-[#E2B13D] to-[#C9962F] opacity-30 blur-xl group-hover:opacity-50 transition-opacity pointer-events-none" />
                )}

                {/* Card Photo Background */}
                <img 
                  src={vid.thumbnailUrl} 
                  alt={vid.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Gradient Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/75 to-[#000000]/40 group-hover:bg-black/60 transition-colors duration-300" />

                {/* Top Bar inside Card: Eyebrow badge on top left, Duration tag on top right */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div>
                    {vid.isStartHere ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FCE289] text-[#000000] font-black text-[10px] tracking-[0.18em] uppercase font-mono shadow-[0_0_15px_rgba(252,226,137,0.8)] animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                        {vid.eyebrow}
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-1 rounded-md bg-[#000000]/80 text-[#E2B13D] border border-[#E2B13D]/40 font-bold text-[10px] tracking-[0.15em] uppercase font-mono backdrop-blur-md">
                        {vid.eyebrow}
                      </span>
                    )}
                  </div>

                  {vid.duration ? (
                    <span className="font-mono text-[10px] font-bold text-[#E2B13D] bg-[#000000]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#E2B13D]/30 shrink-0">
                      {vid.duration}
                    </span>
                  ) : null}
                </div>

                {/* Bottom Content: Title, Sub-line & Floating Circular Play Icon */}
                <div className="relative z-10 pt-6">
                  <div className="flex items-end justify-between gap-3">
                    <div className="pr-1 flex-1">
                      {/* Title: Bigger headline */}
                      <h3 className="font-playfair font-bold text-lg sm:text-xl text-[#FFFFFF] leading-snug group-hover:text-[#FCE289] transition-colors drop-shadow-md">
                        {vid.title}
                      </h3>
                      
                      {/* Sub-line: Smaller text */}
                      <p className="font-inter text-xs text-[#D4CEBF] leading-relaxed mt-1.5 line-clamp-3 font-normal opacity-90">
                        {vid.subline}
                      </p>
                    </div>

                    {/* Floating Gold Play Icon */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#000000]/90 border border-[#E2B13D] flex items-center justify-center shrink-0 text-[#E2B13D] group-hover:bg-gradient-to-r group-hover:from-[#C9962F] group-hover:to-[#FCE289] group-hover:text-[#000000] group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(226,177,61,0.4)]">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Sequential Connector Arrow between cards */}
              {idx < VIDEOS.length - 1 && (
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 items-center justify-center pointer-events-none ${
                    idx === 0 
                      ? 'hidden sm:flex left-[calc(100%+0.75rem)] lg:left-[calc(100%+1rem)]' 
                      : 'hidden lg:flex left-[calc(100%+1rem)]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#181108]/95 border border-[#FCE289]/80 flex items-center justify-center text-[#FCE289] shadow-[0_0_20px_rgba(252,226,137,0.5)] backdrop-blur-md animate-pulse">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Video Player Modal */}
      {activeVideo && (
        <div 
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 pt-24 sm:pt-28 pb-4 bg-[#000000]/90 backdrop-blur-md animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[calc(100vh-120px)] flex flex-col bg-[#111111] border border-[#E2B13D]/60 rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_0_50px_rgba(226,177,61,0.3)] text-[#FFFFFF] overflow-y-auto"
          >
            
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 text-[#E2B13D] hover:text-[#FFFFFF] bg-[#000000]/80 border border-[#7E4F11] hover:border-[#E2B13D] rounded-full transition-colors cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Video Player Display */}
            <div className="relative aspect-video max-h-[36vh] w-full rounded-xl overflow-hidden bg-[#000000] border border-[#7E4F11]/50 mb-3 sm:mb-4 flex items-center justify-center group shrink-0">
              <img 
                src={activeVideo.thumbnailUrl} 
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/40" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-[#000000] flex items-center justify-center mb-2 shadow-[0_0_25px_rgba(226,177,61,0.5)]">
                  <Play className="w-5 h-5 sm:w-7 sm:h-7 fill-current text-[#000000] ml-1" />
                </div>
                <span className="font-mono font-bold text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-[#E2B13D] bg-[#000000]/80 px-3 py-1 rounded-full border border-[#E2B13D]/40">
                  {activeVideo.duration ? `PREVIEW PLAYBACK ACTIVE · ${activeVideo.duration}` : 'PREVIEW PLAYBACK ACTIVE'}
                </span>
              </div>
            </div>

            {/* Video Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 flex-wrap">
                  <span className="font-inter text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#000000] bg-[#FCE289] px-2 py-0.5 rounded">
                    {activeVideo.eyebrow}
                  </span>
                  {activeVideo.duration ? (
                    <span className="font-inter text-xs text-[#E2B13D]">
                      Duration: {activeVideo.duration}
                    </span>
                  ) : null}
                </div>

                <h3 className="font-playfair font-bold text-lg sm:text-xl md:text-2xl text-[#FFFFFF] mb-1.5 sm:mb-2">
                  {activeVideo.title}
                </h3>

                <p className="font-inter text-xs sm:text-sm text-[#E2B13D]/90 leading-relaxed mb-3 sm:mb-4">
                  {activeVideo.subline}
                </p>

                {/* Card 4 (The Trilogy) Email Signup Flow */}
                {activeVideo.id === 'v4' && (
                  <div className="my-4 p-4 rounded-lg bg-[#140F08] border border-[#C9962F]/40">
                    <form onSubmit={handleTrilogySubmit} className="space-y-3">
                      <p className="font-inter text-xs text-[#FCE289] font-medium">
                        Step 2 — Join the Priority Waitlist for The Trilogy Release
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          required
                          placeholder="Enter your executive email"
                          value={trilogyEmail}
                          onChange={(e) => {
                            setTrilogyEmail(e.target.value);
                            if (trilogyButtonText !== 'Join Trilogy Waitlist') setTrilogyButtonText('Join Trilogy Waitlist');
                          }}
                          className="flex-1 bg-black border border-[#C9962F]/50 text-white text-xs px-3 py-2.5 rounded focus:outline-none focus:border-[#FCE289]"
                        />
                        <button
                          type="submit"
                          disabled={trilogyLoading || trilogyButtonText === 'Subscribed ✓'}
                          className="bg-gradient-to-r from-[#C9962F] to-[#E2B13D] text-black font-inter font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap disabled:opacity-80"
                        >
                          {trilogyButtonText}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#7E4F11]/40">
                <div className="flex items-center gap-2 text-xs font-inter text-[#E2B13D]">
                  <ShieldCheck className="w-4 h-4 text-[#C9962F] shrink-0" />
                  <span>Exclusive Content from The REGENESIS Project™ Vault</span>
                </div>

                <button
                  onClick={() => {
                    const isV4 = activeVideo.id === 'v4';
                    setActiveVideo(null);
                    if (isV4) {
                      onOpenWaitlist();
                    } else {
                      onOpenSpeakerKit();
                    }
                  }}
                  className="w-full sm:w-auto h-10 px-5 rounded bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-[#000000] font-inter font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-all shrink-0"
                >
                  <span>{activeVideo.id === 'v4' ? 'Join Trilogy Waitlist' : 'Request Full Keynote Recording'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
