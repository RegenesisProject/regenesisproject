import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RegenesisBanner } from './components/RegenesisBanner';
import { BooksSection } from './components/BooksSection';
import { ScienceManifesto } from './components/ScienceManifesto';
import { WhyThomasSection } from './components/WhyThomasSection';
import { KeynotesSection } from './components/KeynotesSection';
import { AudienceSection } from './components/AudienceSection';
import { CallToActionBanner } from './components/CallToActionBanner';
import { KeynotesPage } from './components/KeynotesPage';
import { KeynoteHomeBanner } from './components/KeynoteHomeBanner';
import { MidPageQuizCTA } from './components/MidPageQuizCTA';
import { QuoteSection } from './components/QuoteSection';
import { SciencePage } from './components/SciencePage';
import { MythologyPage } from './components/MythologyPage';
import { AboutPage } from './components/AboutPage';
import { QuizPrepPage } from './components/QuizPrepPage';
import { SpeakerKitPage } from './components/SpeakerKitPage';
import { WaitlistPage } from './components/WaitlistPage';
import { Footer } from './components/Footer';
import { ScrollReveal } from './components/ScrollReveal';
import { ScrollProgress } from './components/ScrollProgress';

// Modals
import { MirrorQuizModal } from './components/MirrorQuizModal';
import { BookDetailModal } from './components/BookDetailModal';
import { KeynoteDetailModal } from './components/KeynoteDetailModal';
import { SpeakerKitModal } from './components/SpeakerKitModal';
import { WaitlistModal } from './components/WaitlistModal';
import { ContactModal } from './components/ContactModal';
import { LegalModal } from './components/LegalModal';

import { BookInfo, KeynoteInfo } from './types';

export type PageKey = 'home' | 'science' | 'mythology' | 'about' | 'keynotes' | 'quiz' | 'speaker-kit' | 'waitlist';

export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
}

export const ROUTE_METADATA: Record<PageKey, RouteMeta> = {
  home: {
    title: "Thomas Ventura — The REGENESIS Project™",
    description: "Official portal for Thomas Ventura, featuring the Twelve Lenses of Science, The Mirror Quiz, Signature Keynotes, Speaker Kit, and Book Trilogy.",
    canonical: "https://www.regenesisproject.com/",
    ogTitle: "Thomas Ventura — The REGENESIS Project™",
    ogDescription: "Decodes the Survival Operating System (SOS) beneath habits and reconfigures the patterns silently capping your capacity.",
  },
  about: {
    title: "About Thomas Ventura — Creator of The REGENESIS Project",
    description: "From a war-zone refugee to multi-million dollar operator with two operations run side by side for over fifteen years, Thomas Ventura decodes the Survival Operating System (SOS) beneath habits.",
    canonical: "https://www.regenesisproject.com/about",
    ogTitle: "About Thomas Ventura — Creator of The REGENESIS Project",
    ogDescription: "Discover the journey, operator experience, and framework of Thomas Ventura.",
  },
  keynotes: {
    title: "Keynotes — Thomas Ventura | The REGENESIS Project",
    description: "Keynote speaking for teams, events, and organizations. Thomas Ventura on why biology — not strategy — becomes the ceiling on performance, and what it takes to move it.",
    canonical: "https://www.regenesisproject.com/keynotes",
    ogTitle: "Keynotes — Thomas Ventura | The REGENESIS Project",
    ogDescription: "Keynote speaking for teams, events, and organizations. Thomas Ventura on why biology — not strategy — becomes the ceiling on performance, and what it takes to move it.",
  },
  science: {
    title: "The Science — The Twelve Lenses | The REGENESIS Project",
    description: "Twelve lenses of science for reading one machine: the native system you were born as, the survival layer installed over it, and what those settings are still costing you.",
    canonical: "https://www.regenesisproject.com/science",
    ogTitle: "The Science — The Twelve Lenses | The REGENESIS Project",
    ogDescription: "Twelve lenses of science for reading one machine: the native system you were born as, the survival layer installed over it, and what those settings are still costing you.",
  },
  mythology: {
    title: "The Mythology — The Theater of Identity | The REGENESIS Project",
    description: "The story layer of REGENESIS: the eight universal forces every human system runs under pressure — and what it takes to command them in an integrated state.",
    canonical: "https://www.regenesisproject.com/mythology",
    ogTitle: "The Mythology — The Theater of Identity | The REGENESIS Project",
    ogDescription: "The story layer of REGENESIS: the eight universal forces every human system runs under pressure — and what it takes to command them in an integrated state.",
  },
  quiz: {
    title: "The Mirror Quiz — A Free System Scan | The REGENESIS Project",
    description: "A free scan of the survival patterns running beneath your habits — and where they're quietly holding you back. Coming soon.",
    canonical: "https://www.regenesisproject.com/mirror-quiz",
    ogTitle: "The Mirror Quiz — A Free System Scan | The REGENESIS Project",
    ogDescription: "A free scan of the survival patterns running beneath your habits — and where they're quietly holding you back. Coming soon.",
  },
  'speaker-kit': {
    title: "Speaker Kit & Keynotes — Thomas Ventura | REGENESIS",
    description: "Keynote speeches, speaker requirements, and booking details for Thomas Ventura at leadership summits.",
    canonical: "https://www.regenesisproject.com/speaker-kit",
    ogTitle: "Speaker Kit & Keynotes — Thomas Ventura",
    ogDescription: "Book Thomas Ventura for keynotes and corporate summits.",
  },
  waitlist: {
    title: "The Trilogy Waitlist — The REGENESIS Project",
    description: "Be first to know when The Survival Source Code arrives. Book One coming 2027; Books Two and Three to follow.",
    canonical: "https://www.regenesisproject.com/waitlist",
    ogTitle: "The Trilogy Waitlist — The REGENESIS Project",
    ogDescription: "Be first to know when The Survival Source Code arrives. Book One coming 2027; Books Two and Three to follow.",
  },
};

