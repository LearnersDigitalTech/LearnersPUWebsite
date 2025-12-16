'use client';

import React, { useState } from 'react';

type PositionType = 'mathematics-faculty' | 'biology-teacher' | 'academic-counselor' | 'general-application';

const Careers = () => {
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleCareerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        
        try {
            const formData = new FormData();
            
            // Add form fields
            formData.append('fullName', (form.elements.namedItem('fullName') as HTMLInputElement).value);
            formData.append('email', (form.elements.namedItem('email') as HTMLInputElement).value);
            formData.append('phone', (form.elements.namedItem('phone') as HTMLInputElement).value);
            formData.append('position', (form.elements.namedItem('position') as HTMLSelectElement).value);
            formData.append('experience', (form.elements.namedItem('experience') as HTMLSelectElement).value);
            formData.append('currentSalary', (form.elements.namedItem('currentSalary') as HTMLInputElement).value);
            formData.append('qualification', (form.elements.namedItem('qualification') as HTMLInputElement).value);
            formData.append('coverLetter', (form.elements.namedItem('coverLetter') as HTMLTextAreaElement).value);
            
            // Add file if selected
            const resumeFile = (form.elements.namedItem('resume') as HTMLInputElement).files?.[0];
            if (resumeFile) {
                formData.append('resume', resumeFile);
            }

            const response = await fetch('http://localhost:5000/api/careers', {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Response:", result);
                showNotification('Application submitted successfully! We will review and get back to you soon.', 'success');
                form.reset();
            } else {
                const error = await response.json();
                console.error("Error response:", error);
                showNotification(error.error || "Failed to submit application. Try again!", "error");
            }
        } catch (error) {
            console.error("Error submitting application:", error);
            showNotification("Failed to submit application. Try again!", "error");
        }
    };

    return (
        <div className="bg-white relative">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-24 right-4 z-[100] p-4 rounded-lg shadow-lg text-white transform transition-all duration-300 ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`}>
                    {notification.message}
                </div>
            )}

            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="font-display text-5xl font-bold text-blue-900 mb-6">Career Opportunities</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Join our team of passionate educators and contribute to shaping the future of education.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Latest Openings & Application Form */}
                        <div>
                            <h2 className="font-display text-3xl font-bold text-blue-900 mb-8">Latest Openings</h2>
                            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">
                                <h3 className="font-display text-xl font-semibold text-blue-900 mb-6">Apply Now</h3>
                                <form onSubmit={handleCareerSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                            <input type="text" name="fullName" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                            <input type="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white" />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                            <input type="tel" name="phone" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Position Applied For *</label>
                                            <select name="position" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
                                                <option value="">Select Position</option>
                                                <option value="mathematics-faculty">Senior Mathematics Faculty</option>
                                                <option value="biology-teacher">Biology Teacher</option>
                                                <option value="academic-counselor">Academic Counselor</option>
                                                <option value="general-application">General Application</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Total Experience *</label>
                                            <select name="experience" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
                                                <option value="">Select Experience</option>
                                                <option value="0-2">0-2 years</option>
                                                <option value="2-5">2-5 years</option>
                                                <option value="5-10">5-10 years</option>
                                                <option value="10+">10+ years</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Current/Last Salary</label>
                                            <input type="text" name="currentSalary" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white" placeholder="e.g., ₹5,00,000 per annum" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Highest Qualification *</label>
                                        <input type="text" name="qualification" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white" placeholder="e.g., M.Sc Mathematics, B.Ed" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter *</label>
                                        <textarea name="coverLetter" rows={4} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white" placeholder="Tell us why you're interested in this position and what makes you a good fit..."></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Resume Upload</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-white">
                                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                            </svg>
                                            <p className="text-gray-600 mb-2">Upload your resume (PDF, DOC, DOCX)</p>
                                            <button type="button" onClick={() => document.getElementById('resumeUpload')?.click()} className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
                                                Choose File
                                            </button>
                                            <input type="file" id="resumeUpload" name="resume" accept=".pdf,.doc,.docx" className="hidden" />
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <input type="checkbox" name="terms" required className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                        <label className="ml-2 block text-sm text-gray-700">
                                            I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a>
                                        </label>
                                    </div>

                                    <button type="submit" className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                                        Submit Application
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Why Work with Us */}
                        <div>
                            <h3 className="font-display text-2xl font-semibold text-blue-900 mb-6">Why Work with Us</h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg text-blue-900 mb-2">Competitive Compensation</h4>
                                        <p className="text-gray-600 text-sm">Industry-leading salary packages with performance bonuses and annual increments.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg text-blue-900 mb-2">Supportive Environment</h4>
                                        <p className="text-gray-600 text-sm">Collaborative work culture with continuous learning and professional development opportunities.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg text-blue-900 mb-2">Growth Opportunities</h4>
                                        <p className="text-gray-600 text-sm">Clear career progression paths with leadership development and training programs.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                                        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12V6H4v10h12z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg text-blue-900 mb-2">Modern Facilities</h4>
                                        <p className="text-gray-600 text-sm">State-of-the-art classrooms, labs, and technology to support effective teaching.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
