import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import navbarLogo from '../assets/images/regenerated_image_1788305533708.png';
import { PageKey } from '../types';

interface NavbarProps {
  currentPage: PageKey;
  onNavigatePage: (page: PageKey, sectionId?: string) => void;
  onOpenMirrorQuiz: () => void;
  onOpenSpeakerKit: () => void;
  onOpenWaitlist: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
  onOpenMirrorQuiz,
  onOpenSpeakerKit,
  onOpenWaitlist,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isScience = currentPage === 'science';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageKey, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigatePage(page, sectionId);
  };

  const getNavLinkClass = (page: PageKey) => {
    const isActive = currentPage === page;
    if (isScrolled) {
      return `transition-colors duration-300 cursor-pointer ${isActive ? 'text-[#D4AF37] underline underline-offset-8 decoration-2 font-black' : 'text-[#E2E8F0] hover:text-[#D4AF37]'}`;
    }
    if (isScience) {
      return `transition-colors duration-300 cursor-pointer ${isActive ? 'text-[#FFD700] underline underline-offset-8 decoration-2 font-black' : 'text-[#FFFFFF] hover:text-[#FFD700]'}`;
    }
    return `transition-colors duration-300 cursor-pointer ${isActive ? 'text-[#000000] underline underline-offset-8 decoration-2 font-black' : 'text-[#FFFFFF] hover:text-[#000000]'}`;
  };

  const getMobileNavLinkClass = (page: PageKey) => {
    const isActive = currentPage === page;
    if (isScrolled || isScience) {
      return `block w-full text-left py-2 ${isActive ? 'text-[#D4AF37] font-black' : 'text-white hover:text-[#D4AF37]'}`;
    }
    return `block w-full text-left py-2 ${isActive ? 'text-black font-black' : 'text-white hover:text-black'}`;
  };

  const getNavContainerClass = () => {
    if (isScience) {
      if (isScrolled) {
        return "fixed top-0 left-0 right-0 z-40 bg-[#0B0C0E]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-500";
      }
      return "absolute top-0 left-0 right-0 z-40 bg-transparent border-b border-white/10 transition-all duration-500";
    }

    if (isScrolled) {
      return "sticky top-0 z-40 bg-[#0B0C0E]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-500";
    }

    return "sticky top-0 z-40 bg-gradient-to-r from-[#7E4F11] via-[#E2B13D] to-[#7E4F11] shadow-lg border-b border-[#7E4F11] transition-all duration-500";
  };

  return (
    <nav className={getNavContainerClass()}>
      <div className="max-w-[1600px] mx-auto px-3 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        
        {/* Editorial Brand Logo */}
        <a 
          href="/"
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer text-left min-w-0"
        >
          <img 
            src={navbarLogo} 
            alt="Thomas Ventura Logo" 
            referrerPolicy="no-referrer"
            className="h-10 sm:h-12 lg:h-14 w-auto object-contain drop-shadow shrink-0"
          />
          <div className="flex flex-col items-start justify-center text-left min-w-0">
            <span className={`font-inter text-[8px] sm:text-[9px] uppercase tracking-[0.36em] font-bold text-left text-[#FFFFFF]/85 transition-colors duration-500 leading-tight truncate ${isScrolled || isScience ? 'group-hover:text-[#D4AF37]' : 'group-hover:text-amber-100'}`}>
              THOMAS VENTURA
            </span>
            <span className="font-playfair font-bold text-sm sm:text-base lg:text-lg tracking-wider leading-tight text-left text-[#FFFFFF] group-hover:text-white transition-colors duration-500 mt-0.5 truncate">
              THE REGENESIS PROJECT
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-inter font-bold uppercase tracking-[0.2em]">
          <a 
            href="/"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
            className={getNavLinkClass('home')}
          >
            Home
          </a>

          <a 
            href="/about"
            onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} 
            className={getNavLinkClass('about')}
          >
            About
          </a>

          <a 
            href="/mythology"
            onClick={(e) => { e.preventDefault(); handleNavClick('mythology'); }} 
            className={getNavLinkClass('mythology')}
          >
            The Mythology
          </a>

          <a 
            href="/science"
            onClick={(e) => { e.preventDefault(); handleNavClick('science'); }} 
            className={getNavLinkClass('science')}
          >
            The Science
          </a>

          <a 
            href="/keynotes"
            onClick={(e) => { e.preventDefault(); handleNavClick('keynotes'); }} 
            className={getNavLinkClass('keynotes')}
          >
            Keynotes
          </a>

        </div>

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="/mirror-quiz"
            onClick={(e) => { e.preventDefault(); handleNavClick('quiz'); }}
            className={isScrolled || isScience ? "flex items-center justify-center bg-gradient-to-r from-[#F2D075] via-[#C9962F] to-[#8C6218] hover:opacity-90 text-black h-12 px-6 text-xs uppercase tracking-[0.2em] font-inter font-extrabold cursor-pointer shadow-lg transition-all duration-300 rounded-sm border border-[#FFD700]/60" : "flex items-center justify-center bg-[#1A1200] hover:bg-[#000000] text-white h-12 px-6 text-xs uppercase tracking-[0.2em] font-inter font-bold cursor-pointer shadow-md transition-all duration-300 rounded-sm border border-white/30"}
          >
            <span>Get Early Access</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center space-x-2 sm:space-x-3 shrink-0">
          <a
            href="/mirror-quiz"
            onClick={(e) => { e.preventDefault(); handleNavClick('quiz'); }}
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 border border-white text-white font-inter text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold rounded-xs cursor-pointer whitespace-nowrap"
          >
            Get Early Access
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white hover:text-black focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={isScrolled ? "lg:hidden bg-[#0B0C0E]/98 backdrop-blur-xl border-b border-[#D4AF37]/30 px-5 sm:px-8 py-6 space-y-4 font-inter text-xs uppercase tracking-[0.2em] font-bold text-white animate-fadeIn shadow-2xl" : isScience ? "lg:hidden bg-[#040302]/95 backdrop-blur-xl border-b border-[#C9962F]/30 px-5 sm:px-8 py-6 space-y-4 font-inter text-xs uppercase tracking-[0.2em] font-bold text-white animate-fadeIn shadow-inner" : "lg:hidden bg-gradient-to-r from-[#7E4F11] via-[#E2B13D] to-[#7E4F11] border-b border-white/20 px-5 sm:px-8 py-6 space-y-4 font-inter text-xs uppercase tracking-[0.2em] font-bold text-white animate-fadeIn shadow-inner"}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            className={getMobileNavLinkClass('home')}
          >
            Home
          </a>
          <a
            href="/about"
            onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
            className={getMobileNavLinkClass('about')}
          >
            About
          </a>
          <a
            href="/mythology"
            onClick={(e) => { e.preventDefault(); handleNavClick('mythology'); }}
            className={getMobileNavLinkClass('mythology')}
          >
            The Mythology
          </a>
          <a
            href="/science"
            onClick={(e) => { e.preventDefault(); handleNavClick('science'); }}
            className={getMobileNavLinkClass('science')}
          >
            The Science
          </a>
          <a
            href="/keynotes"
            onClick={(e) => { e.preventDefault(); handleNavClick('keynotes'); }}
            className={getMobileNavLinkClass('keynotes')}
          >
            Keynotes
          </a>
          <a
            href="/mirror-quiz"
            onClick={(e) => { e.preventDefault(); handleNavClick('quiz'); }}
            className={isScrolled || isScience ? "block w-full text-center py-3.5 bg-gradient-to-r from-[#F2D075] via-[#C9962F] to-[#8C6218] text-black font-inter text-xs uppercase tracking-[0.2em] font-extrabold rounded-sm border border-[#FFD700]/50" : "block w-full text-center py-3.5 bg-[#1A1200] text-white font-inter text-xs uppercase tracking-[0.2em] font-bold rounded-sm border border-white/20"}
          >
            Get Early Access
          </a>
        </div>
      )}
    </nav>
  );
};

