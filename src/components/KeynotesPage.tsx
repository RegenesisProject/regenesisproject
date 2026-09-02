import React, { useState } from 'react';
import { Sparkles, Calendar, FileText, ArrowRight, Shield, Zap, CheckCircle, Send } from 'lucide-react';
import { portraitImg as keynoteBiologyBg, portraitImg } from '../data/content';

interface KeynotesPageProps {
  onOpenBooking: () => void;
  onOpenSpeakerKit?: () => void;
}

export const KeynotesPage: React.FC<KeynotesPageProps> = ({
  onOpenBooking,
  onOpenSpeakerKit,
}) => {
  // Speaker Kit Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    eventType: 'Conference',
    eventDate: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'duplicate' | 'error' | 'invalid'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.organization || !formData.eventType) {
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycby3fGmfvW5bSGVpN65mlWMsMOrIklpI1izN8YenhYoR1OhmAJ-REVn-gyXB1YqW9K-BsA/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            source: 'Request the Speaker Kit',
            name: formData.name,
            email: formData.email,
            organization: formData.organization,
            eventType: formData.eventType,
            eventDate: formData.eventDate,
            message: formData.notes,
          }),
        }
      );

      const data = await response.json();

      if (data.status === 'success') {
        setFormStatus('success');
      } else if (data.status === 'duplicate') {
        setFormStatus('duplicate');
      } else if (data.status === 'invalid') {
        setFormStatus('invalid');
        setErrorMessage('Please check your email address and try again.');
      } else {
        setFormStatus('error');
        setErrorMessage('Something went wrong. Please check your email and try again.');
      }
    } catch (err) {
      setFormStatus('error');
      setErrorMessage('Something went wrong. Please check your email and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScrollToSpeakerKit = () => {
    const el = document.getElementById('speaker-kit-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080D] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Full Page Keynote Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src={keynoteBiologyBg} 
          alt="Keynote Biology & Neural Pathways Background" 
          className="w-full h-full object-cover opacity-55"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080D]/80 via-[#07080D]/50 to-[#07080D]/85"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#07080D]/30 to-[#07080D]"></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        
        {/* HERO SECTION */}
        <section className="text-center p-8 sm:p-12 rounded-3xl bg-[#06080F]/92 backdrop-blur-lg border border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121520] border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-mono font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>FOR TEAMS, EVENTS &amp; ORGANIZATIONS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6 [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]">
            Your people don&apos;t need more motivation. They need their capacity back.
          </h1>

          <div className="max-w-3xl mx-auto space-y-4 text-gray-100 font-light text-base sm:text-lg leading-relaxed mb-10">
            <p>
              Strategy is logic. Behavior is biology. When a team stalls, misfires under pressure, or burns through its best people, the cause usually isn&apos;t a skills gap — it&apos;s a room full of nervous systems running survival programming in a high-demand environment.
            </p>
            <p className="text-[#F3E5AB] font-semibold text-lg drop-shadow-sm">
              Thomas Ventura brings the operator&apos;s version of that conversation to the stage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 rounded-md bg-gradient-to-r from-[#D4AF37] via-[#C5A028] to-[#9A7B2C] text-[#090A0C] font-extrabold text-xs sm:text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK THOMAS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleScrollToSpeakerKit}
              className="w-full sm:w-auto px-8 py-4 rounded-md border text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 font-extrabold bg-[#12141C] border-[#D4AF37]/60 hover:border-[#D4AF37] text-[#F3E5AB] hover:bg-[#1A1D28]"
            >
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <span>REQUEST SPEAKER KIT</span>
            </button>
          </div>
        </section>

        {/* KEYNOTES OVERVIEW */}
        <div className="space-y-16 animate-fadeIn">
          {/* SIGNATURE KEYNOTES */}
          <section className="pt-4">
            <div className="text-center mb-12">
              <p className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase mb-2">
                SIGNATURE KEYNOTES
              </p>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                The Stage Presentations
              </h2>
            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Keynote 1 */}
                <div className="p-8 sm:p-10 rounded-2xl bg-[#06080F]/94 border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all flex flex-col justify-between shadow-xl">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase block mb-3">
                      KEYNOTE ONE
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F3E5AB] mb-4">
                      The Biology of Business Behavior
                    </h3>
                    <div className="space-y-4 text-gray-100 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                      <p>Strategy is logic, but behavior is chemistry. If your people are fighting an internal war between the will to scale and the urge to pull back, that isn&apos;t a mindset flaw. It&apos;s a hardware limitation.</p>
                      <p>This keynote shows a room why biological architecture becomes the invisible ceiling on growth — and what it takes to overwrite the survival conditioning that keeps a business safe, but small.</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-800 flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
                    <Shield className="w-4 h-4" />
                    <span>Best for: leadership teams, annual meetings, founder audiences.</span>
                  </div>
                </div>

                {/* Keynote 2 */}
                <div className="p-8 sm:p-10 rounded-2xl bg-[#06080F]/94 border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all flex flex-col justify-between shadow-xl">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase block mb-3">
                      KEYNOTE TWO
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F3E5AB] mb-2">
                      REGENESIS: The Protocol for Expansion
                    </h3>
                    <p className="text-sm font-serif italic text-[#D4AF37] mb-4 font-medium">
                      Motivation runs out. Regulated biology doesn&apos;t.
                    </p>
                    <div className="space-y-4 text-gray-100 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                      <p>When an organization hits a growth ceiling, it&apos;s often the people&apos;s wiring — not the market — resisting the expansion. The body reads growth as threat and slows the whole system down to protect itself.</p>
                      <p>This keynote gives a room the architecture underneath sustainable performance: how to stop running leadership on adrenaline, and what it takes to build capacity that holds.</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-800 flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
                    <Zap className="w-4 h-4" />
                    <span>Best for: scaling companies, sales organizations, high-pressure operating environments.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* WHY THOMAS VENTURA? */}
            <section className="p-8 sm:p-12 rounded-3xl bg-[#06080F]/94 border border-[#D4AF37]/40 shadow-2xl space-y-10">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <p className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                  WHY THOMAS VENTURA?
                </p>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                  Not a motivational speaker.
                </h2>
                <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed">
                  A battle-tested operator who built and ran two multi-million dollar companies simultaneously for over eighteen years.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#0E111B] border border-gray-800 hover:border-[#D4AF37]/50 transition-all space-y-3">
                  <span className="text-2xl font-mono font-extrabold text-[#D4AF37]">01</span>
                  <h3 className="text-base font-serif font-bold text-[#F3E5AB]">HARDWARE, NOT SOFTWARE</h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                    Most speakers talk about mindset. Thomas addresses biological capacity — and explains why strategy stops working when biology hits its limit.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0E111B] border border-gray-800 hover:border-[#D4AF37]/50 transition-all space-y-3">
                  <span className="text-2xl font-mono font-extrabold text-[#D4AF37]">02</span>
                  <h3 className="text-base font-serif font-bold text-[#F3E5AB]">THE CFO TEST</h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                    Thomas doesn&apos;t speak in wellness fluff. He speaks the language of asset management: burnout framed as key-person risk, survival conditioning framed as operational inefficiency.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0E111B] border border-gray-800 hover:border-[#D4AF37]/50 transition-all space-y-3">
                  <span className="text-2xl font-mono font-extrabold text-[#D4AF37]">03</span>
                  <h3 className="text-base font-serif font-bold text-[#F3E5AB]">THE TIGER IN THE ROOM</h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                    Thomas brings the presence of a veteran operator. He names the internal war high performers feel and never discuss — which earns trust from the most skeptical people in the room.
                  </p>
                </div>
              </div>
            </section>

            {/* WHAT THE ROOM TAKES AWAY */}
            <section className="p-8 sm:p-12 rounded-3xl bg-[#06080F]/94 border border-[#D4AF37]/40 shadow-2xl space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <p className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                  PRACTICAL OUTCOMES
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  What the room takes away
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <div className="p-5 rounded-xl bg-[#0E111B] border border-gray-800 flex items-start gap-3.5">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed">
                    A working explanation for why their best people stall under pressure — one that doesn&apos;t blame anyone&apos;s character
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#0E111B] border border-gray-800 flex items-start gap-3.5">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed">
                    The distinction between a mindset problem and a capacity problem, and how to tell them apart
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#0E111B] border border-gray-800 flex items-start gap-3.5">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed">
                    Language for the internal war that a skeptical audience will actually accept
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#0E111B] border border-gray-800 flex items-start gap-3.5">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed">
                    A practical first move they can run the same week
                  </p>
                </div>
              </div>
            </section>

            {/* WHO BOOKS THIS */}
            <section className="p-8 sm:p-12 rounded-3xl bg-[#06080F]/94 border border-[#D4AF37]/40 shadow-2xl space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <p className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                  TARGET AUDIENCE
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Who books this
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#0E111B] border border-gray-800 space-y-2">
                  <h3 className="text-base font-serif font-bold text-[#F3E5AB]">Leadership teams and executive offsites</h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                    Organizations that want infrastructure-first growth rather than another motivational session.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0E111B] border border-gray-800 space-y-2">
                  <h3 className="text-base font-serif font-bold text-[#F3E5AB]">Accelerators, incubators, and founder programs</h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                    Cohorts under real pressure who need to understand the biology of building before it costs them the venture.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0E111B] border border-gray-800 space-y-2">
                  <h3 className="text-base font-serif font-bold text-[#F3E5AB]">Sales and high-performance organizations</h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                    Teams operating in sustained high-demand environments where burnout is a business risk, not just a wellness concern.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0E111B] border border-gray-800 space-y-2">
                  <h3 className="text-base font-serif font-bold text-[#F3E5AB]">Conferences and annual events</h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                    Audiences of builders who&apos;ve heard every mindset talk and are ready for the mechanism underneath.
                  </p>
                </div>
              </div>
            </section>

            {/* BRING REGENESIS TO YOUR TEAM */}
            <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#121624] to-[#0A0D16] border border-[#D4AF37]/60 shadow-2xl text-center space-y-6">
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Bring REGENESIS to your team
              </h2>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-8 py-4 rounded-md bg-gradient-to-r from-[#D4AF37] via-[#C5A028] to-[#9A7B2C] text-[#090A0C] font-extrabold text-xs sm:text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK A CALL</span>
                </button>

                <button
                  onClick={handleScrollToSpeakerKit}
                  className="w-full sm:w-auto px-8 py-4 rounded-md bg-[#12141C] border border-[#D4AF37]/60 hover:border-[#D4AF37] text-[#F3E5AB] hover:bg-[#1A1D28] text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 font-extrabold"
                >
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <span>REQUEST SPEAKER KIT</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-sans max-w-xl mx-auto leading-relaxed pt-2">
                The speaker kit includes Thomas&apos;s bio, keynote descriptions, technical requirements, and photography. Tell us about your event and we&apos;ll send it over.
              </p>

              <p className="text-xs font-mono text-[#D4AF37]">
                For press and media enquiries: <a href="mailto:hello@thomasventura.com" className="underline hover:text-white transition-colors">hello@thomasventura.com</a>
              </p>
            </section>
          </div>

        {/* SPEAKER KIT FORM (SECTION 6B) */}
        <div id="speaker-kit-form" className="bg-[#06080F]/94 backdrop-blur-lg border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-fadeIn space-y-10 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase block mb-2">
                  FOR EVENT ORGANIZERS
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-white tracking-tight">
                  Request the Speaker Kit
                </h2>
                <p className="text-sm sm:text-base text-gray-200 font-medium mt-3 leading-relaxed">
                  Tell us a little about your event and we&apos;ll send the kit straight over.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                <p>
                  Everything you need to evaluate Thomas for your stage: full bio, keynote descriptions, technical requirements, and photography.
                </p>
              </div>

              {/* Speaker Photo */}
              <div className="pt-2">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/40 bg-stone-900 max-w-sm">
                  <img 
                    src={portraitImg} 
                    alt="Thomas Ventura — Keynote Speaker" 
                    className="w-full h-64 object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-3 bg-[#0d0f17] text-[#F3E5AB] font-serif text-xs italic flex items-center justify-between">
                    <span>Thomas Ventura — Keynote Speaker</span>
                    <span className="text-[10px] font-mono not-italic uppercase tracking-widest text-[#D4AF37]">Speaker Bio</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Speaker Kit Request Form (Section 6B) */}
            <div className="lg:col-span-6 bg-[#0E111B] border border-[#D4AF37]/40 p-6 sm:p-8 rounded-2xl shadow-xl text-left">
              {formStatus === 'success' ? (
                <div className="p-6 bg-[#121A10] border border-[#4E8B3D]/70 rounded-xl text-[#E2F5DB] space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-3 text-[#68D048]">
                    <CheckCircle className="w-6 h-6 shrink-0" />
                    <h3 className="text-base font-serif font-bold uppercase tracking-wide text-white">
                      Request Received
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                    On its way. Thanks — we&apos;ll get the speaker kit to you shortly. If your event has a firm date, mention it in your reply and we&apos;ll check availability at the same time.
                  </p>
                </div>
              ) : formStatus === 'duplicate' ? (
                <div className="p-6 bg-[#181510] border border-[#D4AF37]/70 rounded-xl text-[#F3E5AB] space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-3 text-[#D4AF37]">
                    <CheckCircle className="w-6 h-6 shrink-0" />
                    <h3 className="text-base font-serif font-bold uppercase tracking-wide text-white">
                      Already Requested
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                    You&apos;ve already requested the Speaker Kit — check your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
                  {errorMessage && (
                    <div className="p-3 bg-red-950/70 border border-red-500/50 rounded-lg text-red-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-200 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-lg bg-[#161B2A] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-200 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Email <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-lg bg-[#161B2A] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-200 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Organization <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Company or event organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-lg bg-[#161B2A] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-200 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Event type <span className="text-[#D4AF37]">*</span>
                    </label>
                    <select
                      required
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-lg bg-[#161B2A] border border-gray-700 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                    >
                      <option value="Conference">Conference</option>
                      <option value="Leadership offsite">Leadership offsite</option>
                      <option value="Accelerator or founder program">Accelerator or founder program</option>
                      <option value="Sales or team event">Sales or team event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-200 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Event date (or approximate)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Q4 2026 or October 15, 2026"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-lg bg-[#161B2A] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-200 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                      Anything we should know
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Theme, audience size, key focus areas..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full p-3 rounded-lg bg-[#161B2A] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#C5A028] to-[#9A7B2C] text-[#090A0C] font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all hover:brightness-110 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'SENDING...' : 'SEND ME THE KIT'}</span>
                    <Send className="w-4 h-4 text-[#090A0C]" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
