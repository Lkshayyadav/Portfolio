'use client'

import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { useTheme } from 'next-themes'
import {
  Search,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Mail,
  FolderGit2,
} from 'lucide-react'
import { PERSONAL, SOCIALS, PROJECTS } from '@/lib/config'
import { useSoundFX } from '@/hooks/useSoundFX'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { soundEnabled, toggleSound, playClick } = useSoundFX()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = (command: () => void) => {
    playClick()
    setOpen(false)
    command()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div
        className="fixed inset-0"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl overflow-hidden bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-10 text-neutral-100 font-sans">
        <Command className="w-full">
          <div className="flex items-center px-4 border-b border-neutral-800">
            <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
            <Command.Input
              placeholder="Type a command or search..."
              className="w-full py-4 text-sm bg-transparent outline-none text-neutral-100 placeholder-neutral-500"
            />
            <kbd className="px-2 py-1 text-[10px] font-mono text-neutral-400 bg-neutral-800 rounded border border-neutral-700">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[340px] overflow-y-auto p-2 space-y-1">
            <Command.Empty className="py-6 text-center text-sm text-neutral-500">
              No results found.
            </Command.Empty>

            {/* Quick Actions Group */}
            <Command.Group heading="Actions" className="px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              <Command.Item
                onSelect={() => runCommand(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
                <span>Toggle Theme ({theme === 'dark' ? 'Light' : 'Dark'})</span>
              </Command.Item>

              <Command.Item
                onSelect={() => runCommand(toggleSound)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
                <span>{soundEnabled ? 'Disable UI Sound Effects' : 'Enable UI Sound Effects'}</span>
              </Command.Item>

              {PERSONAL.resumePath && (
                <Command.Item
                  onSelect={() =>
                    runCommand(() => {
                      const a = document.createElement('a')
                      a.href = PERSONAL.resumePath
                      a.target = '_blank'
                      a.rel = 'noopener noreferrer'
                      a.download = PERSONAL.resumeDownloadName
                      a.click()
                    })
                  }
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors"
                >
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Download Resume (PDF)</span>
                </Command.Item>
              )}
            </Command.Group>

            {/* Projects Group */}
            <Command.Group heading="Projects" className="px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider my-2">
              {PROJECTS.map((project) => (
                <Command.Item
                  key={project.id}
                  onSelect={() =>
                    runCommand(() => {
                      if (project.liveLink || project.githubLink) {
                        window.open(project.liveLink || project.githubLink, '_blank', 'noopener,noreferrer')
                      }
                    })
                  }
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors"
                >
                  <FolderGit2 className="w-4 h-4 text-purple-400" />
                  <span>{project.title}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Social Links Group */}
            <Command.Group heading="Socials" className="px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider my-2">
              {SOCIALS.github && (
                <Command.Item
                  onSelect={() => runCommand(() => window.open(SOCIALS.github, '_blank', 'noopener,noreferrer'))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors"
                >
                  <Github className="w-4 h-4 text-neutral-300" />
                  <span>GitHub</span>
                </Command.Item>
              )}
              {SOCIALS.linkedin && (
                <Command.Item
                  onSelect={() => runCommand(() => window.open(SOCIALS.linkedin, '_blank', 'noopener,noreferrer'))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                </Command.Item>
              )}
              {SOCIALS.twitter && (
                <Command.Item
                  onSelect={() => runCommand(() => window.open(SOCIALS.twitter, '_blank', 'noopener,noreferrer'))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors"
                >
                  <Twitter className="w-4 h-4 text-sky-400" />
                  <span>Twitter / X</span>
                </Command.Item>
              )}
              {SOCIALS.email && (
                <Command.Item
                  onSelect={() => runCommand(() => window.open(SOCIALS.email, '_blank', 'noopener,noreferrer'))}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/80 cursor-pointer transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Email</span>
                </Command.Item>
              )}
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between px-4 py-2.5 border-t border-neutral-800 text-[11px] text-neutral-500 font-mono">
            <span>Press <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded">↑</kbd> <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-neutral-800 rounded">↵</kbd> to select</span>
          </div>
        </Command>
      </div>
    </div>
  )
}
