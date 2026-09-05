import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import castBgImage from '../assets/images/mythology_bg_1784904573049.jpg';
import goldenFigureBg from '../assets/images/golden_figure_bg_1785192950234.jpg';
import { ScrollReveal } from './ScrollReveal';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
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
  onNavigatePage?: (page: 'home' | 'about' | 'keynotes' | 'science' | 'mythology' | 'quiz' | 'speaker-kit' | 'waitlist', sectionId?: string) => void;
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
    role: 'The Force of Command',
    image: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1787348010/commander_2.2_bnwgkl.png',
    iconUrl: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1787348010/commander_2.2_bnwgkl.png',
    description: 'The part of you that decides. Runs the day, holds the line under pressure, and can talk the rest of the system down mid-reaction.',
    wounded: 'Goes offline. When the load gets heavy enough, the Commander shuts down and the reactive parts take the wheel — which is why you can know exactly what to do and do the opposite anyway.',
    integrated: 'Stays online when it counts. The steady hand that keeps the whole cast working for you instead of against you.',
    science: 'Prefrontal neural regulation — regulation and top-down control',
    woundedTrigger: 'Being under heavy load',
    costsYou: 'The decisions you\'d never have made if you\'d been fully at the wheel.',
    quote: '"A plan is worth nothing if nobody\'s at the wheel when the pressure hits."'
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
    science: 'Perception, pattern recognition, and mental simulation',
    woundedTrigger: 'Not knowing what\'s coming',
    costsYou: 'Years of preparing for a thing you never started.',
    quote: '"You can\'t navigate the storm from inside the clouds."'
  },
  {
    id: 'tiger',
    name: 'THE TIGER',
    role: 'The Force of Mobilization',
    image: tigerImg,
    iconUrl: tigerImg,
    description: 'Your accelerator. The surge that gets you moving when something matters.',
    wounded: 'Fires first, asks later. Heat, edge, and damage done to the people closest to you before you chose any of it.',
    integrated: 'Decisive force. Speed and follow-through, aimed where you point it.',
    science: 'Sympathetic Overdrive — threat mobilization',
    woundedTrigger: 'Being blocked or disrespected',
    costsYou: 'Relationships burned by a reaction that was never a decision.',
    quote: '"The Tiger burns the village, or it fuels the engine. You decide where the fire goes."'
  },
  {
    id: 'wolf',
    name: 'THE WOLF',
    role: 'The Force of Belonging',
    image: wolfImg,
    iconUrl: wolfImg,
    description: 'The part of you built for the pack. Trust, loyalty, the pull toward people.',
    wounded: 'Appeases. Says yes when it means no, keeps the peace at your own expense, manages everyone\'s comfort but your own.',
    integrated: 'Builds the pack. Trust that multiplies what one person can do alone.',
    science: 'Social Compliance Appeasement — bonding and co-regulation',
    woundedTrigger: 'Being left out',
    costsYou: 'A life shaped around not being left out.',
    quote: '"The pack is worth belonging to. It was never worth disappearing into."'
  },
  {
    id: 'lion',
    name: 'THE LION',
    role: 'The Force of Presence',
    image: lionEmblemImg,
    iconUrl: lionEmblemImg,
    description: 'How much room you take up. Whether a room registers you before you speak.',
    wounded: 'Shrinks. Goes quiet in the rooms that matter, defers on instinct, then resents the silence.',
    integrated: 'Steady presence. Authority that doesn\'t need volume.',
    science: 'The biology of presence — steadiness under social pressure',
    woundedTrigger: 'Being judged or overlooked',
    costsYou: 'Being overlooked in rooms you belong in.',
    quote: '"The Lion doesn\'t roar to be heard. It\'s heard before it speaks."'
  },
  {
    id: 'phoenix',
    name: 'THE PHOENIX',
    role: 'The Force of Rebirth',
    image: phoenixImg,
    iconUrl: phoenixImg,
    description: 'The reason none of this is fixed. Your system can rewire — that\'s not a metaphor, it\'s the mechanism.',
    wounded: 'Dormant. Loyal to a version of yourself that expired years ago.',
    integrated: 'Deliberate reinvention. Letting an old build end so a truer one can run.',
    science: 'Neuroplasticity — the system\'s capacity to change',
    woundedTrigger: 'Staying the same too long',
    costsYou: 'Running your life today on a system you built at nineteen.',
    quote: '"Every ending is a beginning disguised in smoke."'
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
    science: 'Default Mode Network — the self-protective narrator',
    woundedTrigger: 'Being seen or exposed',
    costsYou: 'The pivot you didn\'t make. The thing you never shipped.',
    quote: '"EGON doesn\'t want you to be great. He wants you to be safe."'
  },
  {
    id: 'ghost',
    name: 'THE GHOST',
    role: 'The Undated Files',
    image: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1787347828/ghost_1_m7wqyg.png',
    iconUrl: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1787347828/ghost_1_m7wqyg.png',
    description: 'The part of your system still responding to something that already ended. Experience that was never filed as finished — so it keeps getting treated as current.\n\nYou don\'t remember it as a memory. You feel it as a reaction that doesn\'t fit the room.',
    wounded: 'Runs the present on old footage. Today gets read through something that happened decades ago.',
    integrated: 'Filed and dated. The past becomes history instead of a live threat.',
    science: 'Early experience stored without a timestamp',
    woundedTrigger: 'Something that echoes the past',
    costsYou: 'Fighting today with yesterday\'s defenses.',
    quote: '"The threat ended years ago. Nobody told your body."'
  }
];

