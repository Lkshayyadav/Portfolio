'use client'

import React from 'react'

interface DiagonalPatternProps {
  side: 'left' | 'right'
  className?: string
  topOffset?: string
}

export default function DiagonalPattern({ side, className = '', topOffset = '0' }: DiagonalPatternProps) {
  return (
    <div className={`absolute ${side}-0 w-[60px] h-full overflow-hidden sm:block hidden pointer-events-none ${className}`} style={{ top: topOffset }}>
      <div 
        className="absolute dark:opacity-[0.03] opacity-[0.05] inset-0 w-[60px] h-full border dark:border-[#eee] border-[#000]/70"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, currentcolor 2px, currentcolor 3px, transparent 3px, transparent 6px)'
        }}
      />
    </div>
  )
}
