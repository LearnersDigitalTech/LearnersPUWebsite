'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        googleTranslateElementInit: () => void;
        google: any;
    }
}

const GoogleTranslate = () => {
    useEffect(() => {
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'en,hi,kn,te,ta,ml', // English, Hindi, Kannada, Telugu, Tamil, Malayalam
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false,
                },
                'google_translate_element'
            );
        };

        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            delete (window as any).googleTranslateElementInit;
        };
    }, []);

    return null;
};

export default GoogleTranslate;
