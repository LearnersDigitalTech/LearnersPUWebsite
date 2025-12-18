'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Check for existing google translate cookie
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
        };

        const googtrans = getCookie('googtrans');
        if (googtrans) {
            // Format is usually /en/hi
            const langCode = googtrans.split('/').pop();
            if (langCode) setCurrentLang(langCode);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLanguageChange = (langCode: string) => {
        // Set the google translate cookie
        // Format: /source_lang/target_lang
        document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=/en/${langCode}; path=/`;

        setCurrentLang(langCode);
        window.location.reload();
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled
                ? 'bg-white/90 backdrop-blur-md shadow-lg py-2'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/resources/logo.png"
                                alt="LGS Logo"
                                fill
                                className="object-contain drop-shadow-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-none group-hover:text-sky-700 transition-colors duration-300 drop-shadow-sm">
                                LEARNERS PU COLLEGE
                            </span>
                            <span className={`text-xs font-bold text-sky-600 tracking-widest uppercase transition-opacity duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                                Excellence in Education
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2">
                        {[
                            { name: 'nav-home', path: '/' },
                            { name: 'nav-about', path: '/about' },
                            { name: 'nav-courses', path: '/courses' },
                            { name: 'nav-life', path: '/life-at-lgs' },
                            { name: 'nav-connect', path: '/connect' },
                            // { name: 'nav-branch2', path: '#' },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="relative px-4 py-2 text-slate-900 font-bold tracking-wide hover:text-sky-700 transition-all duration-300 group drop-shadow-sm"
                            >
                                {t(item.name)}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sky-600 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-[0_0_10px_rgba(14,165,233,0.5)]"></span>
                            </Link>
                        ))}

                        {/* Custom Language Dropdown (Triggers Google Translate) */}
                        <div className="relative group ml-6">
                            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-slate-900 hover:text-sky-700 transition-all duration-300 border border-white/50 hover:border-sky-200 shadow-lg hover:shadow-sky-100/50 group-hover:scale-105">
                                <span className="text-xl filter drop-shadow-sm">
                                    {currentLang === 'en' ? '🇺🇸' :
                                        currentLang === 'hi' ? '🇮🇳' :
                                            currentLang === 'kn' ? '🇮🇳' :
                                                currentLang === 'te' ? '🇮🇳' :
                                                    currentLang === 'ta' ? '🇮🇳' : '🇮🇳'}
                                </span>
                                <span className="font-bold text-sm uppercase tracking-wider">
                                    {currentLang}
                                </span>
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>

                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50 border border-slate-100 overflow-hidden ring-1 ring-black/5">
                                <div className="p-1">
                                    {[
                                        { code: 'en', label: 'English', flag: '🇺🇸' },
                                        { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
                                        { code: 'kn', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
                                        { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
                                        { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
                                        { code: 'ml', label: 'മലയാളം', flag: '🇮🇳' },
                                    ].map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={`flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm rounded-xl transition-colors duration-200 ${currentLang === lang.code
                                                ? 'bg-sky-50 text-sky-700 font-semibold'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                        >
                                            <span className="text-lg">{lang.flag}</span>
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Hidden Google Translate Element for initialization */}
                        <div id="google_translate_element" className="hidden"></div>
                    </div>

                    {/* Mobile Language Selector (Left of Hamburger) */}
                    <div className="md:hidden flex items-center mr-2">
                        <div className="relative group">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/50 hover:bg-slate-100 text-slate-900 transition-all duration-300 border-none outline-none focus:outline-none focus:ring-0">
                                <span className="text-lg leading-none filter drop-shadow-sm">
                                    {currentLang === 'en' ? '🇺🇸' :
                                        currentLang === 'hi' ? '🇮🇳' :
                                            currentLang === 'kn' ? '🇮🇳' :
                                                currentLang === 'te' ? '🇮🇳' :
                                                    currentLang === 'ta' ? '🇮🇳' : '🇮🇳'}
                                </span>
                                <span className="font-bold text-xs uppercase tracking-wider">
                                    {currentLang}
                                </span>
                            </button>
                            {/* Mobile Dropdown */}
                            <select
                                value={currentLang}
                                onChange={(e) => handleLanguageChange(e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            >
                                <option value="en">English</option>
                                <option value="hi">Hindi</option>
                                <option value="kn">Kannada</option>
                                <option value="te">Telugu</option>
                                <option value="ta">Tamil</option>
                                <option value="ml">Malayalam</option>
                            </select>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-900 hover:text-sky-700 transition-colors drop-shadow-sm outline-none focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed inset-x-0 top-[64px] h-[calc(100vh-64px)] bg-white/95 backdrop-blur-xl shadow-2xl z-40 transition-all duration-500 ease-in-out origin-top overflow-y-auto ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
                    }`}
            >
                <div className="px-6 py-8 space-y-4">
                    {[
                        { name: 'nav-home', path: '/' },
                        { name: 'nav-about', path: '/about' },
                        { name: 'nav-courses', path: '/courses' },
                        { name: 'nav-life', path: '/life-at-lgs' },
                        { name: 'nav-connect', path: '/connect' },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="block text-lg font-bold text-slate-800 hover:text-sky-700 hover:bg-sky-50 px-4 py-3 rounded-xl transition-all duration-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {t(item.name)}
                        </Link>
                    ))}


                </div>
            </div>
        </nav>
    );
};

export default Navbar;
