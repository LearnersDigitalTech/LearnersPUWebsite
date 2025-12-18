'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const MathClubPopup = () => {
    const [isDocked, setIsDocked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const showPopup = () => {
            setIsVisible(true);
        };

        if (pathname === '/') {
            // On home page, wait for NoticeBoard close event
            window.addEventListener('notice-board-closed', showPopup);

            // Cleanup listener
            return () => window.removeEventListener('notice-board-closed', showPopup);
        } else {
            // On other pages, show immediately (after distinctmount)
            showPopup();
        }
    }, [pathname]);

    // Timer to dock the popup after it becomes visible
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsDocked(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    return (
        <div
            className={`fixed z-[49] transition-all duration-1000 ease-in-out bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden flex flex-col items-center text-center font-sans
                ${isDocked
                    ? 'bottom-[90px] right-6 w-60 p-3 scale-90 origin-bottom-right'
                    : 'top-1/2 -translate-y-1/2 right-6 w-80 p-6 scale-100 origin-center'
                }
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}
            `}
        >
            {/* Close Button (Optional, but good for UX) */}
            {/* <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button> */}

            {/* <div className={`transition-all duration-1000 ${isDocked ? 'mb-2' : 'mb-4'}`}>
                <span className="text-4xl">🚀</span>
            </div> */}

            <h3 className={`font-bold text-slate-900 leading-tight transition-all duration-1000 ${isDocked ? 'text-sm mb-2' : 'text-xl mb-3'}`}>
                {isDocked ? "Join the 100% Club!" : "Test your math skills and join the 100% Club!"}
            </h3>

            {!isDocked && (
                <p className="text-slate-600 text-sm mb-6 transition-opacity duration-500">
                    Prove your mastery and claim your spot on the leaderboard.
                </p>
            )}

            <a
                href="http://math100.learnersdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300
                    ${isDocked ? 'text-xs py-2 px-4 w-full' : 'text-base py-3 px-6 w-full'}
                `}
            >
                <span>Take Challenge</span>
                <svg className={`ml-2 transition-transform duration-300 group-hover:translate-x-1 ${isDocked ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </a>

            {/* Decorative background blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-50 rounded-full blur-2xl -z-10 opacity-60"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl -z-10 opacity-60"></div>
        </div>
    );
};

export default MathClubPopup;
