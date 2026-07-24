'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { PERSONAL, ABOUT } from '@/lib/config'
import { useSoundFX } from '@/hooks/useSoundFX'

export default function AboutMe() {
  const { playHover } = useSoundFX()

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-base sm:text-xl font-[family-name:var(--font-instrument-serif)] opacity-30 text-black dark:text-white">
          Skills & Tech Stack
        </h2>
      </div>

      {/* Content Section */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
        {/* Profile / About Image */}
        <div className="shrink-0">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-md border border-neutral-200 dark:border-neutral-800/80 bg-neutral-900">
            <Image
              src={PERSONAL.aboutImage}
              alt={PERSONAL.name}
              width={144}
              height={144}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>

        {/* Info & Skills */}
        <div className="flex-1">
          {/* Bio */}
          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-5">
            {ABOUT.bio}
          </p>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-2">
            {ABOUT.skills.map((skill) => (
              <Tooltip key={skill.name}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={playHover}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-[#121215] border border-neutral-200 dark:border-neutral-800 hover:border-sky-500/50 dark:hover:border-sky-500/50 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={18}
                      height={18}
                      className="w-4 h-4 object-contain shrink-0 dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]"
                      unoptimized
                    />
                    <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>{skill.name}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
