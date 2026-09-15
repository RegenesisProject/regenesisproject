import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Sparkles, X, ArrowRight, Award, ChevronRight, HelpCircle, BookOpen } from 'lucide-react';
import { submitEmail } from '../utils/sheetApi';
import part1Thumbnail from '../assets/images/series_part1_limit_switch_1788902240200.jpg';
import part2Thumbnail from '../assets/images/series_part2_willpower_1788902255808.jpg';
import part3Thumbnail from '../assets/images/series_part3_origin_1788902270549.jpg';
import part4Thumbnail from '../assets/images/series_part4_about_you_1788902283710.jpg';
import part5Thumbnail from '../assets/images/series_part5_spec_code_1788902297184.jpg';

const HERO_BG_URL = 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1784739994/sreached_yc6gwp.png';

interface HeroSectionProps {
  onOpenMirrorQuiz: () => void;
  onOpenSpeakerKit: () => void;
  onOpenWaitlist: () => void;
}

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
  seriesTitle?: string;
  youtubeId?: string;
  episodes: VideoEpisode[];
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
    youtubeId: 'qKMNyDz7TnE',
    isStartHere: true,
    seriesTitle: 'IT WAS NEVER DISCIPLINE — 5-PART SERIES',
    episodes: [
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
        isAvailable: true,
        youtubeId: 'qKeIaRXrXpg',
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
    ],
  },
  {
    id: 'v2',
    eyebrow: 'THE FRAMEWORK',
    title: 'What Is The REGENESIS Project?',
    subline: 'Why mindset keeps failing you — and what actually rewrites the pattern.',
    category: 'FRAMEWORK BREAKDOWN',
    duration: '',
    description: 'Why mindset keeps failing you — and what actually rewrites the pattern.',
    thumbnailUrl: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1786988742/regenesis_wings_5_mzlkgi.png',
    episodes: [],
  },
  {
    id: 'v4',
    eyebrow: 'THE ASSESSMENT',
    title: 'What Is The Mirror Quiz?',
    subline: 'A system scan that shows you the hardware running underneath your habits.',
    category: 'FRAMEWORK BREAKDOWN',
    duration: '',
    description: 'A system scan that shows you the hardware running underneath your habits.',
    thumbnailUrl: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1786988577/mirror_quiz_cover_x9ldby.jpg',
    episodes: [],
  },
  {
    id: 'v5',
    eyebrow: 'COMING 2027',
    title: 'The Trilogy',
    subline: 'Three books mapping the full migration.',
    category: 'UPCOMING RELEASE',
    duration: '',
    description: 'Three books mapping the full migration.',
    thumbnailUrl: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1785187163/book_1.2_-_Copy_op3afs.png',
    episodes: [],
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenMirrorQuiz,
  onOpenSpeakerKit,
  onOpenWaitlist,
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activeEpisode, setActiveEpisode] = useState<VideoEpisode | null>(null);
  const [currentIframeVideoId, setCurrentIframeVideoId] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<VideoItem | null>(null);
  const [trilogyEmail, setTrilogyEmail] = useState('');
  const [trilogyLoading, setTrilogyLoading] = useState(false);
  const [trilogySubmitted, setTrilogySubmitted] = useState(false);

  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const activeVideoRef = useRef<VideoItem | null>(activeVideo);
  const activeEpisodeRef = useRef<VideoEpisode | null>(activeEpisode);

  useEffect(() => {
    activeVideoRef.current = activeVideo;
  }, [activeVideo]);

  useEffect(() => {
    activeEpisodeRef.current = activeEpisode;
  }, [activeEpisode]);

  // Advance to the next part in the series and automatically play it
  const advanceToNextEpisode = useCallback(() => {
    const video = activeVideoRef.current;
    if (!video || video.id !== 'v1') return;

    const currentPart = activeEpisodeRef.current?.partNumber || 1;
    const nextPart = currentPart + 1;
    const nextEp = video.episodes?.find((ep) => ep.partNumber === nextPart);

    if (nextEp) {
      setActiveEpisode(nextEp);
      if (nextEp.youtubeId) {
        if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
          try {
            playerRef.current.loadVideoById({
              videoId: nextEp.youtubeId,
              startSeconds: 0,
            });
            playerRef.current.playVideo?.();
          } catch (e) {
            console.error('Error auto-playing next part:', e);
          }
        }
      } else {
        // Next part is Coming Soon
        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch {
            // ignore
          }
          playerRef.current = null;
        }
        setCurrentIframeVideoId(null);
      }
    }
  }, []);

  const handleSelectEpisode = (ep: VideoEpisode) => {
    setActiveEpisode(ep);
    if (ep.youtubeId) {
      if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
        try {
          playerRef.current.loadVideoById({
            videoId: ep.youtubeId,
            startSeconds: 0,
          });
          playerRef.current.playVideo?.();
          return;
        } catch (e) {
          console.error('Error loading video on episode selection:', e);
        }
      }
      setCurrentIframeVideoId(ep.youtubeId);
    } else {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
        playerRef.current = null;
      }
      setCurrentIframeVideoId(null);
    }
  };

  // Setup YouTube player controls and event listeners for auto-playing subsequent parts
  useEffect(() => {
    if (!activeVideo || !currentIframeVideoId) {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
        playerRef.current = null;
      }
      return;
    }

    let isMounted = true;

    const attachYTPlayer = () => {
      if (!isMounted) return;
      const YT = (window as any).YT;
      const iframeEl = iframeRef.current;
      if (!YT || !YT.Player || !iframeEl) return;

      if (playerRef.current) {
        return;
      }

      try {
        playerRef.current = new YT.Player(iframeEl, {
          events: {
            onReady: (event: any) => {
              if (isMounted) {
                try {
                  event.target.playVideo();
                } catch {
                  // ignore
                }
              }
            },
            onStateChange: (event: any) => {
              // Sync episode button if YouTube's playlist automatically advanced
              try {
                const currentData = event.target?.getVideoData?.();
                if (currentData?.video_id === 'qKeIaRXrXpg' && activeEpisodeRef.current?.partNumber !== 2) {
                  const ep2 = activeVideoRef.current?.episodes?.find((ep) => ep.partNumber === 2);
                  if (ep2) setActiveEpisode(ep2);
                } else if (currentData?.video_id === 'qKMNyDz7TnE' && activeEpisodeRef.current?.partNumber !== 1) {
                  const ep1 = activeVideoRef.current?.episodes?.find((ep) => ep.partNumber === 1);
                  if (ep1) setActiveEpisode(ep1);
                }
              } catch {
                // ignore
              }

              // event.data === 0 is YT.PlayerState.ENDED: auto-advance & play next part
              if (event.data === 0) {
                advanceToNextEpisode();
              }
            },
          },
        });
      } catch (err) {
        console.warn('YouTube Player initialization fallback:', err);
      }
    };

    const timer = setTimeout(attachYTPlayer, 100);

    // Fallback cross-origin postMessage listener
    const handleWindowMessage = (event: MessageEvent) => {
      try {
        let data = event.data;
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        if (data?.event === 'onStateChange' && data?.info === 0) {
          advanceToNextEpisode();
        }
      } catch {
        // Ignore non-JSON postMessages
      }
    };
    window.addEventListener('message', handleWindowMessage);

    // Handshake ping to ensure YouTube iframe dispatches postMessage events
    const pingInterval = setInterval(() => {
      if (iframeRef.current?.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 1 }), '*');
        } catch {
          // ignore
        }
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      clearInterval(pingInterval);
      window.removeEventListener('message', handleWindowMessage);
    };
  }, [activeVideo?.id, currentIframeVideoId, advanceToNextEpisode]);

  const handleOpenVideo = (video: VideoItem) => {
    setActiveVideo(video);
    const initialEp = video.episodes?.[0] || null;
    setActiveEpisode(initialEp);
    setCurrentIframeVideoId(initialEp?.youtubeId || video.youtubeId || null);
  };

  const handleCloseModal = () => {
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch {
        // ignore
      }
      playerRef.current = null;
    }
    setActiveVideo(null);
    setActiveEpisode(null);
    setCurrentIframeVideoId(null);
  };

  const handleTrilogySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trilogyEmail.trim()) return;

    setTrilogyLoading(true);
    await submitEmail(trilogyEmail.trim(), 'waitlist');
    setTrilogyLoading(false);
    setTrilogySubmitted(true);
    setTrilogyEmail('');
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
        <h1 className="font-playfair font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFFFFF] leading-[1.18] tracking-tight mb-5 max-w-4xl mx-auto drop-shadow-xl">
          The hardest part of building your dreams isn't strategy, mindset, or willpower.
        </h1>

        {/* Headline 2: Highlighted Key Statement Badge */}
        <div className="relative inline-block my-2 sm:my-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#181107]/90 via-[#2a1d0d] to-[#181107]/90 border border-[#C9962F]/50 shadow-[0_0_35px_rgba(201,150,47,0.25)] backdrop-blur-md">
          <p className="font-inter text-base sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FCE289] via-[#E2B13D] to-[#C9962F] tracking-tight">
            It's the internal war against your own biology.
          </p>
        </div>

        {/* Subhead Explanation Card */}
        <div className="mt-6 mb-8 max-w-3xl mx-auto p-4 sm:p-6 rounded-2xl bg-[#0c0804]/80 border border-[#3d2e1b] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden text-left sm:text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-[1.5px] bg-gradient-to-r from-transparent via-[#E2B13D] to-transparent" />
          <p className="font-inter text-xs sm:text-base md:text-lg text-[#E6E1D5] leading-relaxed font-normal">
            Your earliest years installed a Survival Operating System that still runs you today. REGENESIS decodes it — and reconfigures the patterns silently capping your capacity.
          </p>
        </div>

        {/* Call-to-action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto w-full">
          <button
            onClick={onOpenMirrorQuiz}
            className="w-full sm:w-auto min-h-[48px] h-auto py-3.5 px-4 sm:px-10 rounded-xl bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-[#000000] font-inter font-black text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_30px_rgba(226,177,61,0.45)] hover:shadow-[0_6px_40px_rgba(226,177,61,0.7)] hover:scale-[1.02] transition-all duration-300 text-center"
          >
            <span>GET EARLY ACCESS TO THE MIRROR QUIZ</span>
            <ChevronRight className="w-4 h-4 text-[#000000] shrink-0" />
          </button>
        </div>

      </div>

      {/* Bottom Floating 4-Card Grid Row */}
      <div className="max-w-[1550px] mx-auto w-full relative z-10 mt-6 lg:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch">
          {VIDEOS.map((vid, idx) => (
            <div key={vid.id} className="relative flex flex-col">
              {/* Card Container */}
              <div
                onClick={() => handleOpenVideo(vid)}
                onMouseEnter={() => setHoveredVideo(vid)}
                onMouseLeave={() => setHoveredVideo(null)}
                className={`group relative min-h-[260px] sm:min-h-[280px] lg:min-h-[300px] rounded-2xl overflow-hidden bg-[#111111] transition-all duration-500 cursor-pointer flex flex-col justify-between p-4 sm:p-5 lg:p-6 border ${
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

                {/* Top Bar inside Card: Eyebrow badge on top left */}
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
                  {!vid.isStartHere && (
                    <span className="inline-block px-2 py-0.5 rounded bg-[#000000]/90 text-[#FCE289] border border-[#E2B13D]/30 font-mono text-[9px] uppercase tracking-wider">
                      {vid.id === 'v5' ? 'WAITLIST' : 'COMING SOON'}
                    </span>
                  )}
                </div>

                {/* Bottom Content: Title, Sub-line & Action Icon */}
                <div className="relative z-10 pt-6">
                  <div className="flex items-end justify-between gap-2.5">
                    <div className="pr-1 flex-1 min-w-0">
                      {/* Title: Bigger headline */}
                      <h3 className="font-playfair font-bold text-base sm:text-lg lg:text-xl text-[#FFFFFF] leading-snug group-hover:text-[#FCE289] transition-colors drop-shadow-md">
                        {vid.title}
                      </h3>
                      
                      {/* Sub-line: Smaller text */}
                      <p className="font-inter text-[11px] sm:text-xs text-[#D4CEBF] leading-relaxed mt-1.5 line-clamp-3 font-normal opacity-90">
                        {vid.subline}
                      </p>
                    </div>

                    {/* Floating Gold Play Icon ONLY for Video with playable stream; chevron/arrow for info cards */}
                    {vid.isStartHere ? (
                      <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-[#000000]/90 border border-[#E2B13D] flex items-center justify-center shrink-0 text-[#E2B13D] group-hover:bg-gradient-to-r group-hover:from-[#C9962F] group-hover:to-[#FCE289] group-hover:text-[#000000] group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(226,177,61,0.4)]">
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-[#000000]/80 border border-[#7E4F11]/60 flex items-center justify-center shrink-0 text-[#E2B13D]/80 group-hover:border-[#E2B13D] group-hover:text-[#FCE289] group-hover:scale-105 transition-all duration-300 shadow-sm">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Sequential Connector Arrow between cards */}
              {idx < VIDEOS.length - 1 && (
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 items-center justify-center pointer-events-none ${
                    idx === 0 || idx === 2
                      ? 'hidden sm:flex lg:flex left-[calc(100%+0.625rem)]' 
                      : 'hidden lg:flex left-[calc(100%+0.625rem)]'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#181108]/95 border border-[#FCE289]/80 flex items-center justify-center text-[#FCE289] shadow-[0_0_15px_rgba(252,226,137,0.5)] backdrop-blur-md animate-pulse">
                    <ArrowRight className="w-3.5 h-3.5" />
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
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pt-16 sm:pt-24 pb-3 bg-[#000000]/90 backdrop-blur-md animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[calc(100dvh-5rem)] flex flex-col bg-[#111111] border border-[#E2B13D]/60 rounded-2xl p-3 sm:p-5 md:p-6 shadow-[0_0_50px_rgba(226,177,61,0.3)] text-[#FFFFFF] overflow-y-auto overscroll-contain"
          >
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-9 h-9 flex items-center justify-center text-[#E2B13D] hover:text-[#FFFFFF] bg-[#000000]/80 border border-[#7E4F11] hover:border-[#E2B13D] rounded-full transition-colors cursor-pointer z-20 active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Video Player Display */}
            <div className="relative aspect-video max-h-[36vh] sm:max-h-[44vh] w-full rounded-xl overflow-hidden bg-[#000000] border border-[#7E4F11]/50 mb-3 sm:mb-4 flex items-center justify-center group shrink-0">
              {currentIframeVideoId ? (
                <iframe
                  id="hero-yt-player-iframe"
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${currentIframeVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1${activeVideo.id === 'v1' && currentIframeVideoId === 'qKMNyDz7TnE' ? '&playlist=qKMNyDz7TnE,qKeIaRXrXpg' : ''}&origin=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}`}
                  title={activeEpisode?.title || activeVideo.title}
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <>
                  <img 
                    src={activeEpisode?.thumbnailUrl || activeVideo.thumbnailUrl} 
                    alt={activeEpisode?.title || activeVideo.title}
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
                        handleCloseModal();
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

            {/* 5-Part Series Episode Selector - ONLY for First Featured Video (v1) */}
            {activeVideo.id === 'v1' && activeVideo.episodes && activeVideo.episodes.length > 1 && (
              <div className="my-4 pt-3 pb-1 border-t border-[#7E4F11]/40">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FCE289] font-bold">
                      {activeVideo.seriesTitle || 'IT WAS NEVER DISCIPLINE — 5-PART SERIES'}
                    </span>
                    <span className="text-[11px] text-[#A69B89] font-inter hidden sm:inline">
                      — Select a part to view
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#E2B13D]/80">
                    Part {activeEpisode?.partNumber || 1} of 5
                  </span>
                </div>

                {/* Grid of all 5 parts belonging to this specific selected video */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                  {activeVideo.episodes.map((ep) => {
                    const isCurrent = (activeEpisode?.id || activeVideo.episodes[0].id) === ep.id;
                    return (
                      <button
                        key={ep.id}
                        type="button"
                        onClick={() => handleSelectEpisode(ep)}
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
            )}

            {/* Video Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 flex-wrap">
                  <span className="font-inter text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#000000] bg-[#FCE289] px-2 py-0.5 rounded">
                    {activeVideo.id === 'v1' ? `PART ${activeEpisode?.partNumber || 1}` : activeVideo.eyebrow}
                  </span>
                </div>

                <h3 className="font-playfair font-bold text-lg sm:text-xl md:text-2xl text-[#FFFFFF] mb-1.5 sm:mb-2">
                  {activeVideo.id === 'v1'
                    ? `PART ${activeEpisode?.partNumber || 1} — ${activeEpisode?.title || 'The Limit Switch'}`
                    : activeVideo.title}
                </h3>

                <p className="font-inter text-xs sm:text-sm text-[#E2B13D]/90 leading-relaxed mb-3 sm:mb-4">
                  {activeVideo.id === 'v1'
                    ? (activeEpisode?.subline || activeVideo.subline)
                    : activeVideo.subline}
                </p>

                {/* Card 5 (The Trilogy) Email Signup Flow */}
                {activeVideo.id === 'v5' && (
                  <div className="my-4 p-5 rounded-lg bg-[#140F08] border border-[#C9962F]/40 space-y-3">
                    {!trilogySubmitted ? (
                      <>
                        <p className="font-playfair font-bold text-base sm:text-lg text-white">
                          Join the waitlist for Book One
                        </p>
                        <form onSubmit={handleTrilogySubmit} className="space-y-3">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="email"
                              required
                              placeholder="Enter your email address"
                              value={trilogyEmail}
                              onChange={(e) => setTrilogyEmail(e.target.value)}
                              className="flex-1 bg-black border border-[#C9962F]/50 text-white text-xs px-3.5 py-2.5 rounded focus:outline-none focus:border-[#FCE289]"
                            />
                            <button
                              type="submit"
                              disabled={trilogyLoading}
                              className="bg-gradient-to-r from-[#C9962F] to-[#E2B13D] text-black font-inter font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap disabled:opacity-80"
                            >
                              {trilogyLoading ? 'JOINING...' : 'JOIN THE WAITLIST'}
                            </button>
                          </div>
                        </form>
                        <p className="font-inter text-xs text-[#D4CEBF] leading-relaxed">
                          You'll hear from us when Book One has a firm release date, and before it goes on sale anywhere else.
                        </p>
                        <p className="font-inter text-[11px] text-[#A69B89]">
                          You're signing up to receive emails from Thomas Ventura.
                        </p>
                      </>
                    ) : (
                      <div className="space-y-3 text-left animate-fadeIn">
                        <h4 className="font-playfair font-bold text-lg text-[#FCE289]">
                          You're on the list.
                        </h4>
                        <p className="font-inter text-xs sm:text-sm text-[#D4CEBF] leading-relaxed">
                          We'll email you when Book One has a real release date. Nothing before then.
                        </p>
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              handleCloseModal();
                              onOpenMirrorQuiz();
                            }}
                            className="w-full sm:w-auto px-5 py-2.5 rounded bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-black font-inter font-bold text-xs uppercase tracking-[0.15em] cursor-pointer hover:scale-105 transition-all shadow-md"
                          >
                            WHILE YOU WAIT — GET EARLY ACCESS TO THE MIRROR QUIZ
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>


            </div>

          </div>
        </div>
      )}

    </section>
  );
};
