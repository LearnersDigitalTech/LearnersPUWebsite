'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '../../../context/LanguageContext';

export default function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t } = useLanguage();

    const getCourseData = (slug: string) => {
        const data: Record<string, any> = {
            'neet': {
                title: t('neet-title'),
                subtitle: t('neet-subtitle'),
                image: '/resources/neet-prep.jpg',
                description: t('neet-desc'),
                highlights: [
                    t('neet-h1'),
                    t('neet-h2'),
                    t('neet-h3'),
                    t('neet-h4'),
                    t('neet-h5'),
                    t('neet-h6')
                ],
                successMetrics: [
                    '92% ' + t('stat-success') + ' in 2023',
                    'Average score improvement: 35%',
                    '15 students in top 1000 ranks',
                    'AIIMS admissions: 8 students'
                ],
                fee: '₹1,50,000 (Installment options available)',
                includes: 'Study materials, online resources, test series, lab access',
                duration: t('years-2'),
                successRate: '92%',
                category: t('stream-medical'),
                categoryColor: 'bg-green-100 text-green-800'
            },
            'iit-jee': {
                title: t('iit-jee-title'),
                subtitle: t('iit-jee-subtitle'),
                image: '/resources/iit-jee-study.jpg',
                description: t('iit-jee-desc'),
                highlights: [
                    'Advanced Mathematics, Physics, Chemistry',
                    'IIT alumni as faculty members',
                    'Problem-solving intensive sessions',
                    'Regular competitive assessments',
                    'Previous years question paper analysis',
                    'Time management strategies'
                ],
                successMetrics: [
                    '89% ' + t('stat-success') + ' in 2023',
                    '12 students in top 1000 ranks',
                    'Average score improvement: 40%',
                    'IIT admissions: 28 students'
                ],
                fee: '₹1,75,000 (Installment options available)',
                includes: 'Study materials, online resources, test series, doubt sessions',
                duration: t('years-2'),
                successRate: '89%',
                category: t('stream-engineering'),
                categoryColor: 'bg-blue-100 text-blue-800'
            },
            'cet': {
                title: t('cet-title'),
                subtitle: t('cet-subtitle'),
                image: '/resources/sat-classroom.jpg',
                description: t('cet-desc'),
                highlights: [
                    'State-specific curriculum coverage',
                    'Expert faculty with CET experience',
                    'Pattern-based mock tests',
                    'Time management strategies',
                    'Focus on speed and accuracy',
                    'Regular parent-teacher meetings'
                ],
                successMetrics: [
                    '94% ' + t('stat-success') + ' in 2023',
                    '45 students in top 1000 ranks',
                    'Average score improvement: 38%',
                    'Engineering admissions: 156 students'
                ],
                fee: '₹1,25,000 (Installment options available)',
                includes: 'Study materials, online resources, test series',
                duration: t('years-1-2'),
                successRate: '94%',
                category: t('stream-state'),
                categoryColor: 'bg-purple-100 text-purple-800'
            },
            'sat': {
                title: t('sat-title'),
                subtitle: t('sat-subtitle'),
                image: '/resources/sat-classroom.jpg',
                description: t('sat-desc'),
                highlights: [
                    'Evidence-based Reading and Writing',
                    'Advanced Math concepts',
                    'Essay writing strategies',
                    'Test-taking techniques',
                    'Vocabulary building',
                    'Full-length practice tests'
                ],
                successMetrics: [
                    '96% ' + t('stat-success') + ' in 2023',
                    '5 perfect scores (1600/1600)',
                    'Average score improvement: 200+ points',
                    'Ivy League admissions: 12 students'
                ],
                fee: '₹80,000 (Flexible scheduling available)',
                includes: 'Study materials, online resources, practice tests, counseling',
                duration: t('months-6-12'),
                successRate: '96%',
                category: t('stream-international'),
                categoryColor: 'bg-red-100 text-red-800'
            }
        };
        return data[slug];
    };

    const course = getCourseData(slug);

    if (!course) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image src={course.image} alt={course.title} fill className="object-cover" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <Link href="/#streams" className="text-blue-200 hover:text-white transition-colors flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                {t('back-to-streams')}
                            </Link>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${course.categoryColor.replace('bg-', 'bg-opacity-20 bg-').replace('text-', 'text-white ')} border border-white/20`}>
                                {course.category}
                            </span>
                        </div>
                        <h1 className="font-display text-5xl font-bold mb-6">{course.title}</h1>
                        <p className="text-xl text-blue-100 mb-8">{course.description}</p>
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{t('duration')}: {course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{t('stat-success')}: {course.successRate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Highlights */}
                            <div>
                                <h2 className="font-display text-3xl font-bold text-blue-900 mb-6">{t('program-highlights')}</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {course.highlights.map((highlight: string, index: number) => (
                                        <div key={index} className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                                            <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Success Metrics */}
                            <div>
                                <h2 className="font-display text-3xl font-bold text-blue-900 mb-6">{t('success-metrics')}</h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {course.successMetrics.map((metric: string, index: number) => (
                                        <div key={index} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-800 font-medium">{metric}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                                <h3 className="font-display text-xl font-bold text-blue-900 mb-6">{t('course-details')}</h3>

                                <div className="space-y-6 mb-8">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">{t('annual-fee')}</p>
                                        <p className="text-2xl font-bold text-blue-900">{course.fee}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">{t('course-inclusions')}</p>
                                        <p className="text-gray-700">{course.includes}</p>
                                    </div>
                                </div>

                                <Link href="/connect" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                                    {t('enroll-now')}
                                </Link>
                                <Link href="/connect" className="block w-full border-2 border-blue-600 text-blue-600 text-center py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                    {t('download-brochure')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
