'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Building2 } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { EXPERIENCE } from '@/lib/config'
import { useSoundFX } from '@/hooks/useSoundFX'

export default function ExperienceContent() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const { playHover, playClick } = useSoundFX()

  const toggleExpanded = (company: string) => {
    playClick()
    setExpanded((prev) => ({
      ...prev,
      [company]: !prev[company],
    }))
  }

  if (EXPERIENCE.length === 0) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400 py-4">
        No experience listed yet.
      </p>
    )
  }

  return (
    <div className="space-y-3.5 pb-4">
      {EXPERIENCE.map((exp) => {
        const isExpanded = expanded[exp.company]

        return (
          <motion.div
            key={exp.company}
            whileHover={{ y: -2 }}
            onMouseEnter={playHover}
            className="rounded-xl p-4 sm:p-5 bg-white/70 dark:bg-[#121215]/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 hover:border-sky-500/40 dark:hover:border-sky-500/40 shadow-sm transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-1 overflow-hidden shrink-0 shadow-xs">
                  {exp.logoUrl ? (
                    <Image
                      src={exp.logoUrl}
                      alt={exp.company}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Building2 className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base tracking-tight">
                    {exp.href ? (
                      <Link
                        href={exp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                      >
                        {exp.company}
                      </Link>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">{exp.position}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="pl-13 sm:pl-0 sm:text-right shrink-0">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{exp.duration}</p>
                </div>

                {exp.achievements && exp.achievements.length > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => toggleExpanded(exp.company)}
                        className="shrink-0 p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                      >
                        <ChevronDown
                          className={`w-4 h-4 text-neutral-600 dark:text-neutral-300 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-sky-500' : ''
                          }`}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isExpanded ? 'Collapse details' : 'Expand details'}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && exp.achievements && exp.achievements.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
                    <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          <span className="text-sky-500 shrink-0 mt-1">•</span>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
