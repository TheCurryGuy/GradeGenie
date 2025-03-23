"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"

interface SlideInProps {
  children: ReactNode
  direction?: "left" | "right" | "top" | "bottom"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export const SlideIn = ({
  children,
  direction = "bottom",
  delay = 0.2,
  duration = 0.5,
  className = "",
}: SlideInProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "top" ? -50 : direction === "bottom" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

interface StaggeredRevealProps {
  children: ReactNode
  staggerChildren?: number
  delayChildren?: number
  className?: string
}

export const StaggeredReveal = ({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  className = "",
}: StaggeredRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

