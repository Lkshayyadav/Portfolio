'use client'

import { Marquee } from '@/components/magicui/marquee'
import Image from 'next/image'
import { TECH_STACK } from '@/lib/config'

interface TechIconProps {
  tech: (typeof TECH_STACK)[0]
  className?: string
}

function TechIcon({ tech, className = '' }: TechIconProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-2 sm:p-3 transition-all duration-300 hover:scale-110 min-w-[70px] sm:min-w-[80px] group ${className}`}
    >
      {/* Icon Container */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 mb-1.5 flex items-center justify-center p-1.5 rounded-xl bg-white dark:bg-zinc-800/90 border border-neutral-200 dark:border-neutral-700/80 shadow-xs group-hover:border-sky-500/60 dark:group-hover:border-sky-400/60 transition-all">
        <Image
          src={tech.icon}
          alt={tech.name}
          width={36}
          height={36}
          className="w-full h-full object-contain dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full bg-neutral-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  ${tech.name.charAt(0)}
                </div>
              `
            }
          }}
        />
      </div>

      {/* Tech Name */}
      <span className="text-[10px] sm:text-xs text-center font-medium text-neutral-600 dark:text-neutral-300 leading-tight group-hover:text-black dark:group-hover:text-white transition-colors">
        {tech.name}
      </span>
    </div>
  )
}

interface TechStackMarqueeProps {
  className?: string
}

export default function TechStackMarquee({ className = '' }: TechStackMarqueeProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-base font-[family-name:var(--font-instrument-serif)] sm:text-xl mb-3 opacity-30 mt-4 sm:mt-6 -tracking-[0.01em]">
          Skills & Technologies
        </h2>
      </div>

      {/* Scrolling Marquee */}
      <div className="relative">
        <Marquee pauseOnHover className="[--duration:50s] [--gap:1.25rem]">
          {TECH_STACK.map((tech, index) => (
            <TechIcon key={`${tech.name}-${index}`} tech={tech} />
          ))}
        </Marquee>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 w-16 h-full bg-linear-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-16 h-full bg-linear-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none z-10" />
      </div>
    </div>
  )
}
