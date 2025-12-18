'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Clubs = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl font-bold text-sky-800 mb-4">{t('section-clubs')}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore your interests and develop new skills through our diverse range of extracurricular activities and clubs.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                        <div className="bg-sky-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-sky-800 mb-2">Science Club</h3>
                        <p className="text-gray-600 text-sm">Hands-on experiments and scientific exploration</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
                        <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"></path>
                            </svg>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-sky-800 mb-2">Coding Club</h3>
                        <p className="text-gray-600 text-sm">Programming, web development, and robotics</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
                        <div className="bg-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                            </svg>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-sky-800 mb-2">Arts & Crafts</h3>
                        <p className="text-gray-600 text-sm">Creative expression through various mediums</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center">
                        <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"></path>
                            </svg>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-sky-800 mb-2">Debate Club</h3>
                        <p className="text-gray-600 text-sm">Public speaking and critical thinking skills</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clubs;
