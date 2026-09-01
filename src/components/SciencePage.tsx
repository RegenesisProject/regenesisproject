import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import { 
  Atom, 
  Brain, 
  Zap, 
  Activity, 
  Flame, 
  Dna, 
  Radio, 
  Network, 
  Compass, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  X,
  ChevronRight,
  ShieldAlert,
  Cpu
} from 'lucide-react';

interface SciencePageProps {
  onOpenMirrorQuiz: () => void;
  onNavigateKeynotes?: () => void;
  onOpenSpeakerKit?: () => void;
  onOpenContact?: () => void;
  onOpenWaitlist?: () => void;
}

export interface ScienceLens {
  id: string;
  name: string;
  headline: string;
  description: string;
  icon: React.ElementType;
}

export interface ScienceBlock {
  number: string;
  title: string;
  subtitle: string;
  lenses: ScienceLens[];
}

export const SCIENCE_BLOCKS: ScienceBlock[] = [
  {
    number: 'BLOCK 1',
    title: 'THE HARDWARE',
    subtitle: "The physical machine you're running on.",
    lenses: [
      {
        id: 'neuroscience',
        name: 'NEUROSCIENCE',
        headline: "The brain's structures and circuits",
        description: 'How threat, focus, and decision-making are physically routed, and why the thinking brain goes offline first when the system is under load.',
        icon: Brain
      },
      {
        id: 'biophysics',
        name: 'BIOPHYSICS',
        headline: 'The electrical and structural layer',
        description: 'Signal speed, insulation, and conduction. Why some systems process fast and clean, and others run with lag.',
        icon: Zap
      },
      {
        id: 'somatic',
        name: 'SOMATIC SCIENCE',
        headline: 'The body as a sensing instrument',
        description: 'Muscle, fascia, posture, and physical tension. Where the system stores what was never discharged.',
        icon: Activity
      }
    ]
  },
  {
    number: 'BLOCK 2',
    title: 'THE ENGINE',
    subtitle: 'What powers the machine, and what sets its baseline.',
    lenses: [
      {
        id: 'bioenergetics',
        name: 'BIO-ENERGETICS',
        headline: 'Cellular energy and the real cost of running your life',
        description: 'Why "laziness" is usually a power problem, not a character problem — and what happens when the system runs on emergency reserves instead of fuel.',
        icon: Flame
      },
      {
        id: 'microbiology',
        name: 'MICROBIOLOGY',
        headline: 'The gut and its signaling relationship with the brain',
        description: 'The internal environment that shapes baseline mood, steadiness, and how much load the system can carry.',
        icon: Atom
      },
      {
        id: 'epigenetics',
        name: 'EPIGENETICS',
        headline: 'How environment and experience change gene expression',
        description: 'The layer that explains why the same hardware runs differently under different conditions.',
        icon: Dna
      }
    ]
  },
  {
    number: 'BLOCK 3',
    title: 'THE REGULATION',
    subtitle: 'The control systems that decide what your body does before you decide anything.',
    lenses: [
      {
        id: 'autonomic',
        name: 'AUTONOMIC REGULATION',
        headline: 'The automatic state-switching underneath every reaction',
        description: 'Mobilization, appeasement, or shutdown. Where most people mistake a state for a personality.',
        icon: Radio
      },
      {
        id: 'cybernetics',
        name: 'CYBERNETICS & PREDICTIVE PROCESSING',
        headline: 'Your system runs on predictions, not fresh data',
        description: "It guesses what's coming based on what happened before — which is exactly why an old threat can drive a present-day reaction.",
        icon: Network
      },
      {
        id: 'systems',
        name: 'SYSTEMS THEORY',
        headline: 'Nothing in the machine moves alone',
        description: 'Change one layer and the others respond — which is why isolated fixes don\'t hold, and why architecture works where tactics fail.',
        icon: Compass
      }
    ]
  },
  {
    number: 'BLOCK 4',
    title: 'THE INTERFACE',
    subtitle: 'How the machine meets the world — and how the world wrote itself into the machine.',
    lenses: [
      {
        id: 'memory',
        name: 'MEMORY SCIENCE',
        headline: 'How experience gets stored',
        description: 'What happens when a file is saved without a date on it — so the system keeps replaying an old threat as if it were happening now.',
        icon: Lock
      },
      {
        id: 'neurosociology',
        name: 'NEURO-SOCIOLOGY',
        headline: "Nervous systems don't run in isolation",
        description: 'Being near other people changes your state — how you read a room, and how a room reads you.',
        icon: Layers
      },
      {
        id: 'psychology',
        name: 'PSYCHOLOGY',
        headline: 'Identity, narrative, and the story the system tells',
        description: "The layer most personal development starts and ends with, and the reason it so often isn't enough on its own.",
        icon: Brain
      }
    ]
  }
];

