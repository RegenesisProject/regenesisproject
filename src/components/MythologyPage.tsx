import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import archetypesBgImage from '../assets/images/archetypes_bg_1784904573049.jpg';
import goldenFigureBg from '../assets/images/golden_figure_bg_1785192950234.jpg';
import { ScrollReveal } from './ScrollReveal';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  LayoutGrid,
  Table
} from 'lucide-react';

const lionEmblemImg = 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1786379769/Artboard_6_izsfdw.jpg';
const phoenixImg = 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1787348858/phoenix_2_gpunp7.png';
const tigerImg = 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1786379768/Artboard_1_uhgubn.jpg';
const wolfImg = 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1786379768/Artboard_3_mhbhv7.jpg';
const eagleImg = 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1786379768/Artboard_4_uukuqx.jpg';
const egonImg = 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1787347040/eagon_2.1_q3tkp6.png';

interface MythologyPageProps {
  onOpenMirrorQuiz: () => void;
  onOpenSpeakerKit: () => void;
  onOpenContact?: () => void;
  onOpenWaitlist?: () => void;
}

interface CastMember {
  id: string;
  name: string;
  role: string;
  image: string;
  iconUrl: string;
  description: string;
  wounded: string;
  integrated: string;
  science: string;
  woundedTrigger: string;
  costsYou: string;
  quote: string;
}

