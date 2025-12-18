'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'kn' | 'te' | 'ta' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simplified translations object - only keeping English values as base for Google Translate
// We keep the structure to minimize refactoring in other components
const translations: Record<string, Record<string, string>> = {
  // Navigation
  'nav-home': { en: 'Home' },
  'nav-about': { en: 'About Us' },
  'nav-courses': { en: 'Courses' },
  'nav-life': { en: 'Life at Learners' },
  'nav-connect': { en: 'Connect' },
  // 'nav-branch2': { en: 'Branch2' },

  // Hero Section
  'hero-title-1': { en: 'Excellence in' },
  'hero-title-2': { en: 'Education' },
  'hero-subtitle': { en: 'Empowering students with mind-map based learning, expert career guidance, and a strong mathematical foundation to build confident, future-ready achievers.' },
  'hero-btn-admission': { en: 'Admission Now' },
  'hero-btn-visit': { en: 'Schedule Visit' },
  'stat-success': { en: 'Success Rate' },
  'stat-students': { en: 'Students' },
  'stat-faculty': { en: 'Faculty' },

  // Sections Headers
  'section-main-streams': { en: 'Our Main Streams' },
  'section-main-streams-desc': { en: 'Core combinations for a strong foundation.' },
  'stream-pcmb': { en: 'PCMB' },
  'stream-pcmb-desc': { en: 'Physics, Chemistry, Mathematics, Biology' },
  'stream-pcmc': { en: 'PCMC' },
  'stream-pcmc-desc': { en: 'Physics, Chemistry, Mathematics, Computer Science' },
  'section-streams': { en: 'Our Academic Streams' },
  'section-streams-desc': { en: 'Choose from our specialized programs designed to excel in competitive examinations and build strong foundations for your future.' },
  'section-methodology': { en: 'Our Teaching Methodology' },
  'section-facilities': { en: 'World-Class Facilities' },
  'section-facilities-desc': { en: 'Experience learning in an environment designed to foster creativity, innovation, and holistic growth.' },
  'section-mentors': { en: 'Exposure to Mentors' },
  'section-achievers': { en: 'Notable Achievers' },
  'section-events': { en: 'Upcoming Events' },
  'section-clubs': { en: 'School Clubs' },
  'section-affiliates': { en: 'Our Affiliates' },

  // About Page
  'about-title': { en: 'About Learners PU College' },
  'about-desc': { en: 'Learners PU College is committed to nurturing excellence through innovative education, fostering holistic development, and preparing students for global challenges.' },
  'mission-vision-title': { en: 'Our Mission & Vision' },
  'mission-title': { en: 'Mission' },
  'mission-desc': { en: 'To provide world-class education that empowers students with knowledge, skills, and values necessary to excel in competitive examinations and become responsible global citizens.' },
  'vision-title': { en: 'Vision' },
  'vision-desc': { en: 'To be recognized as the premier educational institution that transforms young minds into confident, compassionate, and capable individuals who will contribute meaningfully to society.' },
  'values-title': { en: 'Core Values' },
  'principal-msg-title': { en: "Principal's Message" },
  'faculty-title': { en: 'Our Expert Faculty' },
  'disclosures-title': { en: 'Mandatory Disclosures' },
  'insights-title': { en: 'Educational Insights' },
  'stream-medical': { en: 'Medical' },
  'stream-medical-desc': { en: 'Comprehensive preparation for medical entrance examinations with expert faculty and advanced lab facilities.' },
  'stream-engineering': { en: 'Engineering' },
  'stream-engineering-desc': { en: 'Rigorous training for engineering entrance exams with focus on problem-solving and analytical skills.' },
  'stream-state': { en: 'State Level' },
  'stream-state-desc': { en: 'Specialized coaching for Common Entrance Test with state-specific curriculum and pattern.' },
  'stream-international': { en: 'International' },
  'stream-international-desc': { en: 'Global standard test preparation for undergraduate admissions in international universities.' },
  'duration': { en: 'Duration' },
  'years-2': { en: '2 Years' },
  'years-1-2': { en: '1-2 Years' },
  'months-6-12': { en: '6-12 Months' },

  // Methodology
  'meth-personalized': { en: 'Personalized Learning Paths' },
  'meth-personalized-desc': { en: 'Tailored curriculum based on individual student strengths, weaknesses, and learning pace.' },
  'meth-interactive': { en: 'Interactive Learning' },
  'meth-interactive-desc': { en: 'Hands-on experiments, group discussions, and real-world applications of theoretical concepts.' },
  'meth-assessment': { en: 'Continuous Assessment' },
  'meth-assessment-desc': { en: 'Regular tests, performance tracking, and detailed feedback to ensure consistent progress.' },
  'meth-learn-more': { en: 'Learn More About Our Approach' },
  'meth-ratio': { en: 'Student Teacher Ratio' },

  // Footer
  'footer-desc': { en: 'Learners PU College - Empowering excellence through innovative education.' },
  'footer-privacy': { en: 'Privacy Policy' },
  'footer-terms': { en: 'Terms of Service' },
  'footer-rights': { en: 'All rights reserved.' }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // We don't need to load saved language anymore as Google Translate handles it
  // But we keep the state to avoid breaking consumers of this context

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    // We could trigger Google Translate here if we wanted custom buttons
  };

  const t = (key: string) => {
    // Always return English text, Google Translate will handle the rest
    return translations[key]?.['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
