'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import anime from 'animejs';
import { useLanguage } from '../context/LanguageContext';

const CourseStreams = () => {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: '.course-stream-card',
                            translateY: [50, 0],
                            opacity: [0, 1],
                            duration: 800,
                            delay: anime.stagger(150),
                            easing: 'easeOutQuart'
                        });
                        observer.disconnect();
                    }
                });
            }
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
        <section id="streams" ref={sectionRef} className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-24 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute bottom-0 left-24 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-sky-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Specialized Programs</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t('section-streams')}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full mb-6"></div>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        {t('section-streams-desc')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            id: 'neet',
                            title: 'NEET',
                            badge: t('stream-medical'),
                            desc: t('stream-medical-desc'),
                            duration: t('years-2'),
                            success: '92%',
                            image: '/resources/neet-prep.jpg',
                            color: 'emerald',
                            link: '/courses/neet'
                        },
                        {
                            id: 'iit-jee',
                            title: 'IIT-JEE',
                            badge: t('stream-engineering'),
                            desc: t('stream-engineering-desc'),
                            duration: t('years-2'),
                            success: '89%',
                            image: '/resources/iit-jee-study.jpg',
                            color: 'blue',
                            link: '/courses/iit-jee'
                        },
                        {
                            id: 'cet',
                            title: 'CET',
                            badge: t('stream-state'),
                            desc: t('stream-state-desc'),
                            duration: t('years-1-2'),
                            success: '94%',
                            image: '/resources/sat-classroom.jpg',
                            color: 'purple',
                            link: '/courses/cet'
                        },
                        {
                            id: 'sat',
                            title: 'SAT',
                            badge: t('stream-international'),
                            desc: t('stream-international-desc'),
                            duration: t('months-6-12'),
                            success: '96%',
                            image: '/resources/sat-classroom.jpg',
                            color: 'rose',
                            link: '/courses/sat'
                        }
                    ].map((stream) => (
                        <Link key={stream.id} href={stream.link} className="block group h-full">
                            <div
                                className="course-stream-card bg-white rounded-3xl p-4 shadow-xl shadow-slate-200/50 cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-100/50 border border-slate-100 h-full flex flex-col opacity-0"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="mb-5 relative h-48 w-full overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                    <Image
                                        src={stream.image}
                                        alt={`${stream.title} Preparation`}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute top-3 right-3 z-20">
                                        <span className={`backdrop-blur-md bg-white/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide text-${stream.color}-600`}>
                                            {stream.badge}
                                        </span>
                                    </div>
                                </div>

                                <div className="px-2 pb-2 flex-grow flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-display text-2xl font-bold text-slate-800 group-hover:text-sky-700 transition-colors duration-300">
                                            {stream.title}
                                        </h3>
                                    </div>

                                    <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
                                        {stream.desc}
                                    </p>

                                    <div className="pt-4 border-t border-slate-100 mt-auto">
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span className="text-slate-500 font-medium">{t('duration')}</span>
                                            <span className="text-slate-700 font-semibold">{stream.duration}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500 font-medium">{t('stat-success')}</span>
                                            <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                                                {stream.success}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CourseStreams;
