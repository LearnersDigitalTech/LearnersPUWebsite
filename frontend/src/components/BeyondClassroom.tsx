'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css';

const galleryImages = [
    { src: '/gallery/Environmental-Day.png', alt: 'Environmental Day' },
    { src: '/gallery/First-Prize-in-Makkala-Dasara-20.png', alt: 'Makkala Dasara Prize' },
    { src: '/gallery/Infosys-Visit-2.png', alt: 'Infosys Visit' },
    { src: '/gallery/MathDay.png', alt: 'Math Day' },
    { src: '/gallery/Sports-Events.png', alt: 'Sports Events' },
    { src: '/gallery/Trip-to-Kerala.png', alt: 'Trip to Kerala' },
];

const BeyondClassroom = () => {
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
        <section ref={sectionRef} className="py-20 bg-gray-50 opacity-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-sky-800 mb-4">BEYOND THE CLASSROOM</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Experience the vibrant life at Learners, where education goes beyond textbooks.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Splide
                    options={{
                        type: 'loop',
                        drag: 'free',
                        focus: 'center',
                        perPage: 3,
                        gap: '2rem',
                        autoScroll: {
                            speed: 1,
                            pauseOnHover: false,
                            pauseOnFocus: false,
                        },
                        arrows: false,
                        pagination: false,
                        breakpoints: {
                            1280: {
                                perPage: 3,
                            },
                            1024: {
                                perPage: 2,
                            },
                            640: {
                                perPage: 1,
                            }
                        }
                    }}
                    extensions={{ AutoScroll }}
                    aria-label="Beyond the Classroom Gallery"
                >
                    {galleryImages.map((image, index) => (
                        <SplideSlide key={index}>
                            <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg group">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white font-semibold text-lg">{image.alt}</span>
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                <h3 className="font-display text-3xl font-bold text-sky-800 mb-12 text-center">Inspirational Sessions & Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { id: 'y4HTKNWB-vo', title: 'Guruji Art of Living' },
                        { id: 'biN-LIpmBos', title: 'Narayana Murthy Speech' },
                        { id: 'HEuP7yAAxUo', title: 'Anand Kumar Speech' },
                        { id: '6ZnuvnzSo54', title: 'Murali Mohan Speech' },
                        { id: '5i_6Sz7bPK8', title: 'Satya Prasad Speech' },
                        { id: 'DhdTpl2aMFc', title: 'Learners Utsava' }
                    ].map((video, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="relative w-full aspect-video overflow-hidden">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                ></iframe>
                                {/* Overlay gradient for premium feel when not playing (optional, but iframe covers it usually. 
                                    Adding a border/ring effect instead) */}
                                <div className="absolute inset-0 pointer-events-none border-4 border-transparent group-hover:border-sky-500/20 rounded-2xl transition-colors duration-300"></div>
                            </div>
                            <div className="p-6 bg-white relative z-10">
                                <h4 className="font-display font-bold text-lg text-sky-900 group-hover:text-sky-600 transition-colors duration-300">
                                    {video.title}
                                </h4>
                                <div className="w-12 h-1 bg-sky-200 mt-3 rounded-full group-hover:w-full group-hover:bg-sky-500 transition-all duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeyondClassroom;
