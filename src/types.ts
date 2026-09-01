export type PageKey = 'home' | 'science' | 'mythology' | 'about' | 'keynotes' | 'quiz' | 'speaker-kit' | 'waitlist';

export interface BookInfo {

  id: string;
  dropDate: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  chapters: string[];
  coverColor: string;
  coverImage?: string;
  dropUrl: string;
}

export type Book = BookInfo;

export interface KeynoteInfo {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  fullDetails: string;
  outcomes: string[];
  targetAudience: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    points: number; // 1-4 points
    category: 'SOS' | 'TRANSITION' | 'ONE';
  }[];
}