const CAST_MEMBERS: CastMember[] = [
  {
    id: 'commander',
    name: 'THE COMMANDER',
    role: 'The Operational Center',
    image: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1787348010/commander_2.2_bnwgkl.png',
    iconUrl: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1787348010/commander_2.2_bnwgkl.png',
    description: 'Structure, discipline, the will to impose order on chaos. The Commander builds the scaffold and holds the line.\n\nHe is the voice that says: we do this because we decided to, not because we feel like it. When the Commander is offline, nothing sustains.',
    wounded: 'Rigid control. Imposes order to manage internal anxiety. Can\'t adapt, can\'t yield, can\'t let anyone else drive.',
    integrated: 'Clear direction, clean delegation, the capacity to hold standard without crushing the people inside it.',
    science: 'Prefrontal cortex executive function, locus of control.',
    woundedTrigger: 'Threat of chaos or loss of control.',
    costsYou: 'Turns strength into isolation. Everyone around you becomes dependent or resentful.',
    quote: '"Order is a tool. When it becomes a shield, you\'ve already lost the field."'
  },
  {
    id: 'eagle',
    name: 'THE EAGLE',
    role: 'The Force of Vision',
    image: eagleImg,
    iconUrl: eagleImg,
    description: 'Altitude. The part that sees the whole board, reads what\'s coming, and runs the future in your head before it arrives.',
    wounded: 'Circles. Runs disaster simulations so vivid your body reacts to them, or sees every angle and commits to none.',
    integrated: 'Clarity at height — and the discipline to land.',
    science: 'Default mode network, predictive processing, anticipatory anxiety.',
    woundedTrigger: 'Over-anticipation of threat or missed opportunity.',
    costsYou: 'Paralysis by foresight. You live in what might happen and never execute what must.',
    quote: '"Altitude without descent is just a higher view of nothing getting done."'
  },
  {
    id: 'tiger',
    name: 'THE TIGER',
    role: 'The Raw Engine',
    image: tigerImg,
    iconUrl: tigerImg,
    description: 'Intensity, velocity, the strike. When the Tiger takes the wheel, you don\'t negotiate with the problem — you run through it. The engine of every breakthrough and the source of every crater.',
    wounded: 'Attacks everything as a threat. Burns the room down to win the point. Leaves a trail of scorched earth and spent energy.',
    integrated: 'Pure precision power. Deployed on purpose, dialed to the target, powered down when the job is done.',
    science: 'Sympathetic nervous system, dopamine drive, amygdala activation.',
    woundedTrigger: 'Perceived resistance, delay, or challenge to dominance.',
    costsYou: 'Collateral damage. The wins are real, but the cost of the cleanup keeps compounding.',
    quote: '"Power without brakes isn\'t strength. It\'s just speed before the impact."'
  },
  {
    id: 'wolf',
    name: 'THE WOLF',
    role: 'The Pack Intelligence',
    image: wolfImg,
    iconUrl: wolfImg,
    description: 'The social radar. Tracks allegiance, reads room dynamics, feels betrayal before it happens. Built to keep you connected and keep you alive in the group.',
    wounded: 'Hyper-vigilant for rejection. Reads neutral behavior as abandonment. Pre-emptively attacks or withdraws to protect itself.',
    integrated: 'Deep loyalty, extraordinary relational intelligence, the ability to read and lead a pack without needing to control them.',
    science: 'Attachment circuitry, oxytocin/vasopressin systems, social threat sensitivity.',
    woundedTrigger: 'Shift in allegiance, exclusion, or perceived disloyalty.',
    costsYou: 'Relational exhaustion. You\'re managing politics that only exist in your head.',
    quote: '"A pack built on fear of abandonment isn\'t a team. It\'s a hostage situation."'
  },
  {
    id: 'lion',
    name: 'THE LION',
    role: 'The Sovereign Presence',
    image: lionEmblemImg,
    iconUrl: lionEmblemImg,
    description: 'Natural authority, ease in the center, the weight that steadies a room just by being in it. Doesn\'t fight for status — assumes it.',
    wounded: 'Performative sovereignty. Needs constant validation of the crown. Fragile underneath, devastatingly reactive to disrespect.',
    integrated: 'Effortless authority that creates safety for everyone beneath it. Doesn\'t need to prove what\'s already true.',
    science: 'Serotonergic status regulation, social dominance theory.',
    woundedTrigger: 'Public challenge, perceived disrespect, or loss of deference.',
    costsYou: 'Kingdom without subjects. When authority demands deference, respect becomes performance.',
    quote: '"True sovereignty doesn\'t demand the room. The room settles because it\'s there."'
  },
  {
    id: 'phoenix',
    name: 'THE PHOENIX',
    role: 'The Engine of Regeneration',
    image: phoenixImg,
    iconUrl: phoenixImg,
    description: 'The capacity to end something cleanly and begin again. Not bouncing back — evolving through the fire. The Phoenix knows how to let the old version die.',
    wounded: 'Addicted to the burn. Destroys what\'s working just to feel the thrill of rebuilding from the ashes. Confuses trauma with transformation.',
    integrated: 'Regenerates on purpose. Clean transitions, deliberate evolutions, zero wasted suffering.',
    science: 'Neuroplasticity, post-traumatic growth, epigenetic adaptability.',
    woundedTrigger: 'Plateau, boredom, or the discomfort of sustained stability.',
    costsYou: 'Chronic instability. You keep setting fire to what took years to build.',
    quote: '"Not everything that burns was meant to. Some things were just meant to be tended."'
  },
  {
    id: 'egon',
    name: 'EGON',
    role: 'The Protector',
    image: egonImg,
    iconUrl: egonImg,
    description: 'The voice that talks you out of things. EGON isn\'t your enemy and he isn\'t trying to hold you back — he\'s trying to keep you safe, and he was built when safety was the only thing that mattered.\n\nHis vow was made when you were small: keep you unnoticed so you\'re never targeted, keep you grinding so you\'re never caught short. He kept it. He\'s still keeping it.\n\nHe\'ll shut down the launch before he\'ll risk the exposure.',
    wounded: 'Runs the whole show. Every expansion reads as exposure, so nothing ships.',
    integrated: 'Stands down. Still watching, no longer deciding.',
    science: 'Default Mode Network self-referential processing, protective schemas.',
    woundedTrigger: 'Exposure, vulnerability, or any move outside the known envelope.',
    costsYou: 'A smaller life than you were built for. Perfectly safe, permanently capped.',
    quote: '"Protection that never stands down becomes the prison it was built to prevent."'
  },
  {
    id: 'ghost',
    name: 'THE GHOST',
    role: 'The Unprocessed Origin',
    image: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1787347828/ghost_1_m7wqyg.png',
    iconUrl: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1787347828/ghost_1_m7wqyg.png',
    description: 'The thing that happened before you had words for it. The original threat that taught your system it wasn\'t safe.\n\nThe Ghost doesn\'t have an agenda. It doesn\'t want to hurt you. It\'s just an open loop — an unfiled event that your nervous system treats as happening right now, every time a shadow crosses the room.',
    wounded: 'Runs the background program. Every decision is quietly routed around the original wound.',
    integrated: 'Filed as history. What happened is acknowledged, integrated, and finally in the past.',
    science: 'Implicit memory, unresolved trauma loops, somatic markers.',
    woundedTrigger: 'Contextual cues that match the original imprint.',
    costsYou: 'Living in reaction to a threat that ended years ago.',
    quote: '"The ghost only haunts the rooms you refuse to turn the light on in."'
  }
];

