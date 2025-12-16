'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Mentors = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl font-bold text-sky-800 mb-4">{t('section-mentors')}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Learn from industry experts, successful alumni, and renowned academicians who guide our students beyond the classroom.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-sky-800 mb-3">Industry Leaders</h3>
                        <p className="text-gray-600">Regular sessions with CEOs, entrepreneurs, and professionals from various industries.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 hover:text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-sky-800 mb-3">Successful Alumni</h3>
                        <p className="text-gray-600">Interactive sessions with our alumni who have achieved excellence in their careers.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                            </svg>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-sky-800 mb-3">Academic Experts</h3>
                        <p className="text-gray-600">Workshops and lectures by renowned professors and researchers from top institutions.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mentors;
