'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import anime from 'animejs';

const OtherBranches = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: '.branch-card',
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

    const branches = [
        {
            id: 1,
            name: 'Learners Global School',
            logo: '/branch/school_college.png',
            link: '#'
        },
        {
            id: 2,
            name: 'Learners Digital',
            logo: '/branch/GCC.png',
            link: '#'
        }
    ];

    return (
        <section ref={sectionRef} className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">Other Branches</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {branches.map((branch) => (
                        <div
                            key={branch.id}
                            className="branch-card opacity-0 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col items-center text-center group"
                        >
                            <div className="relative w-full h-64 mb-6 transition-transform duration-300 group-hover:scale-105 rounded-xl overflow-hidden shadow-md">
                                <Image
                                    src={branch.logo}
                                    alt={`${branch.name} Logo`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-slate-900 mb-6 group-hover:text-sky-700 transition-colors">
                                {branch.name}
                            </h3>
                            <a
                                href={branch.link}
                                className="inline-flex items-center px-6 py-3 rounded-full bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Visit
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OtherBranches;
