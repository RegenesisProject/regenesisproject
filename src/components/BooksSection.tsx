import React from 'react';
import { BOOKS } from '../data/contentData';
import { Book } from '../types';
import { ShoppingBag, ChevronRight, Sparkles } from 'lucide-react';

interface TrilogySectionProps {
  onSelectBook: (book: Book) => void;
  onOpenWaitlist?: () => void;
}

export const TrilogySection: React.FC<TrilogySectionProps> = ({ onSelectBook, onOpenWaitlist }) => {
  return (
    <section id="books-section" className="py-14 sm:py-28 bg-[#F5F2EB] text-[#1A1A1A] relative overflow-hidden border-t border-b border-[#D4AF37]/25">
      {/* Background Subtle Warm Gold Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.14)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE8DC] border border-[#D4AF37]/50 text-[#8B6E14] text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>THE REGENESIS TRILOGY</span>
          </div>
          <h2 className="text-2xl sm:text-5xl font-serif font-extrabold text-[#111111] tracking-tight mb-3">
            One war. Three books. <span className="bg-gradient-to-r from-[#A8791B] via-[#C9982D] to-[#8B6E14] bg-clip-text text-transparent">The full migration.</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xs sm:text-base text-[#555047] font-normal leading-relaxed">
            Book One decodes the survival code written in your earliest years. Book Two hands you the protocol to interrupt and rewrite it. Book Three is the 365-day blueprint for living the new configuration — and becoming The ONE.
          </p>
        </div>

        {/* 3 Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {BOOKS.map((book) => (
            <div
              key={book.id}
              className="flex flex-col items-center group bg-[#FFFDF7] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-sm"
            >
              {/* Release Date Tag */}
              <div className="mb-4 text-center">
                <span className="text-xs font-bold tracking-widest text-[#B8860B] uppercase bg-[#FAF6ED] px-3.5 py-1.5 rounded-md border border-[#D4AF37]/40 inline-block">
                  {book.title} · <span className="text-[#111111] font-black">{book.dropDate}</span>
                </span>
              </div>

              {/* 3D Book Cover Frame */}
              <div
                onClick={() => onSelectBook(book)}
                className="relative w-full max-w-[240px] aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-[1.02] shadow-[0_20px_45px_rgba(0,0,0,0.12)] border border-[#D4AF37]/40 group-hover:border-[#B8860B] mb-5 bg-[#12141B]"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover filter brightness-105"
                  referrerPolicy="no-referrer"
                />

                {/* Glass Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#F7D36B] font-mono mb-1">
                    {book.subtitle}
                  </span>
                  <p className="text-[11px] text-stone-300 font-inter font-medium leading-relaxed">
                    Click to explore table of contents & details
                  </p>
                </div>
              </div>

              {/* Book Blurb */}
              <p className="text-xs text-[#555047] leading-relaxed text-center mb-4">
                {book.description}
              </p>
            </div>
          ))}
        </div>

        {/* JOIN THE TRILOGY WAITLIST CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenWaitlist}
            className="w-full sm:w-auto min-h-[48px] h-auto py-3.5 px-6 sm:px-8 rounded-xl bg-gradient-to-r from-[#7E4F11] via-[#C9962F] to-[#E2B13D] text-[#000000] font-inter font-black text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_30px_rgba(226,177,61,0.45)] hover:shadow-[0_6px_40px_rgba(226,177,61,0.7)] hover:scale-105 transition-all duration-300 text-center"
          >
            <span>JOIN THE TRILOGY WAITLIST</span>
            <ChevronRight className="w-4 h-4 text-[#000000] shrink-0" />
          </button>
        </div>

      </div>
    </section>
  );
};

export const BooksSection = TrilogySection;
