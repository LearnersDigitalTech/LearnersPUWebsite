'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import anime from 'animejs';

const Courses = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

    useEffect(() => {
        // Animate cards on scroll
        const cards = document.querySelectorAll('.course-card');
        cards.forEach((card, index) => {
            anime({
                targets: card,
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 600,
                delay: index * 100,
                easing: 'easeOutQuart'
            });
        });
    }, []);

    const openAdmissionForm = (course: string) => {
        setSelectedCourse(course);
        setModalOpen(true);
    };

    const closeAdmissionModal = () => {
        setModalOpen(false);
        setSelectedCourse(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Application submitted successfully! We will contact you soon.');
        closeAdmissionModal();
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="font-display text-5xl font-bold text-blue-900 mb-6">Courses & Admissions</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore our comprehensive range of courses designed to excel in competitive examinations
                            and build strong foundations for your academic journey.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Streams - Premium Redesign (Light Theme) */}
            <section className="py-24 relative overflow-hidden bg-white">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/resources/grid-pattern.png')] opacity-[0.03]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-sm mb-3 block">Academic Excellence</span>
                        <h2 className="font-display text-5xl md:text-6xl font-bold text-slate-900 mb-6 drop-shadow-sm">
                            Our Main Streams
                        </h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mb-8 shadow-sm"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                            Core combinations designed to forge future leaders. Choose your path to success with our premium integrated programs.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* PCMB Card */}
                        <div id="pcmb" className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                            <div className="relative h-full bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-blue-200 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-blue-100">
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                                    <Image
                                        src="/lab/pcmb.jpeg"
                                        alt="PCMB Stream"
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-4 left-6 z-20">
                                        <h3 className="text-4xl font-bold text-white mb-1">PCMB</h3>
                                        <p className="text-blue-100 text-sm font-medium tracking-wide">Physics • Chemistry • Mathematics • Biology</p>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                        The ultimate versatile combination unlocking doors to both <span className="text-blue-700 font-semibold">Medical</span> and <span className="text-blue-700 font-semibold">Engineering</span> careers. Perfect for ambitious students keeping all premium options open.
                                    </p>
                                    <ul className="space-y-4 mb-8">
                                        {[
                                            'Integrated CET & NEET Coaching',
                                            'State-of-the-art Lab Access',
                                            'Dual Career Pathway Guidance'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700">
                                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-3 text-blue-600">
                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => openAdmissionForm('pcmb')}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform active:scale-[0.98]"
                                    >
                                        Apply for PCMB
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* PCMC Card */}
                        <div id="pcmc" className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                            <div className="relative h-full bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-blue-200 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-blue-100">
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                                    <Image
                                        src="/lab/pcmc.jpeg"
                                        alt="PCMC Stream"
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-4 left-6 z-20">
                                        <h3 className="text-4xl font-bold text-white mb-1">PCMC</h3>
                                        <p className="text-blue-100 text-sm font-medium tracking-wide">Physics • Chemistry • Mathematics • Comp. Sci</p>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                        Architect the future with this tech-focused stream. The premier choice for aspiring <span className="text-blue-700 font-semibold">Engineers</span> and <span className="text-blue-700 font-semibold">Innovators</span> looking to dominate the digital era.
                                    </p>
                                    <ul className="space-y-4 mb-8">
                                        {[
                                            'Integrated JEE & CET Coaching',
                                            'Advanced Coding & AI Labs',
                                            'Logical Reasoning Mastery'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-700">
                                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-3 text-blue-600">
                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => openAdmissionForm('pcmc')}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform active:scale-[0.98]"
                                    >
                                        Apply for PCMC
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Math Foundation Course */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl font-bold text-blue-900 mb-4">Math Foundation Course</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Build a strong mathematical foundation essential for all competitive examinations and advanced studies.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative w-full h-96">
                            <Image src="/classrooms/math_foundation.jpeg" alt="Math Foundation Course" fill className="rounded-2xl shadow-2xl object-cover" />
                        </div>
                        <div className="space-y-6">
                            <div className="bg-blue-50 p-6 rounded-2xl">
                                <h3 className="font-display text-2xl font-semibold text-blue-900 mb-4">Course Highlights</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-sky-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-gray-700">Comprehensive coverage of mathematical concepts</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-sky-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-gray-700">Problem-solving techniques and shortcuts</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-sky-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-gray-700">Regular assessments and progress tracking</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-sky-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-gray-700">Individual attention and doubt clearing</span>
                                    </div>
                                </div>
                            </div>



                            <button onClick={() => openAdmissionForm('math-foundation')} className="w-full bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors duration-300">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Catalog */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-40 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
                    <div className="absolute bottom-40 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-30"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-sky-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Choose Your Path</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">Complete Course Catalog</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full mb-6"></div>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Choose from our comprehensive range of courses designed for various competitive examinations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                id: 'neet',
                                title: 'NEET Preparation',
                                badge: 'Medical',
                                badgeColor: 'emerald',
                                desc: 'Comprehensive preparation for medical entrance examinations with expert faculty and advanced lab facilities.',
                                duration: '2 Years',
                                // success: '92%',
                                image: '/classrooms/Photo 14.jpg'
                            },
                            {
                                id: 'iit-jee',
                                title: 'IIT-JEE Preparation',
                                badge: 'Engineering',
                                badgeColor: 'blue',
                                desc: 'Rigorous training for engineering entrance exams with focus on problem-solving and analytical skills.',
                                duration: '2 Years',
                                // success: '89%',
                                image: '/classrooms/iitjee.jpeg'
                            },
                            {
                                id: 'cet',
                                title: 'CET Preparation',
                                badge: 'State Level',
                                badgeColor: 'purple',
                                desc: 'Specialized coaching for Common Entrance Test with state-specific curriculum and pattern.',
                                duration: '1-2 Years',
                                // success: '94%',
                                image: '/classrooms/cet.jpeg'
                            },
                            {
                                id: 'sat',
                                title: 'SAT Preparation',
                                badge: 'International',
                                badgeColor: 'rose',
                                desc: 'Global standard test preparation for undergraduate admissions in international universities.',
                                duration: '6-12 Months',
                                // success: '96%',
                                image: '/classrooms/sat.jpeg'
                            },
                            {
                                id: 'foundation',
                                title: 'Foundation Course',
                                badge: 'Class 8-10',
                                badgeColor: 'indigo',
                                desc: 'Early preparation program for students from classes 8-10 to build strong conceptual foundations.',
                                duration: '1-3 Years',
                                // success: '98%',
                                image: '/classrooms/foundational.jpeg'
                            },
                            {
                                id: 'crash',
                                title: 'Crash Course',
                                badge: 'Intensive',
                                badgeColor: 'amber',
                                desc: 'Intensive revision program for last-minute preparation and quick concept review.',
                                duration: '3 Months',
                                // success: '85%',
                                image: '/classrooms/crashcourse.jpeg'
                            }
                        ].map((course) => (
                            <div key={course.id} className="group bg-white rounded-3xl p-4 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col h-full">
                                <div className="mb-5 relative w-full h-56 overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute top-3 right-3 z-20">
                                        <span className={`backdrop-blur-md bg-white/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide text-${course.badgeColor}-600`}>
                                            {course.badge}
                                        </span>
                                    </div>
                                </div>

                                <div className="px-2 pb-2 flex-grow flex flex-col">
                                    <h3 className="font-display text-2xl font-bold text-slate-800 mb-3 group-hover:text-sky-700 transition-colors duration-300">
                                        {course.title}
                                    </h3>

                                    <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
                                        {course.desc}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-100">
                                        <div>
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Duration</span>
                                            <span className="font-medium text-slate-700">{course.duration}</span>
                                        </div>
                                        {/* <div>
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Success Rate</span>
                                            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">{course.success}</span>
                                        </div> */}
                                    </div>

                                    <button
                                        onClick={() => openAdmissionForm(course.id)}
                                        className="w-full bg-slate-900 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-sky-600 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-sky-200 flex items-center justify-center group/btn mt-auto"
                                    >
                                        <span>Apply Now</span>
                                        <svg className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>





            {/* Admission Form Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-display text-2xl font-bold text-blue-900">Admission Application</h3>
                                <button onClick={closeAdmissionModal} className="text-gray-500 hover:text-gray-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                        <input type="text" name="firstName" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                        <input type="text" name="lastName" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input type="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                                        <input type="tel" name="phone" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Preference *</label>
                                    <select name="course" defaultValue={selectedCourse || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option value="pcmb">PCMB (Physics, Chemistry, Maths, Biology)</option>
                                        <option value="pcmc">PCMC (Physics, Chemistry, Maths, CS)</option>
                                        <option value="neet">NEET Preparation</option>
                                        <option value="iit-jee">IIT-JEE Preparation</option>
                                        <option value="cet">CET Preparation</option>
                                        <option value="sat">SAT Preparation</option>
                                        <option value="foundation">Foundation Course</option>
                                        <option value="crash">Crash Course</option>
                                        <option value="math-foundation">Math Foundation</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Grade/Class</label>
                                    <input type="text" name="grade" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                                    <textarea name="message" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button type="button" onClick={closeAdmissionModal} className="mr-4 px-6 py-2 text-gray-600 hover:text-gray-800 font-medium">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">Submit Application</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
