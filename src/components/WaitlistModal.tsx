import React, { useState } from 'react';
import { X, CheckCircle, Mail, BookOpen } from 'lucide-react';
import { submitEmail } from '../utils/sheetApi';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [selectedBook, setSelectedBook] = useState('All 3 Books (Full Trilogy Set)');
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Join Release Waitlist');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setButtonText('Joining...');

    const res = await submitEmail(email, 'waitlist');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#1A1A1A] p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-[#1A1A1A]">
        
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 text-[#1A1A1A] hover:text-[#D4AF37] border border-[#1A1A1A]/20 hover:border-[#D4AF37] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-[#D4AF37] font-inter font-semibold text-xs uppercase tracking-[0.25em] mb-2">
            <BookOpen className="w-4 h-4" />
            <span>VIP Drop Access</span>
          </div>
          <h2 className="font-playfair font-normal text-3xl text-[#1A1A1A]">
            BOOK RELEASE WAITLIST
          </h2>
          <p className="font-inter text-xs text-[#6C6863] mt-2">
            Reserve your place for signed hardcovers and priority launch notifications.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 font-inter text-xs">
          <div>
            <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">Select Book / Edition</label>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="w-full bg-[#FFFFFF] border-b border-[#1A1A1A] text-[#1A1A1A] p-3 outline-none focus:border-[#D4AF37] rounded-none font-inter text-xs"
            >
              <option>All 3 Books (Full Trilogy Set)</option>
              <option>Book 1: The Survival Source Code (Drops 06-23-26)</option>
              <option>Book 2: The REGENESIS Protocol (Drops 08-15-26)</option>
              <option>Book 3: The REGENESIS Blueprint (Drops 10-27-26)</option>
            </select>
          </div>

          <div>
            <label className="block text-[#1A1A1A] font-semibold mb-2 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              placeholder="executive@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (buttonText !== 'Join Release Waitlist') setButtonText('Join Release Waitlist');
              }}
              className="input-editorial w-full"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || buttonText === 'Subscribed ✓'}
              className="btn-gold-slide h-14 w-full text-xs uppercase tracking-[0.2em] font-inter font-medium flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-80"
            >
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span>{buttonText}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
