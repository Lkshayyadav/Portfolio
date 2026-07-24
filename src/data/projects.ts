/**
 * Projects data — sourced from the central config.
 * To add or edit projects, open: src/lib/config.ts → PROJECTS array.
 */
import { PROJECTS as CONFIG_PROJECTS } from '@/lib/config'

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  liveLink?: string
  githubLink?: string
  image: string
  screenshots?: string[]
  /** Used as video identifier if next-video is used (optional) */
  video?: string
  tags: string[]
  features?: string[]
}

// Re-export so components import from here as before
export const projects: Project[] = CONFIG_PROJECTS

export const getProjectById = (id: string): Project | undefined =>
  projects.find((project) => project.id === id)

export const getAllProjects = (): Project[] => projects
