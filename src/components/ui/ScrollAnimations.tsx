'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

interface ScrollProgressProps {
  className?: string
}

export const ScrollProgress = ({ className = '' }: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform-gpu z-50 ${className}`}
      style={{ scaleX, transformOrigin: "0%" }}
    />
  )
}

export const ScrollToTop = () => {
  // Scroll to top functionality is cleanly integrated into FloatingDock
  return null
}

// Hook for smooth scroll animations
export const useScrollAnimation = () => {
  const { scrollY } = useScroll()
  
  return {
    y: scrollY,
    parallax: useSpring(scrollY, { stiffness: 100, damping: 30 })
  }
}