export const MythologyPage: React.FC<MythologyPageProps> = ({
  onOpenMirrorQuiz,
  onOpenSpeakerKit
}) => {
  const [activeCastIndex, setActiveCastIndex] = useState(0);
  const [matrixViewMode, setMatrixViewMode] = useState<'grid' | 'table'>('grid');
  
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const mobilePillsRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  // Mobile touch swipe refs
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);

  const currentMember = CAST_MEMBERS[activeCastIndex];

  // Sync scroll position when activeCastIndex is changed via side icons, buttons, or pills
  useEffect(() => {
    if (!isProgrammaticScrollRef.current) {
      const track = carouselTrackRef.current;
      if (track) {
        const activeCard = track.querySelector(`#cast-card-${activeCastIndex}`) as HTMLElement;
        if (activeCard) {
          const trackWidth = track.clientWidth;
          const cardOffset = activeCard.offsetLeft;
          const cardWidth = activeCard.clientWidth;
          const targetScroll = cardOffset - (trackWidth - cardWidth) / 2;

          isProgrammaticScrollRef.current = true;
          track.scrollTo({
            left: Math.max(0, targetScroll),
            behavior: 'smooth',
          });

          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            isProgrammaticScrollRef.current = false;
          }, 500);
        }
      }
    }

    // Sync mobile pills bar
    const pills = mobilePillsRef.current;
    if (pills) {
      const activePill = pills.children[activeCastIndex] as HTMLElement;
      if (activePill) {
        const pillsWidth = pills.clientWidth;
        const pillOffset = activePill.offsetLeft;
        const pillWidth = activePill.clientWidth;
        pills.scrollTo({
          left: Math.max(0, pillOffset - (pillsWidth - pillWidth) / 2),
          behavior: 'smooth',
        });
      }
    }
  }, [activeCastIndex]);

  // Sync activeCastIndex when user manually scrolls or swipes the cards track
  const handleTrackScroll = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;

    const track = carouselTrackRef.current;
    if (!track) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    CAST_MEMBERS.forEach((_, idx) => {
      const card = track.querySelector(`#cast-card-${idx}`) as HTMLElement;
      if (card) {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(cardCenter - trackCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      }
    });

    if (closestIndex !== activeCastIndex) {
      setActiveCastIndex(closestIndex);
    }
  }, [activeCastIndex]);

  // Desktop Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = carouselTrackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - track.offsetLeft;
    scrollLeftRef.current = track.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const track = carouselTrackRef.current;
    if (!track) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    track.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Card click handler that ignores clicks if user was dragging
  const handleCardClick = (idx: number) => {
    if (hasDraggedRef.current) return;
    setActiveCastIndex(idx);
  };

  // Mobile Touch Swipe Handlers on character artwork
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // Swiped left -> Next card
        setActiveCastIndex((prev) => (prev < CAST_MEMBERS.length - 1 ? prev + 1 : 0));
      } else {
        // Swiped right -> Previous card
        setActiveCastIndex((prev) => (prev > 0 ? prev - 1 : CAST_MEMBERS.length - 1));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans selection:bg-[#C9A227] selection:text-black">
      
      {/* SECTION 1 — HERO / THE INTERNAL THEATER */}
      <section className="w-full relative z-10 pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden border-b border-[#C9A227]/20">
        
        {/* Background Image / Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="https://res.cloudinary.com/ew2ztpgz/image/upload/v1784903667/myth_hero_jilt9p.png" 
            alt="The Internal Theater Background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-90 contrast-115 saturate-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/35 to-[#0A0A0A]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.2),transparent_70%)]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18110B] border border-[#C9A227]/40 text-[#C9A227] text-xs font-mono font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE CAST</span>
            </div>

            <h1 className="font-playfair font-black text-3xl sm:text-5xl lg:text-7xl text-white tracking-tight uppercase leading-[1.05] mb-6">
              THE CAST OF YOUR <br />
              <span className="bg-gradient-to-r from-[#FFE18A] via-[#C9A227] to-[#8C6D1F] bg-clip-text text-transparent">
                INTERNAL THEATER
              </span>
            </h1>

            <p className="font-playfair italic text-lg sm:text-2xl text-[#FFE18A] max-w-3xl mx-auto leading-relaxed mb-8">
              Every human system is populated. Inside every operator is a cast — formed early, shaped by survival, and running the controls.
            </p>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mx-auto" />
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2 — THE FRAME */}
      <section className="w-full relative z-10 py-12 sm:py-16 text-center bg-white text-slate-900 border-t border-b border-[#C9A227]/30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-[#FAF8F5] border border-[#C9A227]/40 rounded-2xl p-6 sm:p-10 space-y-4 shadow-[0_10px_30px_rgba(201,162,39,0.1)]">
              <h2 className="font-playfair font-bold text-2xl sm:text-4xl text-slate-950 tracking-tight">
                You have all of them.
              </h2>
              <p className="font-inter text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                This isn't a test that sorts you into a type. Every human system runs every one of these forces — the difference is which ones are running you.
              </p>
              <p className="font-inter text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Each one has two states. <span className="text-[#DC2626] font-bold">Wounded</span>, when it's protecting you from something that already happened. <span className="text-[#B8860B] font-bold">Integrated</span>, when it's working for the life you're actually building.
              </p>
              <p className="font-inter text-xs sm:text-sm text-[#8B6508] font-bold leading-relaxed pt-2 border-t border-[#C9A227]/30">
                Nothing here needs to be killed. The Tiger isn't the problem. An unrestrained Tiger is.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3 — THE CAST */}
      <section className="w-full relative z-10 py-12 sm:py-20 overflow-hidden border-t border-b border-[#C9A227]/20">
        
        {/* Background Image with Contrast Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={archetypesBgImage} 
            alt="The Cast Background" 
            className="w-full h-full object-cover object-center opacity-70 contrast-125 saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/30 to-[#050505]/80" />
        </div>

        <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
              <span className="uppercase tracking-[0.25em] text-[#C9A227] text-[10px] sm:text-xs font-mono font-bold block mb-2">
                THE CAST
              </span>
              <h2 className="font-playfair font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
                The Eight Forces
              </h2>
              <div className="w-20 h-0.5 bg-[#C9A227] mx-auto my-4" />
              <p className="font-inter text-xs sm:text-sm text-stone-300 max-w-[60ch] mx-auto leading-relaxed">
                Explore the eight internal forces that govern human performance under pressure. Select a card to view its dual states, science tag, and cost.
              </p>
            </div>
          </ScrollReveal>

          {/* INTERACTIVE CAROUSEL & CARD DISPLAY */}
          <div className="bg-gradient-to-b from-[#0C0A07] via-[#090705] to-[#050505] rounded-[20px] sm:rounded-[32px] p-4 sm:p-8 lg:p-12 border border-[#C9A227]/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 lg:gap-12 relative overflow-hidden">
            
            {/* MOBILE QUICK-SELECT PILLS BAR */}
            <div 
              ref={mobilePillsRef}
              className="lg:hidden flex items-center justify-start gap-2 overflow-x-auto pb-2 -mx-1 px-1 relative z-20 no-scrollbar scroll-smooth"
            >
              {CAST_MEMBERS.map((member, idx) => {
                const isActive = idx === activeCastIndex;
                return (
                  <button
                    key={member.id}
                    onClick={() => setActiveCastIndex(idx)}
                    className={`shrink-0 px-3 py-1.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#C9A227] text-[#000000] shadow-md ring-2 ring-[#FFE18A]'
                        : 'bg-[#1A150C] text-[#C9A227] border border-[#C9A227]/30 hover:border-[#C9A227]'
                    }`}
                  >
                    <span>{member.name}</span>
                  </button>
                );
              })}
            </div>

            {/* FAR LEFT: VERTICAL TIMELINE / STEP INDICATOR (DESKTOP) */}
            <div className="hidden lg:flex flex-col items-center justify-center gap-2.5 pr-4 border-r border-[#C9A227]/20 relative z-10 shrink-0">
              {CAST_MEMBERS.map((member, idx) => {
                const isActive = idx === activeCastIndex;
                return (
                  <button
                    key={member.id}
                    onClick={() => setActiveCastIndex(idx)}
                    className={`relative rounded-full transition-all duration-300 cursor-pointer overflow-hidden p-0.5 ${
                      isActive
                        ? 'w-11 h-11 bg-gradient-to-br from-[#FFE18A] to-[#C9A227] shadow-lg ring-2 ring-[#C9A227] scale-105'
                        : 'w-8 h-8 bg-[#1A150C] opacity-70 hover:opacity-100 hover:scale-105 border border-[#C9A227]/40'
                    }`}
                    title={member.name}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover object-center transition-transform duration-300 ${
                          isActive ? 'scale-110 contrast-110' : 'scale-100 opacity-80'
                        }`} 
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* LEFT COLUMN: ACTIVE CHARACTER DETAILS PANEL */}
            <div className="lg:w-5/12 flex flex-col justify-between relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCastIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-4 sm:space-y-5"
                >
                  <div>
                    {/* MOBILE ARTWORK DISPLAY (SWIPEABLE) */}
                    <div 
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                      className="lg:hidden relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden mb-4 border-2 border-[#C9A227]/40 shadow-[0_10px_25px_rgba(0,0,0,0.5)] bg-black/90 group touch-pan-y select-none cursor-grab"
                    >
                      <img 
                        src={currentMember.image} 
                        alt={currentMember.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-[#C9A227]/50 font-mono text-[10px] text-[#FFE18A] uppercase font-bold tracking-widest z-10">
                        {String(activeCastIndex + 1).padStart(2, '0')} / {String(CAST_MEMBERS.length).padStart(2, '0')}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <span className="font-mono text-[11px] font-bold text-[#FFE18A] uppercase tracking-wider block drop-shadow-md">
                          {currentMember.role}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-playfair font-bold text-2xl sm:text-4xl text-white uppercase tracking-tight">
                      {currentMember.name}
                    </h3>
                    <p className="font-mono text-xs font-bold text-[#C9A227] uppercase tracking-wider mt-1">
                      {currentMember.role}
                    </p>
                  </div>

                  <p className="font-inter text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line">
                    {currentMember.description}
                  </p>

                  {/* Dual States Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#140C08] border border-[#EF4444]/30 space-y-1">
                      <span className="font-mono text-[10px] text-[#EF4444] uppercase font-bold tracking-wider block">
                        WOUNDED STATE
                      </span>
                      <p className="font-inter text-xs text-stone-300 leading-relaxed">
                        {currentMember.wounded}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0E150C] border border-[#C9A227]/40 space-y-1">
                      <span className="font-mono text-[10px] text-[#FCE289] uppercase font-bold tracking-wider block">
                        INTEGRATED STATE
                      </span>
                      <p className="font-inter text-xs text-stone-200 leading-relaxed">
                        {currentMember.integrated}
                      </p>
                    </div>
                  </div>

                  {/* Science & Cost Box */}
                  <div className="p-4 rounded-xl bg-[#090705] border border-[#C9A227]/25 space-y-2.5 font-inter text-xs">
                    <div>
                      <strong className="text-[#C9A227] block text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5">The Science</strong>
                      <span className="text-stone-200 leading-normal">{currentMember.science}</span>
                    </div>
                    <div>
                      <strong className="text-[#C9A227] block text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5">What It Costs You</strong>
                      <span className="text-stone-200 leading-normal">{currentMember.costsYou}</span>
                    </div>
                  </div>

                  {/* Consistent Single Quote Line */}
                  <div className="p-4 rounded-xl bg-[#1A150C] border-l-2 border-[#C9A227] text-center italic font-playfair text-xs sm:text-sm text-[#FCE289]">
                    {currentMember.quote}
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Carousel Nav Controls */}
              <div className="flex items-center justify-between pt-5 sm:pt-6 border-t border-[#C9A227]/20 mt-6 sm:mt-8">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveCastIndex((prev) => (prev > 0 ? prev - 1 : CAST_MEMBERS.length - 1))}
                    className="w-10 h-10 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-black transition-colors cursor-pointer"
                    aria-label="Previous Character"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveCastIndex((prev) => (prev < CAST_MEMBERS.length - 1 ? prev + 1 : 0))}
                    className="w-10 h-10 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-black transition-colors cursor-pointer"
                    aria-label="Next Character"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="font-mono text-xs text-stone-400 font-semibold tracking-wider">
                  CHARACTER <span className="text-[#C9A227] font-bold">{String(activeCastIndex + 1).padStart(2, '0')}</span> OF <span className="text-white font-bold">{String(CAST_MEMBERS.length).padStart(2, '0')}</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CAROUSEL CARDS TRACK (DESKTOP) */}
            <div className="hidden lg:flex lg:w-7/12 relative overflow-hidden py-2 items-center z-10">
              <div 
                ref={carouselTrackRef}
                onScroll={handleTrackScroll}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className="w-full flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth px-1 select-none cursor-grab active:cursor-grabbing touch-pan-x"
              >
                {CAST_MEMBERS.map((member, idx) => {
                  const isActive = idx === activeCastIndex;
                  return (
                    <motion.div
                      key={member.id}
                      id={`cast-card-${idx}`}
                      onClick={() => handleCardClick(idx)}
                      whileHover={{ y: -4 }}
                      animate={{
                        scale: isActive ? 1.02 : 0.95,
                        opacity: isActive ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`shrink-0 w-[310px] min-h-[460px] snap-center rounded-[24px] p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-br from-[#1F190E] via-[#141009] to-[#0A0805] text-white border-2 border-[#C9A227] shadow-[0_20px_50px_rgba(201,162,39,0.3)]'
                          : 'bg-[#0D0B08] text-stone-300 border border-[#C9A227]/30 hover:border-[#C9A227]/60 shadow-lg'
                      }`}
                    >
                      {/* Artwork Background */}
                      {member.image && (
                        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[24px]">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            referrerPolicy="no-referrer"
                            className={`w-full h-full object-cover object-center transition-all duration-500 transform ${
                              isActive 
                                ? 'opacity-100 scale-105 contrast-110' 
                                : 'opacity-70 contrast-100'
                            }`}
                          />
                          <div className={`absolute inset-0 z-1 pointer-events-none ${
                            isActive 
                              ? 'bg-gradient-to-t from-black/95 via-black/40 to-black/30' 
                              : 'bg-gradient-to-t from-black/95 via-black/60 to-black/40'
                          }`} />
                        </div>
                      )}

                      <div className="relative z-10 flex items-center justify-between">
                        <span className="uppercase tracking-[0.2em] text-[10px] font-mono font-extrabold text-[#C9A227]">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono text-[10px] uppercase font-bold text-stone-400">
                          THE CAST
                        </span>
                      </div>

                      <div className="relative z-10">
                        <h4 className="font-playfair font-extrabold text-xl uppercase tracking-wide mb-1 text-white">
                          {member.name}
                        </h4>
                        <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C9A227]">
                          {member.role}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4 — THE CAST AT A GLANCE (THE MATRIX) */}
      <section className="w-full relative z-10 py-12 sm:py-16 lg:py-20 font-sans overflow-hidden border-t border-b border-[#C9A227]/40">
        
        {/* Background Image / Overlay resonating with Mythology - Placed to the side */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img 
            src={goldenFigureBg} 
            alt="The Cast Mythology Matrix Background" 
            className="w-full h-full object-cover object-right md:object-[88%_center] opacity-80 contrast-125 saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/85 via-[#050505]/30 to-[#050505]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right_center,rgba(201,162,39,0.25),transparent_65%)]" />
        </div>

        <div className="w-full max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-10 relative z-10">
          <ScrollReveal>
            <div className="bg-[#0D0A06]/95 border-2 border-[#E2B13D]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 backdrop-blur-md relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.95)] space-y-8">
              
              {/* Header Title & View Selector */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#E2B13D]/30">
                <div className="text-center md:text-left space-y-2.5 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A227]/20 border border-[#E2B13D]/50 text-[#FCE289] text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#FCE289]" />
                    <span>Architectural Matrix</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white uppercase tracking-tight font-sans drop-shadow-md">
                    THE CAST AT A GLANCE
                  </h2>
                  <p className="text-sm sm:text-base text-stone-200 font-sans font-medium leading-relaxed">
                    A comprehensive overview mapping the eight forces, what drives each, their wounded vs integrated states, and what un-integrated driving costs you.
                  </p>
                </div>

                {/* View Switcher Controls */}
                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#18110B] border-2 border-[#E2B13D]/50 shrink-0 shadow-lg">
                  <button
                    onClick={() => setMatrixViewMode('grid')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                      matrixViewMode === 'grid'
                        ? 'bg-gradient-to-r from-[#9B6617] to-[#E2B13D] text-black shadow-md'
                        : 'text-stone-300 hover:text-white hover:bg-[#2A1E12]'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>Grid Matrix</span>
                  </button>
                  <button
                    onClick={() => setMatrixViewMode('table')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                      matrixViewMode === 'table'
                        ? 'bg-gradient-to-r from-[#9B6617] to-[#E2B13D] text-black shadow-md'
                        : 'text-stone-300 hover:text-white hover:bg-[#2A1E12]'
                    }`}
                  >
                    <Table className="w-4 h-4" />
                    <span>Full Table</span>
                  </button>
                </div>
              </div>

              {/* VIEW 1: GRID MATRIX VIEW */}
              {matrixViewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                  {CAST_MEMBERS.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-[#120D08]/95 border-2 border-[#E2B13D]/40 rounded-2xl p-5 sm:p-6 backdrop-blur-sm flex flex-col justify-between hover:border-[#FCE289] hover:shadow-[0_0_35px_rgba(226,177,61,0.35)] transition-all duration-300 group shadow-md"
                    >
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-center gap-3.5 pb-3.5 border-b border-[#322312]">
                          <div className="w-12 h-12 rounded-xl border-2 border-[#E2B13D] bg-[#1C140B] flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-lg group-hover:scale-105 transition-transform">
                            <img src={item.iconUrl} alt={item.name} className="w-full h-full object-contain filter brightness-125" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="text-base font-black text-white uppercase tracking-wider font-sans leading-tight group-hover:text-[#FCE289] transition-colors">
                              {item.name}
                            </h4>
                            <span className="text-[11px] font-mono font-black text-[#FCE289] uppercase tracking-wider block mt-0.5">
                              {item.role}
                            </span>
                          </div>
                        </div>

                        {/* Science / Driver */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono font-black uppercase text-[#E2B13D] tracking-wider block">
                            WHAT DRIVES IT
                          </span>
                          <p className="text-[13px] text-stone-100 font-medium leading-relaxed bg-[#1A130B] p-3 rounded-lg border border-[#E2B13D]/30 shadow-xs">
                            {item.science}
                          </p>
                        </div>

                        {/* Wounded State */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono font-black uppercase text-[#F87171] tracking-wider">
                              WOUNDED STATE
                            </span>
                          </div>
                          <p className="text-[13px] text-red-100 font-medium leading-relaxed bg-[#280D0D] p-3 rounded-lg border border-[#F87171]/50 shadow-xs">
                            <span className="font-black block text-[11px] uppercase text-[#F87171] mb-1 tracking-wide">Trigger: {item.woundedTrigger}</span>
                            {item.wounded}
                          </p>
                        </div>

                        {/* Integrated State */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono font-black uppercase text-[#FCE289] tracking-wider block">
                            INTEGRATED STATE
                          </span>
                          <p className="text-[13px] text-amber-100 font-semibold leading-relaxed bg-[#261C0B] p-3 rounded-lg border border-[#E2B13D]/60 shadow-xs">
                            {item.integrated}
                          </p>
                        </div>
                      </div>

                      {/* What it costs you */}
                      <div className="mt-5 pt-4 border-t border-[#322312]">
                        <span className="text-[11px] font-mono font-black uppercase text-stone-300 tracking-wider block mb-1">
                          WHAT IT COSTS YOU
                        </span>
                        <p className="text-xs text-stone-200 italic font-medium leading-relaxed bg-[#0A0704]/60 p-2.5 rounded-md border border-white/5">
                          "{item.costsYou}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* VIEW 2: FULL EXPANSIVE TABLE VIEW */}
              {matrixViewMode === 'table' && (
                <div className="overflow-x-auto rounded-xl border border-[#C9A227]/30 bg-[#050403]/90 backdrop-blur-sm shadow-xl">
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="bg-[#120E09] border-b border-[#C9A227]/40">
                        <th className="p-4 text-[11px] font-mono font-black text-[#C9A227] uppercase tracking-wider w-[18%]">
                          CHARACTER
                        </th>
                        <th className="p-4 text-[11px] font-mono font-black text-[#C9A227] uppercase tracking-wider w-[20%]">
                          WHAT DRIVES IT
                        </th>
                        <th className="p-4 text-[11px] font-mono font-black text-[#C9A227] uppercase tracking-wider w-[22%]">
                          WOUNDED STATE
                        </th>
                        <th className="p-4 text-[11px] font-mono font-black text-[#C9A227] uppercase tracking-wider w-[20%]">
                          INTEGRATED STATE
                        </th>
                        <th className="p-4 text-[11px] font-mono font-black text-[#C9A227] uppercase tracking-wider w-[20%]">
                          WHAT IT COSTS YOU
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#22180E]">
                      {CAST_MEMBERS.map((item) => (
                        <tr key={item.id} className="hover:bg-[#120E08] transition-colors group">
                          {/* Character Column */}
                          <td className="p-4 sm:p-5 align-top">
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-xl border border-[#C9A227]/60 bg-[#140E08] flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-xs">
                                <img src={item.iconUrl} alt={item.name} className="w-full h-full object-contain filter brightness-110" referrerPolicy="no-referrer" />
                              </div>
                              <div>
                                <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-sans leading-snug group-hover:text-[#FCE289] transition-colors">
                                  {item.name}
                                </h4>
                                <span className="text-[9px] font-mono font-bold text-[#C9A227] uppercase tracking-wider block mt-0.5">
                                  {item.role}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* What Drives It */}
                          <td className="p-4 sm:p-5 align-top text-xs text-stone-200 font-sans leading-relaxed">
                            {item.science}
                          </td>

                          {/* Wounded State */}
                          <td className="p-4 sm:p-5 align-top text-xs text-[#EF4444] font-medium leading-relaxed bg-[#1C0A0A]/20">
                            <span className="font-bold block text-[10px] uppercase text-[#EF4444]/90 mb-1">Trigger: {item.woundedTrigger}</span>
                            {item.wounded}
                          </td>

                          {/* Integrated State */}
                          <td className="p-4 sm:p-5 align-top text-xs text-[#FCE289] font-semibold leading-relaxed bg-[#1A1408]/30">
                            {item.integrated}
                          </td>

                          {/* What It Costs You */}
                          <td className="p-4 sm:p-5 align-top text-xs text-stone-300 font-sans leading-relaxed">
                            {item.costsYou}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5 — THE ONE */}
      <section className="w-full relative z-10 py-16 sm:py-24 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F3] to-[#FFFFFF] text-slate-900 border-y-2 border-[#D4AF37]/40 shadow-inner overflow-hidden">
        {/* Subtle Background Patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4AF370F_1px,transparent_1px),linear-gradient(to_bottom,#D4AF370F_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="bg-white border-2 border-[#D4AF37]/60 rounded-3xl p-8 sm:p-12 text-center shadow-[0_15px_45px_rgba(212,175,55,0.15)] relative overflow-hidden space-y-6">
            {/* Gold Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#997314] via-[#F3E5AB] via-[#D4AF37] to-[#997314]" />
            
            <div className="inline-block px-3.5 py-1 bg-[#B8860B] text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs">
              OPTIMIZED STATE
            </div>

            <h2 className="font-playfair font-bold text-3xl sm:text-5xl text-slate-950 uppercase tracking-wider">
              THE ONE
            </h2>

            <p className="font-mono text-xs sm:text-sm text-[#8B6508] font-bold uppercase tracking-widest">
              Optimized Neuro-Biological Evolution
            </p>

            {/* THE ONE Image Artwork */}
            <div className="relative w-full max-w-lg mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-[0_10px_35px_rgba(212,175,55,0.15)] my-4 bg-[#FAF8F3] flex items-center justify-center p-3">
              <img 
                src="https://res.cloudinary.com/ew2ztpgz/image/upload/v1787349158/the_one_removed_lkf4bf.png" 
                alt="THE ONE — Optimized Neuro-Biological Evolution" 
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[500px] object-contain rounded-xl contrast-105"
              />
            </div>

            <p className="font-inter text-sm sm:text-base text-[#7E4F11] font-semibold italic">
              The goal was never to kill the beasts. It's to command them.
            </p>

            <div className="space-y-4 font-inter text-xs sm:text-sm text-slate-700 leading-relaxed text-left max-w-3xl mx-auto pt-2 font-medium">
              <p>
                The ONE is what it looks like when the Ghost is finally filed as finished, EGON stands down, and the Commander, Eagle, Tiger, Wolf, and Lion answer to you instead of running you. Not a type. Not a personality. A state your system can operate from.
              </p>
              <p>
                What changes: the system reads challenge as challenge, not threat. What you get: access to your full native capacity — drive without the internal war. What it looks like: sustained output with far less internal friction.
              </p>
            </div>

            <div className="pt-6 border-t border-[#D4AF37]/30">
              <p className="font-playfair font-bold text-base sm:text-xl text-[#7E4F11] italic">
                &ldquo;Master the Beasts, Rule the Theater. Become the ONE.&rdquo;
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6 — CLOSE */}
      <section className="w-full relative z-10 py-16 sm:py-20 text-center font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-gradient-to-b from-[#1F180C] via-[#141008] to-[#0A0804] rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-14 lg:p-20 text-center shadow-[0_15px_50px_rgba(201,162,39,0.3)] border border-[#C9A227]/40 space-y-6 flex flex-col items-center">
              
              <h2 className="text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight font-serif leading-tight">
                Which one is running you?
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-stone-200 font-sans max-w-2xl leading-relaxed">
                The Mirror Quiz reads your system and shows you what's actually driving.
              </p>

              <div className="pt-2 flex flex-col items-center gap-4">
                <button
                  onClick={onOpenMirrorQuiz}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-[#000000] font-inter font-black text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 cursor-pointer shadow-[0_4px_30px_rgba(226,177,61,0.45)] hover:shadow-[0_6px_40px_rgba(226,177,61,0.7)] hover:scale-105 transition-all duration-300"
                >
                  <span>GET EARLY ACCESS TO THE MIRROR QUIZ</span>
                  <ArrowRight className="w-4 h-4 text-[#000000]" />
                </button>

                <button
                  onClick={onOpenSpeakerKit}
                  className="text-xs font-mono font-semibold text-[#C9A227] hover:text-[#FFE18A] uppercase tracking-wider underline underline-offset-4 cursor-pointer transition-colors pt-2"
                >
                  Work With Thomas
                </button>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};
