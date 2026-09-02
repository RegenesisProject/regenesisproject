import React, { useState } from 'react';
import { book1Img, book2Img, book3Img } from '../data/content';
import { CheckCircle, Download, Sparkles, ArrowLeft } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface SpeakerKitPageProps {
  onNavigateHome?: () => void;
  onOpenContact?: () => void;
}

export const SpeakerKitPage: React.FC<SpeakerKitPageProps> = ({
  onNavigateHome,
  onOpenContact
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'duplicate' | 'error' | 'invalid'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

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
            email,
            name,
            company: '',
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

  return (
    <div className="bg-[#FAF8F5] text-[#1A1A1A] min-h-screen py-10 sm:py-16 px-4 sm:px-8 lg:px-12 font-sans relative overflow-hidden">
      
      {/* Background Subtle Gradient & Grain Overlay */}
      <div className="max-w-[1400px] mx-auto space-y-16 relative z-10">
        
        {/* Back Navigation Button if needed */}
        {onNavigateHome && (
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-600 hover:text-[#c99a38] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Page</span>
          </button>
        )}

        {/* Top Hero Section: Text + Form + 3D Stacked Book Covers */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs sm:text-sm font-semibold text-[#c89838] tracking-wide block mb-2 font-sans">
                  Free email delivery
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight font-sans leading-[1.08]">
                  Architect Your<br />
                  Organization's Capacity
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mt-3">
                  Download • 1 file
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-stone-700 font-sans leading-relaxed">
                <p>
                  Download the REGENESIS Speaker Kit and discover how to lead from the "Integrated Self" rather than a Survival Operating System.
                </p>
                <p>
                  To receive the complete Thomas Ventura Speaker Kit, please enter your details below. You will get immediate access to the full blueprint of how Thomas can help your organization metabolize pressure and scale without limits
                </p>
              </div>

              {/* Download Form / Success State */}
              <div className="pt-2">
                {formStatus === 'success' ? (
                  <div className="p-6 bg-[#f7f2e7] border-2 border-[#c89838] rounded-xl text-stone-900 space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-3 text-[#c89838]">
                      <CheckCircle className="w-6 h-6 shrink-0" />
                      <h3 className="text-base font-bold uppercase tracking-wide">
                        Speaker Kit Unlocked
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      Thank you, <strong className="text-black">{name}</strong>. The 6-page REGENESIS Speaker Kit has been dispatched to <strong className="text-black">{email}</strong>.
                    </p>
                    <button
                      onClick={() => {
                        // Instant simulated PDF download trigger
                        alert('Downloading Thomas_Ventura_Executive_Speaker_Kit.pdf');
                      }}
                      className="mt-2 py-2.5 px-5 rounded-lg bg-[#c99a38] hover:bg-[#b8892b] text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF Blueprint Directly</span>
                    </button>
                  </div>
                ) : formStatus === 'duplicate' ? (
                  <div className="p-6 bg-[#f7f2e7] border-2 border-[#c89838] rounded-xl text-stone-900 space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-3 text-[#c89838]">
                      <CheckCircle className="w-6 h-6 shrink-0" />
                      <h3 className="text-base font-bold uppercase tracking-wide">
                        Already Requested
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      You&apos;ve already requested the Speaker Kit — check your inbox.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {errorMessage && (
                      <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-xs font-medium">
                        {errorMessage}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#f3efe6] border border-stone-300/80 rounded-lg text-sm text-black placeholder-stone-400 focus:outline-none focus:border-[#c89838] transition-all font-sans"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#f3efe6] border border-stone-300/80 rounded-lg text-sm text-black placeholder-stone-400 focus:outline-none focus:border-[#c89838] transition-all font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-lg bg-[#c99a38] hover:bg-[#b8892b] text-black font-extrabold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2 hover:brightness-105 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Get now'}</span>
                    </button>

                    <p className="text-[11px] text-stone-500 font-sans pt-1">
                      You're signing up to receive emails from Thomas Ventura.
                    </p>
                  </form>
                )}
              </div>

            </div>

            {/* Right Graphics Column: 3D Fan Stacked Book Covers */}
            <div className="lg:col-span-5 flex items-center justify-center pt-8 lg:pt-0">
              <div className="relative w-full max-w-[420px] aspect-[4/3] flex items-center justify-center py-6">
                
                {/* Back Left Book Card */}
                <div className="absolute left-2 sm:left-4 top-4 w-44 sm:w-52 h-64 sm:h-76 -rotate-12 translate-y-2 z-10 transition-transform duration-500 hover:-rotate-16 hover:-translate-x-2">
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.35)] bg-stone-900 border border-stone-800">
                    <img 
                      src={book2Img} 
                      alt="Book Cover 2" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Back Right Book Card */}
                <div className="absolute right-2 sm:right-4 top-4 w-44 sm:w-52 h-64 sm:h-76 rotate-12 translate-y-2 z-10 transition-transform duration-500 hover:rotate-16 hover:translate-x-2">
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.35)] bg-stone-900 border border-stone-800">
                    <img 
                      src={book3Img} 
                      alt="Book Cover 3" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Center Highlighted Featured Book Card */}
                <div className="relative z-20 w-48 sm:w-56 h-70 sm:h-84 scale-105 transition-transform duration-500 hover:scale-110">
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.5)] bg-black border-4 border-white/90 ring-1 ring-amber-400/50">
                    <img 
                      src={book1Img} 
                      alt="The Regenesis Protocol Speaker Kit" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* Bottom Section: Gold Metallic Quote & ROI Banner */}
        <ScrollReveal>
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#986e23] via-[#dca337] to-[#986e23] p-8 sm:p-12 md:p-16 text-[#120e06] shadow-[0_20px_50px_rgba(152,110,35,0.25)] text-center space-y-6 max-w-5xl mx-auto border border-[#fce289]/40">
            <p className="text-sm sm:text-base md:text-lg font-medium font-sans leading-relaxed max-w-4xl mx-auto text-black">
              In a high-stakes world, the bottleneck of any organization is rarely the strategy—it is the biological capacity of its leaders. Thomas Ventura doesn't deliver motivational speeches; he provides a <strong className="font-black text-black">Neuro-Biological Translation</strong> for high-performance leadership.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-medium font-sans leading-relaxed max-w-4xl mx-auto text-black">
              This 6-page Speaker Kit outlines the REGENESIS methodology, keynote topics, and the specific ROI of shifting your team from <strong className="font-black text-black">SOS (Survival Operating System)</strong> to <strong className="font-black text-black">The ONE (Optimized Neuro-Biological Evolution)</strong>.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
