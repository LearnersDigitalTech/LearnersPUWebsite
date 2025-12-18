'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css';
import { useLanguage } from '../context/LanguageContext';

const Achievers = () => {
    const { t } = useLanguage();
    const splideRef = useRef<any>(null);
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

    // Notes: We use raw iframe instead of react-youtube because Splide's 'loop' mode
    // creates clones of slides. React components don't initialize correctly in these clones,
    // leading to empty white boxes. Raw iframes are cloned as HTML and work correctly.

    return (
        <section ref={sectionRef} className="py-20 bg-white opacity-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-sky-800 mb-4">{t('section-achievers')}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Celebrating the achievements of our students who have excelled in various fields and brought pride to our institution.
                    </p>
                </div>

                <Splide
                    ref={splideRef}
                    options={{
                        type: 'loop',
                        drag: 'free',
                        focus: 'center',
                        perPage: 3,
                        gap: '2rem',
                        autoScroll: {
                            speed: 1,
                            pauseOnHover: true, // Pause when user hovers to watch/interact
                            pauseOnFocus: true,
                        },
                        arrows: false,
                        pagination: false,
                        breakpoints: {
                            1024: {
                                perPage: 2,
                            },
                            768: {
                                perPage: 1,
                            }
                        }
                    }}
                    extensions={{ AutoScroll }}
                    aria-label="Student Achievers"
                >
                    {[
                        '2Ol8iKa4MsA',
                        'uydWqifT230',
                        'wXWYkwEBa6U',
                        'KsUxTsUyK1k',
                        'DxVT-_EH-jI'
                    ].map((videoId, index) => (
                        <SplideSlide key={index}>
                            <div className="achievement-card rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full bg-white">
                                <div className="relative w-full aspect-video">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </section>
    );
};

export default Achievers;
