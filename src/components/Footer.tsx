import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { submitEmail } from '../utils/sheetApi';
import footerLogo from '../assets/images/regenerated_image_1788305533708.png';

interface FooterProps {
  onOpenContact: () => void;
  onOpenSpeakerKit: () => void;
  onOpenWaitlist: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onNavigatePage?: (page: 'home' | 'science' | 'mythology' | 'about' | 'quiz' | 'speaker-kit' | 'waitlist' | 'keynotes', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
  onOpenSpeakerKit,
  onOpenWaitlist,
  onOpenPrivacy,
  onOpenTerms,
  onNavigatePage,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('JOIN THE LIST');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setButtonText('JOINING...');

    const res = await submitEmail(email, 'newsletter');

    if (res.status === 'success') {
      setButtonText('JOINED ✓');
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
    <footer className="bg-[#FFFFFF] text-[#1A1A1A] border-t border-[#1A1A1A]/20 py-12 sm:py-20 px-4 sm:px-8 lg:px-16">
      
      <div className="max-w-[1600px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-[#1A1A1A]/15">
          
          {/* Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={footerLogo} 
                alt="Thomas Ventura Logo" 
                referrerPolicy="no-referrer"
                className="h-12 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col items-start justify-center text-left min-w-0">
                <span className="font-inter text-[10px] sm:text-xs uppercase tracking-[0.32em] font-bold text-left text-[#6C6863] leading-tight">
                  THOMAS VENTURA
                </span>
                <h3 className="font-inter font-black text-xl sm:text-2xl text-[#1A1A1A] tracking-wider leading-tight text-left mt-0.5">
                  THE REGENESIS PROJECT
                </h3>
              </div>
            </div>
            
            <p className="font-inter text-xs text-[#6C6863] leading-relaxed max-w-sm">
              Decoding the Survival Operating System — and ending the internal war against your own biology.
            </p>
          </div>

          {/* Connect Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="font-playfair font-bold text-sm text-[#1A1A1A] uppercase tracking-wider">
              Connect
            </p>
            
            <ul className="space-y-3 font-inter text-xs text-[#6C6863]">
              <li>
                <button 
                  onClick={() => {
                    if (onNavigatePage) {
                      onNavigatePage('contact');
                    } else {
                      onOpenContact();
                    }
                  }}
                  className="hover:text-[#D4AF37] transition-colors font-semibold tracking-wider uppercase cursor-pointer flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <span>Contact & Press</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onNavigatePage) {
                      onNavigatePage('keynotes');
                    } else {
                      onOpenSpeakerKit();
                    }
                  }}
                  className="hover:text-[#D4AF37] transition-colors font-semibold tracking-wider uppercase cursor-pointer flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <span>Keynotes & Speaker Kit</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenWaitlist}
                  className="hover:text-[#D4AF37] transition-colors font-semibold tracking-wider uppercase cursor-pointer flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <span>Trilogy Waitlist</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Input (4 Cols) */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4">
            <p className="font-playfair font-bold text-sm text-[#1A1A1A] uppercase tracking-wider">
              THE REGENESIS NEWSLETTER
            </p>
            
            <p className="font-inter text-xs text-[#6C6863] leading-relaxed">
              Insights and strategy on the internal war — and how to win it.
            </p>

            <p className="font-inter text-xs text-[#6C6863] leading-relaxed">
              Not sending yet. Put your name down and you&apos;ll get it from the first issue.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (buttonText !== 'JOIN THE LIST') setButtonText('JOIN THE LIST');
                  }}
                  className="input-editorial flex-1 text-xs font-inter"
                />
                <button
                  type="submit"
                  disabled={loading || buttonText === 'JOINED ✓'}
                  className="btn-gold-slide min-h-[44px] h-11 w-full sm:w-auto px-6 text-xs uppercase tracking-[0.2em] font-inter font-medium cursor-pointer shrink-0 disabled:opacity-80 flex items-center justify-center"
                >
                  <span>{buttonText}</span>
                </button>
              </div>

              <p className="text-[11px] sm:text-xs text-[#6C6863] font-inter">
                You&apos;re signing up to receive emails from Thomas Ventura.
              </p>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-inter text-xs text-[#6C6863] text-center sm:text-left">
          <p>© 2026 Thomas Ventura & The REGENESIS Project™. All Rights Reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-[#1A1A1A] transition-colors cursor-pointer py-1">
              Privacy Policy
            </button>
            <button onClick={onOpenTerms} className="hover:text-[#1A1A1A] transition-colors cursor-pointer py-1">
              Terms of Service
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
};
