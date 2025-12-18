'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Events = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl font-bold text-sky-800 mb-4">{t('section-events')}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Stay updated with our latest events, workshops, and cultural programs designed to enhance holistic development.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="bg-sky-50 p-4 rounded-lg mb-4">
                            <div className="text-2xl font-bold text-sky-800">15</div>
                            <div className="text-sm text-gray-600">December 2023</div>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-sky-800 mb-2">Science Exhibition</h3>
                        <p className="text-gray-600 mb-4">Annual science exhibition showcasing innovative projects by our students.</p>
                        <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                            </svg>
                            9:00 AM - 4:00 PM
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="bg-orange-50 p-4 rounded-lg mb-4">
                            <div className="text-2xl font-bold text-orange-900">22</div>
                            <div className="text-sm text-gray-600">December 2023</div>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-sky-800 mb-2">Cultural Fest</h3>
                        <p className="text-gray-600 mb-4">Annual cultural festival with performances, competitions, and celebrations.</p>
                        <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                            </svg>
                            10:00 AM - 6:00 PM
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="bg-green-50 p-4 rounded-lg mb-4">
                            <div className="text-2xl font-bold text-green-900">28</div>
                            <div className="text-sm text-gray-600">December 2023</div>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-sky-800 mb-2">Parent-Teacher Meet</h3>
                        <p className="text-gray-600 mb-4">Quarterly parent-teacher meeting to discuss student progress and development.</p>
                        <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                            </svg>
                            2:00 PM - 5:00 PM
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Events;