export const MythologyPage: React.FC<MythologyPageProps> = ({
  onOpenMirrorQuiz,
  onOpenSpeakerKit,
  onOpenContact,
  onNavigatePage
}) => {
  const [activeCastIndex, setActiveCastIndex] = useState(0);
  const currentMember = CAST_MEMBERS[activeCastIndex];

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
              <span>THE MYTHOLOGY</span>
            </div>

            <h1 className="font-playfair font-black text-3xl sm:text-5xl lg:text-7xl text-white tracking-tight uppercase leading-[1.05] mb-6">
              THE CAST OF YOUR
              <br />
              <span className="bg-gradient-to-r from-[#FFE18A] via-[#C9A227] to-[#8C6D1F] bg-clip-text text-transparent">
                INTERNAL THEATER
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 text-stone-200 font-sans text-sm sm:text-base md:text-lg leading-relaxed mb-8 text-center font-normal">
              <p className="font-playfair italic text-lg sm:text-2xl text-[#FFE18A] leading-relaxed font-normal">
                Your biology doesn&apos;t explain itself. It just acts — and then you spend years wondering why you snapped, why you shrank, why you couldn&apos;t start.
              </p>
              <p className="font-bold text-white text-base sm:text-lg">
                So we gave it a cast.
              </p>
              <p className="text-stone-300">
                The Commander, the Eagle, the Tiger, the Wolf, the Lion, the Phoenix, EGON, and the Ghost aren&apos;t personality types. They&apos;re your parts — the same parts everyone has. They&apos;re what your survival system looks like when you can finally see it working.
              </p>
              <p className="text-stone-300">
                This is the story layer of REGENESIS: the same architecture{' '}
                <a
                  href="/science"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigatePage) {
                      onNavigatePage('science');
                    } else {
                      window.history.pushState({}, '', '/science');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }
                  }}
                  className="text-[#FFE18A] font-medium underline decoration-[#C9A227] hover:text-white transition-colors cursor-pointer"
                >
                  the science
                </a>{' '}
                describes, told the way you actually live it.
              </p>
            </div>

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
                Nothing here needs to be killed. The Tiger isn't the problem. An unsupervised Tiger is.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3 — THE CAST (DESKTOP CAROUSEL ONLY) */}
      <section className="hidden lg:block w-full relative z-10 py-16 lg:py-20 overflow-hidden border-t border-b border-[#C9A227]/20">
        
        {/* Background Image with Contrast Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={castBgImage} 
            alt="The Cast Background" 
            className="w-full h-full object-cover object-center opacity-70 contrast-125 saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/30 to-[#050505]/80" />
        </div>

        <div className="max-w-[1550px] mx-auto px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10 px-2">
              <span className="uppercase tracking-[0.25em] text-[#C9A227] text-xs font-mono font-bold block mb-2">
                THE CAST
              </span>
              <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-white tracking-tight uppercase">
                The Eight Forces
              </h2>
              <div className="w-20 h-0.5 bg-[#C9A227] mx-auto my-4" />
              <p className="font-inter text-sm text-stone-300 max-w-[60ch] mx-auto leading-relaxed">
                Explore the eight internal forces that govern human performance under pressure. Select a card to view its dual states, science tag, and cost.
              </p>
            </div>
          </ScrollReveal>

          {/* Quick-Select Character Tabs */}
          <div className="grid grid-cols-8 gap-2.5 mb-8 max-w-5xl mx-auto">
            {CAST_MEMBERS.map((member, idx) => {
              const isActive = idx === activeCastIndex;
              return (
                <button
                  key={member.id}
                  onClick={() => setActiveCastIndex(idx)}
                  className={`p-2.5 rounded-xl border text-center transition-all duration-300 cursor-pointer flex flex-col items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-b from-[#2A2010] to-[#140E08] border-[#C9A227] shadow-[0_0_20px_rgba(201,162,39,0.35)] ring-1 ring-[#FFE18A] scale-[1.02]'
                      : 'bg-[#100D09]/85 border-[#C9A227]/25 hover:border-[#C9A227]/60 hover:bg-[#18130C]'
                  }`}
                >
                  <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-[#FFE18A]' : 'text-[#C9A227]/70'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className={`font-mono text-[11px] font-bold uppercase tracking-wider truncate w-full text-center ${isActive ? 'text-white' : 'text-stone-300'}`}>
                    {member.name.replace('THE ', '')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE CHARACTER FULL DETAIL CAROUSEL DISPLAY */}
          <div className="bg-gradient-to-b from-[#0C0A07] via-[#090705] to-[#050505] rounded-[32px] p-8 lg:p-12 border border-[#C9A227]/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex items-stretch gap-10 lg:gap-14 relative overflow-hidden">
            
            {/* LEFT COLUMN: LARGE ARTWORK PORTRAIT */}
            <div className="w-5/12 flex flex-col relative z-10 shrink-0">
              <div className="relative w-full h-full min-h-[520px] rounded-2xl overflow-hidden border-2 border-[#C9A227]/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] bg-black/90 flex flex-col justify-between p-6">
                <img 
                  src={currentMember.image} 
                  alt={currentMember.name} 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center contrast-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                
                <div className="relative z-10 flex items-center justify-end">
                  <span className="px-3.5 py-1.5 bg-black/75 backdrop-blur-md rounded-full border border-[#C9A227]/50 font-mono text-xs text-[#FFE18A] uppercase font-bold tracking-widest">
                    THE CAST
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ALL SIX FIELDS DETAIL PANEL */}
            <div className="w-7/12 flex flex-col justify-between relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCastIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="font-playfair font-bold text-3xl lg:text-4xl text-white uppercase tracking-tight">
                      {currentMember.name}
                    </h3>
                    <p className="font-mono text-xs font-bold text-[#C9A227] uppercase tracking-wider mt-1">
                      {currentMember.role}
                    </p>
                  </div>

                  {/* Field 1: Description */}
                  <p className="font-inter text-sm text-stone-200 leading-relaxed whitespace-pre-line">
                    {currentMember.description}
                  </p>

                  {/* Field 2 & 3: Wounded & Integrated States */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="p-4 rounded-xl bg-[#140C08] border border-[#EF4444]/40 space-y-2">
                      <span className="font-mono text-[10px] text-[#EF4444] uppercase font-bold tracking-wider block">
                        WOUNDED STATE
                      </span>
                      <div className="font-mono text-[11px] text-[#F87171] font-bold block">
                        Trigger: {currentMember.woundedTrigger}
                      </div>
                      <p className="font-inter text-xs text-stone-300 leading-relaxed">
                        {currentMember.wounded}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0E150C] border border-[#C9A227]/40 space-y-2">
                      <span className="font-mono text-[10px] text-[#FCE289] uppercase font-bold tracking-wider block">
                        INTEGRATED STATE
                      </span>
                      <p className="font-inter text-xs text-stone-200 leading-relaxed pt-1">
                        {currentMember.integrated}
                      </p>
                    </div>
                  </div>

                  {/* Field 4 & 5: Science & What It Costs You */}
                  <div className="p-4 rounded-xl bg-[#090705] border border-[#C9A227]/25 space-y-2.5 font-inter text-xs">
                    <div>
                      <strong className="text-[#C9A227] block text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5">
                        The Science
                      </strong>
                      <span className="text-stone-200 leading-normal">{currentMember.science}</span>
                    </div>
                    <div>
                      <strong className="text-[#C9A227] block text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5">
                        What It Costs You
                      </strong>
                      <span className="text-stone-200 leading-normal">{currentMember.costsYou}</span>
                    </div>
                  </div>

                  {/* Field 6: Quote */}
                  <div className="p-4 rounded-xl bg-[#1A150C] border-l-2 border-[#C9A227] text-center italic font-playfair text-sm text-[#FCE289]">
                    {currentMember.quote}
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Carousel Nav Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-[#C9A227]/20 mt-6">
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

          </div>

        </div>
      </section>

      {/* SECTION 4 — THE CAST AT A GLANCE (FULL COMPARATIVE TABLE) */}
      <section className="w-full relative z-10 py-12 sm:py-16 lg:py-20 font-sans overflow-hidden border-t border-b border-[#C9A227]/40">
        
        {/* Background Image / Overlay resonating with Mythology */}
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
              
              {/* Header Title (Clean, no toggle controls) */}
              <div className="text-center md:text-left space-y-2.5 max-w-3xl pb-6 border-b border-[#E2B13D]/30">
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

              {/* DESKTOP VIEW: FULL EXPANSIVE TABLE */}
              <div className="hidden md:block overflow-x-auto rounded-xl border border-[#C9A227]/30 bg-[#050403]/90 backdrop-blur-sm shadow-xl">
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
                              <p className="text-[11px] text-[#FCE289] italic font-playfair mt-2 leading-tight">
                                {item.quote}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* What Drives It */}
                        <td className="p-4 sm:p-5 align-top text-xs text-stone-200 font-sans leading-relaxed">
                          {item.science}
                        </td>

                        {/* Wounded State */}
                        <td className="p-4 sm:p-5 align-top text-xs leading-relaxed bg-[#1C0A0A]/20">
                          <div className="font-mono text-[10px] font-bold uppercase text-[#EF4444] mb-1.5 tracking-wider">
                            WOUNDED STATE
                          </div>
                          <div className="font-mono text-[11px] font-bold text-[#F87171] mb-1.5">
                            Trigger: {item.woundedTrigger}
                          </div>
                          <p className="text-xs text-[#EF4444] font-medium leading-relaxed">
                            {item.wounded}
                          </p>
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

              {/* MOBILE VIEW: VERTICAL STACKED CARDS FOR MOBILE READABILITY */}
              <div className="md:hidden space-y-5">
                {CAST_MEMBERS.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-[#120D08]/95 border border-[#E2B13D]/40 rounded-xl p-4 sm:p-5 space-y-3.5 shadow-md"
                  >
                    <div className="flex items-center gap-3 pb-3 border-b border-[#322312]">
                      <div className="w-11 h-11 rounded-lg border border-[#E2B13D] bg-[#1C140B] flex items-center justify-center shrink-0 overflow-hidden p-1">
                        <img src={item.iconUrl} alt={item.name} className="w-full h-full object-contain filter brightness-110" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-white uppercase tracking-wider font-sans">
                          {item.name}
                        </h4>
                        <span className="text-[11px] font-mono font-bold text-[#FCE289] uppercase tracking-wider block">
                          {item.role}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-black uppercase text-[#E2B13D] tracking-wider block">
                        WHAT DRIVES IT
                      </span>
                      <p className="text-xs text-stone-200 leading-relaxed bg-[#1A130B] p-2.5 rounded-lg border border-[#E2B13D]/20">
                        {item.science}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-black uppercase text-[#EF4444] tracking-wider block">
                        WOUNDED STATE
                      </span>
                      <div className="bg-[#280D0D]/70 p-3 rounded-lg border border-[#EF4444]/30 space-y-2">
                        <div className="font-mono text-[11px] font-bold uppercase text-[#F87171]">
                          Trigger: {item.woundedTrigger}
                        </div>
                        <p className="text-xs text-red-200 leading-relaxed">
                          {item.wounded}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-black uppercase text-[#FCE289] tracking-wider block">
                        INTEGRATED STATE
                      </span>
                      <p className="text-xs text-amber-100 font-medium leading-relaxed bg-[#261C0B]/70 p-2.5 rounded-lg border border-[#E2B13D]/30">
                        {item.integrated}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-black uppercase text-stone-300 tracking-wider block">
                        WHAT IT COSTS YOU
                      </span>
                      <p className="text-xs text-stone-300 italic leading-relaxed bg-[#0A0704]/60 p-2.5 rounded-lg border border-white/5">
                        {item.costsYou}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-black uppercase text-[#C9A227] tracking-wider block">
                        QUOTE
                      </span>
                      <div className="p-3 rounded-lg bg-[#1A150C] border-l-2 border-[#C9A227] italic font-playfair text-xs sm:text-sm text-[#FCE289]">
                        {item.quote}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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
                  onClick={onOpenContact || onOpenSpeakerKit}
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
