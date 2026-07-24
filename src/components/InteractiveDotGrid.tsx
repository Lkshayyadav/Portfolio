'use client'

import React, { useEffect, useRef } from 'react'

interface InteractiveDotGridProps {
  className?: string
}

export default function InteractiveDotGrid({ className = '' }: InteractiveDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0

    // Grid configuration
    const spacing = 18
    const baseRadius = 1.2
    const maxRadius = 4.0
    const mouseRadius = 150

    interface Dot {
      origX: number
      origY: number
      x: number
      y: number
      r: number
      targetR: number
      alpha: number
      targetAlpha: number
    }

    let dots: Dot[] = []
    let mouseX = -1000
    let mouseY = -1000
    let leftMarginEnd = 0
    let rightMarginStart = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = window.devicePixelRatio || 1

      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      // Calculate central portfolio container bounds (max-w-4xl is 896px)
      const mainWidth = Math.min(width - 32, 896)
      leftMarginEnd = (width - mainWidth) / 2
      rightMarginStart = (width + mainWidth) / 2

      // Initialize dots across outer left and right margins only
      dots = []
      const cols = Math.ceil(width / spacing) + 1
      const rows = Math.ceil(height / spacing) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing
          const y = r * spacing

          // Only create dots that lie in the outer left or right margins
          if (x < leftMarginEnd - 4 || x > rightMarginStart + 4) {
            dots.push({
              origX: x,
              origY: y,
              x: x,
              y: y,
              r: baseRadius,
              targetR: baseRadius,
              alpha: 0.12,
              targetAlpha: 0.12,
            })
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    const handleScroll = () => {
      dots.forEach((dot) => {
        const wave = Math.sin((dot.origY + window.scrollY) * 0.015)
        if (wave > 0.85) {
          dot.targetR = baseRadius * 1.8
          dot.targetAlpha = 0.3
        }
      })
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    resize()

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const isDarkMode = document.documentElement.classList.contains('dark')
      const dotColor = isDarkMode ? '255, 255, 255' : '0, 0, 0'
      const accentColor = isDarkMode ? '59, 130, 246' : '37, 99, 235'

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        const dx = mouseX - dot.origX
        const dy = mouseY - dot.origY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouseRadius) {
          const factor = 1 - dist / mouseRadius
          const angle = Math.atan2(dy, dx)
          const push = factor * 16

          const targetX = dot.origX - Math.cos(angle) * push
          const targetY = dot.origY - Math.sin(angle) * push

          dot.x += (targetX - dot.x) * 0.15
          dot.y += (targetY - dot.y) * 0.15

          dot.targetR = baseRadius + factor * (maxRadius - baseRadius)
          dot.targetAlpha = 0.15 + factor * 0.75
        } else {
          dot.x += (dot.origX - dot.x) * 0.1
          dot.y += (dot.origY - dot.y) * 0.1
          dot.targetR = baseRadius
          dot.targetAlpha = 0.12
        }

        dot.r += (dot.targetR - dot.r) * 0.1
        dot.alpha += (dot.targetAlpha - dot.alpha) * 0.1

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, Math.max(0.4, dot.r), 0, Math.PI * 2)

        if (dist < mouseRadius * 0.55) {
          ctx.fillStyle = `rgba(${accentColor}, ${dot.alpha})`
        } else {
          ctx.fillStyle = `rgba(${dotColor}, ${dot.alpha})`
        }

        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 hidden sm:block ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
