'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun, Calendar, Search, Volume2, VolumeX } from 'lucide-react'
import { useState, useEffect } from 'react'
import { SOCIALS, PERSONAL } from '@/lib/config'
import { useSoundFX } from '@/hooks/useSoundFX'

export default function FloatingDock() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { soundEnabled, toggleSound, playHover, playToggle, playClick } = useSoundFX()

  useEffect(() => {
    setMounted(true)
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

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 items-center">
      {/* Command Palette Button */}
      <button
        onClick={triggerCmdK}
        onMouseEnter={playHover}
        className="w-10 h-10 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-300 dark:border-neutral-800 shadow-lg flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95 transition-all"
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
        className="w-10 h-10 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-300 dark:border-neutral-800 shadow-lg flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95 transition-all"
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
        className="w-10 h-10 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-300 dark:border-neutral-800 shadow-lg flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95 transition-all"
        aria-label="Toggle sound effects"
        title={soundEnabled ? 'Disable UI Sound FX' : 'Enable UI Sound FX'}
      >
        {soundEnabled ? (
          <Volume2 className="w-4 h-4 text-emerald-500" />
        ) : (
          <VolumeX className="w-4 h-4 text-rose-500" />
        )}
      </button>

      {/* Schedule / Book Call Button */}
      <a
        href={PERSONAL.ctaUrl || SOCIALS.email}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={playHover}
        onClick={playClick}
        className="w-10 h-10 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-300 dark:border-neutral-800 shadow-lg flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95 transition-all"
        title="Schedule a Call"
        aria-label="Schedule a Call"
      >
        <Calendar className="w-4 h-4 text-purple-400" />
      </a>
    </div>
  )
}
