"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Plus, FileText, CheckCircle, Play, ArrowRight, Star, Award, Zap } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion"
import { SlideIn, StaggeredReveal } from "../utils/utils"
import { FaTwitter, FaLinkedin, FaFacebook, FaGithub, FaDiscord } from "react-icons/fa"
import { IoStatsChart, IoSchool, IoSpeedometer } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import dashboardImg from "../assets/Dashboard.png"
import TypeScriptLogo from "../assets/TypeScriptLogo.png"
import SolutionsChallenge from "../assets/SolutionsChallenge.png"
import GeminiLogo from "../assets/GeminiLogo.png"
import AiStudioLogo from "../assets/AiStudioLogo.png"
import VercelLogo from "../assets/VercelLogo.png"
import ViteLogo from "../assets/ViteLogo.png"
const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const heroRef = useRef(null)
  const heroContentRef = useRef(null)
  const navigate = useNavigate()

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Advanced motion values for parallax effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroBlur = useTransform(scrollYProgress, [0, 1], [0, 10])

  // Track scroll position for navbar effects
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.05) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  })

  // Handle viewport height calculation - crucial for mobile browsers
  useEffect(() => {
    const calculateViewportHeight = () => {
      // This handles the mobile browser address bar issue
      const vh = window.innerHeight
      document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`)
    }

    calculateViewportHeight()
    window.addEventListener("resize", calculateViewportHeight)
    window.addEventListener("orientationchange", calculateViewportHeight)

    return () => {
      window.removeEventListener("resize", calculateViewportHeight)
      window.removeEventListener("orientationchange", calculateViewportHeight)
    }
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (mobileMenuOpen && !event.target.closest("nav")) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [mobileMenuOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const testimonials = [
    {
      initial: "JD",
      name: "Jane Doe",
      role: "High School English Teacher",
      text: "GradeGenie has cut my grading time in half! The AI feedback suggestions are spot-on and my students love the faster response times.",
      color: "blue",
    },
    {
      initial: "MS",
      name: "Michael Smith",
      role: "University Professor",
      text: "The plagiarism detection alone is worth the subscription. I've been able to provide more meaningful feedback to my students with the time I've saved.",
      color: "purple",
    },
    {
      initial: "LJ",
      name: "Lisa Johnson",
      role: "Middle School Math Teacher",
      text: "My students' math assignments are now automatically checked for accuracy, and I can focus on helping those who need additional support.",
      color: "pink",
    },
  ]

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Navigation Bar - Fixed with dynamic styling */}
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <StaggeredReveal>
          <nav className="relative z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4 md:py-5">
                {/* Logo */}
                <a
                  href="/"
                  className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                    scrolled ? "text-blue-700" : "text-white"
                  }`}
                >
                  GradeGenie
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                  <a
                    href="#features"
                    className={`hover:text-blue-400 transition duration-200 ${
                      scrolled ? "text-gray-700" : "text-white"
                    }`}
                  >
                    Features
                  </a>
                  
                  <a
                    href="#how-it-works"
                    className={`hover:text-blue-400 transition duration-200 ${
                      scrolled ? "text-gray-700" : "text-white"
                    }`}
                  >
                    How It Works
                  </a>
                  <a
                    href="#testimonials"
                    className={`hover:text-blue-400 transition duration-200 ${
                      scrolled ? "text-gray-700" : "text-white"
                    }`}
                  >
                    Testimonials
                  </a>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex space-x-4">
                  <button
                    className={`font-medium px-5 py-2 rounded-full transition duration-200 ${
                      scrolled
                        ? "bg-gray-100 text-blue-600 hover:bg-gray-200"
                        : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                    }`}
                    onClick={() => navigate("/signin")}
                  >
                    Login
                  </button>
                  <button
                    className="bg-white hover:bg-blue-50 text-blue-600 font-medium px-5 py-2 rounded-full transition duration-200 shadow-sm"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className={`md:hidden focus:outline-none ${scrolled ? "text-blue-700" : "text-white"}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setMobileMenuOpen(!mobileMenuOpen)
                  }}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu - Full screen overlay */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  className="fixed inset-0 bg-white z-40 md:hidden overflow-auto"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="container mx-auto px-4 pt-20 pb-6">
                    <div className="flex flex-col space-y-6">
                      <a
                        href="#features"
                        className="text-gray-700 hover:text-blue-600 transition duration-200 text-2xl font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Features
                      </a>
                      
                      <a
                        href="#how-it-works"
                        className="text-gray-700 hover:text-blue-600 transition duration-200 text-2xl font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        How It Works
                      </a>
                      <a
                        href="#testimonials"
                        className="text-gray-700 hover:text-blue-600 transition duration-200 text-2xl font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Testimonials
                      </a>
                      <div className="flex flex-col space-y-4 mt-8">
                        <button
                          className="bg-gray-100 hover:bg-gray-200 text-blue-600 font-medium px-5 py-4 rounded-xl transition duration-200 text-center text-lg"
                          onClick={() => {
                            navigate("/login")
                            setMobileMenuOpen(false)
                          }}
                        >
                          Login
                        </button>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-4 rounded-xl transition duration-200 text-center text-lg"
                          onClick={() => {
                            navigate("/signup")
                            setMobileMenuOpen(false)
                          }}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </StaggeredReveal>
      </motion.div>

      {/* Hero Section - Completely revamped for all viewports */}
      <div
        className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700"
        ref={heroRef}
        style={{
          minHeight: `calc(var(--vh, 1vh) * 100)`,
          height: `calc(var(--vh, 1vh) * 100)`,
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-4000"></div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjR6bTAgMjRoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0tNi0yNGgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bS02LTQyaC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptLTYtNDJoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0tNi00MmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        </div>

        {/* Hero content container */}
        <div className="relative h-full flex flex-col">
          {/* Main hero content */}
          <motion.div
            className="flex-1 flex items-center justify-center pt-24 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 xl:px-12"
            style={{
              opacity: heroOpacity,
              scale: heroScale,
              y: heroY,
              filter: `blur(${heroBlur}px)`,
            }}
            ref={heroContentRef}
          >
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col lg:flex-row items-center lg:items-start">
                {/* Left column - Text content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 lg:pr-8 xl:pr-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm"
                  >
                    AI-Powered Education Tool
                  </motion.div>

                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl xl:text-6xl font-bold text-white mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    The AI-Powered <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                      Grading Assistant
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Streamline assignments, track submissions, and save hours of grading time with AI-powered automation
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <motion.button
                      className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-full hover:bg-blue-50 transition duration-200 shadow-lg flex items-center justify-center text-lg"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/signup")}
                    >
                      Get Started for Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.button>

                    <motion.button
                      className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition duration-200 flex items-center justify-center text-lg backdrop-blur-sm"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.2)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Watch Demo
                    </motion.button>
                  </motion.div>
                </div>

                {/* Right column - Dashboard image */}
                <div className="w-full lg:w-1/2 px-4 sm:px-8 lg:px-4 lg:pt-12">
                  <motion.div
                    className="relative mx-auto max-w-lg lg:max-w-none lg:mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {/* Advanced glow effects */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-30 blur-3xl"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400 rounded-full opacity-30 blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>

                    {/* Animated particles */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 7}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                          }}
                        ></div>
                      ))}
                    </div>

                    {/* Floating notification */}
                    <motion.div
                      className="absolute -top-16 right-0 bg-white rounded-lg shadow-xl p-3 z-10 max-w-[200px]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-800">Assignment graded</p>
                          <p className="text-xs text-gray-500">24 submissions processed</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Dashboard Image with advanced glass morphism effect */}
                    <div className="relative rounded-xl overflow-hidden backdrop-blur-sm transform perspective-1000">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      ></motion.div>

                      <motion.div
                        className="relative z-10"
                        initial={{ rotateX: 10, rotateY: -10 }}
                        animate={{ rotateX: 0, rotateY: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        whileHover={{
                          rotateX: -5,
                          rotateY: 5,
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        <img
                          src={dashboardImg || "/placeholder.svg?height=600&width=800"}
                          alt="GradeGenie Dashboard Preview"
                          className="rounded-xl shadow-2xl border-4 border-white/20 w-full h-auto"
                        />

                        {/* Reflection effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 rounded-xl"></div>
                      </motion.div>
                    </div>

                    {/* Floating stats */}
                    <motion.div
                      className="absolute -bottom-14 left-0 bg-white rounded-lg shadow-xl p-3 z-10"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Zap className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-800">Time saved this week</p>
                          <p className="text-sm font-bold text-blue-600">12.5 hours</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile badges - Only visible on smaller screens */}
          <div className="lg:hidden flex flex-wrap justify-center gap-4 pb-12 px-6">
            <motion.div
              className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg border border-white/20 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center">
                <Star className="text-yellow-400 w-5 h-5 mr-2" />
                <span className="text-white text-sm font-medium">Trusted by 10,000+ educators</span>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg border border-white/20 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flex items-center">
                <Award className="text-yellow-400 w-5 h-5 mr-2" />
                <span className="text-white text-sm font-medium">Award-winning AI technology</span>
              </div>
            </motion.div>
          </div>

          {/* Wave Divider - Improved for all screen sizes */}
          <div className="w-full overflow-hidden mt-auto">
            <svg
              className="w-full h-auto"
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0L48 8.33333C96 16.6667 192 33.3333 288 41.6667C384 50 480 50 576 41.6667C672 33.3333 768 16.6667 864 8.33333C960 0 1056 0 1152 8.33333C1248 16.6667 1344 33.3333 1392 41.6667L1440 50V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <SlideIn direction="bottom">
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Empowering Educators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg relative overflow-hidden group"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-600/10 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <IoStatsChart className="text-4xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 ml-4">Time Saved</h3>
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">85%</p>
                  <p className="text-gray-600">Average reduction in grading time for teachers using GradeGenie</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg relative overflow-hidden group"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-purple-600/10 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <IoSchool className="text-4xl text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 ml-4">Educators</h3>
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">10,000+</p>
                  <p className="text-gray-600">Teachers actively using GradeGenie to enhance their grading process</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg sm:col-span-2 lg:col-span-1 relative overflow-hidden group"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-green-600/10 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <IoSpeedometer className="text-4xl text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 ml-4">Accuracy</h3>
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">99.8%</p>
                  <p className="text-gray-600">Precision rate of our AI-powered grading assistance</p>
                </div>
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
                className="p-6 md:p-8 rounded-2xl text-center bg-gradient-to-b from-white to-blue-50 shadow-md hover:shadow-xl transition duration-300 h-full border border-blue-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-600 p-4 rounded-2xl shadow-lg transform -rotate-3 hover:rotate-0 transition-all duration-300">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Create Assignments</h3>
                <p className="text-gray-600">
                  Design interactive assignments with rich text, file uploads, and automatic deadline tracking
                </p>
                <div className="mt-6 pt-6 border-t border-blue-100">
                  <a href="#" className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </SlideIn>

            <SlideIn direction="bottom">
              <motion.div
                className="p-6 md:p-8 rounded-2xl text-center bg-gradient-to-b from-white to-purple-50 shadow-md hover:shadow-xl transition duration-300 h-full border border-purple-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-purple-600 p-4 rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Organize & Track</h3>
                <p className="text-gray-600">Centralize submissions, grades, and feedback in one intuitive dashboard</p>
                <div className="mt-6 pt-6 border-t border-purple-100">
                  <a href="#" className="text-purple-600 font-medium hover:text-purple-700 inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </SlideIn>

            <SlideIn direction="right">
              <motion.div
                className="p-6 md:p-8 rounded-2xl text-center bg-gradient-to-b from-white to-blue-50 shadow-md hover:shadow-xl transition duration-300 h-full sm:col-span-2 md:col-span-1 border border-blue-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-600 p-4 rounded-2xl shadow-lg transform -rotate-3 hover:rotate-0 transition-all duration-300">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Instant Feedback</h3>
                <p className="text-gray-600">Generate AI-powered suggestions and plagiarism checks in real-time</p>
                <div className="mt-6 pt-6 border-t border-blue-100">
                  <a href="#" className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50" id="how-it-works">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn direction="bottom">
            <div className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
                HOW IT WORKS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Simple 3-Step Process</h2>
              <p className="text-gray-600 text-lg">
                Get started in minutes with our intuitive workflow designed for busy educators
              </p>
            </div>
          </SlideIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Step 1 Console */}
            <SlideIn direction="left">
              <div className="rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(79,70,229,0.45)]">
                {/* Terminal header */}
                <div className="bg-blue-700 px-4 py-3 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-blue-100 text-xs font-mono">create.sh</div>
                </div>

                {/* Terminal content */}
                <div className="bg-gray-100 p-5 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.6)] mr-3">
                      1
                    </div>
                    <h3 className="text-xl font-semibold text-blue-700">Create Assignment</h3>
                  </div>

                  <div className="font-mono text-sm space-y-3">
                    <div className="flex items-center">
                      <span className="text-pink-400">$</span>
                      <span className="text-green-600 ml-2">gradegenie create</span>
                    </div>

                    <div className="text-gray-600 pl-4">Creating new assignment...</div>

                    <div className="bg-white p-3 rounded-md border border-gray-300">
                      <p className="text-gray-700 mb-2">
                        Design interactive assignments with rich text, file uploads, and automatic deadline tracking
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Rich Text</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">File Uploads</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Auto-Deadlines</span>
                      </div>
                    </div>

                    <div className="text-green-600">✓ Assignment created successfully!</div>
                  </div>
                </div>
              </div>
            </SlideIn>

            {/* Step 2 Console */}
            <SlideIn direction="bottom">
              <div className="rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(147,51,234,0.45)]">
                {/* Terminal header */}
                <div className="bg-purple-700 px-4 py-3 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-purple-100 text-xs font-mono">share.sh</div>
                </div>

                {/* Terminal content */}
                <div className="bg-gray-100 p-5 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.6)] mr-3">
                      2
                    </div>
                    <h3 className="text-xl font-semibold text-purple-700">Share Link</h3>
                  </div>

                  <div className="font-mono text-sm space-y-3">
                    <div className="flex items-center">
                      <span className="text-pink-400">$</span>
                      <span className="text-green-600 ml-2">gradegenie share --class="Math101"</span>
                    </div>

                    <div className="text-gray-600 pl-4">Generating secure links...</div>

                    <div className="bg-white p-3 rounded-md border border-gray-300">
                      <p className="text-gray-700 mb-2">Distribute unique submission links through your LMS or email</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">One-click Share</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Auto Reminders</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">LMS Integration</span>
                      </div>
                    </div>

                    <div className="text-green-600">✓ Links generated and ready to share!</div>
                  </div>
                </div>
              </div>
            </SlideIn>

            {/* Step 3 Console */}
            <SlideIn direction="right">
              <div className="rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(37,99,235,0.45)]">
                {/* Terminal header */}
                <div className="bg-blue-700 px-4 py-3 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-blue-100 text-xs font-mono">grade.sh</div>
                </div>

                {/* Terminal content */}
                <div className="bg-gray-100 p-5 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.6)] mr-3">
                      3
                    </div>
                    <h3 className="text-xl font-semibold text-blue-700">Collect & Grade</h3>
                  </div>

                  <div className="font-mono text-sm space-y-3">
                    <div className="flex items-center">
                      <span className="text-pink-400">$</span>
                      <span className="text-green-600 ml-2">gradegenie grade --auto</span>
                    </div>

                    <div className="text-gray-600 pl-4">AI grading in progress...</div>

                    <div className="bg-white p-3 rounded-md border border-gray-300">
                      <p className="text-gray-700 mb-2">
                        Review submissions with AI assistance and automated grading tools
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">85% Time Savings</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Plagiarism Check</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">AI Feedback</span>
                      </div>
                    </div>

                    <div className="text-green-600">✓ Grading complete! 24 assignments processed.</div>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* Call to action button */}
          <motion.div className="mt-12 text-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-full transition duration-200 shadow-lg shadow-blue-500/30"
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

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div
                      className={`w-20 h-20 bg-${testimonials[activeTestimonial].color}-100 rounded-full flex items-center justify-center text-${testimonials[activeTestimonial].color}-600 text-2xl font-bold shrink-0`}
                    >
                      {testimonials[activeTestimonial].initial}
                    </div>
                    <div>
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg italic mb-6">"{testimonials[activeTestimonial].text}"</p>
                      <div>
                        <h4 className="font-semibold text-lg">{testimonials[activeTestimonial].name}</h4>
                        <p className="text-gray-500">{testimonials[activeTestimonial].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeTestimonial === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Powered By Section */}
      <SlideIn direction="bottom">
        <section className="py-16 md:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Powered By</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Built with cutting-edge technologies to deliver the best experience for educators
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
              {/* Google Solution Challenge */}
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 border-2 border-blue-100">
                  <img
                    src={SolutionsChallenge}
                    alt="Google Solution Challenge"
                    className="max-w-full max-h-full"
                  />
                </div>
                <p className="mt-4 text-sm font-medium text-gray-700">Google Solution Challenge'25</p>
              </motion.div>

              {/* AI Studio of Google */}
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 border-2 border-purple-100">
                  <img
                    src={AiStudioLogo}
                    alt="AI Studio of Google"
                    className="max-w-full max-h-full"
                  />
                </div>
                <p className="mt-4 text-sm font-medium text-gray-700">Google AI Studio</p>
              </motion.div>

              {/* GEMINI */}
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 border-2 border-blue-100">
                  <img src={GeminiLogo} alt="GEMINI" className="max-w-full max-h-full" />
                </div>
                <p className="mt-4 text-sm font-medium text-gray-700">Gemini</p>
              </motion.div>

              {/* VERCEL */}
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 border-2 border-purple-100">
                  <img src={VercelLogo} alt="VERCEL" className="max-w-full max-h-full" />
                </div>
                <p className="mt-4 text-sm font-medium text-gray-700">Vercel</p>
              </motion.div>

              {/* TypeScript */}
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 border-2 border-blue-100">
                  <img src={TypeScriptLogo} alt="TypeScript" className="max-w-full max-h-full" />
                </div>
                <p className="mt-4 text-sm font-medium text-gray-700">TypeScript</p>
              </motion.div>

              {/* Tailwind CSS */}
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 border-2 border-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 33"><g clip-path="url(#prefix__clip0)"><path fill="#38bdf8" fill-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clip-rule="evenodd"/></g><defs><clipPath id="prefix__clip0"><path fill="#fff" d="M0 0h54v32.4H0z"/></clipPath></defs></svg>
                </div>
                <p className="mt-4 text-sm font-medium text-gray-700">Tailwind CSS</p>
              </motion.div>

              {/* Vite */}
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 border-2 border-blue-100">
                  <img src={ViteLogo} alt="Vite" className="max-w-full max-h-full" />
                </div>
                <p className="mt-4 text-sm font-medium text-gray-700"> Vite Build</p>
              </motion.div>
            </div>
          </div>
        </section>
      </SlideIn>

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
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaTwitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaLinkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaGithub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <FaDiscord className="h-5 w-5" />
                  <span className="sr-only">Discord</span>
                </a>
              </div>
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

