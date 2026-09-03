import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Bell, CheckCircle2 } from 'lucide-react';
import goldenFigureImg from '../assets/images/gold_mirror_anatomy_1785193115649.jpg';
import ultraLuxuryGoldBg from '../assets/images/ultra_luxury_gold_wave_bg_1785194012691.jpg';
import { submitEmail } from '../utils/sheetApi';

interface QuizPrepPageProps {
  onStartQuiz?: () => void;
  onNavigatePage: (page: 'home' | 'science' | 'mythology' | 'about', sectionId?: string) => void;
}

export const QuizPrepPage: React.FC<QuizPrepPageProps> = ({
  onNavigatePage,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('NOTIFY ME');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setButtonText('Submitting...');

    const res = await submitEmail(email.trim(), 'earlyaccess');

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

  const scrollToEmail = () => {
    const el = document.getElementById('early-access-email-input');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.focus();
    }
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen py-8 sm:py-16 relative overflow-hidden font-sans">
      {/* Inline Animation Keyframes for Ultra-Luxury Background Waves & Floating Particles */}
      <style>{`
        @keyframes bgSubtlePulse {
          0%, 100% { transform: scale(1) translateY(0px); opacity: 0.8; }
          50% { transform: scale(1.04) translateY(-10px); opacity: 0.9; }
        }
        @keyframes waveFloatLeft {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.4; }
          50% { transform: translateY(-16px) rotate(1.5deg) scale(1.02); opacity: 0.55; }
        }
        @keyframes waveFloatRight {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.4; }
          50% { transform: translateY(18px) rotate(-1.5deg) scale(1.03); opacity: 0.55; }
        }
        @keyframes waveFloatBottom {
          0%, 100% { transform: translateX(0px) translateY(0px); opacity: 0.3; }
          50% { transform: translateX(12px) translateY(-8px); opacity: 0.45; }
        }
        @keyframes particleDrift1 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-24px) translateX(8px) scale(1.3); opacity: 0.9; }
        }
        @keyframes particleDrift2 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(20px) translateX(-10px) scale(1.25); opacity: 0.85; }
        }
        @keyframes bokehPulse {
          0%, 100% { transform: scale(1); opacity: 0.04; }
          50% { transform: scale(1.25); opacity: 0.09; }
        }
      `}</style>
      
      {/* ==================== LAYER 1: ULTRA-LUXURY EDITORIAL BACKGROUND IMAGE ==================== */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url(${ultraLuxuryGoldBg})`,
          animation: 'bgSubtlePulse 20s ease-in-out infinite' 
        }}
      ></div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_95%)] pointer-events-none"></div>

      {/* Layer 2: Architectural concentric circles & linework */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] pointer-events-none opacity-15">
        <svg viewBox="0 0 1000 1000" fill="none" className="w-full h-full stroke-[#E7B646]">
          <circle cx="500" cy="500" r="480" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="500" cy="500" r="380" strokeWidth="0.5" />
          <circle cx="500" cy="500" r="280" strokeWidth="0.75" strokeDasharray="12 12" />
          <circle cx="500" cy="500" r="180" strokeWidth="0.5" />
          <line x1="20" y1="500" x2="980" y2="500" strokeWidth="0.25" opacity="0.5" />
          <line x1="500" y1="20" x2="500" y2="980" strokeWidth="0.25" opacity="0.5" />
        </svg>
      </div>

      {/* Layer 3: Edge Sweeping Gold Wave Filaments */}
      <div 
        className="absolute top-0 left-0 w-80 sm:w-96 h-full pointer-events-none origin-top-left"
        style={{ animation: 'waveFloatLeft 14s ease-in-out infinite' }}
      >
        <svg viewBox="0 0 400 1200" fill="none" className="w-full h-full">
          <path d="M-50,0 C120,200 80,450 -20,600 C-100,750 180,950 50,1200" stroke="url(#goldGradLeft1)" strokeWidth="1.5" />
          <path d="M-30,50 C180,300 30,500 -10,700 C-50,850 220,1050 20,1200" stroke="url(#goldGradLeft2)" strokeWidth="0.75" />
          <defs>
            <linearGradient id="goldGradLeft1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7D36B" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#E7B646" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#A8791B" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="goldGradLeft2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE38B" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#C9982D" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#050505" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION 1 — HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          
          {/* Left Column (Hero Content) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Navigation Breadcrumb */}
            <div>
              <button
                onClick={() => onNavigatePage('home')}
                className="text-xs font-inter uppercase tracking-[0.2em] text-[#A1ABC0] hover:text-[#F7D36B] transition-colors inline-flex items-center gap-2 cursor-pointer group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                <span>BACK TO HOME</span>
              </button>
            </div>

            {/* Eyebrow & COMING SOON Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#E7B646]/40 text-[#F7D36B] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#FFF2B0]" />
                <span>THE MIRROR QUIZ</span>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7B646]/15 border border-[#E7B646]/60 text-[#FFF2B0] text-xs font-mono font-extrabold tracking-widest uppercase shadow-[0_0_12px_rgba(231,182,70,0.25)]">
                <span className="w-2 h-2 rounded-full bg-[#E7B646] animate-pulse"></span>
                <span>COMING SOON</span>
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight">
                A free system scan of the machine you actually run on.
              </h1>
            </div>

            {/* Diamond Divider Accent */}
            <div className="flex items-center gap-3 my-4 max-w-xs">
              <div className="h-[1px] bg-gradient-to-r from-[#E7B646]/60 to-transparent flex-1"></div>
              <div className="w-2 h-2 rotate-45 border border-[#F7D36B] bg-[#050505]"></div>
              <div className="h-[1px] bg-gradient-to-l from-[#E7B646]/60 to-transparent flex-1"></div>
            </div>

            {/* Intro Paragraph */}
            <p className="text-sm sm:text-base text-[#A1A1A1] font-light leading-relaxed max-w-lg">
              Most assessments tell you what you&apos;re like. This one reads what&apos;s running underneath — the survival patterns written into your system long before you chose any of them, and where they&apos;re quietly holding you back.
            </p>
          </div>

          {/* Right Column (Gold Mirror / Anatomy Image - Kept as-is) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden border border-[#E7B646]/30 shadow-[0_0_50px_rgba(231,182,70,0.15)] bg-[#0B0B0B]">
              <img 
                src={goldenFigureImg} 
                alt="The Mirror Quiz - System Scan" 
                className="w-full h-full object-cover object-center scale-105"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_98%)] pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none"></div>
            </div>
          </div>

        </div>

        {/* Early Access Email Capture Overlay Card */}
        <div className="relative z-20 max-w-4xl mx-auto rounded-2xl border border-[#E7B646]/40 bg-[#0B0B0B]/95 backdrop-blur-xl p-8 sm:p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.95)] mb-20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-[#F7D36B]/10 blur-3xl pointer-events-none rounded-full"></div>

          <p className="text-xs sm:text-sm text-[#FFF2B0] font-semibold mb-6">
            The Mirror Quiz is being built now. Put your name down and you&apos;ll be among the first to run it.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-3">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                id="early-access-email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (buttonText !== 'NOTIFY ME') setButtonText('NOTIFY ME');
                }}
                placeholder="Enter your email address"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#141720] border border-[#E7B646]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F7D36B] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading || buttonText === 'Subscribed ✓'}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#FFF2B0] via-[#E7B646] to-[#A8791B] text-[#050505] font-extrabold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(231,182,70,0.3)] cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-80"
            >
              <Bell className="w-4 h-4" />
              <span>{buttonText}</span>
            </button>
          </form>

          <p className="text-[11px] text-gray-500 font-mono mb-6">
            No spam. One email when it&apos;s live.
          </p>

          {/* Three Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-6 border-t border-[#E7B646]/20 text-xs text-gray-300">
            <span className="px-3 py-1 rounded bg-[#151822] border border-[#E7B646]/20 text-[#FFF2B0] font-mono text-[11px]">
              Free
            </span>
            <span className="text-gray-600">•</span>
            <span className="px-3 py-1 rounded bg-[#151822] border border-[#E7B646]/20 text-[#FFF2B0] font-mono text-[11px]">
              Short &amp; Scenario-Based
            </span>
            <span className="text-gray-600">•</span>
            <span className="px-3 py-1 rounded bg-[#151822] border border-[#E7B646]/20 text-[#FFF2B0] font-mono text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F7D36B]" />
              100% Confidential
            </span>
          </div>
        </div>

        {/* SECTION 2 — WHAT IT READS */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF2B0] uppercase tracking-wider flex items-center justify-center gap-2">
              <span className="w-1.5 h-4 bg-[#E7B646] rounded-full"></span>
              <span>What the scan looks at</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0B0B0B] border border-[#E7B646]/30 rounded-xl p-6 sm:p-8 hover:border-[#F7D36B] transition-all">
              <h3 className="text-base font-bold text-white mb-3">Your energy pattern</h3>
              <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed font-light">
                Whether your drive is running on clean fuel or on emergency reserves — and what that&apos;s costing you by the end of the day.
              </p>
            </div>

            <div className="bg-[#0B0B0B] border border-[#E7B646]/30 rounded-xl p-6 sm:p-8 hover:border-[#F7D36B] transition-all">
              <h3 className="text-base font-bold text-white mb-3">Your control pattern</h3>
              <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed font-light">
                Where your system learned that holding on tight equals staying safe, and what it&apos;s costing you to keep carrying everything yourself.
              </p>
            </div>

            <div className="bg-[#0B0B0B] border border-[#E7B646]/30 rounded-xl p-6 sm:p-8 hover:border-[#F7D36B] transition-all">
              <h3 className="text-base font-bold text-white mb-3">Where you&apos;re operating from</h3>
              <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed font-light">
                Whether your system is running in survival mode, moving through the transition, or operating from your integrated state — <strong className="text-[#FFF2B0]">The ONE</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3 — HOW IT WORKS */}
        <div className="bg-[#0B0B0B] border border-[#E7B646]/30 rounded-2xl p-8 sm:p-12 mb-16">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF2B0] uppercase tracking-wider mb-6 flex items-center gap-3">
            <span className="w-1.5 h-5 bg-[#E7B646] rounded-full inline-block"></span>
            <span>When it&apos;s ready</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-300">
            <div className="p-4 rounded-lg bg-[#12151E] border border-gray-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#F7D36B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5 font-semibold">Short.</strong>
                <span className="text-gray-400">A handful of scenario-based questions, not a personality inventory.</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#12151E] border border-gray-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#F7D36B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5 font-semibold">Instinct-based.</strong>
                <span className="text-gray-400">You&apos;ll answer with your first reaction under pressure, not your best intention.</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#12151E] border border-gray-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#F7D36B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5 font-semibold">Private.</strong>
                <span className="text-gray-400">Your answers are yours. We don&apos;t sell or share them.</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#12151E] border border-gray-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#F7D36B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5 font-semibold">Immediate.</strong>
                <span className="text-gray-400">You get your read the moment you finish, plus your first move — free.</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4 — CLOSE */}
        <div className="text-center py-10 px-6 sm:px-12 bg-gradient-to-r from-[#111111] via-[#161616] to-[#111111] border border-[#E7B646]/40 rounded-2xl shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF2B0] mb-3">
            Be first through the door.
          </h3>
          <p className="text-sm text-[#A1A1A1] max-w-lg mx-auto mb-6 leading-relaxed font-light">
            The Mirror Quiz is the front door to everything REGENESIS does. It&apos;s free, and it&apos;s the fastest way to see what&apos;s actually running underneath your drive.
          </p>

          {buttonText !== 'Subscribed ✓' && (
            <button
              onClick={scrollToEmail}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#F7D36B] via-[#E7B646] to-[#C9982D] hover:brightness-110 text-[#050505] font-extrabold text-xs uppercase tracking-widest transition-all shadow-[0_8px_25px_rgba(231,182,70,0.4)] cursor-pointer inline-flex items-center gap-2"
            >
              <span>GET EARLY ACCESS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
