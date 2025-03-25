

import { useState, useEffect, useRef } from "react"
import { Menu, X, Plus, FileText, CheckCircle, Play, ArrowRight, Star, Award, Zap } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion"
import { SlideIn, StaggeredReveal } from "../utils/utils"
import { FaTwitter, FaLinkedin, FaFacebook, FaGithub, FaDiscord } from "react-icons/fa"
import { IoStatsChart, IoSchool, IoSpeedometer } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import dashboardImg from "../assets/Dashboard.png"
import TypeScriptLogo from "../assets/TypeScriptLogo.png"
import SolutionsChallenge from "../assets/SolutionsChallenge.png"
import GeminiLogo from "../assets/GeminiLogo.png"
import AiStudioLogo from "../assets/AIStudioLogo.png"
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

      {/* Hero Section - Ultra Enhanced God-Level Version */}
      <div
        className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700"
        ref={heroRef}
        style={{
          minHeight: `calc(var(--vh, 1vh) * 100)`,
          height: `calc(var(--vh, 1vh) * 100)`,
        }}
      >
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated 3D mesh grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjR6bTAgMjRoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0tNi0yNGgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bS02LTQyaC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptLTYtNDJoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0tNi00MmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 animate-pulse"></div>
          
          {/* Enhanced animated gradient orbs with more depth and dimension */}
          <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-blue-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-[25rem] h-[25rem] bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[28rem] h-[28rem] bg-pink-400 rounded-full mix-blend-multiply filter blur-[110px] opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-32 left-1/4 w-[35rem] h-[35rem] bg-cyan-400 rounded-full mix-blend-multiply filter blur-[130px] opacity-50 animate-blob animation-delay-3000"></div>
          
          {/* Animated particles with enhanced effects */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: Math.random() * 0.5 + 0.25,
                }}
                animate={{
                  y: [
                    Math.random() * 100 + "%",
                    Math.random() * 100 + "%",
                    Math.random() * 100 + "%",
                  ],
                  x: [
                    Math.random() * 100 + "%",
                    Math.random() * 100 + "%",
                    Math.random() * 100 + "%",
                  ],
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  width: Math.random() * 6 + 2 + "px",
                  height: Math.random() * 6 + 2 + "px",
                  background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
                  boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.8)`,
                }}
              />
            ))}
          </div>
          
          {/* Animated light beams */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute origin-center bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                initial={{
                  rotate: i * 36,
                  width: "200%",
                  height: "3px",
                  left: "-50%",
                  top: "50%",
                  opacity: 0,
                }}
                animate={{
                  rotate: [i * 36, i * 36 + 360],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  delay: i * 3,
                  ease: "linear",
                  times: [0, 0.5, 1],
                }}
              />
            ))}
          </div>
          
          {/* Animated digital circuit lines */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M0 50 H100 M50 0 V100 M25 25 L75 75 M75 25 L25 75" stroke="white" strokeWidth="0.5" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>
          </div>
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
                {/* Left column - Text content with enhanced animations */}
                <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 lg:pr-8 xl:pr-12 relative">
                  {/* Animated highlight accent */}
                  <motion.div 
                    className="absolute -left-8 top-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-30 blur-xl"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div 
                    className="absolute -right-4 bottom-1/4 w-20 h-20 bg-purple-300 rounded-full opacity-30 blur-xl"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                  
                  {/* Enhanced badge with 3D effect and animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-6 backdrop-blur-md border border-white/20 shadow-xl relative z-10 group-hover:shadow-pink-500/20 group-hover:border-white/30 transition-all duration-300">
                      <span className="bg-gradient-to-r from-pink-200 to-violet-200 bg-clip-text text-transparent font-semibold">
                        AI-Powered Education Tool
                      </span>
                    </div>
                  </motion.div>

                  {/* Enhanced heading with 3D text effect */}
                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    The AI-Powered <br className="hidden sm:block" />
                    <span className="relative">
                      <span className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-pink-300 blur-xl opacity-30 rounded-lg"></span>
                      <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                        Grading Assistant
                      </span>
                    </span>
                  </motion.h1>

                  {/* Enhanced description with animated underline */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      Streamline assignments, track submissions, and save hours of grading time with AI-powered automation
                    </p>
                    <motion.div 
                      className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                    />
                  </motion.div>

                  {/* Enhanced CTA buttons with 3D effects and animations */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <motion.button
                      className="relative group bg-white text-blue-600 font-semibold px-8 py-4 rounded-full transition duration-300 shadow-lg flex items-center justify-center text-lg overflow-hidden z-10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/signup")}
                    >
                      {/* Button glow effect */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                      
                      {/* Button shine effect */}
                      <span className="absolute inset-0 w-0 h-full bg-white opacity-20 transform -skew-x-12 group-hover:animate-shine"></span>
                      
                      <span className="relative z-10 flex items-center">
                        Get Started Today
                        <motion.span
                          className="ml-2 inline-block"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.span>
                      </span>
                    </motion.button>

                    <motion.button
                      className="relative group bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition duration-300 flex items-center justify-center text-lg backdrop-blur-sm overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Button glow effect */}
                      <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                      
                      {/* Button shine effect */}
                      <span className="absolute inset-0 w-0 h-full bg-white opacity-20 transform -skew-x-12 group-hover:animate-shine"></span>
                      
                      <span className="relative z-10 flex items-center">
                        <motion.span
                          className="mr-2 inline-block"
                          animate={{ 
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Play className="h-5 w-5" />
                        </motion.span>
                        Watch Demo
                      </span>
                    </motion.button>
                  </motion.div>
                  
                  {/* Trust badges - Enhanced with 3D effects */}
                  <motion.div 
                    className="mt-12 hidden lg:flex gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <motion.div 
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 shadow-xl relative group"
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <Star className="text-yellow-400 w-5 h-5 relative z-10" />
                      <span className="text-white text-sm font-medium relative z-10">Made for Educators Worldwide</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 shadow-xl relative group"
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <Award className="text-purple-400 w-5 h-5 relative z-10" />
                      <span className="text-white text-sm font-medium relative z-10">Made with Google AI</span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Right column - Dashboard image with enhanced 3D effects */}
                <div className="w-full lg:w-1/2 px-4 sm:px-8 lg:px-4 lg:pt-12">
                  <motion.div
                    className="relative mx-auto max-w-lg lg:max-w-none lg:mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {/* Enhanced glow effects with animation */}
                    <motion.div 
                      className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full opacity-30 blur-3xl"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.div>
                    
                    <motion.div 
                      className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-400 rounded-full opacity-30 blur-3xl"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.4, 0.3],
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    ></motion.div>
                    
                    <motion.div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                      }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    ></motion.div>

                    {/* Enhanced animated particles with glow */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(30)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                          initial={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            scale: Math.random() * 0.5 + 0.5,
                          }}
                          animate={{
                            top: [
                              `${Math.random() * 100}%`,
                              `${Math.random() * 100}%`,
                              `${Math.random() * 100}%`,
                            ],
                            left: [
                              `${Math.random() * 100}%`,
                              `${Math.random() * 100}%`,
                              `${Math.random() * 100}%`,
                            ],
                            scale: [0.5, 1, 0.5],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{
                            boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.8)`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Enhanced floating notifications with 3D effects */}
                    <motion.div
                      className="absolute -top-16 right-0 bg-white rounded-lg shadow-xl p-3 z-10 max-w-[220px] backdrop-blur-sm border border-white/20"
                      initial={{ opacity: 0, y: 20, rotateZ: -5 }}
                      animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        rotateZ: 2,
                      }}
                    >
                      <div className="flex items-start">
                        <div className="bg-gradient-to-br from-green-100 to-green-200 p-2 rounded-full mr-3 shadow-inner">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Assignment graded</p>
                          <p className="text-xs text-gray-500">24 submissions processed</p>
                          <div className="mt-1 w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-green-500 rounded-full" 
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.5, delay: 1.5 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Dashboard Image with enhanced glass morphism and 3D effects */}
                    <div className="relative rounded-xl overflow-hidden backdrop-blur-sm transform perspective-1000">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      ></motion.div>

                      <motion.div
                        className="relative z-10 rounded-xl overflow-hidden"
                        initial={{ rotateX: 10, rotateY: -10 }}
                        animate={{ rotateX: 0, rotateY: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        whileHover={{
                          rotateX: -5,
                          rotateY: 5,
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        {/* Enhanced image frame with animated border */}
                        <div className="relative p-1 rounded-xl overflow-hidden">
                          <div className="absolute inset-0">
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl"
                              animate={{ 
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                              }}
                              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                              style={{ backgroundSize: '200% 200%' }}
                            />
                          </div>
                          
                          <div className="relative rounded-lg overflow-hidden border-2 border-white/20">
                            <img
                              src={dashboardImg || "/placeholder.svg?height=600&width=800"}
                              alt="GradeGenie Dashboard Preview"
                              className="rounded-lg shadow-2xl w-full h-auto"
                            />

                            {/* Enhanced reflection effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-60 rounded-lg"></div>
                            
                            {/* Animated scan line effect */}
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent h-[20%] opacity-30"
                              initial={{ top: '-20%' }}
                              animate={{ top: '100%' }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Enhanced floating stats with 3D effects and animation */}
                    <motion.div
                      className="absolute -bottom-14 left-0 bg-white rounded-lg shadow-xl p-3 z-10 backdrop-blur-sm border border-white/20"
                      initial={{ opacity: 0, y: -20, rotateZ: 5 }}
                      animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        rotateZ: -2,
                      }}
                    >
                      <div className="flex items-center">
                        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 rounded-full mr-3 shadow-inner">
                          <Zap className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-800">Time saved this week</p>
                          <div className="flex items-center">
                            <motion.p 
                              className="text-sm font-bold text-blue-600"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 1.8 }}
                            >
                              12.5 hours
                            </motion.p>
                            <motion.span 
                              className="ml-1 text-xs text-green-500 flex items-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 2 }}
                            >
                              <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                              </svg>
                              24%
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* New floating element - AI processing indicator */}
                    <motion.div
                      className="absolute top-1/2 -right-10 bg-white rounded-lg shadow-xl p-3 z-10 backdrop-blur-sm border border-white/20"
                      initial={{ opacity: 0, x: -20, rotateZ: -5 }}
                      animate={{ opacity: 1, x: 0, rotateZ: 0 }}
                      transition={{ duration: 0.6, delay: 1.6 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        rotateZ: 2,
                      }}
                    >
                      <div className="flex items-center">
                        <div className="relative bg-gradient-to-br from-purple-100 to-purple-200 p-2 rounded-full mr-3 shadow-inner overflow-hidden">
                          <motion.div 
                            className="absolute inset-0 bg-purple-300 opacity-30"
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 0, 0.3],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <svg className="h-5 w-5 text-purple-600 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.93 4.93L6.34 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17.66 17.66L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.34 17.66L4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19.07 4.93L17.66 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-800">AI Processing</p>
                          <div className="flex items-center">
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-purple-500 rounded-full" 
                                animate={{ 
                                  width: ["0%", "100%", "0%"],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile badges - Only visible on smaller screens - Enhanced with 3D effects */}
          <div className="lg:hidden flex flex-wrap justify-center gap-4 pb-12 px-6">
            <motion.div
              className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg border border-white/20 shadow-xl relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <div className="flex items-center relative z-10">
                <Star className="text-yellow-400 w-5 h-5 mr-2" />
                <span className="text-white text-sm font-medium">Made for Educators Worldwide</span>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg border border-white/20 shadow-xl relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <div className="flex items-center relative z-10">
                <Award className="text-yellow-400 w-5 h-5 mr-2" />
                <span className="text-white text-sm font-medium">Made with Google AI</span>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Wave Divider with animation */}
          <div className="w-full overflow-hidden mt-auto relative">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <svg
                className="w-full h-auto"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M0 0L48 8.33333C96 16.6667 192 33.3333 288 41.6667C384 50 480 50 576 41.6667C672 33.3333 768 16.6667 864 8.33333C960 0 1056 0 1152 8.33333C1248 16.6667 1344 33.3333 1392 41.6667L1440 50V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
                  fill="white"
                  animate={{
                    d: [
                      "M0 0L48 8.33333C96 16.6667 192 33.3333 288 41.6667C384 50 480 50 576 41.6667C672 33.3333 768 16.6667 864 8.33333C960 0 1056 0 1152 8.33333C1248 16.6667 1344 33.3333 1392 41.6667L1440 50V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z",
                      "M0 0L48 12C96 24 192 48 288 60C384 72 480 72 576 60C672 48 768 24 864 12C960 0 1056 0 1152 12C1248 24 1344 48 1392 60L1440 72V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z",
                      "M0 0L48 8.33333C96 16.6667 192 33.3333 288 41.6667C384 50 480 50 576 41.6667C672 33.3333 768 16.6667 864 8.33333C960 0 1056 0 1152 8.33333C1248 16.6667 1344 33.3333 1392 41.6667L1440 50V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z",
                    ],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
            
            {/* Additional decorative elements on the wave */}
            <motion.div 
              className="absolute bottom-0 left-1/4 w-4 h-4 bg-blue-500 rounded-full opacity-70"
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div 
              className="absolute bottom-0 left-2/3 w-3 h-3 bg-purple-500 rounded-full opacity-70"
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.7, 0.4, 0.7],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            
            <motion.div 
              className="absolute bottom-0 left-1/2 w-5 h-5 bg-pink-500 rounded-full opacity-70"
              animate={{ 
                y: [0, -25, 0],
                opacity: [0.7, 0.2, 0.7],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
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
                  <p className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">100+</p>
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
                  <p className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">99%</p>
                  <p className="text-gray-600">Precision rate of our AI-powered grading assistance, thanks to Gemini</p>
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

                    <div className="text-gray-600 pl-4">Creating New Assignment...</div>

                    <div className="bg-white p-3 rounded-md border border-gray-300">
                      <p className="text-gray-700 mb-2">
                        Design your assignments as parsable document, set parameters and deadlines
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Text Format</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">File Management</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Auto-Deadline Tracking</span>
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

                    <div className="text-gray-600 pl-4">Generating Secure Links...</div>

                    <div className="bg-white p-3 rounded-md border border-gray-300">
                      <p className="text-gray-700 mb-2">Distribute unique secure submission links through your desired platform</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">One-click Share</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Auto Reminders</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">LMS Integration</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Unique Secure Links</span>
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

                    <div className="text-gray-600 pl-4">AI Grading in Seconds...</div>

                    <div className="bg-white p-3 rounded-md border border-gray-300">
                      <p className="text-gray-700 mb-2">
                        Review submissions with Gemini and get instant grading with feedback
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Time Saving</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Plagiarism Check</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">AI Feedback</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Instant AI Evaluation</span>
                      </div>
                    </div>

                    <div className="text-green-600">✓ Grading complete! Thanks Gemini!</div>
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
              Try GradeGenie Today
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
                    src={SolutionsChallenge || "/placeholder.svg"}
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
                    src={AiStudioLogo || "/placeholder.svg"}
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
                  <img src={GeminiLogo || "/placeholder.svg"} alt="GEMINI" className="max-w-full max-h-full" />
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
                  <img src={VercelLogo || "/placeholder.svg"} alt="VERCEL" className="max-w-full max-h-full" />
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
                  <img src={TypeScriptLogo || "/placeholder.svg"} alt="TypeScript" className="max-w-full max-h-full" />
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 33"><g clipPath="url(#prefix__clip0)"><path fill="#38bdf8" fillRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clipRule="evenodd"/></g><defs><clipPath id="prefix__clip0"><path fill="#fff" d="M0 0h54v32.4H0z"/></clipPath></defs></svg>
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
                  <img src={ViteLogo || "/placeholder.svg"} alt="Vite" className="max-w-full max-h-full" />
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
                  onClick={() => {
                    navigate("/signup")
                  }}
                >
                  Start Today
                </motion.button>
                <motion.button
                  className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Demo
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
