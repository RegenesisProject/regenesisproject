import React, { useState } from 'react';
import { Sparkles, X, CheckCircle2, Shield, ArrowRight, Bell, Mail } from 'lucide-react';
import { submitEmail } from '../utils/sheetApi';

interface MirrorQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBookByTitle?: (title: string) => void;
  onOpenContact?: () => void;
}

export const MirrorQuizModal: React.FC<MirrorQuizModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('NOTIFY ME');

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0B0D12] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-10 shadow-[0_0_60px_rgba(212,175,55,0.2)] text-white my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-[#D4AF37] p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* SECTION 1 — HERO */}
        <div className="mb-10 text-left">
          {/* Top Eyebrow & Gold COMING SOON Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181A22] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>THE MIRROR QUIZ</span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/60 text-[#F3E5AB] text-xs font-mono font-extrabold tracking-widest uppercase shadow-[0_0_12px_rgba(212,175,55,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span>COMING SOON</span>
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#F9FAFB] tracking-tight leading-tight mb-4">
            A free system scan of the machine you actually run on.
          </h2>

          {/* Intro Paragraph */}
          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-6">
            Most assessments tell you what you&apos;re like. This one reads what&apos;s running underneath — the survival patterns written into your system long before you chose any of them, and where they&apos;re silently capping your capacity.
          </p>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-[#F3E5AB] font-semibold mb-6">
            The Mirror Quiz is being built now. Put your name down and you&apos;ll be among the first to run it.
          </p>

          {/* Email Capture Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mb-3">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (buttonText !== 'NOTIFY ME') setButtonText('NOTIFY ME');
                }}
                placeholder="Enter your email address"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#141720] border border-[#D4AF37]/30 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading || buttonText === 'Subscribed ✓'}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#C5A028] to-[#9A7B2C] text-[#090A0C] font-extrabold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-80"
            >
              <Bell className="w-4 h-4" />
              <span>{buttonText}</span>
            </button>
          </form>

          <p className="text-[11px] text-gray-500 font-mono">
            No spam. One email when it&apos;s live.
          </p>

          {/* Three Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-6 pt-6 border-t border-gray-800/80 text-xs text-gray-300">
            <span className="px-3 py-1 rounded bg-[#151822] border border-[#D4AF37]/20 text-[#F3E5AB] font-mono text-[11px]">
              Free
            </span>
            <span className="text-gray-600">•</span>
            <span className="px-3 py-1 rounded bg-[#151822] border border-[#D4AF37]/20 text-[#F3E5AB] font-mono text-[11px]">
              Short &amp; Scenario-Based
            </span>
            <span className="text-gray-600">•</span>
            <span className="px-3 py-1 rounded bg-[#151822] border border-[#D4AF37]/20 text-[#F3E5AB] font-mono text-[11px] flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#D4AF37]" />
              100% Confidential
            </span>
          </div>
        </div>

        {/* SECTION 2 — WHAT IT READS */}
        <div className="mb-10 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-serif font-bold text-[#F3E5AB] uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#D4AF37] rounded-full"></span>
            <span>What the scan looks at</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Vector 1 */}
            <div className="p-5 rounded-xl bg-[#12151E] border border-gray-800 hover:border-[#D4AF37]/50 transition-colors">
              <h4 className="text-sm font-bold text-white mb-2">Your energy pattern</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Whether your drive is running on clean fuel or on emergency reserves — and what that&apos;s costing you by the end of the day.
              </p>
            </div>

            {/* Vector 2 */}
            <div className="p-5 rounded-xl bg-[#12151E] border border-gray-800 hover:border-[#D4AF37]/50 transition-colors">
              <h4 className="text-sm font-bold text-white mb-2">Your control pattern</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Where your system learned that holding on tight equals staying safe, and what it&apos;s costing you to keep carrying everything yourself.
              </p>
            </div>

            {/* Vector 3 */}
            <div className="p-5 rounded-xl bg-[#12151E] border border-gray-800 hover:border-[#D4AF37]/50 transition-colors">
              <h4 className="text-sm font-bold text-white mb-2">Where you&apos;re operating from</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Whether your system is running in survival mode, moving through the transition, or operating from your integrated state — <strong className="text-[#F3E5AB]">The ONE</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3 — HOW IT WORKS */}
        <div className="mb-10 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-serif font-bold text-[#F3E5AB] uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#D4AF37] rounded-full"></span>
            <span>When it&apos;s ready</span>
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300">
            <li className="p-4 rounded-lg bg-[#12151E] border border-gray-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5 font-semibold">Short.</strong>
                <span className="text-gray-400">A handful of scenario-based questions, not a personality inventory.</span>
              </div>
            </li>
            <li className="p-4 rounded-lg bg-[#12151E] border border-gray-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5 font-semibold">Instinct-based.</strong>
                <span className="text-gray-400">You&apos;ll answer with your first reaction under pressure, not your best intention.</span>
              </div>
            </li>
            <li className="p-4 rounded-lg bg-[#12151E] border border-gray-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5 font-semibold">Private.</strong>
                <span className="text-gray-400">Your answers are yours. We don&apos;t sell or share them.</span>
              </div>
            </li>
            <li className="p-4 rounded-lg bg-[#12151E] border border-gray-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5 font-semibold">Immediate.</strong>
                <span className="text-gray-400">You get your read the moment you finish, plus your first move — free.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* SECTION 4 — CLOSE */}
        <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#171A24] to-[#10121A] border border-[#D4AF37]/30 text-left">
          <h3 className="text-xl font-serif font-bold text-[#F3E5AB] mb-2">
            Be first through the door.
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
            The Mirror Quiz is the front door to everything REGENESIS does. It&apos;s free, and it&apos;s the fastest way to see what&apos;s actually running underneath your drive.
          </p>

          {buttonText !== 'Subscribed ✓' && (
            <button
              onClick={() => {
                const el = document.querySelector('input[type="email"]');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0C0E] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-2"
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
