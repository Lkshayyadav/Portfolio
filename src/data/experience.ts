import { EXPERIENCE, ExperienceItem } from '@/lib/config'

export type { ExperienceItem }
export const experiences: ExperienceItem[] = EXPERIENCE
export const getExperiences = () => experiences
