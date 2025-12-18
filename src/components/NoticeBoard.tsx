'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import anime from 'animejs';

interface Slide {
    type: 'image' | 'video';
    src: string;
    alt: string;
}

interface NoticeBoardProps {
    initialSlides?: Slide[];
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ initialSlides = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const slides = initialSlides.length > 0 ? initialSlides : [
        { type: 'image', src: '/popup/Results_1.jpg', alt: 'Result 1' },
        { type: 'image', src: '/popup/Results_3.jpg', alt: 'Result 3' }
    ];

    useEffect(() => {
        // Show popup after a short delay on initial load
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Animate entrance
            anime({
                targets: modalRef.current,
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutQuad'
            });
            anime({
                targets: contentRef.current,
                scale: [0.8, 1],
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                delay: 100,
                easing: 'easeOutElastic(1, .8)'
            });
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            const interval = setInterval(() => {
                handleNext();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isOpen, currentIndex]);

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        animateSlideChange(nextIndex);
    };

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        animateSlideChange(prevIndex);
    };

    const animateSlideChange = (newIndex: number) => {
        const direction = newIndex > currentIndex ? 1 : -1;

        // Slide out current
        anime({
            targets: `.slide-${currentIndex}`,
            translateX: [0, -100 * direction + '%'],
            opacity: [1, 0],
            duration: 400,
            easing: 'easeInOutQuad',
            complete: () => {
                setCurrentIndex(newIndex);
            }
        });

        // Slide in new (handled by key prop and initial render, but we can enhance if needed)
        // For simplicity in React, changing state triggers re-render. 
        // We can use a more complex setup for seamless sliding, but simple fade/slide is often enough.
        // Let's try a simple state change first, but maybe add a class for animation.
        setCurrentIndex(newIndex);
    };

    const handleClose = () => {
        anime({
            targets: contentRef.current,
            scale: 0.8,
            opacity: 0,
            duration: 400,
            easing: 'easeInQuad'
        });
        anime({
            targets: modalRef.current,
            opacity: 0,
            duration: 400,
            delay: 100,
            easing: 'easeInQuad',
            complete: () => setIsOpen(false)
        });
    };

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            onClick={handleClose}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm opacity-0"
        >
            <div
                ref={contentRef}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl bg-transparent rounded-2xl opacity-0"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute -top-12 right-0 z-20 p-2 text-white hover:text-gray-300 transition-colors"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                {/* Content Area */}
                <div className="relative aspect-video w-full bg-transparent rounded-2xl overflow-hidden">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${index === currentIndex
                                ? 'opacity-100 translate-x-0'
                                : index < currentIndex
                                    ? 'opacity-0 -translate-x-full'
                                    : 'opacity-0 translate-x-full'
                                }`}
                        >
                            {slide.type === 'video' ? (
                                <video
                                    src={slide.src}
                                    className="w-full h-full object-contain"
                                    controls
                                    autoPlay={index === currentIndex}
                                    muted
                                />
                            ) : (
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    className="object-contain"
                                    priority={index === 0}
                                />
                            )}
                        </div>
                    ))}

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-sky-600 w-8'
                                    : 'bg-white/60 hover:bg-white'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows - Moved outside */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 p-3 text-white hover:text-sky-400 transition-all hover:scale-110"
                >
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 p-3 text-white hover:text-sky-400 transition-all hover:scale-110"
                >
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NoticeBoard;