export const getPageFromPath = (path: string): PageKey => {
  const cleanPath = path.toLowerCase().replace(/\/$/, '') || '/';
  if (cleanPath === '/about') return 'about';
  if (cleanPath === '/keynotes' || cleanPath === '/keynote') return 'keynotes';
  if (cleanPath === '/science') return 'science';
  if (cleanPath === '/mythology') return 'mythology';
  if (cleanPath === '/mirror-quiz' || cleanPath === '/quiz') return 'quiz';
  if (cleanPath === '/speaker-kit') return 'speaker-kit';
  if (cleanPath === '/waitlist') return 'waitlist';
  return 'home';
};

interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps) {
  // Navigation state initialized from initialPath or window location
  const [currentPage, setCurrentPage] = useState<PageKey>(() => {
    if (initialPath) {
      return getPageFromPath(initialPath);
    }
    if (typeof window !== 'undefined') {
      return getPageFromPath(window.location.pathname);
    }
    return 'home';
  });

  // Modal states
  const [quizOpen, setQuizOpen] = useState(false);
  const [speakerKitOpen, setSpeakerKitOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  
  const [selectedBook, setSelectedBook] = useState<BookInfo | null>(null);
  const [selectedKeynote, setSelectedKeynote] = useState<KeynoteInfo | null>(null);
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncRouteFromLocation = () => {
      const page = getPageFromPath(window.location.pathname);
      setCurrentPage(page);
    };

    // Update document head metadata dynamically when page changes in browser
    const meta = ROUTE_METADATA[currentPage] || ROUTE_METADATA.home;
    document.title = meta.title;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', meta.canonical);

    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute('content', meta.ogTitle);

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute('content', meta.ogDescription);

    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.setAttribute('content', meta.canonical);

    const brandImg = 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1785187163/book_1.2_-_Copy_op3afs.png';
    const ogImgEl = document.querySelector('meta[property="og:image"]');
    if (ogImgEl) ogImgEl.setAttribute('content', brandImg);

    const twImgEl = document.querySelector('meta[name="twitter:image"]');
    if (twImgEl) twImgEl.setAttribute('content', brandImg);

    window.addEventListener('popstate', syncRouteFromLocation);
    return () => window.removeEventListener('popstate', syncRouteFromLocation);
  }, [currentPage]);

  const handleNavigatePage = (page: PageKey, sectionId?: string) => {
    const pageToPathMap: Record<PageKey, string> = {
      home: '/',
      about: '/about',
      keynotes: '/keynotes',
      science: '/science',
      mythology: '/mythology',
      quiz: '/mirror-quiz',
      'speaker-kit': '/speaker-kit',
      waitlist: '/waitlist',
    };

    const targetPath = pageToPathMap[page] || '/';

    if (typeof window !== 'undefined') {
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
    }

    setCurrentPage(page);

    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    }
  };

  const handleOpenSpeakerKit = () => {
    handleNavigatePage('keynotes', 'speaker-kit-form');
  };

  const handleOpenWaitlist = () => {
    handleNavigatePage('waitlist');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] font-inter antialiased flex flex-col selection:bg-[#D4AF37] selection:text-[#1A1A1A] relative">
      
      {/* Subtle Gold Reading Progress Bar across the whole site */}
      <ScrollProgress />

      {/* Paper Grain Tactile Texture Overlay */}
      <div className="paper-noise-overlay" />

      {/* Top Navbar */}
      <Navbar 
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onOpenMirrorQuiz={() => setQuizOpen(true)}
        onOpenSpeakerKit={handleOpenSpeakerKit}
        onOpenWaitlist={handleOpenWaitlist}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Main Page Content with Subtle Page & Scroll Animations */}
      <main className="flex-1 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentPage === 'about' ? (
              <AboutPage 
                onNavigatePage={handleNavigatePage}
                onOpenSpeakerKit={handleOpenSpeakerKit}
                onOpenContact={() => setContactOpen(true)}
                onOpenWaitlist={handleOpenWaitlist}
                onOpenMirrorQuiz={() => handleNavigatePage('quiz')}
                onSelectBook={(book) => setSelectedBook(book)}
              />
            ) : currentPage === 'mythology' ? (
              <MythologyPage 
                onOpenSpeakerKit={handleOpenSpeakerKit}
                onOpenContact={() => setContactOpen(true)}
                onOpenWaitlist={handleOpenWaitlist}
                onOpenMirrorQuiz={() => handleNavigatePage('quiz')}
              />
            ) : currentPage === 'science' ? (
              <SciencePage 
                onOpenSpeakerKit={handleOpenSpeakerKit}
                onOpenContact={() => setContactOpen(true)}
                onOpenWaitlist={handleOpenWaitlist}
                onOpenMirrorQuiz={() => handleNavigatePage('quiz')}
                onNavigatePage={handleNavigatePage}
                onNavigateKeynotes={() => handleNavigatePage('keynotes')}
              />
            ) : currentPage === 'keynotes' ? (
              <KeynotesPage 
                onOpenBooking={() => setContactOpen(true)}
                onOpenSpeakerKit={handleOpenSpeakerKit}
              />
            ) : currentPage === 'quiz' ? (
              <QuizPrepPage 
                onStartQuiz={() => setQuizOpen(true)}
                onNavigatePage={handleNavigatePage}
              />
            ) : currentPage === 'speaker-kit' ? (
              <SpeakerKitPage 
                onNavigateHome={() => handleNavigatePage('home')}
                onOpenContact={() => setContactOpen(true)}
              />
            ) : currentPage === 'waitlist' ? (
              <WaitlistPage 
                onNavigateHome={() => handleNavigatePage('home')}
                onOpenContact={() => setContactOpen(true)}
                onOpenMirrorQuiz={() => handleNavigatePage('quiz')}
                onNavigatePage={handleNavigatePage}
              />
            ) : (
              <>
                {/* Section 1 — Hero */}
                <HeroSection 
                  onOpenMirrorQuiz={() => handleNavigatePage('quiz')}
                  onOpenSpeakerKit={handleOpenSpeakerKit}
                  onOpenWaitlist={handleOpenWaitlist}
                />

                {/* Section 2 — Who This Is For */}
                <ScrollReveal delay={0.1}>
                  <AudienceSection />
                </ScrollReveal>

                {/* Section 3 — The Core Thesis */}
                <ScrollReveal delay={0.1}>
                  <ScienceManifesto />
                </ScrollReveal>

                {/* Section 4 — Why Thomas Ventura */}
                <ScrollReveal delay={0.1}>
                  <WhyThomasSection />
                </ScrollReveal>

                {/* Section 5 — Mid-Page Quiz CTA */}
                <ScrollReveal delay={0.1}>
                  <MidPageQuizCTA 
                    onOpenMirrorQuiz={() => handleNavigatePage('quiz')} 
                  />
                </ScrollReveal>

                {/* Section 6 — The Trilogy */}
                <ScrollReveal delay={0.1}>
                  <BooksSection 
                    onSelectBook={(book) => setSelectedBook(book)} 
                    onOpenWaitlist={handleOpenWaitlist}
                  />
                </ScrollReveal>

                {/* Section 7 — Keynotes Strip */}
                <ScrollReveal delay={0.1}>
                  <KeynoteHomeBanner 
                    onExploreKeynotes={() => handleNavigatePage('keynotes')} 
                  />
                </ScrollReveal>

                {/* Section 8 — The Closing Beat */}
                <ScrollReveal delay={0.1}>
                  <QuoteSection 
                    onOpenMirrorQuiz={() => handleNavigatePage('quiz')} 
                  />
                </ScrollReveal>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer 
        onOpenContact={() => setContactOpen(true)}
        onOpenSpeakerKit={handleOpenSpeakerKit}
        onOpenWaitlist={handleOpenWaitlist}
        onOpenPrivacy={() => setLegalType('privacy')}
        onOpenTerms={() => setLegalType('terms')}
        onNavigatePage={handleNavigatePage}
      />

      {/* Interactive Modals */}
      <MirrorQuizModal 
        isOpen={quizOpen} 
        onClose={() => setQuizOpen(false)} 
        onOpenContact={() => setContactOpen(true)} 
      />

      <BookDetailModal 
        book={selectedBook} 
        onClose={() => setSelectedBook(null)} 
      />

      <KeynoteDetailModal 
        keynote={selectedKeynote} 
        onClose={() => setSelectedKeynote(null)} 
        onOpenContact={() => setContactOpen(true)} 
      />

      <SpeakerKitModal 
        isOpen={speakerKitOpen} 
        onClose={() => setSpeakerKitOpen(false)} 
      />

      <WaitlistModal 
        isOpen={waitlistOpen} 
        onClose={() => setWaitlistOpen(false)} 
      />

      <ContactModal 
        isOpen={contactOpen} 
        onClose={() => setContactOpen(false)} 
      />

      <LegalModal 
        type={legalType} 
        onClose={() => setLegalType(null)} 
      />

    </div>
  );
}
