import { motion, useInView } from "framer-motion"
import React, { useRef } from "react"

export function SlideIn({
    children,
    direction = "left",
  }: {
    children: React.ReactNode
    direction?: "left" | "right" | "bottom"
  }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
  
    const variants = {
      hidden: {
        opacity: 0,
        x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
        y: direction === "bottom" ? 100 : 0,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
      },
    }
  
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    )
}

export function StaggeredReveal({ children }: { children: React.ReactNode }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
  
    return (
      <div ref={ref}>
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ staggerChildren: 0.1 }}>
          {React.Children.map(children, (child) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
}
  