'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import anime from 'animejs';
import { useLanguage } from '../context/LanguageContext';
import Counter from './Counter';

const Hero = () => {
    const { t } = useLanguage();
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonsRef = useRef(null);
    const statsRef = useRef(null);

    // Video Carousel State
    const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
    const videos = ['/resources/video.mp4', '/resources/video2.mp4'];
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    useEffect(() => {
        // Play the current video
        const currentVideo = videoRefs.current[currentVideoIndex];
        if (currentVideo) {
            currentVideo.currentTime = 0;
            currentVideo.play().catch(e => console.log("Autoplay prevented:", e));
        }

        // Pause other videos
        videoRefs.current.forEach((video, index) => {
            if (index !== currentVideoIndex && video) {
                video.pause();
            }
        });
    }, [currentVideoIndex]);

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    };

    useEffect(() => {
        // Animate hero section elements
        anime({
            targets: titleRef.current,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: 300,
            easing: 'easeOutQuart'
        });

        anime({
            targets: subtitleRef.current,
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            delay: 600,
            easing: 'easeOutQuart'
        });

        anime({
            targets: buttonsRef.current,
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 600,
            delay: 900,
            easing: 'easeOutQuart'
        });

        anime({
            targets: statsRef.current,
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 600,
            delay: 1200,
            easing: 'easeOutQuart'
        });
    }, [t]);

    return (
        <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
            {/* Video Background */}
            {/* Video Background Carousel */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div
                    className="flex w-full h-full transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateX(-${currentVideoIndex * 100}%)` }}
                >
                    {videos.map((src, index) => (
                        <div key={index} className="w-full h-full flex-shrink-0 relative">
                            <video
                                ref={el => {
                                    videoRefs.current[index] = el;
                                }}
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                                onEnded={handleVideoEnd}
                            >
                                <source src={src} type="video/mp4" />
                            </video>
                        </div>
                    ))}
                </div>
            </div>
            {/* Overlay for better text readability */}
            <div className="absolute top-0 left-0 w-full h-full bg-white/60 -z-10 backdrop-blur-[1px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1
                                ref={titleRef}
                                className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-sky-800 leading-tight opacity-0"
                            >
                                <span>{t('hero-title-1')}</span>{' '}
                                <span className="bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">
                                    {t('hero-title-2')}
                                </span>
                            </h1>
                            <p
                                ref={subtitleRef}
                                className="text-xl text-gray-600 leading-relaxed opacity-0"
                            >
                                {t('hero-subtitle')}
                            </p>
                        </div>
                        <div
                            ref={buttonsRef}
                            className="flex flex-col sm:flex-row gap-4 opacity-0"
                        >
                            <Link
                                href="/connect"
                                className="bg-emerald-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-300 shadow-lg hover:shadow-emerald-500/30 text-center"
                            >
                                {t('hero-btn-admission')}
                            </Link>
                            <Link
                                href="/connect"
                                className="border-2 border-sky-700 text-sky-700 px-8 py-4 rounded-lg font-semibold hover:bg-sky-700 hover:text-white transition-all duration-300 text-center"
                            >
                                {t('hero-btn-visit')}
                            </Link>
                        </div>
                        <div
                            ref={statsRef}
                            className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 opacity-0"
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold text-sky-700">
                                    <Counter end={15} suffix="+" />
                                </div>
                                <div className="text-sm text-gray-600">Years Legacy</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-sky-700">
                                    <Counter end={250} suffix="+" />
                                </div>
                                <div className="text-sm text-gray-600">{t('stat-students')}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-sky-700">
                                    <Counter end={25} suffix="+" />
                                </div>
                                <div className="text-sm text-gray-600">{t('stat-faculty')}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right side intentionally left empty for video visibility */}
                <div className="hidden lg:block"></div>
            </div>
        </section>
    );
};

export default Hero;