const twelveLensesBg = 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1785797732/the_science_3_vt6yab.png';

export const SciencePage: React.FC<SciencePageProps> = ({ 
  onOpenMirrorQuiz,
  onNavigateKeynotes
}) => {
  const [selectedLens, setSelectedLens] = useState<{ lens: ScienceLens; blockTitle: string } | null>(null);

  return (
    <div className="relative min-h-screen bg-[#0C0B0A] text-[#E8E3D5] font-inter overflow-hidden pb-24 pt-28">
      {/* Dynamic Background Radiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[35%] right-0 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[70%] left-0 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* ================= SECTION 1 — HERO ================= */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden py-12 px-4 sm:px-6 lg:px-12 -mt-6">
        {/* Full Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/ew2ztpgz/image/upload/v1785797732/the_science_3_vt6yab.png" 
            alt="The Science — Architecture of the Human Machine" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right lg:object-center opacity-100"
          />
          {/* Subtle left gradient overlay to guarantee contrast for text over dark temple pillars */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0B0A]/95 via-[#0C0B0A]/70 to-transparent max-w-4xl pointer-events-none" />
          {/* Subtle bottom edge blend into next section */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0C0B0A] to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 text-left">
            <ScrollReveal yOffset={20}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181510]/90 backdrop-blur-md border border-[#C9A227]/60 text-[#C9A227] font-mono text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(201,162,39,0.25)] mb-3">
                <Atom className="w-3.5 h-3.5 text-[#C9A227] animate-pulse" />
                <span>THE SCIENCE</span>
              </div>

              <h1 className="font-sans font-black text-4xl sm:text-6xl lg:text-6xl xl:text-7xl text-white tracking-tight leading-[1.05] uppercase drop-shadow-xl">
                YOU WERE BORN<br />
                AS ONE SYSTEM.<br />
                <span className="text-[#FCE289] font-playfair italic font-extrabold normal-case block mt-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  Another was installed on top.
                </span>
              </h1>

              <div className="space-y-4 font-inter text-sm sm:text-base text-[#D4CEBF] leading-relaxed pt-2 max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                <p>
                  <strong className="text-white font-semibold">Your BOS — Biological Operating System —</strong> is the machine you were born as. Your native build, and more capacity than you&apos;ve been able to reach.
                </p>
                <p>
                  <strong className="text-white font-semibold">Your SOS — Survival Operating System —</strong> is the layer installed over it in your earliest years. Your nervous system built it, and it built it for a reason: to get a child through what that environment demanded.
                </p>
                <p>
                  Nearly everyone is running some version of one. How much of one depends entirely on what those early years asked of you — a genuinely low-pressure childhood writes almost nothing.
                </p>
                <p>
                  But most people were shaped by something. And those settings are still deciding what feels safe, what feels possible, and what your system will let you attempt.
                </p>
                <p className="font-semibold text-white pt-1">
                  REGENESIS reads the machine through twelve lenses of science to find where those settings are costing you — and what it takes to change them.
                </p>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenMirrorQuiz}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] hover:opacity-95 text-black font-inter text-xs sm:text-sm font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-[0_0_35px_rgba(201,162,39,0.35)] cursor-pointer inline-flex items-center justify-center gap-2.5 hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>GET EARLY ACCESS TO THE MIRROR QUIZ</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2 — THE TWELVE LENSES ================= */}
      <section className="w-full left-0 right-0 relative z-10 py-16 bg-[#0A0908] text-white overflow-hidden">
        {/* Topic-Related Background Image with Dark Luxury Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src={twelveLensesBg}
            alt="The Twelve Lenses Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-95 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0908]/65 via-[#0A0908]/15 to-[#0A0908]/65" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal yOffset={24}>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#C9A227] tracking-[0.25em] uppercase block">
                FOUR BLOCKS · THREE LENSES EACH
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
                THE TWELVE LENSES
              </h2>
              <p className="font-playfair italic text-lg sm:text-xl text-[#FCE289] max-w-4xl mx-auto">
                We don&apos;t teach the science. We use twelve scientific lenses to read one machine — yours. Each lens shows a different layer of the same system.
              </p>
            </div>
          </ScrollReveal>

          {/* Four Sequential Blocks */}
          <div className="space-y-16">
            {SCIENCE_BLOCKS.map((block, blockIdx) => (
              <ScrollReveal key={block.number} delay={blockIdx * 0.1} yOffset={20}>
                <div className="bg-[#28221C]/95 border border-[#C9A227]/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-md shadow-2xl">
                  
                  {/* Block Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#C9A227]/20 pb-6 mb-8 gap-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#C9A227] tracking-[0.2em] uppercase block mb-1">
                        {block.number}
                      </span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                        {block.title}
                      </h3>
                    </div>
                    <p className="font-playfair italic text-base sm:text-lg text-[#FCE289] max-w-xl">
                      {block.subtitle}
                    </p>
                  </div>

                  {/* 3 Lenses Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {block.lenses.map((lens, lensIdx) => {
                      const IconComponent = lens.icon;
                      const lensNum = (blockIdx * 3 + lensIdx + 1).toString().padStart(2, '0');

                      return (
                        <div
                          key={lens.id}
                          onClick={() => setSelectedLens({ lens, blockTitle: block.title })}
                          className="group bg-[#362E25]/90 border border-[#C9A227]/35 hover:border-[#C9A227]/70 hover:bg-[#3D342A]/90 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-[#C9A227]">
                                {lensNum}
                              </span>
                              <div className="w-9 h-9 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] group-hover:scale-105 transition-transform">
                                <IconComponent className="w-4 h-4" />
                              </div>
                            </div>

                            <h4 className="font-sans font-black text-base sm:text-lg text-white uppercase tracking-tight">
                              {lens.name}
                            </h4>

                            <p className="font-inter text-xs sm:text-sm font-semibold text-[#FCE289] leading-snug">
                              {lens.headline}
                            </p>

                            <p className="font-inter text-xs text-[#D4CEBF] leading-relaxed">
                              {lens.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Detail Drawer for Selected Lens */}
      <AnimatePresence>
        {selectedLens && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#14110E] border-2 border-[#C9A227] rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-[0_0_50px_rgba(201,162,39,0.3)] space-y-6 text-left"
            >
              <button
                onClick={() => setSelectedLens(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#1F1B16] border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] hover:bg-[#C9A227] hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[#C9A227] tracking-widest uppercase">
                  {selectedLens.blockTitle}
                </span>
                <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight">
                  {selectedLens.lens.name}
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-[#1D1813] border border-[#C9A227]/30">
                <p className="font-playfair italic text-base text-[#FCE289]">
                  &ldquo;{selectedLens.lens.headline}&rdquo;
                </p>
              </div>

              <p className="font-inter text-sm text-[#D4CEBF] leading-relaxed">
                {selectedLens.lens.description}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedLens(null);
                    onOpenMirrorQuiz();
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-black font-inter text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-95 transition-opacity inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>ASSESS THIS LENS IN THE QUIZ</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= SECTION 3 — WHY TWELVE ================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 relative z-10 py-16 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F3] to-[#FFFFFF] text-slate-900 border-y-2 border-[#D4AF37]/40 shadow-inner overflow-hidden">
        {/* Subtle Background Patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4AF370F_1px,transparent_1px),linear-gradient(to_bottom,#D4AF370F_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <ScrollReveal yOffset={24}>
            <div className="bg-white border-2 border-[#D4AF37]/60 rounded-3xl p-8 sm:p-12 space-y-8 relative overflow-hidden shadow-[0_15px_45px_rgba(212,175,55,0.15)]">
              {/* Gold Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#997314] via-[#F3E5AB] via-[#D4AF37] to-[#997314]" />

              <div className="border-b-2 border-[#D4AF37]/30 pb-6 space-y-2 pt-2">
                <span className="font-mono text-xs font-black text-[#7E4F11] bg-[#FAF3E0] border border-[#D4AF37] px-3.5 py-1 rounded-full tracking-[0.25em] uppercase inline-block shadow-xs">
                  SECTION 3
                </span>
                <h2 className="font-sans font-black text-3xl sm:text-4xl text-zinc-950 uppercase tracking-tight">
                  WHY TWELVE, AND NOT ONE?
                </h2>
              </div>

              <div className="space-y-6 font-inter text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                <p>
                  Most systems that explain people are built on one discipline. <strong className="text-zinc-950 font-bold">MBTI</strong> came out of Jungian typology. <strong className="text-zinc-950 font-bold">DISC</strong> came out of behavioral psychology. The <strong className="text-zinc-950 font-bold">Enneagram</strong> came out of a spiritual and personality tradition. The <strong className="text-zinc-950 font-bold">Big Five</strong> came out of statistical analysis of language.
                </p>
                <p>
                  Each of those is a real lens. Each one is partial. A framework built on a single discipline can only see what that discipline is equipped to see — which is why most personality systems can tell you <strong className="text-[#8B6B13] font-bold">what you do</strong> without ever explaining <strong className="text-zinc-950 font-bold">why it costs you what it costs</strong>.
                </p>
                <p>
                  There&apos;s a timing advantage too, and it&apos;s worth naming plainly. Those systems were built between the 1920s and the 1980s. Several of the sciences REGENESIS reads through didn&apos;t exist yet, or weren&apos;t usable. This framework was built with access to what those systems couldn&apos;t reach — and built to keep absorbing what comes next.
                </p>
                <p>
                  That&apos;s what the twelve are for. When a pattern shows up, it doesn&apos;t get described one way and left there. Every pattern gets asked the same twelve questions: what it costs you in energy, how it&apos;s wired, how it got shaped, what it&apos;s predicting, and how it behaves inside the whole system.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#FAF3E0] via-[#F5E8C4] to-[#FAF3E0] border-l-4 border-[#B8860B] shadow-xs">
                <p className="font-playfair italic font-bold text-lg sm:text-xl text-[#7E4F11] text-center">
                  &ldquo;One lens describes you. Twelve explain you.&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= SECTION 4 — THE HONEST STANDARD ================= */}
      <section className="w-full relative z-10 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal yOffset={24}>
            <div className="bg-[#12100E] border border-[#C9A227]/30 rounded-3xl p-8 sm:p-12 space-y-6 backdrop-blur-md shadow-2xl">
              <div className="border-b border-[#C9A227]/20 pb-4 space-y-1">
                <span className="font-mono text-xs font-bold text-[#C9A227] tracking-[0.2em] uppercase block">
                  SECTION 4
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  THE HONEST STANDARD — HOW WE HOLD THIS
                </h2>
              </div>

              <div className="space-y-4 font-inter text-sm sm:text-base text-[#D4CEBF] leading-relaxed">
                <p>
                  The twelve lenses are a reading protocol — a fixed set of questions every pattern has to answer. The disciplines are established and real. Grouping exactly these twelve, in these four blocks, and applying them as a required audit is REGENESIS&apos;s own architecture. That structure is the framework, and it is built to hold as the science inside it advances.
                </p>
                <p>
                  REGENESIS is informed by these sciences. It doesn&apos;t claim to be one of them. It&apos;s an assessment and coaching system, not a medical device — it does not diagnose, treat, cure, or prevent any condition.
                </p>
                <p className="font-semibold text-white pt-2">
                  In a category built on borrowed authority, saying exactly what this is — and what it isn&apos;t — is the difference.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= SECTION 5 — BUILT TO STAY OPEN ================= */}
      <section className="w-full relative z-10 py-16 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F3] to-[#FFFFFF] text-slate-900 border-y-2 border-[#D4AF37]/40 shadow-inner overflow-hidden">
        {/* Subtle Background Patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4AF370F_1px,transparent_1px),linear-gradient(to_bottom,#D4AF370F_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal yOffset={24}>
            <div className="bg-white border-2 border-[#D4AF37]/60 rounded-3xl p-8 sm:p-12 space-y-6 shadow-[0_15px_45px_rgba(212,175,55,0.15)] relative overflow-hidden">
              {/* Gold Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#997314] via-[#F3E5AB] via-[#D4AF37] to-[#997314]" />

              <div className="flex items-center gap-3 border-b-2 border-[#D4AF37]/30 pb-4 pt-2">
                <div className="p-2 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]">
                  <ShieldAlert className="w-5 h-5 text-[#B8860B]" />
                </div>
                <h2 className="font-sans font-black text-2xl sm:text-3xl text-zinc-950 uppercase tracking-tight">
                  BUILT TO STAY OPEN
                </h2>
              </div>

              <div className="space-y-5 font-inter text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                <p>
                  Science is not a settled library. It&apos;s a living body of work — constantly tested, refined, and occasionally overturned as new tools let us see what we couldn&apos;t before. That churn isn&apos;t a weakness in science. It&apos;s how science works.
                </p>
                <p>
                  The frameworks that came before us mapped real territory with the science of their time, and we stand on that foundation. But each was finished — closed at the moment its author set it down. When the science moved, they couldn&apos;t.
                </p>
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FAF3E0] via-[#F5E8C4] to-[#FAF3E0] border-l-4 border-[#B8860B] shadow-xs">
                  <p className="font-bold text-[#7E4F11] text-base sm:text-lg">
                    REGENESIS is built to stay open. It integrates twelve scientific lenses as a structure for reading the human machine — and as the science sharpens, the framework sharpens with it. That is the deliberate difference.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= SECTION 6 — CLOSE & CTA ================= */}
      <section className="w-full relative z-10 py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal yOffset={24}>
            <div className="bg-[#120F0C] border-2 border-[#C9A227] rounded-3xl p-8 sm:p-14 lg:p-20 space-y-8 shadow-[0_0_60px_rgba(201,162,39,0.25)] relative overflow-hidden">
              
              <div className="space-y-3">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#C9A227] tracking-[0.25em] uppercase block">
                  TWELVE LENSES. ONE MACHINE. YOURS.
                </span>
                <h2 className="font-sans font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  THE MIRROR QUIZ IS WHERE THE READING STARTS.
                </h2>
              </div>

              <div className="pt-4 flex flex-col items-center gap-4">
                <button
                  onClick={onOpenMirrorQuiz}
                  className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] hover:opacity-95 text-black font-inter text-xs sm:text-sm font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-[0_0_35px_rgba(201,162,39,0.35)] cursor-pointer inline-flex items-center justify-center gap-2.5 hover:scale-[1.02]"
                >
                  <Sparkles className="w-5 h-5 text-black" />
                  <span>GET EARLY ACCESS TO THE MIRROR QUIZ</span>
                </button>

                {onNavigateKeynotes && (
                  <button
                    onClick={onNavigateKeynotes}
                    className="text-xs sm:text-sm font-mono text-[#C9A227] hover:text-white transition-colors inline-flex items-center gap-2 pt-2 cursor-pointer"
                  >
                    <span>Bringing REGENESIS to a leadership team or event? → Explore Keynotes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default SciencePage;
