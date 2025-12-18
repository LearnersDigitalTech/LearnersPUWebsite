'use client';

import React, { useState } from 'react';
import Image from 'next/image';


// Types
type InquiryType = 'admission' | 'course' | 'fee' | 'scholarship' | 'facility' | 'other';

const Connect = () => {
    // State
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);



    // Notification helper
    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Form Handlers

    const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        setIsSubmitting(true);

        try {
            const formData = {
                type: 'inquiry',
                firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
                lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
                email: (form.elements.namedItem('email') as HTMLInputElement).value,
                phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
                inquiryType: (form.elements.namedItem('inquiryType') as HTMLSelectElement).value,
                message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
                newsletter: (form.elements.namedItem('newsletter') as HTMLInputElement)?.checked ? "Yes" : "No",
            };

            const response = await fetch('/api/proxy', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.result === 'success') {
                    showNotification('Message sent successfully! We will contact you within 24 hours.', 'success');
                    form.reset();
                } else {
                    showNotification(result.error || "Failed to send message. Try again!", "error");
                }
            } else {
                showNotification("Failed to send message. Try again!", "error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            showNotification("Failed to send message. Try again!", "error");
        } finally {
            setIsSubmitting(false);
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
                        <h1 className="font-display text-5xl font-bold text-blue-900 mb-6">Connect with Us</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Get in touch with us for admissions, career opportunities, or any inquiries.
                            We're here to help you on your educational journey.
                        </p>
                    </div>
                </div>
            </section>



            {/* Inquiry Form */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="font-display text-4xl font-bold text-blue-900 mb-6">Send us a Message</h2>
                            <p className="text-gray-600 mb-8">
                                Have questions about admissions, courses, or anything else? Fill out the form below and we'll get back to you within 24 hours.
                            </p>

                            <form onSubmit={handleInquirySubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                        <input type="text" name="firstName" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                        <input type="text" name="lastName" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                        <input type="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input type="tel" name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type *</label>
                                    <select name="inquiryType" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white">
                                        <option value="">Select Inquiry Type</option>
                                        <option value="admission">Admission Inquiry</option>
                                        <option value="course">Course Information</option>
                                        <option value="fee">Fee Structure</option>
                                        <option value="scholarship">Scholarship Information</option>
                                        <option value="facility">Campus Facilities</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                                    <textarea name="message" rows={5} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white" placeholder="Please describe your inquiry in detail..."></textarea>
                                </div>



                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-300 cursor-pointer ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Processing...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Map and Additional Info */}
                        <div>
                            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                                <h3 className="font-display text-2xl font-semibold text-blue-900 mb-6">Visit Our Campus</h3>
                                <div className="bg-gray-200 h-64 rounded-lg mb-6 overflow-hidden relative">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d463.1090673317082!2d76.615023!3d12.334024!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7af580c40ee3%3A0x24de657c5afc89df!2sLearners%20PU%20College!5e1!3m2!1sen!2sin!4v1766039700102!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Learners PU College Map"
                                    ></iframe>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-900 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-gray-700">Free campus tours available daily</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-900 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-gray-700">Parking facilities available</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-900 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-gray-700">Wheelchair accessible campus</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="font-display text-2xl font-semibold text-blue-900 mb-6">Quick Links</h3>
                                <div className="space-y-3">
                                    <a href="/courses" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        Course Information
                                    </a>
                                    <a href="/courses" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        Scholarship Programs
                                    </a>
                                    <a href="/life-at-lgs" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        Campus Life
                                    </a>
                                    <a href="/about" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        Meet Our Faculty
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Connect;
