'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import anime from 'animejs';
import { useLanguage } from '../../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    const [expandedFaculty, setExpandedFaculty] = useState<number | null>(null);

    const facultyData = [
        {
            id: 1,
            name: "Ms Trupthi G",
            position: "Physics Faculty",
            qualification: "BE",
            experience: "Experienced",
            specialization: "Board, CET, NEET, JEE",
            achievements: "Driven by curiosity",
            image: "/faculty/trupti.png",
            description: "An engineer by qualification, a physicist by passion. Devoted to the beauty of Physics."
        },
        {
            id: 2,
            name: "Mr Madhu Kumar",
            position: "Biology Faculty",
            qualification: "MSc Bioscience",
            experience: "Experienced",
            specialization: "PU Board, KCET, NEET, Olympiad",
            achievements: "Olympiad Trainer",
            image: "/faculty/madhu%20kumar%20%5BBIology-%20PU%20Board%2C%20KCET%2C%20NEET%2C%20%26%208%2C9%2C10%20Olympiad%5D.jpg",
            description: "Facilitate student learning in Biological science. Motivate them to explore our living world with wonder."
        },
        {
            id: 3,
            name: "Mahadeva Swamy M B",
            position: "Senior Biology Lecturer",
            qualification: "M Sc., M Phil.",
            experience: "20+ years",
            specialization: "Biology, Board, CET, NEET",
            achievements: "Senior Lecturer",
            image: "/faculty/mahadevswamy.jpeg",
            description: "Working as Senior Biology Lecturer for more than 20 years."
        },
        {
            id: 4,
            name: "Ms Deeparani M R",
            position: "Faculty",
            qualification: "M.Sc., B.Ed",
            experience: "Experienced",
            specialization: "Board, CET, NEET, Remedial",
            achievements: "Dedicated Educator",
            image: "",
            description: "Dedicated and hard working, calm and composed. Love to learn."
        },
        {
            id: 5,
            name: "Ms. Maitri Haveri",
            position: "Physics Faculty",
            qualification: "M.Sc, M.Phil, KSET",
            experience: "Experienced",
            specialization: "Physics Board, CET, NEET, JEE",
            achievements: "KSET Qualified",
            image: "/faculty/maitri.jpeg",
            description: "Deeply enthusiastic about the subject and committed to cultivating a supportive learning environment."
        },
        {
            id: 6,
            name: "Ms. Lavanya A J",
            position: "Physics Faculty",
            qualification: "MSc Physics",
            experience: "Experienced",
            specialization: "Board, CET",
            achievements: "Motivator",
            image: "/faculty/lavanya.png",
            description: "Motivate students to achieve their best."
        },
        {
            id: 7,
            name: "Divyananda P",
            position: "Mathematics Faculty",
            qualification: "MSC, M PHIL, PHD",
            experience: "Experienced",
            specialization: "Mathematics",
            achievements: "PhD Holder",
            image: "/faculty/divyanand.png",
            description: "Skilled motivator and teacher who inspires respect. Focuses on making learning simple and engaging."
        },
        {
            id: 8,
            name: "Aishwaryalakshmi P A",
            position: "Mathematics Lecturer",
            qualification: "Msc, B. Ed",
            experience: "Experienced",
            specialization: "Mathematics - Boards & CET",
            achievements: "Dedicated Lecturer",
            image: "/faculty/AISHWARYA%20LAKSHMI%20P%20A%20%5BMathematics%20(boards%20%26%20CET)%20%5D.JPG",
            description: "Believes learning becomes powerful when it’s meaningful. Guides students in seeing mathematics as a tool for reasoning."
        },
        {
            id: 9,
            name: "Ms Divyarani G S",
            position: "Chemistry Faculty",
            qualification: "M Sc",
            experience: "15 years",
            specialization: "Chemistry - Board, CET, NEET, JEE",
            achievements: "15 Years Experience",
            image: "/faculty/divyarani.png",
            description: "Lunar Chemist. Wants to spread the importance of Chemistry to the younger generation."
        },
        {
            id: 10,
            name: "Lakshmi B M",
            position: "Kannada Lecturer",
            qualification: "MA (KANNADA), D.Ed., B.Ed, KSET, NET",
            experience: "Experienced",
            specialization: "Kannada",
            achievements: "NET/KSET Qualified",
            image: "/faculty/lakshmi.png",
            description: "Introduces the beauty, culture and literature of the language to the students."
        }
    ];

    useEffect(() => {
        // Animate faculty cards on scroll
        const facultyCards = document.querySelectorAll('.faculty-card');
        facultyCards.forEach((card, index) => {
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

    const toggleFacultyDetails = (id: number) => {
        if (expandedFaculty === id) {
            setExpandedFaculty(null);
        } else {
            setExpandedFaculty(id);
        }
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="font-display text-5xl font-bold text-blue-900 mb-6">{t('about-title')}</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('about-desc')}
                        </p>
                    </div>
                </div>
            </section>

            {/* School Overview */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-display text-4xl font-bold text-blue-900 mb-6">{t('mission-vision-title')}</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-xl text-blue-900 mb-3">{t('mission-title')}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {t('mission-desc')}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl text-blue-900 mb-3">{t('vision-title')}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {t('vision-desc')}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xl text-blue-900 mb-3">{t('values-title')}</h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Excellence in Academic and Personal Development</li>
                                        <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Innovation and Continuous Learning</li>
                                        <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Integrity and Ethical Conduct</li>
                                        <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Respect for Diversity and Inclusion</li>
                                        <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Social Responsibility and Community Service</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-96 w-full">
                            <Image src="/resources/faculty-team.jpg" alt="Learners PU College Faculty Team" fill className="rounded-2xl shadow-2xl object-cover" />
                            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-2xl shadow-xl">
                                <div className="text-center">
                                    <div className="text-3xl font-bold">25+</div>
                                    <div className="text-sm">Years of Excellence</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Principal's Message */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl font-bold text-blue-900 mb-4">{t('principal-msg-title')}</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            A message from our esteemed principal about the school's commitment to educational excellence.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="grid lg:grid-cols-3 gap-8 items-center">
                            <div className="lg:col-span-1 text-center">
                                <div className="relative w-full h-64 mb-4">
                                    <Image src="/faculty/principal.jpeg" alt="Principal" fill className="object-cover rounded-lg" />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-blue-900">Smt. Madhavi Lata. R</h3>
                                <p className="text-gray-600">Principal & Academic Director</p>
                                <p className="text-sm text-gray-500">MSc in Computer Science</p>
                            </div>
                            <div className="lg:col-span-2">
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>
                                        Dear Students, Parents, and Well-wishers,
                                    </p>
                                    <p>
                                        It is with great pride and enthusiasm that I welcome you to Learners PU College.
                                        As we embark on another academic year, I am filled with optimism and excitement about
                                        the journey ahead.
                                    </p>
                                    <p>
                                        At Learners PU College, we believe that education is not merely about acquiring knowledge, but about
                                        developing the ability to think critically, solve problems creatively, and contribute
                                        meaningfully to society. Our commitment to excellence is reflected in every aspect of
                                        our institution - from our dedicated faculty to our state-of-the-art facilities.
                                    </p>
                                    <p>
                                        Our students consistently achieve outstanding results in competitive examinations, but
                                        more importantly, they develop into well-rounded individuals with strong values,
                                        leadership qualities, and a passion for lifelong learning.
                                    </p>
                                    <p>
                                        I invite you to explore our website and discover what makes Learners PU College a unique place for
                                        learning and growth. Together, we can build a brighter future for our students and
                                        our community.
                                    </p>
                                    <div className="mt-6">
                                        <p className="font-semibold text-blue-900">Smt. Madhavi Lata. R</p>
                                        <p className="text-gray-500">Principal, Learners PU College</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Faculty Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl font-bold text-blue-900 mb-4">{t('faculty-title')}</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Meet our dedicated team of experienced educators who are passionate about teaching and committed to student success.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facultyData.map(faculty => (
                            <div
                                key={faculty.id}
                                className="faculty-card bg-white rounded-2xl p-6 shadow-lg cursor-pointer transform transition-all"
                                onClick={() => toggleFacultyDetails(faculty.id)}
                            >
                                <div className="text-center mb-4">
                                    <div className="relative w-24 h-24 mx-auto mb-4">
                                        {faculty.image ? (
                                            <Image src={faculty.image} alt={faculty.name} fill className="rounded-full object-cover object-top" />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold text-2xl border-2 border-blue-200">
                                                {faculty.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-display text-xl font-semibold text-blue-900">{faculty.name}</h3>
                                    <p className="text-orange-500 font-medium">{faculty.position}</p>
                                    <p className="text-gray-600 text-sm">{faculty.experience} Experience</p>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Qualification:</span>
                                        <span className="text-gray-700 font-medium">{faculty.qualification}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Specialization:</span>
                                        <span className="text-gray-700 font-medium">{faculty.specialization}</span>
                                    </div>
                                </div>

                                <div
                                    className={`mt-4 pt-4 border-t border-gray-200 overflow-hidden transition-all duration-300 ${expandedFaculty === faculty.id ? 'max-h-[500px]' : 'max-h-0'}`}
                                >
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">Achievements</h4>
                                            <p className="text-gray-600 text-sm">{faculty.achievements}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">About</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">{faculty.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mandatory Disclosures */}
            {/* 
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl font-bold text-blue-900 mb-4">{t('disclosures-title')}</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Transparent information about our school's compliance with educational regulations and standards.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg text-blue-900 mb-3">Recognition & Affiliation</h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Recognized by State Education Department</li>
                                        <li>• Affiliated to CBSE (Affiliation No: 1234567)</li>
                                        <li>• ISO 9001:2015 Certified Institution</li>
                                        <li>• Member of National Council of Educational Institutions</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg text-blue-900 mb-3">Infrastructure Compliance</h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Fire Safety Certificate (Valid till 2025)</li>
                                        <li>• Building Safety Certificate (Valid till 2026)</li>
                                        <li>• Health & Sanitation Certificate (Valid till 2024)</li>
                                        <li>• Environmental Clearance Certificate</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg text-blue-900 mb-3">Faculty Qualifications</h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• 100% faculty with minimum Bachelor's Degree</li>
                                        <li>• 85% faculty with Master's Degree or higher</li>
                                        <li>• All faculty with B.Ed or equivalent teaching qualification</li>
                                        <li>• Regular professional development programs</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg text-blue-900 mb-3">Financial Information</h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Audited financial statements available</li>
                                        <li>• Fee structure approved by regulatory authorities</li>
                                        <li>• Scholarship programs for meritorious students</li>
                                        <li>• Transparent fee refund policy</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold text-lg text-blue-900 mb-3">Academic Performance</h3>
                            <div className="grid md:grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-blue-900">95.2%</div>
                                    <div className="text-sm text-gray-600">Overall Pass Percentage (2023)</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-900">89%</div>
                                    <div className="text-sm text-gray-600">First Division Percentage</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-900">156</div>
                                    <div className="text-sm text-gray-600">Students in Merit List</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
             */}


        </div>
    );
};

export default About;
