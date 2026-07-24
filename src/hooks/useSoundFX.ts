'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

export function useSoundFX() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('sound_enabled')
    if (saved !== null) {
      setSoundEnabled(saved === 'true')
    }

    const unlockAudio = () => {
      try {
        if (!audioCtxRef.current && typeof window !== 'undefined') {
          const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
          if (AudioCtx) {
            audioCtxRef.current = new AudioCtx()
          }
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume()
        }
      } catch {
        // Ignore AudioContext initialization errors
      }
    }

    window.addEventListener('pointerdown', unlockAudio, { once: true })
    window.addEventListener('keydown', unlockAudio, { once: true })

    return () => {
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
    }
  }, [])

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev
      localStorage.setItem('sound_enabled', String(next))
      return next
    })
  }, [])

  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [])

  const playHover = useCallback(() => {
    if (!soundEnabled) return
    try {
      const ctx = getAudioContext()
      if (!ctx) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(420, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.03)

      gain.gain.setValueAtTime(0.015, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.035)
    } catch {
      // Ignore audio context errors
    }
  }, [soundEnabled, getAudioContext])

  const playClick = useCallback(() => {
    if (!soundEnabled) return
    try {
      const ctx = getAudioContext()
      if (!ctx) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(260, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.055)
    } catch {
      // Ignore audio context errors
    }
  }, [soundEnabled, getAudioContext])

  /**
   * Synthesized "Shhh / Swish" air sound effect for smooth theme transitions
   */
  const playSwish = useCallback(() => {
    if (!soundEnabled) return
    try {
      const ctx = getAudioContext()
      if (!ctx) return

      const bufferSize = ctx.sampleRate * 0.25
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(800, ctx.currentTime)
      filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.12)
      filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.22)
      filter.Q.setValueAtTime(3, ctx.currentTime)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.08)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.24)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      noise.start()
      noise.stop(ctx.currentTime + 0.25)
    } catch {
      // Ignore audio context errors
    }
  }, [soundEnabled, getAudioContext])

  const playToggle = useCallback(() => {
    playSwish()
  }, [playSwish])

  return { soundEnabled, toggleSound, playHover, playClick, playToggle, playSwish }
}
