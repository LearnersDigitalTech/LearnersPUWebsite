'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const Methodology = () => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        import('animejs').then((anime) => {
                            anime.default({
                                targets: sectionRef.current,
                                translateY: [50, 0],
                                opacity: [0, 1],
                                duration: 800,
                                easing: 'easeOutQuart'
                            });
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

    return (
        <section ref={sectionRef} className="py-20 bg-white opacity-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-sky-800 mb-6">WHAT MAKES LEARNERS UNIQUE?</h2>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-emerald-500 text-white p-3 rounded-full flex-shrink-0">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-sky-800 mb-2">MIND MAP</h3>
                                    <p className="text-gray-600">A powerful visual technique that helps students organize information, making complex concepts easier to understand and remember.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-sky-500 text-white p-3 rounded-full flex-shrink-0">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-sky-800 mb-2">5W1H FRAMEWORK</h3>
                                    <p className="text-gray-600">A comprehensive questioning technique (Who, What, Where, When, Why, How) that develops critical thinking and problem-solving skills.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-green-500 text-white p-3 rounded-full flex-shrink-0">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-sky-800 mb-2">STUDY TECHNOLOGY</h3>
                                    <p className="text-gray-600">Advanced learning methods that help students overcome study barriers and apply their knowledge effectively in real-world situations.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="relative mt-8 lg:mt-0">
                        <div className="relative w-full h-64 sm:h-96">
                            <Image src="/resources/faculty-team.jpg" alt="Teaching Methodology" fill className="rounded-2xl shadow-2xl object-cover" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden sm:block">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-sky-800">10:1</div>
                                <div className="text-sm text-gray-600">{t('meth-ratio')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Methodology;

