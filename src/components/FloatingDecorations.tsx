'use client'

import { motion } from 'framer-motion'

export default function FloatingDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-40 dark:opacity-30">
      {/* Decorative Leaf / Ambient Float 1 */}
      <motion.div
        animate={{
          y: [0, -24, 0],
          x: [0, 12, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[12%] left-[4%] w-12 h-12 text-emerald-500/20 dark:text-emerald-400/15"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 59,16.17 3.82,21.34L5.23,22.75C11.4,17.58 14,9 17,8M17,3C14,4 11.4,12.58 5.23,17.75L3.82,16.34C9,11.17 14,5 17,3Z" />
        </svg>
      </motion.div>

      {/* Decorative Soft Glow Orb 2 */}
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -18, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[38%] right-[5%] w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
      />

      {/* Decorative Leaf / Ambient Float 3 */}
      <motion.div
        animate={{
          y: [0, -35, 0],
          x: [0, -15, 0],
          rotate: [0, -20, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[20%] left-[8%] w-10 h-10 text-cyan-500/20 dark:text-cyan-400/15"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 59,16.17 3.82,21.34L5.23,22.75C11.4,17.58 14,9 17,8M17,3C14,4 11.4,12.58 5.23,17.75L3.82,16.34C9,11.17 14,5 17,3Z" />
        </svg>
      </motion.div>
    </div>
  )
}
