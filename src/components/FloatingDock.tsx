'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun, Search, Volume2, VolumeX, ArrowUp, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { SOCIALS } from '@/lib/config'
import { useSoundFX } from '@/hooks/useSoundFX'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingDock() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { soundEnabled, toggleSound, playHover, playToggle, playClick } = useSoundFX()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  const triggerCmdK = () => {
    playClick()
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      metaKey: true,
      bubbles: true,
    })
    document.dispatchEvent(event)
  }

  const scrollToTop = () => {
    playClick()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const emailHref = SOCIALS.email.startsWith('mailto:') ? SOCIALS.email : `mailto:${SOCIALS.email}`

  return (
    <div className="fixed bottom-8 right-5 z-[999] flex flex-col gap-3 items-center">
      {/* Scroll To Top Button — Safely atop the dock */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            onMouseEnter={playHover}
            className="w-10 h-10 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-neutral-700 dark:border-neutral-300"
            aria-label="Scroll to top"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Command Palette Button */}
      <button
        onClick={triggerCmdK}
        onMouseEnter={playHover}
        className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 shadow-xl flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95 transition-all"
        aria-label="Search Command Palette (Ctrl+K)"
        title="Search & Commands (Ctrl+K)"
      >
        <Search className="w-4 h-4 text-sky-500" />
      </button>

      {/* Theme Switcher Button */}
      <button
        onClick={() => {
          playToggle()
          setTheme(theme === 'light' ? 'dark' : 'light')
        }}
        onMouseEnter={playHover}
        className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 shadow-xl flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95 transition-all"
        aria-label="Toggle theme"
        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4 text-amber-500" />
        ) : (
          <Sun className="w-4 h-4 text-amber-400" />
        )}
      </button>

      {/* Sound Toggle Button */}
      <button
        onClick={() => {
          toggleSound()
        }}
        onMouseEnter={playHover}
        className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 shadow-xl flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95 transition-all"
        aria-label="Toggle sound effects"
        title={soundEnabled ? 'Disable UI Sound FX' : 'Enable UI Sound FX'}
      >
        {soundEnabled ? (
          <Volume2 className="w-4 h-4 text-emerald-500" />
        ) : (
          <VolumeX className="w-4 h-4 text-rose-500" />
        )}
      </button>

      {/* Direct Email Contact Button */}
      <a
        href={emailHref}
        onMouseEnter={playHover}
        onClick={playClick}
        className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 shadow-xl flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95 transition-all"
        title="Send an Email"
        aria-label="Send an Email"
      >
        <Mail className="w-4 h-4 text-purple-400" />
      </a>
    </div>
  )
}
