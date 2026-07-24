'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useSoundFX } from '@/hooks/useSoundFX'

interface SocialPreviewHoverProps {
  href: string
  label: string
  icon: React.ReactNode
  previewImage: string
  handle?: string
  subtitle?: string
}

export default function SocialPreviewHover({
  href,
  label,
  icon,
  previewImage,
  handle,
  subtitle,
}: SocialPreviewHoverProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { playHover, playClick } = useSoundFX()

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => {
        setIsHovered(true)
        playHover()
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={playClick}
        className="flex items-center gap-2 px-3.5 py-2 bg-neutral-100 dark:bg-[#121215] hover:bg-neutral-200 dark:hover:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-800/80 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-all rounded-full group"
      >
        <span className="text-[18px] text-neutral-800 dark:text-neutral-200 group-hover:scale-110 transition-transform">
          {icon}
        </span>
        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors">
          {label}
        </span>
      </a>

      {/* Floating Preview Card on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none w-64 sm:w-72 rounded-2xl overflow-hidden bg-neutral-900/95 backdrop-blur-xl border border-neutral-700/80 shadow-2xl p-2"
          >
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-black border border-neutral-800 mb-2">
              <Image
                src={previewImage}
                alt={`${label} profile preview`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="px-2 pb-1 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white tracking-tight">{label}</p>
                {handle && <p className="text-[10px] text-neutral-400 font-mono">{handle}</p>}
              </div>
              {subtitle && (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-medium border border-sky-500/30">
                  {subtitle}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
