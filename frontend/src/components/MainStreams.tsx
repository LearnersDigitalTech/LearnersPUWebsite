'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import anime from 'animejs';
import { useLanguage } from '../context/LanguageContext';

const MainStreams = () => {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: '.main-stream-card',
                            translateY: [50, 0],
                            opacity: [0, 1],
                            duration: 800,
                            delay: anime.stagger(200),
                            easing: 'easeOutQuart'
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        anime({
            targets: e.currentTarget,
            translateY: -8,
            boxShadow: '0 20px 40px rgba(14, 165, 233, 0.15)',
            duration: 400,
            easing: 'easeOutQuad'
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        anime({
            targets: e.currentTarget,
            translateY: 0,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            duration: 400,
            easing: 'easeOutQuad'
        });
    };

    return (
        <section id="main-streams" ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute top-1/2 -left-24 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-sky-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Academic Excellence</span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-6">{t('section-main-streams')}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full mb-6"></div>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        {t('section-main-streams-desc')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
                    {/* PCMB Stream */}
                    <Link href="/courses#pcmb" className="block group">
                        <div
                            className="main-stream-card bg-white rounded-3xl p-4 shadow-xl shadow-sky-100/50 cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-200/50 border border-slate-100 h-full flex flex-col opacity-0"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="mb-6 relative h-72 w-full overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <Image
                                    src="/pcmb_front.jpeg"
                                    alt="PCMB"
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                </div>
                            </div>
                            <div className="px-4 pb-4 flex-grow flex flex-col">
                                <h3 className="font-display text-3xl font-bold text-slate-800 mb-3 group-hover:text-sky-700 transition-colors duration-300">
                                    {t('stream-pcmb')}
                                </h3>
                                <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                                    {t('stream-pcmb-desc')}
                                </p>
                                <div className="flex items-center text-sky-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 mt-auto">
                                    <span>Explore Course</span>
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* PCMC Stream */}
                    <Link href="/courses#pcmc" className="block group">
                        <div
                            className="main-stream-card bg-white rounded-3xl p-4 shadow-xl shadow-sky-100/50 cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-200/50 border border-slate-100 h-full flex flex-col opacity-0"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="mb-6 relative h-72 w-full overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <Image
                                    src="/classrooms/pcmc.jpeg"
                                    alt="PCMC"
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                </div>
                            </div>
                            <div className="px-4 pb-4 flex-grow flex flex-col">
                                <h3 className="font-display text-3xl font-bold text-slate-800 mb-3 group-hover:text-sky-700 transition-colors duration-300">
                                    {t('stream-pcmc')}
                                </h3>
                                <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                                    {t('stream-pcmc-desc')}
                                </p>
                                <div className="flex items-center text-sky-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 mt-auto">
                                    <span>Explore Course</span>
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MainStreams;
