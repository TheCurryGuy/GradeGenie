import { useState, useEffect } from "react"
import { Menu, X, Plus, FileText, CheckCircle, Play, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { SlideIn, StaggeredReveal } from "../utils/utils"
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa"
import { IoStatsChart, IoSchool, IoSpeedometer } from "react-icons/io5"

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Navigation Bar */}
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-gradient-to-r from-blue-700 to-purple-700"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <StaggeredReveal>
          <nav>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4 md:py-5">
                {/* Logo */}
                <a
                  href="/"
                  className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${scrolled ? "text-blue-700" : "text-white"}`}
                >
                  GradeGenie
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                  <a
                    href="#features"
                    className={`hover:text-blue-400 transition duration-200 ${scrolled ? "text-gray-700" : "text-white"}`}
                  >
                    Features
                  </a>
                  <a
                    href="#benefits"
                    className={`hover:text-blue-400 transition duration-200 ${scrolled ? "text-gray-700" : "text-white"}`}
                  >
                    Benefits
                  </a>
                  <a
                    href="#how-it-works"
                    className={`hover:text-blue-400 transition duration-200 ${scrolled ? "text-gray-700" : "text-white"}`}
                  >
                    How It Works
                  </a>
                  <a
                    href="#testimonials"
                    className={`hover:text-blue-400 transition duration-200 ${scrolled ? "text-gray-700" : "text-white"}`}
                  >
                    Testimonials
                  </a>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex space-x-4">
                  <a
                    href="#"
                    className={`font-medium px-5 py-2 rounded-full transition duration-200 ${
                      scrolled
                        ? "bg-gray-100 text-blue-600 hover:bg-gray-200"
                        : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                    }`}
                  >
                    Login
                  </a>
                  <a
                    href="#"
                    className="bg-white hover:bg-blue-50 text-blue-600 font-medium px-5 py-2 rounded-full transition duration-200 shadow-sm"
                  >
                    Sign Up
                  </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className={`md:hidden focus:outline-none ${scrolled ? "text-blue-700" : "text-white"}`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: mobileMenuOpen ? "auto" : 0,
                opacity: mobileMenuOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              aria-hidden={!mobileMenuOpen}
            >
              <div className="container mx-auto px-4 pt-2 pb-6 bg-white shadow-lg rounded-b-xl">
                <div className="flex flex-col space-y-4">
                  <a href="#features" className="text-gray-700 hover:text-blue-600 transition duration-200 text-lg">
                    Features
                  </a>
                  <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition duration-200 text-lg">
                    Benefits
                  </a>
                  <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition duration-200 text-lg">
                    How It Works
                  </a>
                  <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition duration-200 text-lg">
                    Testimonials
                  </a>
                  <div className="flex flex-col space-y-4 mt-4">
                    <a
                      href="#"
                      className="bg-gray-100 hover:bg-gray-200 text-blue-600 font-medium px-5 py-3 rounded-xl transition duration-200 text-center"
                    >
                      Login
                    </a>
                    <a
                      href="#"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl transition duration-200 text-center"
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </nav>
        </StaggeredReveal>
      </motion.div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-purple-700 pt-24">
        <StaggeredReveal>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 px-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    The AI-Powered Grading Assistant
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                    Streamline assignments, track submissions, and save hours of grading time with AI-powered automation
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <motion.button
                      className="bg-white text-blue-600 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-blue-50 transition duration-200 shadow-md flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started for Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.button>
                    <motion.button
                      className="bg-transparent border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white/10 transition duration-200 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Watch Demo
                    </motion.button>
                  </div>
                </div>
                <div className="md:w-1/2 px-4">
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-xl"></div>
                    <img
                      src="/placeholder.svg?height=400&width=500"
                      alt="GradeGenie Dashboard Preview"
                      className="rounded-lg shadow-2xl border-4 border-white/20 backdrop-blur-sm w-full h-auto"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </StaggeredReveal>

        {/* Wave Divider */}
        <div className="w-full overflow-hidden">
          <svg className="w-full h-auto" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0L48 8.33333C96 16.6667 192 33.3333 288 41.6667C384 50 480 50 576 41.6667C672 33.3333 768 16.6667 864 8.33333C960 0 1056 0 1152 8.33333C1248 16.6667 1344 33.3333 1392 41.6667L1440 50V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <SlideIn direction="bottom">
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Empowering Educators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <IoStatsChart className="text-4xl text-blue-600 mr-4" />
                  <h3 className="text-xl font-semibold text-gray-800">Time Saved</h3>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">85%</p>
                <p className="text-gray-600">Average reduction in grading time for teachers using GradeGenie</p>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <IoSchool className="text-4xl text-purple-600 mr-4" />
                  <h3 className="text-xl font-semibold text-gray-800">Educators</h3>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">10,000+</p>
                <p className="text-gray-600">Teachers actively using GradeGenie to enhance their grading process</p>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg sm:col-span-2 lg:col-span-1"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <IoSpeedometer className="text-4xl text-green-600 mr-4" />
                  <h3 className="text-xl font-semibold text-gray-800">Accuracy</h3>
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">99.8%</p>
                <p className="text-gray-600">Precision rate of our AI-powered grading assistance</p>
              </motion.div>
            </div>
          </div>
        </section>
      </SlideIn>

      {/* Features Section */}
      <section className="py-16 text-center md:py-24" id="features">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn direction="bottom">
            <div className="max-w-3xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
                FEATURES
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-6">Why Teachers Love Us</h2>
              <p className="text-gray-600 text-lg">
                Our platform is designed by educators, for educators, to make grading faster, more accurate, and less
                stressful.
              </p>
            </div>
          </SlideIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-4 md:px-6">
            <SlideIn direction="left">
              <motion.div
                className="p-6 md:p-8 rounded-2xl text-center bg-gray-50 hover:bg-gray-100 transition duration-200 shadow-sm hover:shadow-md h-full"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Plus className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Create Assignments</h3>
                <p className="text-gray-600">
                  Design interactive assignments with rich text, file uploads, and automatic deadline tracking
                </p>
              </motion.div>
            </SlideIn>

            <SlideIn direction="bottom">
              <motion.div
                className="p-6 md:p-8 rounded-2xl text-center bg-gray-50 hover:bg-gray-100 transition duration-200 shadow-sm hover:shadow-md h-full"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Organize & Track</h3>
                <p className="text-gray-600">Centralize submissions, grades, and feedback in one intuitive dashboard</p>
              </motion.div>
            </SlideIn>

            <SlideIn direction="right">
              <motion.div
                className="p-6 md:p-8 rounded-2xl text-center bg-gray-50 hover:bg-gray-100 transition duration-200 shadow-sm hover:shadow-md h-full sm:col-span-2 md:col-span-1"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Instant Feedback</h3>
                <p className="text-gray-600">Generate AI-powered suggestions and plagiarism checks in real-time</p>
              </motion.div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white"
        id="how-it-works"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn direction="bottom">
            <div className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/30 text-indigo-300 font-medium text-sm mb-4">
                HOW IT WORKS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Simple 3-Step Process</h2>
              <p className="text-indigo-200 text-lg">
                Get started in minutes with our intuitive workflow designed for busy educators
              </p>
            </div>
          </SlideIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Step 1 Console */}
            <SlideIn direction="left">
              <div className="rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(79,70,229,0.45)]">
                {/* Terminal header */}
                <div className="bg-indigo-900 px-4 py-3 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-indigo-300 text-xs font-mono">create.sh</div>
                </div>

                {/* Terminal content */}
                <div className="bg-slate-900 p-5 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.6)] mr-3">
                      1
                    </div>
                    <h3 className="text-xl font-semibold text-indigo-300">Create Assignment</h3>
                  </div>

                  <div className="font-mono text-sm space-y-3">
                    <div className="flex items-center">
                      <span className="text-pink-400">$</span>
                      <span className="text-green-400 ml-2">gradegenie create</span>
                    </div>

                    <div className="text-gray-400 pl-4">Creating new assignment...</div>

                    <div className="bg-slate-800 p-3 rounded-md border border-slate-700">
                      <p className="text-gray-300 mb-2">
                        Design interactive assignments with rich text, file uploads, and automatic deadline tracking
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded text-xs">Rich Text</span>
                        <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded text-xs">File Uploads</span>
                        <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded text-xs">
                          Auto-Deadlines
                        </span>
                      </div>
                    </div>

                    <div className="text-emerald-400">✓ Assignment created successfully!</div>
                  </div>
                </div>
              </div>
            </SlideIn>

            {/* Step 2 Console */}
            <SlideIn direction="bottom">
              <div className="rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.45)]">
                {/* Terminal header */}
                <div className="bg-purple-900 px-4 py-3 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-purple-300 text-xs font-mono">share.sh</div>
                </div>

                {/* Terminal content */}
                <div className="bg-slate-900 p-5 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.6)] mr-3">
                      2
                    </div>
                    <h3 className="text-xl font-semibold text-purple-300">Share Link</h3>
                  </div>

                  <div className="font-mono text-sm space-y-3">
                    <div className="flex items-center">
                      <span className="text-pink-400">$</span>
                      <span className="text-green-400 ml-2">gradegenie share --class="Math101"</span>
                    </div>

                    <div className="text-gray-400 pl-4">Generating secure links...</div>

                    <div className="bg-slate-800 p-3 rounded-md border border-slate-700">
                      <p className="text-gray-300 mb-2">Distribute unique submission links through your LMS or email</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-xs">
                          One-click Share
                        </span>
                        <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-xs">
                          Auto Reminders
                        </span>
                        <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded text-xs">
                          LMS Integration
                        </span>
                      </div>
                    </div>

                    <div className="text-emerald-400">✓ Links generated and ready to share!</div>
                  </div>
                </div>
              </div>
            </SlideIn>

            {/* Step 3 Console */}
            <SlideIn direction="right">
              <div className="rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.45)]">
                {/* Terminal header */}
                <div className="bg-emerald-900 px-4 py-3 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-emerald-300 text-xs font-mono">grade.sh</div>
                </div>

                {/* Terminal content */}
                <div className="bg-slate-900 p-5 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.6)] mr-3">
                      3
                    </div>
                    <h3 className="text-xl font-semibold text-emerald-300">Collect & Grade</h3>
                  </div>

                  <div className="font-mono text-sm space-y-3">
                    <div className="flex items-center">
                      <span className="text-pink-400">$</span>
                      <span className="text-green-400 ml-2">gradegenie grade --auto</span>
                    </div>

                    <div className="text-gray-400 pl-4">AI grading in progress...</div>

                    <div className="bg-slate-800 p-3 rounded-md border border-slate-700">
                      <p className="text-gray-300 mb-2">
                        Review submissions with AI assistance and automated grading tools
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2 py-1 bg-emerald-900/50 text-emerald-300 rounded text-xs">
                          85% Time Savings
                        </span>
                        <span className="px-2 py-1 bg-emerald-900/50 text-emerald-300 rounded text-xs">
                          Plagiarism Check
                        </span>
                        <span className="px-2 py-1 bg-emerald-900/50 text-emerald-300 rounded text-xs">
                          AI Feedback
                        </span>
                      </div>
                    </div>

                    <div className="text-emerald-400">✓ Grading complete! 24 assignments processed.</div>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* Call to action button */}
          <motion.div className="mt-12 text-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full transition duration-200 shadow-lg shadow-indigo-500/30"
            >
              Try GradeGenie Free
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24" id="testimonials">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn direction="bottom">
            <div className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
                TESTIMONIALS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">What Educators Are Saying</h2>
              <p className="text-gray-600 text-lg">
                Join thousands of satisfied teachers who have transformed their grading process
              </p>
            </div>
          </SlideIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {/* Testimonial 1 */}
            <SlideIn direction="left">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                    JD
                  </div>
                  <div>
                    <h4 className="font-semibold">Jane Doe</h4>
                    <p className="text-sm text-gray-500">High School English Teacher</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "GradeGenie has cut my grading time in half! The AI feedback suggestions are spot-on and my students
                  love the faster response times."
                </p>
              </motion.div>
            </SlideIn>

            {/* Testimonial 2 */}
            <SlideIn direction="bottom">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                    MS
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael Smith</h4>
                    <p className="text-sm text-gray-500">University Professor</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The plagiarism detection alone is worth the subscription. I've been able to provide more meaningful
                  feedback to my students with the time I've saved."
                </p>
              </motion.div>
            </SlideIn>

            {/* Testimonial 3 */}
            <SlideIn direction="right">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full sm:col-span-2 md:col-span-1"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                    LJ
                  </div>
                  <div>
                    <h4 className="font-semibold">Lisa Johnson</h4>
                    <p className="text-sm text-gray-500">Middle School Math Teacher</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "My students' math assignments are now automatically checked for accuracy, and I can focus on helping
                  those who need additional support."
                </p>
              </motion.div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <SlideIn direction="right">
        <section className="bg-gradient-to-r from-blue-700 to-purple-700 py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
                Ready to Revolutionize Your Grading?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of educators who have reclaimed their evenings and weekends while providing better
                feedback to students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-full hover:bg-blue-50 transition duration-200 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </SlideIn>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">GradeGenie</h3>
              <p className="text-gray-400">AI-powered grading assistant for modern educators</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Updates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} GradeGenie. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

