import { useState } from 'react';
import { StaggeredReveal } from "../utils/utils";

const LandingPage: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="bg-white">
            {/* Navigation Bar */}
            <div className='bg-blue-600'>
                <StaggeredReveal>
                    <nav>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center px-15 py-4 md:py-6">
                                {/* Logo */}
                                <a href="/" className="text-xl md:text-2xl font-bold text-white">
                                    GradeGenie
                                </a>

                                {/* Desktop Menu */}
                                <div className="hidden md:flex space-x-8">
                                    <a href="#features" className="text-white hover:text-gray-200 transition duration-200">Features</a>
                                    <a href="#benefits" className="text-white hover:text-gray-200 transition duration-200">Benefits</a>
                                    <a href="#how-it-works" className="text-white hover:text-gray-200 transition duration-200">How It Works</a>
                                    <a href="#testimonials" className="text-white hover:text-gray-200 transition duration-200">Testimonials</a>
                                </div>

                                {/* Desktop Buttons */}
                                <div className="hidden md:flex space-x-4">
                                    <a href="#" className="bg-white hover:bg-blue-700 text-blue-600 font-medium px-5 py-2 rounded-full transition duration-200">
                                        Login
                                    </a>
                                    <a href="#" className="bg-white hover:bg-blue-700 text-blue-600 font-medium px-5 py-2 rounded-full transition duration-200">
                                        Sign Up
                                    </a>
                                </div>

                                {/* Mobile Menu Button */}
                                <button 
                                    className="md:hidden text-white focus:outline-none"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                >
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                            <div className="container mx-auto px-4 pt-4 pb-6 bg-blue-700">
                                <div className="flex flex-col space-y-4">
                                    <a href="#features" className="text-white hover:text-gray-200 transition duration-200 text-lg">Features</a>
                                    <a href="#benefits" className="text-white hover:text-gray-200 transition duration-200 text-lg">Benefits</a>
                                    <a href="#how-it-works" className="text-white hover:text-gray-200 transition duration-200 text-lg">How It Works</a>
                                    <a href="#testimonials" className="text-white hover:text-gray-200 transition duration-200 text-lg">Testimonials</a>
                                    <div className="flex flex-col space-y-4 mt-4">
                                        <a href="#" className="bg-white hover:bg-blue-700 text-blue-600 font-medium px-5 py-3 rounded-xl transition duration-200 text-center">
                                            Login
                                        </a>
                                        <a href="#" className="bg-white hover:bg-blue-700 text-blue-600 font-medium px-5 py-3 rounded-xl transition duration-200 text-center">
                                            Sign Up
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                {/* Hero Section */}
                
                    <section className=" py-16 md:py-24">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8">
                                The AI-Powered Grading Assistant
                            </h1>
                            <p className="text-lg md:text-xl text-white mb-8 md:mb-10 max-w-3xl mx-auto">
                                Streamline assignments, track submissions, and save hours of grading time with AI-powered automation
                            </p>
                            <button className="bg-white text-blue-600 font-semibold px-8 md:px-12 py-4 md:py-5 rounded-full hover:bg-blue-50 transition duration-200 shadow-md">
                                Get Started for Free
                            </button>
                        </div>
                    </section>
                </StaggeredReveal>
            </div>
            {/* Features Section */}
            <section className="py-16 text-center md:py-24">
                <div className="container items-center mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-12 md:mb-16">
                        Why Teachers Love Us
                    </h2>
                    
                    <div className="grid px-20 items-center grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* Feature 1 */}
                        <div className="p-6 md:p-8 rounded-2xl text-center bg-gray-50 hover:bg-gray-100 transition duration-200">
                            <div className="flex justify-center mb-6">
                                <svg className="h-12 w-12 md:h-14 md:w-14 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Create Assignments</h3>
                            <p className="text-gray-600">
                                Design interactive assignments with rich text, file uploads, and automatic deadline tracking
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="p-6 md:p-8 rounded-2xl text-center bg-gray-50 hover:bg-gray-100 transition duration-200">
                            <div className="flex justify-center mb-6">
                                <svg className="h-12 w-12 md:h-14 md:w-14 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Organize & Track</h3>
                            <p className="text-gray-600">
                                Centralize submissions, grades, and feedback in one intuitive dashboard
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="p-6 md:p-8 rounded-2xl text-center bg-gray-50 hover:bg-gray-100 transition duration-200">
                            <div className="flex justify-center mb-6">
                                <svg className="h-12 w-12 md:h-14 md:w-14 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Instant Feedback</h3>
                            <p className="text-gray-600">
                                Generate AI-powered suggestions and plagiarism checks in real-time
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 md:mb-16">
                        Simple 3-Step Process
                    </h2>
                    <div className="grid grid-cols-1 px-12 md:grid-cols-3 gap-8 md:gap-12">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-blue-600 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-md">
                                    1
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Create Assignment</h3>
                            <p className="text-gray-600 px-4 md:px-8">
                                Build customized assignments with multimedia content and automatic deadlines
                            </p>
                        </div>
                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-blue-600 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-md">
                                    2
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Share Link</h3>
                            <p className="text-gray-600 px-4 md:px-8">
                                Distribute unique submission links through your LMS or email
                            </p>
                        </div>
                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-blue-600 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-md">
                                    3
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Collect & Grade</h3>
                            <p className="text-gray-600 px-4 md:px-8">
                                Review submissions with AI assistance and automated grading tools
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
                        Ready to Revolutionize Your Grading?
                    </h2>
                    <button className="bg-white text-blue-600 font-semibold px-8 md:px-12 py-4 md:py-5 rounded-full hover:bg-blue-50 transition duration-200 shadow-md">
                        Start Free Trial
                    </button>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;