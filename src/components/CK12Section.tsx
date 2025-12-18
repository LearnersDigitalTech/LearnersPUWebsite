'use client';

import React from 'react';
import Image from 'next/image';
import ck12Logo from '../assets/ck12-logo-new.png';

const CK12Section = () => {
    const sectionRef = React.useRef(null);

    React.useEffect(() => {
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
        <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-gray-50 opacity-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <a
                    href="https://www.ck12.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                >
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                        <div className="relative w-full md:w-1/3 h-48 md:h-64">
                            <Image
                                src={ck12Logo}
                                alt="CK-12 Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="font-display text-3xl font-bold text-sky-800 mb-4 group-hover:text-sky-600 transition-colors">
                                Empowering Education with CK-12
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                We are proud to be associated with CK-12, providing our students with world-class adaptive learning tools and AI-driven personalized education resources. Experience the future of learning with their innovative platform.
                            </p>
                            <span className="inline-flex items-center text-emerald-600 font-semibold group-hover:translate-x-1 transition-transform">
                                Visit CK-12 Website
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </a>
            </div>
        </section>
    );
};

export default CK12Section;
