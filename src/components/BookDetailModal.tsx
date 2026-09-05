import React, { useState } from 'react';
import { X, Calendar, BookOpen, CheckCircle, Bell } from 'lucide-react';
import { BookInfo } from '../types';
import { submitEmail } from '../utils/sheetApi';

interface BookDetailModalProps {
  book: BookInfo | null;
  onClose: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Notify Me');

  if (!book) return null;

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setButtonText('Submitting...');

    const res = await submitEmail(email.trim(), 'waitlist');

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
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#1A1A1A] p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-[#1A1A1A] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 text-[#1A1A1A] hover:text-[#D4AF37] border border-[#1A1A1A]/20 hover:border-[#D4AF37] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {book.coverImage && (
              <div className="w-28 sm:w-36 shrink-0 aspect-[3/4] shadow-md overflow-hidden bg-[#FFFFFF]">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-[#FFFFFF]"
                />
              </div>
            )}

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] text-[#FFFFFF] font-inter font-semibold text-xs uppercase tracking-[0.2em] mb-3">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Target Release: {book.dropDate}</span>
              </div>

              <h2 className="font-playfair font-normal text-3xl sm:text-4xl text-[#1A1A1A] mb-2">
                {book.title}
              </h2>
              <p className="font-playfair italic text-base text-[#D4AF37] font-normal">
                {book.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#FFFDF0] p-6 border border-[#D4AF37]/40 text-sm text-[#1A1A1A] font-inter leading-relaxed">
            {book.description}
          </div>

          {/* Chapters Breakdown */}
          <div>
            <h3 className="font-inter font-bold text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{book.id === 'survival-source-code' ? 'Table of Contents · Chapter Breakdown' : 'Structure Overview · Sections & Themes'}</span>
            </h3>

            <div className="space-y-3">
              {book.chapters.map((chap, idx) => (
                <div key={idx} className="p-4 bg-[#FFFDF7] border border-[#1A1A1A]/20 text-xs font-inter text-[#1A1A1A] flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#D4AF37] shrink-0" />
                  <span className="font-medium">{chap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Drop Notification Form */}
          <div className="pt-6 border-t border-[#1A1A1A]/15">
            <h4 className="font-playfair font-bold text-lg text-[#1A1A1A] mb-3">
              Get Notified First When Pre-Orders Open
            </h4>

            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (buttonText !== 'Notify Me') setButtonText('Notify Me');
                }}
                className="input-editorial flex-1 text-xs font-inter"
              />
              <button
                type="submit"
                disabled={loading || buttonText === 'Subscribed ✓'}
                className="btn-gold-slide h-12 px-8 text-xs uppercase tracking-[0.2em] font-inter font-medium flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-80"
              >
                <Bell className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{buttonText}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
